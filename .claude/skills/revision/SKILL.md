---
name: revision
description: Build or update a revision (a page that goes over several lessons before an exam or at the end of a month, chapter or unit) for the school-tests study games, on the subject's own lesson engine, together with the subject's skill. Sources are the school's revision sheets (مراجعة, «Revision MidT 1»), exam practice sheets (Exercices d'application de mi-terme / final, with the Modèle de réponse), exam memos («Memo for MidTerm / Final Term Exam»: the list of what the exam covers) and the book's chapter or unit review (Visual Review, Chapter Assessment, Unit Review). Use this whenever an inbox file's kind is `revision`, the parent marks a file «Revision / exam memo», or the user sends or mentions a revision sheet, an exam memo, a mid-term or final exam, a monthly revision, a chapter or unit review, or asks to add, update or check a revision, in any subject, even if they don't say "revision".
---

# Revisions (every subject)

A revision is built on the subject's own engine, with the subject's skill: this skill says **what kind of revision it is, where it goes and what it reuses**;
the subject's skill says how items are written for that engine (pictures, sound, translations, the checks). Load both. CLAUDE.md "Workflow" applies as for a lesson.

Never copy the old exam pages in `grade-N/term-1/mid-term-1/` and `final-term-1/` that are single HTML files on `quiz-common.js`
(`science-revision.html`, `math-revision.html`, `religion-revision.html` …): they came before the engines. New revisions are data files for the engine.

## 1. Which kind it is

Look at the file's `text.txt` / contact sheet first (CLAUDE.md "Workflow"), then pick one:

| Kind                  | How to tell                                                                                                                    | What the page is                                                                                                                                                | Example                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **A. Revision sheet** | The teacher's exercises over several lessons: مراجعة, «Revision MidT 1», «مراجعة شهر أكتوبر». Often a separate key (حل, نموذج) | Every exercise of the sheet, **in its order**, as the engine's items. Nothing added except what the sheet needs to make sense (a story reminder)                | `grade-3/term-1/religion/revision-november.js`, `grade-3/term-1/mid-term-1/arabic-revision.js` |
| **B. Exam practice**  | « Exercices d'application de mi-terme / final », with a « Modèle de réponse »                                                  | Kind A for the sheet's tasks, **then** the main exercises of the lessons it covers, reused (section 3)                                                          | `grade-3/term-1/french/revision-1.js`                                                          |
| **C. Exam memo**      | A list of topics, pages and skills, few or no exercises: «Memo for MidTerm Exam», «Final exam memo»                            | One section per memo topic, in the memo's order; each section takes the lessons' exercises on that topic (reused), new exercises only for what no lesson covers | `grade-4/term-1/english/revision-1.js`                                                         |
| **D. Book review**    | The book's own end pages: Visual Review, Chapter N Assessment, Unit Review, Math Probe                                         | A lesson-style page: a short Learn part (the review's key words and pictures), then the assessment's questions                                                  | `grade-4/social-studies/chapter-1/review.js`                                                   |

