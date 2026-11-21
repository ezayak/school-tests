---
name: speed-reading
description: Build or fix the Optima Grade 3 speed-reading games (Швидкочитання: Щодня · Книжка · Тексти; optima/grade-3/speed-reading/ daily.js, book.js, catch.js, text-*.js for shared/speed-reading.js) from speed-reading.txt and «Школа швидкочитання» in ~/Documents/2026-2027/Lucas/Optima/. Use this whenever the user asks to add, fix or check a speed-reading game, a page of the speed-reading booklet or the 30-day programme for Lucas, even if they don't say "speed reading".
---

# Speed reading (Optima, Grade 3)

The subject rules are in "Rules" below (moved from `CLAUDE.md`); the shared ones in `CLAUDE.md` ("Workflow", "Formatting" and "Offline cache") and the format in `README.md` ("Speed reading"). Read those first; the log is `optima/grade-3/speed-reading/SOURCES.md`.

## Rules

Folder `optima/grade-3/speed-reading/`, engine `shared/speed-reading.js` + `.css` (don't copy it; a game or text is data in `daily.js`, `book.js` or `text-*.js`); «Ловець слів» is `catch.js` on `shared/word-games.js`. Format in README: "Speed reading".
Sources: `~/Documents/2026-2027/Lucas/Optima/` (`speed-reading.txt` = the 30-day programme → Щодня; `швидкочитання.pdf` = «Школа швидкочитання» → Книжка and Тексти). Log: `SOURCES.md` in the folder.

- A new `text-*.js` + `.html`: `node .claude/scripts/scaffold/new.js optima/grade-3/speed-reading/text-<name>.html --like <a text page>.html --title "…"` (check `key`: it follows only the number in the file name),
  then `node .claude/scripts/scaffold/format.js` on the new page. A new game in `daily.js` / `book.js`: `format.js` on a game page that loads it (e.g. `flash.html`); «Ловець слів» (`catch.html`) runs on `shared/word-games.js`.
- No days or weeks: the programme's material is grouped by skill into small games. The hub has three sections (Щодня · Книжка · Тексти).
- The booklet stays exactly as printed: words run together, missing letters (■), letters cut off (`cut`), even a likely misprint. Never "fix" them; ask only when an answer can't be worked out.
- Answers the book does not give are worked out (letter colours and sizes measured on the scan) and listed for the user before building; the made-up ones are noted in `SOURCES.md`.
- Check with real taps in headless Chrome: every game to its end screen, at a phone width and a landscape tablet. Then `also` / `countLabel` in `games.js`; `VERSION` bump in `sw.js` last.
