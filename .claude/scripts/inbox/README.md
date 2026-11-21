# School inbox

Tools that find the new teacher files, get them ready to read cheaply, let the parent sort them, and do the bookkeeping after a lesson is built.
They were made to save tokens: Claude reads short text reports and small contact sheets instead of whole folders and page pictures.

## How a week goes

1. `school-hw` (the downloader) saves new files into `~/Documents/2026-2027/<Kid>/<Subject>/` as `YYYYMMDD-<name>`.
2. **19:00 every day** the inbox check runs (`school-inbox.timer`). For every subject that is **ready** (3 or more new files, or a file waiting 4 days) it
   - sends a private Telegram message through @alex_moller_hw_bot, e.g. «📚 Alex · Math: 13 new → Lesson 4-3 (practice); …», with the link to the sorting page;
   - prepares the files: page pictures, contact sheets, the text layer and OCR (see `prep` below), so nothing has to be done when the session starts.
3. **Sort** (optional, saves the most questions): open **https://mollers-pi.cheetah-krait.ts.net** on the phone or tablet (anywhere, Tailscale app on, no password),
   or http://mollers-pi.local:8770 at home (password), or http://127.0.0.1:8770 on the Pi. Per file: where it goes ("Lesson 4-3"), what it is (homework, slides, answer key, skip…), a note.
   Per page: Use / Skip / Answers / Other lesson, and a note (words that can't be read, what the teacher said). More in "The sorting page" below.
4. **Build**: in a **new** Claude session, write «build inbox g4-math». Claude reads `inbox.py --subject g4-math` (your notes included), the contact sheets and the text,
   then follows the subject's skill. After the lesson: a row in the subject's `SOURCES.md`, `inbox.py done <files>`, `register.py`, commit.
5. **`/clear`** after the lesson is committed: one lesson per session.

Or **build from the sorting page**, without a Claude session: tick the pages to use ("Use for the lesson"; Tick all / none per file;
nothing ticked = all new files of the subject), then in the **Build** bar at the bottom choose New lesson / Update a lesson, write which lesson
and, if needed, what to do, and press **Create / Update lesson**. `build.py` (below) runs it and the bar shows ⏳ → 🛠 → 🔍 → ✅ live / ❌ failed;
the same result comes on Telegram with the commit link. Used pages are unticked and marked "used: <lesson>".

## The sorting page

The page (`sorter.py` + `sorter.html`, always on as `school-sorter.service`) shows the new files of every subject.

| Address                                 | From where                               | Password |
| --------------------------------------- | ---------------------------------------- | -------- |
| https://mollers-pi.cheetah-krait.ts.net | anywhere, Tailscale app on and logged in | no       |
| http://mollers-pi.local:8770            | the home network                         | yes      |
| http://127.0.0.1:8770                   | the Pi itself                            | no       |

As an app (once per device): open the https address in Chrome, ⋮ → "Add to home screen" → Install (only https installs: Chrome refuses plain http).

Per file:

- **Where it goes**: the lesson, e.g. "Lesson 4-3" (the list offers the guesses of `inbox.py` and the lessons already named);
- **What it is**: Lesson pages / slides, Classwork, Homework, Test / quiz, Answer key / model answers, Video, or Skip: nothing to build;
- **Note**: anything Claude should know (what the teacher said, which exercise is for which day).

Per page (under each page picture; tap a picture to see it big): **Use** / **Skip** / **Answers** / **Other lesson**, a note
(words that can't be read), and the **Use for the lesson** tick for the Build bar. Everything is saved as you type ("Saved ✓").
**Other lesson** = this page belongs to a different lesson than the file (type which one in "Which lesson?").
**📌 Keep for later** = the page still has something to build (e.g. half homework, half lesson): `inbox.py done` leaves a file with a 📌 page
in the inbox; untick 📌 once the page is fully used.

A subject whose files are not prepared yet (no page pictures) has a **Prepare page pictures** button: it runs `prep` (pictures, text, OCR) on the Pi.
The notes go to `~/.local/share/school-inbox/notes.json` and are printed by `inbox.py --subject <id>`, so «build inbox <id>» follows them.

## Review mode (notes from the app)

To write down what is wrong in a lesson while looking at it on the tablet, without a Claude session:

1. **Turn it on**: on any page of the app, **tap the page title** (the big heading at the top) or, in an exercise, **the line "… · 1/10"** at the top, **6 times quickly** (less than 1 s between taps;
   from the 3rd tap "3 more taps", "2 more taps"… show). Then "Review mode on" shows and a
   **✎** button appears in the corner. It stays on for this device and browser (every page, after reloads) until you tap a title 6 times again ("Review mode off").
   The children's tablets never see it unless someone turns it on there.
2. **Write a note**: go to the slide or exercise that is wrong, press **✎**, write what is wrong and what it should be, **Send**.
   The note keeps the page, its title and what was on screen (the slide or part, the headings in view, text you selected just before).
3. The note goes to the sorting page on the Pi ("Note sent ✓"): from the app on GitHub Pages to https://mollers-pi.cheetah-krait.ts.net
   (the Tailscale app must be on), from the local test server to http://127.0.0.1:8770. When the Pi can't be reached, it says
   "Saved here", waits on the device (a number on the ✎ button) and is sent by itself later.
4. **Fix**: in a new Claude session, write «fix review notes». Claude runs `review.py`, fixes each note with its subject's skill, commits,
   then `review.py done <ids>`. One subject per session.

```bash
python3 .claude/scripts/inbox/review.py              # the open notes, by page
python3 .claude/scripts/inbox/review.py --all        # the fixed ones too
python3 .claude/scripts/inbox/review.py done <id>... # mark as fixed
```

The notes are kept in `~/.local/share/school-inbox/review.json`. Only the app's own sites (GitHub Pages, the local test server) may send them.

## Why: where the tokens went (Nov 2–20, 26 sessions)

- 5,190 million tokens were re-read from the cache, 103 million new input, 19 million output. Every tool call sends the whole conversation again.
- Seven sessions grew to 800–2,060 requests and ~965,000 tokens of context: near the end, every small command cost about a million tokens.
- 3,745 pictures were opened (mostly single book pages, crops, screenshots), ~1,500 tokens each, and each stayed in the context for the rest of the session.
- What was changed because of it:
  - CLAUDE.md went from 38,500 to ~8,500 characters: each subject's rules moved into its skill (loaded only when that subject is built).
    New skills: `religion-lesson`, `ukr-reading`, `speed-reading`; `arabic-hw-tests` became `arabic`.
  - One lesson per session; text and contact sheets before page pictures; never re-open a page (rules in CLAUDE.md "Workflow").
  - Scripts for the finding, preparing, sorting and bookkeeping (below).
- Ideas not built yet: lesson scaffolds per engine (no re-reading of the model lesson), a translation memory (reuse `en` / `uk` / `ar` already written),
  a cheaper model (`/model sonnet`) for mechanical steps.

## The scripts (`.claude/scripts/inbox/`)

| File                  | What it does                                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `inbox.py`            | Finds the new files per subject, guesses lesson and kind, prints the report with the parent's notes                         |
| `prep.py`             | Contact sheets, page pictures, `text.txt` (text layer), `ocr.txt` (Tesseract), video frames                                 |
| `sorter.py` + `.html` | The sorting page (local web server, password from the network)                                                              |
| `review.py`           | The parent's review notes from the lesson pages (sent to the sorting page), listed for Claude                               |
| `register.py`         | After a lesson: the `also` list in `games.js`, the offline check, the `sw.js` VERSION bump                                  |
| `subjects.json`       | The settings (below)                                                                                                        |
| `done.txt`            | Every file already used (one path per line). Committed with the lesson that used it                                         |
| `build.py`            | Runs the page's Create / Update lesson jobs: Claude in a worktree, checks, push to main, Telegram                           |
| `systemd/`            | `school-inbox.service` + `.timer` (19:00), `school-sorter.service` (the page, always on), `school-build.service` (the jobs) |

Commands (from the repo root):

```bash
python3 .claude/scripts/inbox/inbox.py                     # report of all new files (Markdown)
python3 .claude/scripts/inbox/inbox.py --subject g4-math   # one subject
python3 .claude/scripts/inbox/inbox.py --json              # the same as JSON
python3 .claude/scripts/inbox/inbox.py prep g4-math        # prepare its new files (pictures, text, OCR)
python3 .claude/scripts/inbox/inbox.py done <file>...      # mark files as used
python3 .claude/scripts/inbox/inbox.py done --subject g4-math   # mark all new files of a subject as used
python3 .claude/scripts/inbox/inbox.py --telegram [--prep] # what the 19:00 run does

python3 .claude/scripts/inbox/register.py add grade-4/math/index.html <files / picture folders>
python3 .claude/scripts/inbox/register.py check [<hub> | <folder>]
python3 .claude/scripts/inbox/register.py bump "French Grade 3 Unité 3"   # then commit sw.js alone

python3 .claude/scripts/inbox/sorter.py --set-password     # in a terminal; then: systemctl --user restart school-sorter
```

## Settings: `subjects.json`

```json
{
  "root": "~/Documents/2026-2027",
  "ignore": [], // folders never scanned (relative to root)
  "ignoreGlobs": ["*/ebook/*", "*/out[0-9]*.png"], // working files: video frames Claude extracted
  "rules": { "minFiles": 3, "maxAgeDays": 4, "buildBudgetUsd": 10 }, // "ready" for the Telegram message; dollars per build job
  "subjects": [
    {
      "id": "g4-math", // used in «build inbox g4-math» and --subject
      "kid": "Alex",
      "name": "Math",
      "folders": ["Alex/Math"], // watched folders (all files below them)
      "booklets": ["Science"], // optional: words that pick this subject's files out of <Kid>/!booklets/
      "app": "grade-4/math", // the app folder (its SOURCES.md is the log)
      "skill": "math-lesson", // the skill to build with
      "ocr": "eng" // Tesseract languages: eng, ara, fra+eng
    }
  ]
}
```

- **Add a subject**: one more entry. Files in folders that no subject watches are listed under "Not watched" in the report (only counted).
- **Change a subject** (e.g. English moves to a new term folder): edit its `app`; the id stays, so the notes and `done.txt` still match.
- A subject without a `skill` is watched and reported, but «build inbox» and the Build bar have no rules for it yet: build it in a normal session.
- Not watched: Lucas Math, Optima, Music, Speech, projects.
- Baseline (2026-11-20): every file there was then counts as used, except `Alex/Arabic/book/`.

The subjects now:

| id             | Kid   | Subject        | Watched folder      | Booklet words                | App folder                             | Skill                   | OCR     |
| -------------- | ----- | -------------- | ------------------- | ---------------------------- | -------------------------------------- | ----------------------- | ------- |
| `g4-english`   | Alex  | English        | `Alex/English`      | English, Classwork, Homework | `grade-4/term-2/english`               | `english-lesson`        | eng     |
| `g4-math`      | Alex  | Math           | `Alex/Math`         |                              | `grade-4/math`                         | `math-lesson`           | eng     |
| `g4-science`   | Alex  | Science        | `Alex/Science`      | Science                      | `grade-4/science`                      | `science-lesson`        | eng     |
| `g4-ss`        | Alex  | Social Studies | `Alex/S.S.English`  | Social Studies               | `grade-4/social-studies`               | `social-studies-lesson` | eng     |
| `g4-french`    | Alex  | French         | `Alex/French`       |                              | `grade-4/term-1/french`                | `french-lesson`         | fra+eng |
| `g4-arabic`    | Alex  | Arabic         | `Alex/Arabic`       |                              | `grade-4/term-1/arabic`                | —                       | ara     |
| `g4-ss-arabic` | Alex  | SS Arabic      | `Alex/SSArabic`     |                              | `grade-4/term-1/social-studies-arabic` | —                       | ara     |
| `g4-religion`  | Alex  | Religion       | `Alex/Religion`     |                              | `grade-4/term-1/religion`              | —                       | ara     |
| `g4-computer`  | Alex  | Computer       | `Alex/Computer`     | Computer                     | `grade-4/computer`                     | `computer-lesson`       | eng     |
| `g3-english`   | Lucas | English        | `Lucas/English`     | English                      | `grade-3/term-1/english`               | `english-dictation`     | eng     |
| `g3-french`    | Lucas | French         | `Lucas/French`      |                              | `grade-3/term-1/french`                | `french-lesson`         | fra+eng |
| `g3-arabic`    | Lucas | Arabic         | `Lucas/Arabic`      |                              | `grade-3/term-1/arabic`                | `arabic`                | ara     |
| `g3-religion`  | Lucas | Religion       | `Lucas/Religion`    |                              | `grade-3/term-1/religion`              | `religion-lesson`       | ara     |
| `g3-computer`  | Lucas | Computer       | `Lucas/Computer`    | Computer                     | `grade-3/computer`                     | —                       | eng     |
| `g3-science`   | Lucas | Science        | `Lucas/Science`     | Science                      | `grade-3/term-1/science`               | —                       | eng     |
| `g3-ss`        | Lucas | Social Studies | `Lucas/S.S.English` | SS                           | `grade-3/term-1/social-studies`        | —                       | eng     |

## Where things are kept

| What                         | Where                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| Prepared files               | `~/.cache/school-inbox/<Kid>/<Subject>/<file>/` (`sheet-N.jpg`, `pages/p-N.jpg`, `text.txt`, `ocr.txt`) |
| The parent's sorting notes   | `~/.local/share/school-inbox/notes.json`                                                                |
| The page password (hash)     | `~/.local/share/school-inbox/password` (PBKDF2, readable by you only)                                   |
| OCR languages                | `~/.local/share/tessdata/` (eng, ara, fra, ukr from tessdata_best)                                      |
| Telegram bot token and owner | from `school-hw`: keyring `telegram-homework` / `Alex`, `var/telegram/owner.json`                       |
| Page cache (not in git)      | `.claude/scripts/inbox/.cache.json` (page count and first text per file)                                |

## Build jobs (`build.py`)

A press on Create / Update lesson saves `~/.local/share/school-inbox/jobs/<id>.json` and starts `school-build.service`, which runs the queued jobs one at a time:

1. a fresh git worktree from `origin/main` in `~/.cache/school-inbox/build/<id>`: your own checkout and its uncommitted files are never touched;
2. `claude -p` («build inbox <id>» + the job: lesson, your text, the ticked pages) with the subject's skill. The press is the approval: it does not ask,
   commits the lesson and the `sw.js` bump, never pushes (blocked). At most `rules.buildBudgetUsd` dollars (subjects.json) and 90 minutes per job;
3. the script itself checks the commits: only files in the subject's app folder + `games.js`, `sw.js`, `done.txt`; Prettier; `node --check`; `register.py check`; `sw.js` bumped;
4. all good: rebased on `origin/main` and **pushed to main** (live on the tablets), the worktree removed. Anything wrong: nothing pushed,
   the worktree and the branch `build/<id>` stay (named in the Telegram message) for a look in a normal session.

After a job pushed, your own checkout is behind: `git pull --rebase` before your next push.

```bash
python3 .claude/scripts/inbox/build.py --list                 # the jobs and their status
cat ~/.local/share/school-inbox/jobs/<id>.log                 # what Claude did (one line per step)
journalctl --user -u school-build -n 20 --no-pager            # the runner itself
git worktree list; git worktree remove --force <path>; git branch -D build/<id>   # after looking at a failed job
```

Sign-in: the runner uses the Claude Code CLI (`~/.local/bin/claude`) and its login, which ends every few weeks. For a login that lasts,
run `claude setup-token` once in a terminal and put the token into `~/.local/share/school-inbox/claude.env` as
`CLAUDE_CODE_OAUTH_TOKEN=…` (`chmod 600`); `school-build.service` reads that file.

## Services

```bash
systemctl --user list-timers school-inbox.timer          # next 19:00 run
systemctl --user start school-inbox.service              # run the check now (sends the Telegram message if ready)
journalctl --user -u school-inbox -n 20 --no-pager       # what the last run did
systemctl --user restart school-sorter                   # after a password change
journalctl --user -u school-sorter -n 5 --no-pager       # the page's start line
cp .claude/scripts/inbox/systemd/*.service ~/.config/systemd/user/ && systemctl --user daemon-reload   # after a unit changes
```

Who needs the password: the Pi itself, never; your own devices through Tailscale, never (`tailscale serve` passes on your Tailscale login,
and the page compares it with the Pi's owner); the home network and anyone else, always (any user name; a wrong one waits 1 s).
Without a password set, `--lan` keeps the home address on the Pi only.

Tailscale (`tailscale serve --bg 8770`, set once, survives reboots): https://mollers-pi.cheetah-krait.ts.net, reachable only from devices
logged into your Tailscale account. `tailscale serve status` shows it; `tailscale serve reset` turns it off.
Never `tailscale funnel` without checking the password rules above first: funnel opens the page to the whole internet.
