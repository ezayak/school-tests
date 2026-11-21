#!/usr/bin/env python3
"""School inbox: which teacher files are new, per subject, and what they are about.

The list of subjects is in subjects.json (add a subject there). A file counts as used when
its path is in done.txt (every file there when the tool started, plus what was built since).

  inbox.py                    report of the new files (Markdown), grouped by subject
  inbox.py --subject g4-math  only one subject
  inbox.py --json             the same as JSON (for Claude)
  inbox.py --telegram [--prep] send the short summary to Telegram when a subject is ready
                              (--prep: then prep every ready subject, OCR included)
  inbox.py done <file>...     mark files as used (after the lesson is built)
  inbox.py done --subject g4-math   mark every new file of a subject as used
  inbox.py prep <subject>     contact sheets, page text and video frames of its new files (see prep.py)
  inbox.py baseline           mark every file there is now as used (first run only)

Only the standard library and the poppler tools (pdfinfo, pdftotext) are used.
"""

import fnmatch
import json
import re
import subprocess
import sys
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
CONFIG = json.loads((HERE / "subjects.json").read_text())
ROOT = Path(CONFIG["root"]).expanduser()
DONE_FILE = HERE / "done.txt"
CACHE_FILE = HERE / ".cache.json"  # page count / first text per file, by size+mtime; not in git
REPO = HERE.parents[2]
SKIP_NAMES = {".DS_Store", "desktop.ini"}

# Hints found in a file name or in the text of its first page.
HINTS = [
    (r"\bunit\s*(\d+)\W{0,3}week\s*(\d+)", "Unit {} Week {}"),
    (r"\btopic\s*(\d+)\W{0,3}lesson\s*(\d+)", "Topic {} Lesson {}"),
    (r"\bchapter\s*(\d+)\W{0,3}lesson\s*(\d+)", "Chapter {} Lesson {}"),
    (r"\bch\.?\s*(\d+)\W{0,3}l\.?\s*(\d+)", "Chapter {} Lesson {}"),
    (r"\bl(?:esson)?[ _-]*(\d{1,2})-(\d{1,2})\b", "Lesson {}-{}"),
    (r"\ble[cç]on\s*(\d+)", "Leçon {}"),
    (r"\bunit[ée]\s*(\d+)", "Unité {}"),
    (r"\bunit\s*(\d+)", "Unit {}"),
    (r"\bweek\s*(\d+)", "Week {}"),
    (r"\bterm\s*\(?(\d)\)?|\bT(\d)\b", "Term {}"),
]
KINDS = [
    (r"\blivre p\.|cahier d.exercices|^le[cç]on\b", "slides"),
    (r"model answer|mod[eè]le de r[eé]ponse|answer key|memo", "key"),
    (r"devoir|\bhw\b|homework|واجب", "homework"),
    (r"extra.?practice|practice|تدريبات", "practice"),
    (r"quiz|test|exam|assessment|تقييم", "test"),
    (r"dictation|spelling|dict[ée]e", "dictation"),
    (r"booklet", "booklet"),
    (r"\bcw\b|classwork|travail de classe", "classwork"),
]


BIDI = re.compile(r"[\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff]")


def label(x):
    """A short name for the Telegram message: the first hint, else the file name, else the first words."""
    if x["hints"]:
        return x["hints"][0]
    name = BIDI.sub("", re.sub(r"^20\d{6}-", "", Path(x["file"]).stem)).strip(" _-")
    if not name.strip("_ ") and x.get("first_text"):
        name = x["first_text"]
    return name[:28] or "?"


def rel(p):
    return p.relative_to(ROOT).as_posix()


def load_done():
    if not DONE_FILE.exists():
        return set()
    return {l.strip() for l in DONE_FILE.read_text().splitlines() if l.strip() and not l.startswith("#")}


def add_done(paths):
    done = load_done()
    new = sorted(set(paths) - done)
    if new:
        with DONE_FILE.open("a") as f:
            f.write("".join(p + "\n" for p in new))
    return new


def ignored(r):
    """Folders in "ignore", and working files that match "ignoreGlobs" (video frames, …)."""
    if any(r == i or r.startswith(i + "/") for i in CONFIG.get("ignore", [])):
        return True
    return any(fnmatch.fnmatch(r, g) for g in CONFIG.get("ignoreGlobs", []))


