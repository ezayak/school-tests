// Français · Grade 3 · Leçon 3 « Les consignes de la classe » (the book sheet with 12 pictures,
// Exercices d’application mi-terme 1 ex. 5, Examen final ex. 6).
// All the content of the lesson. The engine is grade-4/term-1/french/french-lesson.js. Pictures: img/lesson-3/<name>.jpg
(function () {
  // [picture, tu, vous, English, Українська (ти / ви), العربية (أنت / أنتم)]
  const C = [
    [
      "leve",
      "Lève-toi !",
      "Levez-vous !",
      "Stand up!",
      ["Встань!", "Встаньте!"],
      ["قف!", "قفوا!"],
    ],
    [
      "assieds",
      "Assieds-toi !",
      "Asseyez-vous !",
      "Sit down!",
      ["Сідай!", "Сідайте!"],
      ["اجلس!", "اجلسوا!"],
    ],
    [
      "prends",
      "Prends le livre !",
      "Prenez le livre !",
      "Take the book!",
      ["Візьми книжку!", "Візьміть книжку!"],
      ["خذ الكتاب!", "خذوا الكتاب!"],
    ],
    [
      "lis",
      "Lis !",
      "Lisez !",
      "Read!",
      ["Читай!", "Читайте!"],
      ["اقرأ!", "اقرؤوا!"],
    ],
    [
      "ecris",
      "Écris !",
      "Écrivez !",
      "Write!",
      ["Пиши!", "Пишіть!"],
      ["اكتب!", "اكتبوا!"],
    ],
    [
      "repete",
      "Répète !",
      "Répétez !",
      "Repeat!",
      ["Повтори!", "Повторіть!"],
      ["كرّر!", "كرّروا!"],
    ],
    [
      "ecoute",
      "Écoute !",
      "Écoutez !",
      "Listen!",
      ["Слухай!", "Слухайте!"],
      ["استمع!", "استمعوا!"],
    ],
    [
      "chante",
      "Chante !",
      "Chantez !",
      "Sing!",
      ["Співай!", "Співайте!"],
      ["غنِّ!", "غنّوا!"],
    ],
    [
      "dessine",
      "Dessine !",
      "Dessinez !",
      "Draw!",
      ["Малюй!", "Малюйте!"],
      ["ارسم!", "ارسموا!"],
    ],
    [
      "colorie",
      "Colorie !",
      "Coloriez !",
      "Colour!",
      ["Розфарбуй!", "Розфарбуйте!"],
      ["لوّن!", "لوّنوا!"],
    ],
    [
      "decoupe",
      "Découpe !",
      "Découpez !",
      "Cut out!",
      ["Виріж!", "Виріжте!"],
      ["قُصّ!", "قُصّوا!"],
    ],
    [
      "colle",
      "Colle !",
      "Collez !",
      "Glue!",
      ["Приклей!", "Приклейте!"],
      ["الصق!", "الصقوا!"],
    ],
  ];
  const DICT = {};
  for (const [, tu, vous, en, uk, ar] of C) {
    DICT[tu] = [en, uk[0], ar[0]];
    DICT[vous] = [`${en} (to the class)`, uk[1], ar[1]];
  }
  Object.assign(DICT, {
    Lis: ["Read", "Читай", "اقرأ"],
    Écris: ["Write", "Пиши", "اكتب"],
    Chante: ["Sing", "Співай", "غنِّ"],
    Dessine: ["Draw", "Малюй", "ارسم"],
    Colle: ["Glue", "Приклей", "الصق"],
    Écoute: ["Listen", "Слухай", "استمع"],
    Colorie: ["Colour", "Розфарбуй", "لوّن"],
    Découpe: ["Cut out", "Виріж", "قُصّ"],
    livre: ["book", "книжка", "كتاب"],
  });
  const byImg = (n) => C.find((c) => c[0] === n);
  // "Écoute et touche": the right picture and two others, the right one in a different place each time
  const tap = (k) => {
    const others = C.filter((_, j) => j !== k)
      .filter((_, j) => (j + k) % 4 === 0)
      .slice(0, 2);
    const opts = [C[k][0], ...others.map((c) => c[0])];
    for (let r = 0; r < k % 3; r++) opts.push(opts.shift());
    return { type: "tap", say: C[k][1], opts, a: C[k][0] };
  };
  const pairs = (names) => names.map((n) => ({ img: n, fr: byImg(n)[1] }));

  window.LESSON = {
    n: 3,
    grade: 3,
    title: "Les consignes de la classe",
    en: "Classroom instructions",
    uk: "Вказівки в класі",
    ar: "تعليمات الصف",
    book: "La feuille « Les consignes de la classe »",
    cover: "consignes",

    learn: [
      { k: "story", img: "leve" },
      { k: "words", img: "lis" },
    ],
    play: [
      {
        k: "game",
        t: "Écoute et touche",
        en: "Listen, tap the picture",
        img: "ecoute",
        items: C.map((_, k) => tap(k)),
      },
      {
        k: "game",
        t: "Relie",
        en: "Match the pictures and the words",
        img: "dessine",
        items: [0, 4, 8].map((s) => ({
          type: "match",
          pairs: pairs(C.slice(s, s + 4).map((c) => c[0])),
        })),
      },
      { k: "bword", img: "ecris" },
    ],

    people: [],

    // One card per instruction: « tu » (to one child)
    phrases: C.map(([img, tu, , en, uk, ar]) => ({
      fr: tu,
      img,
      en,
      uk: uk[0],
      ar: ar[0],
    })),

    // The book sheet: each picture with « tu » and « vous » (to the whole class)
    story: C.map(([img, tu, vous]) => ({
      img,
      lines: [
        { who: "", fr: tu },
        { who: "", fr: vous },
      ],
    })),

    build: [
      { fr: "Lis", img: "lis" },
      { fr: "Écris", img: "ecris" },
      { fr: "Chante", img: "chante" },
      { fr: "Dessine", img: "dessine" },
      { fr: "Colle", img: "colle" },
      { fr: "Écoute", img: "ecoute" },
      { fr: "Colorie", img: "colorie" },
      { fr: "Découpe", img: "decoupe" },
    ],

    exercises: [
      {
        k: "relie",
        t: "Relie",
        en: "Match the pictures and the words",
        img: "leve",
        from: "Mi-terme ex. 5",
        items: [
          {
            type: "match",
            pairs: pairs(["leve", "ecris", "lis", "dessine", "assieds"]),
          },
        ],
      },
      {
        k: "choisis",
        t: "Choisis",
        en: "Match: découpe, écoute, chante",
        img: "decoupe",
        from: "Examen final ex. 6",
        items: [
          { type: "match", pairs: pairs(["decoupe", "ecoute", "chante"]) },
        ],
      },
      {
        k: "ecoute",
        t: "Écoute et touche",
        en: "Listen, tap the picture",
        img: "ecoute",
        from: "Les consignes de la classe",
        items: C.map((_, k) => tap(k)),
      },
    ],

    dict: DICT,
    auto: () => null,
  };
  (window.FR_DATA = window.FR_DATA || {})[3] = window.LESSON;
})();
