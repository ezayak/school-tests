---
name: religion-lesson
description: Build or update Grade 3 Religion lessons (التربية الدينية المسيحية, grade-3/term-1/religion/uN-lesson-M.js on the Arabic engine) for the school-tests study games from the book PDF and the teacher's slides in ~/Documents/2026-2027/Lucas/Religion/, and the homework page photos the parent sends. Use this whenever the user sends or mentions Religion book pages, a Religion lesson or unit (الوحدة، الدرس), a golden verse (الآية الذهبية), المحفوظات, or Lucas's Religion homework, asks to add, update or check Religion lessons, or asks which Religion pages are already built, even if they don't say "lesson".
---

# Religion lessons (Grade 3)

The subject rules are in "Rules" below (moved from `CLAUDE.md`); the shared ones in `CLAUDE.md` ("Workflow", "Formatting", "Offline cache", "Speech games" for the Arabic voice) and the format in `README.md` ("Religion lessons"). Read those first.
The engine is the Arabic one: the `arabic` skill's scripts (`check.js`, `play.sh`, gloss helpers in `.claude/skills/arabic/scripts/`) can be used here too. Log: `grade-3/term-1/religion/SOURCES.md`.

## Rules

Folder `grade-3/term-1/religion/`, engine `../arabic/arabic-lesson.js` (shared with Arabic, don't copy it). Format in README: "Religion lessons".
Book: التربية الدينية المسيحية, `~/Documents/2026-2027/Lucas/Religion/` (book PDF + the teacher's slides). Lucas has aphasia: a picture on every part and question.

Sorting:

- The lesson = one book lesson (الوحدة N، الدرس M), story pages + الأنشطة والممارسات pages. The slides are a summary: use the book text.
- Homework = the page the parent sends a photo of (his real homework). Check its lesson by the page number and story: a page of another lesson
  belongs to that lesson (build that lesson if it is missing, then put the page there). If unsure which part is homework, ask before building.
- Words missing or unreadable: never guess. List them and ask.

What to build: `uN-lesson-M.js` + `uN-lesson-M.html` (`node .claude/scripts/scaffold/new.js grade-3/term-1/religion/uN-lesson-M.html --like grade-3/term-1/religion/u2-lesson-4.html --title "…"`, then `format.js` on the new page for the item format), pictures in `img/uN-lesson-M/` (`pdftoppm -r 300`, then PIL; story ~700px, small activity pictures ~300px).

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
