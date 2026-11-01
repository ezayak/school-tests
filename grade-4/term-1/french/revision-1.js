// Français · Grade 4 · Révision for the final exam of Term 1 (Leçons 1 and 2).
// Made from the school sheet « 1er terme Exercices d’application » (29 Oct), plus the Lesson 1 and 2 exercises it practises.
// The page also loads lesson-1.js and lesson-2.js: their translations are used (use: [1, 2]),
// and ref: "2:phrase" takes the items of exercise "phrase" of Lesson 2 (with its pictures).
// Pictures: img: "lesson-1/fouad" (a lesson's folder) or emoji: "📏".
(function () {
  window.LESSON = {
    n: "r1",
    label: "Révision",
    grade: 4,
    title: "Révision",
    en: "Final exam revision · Leçons 1 et 2",
    uk: "Повторення до підсумкового іспиту · Уроки 1 і 2",
    ar: "مراجعة الامتحان النهائي · الدرسان 1 و2",
    book: "1er terme · Exercices d’application",
    cover: "lesson-2/comic",
    use: [1, 2],

    exercises: [
      {
        k: "ordre",
        t: "Mets en ordre",
        en: "Put the words in order",
        img: "lesson-1/ph-fouad",
        from: "Exercices d’application ex. 1",
        items: [
          { type: "order", fr: "Il s’appelle Fouad.", img: "lesson-1/fouad" },
          {
            type: "order",
            fr: "Toi, tu t’appelles Stéphanie ?",
            img: "lesson-1/r2",
          },
          { type: "order", fr: "J’ai une gomme rouge.", emoji: "🧽🟥" },
          { type: "order", fr: "Comment tu t’appelles ?", img: "lesson-1/ask" },
          { type: "order", fr: "Il s’appelle Mounir.", img: "lesson-1/mounir" },
          { type: "order", fr: "Nous avons des règles.", emoji: "📏📏" },
        ],
      },
      {
        k: "verbe",
        t: "Conjugue le verbe « s’appeler »",
        en: "Complete the verb s’appeler",
        img: "lesson-1/verbe",
        from: "Exercices d’application ex. 2 et 3",
        keep: true,
        items: [
          {
            type: "fill",
            img: "lesson-1/alice",
            parts: [
              "Elle ",
              ["s’appelle", "t’appelles", "m’appelle"],
              " Alice.",
            ],
            ans: ["s’appelle"],
          },
          {
            type: "fill",
            img: "lesson-1/bouli",
            parts: [
              "Tu ",
              ["s’appelle", "t’appelles", "m’appelle"],
              " Bouli ?",
            ],
            ans: ["t’appelles"],
          },
          {
            type: "fill",
            img: "lesson-1/noura",
            parts: ["Je ", ["m’", "t’", "s’"], "appel", ["le", "les"]],
            ans: ["m’", "le"],
          },
          {
            type: "fill",
            img: "lesson-1/mounir-talk",
            parts: ["Tu ", ["m’", "t’", "s’"], "appel", ["le", "les"]],
            ans: ["t’", "les"],
          },
          {
            type: "fill",
            img: "lesson-1/bouli",
            parts: ["Il ", ["m’", "t’", "s’"], "appel", ["le", "les"]],
            ans: ["s’", "le"],
          },
          {
            type: "fill",
            img: "lesson-1/alice",
            parts: ["Elle ", ["m’", "t’", "s’"], "appel", ["le", "les"]],
            ans: ["s’", "le"],
          },
        ],
      },
      {
        k: "regarde",
        t: "Regarde les images et écris",
        en: "Look at the pictures and write",
        img: "lesson-1/minou-face",
        from: "Exercices d’application ex. 4",
        items: [
          {
            type: "order",
            img: "lesson-1/minou-face",
            q: "Comment il s’appelle ?",
            fr: "Il s’appelle Minou.",
          },
          {
            type: "order",
            img: "lesson-1/alice-face",
            q: "Comment elle s’appelle ?",
            fr: "Elle s’appelle Alice.",
          },
        ],
      },
      {
        k: "on",
        t: "Écris des mots avec le son « on »",
        en: "Build words with « on »",
        img: "lesson-2/bongo",
        from: "Exercices d’application ex. 5 · Livre p. 14",
        items: [
          ["Non", "", "👎"],
          ["Bongo", "lesson-2/bongo"],
          ["Bonjour", "lesson-1/panel2"],
          ["garçon", "lesson-2/fouad"],
          ["Simon", "lesson-2/simon"],
          ["mouton", "lesson-2/mouton"],
        ].map(([fr, img, emoji]) => ({
          type: "letters",
          fr,
          ...(img ? { img } : { emoji }),
        })),
      },
      {
        k: "ch",
        t: "Écris des mots avec le son « ch »",
        en: "Build words with « ch »",
        img: "lesson-2/michou",
        from: "Exercices d’application ex. 6 · Livre p. 14",
        items: [
          ["chat", "lesson-2/minou"],
          ["chien", "lesson-2/bongo"],
          ["Michou", "lesson-2/michou"],
          ["Chirine", "lesson-2/chirine"],
          ["Chadi", "lesson-2/chadi"],
        ].map(([fr, img]) => ({ type: "letters", fr, img })),
      },
      {
        k: "phrase",
        t: "Mets un (x) si c’est une phrase",
        en: "Is it a sentence?",
        emoji: "✅❌",
        from: "Exercices d’application ex. 6 · Cahier p. 7 ex. 5",
        ref: "2:phrase",
      },
      {
        k: "reponds",
        t: "Réponds",
        en: "Look at the picture and answer",
        img: "lesson-2/parle-10",
        from: "Exercices d’application ex. 7",
        items: [
          {
            type: "order",
            img: "lesson-2/parle-11",
            q: "C’est un homme ?",
            fr: "Non, c’est une femme et une fille.",
          },
          {
            type: "order",
            img: "lesson-2/parle-10",
            q: "C’est une fille et un mouton ?",
            fr: "Non, c’est un homme et un mouton.",
          },
          {
            type: "order",
            img: "lesson-2/parle-9",
            q: "C’est un garçon ?",
            fr: "Oui, c’est un garçon et une femme.",
          },
        ],
      },
      {
        k: "ponct",
        t: "Complète avec . ? !",
        en: "Add the end mark",
        emoji: "❓❗",
        from: "Travail de classe 2",
        ref: "2:ponct",
      },
      {
        k: "maj",
        t: "La majuscule",
        en: "Add the capital letter",
        emoji: "🔠",
        from: "Cahier p. 7 ex. 6",
        ref: "2:maj",
      },
      {
        k: "parle",
        t: "C’est un garçon ?",
        en: "Look and answer: oui or non",
        img: "lesson-2/chadi",
        from: "Leçon 2 · Livre p. 11",
        ref: "2:parle",
      },
      {
        k: "qui",
        t: "Qui est-ce ?",
        en: "Who is it?",
        img: "lesson-1/qui-2",
        from: "Leçon 1 · Livre p. 9",
        ref: "1:qui",
      },
    ],

    // Translations of the sentences that are in neither lesson.
    dict: {
      "J’ai une gomme rouge.": [
        "I have a red eraser.",
        "У мене є червона гумка.",
        "عندي ممحاة حمراء.",
      ],
      "Nous avons des règles.": [
        "We have rulers.",
        "У нас є лінійки.",
        "عندنا مساطر.",
      ],
      "Je m’appelle": ["My name is…", "Мене звати…", "اسمي…"],
      "Tu t’appelles": ["Your name is…", "Тебе звати…", "اسمك…"],
      "Il s’appelle": ["His name is…", "Його звати…", "اسمه…"],
      "Elle s’appelle": ["Her name is…", "Її звати…", "اسمها…"],
    },
  };
})();
