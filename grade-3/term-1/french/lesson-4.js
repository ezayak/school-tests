// Français · Grade 3 · Leçon 4 « Les lettres et les mots » (vowels and consonants; French words with pictures:
// Exercices d’application mi-terme 1 ex. 4, 6, 7 · Travail de classe 2 · Examen final ex. 3).
// All the content of the lesson. The engine is grade-4/term-1/french/french-lesson.js. Pictures: img/lesson-4/<name>.jpg
(function () {
  const VOY = "AEIOUY";
  const isV = (l) => VOY.includes(l);
  // [word, picture or emoji, English, Українська, العربية]
  const W = [
    ["biberon", "biberon", "baby bottle", "пляшечка", "رضّاعة"],
    ["chef", "chef", "chef (cook)", "шеф-кухар", "طاهٍ"],
    ["collier", "collier", "necklace", "намисто", "عقد"],
    ["croissant", "croissant", "croissant", "круасан", "كرواسون"],
    ["hôtel", "🏨", "hotel", "готель", "فندق"],
    ["taxi", "taxi", "taxi", "таксі", "سيارة أجرة"],
    ["restaurant", "🍽️", "restaurant", "ресторан", "مطعم"],
    ["menu", "menu", "menu", "меню", "قائمة الطعام"],
    ["crêpe", "crepe", "crêpe (pancake)", "млинець", "كريب"],
    ["garage", "garage", "garage", "гараж", "مرآب"],
  ];
  const P = (x) => (/^[a-z0-9/-]+$/.test(x) ? { img: x } : { emoji: x });
  const pic = (w) => P(W.find((x) => x[0] === w)[1]);

  const DICT = {
    "les voyelles : a, e, i, o, u, y": [
      "the vowels: a, e, i, o, u, y",
      "голосні: a, e, i, o, u, y",
      "حروف العلة: a, e, i, o, u, y",
    ],
    "les consonnes : b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, z":
      [
        "the consonants: all the other letters",
        "приголосні: усі інші літери",
        "الحروف الساكنة: باقي الحروف",
      ],
    "une voyelle": ["a vowel", "голосна", "حرف علة"],
    "une consonne": ["a consonant", "приголосна", "حرف ساكن"],
    "Qu’est-ce que c’est ?": ["What is it?", "Що це?", "ما هذا؟"],
  };
  for (const [w, , en, uk, ar] of W) {
    DICT[w] = [en, uk, ar];
    const art = w === "crêpe" ? "une" : "un";
    DICT[`C’est ${art} ${w}.`] = [`It’s a ${en}.`, `Це ${uk}.`, `هذا ${ar}.`];
  }
  // a letter → "A est une voyelle."
  const letterYN = (l, ask) => {
    const v = isV(l);
    const a = ask === "voyelle" ? v : !v;
    return {
      type: "yn",
      emoji: l,
      fr: l,
      a,
      ask: `🔤 C’est une ${ask} ?`,
      x: `${l} est une ${v ? "voyelle" : "consonne"}.`,
      ...(a ? {} : { fix: `${l} est une ${v ? "voyelle" : "consonne"}.` }),
    };
  };
  for (const l of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    const v = isV(l);
    DICT[l] = [l, l, l];
    DICT[`${l} est une ${v ? "voyelle" : "consonne"}.`] = [
      `${l} is a ${v ? "vowel" : "consonant"}.`,
      `${l} — ${v ? "голосна" : "приголосна"}.`,
      `${l} ${v ? "حرف علة" : "حرف ساكن"}.`,
    ];
    DICT[`« ${l} » : c’est une voyelle ou une consonne ?`] = [
      `“${l}”: a vowel or a consonant?`,
      `«${l}»: голосна чи приголосна?`,
      `«${l}»: حرف علة أم حرف ساكن؟`,
    ];
  }
  const what = (w, k) => {
    const others = W.filter((x) => x[0] !== w)
      .filter((_, j) => (j + k) % 3 === 0)
      .slice(0, 2);
    return {
      type: "mc",
      ...pic(w),
      q: "Qu’est-ce que c’est ?",
      opts: [w, ...others.map((x) => x[0])],
      full: `C’est ${w === "crêpe" ? "une" : "un"} ${w}.`,
    };
  };

  window.LESSON = {
    n: 4,
    grade: 3,
    title: "Les lettres et les mots",
    en: "Letters and words",
    uk: "Літери і слова",
    ar: "الحروف والكلمات",
    book: "Les feuilles de mi-terme et le Travail de classe 2",
    cover: "croissant",

    learn: [{ k: "words", img: "croissant" }],
    play: [
      {
        k: "game",
        t: "Voyelle ou consonne ?",
        en: "Vowel or consonant?",
        emoji: "🔤",
        items: "ABCDEFGILMNOPRSTUYZ".split("").map((l) => ({
          type: "mc",
          emoji: l,
          q: `« ${l} » : c’est une voyelle ou une consonne ?`,
          opts: isV(l)
            ? ["une voyelle", "une consonne"]
            : ["une consonne", "une voyelle"],
          two: true,
          full: `${l} est une ${isV(l) ? "voyelle" : "consonne"}.`,
        })),
      },
      {
        k: "game",
        t: "Qu’est-ce que c’est ?",
        en: "What is it?",
        img: "taxi",
        items: W.map((x, k) => what(x[0], k)),
      },
      {
        k: "game",
        t: "Relie",
        en: "Match the pictures and the words",
        img: "chef",
        items: [W.slice(0, 5), W.slice(5)].map((r) => ({
          type: "match",
          pairs: r.map(([w, p]) => ({ ...P(p), fr: w })),
        })),
      },
      { k: "bword", img: "crepe" },
    ],

    people: [],

    phrases: [
      {
        fr: "les voyelles : a, e, i, o, u, y",
        emoji: "🅰️",
        en: "the vowels: a, e, i, o, u, y",
        uk: "голосні: a, e, i, o, u, y",
        ar: "حروف العلة: a, e, i, o, u, y",
      },
      {
        fr: "les consonnes : b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, z",
        emoji: "🅱️",
        en: "the consonants: all the other letters",
        uk: "приголосні: усі інші літери",
        ar: "الحروف الساكنة: باقي الحروف",
      },
      ...W.map(([w, p, en, uk, ar]) => ({ fr: w, ...P(p), en, uk, ar })),
    ],

    build: W.map(([w, p]) => ({ fr: w, ...P(p) })),

    exercises: [
      {
        k: "voyelles",
        t: "Entoure les voyelles",
        en: "Is it a vowel?",
        emoji: "🅰️",
        from: "Travail de classe 2 ex. D",
        keep: true,
        items: "BEROSUTA".split("").map((l) => letterYN(l, "voyelle")),
      },
      {
        k: "consonnes",
        t: "Entoure les lettres consonnes",
        en: "Is it a consonant?",
        emoji: "🅱️",
        from: "Mi-terme ex. 4",
        keep: true,
        items: "ACEPLUNFOZYMBGI".split("").map((l) => letterYN(l, "consonne")),
      },
      {
        k: "quest",
        t: "Qu’est-ce que c’est ?",
        en: "What is it?",
        img: "chef",
        from: "Mi-terme ex. 6 et 7",
        items: [
          "biberon",
          "chef",
          "collier",
          "croissant",
          "menu",
          "taxi",
          "crêpe",
          "garage",
        ].map((w, k) => what(w, k)),
      },
      {
        k: "relie",
        t: "Relie chaque mot avec son dessin",
        en: "Match each word and its picture",
        img: "biberon",
        from: "Travail de classe 2 ex. 1",
        items: [
          {
            type: "match",
            pairs: ["biberon", "croissant", "collier"].map((w) => ({
              ...pic(w),
              fr: w,
            })),
          },
        ],
      },
      {
        k: "ecris",
        t: "Écris le mot",
        en: "Build the word from its letters",
        img: "garage",
        from: "Mi-terme ex. 7 (menu, taxi, crêpe, garage)",
        items: ["menu", "taxi", "crêpe", "garage"].map((w) => ({
          type: "letters",
          fr: w,
          ...pic(w),
        })),
      },
    ],

    dict: DICT,
    auto: () => null,
  };
  (window.FR_DATA = window.FR_DATA || {})[4] = window.LESSON;
})();
