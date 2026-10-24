// Social Studies lessons for Grade 4 (English), all terms. One entry per chapter (a folder chapter-N/ with its lessons);
// add one entry per lesson (and its files to "also" in games.js for offline use).
// path and cover are relative to the chapter folder.
window.CS_LESSONS = {
  grade: 4,
  intro:
    "Pick a lesson. Each lesson has big pictures from the teacher's slides, games, and the school exercises. Everything can be read aloud.",
  chapters: [
    {
      n: 1,
      dir: "chapter-1",
      title: "Geography and the United States",
      items: [
        {
          n: 1,
          title: "Land and Regions in the United States",
          en: "Landforms, the 5 regions of the USA and their features, borders",
          path: "lesson-1.html",
          cover: "img/lesson-1/regions-kids.jpg",
          note: "14 picture cards · 4 games · 5 exercises",
        },
      ],
    },
  ],
};
