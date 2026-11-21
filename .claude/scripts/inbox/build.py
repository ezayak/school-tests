#!/usr/bin/env python3
"""Runs the «Create / Update lesson» jobs from the sorting page, one at a time, and pushes the result.

  build.py              run every queued job (what school-build.service does; the page starts it)
  build.py --list       the jobs and their status

Per job (~/.local/share/school-inbox/jobs/<id>.json, written by sorter.py):
  1. a fresh git worktree from origin/main in ~/.cache/school-inbox/build/<id> (your own checkout is never touched)
  2. Claude (claude -p) builds the lesson there with the subject's skill and commits; it never pushes
  3. this script checks the commits itself: files only in the subject's folder (+ games.js, sw.js, done.txt),
     Prettier, node --check, register.py check, sw.js VERSION bumped
  4. all good: rebase on origin/main, push to main, remove the worktree; else the worktree and branch stay
  5. the result goes to the page (status in the job file, log in <id>.log) and to Telegram
Only the standard library.
"""

import fcntl
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import inbox  # noqa: E402

REPO = inbox.REPO
JOBS = Path("~/.local/share/school-inbox/jobs").expanduser()
WORK = Path("~/.cache/school-inbox/build").expanduser()
CLAUDE = Path("~/.local/bin/claude").expanduser()
BUDGET = str(inbox.CONFIG["rules"].get("buildBudgetUsd", 10))  # US dollars per job, at most
TIMEOUT = 90 * 60  # seconds per job
COMMIT_URL = "https://github.com/ezayak/school-tests/commit/"
# Files a lesson job may change outside the subject's app folder
SHARED_FILES = {"games.js", "sw.js", ".claude/scripts/inbox/done.txt"}
PRETTIER = Path("~/node_modules/.bin/prettier").expanduser()  # 3.9.10, as CLAUDE.md says
PRETTIER_EXT = {".js", ".css", ".html", ".md", ".json"}

RULES = """You run unattended: the parent pressed «Create / Update lesson» on the sorting page.
That press is the approval: do not ask questions, do not wait for approval, do not show diffs.
- Follow CLAUDE.md and the subject's skill as in a normal «build inbox» session. First read the parent's
  memory notes: ~/.claude/projects/-home-olena-projects-school-tests/memory/MEMORY.md (and the files it lists).
- Commit on the current branch (a git worktree made for this job): the lesson (with its SOURCES.md row and
  done.txt) in one commit, then `register.py bump "<reason>"` alone in a last commit. Never push: the job script
  checks the commits and pushes them itself.
- Change only the subject's lesson files, games.js, sw.js and done.txt. Never change an engine, shared/, a skill or
  CLAUDE.md: if the lesson needs that, build what you can without it and say so at the end.
- When ticked pages are given, use only those. Run `inbox.py done` only for files that are used up:
  a big file (a book) of which only some pages were ticked stays in the inbox.
- If you cannot do it (pages unreadable, the task unclear, the lesson not found), commit nothing.
- Your last message is sent to the parent on Telegram: 2-4 short lines, what was built or why not."""


def log(job, line):
    with open(JOBS / (job["id"] + ".log"), "a") as f:
        f.write(time.strftime("%H:%M:%S ") + line.rstrip() + "\n")


def save(job, **kw):
    job.update(kw)
    tmp = JOBS / (job["id"] + ".tmp")
    tmp.write_text(json.dumps(job, ensure_ascii=False, indent=1))
    tmp.replace(JOBS / (job["id"] + ".json"))


def git(*args, cwd=None, check=True):
    r = subprocess.run(["git", *args], cwd=cwd or REPO, capture_output=True, text=True)
    if check and r.returncode:
        raise RuntimeError(f"git {' '.join(args)}: {r.stderr.strip() or r.stdout.strip()}")
    return r.stdout.strip()


def subject_of(job):
    return next(s for s in inbox.CONFIG["subjects"] if s["id"] == job["subject"])


