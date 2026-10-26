# Study Games

Picture quiz games for school tests. Home page, per grade: **Subjects** first (one card per subject, opening a list page with the lessons or dictations of every term),
then **Revisions**: term buttons (one term at a time, the latest by default) and two folding sections, **Mid-term** and **Final**, with the subject cards.
The chosen term and each section's open / closed state are remembered on the device. Every card has the same height: the lesson line is cut after 2 lines and the topics after 4.
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
```

Folder names: `grade-N`, `term-N`, and the period as `mid-term-1`, `final-term-1`, `mid-term-2`, `final-term-2`, …

## Styling

One look for every page. Colours, fonts, buttons, cards and subject colours (`--sci`, `--en`, `--fr`, …)
live in `shared/theme.css`; change them there and every page follows.

| File | What | Who loads it |
|---|---|---|
| `shared/theme.css` | colours (light/dark), fonts, page, cards, buttons, menu tiles | every page, first |
| `shared/quiz.css` | quiz parts: score bar, picture, answers, matching, results, SVG drawing colours | quiz games, Arabic lessons |
| `shared/arabic.css` | Arabic text, Arabic answers, folder tabs | Arabic lessons and Arabic revision quizzes |
| `shared/arabic-revision.css` | verses, word tools, English toggle | religion / Arabic social-studies revisions |
| `shared/spelling.css` | flash cards, letter tiles, typing | English dictations |
| `shared/drag-words.css` | drag tiles from a bank onto a line | "Mets en ordre", "Build the word" |
| `shared/lesson.css` | lesson pages with tabs, picture cards, games (subject colour = `--accent`) | French and Computer lessons, English stories |
| `shared/story.css` | English stories: page text, the sentence being read, easy sentence, word meanings | English stories |
| `shared/common.js` | `Kit.esc`, `Kit.shuf`, `Kit.pick`, `Kit.star`, `Kit.lessonCard` (lesson-hub cards), `Kit.scene` / `Kit.idiom` / `Kit.blocks` (animated pictures, sentence blocks) | quiz games, French and Computer lesson lists, English stories and lessons |

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
the English dictations link it just before `<main>`. Portrait tablets and phones are unchanged.
The French and Computer lessons have the same layout built into `shared/lesson.css`.

## Game types

- Multiple choice with a picture for each question
- Matching rounds (tap a word, then its meaning)
- “Mets en ordre” drag-the-words sentence building (French games)
- Score, stars and a review of missed questions at the end; questions shuffle every play

## Install as an app (tablet / phone)

The site is a Progressive Web App: it can be installed and works **offline** after the first visit.

- **Android tablet (Chrome):** open the site → tap **Install app** on the home page (or ⋮ menu → *Install app* / *Add to Home screen*).
- **iPad (Safari):** open the site → **Share** → **Add to Home Screen**.
- **Windows / Mac (Chrome or Edge):** install icon in the address bar.

Offline: `sw.js` downloads every game listed in `games.js` when the app is installed or opened online, so new games appear after the next online visit.
If an update doesn't show up, change `VERSION` in `sw.js` and push again.

## English dictations

Each grade has one **English** card on the home page (period `"Subjects"`, `hub: true`), which opens
`grade-N/term-1/english/index.html`. That page lists the lessons, dictations and stories from `english/dictations.js`
(shared look: `english-hub.css` / `english-hub.js` in the root).

New dictation: copy a dictation file in `grade-N/term-1/english/`, edit its `LIST`, add one line to
`english/dictations.js`, add the file to the English entry's `also: [...]` in `games.js`, update its
`countLabel`/`topics`, and bump `VERSION` in `sw.js`.

`grade-3/term-1/english/english-long-o.html` is a reusable spelling game with four modes:

- **Learn** – flash cards: picture + word, or picture only (tap to reveal), with 🔊 / 🐢 slow audio
- **Match** – match pictures to words (words only)
- **Listen & spell** – the device reads the word or sentence aloud (slow by default); type it
- **Build the word** – drag or tap scrambled letters into order (words only)

Optional translations (Українська / العربية) show under the pictures.
Audio uses the device's built-in voices (Web Speech API), so it works offline on most tablets.

### New spelling list

1. Copy the file, e.g. to `grade-3/term-1/english/english-long-a.html`.
2. Edit only the `LIST` block near the top: title, pattern, and `items`.
   Each item: `w` (word or sentence), `type: "sentence"` for sentences, a picture, and optional `tr` translations.
3. Pictures: use a built-in drawing name (`pic`), an `emoji: "🐸"`, or your own image file
   (`img: "images/toad.png"`, e.g. AI-generated). Put image files in an `images/` folder next to the game.
4. Add it to `english/dictations.js` and to the English entry's `also` list in `games.js` (see above).

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
  gloss: {desperately: "very, very much", …}, // tap-a-word meanings (lowercase word); these words are shown in colour
  pages: [{ch: "Chapter 1 · …", img | emoji | vis, text: ["paragraph", …, {box: "Side box title", p: "…"}], easy: "one easy sentence"}, …],
                                             // text exactly as in the book; *word* = italic
  summary: [{t: "Characters", img | emoji | vis, text}, …],      // vis: an animated emoji picture (see English lessons)
  questions: [{tag: "Stop and check", img | emoji | vis, q, o: [right, wrong, wrong], x: "why (optional)"},   // first option is right; shuffled on screen
              {type: "open", tag, img | emoji, q, a: "model answer"}, …],
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
  `{type: "sort", q, cols: [{k, t, ex, e}], words: [{w, k, e}]}` (tap a word, then its box; `k` can be a list), `mc` with `keep: [...]` (answers always in this order),
  `order` with a picture (build a sentence from cards)

New week: copy a week's `.html` (change the `.js`), write its `.js`, add it to `english/dictations.js` (`kind: "Lesson"`),
add its files and pictures to the English entry's `also` in `games.js`, and bump `VERSION` in `sw.js`.

## Arabic lessons (Grade 3)

Folder: `grade-3/term-1/arabic/`. One card on the home page ("Arabic Lessons") opens `index.html`, which lists the lessons from `lessons.js`.

Shared files (no need to touch them for a new lesson):
- `arabic-lesson.js` — the engine. The page's `<body data-view="list|lesson|exercises">` picks the view.
- `arabic-lesson.css` — engine-only styles; the base comes from `shared/`.

Each lesson has four files:
- `lesson-N.js` — all the content (`window.LESSON = {...}`)
- `lesson-N.html` — story, words, opposites & plurals (copy `lesson-1.html`, change `lesson-1.js` to `lesson-N.js`)
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
  words: [{ar, en, uk, ic: "🌼"}, …,        // vocabulary cards + games
          {ar, en, uk, ic, set: "opp"}, {ar, en, uk, ic, set: "plural"}],  // words from the opposites / plurals games (filter buttons)
  opposites: [[ar, ar2, "en a ↔ b", "uk a ↔ b"], …],
  plurals:   [[singular, plural, "en", "uk"], …],
  meanings:  [[word, meaning, "en = …", "uk = …"], …],
  exercises: [{k, t: "Arabic section title", en, uk, ic: "📝", items: [ … ]}, …]   // one menu tile per section; add cards: true for Q&A flash cards
                                             // a section can have rule: {img, ar, en, uk} (shown as "The rule"), or rule: "<k of another section>"
};
```

