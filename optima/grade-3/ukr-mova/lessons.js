// Українська мова, 3 клас (Optima). Н. Кравцова, О. Придаток, В. Романова «Українська мова та читання. Частина 1» (2020): the language book.
// One entry per lesson of the book (a topic: the blue title, from the «початок уроку» sign to the next one), grouped by the book's sections;
// a section is a part of the side bar: k (in the address), tab (its short name), ic (emoji), t (the book's title).
// A lesson is lesson-N.html with its lesson-N.js and img/lesson-N/ (engine shared/ukr-lesson.js).
// Add its files to "also" of the Українська мова entry in games.js.
window.UA_LESSONS = {
  subject: "Українська мова",
  grade: 3,
  intro:
    "Обери урок. У вкладці «Урок» — правило з прикладами з підручника. У вкладці «Вправи» — вправи: обери відповідь або склади слово з букв.",
  parts: [
    {
      k: "sounds",
      tab: "Звуки і букви",
      ic: "🔤",
      t: "Звуки і букви. Алфавіт. Наголос",
      items: [
        {
          n: 1,
          title: "Звуки і букви",
          en: "Ребуси, звукові схеми, букви без звука і з двома звуками, слова-пари",
          path: "lesson-1.html",
          cover: "img/lesson-1/eagle.jpg",
          note: "с. 4–5 · 4 вправи",
        },
        {
          n: 2,
          title: "Апостроф",
          en: "Коли пишемо апостроф, перенос слів з апострофом, вислови",
          path: "lesson-2.html",
          cover: "img/lesson-2/hamsters.jpg",
          note: "с. 5–6 · 4 вправи",
        },
        {
          n: 3,
          title: "Правильна вимова слів зі звуком [ґ]",
          en: "Буква ґ: слова-коди, скоромовка, ґудзик і ґуля, вірш",
          path: "lesson-3.html",
          cover: "img/lesson-3/crow.jpg",
          note: "с. 6–7 · 4 вправи",
        },
        {
          n: 4,
          title: "Правильна вимова слів зі звуками [дз], [дз´], [дж]",
          en: "Дж і дз — один звук; сиджу, ходжу; перенос; загадка про хліб",
          path: "lesson-4.html",
          cover: "img/lesson-4/bread.jpg",
          note: "с. 8 · 4 вправи",
        },
      ],
    },
  ],
};
