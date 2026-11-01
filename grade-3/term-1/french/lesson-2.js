// Français · Grade 3 · Leçon 2 « Les salutations » (the sheet « Les salutations (meaning only) », Devoir noté 2 ex. 2).
// All the content of the lesson. The engine is grade-4/term-1/french/french-lesson.js.
// No pictures of its own: emoji, and Léo, Théo, Lin from Lesson 1 (img: "lesson-1/leo").
(function () {
  const DICT = {
    "Bonjour !": [
      "Hello! / Good morning!",
      "Доброго ранку! / Привіт!",
      "صباح الخير!",
    ],
    "Bonsoir !": ["Good evening!", "Добрий вечір!", "مساء الخير!"],
    "Bonne nuit !": ["Good night!", "На добраніч!", "تصبح على خير!"],
    "Au revoir !": ["Goodbye!", "До побачення!", "إلى اللقاء!"],
    "Salut !": ["Hi! (to a friend)", "Привіт! (другові)", "أهلًا! (لصديق)"],
    bonjour: ["hello / good morning", "доброго ранку / привіт", "صباح الخير"],
    bonsoir: ["good evening", "добрий вечір", "مساء الخير"],
    "bonne nuit": ["good night", "на добраніч", "تصبح على خير"],
    "au revoir": ["goodbye", "до побачення", "إلى اللقاء"],
    salut: ["hi", "привіт", "أهلًا"],
    Bonjour: ["Hello", "Привіт", "مرحبًا"],
    Bonsoir: ["Good evening", "Добрий вечір", "مساء الخير"],
    Salut: ["Hi", "Привіт", "أهلًا"],
    ami: ["friend", "друг", "صديق"],
    matin: ["morning", "ранок", "صباح"],
    soir: ["evening", "вечір", "مساء"],
    nuit: ["night", "ніч", "ليل"],
    "le matin": ["in the morning", "вранці", "في الصباح"],
    "le soir": ["in the evening", "увечері", "في المساء"],
    "avant de dormir": ["before going to sleep", "перед сном", "قبل النوم"],
    "avant de partir": ["before leaving", "перед тим, як піти", "قبل المغادرة"],
    "mon ami": ["my friend", "мій друг", "صديقي"],
    "Le matin, je dis bonjour.": [
      "In the morning, I say good morning.",
      "Вранці я кажу «доброго ранку».",
      "في الصباح أقول: صباح الخير.",
    ],
    "Le soir, je dis bonsoir.": [
      "In the evening, I say good evening.",
      "Увечері я кажу «добрий вечір».",
      "في المساء أقول: مساء الخير.",
    ],
    "Avant de dormir, je dis bonne nuit.": [
      "Before going to sleep, I say good night.",
      "Перед сном я кажу «на добраніч».",
      "قبل النوم أقول: تصبح على خير.",
    ],
    "Avant de partir, je dis au revoir.": [
      "Before leaving, I say goodbye.",
      "Перед тим, як піти, я кажу «до побачення».",
      "قبل المغادرة أقول: إلى اللقاء.",
    ],
    "Pour saluer mon ami, je dis salut.": [
      "To greet my friend, I say hi.",
      "Щоб привітати друга, я кажу «привіт».",
      "لأحيّي صديقي أقول: أهلًا.",
    ],
    "Salut les amis !": ["Hi, friends!", "Привіт, друзі!", "أهلًا يا أصدقاء!"],
    "Moi, c’est Léo.": ["Me, I’m Léo.", "А я — Лео.", "أنا ليو."],
    "Et moi, c’est Théo.": ["And me, I’m Théo.", "А я — Тео.", "وأنا تيو."],
    "C’est mon ami Tony.": [
      "This is my friend Tony.",
      "Це мій друг Тоні.",
      "هذا صديقي توني.",
    ],
    "Tu t’appelles Lin ?": [
      "Is your name Lin?",
      "Тебе звати Лін?",
      "هل اسمك لين؟",
    ],
    "Il s’appelle Karim.": [
      "His name is Karim.",
      "Його звати Карім.",
      "اسمه كريم.",
    ],
    "Et toi ?": ["And you?", "А ти?", "وأنت؟"],
    "Moi…": ["Me…", "Я…", "أنا…"],
  };
  // "Le soir, je dis ___." → the meaning of the question
  const Q = {
    "Le matin, je dis ___.": [
      "In the morning, I say ___.",
      "Вранці я кажу ___.",
      "في الصباح أقول ___.",
    ],
    "Le soir, je dis ___.": [
      "In the evening, I say ___.",
      "Увечері я кажу ___.",
      "في المساء أقول ___.",
    ],
    "Avant de dormir, je dis ___.": [
      "Before going to sleep, I say ___.",
      "Перед сном я кажу ___.",
      "قبل النوم أقول ___.",
    ],
    "Avant de partir, je dis ___.": [
      "Before leaving, I say ___.",
      "Перед тим, як піти, я кажу ___.",
      "قبل المغادرة أقول ___.",
    ],
    "Pour saluer mon ami, je dis ___.": [
      "To greet my friend, I say ___.",
      "Щоб привітати друга, я кажу ___.",
      "لأحيّي صديقي أقول ___.",
    ],
  };
  Object.assign(DICT, Q);

  // the five greetings: [word, when, emoji]
  const G = [
    ["bonjour", "Le matin", "🌅"],
    ["bonsoir", "Le soir", "🌆"],
    ["bonne nuit", "Avant de dormir", "🌙😴"],
    ["au revoir", "Avant de partir", "👋🚪"],
    ["salut", "Pour saluer mon ami", "🧒🤝"],
  ];
  const cap = (t) => t[0].toUpperCase() + t.slice(1);

  window.LESSON = {
    n: 2,
    grade: 3,
    title: "Les salutations",
    en: "Greetings",
    uk: "Привітання",
    ar: "التحيات",
    book: "La feuille « Les salutations » · Devoir noté 2",
    cover: "lesson-1/bonjour",

    learn: [
      { k: "story", emoji: "🌅" },
      { k: "words", emoji: "👋" },
    ],
    play: [
      {
        k: "game",
        t: "Qu’est-ce que je dis ?",
        en: "Which greeting?",
        emoji: "🌆",
        items: G.map(([w, when, e]) => ({
          type: "mc",
          emoji: e,
          q: `${when}, je dis ___.`,
          opts: [
            w,
            ...G.filter((x) => x[0] !== w)
              .map((x) => x[0])
              .slice(0, 2),
          ],
        })),
      },
      {
        k: "game",
        t: "Relie",
        en: "Match the picture and the greeting",
        emoji: "🔗",
        items: [
          {
            type: "match",
            pairs: G.map(([w, , e]) => ({ emoji: e, fr: cap(w) + " !" })),
          },
        ],
      },
      { k: "bword", emoji: "🔤" },
      { k: "bsent", emoji: "🧱" },
    ],

    people: [],

    // Words & phrases to say (flash cards)
    phrases: [
      {
        fr: "Bonjour !",
        emoji: "🌅",
        en: "Hello! / Good morning!",
        uk: "Доброго ранку! / Привіт!",
        ar: "صباح الخير!",
      },
      {
        fr: "Bonsoir !",
        emoji: "🌆",
        en: "Good evening!",
        uk: "Добрий вечір!",
        ar: "مساء الخير!",
      },
      {
        fr: "Bonne nuit !",
        emoji: "🌙😴",
        en: "Good night!",
        uk: "На добраніч!",
        ar: "تصبح على خير!",
      },
      {
        fr: "Au revoir !",
        emoji: "👋🚪",
        en: "Goodbye!",
        uk: "До побачення!",
        ar: "إلى اللقاء!",
      },
      {
        fr: "Salut !",
        emoji: "🧒🤝",
        en: "Hi! (to a friend)",
        uk: "Привіт! (другові)",
        ar: "أهلًا! (لصديق)",
      },
      {
        fr: "Salut les amis !",
        img: "lesson-1/leo",
        en: "Hi, friends!",
        uk: "Привіт, друзі!",
        ar: "أهلًا يا أصدقاء!",
      },
      {
        fr: "Moi, c’est Léo.",
        img: "lesson-1/leo",
        en: "Me, I’m Léo.",
        uk: "А я — Лео.",
        ar: "أنا ليو.",
      },
      {
        fr: "Et moi, c’est Théo.",
        img: "lesson-1/theo",
        en: "And me, I’m Théo.",
        uk: "А я — Тео.",
        ar: "وأنا تيو.",
      },
      { fr: "Et toi ?", emoji: "👉", en: "And you?", uk: "А ти?", ar: "وأنت؟" },
    ],

    // The greetings sheet, one sentence per picture; then the dialogue of Devoir noté 2.
    story: [
      ...G.map(([w, when, e]) => ({
        emoji: e,
        lines: [{ who: "", fr: `${when}, je dis ${w}.` }],
      })),
      {
        img: "lesson-1/leo",
        title: "Léo et Théo",
        lines: [
          { who: "", fr: "Salut les amis !" },
          { who: "", fr: "Moi, c’est Léo." },
          { who: "", fr: "Et moi, c’est Théo." },
        ],
      },
    ],

    sentences: [
      ...G.map(([w, when, e]) => ({ fr: `${when}, je dis ${w}.`, emoji: e })),
      { fr: "Salut les amis !", img: "lesson-1/leo" },
      { fr: "Moi, c’est Léo.", img: "lesson-1/leo" },
      { fr: "Et moi, c’est Théo.", img: "lesson-1/theo" },
    ],

    build: [
      { fr: "Bonjour", emoji: "🌅" },
      { fr: "Bonsoir", emoji: "🌆" },
      { fr: "nuit", emoji: "🌙" },
      { fr: "Salut", emoji: "🧒🤝" },
      { fr: "matin", emoji: "🌅" },
      { fr: "soir", emoji: "🌆" },
      { fr: "ami", emoji: "🧒🧒" },
    ],

    exercises: [
      {
        k: "quand",
        t: "Complète avec les mots de salutations",
        en: "Which greeting do I say?",
        emoji: "🌆",
        from: "Les salutations · Examen final ex. 2",
        items: G.map(([w, when, e]) => ({
          type: "mc",
          emoji: e,
          q: `${when}, je dis ___.`,
          opts: [
            w,
            ...G.filter((x) => x[0] !== w)
              .map((x) => x[0])
              .slice(0, 2),
          ],
        })),
      },
      {
        k: "complete",
        t: "Complète avec : c’est – salut – et moi – s’appelle – tu",
        en: "Complete the sentence",
        img: "lesson-1/theo",
        from: "Devoir noté 2 ex. 2",
        keep: true,
        items: [
          ["🧒🤝", "___ les amis !", "Salut", "C’est", "Tu"],
          ["🧒🧒", "___ mon ami Tony.", "C’est", "Salut", "Et moi"],
          [
            "lesson-1/theo",
            "Moi, c’est Léo. ___, c’est Théo.",
            "Et moi",
            "Salut",
            "Tu",
          ],
          ["lesson-1/lin", "___ t’appelles Lin ?", "Tu", "C’est", "Et moi"],
          ["👦", "Il ___ Karim.", "s’appelle", "c’est", "salut"],
        ].map(([p, q, ...opts]) => ({
          type: "mc",
          ...(/^[a-z0-9/-]+$/.test(p) ? { img: p } : { emoji: p }),
          q,
          opts,
        })),
      },
      {
        k: "relie",
        t: "Relie",
        en: "Match the picture and the greeting",
        emoji: "🔗",
        from: "Les salutations",
        items: [
          {
            type: "match",
            pairs: G.map(([w, , e]) => ({ emoji: e, fr: cap(w) + " !" })),
          },
        ],
      },
    ],

    dict: DICT,
    auto(fr) {
      const out = [];
      for (const s of fr.match(/[^.!?]+[.!?]*/g) || []) {
        const k = s.trim();
        const t = DICT[k] || DICT[k.replace(/\.$/, "")];
        if (!t) return null;
        out.push(t);
      }
      return out.length
        ? [0, 1, 2].map((i) => out.map((t) => t[i]).join(" "))
        : null;
    },
  };
  (window.FR_DATA = window.FR_DATA || {})[2] = window.LESSON;
})();
