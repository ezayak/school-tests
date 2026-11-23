#!/usr/bin/env python3
"""Sorting page for new teacher files: the parent says where each file and page goes, Claude reads the notes.

  python3 .claude/scripts/inbox/sorter.py                  http://127.0.0.1:8770 on this computer
  python3 .claude/scripts/inbox/sorter.py --lan            also http://mollers-pi.local:8770 from a phone / tablet at home
  https://mollers-pi.cheetah-krait.ts.net                  from your own devices anywhere (tailscale serve --bg 8770)
  python3 .claude/scripts/inbox/sorter.py --set-password   choose the password (in a terminal; asked twice, never shown)

Who needs the password: this computer itself, never; your own devices through Tailscale (the request carries
your Tailscale login), never; the home network and anything else (a Tailscale funnel), always (any user name).
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
import re
import secrets
import subprocess
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import inbox  # noqa: E402
import prep  # noqa: E402
import review  # noqa: E402

NOTES = Path("~/.local/share/school-inbox/notes.json").expanduser()
JOBS = Path("~/.local/share/school-inbox/jobs").expanduser()  # build requests; build.py runs them
PASSWORD = Path("~/.local/share/school-inbox/password").expanduser()
PORT = 8770
# Served without the password: the browser fetches the manifest without it
# when the page is added to the home screen. Nothing private in them.
PUBLIC = {
    "/manifest.json": (HERE / "manifest.json", "application/manifest+json"),
    "/icon-180.png": (HERE / "icons/icon-180.png", "image/png"),
    "/icon-192.png": (HERE / "icons/icon-192.png", "image/png"),
    "/icon-512.png": (HERE / "icons/icon-512.png", "image/png"),
}
LOCK = threading.Lock()
PREPARING = {}  # subject id -> "running" / "done" / error text
# Pages that may send review notes (the app on GitHub Pages, the local test server)
APP_ORIGINS = {"https://ezayak.github.io", "http://127.0.0.1:8765"}
# The sorting page's own addresses (Origin of its own requests)
SELF_HOSTS = {"mollers-pi.cheetah-krait.ts.net", f"mollers-pi.local:{PORT}", f"127.0.0.1:{PORT}", f"localhost:{PORT}"}


def hash_password(pw, salt):
    return hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, 200_000).hex()


def tailscale_owner():
    """The Tailscale login of this Pi's owner, read at start (None without Tailscale)."""
    try:
        out = subprocess.run(["tailscale", "status", "--json"], capture_output=True, text=True, timeout=5).stdout
        s = json.loads(out)
        return s["User"][str(s["Self"]["UserID"])]["LoginName"]
    except Exception:
        return None


OWNER = tailscale_owner()


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
    return inbox.load_notes()  # moved files keep their notes


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
    reviews = {}
    for x in review.open_notes():
        reviews.setdefault(review.subject_of(x["page"], inbox.CONFIG["subjects"]), []).append(x)
    for s in result:
        if not s["new"] and not reviews.get(s["id"]):
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
                "reviews": reviews.get(s["id"], []),
            }
        )
    # Notes on pages of no subject (Optima, speech games…): shown, fixed in a Claude session
    # "all": every subject, for «+ Add an old file» (a subject with nothing new is not in "subjects")
    every = [{"id": s["id"], "kid": s["kid"], "name": s["name"]} for s in inbox.CONFIG["subjects"]]
    return {"subjects": subjects, "otherReviews": reviews.get(None, []), "all": every}


def subject_by_id(sid):
    return next((x for x in inbox.CONFIG["subjects"] if x["id"] == sid), None)


def of_subject(sid, f):
    """True when f is a file of that subject (what the old-file popup may show or add)."""
    s = subject_by_id(sid)
    return bool(s) and isinstance(f, str) and f in {inbox.rel(p) for p in inbox.files_of(s)}


PREVIEW_PAGES = 4  # a PDF without page pictures: only its first pages, enough to recognise it


