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
   Per page: Use / Skip / Answers / Other lesson, and a note (words that can't be read, what the teacher said).
   As an app (once per device): open the https address in Chrome, ⋮ → "Add to home screen" → Install. (Only the https address installs: Chrome refuses plain http.)
4. **Build**: in a **new** Claude session, write «build inbox g4-math». Claude reads `inbox.py --subject g4-math` (your notes included), the contact sheets and the text,
   then follows the subject's skill. After the lesson: a row in the subject's `SOURCES.md`, `inbox.py done <files>`, `register.py`, commit.
5. **`/clear`** after the lesson is committed: one lesson per session.

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

| File                  | What it does                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| `inbox.py`            | Finds the new files per subject, guesses lesson and kind, prints the report with the parent's notes |
| `prep.py`             | Contact sheets, page pictures, `text.txt` (text layer), `ocr.txt` (Tesseract), video frames         |
| `sorter.py` + `.html` | The sorting page (local web server, password from the network)                                      |
| `review.py`           | The parent's review notes from the lesson pages (sent to the sorting page), listed for Claude       |
| `register.py`         | After a lesson: the `also` list in `games.js`, the offline check, the `sw.js` VERSION bump          |
| `subjects.json`       | The settings (below)                                                                                |
| `done.txt`            | Every file already used (one path per line). Committed with the lesson that used it                 |
| `systemd/`            | `school-inbox.service` + `.timer` (19:00), `school-sorter.service` (the page, always on)            |

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
  "rules": { "minFiles": 3, "maxAgeDays": 4 }, // when a subject is "ready" for the Telegram message
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
- Watched now: Alex (Grade 4) English, Math, Science, Social Studies, French, Arabic, SS Arabic, Religion, Computer;
  Lucas (Grade 3) English, French, Arabic, Religion, Computer, Science, Social Studies. Not watched: Lucas Math, Optima, Music, Speech, projects.
- Baseline (2026-11-20): every file there was then counts as used, except `Alex/Arabic/book/`.

## Where things are kept

| What                         | Where                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| Prepared files               | `~/.cache/school-inbox/<Kid>/<Subject>/<file>/` (`sheet-N.jpg`, `pages/p-N.jpg`, `text.txt`, `ocr.txt`) |
| The parent's sorting notes   | `~/.local/share/school-inbox/notes.json`                                                                |
| The page password (hash)     | `~/.local/share/school-inbox/password` (PBKDF2, readable by you only)                                   |
| OCR languages                | `~/.local/share/tessdata/` (eng, ara, fra, ukr from tessdata_best)                                      |
| Telegram bot token and owner | from `school-hw`: keyring `telegram-homework` / `Alex`, `var/telegram/owner.json`                       |
| Page cache (not in git)      | `.claude/scripts/inbox/.cache.json` (page count and first text per file)                                |

## Services

```bash
systemctl --user list-timers school-inbox.timer          # next 19:00 run
systemctl --user start school-inbox.service              # run the check now (sends the Telegram message if ready)
journalctl --user -u school-inbox -n 20 --no-pager       # what the last run did
systemctl --user restart school-sorter                   # after a password change
journalctl --user -u school-sorter -n 5 --no-pager       # the page's start line
```

Who needs the password: the Pi itself, never; your own devices through Tailscale, never (`tailscale serve` passes on your Tailscale login,
and the page compares it with the Pi's owner); the home network and anyone else, always (any user name; a wrong one waits 1 s).
Without a password set, `--lan` keeps the home address on the Pi only.

Tailscale (`tailscale serve --bg 8770`, set once, survives reboots): https://mollers-pi.cheetah-krait.ts.net, reachable only from devices
logged into your Tailscale account. `tailscale serve status` shows it; `tailscale serve reset` turns it off.
Never `tailscale funnel` without checking the password rules above first: funnel opens the page to the whole internet.
