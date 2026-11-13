---
name: optima-ukr-lit
description: Build Optima Grade 3 Ukrainian reading lessons («Українська література», А. Савчук «Українська мова та читання. Частина 2») for the school-tests study games from the book PDF in ~/Documents/2026-2027/Lucas/Optima/. A lesson = a text of the book (poem, story, fable, legend) read whole, word by word or sentence by sentence, plus its questions as slides. Use this whenever the user asks to add, continue, fix or check Optima / Ukrainian literature or reading lessons («читання», «літературне читання», a poem or story title, an author, Савчук book pages), even if they only give page numbers.
---

# Optima Українська література (Grade 3): book lessons

The rules live in `CLAUDE.md` ("Ukrainian language and reading (Optima, Grade 3)", plus "Workflow", "Formatting" and "Offline cache") and the format in `README.md` ("Ukrainian language and reading lessons (Optima, Grade 3)").
Read those first. `optima/grade-3/ukr-lit/lesson-1.js` is the model (a poem, choice and oral questions, a matching task as choices).
These lessons sit on the same page as the «Складова ракета» texts (`texts.js`, `shared/reading.js`, the `ukr-reading-check` script): don't mix the two formats.

Lucas has aphasia and reads slowly. The text is exactly as printed; the questions are short, with a picture or an emoji, and answered by a tap
whenever the answer is in the text. Build **one lesson at a time**, show it, wait for approval before the next one.

## 1. Find the lesson

Book: `~/Documents/2026-2027/Lucas/Optima/ПІДРУЧНИК_Савчук А. Українська мова та читання. Частина 2. Підручник для 3 класу. Підручники та посібники.2020..pdf`.
**PDF page = book page.** The text layer is garbled (broken font encoding): read the pages as pictures, and type the text from them.

```sh
B=~/Documents/2026-2027/Lucas/Optima/ПІДРУЧНИК_Савчук*.pdf; S=<scratchpad>
pdftoppm -r 110 -f 4 -l 6 -png $B $S/l     # to read; -r 200 for the crops and small print
```

- Theme titles: big blue capitals («ОСІНЬ НАША, ОСІНЬ — НЕБА ЯСНА ПРОСИНЬ») and a light-blue subtitle («ДО ШКОЛИ ІДЕМО В РАДІСНИЙ ЧАС»): a part of the side bar = the subtitle.
- A lesson = one text (pink capitals title, the author in italics on the right) and every task after it up to the next text.
  A text in numbered parts («I. Урок малювання», «II. Перерва») = one lesson with one `texts` entry per part.
- Icons: a child reading = read the text, two children = pair work, a child with a speech bubble = questions, a chest = «словникова скарбничка» (word meanings).
- The last built lesson is the last card in `lessons.js`.

## 2. The text

- Exactly as printed: words, punctuation, — dashes in dialogue, « » quotes, ’ apostrophes; the book's stress marks are dropped. Poems: `poem: true`, `paras` = stanzas (arrays of lines) in reading order
  (a two-column poem: the left column, the right column, then a stanza printed in the middle). Prose: `paras` = paragraphs (strings).
- One page must fit a landscape tablet (1280×800) with the buttons under it: a longer text goes into `pages: [[…], […]]` instead of `paras`,
  cut at a stanza or paragraph (a poem: about 4 four-line stanzas a page; prose: about 8 lines of the book). Check with a 1280×800 screenshot.
- `task` = the book's instruction above the text («Прочитай вірш і скажи, який настрій він створює.»), `author`, `kind` («Вірш», «Оповідання», «Байка»), `ic`, `from: "с. 4"`.
- `img` = the text's picture cropped from the book (~500–700 px). A text without a picture: crop the nearest one of the lesson, or ask.
- Words missing or unreadable in the scan: never guess, ask.

## 3. The questions (slides)

Each bullet / question of the book = one item, in book order, in a group («💬 Питання до вірша»). Every item: `q` (the book's wording, a long one split in two items),
`ic` (one or two emoji) or `img`, `rows`, and `x` (where the answer is in the text, with the quote and the `[answer]` in brackets).

| The book asks                                               | Row                                                                                                                                                     |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| something the text says (who, what, what does X teach)      | `{ch: [3 options], a}` (the text's words; wrong ones plausible but clearly wrong)                                                                       |
| the mood, intonation, the main idea                         | `{ch, a}` (радісний / сумний …)                                                                                                                         |
| how many stanzas / parts / characters                       | `{ch: ["4", "6", "7", "8"], a}`, counted by you                                                                                                         |
| about the child himself, wishes, «поясни», «як ти розумієш» | `{open: "model answer"}` + `help` (1–2 lines that lead to an idea)                                                                                      |
| «Утвори прислів’я» / match halves                           | one item per proverb: `q` = its beginning («Наука в ліс не веде, …»), `mean` = its meaning (a box beside the choices), one `{ch: [all endings], a}` row |
| a table to fill (compare two texts)                         | one `ch` row per cell                                                                                                                                   |

The right answer is in a different place in each row (the engine does not shuffle). Leave out: «виразно прочитай перед класом», photos, drawing,
«перегляньте відео», tasks about a book that is not in the textbook; list them in the file comment and for the user.

## 4. Write, check, register

- `lesson-N.js` (shape of lesson-1.js), `lesson-N.html` (copy lesson-1.html: change the `.js` and the `<title>` = «<title> · Українська література»).
- `node .claude/scripts/ukr-lesson-check.js optima/grade-3/ukr-lit/lesson-N.js` must print OK.
- Play and look (from the repo root):

```sh
SH=.claude/scripts/ukr-lesson-shot.sh; D=optima/grade-3/ukr-lit
for g in 0 1; do bash $SH - $D lesson-N.html "reset;tab:tasks;click:#g-$g;all;log"; done                          # every item ✓
bash $SH <scratchpad>/a.png $D lesson-N.html "reset;click:#x-0;click:[data-m=sent];click:#fwdBtn;click:#fwdBtn" 1280 1000  # a sentence in colour
bash $SH <scratchpad>/b.png $D lesson-N.html "reset;click:#x-0;click:[data-m=word];click:#playBtn;wait:6000" 390 844       # ▶ by words on a phone
bash $SH <scratchpad>/c.png $D lesson-N.html "reset;tab:tasks;click:#g-0;go:2" 1280 800                                     # a question slide
```

Check: the whole text is there in reading order (two columns on a tablet), each page fits 1280×800 with the bar, the sentences split where the book's sentences end, every question slide, a phone width.

- Card in `lessons.js` (`cover` = the text's picture, `en` = author · kind · topic, `note: "с. X–Y · K питань"`), the files and pictures in `also` of the
  «Українська література» entry in `games.js`, plus `countLabel` («N уроків · 2 тексти») / `topics`. `prettier --write`, check again; `VERSION` bump in `sw.js` last, in its own commit.
- Show the user: the text, the questions and their answers (the oral ones with the model answer), what was left out.

## The reader (shared/ukr-lesson.js)

📄 Увесь текст · 👆 По словах · 📏 По реченнях. In the two last modes: ← → by hand (or a tap on the text), ▶ goes on by itself
(🐢 … 🐇: 2.6 s … 0.7 s a word, longer words longer, a sentence = its words × 0.8), 🔊 Вголос reads each word / sentence (▶ then waits for the voice), a tap on a word starts there,
read words turn grey. The buttons sit in a bar under the text, the page buttons on its right; following the words turns the page. A sentence ends after . ! ? … (with » after it), so «— Дзелень! Дзелень!» is two. Reaching the end marks the text ✓ and offers «❓ До питань».