def preview(sid, f):
    """The old-file popup's preview: the page pictures prep made, or quick ones (no OCR): the first pages of a PDF,
    a photo, a video's frame sheet. Made once, in the file's cache folder (a later prep replaces them)."""
    if not of_subject(sid, f):
        return None
    src = inbox.ROOT / f
    ext = src.suffix.lower()
    pages = None
    if ext == ".pdf":
        m = re.search(r"^Pages:\s+(\d+)", inbox.run(["pdfinfo", str(src)]), re.M)
        pages = int(m.group(1)) if m else None
    pics = pictures(f)
    if not pics and ext == ".pdf":
        d = prep.CACHE / Path(f).parent / Path(f).stem / "preview"
        if not any(d.glob("p-*.jpg")):
            d.mkdir(parents=True, exist_ok=True)
            subprocess.run(["pdftoppm", "-jpeg", "-scale-to", str(prep.THUMB * 2), "-l", str(PREVIEW_PAGES), str(src), str(d / "p")], capture_output=True, timeout=120)
        shots = sorted(d.glob("p-*.jpg"), key=lambda p: int(p.stem.split("-")[-1]))
        pics = [p.relative_to(prep.CACHE).as_posix() for p in shots]
    elif not pics and ext in (".jpg", ".jpeg", ".png", ".webp", ".mp4", ".mov", ".webm", ".mkv"):
        prep.prep(src)  # no OCR: quick
        pics = pictures(f)
    return {"pictures": pics, "pages": pages}


def reopen(body):
    """«+ Add an old file» (open: true) or ✕ Take out (open: false): only a used file of that subject."""
    s, f = body.get("subject"), body.get("file")
    if not of_subject(s, f):
        return False
    with LOCK:
        inbox.set_reopened([f], bool(body.get("open")))
    return True


def new_job(body):
    """A «Create / Update lesson» press: saved as jobs/<id>.json (status "queued"), then the runner is started.
    The ticked pages are read from the notes, so the job says exactly what the page showed."""
    result, _ = inbox.scan(body.get("subject"))
    s = next((x for x in result if x["id"] == body.get("subject")), None)
    mode, target, text = body.get("mode"), str(body.get("target") or "").strip(), str(body.get("text") or "").strip()
    if not s or mode not in ("new", "update") or not target or len(target) > 200 or len(text) > 4000:
        return None
    notes = load_notes()
    picks = []
    for x in s["new"]:
        pages = sorted(int(p) for p, v in notes.get(x["file"], {}).get("pages", {}).items() if v.get("pick"))
        if pages:
            picks.append({"file": x["file"], "pages": pages})
    job = {
        "id": time.strftime("%Y%m%d-%H%M%S-") + s["id"],
        "subject": s["id"],
        "mode": mode,
        "target": target,
        "text": text,
        "picks": picks,  # empty: all new files of the subject
        "status": "queued",
        "created": time.strftime("%Y-%m-%d %H:%M"),
    }
    return queue_job(job)


def new_fix_job(body):
    """A «Fix notes» press: the ticked review notes of one subject, as a job for build.py (mode "fix")."""
    s = next((x for x in inbox.CONFIG["subjects"] if x["id"] == body.get("subject")), None)
    ids = body.get("ids")
    if not s or not isinstance(ids, list):
        return None
    busy = set()  # notes already in a job that has not finished (a second press)
    for f in JOBS.glob("*.json"):
        try:
            j = json.loads(f.read_text())
        except (OSError, ValueError):
            continue
        if j.get("status") not in ("pushed", "failed"):
            busy |= {x["id"] for x in j.get("notes", [])}
    subjects = inbox.CONFIG["subjects"]
    notes = [x for x in review.open_notes() if x["id"] in ids and x["id"] not in busy and review.subject_of(x["page"], subjects) == s["id"]]
    if not notes:
        return None
    titles = list(dict.fromkeys(x["title"] or x["page"] for x in notes))
    job = {
        "id": time.strftime("%Y%m%d-%H%M%S-") + s["id"],
        "subject": s["id"],
        "mode": "fix",
        "target": " · ".join(titles)[:200],
        "text": str(body.get("text") or "").strip()[:4000],
        "picks": [],
        "notes": notes,
        "status": "queued",
        "created": time.strftime("%Y-%m-%d %H:%M"),
    }
    return queue_job(job)


