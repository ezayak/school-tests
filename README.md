# Study Games

Picture quiz games for school tests, grouped by **grade → term → period → subject**.
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
