---
name: french-lesson
description: Build or update French lessons and revisions (Grade 4 Alex, grade-4/term-1/french/lesson-N.js; Grade 3 Lucas, grade-3/term-1/french/: book lessons unite-N.js from « Léo et Théo Plus 1 » and the teacher's lessons) for the school-tests study games from the Léo et Théo book scans (~/Documents/2026-2027/Lucas/French/book/), the teacher's lesson slides (« Leçon 3 Quel âge tu as »), the scanned Français plus 1 book and cahier pages, and the school sheets (Travail de classe, Devoir noté, Exercices d'application, Modèle de réponse) in ~/Documents/2026-2027/Alex/French/ or ~/Documents/2026-2027/Lucas/French/. Use this whenever the user sends or mentions French slides, book or cahier pages, a French sheet or homework, a French lesson, unit or revision ("Leçon 3", "Unité 2", "Léo et Théo", "le verbe avoir", "les nombres"), asks to add, update or check French lessons, change the French engine, or asks which French pages are already built, even if they don't say "lesson".
---

# French lessons and revisions (Grade 3 and 4)

The subject rules are in "Rules" below (moved from `CLAUDE.md`); the shared ones in `CLAUDE.md` ("Workflow", "Formatting", "Offline cache") and the data format in `README.md` ("French lessons (Grade 3 and 4)"). Read both first. This skill is the working procedure on top of them, the scripts, and what was learned building Grade 4 Lessons 1–3.

The boys learn from pictures and sound (Alex has aphasia): a picture on every item, every French word can be heard, translations EN / UA / AR. The user (the parent) reads the code and reviews every stage: build, check, show, and wait for approval before committing.

`S=.claude/skills/french-lesson/scripts` below; run everything from the repo root.

## Rules

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

- **Lesson** `lesson-N.js` + `lesson-N.html` (`new.js --like lesson-2.html`, see "4. Write the files"), pictures in `img/lesson-N/` (`pdftoppm -r 200`, find boxes on a grid, crop with PIL; people ~250–500px, panels ~700px, comic cover ~1000px; check a contact sheet for cut text or bits of the next panel).
  Learn: story (every panel, then "Des phrases pour parler" with `title`), words (`people` with `say`, `phrases` = the page's Vocabulaire), one `sound` tile per Phonétique sound, a `rule` card for a grammar box. The `verb` view takes any verb whose forms are `p` + `stem` + `end` (s'appeler, avoir); a new kind of view needs an engine change first. Procedure and check scripts: this skill.
  Play: listen, match, bword, bsent, ilelle (if people have il / elle), and `game` tiles for the lesson's own point (Un ou une ?).
  Exercices: every book "Parle" / cahier exercise / sheet task, one section each, `from` = where it is ("Cahier p. 7 ex. 5"); a sheet task the lesson already has is not built twice.
  Dictée: a "(by spelling)" sheet or list = one entry in `dictee` (its words and its sentences, a picture on each); the engine makes the build-from-letters and hear-and-type games.
- **Revision** `revision-N.js` + `revision-N.html` (`new.js --like revision-1.html`; the page loads every lesson it uses before its own file: fix that list): Exercices only, the term sheet's tasks in its order,
  then the lessons' main exercises through `ref: "N:k"`; pictures from the lessons (`img: "lesson-2/parle-9"`), never new copies. Kinds, card and checks: the `revision` skill.
- Item types: put in order → `order` (`q` for "Réponds" / "Regarde et écris"); write a word with a sound → `letters`; choose / entoure / oui-non question → `mc` (right one first, `full` for the whole answer);
  complete a verb, a capital letter, . ? ! → `fill`; "Mets un (x) si c'est une phrase" → `yn` with `ask`, `x`, `fix`; listen and point → `tap`; relie → `match`.

Rules for every French file:

- French exactly as the book prints it (’ apostrophes, a space before ? and !); only the teacher's slide typos are fixed, and listed for the user.
- Every French text has an EN / UA / AR translation through `dict` or `auto`; names need none.
- Check with a script before calling it done: every sentence translates, every item has a picture, every `img` exists, every picture file is used and listed in `also`.
- Then: entry in `lessons.js` (lesson) or a "Final exam" / "Mid-term exam" card in `games.js` (revision); new files and pictures in `also` of the French entry, plus its `countLabel` / `topics`; `VERSION` bump in `sw.js` last.
- Grade 3: `grade-3/term-1/french/` (Lessons 1–4 and `revision-1`, the same format); pages load the engine from `../../../grade-4/term-1/french/french-lesson.js`.
  Grade 3 has no book slides after « La présentation »: a lesson is a topic sheet (Les salutations, Les consignes de la classe) or a topic of the sheets (Les lettres et les mots).
- Grade 3 French page has two groups in the side bar (`groups` in `lessons.js`): **Léo et Théo Plus 1** = the book (`~/Documents/2026-2027/Lucas/French/book/`), one lesson `unite-N` per Unité,
  book exercises only; **Teacher's lessons** = `lesson-N` from the teacher's slides and sheets. Never mix the two. Plan and page map: `grade-3/term-1/french/SOURCES.md`; procedure: this skill, section 7.
- A change to the engine must leave the existing lessons as they were: render every screen of the old and new version with the same `Math.random` seed and compare (headless Chrome: `google-chrome --headless=new --dump-dom` on a harness page that clicks through an iframe), then play every game and exercise to the score screen.
- Check in the browser: the list, each tab, the sound and rule screens, translations on, one exercise of each type.

## 1. Find what is new

- `grade-4/term-1/french/lessons.js` (and Grade 3's) lists the built lessons. The first line of each `lesson-N.js` says its book and cahier pages; each exercise's `from:` says its source (`Cahier p. 7 ex. 5`, `Devoir noté 2`).
- List the source folder by date (`ls -la --time-style=+%F`): new files are usually dated today (`20261117-…`). Older ones are in `Term N/`.
- A scan sent "for lesson N" often holds more: the unit's end pages (a big picture + Banque de mots, Je récite, Je chante, Je fais et je parle) and cahier pages for several lessons (Test 1 « Leçons 1, 2 et 3 », Activités). Those are revision material: ask the user what goes where before building (AskUserQuestion), and say which pages you left out.

## 2. Read the sources

- Teacher slides (LibreOffice PDF, 1440 pt wide): `pdftoppm -r 70 -png` gives 1400-px slides, readable one by one. `pdftotext -layout` gets their typed text (the answers the teacher typed under the book pictures).
  Typed answers from right-to-left Word can come out with the dot first (`.Il s’appelle Mounir`): it is the end mark.
- Book / cahier scans: `pdftoppm -r 110` for reading (paste 4 pages side by side at 55 % for an overview), `-r 200` to read small text, `-r 400` + a PIL crop to count things in a drawing (candles on a cake, dogs on a lead).
- Each slide or page says its page: "Livre de l’élève", "page treize", the cahier's "8 | page huit".
- Handwriting on the scans is the child's own answers, not a key. The key is the teacher's filled-in slide or a "Modèle de réponse".
- Teacher slide typos are fixed and listed (e.g. « Il a un ans » → « Il a un an. »).
- Listening tasks (« Mets un (x) si tu entends… ») have no transcript: leave them out and list them. Personal or open speaking (« Et toi… ? », speech bubbles with « … ») has nothing to check: leave out and list, unless a picture gives one clear answer (then build it as unverified).
- Never guess a missing word (a name the page does not give, a cut-off line): build what is certain, list the rest and ask.

## 3. Pictures

Write a crop spec (boxes as fractions of the page, so any DPI works) and run:

```bash
python3 -I $S/crop.py <scratch>/spec.json grade-4/term-1/french/img/lesson-N <scratch>/contact.png   # then Read contact.png
```

Render the pages for cropping at 200 dpi (slides at 100–150 dpi). Sizes: people ~250–500 px, story panels ~700, the comic cover ~1000. Look at the contact sheet for cut text or bits of the next panel and fix the boxes. Keep the book's number cards in a person's picture when the exercise asks their age (the number is the clue). Reuse a picture from an earlier lesson as `img: "lesson-2/bongo"` instead of a new copy; small things with no picture can be `emoji` (1–2).

## 4. Write the files

Start from the scaffold (CLAUDE.md "Workflow"): `node .claude/scripts/scaffold/new.js grade-4/term-1/french/lesson-N.html --like grade-4/term-1/french/lesson-2.html --title "…"`
(the page, and a frame with the header comment marked TODO, `auto` and the last `FR_DATA` line), then `node .claude/scripts/scaffold/format.js grade-4/term-1/french/lesson-N.html` (every item kind, its fields and a real example).
Add what `lesson-2.js` has around the object (`NAMES`, `DICT`, a sentence-pattern `one()` for `auto`); open it only for what the sheet doesn't show.

- **Translations**: `DICT` for the fixed sentences; `auto` builds the patterns (« Il a neuf ans. », « Il s’appelle X. », « C’est un… »). Keep the patterns small and readable; anything odd goes in `DICT`. Names need none.
- **Exercise items are shuffled** unless `keep: true`; mc options are shuffled (the right one first). Use `full` on mc when the spoken answer is the whole sentence.
- **fill**: one right piece per blank. When the sheet allows two (« ___ a sept ans. » → Il or Elle), give each sentence its own item with a picture that decides it, and say so. The spaces belong to the text parts: `[["J’","Tu","Il","Elle"], "ai un copain."]` vs `[[…], " as une copine."]` — the right piece makes the right spelling.
- **order** cuts j’ and m’ / t’ / s’ before « appel… » into their own cards; give `cards` when the sheet cuts differently.
- **Reading texts** (« Lis. Entoure ce qui est vrai. »): an exercise with `text: {img|emoji, lines}`; its items get the text in a 📄 fold.
- **verb**: `verb: {t, en, img, games: [{t, x}], rows: [{p, el, stem, end, name, img|emoji}]}`. s’appeler needs none of `t / stem / games` (Lessons 1); another verb (avoir) gives them, e.g. `{p: "J’", stem: "", end: "ai", name: "huit ans"}`, `{p: "Nous", stem: "av", end: "ons", …}`. Rows without `en` show the translation of the whole sentence, so the sentence must translate. Its learn tile: `{k: "verb", img}` (the title comes from `verb.t`).
- **sound**: `s` is matched as text in the words (« ain » in Alain, copain, main); `not` = words without it for the « Tu entends ? » game.
- A lesson card in `lessons.js` (`n, title, en, path, cover, note`); a revision card under "Final exam" / "Mid-term exam" in `games.js`.

An engine change (a new view or field) is its own stage and commit: old lessons must render the same. Check it with `compare.sh` (below), and add the new field to the README format (and to "Rules" above if it changes a rule there).

## 5. Check

```bash
node $S/check.js grade-4/term-1/french/lesson-N.html     # pictures, files, translations, also-list, fill/mc sanity
$S/play.sh grade-4/term-1/french/lesson-N.html           # every tab, tile, card and game to its score screen
$S/shot.sh grade-4/term-1/french/lesson-N.html <scratch>/x.png learn:3 en      # one screen; then Read the png
$S/shot.sh … <scratch>/p.png ex:0::2 off 390             # an exercise after 2 items, phone width
$S/compare.sh <pages…>                                   # engine change only: those pages, HEAD vs working tree
npx --no-install prettier --write <changed files>; node --check <each .js>
```

- `check.js` must print OK. `play.sh` must print a number of steps / cards for every tile, no `STUCK`, and `no JS errors`. The harness answers by the first option and the 💡 hint, so the score is not meaningful; reaching the score screen is.
- `compare.sh` seeds `Math.random` and dumps every screen of the pages with translations off and EN, from `git HEAD` and from the working tree: every line must say `same`. A dump takes 3–6 minutes on this machine (a full run over all 8 pages takes hours), so give it the pages that use the changed view (`grep -n 'k: "verb"' grade-*/term-1/french/*.js`), run it in the background, and run no other Chromium job meanwhile. Commit the engine change only after it says `same`. The page you are adding is new, so it is not compared.
- Each run copies the harness as `_harness-<pid>.html` into the page's folder and deletes it at the end. If a run is killed, delete the leftover. Stop a run by its PIDs (`ps aux | grep compare.sh`), not `pkill -f <pattern>`: that pattern is in your own command line and kills your shell too.
- Look at screenshots of: the lesson home, the story, the verb / sound / rule screens with EN on, one exercise of each type, and a phone width. Headless Chromium has no voices: the sound is not tested; say so.

## 6. Register and report

- `lessons.js` card; in `games.js` the French entry's `also` (the `.html`, `.js`, every picture), `countLabel` ("N lessons") and `topics`; `VERSION` bump in `sw.js` last, in the lesson's commit.
- Report: what was built (by book / cahier / sheet page), what was left out and why (listening, open speaking, pages for later), unverified answers, typos fixed, words or names to ask about. Then wait for approval.
- Commits when approved: engine change · formatting-only (if any) · lesson with the `sw.js` bump. No Co-Authored-By line (CLAUDE.md).

## 7. Grade 3: book lessons (« Léo et Théo Plus 1 »)

Grade 3 has two groups on its French page (`groups` in `grade-3/term-1/french/lessons.js`, side bar by `Kit.sideNav`):
**Léo et Théo Plus 1** (`BOOK`, one lesson per Unité, book exercises only) and **Teacher's lessons** (`TEACHER`, the teacher's slides and sheets).
Never mix them: a sheet task goes into a teacher's lesson, a book task into a book lesson, even when the topic is the same.

- The plan, the file → page map and what is built: `grade-3/term-1/french/SOURCES.md`. Read it first and update its rows in the same commit as the lesson.
- Scan: `~/Documents/2026-2027/Lucas/French/book/outN.png`, a two-page spread per file; the file number is **not** the page number (use the map).
  Crop straight from the PNG with PIL (no `pdftoppm`); the spread is 1399×891, so a panel is about 300–650px wide: keep it at its size, don't upscale past ~700px.
- Files `unite-N.js` / `.html` from `new.js grade-3/term-1/french/unite-N.html --like grade-3/term-1/french/unite-3.html --title "…"` (it sets `key`, `imgDir`, the register id), pictures `img/unite-N/`; `from: "Livre p. N ex. M"` with the printed page number.
- Before the first book lesson: the engine change from SOURCES.md (`L.key` / `L.imgDir`), in its own stage, with the old-vs-new compare.
- Video: an mp4 per lesson with a start time, sent by the user; online only (not precached), like `videoHTML` in `shared/computer-lesson.js`.
