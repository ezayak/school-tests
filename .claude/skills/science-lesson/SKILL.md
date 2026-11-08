---
name: science-lesson
description: Build or update Grade 4 Science lessons (Elevate Science, grade-4/science/topic-N/lesson-M.js) for the school-tests study games from the term booklets, the teacher's presentations and the school sheets in ~/Documents/2026-2027/Alex/Science/. Use this whenever the user sends or mentions a Science booklet, practice sheet, Lesson Quiz, teacher's slides, graded homework or classwork for Alex, asks to add, update or check Science lessons or exercises, or asks which Science pages are already built, even if they don't say "lesson".
---

# Science lessons (Grade 4)

The rules live in `CLAUDE.md` ("Science (Grade 4): lessons", plus "Workflow", "Formatting" and "Offline cache") and the format in `README.md` ("Science lessons (Grade 4)"). Read those first. This skill is the working procedure on top of them, the scripts, and what was learned building the Term 2 booklet.

All 30 lessons of the book (Topics 1–8) are built, with the book's Lesson Check as "Book questions". New sources add **exercises** (and sometimes picture cards or key words) to an existing lesson; they don't make new lessons.

Alex has aphasia: the parent explains every question by pointing at pictures. So **every question has a picture that explains it, every answer has a picture or an emoji, and every answer that is a sentence gets an explanation (`x`)** shown after it is chosen. This applies to the lessons being built or updated; the older lessons are not fixed unless the user asks.

## 1. Find what is new

- Read `grade-4/science/SOURCES.md`, `TODO.md`, `UNVERIFIED.md`. Term 1 sources are in the header comments of `topic-1/lesson-N.js`.
- List `~/Documents/2026-2027/Alex/Science/` (and `Term N/`) and compare. Build only what is not in `SOURCES.md`; tell the user what is already built.

## 2. Read the sources

- Booklets and sheets usually have a text layer: `pdftotext -layout <pdf> -` gives the questions; still render the pages (`pdftoppm -r 80 -png`, two pages side by side) to see the pictures, tables and empty label boxes.
- Each sheet says its lesson at the top ("Topic 3 / Lesson 1: Properties of waves"). Booklet page = the PDF page = the number printed at the bottom.
- Teacher's slides (`20261107-L1-WAVE PROPERTIES.pdf`) have the answers filled in: those answers are verified. Slides that copy book pages are skipped (say so in `SOURCES.md`).
- The book: `book/NA_Elevate_Gr4_T<topic>.pdf` (text layer). Use it to check wording and answers (e.g. thorns are "on plant leaves or stems", "Roses have prickles"). Cite **printed** page numbers: split `pdftotext` output on `\f` and read the 3-digit number on that page.
- Words missing or unreadable: never guess; list them and ask.

## 3. Pictures

Three kinds, in this order of preference:

1. **Explanation drawings** (`e-*.jpg`, 720×440): one idea per picture, the part that matters in red, a short label ("crest = the top", an eye with the lens in red, a flower with the sepal in red, few vs many waves in 1 second). Drawn with PIL by a script per lesson in `scripts/pictures/topic-N-lesson-M.py` using `draw.py` (canvas, arrow, label, save). Run from the repo root with `python3 -I`. Keep lines thick: on an answer button the picture is only 180×110.
2. **Booklet crops** (`pdftoppm -r 300`, crop with PIL, 80-dpi coordinates × 300/80): diagrams, tables, the quiz's own pictures. Empty label boxes get big red numbers 1–4 drawn into them, so the question is "What is box 1?". A grid of answer pictures (root systems, seed pictures) is cut into one picture per answer (`roots-a` … `roots-d`) plus the whole grid as the question picture.
3. **Emoji**: 1–2 on an answer (`icons`), or an animated scene (`vis: SC(bg, items, cap)`, `Kit.scene`) for a sentence question (a wave pushing a raft, lightning then thunder, a pebble making circles). A page with scenes loads `../../../shared/common.js` before its `lesson-N.js`.

