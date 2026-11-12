// «Школа швидкочитання», p. 7 (по складах): the text line by line as printed; shared/speed-reading.js, <body data-game="text">.
// book: true = the book's lines (one row each, «По рядку»); words = the book's count. {name} = a picture from img/texts/name.jpg in place of a word;
// ■ = a missing letter, as printed; cut = the bottom or top of the letters is cut off, as printed (the words underneath are whole).
// The book has no answers: the right answer (first) and the wrong ones are made up from the text; open = told to the adult.
window.TEXT = {
  key: "book-p7",
  title: "Жило собі у великому місті…",
  ic: "🐈‍⬛",
  cover: "img/texts/cover-p7.jpg",
  page: 7,
  author: "За Н. Чуб",
  words: 53,
  book: true,
  paras: [
    [
      "Жи-ло со-бі у ве-ли-ко-му мі-сті ма-лень-",
      "ке, зов-сім ма-лень-ке ко-ше-ня на і-м’я",
      "Вуг-лик. Во-но бу-ло та-ке ма-лень-ке, що",
      "ба-га-то хто йо-го про-сто не по-мі-чав.",
      "А як-що й по-мі-чав, то ли-ше вдень. То-му",
      "що вно-чі Вуг-ли-ка вза-галі не бу-ло вид-но.",
      "Здо-га-да-лись, чо-му? Так, Вуг-лик був",
      "чор-ним ко-ше-нят-ком. І на-віть ду-же-ду-же",
      "чор-ним. Без жод-но-ї бі-ло-ї пля-мо-чки.",
    ],
  ],
  q: [
    {
      q: "Добери та запиши заголовок до тексту.",
      o: [
        ["Чорне кошеня Вуглик", "🐈‍⬛"],
        ["Біле цуценя", "🐶"],
        ["Велике місто вночі", "🌃"],
      ],
    },
    {
      q: "Хто жив у місті?",
      o: [
        ["Маленьке кошеня Вуглик", "🐈‍⬛"],
        ["Великий пес", "🐕"],
        ["Біла мишка", "🐭"],
      ],
    },
    {
      q: "Як звали кошеня?",
      o: [
        ["Вуглик", "🐈‍⬛"],
        ["Сніжок", "⛄"],
        ["Рудик", "🦊"],
      ],
    },
    {
      q: "Чому кошеня назвали Вуглик?",
      o: [
        ["Воно було зовсім чорне", "⚫"],
        ["Воно було зовсім біле", "⚪"],
        ["Воно жило біля печі", "🔥"],
      ],
    },
  ],
};
