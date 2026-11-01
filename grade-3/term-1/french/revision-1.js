// Français · Grade 3 · Révision for the final exam of Term 1.
// Made from the school sheet « Exercices d’application · Examen final · 1er terme » (29 Oct), in its order,
// then the main exercises of the lessons. The page also loads lesson-1.js … lesson-4.js:
// their translations are used (use) and ref: "2:quand" takes exercise "quand" of Lesson 2 with its pictures.
(function () {
  const verb = (img, p, el, end) => ({
    type: "fill",
    img,
    parts: [p + " ", ["m’", "t’", "s’"], "appel", ["le", "les"]],
    ans: [el, end],
  });
  const P = (x) => (/^[a-z0-9/-]+$/.test(x) ? { img: x } : { emoji: x });

  window.LESSON = {
    n: "r1",
    label: "Révision",
    grade: 3,
    title: "Révision",
    en: "Final exam revision",
    uk: "Повторення до підсумкового іспиту",
    ar: "مراجعة الامتحان النهائي",
    book: "Exercices d’application · Examen final · 1er terme",
    cover: "lesson-1/bonjour",
    use: [1, 2, 3, 4],

    exercises: [
      {
        k: "verbe",
        t: "Écris le verbe s’appeler",
        en: "Je m’appelle, tu t’appelles, il / elle s’appelle",
        img: "lesson-1/isabelle",
        from: "Examen final ex. 1",
        keep: true,
        items: [
          verb("lesson-1/leo", "Je", "m’", "le"),
          verb("lesson-1/lin", "Tu", "t’", "les"),
          verb("lesson-1/theo", "Il", "s’", "le"),
          verb("lesson-1/isabelle", "Elle", "s’", "le"),
        ],
      },
      {
        k: "quand",
        t: "Complète avec les mots de salutations",
        en: "Which greeting do I say?",
        emoji: "🌆",
        from: "Examen final ex. 2",
        ref: "2:quand",
      },
      {
        k: "voyelles",
        t: "Les voyelles",
        en: "Is it a vowel?",
        emoji: "🅰️",
        from: "Examen final ex. 3",
        ref: "4:voyelles",
      },
      {
        k: "consonnes",
        t: "Les consonnes",
        en: "Is it a consonant?",
        emoji: "🅱️",
        from: "Examen final ex. 3",
        ref: "4:consonnes",
      },
      {
        k: "ecole",
        t: "Comment s’appelle ton école ?",
        en: "Answer with the name of the school",
        img: "lesson-1/ecole",
        from: "Examen final ex. 4",
        items: [
          {
            type: "order",
            img: "lesson-1/ecole",
            q: "Comment s’appelle ton école ?",
            fr: "Mon école s’appelle Saint John.",
            cards: ["Mon", "école", "s’appelle", "Saint", "John."],
          },
        ],
      },
      {
        k: "choisis",
        t: "Choisis la bonne réponse",
        en: "Salut – et toi – moi – bonsoir – bonne nuit",
        emoji: "🌙😴",
        from: "Examen final ex. 5",
        keep: true,
        items: [
          [
            "👉",
            "___, comment tu t’appelles ?",
            "Et toi",
            "Bonne nuit",
            "Bonsoir",
          ],
          ["🧒🤝", "___ mon ami.", "Salut", "Bonne nuit", "Moi"],
          ["🌆", "Bonsoir maman, ___ Lin.", "bonsoir", "bonne nuit", "et toi"],
          [
            "🌙😴",
            "Avant de dormir, je dis ___ à mes parents.",
            "bonne nuit",
            "salut",
            "bonsoir",
          ],
          ["🙋‍♀️", "___, je m’appelle Dina.", "Moi", "Bonne nuit", "Salut"],
        ].map(([p, q, ...opts]) => ({ type: "mc", ...P(p), q, opts })),
      },
      {
        k: "consignes",
        t: "Choisis",
        en: "Match: découpe, écoute, chante",
        img: "lesson-3/decoupe",
        from: "Examen final ex. 6",
        ref: "3:choisis",
      },
      {
        k: "mots",
        t: "Qu’est-ce que c’est ?",
        en: "Say the French words",
        img: "lesson-4/croissant",
        from: "Examen final ex. 7 · Mi-terme ex. 6",
        ref: "4:quest",
      },
      {
        k: "reponds",
        t: "Répondez aux questions",
        en: "Choose the right answer",
        img: "lesson-1/age",
        from: "Leçon 1",
        ref: "1:reponds",
      },
      {
        k: "ordre",
        t: "Mets en ordre",
        en: "Put the words in order",
        img: "lesson-1/classe",
        from: "Leçon 1",
        ref: "1:ordre",
      },
      {
        k: "qui",
        t: "Qui est-ce ?",
        en: "Who is it?",
        img: "lesson-1/hector",
        from: "Leçon 1",
        ref: "1:qui",
      },
      {
        k: "complete",
        t: "Complète : c’est – salut – et moi – s’appelle – tu",
        en: "Complete the sentence",
        img: "lesson-1/theo",
        from: "Leçon 2 · Devoir noté 2",
        ref: "2:complete",
      },
    ],

    // Translations of the sentences that are in no lesson.
    dict: {
      "Je m’appelle": ["My name is…", "Мене звати…", "اسمي…"],
      "Tu t’appelles": ["Your name is…", "Тебе звати…", "اسمك…"],
      "Il s’appelle": ["His name is…", "Його звати…", "اسمه…"],
      "Elle s’appelle": ["Her name is…", "Її звати…", "اسمها…"],
      "Et toi, comment tu t’appelles ?": [
        "And you, what is your name?",
        "А тебе як звати?",
        "وأنت، ما اسمك؟",
      ],
      "Salut mon ami.": ["Hi, my friend.", "Привіт, друже.", "أهلًا يا صديقي."],
      "Bonsoir maman, bonsoir Lin.": [
        "Good evening, Mum, good evening, Lin.",
        "Добрий вечір, мамо, добрий вечір, Лін.",
        "مساء الخير يا أمي، مساء الخير يا لين.",
      ],
      "Avant de dormir, je dis bonne nuit à mes parents.": [
        "Before going to sleep, I say good night to my parents.",
        "Перед сном я кажу батькам «на добраніч».",
        "قبل النوم أقول لوالديّ: تصبح على خير.",
      ],
      "Moi, je m’appelle Dina.": [
        "Me, my name is Dina.",
        "А мене звати Діна.",
        "أنا اسمي دينا.",
      ],
    },
  };
})();