Exercise item types (every item can have `en`/`uk` help text, `img`, `tag`, and `read: [textIndex, partIndex]` to show that paragraph; a plain number means a part of the first text):
- `{type:"tf", q, a: true|false, x: "explanation"}`
- `{type:"mc", q: "… ___ …", o: [correct, wrong, wrong]}` — the first option is the right one; they are shuffled on screen
- `{type:"open", q, a: "model answer"}` — the child answers, sees the model answer and marks themselves
- `{type:"match", q, pairs: [[left, right, "en"], …]}`

After adding a lesson: add it to `lessons.js`, add its files to the `also: [...]` list of the "Arabic Lessons" entry in `games.js` (so it works offline), and bump `VERSION` in `sw.js`.

## French lessons (Grade 4)

Folder: `grade-4/term-1/french/`. One card on the home page ("Français", under Subjects) opens `index.html`, which lists the lessons from `lessons.js`.
Made to be understood from pictures and sound: big pictures from the book, every French word can be tapped to hear it (device voice, French),
🔊 / 🐢 slow / 👆 word-by-word reading, wrong answers can be tried again, 💡 help in the building games. Optional translation EN / UA / AR.

Shared files (no need to touch them for a new lesson):
- `french-lesson.js` — the engine (`<body data-view="list|lesson">`)
- `shared/lesson.css` — the lesson look (shared with the Computer lessons); the base comes from `shared/theme.css`

