// Social Studies lessons for Grade 3 (English), all terms. One entry per chapter (a folder chapter-N/ with its lessons);
// add one entry per lesson (and its files to "also" in games.js for offline use).
// path and cover are relative to the chapter folder.
// nav: one side-bar section per chapter (Kit.sideNav), ic = its emoji.
// The sources log is grade-3/term-1/social-studies/SOURCES.md.
window.CS_LESSONS = {
  grade: 3,
  nav: true,
  intro:
    "Pick a lesson. Each lesson has big pictures from the teacher's slides, games, and the school exercises. Everything can be read aloud.",
  chapters: [
    {
      n: 3,
      dir: "chapter-3",
      ic: "🧭",
      title: "Communities Build a Nation",
      items: [
        {
          n: 2,
          title: "Early Explorers",
          en: "Columbus, Amerigo Vespucci, Louis Jolliet, John Cabot; Spain, France and England; spices, gold, wealth, fur traders",
          path: "lesson-2.html",
          cover: "img/lesson-2/explorers.jpg",
          note: "26 picture cards · 4 games · 3 exercises",
          term: 2,
        },
      ],
    },
  ],
};
