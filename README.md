# Study Games

Picture quiz games for school tests. Home page: **Grade → Term → Mid-term exam → subject cards**, and **Grade → Term → Subjects** (English, Arabic), where each subject card opens a list page (English → dictations, Arabic → lessons).
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
    mid-term-1/
      science-motion.html
      social-studies-weather-climate.html
      french-la-presentation.html
grade-4/
  term-1/
    mid-term-1/
      science-energy.html
      social-studies-land-regions-climate.html
      french-la-rencontre.html
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
| `shared/lesson.css` | lesson pages with tabs, picture cards, games (subject colour = `--accent`) | French and Computer lessons |
| `shared/common.js` | `Kit.esc`, `Kit.shuf`, `Kit.pick`, `Kit.star` | quiz games |

Rules for new pages:
- Copy an existing page of the same kind and keep its `<link>`s. Never add a `<style>` block or new colour values.
- A rule needed by more than one page goes into the matching `shared/` file, not into the page.
- A new file in `shared/` must also be added to `CORE` in `sw.js` (then bump `VERSION`), or it won't work offline.

## Adding a new game

1. Save the game HTML into the right folder, e.g. `grade-4/term-1/final-term-1/science-light.html`.
   Start from a page of the same type (see "Styling") so it loads the right shared files.
2. Add one entry to `games.js` (copy an existing line and change grade, term, period, subject, title, path).
3. Commit and push. The home page picks it up automatically.

Games link back to `../../../index.html`, so keep them exactly three folders deep.

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
`grade-N/term-1/english/index.html`. That page lists the dictations from `english/dictations.js`
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

Folder: `grade-4/term-1/computer/`. One card on the home page ("Computer", under Subjects, colour `--comp`) opens `index.html`, which lists the lessons from `lessons.js`.
Made to be understood from pictures and sound: short sentences, key words in colour (`[word]` in the text), 🔊 / 🐢 on everything,
wrong answers can be tried again. The computer steps are practised on **Mini Windows**, a pretend Windows 11 screen.

Shared files (no need to touch them for a new lesson):
- `computer-lesson.js` — the engine (`<body data-view="list|lesson">`), loads after `winsim.js`
- `winsim.js` / `winsim.css` — Mini Windows: desktop, taskbar, Search, File Explorer, right-click menus (also the old "Show more options" menu and Send to), Recycle Bin.
  Tablet: hold a finger = right-click, tap twice = double-click, drag works with a finger.
- `computer-lesson.css` — computer-only styles; the lesson look comes from `shared/lesson.css`

Each lesson: `lesson-N.html` (copy `lesson-1.html`, change `lesson-1.js` to `lesson-N.js`), `lesson-N.js` (all the content), `img/lesson-N/` (pictures cropped from the book),
`video/` (the school videos, made smaller: `ffmpeg -i in.mp4 -vf scale=-2:720 -c:v libx264 -crf 28 -c:a aac -b:a 64k -ac 1 -movflags +faststart out.mp4`).

A lesson page has three tabs:
- **Learn** – the big question, **Big ideas** (`ideas`: picture cards with 1–3 short lines), and one **How to …** per book box (`howto`):
  Mini Windows with ▶ Show me (a pretend mouse does it) and ✋ Your turn (the right place glows after a wrong click), the school video, the book picture
- **Play** – Mini Windows free play + missions, and the `games`
- **Exercises** – the book's Hands on!, class work and homework (`exercises`)

Mini Windows steps: `{act: "click" | "dbl" | "right" | "drag" | "type" | "hover" | "look", t: "<target>", say: "Click [Search]."}`
(`type` needs `text`, `drag` needs `to: "desktop"` or `"exp-main"`). Targets: `task-search`, `task-explorer`, `search-input`, `result:<name>`,
`exp-search`, `sres:<name>`, `file:<name>`, `desk:<name>`, `nav:Documents`, `menu:more`, `menu:sendto`, `menu:create-shortcut`, `send:desktop-shortcut`,
`mi:delete`, `searchopt`, `sopt:date`, `filt:date:Today`, `tip-size`. A start screen: `start: {explorer: "Documents/Lessons/Reading", shortcuts: [{of, in}], files: [{name, in}], pre: [steps done before]}`.

Item types for games and exercises: `mc` (first option is right; `oi` file-type icons, `oh` drawings), `tf` (`a: true|false`, `yes: ["Yes","No"]`), `match` (`pairs: [{icon, label}]`),
`order` (`howto: "<k>"` – put the steps in order), `parts` (tap the name / dot / extension), `open` (model answer, the child marks it), `sim` (do it in Mini Windows).
Pictures: `img: "name"` (a file in `img/lesson-N/`) or `vis: {kind: "icons" | "nameext" | "sizes" | "lines" | "compare" | "wild" | "flow" | "filerow" | "emoji", …}`.

**Videos are online only**: `sw.js` never saves anything in a `video/` folder, and offline the lesson shows "You need the internet to watch the video".
Don't add videos to `also` in `games.js`.

After adding a lesson: add it to `lessons.js`, add its files (not the videos) to the `also: [...]` list of the Computer entry in `games.js`, and bump `VERSION` in `sw.js`.
