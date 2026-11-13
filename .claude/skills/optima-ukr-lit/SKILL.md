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
**PDF page = book page.** The text layer is cp1251 read as Latin-1 («Ïðî÷èòàé»): decode it with the helper, then check it against the page picture.

```sh
python3 -I .claude/scripts/savchuk-text.py 5 7          # the decoded text of pp. 5–7 (words cut at a line end joined, stress marks dropped)
B="$(ls ~/Documents/2026-2027/Lucas/Optima/ПІДРУЧНИК_Савчук*.pdf)"; S=<scratchpad>
pdftoppm -r 80 -f 5 -l 7 -png "$B" $S/l                  # the pages as pictures: the layout, the pictures, the order of a two-column poem
python3 -I .claude/scripts/book-pics.py "$B" 6 $S/pics   # the pictures of p. 6 cropped at 200 dpi (+ p6-boxes.png to look at)
```

The table of contents is on pp. 142–144 (`savchuk-text.py 142 144`): one entry = one lesson, in that order. «�» in the decoded text = a lost letter: read it on the picture.

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

- `lesson-N.js` (shape of lesson-1.js) with the head: `part: {k, tab, ic, t}` (the theme: `t` = «THEME · Subtitle», `tab` = a short name; the same `k` for every lesson of it)
  and `card: {en: "author · kind · topic", cover: "<picture name>"}`.
- `node .claude/scripts/ukr-lesson-add.js optima/grade-3/ukr-lit`: makes `lesson-N.html`, rebuilds `lessons.js` from all the lessons' heads,
  and the files, pictures, `countLabel`, `topics` of the «Українська література» entry in `games.js`. Then `prettier --write games.js optima/grade-3/ukr-lit/`.
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

- One commit per lesson (the lesson's files, `lessons.js`, `games.js`); `VERSION` bump in `sw.js` once, last, in its own commit.
- Show the user: the text, the questions and their answers (the oral ones with the model answer), what was left out.

## The reader (shared/ukr-lesson.js)

📄 Увесь текст · 👆 По словах · 📏 По реченнях. In the two last modes: ← → by hand (or a tap on the text), ▶ goes on by itself
(🐢 … 🐇: 2.6 s … 0.7 s a word, longer words longer, a sentence = its words × 0.8), 🔊 Вголос reads each word / sentence (▶ then waits for the voice), a tap on a word starts there,
read words turn grey. The buttons sit in a bar under the text, the page buttons on its right; following the words turns the page. A sentence ends after . ! ? … (with » after it), so «— Дзелень! Дзелень!» is two. Reaching the end marks the text ✓ and offers «❓ До питань».
Pages are made by the engine (poem: whole stanzas up to 16 lines, 12 when a line is over 34 letters and the poem goes in one column;
a block of lines longer than a page is cut; prose: paragraphs up to 480 letters, a longer one at a sentence end). Set `pages` only to cut by hand.
`acro: true | N` colours the first letters of the lines (an acrostic). A text with no picture in the book: leave out `img`, its `ic` is shown big.

## All 87 lessons are built (book pp. 4–140)

The book is done: one lesson per entry of the table of contents, plus one «Перевір свої знання» lesson at the end of each section
(its text = the section's definitions, sayings or title lines; its questions = the review, «з якого твору ці рядки» as choice rows, the book's test).
New work on this book is fixes; a new book of the series would get its own folder and part keys.

## Lessons learned

- The decoded text joins words cut at a line end: a real hyphen there is lost («лісок-перелісок», «сама-самісінька», «жуків-оленів», «весело-весело»),
  and the book's stress marks leave gaps inside words («музик а», «бер езі»). Read every hyphen and gap against the page picture.
- «Прочитай виділене / поясни виділені вислови»: the bold words are only on the picture (the text layer has no bold). Crop the page and look; never guess.
- A task box between two texts (riddle, «Утвори прислів’я», a rule box) goes with the text it is about; a «Перевір себе» test after a text goes in its lesson
  (the book's letters а) б) в) kept in the options).
- Quotes inside a title: the book nests «…«…»…»; never write "…" inside a JS string («Їдемо на «Бережок»!»).
- `ic` holds at most 2 emoji: ZWJ families (👨‍👩‍👦) count as 3.
- Proverbs: one slide per proverb, `q` = its beginning, the endings as choices, `mean` = its meaning (the user asked for this).
- The right answer is in a different place in each row; a choice list of the book's own words (a test, a word bank) stays in the book's order.
- Picture crops: `book-pics.py` boxes often include a title, the page garland or a strip of text; look at every crop and trim it.
- Write and register one lesson at a time: `ukr-lesson-add.js` registers every `lesson-N.js` in the folder, also one not yet committed.
- Personal answers (`open`) are models, never the child's real data (no guessed name or age).
