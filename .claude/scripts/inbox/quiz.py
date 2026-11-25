#!/usr/bin/env python3
"""Queues a sheet quiz job: photos of a school sheet (sent to a Telegram homework bot) → a quiz page (the `sheet-quiz` skill).

  quiz.py add --kid Alex [--caption "Computer U2 L3"] <photo>...   copy the photos, queue the job, start the runner; prints the job id

The photos are copied to ~/.local/share/school-inbox/quiz/<job id>/p-N.<ext>; the job is jobs/<job id>.json (mode "quiz"),
run by build.py like the sorting page's jobs: Claude in a worktree, checks, push, and the link to the quiz on Telegram
(through the kid's own bot). Called by the bot (school-hw, homework/bot.py); works by hand too. Only the standard library.
"""

import json
import shutil
import subprocess
import sys
import time
from pathlib import Path

JOBS = Path("~/.local/share/school-inbox/jobs").expanduser()
PHOTOS = Path("~/.local/share/school-inbox/quiz").expanduser()
KIDS = {"alex": "Alex", "lucas": "Lucas"}
EXT = {".jpg", ".jpeg", ".png", ".webp", ".heic", ".pdf"}


def add(kid, caption, photos):
    kid = KIDS.get(kid.lower())
    if not kid:
        sys.exit(f"--kid: one of {', '.join(KIDS.values())}")
    photos = [Path(p) for p in photos]
    bad = [str(p) for p in photos if not p.is_file() or p.suffix.lower() not in EXT]
    if not photos or bad:
        sys.exit("No photos" if not photos else "Not a photo: " + ", ".join(bad))
    if len(caption) > 1000:
        sys.exit("The caption is too long (1000 characters at most).")
    job_id = time.strftime("%Y%m%d-%H%M%S-") + "quiz-" + kid.lower()
    folder = PHOTOS / job_id
    folder.mkdir(parents=True, exist_ok=False)
    copied = []
    for i, p in enumerate(photos, 1):
        dest = folder / f"p-{i}{p.suffix.lower()}"
        shutil.copyfile(p, dest)
        copied.append(str(dest))
    job = {
        "id": job_id,
        "subject": None,  # found by Claude from the sheet
        "kid": kid,
        "mode": "quiz",
        "target": caption.splitlines()[0][:80] if caption else "Sheet quiz",
        "text": caption,
        "photos": copied,
        "picks": [],
        "status": "queued",
        "created": time.strftime("%Y-%m-%d %H:%M"),
    }
    JOBS.mkdir(parents=True, exist_ok=True)
    tmp = JOBS / (job_id + ".tmp")
    tmp.write_text(json.dumps(job, ensure_ascii=False, indent=1))
    tmp.replace(JOBS / (job_id + ".json"))
    subprocess.run(["systemctl", "--user", "start", "--no-block", "school-build.service"], capture_output=True)
    print(job_id)


def main(argv):
    if argv[:1] != ["add"]:
        sys.exit(__doc__)
    argv = argv[1:]

    def take(name):
        if name not in argv:
            return ""
        i = argv.index(name)
        if i + 1 >= len(argv):
            sys.exit(f"{name} needs a value")
        value = argv[i + 1]
        del argv[i : i + 2]
        return value

    kid = take("--kid")
    caption = take("--caption").strip()
    add(kid, caption, argv)


if __name__ == "__main__":
    main(sys.argv[1:])
