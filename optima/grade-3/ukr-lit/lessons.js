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
        {
          n: 4,
          title: "Вірний друг",
          en: "Вадим Скомаровський · вірш про шкільний дзвінок",
          path: "lesson-4.html",
          cover: "img/lesson-4/bell.jpg",
          note: "с. 8 · 11 питань",
        },
        {
          n: 5,
          title: "Як черепаха Наталка до школи збиралася",
          en: "Еліна Заржицька · 7 днів черепахи Наталки, загадка",
          path: "lesson-5.html",
          cover: "img/lesson-5/house.jpg",
          note: "с. 9–12 · 13 питань",
        },
        {
          n: 6,
          title: "Світлий храм",
          en: "Дмитро Білоус · акровірш-загадка",
          path: "lesson-6.html",
          cover: "img/lesson-6/school-things.jpg",
          note: "с. 13 · 5 питань",
        },
        {
          n: 7,
          title: "Акровірші",
          en: "Наталія Внукова · два акровірші про навчання",
          path: "lesson-7.html",
          cover: "img/lesson-7/school-things.jpg",
          note: "с. 13–14 · 7 питань",
        },
      ],
    },
    {
      k: "autumn",
      tab: "Осінь",
      ic: "🍂",
      t: "Осінь наша, осінь — неба ясна просинь · Розмаїттям кольоровим прикрашає осінь край",
      items: [
        {
          n: 8,
          title: "Осінь",
          en: "Катерина Перелісна · вірш про осінь, загадка",
          path: "lesson-8.html",
          cover: "img/lesson-8/autumn.jpg",
          note: "с. 14–15 · 10 питань",
        },
        {
          n: 9,
          title: "За порогом осені",
          en: "За Михайлом Слабошпицьким · Сашко в діда Степана в саду, план тексту",
          path: "lesson-9.html",
          cover: "img/lesson-9/orchard.jpg",
          note: "с. 15–17 · 13 питань",
        },
        {
          n: 10,
          title: "Білочка восени",
          en: "Ліна Костенко · вірш про білку і її запаси",
          path: "lesson-10.html",
          cover: "img/lesson-10/squirrel.jpg",
          note: "с. 18 · 10 питань",
        },
      ],
    },
    {
      k: "pokrova",
      tab: "Покрова",
      ic: "🌺",
      t: "Осінь наша, осінь — неба ясна просинь · Матінко Покрово, накрий нашу хату теплом",
      items: [
        {
          n: 11,
          title: "Калина",
          en: "Микола Верещака · вірш; картина «Червона калина»",
          path: "lesson-11.html",
          cover: "img/lesson-11/painting.jpg",
          note: "с. 19–20 · 14 питань",
        },
        {
          n: 12,
          title: "14 жовтня — Свята Покрова",
          en: "Три свята 14 жовтня: Покрова, День козацтва, День захисника; прикмети",
          path: "lesson-12.html",
          cover: "img/lesson-12/cossack.jpg",
          note: "с. 19, 21 · 13 питань",
        },
      ],
    },
  ],
};
