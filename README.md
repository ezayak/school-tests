# Study Games

Picture quiz games for school tests. A small switch at the top of the home page picks the school: **SJAS** (opens by default) or **Optima** (the Ukrainian school);
see "Schools". Home page: the grade tiles, then a side bar (`Kit.sideNav`): **Subjects** (per grade, one card per subject, opening a list page with the lessons or dictations of every term)
and one **Revision T1**, **Revision T2** … per term with revisions (per grade, two folding sections, **Mid-term** and **Final**, with the subject cards; a new term's part appears with its first revision).
The open part and each section's open / closed state are remembered on the device. Every card has the same height: the lesson line is cut after 2 lines and the topics after 4.
Every page is a plain HTML file (no build step), so the repo works as-is on GitHub Pages.
All styling and the small JS helpers come from `shared/` — pages have no `<style>` blocks of their own.

## Structure

```
index.html            ← home page, lists every game from games.js
index.css             ← home page layout (loads after shared/theme.css)
games.js              ← catalog: one entry per game
shared/               ← the one place for styling and shared helpers (see "Styling")
grade-3/
  term-1/
    mid-term-1/            ← revisions
      science-motion.html
      social-studies-weather-climate.html
      french-la-presentation.html
    arabic/ english/       ← subject pages (lessons, dictations)
    religion/              ← Religion lessons (the Arabic lesson engine from arabic/)
  computer/                ← Computer: one subject for all terms
    index.html, lessons.js ← list of lessons, by chapter
    chapter-1/             ← Unit 1 lessons (lesson-N.html/.js, img/, video/)
    chapter-2/             ← Unit 2 lessons (Mini Word: shared/wordsim.js/.css)
grade-4/
  term-1/
    mid-term-1/
      science-energy.html
      social-studies-land-regions-climate.html
      french-la-rencontre.html
    english/ french/
  computer/
    index.html, lessons.js
    chapter-1/             ← Unit 1 lessons + Mini Windows (winsim.js/.css)
    chapter-2/             ← Unit 2 lessons (Mini Word: shared/wordsim.js/.css)
  science/                 ← Science: one subject for all terms, Computer lesson engine
    index.html, lessons.js ← list of lessons, by book topic
    topic-1/ … topic-8/    ← one folder per book topic (lesson-N.html/.js, img/, video/)
  social-studies/          ← Social Studies (English): all terms, Computer lesson engine
    index.html, lessons.js ← list of lessons, by chapter
    chapter-1/             ← Chapter 1 lessons (lesson-N.html/.js, img/)
  math/                    ← Math: all terms, Computer lesson engine + shared/math.js
    index.html, lessons.js ← list of lessons, by book unit
    unit-2/ unit-3/ unit-4/ ← one lesson page per unit (<name>.html/.js, img/cover.jpg)
optima/                    ← the Ukrainian school (school: "optima" in games.js)
  grade-3/
    ukr-lit/               ← Українська література: index.html (list of texts), texts.js, <text>.html/.js
speech/                    ← Мовлення: speech games (school: "speech" in games.js), one folder per language
  uk/                      ← letters.js (the ABC), syllables.js, positions.js, places.js, phrases.js, verbs.js, one folder per group of games
    abc/                   ← Абетка: index.html (list of games), list.js, cards.html, guess.html, build.html, fly.html
    syllables/             ← Склади: the same pages, with data-deck="syllables"
    sentences/             ← Речення: positions.html (cards), positions-guess.html, positions-place.html, with data-deck="positions";
                              phrases.html (cards), phrases-build.html, phrases-guess.html, with data-deck="phrases";
                              where.html (cards), where-say.html (data-view="say"), with data-deck="where" (../where.js)
    verbs/                 ← Дії: index.html, list.js, cards.html, guess.html, with data-deck="verbs"; build.html (data-deck="verbWords"), forms.html (data-deck="verbForms")
    img/positions/         ← the position pictures, cut from the parent's posters (no labels, no frame), <name>-1.jpg / -2.jpg
    body/                  ← Частини тіла: cards.html, guess.html (data-deck="body"), build.html (data-deck="bodyWords"),
                              phrases.html, phrases-build.html, phrases-guess.html (data-deck="phrases" with ../body-phrases.js)
    grammar/               ← Граматика: pronouns.html (cards, data-deck="pronouns"), table.html (data-view="table"),
                              who.html (data-view="who"), the last two with data-deck="grammar" (../grammar.js)
    img/things/            ← the pictures of the parent's collage of cards (no labels), 300×300
    img/body/              ← the pictures of the parent's poster «Частини тіла й обличчя» (below the labels), 320px high; face = its big face
  en/                      ← English (<html lang="en">, a US voice, English interface): letters.js (26 letters, the voice says their names)
    abc/                   ← ABC: the same pages as uk/abc, with lang="en" (build.html loads only letters.js)
    sentences/             ← Sentences: positions.html, positions-guess.html, positions-place.html (as in uk/sentences);
                              positions.js has the English sentences and img: "../../uk/img/positions/" (the same pictures),
                              places.js loads after ../uk/places.js and puts English words into the same scenes;
                              phrases.html, phrases-build.html, phrases-guess.html (phrases.js, img: the uk collage pictures)
    verbs/                 ← Verbs: cards.html, guess.html, build.html (verbs.js, img: the uk collage pictures); no «How to say it?»
                              (in English «I eat» is the same form as «eat»)
  ar/                      ← Arabic: letters.js (28 letters, their names, a word each)
    abc/                   ← Arabic ABC: the same pages as en/abc, with the Naskh font
    sentences/             ← Arabic sentences: positions.html, positions-guess.html, positions-place.html (as in en/sentences);
                              positions.js (its own `note` about the families), places.js (Arabic words for the same scenes);
                              phrases.html, phrases-build.html, phrases-guess.html (phrases.js, the uk collage pictures)
    syllables/             ← Arabic syllables: cards.html, guess.html (syllables.js: 12 consonants with fatha, damma, kasra and the
                              long vowels, a word each, 3 short words to read per consonant; a syllable is coloured whole, ا و ي red)
    verbs/                 ← Arabic verbs: cards.html, guess.html, build.html (verbs.js: no infinitive in Arabic, so t is
                              the verb as he says it, «آكُلُ», and w «أَنَا [آكُلُ]»)
```

Folder names: `grade-N`, `term-N`, and the period as `mid-term-1`, `final-term-1`, `mid-term-2`, `final-term-2`, …

## Styling

One look for every page. Colours, fonts, buttons, cards and subject colours (`--sci`, `--en`, `--fr`, …)
live in `shared/theme.css`; change them there and every page follows.

| File                                             | What                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Who loads it                                                                                                                           |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `shared/theme.css`                               | colours (light/dark), fonts, page, cards, buttons, menu tiles, the typing box (`.spell-in`, `.diff`)                                                                                                                                                                                                                                                                                                                                                                                   | every page, first                                                                                                                      |
| `shared/quiz.css`                                | quiz parts: score bar, picture, answers, matching, results, SVG drawing colours                                                                                                                                                                                                                                                                                                                                                                                                        | quiz games, Arabic lessons                                                                                                             |
| `shared/arabic.css`                              | Arabic text, Arabic answers, folder tabs, Bible verse and reference                                                                                                                                                                                                                                                                                                                                                                                                                    | Arabic and Religion lessons, Arabic revision quizzes                                                                                   |
| `shared/arabic-revision.css`                     | word tools, English toggle                                                                                                                                                                                                                                                                                                                                                                                                                                                             | religion / Arabic social-studies revisions                                                                                             |
| `shared/spelling.css` / `shared/spelling.js`     | English dictations: flash cards, letter tiles, the engine (`window.SPELLING`)                                                                                                                                                                                                                                                                                                                                                                                                          | English dictations                                                                                                                     |
| `shared/drag-words.css`                          | drag tiles from a bank onto a line (with `Kit.dragTiles`)                                                                                                                                                                                                                                                                                                                                                                                                                              | "Mets en ordre", "Build the word", Arabic homework (word order)                                                                        |
| `shared/lesson.css`                              | lesson pages with tabs, picture cards, games (subject colour = `--accent`)                                                                                                                                                                                                                                                                                                                                                                                                             | French and Computer lessons, English stories                                                                                           |
| `shared/story.css`                               | English stories: page text, the sentence being read, easy sentence, word meanings                                                                                                                                                                                                                                                                                                                                                                                                      | English stories                                                                                                                        |
| `shared/reading.css` / `shared/reading.js`       | Ukrainian reading game: syllable tiles, flashing words, timed reading, the rocket                                                                                                                                                                                                                                                                                                                                                                                                      | Optima Українська література                                                                                                           |
| `shared/ukr-lesson.css` / `shared/ukr-lesson.js` | Ukrainian language and reading lessons: the text reader (whole, by words, by sentences), rule slides, exercises with choices, letter and word tiles                                                                                                                                                                                                                                                                                                                                    | Optima Українська мова, Українська література (book lessons)                                                                           |
| `shared/speech.css` / `shared/speech.js`         | Speech games: game lists, ABC cards (card + letter panel)                                                                                                                                                                                                                                                                                                                                                                                                                              | Мовлення                                                                                                                               |
| `shared/math.js` / `shared/math.css`             | Math: column sums with carry boxes, number pad, schemas (bar models), groups, arrays, times-table flower, place-value chart, number line                                                                                                                                                                                                                                                                                                                                               | Math lessons                                                                                                                           |
| `shared/common.js`                               | `Kit.esc`, `Kit.shuf`, `Kit.pick`, `Kit.star`, `Kit.lessonCard` (lesson-hub cards; `cover` picture or `ic` emoji), `Kit.scene` / `Kit.idiom` / `Kit.blocks` (animated pictures, sentence blocks), `Kit.dragTiles` (drag or tap tiles from a bank onto a line: letters of a word, words of a sentence; works right-to-left; every tile game uses it), `Kit.voice(lang, {online})` (device voice: `say`, `hush`, `has`; `online`: Google's online voice first, the device voice offline) | quiz games, French and Computer lesson lists, French lessons, English stories and lessons, tile games, Ukrainian reading, speech games |

Rules for new pages:

- Copy an existing page of the same kind and keep its `<link>`s. Never add a `<style>` block or new colour values.
- A rule needed by more than one page goes into the matching `shared/` file, not into the page.
- A new file in `shared/` must also be added to `CORE` in `sw.js` (then bump `VERSION`), or it won't work offline.

## Adding a new game

1. Save the game HTML into the right folder, e.g. `grade-4/term-1/final-term-1/science-light.html`.
   Start from a page of the same type (see "Styling") so it loads the right shared files.
2. Add one entry to `games.js` (copy an existing line and change grade, term, period, subject, title, path).
3. Commit and push. The home page picks it up automatically.

Games link back to `../../../index.html`, so keep them exactly three folders deep (Computer lessons too: `grade-N/computer/chapter-N/`).
The Computer lesson lists (`grade-N/computer/index.html`) are two folders deep and use `../../`.

## Schools

The home page shows one school at a time. The switch (top right) has one logo per school; the chosen school is remembered on the device, SJAS when nothing is saved.
Anchors open a school and its filter directly: `index.html#sjas`, `#optima`, `#speech`, with a grade or language `#sjas/grade-3`, `#speech/en`
(no filter = all; an unknown school or grade falls back). The address follows the switch and the filter, so the link can be copied at any time.
The schools are listed in `SCHOOLS` at the top of `index.js`:

```js
{ k: "optima", name: "Optima", logo: "icons/optima.svg", wide: true, revisions: false }
```

- `k`: the name used in `games.js` (`school: "optima"`) and on `<body data-school="optima">`. A game without `school:` belongs to SJAS.
- `logo`: a picture in `icons/` (`wide: true` for a logo with the name in it), or `ic: "🧠"` to show an emoji with the `name` instead.
- `revisions: false`: only the **Subjects** cards (with a "Subjects" / `subjectsTitle` heading), no side bar.
- Each school keeps its own grade filter and open side bar part.

Each school has its own graph-paper colour: `[data-school="optima"]` in `shared/theme.css` (light and dark). Optima pages set `data-school="optima"` on `<body>` too.
New school: add it to `SCHOOLS`, put its logo in `icons/` (and in `CORE` in `sw.js`), give its games `school: "<k>"`, and add its paper colour to `theme.css` if it needs one.

Ukrainian text: Lilita One and Atkinson Hyperlegible have no Cyrillic letters, so the font stacks in `theme.css` fall back to **Nunito** for them.
Pages with Ukrainian text load Nunito with the other Google fonts (the home page and the Optima pages do).

## Ukrainian reading (Optima, Grade 3)

Folder: `optima/grade-3/ukr-lit/`. One card on the Optima home page ("Українська література", colour `--ulit`) opens `index.html`: the book lessons of `lessons.js`
(see "Ukrainian language and reading lessons" below) and, as the last part of its side bar, «🚀 Складова ракета»: the texts from `texts.js`
(`items: [{n, title, en, path, ic, note}]`, `ic` = the emoji on the card). The page itself is drawn by `shared/ukr-lesson.js`. Made for a child who reads slowly; everything on screen is in Ukrainian.
The engine is `shared/reading.js` + `shared/reading.css` (`<body data-view="list|game">`); the page loads `shared/common.js`, its `<text>.js`, then the engine.

A text page has three steps (tabs), the rocket climbs a little in each:

- **1. Склади** – the long words, one at a time, cut into syllables: tap them in order, they join into one word, read it whole.
  **🔊 Читати разом** reads each syllable aloud as it is tapped, then the word (device voice, Ukrainian; ▶ Послухати plays it first).
- **2. Слова** – words flash for 15, 10, 6, 5, 4, 3 or 2 seconds; «Ще раз» sends a word back to the end of the line.
- **3. Читання** – the whole text line by line with a stopwatch (tap the text or «Далі»); the best time is saved on the device,
  with a separate record when «показати склади» is on.

### `<text>.js` format

```js
window.READING = {
  key: "ulit3-bohdanchyk",      // saves the step, switches, speed and best times on the device
  title: "Богданчик", sub: "Складова ракета",
  text: ["Бог-*дан-чик си-*дів *ос-то-ронь.", …],   // the lines of the timed reading
  launch: ["Бог-*дан-чик", …],  // step 1: long words to read by syllables
  fuel: ["*ос-то-ронь", …],     // step 2: words that flash
};
```

`-` goes between syllables and `*` before the stressed syllable (shown in colour), also before an opening quote (`"*«Ма-буть,"`).
A real hyphen inside a word is `‑` (non-breaking hyphen) at the end of its syllable: `"*мо-ря‑-о-ке-*а-ни"`.
A long text has `pages: [[lines of page 1], [lines of page 2], …]` instead of `text` (`litachky.js`): Читання shows one page at a time,
«Далі» after its last line turns the page, the rocket starts again from the ground; one stopwatch and one record for the whole text.
«↺ скинути» next to the record clears it (after a question).
New text: copy `bohdanchyk.html` (change `bohdanchyk.js`), write its `.js`, add it to `texts.js`, add both files to the `also: [...]` list of the
Українська література entry in `games.js`, update its `countLabel` / `topics`, and bump `VERSION` in `sw.js`.

## Ukrainian language and reading lessons (Optima, Grade 3)

Two cards on the Optima home page, one engine: `shared/ukr-lesson.js` + `shared/ukr-lesson.css` (the lesson layout and tiles come from `shared/math-uk.css`, the tiles from `shared/drag-words.css`).

- **Українська мова** (colour `--umova`): `optima/grade-3/ukr-mova/`, book Н. Кравцова, О. Придаток, В. Романова «Українська мова та читання. Частина 1» (2020); a lesson = one topic of the book. Skill `optima-ukr-mova`.
- **Українська література** (colour `--ulit`): `optima/grade-3/ukr-lit/`, book А. Савчук «Українська мова та читання. Частина 2» (2020); a lesson = one text and its questions. Skill `optima-ukr-lit`.

A hub (`<body data-view="list" data-subject="Українська мова">`) lists `lessons.js`: `window.UA_LESSONS = {subject, grade, intro, parts: [{k, tab, ic, t, items: [{n, title, en, path, cover | ic, note}]}]}`
(a part = a section of the book, a part of the side bar); the reading hub also loads `texts.js` and adds «🚀 Складова ракета». A finished lesson gets «✓ Пройдено» (`ua-complete` on the device).
A lesson page (`data-view="lesson"`, the same `data-subject`) loads `shared/common.js`, its `lesson-N.js`, then the engine. Two tabs of tiles:

- language: **📘 Урок** (one tile per slide: the rule with the book's examples, ← →, 🔊) and **✏️ Вправи** (one tile per group of exercises);
- reading: **📖 Текст** (one tile per text) and **❓ Питання** (one tile per group of questions).
- The reader: 📄 Увесь текст · 👆 По словах · 📏 По реченнях; the word or sentence in colour, read ones grey; ← → or a tap on the text by hand, ▶ by itself at 🐢 … 🐇,
  🔊 Вголос reads each one (device voice, Ukrainian), a tap on a word starts there. The buttons are in a bar under the text (it stays at the bottom edge on a phone).
  A text in `pages` shows one page at a time (◀ Сторінка 1 з 2 ▶); following the words turns the page by itself. The end marks the text read.
- An exercise / a question: one at a time with a strip of them on top (green ✓ = done), 💡 Підказка (`help`), 📝 Відповідь (the answers and `x`), ✓ Готово, «Далі →» always works.

### `lesson-N.js` format

```js
window.UA_LESSON = {
  subject: "Українська мова",  // or "Українська література"
  key: "um3-l1", n: 1, title: "Звуки і букви", pages: "с. 4–5", img: "img/lesson-1/",
  part: { k: "sounds", tab: "Звуки і букви", ic: "🔤", t: "Звуки і букви. Алфавіт. Наголос" },  // the side bar part
  card: { en: "the card's line", cover: "eagle" },                                            // the card in lessons.js
  learn: [{ t, ic, lines: ["text with [key words]"], ex: ["examples"], img, text, from: "№ 1, с. 4" }],   // language
  texts: [{ t, author, kind, ic, task, img, from, poem: true, paras: [["line", …], …] | ["paragraph", …] }], // reading
  // pages are made by the engine (poem: whole stanzas up to 16 lines, 12 in one column; prose: paragraphs up to 480 letters);
  // pages: [[paras of page 1], …] instead of paras sets them by hand. A poem with a line over 34 letters is one column.
  // acro: true | N — an acrostic: the first letter of every line (or of the first N lines) in colour
  // no img (the book has no picture for the text): its ic is shown big instead
  groups: [{ t, ic, items: [{ n, k, chip, p, hw, q, tip, mean, ic | img, rows: [...], help: ["…"], x: ["…"] }] }],
};
```

Rows: `{q, ch: [...], a}` (choose; `a: [..]` = several, «Обери кілька.» is shown), `{q, word: "звуки", alt}` (letter tiles, `Kit.dragTiles`),
`{q, order: [words], alt: [[…]]}` (word tiles in order; `alt` = other right orders), `{q, open: "model answer"}` (said aloud; ✓ Готово marks it done).
An item's id is `k`, else `n`, else its place («1-3»): give `k` when a book number has several items. `chip` = its name in the strip, `tip` = the words the task works on, `mean` = a meaning shown in a box beside the choices (a proverb).
The engine does not shuffle choices: put the right one in a different place each time. `img` names a `.jpg` in the lesson's `img` folder.

New lesson: the skill (`.claude/skills/optima-ukr-mova` or `optima-ukr-lit`): write `lesson-N.js`, then `node .claude/scripts/ukr-lesson-add.js <folder>`
(the html, `lessons.js` rebuilt from the lessons' `part` / `card`, the files and pictures in `also` of the subject's entry in `games.js`, `countLabel`, `topics`),
`node .claude/scripts/ukr-lesson-check.js <lesson-N.js>`, then bump `VERSION` in `sw.js`.

## Ukrainian math (Optima, Grade 3)

Folder: `optima/grade-3/math/`. One card on the Optima home page ("Математика", colour `--math`) opens `index.html`, which lists the lessons from `lessons.js`
(`parts: [{k, tab, ic, t, items: [{n, title, en, path, ic, note}]}]`, a part = a section of the book and a part of the side bar: `tab` its short name, `t` the book's title). Book: М. Козак, О. Корчевська «Математика. Частина 1» (2020); a lesson = one green title in the book.
The engine is `shared/math-uk.js` + `shared/math-uk.css` (`<body data-view="list|lesson">`); a lesson page loads `shared/common.js`, `shared/math.js` (the bar schema), its `lesson-N.js`,
`shared/times-games.js` (the table games, also used by the Grade 4 Multiplication and Division games; styles `shared/times-games.css`), then the engine.
Everything on screen is in Ukrainian. A lesson has two tabs of tiles:

- **📘 Урок** – one tile per slide; the slides explain the topic with the book's examples (← →, 🔊).
- **✏️ Задачі** – one tile per group (a type of exercise); a group shows its exercises one at a time, with a strip of them on top (green ✓ = done).
  The child solves on paper and types the answer (number pad; a block of > < = under comparisons). ✓ Готово checks; all right → done, saved on the device.
  💡 Підказка = the schema of a word problem, 📝 Розв’язання = the steps; «Далі →» always works. The answer box of a word problem sits inside the answer sentence.
- A lesson with every exercise done is finished: «✓ Урок пройдено» next to its title and a green «✓ Пройдено» tag on its card in the list
  (saved on the device in `mu-complete`, by page path; the games don't count). `Kit.lessonCard` shows the tag for any card given `done: "text"`.
- A lesson with `drill` adds two game tiles: **🎲 Таблиця врозкид** (every example of the table once, typed) and **🚀 Ракети** (a rocket flies across with an example,
  tap the right one of 4 answers before it is gone; 🐢 / 🐇 speed). Both end with the score, 🎆 / 👍 / 😢 (90 % / 70 %) and the list of mistakes; the best score is saved.

### `lesson-N.js` format

```js
window.MATH_LESSON = {
  key: "om3-l2", n: 2, title: "…", part: "Повторення за 2 клас", pages: "с. 5", img: "img/lesson-2/",
  drill: { mul: [4] },          // optional: n · 2 … n · 9 (div: [4] → 8 : 4 … 36 : 4)
  learn: [{ t, ic, lines: ["text with [key words]"], text, ex: ["worked lines"], img, schema, from: "№ 7, с. 5" }],
  groups: [{ t: "Обчисли", ic: "🧮", items: [{ n: "9", p: 5, hw, q, tip, img, rows: [...], help, schema, steps, answer }] }],
};
```

Rows: `{e: "34 − (18 − 9)"}` (worked out; `q` = a label; `■` = the answer of the row before, `{h}` = a heading that resets it);
`{cmp: ["78 − 24", "64"]}` (the sign worked out) or with units `{cmp, a: "<", why}`; `{q, ch: [...], a}` (choose; `a: [..]` = several); `{ops: "14 ● 2 ● 8", eq: 15, a: [":", "+"]}` (signs between numbers, any that give `eq`);
`{q, a: [numbers], pre, post, mid, any, alt}` (boxes; `mid` = the words between them, «2 м 5 дм»; `any` = in any order; `alt` = other right answers of one box). A word problem has `help`, `schema` (`kind: "bar"`, see `shared/math.js`), `steps`, `answer`.
Expressions are text with `+ − · :` and brackets (`×` and `-` are read too). `img` names a `.jpg` in the lesson's `img` folder.

New lesson: the `optima-math` skill (`.claude/skills/optima-math/SKILL.md`): write `lesson-N.js`, run `scripts/add.js` (the html, the card in `lessons.js`,
`also` and `countLabel` in `games.js`), run `scripts/check.js`, and bump `VERSION` in `sw.js`.

## Speed reading (Optima, Grade 3: Швидкочитання)

Folder: `optima/grade-3/speed-reading/`. One card on the Optima home page ("Швидкочитання", colour `--sread`) opens `index.html`: the cards of `list.js`
(`items: [{sec, n, label, title, en, path, ic | cover, note}]`) in three side-bar sections (`Kit.sideNav`): **🎯 Щодня** (`sec: "daily"`), **📒 Книжка** (`"book"`), **⏱ Тексти** (`"texts"`).
Engine: `shared/speed-reading.js` + `.css` (`<body data-view="list">` for the hub, `<body data-game="…" data-sec="daily|book|texts">` for a game; `data-sec` = the hub section the back link opens).
Everything on screen is Ukrainian (Nunito). Sources and what each part became: `SOURCES.md` in the folder.

- **Щодня** (from the 30-day programme `speed-reading.txt`, grouped by skill, no days): data `daily.js` (`window.DAILY`) and `catch.js` (`window.CATCH`, look-alike groups).
  Games: `catch` «Ловимо фішки» (`shared/word-games.js` with `data-lang="uk"`: 👀 see / 🔊 hear the word, levels Склади · Слова · Закінчення), `flash` «Склади-блискавки»,
  `which` «Яке слово?» (uses `catch.js`), `gaps` «Пропущене», `phrases` «Читаємо фразами», `pics` «Яка картинка?» (`Kit.scene` pictures that grow step by step),
  and four texts `text-garden|forest|library|kitten.js` (`<body data-game="text">`).
- **Книжка** (eye exercises of «Школа швидкочитання, 1 клас»): data `book.js` (`window.BOOK`, one key per game, the book page in a comment), pictures `img/book/`.
  Games: `schulte`, `table`, `wedge`, `odd`, `sizes`, `colors`, `cross`, `poem`, `anagram` and `mirror` (tiles: `Kit.dragTiles`, the page loads `drag-words.css`), `circle`, `split`, `hidden`, `lines`.
- **Тексти**: the booklet's 14 texts, `text-pN.js` (N = the book page) with pictures in `img/texts/`. Kept exactly as printed: syllables, `{name}` = a picture in place of a word,
  `■` = a missing letter, `cut: "bottom" | "top"` = the letters cut off (the data has the whole words; CSS masks each line).

A text page (`window.TEXT`): `{key, title, ic | cover, page, author, words, book, paras: [[lines]], q: [{q, o: [[answer, emoji], …]} | {q, open: true}], readings, mist, dialog, roles, cut}`.
Tabs: 📖 Читаю (blurred until ▶, stopwatch, words per minute, record or the times of `readings`; «Увесь текст» or «По реченню / По рядку»), ❓ Питання (first option right), 🔎 Помилки (`mist: [{s, bad, fix}]`).
Games end with stars and "N з M з першого разу" (or the time and record); the choices of a start screen are kept on the device (`sr-<game>-…`).

New material: add to the data file (or a new `text-*.js` + a copy of `text-garden.html`), a card in `list.js`, the files in `also` of the Швидкочитання entry in `games.js`
(and `countLabel`), a row in `SOURCES.md`, and bump `VERSION` in `sw.js`.

## Speech games (Мовлення)

The third button in the school switch (🗣️ Мовлення). Games for a child with aphasia: everything is said aloud, a picture on every item.
The pictures and words come from the parent's cards «Українська абетка» (a claude.ai canvas: pages Абетка, Літери, Склади, and Застосунок with the app layouts).
Engine `shared/speech.js` + `shared/speech.css`; a game is only a data file. Voice: `Kit.voice(lang)` (`shared/common.js`), the device voice of the data's `lang`.

- Folders: `speech/<lang>/<group>/` (three deep, like every game). `uk`, `en` (data `lang: "en-US"`), `ar` (data `lang: "ar"`).
- Arabic: classical Arabic with full tashkeel (the online voice reads it right; Egyptian is not written correctly by it). The pages are
  `<html lang="en">` (English interface, like the Arabic lessons) and load the Noto Naskh Arabic font; the engine sets `body[data-lang="ar"]`
  (the Naskh font, right-to-left letter panel, line and bank) and asks `Kit.voice(lang, {online: true})`: Google's online voice while online
  (the tablet's own Arabic voice does not speak), the device voice only offline; the pages have `<meta name="referrer" content="no-referrer" />`. A letter keeps its haraka on its tile («بَ»); أ إ آ, ئ, ؤ and ة say the name of ا, ي, و and ت.
  Build the word shows the placed letters joined above the line (`#prev`, as the Arabic lessons' word game), so he sees how they connect.
- A group (Абетка, …) is one card on the home page (`subject` = its topic in English, the same for every language: ABC, Syllables,
  Sentences, Verbs; the home page's «All topics» filter and «Topics» heading, each topic with the cards of all languages; colour `--speech`, `lang: "uk"` instead of a grade:
  the home page's first filter and sections are the languages, `by` in `SCHOOLS` in `index.js`), opening `index.html` with its games from `list.js`
  (`items: [{n, title, en, path, ic, note}]`, `en` = the line under the title, in Ukrainian here).
- A game page is `<body data-view="…" data-school="speech">`, loading `shared/common.js`, its data, then `shared/speech.js`.
  The interface texts (buttons, titles, hints) come from `TEXTS` in `speech.js` by the page's `<html lang>` (`uk`, `en`);
  a new language adds its table there (only the syllables deck is Ukrainian-only). A data file's `img` points to another
  language's pictures (`"../../uk/img/things/"`), so the pictures are not copied.
- Each game works on a deck: `data-deck="letters"` (or none, data `../letters.js`), `data-deck="syllables"` (`../syllables.js`),
  `data-deck="words"` (both files: every picture word of the cards and sheets, without ’, in sets by length)
  `data-deck="positions"` (`../positions.js`), `data-deck="phrases"` (`../phrases.js`) or `data-deck="verbs"` (`../verbs.js`).
  The deck (`letters()` / `syllables()` / … in `speech.js`; positions, phrases and verbs share `pictures()`) says what the cards show and say, the panel, and the wrong answers in the guessing game.

Games:

- **Картки** (`data-view="cards"`): the parent's layout «A · Card + letter panel». Tap the card (or 🔊, ‹ ›, a letter):
  the letter's name (the syllable), a pause, the word. Syllables: the panel has the 12 consonants, the 6 syllables of the chosen one
  and the sheet's words (🔊 ма-ма: each syllable, then the word). The card sizes its letter, picture and word from its own box, so it fits a phone held sideways too.
- **Вгадай літеру / Вгадай склад** (`data-view="guess"`): ▶ Почати, then 10 letters (syllables): the voice says one, tap it among 4.
  Syllables: the start screen chooses Усі or one consonant (saved); the wrong answers are 2 with the same consonant (МА – МО) and 1 with the same vowel (МА – НА).
  Right: it turns green, the letter's picture and word appear and the word is said, then the next letter. Wrong: it shakes, turns red, the letter is said again.
  ⭐ = letters found at the first tap; the end screen shows 3 stars and 🔁 Ще раз.
  Two modes, switched at any time in the game (saved on the device): «🖼️ З картинкою» shows the letter's picture next to 🔊 as a hint, «🔊 Без картинки» only the sound.
- **Склади слово** (`data-view="build" data-deck="words"`, loads `drag-words.css`): the picture is shown and the word said (mode «🔤 Картинка і слово»
  also shows the word written, «🖼️ Тільки картинка» hides it); its letters are put in order on the line with `Kit.dragTiles` (tap or drag), each letter said as it lands.
  A full line is checked: right → green, the word is said, the next word; wrong → red, the letters from the first wrong one go back. 💡 (next to 🔊) puts the next right letter.
  Sets «3 літери», «4 літери», «5 літер», «6+ літер», «Усі»; 8 words a round, ⭐ = no mistake and no help.
- **Лови літеру** (`data-view="fly"`, data `../letters.js`): the start screen picks the letter (or 🎲 any; saved). Letters float up through the sky
  (about 4 in 10 are the one shown on top); tap them: right → pops, ⭐, the letter is said; wrong → shakes red, the letter on top is said again.
  🐢 Повільно / 🐇 Швидше at any time (saved). 10 caught letters end the round; stars by wrong taps (none 3, up to 2 → 2, more 1).
  Headless Chrome hardly runs `requestAnimationFrame` under `--virtual-time-budget`: a test harness replaces it with a 16 ms timer.
- **Речення · Положення** (`data-deck="positions"`): one card per poster picture: the position big on top, the picture, the sentence
  that says who is where («Кіт [за] дверима», the position in colour); tap: the position, a pause, the sentence. The panel has the 10 positions
  and the pictures of the chosen one.
- **Вгадай положення**: the start screen ticks the positions being learnt (saved), at least 3 of different meaning (біля = поруч,
  всередині = у); the voice says a position, the answers are pictures of the other ticked positions, one per meaning; a right tap shows
  and says the sentence. Modes «🔤 Зі словом» (the position written next to 🔊) / «🔊 Тільки звук».
- **Постав** (`data-view="place" data-deck="positions"`, data `../positions.js` + `../places.js`): a drawn scene (table, box, open box,
  chair, two boxes) with dashed spots; «Кіт [під] столом» is read («🔤 Читати»: shown, said only with 🔊) or heard («🔊 Слухати»: said, not shown);
  drag the thing from the tray onto a spot, or tap the spot. Right: it stands there (between the scene's back and front layers when `back`),
  the sentence is said; wrong: the spot shakes red. The positions are ticked as in Вгадай положення; each ticked one gets 5 questions in the pool.
- **Я хочу…** (`data-deck="phrases"`): one card per collage picture: the start of the sentence big on top («Дай мені…»), the picture,
  the whole sentence (the thing in colour); tap: the start, a pause, the sentence. The panel has the 6 starts and the pictures of the chosen one.
- **Склади речення** (`data-view="build" data-deck="phrases"`, loads `drag-words.css`): the build game with the deck's `build`
  (title, modes, labels): the collage picture always shows, its sentence is said, and its words are put in order (each word said as it lands);
  «🔤 Зі зразком» shows the written sentence, «🖼️ Тільки картинка» hides it. Sets «Усі» and each start with at least 4 cards.
- **Вгадай речення** (`data-view="guess" data-deck="phrases"`): the voice says the whole sentence (the deck's `q`), tap its picture among 4;
  the wrong pictures are of the same start first, so the thing tells them apart. «🔤 З реченням» writes the sentence next to 🔊, «🔊 Тільки звук» does not.
- **Дії · Картки / Вгадай дію** (`data-deck="verbs"`): the verb big («їсти»), its picture, «Я [їм]»; tap: the verb, a pause, the sentence.
  The guessing game says the verb, its answers are other verbs' pictures (of the same group first); sets «Усі» and each group.
- **Дії · Склади слово** (`data-view="build" data-deck="verbWords"`, loads `letters.js` for the letter names): the word game with the verbs
  of one word (not «чистити зуби»): the verb's picture (`deck.pic`), the verb (`deck.spell`) said and built from letters.
- **Дії · Як сказати?** (`data-view="guess" data-deck="verbForms"`): the voice says the verb («їсти»), the picture (mode «🖼️ З картинкою»)
  and «Я …» (`deck.prompt`) show; tap the form among 4 words (їм / п’ю / сплю / граю); a right tap shows and says «Я їм».
- **Речення · Місця / Де я?** (`data-deck="where"`, the parent's board «Місця»): cards with the place big, its emoji and «Я [у школі]»;
  «Де я?» (`data-view="say"`, the cards view): the card asks «Де ти?» over the picture and hides the answer («🎤 Скажи сам!»); he says it,
  a tap on the card (Перевір) shows and says «Я у школі» (the answer only); another card hides it again and stays silent; the places done turn green.
- **Граматика** (topic Grammar, the parent's boards «Хто що робить?»): Займенники (`data-deck="pronouns"`: a card per pronoun, its picture,
  «Він гра[є]» with the example verb); Як змінюється дієслово (`data-view="table"`: the pronouns on top in their colours `sp-k0…sp-k6`,
  a row per verb, each cell its form with the ending in the pronoun's colour; a tap says «Він грає», a verb or a pronoun alone);
  Хто що робить? (`data-view="who"`: choose who and the verb, or 🎲; the card shows «👦 він + 🧸 грати» and both pictures,
  he says the sentence, a tap on the card (Перевір) shows and says «Він грає»; another choice hides it again).
- **Частини тіла** (topic Body): Картки (`data-deck="body"`: the word big, the poster picture, «Це моя [голова]»); Покажи (`data-view="guess"`:
  «🔊 Слухати» says the word, «🔤 Читати» shows it and says it only with 🔊 (`deck.read`); pictures that look alike share a family `f`
  and never come together); Склади слово (`data-deck="bodyWords"`: the one-word parts, no ’); Речення, Склади речення, Вгадай речення
  (the phrases pages with `../body-phrases.js`: «У мене болить…», «Мені треба помити…», «Я чищу зуби»; its own `key` and `group`).
- The guessing, building and placing games share `round()` in `speech.js`: the mode switch, the choice of set (or of several groups), the round, the counter and the end screen.

`letters.js` format (`window.SPEECH_LETTERS = {lang, items}`), one item per letter:
`{up: "Б", lo: "б", name: "бе", w: "[б]анан", ic: "🍌"}`: `name` = what the voice says, `w` = the word with its letter in `[ ]` (shown in colour),
`ic` = the picture (emoji), `k: "v"` vowel (red) / `"s"` sign (green) / none consonant (blue). `snd` / `wsnd`: a recording of the letter / the word
(a file path from the data's folder) used instead of the device voice.

`syllables.js` format (`window.SPEECH_SYLLABLES = {lang, groups}`), one group per consonant, from the parent's sheets «Склади»:
`{c: "м", syl: [{s: "ма", w: "[ма]шина", ic: "🚗"}, …], words: ["ма-ма", "ми-ло", "му-ха"]}`: `syl` = the 6 syllables in the sheets' order
(а о у и і е), `w` = a word that starts with the syllable (in `[ ]`), `words` = the sheet's words to read, `-` between syllables. `snd` / `wsnd` as for letters.

`positions.js` format (`window.SPEECH_POSITIONS = {lang, groups}`), one group per position, from the parent's posters «Положення предметів»:
`{t: "за", f: "behind", cards: [{w: "Собака [за] дверима", pic: "behind-door-1"}, …]}`: `f` = the meaning (one for біля and поруч,
one for всередині and у), `w` = the sentence with the position in `[ ]`, `pic` = the picture in `img/positions/`. «зліва від» / «справа від» are left out
(the pictures do not show whose left). Pictures: find the 7×3 grid by the white gaps, then each card's label edge (the first light row)
and frame (a thin coloured line with background inside it), crop inside them, save as JPEG (~210px).

`places.js` format (`window.SPEECH_PLACES = {things, scenes}`): `things: [{t: "Кіт", ic: "🐱"}]`; a scene is drawn in a 400×300 box (floor at 275):
`{name, back: "<svg shapes behind a placed thing>", front: "<shapes in front>", zones: [{f: "under", x, y, s, back: 1}], say: {під: "столом", …}}`.
Shapes use the classes `w` / `w2` (wood, dark wood), `b` / `b2` / `b3` (box, its side, its inside); `f` = the meaning as in `positions.js`,
`x, y` = the spot's middle, `s` = the thing's size in % of the scene's width; `say` = the end of the sentence for each position the scene has.
Only spots that read clearly in a flat drawing (no «перед» or «за» for a table or a chair).

`phrases.js` format (`window.SPEECH_PHRASES = {lang, groups}`), one group per start of a sentence, from the parent's list («Я хочу їсти…»,
«Дай мені…», «Я не хочу…», «Мені потрібно…»): `{t: "Дай мені…", cards: [{w: "Дай мені [ручку]", pic: "pen"}, …]}`: `w` = the whole sentence
with the thing in `[ ]`, `pic` = the picture in `img/things/` (one picture can serve several sentences). Pictures: each card of the collage
cropped above its label (thin tile edges dropped, the tile background made white), on a white 300×300 square.

`verbs.js` format (`window.SPEECH_VERBS = {lang, groups}`), groups of everyday verbs (Вдома, Рухаюся, Вчуся і граю):
`{t: "Вдома", cards: [{t: "їсти", w: "Я [їм]", pic: "eat"}, {t: "митися", w: "Я [миюся]", ic: "🛁"}, …]}`: `t` = the verb, `w` = how he says it
about himself, `pic` = a picture in `img/things/` (precached through the Речення entry) or `ic` = an emoji when the collage has none.

`grammar.js` format (`window.SPEECH_GRAMMAR = {lang, who, example, verbs}`): `who: [{w: "я", ic: "🙋‍♂️"}, …]` (7 pronouns, the order of
the endings), `verbs: [{t: "грати", ic: "🧸", stem: "гра", end: ["ю", "єш", "є", "є", "ємо", "єте", "ють"]}, …]` (`stem + end[k]` = the form for
`who[k]`), `example` = the index of the verb on the pronoun cards.

English and Arabic (`speech/en/…`, `speech/ar/…`, the same pages): `where.js` («I am [at school]», «أَنَا [فِي الْمَدْرَسَةِ]»; ask / game in the
language) and `grammar.js`. English has 6 pronouns (no separate plural «you») and an ending only for he / she (`end: ["", "", "s", "s", "", ""]`);
Arabic changes the start of the verb too, so its verbs give `forms` with the changing parts in [ ] («[تَ]لْعَبُ[ونَ]»), each part in the
pronoun's colour. On a right-to-left page an emoji pair keeps its order (`sp-emo` / `sp-ltr` are isolated left-to-right).

`where.js` format (`window.SPEECH_WHERE = {lang, ask, game, groups}`): `ask` = the question («Де ти?»), `game` = the game's title («Де я?»),
`groups: [{t: "Місця", cards: [{t: "школа", w: "Я [у школі]", ic: "🏫"}, …]}]`.

`body.js` format (`window.SPEECH_BODY = {lang, groups}`), groups Тіло and Обличчя: `{t: "Тіло", cards: [{t: "голова", w: "Це моя [голова]",
pic: "head", f: "head"}, …]}`: `t` = the word, `w` = the card's sentence, `pic` = a picture in `img/body/`, `f` = its family (every card has one;
pictures that look alike share it: рука / зап’ястя / кисть, нога / щиколотка / стопа, очі / вії, рот / зуби / губи, волосся / лоб / скроні, щоки / підборіддя).
`body-phrases.js` is a phrases file (`window.SPEECH_PHRASES`) with `img: "../img/body/"`, `key: "body-say-"`, `group: "Частини тіла"`.
English and Arabic (`speech/en/body/`, `speech/ar/body/`, the same pages): `body.js` and `body-phrases.js` with `img: "../../uk/img/body/"`
(the same pictures). English «This is my [head]», «I have a [headache]», «My [leg] hurts»; Arabic «هَذَا [رَأْسِي]», «أَشْعُرُ بِأَلَمٍ فِي [رَأْسِي]»
(right for every gender), «أَحْتَاجُ أَنْ أَغْسِلَ [يَدَيَّ]»; a long word on the card shrinks to fit (`sp-fit`, counting letters, not harakat).

## Player name

Type a name on the home page, or add `?name=Max` to any game link. The start screen then says "Ready, Max?".
Without a name it just says "Ready?".

## Publish with GitHub Pages

```bash
cd ~/projects/school-tests
git init
git add .
git commit -m "Study games: grade 3 & 4, term 1 mid-term 1"
git branch -M main
git remote add origin https://github.com/<your-user>/school-tests.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
After a minute the site is at `https://<your-user>.github.io/school-tests/`.

## Landscape tablets

Every game fits on one screen when a tablet is held sideways (no scrolling): the picture goes on the left,
the question and answers on the right, and the answer + Next button sit side by side.
This lives in one shared file, `landscape.css`. Pages that load `quiz-common.js` get it automatically;
the English dictations link it last in `<head>`. Portrait tablets and phones are unchanged.
The French and Computer lessons have the same layout built into `shared/lesson.css`.

## Game types

- Multiple choice with a picture for each question
- Matching rounds (tap a word, then its meaning)
- “Mets en ordre” drag-the-words sentence building (French games)
- Score, stars and a review of missed questions at the end; questions shuffle every play

## Install as an app (tablet / phone)

The site is a Progressive Web App: it can be installed and works **offline** after the first visit.

- **Android tablet (Chrome):** open the site → tap **Install app** on the home page (or ⋮ menu → _Install app_ / _Add to Home screen_).
- **iPad (Safari):** open the site → **Share** → **Add to Home Screen**.
- **Windows / Mac (Chrome or Edge):** install icon in the address bar.

Offline: `sw.js` downloads every game listed in `games.js` when the app is installed or opened online, so new games appear after the next online visit.
If an update doesn't show up, change `VERSION` in `sw.js` and push again.

## English dictations

Each grade has one **English** card on the home page (period `"Subjects"`, `hub: true`), which opens
`grade-N/term-1/english/index.html`. That page lists the lessons, dictations and stories from `english/dictations.js`
(shared look: `english-hub.css` / `english-hub.js` in the root).

A dictation (spelling game) is a data file `<name>.js` + a page `<name>.html`; the engine is `shared/spelling.js` (don't copy it).
Grade 4: `english-dictation-unitN-weekM` in the term's folder (`grade-4/term-2/english/` for Term 2); Grade 3: `english-long-o` …

The engine has four modes:

- **Learn** – flash cards: picture + word, or picture only (tap to reveal), with 🔊 / 🐢 slow audio
- **Match** – match pictures to words (words only)
- **Listen & spell** – the device reads the word or sentence aloud (slow by default); type it. Words, sentences or both.
- **Build** – drag or tap scrambled letters into order (`Kit.dragTiles`); a sentence is built word by word.

Optional translations (Українська / العربية) show under the pictures.
Audio uses the device's built-in voices (Web Speech API), so it works offline on most tablets.

### New dictation

1. Copy a page and its data file, e.g. `grade-4/term-2/english/english-dictation-unit2-week5.html` / `.js`; in the page change only the `<title>` and the `.js`.
2. The data file sets `window.SPELLING`:
   - `title` ("Unit 2 · Week 5"), `heading` ("Dictation:", default "Spelling:"), `subtitle`, `lang` (voice, "en-US"), `pattern` (shown on the home screen), `langs` (`{uk: "Українська", ar: "العربية"}`).
   - `hub`: the "English" link, when the page is not in `grade-N/term-1/english/` (from Term 2: `"../../term-1/english/index.html"`).
   - `items`: the words first, then the sentences. A word: `{w, pic, mark: [start, length], tr: {uk, ar}}` (`mark` = the letters to highlight: the sound or the suffix;
     without it the long-vowel pattern is found by itself). A sentence: `{w, type: "sentence", key: "the word to highlight", pic, tr}`.
     The sentences exactly as the school sheet prints them; when the sheet has only sentences, the words are the spelling words in them.
   - Pictures: `pic` = a drawing in `pics`, or `emoji: "🐸"`, or `img: "images/toad.png"`.
     `pics: ({em, tx, wv, ml, SKY, G, bubble}) => ({name: () => SKY + G(150) + em(160, 92, 100, "🦓"), …})` draws in a 320×180 box:
     `em(x, y, size, emoji)`, `SKY` the sky, `G(y, "grass" | "wood" | "snow" | …)` the ground, the `f-*` / `st-*` colours of `shared/quiz.css`
     (for a dark sky use `f-deep`: `f-ink` turns light in dark mode). Arrows: `marker-end="url(#ah-ke)"`.
3. Add it to `english/dictations.js` (`kind: "Dictation"`, `date` of the dictation, `term: N` and the path from the term-1 folder for a later term),
   the page and its `.js` to the English entry's `also` in `games.js`, update its `countLabel`/`topics`, and bump `VERSION` in `sw.js`.
4. Check in the browser: the English page (Dictations tab), every Learn card (picture and highlight), one typed answer.

### English stories (Grade 4)

The class reading books (Wonders) are on the same English page, under **Stories**. Made for a child who needs help to understand:
the story reads itself and the word being read lights up, every page has one easy sentence, and the vocabulary words show their meaning when tapped.

Shared files (no need to touch them for a new story): `shared/story.js` (the engine) and `shared/story.css` (story-only styles; the lesson look comes from `shared/lesson.css`).
The page loads `shared/common.js`, its `story-*.js`, then `shared/story.js`.

A story page has three tabs:

- **Read** – one book page at a time: the picture, the book text, "In easy words"; 🔊 Read (sentence by sentence), 🐢 Slow (word by word), ⏹ Stop
  read the book text only; the easy words have their own 🔊 / 🐢 buttons in their box; a switch turns the pages by itself
- **Summary** – the book's story map as picture cards (Characters, Setting, Problem, Events, Solution, Message), read aloud
- **Questions** – one at a time with a picture; wrong answers can be tried again; open questions show a model answer and the child marks it

### `story-*.js` format

```js
window.STORY = {
  key: "en4-dream-team",                     // saves the tab, page and switches on the device
  title, by, kind: "Realistic fiction", cover: "img/dream-team/cover.jpg", question: "the book's Essential Question",
  lesson: {path: "unit1-week3.html", label: "Unit 1 · Week 3"},  // optional: a link back to the English lesson of the story
  hub: "../../term-1/english/index.html",    // optional: the English page, when the story is not in its folder (later terms); default "index.html"
  gloss: {desperately: "very, very much", …}, // tap-a-word meanings (lowercase word); these words are shown in colour
  pages: [{ch: "Chapter 1 · …", img | emoji | vis, text: ["paragraph", …, {box: "Side box title", p: "…"}], easy: "one easy sentence"}, …],
                                             // text exactly as in the book; *word* = italic
                                             // poem: true on a page = text is the lines of one stanza, shown one per row
  summary: [{t: "Characters", img | emoji | vis, text}, …],      // vis: an animated emoji picture (see English lessons)
  questions: [{tag: "Stop and check", img | emoji | vis, q, o: [right, wrong, wrong], x: "why (optional)"},   // first option is right; shuffled on screen
              {type: "open", tag, img | emoji, q, a: "model answer"}, …],
  subject: "Social Studies",                 // optional: the subject of the back link and the tab title (default "English"); no questions = no Questions tab
};
```

New story: copy `story-dream-team.html` and change `story-dream-team.js` to the new file; pictures cut from the book go in `img/<story>/`.
Add it to `english/dictations.js` (`kind: "Story"`), add the page, its `.js` and every picture to the English entry's `also` in `games.js`, update `countLabel`/`topics`, and bump `VERSION` in `sw.js`.

### English lessons (Grade 4)

The weeks of the term booklets (Classwork and Homework Booklet, Term 1) are lessons on the same English page, under **Lessons**:
`grade-4/term-1/english/unit1-week3.html` (compound sentences), `unit1-week4.html` (complex sentences, idioms), `unit1-week5.html` (run-on sentences, suffixes).
Made for a child who is learning to read again: every question, answer and card is read aloud and **the word being read lights up**
(like the stories); tapping a word of a question says it slowly.

They use the **Computer lesson engine** (`shared/computer-lesson.js`) with `<body data-subject="English">`, which turns on the read-along and the English colour.
The page loads `shared/common.js` first (animated pictures), then its `unitN-weekN.js`, then the engine. Same three tabs as the other subjects:

- **Learn** – the stories of the week (tiles that open the story pages, `stories`), then card decks (`decks`): vocabulary, grammar, phonics, idioms, suffixes
- **Play** – the `games`
- **Exercises** – the booklet pages, grouped by topic (Grammar · …, Phonics · …, Vocabulary · …)

Each tab shows a row of **section buttons** (one per group, with the number of tiles, ✓ when all are done) and only the tiles of the chosen section; the choice is remembered per tab.

Booklet texts are **story pages** (`story-*.html/.js`, the story engine) with `lesson: {path, label}` (a link back to the lesson); questions use the school's model answers when there are some.

`unitN-weekN.js` is a normal lesson file (see Computer lessons) plus:

- `hub: "index.html"` (the English page), `imgDir: "img/unit1-week3"` (the pictures folder)
- `stories: [{t, en, path, cover: {src}, g}]`, `decks: [{k, g, t, en, ic, cover: {vis | src}, cards: [{t, lines, vis | img | src}]}]`, `ideas: []`
- `g` on stories, decks, games and exercises: the section the tile belongs to (its section button)
- a picture can be `src: "img/talent-show/girls.jpg"` (any picture of the folder), `emoji: "🐱🐶"`, or a drawing:
  - `vis: {kind: "scene", bg, items, cap}` – an **animated picture made of emoji** (`Kit.scene` in `shared/common.js`, styles in `shared/lesson.css`; tap it to start again).
    `bg`: sky, night, room, grass, stage, school, rain, plain. Items: `{e: "🐱"}` or a word bubble `{t: "Yes!", c: "good" | "bad" | "plain" | "light"}`,
    `x`, `y` (middle, in %), `s` (size, in % of the smaller side), `r` (turn), `f: 1` (mirror), `dx`, `dy` (how far it moves, in %),
    `a`: animations with an optional delay and length (`"pop:0.5 float:1"`): pop, fade, out, move, grow (once); fall, float, shake, pulse, spin, puff, nod, jump, swing, wander, squeeze, blink, wave (again and again);
    go, shoot, show, hide (a 3-second before → after story that starts again).
  - `vis: {kind: "idiom", words: <scene>, means: <scene>}` – an idiom: what the words say (top) and what it really means (bottom)
  - `vis: {kind: "blocks", rows: [[text, kind], …], title, note, join, legend}` – a sentence as coloured blocks:
    `i` independent clause, `d` dependent clause, `c` conjunction, `p` punctuation, `f` fragment, `x` a mistake, `l` a plain label
- more item types: `{type: "tapw", q, s: "text", ans: {word: "label"}, fix: true}` (tap the words: long e words, conjunctions, or spelling mistakes with `fix`),
  `{type: "sort", q, cols: [{k, t, ex, e}], words: [{w, k, e, vis, x}], mark}` (tap a word, then its box; `k` can be a list; a word with `vis` and `x` shows its picture and meaning under the boxes when tapped; `mark: ["like", "as"]` colours those signal words), `mc` with `keep: [...]` (answers always in this order),
  `order` with a picture (build a sentence from cards); an exercise with `keep: true` keeps its items in order (a summary frame)

New week: copy a week's `.html` (change the `.js`), write its `.js`, add it to `english/dictations.js` (`kind: "Lesson"`),
add its files and pictures to the English entry's `also` in `games.js`, and bump `VERSION` in `sw.js`.

### English revision (Grade 4)

`grade-4/term-1/english/revision-1.html` is the Term 1 final exam revision, on the same engine. The page loads `unit1-week3/4/5.js`
(each one keeps its data in `window.EN_DATA[N]`) before `revision-1.js`, so the revision can reuse their decks, games and exercises:
`ref("5:vfill", "exercises", g)` takes exercise `vfill` of Week 5 and shows it in section `g`. Sections follow the school's exam memo;
new exercises use the week's texts (pictures by `src`). It is a "Final exam" card in `games.js` (not on the English page); its files are in the English entry's `also`.

## Arabic lessons (Grade 3)

Folder: `grade-3/term-1/arabic/`. One card on the home page ("Arabic Lessons") opens `index.html`, which lists the lessons from `lessons.js`.

Shared files (no need to touch them for a new lesson):

- `arabic-lesson.js` — the engine. The page's `<body data-view="list|lesson|exercises">` picks the view.
- `arabic-lesson.css` — engine-only styles; the base comes from `shared/`.

Each lesson has four files:

- `lesson-N.js` — all the content (`window.LESSON = {...}`)
- `lesson-N.html` — story, words, opposites & plurals (copy `lesson-1.html`, change `lesson-1.js` to `lesson-N.js`); it loads `shared/drag-words.css` and `shared/common.js` for the build-the-word games (letter tiles, `Kit.dragTiles`, with the letters shown joined above the line)
- `lesson-N-exercises.html` — the book exercises (copy `lesson-1-exercises.html` the same way)
- `img/lesson-N/` — pictures cropped from the book (about 700px wide)

### `lesson-N.js` format

```js
window.LESSON = {
  n: 2, title: "…Arabic title with tashkeel…", en: "…", uk: "…",
  unit: "الوحدة … · الدرس …", cover: "img/lesson-2/cover.jpg",
  stories: [                                 // the Story tab starts with a list of these texts
    {title, en, uk, kind: "The lesson text · النَّصُّ", cover: "img/lesson-2/class.jpg",
     intro: {ar, en, uk},                    // optional "About this text"
     parts: [{para: "paragraph heading", img: "img/lesson-2/amira.jpg", ar, en, uk}, …]},  // short parts
                                             // img is optional: a text without pictures sets ic: "🧩" for its tile in the list
    …],                                      // (lesson 1 uses the older story: {parts} + intro, which still works)
  gloss: {"كَلِمَةٌ": ["word", "слово"], …},  // tap-a-word translations; matched with tashkeel first, then without
  words: [{ar, en, uk, ic: "🌼"}, …,        // the Words tab: story words (cards + games)
          {ar, en, uk, ic, set: "opp"}, {ar, en, uk, ic, set: "plural"}],  // not in the Words tab: the picture and meaning of a pair word
  opposites: [[ar, ar2, "en a ↔ b", "uk a ↔ b"], …],  // "الْغَدْر – الْخِيَانَة": two accepted words (the first one for Letters)
  plurals:   [[singular, plural, "en", "uk"], …],
  // Opposites & plurals tab: pair cards (both words side by side, each with the picture of the words entry
  // with the same letters, any set), match games, Write it (type the opposite / plural, or build it from letters), quiz.
  // Every word of every pair needs a words entry (set "opp" / "plural" when it is not a story word).
  meanings:  [[word, meaning, "en = …", "uk = …"], …],
  exercises: [{k, t: "Arabic section title", en, uk, ic: "📝", items: [ … ]}, …]   // one menu tile per section; add cards: true for Q&A flash cards
                                             // a section can have rule: {img, ar, en, uk} (shown as "The rule"; t: "📝 The words · …" for another label), or rule: "<k of another section>"
};
```

Exercise item types (every item can have `en`/`uk` help text, `img`, `tag`, and `read: [textIndex, partIndex]` to show that paragraph; a plain number means a part of the first text):

- `{type:"tf", q, a: true|false, x: "explanation"}`
- `{type:"mc", q: "… ___ …", o: [correct, wrong, wrong]}` — the first option is the right one; they are shuffled on screen
- `{type:"open", q, a: "model answer"}` — the child answers, sees the model answer and marks themselves
- `{type:"match", q, pairs: [[left, right, "en"], …]}`

After adding a lesson: add it to `lessons.js`, add its files to the `also: [...]` list of the "Arabic Lessons" entry in `games.js` (so it works offline), and bump `VERSION` in `sw.js`.

### Arabic tests

The weekly التَّقْيِيمُ sheets, listed under **Tests** on the same `index.html` (`window.TESTS` in `lessons.js`, same fields as a lesson).
A test is `test-N.html` (copy `test-1.html`, change `test-1.js`) + `test-N.js`, in the lesson format with three extra keys:

```js
window.LESSON = {
  n: "t1", tapq: true,                      // n: a text key, so it saves apart from the lessons; tapq: tap any word of a question or answer
  tabs: [{k: "a", ic: "📝", t: "Group A", short: "A", ar: "الْمَجْمُوعَةُ (أ)", story: 0}, …],  // one tab per group: the text, then its tasks
  stories: [{title, parts: [{para, img, ar, en, uk}]}],   // the sheet's paragraph (one part)
  gloss: {…},                               // every word of the text, the questions and the model answers
  exercises: [{k, tab: "a", t, en, uk, ic, items: [ … ]}, …],  // tab: which group
};
```

Test items: `{type: "word", q: "… ___", a: ["right", "also right"]}` — the child types the word and taps Check (checked without tashkeel,
alef forms or a leading ال; Show the answer stays), and `{type: "open", q, a}` for sentence answers (`plain: true` when the answer is not words, e.g. syllables "خَا / فَ"). Each item has `en` / `uk`; no picture, the text above the tasks has one.

After adding a test: add it to `TESTS`, add `test-N.html` / `test-N.js` to `also` in `games.js`, and bump `VERSION` in `sw.js`.

### Arabic homework

The ثَانِيًا: الْأَدَاءَاتُ الْمَنْزِلِيَّةُ part of the book pages (the classwork, أَوَّلًا: الْأَدَاءَاتُ الصَّفِّيَّةُ, is left out), listed under **Homework** on `index.html` (`window.HOMEWORK` in `lessons.js`).
One page per lesson: `hw-N.html` + `hw-N.js` is the homework of Lesson N (the lesson whose story the page is about). A new homework sheet for the same lesson is one more tab, not a new page.
Same format as a test, with one tab per book page (`{k: "p31", ic, t: "Page 31", short: "p.31", ar: "صَفْحَةُ ٣١"}`) and `n: "hN"`:

- a tab with `story: i` shows that text above its tasks (e.g. a story to give a new ending); a tab without `story` shows only its tasks
- every item has a picture (`img`, or `ic` with emoji), because there is usually no text above them
- `{type: "word"}` for one word, `{type: "mc"}` when the sheet gives the choices in brackets, `{type: "open"}` for sentences, writing and copying,
  `{type: "build", q, a: "the sentence."}` for "رَتِّبْ": the words of `a` are tiles to drag or tap into order, like the letters in the dictation games (the end punctuation stays).
  A page with `build` loads `shared/drag-words.css` (before `arabic.css`) and `shared/common.js` (after `quiz-common.js`), like `hw-3.html`
- a section can have its own `rule: {ar, en, uk}` (a rule given as a string only finds sections of the same file)
- a writing task can have `help: {q, o: [right, wrong, …], en, uk}`: a folded "💡 Help" practice question shown with the task (not scored), e.g. pick the ending that is new and fits the story.
  An option can be `[ar, en, uk]`: the translation is shown in small letters under the Arabic when the translation is on

After adding homework: add it to `HOMEWORK` (`n` = the lesson number), add `hw-N.html` / `hw-N.js` and new pictures to `also` in `games.js`, and bump `VERSION` in `sw.js`.

## Arabic reading (Grade 3 and 4)

Folder: `arabic-reading/`, shared by both Arabic hubs: `grade-3/term-1/arabic/index.html` (the 🔤 Reading and 🎮 Reading games sections of its side bar) and
`grade-4/term-1/arabic/index.html` (Reading and Reading games for now). Both hubs load `arabic-reading/lessons.js` (`window.READING`, one card per step, in the order of the booklet
«خطة علاجية للقراءة والكتابة»); a card opens with `?g=3` / `?g=4`, and `hub.js` points its back link to that hub.
Sources: `~/Documents/2026-2027/Alex/Arabic/` (the booklet scan and the teacher's guide «دليل المعلم», worksheets 1–44 and progress checks 1–6).

A step is `<name>.html` (copy `letters.html`, change the `.js`) + `<name>.js` in the Arabic lesson format, with `n: "rdN"`, `tapq: true`,
`links: window.READING_LINKS`, tabs Read · Games · Check (`tab: "read" | "games" | "check"` on each section), pictures in `img/<name>/`.
Item types for reading (they work in every Arabic page):

- `{type: "read", q, a: "بَ بِ بُ", w: "بَابٌ", ic}`: `a` in big letters, `w` an example word under it; the child reads aloud, listens to check, and marks ✓ / ✗
- `{type: "where", q, a: 0 | 1 | 2, say: "the word"}`: is the letter at the start, in the middle or at the end of the word (fixed buttons)
- `say: "جُ"` on any item: a big 🔊 Listen button that plays it when the question opens (hear-and-choose `mc` items: the options are what was heard)
- `mute: "فَهْدٌ"` with `say`: the word is only heard; with no Arabic voice and no internet it is written after the question instead (split a heard word into its letters)
- `{type: "build", tiles: "letters", extra: 12}`: the bank has 12 letters, the word's own and look-alikes, and the child picks the right ones in order
- `{type: "build", tiles: "letters", a: "بَيْتٌ", also: ["…"]}`: the letters of `a` (without harakat) are the tiles; `also` = other words the same letters make
- a gap inside a word (`"___مَلٌ"`) is shown as a gap before the rest of the word

The ten steps follow the booklet: letters and harakat, three-letter words, madd, sukun and syllables, ت / ة / ه, shadda, tanween, the moon and sun lam,
hamza and ى, sentences and texts (the last one has a `story` tab with the texts). Each step's cover is a tile drawn by `.claude/scripts/arabic-reading-tiles.py`;
the emoji scene pictures of the texts come from `.claude/scripts/arabic-reading-scenes.py`. Check a step with `node .claude/scripts/arabic-reading-check.js arabic-reading/<step>.js`
(every word glossed, a picture on every item and text part, every image exists).

**Reading games** (🎮, a section of its own on both Arabic hubs, `window.READING_GAMES` in `arabic-reading/lessons.js`): one engine `shared/word-games.js` + `.css`
(`<body data-game="catch|gaps">`), a page per game in `arabic-reading/`, a tile in `img/<game>/tile.jpg` (`.claude/scripts/arabic-reading-tiles.py`). A new game is a new entry in `READING_GAMES`:

- `catch.html` «اِلْتَقِطِ الْكَلِمَةَ»: a word is said, word chips fly in from every side, tap the right one (each tapped chip is read aloud); 3 right taps fill a bucket,
  a wrong tap spills water; a new word starts with 3 chips (the target at a random place) and the target never comes before 2 other chips; 10 buckets end the game and the best time of the level (2–3 letters, long words) is kept on the device. Words: `game-words.js`.
  The same game runs in Ukrainian with `<body data-lang="uk">` (Optima Швидкочитання, `optima/grade-3/speed-reading/catch.html`): levels from `window.CATCH` (look-alike groups), the word shown or said.
- `gaps.html` «أَكْمِلِ الْجُمْلَةَ»: a sentence with a missing word, 5 words to choose from, a clock for each sentence (20 / 30 / 45 s, 1 / 2 min); a wrong word or the end of the time costs a heart (3 hearts);
  10 sentences win. The picture can be turned off (with it on, only the sentences that have a picture are used). Sentences: `game-sentences.js`.
- Both data files are made by `node .claude/scripts/arabic-reading-game-data.js` from the Grade 3 Arabic lessons (their word lists and gap sentences) and the reading steps; run it again after new lessons.

After adding a step: add it to `READING`, add its files and pictures to `also` of the Grade 3 Arabic entry in `games.js` (plus `countLabel` / `topics` of both Arabic entries), and bump `VERSION` in `sw.js`.

## Religion lessons (Grade 3)

Folder: `grade-3/term-1/religion/`. One card on the home page ("Religion", under Subjects) opens `index.html`, which lists the lessons from `lessons.js`
(`window.LIST_HEAD` there changes the list page's heading; the Arabic list has none and keeps its own).
Book: التربية الدينية المسيحية, Grade 3, Term 1 (PDF in `~/Documents/2026-2027/Lucas/Religion/`).
The lessons use the **Arabic lesson engine**: the pages load `../arabic/arabic-lesson.js` and `../arabic/arabic-lesson.css` (don't copy them),
plus `shared/drag-words.css` and `shared/common.js` for the verse tiles, like `hw-3.html`.

A lesson is `uN-lesson-M.html` (copy `u2-lesson-4.html`, change the `.js`) + `uN-lesson-M.js` + pictures in `img/uN-lesson-M/` (cropped from the book, ~700px; the
small activity pictures ~300px). Same format as an Arabic lesson (`stories`, `gloss`, `exercises`), with:

- `n: "rel-u2l4"` (a text key, so it saves apart from the Arabic lessons), `tapq: true`, `links` back to `index.html` ("Religion lessons")
- `tabs`: Story · Games · Golden verse (· Homework, when there is real homework). A custom tab named `story` gets the normal story list with part-by-part navigation; one named `verse` gets the verse games;
  the others show their exercises (`tab: "games"` / `tab: "hw"`). A tab can have `sub: [en, ar]`, the line above its exercise list.
- Story: the book text in short parts with full tashkeel, a picture on each part, `en` / `uk` for each part; the "هَيَّا بِنَا نُصَلِّي" prayer is a second text.
- Games: every أنشطة والممارسات activity of the lesson, one section each (who am I → `mc`; writing → `open` with a model answer and a `help` question).
  Each section's `en` / `uk` starts with its book page: `"Activity 2 (p. 8): …"`, `"Завдання 2 (с. 8): …"`.
- Matching (`type: "match"`, صِلْ / كلمة ومعنى): `pairs: [{l, r, en: [left, right], uk: [left, right]}]`; both sides show the translation of the chosen language and are read aloud when tapped.
  (The Arabic lessons still use the older `[left, right, English of right]`.)
- Memory-verse lessons (المحفوظات, `u1-lesson-2`, `u2-lesson-2`, `u3-lesson-2`): tabs verse · story · games; the verses in `verses`, the word list (المفردات) as the story (`t: "Words"`).
- The lesson's أسئلة الدرس part is a Games section too (fill the gaps from the word bank → one `mc` per gap, the word bank as the section's `rule` with `t: "📝 The words · الْكَلِمَاتُ"`).
- Homework (`tab: "hw"`): only the page the teacher actually gave (the parent sends a photo). A page from another lesson belongs to that lesson:
  build that lesson and put it there. A lesson without real homework has no Homework tab (none has one yet: the homework pages so far were lesson questions, built in Games). ✓ / ✗ questions → `tf` with `x` (why it is false).
- `verses: [{ar, ref, re, en, uk, img, gaps: [[right, wrong, wrong], …]}]`: the golden verse (الآية الذهبية). Learn (tap the words), Complete (one round per gap; each right word
  must appear once in `ar`), Build (the words as tiles, `Kit.dragTiles`).
- `gloss` has every Arabic word of the texts, the verse and its choices, the questions, options, help questions and model answers.

After adding a lesson: add it to `LESSONS` in `lessons.js`, add its files and pictures to `also` of the Religion entry in `games.js` (plus `countLabel` / `topics`), and bump `VERSION` in `sw.js`.

## French lessons (Grade 3 and 4)

Folder: `grade-4/term-1/french/`. One card on the home page ("Français", under Subjects) opens `index.html`, which lists the lessons from `lessons.js`.
Grade 3: `grade-3/term-1/french/` (its own `index.html`, `lessons.js`, lessons, `img/` and `revision-1`); its pages load the engine from `../../../grade-4/term-1/french/french-lesson.js`.
Made to be understood from pictures and sound: big pictures from the book, every French word can be tapped to hear it (device voice, French),
🔊 / 🐢 slow / 👆 word-by-word reading, wrong answers can be tried again, 💡 help in the building games. Optional translation EN / UA / AR.

Shared files (no need to touch them for a new lesson):

- `french-lesson.js` — the engine (`<body data-view="list|lesson">`); a lesson or a revision is only data
- `shared/lesson.css` — the lesson look (shared with the Computer lessons); the base comes from `shared/theme.css`

Each lesson: `lesson-N.html` (copy `lesson-1.html`, change `lesson-1.js` to `lesson-N.js` and the title), `lesson-N.js` (all the content), `img/lesson-N/` (pictures cropped from the book).
`lesson-2.js` is the fullest example. A picture is `img: "chadi"` (this lesson's folder), `img: "lesson-1/mounir"` (another lesson's folder) or `emoji: "👧"`.

A lesson page has three tabs, like the Arabic lessons (the last tab used is remembered). The lesson file lists its tiles and their pictures:

- **Apprends** – `learn: [{k, img}]`, k = `story` (picture by picture), `words` (flash cards of `people` + `phrases`),
  `sound` with `s: "ou"` (one tile per sound in `sounds`), `verb` (only s’appeler), `rule` (a grammar card: `rule`)
- **Joue** – `play: [{k, img}]`, k = `listen` (hear a person’s sentence, tap the picture), `match` (pictures ↔ names, rounds of up to 5),
  `bword` (letters, from `build`), `bsent` (word cards or letters, from `sentences`), `ilelle` (Il ou Elle ?),
  or `game` with its own `t`, `en` and `items` (e.g. Un ou une ?)
- **Dictée** (only when the lesson has `dictee`) – spelling lists: `dictee: [{k, t, en, img, from, words: [{fr, img|emoji}], sentences: [{fr, img|emoji}]}]`.
  A list shows its words and sentences (tap to hear) and four games: build the words / the sentences from letters, or hear them and type them.
  Typing (`{type:"spell", fr}`): letters and accents must be right, capitals, ’ / ' and the end mark don’t count; buttons for é è ê à â ç ’;
  a wrong first try marks the wrong letters in red, the second shows the right spelling. The typing box and the red / green letters are in `shared/theme.css`.
- **Exercices** – the school sheets: `exercises: [{k, t, en, img, from, items, keep?}]` (`keep: true` keeps the order)

The parts of a lesson file:

- `people: [{fr, img, g: "il"|"elle", say?, en, uk, ar}]` (`people: []` for a lesson without people: the word cards are only `phrases`, and no listen / match / ilelle tiles) – `say` is what the card says (“C’est un garçon. Il s’appelle Chadi.”), otherwise “Il / Elle s’appelle …”
- `phrases: [{fr, img|emoji, en, uk, ar}]`, `story: [{img, title?, lines: [{who, fr}]}]` (`title` = “Des phrases pour parler”: not in “Lis tout”)
- `sounds: [{s, ipa, intro, hear, img, words, pics, not}]` – `intro` / `hear`: what the voice says when the screen opens / on the big button;
  a word’s picture comes from `pics`, a person or a phrase card; `not` = words without the sound, for the “Tu entends … ?” game
- `rule: {t, en, fr, img, groups: [{t, en, lines}], games: [{t, x: exercise k}]}` – the capital letter and the end mark of each line light up
- `sentences: [{fr, img}]`, `build: ["Chadi", {fr: "garçon", img: "fouad"}]`
- `dict` (sentence → [en, uk, ar]) and `auto(fr)` (translations made from a pattern; null when it doesn’t know)
- the last line keeps the data for a revision: `(window.FR_DATA = window.FR_DATA || {})[N] = window.LESSON;`

Exercise item types (each can have `img` or `emoji`):

- `{type:"order", fr, q?, cards?}` – Mets en ordre (m’ / t’ / s’ before « appel… » and j’ become their own cards, like at school; `cards` when the sheet cuts them differently, e.g. `["J’ai", "huit", "ans."]`)
- `{type:"letters", fr}` – build a word, or a sentence word by word
- `{type:"fill", parts:["Je ", ["m’","t’","s’"], "appell", ["e","es"], " Bouli."], ans:["m’","e"]}` – also capital letters (`[["c","C"], "omment…"]`) and end marks (`["Comment tu t’appelles", [".","?","!"]]`)
- `{type:"mc", q, opts:[right, wrong, …], icons?, full?}` – the first option is the right one; `full` = the whole answer that is said and shown
- `{type:"tap", say, opts:[img, img, img], a?}` – the first picture is the right one, or `a` (then the pictures stay in the given order)
- `{type:"match", pairs:[{img, fr}, …]}`
- `{type:"yn", fr, a:true|false, ask, x, fix?}` – “C’est une phrase ?”: `x` explains, `fix` is the right sentence
- `items: "people-mc"` (Comment il / elle s’appelle ? for every person), `items: "ou-yn"` (“Tu entends « ou » ?” for that sound)

After adding a lesson: add it to `lessons.js`, add its files and pictures to the `also: [...]` list of the French entry in `games.js` (plus `countLabel` / `topics`), and bump `VERSION` in `sw.js`.

**French revision** (Final term 1): `revision-1.html` / `revision-1.js` in the same folder, on the same engine, so the sound, tap-a-word and translations work.
The page loads `lesson-1.js` and `lesson-2.js` before `revision-1.js`. The revision has only the Exercices tab (no `learn` / `play`), `label: "Révision"`,
`use: [1, 2]` (the lessons’ translations), pictures from the lessons’ folders (`img: "lesson-2/parle-9"`), and can take a lesson’s exercise as it is: `ref: "2:phrase"`.
Its card is under “Final exam” in `games.js`; its files are in the French entry’s `also`.

## Computer lessons (Grade 4)

Folder: `grade-4/computer/`. One card on the home page ("Computer", under Subjects, colour `--comp`) opens `index.html`, which lists the lessons from `lessons.js`,
one heading per chapter: `chapters: [{n, dir: "chapter-1", title?, items: [{n, title, en, path, cover, note}]}]` (`path` and `cover` relative to the chapter folder).
The lessons live in `chapter-N/` (a chapter is a book unit, not a term); a lesson's "Computer" link goes to `../index.html`.
Made to be understood from pictures and sound: short sentences, key words in colour (`[word]` in the text), 🔊 / 🐢 on everything,
wrong answers can be tried again. The computer steps are practised on **Mini Windows**, a pretend Windows 11 screen.

Shared files (no need to touch them for a new lesson):

- `shared/computer-lesson.js` — the engine (`<body data-view="list|lesson">`), loads after `winsim.js`
- `winsim.js` / `winsim.css` — Mini Windows: desktop, taskbar (clock, Wi-Fi, speaker, battery), Search, Start menu (Pinned, All apps, power → Restart),
  File Explorer (8 views, Details columns, zip / extract, rename + F2, cut / paste), right-click menus (also the old "Show more options" menu and Send to),
  Recycle Bin, Settings (Date & time, time zone, Display resolution — the screen really gets bigger —, Personalization › Background, Volume mixer, Windows Update),
  Get Help, Windows Security (quick / full scan, protection updates, a pretend virus to remove).
  Tablet: hold a finger = right-click, tap twice = double-click, drag works with a finger.
- `shared/computer-lesson.css` — computer-only styles; the lesson look comes from `shared/lesson.css`

Each lesson, in its `chapter-N/` folder: `lesson-N.html` (copy `lesson-1.html`, change `lesson-1.js` to `lesson-N.js`), `lesson-N.js` (all the content), `img/lesson-N/` (pictures cropped from the book),
`video/` (the school videos, made smaller: `ffmpeg -i in.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -c:a aac -b:a 64k -ac 1 -movflags +faststart out.mp4`).

A lesson page has three tabs:

- **Learn** – the big question, **Big ideas** (`ideas`: picture cards with 1–3 short lines), and one **How to …** per book box (`howto`):
  Mini Windows with ▶ Show me (a pretend mouse does it) and ✋ Your turn (the right place glows after a wrong click), the school video, the book picture
- **Play** – Mini Windows free play + missions, and the `games`
- **Exercises** – the book's Hands on!, class work and homework (`exercises`)

Mini Windows steps: `{act: "click" | "dbl" | "right" | "drag" | "type" | "hover" | "look", t: "<target>", say: "Click [Search]."}`
(`type` needs `text`, `drag` needs `to: "desktop"` or `"exp-main"`). Targets: `task-search`, `task-explorer`, `search-input`, `result:<name>`,
`exp-search`, `sres:<name>`, `file:<name>`, `desk:<name>`, `nav:Documents`, `menu:more`, `menu:sendto`, `menu:create-shortcut`, `send:desktop-shortcut`,
`mi:delete`, `mi:rename`, `menu:extract`, `menu:restore`, `menu:empty`, `dlg:yes`, `tool-view`, `view:Details`, `det-header`, `col:Date created`, `searchopt`, `sopt:date`, `filt:date:Today`, `tip-size`,
`tray-clock`, `menu:adjust`, `set:autotime`, `set:change`, `dt:hour:+`, `dlg:dtchange`, `set:zone`, `zone:(UTC+00:00) London`, `bgmenu:display`, `set:res`, `res:1280 × 720`, `dlg:revert`,
`bgmenu:personalize`, `set:background`, `bg:3`, `tray-speaker`, `menu:mixer`, `vol-range`, `task-start`, `start-all`, `start-search`, `app:Get Help`, `help-input`, `start-power`, `power:restart`,
`app:Windows Security`, `sec:virus`, `sec:quick`, `sec:options`, `sec:radio:full`, `sec:scannow`, `sec:updates`, `sec:check`, `sec:remove`, `setnav:Windows Update`, `wu:check`, `tray-wifi`, `qs:wifi`, `tray-battery`, `bat:plug`, `view-close`.
More step kinds: `{act: "key", t: "key:F2", key: "F2"}` (a key button appears for tablets), `{act: "slide", t: "vol-range", max: 30}` (drag a slider), `{act: "look", wait: 3000}` (wait for a scan).
A start screen: `start: {explorer: "Documents/Lessons/Reading", view: "details", shortcuts: [{of, in}], files: [{name, in, kb}], zips: [{name, in, files}], bin: [{name, from, kb}],
settings: "datetime" | "display" | "personalization" | "mixer" | "update", app: "Windows Security", secPage: "virus" | "updates", open: "Documents/My story.docx", frozen: true,
wifi: false, battery: 8, virus: true, autotime: false, pre: [steps done before]}`.

Item types for games and exercises: `mc` (first option is right; `oi` file-type icons, `oh` drawings), `tf` (`a: true|false`, `yes: ["Yes","No"]`), `match` (`pairs: [{icon, label}]`),
`order` (`howto: "<k>"` – put the steps in order), `parts` (tap the name / dot / extension), `open` (model answer, the child marks it), `sim` (do it in Mini Windows).
Pictures: `img: "name"` (a file in `img/lesson-N/`) or `vis: {kind: "icons" | "nameext" | "sizes" | "lines" | "compare" | "wild" | "flow" | "filerow" | "emoji", …}`.

**Videos are online only**: `sw.js` never saves anything in a `video/` folder, and offline the lesson shows "You need the internet to watch the video".
Don't add videos to `also` in `games.js`.

After adding a lesson: add it to its chapter in `lessons.js` (a new chapter: a new `chapter-N/` folder and a new entry in `chapters`), add its files (not the videos) to the `also: [...]` list of the Computer entry in `games.js`, and bump `VERSION` in `sw.js`.

## Computer lessons (Grade 3)

Folder: `grade-3/computer/chapter-1/`, the same engine and the same page format as Grade 4, but **no Mini Windows**: the pages don't load `winsim.js`,
the lessons have no `howto`, so the Play tab has only the games. Instead, the Learn tab shows a tile for every picture card and every school video.
`lessons.js` can set its own `intro` sentence for the lessons page.

Extra things a lesson can have (both grades can use them):

- `videos: [{k, t, video: "l2-thermal", img: "thermal"}]` – school videos as tiles on the Learn tab; a big idea card can also have `video: "l2-thermal"`.
- Item `place`: drag a thing to the right place, or tap the place. `{type: "place", q, thing: {img | emoji, label}, spots: [{t, img | emoji}, …], x}` – the first spot is right.
- Item `multi`: choose all the right ones. `{type: "multi", q, opts: [{t, img | emoji, ok: true}, …]}`.
- Item `touch`: practise on a pretend tablet. `g: "tap"` (tap a star 3 times), `"swipe"` (`pics: [...]`), `"pinch"` (`img`; zoom with two fingers, ctrl + wheel, or ＋), `"draw"` (follow a line like a stylus).
- Item `wsearch`: a word search. `{type: "wsearch", q, words: ["3D PRINTER", "INKJET", …], size: 10}`; a new grid every time; one point per word.
- `mc` can show book pictures as answers: `pics: ["inkjet", "laser", null]`.
- `order` can have its own steps instead of a how-to: `{type: "order", t, ask, hint, steps: [{say: "CD", e: "💿"}, {say: "Blu-ray", img: "blu-ray"}]}`.
- More drawings: `vis: {kind: "bars", items: [{e | img, label, v, note}]}` (which holds more), `{kind: "ink"}` (the 4 inkjet colours), `{kind: "strip", items: [{img | e, label}]}`.
- A small book icon whose name ends in `-ic` (`mic-ic.jpg`) is shown at its real size, not blown up.

## Computer lessons (Grade 3, chapter 2) and Mini Word

Folder: `grade-3/computer/chapter-2/` (Unit 2 « My first article »): the same engine and page format, but the pages load **Mini Word**
(`shared/wordsim.js` / `shared/wordsim.css`, also used by Grade 4 chapter 2) instead of Mini Windows. The engine uses whichever one the page loads, and takes its name, icon and
help line for the free-play tile from it (`WordSim.label`, `ic`, `hint`, `about`).

Mini Word is a pretend Microsoft Word: title bar with the Quick Access Toolbar (Save, Undo, Redo), the tabs, the Home ribbon (Font list,
Font Size, Bold / Italic / Underline, Text Highlight Color + colours + Stop Highlighting, Font Color, Bullets + Bullet Library, Numbering,
the 4 alignments, Find), Insert › Symbol, Review › Spelling and Grammar (the Editor pane: suggestions, Ignore once / all), View, the
status bar with the zoom slider, File (Save, Save As › Browse › the Save As window with Documents and the file name, Print).
The text can really be selected (drag over it, double-click a word, three clicks for a paragraph), typed (Enter = new paragraph,
Shift + Enter = new line, Backspace) and formatted; Undo works; the shortcuts work (Ctrl + B / I / U / Z / Y / F / S / A / L / E / R / J, F7).

Steps for Mini Word (the list of targets is at the top of `shared/wordsim.js`):
`{act: "select", t: "w:0:0", to: "w:0:5"}` (or `t: "all"`, `"para:1"`) — select from word to word, `w:<paragraph>:<word>` counted from 0;
`{act: "click", t: "fmt:bold"}`; `{act: "click", t: "w:3:10"}` puts the text cursor after that word; `{act: "type", t: "doc", text: "ATMs"}` types in the text
(`t: "nav-search"` / `"dlg:filename"` type in those boxes); `{act: "key", t: "key:Ctrl+B", key: "Ctrl+B"}` (also `"Enter"`, `"Shift+Enter"`, `"F7"`; a button
under the screen does it on a tablet; the button that does the same is also accepted); `{act: "slide", t: "zoom-range", min: 150}`.
A start: `{doc: "robots" | "robotsList" | "robotsMiss" | "oneParagraph" | "global" | "volcano" | "olympic", sel: "all" | [p0, w0, p1, w1],
caret: [p, w], tab: "Insert", fmt: [{r: [p0, w0, p1, w1], b: true}], file: "saveas" | "print", nav: true, editor: true, saved: "Robots around us", zoom: 100}`.
The texts are the book's; "robotsMiss" and "olympic" have the book's spelling mistakes for the Editor.
Pictures of Word buttons and keys for games: `oi: ["bold", "highlight", "key:Ctrl+B"]` in `mc`, `icon: "key:F7"` in `match`, `vis: {kind: "icons", items: [{type: "align-left"}]}`.

## Computer lessons (Grade 4, chapter 2) and Mini Word for Grade 4

Folder: `grade-4/computer/chapter-2/` (book Unit 2 « Working with text », pages 55–95): 4 lessons, the same page format as Grade 3 chapter 2,
with **Mini Word** from `shared/`. A lesson with `words` and how-to's shows both the **Key words** and the **Big ideas** tiles.
Book Hands on 4.1 of Lesson 4 is left out (it did not load in the book).

Mini Word can also do the Grade 4 skills (the targets are listed at the top of `shared/wordsim.js`):

- Home › Paragraph: Decrease / Increase Indent, Tab at the start of a paragraph (`pstart:<p>` then key `Tab`), Line and Paragraph Spacing
  (1.0–3.0, Add Space Before, Remove Space After), Shading (colours), Borders (bottom, top, left, right, outside, all, inside, none), Show/Hide ¶;
  the Font window's Advanced tab (Spacing Expanded / Condensed, By 3 pt); Replace (Ctrl + H: Find what, Replace with, Replace, Replace All, Find Next).
- Insert › Pictures › This Device (4 drawn pictures: elephant, parrot, dolphin, ping-pong), Shapes (drag on the page), SmartArt (Basic Pyramid,
  Text Cycle, Basic Cycle, with the text pane and Delete for a box). Clicking a picture or diagram selects it and shows its tab:
  **Picture Format** (Remove Background, Color, Artistic Effects, Picture Styles, Border, Effects, Position, Wrap Text, Crop),
  **SmartArt Design** (Change Colors, styles, Text Pane), **Shape Format** (styles).
- Review › Spelling and Grammar: a document with grammar mistakes (`gram`) opens the Editor on Corrections › Spelling / Grammar,
  with Read context and Stop checking for this; grammar mistakes have a double blue line.
- View: Read Mode (View › Edit Document to go back), Print Layout, Web Layout, Ruler. File › Print (or Ctrl + P, then Enter): Copies, the Printer list
  (local / network), Print All Pages / Selection / Current Page / Custom Print with a Pages box, Portrait / Landscape, page arrows and zoom.
- Starts: `doc: "animals" | "animalsPic" | "dolphin" | "tiny" | "parrot" | "sports" | "school" | "schoolPyr" | "water" | "waterCycle" | "facts" |
"grammar" | "marco" | "marcoFixed" | "report"` (the book's texts), `obj: <paragraph>` (a selected picture or diagram), `replace: true`,
  `view: "read"`, `marks: true`, `ruler: true`.
- Pictures of the buttons for games: `oi` / `icon` with `indent-inc`, `linespacing`, `shading`, `borders:outside`, `marks`, `removebg`, `crop`,
  `wraptext`, `piceffects`, `picborder`, `smartart`, `shapes`, `readmode`, `printlayout`, `weblayout`, `portrait`, `landscape`, …

## Computer lessons (Grade 4, chapter 3): Mini Outlook and Mini Edge

Folder: `grade-4/computer/chapter-3/` (book Unit 3 « Communicating online », pages 96–127): 4 lessons, the same page format, with
**Mini Outlook & Edge** (`shared/netsim.js` / `shared/netsim.css`): a pretend new Outlook and Microsoft Edge on one small screen with a taskbar
(Outlook, Edge). The pages load it instead of Mini Word (`netsim.css` in the head, `netsim.js` after the lesson file). Sources, procedure and
checks: the `computer-lesson` skill and the logs `grade-4/computer/SOURCES.md`, `TODO.md`, `UNVERIFIED.md`.

- **Mail**: the left bar (Mail, People), Home ribbon (New mail, Delete, Reply, Reply all, Forward), folders (Inbox, Sent Items, Drafts,
  Deleted Items), the message list and the reading pane. Writing: To, Cc and Bcc (shown when clicked), Subject, the message (click it to write),
  the 📎 menu (Browse this computer → the Open window), Send; misspelled words have a red line (Spelling list, Ignore all).
  An attachment: a click opens a preview, a right-click (hold the finger) the book's menu (Preview, Open, Copy, Save As, Remove Attachment).
- **People**: Favorites, All contacts, Deleted; New contact (photo, names, email, phone, home address, company, notes), Edit contact, Delete,
  Restore, Add to favorites.
- **Edge**: tabs, Back, the address bar (type, then Enter), the New tab page; Google and Google Images with All / Images / Videos and Tools
  (Size, Color, Usage rights; Any duration for videos), a picture opens a side preview, a right-click opens Edge's menu (Save image as →
  Save As → Pictures, where Outlook's Attach finds it), a video page; outlook.live.com: Microsoft Sign in (email → Next → password → Sign in),
  Outlook on the web with Meet Now and the account card (Sign out), and with `askSave` the "Save password?" bubble (Never / Save).
- The pictures Google finds are emoji "photos" with a size, a colour and usage rights: healthy food, yellow fruits, vegetables (the book's
  searches) and about 40 more words for "your favourite food".
- The people, mails and files of the book are built in: Stella, Marco, Alex, Lisa, Tom, Mrs. Smith (teacher@school.com); the mails
  `school`, `great`, `healthy`, `party`, `apples` (with apples.png); Documents (MyHomework, Animals of my country, Class project), Pictures
  (apples only on Tom's computer, fruits, salad), Music, Videos.

The targets are listed at the top of `shared/netsim.js` and in `NetSim.TARGETS` (the skill's `check.js` tests every step against them).
A start: `{me: "stella" | "marco" | "tom", view: "mail" | "people", folder, open: "<mail id>", compose: {kind: "new" | "reply" | "forward",
of: "<mail id>", to, cc, bcc, subject, body, att: ["apples.png"]}, contacts: ["marco", "alex"], sel: "Marco", fav: ["Alex"], nc: true,
files: {Pictures: [{name, ext, e}]}, app: "edge", page: "newtab" | "google" | "gimages" | "results" | "login" | "outlook", q, itab: "Images" |
"Videos", tools: true, signed: true, askSave: true}`.
Steps: `click`, `dbl`, `right`, `type` (a type in `cm:body` is done when the message holds the text), `key` (`Enter`), `look` (doing the next
step during a look is fine). Pictures of the book's buttons for games: `oi` / `icon` with `btn:newcontact`, `btn:editcontact`, `btn:deleted`,
`btn:delete`, `btn:fav`, `btn:newmail`, `btn:forward`, `btn:cc`, `btn:bcc`, `people`, `railmail`, `photo`, `file:docx` (png, mp3, mp4, pptx, zip).
The play harness (`english-lesson/scripts/play.sh`) finishes Mini Outlook & Edge `sim` items itself (`#simbox.__sim.solve()`).

## Science lessons (Grade 4)

Folder: `grade-4/science/`. One card on the home page ("Science", under Subjects) opens `index.html`, which lists the lessons from `lessons.js`,
one heading per book topic (`part: "Topic"`, `chapters: [{n, dir: "topic-1", title, items}]`, the same format as the Computer lessons).
Book: Elevate Science, Grade 4. The lessons use the **Computer lesson engine** (`shared/computer-lesson.js`, no Mini Windows):
the pages set `<body data-subject="Science">`, which changes the subject name and the colour (`--sci-ink`, a darker gold that reads well on white).

A lesson has the same three tabs and the same `lesson-N.js` format as a Grade 3 Computer lesson, plus:

- `words: [{w: "Kinetic energy", m: "the energy of motion"}, …]` – the book's vocabulary; the first Learn tile becomes **Key words**
  (each word with its short meaning, read aloud) instead of "Big ideas".
- A word instead of a picture in a `match` (word ↔ meaning): `{vis: {kind: "lines", rows: ["Kinetic energy"]}, label: "Is the energy of motion."}`.
- Two-way choices (potential / kinetic, conductor / insulator) are `mc` with `two: true` and `icons`, not `tf` (`tf` always puts ✅ on the first label).

Every question (games and exercises) has a picture: a book picture, an emoji scene, or pictures / icons on the answers.
Lessons save their ticks under their own `key` (`sci4-t<topic>-l<lesson>`), because lesson numbers repeat in every topic.

Exercises come from the term booklet and the school sheets (`from:` names the sheet). When a lesson has no school sheet,
its "Book questions" set uses the book's Lesson Check with model answers written from the book.

Term 2 on, every source page is logged in `SOURCES.md` (with `TODO.md` and `UNVERIFIED.md`) in `grade-4/science/`, and a lesson with sheets from the Term N booklet has `term: N`
in `lessons.js` (a "Term N" tag after "Lesson M" on its card, drawn by `Kit.lessonCard`).
Lessons built from Term 2 on put a picture on every answer, for Alex (aphasia): an `mc(q, [[answer, picture], …], more)` helper at the top of the file splits the pictures into
`pics` (file names: `e-*.jpg` explanation drawings made by the PIL scripts in `.claude/skills/science-lesson/scripts/pictures/`, booklet crops, `../lesson-1/…`) and `icons` (emoji),
and every sentence answer has an explanation `x`. Animated emoji scenes (`vis: {kind: "scene", …}`) need `shared/common.js` loaded by the lesson page.

After adding a lesson: add it to its topic in `lessons.js` (a new topic: a new `topic-N/` folder and a new entry in `chapters`),
add its files (not the videos) to the `also: [...]` list of the Science entry in `games.js`, and bump `VERSION` in `sw.js`.

**Science revision** (Final term 1): `grade-4/term-1/final-term-1/science-revision.html` is a quiz page like the other revisions, made from the school-sheet
exercises of Topic 1 L1, L3 and L4. Its pictures are the lessons' photos (`p`, from `topic-1/img/lesson-N/`), emoji pictures (`e`), or several photos in a grid
labelled A, B, C… (`ps`, with `k` so the answers keep that order). It has no image files of its own: the photos are already offline through the Science entry.

**Grade 3 Science revision** (Final term 1): `grade-3/term-1/final-term-1/science-revision.html` ("Forces Quest") is the same page for Topic 1 L2, L3 and L4,
made from the teacher's slides, the Friction cut-and-paste sheet and Graded HW 2. Grade 3 has no Science lessons, so its pictures are cropped from those sheets
into `final-term-1/img/science/` (`p` is the file name) and listed in the card's `also` in `games.js`.

## Social Studies lessons (Grade 4)

Folder: `grade-4/social-studies/`. One card on the home page ("Social Studies", under Subjects) opens `index.html`, which lists the lessons from `lessons.js`,
one heading per chapter (`chapters: [{n, dir: "chapter-1", title, items}]`, the same format as the Computer lessons).
Lessons 1–3 (Term 1) come from the teacher's slides, the term booklet and the graded homework. From Term 2 on, a lesson follows the book
(myWorld Interactive 4, scanned as two-page spreads in `~/Documents/2026-2027/Alex/S.S.English/book/`) retold in easy words, with the booklet's exercise sheet and the book's questions;
its sources are logged in `SOURCES.md` (with `TODO.md` and `UNVERIFIED.md`), and `term: 2` in `lessons.js` puts a "Term 2" tag on its card (`term: "2*"`: a lesson built from the book only, not in the booklet).
Like Science, the lessons use the **Computer lesson engine** (`shared/computer-lesson.js`, no Mini Windows) with `<body data-subject="Social Studies">`,
which changes the subject name and the colour (`--ss-ink`, a darker red for text on white).

A lesson has the same format as a Science lesson: `words` (the slides' "Important Definitions") for the **Key words** tile, `ideas` (picture cards),
`games` and `exercises` (`from:` names the booklet sheet or the homework). Every question has a picture.
Lessons save their ticks under their own `key` (`ss4-c<chapter>-l<lesson>`).
A picture card can show a row of pictures with `vis: {kind: "strip", items: [{img | e, label}]}`; its tile then uses the first picture.

**Stories** (a Citizenship page, a history story to know): `chapter-N/story-<name>.html/.js`, the English story engine (`shared/story.js`, format in "English stories")
with `subject: "Social Studies"` (the back link and the tab title), `hub: "../index.html"`, `lesson: {path, label}`, and `<body data-view="story" data-subject="Social Studies">` (the colour).
Without `questions` the story page has only Read and Summary. The lesson shows it as a tile after its picture cards: `stories: [{t, en, path, cover: {src}}]`.

After adding a lesson: add it to its chapter in `lessons.js`, add its files to the `also: [...]` list of the Social Studies entry in `games.js`,
and bump `VERSION` in `sw.js`.

## Math lessons (Grade 4)

Folder: `grade-4/math/`. One card on the home page ("Math", under Subjects, colour `--math`) opens `index.html`, which lists the lessons from `lessons.js`,
one chapter per book unit with a heading (`part: "Unit"`, `chapters: [{n, dir: "unit-2", title, items}]`). Book: Reveal Math, Grade 4 (Student Edition + Student Practice Book).
In each unit: first the **unit page** (`label: "Unit"` on its card: "Unit 2"), made in Term 1 from the school sheets, then one card per **book lesson** (`n: "2-1"`, "Lesson 2-1").
A chapter can set its own `part` (`part: ""` = only its title: "Multiplication and division games"); `flat: true` would show all the cards together without headings (any lessons list).
Unit pages: Unit 2 `place-value.html` (place value, compare, round), Unit 3 `add-subtract.html` (columns with regrouping, word problems),
Unit 4 `multiplication.html` (what multiplication is, times tables, times as many).
Book lessons: `unit-N/lesson-N-M.js` + `.html`, pictures in `unit-N/img/lesson-N-M/` (`curious.jpg` = the Be Curious picture, also the cover). `key: "math4-l2-1"`, `unit: "Unit 2 · Lesson 2-1"`.
Learn = the book's Be Curious / Learn / Work Together retold on picture cards; Play = games with new numbers; Exercises in two sections (`g`): "📗 Book" (Be Curious, Learn, Work Together,
On My Own, Reflect, in the book's order, `keep: true`) and "📘 Practice Book" (Additional Practice); a school sheet for the lesson adds a "🏫 School" section.
Sources log: `grade-4/math/SOURCES.md`, `TODO.md`, `UNVERIFIED.md`. Procedure and checks: the `math-lesson` skill.
A book lesson page also loads `shared/math-kit.js` (after `shared/math.js`, before its `lesson-N-M.js`): `window.MathKit` builds the questions so that answers are worked out, not typed:
`words(n)` / `expanded(n)` (word and expanded form), `wordMC` / `expMC` (choose the form; wrong options from look-alike numbers), `cmp(a, b)` (`<` `=` `>`, the first different digit yellow),
`roundQ(n, place)` (round with a number line), `frontEnd`, `col(a, op, b)` (a column sum), `partials` / `adjust` (ways to add), `decompQ` / `adjustSub` (ways to subtract),
`step(q, "9,200 − 2,700")` (one step of a problem: the equation shown, the answer computed), `distrib(a, b, p)` and `areaQ(rowParts, colParts)` (partial products with an area model, cell by cell),
`factors`, `factorPairs`, `pairsQ`, `primeQ`, `estDiv` / `rangeDiv` (compatible numbers for division), `partialQ(n, d, chunks, intro, rem)` (partial quotients, with a remainder),
`remQ(q, n, d, how, post)` (a remainder in a story: ignore, use, add one, or a fraction), `prob(q, a, vis, post, x)` (a word problem), and bar diagrams `timesBar`, `partBar`, `howBar`, `moreBar`, `sumBar`.
It has no page code, so `check.js` and `add.js` run it in node too.

The lessons use the **Computer lesson engine** with `<body data-subject="Math">`. The page loads `shared/common.js`, `shared/math.js`, its `<name>.js`, then the engine
(and `shared/math.css` after `computer-lesson.css`). `shared/math.js` gives the engine new question types and drawings through `window.CS_EXT`
(`items`, `vis`, `pts`); the engine falls back to them for a `type` / `kind` it doesn't know.

Made for a child who learns from pictures: one colour per place (ones blue, tens green, hundreds orange, thousands purple …) in every drawing,
answers typed on a big number pad (the computer keys work too, no tablet keyboard), 💡 Help explains the next column.

Question types (games and exercises):

- `{type: "col", op: "+" | "-", a, b}` – add or subtract in columns. Small boxes above the digits for the carried 1 (or the regrouped number, up to 2 digits),
  boxes under the line for the answer (typing goes from the ones to the left). On subtraction, tapping a digit of the top number crosses it out.
  ✓ Check marks the wrong places in red; 💡 Help explains one column; after 3 tries the answer is shown. When it is done, the carries are filled in.
- A word problem: `col` with `story: {q, vis: <bar model>, ask: true, why, ans: "They have {} students."}` – first "Add or subtract?" next to the schema
  (`why` replaces the default explanation), then the columns; `ans` is the answer sentence (`{}` = the result).
- `{type: "num", q, a, pre: "3 × 4 =", post: "hours", hint, x}` – type a number (commas are added while typing). 2 tries.
- `{type: "flower", n: 4, c: "var(--heat)"}` – the times-table flower: n × 1 … n × 10 on the petals (10 points).
- The engine's own `mc`, `multi` and `tf` work as usual.

Drawings (`vis`):

- `{kind: "bar", rows: [{l, e, segs: [{t, v, q, c}], brace: {t, q}}], total: {t}, note}` – the schema (bar model). `v` = length, `q: true` = the unknown (dashed, yellow),
  `c` = colour 0–3, `brace` = the total of that bar (on top), `total` = the total of all the bars (bracket on the right).
  Repeated parts: `{l, seg: {t, v}, times: 5}` (times as many).
- `{kind: "colshow", op, a, b, cap}` – a worked column sum with its carries / regrouping.
- `{kind: "groups", n, of, e, cap}`, `{kind: "array", r, c, e, cap}` (no `e` = dots), `{kind: "cubes", rows: [{l, n, times, c}], cap}` – multiplication pictures; `cap: ""` hides the caption.
- `{kind: "pv", n, hl: [places from the right], val: true, cap}` – place-value chart with periods; `hl` digits are yellow, `val` writes their value.
- `{kind: "nline", lo, hi, n, hide}` – number line for rounding (`hide`: no answer shown).
- `{kind: "digits", rows: [{n, hl: [places from the right], t}], cap}` – numbers with some digits marked in yellow (the book's underlined digits); `t` = a note after the number.
- `{kind: "area", rows: [8], cols: [20, 4], cells: [160, "?"], cap}` – an area model: the factors on top and on the left, a partial product in each cell (row by row; `"?"` = yellow, the one to find; `""` = empty).

A game or exercise with `keep: true` keeps its items in order (the steps of one problem); otherwise they are shuffled.
A lesson file is like a Science lesson (`words`, `ideas`, `games`, `exercises`, `key: "math4-u<unit>"`), with `imgDir: "img"` and `cover: "cover"`
(the unit's opening picture from the book). Picture cards can set `ic` (the emoji on their tile).

**Math revision** (Final term 1): `grade-4/term-1/final-term-1/math-revision.html` is a quiz page like the other revisions (`shared/quiz.css`, `quiz-common.js`,
start screen with parts and length, matching rounds, score and review) that also loads `shared/math.css` and `shared/math.js`: its `col` and `num` questions are the Math
lessons' question types, run through a small adapter object (`E`) that gives them the quiz look instead of the lesson look (`<body class="mx-rev">`,
rules at the end of `shared/math.css`). Every word problem has its schema (`vis`).

**Multiplication and division games**: `grade-4/math/times/index.html` (×) and `division.html` (÷, the same page with `<body data-op="div">`), both run by `times.js`
(two cards in `lessons.js` with their own `label: "Games"` and no cover, so the hub shows their emoji).
Pick a table 2–12 (n × 1 … n × 12, or n · 1 ÷ n … n · 12 ÷ n) or 🎲 Random, then a game from `shared/times-games.js` (the Optima lessons' games, in English):
🎲 Mixed up (type each answer; Random: 10, 20 or 30 sums picked from 2 × 2 … 12 × 12 / 4 ÷ 2 … 144 ÷ 12) and 🚀 Rockets (Random: all 121 sums, until they are done or 5 mistakes);
🧠 Memory (6, 8 or 12 pairs of a sum and its answer face down; only the steps are counted, two cards turned = one step, the fewest are saved);
🔗 Matching (6, 8 or 12 pairs; two ways: join every sum to an answer, each pair gets a 🍎 mark, then ✓ Check, or a right pair disappears and a wrong one is red for 2 seconds).
One tile per game; the choices (how many sums or pairs, the Matching way) are on the game's start screen (`G.setup`), the last ones are remembered.
The pairs are picked at random, different answers first. Best scores and steps, the number picked and the rocket speed are saved on the device (`tg-math4-*`, `tg-div4-*`).

After adding a lesson: add it to its unit in `lessons.js` (a new unit: a new `unit-N/` folder and a new entry in `chapters`), add its files to the `also: [...]` list of the Math entry in `games.js`,
and bump `VERSION` in `sw.js`.