def prompt(job):
    s = subject_of(job)
    verb = "Create a new lesson" if job["mode"] == "new" else "Update the existing lesson"
    out = [
        f"build inbox {job['subject']}",
        "",
        f"Job: {verb}: «{job['target']}» ({s['kid']} · {s['name']}, skill {s.get('skill')}).",
        f"Parent's description: {job['text'] or '(none)'}",
    ]
    if job["picks"]:
        out.append("Use only these ticked pages (pictures: ~/.cache/school-inbox/<file without extension>/pages/p-N.jpg):")
        for p in job["picks"]:
            out.append(f"- {p['file']}: p. {', '.join(map(str, p['pages']))}")
    else:
        out.append("No pages ticked: use the subject's new files that belong to this lesson, with the parent's notes.")
    return "\n".join(out)


def show(event):
    """One readable log line from a stream-json event of claude -p (None = nothing worth showing)."""
    if event.get("type") != "assistant":
        return None
    lines = []
    for c in event.get("message", {}).get("content", []):
        if c.get("type") == "text" and c["text"].strip():
            lines.append("💬 " + c["text"].strip().replace("\n", " ")[:300])
        elif c.get("type") == "tool_use":
            i = c.get("input", {})
            what = i.get("command") or i.get("file_path") or i.get("pattern") or i.get("skill") or ""
            lines.append(f"→ {c['name']}: {str(what).splitlines()[0][:160] if what else ''}")
    return "\n".join(lines) or None


