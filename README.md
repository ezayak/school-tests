# Study Games

Picture quiz games for school tests. Home page: **Grade → Term → Mid-term exam → subject cards**, and **Grade → Term → Subjects** (English, Arabic), where each subject card opens a list page (English → dictations, Arabic → lessons).
Every game is a single self-contained HTML file (no build step), so the repo works as-is on GitHub Pages.

## Structure

```
index.html            ← home page, lists every game from games.js
games.js              ← catalog: one entry per game
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

## Adding a new game

1. Save the game HTML into the right folder, e.g. `grade-4/term-1/final-term-1/science-light.html`.
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
- `arabic-lesson.css` — styles.

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
