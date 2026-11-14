---
name: optima-ukr-mova
description: Build Optima Grade 3 Ukrainian language lessons («Українська мова», Н. Кравцова, О. Придаток, В. Романова «Українська мова та читання. Частина 1») for the school-tests study games from the book PDF in ~/Documents/2026-2027/Lucas/Optima/. Use this whenever the user asks to add, continue, fix or check Optima / Ukrainian language lessons («українська мова», «урок мови», звуки, букви, апостроф, алфавіт, наголос, частини мови, вправи з підручника Придаток), even if they only give page or exercise numbers.
---

# Optima Українська мова (Grade 3)

The rules live in `CLAUDE.md` ("Ukrainian language and reading (Optima, Grade 3)", plus "Workflow", "Formatting" and "Offline cache") and the format in `README.md` ("Ukrainian language and reading lessons (Optima, Grade 3)").
Read those first. `optima/grade-3/ukr-mova/lesson-1.js` is the model (slides, every row kind, homework, pictures from the book).

Lucas has aphasia and reads slowly: short Ukrainian sentences, the key words in `[brackets]`, a picture (`img`) or an emoji (`ic`) on every exercise,
answers he taps (choices, letter tiles, word tiles), never typed. Build **one lesson at a time**, show it, wait for approval before the next one.

## 1. Find the lesson

Book: `~/Documents/2026-2027/Lucas/Optima/Підручник_Придаток.Українська мова..Підручник для 3 класу.Підручники та посібники.2020.pdf`.
**PDF page = book page + 3** (book p. 4 = PDF p. 7). The text layer is garbled (broken font encoding): always read the pages as pictures.

```sh
B=~/Documents/2026-2027/Lucas/Optima/Підручник_Придаток*.pdf; S=<scratchpad>
pdftoppm -r 110 -f 7 -l 9 -png $B $S/m     # to read; -r 200 for the crops
```

- A section title (big blue frame: «ЗВУКИ І БУКВИ. АЛФАВІТ. НАГОЛОС») = a part of the side bar in `lessons.js`.
- A lesson = one topic (the light-blue bar: «ЗВУКИ І БУКВИ», «АПОСТРОФ»), from the «початок уроку» sign (blocks icon) to the next one. Exercise numbers run through the whole book.
- Icons: blocks = start of a lesson, 🏠 house = homework (`hw: true`), two children = pair work, a magnifier / lamp = research, «Словникова скарбничка» = words to remember.
- The last built lesson is the last card in `lessons.js`; its file comment says its exercises.

## 2. Sort the exercises

An exercise has numbered tasks (1. 2. 3.); each task that has something to check is an item (`k: "5a"`, `chip: "№5 апостроф"`), in book order.

| In the book                                                        | Row                                                                    |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| a rebus, a word for a sound scheme, «запиши слово», name a picture | `{q, word: "звуки"}` (letter tiles; `alt: [..]` other right spellings) |
| «Слова для довідки» + gaps                                         | one `{q: "Після літа настала …", ch: [the bank], a}` per gap           |
| choose / underline / «у якому слові …», yes / no                   | `{q, ch: [...], a}`; several right → `a: [..]` («Обери кілька.» shows) |
| «випиши речення, у яких …» (several from a list)                   | `{q, ch: [the sentences], a: [the right ones]}`                        |
| put in order (by sounds, alphabet, a sentence from words)          | `{q, order: [words], alt: [[other right orders]]}`                     |
| a sentence of his own, a story, «поясни», pair work                | `{open: "model answer"}` + `help` lines leading to an idea             |

