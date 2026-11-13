# CLAUDE.md

Study games for Grade 3–4 tablets: plain HTML/CSS/JS, no build step, served from GitHub Pages, works offline as a PWA.
Read README.md first. It has the structure, the lesson/dictation formats and the "after adding X" steps.

## Styling and shared code

- `shared/` is the one place for styles and helpers; pages have no `<style>` blocks. The goal is that new pages can't drift from the standard look.
- A rule used by more than one page goes into the shared file every one of those pages loads. `shared/theme.css` is loaded first by every page, including all hubs.
  Example: `.play-arrow` (keeps "Play →" / "Open →" on one line) lives only in theme.css, not copied into index.css / lesson.css / english-hub.css.
- Before adding CSS, check which stylesheets the target pages actually load (`grep -n "<link" .../index.html`). The English hubs load theme.css + english-hub.css only, not lesson.css.
- Markup shared by several engines goes into `Kit` in `shared/common.js` (e.g. `Kit.lessonCard(it, label)` for French and Computer hub cards). A page that uses Kit must load `shared/common.js` before its own scripts.
- A hub page with several groups (Lessons · Tests · Homework …) uses `Kit.sideNav(host, sections)`: a bar on the left on a landscape tablet, tabs on top on a phone. Styles in theme.css.
- Every page has `<html lang="…" translate="no">` and `<meta name="google" content="notranslate" />` after the charset:
  the browser must not offer to translate the app (it would change the words being learnt).
- Tiles dragged or tapped from a bank onto a line (build a word, put words in order) always use `Kit.dragTiles`; never copy drag code into a page. The page keeps only its own check and feedback.

## Formatting

- The whole repo (JS, CSS, HTML, Markdown, manifest) is Prettier-formatted (Prettier 3.9.10, installed globally, defaults, no config). Keep it that way. The user reads the code.
- Check: `prettier --check .`. Fix: `prettier --write <files>` (only the files you changed). If `prettier` is not on the PATH (nvm not loaded), use `npx --no-install prettier`.
- Formatting-only changes go in their own commit, never mixed with logic changes.
- `sw.js` finds game files by running regexes on the text of `games.js` (`path: "…"`, `also: [...]`). After reformatting games.js, confirm that it still finds the same file list.

## Offline cache (sw.js)

- Any change to a precached file (CORE, anything in games.js `path`/`also`) needs `VERSION` bumped in `sw.js`, or installed tablets keep the old files offline.
- Bump once, in a separate last commit after the related changes.
- Precache uses `new Request(p, {cache: "reload"})` so a version never mixes old pages with new CSS. Keep it.

## Arabic (Grade 3): lessons, tests, homework

