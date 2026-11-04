---
name: optima-math
description: Build Optima Grade 3 Math lessons (Ukrainian, «Математика. Частина 1», М. Козак) for the school-tests study games from the book PDF in ~/Documents/2026-2027/Lucas/Optima/. Use this whenever the user asks to add, continue, fix or check Optima / Ukrainian math lessons («Математика», «урок», book pages, a multiplication table), even if they only give page numbers.
---

# Optima Math lessons (Grade 3)

The rules live in `CLAUDE.md` ("Ukrainian math (Optima, Grade 3)", plus "Workflow", "Formatting" and "Offline cache") and the format in `README.md` ("Ukrainian math (Optima, Grade 3)").
Read those first. `optima/grade-3/math/lesson-2.js` is a full example (slides, every row kind, word problems, comparisons with units).

Lucas has aphasia and reads slowly: short Ukrainian sentences, the key words in `[brackets]`, a schema on every word problem.
The user reviews each lesson in the browser: build **one lesson at a time**, show it, wait for approval before the next one.

## 1. Find the lesson

Book: `~/Documents/2026-2027/Lucas/Optima/ПІДРУЧНИК_Козак М. Математика. Частина 1. Підручник для 3 класу. Підручники та посібники. 2020.pdf` (PDF page = book page).

- Render the pages as pictures and read them (the text layer is noisy OCR): `pdftoppm -r 100 -f N -l M -png "$BOOK" <scratchpad>/book/p`.
  For small print (units, signs, exponents) render that page again at `-r 200` and crop the part.
- A lesson starts at a line of stars with the **green title on the right** (small, green, italic). It ends at the next such line.
  A page can hold the end of one lesson and the start of the next. Exercise numbers run through the whole book.
- The last built lesson is the last card in `lessons.js`; its file comment says its exercises. Start after its last exercise.
- 🏠 next to a number = homework (`hw: true`). A section title (big, brown, between green leaves) starts a new `part` in `lessons.js`.

## 2. Sort the exercises

| In the book                                                                       | Group (`t`, `ic`)            | Row kind                                                                                                             |
| --------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Обчисли, a column of expressions                                                  | Обчисли 🧮                   | `{e: "34 − (18 − 9)"}`; a label: `{q: "b = 8:", e: "43 − 8"}`                                                        |
| chains, pyramids (answer starts the next one)                                     | Обчисли 🧮                   | `{h: "Ліва сторона"}`, then `{e: "■ + (11 − 5)"}` (■ = the row before)                                               |
| >, <, =                                                                           | Порівняй ⚖️                  | `{cmp: ["78 − 24", "64"]}` (sign worked out); with units `{cmp: ["1 м 6 дм", "6 м 1 дм"], a: "<", why: "…"}`         |
| word problem                                                                      | Задачі 📖                    | `{q: "Відповідь:", a: [33]}` + `help`, `schema`, `steps`, `answer` (the box goes into the answer sentence by itself) |
| pairs, choose one / several                                                       | by topic (Рівні вирази 🔗 …) | `{q, ch: [...], a: "x"}` or `a: ["x", "y"]`                                                                          |
| several numbers to write                                                          | by topic (Календар 📅 …)     | `{q, a: [2, 9, 16], any: true}` (any order)                                                                          |
| a number with two right forms (22 or 10 o’clock)                                  | by topic                     | `{q, a: [22], alt: [10], post: "год"}`                                                                               |
| a quantity in two units (□ м □ дм)                                                | Мірки 📏                     | `{pre: "75 дм =", a: [7, 5], mid: ["м"], post: "дм"}`                                                                |
| a chain / «по колу» (the answer starts the next one)                              | Обчисли 🧮                   | `{e: "27 + 38"}`, then `{e: "■ − 14"}` …                                                                             |
| two answers that are lines of text (exercises with «Поясни, що означають вирази») | by topic                     | one `{q: "9 + 3 — це …", ch: [the meanings], a}` per expression                                                      |
| put signs between numbers (14 ● 2 ● 8 = 15)                                       | by topic                     | `{ops: "14 ● 2 ● 8", eq: 15, a: [":", "+"]}` (any signs that give eq are right)                                      |
| an unknown number (□ : 7 = 2, a table of unknowns)                                | Невідомі числа ❓            | `{pre: "□ : 7 = 2,  □ =", a: [14]}`                                                                                  |
| a table of × or :                                                                 | —                            | lesson field `drill: {mul: [4]}` / `{div: [4]}` → the 🎲 Таблиця врозкид and 🚀 Ракети games (n · 2 … n · 9)         |

Leave out what has nothing to check (Пофантазуй, drawing, stick puzzles, «Прочитай таблицю»), and list it in the file comment and for the user.
Every exercise that goes in must be solvable on the pad or with choices: a lesson is «✓ Пройдено» in the list only when all its exercises are done.
A table lesson («Таблиця множення числа N», «Таблиця ділення на N», «Закріплення …») always gets `drill` with the tables it practises.

