// Français · Grade 3 · Léo et Théo Plus 1 · Unité 0 « Bienvenue ! » (Livre p. 4–7): Tu parles déjà français !,
// Que fais-tu à l’école ?, L’alphabet, the new friends. Book exercises only (the teacher's lessons are lesson-N.js).
// Left out: ex. 2 (Connais-tu d’autres mots français ?), ex. 7 (song, no words printed), ex. 8 (Loto des lettres, a class game).
// The engine is grade-4/term-1/french/french-lesson.js. Pictures: img/unite-0/<name>.jpg (cropped from the book scan out4, out5).
(function () {
  // ex. 1: [word, picture, number in the book, English, Українська, العربية]
  const W = [
    ["menu", "menu", 7, "menu", "меню", "قائمة الطعام"],
    ["biberon", "biberon", 2, "baby bottle", "пляшечка", "رضّاعة"],
    ["taxi", "taxi", 1, "taxi", "таксі", "سيارة أجرة"],
    ["champignon", "champignon", 10, "mushroom", "гриб", "فطر"],
    ["boutique", "boutique", 4, "shop", "крамниця", "متجر"],
    ["hôtel", "hotel", 5, "hotel", "готель", "فندق"],
    ["souvenir", "souvenir", 6, "souvenir", "сувенір", "تذكار"],
    ["crêpe", "crepe", 9, "crêpe (pancake)", "млинець", "كريب"],
    ["chef", "chef", 3, "chef (cook)", "шеф-кухар", "طاهٍ"],
    ["croissant", "croissant", 8, "croissant", "круасан", "كرواسون"],
  ];
  // ex. 3: [picture, tu, vous, English, Українська (ти / ви), العربية (أنت / أنتم)]
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
  // ex. 4 « Jacques a dit… »: the vous form after "Jacques a dit…", as in the book's bubble (« Jacques a dit… écrivez ! »)
  const jacques = (vous) =>
    `Jacques a dit… ${vous[0].toLowerCase()}${vous.slice(1)}`;

  const DICT = {
    "Jacques a dit…": ["Simon says…", "Жак сказав…", "جاك قال…"],
    "Combien de lettres a l’alphabet français ?": [
      "How many letters does the French alphabet have?",
      "Скільки літер у французькій абетці?",
      "كم حرفًا في الأبجدية الفرنسية؟",
    ],
    "Combien de lettres a ton alphabet ?": [
      "How many letters does your alphabet have?",
      "Скільки літер у твоїй абетці?",
      "كم حرفًا في أبجديتك؟",
    ],
    "26 lettres": ["26 letters", "26 літер", "26 حرفًا"],
    "28 lettres": ["28 letters", "28 літер", "28 حرفًا"],
    "33 lettres": ["33 letters", "33 літери", "33 حرفًا"],
    "les voyelles : A E I O U Y": [
      "the vowels: A E I O U Y",
      "голосні: A E I O U Y",
      "حروف العلة: A E I O U Y",
    ],
    "les consonnes : B C D…": [
      "the consonants: B C D… (all the other letters)",
      "приголосні: B C D… (усі інші літери)",
      "الحروف الساكنة: B C D… (باقي الحروف)",
    ],
  };
  for (const [w, , , en, uk, ar] of W) DICT[w] = [en, uk, ar];
  for (const [, tu, vous, en, uk, ar] of C) {
    DICT[tu] = [en, uk[0], ar[0]];
    DICT[vous] = [`${en} (to the class)`, uk[1], ar[1]];
    DICT[jacques(vous)] = [
      `Simon says… ${en[0].toLowerCase()}${en.slice(1)}`,
      `Жак сказав… ${uk[1][0].toLowerCase()}${uk[1].slice(1)}`,
      `جاك قال… ${ar[1]}`,
    ];
  }
  const VOY = "AEIOUY";
  for (const l of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    const v = VOY.includes(l);
    DICT[l] = [l, l, l];
    DICT[`${l} est une ${v ? "voyelle" : "consonne"}.`] = [
      `${l} is a ${v ? "vowel" : "consonant"}.`,
      `${l} — ${v ? "голосна" : "приголосна"}.`,
      `${l} ${v ? "حرف علة" : "حرف ساكن"}.`,
    ];
  }
  DICT["🔤 C’est une voyelle ?"] = [
    "Is it a vowel?",
    "Це голосна?",
    "هل هو حرف علة؟",
  ];

  // "Écoute et touche": the right picture and two others, the right one in a different place each time
  const tapOf = (list, k, say) => {
    const others = list
      .filter((_, j) => j !== k)
      .filter((_, j) => (j + k) % 3 === 0)
      .slice(0, 2);
    const opts = [list[k][1], ...others.map((x) => x[1])];
    for (let r = 0; r < k % 3; r++) opts.push(opts.shift());
    return { type: "tap", say, opts, a: list[k][1] };
  };
  // C has the picture first: the same game with [_, picture] rows
  const CP = C.map((c) => [c[1], c[0]]);
  const letterYN = (l) => {
    const v = VOY.includes(l);
    return {
      type: "yn",
      emoji: l,
      fr: l,
      a: v,
      ask: "🔤 C’est une voyelle ?",
      x: `${l} est une ${v ? "voyelle" : "consonne"}.`,
      ...(v ? {} : { fix: `${l} est une consonne.` }),
    };
  };
  const pairs = (rows) => rows.map(([fr, img]) => ({ img, fr }));

  window.LESSON = {
    n: 0,
    key: "fr3-u0",
    imgDir: "unite-0",
    label: "Unité 0",
    grade: 3,
    title: "Bienvenue !",
    en: "Welcome! · French words you already know, classroom instructions, the alphabet",
    uk: "Ласкаво просимо! · Французькі слова, які ти вже знаєш, вказівки в класі, абетка",
    ar: "أهلًا وسهلًا! · كلمات فرنسية تعرفها، تعليمات الصف، الأبجدية",
    book: "Léo et Théo Plus 1 · Livre p. 4–7",
    cover: "amis",

    learn: [
      { k: "story", img: "leve" },
      { k: "words", img: "croissant" },
    ],
    play: [
      { k: "listen", img: "taxi" },
      { k: "match", img: "chef" },
      {
        k: "game",
        t: "Écoute et touche",
        en: "Listen, tap the picture",
        img: "ecoute",
        items: C.map((c, k) => tapOf(CP, k, c[1])),
      },
      { k: "bword", img: "crepe" },
    ],

    // ex. 9: the new friends
    people: [
      {
        fr: "Léo",
        img: "leo",
        g: "il",
        en: "Léo, a boy",
        uk: "Лео, хлопчик",
        ar: "ليو، ولد",
      },
      {
        fr: "Théo",
        img: "theo",
        g: "il",
        en: "Théo, Léo’s twin brother",
        uk: "Тео, брат-близнюк Лео",
        ar: "تيو، توأم ليو",
      },
      {
        fr: "Lin",
        img: "lin",
        g: "elle",
        en: "Lin, a girl",
        uk: "Лін, дівчинка",
        ar: "لين، بنت",
      },
      {
        fr: "Ahmed",
        img: "ahmed",
        g: "il",
        en: "Ahmed, a boy",
        uk: "Ахмед, хлопчик",
        ar: "أحمد، ولد",
      },
      {
        fr: "Isabelle",
        img: "isabelle",
        g: "elle",
        en: "Isabelle, a girl",
        uk: "Ізабель, дівчинка",
        ar: "إيزابيل، بنت",
      },
      {
        fr: "Hector",
        img: "hector",
        g: "il",
        en: "Hector, the ferret",
        uk: "Гектор, тхір",
        ar: "هكتور، ابن مقرض",
      },
    ],

    // ex. 1 (the 10 words) and ex. 5 (vowels and consonants)
    phrases: [
      ...W.map(([fr, img, , en, uk, ar]) => ({ fr, img, en, uk, ar })),
      {
        fr: "les voyelles : A E I O U Y",
        img: "voyelles",
        en: "the vowels: A E I O U Y",
        uk: "голосні: A E I O U Y",
        ar: "حروف العلة: A E I O U Y",
      },
      {
        fr: "les consonnes : B C D…",
        img: "alphabet",
        en: "the consonants: all the other letters",
        uk: "приголосні: усі інші літери",
        ar: "الحروف الساكنة: باقي الحروف",
      },
    ],

    // ex. 3 « Que fais-tu à l’école ? »: each picture with « tu » and « vous »
    story: C.map(([img, tu, vous]) => ({
      img,
      lines: [
        { who: "", fr: tu },
        { who: "", fr: vous },
      ],
    })),

    build: W.map(([fr, img]) => ({ fr, img })),

    exercises: [
      {
        k: "mots",
        t: "Écoute et dis le numéro",
        en: "Listen, tap the picture",
        img: "taxi",
        from: "Livre p. 4 ex. 1",
        items: W.map((w, k) => tapOf(W, k, w[0])),
      },
      {
        k: "relie",
        t: "Tu parles déjà français !",
        en: "Match the pictures and the words",
        img: "boutique",
        from: "Livre p. 4 ex. 1",
        items: [0, 5].map((s) => ({
          type: "match",
          pairs: pairs(W.slice(s, s + 5)),
        })),
      },
      {
        k: "consignes",
        t: "Écoute et répète",
        en: "Listen, tap the picture",
        img: "lis",
        from: "Livre p. 5 ex. 3",
        items: C.map((c, k) => tapOf(CP, k, c[1])),
      },
      {
        k: "jacques",
        t: "Écoute et joue à Jacques a dit… !",
        en: "Simon says…: listen, tap the picture",
        img: "ecris",
        from: "Livre p. 5 ex. 4",
        items: C.map((c, k) => tapOf(CP, k, jacques(c[2]))),
      },
      {
        k: "voyelles",
        t: "Les voyelles",
        en: "Is it a vowel?",
        img: "voyelles",
        from: "Livre p. 6 ex. 5",
        keep: true,
        items: "ABECIDOUY".split("").map(letterYN),
      },
      {
        k: "reponds",
        t: "Réponds",
        en: "Answer",
        img: "alphabet",
        from: "Livre p. 6 ex. 6",
        keep: true,
        items: [
          {
            type: "mc",
            img: "alphabet",
            q: "Combien de lettres a l’alphabet français ?",
            opts: ["26 lettres", "28 lettres", "33 lettres"],
          },
          // the boy's own alphabets: Ukrainian (33) and Arabic (28)
          {
            type: "mc",
            emoji: "🇺🇦",
            q: "Combien de lettres a ton alphabet ?",
            opts: ["33 lettres", "26 lettres", "28 lettres"],
          },
          {
            type: "mc",
            emoji: "أ ب ت",
            q: "Combien de lettres a ton alphabet ?",
            opts: ["28 lettres", "26 lettres", "33 lettres"],
          },
        ],
      },
      {
        k: "prenoms",
        t: "Écoute les prénoms épelés de nos nouveaux amis",
        en: "Build the names of the new friends from their letters",
        img: "amis",
        from: "Livre p. 7 ex. 9",
        items: [
          ["Léo", "leo"],
          ["Théo", "theo"],
          ["Lin", "lin"],
          ["Ahmed", "ahmed"],
          ["Isabelle", "isabelle"],
          ["Hector", "hector"],
        ].map(([fr, img]) => ({ type: "letters", fr, img })),
      },
      {
        k: "epelle",
        t: "Épelle le prénom d’un camarade",
        en: "Spell a classmate’s name: M-A-R-I-E",
        img: "epelle",
        from: "Livre p. 7 ex. 10",
        items: [{ type: "letters", fr: "Marie", img: "epelle" }],
      },
    ],

    dict: DICT,
    auto: () => null,
  };
  (window.FR_DATA = window.FR_DATA || {}).u0 = window.LESSON;
})();
