---
name: math-lesson
description: Build or update Grade 4 Math lessons (Reveal Math, grade-4/math/unit-N/lesson-N-M.js) for the school-tests study games from the Student Edition and the Student Practice Book in ~/Documents/2026-2027/Alex/Math/books/, and add school sheets (class sheets, extra practice, homework, model answers) from ~/Documents/2026-2027/Alex/Math/Term N/. Use this whenever the user asks to add, continue, fix or check Grade 4 / Alex's Math lessons, mentions a Reveal Math lesson ("Lesson 2-3", "Unit 5"), book or Practice Book pages, or sends a Math sheet, even if they don't say "lesson".
---

# Math lessons (Grade 4)

The rules live in `CLAUDE.md` ("Math (Grade 4): book lessons", plus "Workflow", "Formatting" and "Offline cache") and the format in `README.md` ("Math lessons (Grade 4)"). Read those first.
`grade-4/math/unit-2/lesson-2-1.js` is the model: copy its shape (helpers at the top, then `window.LESSON`).

Alex has aphasia and is learning to read again: the parent explains each question by pointing at the pictures. Every question has a drawing (`vis`) or a picture (`img`) or an emoji; short sentences; key words in `[brackets]`; answers typed on the number pad when they are numbers.
The user reviews each lesson in the browser: build **one lesson at a time** unless told to do a batch, show it, wait for approval.

## 1. Find what is new

- Read `grade-4/math/SOURCES.md`, `TODO.md`, `UNVERIFIED.md`. Build the next **planned** lesson (book order), or the pages of a new school sheet.
- New file in `Term N/`: find its lesson (the sheet says "Lesson 4-2"), add it to the book lesson's page as exercises (`g: "🏫 School · …"`, `from: "Class sheet 4-2"`), then log it. A sheet for a lesson that is not built yet waits for that lesson (`planned`).
- The older unit pages (`unit-2/place-value` …) hold the Term 1 sheets; leave them as they are unless asked.
- **Teacher's keys**: the `Term N/…L_N-M.pdf` scans (2–4 pages, no text layer) are the book's On My Own pages with the answers in pink. Check the lesson against its key
  (every answer, and the key's sample answers for open questions go into `x` or the model answer); log it as "built (checked)". A key that says "Answers may vary" leaves the item unverified.
- The user may name the pages ("Lesson 4-2: book pages 111, 112, Practice Book 29, 30"): those are the pages assigned; still build the whole lesson (all 4 book pages), as the others.

## 2. Read the sources

- Student Edition Vol. 1 (Units 1–7): scanned pictures, no text layer. Book page = PDF page − 20 (constant through Volume 1). Render and read:
  `pdftoppm -r 150 -f <p+20> -l <p+23> -png "$SE" <scratchpad>/se/l`. Zoom (`-r 300 -x -y -W -H`) on small print: underlined digits, exponents, the marks in a chart.
- A book lesson is 4 pages: Be Curious (p. 1), Learn + Work Together (p. 2), On My Own (p. 3–4, numbered items, "Extend Your Thinking", "Error Analysis"), Reflect. "Math is… Mindset" boxes are skipped.
- Practice Book: text layer. `pdftotext -f N -l N` and render the page (charts, tables). Find the lesson with `grep -n "Lesson 2-1"` on the whole text; each unit starts with a 2-page Family Letter (its terms and examples can feed the Learn cards or a game). The Math @ Home activity is skipped.
- Words or numbers missing or unreadable: never guess; list them and ask.

## 3. Build the lesson

Files: `unit-N/lesson-N-M.js`, pictures in `unit-N/img/lesson-N-M/`. The `.html`, the card in `lessons.js` (a new unit gets its chapter) and the files in `games.js` come from
`node .claude/skills/math-lesson/scripts/add.js grade-4/math/unit-N/lesson-N-M.js` (then prettier on `games.js` and `lessons.js`).
Build questions with `shared/math-kit.js` (see README for the list: forms, `cmp`, `roundQ`, `col`, `step`, `distrib`, `areaQ`, `estDiv`, `partialQ`, `remQ`, bar diagrams …):
it works out every answer. A new question shape used by more than one lesson goes into the kit, not into a lesson file. A problem in several steps (`step`, `partialQ`, `areaQ`, `remQ`)
is one item per step; when a step uses the answer of the step before, list the chain at the end of the file and check it with `value()` (see `unit-3/lesson-3-8.js`): a wrong number throws on load.
Models by topic: place value `unit-2/lesson-2-2.js`, column sums `unit-3/lesson-3-4.js`, comparisons `unit-4/lesson-4-3.js`, factors `unit-5/lesson-5-1.js`, area models `unit-6/lesson-6-7.js`, division `unit-7/lesson-7-6.js`.
(4-2 … 4-4 still have their own copies of the bar helpers.)

- Head: `n: "2-1"`, `key: "math4-l2-1"`, `title` (short, plain words), `en` (one line for the card), `unit: "Unit 2 · Lesson 2-1"`, `book: "Book p. 33–36 · Practice Book p. 1–2"`, `imgDir: "img/lesson-2-1"`, `cover: "curious"`, `question` = the Reflect question with a short answer.
- Pictures: the **Be Curious** picture is the cover (crop it from the page at `-r 200`, 700px wide, `python3 -I` + PIL). Crop a book picture only when it explains something a drawing can't (Akira's ×10 arrows). Everything else is drawn by `shared/math.js`: `pv`, `digits`, `nline`, `bar`, `groups`, `array`, `cubes`, `colshow`, and the engine's `lines`.
- `words`: the lesson's vocabulary (the Family Letter's terms that belong to it). `ideas` (Learn): 5–8 cards retelling Be Curious, Learn and Work Together in easy words, each with a drawing; the last card the main skill (how to do it).
- `games`: 2–4 games on the lesson's skill with **new numbers** (not the exercise numbers): a `.map` over a list of numbers, like `value(4695132, j)`.
- `exercises`: every book item, in the book's order, `keep: true`:
  - `g: "📗 Book · p. 33–36"`: one set per block — `curious`, `learn`, `together`, `own1` … (group On My Own items by type, `t: "On My Own 3–6"`), Reflect at the end of the last set. `from: "Book p. 35 · On My Own 3–6"`.
  - `g: "📘 Practice Book · p. 1–2"`: `k: "pb"`, Additional Practice 1–N.
  - School sheets for this lesson: `g: "🏫 School"`, one set per sheet.
