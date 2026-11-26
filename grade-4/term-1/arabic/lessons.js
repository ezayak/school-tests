// Arabic for Grade 4: the Grade 3 Arabic engine (../../../grade-3/term-1/arabic/arabic-lesson.js) in list view.
// The Reading section comes from arabic-reading/lessons.js (shared with Grade 3). Lessons, tests or homework
// for Grade 4 go here as LESSONS / TESTS / HOMEWORK, the same way as in grade-3/term-1/arabic/lessons.js.
// Lessons are named by the book's unit and lesson (u3-lesson-4), built from the last one back to the first (the parent's wish).
window.LIST_HEAD = {
  eyebrow: "Grade 4 · اللغة العربية",
  grade: 4,
  p: "Arabic",
  k: "Lessons, Tests & Reading",
  // one section of the side bar per unit (a lesson's unit: N puts it there); a unit with no lesson yet has no button
  units: [
    { u: 1, ic: "1️⃣", t: "Unit 1", ar: "الْوَحْدَةُ الْأُولَى" },
    { u: 2, ic: "2️⃣", t: "Unit 2", ar: "الْوَحْدَةُ الثَّانِيَةُ" },
    { u: 3, ic: "3️⃣", t: "Unit 3", ar: "الْوَحْدَةُ الثَّالِثَةُ" },
  ],
  howto:
    "Lessons from the book: the text to read and listen to (tap any word to see what it means), the new words and the book's exercises as games. Weekly tests from the book with every group (A, B, C). Reading: learn to read step by step: the letters and their harakat, then words, then sentences. Read each card aloud, listen to check, and play the games.",
};
window.LESSONS = [
  {
    n: "4",
    unit: 3,
    nAr: "الرَّابِعُ",
    title: "فِي الْبُسْتَانِ",
    en: "In the Orchard",
    path: "u3-lesson-4.html",
    cover: "img/u3-lesson-4/cover.jpg",
    note: "Poem · classwork · Unit 3 review · 2 stories · 26 words · 86 exercises",
  },
];
// Weekly tests: named by the book pages («حل التقييمات» book), not by a test number (the parent's wish).
window.TESTS = [
  {
    n: "p. 49–50",
    nAr: "ص ٤٩–٥٠",
    title: "التَّقْيِيمُ الْأُسْبُوعِيُّ",
    en: "Weekly test · The Road to Happiness",
    path: "test-p49.html",
    cover: "../../../grade-3/term-1/arabic/img/lesson-4/cover.jpg",
    note: "Groups A · B · C · 20 questions · the poem «طريق السعادة» (book p. 49–50)",
  },
];
