---
name: social-studies-lesson
description: Build or update Grade 4 Social Studies lessons and stories (myWorld Interactive 4, grade-4/social-studies/chapter-N/lesson-M.js, story-*.js) for the school-tests study games from the term booklets (exercise sheets) and the book scans in ~/Documents/2026-2027/Alex/S.S.English/. Use this whenever the user sends or mentions a Social Studies booklet, exercise sheet, book pages, a chapter or lesson ("Chapter 2 Lesson 3", "A New Nation", "Civil War"), a citizenship or history story for Alex, asks to add, update or check Social Studies lessons, or asks which Social Studies pages are already built, even if they don't say "lesson".
---

# Social Studies lessons and stories (Grade 4)

The rules live in `CLAUDE.md` ("Social Studies (Grade 4): lessons and stories", plus "Workflow", "Formatting" and "Offline cache") and the format in `README.md` ("Social Studies lessons (Grade 4)", "English stories" for the story format). Read those first. This skill is the working procedure on top of them. The model to copy is `grade-4/social-studies/chapter-1/lesson-4.js` with its story `story-douglas.js`.

Alex has aphasia: the parent explains every question by pointing at pictures. So the book's text is retold **in easy words** on picture cards (one idea per card, 1–3 short sentences, the key words in `[brackets]`), **every question has a picture, every answer has a picture or an emoji, and every sentence answer has an explanation (`x`)**.
The user reads the code and reviews every lesson: build one lesson, show it, wait for approval before committing.

## 1. Find what is new

- Read `grade-4/social-studies/SOURCES.md`, `TODO.md`, `UNVERIFIED.md`. Term 1 lessons (1–3) list their sources in their header comments.
- List `~/Documents/2026-2027/Alex/S.S.English/` (booklets, `Term N/` sheets, `book/`) and `~/Documents/2026-2027/Alex/!booklets/` and compare. Build only what is not in `SOURCES.md`; tell the user what is already built. The Term 2 booklet is in both folders (the same file).

## 2. Read the sources

- **Booklets** have a text layer: `pdftotext -layout <pdf> -` gives the questions; render the pages too (`pdftoppm -r 70 -png`) to see pictures, colouring pages and word searches. Each exercise sheet says "Lesson (N) <title>" at the top; the contents page (p. 2) says which chapter. Booklet page = PDF page = the number at the bottom right.
- **The book** (`book/NNN.png`, myWorld Interactive 4) is two-page spreads, readable at full size: Read the PNG. The table of contents is on spreads 004–006 (Chapter 1 on 004, Chapters 2–3 on 005). Spread `n` = pages 2(n−27) and 2(n−27)+1 in Chapter 1, 2(n−28) and 2(n−28)+1 in Chapter 2; the scan repeats some spreads (047 = 048), so always read the printed page number. Log book pages by the printed number.
- A lesson = the book lesson (its opener page to the Lesson Check), plus the booklet's exercise sheet for it, plus any school sheet for it. A book lesson the booklet skips but a later lesson needs (Ch2 L1) is built from the book only, with `term: "2*"` (its card says "Term 2*": not in the booklet); its Exercises tab has only the book questions. The book's Literacy / Map Skills pages after a lesson are reading skills: skip them unless the booklet asks about them.
- **Stories to know**: the Citizenship pages (a person who changed things), Primary Source pages that tell a story, and history narratives the booklet asks about (people, events). They become story pages (§4b), linked from their lesson. Their "Find Out More" questions are left out.
- Words missing or unreadable: never guess; list them and ask.

## 3. Pictures

One script per lesson writes all its pictures: `scripts/pictures/chapter-N-lesson-M.py` (copy `chapter-1-lesson-4.py`), run from the repo root with `python3 -I`. It uses `draw.py` from the Science skill (canvas, arrow, label, save).

