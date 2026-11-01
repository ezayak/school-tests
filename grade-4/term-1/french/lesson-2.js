// Français · Grade 4 · Leçon 2 « Filles et garçons » (Français plus 1, pages 10–11 and 14 · Cahier pages 6–7).
// All the content of the lesson. The engine is french-lesson.js. Pictures: img/lesson-2/<name>.jpg
// Picture fields: img: "chadi" (a file in img/lesson-2/), img: "lesson-1/mounir" (another lesson), or emoji: "👧".
(function () {
  const NAMES = {
    // name → [English, Українська, العربية]
    Bouli: ["Bouli", "Булі", "بولي"],
    Alice: ["Alice", "Аліса", "أليس"],
    Fouad: ["Fouad", "Фуад", "فؤاد"],
    Stéphanie: ["Stéphanie", "Стефані", "ستيفاني"],
    Chadi: ["Chadi", "Шаді", "شادي"],
    Michou: ["Michou", "Мішу", "ميشو"],
    Noura: ["Noura", "Нура", "نورا"],
    Minou: ["Minou", "Міну", "مينو"],
    Chirine: ["Chirine", "Шірін", "شيرين"],
    Bongo: ["Bongo", "Бонго", "بونغو"],
    Simon: ["Simon", "Сімон", "سيمون"],
    Mounir: ["Mounir", "Мунір", "منير"],
    Pauline: ["Pauline", "Полін", "بولين"],
    Amine: ["Amine", "Амін", "أمين"],
    Dalia: ["Dalia", "Далія", "داليا"],
  };
  const N = (n, i) => (NAMES[n] || [n, n, n])[i];
  // noun → [English, Українська, العربية, feminine]
  const NOUNS = {
    garçon: ["boy", "хлопчик", "ولد", 0],
    fille: ["girl", "дівчинка", "بنت", 1],
    homme: ["man", "чоловік", "رجل", 0],
    femme: ["woman", "жінка", "امرأة", 1],
    bébé: ["baby", "немовля", "طفل رضيع", 0],
    animal: ["animal", "тварина", "حيوان", 0],
    chat: ["cat", "кіт", "قطّ", 0],
    chien: ["dog", "собака", "كلب", 0],
    mouton: ["sheep", "вівця", "خروف", 0],
  };

  const DICT = {
    "Regarde !": ["Look!", "Дивись!", "انظر!"],
    Regarde: ["Look", "Дивись", "انظر"],
    "Regarde, Bouli !": ["Look, Bouli!", "Дивись, Булі!", "انظر يا بولي!"],
    Oui: ["Yes", "Так", "نعم"],
    "Oui !": ["Yes!", "Так!", "نعم!"],
    Non: ["No", "Ні", "لا"],
    "Non !": ["No!", "Ні!", "لا!"],
    "Non, Bouli !": ["No, Bouli!", "Ні, Булі!", "لا يا بولي!"],
    "C’est un… / C’est une…": [
      "It’s a… (he) / It’s a… (she)",
      "Це… (він) / Це… (вона)",
      "هذا… / هذه…",
    ],
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
    "Comment tu t’appelles ?": [
      "What is your name?",
      "Як тебе звати?",
      "ما اسمك؟",
    ],
    "Qui est-ce ?": ["Who is it?", "Хто це?", "من هذا؟"],
    "Quel âge as-tu ?": ["How old are you?", "Скільки тобі років?", "كم عمرك؟"],
    "J’ai huit ans.": [
      "I am eight years old.",
      "Мені вісім років.",
      "عمري ثماني سنوات.",
    ],
    "Je suis en 4ème année primaire.": [
      "I am in Grade 4.",
      "Я в четвертому класі.",
      "أنا في الصف الرابع الابتدائي.",
    ],
    "Ça va bien !": ["I’m fine!", "У мене все добре!", "أنا بخير!"],
    "Quelle surprise !": [
      "What a surprise!",
      "Який сюрприз!",
      "يا لها من مفاجأة!",
    ],
    "En quelle classe es-tu ?": [
      "What grade are you in?",
      "У якому ти класі?",
      "في أي صف أنت؟",
    ],
    "Une phrase commence par une lettre majuscule.": [
      "A sentence starts with a capital letter.",
      "Речення починається з великої літери.",
      "تبدأ الجملة بحرف كبير.",
    ],
    "Elle finit par un point, un point d’interrogation ou un point d’exclamation.":
      [
        "It ends with a point, a question mark or an exclamation mark.",
        "Воно закінчується крапкою, знаком питання або знаком оклику.",
        "وتنتهي بنقطة أو علامة استفهام أو علامة تعجب.",
      ],
    // "Mets un (x) si c’est une phrase": the two that are not sentences
    "Il Bongo s’appelle": [
      "(not a sentence: the words are in the wrong order)",
      "(не речення: слова не в тому порядку)",
      "(ليست جملة: الكلمات ليست بالترتيب الصحيح)",
    ],
    "c’est regarde Fouad": [
      "(not a sentence: no capital letter, no end mark, the words make no sense)",
      "(не речення: немає великої літери, немає знака в кінці, слова не мають змісту)",
      "(ليست جملة: لا حرف كبير ولا علامة في النهاية، والكلمات بلا معنى)",
    ],
  };

  // "un homme et un mouton" → [English, Українська, العربية, first noun feminine]
  function nouns(n1, n2) {
    const W = [n1].concat(n2 ? [n2] : []).map((n) => NOUNS[n]);
    if (W.some((x) => !x)) return null;
    return [
      W.map((x) => (/^[aeiou]/.test(x[0]) ? "an " : "a ") + x[0]).join(" and "),
      W.map((x) => x[1]).join(" і "),
      W.map((x) => x[2]).join(" و"),
      W[0][3],
    ];
  }
  const arP = (e) => (e === "?" ? "؟" : e);
  const YN = {
    "Oui, ": ["Yes, it’s ", "Так, це ", "نعم، "],
    "Non, ": ["No, it’s ", "Ні, це ", "لا، "],
  };
  // one sentence → [English, Українська, العربية] or null
  function one(s) {
    let m;
    if (NOUNS[s]) return NOUNS[s].slice(0, 3);
    if (
      (m = s.match(
        /^(Oui, |Non, )?[Cc]’est (?:un|une) (\S+)(?: et (?:un|une) (\S+))? ?([.?!])$/,
      ))
    ) {
      const x = nouns(m[2], m[3]);
      if (!x) return null;
      const y = YN[m[1] || ""];
      const e = m[4];
      const dem = x[3] ? "هذه " : "هذا ";
      if (e === "?" && !y)
        return [`Is it ${x[0]}?`, `Це ${x[1]}?`, `هل ${dem}${x[2]}؟`];
      return y
        ? [y[0] + x[0] + e, y[1] + x[1] + e, y[2] + dem + x[2] + arP(e)]
        : [`It’s ${x[0]}${e}`, `Це ${x[1]}${e}`, dem + x[2] + arP(e)];
    }
    if (
      (m = s.match(/^(?:un|une) (\S+)(?: et (?:un|une) (\S+))? ?([.?!]?)$/i))
    ) {
      const x = nouns(m[1], m[2]);
      if (!x) return null;
      const e = m[3];
      const cap = (t) => t[0].toUpperCase() + t.slice(1);
      return e ? [cap(x[0]) + e, cap(x[1]) + e, x[2] + arP(e)] : x.slice(0, 3);
    }
    if ((m = s.match(/^(Il|Elle) s’appelle (\S+?) ?\.?$/))) {
      const il = m[1] === "Il";
      return [
        `${il ? "His" : "Her"} name is ${N(m[2], 0)}.`,
        `${il ? "Його" : "Її"} звати ${N(m[2], 1)}.`,
        `${il ? "اسمه" : "اسمها"} ${N(m[2], 2)}.`,
      ];
    }
    if ((m = s.match(/^Je m’appelle (\S+?) ?\.?$/)))
      return [
        `My name is ${N(m[1], 0)}.`,
        `Мене звати ${N(m[1], 1)}.`,
        `اسمي ${N(m[1], 2)}.`,
      ];
    if ((m = s.match(/^(Regarde, )?[Cc]’est (\S+?) ?([.!])$/)) && NAMES[m[2]]) {
      const n = m[2],
        e = m[3];
      return m[1]
        ? [
            `Look, it’s ${N(n, 0)}${e}`,
            `Дивись, це ${N(n, 1)}${e}`,
            `انظر، هذا ${N(n, 2)}${e}`,
          ]
        : [`It’s ${N(n, 0)}${e}`, `Це ${N(n, 1)}${e}`, `هذا ${N(n, 2)}${e}`];
    }
    return null;
  }

  window.LESSON = {
    n: 2,
    grade: 4,
    title: "Filles et garçons",
    en: "Girls and boys",
    uk: "Дівчата і хлопці",
    ar: "بنات وأولاد",
    book: "Français plus 1 · pages 10–11, 14 · Cahier pages 6–7",
    cover: "comic",

    // Menu tiles and their pictures. Titles come from MODES in french-lesson.js.
    learn: [
      { k: "story", img: "panel1" },
      { k: "words", img: "chadi" },
      { k: "sound", s: "ch", img: "michou" },
      { k: "sound", s: "on", img: "bongo" },
      { k: "rule", img: "phrase" },
    ],
    play: [
      { k: "listen", img: "simon" },
      { k: "match", img: "chirine" },
      { k: "bword", img: "noura" },
      { k: "bsent", img: "ph-chien" },
      { k: "ilelle", img: "stephanie" },
      {
        k: "game",
        t: "Un ou une ?",
        en: "un garçon, une fille",
        img: "mouton",
        items: [
          ["fouad", "garçon", "un"],
          ["noura", "fille", "une"],
          ["simon", "homme", "un"],
          ["chirine", "femme", "une"],
          ["michou", "bébé", "un"],
          ["c-mouton", "animal", "un"],
          ["minou", "chat", "un"],
          ["bongo", "chien", "un"],
          ["mouton", "mouton", "un"],
        ].map(([img, n, a]) => ({
          type: "mc",
          img,
          q: `C’est ___ ${n}.`,
          opts: a === "un" ? ["un", "une"] : ["une", "un"],
          two: true,
        })),
      },
    ],

    // The people of the lesson. g: "il" (boy / man / animal) or "elle" (girl / woman).
    // say: what the card says (Les mots, Écoute et touche).
    people: [
      {
        fr: "Bouli",
        img: "bouli",
        g: "il",
        en: "Bouli, the little alien",
        uk: "Булі, маленький інопланетянин",
        ar: "بولي، الكائن الفضائي الصغير",
      },
      {
        fr: "Alice",
        img: "alice",
        g: "elle",
        say: "C’est une fille. Elle s’appelle Alice.",
        en: "Alice, a girl",
        uk: "Аліса, дівчинка",
        ar: "أليس، بنت",
      },
      {
        fr: "Fouad",
        img: "fouad",
        g: "il",
        say: "C’est un garçon. Il s’appelle Fouad.",
        en: "Fouad, a boy",
        uk: "Фуад, хлопчик",
        ar: "فؤاد، ولد",
      },
      {
        fr: "Stéphanie",
        img: "stephanie",
        g: "elle",
        say: "C’est une fille. Elle s’appelle Stéphanie.",
        en: "Stéphanie, a girl",
        uk: "Стефані, дівчинка",
        ar: "ستيفاني، بنت",
      },
      {
        fr: "Chadi",
        img: "chadi",
        g: "il",
        say: "C’est un garçon. Il s’appelle Chadi.",
        en: "Chadi, a boy",
        uk: "Шаді, хлопчик",
        ar: "شادي، ولد",
      },
      {
        fr: "Michou",
        img: "michou",
        g: "il",
        say: "C’est un bébé. Il s’appelle Michou.",
        en: "Michou, a baby",
        uk: "Мішу, немовля",
        ar: "ميشو، طفل رضيع",
      },
      {
        fr: "Noura",
        img: "noura",
        g: "elle",
        say: "C’est une fille. Elle s’appelle Noura.",
        en: "Noura, a girl",
        uk: "Нура, дівчинка",
        ar: "نورا، بنت",
      },
      {
        fr: "Minou",
        img: "minou",
        g: "il",
        say: "C’est un chat. Il s’appelle Minou.",
        en: "Minou, a cat",
        uk: "Міну, кіт",
        ar: "مينو، قطّ",
      },
      {
        fr: "Chirine",
        img: "chirine",
        g: "elle",
        say: "C’est une femme. Elle s’appelle Chirine.",
        en: "Chirine, a woman",
        uk: "Шірін, жінка",
        ar: "شيرين، امرأة",
      },
      {
        fr: "Bongo",
        img: "bongo",
        g: "il",
        say: "C’est un chien. Il s’appelle Bongo.",
        en: "Bongo, a dog",
        uk: "Бонго, собака",
        ar: "بونغو، كلب",
      },
      {
        fr: "Simon",
        img: "simon",
        g: "il",
        say: "C’est un homme. Il s’appelle Simon.",
        en: "Simon, a man",
        uk: "Сімон, чоловік",
        ar: "سيمون، رجل",
      },
    ],

    // Words & phrases to say (flash cards). The vocabulary of page 10.
    phrases: [
      {
        fr: "Regarde !",
        img: "panel3",
        en: "Look!",
        uk: "Дивись!",
        ar: "انظر!",
      },
      { fr: "Oui", emoji: "👍", en: "Yes", uk: "Так", ar: "نعم" },
      { fr: "Non", emoji: "👎", en: "No", uk: "Ні", ar: "لا" },
      { fr: "un garçon", img: "fouad", en: "a boy", uk: "хлопчик", ar: "ولد" },
      {
        fr: "une fille",
        img: "noura",
        en: "a girl",
        uk: "дівчинка",
        ar: "بنت",
      },
      { fr: "un homme", img: "simon", en: "a man", uk: "чоловік", ar: "رجل" },
      {
        fr: "une femme",
        img: "chirine",
        en: "a woman",
        uk: "жінка",
        ar: "امرأة",
      },
      {
        fr: "un bébé",
        img: "michou",
        en: "a baby",
        uk: "немовля",
        ar: "طفل رضيع",
      },
      {
        fr: "un animal",
        img: "c-mouton",
        en: "an animal",
        uk: "тварина",
        ar: "حيوان",
      },
      { fr: "un chat", img: "minou", en: "a cat", uk: "кіт", ar: "قطّ" },
      { fr: "un chien", img: "bongo", en: "a dog", uk: "собака", ar: "كلب" },
      {
        fr: "un mouton",
        img: "mouton",
        en: "a sheep",
        uk: "вівця",
        ar: "خروف",
      },
      {
        fr: "un homme et une femme",
        img: "homme-femme",
        en: "a man and a woman",
        uk: "чоловік і жінка",
        ar: "رجل وامرأة",
      },
      {
        fr: "C’est un… / C’est une…",
        img: "panel1",
        en: "It’s a… (un: he) / It’s a… (une: she)",
        uk: "Це… (un — він) / Це… (une — вона)",
        ar: "هذا… (un) / هذه… (une)",
      },
    ],

    // The story (page 10), then « Des phrases pour parler ».
    story: [
      {
        img: "panel1",
        lines: [
          {
            who: "Alice",
            fr: "Regarde, Bouli ! C’est Fouad ! C’est un garçon.",
          },
        ],
      },
      {
        img: "panel2",
        lines: [
          { who: "Bouli", fr: "Un garçon ?" },
          { who: "Alice", fr: "Oui ! Un garçon ! C’est un garçon." },
        ],
      },
      {
        img: "panel3",
        lines: [
          {
            who: "Alice",
            fr: "Regarde ! C’est une fille. Elle s’appelle Stéphanie.",
          },
        ],
      },
      {
        img: "panel4",
        lines: [
          { who: "Bouli", fr: "C’est une fille ?" },
          {
            who: "Alice",
            fr: "Non, Bouli ! C’est un animal ! C’est un mouton.",
          },
        ],
      },
      {
        img: "panel5",
        lines: [
          { who: "Bouli", fr: "C’est un garçon et une fille ?" },
          { who: "Alice", fr: "Non, Bouli ! C’est un homme et une femme." },
        ],
      },
      {
        img: "ph-chat",
        title: "Des phrases pour parler",
        lines: [
          { who: "", fr: "C’est un animal ?" },
          { who: "", fr: "Oui, c’est un animal. C’est un chat." },
        ],
      },
      {
        img: "ph-chien",
        title: "Des phrases pour parler",
        lines: [{ who: "", fr: "Regarde ! C’est un chien." }],
      },
      {
        img: "ph-bebe",
        title: "Des phrases pour parler",
        lines: [
          { who: "", fr: "C’est un chat ?" },
          { who: "", fr: "Non, c’est un bébé." },
        ],
      },
      {
        img: "ph-mouton",
        title: "Des phrases pour parler",
        lines: [
          { who: "", fr: "C’est un chat et un chien ?" },
          { who: "", fr: "Non, c’est une femme et un mouton." },
        ],
      },
    ],

    // Phonétique (page 14). intro / hear: what the voice says when the screen opens / on the big button.
    sounds: [
      {
        s: "ch",
        ipa: "[ʃ]",
        intro: "Le son ch, comme chat.",
        hear: "chat… chien… Michou, Chirine, Chadi",
        img: "son-ch",
        words: ["un chat", "un chien", "Michou", "Chirine", "Chadi"],
        pics: {},
        not: ["Simon", "Bongo", "Noura", "Alice", "un mouton", "Fouad"],
      },
      {
        s: "on",
        ipa: "[ɔ̃]",
        intro: "Le son on.",
        hear: "on… on… Non, Bongo, Bonjour",
        img: "son-on",
        words: ["Non", "Bongo", "Bonjour", "un garçon", "Simon", "un mouton"],
        pics: { Bonjour: "lesson-1/panel2" },
        not: ["Chadi", "Michou", "une fille", "Alice", "un chat", "Minou"],
      },
    ],

    // La phrase (page 11): a capital letter at the start, . ? or ! at the end.
    rule: {
      t: "La phrase",
      en: "The sentence",
      img: "phrase",
      fr: "Une phrase commence par une lettre majuscule. Elle finit par un point, un point d’interrogation ou un point d’exclamation.",
      groups: [
        {
          t: "La phrase déclarative ( . )",
          en: "It tells something: a point",
          lines: [
            "Elle s’appelle Noura.",
            "Je m’appelle Amine.",
            "Je suis en 4ème année primaire.",
            "Elle s’appelle Dalia.",
            "J’ai huit ans.",
          ],
        },
        {
          t: "La phrase interrogative ( ? )",
          en: "It asks something: a question mark",
          lines: [
            "Comment il s’appelle ?",
            "Comment tu t’appelles ?",
            "Qui est-ce ?",
            "Quel âge as-tu ?",
          ],
        },
        {
          t: "La phrase exclamative ( ! )",
          en: "It shouts or shows surprise: an exclamation mark",
          lines: ["Regarde, Bouli !", "Ça va bien !", "Quelle surprise !"],
        },
      ],
      games: [
        { t: "🧐 C’est une phrase ?", x: "phrase" },
        { t: "✍️ . ? !", x: "ponct" },
        { t: "🔠 La majuscule", x: "maj" },
      ],
    },

    // Sentences for "Build the sentence" (picture + sentence)
    sentences: [
      { fr: "C’est un garçon.", img: "fouad" },
      { fr: "Il s’appelle Fouad.", img: "fouad" },
      { fr: "C’est une fille.", img: "stephanie" },
      { fr: "Elle s’appelle Stéphanie.", img: "stephanie" },
      { fr: "C’est un animal.", img: "c-mouton" },
      { fr: "C’est un mouton.", img: "mouton" },
      { fr: "C’est un homme et une femme.", img: "homme-femme" },
      { fr: "C’est un chat.", img: "minou" },
      { fr: "C’est un chien.", img: "bongo" },
      { fr: "C’est un bébé.", img: "michou" },
      { fr: "Oui, c’est un garçon.", img: "chadi" },
      { fr: "Non, c’est une femme.", img: "chirine" },
      { fr: "Regarde ! C’est un chien.", img: "ph-chien" },
      { fr: "Il s’appelle Simon.", img: "simon" },
      { fr: "Elle s’appelle Chirine.", img: "chirine" },
    ],

    // Words for "Build the word": a name (its picture is found), or {fr, img}
    build: [
      "Chadi",
      "Michou",
      "Chirine",
      "Bongo",
      "Simon",
      "Noura",
      "Minou",
      { fr: "garçon", img: "fouad" },
      { fr: "fille", img: "noura" },
      { fr: "homme", img: "simon" },
      { fr: "femme", img: "chirine" },
      { fr: "bébé", img: "michou" },
      { fr: "animal", img: "c-mouton" },
      { fr: "chat", img: "minou" },
      { fr: "chien", img: "bongo" },
      { fr: "mouton", img: "mouton" },
      "Regarde",
      "Oui",
      "Non",
    ],

    // School exercises (book, cahier, class work). One menu tile per section.
    exercises: [
      {
        k: "parle",
        t: "C’est un garçon ?",
        en: "Look and answer: oui or non",
        ic: "🗣️",
        img: "chadi",
        from: "Livre p. 11 · Parle 1–11",
        items: [
          [
            "chadi",
            "C’est un garçon ?",
            "Oui, c’est un garçon.",
            "Non, c’est une fille.",
            "Non, c’est un bébé.",
            "Il s’appelle Chadi.",
          ],
          [
            "michou",
            "C’est un bébé ?",
            "Oui, c’est un bébé.",
            "Non, c’est un garçon.",
            "Non, c’est un chat.",
            "Il s’appelle Michou.",
          ],
          [
            "noura",
            "C’est une fille ?",
            "Oui, c’est une fille.",
            "Non, c’est un garçon.",
            "Non, c’est une femme.",
            "Elle s’appelle Noura.",
          ],
          [
            "minou",
            "C’est un chat ?",
            "Oui, c’est un chat.",
            "Non, c’est un chien.",
            "Non, c’est un mouton.",
            "Il s’appelle Minou.",
          ],
          [
            "alice",
            "C’est un homme ?",
            "Non, c’est une fille.",
            "Oui, c’est un homme.",
            "Non, c’est un garçon.",
            "Elle s’appelle Alice.",
          ],
          [
            "chirine",
            "C’est un bébé ?",
            "Non, c’est une femme.",
            "Oui, c’est un bébé.",
            "Non, c’est une fille.",
            "Elle s’appelle Chirine.",
          ],
          [
            "bongo",
            "C’est un mouton ?",
            "Non, c’est un chien.",
            "Oui, c’est un mouton.",
            "Non, c’est un chat.",
            "Il s’appelle Bongo.",
          ],
          [
            "simon",
            "C’est un garçon ?",
            "Non, c’est un homme.",
            "Oui, c’est un garçon.",
            "Non, c’est une femme.",
            "Il s’appelle Simon.",
          ],
          [
            "parle-9",
            "C’est un homme et une fille ?",
            "Non, c’est une femme et un garçon.",
            "Oui, c’est un homme et une fille.",
            "Non, c’est un homme et un garçon.",
          ],
          [
            "parle-10",
            "C’est un chien et un chat ?",
            "Non, c’est un homme et un mouton.",
            "Oui, c’est un chien et un chat.",
            "Non, c’est une femme et un chien.",
          ],
          [
            "parle-11",
            "C’est un animal et un bébé ?",
            "Non, c’est une femme et une fille.",
            "Oui, c’est un animal et un bébé.",
            "Non, c’est un homme et un garçon.",
          ],
        ].map(([img, q, a, b, c, name]) => ({
          type: "mc",
          img,
          q,
          opts: [a, b, c],
          ...(name ? { full: `${a} ${name}` } : {}),
        })),
      },
      {
        k: "comment",
        t: "Comment il s’appelle ?",
        en: "What is his / her name?",
        ic: "❓",
        img: "michou",
        from: "Livre p. 11 · Parle : Comment il / elle s’appelle ?",
        items: "people-mc",
      },
      {
        k: "entoure",
        t: "Lis. Entoure ce qui est vrai.",
        en: "Read and choose the right name",
        ic: "⭕",
        img: "minou",
        from: "Cahier p. 6 ex. 2",
        items: [
          ["minou", "C’est un chat. Il s’appelle ___.", "Minou", "Simon"],
          ["bongo", "C’est un chien. Il s’appelle ___.", "Bongo", "Alice"],
          ["michou", "C’est un bébé. Il s’appelle ___.", "Michou", "Lina"],
          [
            "chirine",
            "C’est une femme. Elle s’appelle ___.",
            "Chirine",
            "Alice",
          ],
          ["noura", "C’est une fille. Elle s’appelle ___.", "Noura", "Chadi"],
        ].map(([img, q, a, b]) => ({
          type: "mc",
          img,
          q,
          opts: [a, b],
          two: true,
        })),
      },
      {
        k: "ecris",
        t: "Regarde chaque dessin. Écris.",
        en: "Look at each drawing and write",
        ic: "✍️",
        img: "c-mouton",
        from: "Cahier p. 6–7 ex. 3",
        items: [
          {
            type: "order",
            img: "c-mouton",
            fr: "C’est un animal. C’est un mouton.",
          },
          {
            type: "order",
            img: "fouad",
            fr: "C’est un garçon. Il s’appelle Fouad.",
          },
          {
            type: "order",
            img: "c-stephanie",
            fr: "C’est une fille. Elle s’appelle Stéphanie.",
          },
        ],
      },
      {
        k: "dessins",
        t: "Regarde les dessins. Écris.",
        en: "Look at the drawings and answer",
        ic: "👀",
        img: "c4-garcon-chien",
        from: "Cahier p. 7 ex. 4",
        items: [
          {
            type: "order",
            img: "bongo",
            q: "C’est un chien ? Comment il s’appelle ?",
            fr: "Oui, c’est un chien. Il s’appelle Bongo.",
          },
          {
            type: "order",
            img: "c4-homme-mouton",
            q: "C’est un garçon et un mouton ?",
            fr: "Non, c’est un homme et un mouton.",
          },
          {
            type: "order",
            img: "stephanie",
            q: "C’est une femme ? Comment elle s’appelle ?",
            fr: "Non, c’est une fille. Elle s’appelle Stéphanie.",
          },
          {
            type: "order",
            img: "c4-garcon-chien",
            q: "C’est un homme et un chat ?",
            fr: "Non, c’est un garçon et un chien.",
          },
        ],
      },
      {
        k: "phrase",
        t: "Mets un (x) si c’est une phrase.",
        en: "Is it a sentence?",
        ic: "🧐",
        emoji: "✅❌",
        from: "Cahier p. 7 ex. 5",
        items: [
          { fr: "Elle s’appelle Alice.", a: true, img: "alice" },
          {
            fr: "Il Bongo s’appelle",
            a: false,
            img: "bongo",
            fix: "Il s’appelle Bongo.",
          },
          { fr: "C’est un mouton et un garçon.", a: true, emoji: "🐑👦" },
          { fr: "Comment il s’appelle ?", a: true, emoji: "❓👦" },
          {
            fr: "c’est regarde Fouad",
            a: false,
            img: "fouad",
            fix: "Regarde, c’est Fouad !",
          },
          {
            fr: "C’est un animal et un garçon.",
            a: true,
            img: "c4-garcon-chien",
          },
        ].map((it) => ({
          type: "yn",
          ask: "🧐 C’est une phrase ?",
          x: it.a
            ? "Yes: a capital letter, the words in order, and . ? or ! at the end."
            : it.fix.startsWith("Il")
              ? "No: the words are not in order, and there is no point at the end."
              : "No: no capital letter, no end mark, and the words don’t make sense.",
          ...it,
        })),
      },
      {
        k: "maj",
        t: "Écris. Complète pour avoir une phrase.",
        en: "Add the capital letter",
        ic: "🔠",
        emoji: "🔠",
        from: "Cahier p. 7 ex. 6",
        items: [
          ["stephanie", ["c", "C"], "omment elle s’appelle ?"],
          ["chirine", ["J", "j"], "e m’appelle Chirine."],
          ["bouli", ["r", "R"], "egarde, c’est Bouli !"],
          ["chadi", ["C", "c"], "’est un garçon."],
          ["alice", ["e", "E"], "lle s’appelle Alice."],
          ["lesson-1/ask", ["C", "c"], "omment tu t’appelles ?"],
        ].map(([img, o, rest]) => ({
          type: "fill",
          img,
          parts: [o, rest],
          ans: [o.find((x) => x === x.toUpperCase())],
        })),
      },
      {
        k: "ponct",
        t: "Complète avec . ? !",
        en: "Add the end mark",
        ic: "✍️",
        emoji: "❓❗",
        from: "Travail de classe 2 (Devoir noté 2)",
        items: [
          ["lesson-1/ask", "Comment tu t’appelles", "?"],
          ["", "Elle s’appelle Pauline", ".", "👧"],
          ["chirine", "Non, c’est une femme", "."],
          ["", "En quelle classe es-tu", "?", "🏫"],
          ["lesson-1/mounir", "Regarde, c’est Mounir", "!"],
        ].map(([img, s, a, emoji]) => ({
          type: "fill",
          ...(img ? { img } : { emoji }),
          parts: [s, [".", "?", "!"]],
          ans: [a],
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
  (window.FR_DATA = window.FR_DATA || {})[2] = window.LESSON;
})();
