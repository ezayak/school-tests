---
name: math-video-book
description: Read the Grade 4 Reveal Math Student Edition Volume 2 (Units 8–14: fractions, decimals, measurement, data, geometry) from the screencast videos of the online e-book in ~/Documents/2026-2027/Alex/Math/books/ (Screencast … .mp4), and build its lessons (grade-4/math/unit-N/lesson-N-M.js) with the math-lesson skill. Use this whenever the user sends or mentions a Math video, screencast or e-book recording, asks to build or continue a Math lesson of Units 8–14 ("Lesson 9-2", "Equivalent Fractions", "decimals", "angles"), or asks which Volume 2 lessons are built, even if they don't say "video".
---

# Math Volume 2 from the e-book videos

Volume 1 (Units 1–7) is a scanned PDF; Volume 2 is not. The user filmed the online e-book while scrolling through it:

- `books/Screencast From 2026-11-15 18-18-07.mp4` (6 min): Unit 8 « Fraction Equivalence » (8-1 … 8-5, Math Probe, Unit Review).
- `books/Screencast From 2026-11-15 18-24-52.mp4` (57 min): Units 9–14.

A new video for the same book = more lessons the same way; log it at the top of `SOURCES.md`.
This skill is only **reading the video**. Building the lesson is the `math-lesson` skill (load it too): the same file shape, item types, checks, logs and commits.
Build **one lesson at a time** and show it; the user approves before the next.

## 1. Frames

```bash
S=~/.cache/school-tests/math-video/v1   # on disk: /tmp is a small RAM disk
.claude/skills/math-video-book/scripts/frames.sh "$HOME/Documents/2026-2027/Alex/Math/books/Screencast From 2026-11-15 18-18-07.mp4" $S
python3 -I .claude/skills/math-video-book/scripts/sheet.py $S/keep $S/s0.png 0 48     # find the lesson: Read the sheet
python3 -I .claude/skills/math-video-book/scripts/pair.py $S/keep $S/p.png 12,13      # read two frames at full size
```

- `frames.sh` keeps every distinct screen (`all/`, 4 a second) and picks one per half-screen of scrolling (`keep/`, about 30 frames per lesson).
  Run it on the long video in the background (`run_in_background`), and once only: keep the folders for the next lessons.
- Find the lesson on the contact sheets: a lesson starts with a blue banner and its title, then "Be Curious". The `keep/` names give the frame in `all/` (`k011_f00028.png`),
  and the f number is the time: ÷ 4 = seconds into the video.
- Read every item at full size with `pair.py` (two frames side by side, the text column only). Small print (exponents, the labels of a number line): `pair.py` on a single frame.

## 2. What the e-book shows

- One lesson, in this order: banner + **Be Curious** (a photo or "Which doesn't belong?") · **Learn** (One Way / Another Way) · **Work Together** · **On My Own** 1–8 · **On My Own** 9–12
  (a second "On My Own" banner; the last items are "STEM Connection", "Extend Your Thinking", "Error Analysis") · **Reflect**. The same as a printed lesson, without page numbers.
- A unit starts with a Focus Question page (the STEM Career Kid) and a STEM activity (e.g. « Folds and Fractions », paper folding: skipped); it ends with a Math Probe and the Unit Review / Performance Task / Fluency Practice (planned with the unit review, as Volume 1).
- Skip: "Math is… Mindset / Patterns / Thinking" boxes, the drawing tool (pencil, Start Over, Check), "Credit" links, "Show Correct Answer" / "Check Answer" buttons (the video never shows the answers: every answer is worked out).
- **Loading**: an item that has not loaded yet shows "Loading … Loading scripts" and pale text. Its words are in a later frame of `all/` (between two `keep/` frames, by the f number):
  e.g. 8-1 On My Own 1 ({2/6} and {4/12}) loaded only a few frames after the pale one. Never guess an item from a pale frame; if no frame shows it, list it and ask the user.
- A screen that jumps (the user tapped "Next") can skip a part: check that the item numbers run on (1, 2, 3 …) and that every Learn box has its picture; a missing one → look in `all/`, then ask.
- The video's text is the book's: questions, names, numbers as printed. "Choose the correct answer. Are the fractions equivalent? Yes / No" items are the printed book's choices.

## 3. Pictures

- The cover = the Be Curious picture: `crop.py <frame> unit-N/img/lesson-N-M/curious.jpg x0 y0 x1 y1` from the frame where it is whole (the frames are 1191 × 881; a crop of ~700 px wide is the size of a Volume 1 cover). Read the jpg afterwards.
- Everything else is drawn by `shared/math.js`. Fractions (Units 8–10): `{3/4}` in any text, `num` with `fr: "?/8"`, drawings `fbar` (strips, grids) and `fline` (number lines), see README "Math lessons (Grade 4)".
  A drawing must not show the answer (math-lesson rule): the second number line of a "{1/4} = {?/12}" has `lab: false`; a "which two are equivalent" strip is not shaded.
- Units 11–14 (measurement, data, angles, shapes) will need new drawings (a protractor, a line plot, a ruler): a `shared/math.js` change in its own stage first, like `fbar` / `fline` for Unit 8.

## 4. The lesson file

- `book: "e-book Lesson 8-1 · Practice Book p. 79–80"`, `from: "e-book 8-1 · On My Own 1–4"`, `g: "📗 Book · Lesson 8-1"` (no page numbers; if the user gives the printed pages later, replace them).
- The `// Sources:` line names the video and the time span (`Screencast From 2026-11-15 18-18-07.mp4, 0:20–1:40`).
- Practice Book: as in Volume 1 (`pdftotext`, render the page). Unit 8 starts at Practice p. 79 (PDF 101): Family Letter before it, 2 pages per lesson.
- Model: `unit-8/lesson-8-1.js` (fraction helpers `eqTF`, `topQ` at the top).
- `add.js` knows the unit titles in `UNITS` and the chapter emoji in `ICONS`: add a new unit's title (from its opening page) before running it.

## 5. Logs

`SOURCES.md` has a table « Student Edition, Volume 2 (e-book videos) »: one row per lesson part with `video · time` (m:ss; an `all/` frame `f00420` is 420 / 4 = 105 s = 1:45), what it is, `file · key`, status.
Update its rows, `UNVERIFIED.md` and `TODO.md` with every lesson, in the same commit (math-lesson rules).
