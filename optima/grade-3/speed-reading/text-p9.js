// «Школа швидкочитання», p. 9 (по складах): the text line by line as printed; shared/speed-reading.js, <body data-game="text">.
// book: true = the book's lines (one row each, «По рядку»); words = the book's count. {name} = a picture from img/texts/name.jpg in place of a word;
// ■ = a missing letter, as printed; cut = the bottom or top of the letters is cut off, as printed (the words underneath are whole).
// The book has no answers: the right answer (first) and the wrong ones are made up from the text; open = told to the adult.
window.TEXT = {
  key: "book-p9",
  title: "Мама-кішка розповідала Вуглику…",
  ic: "🐈",
  cover: "img/texts/cover-p9.jpg",
  page: 9,
  author: "За Н. Чуб",
  words: 47,
  book: true,
  paras: [
    [
      "Ма-ма-кіш-ка роз-по-ві-да-ла Вуг-ли-ку",
      "про те, я-ким від-важ-ним був йо-го ді-дусь.",
      "Про те, як во-на я-кось са-ма всту-пи-ла",
      "у бій-ку з трьо-ма ве-ли-чез-ни-ми па-цю-ка-",
      "ми. І ще о-бі-ця-ла, що на-ста-не день, ко-ли",
      "ма-люк Вуг-лик пе-ре-тво-рить-ся на хо-ро-",
      "бро-го, від-важ-но-го, без-страш-но-го ко-та!",
      "«Го-лов-не, ві-ри-ти у сво-ї си-ли!» — ось що",
      "ка-за-ла ма-ма-кіш-ка.",
    ],
  ],
  q: [
    {
      q: "Кому мама-кішка розповідала історії?",
      o: [
        ["Вуглику", "🐈‍⬛"],
        ["Дідусеві", "👴"],
        ["Пацюкам", "🐀"],
      ],
    },
    {
      q: "Із ким мама-кішка вступала в бійку?",
      o: [
        ["З трьома величезними пацюками", "🐀"],
        ["Із собакою", "🐕"],
        ["З котом", "🐈"],
      ],
    },
    {
      q: "Яка головна настанова мами своєму сину?",
      o: [
        ["«Головне, вірити у свої сили!»", "💪"],
        ["«Головне, багато їсти!»", "🍽️"],
        ["«Головне, довго спати!»", "😴"],
      ],
    },
  ],
};
