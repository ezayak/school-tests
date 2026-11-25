// Français · Grade 3 · Révision for the mid-term exam of Term 2 (« Revision Mid-term 2 »).
// No school sheet: made at the parent's request (2026-11-25) from the lessons already in the app, all from Unité 2 « Voici ma famille ! »
// (unite-2.js, Livre p. 16–25 and the teacher's « V. avoir » slides and sheet):
//   - Voici ma famille: the members of the family, by spelling (Dictée « La famille »);
//   - la famille de Léo et Théo: the name of each member (new exercises « noms », « qui », « relie »);
//   - the numbers 0 to 12, by spelling (Dictée « Les nombres »);
//   - le verbe avoir, by spelling (Dictée « Le verbe avoir »).
// Three build-the-word-from-letters games = the three Dictée entries (the engine makes « Construis les mots / les phrases »
// and « Écris les mots / les phrases » for each). Then the book exercises of Unité 2 on these topics, reused with ref: "u2:k"
// (pictures from img/unite-2, never copied). Left out: the pets, the baby animals and the sound [y] (not named by the parent).
// The page sits next to the lessons (grade-3/term-1/french/) so the pictures and the « Français » link work; its card in games.js is Term 2.
(function () {
  const P = (x) => `unite-2/${x}`;
  // [picture, French word, en, uk, ar]
  const FAMW = [
    ["p1", "famille", "family", "родина", "عائلة"],
    ["p4", "frère", "brother", "брат", "أخ"],
    ["p3", "sœur", "sister", "сестра", "أخت"],
    ["mere", "mère", "mother", "мати", "أم"],
    ["pere", "père", "father", "батько", "أب"],
    ["gm", "grand-mère", "grandmother", "бабуся", "جدّة"],
    ["gp", "grand-père", "grandfather", "дідусь", "جدّ"],
    ["mere", "maman", "mum", "мама", "ماما"],
    ["pere", "papa", "dad", "тато", "بابا"],
  ];
  // [picture, name, « le / la … de Léo et Théo », its question, en, uk, ar]
  // [picture, name, « le / la … de Léo et Théo », en, uk (whom), ar, Il / Elle]
  const WHO = [
    ["mere", "Christine", "la maman", "mum", "маму", "أمّ", "Elle"],
    ["pere", "Jean", "le papa", "dad", "тата", "أب", "Il"],
    ["gm", "Amélie", "la grand-mère", "grandmother", "бабусю", "جدّة", "Elle"],
    ["gp", "Jacques", "le grand-père", "grandfather", "дідуся", "جدّ", "Il"],
    ["p3", "Sophie", "la sœur", "sister", "сестру", "أخت", "Elle"],
  ];
  // uk: « Це мама Лео і Тео. »
  const UK = {
    маму: "мама",
    тата: "тато",
    бабусю: "бабуся",
    дідуся: "дідусь",
    сестру: "сестра",
  };
  const dict = {
    "Comment s’appelle le frère de Léo ?": [
      "What is Léo’s brother called?",
      "Як звати брата Лео?",
      "ما اسم أخي ليو؟",
    ],
    "Combien ?": ["How many?", "Скільки?", "كم؟"],
    "Voici ma famille !": [
      "Here is my family!",
      "Ось моя родина!",
      "هذه عائلتي!",
    ],
    avoir: ["to have", "мати", "يملك (عنده)"],
    avons: ["(we) have", "(ми) маємо", "(نحن) عندنا"],
    avez: ["(you, many) have", "(ви) маєте", "(أنتم) عندكم"],
    ont: ["(they) have", "(вони) мають", "(هم) عندهم"],
    "Qui est Théo ?": ["Who is Théo?", "Хто такий Тео?", "من هو تيو؟"],
    "C’est le frère de Léo.": [
      "He is Léo’s brother.",
      "Це брат Лео.",
      "إنه أخو ليو.",
    ],
  };
  for (const [, fr, en, uk, ar] of FAMW) dict[fr] = [en, uk, ar];
  for (const [, name, who, en, uk, ar, g] of WHO) {
    const she = g === "Elle";
    dict[`Comment s’appelle ${who} de Léo et Théo ?`] = [
      `What is Léo and Théo’s ${en} called?`,
      `Як звати ${uk} Лео і Тео?`,
      `ما اسم ${ar} ليو وتيو؟`,
    ];
    dict[`Qui est ${name} ?`] = [
      `Who is ${name}?`,
      `Хто ${she ? "така" : "такий"} ${name}?`,
      `${she ? "مَن هي" : "مَن هو"} ${name}؟`,
    ];
    dict[`C’est ${who} de Léo et Théo.`] = [
      `It is Léo and Théo’s ${en}.`,
      `Це ${UK[uk]} Лео і Тео.`,
      `${she ? "إنها" : "إنه"} ${ar} ليو وتيو.`,
    ];
  }
  const NUM = window.FR_DATA.u2.phrases.filter((x) => /^n\d+$/.test(x.img));
  // [digit, emoji shown that many times]
  const COUNT = [
    [3, "🐱"],
    [5, "🐟"],
    [7, "🐢"],
    [9, "🐶"],
    [11, "⭐"],
    [12, "🎈"],
  ];
  const near = (n) => (n === 12 ? [11, 10] : [n - 1, n + 1]);

  window.LESSON = {
    n: "r2",
    label: "Révision",
    grade: 3,
    native: true,
    title: "Révision · Mi-terme 2",
    en: "Mid-term 2 revision · the family, Léo and Théo’s family, numbers 0–12, the verb avoir",
    uk: "Повторення до проміжного іспиту 2 · родина, родина Лео і Тео, числа 0–12, дієслово avoir",
    ar: "مراجعة منتصف الفصل الثاني · العائلة، عائلة ليو وتيو، الأعداد 0–12، فعل avoir",
    book: "Unité 2 « Voici ma famille ! » · les nombres · le verbe avoir",
    cover: P("p1"),
    use: ["u2"],

    dictee: [
      {
        k: "famille",
        t: "Voici ma famille !",
        en: "Spelling: the members of the family",
        img: P("p1"),
        from: "Unité 2 · Ma famille (by spelling)",
        words: FAMW.map(([img, fr]) => ({ fr, img: P(img) })),
        sentences: window.FR_DATA.u2.phrases
          .filter((x) => /^(mon|ma) /.test(x.fr))
          .map((x) => ({ fr: x.fr, img: P(x.img) }))
          .concat([{ fr: "Voici ma famille !", img: P("p1") }]),
      },
      {
        k: "nombres",
        t: "Les nombres de 0 à 12",
        en: "Spelling: zéro, un, deux… douze",
        img: P("nombres"),
        from: "Unité 2 · Quel âge as-tu ? (by spelling)",
        words: NUM.map((x) => ({ fr: x.fr, img: P(x.img) })),
        sentences: [
          { fr: "Quel âge as-tu ?", img: P("age") },
          { fr: "J’ai neuf ans.", img: P("p4") },
          { fr: "Sophie a quatre ans.", img: P("p3") },
        ],
      },
      {
        k: "avoir",
        t: "Le verbe avoir",
        en: "Spelling: j’ai, tu as, il a… elles ont",
        img: P("avoir"),
        from: "Le verbe avoir (by spelling)",
        words: [
          { fr: "avoir", img: P("avoir") },
          { fr: "avons", img: P("nous-avons") },
          { fr: "avez", img: P("vous-avez") },
          { fr: "ont", img: P("ils-ont") },
        ],
        sentences: [
          ["J’ai", "j-ai"],
          ["Tu as", "tu-as"],
          ["Il a", "il-a"],
          ["Elle a", "elle-a"],
          ["Nous avons", "nous-avons"],
          ["Vous avez", "vous-avez"],
          ["Ils ont", "ils-ont"],
          ["Elles ont", "elles-ont"],
        ].map(([fr, img]) => ({ fr, img: P(img) })),
      },
    ],

    exercises: [
      {
        k: "noms",
        t: "La famille de Léo et Théo",
        en: "What is their name?",
        img: P("p1"),
        from: "Unité 2 · Livre p. 16–17",
        items: WHO.map(([img, name, who, , , , g]) => ({
          type: "mc",
          img: P(img),
          q: `Comment s’appelle ${who} de Léo et Théo ?`,
          opts: [
            `${g} s’appelle ${name}.`,
            ...WHO.filter((w) => w[6] === g && w[1] !== name)
              .slice(0, 2)
              .map((w) => `${g} s’appelle ${w[1]}.`),
            ...(g === "Il" ? ["Il s’appelle Hector."] : []),
          ].slice(0, 3),
        })).concat({
          type: "mc",
          img: P("p4"),
          q: "Comment s’appelle le frère de Léo ?",
          opts: [
            "Il s’appelle Théo.",
            "Il s’appelle Jean.",
            "Il s’appelle Jacques.",
          ],
        }),
      },
      {
        k: "qui",
        t: "Qui est-ce ?",
        en: "Who is it in Léo and Théo’s family?",
        img: P("p6"),
        from: "Unité 2 · Livre p. 16–17",
        items: WHO.map(([, name, who], i) => ({
          type: "mc",
          emoji: "👨‍👩‍👧‍👦",
          q: `Qui est ${name} ?`,
          opts: [
            `C’est ${who} de Léo et Théo.`,
            ...[1, 2].map(
              (d) => `C’est ${WHO[(i + d) % WHO.length][2]} de Léo et Théo.`,
            ),
          ],
        })).concat({
          type: "mc",
          emoji: "👦👦",
          q: "Qui est Théo ?",
          opts: [
            "C’est le frère de Léo.",
            "C’est le papa de Léo et Théo.",
            "C’est le grand-père de Léo et Théo.",
          ],
        }),
      },
      {
        k: "relie",
        t: "Relie le nom et la personne",
        en: "Match the name and the picture",
        img: P("p6"),
        from: "Unité 2 · Livre p. 16–17",
        items: [
          ["leo", "p4", "p3", "p5"],
          ["mere", "pere", "gm", "gp"],
        ].map((g) => ({
          type: "match",
          pairs: g.map((img) => ({
            img: P(img),
            fr: {
              leo: "Léo",
              p4: "Théo",
              p3: "Sophie",
              p5: "Hector",
              mere: "Christine",
              pere: "Jean",
              gm: "Amélie",
              gp: "Jacques",
            }[img],
          })),
        })),
      },
      {
        k: "reponds",
        t: "Réponds",
        en: "Answer",
        img: P("p1"),
        from: "Livre p. 17 ex. 3",
        ref: "u2:reponds",
      },
      {
        k: "vf",
        t: "Vrai ou faux ?",
        en: "True or false?",
        img: P("p2"),
        from: "Livre p. 17 ex. 2",
        ref: "u2:vf",
      },
      {
        k: "famille-tap",
        t: "Écoute et dis le numéro",
        en: "Listen, tap the person",
        img: P("tablette"),
        from: "Livre p. 18 ex. 5",
        ref: "u2:famille",
      },
      {
        k: "nombres",
        t: "Écoute et associe",
        en: "Numbers 0 to 12: match the number and the word",
        img: P("nombres"),
        from: "Livre p. 19 ex. 7",
        ref: "u2:nombres",
      },
      {
        k: "combien",
        t: "Combien ?",
        en: "Count and choose the number",
        emoji: "🔢",
        from: "Les nombres de 0 à 12",
        items: COUNT.map(([n, e]) => ({
          type: "mc",
          emoji: e.repeat(n),
          q: "Combien ?",
          opts: [n, ...near(n)].map((i) => NUM[i].fr),
        })),
      },
      {
        k: "age",
        t: "Quel âge as-tu ?",
        en: "How old are you? Look at the candles",
        img: P("age"),
        from: "Livre p. 19 ex. 8",
        ref: "u2:age",
      },
      {
        k: "avoir1",
        t: "Complète avec le verbe avoir",
        en: "The verb avoir: pick the right form",
        img: P("avoir"),
        from: "Fiche Le verbe avoir ex. 1",
        ref: "u2:avoir1",
      },
      {
        k: "avoir2",
        t: "Choisis la bonne réponse",
        en: "The verb avoir: choose the right answer",
        img: P("j-ai"),
        from: "Fiche Le verbe avoir ex. 2",
        ref: "u2:avoir2",
      },
    ],

    dict,
  };
})();
