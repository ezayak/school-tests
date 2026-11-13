// Українська література, 3 клас (Optima). А. Савчук «Українська мова та читання. Частина 2» (2020): the reading book.
// One entry per text of the book (with its questions), grouped by the book's themes; a theme is a part of the side bar:
// k (in the address), tab (its short name), ic (emoji), t (the book's title). A lesson is lesson-N.html with its lesson-N.js
// and img/lesson-N/ (engine shared/ukr-lesson.js). Add its files to "also" of the Українська література entry in games.js.
// The syllable-rocket texts (texts.js, shared/reading.js) are the last part of the side bar.
window.UA_LESSONS = {
  subject: "Українська література",
  grade: 3,
  intro:
    "Обери урок. У вкладці «Текст» читаємо: увесь текст, по словах або по реченнях. У вкладці «Питання» — питання до тексту.",
  parts: [
    {
      k: "school",
      tab: "До школи",
      ic: "🔔",
      t: "Осінь наша, осінь — неба ясна просинь · До школи ідемо в радісний час",
      items: [
        {
          n: 1,
          title: "У школу",
          en: "Леся Храплива-Щур · вірш, прислів’я про навчання",
          path: "lesson-1.html",
          cover: "img/lesson-1/flowers.jpg",
          note: "с. 4–5 · 13 питань",
        },
        {
          n: 2,
          title: "Один день із життя вчительки",
          en: "Зоряна Живка · оповідання: урок малювання і перерва",
          path: "lesson-2.html",
          cover: "img/lesson-2/meadow.jpg",
          note: "с. 5–7 · 15 питань",
        },
        {
          n: 3,
          title: "Аби швидше почути дзвоник",
          en: "Василь Сухомлинський · оповідання про звук і дзвінок",
          path: "lesson-3.html",
          cover: "img/lesson-3/bell.jpg",
          note: "с. 7 · 7 питань",
        },
      ],
    },
  ],
};
