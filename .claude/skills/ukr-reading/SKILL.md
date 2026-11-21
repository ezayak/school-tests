---
name: ukr-reading
description: Build or fix Optima Grade 3 Ukrainian reading texts («Складова ракета»: syllables, stress, Склади / Слова / Читання games; optima/grade-3/ukr-lit/<name>.js for shared/reading.js) from the book «Літературне читання 3» in ~/Documents/2026-2027/Lucas/Optima/. Use this whenever the user asks to add, fix or check a «Складова ракета» text, syllable splitting or stress marks for Lucas, or a reading text card in optima/grade-3/ukr-lit/texts.js, even if they only give a page number.
---

# Ukrainian reading texts (Optima, Grade 3)

The subject rules are in "Rules" below (moved from `CLAUDE.md`); the shared ones in `CLAUDE.md` ("Workflow", "Formatting" and "Offline cache") and the format in `README.md` ("Ukrainian reading"). Read those first.
The book lessons in the same folder (text + questions) are the `optima-ukr-lit` skill, not this one.

## Rules

Folder `optima/grade-3/ukr-lit/` («Складова ракета» texts; the book lessons there are in the next section), engine `shared/reading.js` + `shared/reading.css` (don't copy them; a text is only a data file). Format in README: "Ukrainian reading".
Book: `~/Documents/2026-2027/Lucas/Optima/Літературне читання 3.pdf` (text layer: `pdftotext -f N -l N`; the words are split by zero-width spaces). Lucas reads slowly and has aphasia.

- A text = `<name>.js` + `<name>.html` (copy bohdanchyk.html, change the `.js`), a card in `texts.js`, both files in `also` of the Українська література entry in `games.js`
  plus its `countLabel` / `topics`; `VERSION` bump in `sw.js` last.
- The text exactly as the book prints it (’ apostrophes, « » quotes, – dashes). Lines of a phrase or a short sentence (≤ 7 words).
  More than about 100 words: `pages: [[lines], …]` of about 100 words each, cut at a paragraph or sentence; no separate cards, no page buttons.
- Syllables: `-` between them, split between two consonants (ос-то-ронь, крис-ла-ту), a word-initial cluster stays (зга-, тре-, хви-),
  `ь` and `й` stay with the syllable before (лень-кий, дій-ка), `дж` / `дз` as one sound stay together (на-ро-джен-ня).
  `*` before the stressed syllable of every word of two syllables or more, before « when the word starts with one (`*«Ма-буть,`).
  A real hyphen is `‑` (U+2011) at the end of its syllable (`*мо-ря‑-о-ке-*а-ни`, one `*` per part).
  Stress the way a dictionary gives it; list the less obvious ones for the user (Сашка́, одна́ одну́, ранко́ву).
- `launch` (Склади): the longest words, 10 per ~100 words; `fuel` (Слова): 20 per ~100 words, none twice. Spelled exactly as in the text.
- Check with `node .claude/scripts/ukr-reading-check.js <text.js> "<book.pdf>" <page>` (syllables, stress, the word lists, the text against the book page).
- Check in the browser at a phone width (360–390px upright, sideways) and a landscape tablet: the longest Склади word, Читання to the end, the page turn.
