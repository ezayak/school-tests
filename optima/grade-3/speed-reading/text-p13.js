// «Школа швидкочитання», p. 13 (з малюнками): the text line by line as printed; shared/speed-reading.js, <body data-game="text">.
// book: true = the book's lines (one row each, «По рядку»); words = the book's count. {name} = a picture from img/texts/name.jpg in place of a word;
// ■ = a missing letter, as printed; cut = the bottom or top of the letters is cut off, as printed (the words underneath are whole).
// The book has no answers: the right answer (first) and the wrong ones are made up from the text; open = told to the adult.
window.TEXT = {
  key: "book-p13",
  title: "Десь за містом, на маленькій фермі…",
  ic: "🐓",
  cover: "img/texts/farm-rooster.jpg",
  page: 13,
  author: "За Н. Чуб",
  words: 67,
  book: true,
  paras: [
    [
      "Десь за містом, на маленькій фермі жила",
      "собі дружна сімейка: три {farm-hens}, кра-",
      "сень {farm-rooster}, виводок {farm-chicks}, {farm-pig}-",
      "ледащо, розумниця {farm-cow}, {farm-cat}-не-",
      "посида та рудий {farm-dog}. А по сусідству меш-",
      "кала {farm-duck} із трьома {farm-ducklings} — жовтими пух-",
      "настими {farm-yarn}, начебто схожими на курчат,",
      "і в той же час і несхожими… Носики у них",
      "зовсім інші, та найголовніше, на лапках у ка-",
      "ченяток перетинки є спеціальні, тому вони",
      "й плавати уміють! Ось така сімейка!",
    ],
  ],
  q: [
    {
      q: "Із кого складалася дружна сімейка?",
      o: [
        ["Курочки, півень, курчата, свинка, корова, кішка і песик", "🐓"],
        ["Тільки качки", "🦆"],
        ["Зайці", "🐰"],
      ],
    },
    {
      q: "Хто мешкав по сусідству?",
      o: [
        ["Качка з трьома каченятами", "🦆"],
        ["Ведмідь", "🐻"],
        ["Лисиця", "🦊"],
      ],
    },
    {
      q: "Завдяки чому плавають каченята?",
      o: [
        ["Завдяки перетинкам на лапках", "🦶"],
        ["Завдяки носикам", "👃"],
        ["Завдяки пухнастому пір’ю", "🪶"],
      ],
    },
  ],
};
