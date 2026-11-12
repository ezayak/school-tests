// «Школа швидкочитання», p. 15 (з малюнками): the text line by line as printed; shared/speed-reading.js, <body data-game="text">.
// book: true = the book's lines (one row each, «По рядку»); words = the book's count. {name} = a picture from img/texts/name.jpg in place of a word;
// ■ = a missing letter, as printed; cut = the bottom or top of the letters is cut off, as printed (the words underneath are whole).
// The book has no answers: the right answer (first) and the wrong ones are made up from the text; open = told to the adult.
window.TEXT = {
  key: "book-p15",
  title: "На великій галявині…",
  ic: "🐰",
  cover: "img/texts/cover-p15.jpg",
  page: 15,
  author: "За Т. Клапчук",
  words: 67,
  book: true,
  paras: [
    [
      "На великій галявині у зеленому {hares-forest},",
      "під старою {hares-fir} жила собі родина {hares-pair}:",
      "мама, тато та п’ятеро {hares-five}:",
      "Стрибайко, Сірохвостик, Довговушко, Чорно-",
      "носик і найменший — Заздрик. Як ви, напевно,",
      "уже здогадалися, Стрибайко умів найшвидше",
      "за усіх {hares-four} стрибати. Як розбі-",
      "житься — ніхто його наздогнати не може.",
    ],
    [
      "У Сірохвостика був найкрасивіший пух-",
      "настий сірий {hares-tail}, і {hares-bunny} ним дуже пишалося.",
      "Поверне, бува, голову назад, поводить {hares-tail}",
      "з боку в бік і милується.",
    ],
  ],
  q: [
    {
      q: "Де жила родина зайців?",
      o: [
        ["На галявині в лісі, під старою ялинкою", "🌲"],
        ["У місті", "🏙️"],
        ["На березі річки", "🏞️"],
      ],
    },
    {
      q: "Як звали зайченят?",
      o: [
        ["Стрибайко, Сірохвостик, Довговушко, Чорноносик і Заздрик", "🐰"],
        ["Вуглик і Пухнастик", "🐈"],
        ["Квак і Транки", "🐸"],
      ],
    },
    {
      q: "Чому зайченят назвали саме так?",
      o: [
        ["Кожне ім’я каже, яке це зайченя", "🐇"],
        ["Імена вибрали навмання", "🎲"],
        ["Так звали їхніх друзів", "🧑‍🤝‍🧑"],
      ],
    },
  ],
};