Folder `grade-3/term-1/arabic/`, engine `arabic-lesson.js` (don't copy it, only data files change). Formats are in README: "Arabic lessons", "Arabic tests", "Arabic homework".
The user sends scans of Lucas's book pages (PDFs in `~/Documents/2026-2027/Lucas/Arabic/`). Lucas has aphasia; the parent explains each question by pointing at the picture.

Sorting a scan:

- Each page header says the lesson (title of the story, الأسبوع week number, الفترة period). Match it to `lessons.js` by title. A scan can hold pages of two lessons: put each page with its own lesson, and say so.
- أَوَّلًا: الْأَدَاءَاتُ الصَّفِّيَّةُ = classwork (skip unless asked). ثَانِيًا: الْأَدَاءَاتُ الْمَنْزِلِيَّةُ = homework. التَّقْيِيمُ sheets with groups (أ)(ب)(ج) = tests.
- Handwriting on the page is Lucas's own answers: ignore it, it is not the key. Duplicate pages in a scan: use the cleanest one.
- A page already built (same page in an earlier scan, a test already in `TESTS`): skip it and say so.
- Words missing or covered in the scan: never guess. List them and ask.

What to build:

- **Lesson** `lesson-N.js` + `lesson-N.html` + `lesson-N-exercises.html` (copy lesson-1's), pictures cropped from the book into `img/lesson-N/` (~700px).
  Story texts, words, opposites / plurals / meanings (the book's قاموس), every book exercise as a section; every item has a picture.
- **Test** `test-N.js` + `test-N.html` (copy test-1.html): one tab per group, the sheet's paragraph with a picture above the tasks, items without pictures. See "Arabic tests" below.
- **Homework** `hw-N.js` + `hw-N.html` for Lesson N (copy hw-2.html): one tab per book page, only the homework tasks, a picture (`img` or emoji `ic`) on every item.
  More homework for a lesson that already has `hw-N` = new tabs in it.
- Item type: one word to write → `word` (list every accepted answer); choices given in brackets → `mc` (right one first); words to put in order (رَتِّبْ) → `build` with `a` = the sentence (word tiles, `Kit.dragTiles`; the page loads drag-words.css and shared/common.js); sentence, writing, copying → `open` with a model answer.
  A writing task (new ending, write about yourself) gets a folded `help` question that leads to an idea; its options are `[ar, en, uk]`, so they are translated.
- `en` / `uk` translate every Arabic word they mention; never a transliteration like «tamdee».

Rules for every Arabic file:

- Full tashkeel on all Arabic. `en` and `uk` on every text, section and item.
- `gloss` has every Arabic word of the texts, questions, options and model answers (one entry per word without tashkeel is enough). Check it with a script before calling it done: no word without a gloss, no item without a picture (tests: the text has it), every `img` path exists.
- Pictures: crop from the scan (`pdftoppm -r 400`, then PIL), or reuse one from `img/lesson-*/`. An emoji `ic` is at most 2 emoji with no space ("🧴🧴"); more get cut off on a landscape tablet.
- Then: entry in `LESSONS` / `TESTS` / `HOMEWORK` (`lessons.js`); the new files and pictures in `also` of the Arabic entry in `games.js`, plus its `countLabel` / `topics`; `VERSION` bump in `sw.js` last.
- Check in the browser: the list on `index.html`, each tab, one typed answer.

### Arabic tests

- A test is one التَّقْيِيمُ الْأُسْبُوعِيُّ sheet (الْفَتْرَةُ الرَّابِعَةُ, after the lesson's homework pages). Numbered in the order of the workbook pages, not the order they are built: `test-1` is p. 7–8 and a sheet that comes between two built tests takes its place in the numbering (the later tests are renamed). Before building, check `TESTS` and the `unit` page numbers: the same sheet may be built already.
- Head: `n: "tN"`, `title: "التَّقْيِيمُ الْأُسْبُوعِيُّ"`, `en: "Weekly test · <story in English>"`, `unit: "الْفَتْرَةُ الرَّابِعَةُ · p. X–Y"`, `cover` = a picture of that text from `img/lesson-N/`,
  `tapq: true`, `exSub: ["Answer the questions", "أَجِبْ عَنِ الْأَسْئِلَةِ التَّالِيَةِ"]`.
- Tabs: one per group, `{k: "a", ic: "📝", t: "Group A", short: "A", ar: "الْمَجْمُوعَةُ (أ)", story: 0}`; the groups share the one paragraph.
- Text: the paragraph exactly as the sheet prints it, with tashkeel taken from the lesson text; one part, `para: "السُّؤَالُ الْأَوَّلُ: اقْرَأِ الْفِقْرَةَ التَّالِيَةَ ثُمَّ أَجِبْ"`, `img` from the lesson.
- Sections: one per lettered part of a group (أ، ب، ج), `k: "a1"`, `"a2"`, … with `tab: "a"`, `t` as printed ("أ) اسْتَخْرِجْ مِنَ الْفِقْرَةِ"); items in the sheet's order.
- Items, no pictures:
  - "استخرج / هات" one word → `word` with every word of the paragraph that fits. If the asked word is not in the paragraph as printed (e.g. the singular of حِصَصِ), accept the right word and say so in `en` / `uk`.
  - a question sentence, or "أجب" → `open` with the model answer.
  - syllables (حَلِّلْ إِلَى مَقَاطِعَ صَوْتِيَّةٍ) → `open` with `plain: true`, answer like "اَلْ / عَا / مِ".
  - an answer found only in a later part of the story → give it, and say in `en` / `uk` where it comes from.
- السُّؤَالُ الثَّانِي: اكْتُبْ مَا يُمْلَى عَلَيْكَ (dictation) is left out: the teacher dictates it, the sheet has no text.
- `TESTS` entry: `{n, nAr, title, en, path, cover, note: "Groups A · B · C · <count> questions · text from Lesson N"}`; in `games.js`: `test-N.html` / `.js` in `also`, `countLabel` ("… · N tests") and `topics` ("Tests 1–N").

## Religion (Grade 3): lessons

Folder `grade-3/term-1/religion/`, engine `../arabic/arabic-lesson.js` (shared with Arabic, don't copy it). Format in README: "Religion lessons".
Book: التربية الدينية المسيحية, `~/Documents/2026-2027/Lucas/Religion/` (book PDF + the teacher's slides). Lucas has aphasia: a picture on every part and question.

Sorting:

- The lesson = one book lesson (الوحدة N، الدرس M), story pages + الأنشطة والممارسات pages. The slides are a summary: use the book text.
- Homework = the page the parent sends a photo of (his real homework). Check its lesson by the page number and story: a page of another lesson
  belongs to that lesson (build that lesson if it is missing, then put the page there). If unsure which part is homework, ask before building.
- Words missing or unreadable: never guess. List them and ask.

What to build: `uN-lesson-M.js` + `uN-lesson-M.html` (copy u2-lesson-4.html), pictures in `img/uN-lesson-M/` (`pdftoppm -r 300`, then PIL; story ~700px, small activity pictures ~300px).

- `n: "rel-uNlM"`, `tapq: true`, `links` back to "Religion lessons", `tabs`: story · games · verse, plus hw only when there is real homework for this lesson.
- Story: the book text word for word in short parts (one picture each, reuse a picture for two parts if needed); the "هَيَّا بِنَا نُصَلِّي" prayer is a second text.
- Games: every activity of the lesson, one section each, plus the lesson's أسئلة الدرس (unless it is the homework).
  Every section's `en` / `uk` starts with its book page: "Activity 2 (p. 8): …" / "Завдання 2 (с. 8): …", "Lesson questions (p. 9): …".
- A المحفوظات lesson (memory verses, Lesson 2 of each unit) has no story: tabs verse · story · games, all its verses in `verses`, the story tab (`t: "Words"`) is its word list
  (one part per word, `para` = the word, `ar` = the book's meaning), pictures reused from the lessons the verses come from.
- Verse: the golden verse (الآية الذهبية) in `verses`, with 3–4 `gaps` (right word first; each right word once in the verse).
- Item types: "من أنا" / choose → `mc` (with `q: "… أَنَا ___"`); word bank → one `mc` per gap, the bank as the section's `rule` with `t: "📝 The words · الْكَلِمَاتُ"`;
  ✓ / ✗ → `tf` with `x` (why it is false); صِلْ / match → `match` with `pairs: [{l, r, en: [l, r], uk: [l, r]}]` (a translation for both sides); write / what would you do / picture-and-event → `open` with a model answer and a `help` question (`[ar, en, uk]` options).
  Colouring and drawing activities are left out.

Rules:

- Full tashkeel. Keep the book's wording; fix only plain grammar mistakes and list them for the user.
- `en` / `uk` on every text, part, section, item and help option.
- `gloss` has every Arabic word of the texts, paragraph titles, verse and its gap choices, questions, options, `x`, help and model answers. Same spelling with different meanings
  (حَلَمَ / حُلْمَ, مِنْ / مَنْ, حَدَثَ / حَدَثٍ) get their own exact-tashkeel keys. Check with a script: no word without a gloss, no item without a picture, every `img` exists, every gap once.
- Then: entry in `LESSONS` (`religion/lessons.js`); files + pictures in `also` of the Religion entry in `games.js`, plus `countLabel` / `topics`; `VERSION` bump in `sw.js` last.
- A change to the engine must leave the Arabic pages as they were: check an Arabic lesson (story → Words button) and a test (fixed text, no part navigation).
- Check in the browser: the list, each tab, the verse games (tiles move with real taps, not script `.click()`).

## French (Grade 3 and 4): lessons and revisions

Engine `grade-4/term-1/french/french-lesson.js` (don't copy it; a lesson or a revision is only a data file). Format in README: "French lessons (Grade 4)"; `lesson-2.js` is the fullest example.
Sources: Grade 4 (Alex) `~/Documents/2026-2027/Alex/French/`, Grade 3 (Lucas) `~/Documents/2026-2027/Lucas/French/`: the teacher's lesson slides (book pages
"Livre p. N", "Cahier d'exercices p. N", often with the answers filled in), class work / homework sheets (Travail de classe, Devoir noté, some with a "Modèle de réponse"),
and the term sheet "Exercices d'application" (mid-term / final). The boys learn from pictures and sound: a picture on every item.

Sorting:

- Each slide says its book page. The lesson = book pages + cahier pages + the sheets for that lesson. A sheet file name can be wrong (a "Devoir noté" that says "Travail de classe" on the page): say so.
- Sheets on several lessons (Exercices d'application) = the revision, not a lesson. A sentence from neither lesson (e.g. « J'ai une gomme rouge ») goes in with an emoji picture: list it for the user.
- Answers come from the teacher's filled-in pages and "Modèle de réponse". An answer with no key (no model answer, a picture to interpret): give the likely one and say it is unverified.
- Words missing or unreadable: never guess. List them and ask.

What to build:

- **Lesson** `lesson-N.js` + `lesson-N.html` (copy lesson-2.html, change the script and title), pictures in `img/lesson-N/` (`pdftoppm -r 200`, find boxes on a grid, crop with PIL; people ~250–500px, panels ~700px, comic cover ~1000px; check a contact sheet for cut text or bits of the next panel).
  Learn: story (every panel, then "Des phrases pour parler" with `title`), words (`people` with `say`, `phrases` = the page's Vocabulaire), one `sound` tile per Phonétique sound, a `rule` card for a grammar box. The `verb` view only knows s'appeler: another verb needs an engine change first.
  Play: listen, match, bword, bsent, ilelle (if people have il / elle), and `game` tiles for the lesson's own point (Un ou une ?).
  Exercices: every book "Parle" / cahier exercise / sheet task, one section each, `from` = where it is ("Cahier p. 7 ex. 5"); a sheet task the lesson already has is not built twice.
  Dictée: a "(by spelling)" sheet or list = one entry in `dictee` (its words and its sentences, a picture on each); the engine makes the build-from-letters and hear-and-type games.
- **Revision** `revision-N.js` + `revision-N.html` (copy revision-1.html; it loads every lesson it uses before its own file): Exercices only, the term sheet's tasks in its order,
  then the lessons' main exercises through `ref: "N:k"`; pictures from the lessons (`img: "lesson-2/parle-9"`), never new copies.
- Item types: put in order → `order` (`q` for "Réponds" / "Regarde et écris"); write a word with a sound → `letters`; choose / entoure / oui-non question → `mc` (right one first, `full` for the whole answer);
  complete a verb, a capital letter, . ? ! → `fill`; "Mets un (x) si c'est une phrase" → `yn` with `ask`, `x`, `fix`; listen and point → `tap`; relie → `match`.

Rules for every French file:

- French exactly as the book prints it (’ apostrophes, a space before ? and !); only the teacher's slide typos are fixed, and listed for the user.
- Every French text has an EN / UA / AR translation through `dict` or `auto`; names need none.
- Check with a script before calling it done: every sentence translates, every item has a picture, every `img` exists, every picture file is used and listed in `also`.
- Then: entry in `lessons.js` (lesson) or a "Final exam" / "Mid-term exam" card in `games.js` (revision); new files and pictures in `also` of the French entry, plus its `countLabel` / `topics`; `VERSION` bump in `sw.js` last.
- Grade 3: `grade-3/term-1/french/` (Lessons 1–4 and `revision-1`, the same format); pages load the engine from `../../../grade-4/term-1/french/french-lesson.js`.
  Grade 3 has no book slides after « La présentation »: a lesson is a topic sheet (Les salutations, Les consignes de la classe) or a topic of the sheets (Les lettres et les mots).
- A change to the engine must leave the existing lessons as they were: render every screen of the old and new version with the same `Math.random` seed and compare (headless Chrome: `google-chrome --headless=new --dump-dom` on a harness page that clicks through an iframe), then play every game and exercise to the score screen.
- Check in the browser: the list, each tab, the sound and rule screens, translations on, one exercise of each type.

## English (Grade 4): lessons and stories

Folders: `grade-4/term-1/english/`, `grade-4/term-2/english/`, … One English page for all terms: `grade-4/term-1/english/index.html` (list in its `dictations.js`).
Engines: lessons `shared/computer-lesson.js` (`<body data-subject="English">`), stories `shared/story.js`, dictations `shared/spelling.js` (don't copy them; a lesson, a story or a dictation is only a data file).
Format in README: "English stories", "English lessons (Grade 4)", "English revision"; `term-1/english/unit1-week5.js` is the fullest example.
Step-by-step procedure, lessons learned and the check scripts (data check, play-through, screenshots, offline list): the `english-lesson` skill in `.claude/skills/english-lesson/`.
Sources: the term booklets in `~/Documents/2026-2027/Alex/!booklets/` (Classwork and Homework Booklet), and `~/Documents/2026-2027/Alex/English/Term N/`
(shared reads, leveled readers, model answers, memos, dictations). Alex is learning to read again: everything is read aloud, a picture on every item.

Sources log (Term 2 on; Term 1 sources are in the `// Sources:` line at the top of each file):

- Each term folder has `SOURCES.md` (every source file page by page: what it was built into, `file · key`, or why it was skipped),
  `TODO.md` (tasks waiting for a text that is not scanned yet), `UNVERIFIED.md` (answers written without a school key).
- Before building: read `SOURCES.md` and compare it with the source folders; build only the pages that are not in it, and say which ones are already built.
- With every lesson or story: update its rows in the three files, in the same commit.

Sorting:

- Wonders pages say the week at the foot ("Grade 4 · Unit 2 · Week 5"), school sheets at the top ("Unit 2 week 5"). The booklets go week by week after a divider page
  (with "Talk About It" = the week's cover picture and Essential Question).
- A text (Genre Passages O1–O3, a homework comprehension text, a poem) = a story; its questions go in the story. Grammar, phonics, spelling, vocabulary pages = exercises of the week's lesson.
- Skipped: cover, dividers, fluency charts ("Words Read / Number of Errors"), a page printed in both booklets (build it once).
  A task about a text that is not in the booklet (writing frames, "Read this excerpt from …"): into `TODO.md` until the user sends the scan.
- Words missing or unreadable: never guess. List them and ask.
- Answers: from the school's model answers or memo when there are some. Without a key: give the likely answer, add a `// unverified` comment and a row in `UNVERIFIED.md`.

What to build:

- **Lesson** `unitN-weekM.js` + `.html` (copy `term-1/english/unit1-week5.html`, change the `.js` and the title), pictures in `img/unitN-weekM/`.
  `key: "en4-uNwM"`, `unit: "Unit N · Week M"`, `hub`: the English page (`"../../term-1/english/index.html"` from a later term), `question` = the Essential Question.
  Learn: the week's story tiles, then decks (vocabulary words, the grammar rule boxes, the spelling list by pattern, figurative language), each card with `vis`, `src` or `emoji`.
  Play: games for the week's points (sort, match, mc). Exercises: every booklet task, one exercise each, `from: "Classwork p. 3"` (the PDF page number, printed at the bottom centre),
  `g` = the section ("🧩 Grammar · …", "🔊 Phonics · …", "🔤 Vocabulary", "🧱 Vocabulary strategy · …", "📖 Reading · …"); items in the booklet's order.
- **Story** `story-<name>.js` + `.html` (copy `term-1/english/story-helping-hand.html`, change the `.js`), pictures in `img/<name>/` (`pdftoppm -r 200`, then PIL; ~700px, small pictures ~400px).
  Text exactly as printed, short pages, one `easy` sentence each, `gloss` for the hard words, the booklet's questions in order; `lesson: {path, label}`, and `hub` (as above) from a later term.
- **Dictation** (a school dictation sheet) `english-dictation-unitN-weekM.js` + `.html` (copy the last one, change the `<title>` and the `.js`); format in README "English dictations", procedure and checks in the `english-dictation` skill.
  The sheet's words and sentences exactly as printed (a sheet with only sentences: the week's spelling words in them are the words); `mark` the sound or suffix on each word, `key` in each sentence; a picture (`pics` drawing) on every item; `date` in `dictations.js`.
- Item types: circle / choose / which sentence is right → `mc` (right one first; `keep` for a fixed list like the tense names); underline or circle words in a sentence → `tapw`;
  word sort, "write the words that contain …" → `sort`; match a word to its meaning → `match` or `mc`; complete a verb, fill a gap → `mc` with likely wrong forms;
  rewrite / combine / correct a sentence → `mc` (which is right) or `order` (build it from cards); question about a text, writing task → `open` with a model answer.

Then:

- Entry in `term-1/english/dictations.js` (`kind: "Lesson"` / `"Story"`, `term: N` for a later term, which shows a "Term N" tag; path from the term-1 folder: `"../../term-2/english/…"`).
- The new files and pictures in `also` of the Grade 4 English entry in `games.js`, plus its `countLabel` / `topics`; `VERSION` bump in `sw.js` last.
- Check with a script: every item has a picture, every `img` / `src` exists, every picture file is used and in `also`, every `path` and `hub` link opens.
- Check in the browser: the English page (the tag), each tab and section of the lesson, every story page, one exercise of each type, the back links.

## Computer (Grade 4): lessons

Folder `grade-4/computer/chapter-N/` (one per book unit), engine `shared/computer-lesson.js` (don't copy it; a lesson is only a data file). Format in README: "Computer lessons (Grade 4)".
Procedure, how to read the e-book screenshots and the checks: the `computer-lesson` skill. Sources: `~/Documents/2026-2027/Alex/Computer/` (`unit-N/` e-book screenshots and figure PNGs, `Term N/` videos and CW / HW sheets).
Alex has aphasia: short sentences, a picture on every card and question, and every computer skill practised on a pretend program (Mini Windows, Mini Word, Mini Outlook + Mini Edge).

- Every blue "N.N.N To …" box = a how-to in the pretend program, every Hands on task = an exercise in the book's order. A skill the program can't do yet = a program change first, in its own stage, and the older lessons must still play.
- Logs in `grade-4/computer/`: `SOURCES.md` (every screenshot folder, figure, sheet, video → `file · key`, or why skipped), `TODO.md`, `UNVERIFIED.md` (Hands on answers have no key in the screenshots). Update them with every lesson, in the same commit.
- Words missing or unreadable: never guess; ask. Then: card in `lessons.js` (under its chapter), files and pictures (not videos) in `also` of the Computer entry in `games.js`, plus `countLabel` / `topics`; a new shared program file in CORE of `sw.js`; `VERSION` bump in `sw.js` last.

## Math (Grade 4): book lessons

Folder `grade-4/math/unit-N/`, engine `shared/computer-lesson.js` (`<body data-subject="Math">`) + `shared/math.js` / `.css` (don't copy them; a lesson is only a data file). Format in README: "Math lessons (Grade 4)".
Procedure, item types and checks: the `math-lesson` skill; `unit-2/lesson-2-1.js` is the model.
Sources: `~/Documents/2026-2027/Alex/Math/books/` (Reveal Math Student Edition Vol. 1 = Units 1–7, scanned, book page = PDF page − 20; Student Practice Book, text layer) and `Term N/` (class sheets, extra practice, homework, model answers).
Alex has aphasia: the parent explains each question by pointing at the pictures.

- One page per book lesson (`lesson-2-1`): the Student Edition's 4 pages + its 2 Practice Book pages. The unit pages (`unit-2/place-value` …) hold the Term 1 sheets; keep them.
  A new school sheet goes into its book lesson as a "🏫 School" section.
- Every book item in the book's order; every question has a drawing (`vis`), picture or emoji. Numbers are typed on the number pad (`num`), worked out, never from memory.
  The Be Curious picture is the cover; other pictures are drawn by `shared/math.js` unless the book's own picture explains more. Unit 1 « Math Is… » and drawing tasks are skipped.
- Logs in `grade-4/math/`: `SOURCES.md` (every book / Practice Book page and sheet → `file · key`, or why skipped), `TODO.md`, `UNVERIFIED.md` (answers without a key, `// unverified` in the file). Update them with every lesson, in the same commit.
- Words or numbers missing or unreadable: never guess; ask. Then: card in `lessons.js` (under its unit), files and pictures in `also` of the Math entry in `games.js`, plus `countLabel` / `topics`; `VERSION` bump in `sw.js` last.

## Science (Grade 4): lessons

Folder `grade-4/science/topic-N/`, engine `shared/computer-lesson.js` (`<body data-subject="Science">`, don't copy it; a lesson is only a data file). Format in README: "Science lessons (Grade 4)".
All 30 book lessons are built; new sources (term booklets, the teacher's slides, school sheets) add exercises to them. Procedure, picture scripts and checks: the `science-lesson` skill.
Sources: `~/Documents/2026-2027/Alex/Science/` (booklets, slides, sheets) and `book/` (Elevate Science). Alex has aphasia: the parent explains each question by pointing at the pictures.

- Logs (Term 2 on), in `grade-4/science/`: `SOURCES.md` (every page → `file · exercise key`, or why skipped), `TODO.md`, `UNVERIFIED.md` (answers without a school key; the teacher's filled-in slides are a key). Update them with every lesson, in the same commit.
- Every question has a picture that explains it; every answer has a picture (`pics`) or emoji (`icons`); every sentence answer has an explanation (`x`). Pictures: explanation drawings `e-*.jpg` (PIL scripts in the skill), booklet crops (empty label boxes numbered in red), emoji or animated scenes (the page then loads `shared/common.js`).
  Only the lessons being built or updated; older lessons stay as they are unless asked.
- Booklet answers have no key: give the right one from the book, a `// unverified` reason in `UNVERIFIED.md`. Words missing or unreadable: never guess; ask.
- `term: N` in `lessons.js` on a lesson with Term N booklet sheets (a "Term N" tag after "Lesson M"). One commit per lesson.
- Then: files and pictures in `also` of the Science entry in `games.js`, plus `countLabel` / `topics`; `VERSION` bump in `sw.js` last.

## Social Studies (Grade 4): lessons and stories

Folder `grade-4/social-studies/chapter-N/`, engines `shared/computer-lesson.js` (`<body data-subject="Social Studies">`) and `shared/story.js` for stories (don't copy them; a lesson or a story is only a data file).
Format in README: "Social Studies lessons (Grade 4)". Procedure, picture scripts and checks: the `social-studies-lesson` skill; `chapter-1/lesson-4.js` + `story-douglas.js` are the model.
Sources: `~/Documents/2026-2027/Alex/S.S.English/` (term booklets, `Term N/` sheets) and `book/` (myWorld Interactive 4, two-page spreads as PNG). Alex has aphasia: the parent explains each question by pointing at the pictures.

- A lesson = one book lesson + the booklet's exercise sheet for it. The book's text is retold in easy words on picture cards (short sentences, key words in `[brackets]`); the booklet's questions stay as printed.
- Stories to know (Citizenship pages, history stories the booklet asks about) = story pages with the text exactly as printed, an easy sentence per page, a summary, and no questions.
- Every question has a picture, every answer a picture or an emoji, every sentence answer an explanation (`x`). Colouring is left out.
- Logs in `grade-4/social-studies/`: `SOURCES.md` (every book page and booklet page → `file · key`, or why skipped), `TODO.md`, `UNVERIFIED.md` (the booklets have no key). Update them with every lesson, in the same commit.
- Words missing or unreadable: never guess; ask. Then: `lessons.js` (`term: N`), files and pictures in `also` of the Social Studies entry in `games.js`, plus `countLabel` / `topics`; `VERSION` bump in `sw.js` last.

## Ukrainian reading (Optima, Grade 3)

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

## Ukrainian language and reading (Optima, Grade 3)

Folders `optima/grade-3/ukr-mova/` (Українська мова) and `optima/grade-3/ukr-lit/` (Українська література, next to the «Складова ракета» texts), one engine `shared/ukr-lesson.js` + `.css`
(don't copy it; a lesson is only a data file). Format in README: "Ukrainian language and reading lessons". Procedure, item types and checks: the `optima-ukr-mova` and `optima-ukr-lit` skills.
Books in `~/Documents/2026-2027/Lucas/Optima/`: language «Українська мова та читання. Ч. 1» (Кравцова, Придаток; PDF page = book page + 3), reading Савчук «Ч. 2» (PDF page = book page).
Their text layers are garbled: read the pages as pictures. Lucas has aphasia and reads slowly: a picture or emoji on every item, answers by a tap (choices, letter tiles, word tiles).

- Language: a lesson = one topic (from the «початок уроку» sign to the next); Урок = the rule slides, Вправи = every exercise task that has something to check, homework 🏠 in its own group.
- Reading: a lesson = one text exactly as printed (poem stanzas in reading order) and its questions as slides; answers in the text → choices, personal ones → `open` with a model answer and `help`.
- Build one lesson at a time and show it. Leave out reading aloud in class, photos, drawing, videos; list them. Words missing or unreadable: never guess; ask.
- Check with `node .claude/scripts/ukr-lesson-check.js <lesson-N.js>` and play it with `.claude/scripts/ukr-lesson-shot.sh` (every group to ✓, a phone width).
- Then: card in `lessons.js`; files and pictures in `also` of the subject's entry in `games.js`, plus `countLabel` / `topics`; `VERSION` bump in `sw.js` last.

## Speed reading (Optima, Grade 3: Швидкочитання)

Folder `optima/grade-3/speed-reading/`, engine `shared/speed-reading.js` + `.css` (don't copy it; a game or text is data in `daily.js`, `book.js`, `catch.js` or `text-*.js`). Format in README: "Speed reading".
Sources: `~/Documents/2026-2027/Lucas/Optima/` (`speed-reading.txt` = the 30-day programme → Щодня; `швидкочитання.pdf` = «Школа швидкочитання» → Книжка and Тексти). Log: `SOURCES.md` in the folder.

- No days or weeks: the programme's material is grouped by skill into small games. The hub has three sections (Щодня · Книжка · Тексти).
- The booklet stays exactly as printed: words run together, missing letters (■), letters cut off (`cut`), even a likely misprint. Never "fix" them; ask only when an answer can't be worked out.
- Answers the book does not give are worked out (letter colours and sizes measured on the scan) and listed for the user before building; the made-up ones are noted in `SOURCES.md`.
- Check with real taps in headless Chrome: every game to its end screen, at a phone width and a landscape tablet. Then `also` / `countLabel` in `games.js`; `VERSION` bump in `sw.js` last.

## Ukrainian math (Optima, Grade 3)

Folder `optima/grade-3/math/`, engine `shared/math-uk.js` + `.css` (don't copy them; a lesson is only a data file). Format in README: "Ukrainian math (Optima, Grade 3)".
Procedure, check script and screenshots: the `optima-math` skill. Book: `~/Documents/2026-2027/Lucas/Optima/ПІДРУЧНИК_Козак М. Математика. Частина 1. … 2020.pdf` (read the pages as pictures, the text layer is noisy).

- A lesson = one green title in the book (the star line to the next one). Build one lesson at a time and show it before the next.
- Every book exercise goes in, in a group of its type; what has nothing to check (Пофантазуй, drawing, stick puzzles) is left out and listed.
- Word problems: `help`, a bar `schema`, `steps` with units, `answer` with the answer number once. Table lessons get `drill` (the two table games).
- The book's wording and signs (`·` for ×). Every answer worked out and passed by `check.js`; unit conversions checked by hand.
- Then: card in `lessons.js`; files and pictures in `also` of the Математика entry in `games.js`, plus `countLabel` / `topics`; `VERSION` bump in `sw.js` last.

## Speech games (Мовлення)

Folder `speech/<lang>/<group>/`, engine `shared/speech.js` (don't copy it; a game is only a data file). Format in README: "Speech games (Мовлення)".

- Arabic voice: Google's online voice first, the device voice only offline (`Kit.voice(lang, {online: true})`, set by the engine for `lang: "ar"`).
  The Arabic voice installed on the parent's tablet does not speak, so never prefer it.
- Every Arabic page (speech games, lessons, revisions) has `<meta name="referrer" content="no-referrer" />` in `<head>`: Google refuses the online voice with a referrer.
- Arabic text is classical Arabic with full tashkeel (the online voice does not read Egyptian dialect correctly).

## Checking changes

- Local server: `python3 -m http.server 8765 --bind 127.0.0.1` from the repo root; open the hubs:
  `index.html`, `grade-4/term-1/{french,english}/index.html`, `grade-{3,4}/computer/index.html`, `grade-3/term-1/english/index.html`.
- The service worker caches aggressively. For old-vs-new comparisons, use a fresh port or unregister the SW first.
- For a refactor of generated markup, compare old and new HTML output in node (the two versions should produce the same string).
- JS syntax check: `node --check <file>`.

## Workflow

- Changes come in small stages (≤5 changes each). Show the diff and wait for approval before applying.
- One commit per concern: fix / refactor / formatting / sw.js version bump.
- Commit messages: no Co-Authored-By line. Don't push unless asked.