1. **Book crops**: `crop(spread, (x0, y0, x1, y1), OUT, name)` on the 1368×858 PNG. Leave out the page footer ("28 Chapter 1 • …", y ≳ 812), the vertical copyright line next to the fold, and captions. Book photos are small (200–650 px): use them as they are, don't enlarge.
2. **Booklet pictures** (Irrigation, the First Continental Congress): render the page with `pdftoppm -r 150` inside the script and crop.
3. **Explanation drawings** (`e-*.jpg`, 720×440) for an idea the book has no picture of (a steep roof, a skyway, an aquifer, a scrubber, water treatment): one idea, the part that matters in red, a short label, thick lines (an answer button shows it 180 px wide).
4. **Never a book photo in a picture strip**: a strip shows its pictures tiny (about 60 px). Two things side by side (then / now, two places, two directions) = one 720×440 picture made with `two_pictures(left, right, labels)` from `draw.py` (a photo or an emoji string each) or drawn like `exchange.jpg`. `emoji(im, xy, "🪚🪓", size)` draws colour emoji into a picture.
5. **Emoji**: 1–2 on an answer (`icons`), a strip of emoji only on a card (`vis: {kind: "strip", items: [{e, label}]}`), or an animated scene in a story (`vis: {kind: "scene", …}`, animation names in `Kit.scene`'s comment in `shared/common.js`).

Check every new picture on a contact sheet (PIL, 4 per row) before using it: cut text, footers, labels running off the edge.

## 4a. Write the lesson

Copy `lesson-4.js`: the helpers at the top (`mc`, `two` for the booklet's two-choice questions, builders for repeated answer pairs like `adapt` / `where`, `word` for match pairs), then `window.LESSON`.

- Header comment: book pages, the booklet pages, "no answer key → UNVERIFIED.md", the picture script.
- `n`, `key: "ss4-c<chapter>-l<lesson>"`, `unit: "Chapter N · Lesson M"`, `book: "Book pp. X–Y"`, `cover`, `question` (the book's "Unlock the Big Question" sentence turned into a question, with an easy answer).
- `words`: the book's Vocabulary and Academic Vocabulary (opener page), plus the words the booklet asks about; short easy meanings.
- `ideas`: the book's text in order, one card per idea, in easy words (short sentences, simple verbs, numbers as digits, no idioms). Keep the facts and names the booklet asks about (dates, people, places). A comment with the book page above each group.
- `stories: [{t, en, path, cover: {src}}]`: the lesson's story pages (a tile after the picture cards). A story may use the lesson's pictures (`img/lesson-M/…`); its own pictures go in `img/<name>/`.
- `games`: 3–4 games on the lesson's main points (two-way sorts as `mc` with `two: true`, "what does the job" with picture answers, word ↔ picture `match`).
- `exercises`, in this order, each with `from` and `keep: true` when the booklet order matters:
  - `bk-choose`, `bk-fill`, `bk-tf`, `bk-match`, `bk-answer` …: one per lettered part of the booklet sheet, items as printed (keep the booklet's wording; fix nothing but plain typos, and list them).
  - `check`: the book's Reading Checks and Lesson Check, model answers from the book.
- Item types: choose → `mc` (right first, `two: true` for two choices); fill a gap from a word box → one `mc` per gap with the right word and 2–3 others from the box; ✓ / ✗ "and correct the wrong sentences" → `tf` with `x` = the corrected sentence; match → `match`, 3 pairs per item; a chart of examples → `multi` (choose all); answer / explain / describe → `open` with a model answer; a word search → `wsearch`. Colouring is left out.
- Explanations (`x`) say why the right answer is right, in plain words, with the key word in `[brackets]`.

## 4b. Write a story

Copy `story-douglas.js` / `.html` (the `.html` has `<body data-view="story" data-subject="Social Studies">`). Format: README "English stories".

- `key: "ss4-<name>"`, `subject: "Social Studies"`, `kind` ("Citizenship · … · Book p. 36"), `lesson: {path: "lesson-M.html", label: "Lesson M"}`, `hub: "../index.html"`, `question` (a stand-in: log it in `UNVERIFIED.md`).
- `pages`: the text exactly as printed, a paragraph cut into pages of 2–4 sentences, a picture on each page, one `easy` sentence each (use the person's name rather than guessing anything not in the text). A side label (Quality: Determination) is a `{box, p}`.
- `gloss`: single lower-case words that are in the text (names of places too: "massachusetts").
- `summary`: Who · Where · What happened (2–3 cards) · Message, each with a picture.
- No `questions`: the story page then has no Questions tab.

## 5. Check

```bash
node .claude/skills/science-lesson/scripts/check.js grade-4/social-studies/chapter-1/lesson-4.js   # pictures, answer pictures, explanations, stories, files, offline list
.claude/skills/english-lesson/scripts/play.sh grade-4/social-studies/chapter-1 lesson-4.html        # plays every game and exercise to its score screen
.claude/skills/english-lesson/scripts/shot.sh grade-4/social-studies/chapter-1 <out.png> lesson-4.html learn "" i-13   # a picture card; Read the png
.claude/skills/english-lesson/scripts/shot.sh grade-4/social-studies/chapter-1 <out.png> story-douglas.html            # the story
npx --no-install prettier --write <changed files>; node --check <each .js>
```

`check.js` must say "all checks passed" once the files are in `games.js`. `play.sh` must print `N steps` for every tile and no `STUCK` or `ERRORS` (open items count 0 steps). Look at screenshots of the Learn tab, one card with a drawing, one exercise and every story page. Headless Chromium has no voices: the read-aloud is not tested; say so.
The machine is a Raspberry Pi: run one browser at a time; if Chromium cannot open a page, say so and leave the browser checks for later.

## 6. Logs, list, report

- `SOURCES.md`: every book page and booklet page → `file · exercise key` and **built** / skipped (why) / planned / waiting. `TODO.md`: what waits for a scan or a decision. `UNVERIFIED.md`: every answer without a school key and every stand-in question.
- `lessons.js`: the lesson in its chapter (a new chapter: a `chapter-N/` folder and an entry in `chapters`), with `term: N` (`"N*"` when it is not in the booklet) and a `note` ("17 picture cards · 1 story · 4 games · 4 exercises").
- Report to the user: what was built (by book and booklet page), what was checked, the decisions (stand-ins, wording kept as printed, unclear answers), then wait for approval.
- One commit per lesson (lesson, stories, pictures, picture script, log rows, `lessons.js`). An engine change goes in its own commit first. No Co-Authored-By line.

## 7. Offline, at the end of a batch

Add every new file and picture to `also` of the Social Studies entry in `games.js`, update its `topics` and `countLabel`, then `node .claude/skills/english-lesson/scripts/offline-check.js grade-4/social-studies` (0 missing, 0 not listed). Commit, then bump `VERSION` in `sw.js` in its own last commit. Don't push unless asked.
