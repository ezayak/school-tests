// Français · Grade 3 · Léo et Théo Plus 1 · Unité 1 « Salut, les amis ! » (Livre p. 8–15): the friends, Comment tu t’appelles ?,
// les salutations, Comment ça va ?, the songs, l’intonation, Saluer et accueillir (le monde autour de toi). Book exercises only.
// Left out: p. 9 ex. 2 and p. 13 ex. 10 (songs: their words are in the story), p. 13 ex. 11 (listen and repeat: in the story),
// p. 14 ex. 2 (gestures, an open question), p. 14 ex. 4 (mime), p. 15 Brico (finger puppets).
// Unverified (no audio script): p. 11 ex. 7 and p. 12 ex. 9, the greeting that fits each picture (sun = bonjour, moon = bonsoir).
// The engine is grade-4/term-1/french/french-lesson.js. Pictures: img/unite-1/<name>.jpg (book scan out7, out8, out10, out11, own size).
// Videos: video/cartoon-1.mp4 (p. 8 ex. 1), video/civilisation-1.mp4 (p. 14 ex. 3); the book's files, re-encoded to 480p, online only.
(function () {
  // [French, English, Українська, العربية]
  const T = [
    ["Je m’appelle Léo !", "My name is Léo!", "Мене звати Лео!", "اسمي ليو!"],
    [
      "Et moi, c’est Théo ! Voilà mon ami Hector !",
      "And I’m Théo! Here is my friend Hector!",
      "А я Тео! Ось мій друг Гектор!",
      "وأنا تيو! هذا صديقي هكتور!",
    ],
    ["Je m’appelle Lin !", "My name is Lin!", "Мене звати Лін!", "اسمي لين!"],
    [
      "C’est moi ! Je m’appelle Ahmed !",
      "It’s me! My name is Ahmed!",
      "Це я! Мене звати Ахмед!",
      "هذا أنا! اسمي أحمد!",
    ],
    [
      "Et moi, Isabelle !",
      "And me, Isabelle!",
      "А я — Ізабель!",
      "وأنا إيزابيل!",
    ],
    [
      "Salut, les amis !",
      "Hi, friends!",
      "Привіт, друзі!",
      "مرحبًا يا أصدقاء!",
    ],
    // song « Léo et Théo »
    ["Moi c’est Léo", "I’m Léo", "Я — Лео", "أنا ليو"],
    ["et moi, c’est Théo.", "and I’m Théo.", "а я — Тео.", "وأنا تيو."],
    ["Nous sommes jumeaux,", "We are twins,", "Ми близнюки,", "نحن توأمان،"],
    ["oui, jumeaux !", "yes, twins!", "так, близнюки!", "نعم، توأمان!"],
    ["Je m’appelle Léo,", "My name is Léo,", "Мене звати Лео,", "اسمي ليو،"],
    [
      "tu t’appelles Théo.",
      "your name is Théo.",
      "тебе звати Тео.",
      "اسمك تيو.",
    ],
    [
      "Mais qui manque encore ?",
      "But who is still missing?",
      "Але кого ще бракує?",
      "لكن من ما زال غائبًا؟",
    ],
    [
      "Notre ami, le furet Hector !",
      "Our friend, Hector the ferret!",
      "Наш друг, тхір Гектор!",
      "صديقنا، ابن مقرض هكتور!",
    ],
    // Comment tu t’appelles ?
    [
      "Comment tu t’appelles ?",
      "What’s your name?",
      "Як тебе звати?",
      "ما اسمك؟",
    ],
    [
      "Je m’appelle Lin : L-I-N.",
      "My name is Lin: L-I-N.",
      "Мене звати Лін: L-I-N.",
      "اسمي لين: L-I-N.",
    ],
    [
      "Comment t’appelles-tu ?",
      "What’s your name?",
      "Як тебе звати?",
      "ما اسمك؟",
    ],
    [
      "Je m’appelle Théo et il s’appelle Léo.",
      "My name is Théo and his name is Léo.",
      "Мене звати Тео, а його — Лео.",
      "اسمي تيو واسمه ليو.",
    ],
    [
      "Et elle, c’est mon amie. Elle s’appelle Isabelle.",
      "And she is my friend. Her name is Isabelle.",
      "А вона — моя подруга. Її звати Ізабель.",
      "وهي صديقتي. اسمها إيزابيل.",
    ],
    // les salutations
    [
      "Bonjour, Ahmed !",
      "Hello, Ahmed!",
      "Добрий день, Ахмеде!",
      "صباح الخير يا أحمد!",
    ],
    [
      "Au revoir, maman !",
      "Goodbye, Mum!",
      "До побачення, мамо!",
      "إلى اللقاء يا أمي!",
    ],
    [
      "Bonne journée, les enfants !",
      "Have a nice day, children!",
      "Гарного дня, діти!",
      "يومًا سعيدًا يا أطفال!",
    ],
    [
      "Bonsoir, madame.",
      "Good evening, madam.",
      "Добрий вечір, пані.",
      "مساء الخير يا سيدتي.",
    ],
    [
      "Bonsoir, monsieur.",
      "Good evening, sir.",
      "Добрий вечір, пане.",
      "مساء الخير يا سيدي.",
    ],
    [
      "Bonne nuit, Hector !",
      "Good night, Hector!",
      "На добраніч, Гекторе!",
      "تصبح على خير يا هكتور!",
    ],
    // Comment ça va ?
    ["Comment ça va ?", "How are you?", "Як справи?", "كيف حالك؟"],
    ["Ça va !", "I’m OK!", "Добре!", "بخير!"],
    ["Ça va très bien !", "I’m very well!", "Дуже добре!", "بخير جدًا!"],
    ["Super !", "Great!", "Чудово!", "رائع!"],
    ["Comme ci, comme ça…", "So-so…", "Так собі…", "بين بين…"],
    ["Ça ne va pas…", "I’m not well…", "Погано…", "لست بخير…"],
    ["Ça va très mal…", "I’m very bad…", "Дуже погано…", "لست بخير أبدًا…"],
    // song « Bonjour, les amis ! »
    ["Bonjour !", "Hello!", "Добрий день!", "صباح الخير!"],
    ["Au revoir !", "Goodbye!", "До побачення!", "إلى اللقاء!"],
    ["Amis !", "Friends!", "Друзі!", "يا أصدقاء!"],
    [
      "Ça va très bien, merci !",
      "I’m very well, thank you!",
      "Дуже добре, дякую!",
      "بخير جدًا، شكرًا!",
    ],
    [
      "On va dormir ?",
      "Shall we go to sleep?",
      "Підемо спати?",
      "هل نذهب للنوم؟",
    ],
    ["Bonne nuit !", "Good night!", "На добраніч!", "تصبح على خير!"],
    [
      "ZZZ ZZZ ZZZ…",
      "Zzz zzz zzz… (sleeping)",
      "Хр-р-р… (сплять)",
      "خخخ… (نائمون)",
    ],
    // l’intonation
    [
      "Bonjour, madame Besson ! Comment ça va ?",
      "Hello, Mrs Besson! How are you?",
      "Добрий день, пані Бессон! Як справи?",
      "صباح الخير يا سيدة بيسون! كيف حالك؟",
    ],
    [
      "Ça va bien ! Merci !",
      "I’m well! Thank you!",
      "Добре! Дякую!",
      "بخير! شكرًا!",
    ],
    // exercises
    ["Qui est-ce ?", "Who is it?", "Хто це?", "من هذا؟"],
    ["C’est Léo ?", "Is it Léo?", "Це Лео?", "هل هذا ليو؟"],
    ["C’est Lin ?", "Is it Lin?", "Це Лін?", "هل هذه لين؟"],
    ["C’est Théo ?", "Is it Théo?", "Це Тео?", "هل هذا تيو؟"],
    ["C’est Isabelle ?", "Is it Isabelle?", "Це Ізабель?", "هل هذه إيزابيل؟"],
    ["C’est Ahmed ?", "Is it Ahmed?", "Це Ахмед?", "هل هذا أحمد؟"],
    ["Non !", "No!", "Ні!", "لا!"],
    ["Oui, c’est Léo.", "Yes, it’s Léo.", "Так, це Лео.", "نعم، هذا ليو."],
    ["Oui, c’est Lin.", "Yes, it’s Lin.", "Так, це Лін.", "نعم، هذه لين."],
    ["Oui, c’est Théo.", "Yes, it’s Théo.", "Так, це Тео.", "نعم، هذا تيو."],
    [
      "Oui, c’est Isabelle.",
      "Yes, it’s Isabelle.",
      "Так, це Ізабель.",
      "نعم، هذه إيزابيل.",
    ],
    [
      "Oui, c’est Ahmed.",
      "Yes, it’s Ahmed.",
      "Так, це Ахмед.",
      "نعم، هذا أحمد.",
    ],
    ["C’est Léo.", "It’s Léo.", "Це Лео.", "هذا ليو."],
    ["C’est Théo.", "It’s Théo.", "Це Тео.", "هذا تيو."],
    ["C’est Lin.", "It’s Lin.", "Це Лін.", "هذه لين."],
    ["C’est Ahmed.", "It’s Ahmed.", "Це Ахмед.", "هذا أحمد."],
    ["C’est Isabelle.", "It’s Isabelle.", "Це Ізабель.", "هذه إيزابيل."],
    ["C’est Hector.", "It’s Hector.", "Це Гектор.", "هذا هكتور."],
    ["Je m’appelle Lin.", "My name is Lin.", "Мене звати Лін.", "اسمي لين."],
    [
      "Je m’appelle Ahmed.",
      "My name is Ahmed.",
      "Мене звати Ахмед.",
      "اسمي أحمد.",
    ],
    ["Je m’appelle Théo.", "My name is Théo.", "Мене звати Тео.", "اسمي تيو."],
    [
      "Je m’appelle Isabelle.",
      "My name is Isabelle.",
      "Мене звати Ізабель.",
      "اسمي إيزابيل.",
    ],
    ["Elle s’appelle Lin.", "Her name is Lin.", "Її звати Лін.", "اسمها لين."],
    [
      "Il s’appelle Ahmed.",
      "His name is Ahmed.",
      "Його звати Ахмед.",
      "اسمه أحمد.",
    ],
    ["Il s’appelle Théo.", "His name is Théo.", "Його звати Тео.", "اسمه تيو."],
    [
      "Il s’appelle Hector.",
      "His name is Hector.",
      "Його звати Гектор.",
      "اسمه هكتور.",
    ],
    ["Il s’appelle Léo.", "His name is Léo.", "Його звати Лео.", "اسمه ليو."],
    [
      "Elle s’appelle Isabelle.",
      "Her name is Isabelle.",
      "Її звати Ізабель.",
      "اسمها إيزابيل.",
    ],
    [
      "Comment il s’appelle ?",
      "What’s his name?",
      "Як його звати?",
      "ما اسمه؟",
    ],
    [
      "Comment elle s’appelle ?",
      "What’s her name?",
      "Як її звати?",
      "ما اسمها؟",
    ],
    [
      "Que disent-ils ?",
      "What do they say?",
      "Що вони кажуть?",
      "ماذا يقولون؟",
    ],
    [
      "Bonjour, mademoiselle !",
      "Hello, miss!",
      "Добрий день, панно!",
      "صباح الخير يا آنسة!",
    ],
    [
      "Bonsoir, mademoiselle !",
      "Good evening, miss!",
      "Добрий вечір, панно!",
      "مساء الخير يا آنسة!",
    ],
    [
      "Bonne nuit, mademoiselle !",
      "Good night, miss!",
      "На добраніч, панно!",
      "تصبحين على خير يا آنسة!",
    ],
    [
      "Bonsoir, madame !",
      "Good evening, madam!",
      "Добрий вечір, пані!",
      "مساء الخير يا سيدتي!",
    ],
    [
      "Bonjour, madame !",
      "Hello, madam!",
      "Добрий день, пані!",
      "صباح الخير يا سيدتي!",
    ],
    [
      "Bonne nuit, madame !",
      "Good night, madam!",
      "На добраніч, пані!",
      "تصبحين على خير يا سيدتي!",
    ],
    [
      "Bonne nuit, maman !",
      "Good night, Mum!",
      "На добраніч, мамо!",
      "تصبحين على خير يا أمي!",
    ],
    [
      "Bonjour, maman !",
      "Hello, Mum!",
      "Добрий день, мамо!",
      "صباح الخير يا أمي!",
    ],
    [
      "Bonsoir, maman !",
      "Good evening, Mum!",
      "Добрий вечір, мамо!",
      "مساء الخير يا أمي!",
    ],
    ["Salut !", "Hi!", "Привіт!", "مرحبًا!"],
    ["Bonsoir !", "Good evening!", "Добрий вечір!", "مساء الخير!"],
    [
      "Bonjour, monsieur !",
      "Hello, sir!",
      "Добрий день, пане!",
      "صباح الخير يا سيدي!",
    ],
    [
      "Comment accueillir un nouveau camarade ?",
      "How do you welcome a new classmate?",
      "Як привітати нового однокласника?",
      "كيف نستقبل زميلًا جديدًا؟",
    ],
    [
      "Salut, bienvenue !",
      "Hi, welcome!",
      "Привіт, ласкаво просимо!",
      "مرحبًا، أهلًا بك!",
    ],
    ["C’est qui ?", "Who’s that?", "Хто це?", "من هذا؟"],
    ["Non, pas ici !", "No, not here!", "Ні, не тут!", "لا، ليس هنا!"],
    [
      "En France, on se fait la bise.",
      "In France, people kiss on the cheeks.",
      "У Франції цілують у щічки.",
      "في فرنسا، نتبادل القبلات على الخد.",
    ],
    [
      "Au Pôle Nord, on se frotte le nez.",
      "At the North Pole, people rub noses.",
      "На Північному полюсі труться носами.",
      "في القطب الشمالي، نفرك الأنوف.",
    ],
    [
      "En Inde, on joint les mains.",
      "In India, people put their hands together.",
      "В Індії складають долоні разом.",
      "في الهند، نضمّ اليدين.",
    ],
    [
      "Au Tibet, on tire la langue.",
      "In Tibet, people stick out their tongue.",
      "У Тибеті показують язика.",
      "في التبت، نُخرج اللسان.",
    ],
    [
      "Au Japon, on fait la révérence.",
      "In Japan, people bow.",
      "В Японії кланяються.",
      "في اليابان، ننحني.",
    ],
    ["Bonjour", "Hello", "Добрий день", "صباح الخير"],
    ["Salut", "Hi", "Привіт", "مرحبًا"],
    ["Bonsoir", "Good evening", "Добрий вечір", "مساء الخير"],
    ["Super", "Great", "Чудово", "رائع"],
    ["amis", "friends", "друзі", "أصدقاء"],
  ];
  const DICT = {};
  for (const [fr, en, uk, ar] of T) DICT[fr] = [en, uk, ar];
  const line = (who, fr) => ({ who, fr });
  // ex. 8: [picture, French]
  const CV = [
    ["cava", "Ça va !"],
    ["tresbien", "Ça va très bien !"],
    ["super", "Super !"],
    ["commeci", "Comme ci, comme ça…"],
    ["nevapas", "Ça ne va pas…"],
    ["tresmal", "Ça va très mal…"],
  ];
  // the right picture and two others, the right one in a different place each time
  const tapOf = (list, k) => {
    const others = list
      .filter((_, j) => j !== k)
      .filter((_, j) => (j + k) % 2 === 0)
      .slice(0, 2);
    const opts = [list[k][0], ...others.map((x) => x[0])];
    for (let r = 0; r < k % 3; r++) opts.push(opts.shift());
    return { type: "tap", say: list[k][1], opts, a: list[k][0] };
  };
  const FRIENDS = [
    ["Léo", "s-leo"],
    ["Théo", "s-theo"],
    ["Lin", "s-lin"],
    ["Ahmed", "s-ahmed"],
    ["Isabelle", "s-isabelle"],
    ["Hector", "s-hector"],
  ];
  const quiEst = ([name, img], k) => {
    const others = FRIENDS.filter((f) => f[0] !== name).slice(
      k % 4,
      (k % 4) + 2,
    );
    return {
      type: "mc",
      img,
      q: "Qui est-ce ?",
      opts: [`C’est ${name}.`, ...others.map((f) => `C’est ${f[0]}.`)],
    };
  };

  window.LESSON = {
    n: 1,
    key: "fr3-u1",
    imgDir: "unite-1",
    native: true,
    label: "Unité 1",
    grade: 3,
    title: "Salut, les amis !",
    en: "Hi, friends! · names, greetings, How are you?",
    uk: "Привіт, друзі! · імена, привітання, Як справи?",
    ar: "مرحبًا يا أصدقاء! · الأسماء، التحيات، كيف حالك؟",
    book: "Léo et Théo Plus 1 · Livre p. 8–15",
    cover: "amis",

    learn: [
      {
        k: "video",
        v: "cartoon-1",
        t: "Salut, les amis !",
        en: "Video: the cartoon",
        from: "Livre p. 8 ex. 1",
        img: "amis",
      },
      { k: "story", img: "s-hector" },
      { k: "words", img: "tresbien" },
      {
        k: "video",
        v: "civilisation-1",
        t: "Les salutations dans le monde",
        en: "Video: greetings around the world",
        from: "Livre p. 14 ex. 3",
        img: "japon",
      },
    ],
    play: [
      { k: "listen", img: "s-lin" },
      { k: "match", img: "s-ahmed" },
      { k: "ilelle", img: "s-isabelle" },
      { k: "bword", img: "sal1" },
    ],

    people: [
      {
        fr: "Léo",
        img: "s-leo",
        g: "il",
        en: "Léo, a boy",
        uk: "Лео, хлопчик",
        ar: "ليو، ولد",
      },
      {
        fr: "Théo",
        img: "s-theo",
        g: "il",
        en: "Théo, Léo’s twin brother",
        uk: "Тео, брат-близнюк Лео",
        ar: "تيو، توأم ليو",
      },
      {
        fr: "Lin",
        img: "s-lin",
        g: "elle",
        en: "Lin, a girl",
        uk: "Лін, дівчинка",
        ar: "لين، بنت",
      },
      {
        fr: "Ahmed",
        img: "s-ahmed",
        g: "il",
        en: "Ahmed, a boy",
        uk: "Ахмед, хлопчик",
        ar: "أحمد، ولد",
      },
      {
        fr: "Isabelle",
        img: "s-isabelle",
        g: "elle",
        en: "Isabelle, a girl",
        uk: "Ізабель, дівчинка",
        ar: "إيزابيل، بنت",
      },
      {
        fr: "Hector",
        img: "s-hector",
        g: "il",
        en: "Hector, the ferret",
        uk: "Гектор, тхір",
        ar: "هكتور، ابن مقرض",
      },
    ],

    // p. 11 les salutations, p. 12 Comment ça va ?
    phrases: [
      ...[
        "sal1:Bonjour, Ahmed !",
        "sal1:Salut, les amis !",
        "sal2:Au revoir, maman !",
        "sal2:Bonne journée, les enfants !",
        "sal3:Bonsoir, madame.",
        "sal4:Bonne nuit, Hector !",
        "tappelles:Comment tu t’appelles ?",
        "tresbien:Comment ça va ?",
      ]
        .map((s) => s.split(/:(.*)/))
        .map(([img, fr]) => ({
          fr,
          img,
          en: DICT[fr][0],
          uk: DICT[fr][1],
          ar: DICT[fr][2],
        })),
      ...CV.map(([img, fr]) => ({
        fr,
        img,
        en: DICT[fr][0],
        uk: DICT[fr][1],
        ar: DICT[fr][2],
      })),
    ],

    story: [
      // p. 8 ex. 1 Écoute et lis
      { img: "s-leo", lines: [line("Léo", "Je m’appelle Léo !")] },
      {
        img: "s-theo",
        lines: [line("Théo", "Et moi, c’est Théo ! Voilà mon ami Hector !")],
      },
      { img: "s-lin", lines: [line("Lin", "Je m’appelle Lin !")] },
      {
        img: "s-ahmed",
        lines: [line("Ahmed", "C’est moi ! Je m’appelle Ahmed !")],
      },
      { img: "s-isabelle", lines: [line("Isabelle", "Et moi, Isabelle !")] },
      { img: "s-hector", lines: [line("Hector", "Salut, les amis !")] },
      // p. 9 ex. 2 the song
      {
        title: "🎵 Léo et Théo",
        img: "amis",
        lines: [
          "Moi c’est Léo",
          "et moi, c’est Théo.",
          "Nous sommes jumeaux,",
          "oui, jumeaux !",
          "Je m’appelle Léo,",
          "tu t’appelles Théo.",
          "Mais qui manque encore ?",
          "Mais qui manque encore ?",
          "Notre ami, le furet Hector !",
        ].map((fr) => line("", fr)),
      },
      // p. 10 ex. 4 Comment tu t’appelles ?
      {
        img: "tappelles",
        lines: [
          line("Isabelle", "Comment tu t’appelles ?"),
          line("Lin", "Je m’appelle Lin : L-I-N."),
          line("Ahmed", "Comment t’appelles-tu ?"),
          line("Théo", "Je m’appelle Théo et il s’appelle Léo."),
          line("Léo", "Et elle, c’est mon amie. Elle s’appelle Isabelle."),
        ],
      },
      // p. 11 ex. 6 les salutations
      {
        img: "sal1",
        lines: [
          line("Léo", "Bonjour, Ahmed !"),
          line("Ahmed", "Salut, les amis !"),
        ],
      },
      {
        img: "sal2",
        lines: [
          line("Léo", "Au revoir, maman !"),
          line("", "Bonne journée, les enfants !"),
        ],
      },
      {
        img: "sal3",
        lines: [line("", "Bonsoir, madame."), line("", "Bonsoir, monsieur.")],
      },
      { img: "sal4", lines: [line("Léo", "Bonne nuit, Hector !")] },
      // p. 13 ex. 10 the song
      {
        title: "🎵 Bonjour, les amis !",
        img: "chante",
        lines: [
          "Bonjour !",
          "Bonjour !",
          "Au revoir !",
          "Au revoir !",
          "Salut, les amis !",
          "Amis !",
          "Comment ça va ?",
          "Ça va très bien, merci !",
          "Bonjour !",
          "Bonjour !",
          "Au revoir !",
          "Au revoir !",
          "Salut, les amis !",
          "Amis !",
          "On va dormir ?",
          "Bonne nuit !",
          "ZZZ ZZZ ZZZ…",
        ].map((fr) => line("", fr)),
      },
      // p. 13 ex. 11 Boîte à sons
      {
        title: "🔊 Boîte à sons · L’intonation",
        img: "besson",
        lines: [
          line("", "Bonjour, madame Besson ! Comment ça va ?"),
          line("", "Ça va bien ! Merci !"),
        ],
      },
    ],

    build: [
      { fr: "Bonjour", img: "sal1" },
      { fr: "Salut", img: "s-hector" },
      { fr: "Bonsoir", img: "sal3" },
      { fr: "Super", img: "super" },
      { fr: "amis", img: "amis" },
    ],

    exercises: [
      {
        k: "qui",
        t: "Écoute et lis",
        en: "Who is it?",
        img: "amis",
        from: "Livre p. 8 ex. 1",
        items: FRIENDS.map(quiEst),
      },
      {
        k: "joue",
        t: "Écoute et joue",
        en: "Is it…? Yes or no",
        img: "joue2",
        from: "Livre p. 9 ex. 3",
        items: [
          ["s-lin", "Léo", false],
          ["s-lin", "Lin", true],
          ["s-ahmed", "Théo", false],
          ["s-theo", "Théo", true],
          ["s-isabelle", "Isabelle", true],
          ["s-leo", "Théo", false],
        ].map(([img, n, yes]) => ({
          type: "mc",
          img,
          q: `C’est ${n} ?`,
          opts: yes
            ? [`Oui, c’est ${n}.`, "Non !"]
            : ["Non !", `Oui, c’est ${n}.`],
        })),
      },
      {
        k: "tappelles",
        t: "Comment tu t’appelles ?",
        en: "What’s your name? What’s his / her name?",
        img: "tappelles",
        from: "Livre p. 10 ex. 4",
        items: [
          {
            type: "mc",
            img: "s-lin",
            q: "Comment tu t’appelles ?",
            opts: [
              "Je m’appelle Lin.",
              "Je m’appelle Isabelle.",
              "Elle s’appelle Lin.",
            ],
          },
          {
            type: "mc",
            img: "s-ahmed",
            q: "Comment t’appelles-tu ?",
            opts: [
              "Je m’appelle Ahmed.",
              "Il s’appelle Ahmed.",
              "Je m’appelle Théo.",
            ],
          },
          {
            type: "mc",
            img: "s-leo",
            q: "Comment il s’appelle ?",
            opts: [
              "Il s’appelle Léo.",
              "Je m’appelle Théo.",
              "Il s’appelle Ahmed.",
            ],
          },
          {
            type: "mc",
            img: "s-isabelle",
            q: "Comment elle s’appelle ?",
            opts: [
              "Elle s’appelle Isabelle.",
              "Elle s’appelle Lin.",
              "Je m’appelle Isabelle.",
            ],
          },
        ],
      },
      {
        k: "epelle",
        t: "Écoute et joue",
        en: "Build the names from their letters: Luc, Camille, Charlotte",
        img: "ex5",
        from: "Livre p. 10 ex. 5",
        items: ["Luc", "Camille", "Charlotte"].map((fr) => ({
          type: "letters",
          fr,
          img: "ex5",
        })),
      },
      {
        k: "salutations",
        t: "Les salutations",
        en: "Match the pictures and the greetings",
        img: "sal2",
        from: "Livre p. 11 ex. 6",
        items: [
          {
            type: "match",
            pairs: [
              { img: "sal1", fr: "Bonjour, Ahmed !" },
              { img: "sal2", fr: "Au revoir, maman !" },
              { img: "sal3", fr: "Bonsoir, madame." },
              { img: "sal4", fr: "Bonne nuit, Hector !" },
            ],
          },
        ],
      },
      {
        k: "observe",
        t: "Observe. Que disent-ils ?",
        en: "Look: day, evening or night? What do they say?",
        img: "obs2",
        from: "Livre p. 11 ex. 7",
        // unverified: the book gives no answers (sun = bonjour, moon = bonsoir, a kiss at bedtime = bonne nuit)
        items: [
          {
            type: "mc",
            img: "obs1",
            q: "Que disent-ils ?",
            opts: [
              "Bonjour, mademoiselle !",
              "Bonsoir, mademoiselle !",
              "Bonne nuit, mademoiselle !",
            ],
          },
          {
            type: "mc",
            img: "obs2",
            q: "Que disent-ils ?",
            opts: [
              "Bonsoir, madame !",
              "Bonjour, madame !",
              "Bonne nuit, madame !",
            ],
          },
          {
            type: "mc",
            img: "obs3",
            q: "Que disent-ils ?",
            opts: [
              "Bonne nuit, maman !",
              "Bonjour, maman !",
              "Bonsoir, maman !",
            ],
          },
        ],
      },
      {
        k: "cava",
        t: "Comment ça va ?",
        en: "Listen, tap the face",
        img: "tresbien",
        from: "Livre p. 12 ex. 8",
        items: CV.map((_, k) => tapOf(CV, k)),
      },
      {
        k: "montre",
        t: "Écoute et montre la bonne image",
        en: "Listen, tap the picture: day or evening?",
        img: "soir-b",
        from: "Livre p. 12 ex. 9",
        // unverified: no audio script; the greeting that fits each picture
        items: [
          {
            type: "tap",
            say: "Salut !",
            opts: ["jour-a", "soir-b", "jour-c"],
            a: "jour-a",
          },
          {
            type: "tap",
            say: "Bonsoir !",
            opts: ["jour-a", "soir-b", "jour-c"],
            a: "soir-b",
          },
          {
            type: "tap",
            say: "Bonjour, monsieur !",
            opts: ["jour-a", "soir-b", "jour-c"],
            a: "jour-c",
          },
        ],
      },
      {
        k: "accueillir",
        t: "Saluer et accueillir",
        en: "How do you welcome a new classmate?",
        img: "acc1",
        from: "Livre p. 14 ex. 1",
        items: [
          {
            type: "mc",
            emoji: "🧒👋",
            q: "Comment accueillir un nouveau camarade ?",
            opts: ["Salut, bienvenue !", "C’est qui ?", "Non, pas ici !"],
          },
        ],
      },
      {
        k: "monde",
        t: "Les salutations dans le monde",
        en: "Match the pictures and the greetings of the world",
        img: "france",
        from: "Livre p. 14 ex. 3",
        items: [
          {
            type: "match",
            pairs: [
              { img: "france", fr: "En France, on se fait la bise." },
              { img: "pole", fr: "Au Pôle Nord, on se frotte le nez." },
              { img: "inde", fr: "En Inde, on joint les mains." },
              { img: "tibet", fr: "Au Tibet, on tire la langue." },
              { img: "japon", fr: "Au Japon, on fait la révérence." },
            ],
          },
        ],
      },
    ],

    dict: DICT,
    auto: () => null,
  };
  (window.FR_DATA = window.FR_DATA || {}).u1 = window.LESSON;
})();