A file can be two kinds (a memo with a few exercises: C, with those exercises first in their topic's section). A memo of a dictation («dictationmemo»)
is a word list, not a revision: the `english-dictation` skill.

## 2. Where it goes

- **The file**:
  - An exam revision (A, B, C): `revision-N.js` + `.html` in the folder of the exam's term, `grade-N/term-T/<subject>/`
    (T = the term of the job or of the sheet, «Term (2)» → `term-2`; `<subject>` = the last part of `subjects.json` `app`:
    `grade-4/social-studies` → `grade-4/term-2/social-studies/`). Its pictures in `img/revision-N/` there. A build job may change this folder and the app folder.
    When the subject's lessons are elsewhere, the page's lesson scripts are loaded by their relative path, and `hub` in the data points to the subject's hub
    (or to the home page `../../../index.html` when the subject has none).
  - A monthly sheet: `revision-<month>.js` in the subject's app folder, next to its lessons; D: `review.js` in the chapter / unit folder.
  - Never a new file in `mid-term-1/` or `final-term-1/`.
- **The page**: `node .claude/scripts/scaffold/new.js <new>.html --like <sibling>` with the sibling of the same engine:

  | Engine                                                      | Sibling                                                                                                       |
  | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
  | French (`french-lesson.js`)                                 | `grade-4/term-1/french/revision-1.html` (Grade 3: `grade-3/term-1/french/revision-1.html`)                    |
  | `computer-lesson.js` (English, Science, SS, Math, Computer) | English: `grade-4/term-1/english/revision-1.html`; the others: `grade-4/social-studies/chapter-1/review.html` |
  | `arabic-lesson.js` (Arabic, Religion)                       | `grade-3/term-1/religion/revision-november.html`                                                              |

  Then fix the page's list of scripts: every lesson file it reuses, before the revision's own file, before the engine.

- **The card**:
  - Tied to an exam (mid-term or final: A, B, C): a card in `games.js` with `period: "Mid-term exam"` or `"Final exam"`, `grade`, `term`, `subject`
    (one card per subject and period): it shows under the "Revision T" button of the home page's side bar. The page's files go in the subject entry's `also`
    (`register.py add`), and the card says so in a comment, as the French and English revision cards do; a subject with no entry: in the card's own `also`.
  - Not tied to an exam (a monthly sheet, D): in the subject's own list (`lessons.js` / `dictations.js`) after the lessons it covers, `n: "Revision"` or `"Review"`
    (Religion: `nAr: "مُرَاجَعَةٌ"`), its `note` with the counts.
  - Then the subject entry's `countLabel` / `topics` (e.g. "18 lessons · 1 revision"), `register.py check`, the `SOURCES.md` row, `inbox.py done` (sheet **and** key), and the bump in its own commit.

## 3. Reuse, don't copy

A revision takes what the lessons already have (pictures, translations, sounds, whole exercises) instead of writing it again.

- **French**: `use: [1, 2]` (the lessons' translations), `ref: "2:phrase"` (exercise `phrase` of Lesson 2 as it is), pictures `img: "lesson-2/parle-9"`.
  The lessons keep their data in `window.FR_DATA[N]`.
- **`computer-lesson.js`**: a lesson file that ends with `(window.EN_DATA = window.EN_DATA || {})[N] = window.LESSON;` can be reused:
  `ref("5:vfill", "exercises", g)` in the revision (helper at the top of `english/revision-1.js`) copies exercise `vfill` of lesson 5 into section `g`, with a new `k`.
  English lessons have that line. A Science / SS / Math / Computer lesson does not yet: add it to each lesson the revision reuses (one data line, no engine change),
  with the same global so `ref` stays the same. The lesson's helpers must be inside its `(function () { … })()`: two files with a top-level `const mc` break the page
  ("Identifier 'mc' has already been declared"). Pictures from other folders: `../lesson-1/r-west` (the `review.js` way).
- **`arabic-lesson.js`**: no `ref`. Copy the story parts the questions need from the lesson files (the Religion revision's "Read / listen" fold under every question),
  pictures by path (`../arabic/img/lesson-3/maryam.jpg`), tap-a-word translations copied from the lessons' `gloss`.
- Never change an engine for a revision unless the user asks (CLAUDE.md: the engines are shared by many subjects).

## 4. Answers

- Kinds A and B: the key is usually a second file (حل المراجعة, نموذج إجابة, Modèle de réponse, «answer key»). Look for it in the subject's new files and in `done.txt` before writing answers.
  The key wins over what you think; a key that looks wrong: keep it and list it for the user.
- No key (C, D, a sheet without one): answers from the lessons; open answers marked unverified in the subject's `UNVERIFIED.md` where it has one
  (`grade-4/{math,science,social-studies,computer}`, `grade-4/term-2/english`), as `review.js` does.
- Questions the app can't ask (draw, a paragraph on a separate sheet, a project, a verse to write from memory that a lesson already teaches): left out,
  named in the file's header comment and in the message to the user.

## 5. Header comment and checks

- The header comment says: subject, grade, which revision (mid-term / final / month / chapter), the source files by name and date, the key, which lessons it reuses, and what was left out.
- Count the sheet's exercises and the page's: every one is there (or named as left out). Memo (C): every topic has a section.
- Open the page on the local server: no console errors (a reused lesson that doesn't load shows as an empty section), every section plays, the scores add up.
- Then the subject skill's own checks (pictures, sound, translations, the older lessons still play).
