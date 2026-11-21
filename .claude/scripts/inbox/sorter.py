#!/usr/bin/env python3
"""Sorting page for new teacher files: the parent says where each file and page goes, Claude reads the notes.

  python3 .claude/scripts/inbox/sorter.py                  http://127.0.0.1:8770 on this computer
  python3 .claude/scripts/inbox/sorter.py --lan            also http://mollers-pi.local:8770 from a phone / tablet at home
  python3 .claude/scripts/inbox/sorter.py --set-password   choose the password (in a terminal; asked twice, never shown)

From the home network the browser asks for the password (any user name); this computer itself needs none.
--lan without a password set: the page stays on this computer only. The password is kept as a salted hash
(PBKDF2) in ~/.local/share/school-inbox/password (readable by you only). Plain http: fine at home, not on public Wi-Fi.

Shows the new files of every subject (inbox.py) with their page pictures (prep.py; a "Prepare" button makes them).
Notes are saved as you type to ~/.local/share/school-inbox/notes.json, keyed by the file path; `inbox.py` prints them.
Only the standard library.
"""

import base64
import getpass
import hashlib
import hmac
import json
import os
import secrets
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import inbox  # noqa: E402
import prep  # noqa: E402

NOTES = Path("~/.local/share/school-inbox/notes.json").expanduser()
PASSWORD = Path("~/.local/share/school-inbox/password").expanduser()
PORT = 8770
LOCK = threading.Lock()
PREPARING = {}  # subject id -> "running" / "done" / error text


def hash_password(pw, salt):
    return hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, 200_000).hex()


def set_password():
    pw = getpass.getpass("New password for the sorting page: ")
    if len(pw) < 6 or pw != getpass.getpass("Again: "):
        sys.exit("Not set: the two did not match, or shorter than 6 characters.")
    salt = secrets.token_bytes(16)
    PASSWORD.parent.mkdir(parents=True, exist_ok=True)
    fd = os.open(PASSWORD, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w") as f:
        f.write(salt.hex() + "$" + hash_password(pw, salt) + "\n")
    print("Password set. Restart the page: systemctl --user restart school-sorter")


def password_ok(header):
    """Basic auth header against the stored hash (any user name)."""
    try:
        salt, good = PASSWORD.read_text().strip().split("$")
        pw = base64.b64decode(header.split(" ", 1)[1]).decode().split(":", 1)[1]
    except (OSError, ValueError, IndexError):
        return False
    return hmac.compare_digest(hash_password(pw, bytes.fromhex(salt)), good)


def load_notes():
    try:
        return json.loads(NOTES.read_text())
    except (OSError, ValueError):
        return {}


def save_note(file, note):
    with LOCK:
        notes = load_notes()
        if note:
            notes[file] = note
        else:
            notes.pop(file, None)
        NOTES.parent.mkdir(parents=True, exist_ok=True)
        tmp = NOTES.with_suffix(".tmp")
        tmp.write_text(json.dumps(notes, ensure_ascii=False, indent=1))
        tmp.replace(NOTES)


def pictures(rel):
    """The page pictures prep made for a file, as paths under the cache ("" = not prepared yet)."""
    d = prep.CACHE / Path(rel).parent / Path(rel).stem
    pages = sorted((d / "pages").glob("p-*.jpg"), key=lambda p: int(p.stem.split("-")[1]))
    if not pages:
        pages = [p for p in (d / "photo.jpg", d / "sheet-1.jpg") if p.exists()][:1]
    return [p.relative_to(prep.CACHE).as_posix() for p in pages]


def inbox_data():
    result, _ = inbox.scan()
    notes = load_notes()
    subjects = []
    for s in result:
        if not s["new"]:
            continue
        files = []
        for x in s["new"]:
            files.append({**x, "pictures": pictures(x["file"]), "note": notes.get(x["file"], {})})
        subjects.append(
            {
                "id": s["id"],
                "kid": s["kid"],
                "name": s["name"],
                "ready": inbox.ready(s),
                "preparing": PREPARING.get(s["id"]),
                "files": files,
            }
        )
    return {"subjects": subjects}


def prepare(subject):
    PREPARING[subject] = "running"
    try:
        result, _ = inbox.scan(subject)
        for s in result:
            for x in s["new"]:
                prep.prep(inbox.ROOT / x["file"], s.get("ocr"))
        PREPARING[subject] = "done"
    except Exception as e:  # shown on the page
        PREPARING[subject] = f"error: {e}"


class Handler(BaseHTTPRequestHandler):
    def allowed(self):
        """This computer: always. The home network: with the password."""
        if self.client_address[0] in ("127.0.0.1", "::1"):
            return True
        auth = self.headers.get("Authorization", "")
        if auth.startswith("Basic ") and password_ok(auth):
            return True
        if auth:
            time.sleep(1)  # slow down guessing
        self.send_response(401)
        self.send_header("WWW-Authenticate", 'Basic realm="School inbox", charset="UTF-8"')
        self.send_header("Content-Length", "0")
        self.end_headers()
        return False

    def send(self, code, body, kind="application/json"):
        data = body if isinstance(body, bytes) else json.dumps(body, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header("Content-Type", kind)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if not self.allowed():
            return
        path = urlparse(self.path).path
        if path == "/":
            return self.send(200, (HERE / "sorter.html").read_bytes(), "text/html; charset=utf-8")
        if path == "/api/inbox":
            return self.send(200, inbox_data())
        if path.startswith("/img/"):
            f = (prep.CACHE / unquote(path[5:])).resolve()
            if f.is_file() and prep.CACHE.resolve() in f.parents and f.suffix == ".jpg":
                return self.send(200, f.read_bytes(), "image/jpeg")
        self.send(404, {"error": "not found"})

    def do_POST(self):
        if not self.allowed():
            return
        length = int(self.headers.get("Content-Length", 0))
        if length > 200_000:
            return self.send(413, {"error": "too big"})
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except ValueError:
            return self.send(400, {"error": "bad json"})
        path = urlparse(self.path).path
        if path == "/api/note" and isinstance(body.get("file"), str):
            save_note(body["file"], body.get("note") or {})
            return self.send(200, {"ok": True})
        if path == "/api/prep" and isinstance(body.get("subject"), str):
            if PREPARING.get(body["subject"]) != "running":
                threading.Thread(target=prepare, args=(body["subject"],), daemon=True).start()
            return self.send(200, {"ok": True})
        self.send(404, {"error": "not found"})

    def log_message(self, *args):  # quiet
        pass


if __name__ == "__main__":
    if "--set-password" in sys.argv:
        set_password()
        sys.exit()
    host = "127.0.0.1"
    if "--lan" in sys.argv:
        if PASSWORD.exists():
            host = "0.0.0.0"
        else:
            print("No password set (sorter.py --set-password): the page stays on this computer only.", flush=True)
    server = ThreadingHTTPServer((host, PORT), Handler)
    where = "http://mollers-pi.local:{0} (home network, password) and http://127.0.0.1:{0}" if host == "0.0.0.0" else "http://127.0.0.1:{0}"
    print("Sorting page: " + where.format(PORT) + "  (Ctrl+C to stop)", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
