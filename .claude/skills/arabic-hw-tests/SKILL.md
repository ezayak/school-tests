---
name: arabic-hw-tests
description: Build Grade 3 Arabic weekly tests (التقييم الأسبوعي, groups أ ب ج) and homework pages (الأداءات المنزلية) for the school-tests study games from Lucas's scans (~/Documents/2026-2027/Lucas/Arabic/, e.g. lesson-x/hw-tests.pdf, the «الأداءات والتقييمات» workbook). Use this whenever the user sends or mentions Arabic test sheets, homework pages, التقييم / الأداءات pages, asks to add, update or check Arabic tests or homework, or asks which of them are already built, even if they don't say "test".
---

# Arabic tests and homework (Grade 3)

The rules live in `CLAUDE.md` ("Arabic (Grade 3): lessons, tests, homework" and "Arabic tests", plus "Workflow", "Formatting" and "Offline cache") and the formats in `README.md` ("Arabic tests", "Arabic homework"). Read those first. This skill is the working procedure on top of them, with the scripts and what was learned building Lessons 5–8.

Lucas has aphasia: the parent explains each question by pointing at the picture, and every Arabic word must be tappable with a translation. The user reviews every stage: build one sheet, show it, wait for approval, then the next.

## 1. Find what is new

- List what is built: `TESTS` and `HOMEWORK` in `grade-3/term-1/arabic/lessons.js` (each has its book pages in `unit` / `note`), and the `test-N.js` / `hw-N.js` headers.
- Render the whole scan small and look at every page before planning (contact sheets, 6×2 thumbnails at 40 dpi are enough to see the layout):
  ```bash
  pdftoppm -r 40 -jpeg "<scan>.pdf" <scratchpad>/hw/p    # then make contact sheets with PIL and Read them
  pdftoppm -r 200 -f N -l N -png "<scan>.pdf" <scratchpad>/hw/p   # one page to read the Arabic (a whole page is readable)
  ```
