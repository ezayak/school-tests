// Math lessons for Grade 4 (Reveal Math), all terms. One chapter per book unit (a folder unit-N/):
// first the unit page (the school sheets, label "Unit"), then one card per book lesson (lesson-N-M.html, label "Lesson").
// label "Lesson" on the book lessons' cards; the unit pages have their own label "Unit". path and cover are relative to the unit folder.
// Book lessons are added with .claude/skills/math-lesson/scripts/add.js (it rewrites this list and the "also" files in games.js).
window.CS_LESSONS = {
  grade: 4,
  part: "Unit",
  label: "Lesson",
  intro:
    "Pick a lesson. Each lesson explains with pictures, has games and the school exercises. Answers are typed on a big number pad, and 💡 Help explains one step at a time.",
  chapters: [
    {
      n: 2,
      dir: "unit-2",
      title: "Generalize Place-Value Structure",
      items: [
        {
          n: 2,
          label: "Unit",
          title: "Place Value: Big Numbers",
          en: "Places and periods, the value of a digit, standard / word / expanded form, compare, round",
          path: "place-value.html",
          cover: "img/cover.jpg",
          note: "9 picture cards · 4 games · 6 exercises",
        },
        {
          n: "2-1",
          title: "The Structure of Big Numbers",
          en: "The value of a digit, 10 times the place on its right, the greatest and the least number",
          path: "lesson-2-1.html",
          cover: "img/lesson-2-1/curious.jpg",
          note: "7 picture cards · 3 games · 8 exercises",
        },
        {
          n: "2-2",
          title: "Read and Write Big Numbers",
          en: "Periods, standard form, word form and expanded form up to one million",
          path: "lesson-2-2.html",
          cover: "img/lesson-2-2/curious.jpg",
          note: "6 picture cards · 3 games · 7 exercises",
        },
        {
          n: "2-3",
          title: "Compare Big Numbers",
          en: "Greater or less: compare the digits place by place, starting on the left",
          path: "lesson-2-3.html",
          cover: "img/lesson-2-3/curious.jpg",
          note: "6 picture cards · 2 games · 7 exercises",
        },
        {
          n: "2-4",
          title: "Round Big Numbers",
          en: "Round to any place with place value or a number line, and choose a good estimate",
          path: "lesson-2-4.html",
          cover: "img/lesson-2-4/visitors.jpg",
          note: "5 picture cards · 2 games · 7 exercises",
        },
      ],
    },
    {
      n: 3,
      dir: "unit-3",
      title: "Addition and Subtraction Strategies and Algorithms",
      items: [
        {
          n: 3,
          label: "Unit",
          title: "Add and Subtract Big Numbers",
          en: "Columns with carrying and regrouping, word problems with a schema, estimating",
          path: "add-subtract.html",
          cover: "img/cover.jpg",
          note: "11 picture cards · 5 games · 5 exercises",
        },
      ],
    },
    {
      n: 4,
      dir: "unit-4",
      title: "Multiplication as Comparison",
      items: [
        {
          n: 4,
          label: "Unit",
          title: "Multiplication",
          en: "What multiplication is: equal groups, arrays, times tables; times as many",
          path: "multiplication.html",
          cover: "img/cover.jpg",
          note: "12 picture cards · 6 games · 3 exercises",
        },
        {
          n: "4-2",
          title: "More Than or Times as Many?",
          en: "Add for “more than”, multiply for “times as many”: bar diagrams and equations",
          path: "lesson-4-2.html",
          cover: "img/lesson-4-2/curious.jpg",
          note: "6 picture cards · 2 games · 8 exercises",
        },
        {
          n: "4-3",
          title: "Times as Many: Find the Unknown",
          en: "Times as many: find the big number, the small number or how many times",
          path: "lesson-4-3.html",
          cover: "img/lesson-4-3/learn-bar.jpg",
          note: "6 picture cards · 2 games · 7 exercises",
        },
        {
          n: "4-4",
          title: "Times as Many: Divide",
          en: "Divide to compare: find the small number or how many times as much",
          path: "lesson-4-4.html",
          cover: "img/lesson-4-4/curious.jpg",
          note: "6 picture cards · 2 games · 7 exercises",
        },
      ],
    },
    {
      n: "",
      part: "",
      dir: "times",
      title: "Multiplication games",
      items: [
        {
          n: "",
          label: "Games",
          title: "Multiplication games",
          en: "Times tables 2–12 or random: mixed-up sums to type and rockets to blow up",
          path: "index.html",
          ic: "🚀",
          note: "2–12 · 🎲 random",
        },
      ],
    },
  ],
};
