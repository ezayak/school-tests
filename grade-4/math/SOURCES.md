# Math · Grade 4: sources

Every source used for the Math lessons, page by page: what it was built into, or why it was skipped.
When new files come, compare them with this list and build only what is missing. Then add the file here.

Status: **built** (file · exercise key) · **planned** (not built yet) · **skipped** (why) · **waiting** (see [TODO.md](TODO.md)) · **not checked** (an older source, not compared page by page yet).
Answers without a key are listed in [UNVERIFIED.md](UNVERIFIED.md).

Source folder: `~/Documents/2026-2027/Alex/Math/`. Page numbers are the numbers **printed** on the page.

- Student Edition: `books/Reveal Math Student Edition, Grade 4, Volume 1.pdf` (Units 1–7, scanned pictures, no text layer). Book page = PDF page − 20.
- Practice Book: `books/G-04+Student+Practice+Book_Reveal+Math,+Grade+4.pdf` (Units 2–14, text layer). A 2-page Family Letter opens each unit, so the offset grows:
  find a lesson with `pdftotext … | grep -n "Lesson 2-1"` (Practice p. 1 = PDF p. 11).
- One book lesson = `unit-N/lesson-N-M.js` + `.html`: the Student Edition pages (Be Curious, Learn, Work Together, On My Own, Reflect) and its 2 Practice Book pages (Additional Practice).

## Student Edition, Volume 1

