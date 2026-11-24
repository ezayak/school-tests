#!/usr/bin/env python3
"""The "Then:" steps after a lesson: games.js `also` lists, the offline check, the sw.js VERSION bump.

  register.py add <hub> <file or folder>...   add the missing files to the `also` list of the games.js entry
                                              whose `path` is <hub> (a folder = every file in it); runs Prettier
  register.py check [<hub> | <folder>]        files listed but missing; pages, scripts, pictures in the hub's
                                              folders that no `also` lists (they would not work offline);
                                              videos (video/ folders) are never precached and not checked
  register.py bump "<reason>"                 VERSION vN → vN+1 in sw.js; prints the commit command

Lists are read with the same regexes as sw.js. countLabel / topics are wording: update them by hand.
Paths are relative to the repo root.
"""

import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
GAMES = REPO / "games.js"
SW = REPO / "sw.js"
OFFLINE = {".html", ".js", ".css", ".json", ".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".mp3", ".mp4", ".m4a", ".ogg", ".woff2"}
NEVER = {"SOURCES.md", "TODO.md", "UNVERIFIED.md"}


def entries(text):
    """(start, end) line spans of the top-level game entries: from "  {" to "  },"."""
    lines = text.split("\n")
    spans, start = [], None
    for i, l in enumerate(lines):
        if l == "  {":
            start = i
        elif l in ("  },", "  }") and start is not None:
            spans.append((start, i))
            start = None
    return lines, spans


def entry_of(lines, spans, hub):
    for a, b in spans:
        if any(re.search(r'path:\s*"' + re.escape(hub) + '"', l) for l in lines[a : b + 1]):
            return a, b
    sys.exit(f'No games.js entry with path: "{hub}".')


def listed(text):
    """Everything sw.js would cache from games.js: every path and every also file."""
    out = set(re.findall(r'path:\s*"([^"]+)"', text))
    for m in re.finditer(r"also:\s*\[([^\]]*)\]", text):
        out |= set(re.findall(r'"([^"]+)"', m.group(1)))
    return {p.split("#")[0] for p in out}


def core():
    m = re.search(r"const CORE = \[([^\]]*)\]", SW.read_text())
    return {f.lstrip("./") for f in re.findall(r'"([^"]+)"', m.group(1))} if m else set()


def expand(args):
    files = []
    for a in args:
        p = (REPO / a).resolve()
        if p.is_dir():
            files += sorted(f for f in p.rglob("*") if f.is_file() and f.suffix.lower() in OFFLINE)
        elif p.is_file():
            files.append(p)
        else:
            sys.exit(f"Not found: {a}")
    return [f.relative_to(REPO).as_posix() for f in files]


def prettier(path):
    for cmd in (["prettier"], ["npx", "--no-install", "prettier"]):
        try:
            if subprocess.run(cmd + ["--write", str(path)], capture_output=True, cwd=REPO).returncode == 0:
                return True
        except FileNotFoundError:
            pass
    print("Prettier did not run: format games.js by hand.")
    return False


def add(hub, args):
    text = GAMES.read_text()
    lines, spans = entries(text)
    a, b = entry_of(lines, spans, hub)
    start = next((i for i in range(a, b + 1) if re.match(r"\s+also:\s*\[", lines[i])), None)
    if start is None:
        sys.exit(f"The entry of {hub} has no also list; add `also: [],` to it first.")
    if lines[start].rstrip().endswith("],"):  # one-line list: open it up, Prettier puts it back
        items = re.findall(r'"([^"]+)"', lines[start])
        lines[start : start + 1] = ["    also: ["] + [f'      "{x}",' for x in items] + ["    ],"]
    end = next(i for i in range(start, len(lines)) if lines[i].strip() == "],")
    have = set(re.findall(r'"([^"]+)"', "\n".join(lines[start:end])))
    new = [f for f in expand(args) if f not in have and f != hub]
    for f in new:
        # after the last line from the same folder, else after the last one sharing the longest parent folder
        best, score = end, (0, 0)
        for i in range(start + 1, end):
            m = re.search(r'"([^"]+)"', lines[i])
            if not m:
                continue
            fp, mp = Path(f).parent.parts, Path(m.group(1)).parent.parts
            n = 0
            while n < min(len(fp), len(mp)) and fp[n] == mp[n]:
                n += 1
            s = (1 if fp == mp else 0, n)
            if n and s >= score:
                best, score = i + 1, s
        lines.insert(best, f'      "{f}",')
        end += 1
    GAMES.write_text("\n".join(lines))
    if new:
        prettier(GAMES)
    print(f"{len(new)} file(s) added to the also list of {hub}:")
    print("".join(f"  + {f}\n" for f in new), end="")
    print("Now: countLabel / topics of that entry, then `register.py check`.")


def roots(hub_also, hub):
    """The folders a hub owns: the hub's folder and the top folders of its also files outside it."""
    dirs = {Path(hub).parent.as_posix()} | {Path(f).parent.as_posix() for f in hub_also}
    dirs = sorted(d for d in dirs if d not in ("", "."))
    return [d for d in dirs if not any(d != o and d.startswith(o + "/") for o in dirs)]


def check(hub=None):
    text = GAMES.read_text()
    known = listed(text) | core()
    missing = sorted(p for p in known if not (REPO / p).exists())
    if hub and (REPO / hub).is_dir():  # a folder: its files that nothing lists
        folder = hub.rstrip("/")
        missing = [p for p in missing if p.startswith(folder + "/")]
        unlisted = {
            f.relative_to(REPO).as_posix(): folder
            for f in (REPO / folder).rglob("*")
            if f.is_file()
            and f.suffix.lower() in OFFLINE
            and f.name not in NEVER
            and not f.name.startswith("_")
            and f.relative_to(REPO).as_posix() not in known
            and "/video/" not in f.relative_to(REPO).as_posix()
        }
        return report(missing, unlisted)
    lines, spans = entries(text)
    hubs = []
    for a, b in spans:
        block = "\n".join(lines[a : b + 1])
        m = re.search(r'path:\s*"([^"#]+)', block)
        if m and (hub is None or m.group(1) == hub) and "also:" in block:
            hubs.append((m.group(1), listed(block) - {m.group(1)}))
    if hub and not hubs:
        sys.exit(f'No games.js entry with path: "{hub}" and an also list.')
    if hub:
        mine = {hub} | hubs[0][1]
        missing = [p for p in missing if p in mine]
    unlisted = {}
    for h, also in hubs:
        for d in roots(also, h):
            for f in (REPO / d).rglob("*"):
                r = f.relative_to(REPO).as_posix()
                if f.is_file() and f.suffix.lower() in OFFLINE and f.name not in NEVER and not f.name.startswith("_") and r not in known and "/video/" not in r:
                    unlisted.setdefault(r, h)
    return report(missing, unlisted)


def report(missing, unlisted):
    for p in missing:
        print(f"missing file   {p}")
    for f, h in sorted(unlisted.items()):
        print(f"not in also    {f}   (hub {h}; or not used: delete it)")
    if not missing and not unlisted:
        print("OK: every listed file exists, every page / script / picture is listed.")
    return 1 if missing or unlisted else 0


def bump(reason):
    text = SW.read_text()
    m = re.search(r'const VERSION = "v(\d+)";', text)
    new = f"v{int(m.group(1)) + 1}"
    SW.write_text(text.replace(m.group(0), f'const VERSION = "{new}";', 1))
    print(f"sw.js: VERSION {new}")
    print(f"commit sw.js together with the change ({reason})")


if __name__ == "__main__":
    cmd, args = (sys.argv[1], sys.argv[2:]) if len(sys.argv) > 1 else ("", [])
    if cmd == "add" and len(args) >= 2:
        add(args[0], args[1:])
    elif cmd == "check":
        sys.exit(check(args[0] if args else None))
    elif cmd == "bump" and args:
        bump(" ".join(args))
    else:
        print(__doc__)