- Each workbook page says at the top what it is: الْفَتْرَةُ (period) and the lesson title, أَوَّلًا: الْأَدَاءَاتُ الصَّفِّيَّةُ (classwork, skip), ثَانِيًا: الْأَدَاءَاتُ الْمَنْزِلِيَّةُ (homework), التَّقْيِيمُ الْأُسْبُوعِيُّ with الْمَجْمُوعَةُ (أ)(ب)(ج) (a test). The week number is in the row of numbers at the top (الْأُسْبُوعُ). The printed page number is at the bottom corner.
- Scans can repeat a page or skip one; the PDF page → book page offset can change in the middle of a scan. Log book pages by the printed number.
- Handwriting and red marks are Lucas's answers and the teacher's marking: ignore them, they are not the key.
- Skip: classwork, reviews (مُرَاجَعَةٌ عَامَّةٌ …) unless asked, a sheet already built (same book pages in `TESTS` / `HOMEWORK`). Say which pages were skipped and why.
- The user decides the order. Old sheets (the earlier weeks) may be wanted first.
- Tests are numbered by workbook page, not by build order (the user's wish). Known so far (hw-tests.pdf, Nov 2026):
  test-1 p. 7–8 «بعد إعلان نتيجة المسابقة» · test-2 p. 12 «جلس والدي بجواري» · test-3 p. 16–17 «في بداية حصة اللغة العربية» ·
  test-4 p. 20–21 «فكرنا جميعًا» · test-5 p. 25–26 the نشيد «الناجح» · test-6 p. 33 (Lesson 2) · test-7 p. 37–38 (Lesson 3); test-8 p. 42–43 (Lesson 4) · test-9 p. 47–48 (Unit 2 review, Lesson 3 text) · test-10 p. 52, test-11 p. 56, test-12 p. 60–61 (Lesson 6) · test-13 p. 65–66 (Lessons 6 and 8). Homework hw-4 … hw-8 = workbook p. 39–64. Not built: the reviews p. 44–46 and p. 67–71.
  A sheet found between two built tests: rename the later tests (`git mv`, `n`, the title in the `.html`, the header comment, `TESTS`, `also`) and tell the user that saved progress follows the number (`ar3-lt<N>-`).

## 2. Read the sheet and keep notes

Keep a notes file in the scratchpad (`<scratchpad>/hw/notes.md`) and write each page into it as soon as it is read: the paragraph with full tashkeel, every task with its options (right one marked) and the answer. The conversation can be summarised during a long build; the notes file survives.

- Tests: the paragraph is printed once per group, often the same text in all groups. Take tashkeel from the lesson text (`lesson-N.js`) when the paragraph is from a lesson.
- Answers the sheet does not give (no key): give the likely one, add a `// unverified` comment above the item, and list it in the report.
- Words missing or unreadable: never guess. List them and ask.
- A sheet that asks about a text it does not print (a poem to complete, «اذكر ما جاء في النشيد»): look for the text in the other files first (`grep -rl` in `grade-3/`; the mid-term revision `mid-term-1/arabic-revision.js` has the early-term texts, the poem «الناجح» among them). Not found anywhere: ask.
- Dictation (السُّؤَالُ الثَّانِي: اكْتُبْ مَا يُمْلَى عَلَيْكَ) and copying lines (اكْتُبْ بِخَطِّ النَّسْخِ) in tests: dictation is left out; a copy line becomes an `open` item with `plain: true` and the sentence as the answer.

## 3. Build

Copy, don't write from scratch:

- **Test**: `test-N.html` = copy of `test-1.html` (change the `.js` and the title). `test-N.js` like `test-1.js`: `n: "tN"`, `tapq: true`, `exSub`, `tabs` = one per group with `story: 0` (or the group's own text index when the groups have different paragraphs), `stories` = the paragraph(s), one part each, `para: "السُّؤَالُ الْأَوَّلُ: اقْرَأِ الْفِقْرَةَ التَّالِيَةَ ثُمَّ أَجِبْ"`, `img` from the lesson's pictures. Sections `k: "a1"`, `"a2"`, … with `tab: "a"`, one per lettered part, `t` as printed.
- **Homework**: `hw-N.html` = copy of `hw-3.html` (it loads `drag-words.css` and `shared/common.js` for `build`). `hw-N.js` like `hw-3.js`: `n: "hN"`, one tab per book page (`{k: "p41", ic, t: "Page 41", short: "p.41", ar: "صَفْحَةُ ٤١"}`), a tab with a text to read gets `story: i`. Every homework item has a picture (`img` from `img/lesson-N/`, or an emoji `ic`, at most 2 emoji).
- A sheet with no paragraph (only tasks): tabs without `story`, an emoji `ic` on every item (test-5).
- Items repeated in several groups: write them once as a `const` and copy them into each section (`items.map((it) => ({ ...it }))`, see test-3.js).
- Item types (CLAUDE.md): one word → `word` with every accepted answer; choices in brackets → `mc` (right one first); رَتِّبْ → `build` (homework); sentences, writing, copying → `open` with a model answer; syllables → `open` with `plain: true` (“اَلْ / عَا / مِ”); a writing task gets a `help` question with `[ar, en, uk]` options.
- `en` / `uk` on every text, section and item: a plain translation of the question, not a transliteration.
- Pictures: reuse `img/lesson-N/` (the lesson the text comes from). New pictures only when the sheet has its own: `pdftoppm -r 400 -f N -l N`, crop with PIL (coordinates from the 200 dpi page × 2), check a contact sheet for cut edges, answer circles and neighbouring panels.

## 4. Gloss

Every Arabic word of the paragraph, questions, options, answers, `x` and help needs a gloss entry (one per spelling without tashkeel is enough; the engine matches exact first, then without tashkeel). Do it in three steps:

```bash
S=<scratchpad>; A=grade-3/term-1/arabic; K=.claude/skills/arabic-hw-tests/scripts
node $K/check.js $A/test-N.js --missing | tail -n +2 | grep -v '^problems' > $S/miss.txt
node $K/gloss-reuse.js $S/miss.txt $S/gl-reused.txt $A/*.js       # copies glosses from every other Arabic file
#   then write the words in $S/miss.txt.left by hand into $S/gl-new.txt as "word|en|uk" lines
node $K/gloss-insert.js $A/test-N.js $S/gl-reused.txt $S/gl-new.txt
npx --no-install prettier --write $A/test-N.js && node $K/check.js $A/test-N.js --missing
```

Several sheets at once: collect the missing words of all of them into one `miss.txt`, but insert into each file only its own words (filter the lists by that file's `--missing` output); `gloss-insert.js` inserts every line it is given.

Read `gl-reused.txt` before inserting it: a gloss copied from another file can carry that file's meaning (مِنْ came over as “who”, كُنْتُ as “you were”, أَسْعَدِ as “made happy”). Fix the lines that do not fit this text.

The check skips single letters, syllables and `___` gaps. A word written with a quote mark inside (`وَ«جُيُوشُ`) needs its own key with the mark. Words that are deliberately misspelt in a “correct the spelling” task get `["(wrong spelling)", "(помилкове написання)"]`.

## 5. Check

```bash
node --check $A/test-N.js && node $K/check.js $A/test-N.js        # 0 words without gloss (except letters/syllables), problems: none
.claude/skills/arabic-hw-tests/scripts/play.sh test-N.html         # every section reaches "score N / M"
npx --no-install prettier --check $A games.js
```

- `play.sh` runs one headless Chromium per section. One run in a few can hang (“timeout”): run that section again before suspecting the page.
- Screenshots of one tab on a tablet (1280×800) and a phone (390 wide) to look at the text and a picture. Type one answer in a `word` item and check it is accepted without tashkeel.

## 6. Register and report

- Entry in `TESTS` / `HOMEWORK` (`lessons.js`): `{n, nAr, title, en, path, cover, note}`; the note says the groups / pages and the number of questions.
- `games.js`, the Arabic entry: the new `.html` / `.js` (and new pictures) in `also`, and its `countLabel` / `topics` (“Tests 1–N”).
- Both in one go: `python3 .claude/skills/arabic-hw-tests/scripts/register.py test N nAr en cover note` (or `hw N nAr title en cover note`) adds the entry in number order, the two files to `also`, and updates `countLabel` / “Tests 1–N”. New pictures: `scripts/add-pictures.py lesson-N hw-a.jpg …`. Then check that the question count in the note matches the file's items.
- Report: what was built (pages, groups, number of items), pages skipped and why, the unverified answers, words that could not be read. Wait for approval, then commit (one commit per sheet), and bump `VERSION` in `sw.js` in a separate last commit after the batch.
- Git has no identity configured on this machine: commit with `git -c user.name=Olena -c user.email=ezayak@gmail.com commit …` (the author of the earlier commits). No Co-Authored-By line.