def queue_job(job):
    with LOCK:
        JOBS.mkdir(parents=True, exist_ok=True)
        (JOBS / (job["id"] + ".json")).write_text(json.dumps(job, ensure_ascii=False, indent=1))
    # The runner is its own service: a job keeps running when this page restarts.
    subprocess.run(["systemctl", "--user", "start", "--no-block", "school-build.service"], capture_output=True)
    return job


def list_jobs(subject):
    """The last 5 jobs of a subject, newest first, with the end of each log."""
    jobs = []
    for f in sorted(JOBS.glob(f"*-{subject}.json"), reverse=True)[:5]:
        try:
            j = json.loads(f.read_text())
        except (OSError, ValueError):
            continue
        log = f.with_suffix(".log")
        j["tail"] = log.read_text(errors="replace").splitlines()[-12:] if log.exists() else []
        jobs.append(j)
    return jobs


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
        """This computer: always. Through Tailscale: your own devices. Home network or anyone else: the password."""
        local = self.client_address[0] in ("127.0.0.1", "::1")
        # tailscale serve / funnel pass requests on from 127.0.0.1: they are not this computer
        proxied = any(h in self.headers for h in ("X-Forwarded-For", "Tailscale-User-Login", "Tailscale-Funnel-Request"))
        if local and not proxied:
            return True
        if local and OWNER and self.headers.get("Tailscale-User-Login") == OWNER:
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
        if self.headers.get("Origin") in APP_ORIGINS and self.path.startswith("/api/review"):
            self.send_header("Access-Control-Allow-Origin", self.headers["Origin"])
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        path = urlparse(self.path).path
        if path in PUBLIC:
            f, kind = PUBLIC[path]
            return self.send(200, f.read_bytes(), kind)
        if not self.allowed():
            return
        if path == "/":
            return self.send(200, (HERE / "sorter.html").read_bytes(), "text/html; charset=utf-8")
        if path == "/api/inbox":
            return self.send(200, inbox_data())
        if path.startswith("/api/used/"):
            s = subject_by_id(unquote(path[10:]))
            return self.send(200, {"files": inbox.used_files(s) if s else []})
        if path == "/api/preview":
            q = parse_qs(urlparse(self.path).query)
            got = preview(q.get("subject", [""])[0], q.get("file", [""])[0])
            return self.send(200 if got else 400, got or {"error": "not a file of this subject"})
        if path.startswith("/api/jobs/"):
            return self.send(200, {"jobs": list_jobs(unquote(path[10:]).replace("/", ""))})
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
        # Only the review notes may come from another site (the app). Anything else from a foreign page
        # (a site open on the tablet, riding on the Tailscale login) is refused: a build runs Claude.
        origin = self.headers.get("Origin")
        own = SELF_HOSTS | {self.headers.get("Host"), self.headers.get("X-Forwarded-Host")}
        if path != "/api/review" and origin and urlparse(origin).netloc not in own:
            return self.send(403, {"error": "other site"})
        if path == "/api/note" and isinstance(body.get("file"), str):
            save_note(body["file"], body.get("note") or {})
            return self.send(200, {"ok": True})
        if path == "/api/reopen":
            return self.send(200 if reopen(body) else 400, {"ok": True})
        if path == "/api/review":
            return self.send(200 if review.add(body) else 400, {"ok": True})
        if path == "/api/build":
            job = new_job(body)
            return self.send(200 if job else 400, job or {"error": "subject, new/update and a lesson name are needed"})
        if path == "/api/fix":
            job = new_fix_job(body)
            return self.send(200 if job else 400, job or {"error": "no open notes of this subject ticked"})
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
    where = "https://mollers-pi.cheetah-krait.ts.net (Tailscale), http://mollers-pi.local:{0} (home network, password) and http://127.0.0.1:{0}" if host == "0.0.0.0" else "http://127.0.0.1:{0}"
    print("Sorting page: " + where.format(PORT) + "  (Ctrl+C to stop)", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