def run_claude(job, wt):
    cmd = [
        str(CLAUDE), "-p", prompt(job),
        "--append-system-prompt", RULES,
        "--permission-mode", "bypassPermissions",
        "--disallowedTools", "Bash(git push:*)",
        "--max-budget-usd", BUDGET,
        "--output-format", "stream-json", "--verbose",
    ]  # fmt: skip
    log(job, "Claude starts (at most $" + BUDGET + ")")
    p = subprocess.Popen(cmd, cwd=wt, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    final, start = "", time.time()
    for raw in p.stdout:
        if time.time() - start > TIMEOUT:
            p.kill()
            raise RuntimeError("took longer than 90 minutes")
        try:
            event = json.loads(raw)
        except ValueError:
            log(job, raw)
            continue
        if event.get("type") == "result":
            final = event.get("result") or ""
            log(job, f"Claude done: {event.get('subtype')}, ${event.get('total_cost_usd', 0):.2f}")
        elif line := show(event):
            log(job, line)
    p.wait()
    return final.strip()


def checks(job, wt):
    """Problems with the commits on this branch (empty list = good to push)."""
    s = subject_of(job)
    changed = [f for f in git("diff", "--name-only", "origin/main..HEAD", cwd=wt).splitlines() if f]
    problems = []
    if not changed:
        return ["nothing was committed"]
    if git("status", "--porcelain", cwd=wt):
        problems.append("files left uncommitted: " + git("status", "--short", cwd=wt).replace("\n", ", ")[:300])
    app = s["app"].rstrip("/") + "/"
    others = [f for f in changed if not f.startswith(app) and f not in SHARED_FILES]
    if others:
        problems.append("changed outside the lesson's folder: " + ", ".join(others[:8]))
    present = [f for f in changed if (wt / f).exists()]
    pretty = [f for f in present if Path(f).suffix in PRETTIER_EXT]
    if pretty:
        r = subprocess.run([str(PRETTIER), "--check", *pretty], cwd=wt, capture_output=True, text=True)
        if r.returncode:
            problems.append("Prettier: " + (r.stdout + r.stderr).strip().replace("\n", " ")[-300:])
    for f in (f for f in present if f.endswith(".js")):
        r = subprocess.run(["node", "--check", f], cwd=wt, capture_output=True, text=True)
        if r.returncode:
            problems.append(f"node --check {f}: {r.stderr.strip().splitlines()[-1] if r.stderr.strip() else 'error'}")
    r = subprocess.run([sys.executable, ".claude/scripts/inbox/register.py", "check"], cwd=wt, capture_output=True, text=True)
    if r.returncode:
        problems.append("register.py check: " + r.stdout.strip().replace("\n", " ")[:300])
    if set(changed) - {".claude/scripts/inbox/done.txt"} and "sw.js" not in changed:
        problems.append("sw.js VERSION not bumped")
    return problems


def clear_picks(job):
    """The ticked pages were used: untick them and note where they went (shown on the sorting page)."""
    notes = inbox.load_notes()
    for p in job["picks"]:
        pages = notes.get(p["file"], {}).get("pages", {})
        for n in p["pages"]:
            v = pages.get(str(n))
            if v:
                v.pop("pick", None)
                v["used"] = job["target"]
    tmp = inbox.NOTES.with_suffix(".tmp")
    tmp.write_text(json.dumps(notes, ensure_ascii=False, indent=1))
    tmp.replace(inbox.NOTES)


def run(job):
    s = subject_of(job)
    branch = "build/" + job["id"]
    wt = WORK / job["id"]
    save(job, status="running", started=time.strftime("%Y-%m-%d %H:%M"))
    git("fetch", "-q", "origin")
    WORK.mkdir(parents=True, exist_ok=True)
    git("worktree", "add", "-q", "-b", branch, str(wt), "origin/main")
    log(job, f"worktree {wt} from origin/main ({git('rev-parse', '--short', 'origin/main')})")
    final = run_claude(job, wt)
    save(job, status="checking", result=final[:1500])
    problems = checks(job, wt)
    if not problems:
        git("fetch", "-q", "origin")
        r = subprocess.run(["git", "rebase", "-q", "origin/main"], cwd=wt, capture_output=True, text=True)
        if r.returncode:
            subprocess.run(["git", "rebase", "--abort"], cwd=wt, capture_output=True)
            problems = ["main changed meanwhile and the commits do not fit on it (rebase conflict)"]
    if problems:
        for p in problems:
            log(job, "✗ " + p)
        save(job, status="failed", problems=problems, worktree=str(wt))
        return f"❌ {s['kid']} · {s['name']}: «{job['target']}» not pushed\n" + "\n".join("• " + p for p in problems) + f"\n{final[:600]}\nKept: {wt} (branch {branch})"
    commits = git("log", "--format=%h %s", "origin/main..HEAD", cwd=wt).splitlines()
    git("push", "-q", "origin", "HEAD:main", cwd=wt)
    head = git("rev-parse", "HEAD", cwd=wt)
    log(job, "✓ pushed: " + "; ".join(commits))
    clear_picks(job)
    git("worktree", "remove", "--force", str(wt))
    git("branch", "-D", branch)
    save(job, status="pushed", commits=commits, url=COMMIT_URL + head)
    return f"✅ {s['kid']} · {s['name']}: «{job['target']}» is live\n{final[:800]}\n{COMMIT_URL + head}"


def queued():
    for f in sorted(JOBS.glob("*.json")):
        try:
            j = json.loads(f.read_text())
        except ValueError:
            continue
        if j.get("status") == "queued":
            return j
    return None


def main():
    JOBS.mkdir(parents=True, exist_ok=True)
    with open(JOBS / ".lock", "w") as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            return  # another runner is working through the queue and will see the new job
        while job := queued():
            try:
                message = run(job)
            except Exception as e:  # git or the CLI broke: the job fails, the queue goes on
                log(job, f"✗ {e}")
                save(job, status="failed", problems=[str(e)])
                message = f"❌ «{job['target']}»: {e}"
            try:
                inbox.telegram(message)
            except Exception as e:
                log(job, f"Telegram: {e}")


if __name__ == "__main__":
    if "--list" in sys.argv:
        for f in sorted(JOBS.glob("*.json")):
            j = json.loads(f.read_text())
            print(f"{j['id']}  {j['status']:8}  {j['mode']} «{j['target']}»  {j.get('url', '')}")
    else:
        os.environ["PATH"] = os.pathsep.join([str(CLAUDE.parent), os.environ.get("PATH", "")])
        main()