Each lesson: `lesson-N.html` (copy `lesson-1.html`, change `lesson-1.js` to `lesson-N.js`), `lesson-N.js` (all the content), `img/lesson-N/` (pictures cropped from the book).

A lesson page has three tabs, like the Arabic lessons (the last tab used is remembered):
- **Apprends** – the story (picture by picture), the words (flash cards), a sound (« ou »), the verb
- **Joue** – Écoute et touche (hear a sentence, tap the picture), Relie (pictures ↔ names), Construis le mot (letters), Construis la phrase (word cards or letters), Il ou Elle ?
- **Exercices** – the school sheets: `exercises: [{k, t, en, img, from, items}]`

Exercise item types (each can have `img: "name"` or `emoji: "👧"`):
- `{type:"order", fr, q?}` – Mets en ordre (m’ / t’ / s’ become their own cards, like at school)
- `{type:"letters", fr}` – build a word, or a sentence word by word
- `{type:"fill", parts:["Je ", ["m’","t’","s’"], "appell", ["e","es"], " Bouli."], ans:["m’","e"]}`
- `{type:"mc", q, opts:[right, wrong, …], icons?}` – the first option is the right one
- `{type:"tap", say, opts:[img, img, img]}` – the first picture is the right one
- `{type:"match", pairs:[{img, fr}, …]}`
- `{type:"yn", fr, a:true|false}`

After adding a lesson: add it to `lessons.js`, add its files to the `also: [...]` list of the French entry in `games.js`, and bump `VERSION` in `sw.js`.

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

After adding a lesson: add it to its topic in `lessons.js` (a new topic: a new `topic-N/` folder and a new entry in `chapters`),
add its files (not the videos) to the `also: [...]` list of the Science entry in `games.js`, and bump `VERSION` in `sw.js`.

## Social Studies lessons (Grade 4)

Folder: `grade-4/social-studies/`. One card on the home page ("Social Studies", under Subjects) opens `index.html`, which lists the lessons from `lessons.js`,
one heading per chapter (`chapters: [{n, dir: "chapter-1", title, items}]`, the same format as the Computer lessons).
There is no textbook: the lessons come from the teacher's slides, the term booklet and the graded homework.
Like Science, the lessons use the **Computer lesson engine** (`shared/computer-lesson.js`, no Mini Windows) with `<body data-subject="Social Studies">`,
which changes the subject name and the colour (`--ss-ink`, a darker red for text on white).

A lesson has the same format as a Science lesson: `words` (the slides' "Important Definitions") for the **Key words** tile, `ideas` (picture cards),
`games` and `exercises` (`from:` names the booklet sheet or the homework). Every question has a picture.
Lessons save their ticks under their own `key` (`ss4-c<chapter>-l<lesson>`).
A picture card can show a row of pictures with `vis: {kind: "strip", items: [{img | e, label}]}`; its tile then uses the first picture.

After adding a lesson: add it to its chapter in `lessons.js`, add its files to the `also: [...]` list of the Social Studies entry in `games.js`,
and bump `VERSION` in `sw.js`.