def files_of(subject):
    """Every file of a subject: its folders, plus the booklets whose name has one of its words."""
    out = []
    for folder in subject["folders"]:
        d = ROOT / folder
        if d.is_dir():
            out += [p for p in d.rglob("*") if p.is_file()]
    words = [w.lower() for w in subject.get("booklets", [])]
    if words:
        d = ROOT / subject["kid"] / "!booklets"
        if d.is_dir():
            for p in d.rglob("*"):
                if p.is_file() and any(re.search(r"\b" + re.escape(w) + r"\b", p.name.lower()) for w in words):
                    out.append(p)
    return [p for p in out if p.name not in SKIP_NAMES and not ignored(rel(p))]


def all_files():
    return [p for p in ROOT.rglob("*") if p.is_file() and p.name not in SKIP_NAMES and not ignored(rel(p))]


def run(cmd):
    try:
        return subprocess.run(cmd, capture_output=True, text=True, timeout=30).stdout
    except Exception:
        return ""


def pdf_info(p, cache):
    st = p.stat()
    key = f"{rel(p)}|{st.st_size}|{int(st.st_mtime)}"
    if key in cache:
        return cache[key]
    m = re.search(r"^Pages:\s+(\d+)", run(["pdfinfo", str(p)]), re.M)
    text = run(["pdftotext", "-l", "2", "-layout", str(p), "-"])
    text = re.sub(r"[​‌‍﻿]", "", text)
    text = re.sub(r"\s+", " ", BIDI.sub("", unicodedata.normalize("NFKC", text))).strip()
    info = {"pages": int(m.group(1)) if m else None, "text": text[:600]}
    cache[key] = info
    return info


def hints(s):
    found = []
    for rx, fmt in HINTS:
        for m in re.finditer(rx, s, re.I):
            h = fmt.format(*[g for g in m.groups() if g is not None])
            if h not in found:
                found.append(h)
    return found


def kind(s, ext):
    for rx, k in KINDS:
        if re.search(rx, s, re.I):
            return k
    return {"mp4": "video", "mov": "video", "jpg": "photo", "jpeg": "photo", "png": "photo"}.get(ext, "sheet")


def describe(p, cache):
    ext = p.suffix.lower().lstrip(".")
    st = p.stat()
    m = re.match(r"(20\d{6})-", p.name)
    date = f"{m.group(1)[:4]}-{m.group(1)[4:6]}-{m.group(1)[6:]}" if m else time.strftime("%Y-%m-%d", time.localtime(st.st_mtime))
    item = {"file": rel(p), "date": date, "ext": ext, "size_kb": round(st.st_size / 1024)}
    name = BIDI.sub("", re.sub(r"^20\d{6}-", "", p.stem)).replace("_", " ")
    text = ""
    if ext == "pdf":
        info = pdf_info(p, cache)
        item["pages"] = info["pages"]
        item["text_layer"] = len(info["text"]) > 40
        text = info["text"]
        if text:
            item["first_text"] = text[:200]
    item["kind"] = kind(name, ext)
    if item["kind"] == "sheet" and text:
        item["kind"] = kind(text[:300], ext)
    item["hints"] = hints(name) + [h for h in hints(text[:600]) if h not in hints(name)][:3]
    return item


def scan(only=None):
    done = load_done()
    cache = json.loads(CACHE_FILE.read_text()) if CACHE_FILE.exists() else {}
    claimed = set()
    result = []
    for s in CONFIG["subjects"]:
        files = files_of(s)
        claimed |= {rel(p) for p in files}
        if only and s["id"] != only:
            continue
        new = sorted((p for p in files if rel(p) not in done), key=lambda p: p.name)
        app = REPO / s["app"]
        result.append(
            {
                "id": s["id"],
                "kid": s["kid"],
                "name": s["name"],
                "app": s["app"],
                "app_exists": app.is_dir(),
                "log": (s["app"] + "/SOURCES.md") if (app / "SOURCES.md").exists() else None,
                "skill": s.get("skill"),
                "ocr": s.get("ocr"),
                "new": [describe(p, cache) for p in new],
            }
        )
    CACHE_FILE.write_text(json.dumps(cache, ensure_ascii=False, indent=0))
    # New files in folders no subject watches (Optima, Music, …): listed once, by folder.
    other = {}
    if not only:
        for p in all_files():
            r = rel(p)
            if r not in claimed and r not in done:
                folder = "/".join(r.split("/")[:2]) if "/" in r.split("/", 1)[-1] else r.split("/")[0]
                other.setdefault(folder, 0)
                other[folder] += 1
    return result, other


def ready(s):
    """A subject is ready when it has enough new files, or a file waiting too long."""
    n = len(s["new"])
    if not n:
        return False
    oldest = min(x["date"] for x in s["new"])
    age = (time.time() - time.mktime(time.strptime(oldest, "%Y-%m-%d"))) / 86400
    return n >= CONFIG["rules"]["minFiles"] or age >= CONFIG["rules"]["maxAgeDays"]