| Book pages | Content                                                                               | Goes to                                                                    | Status                                             |
| ---------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| 1–30       | Unit 1 « Math Is… » (1-1 … 1-6: class norms, mindset; Unit Review, Fluency Practice)  | —                                                                          | skipped (talk about learning, nothing to check)    |
| 31–32      | Unit 2 opener (Poppy), Ignite « Fewest Coins »                                        | —                                                                          | skipped (opener; the cover of `unit-2`)            |
| 33         | 2-1 Be Curious (which doesn't belong?)                                                | `unit-2/lesson-2-1` · `curious` (picture `curious`, also the cover)        | built                                              |
| 34         | 2-1 Learn (Akira's 8,888), Work Together (3,830)                                      | `unit-2/lesson-2-1` · cards 2–5, `learn`, `together` (picture `akira`)     | built                                              |
| 35         | 2-1 On My Own 1–9                                                                     | `unit-2/lesson-2-1` · `own1` (1–2), `own3` (3–6), `own7` (7–8), `own9` (9) | built                                              |
| 36         | 2-1 On My Own 10–12, Reflect                                                          | `unit-2/lesson-2-1` · `own9` (10–12, Reflect)                              | built                                              |
| 37–40      | 2-2 Read and Write Numbers to One Million                                             | `unit-2/lesson-2-2`                                                        | planned                                            |
| 41–44      | 2-3 Compare Multi-Digit Numbers                                                       | `unit-2/lesson-2-3`                                                        | planned                                            |
| 45–48      | 2-4 Round Multi-Digit Numbers                                                         | `unit-2/lesson-2-4`                                                        | planned                                            |
| 49–50      | Math Probe « Rounding Numbers »                                                       | —                                                                          | planned (with the unit review)                     |
| 51–56      | Unit 2 Review, Fluency Practice                                                       | —                                                                          | planned (a unit review page, after the lessons)    |
| 57–58      | Unit 3 opener, Ignite « The Greatest Sum or Difference »                              | —                                                                          | skipped (opener)                                   |
| 59–96      | 3-1 … 3-9 (Math Probe « Estimation » p. 63–64)                                        | `unit-3/lesson-3-1` … `lesson-3-9`                                         | planned                                            |
| 97–102     | Unit 3 Review, Fluency Practice                                                       | —                                                                          | planned (unit review)                              |
| 103–104    | Unit 4 opener, Ignite « Comparing Gardens »                                           | —                                                                          | skipped (opener)                                   |
| 105–122    | 4-1 … 4-4 (Math Probe « Comparison Problems » p. 121–122)                             | `unit-4/lesson-4-1` … `lesson-4-4`                                         | planned                                            |
| 123–128    | Unit 4 Review, Fluency Practice                                                       | —                                                                          | planned (unit review)                              |
| 129–162    | Unit 5 « Numbers and Number Patterns »: 5-1 … 5-6 (Math Probe « Factors » p. 135–136) | `unit-5/lesson-5-1` … `lesson-5-6` (new unit folder)                       | planned                                            |
| 163–204    | Unit 6 « Multiplication Strategies »: 6-1 … 6-8 (Math Probe p. 193–194)               | `unit-6/lesson-6-1` … `lesson-6-8`                                         | planned                                            |
| 205–248    | Unit 7 « Division Strategies »: 7-1 … 7-8 (Math Probe p. 235–236)                     | `unit-7/lesson-7-1` … `lesson-7-8`                                         | planned                                            |
| G1–        | Glossary                                                                              | —                                                                          | skipped (the words are in each lesson's Key words) |

## Student Practice Book

| Practice pages | Content                                                       | Goes to                                                   | Status                             |
| -------------- | ------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------- |
| before p. 1    | Unit 2 Family Letter (terms, 4,695,132 in the chart)          | `unit-2/lesson-2-1` · game `value` (the number 4,695,132) | built                              |
| 1–2            | 2-1 Additional Practice 1–5 (Math @ Home activity skipped)    | `unit-2/lesson-2-1` · `pb`                                | built                              |
| 3–8            | 2-2 … 2-4 Additional Practice                                 | `unit-2/lesson-2-2` … `lesson-2-4` · `pb`                 | planned                            |
| 9–78           | 3-1 … 7-8 Additional Practice (and the units' Family Letters) | `unit-N/lesson-N-M` · `pb`                                | planned                            |
| 79–            | Units 8–14 (fractions, decimals, measurement, geometry)       | —                                                         | waiting (Student Edition Volume 2) |

## Term 1 school sheets (`Term 1/`)

Built into the unit pages before the book lessons (one page per unit, see the header comment of each `unit-N/*.js`). `L_N-M` files with 2–4 pages and no text layer are photos of class pages.

| File                                                                  | Content                                   | Goes to                                                     | Status                                                |
| --------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| 20260921-L2-1.pdf                                                     | Lesson 2-1 class sheet                    | `unit-2/place-value` · `l21`                                | built                                                 |
| 20260921-L2-2.pdf, 20261005-L2-2.pdf                                  | Lesson 2-2 class sheet (two copies)       | `unit-2/place-value` · `l22`                                | built                                                 |
| 202060924-L2-3.pdf, 20261005-L2-3.pdf                                 | Lesson 2-3 class sheet (two copies)       | `unit-2/place-value` · `l23`                                | built                                                 |
| 20261005-L2-4.pdf                                                     | Lesson 2-4 class sheet                    | `unit-2/place-value` · `l24`                                | built                                                 |
| 20260920-HW_1_G4.pdf                                                  | Homework 1                                | `unit-2/place-value` · `hw1`                                | built                                                 |
| 20261008-Revision_MidT_1.pdf                                          | Mid-term 1 Exam Extra Practice            | `unit-2/place-value` · `mid1` (place-value part)            | built                                                 |
| 20261017-L_3-4_copy.pdf, 20261017-Extra_Practice_-_L3-4.pdf           | Lesson 3-4 and its extra practice         | `unit-3/add-subtract`                                       | built                                                 |
| 20261022-L3-7.pdf, 20261022-L_3-7.pdf                                 | Lesson 3-7 sheet and class pages          | `unit-3/add-subtract`                                       | built                                                 |
| 20261022-L_4-1.pdf, 20261022-Extra_Practice_-_L4-1.pdf                | Lesson 4-1 and its extra practice         | `unit-4/multiplication`                                     | built                                                 |
| 20261023-HW_2_-_T1_-_2026.pdf                                         | Homework 2 (A: add / subtract, B: times)  | `unit-3/add-subtract`, `unit-4/multiplication` · Homework 2 | built                                                 |
| 20261024-Oct 24, 2026 at 10 20 PM.jpg                                 | Times-table flowers, bus and grid (ideas) | `unit-4/multiplication` · flower game; `times/` games       | built                                                 |
| 20261028-Rvision_FT_1_2027.pdf                                        | Final term 1 Exam Extra Practice          | `term-1/final-term-1/math-revision` · part 1                | built                                                 |
| 20260920-ModelAnswers_L_2-1.pdf, 20260920-ModelAnswers_L_2-2.pdf      | Model answers 2-1, 2-2 (scans)            | keys for `unit-2/place-value` · `l21`, `l22`                | not checked                                           |
| 20261005-L_2-1.pdf, L_2-2.pdf, 20260924-L_2-3.pdf, 20261005-L_2-4.pdf | Class pages 2-1 … 2-4 (scans)             | —                                                           | not checked (compare with the book lessons 2-1 … 2-4) |
| 20261008-L14-1.pdf, 20261008-L_14-1.pdf                               | Lesson 14-1 lines, segments, rays         | `term-1/final-term-1/math-revision` (lines part)            | not checked (Unit 14 is in Volume 2)                  |
| 20261028-L_4-2.pdf, 20261028-Extra_Practice_-_L4-2.pdf                | Lesson 4-2 and its extra practice         | `unit-4/lesson-4-2` (with the book lesson)                  | planned                                               |
