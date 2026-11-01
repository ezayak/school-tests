// Français · Grade 3 · Leçon 1 « La présentation » (the teacher's slides, Les personnages du livre Léo et Théo,
// Devoir noté 1, Travail de classe 1, Exercices d’application mi-terme 1, Devoir noté 2 ex. 1, 3, 4).
// All the content of the lesson. The engine is grade-4/term-1/french/french-lesson.js. Pictures: img/lesson-1/<name>.jpg
(function () {
  const NAMES = {
    // name → [English, Українська, العربية]
    Léo: ["Léo", "Лео", "ليو"],
    Théo: ["Théo", "Тео", "تيو"],
    Hector: ["Hector", "Ектор", "هيكتور"],
    Isabelle: ["Isabelle", "Ізабель", "إيزابيل"],
    Ahmed: ["Ahmed", "Ахмед", "أحمد"],
    Lin: ["Lin", "Лін", "لين"],
    Daniel: ["Daniel", "Даніель", "دانيال"],
    Céline: ["Céline", "Селін", "سيلين"],
    Paul: ["Paul", "Поль", "بول"],
    Tony: ["Tony", "Тоні", "توني"],
    Sylvia: ["Sylvia", "Сільвія", "سيلفيا"],
    Pauline: ["Pauline", "Полін", "بولين"],
    Ramy: ["Ramy", "Рамі", "رامي"],
    Fady: ["Fady", "Фаді", "فادي"],
    Noura: ["Noura", "Нура", "نورا"],
    Lucas: ["Lucas", "Лукас", "لوكاس"],
  };
  const N = (n, i) => (NAMES[n] || [n, n, n])[i];
  // number → [English, Українська "… років", العربية "… سنوات"]
  const AGE = {
    six: ["six", "шість", "ستّ"],
    sept: ["seven", "сім", "سبع"],
    huit: ["eight", "вісім", "ثماني"],
    neuf: ["nine", "дев’ять", "تسع"],
    dix: ["ten", "десять", "عشر"],
  };

  const DICT = {
    "Bonjour !": ["Hello!", "Привіт!", "مرحبًا!"],
    Bonjour: ["Hello", "Привіт", "مرحبًا"],
    "Comment tu t’appelles ?": [
      "What is your name?",
      "Як тебе звати?",
      "ما اسمك؟",
    ],
    "Je m’appelle…": ["My name is…", "Мене звати…", "اسمي…"],
    "Quel âge as-tu ?": ["How old are you?", "Скільки тобі років?", "كم عمرك؟"],
    "En quelle classe es-tu ?": [
      "What grade are you in?",
      "У якому ти класі?",
      "في أي صف أنت؟",
    ],
    "Je suis en 3ème primaire.": [
      "I am in Grade 3.",
      "Я в третьому класі.",
      "أنا في الصف الثالث الابتدائي.",
    ],
    "Comment s’appelle ton école ?": [
      "What is the name of your school?",
      "Як називається твоя школа?",
      "ما اسم مدرستك؟",
    ],
    "Mon école s’appelle Saint John.": [
      "My school is called Saint John.",
      "Моя школа називається Сент-Джон.",
      "اسم مدرستي سانت جون.",
    ],
    "Qui est-ce ?": ["Who is it?", "Хто це?", "من هذا؟"],
    "Comment il s’appelle ?": [
      "What is his name?",
      "Як його звати?",
      "ما اسمه؟",
    ],
    "Comment elle s’appelle ?": [
      "What is her name?",
      "Як її звати?",
      "ما اسمها؟",
    ],
    école: ["school", "школа", "مدرسة"],
    classe: ["class", "клас", "صف"],
    ans: ["years (old)", "років", "سنوات"],
    primaire: ["primary", "початкова (школа)", "ابتدائي"],
    // the words of the Dictée lists
    comment: ["how / what", "як", "كيف"],
    quel: ["what / which", "який", "ما / أي"],
    quelle: ["what / which", "яка", "ما / أي"],
    âge: ["age", "вік", "عمر"],
    ton: ["your", "твій", "ـكَ (لك)"],
    mon: ["my", "мій", "ـي (لي)"],
    suis: ["(I) am", "(я) є", "أكون"],
    appelle: ["(is) called", "звати", "يُدعى"],
    appelles: ["(you are) called", "звати (тебе)", "تُدعى"],
    "m’appelle": ["my name is", "мене звати", "اسمي"],
    "t’appelles": ["your name is", "тебе звати", "اسمك"],
    "s’appelle": ["his / her name is", "його / її звати", "اسمه / اسمها"],
    "Je m’appelle": ["My name is…", "Мене звати…", "اسمي…"],
    "Tu t’appelles": ["Your name is…", "Тебе звати…", "اسمك…"],
    "Il s’appelle": ["His name is…", "Його звати…", "اسمه…"],
    "Elle s’appelle": ["Her name is…", "Її звати…", "اسمها…"],
  };
  for (const [k, v] of Object.entries(AGE)) DICT[k] = [v[0], v[1], v[2]];

  // one sentence → [English, Українська, العربية] or null
  function one(s) {
    let m;
    if ((m = s.match(/^(?:Bonjour ! )?Je m’appelle (\S+?) ?[.!]?$/)))
      return [
        `My name is ${N(m[1], 0)}.`,
        `Мене звати ${N(m[1], 1)}.`,
        `اسمي ${N(m[1], 2)}.`,
      ];
    if ((m = s.match(/^Tu t’appelles (\S+?) ?([.?])$/)))
      return [
        `Your name is ${N(m[1], 0)}${m[2]}`,
        `Тебе звати ${N(m[1], 1)}${m[2]}`,
        `اسمك ${N(m[1], 2)}${m[2] === "?" ? "؟" : "."}`,
      ];
    if ((m = s.match(/^(Il|Elle) s’appelle (\S+?) ?\.?$/))) {
      const il = m[1] === "Il";
      return [
        `${il ? "His" : "Her"} name is ${N(m[2], 0)}.`,
        `${il ? "Його" : "Її"} звати ${N(m[2], 1)}.`,
        `${il ? "اسمه" : "اسمها"} ${N(m[2], 2)}.`,
      ];
    }
    if ((m = s.match(/^C’est (\S+?) ?\.?$/)) && NAMES[m[1]])
      return [
        `This is ${N(m[1], 0)}.`,
        `Це ${N(m[1], 1)}.`,
        `هذا ${N(m[1], 2)}.`,
      ];
    if ((m = s.match(/^J’ai (\S+) ans ?\.?$/)) && AGE[m[1]])
      return [
        `I am ${AGE[m[1]][0]} years old.`,
        `Мені ${AGE[m[1]][1]} років.`,
        `عمري ${AGE[m[1]][2]} سنوات.`,
      ];
    if ((m = s.match(/^\((\S+)\)$/)) && NAMES[m[1]])
      return [`(${N(m[1], 0)})`, `(${N(m[1], 1)})`, `(${N(m[1], 2)})`];
    return null;
  }

  // a picture file name ("leo", "lesson-1/leo") or an emoji ("👦")
  const P = (x) => (/^[a-z0-9/-]+$/.test(x) ? { img: x } : { emoji: x });
  // "Il s’appelle Léo." with s’appelle to choose
  const VERB = ["m’appelle", "t’appelles", "s’appelle"];
  const verbFill = (img, p, name, end, ans) => ({
    type: "fill",
    ...P(img),
    parts: [p + " ", VERB, ` ${name}${end}`],
    ans: [ans],
  });

  window.LESSON = {
    n: 1,
    grade: 3,
    title: "La présentation",
    en: "Introducing yourself",
    uk: "Знайомство",
    ar: "التعارف",
    book: "Les slides de la maîtresse · Les personnages du livre Léo et Théo",
    cover: "bonjour",

    // Menu tiles and their pictures. Titles come from MODES in french-lesson.js.
    learn: [
      { k: "story", img: "bonjour" },
      { k: "words", img: "leo" },
      { k: "verb", img: "isabelle" },
    ],
    play: [
      { k: "listen", img: "theo" },
      { k: "match", img: "hector" },
      { k: "bword", img: "lin" },
      { k: "bsent", img: "classe" },
      { k: "ilelle", img: "isabelle" },
    ],

    // Les personnages du livre Léo et Théo. g: "il" or "elle".
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
        en: "Théo, a boy",
        uk: "Тео, хлопчик",
        ar: "تيو، ولد",
      },
      {
        fr: "Hector",
        img: "hector",
        g: "il",
        en: "Hector, an animal",
        uk: "Ектор, тваринка",
        ar: "هيكتور، حيوان",
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
        fr: "Ahmed",
        img: "ahmed",
        g: "il",
        en: "Ahmed, a boy",
        uk: "Ахмед, хлопчик",
        ar: "أحمد، ولد",
      },
      {
        fr: "Lin",
        img: "lin",
        g: "elle",
        en: "Lin, a girl",
        uk: "Лін, дівчинка",
        ar: "لين، بنت",
      },
    ],

    // Words & phrases to say (flash cards): the questions and answers of the slides.
    phrases: [
      {
        fr: "Bonjour !",
        img: "bonjour",
        en: "Hello!",
        uk: "Привіт!",
        ar: "مرحبًا!",
      },
      {
        fr: "Comment tu t’appelles ?",
        img: "celine",
        en: "What is your name?",
        uk: "Як тебе звати?",
        ar: "ما اسمك؟",
      },
      {
        fr: "Je m’appelle…",
        emoji: "🙋",
        en: "My name is…",
        uk: "Мене звати…",
        ar: "اسمي…",
      },
      {
        fr: "Quel âge as-tu ?",
        img: "age",
        en: "How old are you?",
        uk: "Скільки тобі років?",
        ar: "كم عمرك؟",
      },
      {
        fr: "J’ai huit ans.",
        img: "gateau",
        en: "I am eight years old.",
        uk: "Мені вісім років.",
        ar: "عمري ثماني سنوات.",
      },
      {
        fr: "En quelle classe es-tu ?",
        img: "classe",
        en: "What grade are you in?",
        uk: "У якому ти класі?",
        ar: "في أي صف أنت؟",
      },
      {
        fr: "Je suis en 3ème primaire.",
        img: "classe",
        en: "I am in Grade 3.",
        uk: "Я в третьому класі.",
        ar: "أنا في الصف الثالث الابتدائي.",
      },
      {
        fr: "Comment s’appelle ton école ?",
        img: "ecole2",
        en: "What is the name of your school?",
        uk: "Як називається твоя школа?",
        ar: "ما اسم مدرستك؟",
      },
      {
        fr: "Mon école s’appelle Saint John.",
        img: "ecole",
        en: "My school is called Saint John.",
        uk: "Моя школа називається Сент-Джон.",
        ar: "اسم مدرستي سانت جون.",
      },
      { fr: "six", emoji: "6️⃣", en: "six", uk: "шість", ar: "ستة" },
      { fr: "sept", emoji: "7️⃣", en: "seven", uk: "сім", ar: "سبعة" },
      { fr: "huit", emoji: "8️⃣", en: "eight", uk: "вісім", ar: "ثمانية" },
      { fr: "neuf", emoji: "9️⃣", en: "nine", uk: "дев’ять", ar: "تسعة" },
      { fr: "dix", emoji: "🔟", en: "ten", uk: "десять", ar: "عشرة" },
    ],

    // The slides: one question and its answer per picture.
    story: [
      {
        img: "bonjour",
        lines: [
          { who: "", fr: "Bonjour ! Comment tu t’appelles ?" },
          { who: "Daniel", fr: "Bonjour ! Je m’appelle Daniel." },
        ],
      },
      {
        img: "celine",
        lines: [
          { who: "", fr: "Bonjour ! Comment tu t’appelles ?" },
          { who: "Céline", fr: "Je m’appelle Céline." },
        ],
      },
      {
        img: "age",
        lines: [
          { who: "", fr: "Quel âge as-tu ?" },
          { who: "", fr: "J’ai huit ans." },
        ],
      },
      {
        img: "classe",
        lines: [
          { who: "", fr: "En quelle classe es-tu ?" },
          { who: "", fr: "Je suis en 3ème primaire." },
        ],
      },
      {
        img: "ecole2",
        lines: [
          { who: "", fr: "Comment s’appelle ton école ?" },
          { who: "", fr: "Mon école s’appelle Saint John." },
        ],
      },
    ],

    // Le verbe s’appeler (Devoir noté 2): the rows of the verb card
    verb: {
      rows: [
        {
          p: "Je",
          el: "m’",
          end: "e",
          name: "Léo",
          img: "leo",
          en: "I am called",
          uk: "Мене звати",
          ar: "اسمي",
        },
        {
          p: "Tu",
          el: "t’",
          end: "es",
          name: "Lin",
          img: "lin",
          en: "You are called",
          uk: "Тебе звати",
          ar: "اسمك",
        },
        {
          p: "Il",
          el: "s’",
          end: "e",
          name: "Théo",
          img: "theo",
          en: "He is called",
          uk: "Його звати",
          ar: "اسمه",
        },
        {
          p: "Elle",
          el: "s’",
          end: "e",
          name: "Isabelle",
          img: "isabelle",
          en: "She is called",
          uk: "Її звати",
          ar: "اسمها",
        },
      ],
    },

    // Sentences for "Build the sentence" (picture + sentence)
    sentences: [
      { fr: "Bonjour ! Je m’appelle Daniel.", img: "bonjour" },
      { fr: "Je m’appelle Céline.", img: "celine" },
      { fr: "J’ai huit ans.", img: "gateau" },
      { fr: "J’ai sept ans.", img: "gateau" },
      { fr: "Je suis en 3ème primaire.", img: "classe" },
      { fr: "Mon école s’appelle Saint John.", img: "ecole" },
      { fr: "Il s’appelle Léo.", img: "leo" },
      { fr: "Il s’appelle Théo.", img: "theo" },
      { fr: "Elle s’appelle Lin.", img: "lin" },
      { fr: "Elle s’appelle Isabelle.", img: "isabelle" },
      { fr: "C’est Hector.", img: "hector" },
      { fr: "C’est Ahmed.", img: "ahmed" },
    ],

    // Words for "Build the word": the names, and the words of « Lisez les mots suivants »
    build: [
      "Léo",
      "Théo",
      "Hector",
      "Isabelle",
      "Ahmed",
      "Lin",
      "Bonjour",
      { fr: "école", img: "ecole" },
      { fr: "classe", img: "classe" },
      { fr: "primaire", img: "classe" },
      { fr: "ans", img: "gateau" },
      { fr: "sept", emoji: "7️⃣" },
      { fr: "huit", emoji: "8️⃣" },
    ],

    // Dictée: spelling lists. Each one: build the words / sentences from letters, or hear them and write them.
    dictee: [
      {
        k: "questions",
        t: "Les questions de présentation",
        en: "Spelling: the questions and the answers",
        img: "celine",
        from: "Leçon 1 · La présentation (by spelling)",
        words: [
          { fr: "comment", emoji: "❓" },
          { fr: "quel", emoji: "❓" },
          { fr: "quelle", emoji: "❓" },
          { fr: "âge", img: "gateau" },
          { fr: "classe", img: "classe" },
          { fr: "école", img: "ecole" },
          { fr: "ton", emoji: "👉" },
          { fr: "mon", emoji: "🙋" },
          { fr: "suis", emoji: "🙋" },
          { fr: "primaire", img: "classe" },
          { fr: "ans", img: "gateau" },
          { fr: "sept", emoji: "7️⃣" },
          { fr: "huit", emoji: "8️⃣" },
          { fr: "neuf", emoji: "9️⃣" },
        ],
        sentences: [
          { fr: "Comment tu t’appelles ?", img: "celine" },
          { fr: "Je m’appelle Lucas.", emoji: "🙋‍♂️" },
          { fr: "Quel âge as-tu ?", img: "age" },
          { fr: "J’ai sept ans.", img: "gateau" },
          { fr: "J’ai huit ans.", img: "gateau" },
          { fr: "J’ai neuf ans.", img: "gateau" },
          { fr: "En quelle classe es-tu ?", img: "classe" },
          { fr: "Je suis en 3ème primaire.", img: "classe" },
          { fr: "Comment s’appelle ton école ?", img: "ecole2" },
          { fr: "Mon école s’appelle Saint John.", img: "ecole" },
        ],
      },
      {
        k: "verbe",
        t: "Le verbe s’appeler",
        en: "Spelling: je m’appelle, tu t’appelles, il / elle s’appelle",
        img: "isabelle",
        from: "Le verbe s’appeler · Examen final ex. 1 · Devoir noté 2",
        words: [
          { fr: "appelle", emoji: "🗣️" },
          { fr: "appelles", emoji: "🗣️" },
          { fr: "m’appelle", emoji: "🙋" },
          { fr: "t’appelles", emoji: "👉" },
          { fr: "s’appelle", img: "theo" },
        ],
        sentences: [
          { fr: "Je m’appelle", emoji: "🙋" },
          { fr: "Tu t’appelles", emoji: "👉" },
          { fr: "Il s’appelle", img: "theo" },
          { fr: "Elle s’appelle", img: "isabelle" },
          { fr: "Je m’appelle Léo.", img: "leo" },
          { fr: "Tu t’appelles Lin.", img: "lin" },
          { fr: "Il s’appelle Théo.", img: "theo" },
          { fr: "Elle s’appelle Isabelle.", img: "isabelle" },
        ],
      },
    ],

    // School exercises (slides, class work, homework, mid-term sheet). One menu tile per section.
    exercises: [
      {
        k: "reponds",
        t: "Répondez aux questions",
        en: "Choose the right answer",
        img: "age",
        from: "Slides · Devoir noté 1 ex. 1 · Mi-terme ex. 1",
        items: [
          ["celine", "Comment tu t’appelles ?", "Je m’appelle Lucas."],
          ["age", "Quel âge as-tu ?", "J’ai huit ans."],
          ["classe", "En quelle classe es-tu ?", "Je suis en 3ème primaire."],
          [
            "ecole2",
            "Comment s’appelle ton école ?",
            "Mon école s’appelle Saint John.",
          ],
        ].map(([img, q, a], k, all) => ({
          type: "mc",
          img,
          q,
          opts: [
            a,
            ...all
              .filter((_, j) => j !== k)
              .map((x) => x[2])
              .slice(0, 2),
          ],
        })),
      },
      {
        k: "ordre",
        t: "Mets en ordre",
        en: "Put the words in order",
        img: "ecole",
        from: "Slides · Devoir noté 1 ex. 2 · Travail de classe 1 · Mi-terme ex. 2",
        items: [
          {
            fr: "Je m’appelle Paul.",
            cards: ["Je", "m’appelle", "Paul."],
            emoji: "🙋‍♂️",
          },
          {
            fr: "J’ai sept ans.",
            cards: ["J’ai", "sept", "ans."],
            img: "gateau",
          },
          { fr: "Je suis en 3ème primaire.", img: "classe" },
          {
            fr: "Mon école s’appelle Saint John.",
            cards: ["Mon", "école", "s’appelle", "Saint", "John."],
            img: "ecole",
          },
          {
            fr: "J’ai huit ans.",
            cards: ["J’ai", "huit", "ans."],
            img: "gateau",
          },
          {
            fr: "Je m’appelle Tony.",
            cards: ["Je", "m’appelle", "Tony."],
            emoji: "🙋‍♂️",
          },
          { fr: "Je m’appelle Sylvia.", emoji: "🙋‍♀️" },
        ].map((it) => ({ type: "order", ...it })),
      },
      {
        k: "compose",
        t: "Composez trois phrases",
        en: "Make three sentences with the words",
        emoji: "✍️",
        from: "Slides",
        keep: true,
        items: [
          {
            fr: "Je m’appelle Pauline.",
            cards: ["Je", "m’appelle", "Pauline."],
            emoji: "🙋‍♀️",
          },
          { fr: "Je suis en 3ème primaire.", img: "classe" },
          {
            fr: "J’ai six ans.",
            cards: ["J’ai", "six", "ans."],
            img: "gateau",
          },
        ].map((it) => ({ type: "order", ...it })),
      },
      {
        k: "qui",
        t: "Qui est-ce ?",
        en: "Who is it?",
        img: "hector",
        from: "Travail de classe 1 ex. 1 · Mi-terme ex. 3",
        items: [
          ["hector", "Hector", "Léo", "Lin"],
          ["leo", "Léo", "Théo", "Ahmed"],
          ["lin", "Lin", "Isabelle", "Hector"],
          ["theo", "Théo", "Léo", "Ahmed"],
          ["ahmed", "Ahmed", "Théo", "Lin"],
          ["isabelle", "Isabelle", "Lin", "Léo"],
        ].map(([img, ...o]) => ({
          type: "mc",
          img,
          q: "Qui est-ce ?",
          opts: o.map((n) => `C’est ${n}.`),
        })),
      },
      {
        k: "verbe",
        t: "Conjugue le verbe s’appeler",
        en: "Complete the verb s’appeler",
        img: "theo",
        from: "Devoir noté 2 ex. 1",
        items: [
          verbFill("theo", "Il", "Théo", ".", "s’appelle"),
          verbFill("🙋‍♂️", "Je", "Ramy", ".", "m’appelle"),
          verbFill("lin", "Tu", "Lin", ".", "t’appelles"),
          verbFill("isabelle", "Elle", "Isabelle", ".", "s’appelle"),
          verbFill("leo", "Je", "Léo", ".", "m’appelle"),
          verbFill("ahmed", "Tu", "Ahmed", " ?", "t’appelles"),
        ],
      },
      {
        k: "comment",
        t: "Comment il / elle s’appelle ?",
        en: "Answer: Il s’appelle… / Elle s’appelle…",
        img: "leo",
        from: "Devoir noté 2 ex. 3 et 4",
        items: [
          ["👦", "Comment il s’appelle ? (Fady)", "Il s’appelle Fady."],
          ["👧", "Comment elle s’appelle ? (Noura)", "Elle s’appelle Noura."],
          ["leo", "Comment il s’appelle ?", "Il s’appelle Léo."],
          ["lin", "Comment elle s’appelle ?", "Elle s’appelle Lin."],
          ["theo", "Comment il s’appelle ?", "Il s’appelle Théo."],
          ["isabelle", "Comment elle s’appelle ?", "Elle s’appelle Isabelle."],
        ].map(([img, q, fr]) => ({
          type: "order",
          ...P(img),
          q,
          fr,
        })),
      },
    ],

    // Translations: the phrases above, then sentences made from a pattern (one() above).
    dict: DICT,
    auto(fr) {
      const out = [];
      for (const s of fr.match(/[^.!?]+[.!?]*/g) || []) {
        const k = s.trim();
        const t = DICT[k] || DICT[k.replace(/\.$/, "")] || one(k);
        if (!t) return null;
        out.push(t);
      }
      return out.length
        ? [0, 1, 2].map((i) => out.map((t) => t[i]).join(" "))
        : null;
    },
  };
  // a revision page loads several lessons: each one keeps its data here
  (window.FR_DATA = window.FR_DATA || {})[1] = window.LESSON;
})();
