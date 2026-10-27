// Math lessons for Grade 4 (Reveal Math), all terms. One entry per book unit (a folder unit-N/ with its lesson page);
// add one entry per lesson (and its files to "also" in games.js for offline use).
// path and cover are relative to the unit folder.
window.CS_LESSONS = {
  grade: 4,
  part: "Unit",
  label: "Unit", // one lesson per book unit: the cards say "Unit 2", "Unit 3" …
  flat: true, // no unit headings: all the cards together
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
          title: "Place Value: Big Numbers",
          en: "Places and periods, the value of a digit, standard / word / expanded form, compare, round",
          path: "place-value.html",
          cover: "img/cover.jpg",
          note: "9 picture cards · 4 games · 6 exercises",
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
          title: "Multiplication",
          en: "What multiplication is: equal groups, arrays, times tables; times as many",
          path: "multiplication.html",
          cover: "img/cover.jpg",
          note: "12 picture cards · 6 games · 3 exercises",
        },
      ],
    },
  ],
};