- Item types:
  - a number to write (value, standard form, round, the answer of a problem) → `num` (`a`, `pre`, `post`, `x`); several numbers ("write the value of each digit") → one `num` each.
  - add / subtract in columns → `col` (`op`, `a`, `b`); a word problem → `col` with `story` (schema) or `num` with a `bar` schema.
  - compare / choose / "how do the values compare" / which number → `mc` (right one first, 3–4 options with the likely mistakes: the reversed relation, 100 times, same value). `keep: [...]` for a fixed order (`<`, `=`, `>`).
  - yes / no, "is he right?", Error Analysis → `tf` with `yes: ["Yes, he is right", "No, he is not"]` and `x` (why).
  - explain / Reflect / "which doesn't belong" → `open` with a model answer; when the book takes many answers but one can be checked, prefer an `mc` of numbers that work / don't work.
  - "write two numbers so that …" → `mc` of pairs.
  - Drawing, colouring, "use base-ten blocks to show" → skipped (log it), unless it can be a picture question.
- **The drawing must not show the answer.** A drawing next to "what is 24 ÷ 3?" shows `24 ÷ 3 = ?`, never `3 × 8 = 24`; an area model shows `"?"` in the cell being asked;
  "choose all" options all get the same emoji (the engine shows it before Check: ✅ / 🤔 would give the answers away; `check.js` catches that).
- Steps of one problem stay in order: `keep: true` on the exercise **and on the game** (games are shuffled otherwise). Split an exercise of more than ~35 steps in two (`pb`, `pb2`).
- Every answer is worked out (by the helpers in the file where possible: `digitAt`, `greatest`, `least`), never typed from memory. Write the equation in `x` with the answer in brackets
  (`3 × 40 = [120]`, `56 = [8] × 7`): `check.js` recomputes every equation in `x` and compares the bracketed number with a `num` answer.
- A book typo (« as Celeb ») is fixed and noted in a comment and in `SOURCES.md`. Answers with more than one right form or written without a key get a `// unverified: why` comment and a row in `UNVERIFIED.md`.

## 4. Check

```bash
node --check grade-4/math/unit-2/lesson-2-1.js
node .claude/skills/math-lesson/scripts/check.js grade-4/math/unit-2/lesson-2-1.js     # pictures, drawings, equations in x, files, lessons.js, offline, unverified rows
.claude/skills/english-lesson/scripts/play.sh grade-4/math/unit-2 lesson-2-1.html       # plays every game and exercise to its score screen (num, col, mc, tf, open)
.claude/skills/english-lesson/scripts/shot.sh grade-4/math/unit-2 <out.png> lesson-2-1.html ex 0 x-own3   # screenshot; Read the png
.claude/skills/english-lesson/scripts/shot.sh grade-4/math <out.png> index.html                            # the hub
npx --no-install prettier --write <changed files>
```

`check.js` must report only "not in games.js also" until the offline stage. `play.sh` must print a step count for every tile and no `STUCK` or `ERRORS` (`open` items count 0 steps: they end with 👍).
The machine is a Raspberry Pi: run one browser at a time; if Chromium cannot start (memory), say so and leave the browser checks for later.
Look at the screenshots: a drawing that gives the answer away (a `pv` with `val: true` on a "what is the value" question), text cut off, a number line with the point outside.

## 5. Logs, list, offline

- `SOURCES.md`: the lesson's book pages and Practice Book pages → `file · exercise key`, **built**; skipped parts with why. `TODO.md`: what waits for a scan. `UNVERIFIED.md`: one row per `// unverified`.
- `lessons.js` and `games.js` (the card, `also`, `countLabel`, `topics`): `add.js` (above). Then `node .claude/skills/english-lesson/scripts/offline-check.js grade-4/math` (0 missing, 0 not listed).
- Commits: one per lesson (files, pictures, log rows, `lessons.js`, `games.js`); an engine change (`shared/math.js`, `shared/computer-lesson.js`) in its own commit first; `VERSION` bump in `sw.js` last, in its own commit. No Co-Authored-By line. Don't push unless asked.
