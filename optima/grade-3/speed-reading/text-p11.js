// «Школа швидкочитання», p. 11 (по складах): the text line by line as printed; shared/speed-reading.js, <body data-game="text">.
// book: true = the book's lines (one row each, «По рядку»); words = the book's count. {name} = a picture from img/texts/name.jpg in place of a word;
// ■ = a missing letter, as printed; cut = the bottom or top of the letters is cut off, as printed (the words underneath are whole).
// The book has no answers: the right answer (first) and the wrong ones are made up from the text; open = told to the adult.
window.TEXT = {
  key: "book-p11",
  title: "В одному мальовничому селі…",
  ic: "🐶",
  cover: "img/texts/cover-p11.jpg",
  page: 11,
  author: "За О. Щелчковою",
  words: 58,
  book: true,
  paras: [
    [
      "В од-но-му ма-льов-ни-чо-му се-лі жи-ли",
      "со-бі кі-шка Ма-ру-ся та ї-ї ко-ше-ня Пух-на-",
      "стик, дві ку-ро-чки — Чу-ба-ро-чка і Кра-су-ня,",
      "кі-зонь-ка Бі-ля-но-чка і ма-ле ще-ня на ім’-я",
      "Не дам!",
    ],
    [
      "Ти за-пи-та-єш: «А чо-му пе-си-ка так",
      "див-но зва-ли?» Річ у тім, що він був ду-же",
      "жа-діб-ним. Хто до ньо-го не звер-тав-ся б",
      "із про-хан-ням, завж-ди чув у від-по-відь:",
      "«Не дам! Це мо-є!»",
    ],
  ],
  q: [
    {
      q: "Добери та запиши заголовок до тексту.",
      o: [
        ["Песик Не дам", "🐶"],
        ["Кізонька Біляночка", "🐐"],
        ["Дві курочки", "🐔"],
      ],
    },
    {
      q: "Хто жив у селі?",
      o: [
        ["Кішка, кошеня, курочки, кізонька і щеня", "🏡"],
        ["Тільки кішка Маруся", "🐈"],
        ["Корова і кінь", "🐄"],
      ],
    },
    {
      q: "Як звали песика?",
      o: [
        ["Не дам", "🐶"],
        ["Пухнастик", "🐱"],
        ["Біляночка", "🐐"],
      ],
    },
    {
      q: "Чому його так називали?",
      o: [
        ["Він був дуже жадібним", "✋"],
        ["Він був дуже добрим", "💛"],
        ["Він дуже голосно гавкав", "📢"],
      ],
    },
  ],
};
