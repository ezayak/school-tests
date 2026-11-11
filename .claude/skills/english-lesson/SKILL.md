---
name: english-lesson
description: Build Grade 4 English lessons and stories for the school-tests study games from the term booklets (Classwork / Homework Booklet PDFs in ~/Documents/2026-2027/Alex/!booklets/) and other English sources. Use this whenever the user sends or mentions new English booklet pages, scans, a Wonders week ("Unit N Week M"), a reading text, poem, comprehension or dictation sheet for Alex, asks to add, update or check English lessons, stories or dictations, or asks what English pages are already built or still missing, even if they don't say "lesson".
---

# English lessons and stories (Grade 4)

The rules live in `CLAUDE.md` ("English (Grade 4): lessons and stories", plus "Workflow", "Formatting" and "Offline cache") and the formats in `README.md` ("English lessons (Grade 4)", "English stories"). Read those sections first. This skill is the working procedure on top of them, plus the scripts and the lessons learned from building Term 2.

Alex is learning to read again: everything is read aloud, and every item needs a picture. The user (the parent) reads the code and reviews every stage, so work in small stages, show what was built, and wait for approval before committing.

## 1. Find what is new

- Read the term's `SOURCES.md`, `TODO.md` and `UNVERIFIED.md` (`grade-4/term-N/english/`). Term 1 sources are in the `// Sources:` line at the top of each file.
- List the source folders and compare. Build only pages that are not in `SOURCES.md`; tell the user which ones are already built.
- A scan for a `TODO.md` row: build that task, mark it built, remove the row.

## 2. Read the pages

Page numbers: the user's book pages ("the story on p. 174") are the numbers printed in the book, not PDF pages; find the offset by rendering a few pages and reading the printed number (it changes through the book), and log book pages by the printed number. Booklet pages are the PDF page (= the bottom-centre number). Huge scanned pages: render with `-scale-to 1100` instead of `-r`.

The booklet scans have no text layer (`pdftotext` returns only page numbers). Render and look at them:

```bash
pdftoppm -r 110 -f 15 -l 31 -png "<booklet>.pdf" <scratchpad>/cw/p   # then Read each PNG
```

110 dpi is readable and cheap; use `-r 300` only for cropping pictures. Page numbers are the PDF page = the number printed at the bottom centre. Read every page before planning: the week's pages run from its divider (or "Talk About It" page) to the next one.

Sort each page (rules in CLAUDE.md): texts → stories; grammar / phonics / spelling / vocabulary / strategy pages → exercises of the week's lesson; tense or word charts → lesson decks; skip covers, dividers, fluency charts, pages printed in both booklets. Note while reading:

- **The Essential Question** comes from the "Talk About It" page. The engine needs `question.q`. If there is no such page, write a stand-in, say so in the file header, and add rows in `TODO.md` and `UNVERIFIED.md`. Don't present it as the book's.
- **Excerpts printed on the page** ("Read this excerpt from …"): if the task only needs the printed lines, build it from them. A task that needs the whole text (writing frames, summaries) goes to `TODO.md`.
- **Sheets that quote a story differently** from the story itself: build the sheet as printed, and tell the user.
- **Teacher typos**: fix plain ones, list them in the file header and in the report. Header mistakes (a sheet saying the wrong week) go in `SOURCES.md`.
- **Two right answers** (smelt / smelled; two words with a silent letter): accept both. Use an mc option "Both are right." with an `x` that explains, or put both words in a `tapw` `ans`. Note it in `UNVERIFIED.md`.
- **Never guess** words that are missing or unreadable: list them and ask.

## 3. Pictures

Crop from a 300-dpi render with PIL (scale the 110-dpi coordinates by 300/110). Check a contact sheet for cut-off edges before saving. Save as JPEG: covers and text pictures ~700 px wide, small clip-art ~350–500 px. One folder per story (`img/<name>/`) and per lesson (`img/unitN-weekM/cover.jpg`). Pictures without a scan: `vis: SC(bg, items, cap)` scenes or `emoji` (1–2 emoji).

Scene notes: backgrounds are `sky night room grass stage school rain plain`. Bubble colours are `good bad plain light`, and `light` (white text) is only for dark backgrounds (`night`). Use `Kit.blocks` with `legend: false` when the clause legend would label the wrong things.

