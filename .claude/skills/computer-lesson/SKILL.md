---
name: computer-lesson
description: Build or update Grade 4 Computer lessons (grade-4/computer/chapter-N/lesson-M.js) for the school-tests study games from the e-book screenshots in ~/Documents/2026-2027/Alex/Computer/ (unit-N/ folders, book figure PNGs), the school videos and the class work / homework sheets in Term N/. Use this whenever the user sends or mentions Computer book screenshots, a Computer unit or lesson ("Unit 3", "Forward an email", "Lesson 2 Images and graphics"), a Computer video or CW / HW sheet for Alex, asks to add, update or check Computer lessons, Mini Windows / Mini Word / Mini Outlook / Mini Edge practice, or asks which Computer pages are already built, even if they don't say "lesson".
---

# Computer lessons (Grade 4)

The rules live in `CLAUDE.md` ("Workflow", "Formatting", "Offline cache") and the format in `README.md` ("Computer lessons (Grade 4)", "… chapter 2 and Mini Word for Grade 4", "Mini Outlook and Mini Edge"). Read those first.
The newest finished chapter is the model: copy its lesson shape (header comment, `window.LESSON` with `question`, `words`, `ideas`, `howto`, `games`, `exercises`).

Alex has aphasia and is learning to read again: everything is read aloud, short sentences, key words in `[brackets]`, a picture on every card and question. The computer steps are practised on a pretend program, never only described.
The user (the parent) reads the code and reviews every stage: build **one lesson at a time** unless told to do a batch, show it, wait for approval before committing.

## 1. Find what is new

- Read `grade-4/computer/SOURCES.md`, `TODO.md` and `UNVERIFIED.md`. Unit 1–2 sources are in the header line of each `chapter-1|2/lesson-N.js` ("book pages 9–19, CW1, HW1").
- List the source folders (`~/Documents/2026-2027/Alex/Computer/`: `unit-N/`, `chapter-N/`, `Term N/`, loose `.mp4`) and compare. Build only what is not in `SOURCES.md`; tell the user which ones are already built.
- A book unit = a `chapter-N/` folder (Unit 3 → `chapter-3/`); a book lesson = `lesson-M.js` + `.html`.

## 2. Read the sources

The e-book comes as **scroll screenshots** (`unit-N/<k>/outN.png`, 1187×974, heavy overlap between shots; folder 1 = unit opener, then one folder per lesson) plus **high-res figure crops** (`unit-N/lu_g4_se_final_pageNN[-k].png`, 1920 wide, named by the printed book page). Read them as contact sheets, 6 shots per sheet, in number order (`out2` comes after `out1`, not after `out19`):

```bash
python3 -I - <scratchpad> <<'EOF'   # run from the unit folder; writes <scratchpad>/u/f<k>-NN.jpg
import glob, sys
from PIL import Image
S = sys.argv[1]
for d in sorted(glob.glob('[0-9]*')):
    fs = sorted(glob.glob(d + '/out*.png'), key=lambda x: int(x.split('out')[1][:-4]))
    for i in range(0, len(fs), 6):
        sheet = Image.new('RGB', (1200, 3 * 490), 'white')
        for j, f in enumerate(fs[i:i + 6]):
            sheet.paste(Image.open(f).convert('RGB').resize((594, 487)), ((j % 2) * 600, (j // 2) * 490))
        sheet.save(f'{S}/u/f{d}-{i // 6 + 1:02d}.jpg', quality=75)
EOF
```

Each page has a "Page N" tag: log the printed page numbers. Note while reading:

- **Learn content**: the lesson's yellow question (→ `question.q`), the text sections (→ `ideas`, retold in short lines), the bold key words (→ `words`), each blue "N.N.N To …" box (→ one `howto`, its steps = the box's numbered steps), the speech bubbles, Be Safe / Smart Tip / History boxes (→ idea cards).
- **Hands on!** pages are interactive in the e-book. The screenshots show them unanswered: True / False and "Choose the best answer" have no key on the page. Give the answer from the lesson text, `// unverified` and a row in `UNVERIFIED.md`. **Closed dropdowns** don't show their choices: ask the user for a screenshot, or (if told so) write likely choices and mark them unverified.
- "Write your answer in your notebook" prompts and "Enter your answer" boxes → `open` with a model answer. "Draw in your notebook" → left out, listed in `SOURCES.md`.
- **Book mistakes** (a heading that belongs to another lesson, a typo in a question like "used it Outlook"): fix plain ones, list them in the file header and the report.
- **Never guess** words that are cut off or covered: list them and ask.

## 3. Pictures

