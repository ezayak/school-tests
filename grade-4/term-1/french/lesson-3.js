// Français · Grade 4 · Leçon 3 « Quel âge tu as ? » (Français plus 1, pages 12–13 · Cahier pages 8–9 · Devoir noté 1 du deuxième terme).
// Sources: the teacher's slides « Leçon 3 Quel âge tu as » (17 Nov; Parle 1–2 answers), the book scan french-lesson-3.pdf, the Devoir noté 1 (Term 2).
// Teacher's slide typo fixed: « Il a un ans » → « Il a un an. » (Michou, Parle 1).
// Left out: Cahier p. 8 ex. 1 (listening, no transcript), Livre p. 13 Parle 3–6 (personal / open speaking),
// Cahier p. 9 ex. 4 lines 1–4 (the girl's name is not on the page; only the age lines are built).
// Unverified (no key): Cahier p. 8 ex. 3 and p. 9 ex. 4 (answers worked out from the drawings: candles, the dog = Bongo).
// The verb rows for nous / vous / ils / elles (avoir) are simple sentences made for the lesson, not from the book.
// Pictures: img/lesson-3/<name>.jpg, or "lesson-2/fouad" (another lesson), or emoji.
(function () {
  const NAMES = {
    // name → [English, Українська, العربية]
    Bouli: ["Bouli", "Булі", "بولي"],
    Alice: ["Alice", "Аліса", "أليس"],
    Fouad: ["Fouad", "Фуад", "فؤاد"],
    Stéphanie: ["Stéphanie", "Стефані", "ستيفاني"],
    Mounir: ["Mounir", "Мунір", "منير"],
    Alain: ["Alain", "Ален", "آلان"],
    Bongo: ["Bongo", "Бонго", "بونغو"],
    Michou: ["Michou", "Мішу", "ميشو"],
    Minou: ["Minou", "Міну", "مينو"],
    Noura: ["Noura", "Нура", "نورا"],
    Wissam: ["Wissam", "Віссам", "وسام"],
    Mirna: ["Mirna", "Мірна", "ميرنا"],
  };
  const N = (n, i) => (NAMES[n] || [n, n, n])[i];
  const FEM = ["Alice", "Stéphanie", "Noura", "Mirna"]; // « C’est Stéphanie. » → هذه in Arabic
  // number → [English, Українська, العربية]
  const NUM = {
    un: ["one", "один", "واحد"],
    deux: ["two", "два", "اثنان"],
    trois: ["three", "три", "ثلاثة"],
    quatre: ["four", "чотири", "أربعة"],
    cinq: ["five", "п’ять", "خمسة"],
    six: ["six", "шість", "ستة"],
    sept: ["seven", "сім", "سبعة"],
    huit: ["eight", "вісім", "ثمانية"],
    neuf: ["nine", "дев’ять", "تسعة"],
    dix: ["ten", "десять", "عشرة"],
    onze: ["eleven", "одинадцять", "أحد عشر"],
  };
  // « … ans » → [English, Українська, العربية]
  const AGE = {
    un: ["one year old", "один рік", "سنة واحدة"],
    deux: ["two years old", "два роки", "سنتان"],
    trois: ["three years old", "три роки", "ثلاث سنوات"],
    quatre: ["four years old", "чотири роки", "أربع سنوات"],
    cinq: ["five years old", "п’ять років", "خمس سنوات"],
    six: ["six years old", "шість років", "ست سنوات"],
    sept: ["seven years old", "сім років", "سبع سنوات"],
    huit: ["eight years old", "вісім років", "ثماني سنوات"],
    neuf: ["nine years old", "дев’ять років", "تسع سنوات"],
    dix: ["ten years old", "десять років", "عشر سنوات"],
    onze: ["eleven years old", "одинадцять років", "إحدى عشرة سنة"],
  };
  // avoir + age: [English, English question, Українська, العربية]
  const OLD = {
    "J’ai": ["I am", "Am I", "Мені", "عمري"],
    "Tu as": ["You are", "Are you", "Тобі", "عمرك"],
    "Il a": ["He is", "Is he", "Йому", "عمره"],
    "Elle a": ["She is", "Is she", "Їй", "عمرها"],
    "Nous avons": ["We are", "Are we", "Нам", "عمرنا"],
    "Vous avez": ["You are", "Are you", "Вам", "عمركم"],
    "Ils ont": ["They are", "Are they", "Їм", "عمرهم"],
    "Elles ont": ["They are", "Are they", "Їм", "عمرهن"],
  };
  // avoir + a thing: [English, English question, Українська, العربية]
  const HAVE = {
    "J’ai": ["I have", "Do I have", "У мене є", "عندي"],
    "Tu as": ["You have", "Do you have", "У тебе є", "عندك"],
    "Il a": ["He has", "Does he have", "У нього є", "عنده"],
    "Elle a": ["She has", "Does she have", "У неї є", "عندها"],
  };
  const NOUNS = {
    "un copain": ["a friend", "друг", "صديق"],
    "une copine": ["a friend (a girl)", "подруга", "صديقة"],
    "un frère": ["a brother", "брат", "أخ"],
    "une sœur": ["a sister", "сестра", "أخت"],
    "un chien": ["a dog", "собака", "كلب"],
    "un chat": ["a cat", "кіт", "قطة"],
    "un mouton": ["a sheep", "вівця", "خروف"],
  };

  const DICT = {
    "J’ai deux copains : Mounir et Fouad.": [
      "I have two friends: Mounir and Fouad.",
      "У мене двоє друзів: Мунір і Фуад.",
      "عندي صديقان: منير وفؤاد.",
    ],
    "Bonjour, Fouad.": ["Hello, Fouad.", "Привіт, Фуаде.", "مرحبًا يا فؤاد."],
    "Quel âge tu as ?": ["How old are you?", "Скільки тобі років?", "كم عمرك؟"],
    "Quel âge il a ?": ["How old is he?", "Скільки йому років?", "كم عمره؟"],
    "Quel âge elle a ?": ["How old is she?", "Скільки їй років?", "كم عمرها؟"],
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
    "Moi, j’ai une copine.": [
      "Me, I have a friend (a girl).",
      "А в мене є подруга.",
      "أنا عندي صديقة.",
    ],
    "Moi, j’ai un frère.": [
      "Me, I have a brother.",
      "А в мене є брат.",
      "أنا عندي أخ.",
    ],
    "Oh, non !": ["Oh, no!", "Ой, ні!", "أوه، لا!"],
    "Bouli a quatre mains !": [
      "Bouli has four hands!",
      "У Булі чотири руки!",
      "بولي عنده أربع أيادٍ!",
    ],
    Oui: ["Yes", "Так", "نعم"],
    // Cahier p. 8 ex. 2
    "Alain a un frère.": [
      "Alain has a brother.",
      "В Алена є брат.",
      "آلان عنده أخ.",
    ],
    "Alice a une sœur.": [
      "Alice has a sister.",
      "В Аліси є сестра.",
      "أليس عندها أخت.",
    ],
    "Fouad a trois copains et deux copines.": [
      "Fouad has three friends (boys) and two friends (girls).",
      "У Фуада троє друзів і дві подруги.",
      "فؤاد عنده ثلاثة أصدقاء وصديقتان.",
    ],
    "Wissam a huit ans.": [
      "Wissam is eight years old.",
      "Віссаму вісім років.",
      "عمر وسام ثماني سنوات.",
    ],
    "Wissam a un frère.": [
      "Wissam has a brother.",
      "У Віссама є брат.",
      "وسام عنده أخ.",
    ],
    "Mirna a une sœur : c’est Alice.": [
      "Mirna has a sister: it’s Alice.",
      "У Мірни є сестра: це Аліса.",
      "ميرنا عندها أخت: إنها أليس.",
    ],
    "Mirna a six ans.": [
      "Mirna is six years old.",
      "Мірні шість років.",
      "عمر ميرنا ست سنوات.",
    ],
    "Fouad a 2 copines et 3 copains.": [
      "Fouad has 2 friends (girls) and 3 friends (boys).",
      "У Фуада 2 подруги і 3 друзі.",
      "فؤاد عنده صديقتان و3 أصدقاء.",
    ],
    // Cahier p. 8 ex. 3, p. 9 ex. 6
    "C’est un chien.": ["It’s a dog.", "Це собака.", "هذا كلب."],
    "C’est une fille.": ["It’s a girl.", "Це дівчинка.", "هذه بنت."],
    "C’est un bébé.": ["It’s a baby.", "Це немовля.", "هذا طفل رضيع."],
    "Stéphanie a un frère.": [
      "Stéphanie has a brother.",
      "У Стефані є брат.",
      "ستيفاني عندها أخ.",
    ],
    // Devoir noté 1 (Term 2)
    "Vous avez une belle classe.": [
      "You have a beautiful classroom.",
      "У вас гарний клас.",
      "عندكم صف جميل.",
    ],
    "Nous avons des stylos bleus.": [
      "We have blue pens.",
      "У нас є сині ручки.",
      "عندنا أقلام زرقاء.",
    ],
    "Ils ont des devoirs.": [
      "They have homework.",
      "У них є домашні завдання.",
      "عندهم واجبات.",
    ],
  };

  const arP = (e) => (e === "?" ? "؟" : e);
  const YN = {
    "Oui, ": ["Yes, ", "Так, ", "نعم، "],
    "Non, ": ["No, ", "Ні, ", "لا، "],
  };
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  // one sentence → [English, Українська, العربية] or null
  function one(s) {
    let m;
    s = s.replace(/^– /, ""); // « – J’ai huit ans. » (an answer in a dialogue line)
    if (NUM[s]) return NUM[s];
    // « Il a neuf ans. », « Tu as cinq ans ? », « Non, j’ai huit ans. »
    if (
      (m = s.match(
        /^(Oui, |Non, )?(J’ai|j’ai|Tu as|Il a|Elle a|Nous avons|Vous avez|Ils ont|Elles ont) (\S+) ans? ?([.?!])$/,
      ))
    ) {
      const S = OLD[cap(m[2])],
        A = AGE[m[3]],
        e = m[4],
        y = YN[m[1] || ""] || ["", "", ""];
      if (!A) return null;
      if (e === "?" && !m[1])
        return [`${S[1]} ${A[0]}?`, `${S[2]} ${A[1]}?`, `هل ${S[3]} ${A[2]}؟`];
      return [
        `${y[0]}${y[0] && !S[0].startsWith("I ") ? S[0][0].toLowerCase() + S[0].slice(1) : S[0]} ${A[0]}${e}`,
        `${y[1]}${y[1] ? S[2].toLowerCase() : S[2]} ${A[1]}${e}`,
        `${y[2]}${S[3]} ${A[2]}${arP(e)}`,
      ];
    }
    // « Tu as une sœur ? », « Il a un copain. »
    if (
      (m = s.match(/^(J’ai|j’ai|Tu as|Il a|Elle a) (une? \S+) ?([.?!])$/)) &&
      NOUNS[m[2]]
    ) {
      const H = HAVE[cap(m[1])],
        X = NOUNS[m[2]],
        e = m[3];
      if (e === "?")
        return [`${H[1]} ${X[0]}?`, `${H[2]} ${X[1]}?`, `هل ${H[3]} ${X[2]}؟`];
      return [`${H[0]} ${X[0]}.`, `${H[2]} ${X[1]}.`, `${H[3]} ${X[2]}.`];
    }
    // « deux et trois = cinq » (Cahier p. 9 ex. 5)
    if ((m = s.match(/^(\S+) et (\S+) = (\S+)$/)) && NUM[m[1]] && NUM[m[2]]) {
      const [a, b, c] = [m[1], m[2], m[3]].map((x) => NUM[x]);
      if (!c) return null;
      return [0, 1, 2].map((i) =>
        i === 2
          ? `${a[i]} و${b[i]} = ${c[i]}`
          : `${a[i]} ${i ? "і" : "and"} ${b[i]} = ${c[i]}`,
      );
    }
    if ((m = s.match(/^(Il|Elle) s’appelle (\S+?) ?\.?$/))) {
      const il = m[1] === "Il";
      return [
        `${il ? "His" : "Her"} name is ${N(m[2], 0)}.`,
        `${il ? "Його" : "Її"} звати ${N(m[2], 1)}.`,
        `${il ? "اسمه" : "اسمها"} ${N(m[2], 2)}.`,
      ];
    }
    if ((m = s.match(/^[Cc]’est (\S+?) ?([.!])$/)) && NAMES[m[1]])
      return [
        `It’s ${N(m[1], 0)}${m[2]}`,
        `Це ${N(m[1], 1)}${m[2]}`,
        `${FEM.includes(m[1]) ? "هذه" : "هذا"} ${N(m[1], 2)}${m[2]}`,
      ];
    return null;
  }

  // the people of Parle 1–2 (p. 13) and the story: [name, picture, il/elle, age, English, Українська, العربية]
  const PEOPLE = [
    [
      "Mounir",
      "mounir",
      "il",
      "neuf",
      "Mounir, 9",
      "Мунір, 9 років",
      "منير، 9 سنوات",
    ],
    [
      "Bongo",
      "bongo",
      "il",
      "deux",
      "Bongo, the dog, 2",
      "Бонго, собака, 2 роки",
      "بونغو، الكلب، سنتان",
    ],
    [
      "Michou",
      "michou",
      "il",
      "un",
      "Michou, the baby, 1",
      "Мішу, немовля, 1 рік",
      "ميشو، الطفل، سنة واحدة",
    ],
    [
      "Minou",
      "minou",
      "il",
      "sept",
      "Minou, the cat, 7",
      "Міну, кіт, 7 років",
      "مينو، القط، 7 سنوات",
    ],
    [
      "Alice",
      "alice",
      "elle",
      "huit",
      "Alice, 8",
      "Аліса, 8 років",
      "أليس، 8 سنوات",
    ],
    [
      "Stéphanie",
      "stephanie",
      "elle",
      "dix",
      "Stéphanie, 10",
      "Стефані, 10 років",
      "ستيفاني، 10 سنوات",
    ],
    [
      "Noura",
      "noura",
      "elle",
      "sept",
      "Noura, 7",
      "Нура, 7 років",
      "نورا، 7 سنوات",
    ],
    [
      "Fouad",
      "lesson-2/fouad",
      "il",
      "neuf",
      "Fouad, 9",
      "Фуад, 9 років",
      "فؤاد، 9 سنوات",
    ],
    [
      "Alain",
      "panel5",
      "il",
      "trois",
      "Alain, Fouad’s brother, 3",
      "Ален, брат Фуада, 3 роки",
      "آلان، أخو فؤاد، 3 سنوات",
    ],
  ];
  const G = (g) => (g === "elle" ? "Elle" : "Il");
  const ageSay = (g, n) => `${G(g)} a ${n} ${n === "un" ? "an" : "ans"}.`;
  const WORDS = Object.keys(NUM).slice(0, 10); // un … dix
  const KEY = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

  window.LESSON = {
    n: 3,
    grade: 4,
    title: "Quel âge tu as ?",
    en: "How old are you?",
    uk: "Скільки тобі років?",
    ar: "كم عمرك؟",
    book: "Français plus 1 · pages 12–13 · Cahier pages 8–9",
    cover: "comic",

    // Menu tiles and their pictures. Titles come from MODES in french-lesson.js (the verb's from verb.t).
    learn: [
      { k: "story", img: "panel2" },
      { k: "words", img: "num-5" },
      { k: "sound", s: "ain", img: "panel4" },
      { k: "verb", img: "verbe" },
    ],
    play: [
      { k: "listen", img: "mounir" },
      { k: "match", img: "alice" },
      {
        k: "game",
        t: "Quel âge ?",
        en: "How old? Look at the number",
        img: "michou",
        items: PEOPLE.slice(0, 7).map(([fr, img, g, n]) => {
          const i = WORDS.indexOf(n);
          const near = [
            WORDS[i + 1] || WORDS[i - 2],
            WORDS[i - 1] || WORDS[i + 2],
          ];
          return {
            type: "mc",
            img,
            q: `${G(g)} a ___ ${n === "un" ? "an" : "ans"}.`,
            opts: [n, ...near],
            full: ageSay(g, n),
          };
        }),
      },
      {
        k: "game",
        t: "Les nombres",
        en: "Hear a number, tap its card",
        img: "num-7",
        // the right card moves: 1st, 2nd, 3rd place in turn
        items: WORDS.map((w, i) => {
          const others = [WORDS[(i + 3) % 10], WORDS[(i + 6) % 10]];
          const opts = others.slice();
          opts.splice(i % 3, 0, w);
          return {
            type: "tap",
            say: w,
            opts: opts.map((x) => "num-" + (WORDS.indexOf(x) + 1)),
            a: "num-" + (i + 1),
          };
        }),
      },
      { k: "bword", img: "num-3" },
      { k: "bsent", img: "panel3" },
      { k: "ilelle", img: "stephanie" },
    ],

    // The people of the lesson with their age (Parle 1–2, the story).
    people: PEOPLE.map(([fr, img, g, n, en, uk, ar]) => ({
      fr,
      img,
      g,
      say: `${G(g)} s’appelle ${fr}. ${ageSay(g, n)}`,
      en,
      uk,
      ar,
    })),

    // Words & phrases (flash cards): the numbers (p. 12), the story's words, the liaisons (p. 13).
    phrases: [
      ...WORDS.map((w, i) => ({
        fr: w,
        img: "num-" + (i + 1),
        en: `${i + 1} · ${NUM[w][0]}`,
        uk: `${i + 1} · ${NUM[w][1]}`,
        ar: `${i + 1} · ${NUM[w][2]}`,
      })),
      {
        fr: "Quel âge tu as ?",
        img: "panel2",
        en: "How old are you?",
        uk: "Скільки тобі років?",
        ar: "كم عمرك؟",
      },
      {
        fr: "un copain",
        img: "panel1",
        en: "a friend (a boy)",
        uk: "друг",
        ar: "صديق",
      },
      {
        fr: "une copine",
        img: "panel3",
        en: "a friend (a girl)",
        uk: "подруга",
        ar: "صديقة",
      },
      { fr: "un frère", img: "panel4", en: "a brother", uk: "брат", ar: "أخ" },
      {
        fr: "une sœur",
        img: "ph-soeur",
        en: "a sister",
        uk: "сестра",
        ar: "أخت",
      },
      { fr: "une main", img: "ph-mains", en: "a hand", uk: "рука", ar: "يد" },
      // Phonétique p. 13: liaisons avec les chiffres (the voice links the words)
      {
        fr: "un an",
        emoji: "1️⃣🎂",
        en: "one year",
        uk: "один рік",
        ar: "سنة واحدة",
      },
      {
        fr: "un animal",
        img: "lesson-2/c-mouton",
        en: "an animal",
        uk: "тварина",
        ar: "حيوان",
      },
      {
        fr: "deux ans",
        emoji: "2️⃣🎂",
        en: "two years",
        uk: "два роки",
        ar: "سنتان",
      },
      {
        fr: "trois hommes",
        emoji: "3️⃣👨",
        en: "three men",
        uk: "троє чоловіків",
        ar: "ثلاثة رجال",
      },
      {
        fr: "six ans",
        emoji: "6️⃣🎂",
        en: "six years",
        uk: "шість років",
        ar: "ست سنوات",
      },
      {
        fr: "dix hommes",
        emoji: "🔟👨",
        en: "ten men",
        uk: "десять чоловіків",
        ar: "عشرة رجال",
      },
      {
        fr: "quatre ans",
        emoji: "4️⃣🎂",
        en: "four years",
        uk: "чотири роки",
        ar: "أربع سنوات",
      },
      {
        fr: "cinq hommes",
        emoji: "5️⃣👨",
        en: "five men",
        uk: "п’ятеро чоловіків",
        ar: "خمسة رجال",
      },
      {
        fr: "sept ans",
        emoji: "7️⃣🎂",
        en: "seven years",
        uk: "сім років",
        ar: "سبع سنوات",
      },
      {
        fr: "neuf ans",
        emoji: "9️⃣🎂",
        en: "nine years",
        uk: "дев’ять років",
        ar: "تسع سنوات",
      },
    ],

    // The story (page 12, the Lis text), then « Des phrases pour parler ».
    story: [
      {
        img: "panel1",
        lines: [
          { who: "Stéphanie", fr: "J’ai deux copains : Mounir et Fouad." },
        ],
      },
      {
        img: "panel2",
        lines: [
          { who: "Bouli", fr: "Bonjour, Fouad. Quel âge tu as ?" },
          { who: "Fouad", fr: "J’ai neuf ans." },
        ],
      },
      {
        img: "panel3",
        lines: [
          {
            who: "Alice",
            fr: "Moi, j’ai une copine. C’est Stéphanie. Elle a dix ans.",
          },
        ],
      },
      {
        img: "panel4",
        lines: [
          { who: "Fouad", fr: "Moi, j’ai un frère. Il s’appelle Alain." },
        ],
      },
      {
        img: "panel5",
        lines: [
          { who: "Bouli", fr: "Il a six ans ?" },
          { who: "Fouad", fr: "Oh, non ! Il a trois ans !" },
        ],
      },
      {
        img: "ph-mains",
        title: "Des phrases pour parler",
        lines: [{ who: "", fr: "Bouli a quatre mains !" }],
      },
      {
        img: "ph-cinq",
        title: "Des phrases pour parler",
        lines: [
          { who: "", fr: "Tu as cinq ans ?" },
          { who: "", fr: "Non, j’ai huit ans." },
        ],
      },
      {
        img: "ph-soeur",
        title: "Des phrases pour parler",
        lines: [
          { who: "", fr: "Tu as une sœur ?" },
          { who: "", fr: "Oui" },
          { who: "", fr: "Quel âge elle a ?" },
          { who: "", fr: "Elle a sept ans." },
        ],
      },
    ],

    // Phonétique (page 13): ain = [ɛ̃]
    sounds: [
      {
        s: "ain",
        ipa: "[ɛ̃]",
        intro: "Le son ain, comme Alain.",
        hear: "ain… ain… Alain, un copain, une main",
        img: "phonetique",
        words: ["Alain", "un copain", "une main", "quatre mains"],
        pics: { "quatre mains": "ph-mains" },
        not: ["une copine", "un an", "Fouad", "un frère", "une sœur", "Noura"],
      },
    ],

    // Le verbe avoir (page 13; nous / vous / ils / elles from the teacher's slide).
    verb: {
      t: "Le verbe avoir",
      en: "The verb avoir (to have)",
      img: "verbe",
      games: [
        { t: "✍️ ai, as, a", x: "aiasa" },
        { t: "👤 J’, Tu, Il, Elle", x: "pronoms" },
        { t: "📝 Complète avec avoir", x: "devoir" },
      ],
      rows: [
        { p: "J’", stem: "", end: "ai", name: "sept ans", img: "noura" },
        { p: "Tu", stem: "", end: "as", name: "huit ans", img: "alice" },
        { p: "Il", stem: "", end: "a", name: "neuf ans", img: "mounir" },
        { p: "Elle", stem: "", end: "a", name: "dix ans", img: "stephanie" },
        { p: "Nous", stem: "av", end: "ons", name: "dix ans", emoji: "👫" },
        { p: "Vous", stem: "av", end: "ez", name: "huit ans", emoji: "🧑‍🤝‍🧑" },
        { p: "Ils", stem: "", end: "ont", name: "six ans", emoji: "👬" },
        { p: "Elles", stem: "", end: "ont", name: "cinq ans", emoji: "👭" },
      ],
    },

    // Sentences for "Build the sentence" (picture + sentence)
    sentences: [
      { fr: "Quel âge tu as ?", img: "panel2" },
      { fr: "J’ai neuf ans.", img: "panel2" },
      { fr: "J’ai une copine.", img: "panel3" },
      { fr: "Elle a dix ans.", img: "stephanie" },
      { fr: "J’ai un frère.", img: "panel4" },
      { fr: "Il s’appelle Alain.", img: "panel4" },
      { fr: "Il a trois ans.", img: "panel5" },
      { fr: "Tu as une sœur ?", img: "ph-soeur" },
      { fr: "Elle a sept ans.", img: "noura" },
      { fr: "Il a un an.", img: "michou" },
      { fr: "Il a deux ans.", img: "bongo" },
      { fr: "Elle a huit ans.", img: "alice" },
    ],

    // Words for "Build the word": the numbers (emoji, the cards show the word) and the story's words
    build: [
      ...WORDS.map((w, i) => ({ fr: w, emoji: KEY[i] })),
      { fr: "copain", img: "panel1" },
      { fr: "copine", img: "panel3" },
      { fr: "frère", img: "panel4" },
      { fr: "sœur", img: "ph-soeur" },
      "Alain",
    ],

    // School exercises (book, cahier, homework). One menu tile per section.
    exercises: [
      {
        k: "parle",
        t: "Comment il s’appelle ? Quel âge il a ?",
        en: "Look at the name and the number",
        ic: "🗣️",
        img: "michou",
        from: "Livre p. 13 · Parle 1 et 2",
        keep: true,
        items: PEOPLE.slice(0, 7).map(([fr, img, g, n]) => {
          const i = WORDS.indexOf(n);
          const other = WORDS[i + 2] || WORDS[i - 2];
          const name = PEOPLE.find((p) => p[2] === g && p[0] !== fr)[0];
          const a = `${G(g)} s’appelle ${fr}. ${ageSay(g, n)}`;
          return {
            type: "mc",
            img,
            q: `Comment ${g} s’appelle ? Quel âge ${g} a ?`,
            opts: [
              a,
              `${G(g)} s’appelle ${fr}. ${ageSay(g, other)}`,
              `${G(g)} s’appelle ${name}. ${ageSay(g, n)}`,
            ],
          };
        }),
      },
      {
        k: "lis",
        t: "Lis. Entoure ce qui est vrai.",
        en: "Read, then choose what is true",
        ic: "📖",
        emoji: "📖",
        from: "Cahier p. 8 ex. 2",
        keep: true,
        text: {
          emoji: "👦👧",
          lines: [
            "Alain a un frère. Il s’appelle Wissam. Il a huit ans.",
            "Alice a une sœur. Elle s’appelle Mirna. Elle a six ans.",
            "Fouad a trois copains et deux copines.",
          ],
        },
        items: [
          {
            type: "mc",
            emoji: "👦",
            q: "Wissam a ___ ans.",
            opts: ["8", "6"],
            two: true,
            full: "Wissam a huit ans.",
          },
          {
            type: "mc",
            emoji: "👦👦",
            q: "Wissam a un frère. Il s’appelle ___.",
            opts: ["Alain", "Fouad"],
            two: true,
          },
          {
            type: "mc",
            emoji: "👧👧",
            q: "Mirna a ___ : c’est Alice.",
            opts: ["une sœur", "une copine"],
            two: true,
          },
          {
            type: "mc",
            emoji: "👧",
            q: "Mirna a ___ ans.",
            opts: ["6", "8"],
            two: true,
            full: "Mirna a six ans.",
          },
          {
            type: "fill",
            emoji: "👦",
            parts: [
              "Fouad a ",
              ["2", "3"],
              " copines et ",
              ["2", "3"],
              " copains.",
            ],
            ans: ["2", "3"],
          },
        ],
      },
      {
        k: "ecris",
        t: "Regarde les dessins. Écris.",
        en: "Look at the drawings and write",
        ic: "✍️",
        img: "c-fille",
        from: "Cahier p. 8 ex. 3",
        keep: true,
        // unverified: no key; the dog is Bongo's drawing, the girl's cake has 4 candles, the baby's 1
        items: [
          {
            type: "order",
            img: "c-chien",
            fr: "C’est un chien. Il s’appelle Bongo.",
          },
          {
            type: "order",
            img: "c-fille",
            fr: "C’est une fille. Elle a quatre ans.",
          },
          { type: "order", img: "c-bebe", fr: "C’est un bébé. Il a un an." },
        ],
      },
      {
        k: "dessin",
        t: "Regarde le dessin. Écris.",
        en: "Alice asks Fouad about the girl",
        ic: "🎂",
        img: "c-anniv",
        from: "Cahier p. 9 ex. 4 (the age lines)",
        keep: true,
        // unverified: no key; 4 candles on the cake. The name lines wait for the girl's name.
        items: [
          {
            type: "order",
            img: "c-anniv",
            q: "Alice :",
            fr: "Quel âge elle a ?",
          },
          {
            type: "order",
            img: "c-anniv",
            q: "Quel âge elle a ?",
            fr: "Elle a quatre ans.",
          },
        ],
      },
      {
        k: "calcul",
        t: "Écris.",
        en: "Add the numbers",
        ic: "➕",
        emoji: "➕",
        from: "Cahier p. 9 ex. 5",
        keep: true,
        items: [
          ["deux", "deux"],
          ["deux", "trois"],
          ["trois", "cinq"],
          ["quatre", "trois"],
          ["deux", "sept"],
          ["cinq", "quatre"],
          ["neuf", "un"],
          ["un", "huit"],
          ["deux", "quatre"],
        ].map(([a, b]) => {
          const i = WORDS.indexOf(a) + WORDS.indexOf(b) + 1;
          return {
            type: "mc",
            emoji: `${KEY[WORDS.indexOf(a)]}➕${KEY[WORDS.indexOf(b)]}`,
            q: `${a} et ${b} = ___`,
            opts: [WORDS[i], WORDS[i - 1], WORDS[i + 1] || WORDS[i - 2]],
          };
        }),
      },
      {
        k: "aiasa",
        t: "Écris ai, as, a.",
        en: "Complete the verb avoir",
        ic: "✍️",
        img: "verbe",
        from: "Cahier p. 9 ex. 6",
        keep: true,
        items: [
          [
            "panel2",
            ["Quel âge tu ", 0, " ? – J’", 0, " huit ans."],
            ["as", "ai"],
          ],
          [
            "stephanie",
            ["Stéphanie ", 0, " un frère. Elle ", 0, " une sœur."],
            ["a", "a"],
          ],
          [
            "panel3",
            ["Il ", 0, " un copain. Moi, j’", 0, " une copine."],
            ["a", "ai"],
          ],
          [
            "",
            [
              "Tu ",
              0,
              " dix ans. Quel âge elle ",
              0,
              " ? Quel âge il ",
              0,
              " ?",
            ],
            ["as", "a", "a"],
            "🎂❓",
          ],
        ].map(([img, parts, ans, emoji]) => ({
          type: "fill",
          ...(img ? { img } : { emoji }),
          parts: parts.map((p) => (p === 0 ? ["ai", "as", "a"] : p)),
          ans,
        })),
      },
      {
        k: "pronoms",
        t: "Écris J’, Tu, Il, Elle.",
        en: "Who? Look at the verb and the picture",
        ic: "👤",
        img: "alice",
        from: "Cahier p. 9 ex. 7",
        keep: true,
        // one sentence per item: « ___ a … » can be Il or Elle, the picture decides
        items: [
          ["alice", " as huit ans.", "Tu"],
          ["noura", " a sept ans.", "Elle"],
          ["panel1", "ai un copain.", "J’"],
          ["panel3", " as une copine.", "Tu"],
          ["lesson-2/c4-garcon-chien", " a un chien.", "Il"],
          ["lesson-2/minou", "ai un chat.", "J’"],
          ["lesson-2/mouton", " as un mouton.", "Tu"],
        ].map(([img, rest, a]) => ({
          type: "fill",
          img,
          parts: [["J’", "Tu", "Il", "Elle"], rest],
          ans: [a],
        })),
      },
      {
        k: "devoir",
        t: "Complète avec le verbe avoir.",
        en: "Complete with avoir (all persons)",
        ic: "🏠",
        img: "verbe",
        from: "Devoir noté 1 du deuxième terme · ex. 1",
        keep: true,
        items: [
          ["", "Vous ", " une belle classe.", "avez", "🏫"],
          ["", "Nous ", " des stylos bleus.", "avons", "🖊️🖊️"],
          ["", "Tu ", " onze ans.", "as", "🎂"],
          ["", "Ils ", " des devoirs.", "ont", "📚"],
          ["mounir", "J’", " neuf ans.", "ai"],
        ].map(([img, a, b, ans, emoji]) => ({
          type: "fill",
          ...(img ? { img } : { emoji }),
          parts: [a, ["ai", "as", "a", "avons", "avez", "ont"], b],
          ans: [ans],
        })),
      },
      {
        k: "lettres",
        t: "Écris en lettres.",
        en: "Write the number in letters",
        ic: "🔤",
        emoji: "🔢",
        from: "Devoir noté 1 du deuxième terme · ex. 2",
        keep: true,
        items: [4, 6, 7, 8, 9, 10].map((n) => ({
          type: "letters",
          fr: WORDS[n - 1],
          emoji: KEY[n - 1],
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
  (window.FR_DATA = window.FR_DATA || {})[3] = window.LESSON;
})();