## 4. Write the files

Copy the newest finished week as the model (`grade-4/term-2/english/unit3-week5.js` and `story-food-thought.js` at the time of writing): helper functions at the top (`SC`, `cj`, and small builders for repeated item pairs), then `window.LESSON`, then `(window.EN_DATA = window.EN_DATA || {}).u<unit>w<week> = window.LESSON;`. HTML: copy an existing page and change only the `.js` and `<title>`.

Header fields: `key: "en4-uNwM"`, `n` = previous lesson's `n` + 1, `unit`, `hub: "../../term-1/english/index.html"` (from a later term), `imgDir`, `cover: "cover"`, `question`. Stories: `lesson: {path, label}` and `hub`.

Things the engines do that are easy to trip over:

- **Exercise items are shuffled** unless the exercise has `keep: true`. Set it whenever items come in pairs (tap, then choose) or the booklet order matters.
- **mc options are shuffled**; the right one is first. `keep: [...]` on an item fixes a list like tense names.
- **Story questions are always shuffled** and don't support `keep`. Story `gloss` keys must be **single words** (the word under the finger is looked up).
- **`tapw`**: each `ans` key is one word, normalised (punctuation stripped, lower case). A word that appears twice in the text counts once and lights up everywhere. Pick keys that occur once, or reword the task (e.g. "tap the second part" for split compound words). In a sentence with other verbs (got, rang…), "underline the verb" works better as "name the tense" with the verb in `x`.
- **Open questions** (writing tasks, text-evidence questions) get a model answer, a picture, and a `// unverified` comment.
- Use **they/them** or names for people in texts and models; don't guess pronouns.

## 5. Check

Run these from the repo root (`S=.claude/skills/english-lesson/scripts`):

```bash
node $S/check.js grade-4/term-2/english unit3-week5.js   # pictures, files, tapw answers, story rules, unused pictures
$S/play.sh grade-4/term-2/english unit3-week5.html       # plays every game and exercise to its score screen
$S/shot.sh grade-4/term-2/english <out.png> unit3-week5.html ex 1 x-cspell   # screenshot; then Read the png
npx --no-install prettier --write <changed files>; node --check <each .js>
```

`play.sh` must print `N steps` for every tile and no `STUCK` or `ERRORS`. Open items count 0 steps; that's fine. If something is stuck, take a screenshot of that tile to see why: it may be the harness, which drives taps, mc, sort, match, order tiles and the Help button. Look at a few screenshots (the lesson home, a deck card, a long tap text, each story's first page) for cut text and unreadable bubbles. Headless Chromium has no voices, so the read-aloud is not tested; say so.

## 6. Logs, list, report

- `SOURCES.md`: every page row → `file · key` and **built** / skipped (why) / waiting. `TODO.md`: one row per missing thing, starting with "Booklet · page". `UNVERIFIED.md`: a row for every answer without a school key (and stand-ins).
- `grade-4/term-1/english/dictations.js`: a `kind: "Lesson"` entry and `kind: "Story"` entries, with `term: N` and paths `"../../term-N/english/…"`.
- A dictation sheet ("Dictation-UnitN-WeekM.pdf") is not a lesson: it is a data file for `shared/spelling.js` (README "English dictations"), a `kind: "Dictation"` entry with its `date`, a `SOURCES.md` row. Check every Learn card in a screenshot (picture, highlighted suffix or sound) and one typed answer.
- Report to the user: what was built (by booklet page), what was checked, and the decisions they should know about (stand-ins, excerpts, two-answer items, sheet quotes, typos), then wait for approval.
- Commit the stage when approved: content in one commit (no Co-Authored-By line; `git -c user.name=Olena -c user.email=ezayak@gmail.com commit` if no identity is set). Formatting-only changes go in their own commit.

## 7. Offline, at the end of a batch

Add every new file and picture to `also` of the Grade 4 English entry in `games.js`, update `countLabel` and `topics`, then check:

```bash
node $S/offline-check.js grade-4/term-2/english   # 0 missing, 0 not listed
```

Commit that, then bump `VERSION` in `sw.js` in its own last commit. Don't push unless the user asks.
