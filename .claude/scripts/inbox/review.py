#!/usr/bin/env python3
"""Review notes: the parent's notes written on lesson pages in the app (review mode), for Claude to fix.

  review.py                 the open notes, grouped by page (Markdown)
  review.py --all           the done ones too
  review.py done <id>...    mark notes as fixed (after the fix is committed)

The app sends them to the sorting page (sorter.py, POST /api/review); kept in
~/.local/share/school-inbox/review.json. Only the standard library.
"""

import json
import re
import sys
import threading
import time
from pathlib import Path

FILE = Path("~/.local/share/school-inbox/review.json").expanduser()
LOCK = threading.Lock()
FIELDS = ("id", "page", "title", "item", "text")  # strings sent by the app


def load():
    try:
        return json.loads(FILE.read_text())
    except (OSError, ValueError):
        return []


def write(notes):
    FILE.parent.mkdir(parents=True, exist_ok=True)
    tmp = FILE.with_suffix(".tmp")
    tmp.write_text(json.dumps(notes, ensure_ascii=False, indent=1))
    tmp.replace(FILE)


def add(body):
    """One note from the app. The same id sent twice (a retry after a lost answer) is kept once."""
    if not isinstance(body, dict):
        return False
    n = {k: str(body.get(k) or "")[:4000] for k in FIELDS}
    if not n["id"] or not n["page"] or not n["text"].strip():
        return False
    n["at"] = time.strftime("%Y-%m-%d %H:%M")
    with LOCK:
        notes = load()
        if all(x["id"] != n["id"] for x in notes):
            write(notes + [n])
    return True


def done(ids):
    with LOCK:
        notes = load()
        for x in notes:
            if x["id"] in ids:
                x["done"] = time.strftime("%Y-%m-%d")
        write(notes)


def subject_of(page, subjects):
    """The subject whose app folder holds the page; a term folder doesn't count
    (grade-4/term-1/english/… belongs to the English of grade-4/term-2/english). None = no subject (Optima, speech…)."""
    norm = lambda p: re.sub(r"/term-\d+/", "/", "/" + p.strip("/") + "/")
    page = norm(page)
    return next((s["id"] for s in subjects if page.startswith(norm(s["app"]))), None)


def open_notes():
    return [x for x in load() if not x.get("done")]


def report(show_all=False):
    pages = {}
    for x in load():
        if show_all or not x.get("done"):
            pages.setdefault(x["page"], []).append(x)
    if not pages:
        return "No open review notes."
    out = []
    for page, notes in pages.items():
        out.append(f"## {page}  ({notes[0]['title']})")
        for x in notes:
            mark = f" (done {x['done']})" if x.get("done") else ""
            out.append(f"- `{x['id']}` {x['at']}{mark}")
            if x["item"]:
                out.append(f"  - on screen: {x['item']}")
            out.append(f"  - note: {x['text']}")
    return "\n".join(out)


if __name__ == "__main__":
    a = sys.argv[1:]
    if a[:1] == ["done"]:
        done(set(a[1:]))
    print(report("--all" in a))