Crop from the high-res figure PNGs first (1920 wide, clean), the scroll shots only when there is no figure PNG. The figure PNGs have a **transparent background**: paste them on white (`Image.new("RGB", im.size, "white").paste(im, mask=im.getchannel("A"))`), or `convert("RGB")` turns it black. PIL, JPEG quality 82: screenshots of the program ~700–900 px wide, characters and small icons ~300–400 px. Check a contact sheet for cut text or bits of the next figure. Save in `chapter-N/img/lesson-M/` with short names (`new-contact.jpg`, `forward.jpg`). The unit opener picture (Figure 3.1) is a good cover for Lesson 1.
School videos: `chapter-N/video/lM-<name>.mp4` + a poster `.jpg` (ffmpeg command in README). Videos are online only: never in `also`.

## 4. Write the lesson

Header comment: `// Computer · Grade 4 · Unit N · Lesson M « Title » (book pages A–B[, CW…, HW…]).` plus any book mistakes fixed. Fields: `n`, `grade: 4`, `title`, `unit: "Unit N · Lesson M"`, `book: "Book pages A–B"`, `cover`, `question {q, a, img}`, `words`, `ideas`, `howto`, `games`, `exercises` (`from: "Book p. 104 · Hands on 1"` or `"School · CW1"`).

The pretend program is the one the page loads (one per page; the engine takes `window.WinSim || window.WordSim || window.NetSim`):

| Book unit           | Program                  | Files                          |
| ------------------- | ------------------------ | ------------------------------ |
| Unit 1 (Windows)    | Mini Windows             | `chapter-1/winsim.js` / `.css` |
| Unit 2 (Word)       | Mini Word                | `shared/wordsim.js` / `.css`   |
| Unit 3 (email, web) | Mini Outlook + Mini Edge | `shared/netsim.js` / `.css`    |

The targets each program knows are listed at the top of its `.js` (and in `TARGETS` for netsim, which `check.js` uses). A how-to the program can't do yet needs a program change first: add it, show it to the user as its own stage, and make sure the older lessons still play (`play.sh` on them).

- Every book box = a `howto` with a `start` that puts the program where the book's figure starts, its `img` = the book's figure, `code` = the box number ("3.2.1").
- Games: the lesson's buttons (`mc` with button pictures), true / false, put the steps in order (`order` with `howto`), and 2–3 `sim` "Do it" missions.
- Exercises: every Hands on task in the book's order, one exercise per numbered group; book tasks that are "do it on the computer" become `sim` items when the program can do them, otherwise `open` with the steps as the model answer.
- Exercise items are shuffled unless the exercise has `keep: true`; mc options are shuffled (the right one first).

## 5. Check

Run from the repo root (`S=.claude/skills`):

```bash
node $S/computer-lesson/scripts/check.js grade-4/computer/chapter-3 lesson-1.js   # pictures, files, steps, targets, lists
$S/english-lesson/scripts/play.sh grade-4/computer/chapter-3 lesson-1.html        # every game and exercise to its score screen
$S/english-lesson/scripts/shot.sh grade-4/computer/chapter-3 <out.png> lesson-1.html learn "" ""   # screenshot; Read the png
npx --no-install prettier --write <changed files>; node --check <each .js>
```

`check.js` must pass (notes about lessons.js / games.js are fine until the offline stage). `play.sh` must print a step count for every tile and no `STUCK` or `ERRORS`; Mini Outlook / Edge `sim` items are solved by the harness (`#simbox.__sim.solve()`), Mini Word and Mini Windows `sim` items still show `STUCK` there: try those by hand. Then open the page on the local server and do each how-to with ▶ Show me and ✋ Your turn, with real taps (hold = right-click on a tablet). Headless Chromium has no voices: the read-aloud is not tested; say so.

## 6. Logs, list, report

- `grade-4/computer/SOURCES.md`: every screenshot folder / figure / sheet / video → `lesson-M.js · key` and **built** / skipped (why) / waiting. `TODO.md`: what waits for the user (dropdown choices, a missing page). `UNVERIFIED.md`: every answer without a key (Hands on without "Show Correct Answer", likely dropdown choices, model answers).
- `grade-4/computer/lessons.js`: the chapter (`{n, dir: "chapter-N", title, items}`) and the lesson card (`note`: "N picture cards · N how-to's in Mini … · N games · N exercises").
- Report: what was built (by book page), what was checked, decisions the user should know (unverified answers, book mistakes fixed, left-out tasks), then wait for approval. Commit when approved, one commit per lesson (no Co-Authored-By line); program changes in their own commit.

## 7. Offline, at the end of a batch

Add every new file and picture (not videos) to `also` of the Computer entry in `games.js` (and `shared/netsim.*` to CORE in `sw.js` if it is new), update `countLabel` and `topics`, then:

```bash
node .claude/skills/english-lesson/scripts/offline-check.js grade-4/computer   # 0 missing, 0 not listed (except video/)
```

Commit that, then bump `VERSION` in `sw.js` in its own last commit. Don't push unless the user asks.
