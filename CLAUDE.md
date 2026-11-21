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
- `shared/computer-lesson.js` is the lesson engine of English, Computer, Math, Science and Social Studies: a change to it must leave the lessons of all five as they were.
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

Folder `grade-3/term-1/arabic/`, engine `arabic-lesson.js` (also the engine of Religion: a change must leave both as they were). Lessons, tests, homework: the `arabic` skill.

## Religion (Grade 3): lessons

Folder `grade-3/term-1/religion/`, engine `../arabic/arabic-lesson.js` (shared with Arabic). Rules, sources and checks: the `religion-lesson` skill.

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
- «build inbox <id>» (the daily Telegram message): `inbox.py --subject <id>` (with the parent's notes from the sorting page `sorter.py`, http://127.0.0.1:8770: follow them), then `inbox.py prep <id>` and look at its contact sheets and `text.txt` first
  (`~/.cache/school-inbox/…`); render a page at full size only to read small print or crop a picture. Then the subject's skill.
- One lesson per session: the whole conversation is sent again with every request, so a long session costs many times more.
  After a lesson (or a stage of a longer task) is committed, tell the user to start a new session (`/clear`) for the next one.
- Source pages stay out of the conversation where possible: read `prep`'s `text.txt` / `ocr.txt` and contact sheets first,
  open a single page as a picture only to crop it or to check a word, and never re-open a page already looked at.
- The "Then:" steps of every subject: `.claude/scripts/inbox/register.py add <hub path> <new files / picture folders>` (the `also` list), `register.py check <hub path>`,
  `countLabel` / `topics` by hand, and last `register.py bump "<reason>"` in its own commit.
- Changes come in small stages (≤5 changes each). Show the diff and wait for approval before applying.
- One commit per concern: fix / refactor / formatting / sw.js version bump.
- Commit messages: no Co-Authored-By line. Don't push unless asked.
