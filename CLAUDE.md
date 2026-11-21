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

Engine `grade-4/term-1/french/french-lesson.js`, used by Grade 4 (`grade-4/term-1/french/`) and Grade 3 (`grade-3/term-1/french/`, loaded from `../../../grade-4/term-1/french/french-lesson.js`).
A change to the engine must leave every existing lesson of both grades as it was (the skill has the compare procedure). Rules, sources and procedure: the `french-lesson` skill.

## English (Grade 4): lessons and stories

Folders `grade-4/term-1/english/`, `grade-4/term-2/english/`, …; one English page for all terms: `grade-4/term-1/english/index.html` (list in its `dictations.js`).
Engines: lessons `shared/computer-lesson.js` (`<body data-subject="English">`), stories `shared/story.js`, dictations `shared/spelling.js`.
Rules, sources and procedure: the `english-lesson` skill (its "Rules" also cover dictations); dictation sheets: the `english-dictation` skill.

## Computer (Grade 4): lessons

Folder `grade-4/computer/chapter-N/`, engine `shared/computer-lesson.js` and the pretend programs (Mini Windows, Mini Word, Mini Outlook, Mini Edge).
A program change must leave the older lessons playing. Rules, sources and procedure: the `computer-lesson` skill.

## Math (Grade 4): book lessons

Folder `grade-4/math/unit-N/`, engine `shared/computer-lesson.js` (`<body data-subject="Math">`) + `shared/math.js` / `.css`.
Rules, sources and procedure: the `math-lesson` skill (Volume 2 from the e-book videos: `math-video-book`).

## Science (Grade 4): lessons

Folder `grade-4/science/topic-N/`, engine `shared/computer-lesson.js` (`<body data-subject="Science">`). Rules, sources and procedure: the `science-lesson` skill.

## Social Studies (Grade 4): lessons and stories

Folder `grade-4/social-studies/chapter-N/`, engines `shared/computer-lesson.js` (`<body data-subject="Social Studies">`) and `shared/story.js`.
Rules, sources and procedure: the `social-studies-lesson` skill.

## Ukrainian reading (Optima, Grade 3)

«Складова ракета» texts in `optima/grade-3/ukr-lit/`, engine `shared/reading.js` + `.css`. Rules and checks: the `ukr-reading` skill.

## Ukrainian language and reading (Optima, Grade 3)

Folders `optima/grade-3/ukr-mova/` and `optima/grade-3/ukr-lit/`, one engine `shared/ukr-lesson.js` + `.css`. Rules and procedure: the `optima-ukr-mova` (language) and `optima-ukr-lit` (reading) skills.

## Speed reading (Optima, Grade 3: Швидкочитання)

Folder `optima/grade-3/speed-reading/`, engine `shared/speed-reading.js` + `.css`. Rules and checks: the `speed-reading` skill.

## Ukrainian math (Optima, Grade 3)

Folder `optima/grade-3/math/`, engine `shared/math-uk.js` + `.css`. Rules, procedure and checks: the `optima-math` skill.

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

- New teacher files: start from `python3 .claude/scripts/inbox/inbox.py --subject <id>` (ids in `subjects.json` next to it) instead of comparing folders by hand.
  After building: a row in the subject's `SOURCES.md` and `inbox.py done <files>`, committed with the lesson.
- «build inbox <id>» (the daily Telegram message): `inbox.py --subject <id>`, then `inbox.py prep <id>` and look at its contact sheets and `text.txt` first
  (`~/.cache/school-inbox/…`); render a page at full size only to read small print or crop a picture. Then the subject's skill.
- The "Then:" steps of every subject: `.claude/scripts/inbox/register.py add <hub path> <new files / picture folders>` (the `also` list), `register.py check <hub path>`,
  `countLabel` / `topics` by hand, and last `register.py bump "<reason>"` in its own commit.
- Changes come in small stages (≤5 changes each). Show the diff and wait for approval before applying.
- One commit per concern: fix / refactor / formatting / sw.js version bump.
- Commit messages: no Co-Authored-By line. Don't push unless asked.