def report(result, other):
    out = [f"# School inbox · {time.strftime('%Y-%m-%d %H:%M')}", ""]
    waiting = [s for s in result if s["new"]]
    if not waiting:
        out.append("No new files.")
    for s in waiting:
        flag = " · **ready**" if ready(s) else ""
        out.append(f"## {s['kid']} · {s['name']} ({s['id']}) · {len(s['new'])} new{flag}")
        extra = []
        if s["skill"]:
            extra.append(f"skill `{s['skill']}`")
        extra.append(f"log `{s['log']}`" if s["log"] else "no SOURCES.md")
        if not s["app_exists"]:
            extra.append(f"`{s['app']}` not built yet")
        out.append("· ".join(extra))
        out.append("")
        for x in s["new"]:
            bits = [x["date"], x["kind"]]
            if x.get("pages"):
                bits.append(f"{x['pages']} p.")
            if x["ext"] == "pdf":
                bits.append("text" if x.get("text_layer") else "scan")
            if x["hints"]:
                bits.append(", ".join(x["hints"]))
            out.append(f"- `{x['file']}` · " + " · ".join(bits))
        out.append("")
    if other:
        out.append("## Not watched (no subject in subjects.json)")
        out += [f"- `{k}`: {v} new" for k, v in sorted(other.items())]
    return "\n".join(out)


def short(result):
    lines = []
    for s in result:
        if not ready(s):
            continue
        tags = []
        for x in s["new"]:
            t = f"{label(x)} ({x['kind']})"
            if t not in tags:
                tags.append(t)
        lines.append(f"📚 {s['kid']} · {s['name']}: {len(s['new'])} new → " + "; ".join(tags[:6]) + ("…" if len(tags) > 6 else ""))
    if lines:
        lines.append("")
        lines.append("In Claude: «build inbox <subject>», e.g. «build inbox " + next(s["id"] for s in result if ready(s)) + "».")
    return "\n".join(lines)


def telegram(text):
    """Private message to the owner through the Alex homework bot (token and owner from school-hw)."""
    hw = Path.home() / "projects/school-hw"
    token = run([str(hw / ".venv/bin/python"), "-c", "import keyring;print(keyring.get_password('telegram-homework','Alex') or '')"]).strip()
    owner = json.loads((hw / "var/telegram/owner.json").read_text())
    if not token:
        sys.exit("No bot token in the keyring.")
    for chat in owner["ids"]:
        data = urllib.parse.urlencode({"chat_id": chat, "text": text, "disable_web_page_preview": "true"}).encode()
        urllib.request.urlopen(f"https://api.telegram.org/bot{token}/sendMessage", data, timeout=20).read()


def main(argv):
    only = None
    if "--subject" in argv:
        only = argv[argv.index("--subject") + 1]
    if argv[:1] == ["baseline"]:
        n = add_done(rel(p) for p in all_files())
        print(f"{len(n)} files marked as used.")
        return
    if argv[:1] == ["done"]:
        if only:
            result, _ = scan(only)
            paths = [x["file"] for s in result for x in s["new"]]
        else:
            paths = []
            for a in argv[1:]:
                p = Path(a).expanduser()
                paths.append(rel(p.resolve()) if p.is_absolute() or p.exists() else a)
        n = add_done(paths)
        print(f"{len(n)} files marked as used.")
        return
    if argv[:1] == ["prep"]:
        import prep

        result, _ = scan(argv[1])
        for s in result:
            print(f"## {s['kid']} · {s['name']} ({s['id']}) · {len(s['new'])} new")
            for x in s["new"]:
                print(prep.line(x["file"], prep.prep(ROOT / x["file"], s.get("ocr"))))
        return
    result, other = scan(only)
    if "--json" in argv:
        print(json.dumps({"subjects": [s for s in result if s["new"]], "other": other}, ensure_ascii=False, indent=1))
    elif "--telegram" in argv:
        text = short(result)
        if text:
            telegram(text)
            print(text)
        else:
            print("Nothing ready; no message sent.")
        if "--prep" in argv:  # contact sheets and OCR ready before the session starts
            import prep

            for s in result:
                if ready(s):
                    for x in s["new"]:
                        prep.prep(ROOT / x["file"], s.get("ocr"))
                    print(f"prepared {s['id']}")
    else:
        print(report(result, other))


if __name__ == "__main__":
    main(sys.argv[1:])