Leave out what has nothing to check or only says «Прочитай» / «Розглянь» (the text goes into the next item's `q` / `tip`), drawing, colouring,
QR codes / videos; list them in the file comment and for the user. Words missing or unreadable in the scan: never guess, ask.
Every answer is worked out (count the sounds, check the scheme symbol by symbol: • голосний, ▬ твердий, = м’який, | склад, ´ наголос).

## 3. Write the lesson

- `lesson-N.js` (shape of lesson-1.js); `ukr-lesson-add.js` makes `lesson-N.html` (see 5).
- **Урок** (`learn`): 3–5 slides, one rule each, from the book's rule boxes and the exercise questions («Пригадай …»): `lines` with `[key words]`,
  `ex` = book examples worked out, `img` when the book's picture explains it, `from: "№ 1, с. 4"`. Don't put an exercise's own answer on a slide.
- **Вправи** (`groups`): by type of task (`t`, `ic`), homework in its own group (🏠). Every item: `n` (book number), `k` when the number repeats, `chip`, `p` (book page), `q` (the book's wording),
  `tip` (the words / sentences the task works on), `img` or `ic`, `rows`, `help` (2–3 lines), `x` (the answer explained, shown in 📝 Відповідь).
- Pictures: crop from the 200 dpi render with PIL into `img/lesson-N/<name>.jpg` (rebuses, schemes, the picture of a word; ~250–950 px). Check a contact sheet.

## 4. Check

```sh
node .claude/scripts/ukr-lesson-check.js optima/grade-3/ukr-mova/lesson-N.js        # must print OK
SH=.claude/scripts/ukr-lesson-shot.sh; D=optima/grade-3/ukr-mova
for g in 0 1 2 3; do bash $SH - $D lesson-N.html "reset;tab:tasks;click:#g-$g;all;log"; done   # every item ✓ Молодець
bash $SH - $D lesson-N.html "reset;tab:tasks;click:#g-0;wrong;log"                              # Не все правильно
bash $SH <scratchpad>/a.png $D lesson-N.html "reset;click:#i-0" 1280 800                        # slide 1
bash $SH <scratchpad>/b.png $D lesson-N.html "reset;tab:tasks;click:#g-1;go:1" 390 844          # a phone
```

Steps: `reset`, `tab:tasks`, `click:<sel>` (`#i-N` slide, `#g-N` group, `#helpBtn`, `#solBtn`, `#okBtn`, `#nextBtn`), `go:N`, `solve`, `wrong`, `all`, `wait:ms`, `log`.
The tiles are tapped with real pointer events (`.click()` does not move them). Look at every screenshot: the tiles, a slide, one item of each kind, a phone.

## 5. Register and show

- The head has `part: {k, tab, ic, t}` (the book section) and `card: {en, cover}`; `node .claude/scripts/ukr-lesson-add.js optima/grade-3/ukr-mova`
  makes `lesson-N.html`, rebuilds `lessons.js` and the «Українська мова» entry of `games.js` (files, pictures, `countLabel`, `topics`).
- `prettier --write` the changed files, run the check again. Bump `VERSION` in `sw.js` once, last, in its own commit.
- Show the user: slides, groups, what was left out and why, the answers that were worked out without a key. Commit each lesson on its own.

## Lessons learned

- lesson.css has a `.w` class (tappable words with a dotted line): don't use `.w` in the engine's markup.
- A word bank («Слова для довідки») is choices, not tiles: the child picks the book's words.
- «Запиши в порядку збільшення або зменшення» → both orders right (`alt` = the reverse).
- **All 82 lessons are built** (book pp. 4–141, ex. 1–386): parts `sounds` · `words` · `build` · `parts` · `sentence` · `text` · `review`.
  Each «Урок розвитку зв’язного мовлення» is its own lesson. A long topic is split at an exercise boundary into lessons of about 4–8 exercises.
- **The book has an answer key** on p. 141 («ВІДГАДКИ»: riddles of ex. 60, 93, 181, 197, 207, 237, 258, 278, 312, 379, 385). Read it before
  calling a riddle unverified. Its ex. 237 answer («чотири жуки і три павуки») does not fit the poem (6 insects, 40 legs): ask.
- **Where a lesson ends:** exercises at the top of a page before the next light-blue title belong to the previous lesson. Look at the next page
  before writing; if they were missed, add them to the previous lesson (amend only while it is the last commit, otherwise a fix commit).
- **One lesson per commit:** `ukr-lesson-add.js` registers every `lesson-N.js` present, so write the next lesson only after committing
  the current one (keep it in the scratchpad meanwhile).
- **Choices:** at most about 7 per row (17 words in 3 rows ran far below the screen). For «which group» tasks give each row its own short list.
- **Order rows:** `alt` must use the same words (same capital letters); otherwise drop the `alt`.
- **Emoji:** a ZWJ emoji (👨‍👩‍👧) counts as 3 in the check; use a single one.
- **Crops:** check every crop on a contact sheet. Bits of the text or the frame often get in: crop tighter or paint them white (PIL `ImageDraw`).
  A thin strip (a scheme line) gets white padding so it shows at a sensible size. A lesson with no picture in the book uses emoji (`card.ic`).
- **Model answers** for «write about yourself / your family» stay neutral (no names or ages from the family).
- **Text and style lessons** (Текст): types розповідь / опис / міркування / есе and styles художній / науково-популярний / діловий are
  `ch` rows; the parts (зачин …, твердження / доведення / висновок) are `ch` rows with a quoted sentence each.
