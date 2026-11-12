// «Школа швидкочитання», p. 5 (по складах): the text line by line as printed; shared/speed-reading.js, <body data-game="text">.
// book: true = the book's lines (one row each, «По рядку»); words = the book's count. {name} = a picture from img/texts/name.jpg in place of a word;
// ■ = a missing letter, as printed; cut = the bottom or top of the letters is cut off, as printed (the words underneath are whole).
// The book has no answers: the right answer (first) and the wrong ones are made up from the text; open = told to the adult.
window.TEXT = {
  key: "book-p5",
  title: "На березі блакитного ставка…",
  ic: "🐸",
  cover: "img/texts/cover-p5.jpg",
  page: 5,
  author: "За Н. Чуб",
  words: 42,
  book: true,
  paras: [
    [
      "На бе-ре-зі бла-кит-но-го став-ка жи-ло",
      "ма-лень-ке ве-се-ле жа-бе-ня. Зва-ли йо-го…",
      "пра-виль-но, зва-ли йо-го Квак.",
    ],
    [
      "«Ква! Ква! Ква!» — лу-нав ра-но-вран-ці",
      "йо-го дзвін-кий го-ло-сок, і всі меш-кан-ці",
      "став-ка про-ки-да-лись.",
    ],
    [
      "А вве-че-рі ма-люк ста-ран-но ви-во-див",
      "жа-б’я-чу пі-сень-ку і при цьо-му грав на",
      "справж-ні-сінь-кій ма-лень-кій гі-та-рі!",
    ],
  ],
  q: [
    {
      q: "Добери та запиши заголовок до тексту.",
      o: [
        ["Веселе жабеня Квак", "🐸"],
        ["Сумна рибка", "🐟"],
        ["Зимовий ставок", "❄️"],
      ],
    },
    {
      q: "Хто жив на березі ставка?",
      o: [
        ["Жабеня Квак", "🐸"],
        ["Каченя", "🦆"],
        ["Рибка", "🐟"],
      ],
    },
    {
      q: "Як говорило жабеня?",
      o: [
        ["«Ква! Ква! Ква!»", "🐸"],
        ["«Кря! Кря!»", "🦆"],
        ["«Гав! Гав!»", "🐶"],
      ],
    },
    {
      q: "На якому інструменті грало жабеня?",
      o: [
        ["На гітарі", "🎸"],
        ["На барабані", "🥁"],
        ["На скрипці", "🎻"],
      ],
    },
  ],
};
