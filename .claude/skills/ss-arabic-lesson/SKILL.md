---
name: ss-arabic-lesson
description: Build or update Grade 4 Social Studies in Arabic lessons (الدراسات الاجتماعية «مصر في قلب العالم», grade-4/term-1/social-studies-arabic/uN-lesson-M.js on the Arabic lesson engine) for the school-tests study games from the book Social_studies_prim4_t1.pdf, the workbook Social_studies_prim4_t1_Assmt.pdf (الأداءات والتقييمات) and the teacher's sheets and keys in ~/Documents/2026-2027/Alex/SSArabic/. Use this whenever the user sends or mentions SS Arabic / الدراسات book or workbook pages, an SS Arabic lesson or unit (الوحدة، الدرس, «الأماكن الخدمية», «أين تقع محافظتي», «علم مصر»), a teacher's SS Arabic sheet (شرح، تدريبات، حل), inbox subject g4-ss-arabic, asks to add, update or check SS Arabic lessons, or asks which SS Arabic pages are built, even if they don't say "lesson".
---

# Social Studies in Arabic (Grade 4, Alex)

Shared rules first: `CLAUDE.md` ("Workflow", "Formatting", "Offline cache", "Arabic voice"). The engine is the Arabic one, so the `arabic` skill's scripts
(`.claude/skills/arabic/scripts/`: `check.js`, `gloss-reuse.js`, `gloss-insert.js`) work here too. Log: `grade-4/term-1/social-studies-arabic/SOURCES.md`.
**Model lesson: `grade-4/term-1/social-studies-arabic/u2-lesson-3.js`** (the parent reviewed it): copy its shape, header comment and helpers.

## Sources

Folder `~/Documents/2026-2027/Alex/SSArabic/` (inbox subject `g4-ss-arabic`):

- **The book** `Social_studies_prim4_t1.pdf` (Term 1, 3 units): the lesson's **explanation** (Learn) and its activities (أفكر، ألاحظ وأجيب …) and its تدريبات الدرس at the end.
  Book pages are the printed numbers (PDF page = printed + 1 in Unit 2: printed 52 = PDF 53). The text layer works (`pdftotext -f N -l N`),
  but lam-alef comes out broken (األماكن, الحالل): read it, then write the text yourself with full tashkeel; look at the page picture to check.
- **The workbook** `Social_studies_prim4_t1_Assmt.pdf` (الأداءات والتقييمات): the lesson's **exercises**: الأداء الصفي (periods), الأداء المنزلي, التقييم الأسبوعي (models أ ب ج).
  Find the lesson's pages by its title (`pdftotext` per page, grep the title: Unit 2 Lesson 3 = pp. 26–29). It has no key.
