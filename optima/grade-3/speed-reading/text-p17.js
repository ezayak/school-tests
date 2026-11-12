// «Школа швидкочитання», p. 17 (з малюнками): the text line by line as printed; shared/speed-reading.js, <body data-game="text">.
// book: true = the book's lines (one row each, «По рядку»); words = the book's count. {name} = a picture from img/texts/name.jpg in place of a word;
// ■ = a missing letter, as printed; cut = the bottom or top of the letters is cut off, as printed (the words underneath are whole).
// The book has no answers: the right answer (first) and the wrong ones are made up from the text; open = told to the adult.
window.TEXT = {
  key: "book-p17",
  title: "Бабуся плела для онуки…",
  ic: "🧶",
  cover: "img/texts/cover-p17.jpg",
  page: 17,
  author: "За Т. Клапчук",
  words: 76,
  book: true,
  paras: [
    [
      "{yarn-granny} плела для онуки теплу {yarn-hat}, а ма-",
      "леньке {yarn-catsleep} лежало поряд і спостерігало за",
      "{yarn-balls} ниток. Вони, наче м’ячики, каталися",
      "по підлозі. {yarn-cat} дуже кортіло погратися",
      "тими дивом’ячиками, але бабуся суворо по-",
      "дивилася на нього і погрозила пальцем: ні-ні,",
      "бешкетнику.",
    ],
    [
      "Коли почало сутеніти, бабуся залишила",
      "плетіння і пішла готувати {yarn-food}. А як поверну-",
      "лася, {yarn-cat} ніде не було…",
    ],
    [
      "Почала вона змотувати нитки і раптом як",
      "підскочить! Із одного {yarn-orange} стирчав пухнас-",
      "тий {yarn-tail}! Розмотала бабуся {yarn-pink} — {yarn-cat}",
      "і знайшлося!",
    ],
  ],
  q: [
    {
      q: "Що робила бабуся?",
      o: [
        ["Плела для онуки теплу шапку", "🧶"],
        ["Пекла пиріг", "🥧"],
        ["Читала книжку", "📖"],
      ],
    },
    {
      q: "Чим займалося кошеня?",
      o: [
        ["Лежало поряд і дивилося на клубки ниток", "🐈"],
        ["Спало на дивані", "🛋️"],
        ["Ловило мишку", "🐭"],
      ],
    },
    {
      q: "Де заховалося кошеня?",
      o: [
        ["У клубку ниток", "🧶"],
        ["Під ліжком", "🛏️"],
        ["На дереві", "🌳"],
      ],
    },
  ],
};
