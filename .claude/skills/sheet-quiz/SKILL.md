---
name: sheet-quiz
description: Build a sheet quiz (a homework helper, shared/sheet-quiz.js) from photos of a school sheet that the parent sends to the Telegram bot (Alex's bot → Alex, Grade 4; Lucas's bot → Lucas, Grade 3), in any subject. Every question of the sheet becomes a multiple-choice question with a picture and a simple explanation; the quiz never shows right or wrong. Saved in quiz/<kid>/<slug>/, not in the menu; the parent gets the link. Use this whenever a build job's mode is `quiz`, or the user sends or mentions photos of a sheet to turn into a quiz, a "sheet quiz", a "homework helper", or asks to fix or check one, even if they don't say "quiz".
---

# Sheet quiz (homework helper)

**Who it is for**: one of the parent's sons has aphasia. The quiz helps him understand each question of his school sheet and choose his answer
himself; he then copies his answers onto the paper. So: **no right or wrong, no score, no answer key** in the page (the engine has none),
and every question is **explained with a picture and short, simple words**. Answers in the JavaScript are fine (the parent said so).

The engine is `shared/sheet-quiz.js` (format at its top), the look is the Quest's (`quiz.css`, pictures by `Kit.qPic`).
Model: `quiz/demo/quiz.js`.

## 1. Read the photos

- The job gives the photos (`~/.local/share/school-inbox/quiz/<job id>/p-N.jpg`), the kid and the parent's caption (may be empty: then find the subject from the sheet).
- Open each photo **once**, in order. Write down the sheet's title, subject, lesson / unit, and every question with its number and part, word for word.
- Words that can't be read: never guess. If the question can't be understood without them, leave that question out and name it in the last message.
  If the whole sheet can't be read: `Not done: <why>`.
- A sheet already answered by the child or the teacher: build it all the same, from the printed questions only.

## 2. Find the lesson (for pictures and words)

- Grade: Alex → `grade-4/`, Lucas → `grade-3/`. Look at the subject's lessons in the app (`subjects.json` `app`, the hub's lesson list) for the
  lesson the sheet is about: its pictures (`img/…`), its words and its Mini Word / Mini Windows starts.
- Load the subject's skill only to find these (where pictures are, how the subject words things); do **not** follow its lesson-building steps.
- No matching lesson: emoji pictures (and crops of the sheet's own figures, below) are enough.

## 3. Make the folder

```bash
node .claude/scripts/sheet-quiz.js new <kid> <YYYYMMDD>-<subject>-<what> [--lang en|fr|ar] [--title "Two Words"]
#   e.g. new alex 20261125-computer-u2l3 --title "Grammar Check"   → quiz/alex/20261125-computer-u2l3/
```

`<kid>` = `alex` / `lucas`; the date is the day of the job; `<what>` is short (`u2l3`, `cw2`, `hw-week5`). It writes `index.html` (never edit it
by hand except the title) and `quiz.js` (fill it). The sheet's own figures needed for a question (a diagram, a map, a picture to label):
crop them from the photo into `img/` as JPEG, at most 1000 px wide (`python3 -c "from PIL import Image; …"`), named by what they show.

## 4. Write the questions

One item per thing to answer, **in the sheet's order**, with the sheet's number (`n: "2b"`) and part (`part: "B · True or false"`).
Nothing added that the sheet doesn't ask.

- `q`: the question **as printed** (the blank as `______`). A question with several blanks or a table: one item per blank / row (`3a`, `3b` …).
- `help`: what the question asks, in **simple words**: short sentences, one idea each, everyday words, the present tense.
  It may explain a hard word or the rule (with an example that is **not** one of the answers), and say where to look in the picture.
  It must **never give the answer** away (no "the answer starts with…", no rule example that is the answer itself).
  - English sheets: the help is the question said again in simpler words (an "it means…" sentence), then what to look for.
  - French and Arabic sheets: the help is in **the sheet's language** (🔊 reads the question and the help with that language's voice),
    in the simplest words of that language: French at the level of the child's French lessons; Arabic in classical Arabic with full tashkeel,
    in `q`, `help` and `o` alike, `lang: "ar"` (the page then has the no-referrer meta and Google's online voice: CLAUDE.md "Arabic voice").
- `o`: **2–4 answers, always**. The sheet's own choices when it has them (its order, `k: 1`). A write-in question (fill the blank, answer, label,
  match, order) becomes a choice: the right answer **plus** 2–3 wrong ones of the same kind and length (the lesson's other words, a common mistake),
  never silly ones. Put the right answer in a different place each time (not always A). True / false: `["True", "False"]`, `k: 1`.
  Matching (A ↔ B): one item per left side, the right column as its answers (at most 4: the right one and 3 others).
  Write a sentence (open answer): the choices are short model sentences, one right; no item when the answer is the child's own opinion (name it at the end).
- **One picture on every question** (the check fails otherwise), the clearest of:
  1. a lesson picture by its path (`p: "../../../grade-4/computer/chapter-2/img/lesson-3/find-replace.jpg"`) or a crop of the sheet's figure (`p: "fig-2"`);
  2. answer pictures `ps: [...]` when the answers are things to see;
  3. emoji `e: "👦 🥦 🙅"` (2–4 groups that tell the question's story); `svg` only when nothing else shows it (a number line, a shape).
     The picture shows **what the question is about**, never which answer is right.
- Computer: when the question is about doing something in a program, add `sim: { app: "word" | "windows" | "outlook" | "edge", start: {…}, say: "what to try" }`:
  the starts of the program (top of `shared/wordsim.js`, `grade-4/computer/chapter-1/winsim.js`, `shared/netsim.js`) or the lesson's own ones;
  `say` tells what to try, not the answer ("Press Ctrl + H. What opens?").
- `eyebrow`: "Subject · the sheet's title · the lesson" (e.g. "Computer · Classwork 2 · Unit 2 Lesson 3"); `title`: two words for the topic;
  `cover`: the lesson's main picture or emoji. The header comment says the sheet, the date, the photos and what was changed to fit.

## 5. Check and commit

```bash
npx --no-install prettier --write quiz/<kid>/<slug>
node --check quiz/<kid>/<slug>/quiz.js
node .claude/scripts/sheet-quiz.js check quiz/<kid>/<slug>
```

- Not in `games.js`, no `register.py`, **no `sw.js` bump** (quiz pages are not precached; they work offline once opened).
- One commit with only the quiz folder: `Sheet quiz: <Kid> · <Subject> · <sheet title> (N questions)`.
- Last message (sent to the parent on Telegram, the job adds the link): 2–4 short lines: the sheet, how many questions, what was left out and why.
