// Math lessons for Grade 4 (Reveal Math), all terms. One chapter per book unit (a folder unit-N/):
// first the unit page (the school sheets, label "Unit"), then one card per book lesson (lesson-N-M.html, label "Lesson").
// Add the files to "also" in games.js for offline use. path and cover are relative to the unit folder.
window.CS_LESSONS = {
  grade: 4,
  part: "Unit",
  label: "Lesson", // the book lessons: "Lesson 2-1"; the unit pages have their own label "Unit"
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