## 3. Write the lesson

- `lesson-N.js` (copy the shape of lesson-2.js), `lesson-N.html` (copy lesson-2.html: change the `.js` and the `<title>`), a card in `lessons.js` (`note: "с. X–Y · K вправ"`).
- **Урок** (`learn`): 3–6 slides, one idea each: what the topic is, how to do it, one book example worked out (`ex`), a picture or `schema` when the book has one. `from: "№ 7, с. 5"`.
- **Задачі** (`groups`): every exercise, the book's wording in `q`, the book's number in `n`, the page in `p`, items in book order inside a group.
- Word problems: `help` = 3–4 short lines leading to the operation, `schema` = bar model (`segs` with `v` for the lengths, `q: true` on the unknown, `brace` / `total`), `steps` = one line per action with units in brackets `(м)`, `answer` = the full sentence containing the answer number once.
- Every answer is worked out by you and by the check script: never copy the pupil's handwriting (the book has none, but scans might).
- Pictures (only when the exercise needs one: a calendar, a pyramid, the scene of a problem): crop from the 200 dpi render with PIL into `img/lesson-N/<name>.jpg`, about 500–700 px wide.

## 4. Check

```sh
node .claude/skills/optima-math/scripts/check.js optima/grade-3/math/lesson-N.js
```

It checks every expression (whole numbers, not negative, ■ only after a row), every written step `a op b = c` in slides and solutions, word problems (help, schema, steps, answer; the answer is the result of the last step and is in the sentence), pictures (exist, used, in `games.js` `also`), the html and the `lessons.js` card. Fix until it prints `OK`.

Screenshots (headless Chromium, run from the repo root, the page path is relative to `optima/grade-3/math/`):

```sh
S=<scratchpad>; SH=.claude/skills/optima-math/scripts/shot.sh
bash $SH $S/a.png lesson-N.html "reset;tab:tasks" 1280 800                        # the tiles
bash $SH $S/b.png lesson-N.html "reset;tab:tasks;click:#g-2;click:#helpBtn" 1280 900 # group 3, the hint
bash $SH $S/c.png lesson-N.html "reset;click:#i-0" 390 844                         # slide 1 on a phone
BUDGET=40000 bash $SH $S/d.png lesson-N.html "reset;tab:tasks;click:#game-rocket;click:#goBtn;answer:rrrrrrwr"
```

Steps: `reset`, `tab:tasks`, `click:<selector>` (`#g-N` group, `#i-N` slide, `#game-mix`, `#game-rocket`, `#helpBtn`, `#solBtn`, `#okBtn`, `#nextBtn`), `go:N` (exercise N+1 of the open group), `type:33` / `type:<>=` (the pads), `wait:ms`, `answer:rrw` (the table games). Look at every screenshot.
Check at least: the tiles, every slide, one exercise of each group with 📝 Розв’язання open, a word problem with 💡, a phone width.

## 5. Register and show

- `node .claude/skills/optima-math/scripts/add.js N "ic" "card line" ["New part title"]` writes `lesson-N.html`, the card in `lessons.js`
  (note = pages, exercise count, the table games), the files and pictures in `also` of the Математика entry in `games.js` and its `countLabel`.
  Run it again after changing the lesson (it replaces, never doubles). Then `prettier --write` those files and run `check.js`. Update `topics` by hand when a book section starts.
- Show the user: what was built (slides, groups), what was left out and why, anything unsure. Wait for approval (or, when the user asked for a batch, commit each lesson and show them together).
- Commit each lesson on its own; engine changes in their own commit before it. Bump `VERSION` in `sw.js` once, last, in its own commit.

## Lessons learned

- check.js reads every «a op b = c» in the steps and slides. Keep one equation per clause: split with «;» or «,», and put words in brackets
  or before the equation («7 · 5 = 35; підходить …», not «7 · 5 = 35: потрібно більше за 5 — 6»), or it compares the wrong numbers.
- A word problem may also have choice rows («Чого більше?»); its number rows are the answers checked against the last step and the sentence.
- «Обернена задача» to a word problem = its own item `n: "121 об."` (rows with labels, no schema).
- Measure lengths on the page when the book says «виміряй»: the PDF is the real size (20.5 cm wide), 200 dpi → px / 200 · 2.54 cm.

- Atkinson Hyperlegible draws 0 as Ø: math-uk.css puts Nunito first. Don't change `--body`.
- The book writes × as `·` (4 · 3 = 12); write `·` in the data, the engine shows `·` in the steps.
- check.js skips clauses with units next to numbers or with □ ("1 м 6 дм = 16 дм"), so check those by hand; write substitutions as "якщо b = 15, то 43 − 15 = 28".
- An answer sentence with the answer number twice can't hold a box: the row then shows the bare box; reword the sentence.
