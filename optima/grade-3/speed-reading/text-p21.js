// «Школа швидкочитання», p. 21 (без літер): the text line by line as printed; shared/speed-reading.js, <body data-game="text">.
// book: true = the book's lines (one row each, «По рядку»); words = the book's count. {name} = a picture from img/texts/name.jpg in place of a word;
// ■ = a missing letter, as printed; cut = the bottom or top of the letters is cut off, as printed (the words underneath are whole).
// The book has no answers: the right answer (first) and the wrong ones are made up from the text; open = told to the adult.
window.TEXT = {
  key: "book-p21",
  title: "Десь далеко, за великим лісом…",
  ic: "🐴",
  cover: "img/texts/cover-p21.jpg",
  page: 21,
  author: "За О. Щелчковою",
  words: 68,
  book: true,
  paras: [
    [
      "Десь дал■ко, за вели■им ліс■м, біжить",
      "собі блак■тна чиста рі■ка, а за н■ю про-",
      "стягл■ся зел■на ка■кова лука, вся нем■в",
      "килим■м укрита різн■барвними кв■тами, і над",
      "ними л■тають кольор■ві ме■елики. І так т■м",
      "гар■о, так соня■но, що, зда■ться, літо нік■ли",
      "не закі■читься!",
    ],
    [
      "Саме т■м, на цій лу́ці, жи■уть мал■нькі",
      "ко■ячки. Вони д■же сх■жі на спра■жніх кон■й,",
      "тіль■и зов■ім мал■нькі. Ти, мабу■ь, бач■в та-",
      "ких у зо■парку. Їх ще наз■вають пон■.",
    ],
  ],
  q: [
    {
      q: "Добери та запиши заголовок до тексту.",
      o: [
        ["Маленькі конячки", "🐴"],
        ["Зимова казка", "❄️"],
        ["Цирк", "🎪"],
      ],
    },
    {
      q: "Хто живе на лу́ці?",
      o: [
        ["Маленькі конячки", "🐴"],
        ["Корови", "🐄"],
        ["Зайці", "🐰"],
      ],
    },
    {
      q: "Як ще називають маленьких конячок?",
      o: [
        ["Поні", "🐴"],
        ["Зебри", "🦓"],
        ["Ослики", "🫏"],
      ],
    },
    { q: "Опиши місце, де відбувається дія твору.", open: true },
  ],
};
