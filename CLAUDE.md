# CLAUDE.md

Study games for Grade 3–4 tablets: plain HTML/CSS/JS, no build step, served from GitHub Pages, works offline as a PWA.
Read README.md first. It has the structure, the lesson/dictation formats and the "after adding X" steps.

## Styling and shared code
- `shared/` is the one place for styles and helpers; pages have no `<style>` blocks. The goal is that new pages can't drift from the standard look.
- A rule used by more than one page goes into the shared file every one of those pages loads. `shared/theme.css` is loaded first by every page, including all hubs.
  Example: `.play-arrow` (keeps "Play →" / "Open →" on one line) lives only in theme.css, not copied into index.css / lesson.css / english-hub.css.
- Before adding CSS, check which stylesheets the target pages actually load (`grep -n "<link" .../index.html`). The English hubs load theme.css + english-hub.css only, not lesson.css.
- Markup shared by several engines goes into `Kit` in `shared/common.js` (e.g. `Kit.lessonCard(it, label)` for French and Computer hub cards). A page that uses Kit must load `shared/common.js` before its own scripts.
- Tiles dragged or tapped from a bank onto a line (build a word, put words in order) always use `Kit.dragTiles`; never copy drag code into a page. The page keeps only its own check and feedback.

## Formatting
- All JS and the shared CSS are Prettier-formatted (Prettier 3.3.3, installed globally, defaults, no config). Keep it that way. The user reads the code.
- Check: `prettier --check "**/*.js" shared/ index.css english-hub.css`. Fix: `prettier --write <files>`.
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
- **Test** `test-N.js` + `test-N.html` (copy test-2.html): one tab per group, the sheet's paragraph with a picture above the tasks, items without pictures. See "Arabic tests" below.
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
- A test is one التَّقْيِيمُ الْأُسْبُوعِيُّ sheet (الْفَتْرَةُ الرَّابِعَةُ, after the lesson's homework pages). Numbered in the order the sheets come: `test-1`, `test-2`, … Before building, check `TESTS` and the `unit` page numbers: the same sheet may be built already.
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