- **The teacher's files** (dated, one lesson each): الشرح (explanation sheets), تدريبات (extra exercises), حل … (keys of the book's تدريبات), مراجعة (revision sheets).
  A key wins over your own answer; use the parent's ticked pages only. Explanation comes from the book, not from the teacher's الشرح (the parent's choice).
- The book and the workbook are big files: they stay in the inbox (`inbox.py done` only for teacher's files that are used up); SOURCES.md says which pages are built.

## What to build

One lesson per session: `uN-lesson-M.js` + `.html` in `grade-4/term-1/social-studies-arabic/`
(`node .claude/scripts/scaffold/new.js grade-4/term-1/social-studies-arabic/uN-lesson-M.html --like grade-4/term-1/social-studies-arabic/u2-lesson-3.html --title "…"`),
pictures in `img/uN-lesson-M/` (render the page with `pdftoppm -scale-to-y 1440`, crop with PIL; book pictures by name, workbook pictures `w-…`).

- `n: "ssa-uNlM"`, `tapq: true`, `checkq: true`, `links` back to `index.html` ("Social Studies lessons"), `unit: "الْوَحْدَةُ … · الدَّرْسُ … · p. A–B"`.
- **Tabs** (`L.tabs`): `story` with `t: "Learn"` · `games` · `ex` ("Exercises"), each with `sub`.
- **Learn** (`stories[0]`, `kind: "The lesson · الدَّرْسُ"`, `videoT: "Lesson video"`): the book's explanation word for word, in short parts, one book picture each;
  `para` = the book's heading of that part (الأماكن الخدمية التعليمية …). Skip the lesson goals (أهداف الدرس) and the activity boxes (they go to Games).
  - **`sum`** on every part: «In short», 1–3 main points in simple words, full tashkeel, `{ar: [points], en: [points], uk: [points]}`. Written for the app (say so in the header).
  - **Video**: when the parent gives a YouTube link, `video: "<id>"` on `stories[0]` shows the «🎬 Lesson video» button.
- **Games** (`tab: "games"`): the book's activities in the lesson (ألاحظ وأجيب، ألاحظ وأستنتج … as picture `mc`, the page in `en`: "I observe and answer (p. 54): …"),
  then games from the text: `match` (place ↔ type, thing ↔ what it does), "what is in the picture" `mc` with the book's pictures, `tf` (duties, facts, with `x` for false ones),
  `build` (word order of key sentences).
- **Exercises** (`tab: "ex"`): first the book's تدريبات الدرس (`en: "Book p. 57, a) …"`), with the teacher's key; then the workbook pages in their order:
  each الأداء الصفي period / (أ) (ب), each homework, each weekly-test model as its own section (`en: "Workbook p. 26 · Class work, period 1 (a): …"`).
  Each question with the workbook's picture (crop it). Comparison tables: one `open` per row (both columns in the answer, `·` between them).
- Item types: صواب / خطأ → `tf` (+ `x`); اختر / أكمل with choices or a picture → `mc` (right answer first); ما المقصود، فسر، دلل، اذكر، قارن → `open` with a model answer
  from the book text; «قدم مقترحًا / توقعًا» (your own idea) → `open` with one example answer starting «مِثَالٌ:». Every question has `read: [0, part]`: the Learn part it comes from.
- Use the helpers at the top of the model file (`P`, `mc`, `tf`, `open`, `type(i)` for the four service types) inside its `(function () { … })()`.

## Rules

- Full tashkeel everywhere (the online voice needs it). Keep the book's wording; fix only plain misprints (القري → الْقُرَى) and list them for the user.
- `en` / `uk` on every part, summary point, section and item; `match` pairs as `{l, r, en: [l, r], uk: [l, r]}`.
- `gloss` (tap a word → EN / UA): every Arabic word of the parts, `para`, `sum`, titles, questions, options, answers, `x`, pairs.
  `node .claude/skills/arabic/scripts/check.js <file> --missing` → `gloss-reuse.js` over `grade-4/term-1/social-studies-arabic/*.js` (and the Arabic / Religion lessons) →
  write the rest as `word|en|uk` → `gloss-insert.js` → Prettier. `check.js` does not read `sum`: check the summary words too (every token of `parts[].sum.ar` has a gloss).
- Workbook answers have no key: say so in the header and in the message; open answers are model answers.
- Then: the lesson in `LESSONS` (`lessons.js`, `note` with the counts); `register.py add grade-4/term-1/social-studies-arabic/index.html <files> <img folder>`, `register.py check`,
  the card's `countLabel` / `topics` in `games.js` (Grade 4 "Social Studies (Arabic)" entry); SOURCES.md rows (book pages, workbook pages, teacher's files);
  `inbox.py done` for the teacher's files used up; `register.py bump` last, one commit.
- The engine `grade-3/term-1/arabic/arabic-lesson.js` is shared with Arabic and Religion: a change only adds optional fields (as `sum`, `videoT`); never change what they show.
- **Revision** (the teacher's مراجعة, a month or exam revision): the `ss-arabic-revision` skill with the `revision` skill: a data file `revision-N.js` for `shared/ss-arabic-revision.js`,
  its card under the exam (Revision T → Mid-term / Final), not in the lessons list.
