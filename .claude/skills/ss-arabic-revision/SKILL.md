---
name: ss-arabic-revision
description: Build or update Grade 4 Social Studies in Arabic revisions (الدراسات الاجتماعية, مراجعة: a monthly revision sheet, a mid-term or final exam revision) for the school-tests study games, as data files grade-4/term-T/social-studies-arabic/revision-N.js for the SS Arabic revision engine shared/ss-arabic-revision.js (the look of the October Mid-term 1 revision: Revision sheet tab with Read the maps, Complete, Explain why, Prove & link, Answer, Choose, Right or wrong, Mixed; Key terms tab with Learn, Which term?, Build the definition). Use this together with the `revision` skill whenever the user sends or mentions an SS Arabic revision sheet (مراجعة، مراجعة شهر …، حل المراجعة), asks for a revision of the month (November, December …) or an exam revision for SS Arabic / الدراسات, or asks to update or check one, even if they don't say "revision".
---

# SS Arabic revisions (Grade 4, Alex)

Load with the `revision` skill (kinds A–C, where a revision goes, its card) and `ss-arabic-lesson` (sources, gloss, pictures of the lessons). CLAUDE.md "Arabic voice" applies.
**Model: `grade-4/term-1/social-studies-arabic/revision-1.js`** (the October sheet, Unit 1 lessons 1–4; was `mid-term-1/social-studies-arabic-revision.html`).
Engine: `shared/ss-arabic-revision.js` (the data format is in its header). A revision is a data file only: never copy the engine into a page.

## What the page is

- **Revision sheet** tab: one section per kind of question on the sheet, in the sheet's order, plus **Mixed** (`mix` questions from the whole sheet).
  Sections of the model: `map` 🗺️ Read the maps (لاحظ الخرائط ثم أجب, pictures with `fit: 1`), `comp` ✏️ Complete (أكمل), `why` 🤔 Explain why (بم تفسر؟, `ask` / `askE` on the section),
  `prove` 🔗 Prove & link (دلل · ما العلاقة بين؟, `ask` / `askE` per question), `ans` 💡 Answer (أجب عما يلي), `choose` ✅ Choose, `tf` ⚖️ Right or wrong (صواب أم خطأ).
  A new kind of question on a sheet gets its own section (new `k`, `ic`, English `t`, the sheet's Arabic instruction as `ar`).
- Every question is chosen, not typed: `o: [[ar, en], …]`, the right answer **first** (the engine shuffles). Written answers (explain, prove, link, answer, compare)
  become the key's answer + 2 wrong ones that are plausible but clearly wrong (from the same lessons). ✓ / ✗ → `{q, en, tf: true|false, x: why it is false}`.
- `p` = a picture name in `img/revision-N/` (`<p>.jpg`); every question has one. Reuse the lessons' pictures (copy the file into `img/revision-N/`, so the folder works on its own),
  or crop from the sheet (maps) / the book.
- **Key terms** tab: the lessons' key terms (أهم المصطلحات, or the main words of the lessons' Learn parts): `{u: lesson number, w: term, we: English term, t: Arabic definition, en, p}`;
  `units` = one filter button per lesson (`{k: "3", t: "Lesson 3"}` …, last `{k: "all", t: "All"}`), `k` matching `u`. Games: Learn the terms, Which term?, Build the definition (word tiles).
- `key`: a new storage prefix per revision (`ssa4-r2`, …; the model keeps `ssa4`), `eyebrow`: "Grade 4 Social Studies (Arabic) · November revision", `sub`: the sheet's Arabic title.

## Where it goes

- A monthly or exam revision: `revision-N.js` + `.html` in `grade-4/term-T/social-studies-arabic/` (T = the term of the exam or of the month's lessons), pictures `img/revision-N/`.
  The page: `node .claude/scripts/scaffold/new.js grade-4/term-T/social-studies-arabic/revision-N.html --like grade-4/term-1/social-studies-arabic/revision-1.html --title "…"`;
  its scripts: `common.js`, `quiz-common.js`, `revision-N.js`, `../../../shared/ss-arabic-revision.js` (fix the `../` paths if the folder differs).
- The card in `games.js` (not in the lessons list): `grade: 4`, `term: T`, `subject: "Social Studies (Arabic)"`, `period: "Mid-term exam"` / `"Final exam"`
  (a monthly revision before an exam goes under that exam), `title`, `lesson` (the sheet's Arabic title · lessons), `topics`, `questions` (sheet questions + terms),
  `countLabel` ("74 questions & 18 terms"), `also` via `register.py add <the page> <files> <img folder>`.

## Rules

- **Full tashkeel** on every Arabic string (the online voice reads it right). The model (October) was built before this rule and has none; new revisions have it.
- The key wins (حل المراجعة); no key: the answers from the lessons (`ss-arabic-lesson`), listed for the user. Questions the page can't ask (draw, colour, a map to label by hand): left out, named in the header.
- Header comment: which revision, the source files by name and date, the key, the lessons it covers, what was left out.
- Checks: `node --check`; every `p` exists in `img/revision-N/`; every section has questions; every `u` of the terms has a `units` button; `register.py check`; Prettier; the bump last.
- An engine change must leave `revision-1.html` drawing the same screens: run the old and new engine on `revision-1.js` in node with a fake DOM and compare every `app.innerHTML`
  (home, both tabs, each lesson filter, each section, Mixed, each terms game), as was done when the engine was moved out of the page.
