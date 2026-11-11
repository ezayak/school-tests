---
name: english-dictation
description: Build English dictation (spelling) games for the school-tests study games from the school's dictation sheets (e.g. ~/Documents/2026-2027/Alex/English/20261111-Dictation-Unit2-Week5.pdf for Grade 4, spelling lists for Grade 3 / Lucas), as data files for shared/spelling.js. Use this whenever the user sends or mentions a dictation sheet, a spelling list or spelling test ("dictation on Monday", "Dictation Unit 2 Week 5", "long a words"), asks to add, fix or check an English dictation or spelling game, or asks which dictations are already built, even if they don't say "dictation".
---

# English dictations (Grades 3 and 4)

The format is in `README.md` ("English dictations"); the rules in `CLAUDE.md` ("English (Grade 4)", "Workflow", "Formatting", "Offline cache"). Read them first.
The engine `shared/spelling.js` is never copied: a dictation is a data file (`window.SPELLING`) plus a 40-line page.
The models: `grade-4/term-2/english/english-dictation-unit2-week5.js` (suffixes, a sheet with sentences only) and `grade-4/term-1/english/english-dictation-unit1-week4.js` (a sound, words and sentences).

The boys learn from pictures and sound (Alex is learning to read again, Lucas has aphasia): a picture on every word and sentence, and the highlight shows the point of the week.

## 1. Read the sheet

- `pdftotext -layout <sheet>.pdf -` usually works (the school's letters are typed). A scan without text: `pdftoppm -r 110 -png` and look at it.
- Note: the date of the dictation ("on Monday, 16 November" → `date: "16 Nov"`), the unit and week, the words, the sentences, exactly as printed.
- Never guess a word that is missing or unreadable: list it and ask.
- Already built? `grep -rn "<week>" grade-N/term-1/english/dictations.js` and the term's `SOURCES.md` (Grade 4, Term 2 on).

## 2. The words and their point

- A sheet with words and sentences: build both, in the sheet's order.
- A sheet with **sentences only**: the words are the week's spelling words in them (one per sentence). Find the week's spelling list in the lesson
  (`grep -n "spelling\|Spelling" grade-4/term-N/english/unitN-weekM.js`) and check that each sentence has one; say so in the report.
- The week's point (the sound or the suffix) goes into `pattern` ("Suffixes: -ness · -ly · -est · -ful · -less · -fully") and into each word's `mark: [start, length]`
  (the suffix, the vowel team). Without `mark` the engine looks for a long-vowel team by itself; that is wrong for suffixes and for most other points, so always give `mark`.
- Each sentence: `type: "sentence"`, `key` = its spelling word (highlighted in the sentence).
- Translations `tr: {uk, ar}` on every item (`langs: {uk: "Українська", ar: "العربية"}`), short and simple; a word with two senses gets the sense of its sentence.

## 3. Files

Grade 4: `grade-4/term-N/english/english-dictation-unitN-weekM.{js,html}`; Grade 3: `grade-3/term-1/english/english-<topic>.{js,html}`.

- Page: copy the last dictation's `.html`, change only `<title>` ("Dictation Unit 2 Week 5") and the data file's name.
- Data file: copy the model `.js`. First line: `// <title> · English, Grade N. Source: <sheet file> (dictation on <date>). Engine: shared/spelling.js.`
  `heading: "Dictation:"` (Grade 3 spelling lists leave it out: "Spelling:"), `subtitle: "Grade 4 English · Dictation"`, `lang: "en-US"`.
- From Term 2 on: `hub: "../../term-1/english/index.html"` (the "English" link).

## 4. Pictures (`pics`)

Drawings in a 320×180 box, made from the helpers the engine passes in: `pics: ({ em, SKY, G }) => ({ name: () => SKY + G(150, "wood") + em(160, 92, 100, "🥄"), … })`.

- `em(x, y, size, emoji)`: an emoji (the big one ~90–100 at x 160, y 92; small ones 30–60 around it). `SKY`: the sky. `G(y, kind)`: the ground (`ground`, `grass`, `wood`, `snow`, `road`, `sand`).
  Other shapes: `<rect class="f-…">`, `<path class="st-ink" … marker-end="url(#ah-ke)"/>` (arrows), colours from `shared/quiz.css` (`f-sky f-deep f-heat f-water f-snow f-rock f-card f-hl …`).
- Dark scenes (night, darkness): `f-deep`. Never `f-ink`: it turns white in dark mode.
- A word: one clear emoji for its meaning (`slowly` 🐢, `painless` 😊 + 🩹). A sentence: a small scene of the sentence (the parade: 🥁 🎺 🎉).
- Check composite emoji: 💇‍♂️ already has scissors, so don't add ✂️ next to it.
- One drawing per item, every drawing used (the check script says when one is not).

## 5. Lists and logs

- `grade-N/term-1/english/dictations.js`: `{kind: "Dictation", title: "Unit 2 · Week 5", sound: "Suffixes", date: "16 Nov", words: "<the words, comma separated>", note: "10 words & 10 sentences", path, term}`,
  after the week's lesson. A later term: `term: N` and `path: "../../term-N/english/…"`.
- `games.js`, the grade's English entry: the page and its `.js` in `also` (after the other dictations), `countLabel` ("N dictations"), `topics` (the week's bracket: "…, suffix dictation").
- Grade 4, Term 2 on: a row in the term's `SOURCES.md` ("Teacher's files, <date>" table): file · content · `english-dictation-unitN-weekM` (N words + N sentences) · built.

## 6. Check

```bash
node .claude/skills/english-dictation/scripts/check.js grade-4/term-2/english/english-dictation-unit2-week5.js
.claude/skills/english-dictation/scripts/cards.sh grade-4/term-2/english/english-dictation-unit2-week5.html <scratchpad>/cards.png   # then Read the .png
npx --no-install prettier --write <the changed files>
```

- `check.js` must end with `OK`. It prints each word with its highlight in [brackets] and each sentence's key: compare them with the sheet.
- `cards.sh` makes one image of all the Learn cards side by side (~20 s). Look at every card: the picture says the word, the highlight is right, nothing is cut off.
- In the browser (`python3 -m http.server 8765 --bind 127.0.0.1`): the English page's Dictations tab shows the card (with the "Term N" tag and the date), one typed answer in Listen & spell.
  Headless Chromium has no voices: the read-aloud is not tested; say so.

## 7. Report and commit

- Report: the words and sentences, where the words came from (sheet / the week's spelling list), any unreadable word, what was checked. Wait for approval.
- Commits (no Co-Authored-By line): the dictation (page, data file, `dictations.js`, `games.js`, `SOURCES.md`), then `sw.js: VERSION vN` on its own.
- A change to `shared/spelling.js` must leave every dictation as it was: render every screen of the old and new engine with the same `Math.random` seed and compare
  (all dictations: `grep -rl "shared/spelling.js" --include=*.html grade-*`).