Check every new picture on a contact sheet (5 per row) before using it: cut text, labels on top of lines, missing glyphs (DejaVu has no ⟂), parts too thin to see.

## 4. Write the exercises

Copy the pattern of `topic-3/lesson-3.js` (the newest): helpers above `window.LESSON`, then the data.

- `mc(q, [[answer, picture], …], more)`: the first answer is right; a picture that looks like a file name (`e-crest`, `../lesson-1/e-transverse`) goes to `pics`, anything else (emoji) to `icons`. A name→picture map (`PART`, `EYE`) and a small builder (`parts("Cuticle", "Sepal")`) keep repeated answer lists short.
- One exercise per booklet task group, in booklet order: `k: "ps-…"` for the practice sheet, `"quiz"` for the Lesson Quiz, `"slides"` for the teacher's slides; `from: "Booklet · Practice sheet p. 7–8"`; `keep: true` (items stay in the booklet's order). The book's "Book questions" (`k: "check"`) stay last.
- Item types: choose / circle / fill a gap → `mc`; "Who am I" → `mc` ending in "[Who am I?]"; label a diagram → one `mc` per box; T or F → `tf` with `x` saying why; sort into a table → `sort` (`cols`, `words` with `e`); number the steps → `order` with `steps: [{say, e | img}]`; choose all → `multi` (`opts: [{t, img | emoji, ok}]`); "complete the table" → one two-way `mc` per cell (`two: true`).
- **`multi` does not show the question's own picture** (only the answers' pictures): put what matters on the answers (Cody's samples: "Q: round, transparent, colorless" with a drawing).
- mc answers are shuffled; `keep: [...]` on an item fixes their order (A–D answers that name pictures, "all the above" last).
- Explanations (`x`) say why the right answer is right in plain words, with the key word in `[brackets]`.

## 5. Check

```bash
node .claude/skills/science-lesson/scripts/check.js grade-4/science/topic-3/lesson-3.js   # pictures, answer pictures, explanations, files, offline list
.claude/skills/english-lesson/scripts/play.sh grade-4/science/topic-3 lesson-3.html        # plays every game and exercise to its score screen
.claude/skills/english-lesson/scripts/shot.sh grade-4/science/topic-3 <out.png> lesson-3.html ex "" x-quiz   # screenshot; Read the png
npx --no-install prettier --write <changed files>; node --check <each .js>
```

`check.js` must report only "not in games.js also" until the offline stage. `play.sh` (shared with the English skill) must print `N steps` for every tile and no `STUCK` or `ERRORS`; it drives mc, order, sort, match and multi.
The machine is a Raspberry Pi: headless Chromium fails when memory is short (other programs open). Run one browser at a time, delete each `--user-data-dir` after use, and if Chromium cannot even open a one-line page, say so and leave the browser checks for later instead of retrying in a loop.

## 6. Logs, list, report

- `SOURCES.md`: every page / slide → `file · exercise key` and **built** / skipped (why). `TODO.md`: what waits for a scan. `UNVERIFIED.md`: every answer without a school key (the booklets have none; the teacher's filled-in slides are a key), with why it is unsure.
- `lessons.js`: `term: N` on a lesson with sheets from the Term N booklet (a "Term N" tag after "Lesson M" on its card); update its `note` ("12 picture cards · 4 games · 5 exercises").
- One commit per lesson (lesson files, pictures, the picture script, the log rows, its `lessons.js` lines). No Co-Authored-By line.

## 7. Offline, at the end of a batch

Add every new file and picture to `also` of the Science entry in `games.js`, update its `topics` (the Term N part) and `countLabel`, then `node .claude/skills/english-lesson/scripts/offline-check.js grade-4/science` (0 missing, 0 not listed; `.md` files are ignored). Commit, then bump `VERSION` in `sw.js` in its own last commit. Don't push unless asked.
