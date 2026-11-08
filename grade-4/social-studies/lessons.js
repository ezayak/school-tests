// Social Studies lessons for Grade 4 (English), all terms. One entry per chapter (a folder chapter-N/ with its lessons);
// add one entry per lesson (and its files to "also" in games.js for offline use).
// path and cover are relative to the chapter folder.
window.CS_LESSONS = {
  grade: 4,
  intro:
    "Pick a lesson. Each lesson has big pictures from the book or the teacher's slides, games, and the school exercises. Everything can be read aloud. Term 2* = a lesson that is not in the booklet.",
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
        {
          n: 2,
          title: "Weather and Climate",
          en: "Temperature, precipitation, humidity, the equator; arctic, tropical and temperate climates",
          path: "lesson-2.html",
          cover: "img/lesson-2/weather-icon.jpg",
          note: "10 picture cards · 4 games · 4 exercises",
        },
        {
          n: 3,
          title: "Regions and Resources",
          en: "Natural, capital and human resources; renewable and non-renewable; processing; saving resources",
          path: "lesson-3.html",
          cover: "img/lesson-3/explore.jpg",
          note: "14 picture cards · 4 games · 5 exercises",
        },
        {
          n: 4,
          title: "People and the Land",
          en: "Adapt to the land, change it with technology: irrigation, the Ogallala Aquifer, saving resources; the story of Marjory Stoneman Douglas",
          path: "lesson-4.html",
          cover: "img/lesson-4/mountain-home.jpg",
          note: "17 picture cards · 1 story · 4 games · 4 exercises",
          term: 2,
        },
        {
          n: "Review",
          label: "Chapter 1",
          title: "Geography and the United States",
          en: "The book's Visual Review and Chapter 1 Assessment: landforms, regions, climate, resources, people and the land",
          path: "review.html",
          cover: "img/review/vr-land.jpg",
          note: "4 picture cards · 3 games · 1 assessment (15 questions)",
          // the book's chapter pages, not in the booklet
          term: "2*",
        },
      ],
    },
    {
      n: 2,
      dir: "chapter-2",
      title: "Americans and Their History",
      items: [
        {
          n: 1,
          title: "America and Europe",
          en: "The first Americans, Columbus and the explorers, colonies, the Columbian Exchange, the House of Burgesses",
          path: "lesson-1.html",
          cover: "img/lesson-1/kihn.jpg",
          note: "20 picture cards · 1 story · 4 games · 1 exercise",
          // not in the Term 2 booklet: built from the book only
          term: "2*",
        },
      ],
    },
  ],
};
