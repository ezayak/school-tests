// Français · Grade 3 · Léo et Théo Plus 1 · Unité 2 « Voici ma famille ! » (Livre p. 16–25): the family, Quel âge as-tu ? (0 à 12),
// les animaux domestiques, the songs, le son [y], les bébés animaux, Mes compétences 1·2 (l’arbre généalogique). Book exercises only.
// Left out: p. 21 ex. 13 (find the dogs and tortoises in the picture), p. 22 ex. 1 and ex. 3 (personal choices), p. 23 Brico,
// p. 25 ex. 2–3 (draw and describe a classmate's family tree). Songs (p. 17 ex. 4, p. 21 ex. 12) and dialogues are in the story.
// The engine is grade-4/term-1/french/french-lesson.js. Pictures: img/unite-2/<name>.jpg (book scan out12–out19, own size).
// Videos: video/cartoon-2.mp4 (p. 16 ex. 1), video-2.mp4 (p. 18 ex. 5), civilisation-2.mp4 (p. 22 ex. 2); online only.
(function () {
  // [French, English, Українська, العربية]
  const T = [
    // the story p. 16–17
    [
      "Salut ! Aujourd’hui nous avons organisé une fête pour mamie. Voici toute ma famille !",
      "Hi! Today we have organised a party for Granny. Here is my whole family!",
      "Привіт! Сьогодні ми влаштували свято для бабусі. Ось уся моя родина!",
      "مرحبًا! اليوم نظّمنا حفلة لجدّتي. هذه عائلتي كلّها!",
    ],
    [
      "Maman s’appelle Christine et papa s’appelle Jean.",
      "Mum is called Christine and Dad is called Jean.",
      "Маму звати Крістіна, а тата — Жан.",
      "اسم أمي كريستين واسم أبي جان.",
    ],
    [
      "Ma petite sœur s’appelle Sophie. Elle a quatre ans.",
      "My little sister is called Sophie. She is four.",
      "Мою молодшу сестричку звати Софі. Їй чотири роки.",
      "اسم أختي الصغيرة صوفي. عمرها أربع سنوات.",
    ],
    [
      "Lui, c’est mon frère Théo : il a neuf ans, comme moi !",
      "This is my brother Théo: he is nine, like me!",
      "Це мій брат Тео: йому дев’ять років, як і мені!",
      "هذا أخي تيو: عمره تسع سنوات، مثلي!",
    ],
    [
      "Hector le furet, c’est notre animal domestique !",
      "Hector the ferret is our pet!",
      "Тхір Гектор — наша домашня тварина!",
      "ابن مقرض هكتور هو حيواننا الأليف!",
    ],
    [
      "Et voici mes grands-parents ! Mamie s’appelle Amélie et papy Jacques.",
      "And here are my grandparents! Granny is called Amélie and Grandpa Jacques.",
      "А ось мої бабуся й дідусь! Бабусю звати Амелі, а дідуся — Жак.",
      "وهذان جدّاي! اسم جدّتي أميلي وجدّي جاك.",
    ],
    [
      "Oh non, Hector !",
      "Oh no, Hector!",
      "Ой ні, Гекторе!",
      "أوه لا يا هكتور!",
    ],
    [
      "Mmmh, que c’est bon !",
      "Mmm, how good it is!",
      "Ммм, як смачно!",
      "مممم، ما ألذّه!",
    ],
    // song « Ma famille »
    ["Bonjour à tous,", "Hello everyone,", "Привіт усім,", "مرحبًا بالجميع،"],
    [
      "les garçons et les filles :",
      "boys and girls:",
      "хлопчики й дівчатка:",
      "أيها الأولاد والبنات:",
    ],
    [
      "je vous présente ma famille !",
      "let me introduce my family!",
      "знайомтеся з моєю родиною!",
      "أقدّم لكم عائلتي!",
    ],
    [
      "Voici mon père et ma mère,",
      "Here are my father and my mother,",
      "Ось мій тато і моя мама,",
      "هذا أبي وهذه أمي،",
    ],
    [
      "ma petite sœur",
      "my little sister",
      "моя молодша сестричка",
      "أختي الصغيرة",
    ],
    ["et mon frère !", "and my brother!", "і мій брат!", "وأخي!"],
    ["Mais ce n’est pas", "But it is not", "Але це ще", "لكن لم"],
    ["encore fini :", "finished yet:", "не все:", "ننتهِ بعد:"],
    ["les voilà,", "here they are,", "ось вони,", "ها هما،"],
    [
      "mamie et papy !",
      "Granny and Grandpa!",
      "бабуся й дідусь!",
      "جدّتي وجدّي!",
    ],
    // dialogues p. 18–20
    [
      "Tu as des frères et sœurs ?",
      "Do you have brothers and sisters?",
      "У тебе є брати й сестри?",
      "هل لديك إخوة وأخوات؟",
    ],
    [
      "Oui, j’ai un frère.",
      "Yes, I have a brother.",
      "Так, у мене є брат.",
      "نعم، لديّ أخ.",
    ],
    [
      "Comment s’appelle ton frère ?",
      "What is your brother’s name?",
      "Як звати твого брата?",
      "ما اسم أخيك؟",
    ],
    [
      "Il s’appelle Éric.",
      "His name is Éric.",
      "Його звати Ерік.",
      "اسمه إريك.",
    ],
    ["Et toi ?", "And you?", "А ти?", "وأنت؟"],
    [
      "Moi, je n’ai pas de frère et je n’ai pas de sœur.",
      "I don’t have a brother and I don’t have a sister.",
      "А в мене немає ні брата, ні сестри.",
      "أنا ليس لديّ أخ وليس لديّ أخت.",
    ],
    ["Quel âge as-tu ?", "How old are you?", "Скільки тобі років?", "كم عمرك؟"],
    ["J’ai neuf ans.", "I am nine.", "Мені дев’ять років.", "عمري تسع سنوات."],
    [
      "Et toi, quel âge as-tu ?",
      "And you, how old are you?",
      "А тобі скільки років?",
      "وأنت، كم عمرك؟",
    ],
    [
      "Moi, j’ai déjà dix ans !",
      "I’m already ten!",
      "А мені вже десять!",
      "أنا عمري عشر سنوات!",
    ],
    ["J’ai dix ans.", "I am ten.", "Мені десять років.", "عمري عشر سنوات."],
    ["J’ai huit ans.", "I am eight.", "Мені вісім років.", "عمري ثماني سنوات."],
    [
      "Tu as des animaux ?",
      "Do you have pets?",
      "У тебе є тварини?",
      "هل لديك حيوانات؟",
    ],
    [
      "Non, je n’ai pas d’animaux.",
      "No, I don’t have pets.",
      "Ні, у мене немає тварин.",
      "لا، ليس لديّ حيوانات.",
    ],
    [
      "Oui, j’ai deux chiens et un chat.",
      "Yes, I have two dogs and a cat.",
      "Так, у мене два собаки і кіт.",
      "نعم، لديّ كلبان وقطّ.",
    ],
    // song « La famille Hurluberlu »
    [
      "La famille Hurluberlu a",
      "The Hurluberlu family has",
      "Родина Гурлюберлю має",
      "عائلة أورلوبيرلو لديها",
    ],
    [
      "dix chiens et dix tortues.",
      "ten dogs and ten tortoises.",
      "десять собак і десять черепах.",
      "عشرة كلاب وعشر سلاحف.",
    ],
    [
      "Où sont les chiens ?",
      "Where are the dogs?",
      "Де собаки?",
      "أين الكلاب؟",
    ],
    ["On n’en sait rien.", "Nobody knows.", "Ніхто не знає.", "لا أحد يعرف."],
    ["Et les tortues ?", "And the tortoises?", "А черепахи?", "والسلاحف؟"],
    [
      "On ne sait plus.",
      "Nobody knows any more.",
      "Уже ніхто не знає.",
      "لم نعد نعرف.",
    ],
    // Mes compétences p. 24–25
    [
      "Salut, voici la famille de Léo : il a un frère jumeau et une petite sœur.",
      "Hi, here is Léo’s family: he has a twin brother and a little sister.",
      "Привіт, ось родина Лео: у нього є брат-близнюк і молодша сестричка.",
      "مرحبًا، هذه عائلة ليو: لديه أخ توأم وأخت صغيرة.",
    ],
    [
      "Son frère s’appelle Théo et sa sœur s’appelle Sophie.",
      "His brother is called Théo and his sister is called Sophie.",
      "Його брата звати Тео, а сестру — Софі.",
      "اسم أخيه تيو واسم أخته صوفي.",
    ],
    [
      "Son père s’appelle Jean et sa mère s’appelle Christine.",
      "His father is called Jean and his mother is called Christine.",
      "Його тата звати Жан, а маму — Крістіна.",
      "اسم أبيه جان واسم أمه كريستين.",
    ],
    [
      "Ses grands-parents s’appellent Henri, Emma, Jacques et Amélie.",
      "His grandparents are called Henri, Emma, Jacques and Amélie.",
      "Його бабусь і дідусів звати Анрі, Емма, Жак і Амелі.",
      "أسماء أجداده هنري وإيما وجاك وأميلي.",
    ],
    [
      "Comment s’appelle ton papa ?",
      "What is your dad’s name?",
      "Як звати твого тата?",
      "ما اسم أبيك؟",
    ],
    [
      "Mon papa s’appelle David.",
      "My dad is called David.",
      "Мого тата звати Давид.",
      "اسم أبي ديفيد.",
    ],
    ["Et ta maman ?", "And your mum?", "А твою маму?", "وأمك؟"],
    [
      "Elle s’appelle Lucie.",
      "Her name is Lucie.",
      "Її звати Люсі.",
      "اسمها لوسي.",
    ],
    // words
    ["mon frère", "my brother", "мій брат", "أخي"],
    ["ma sœur", "my sister", "моя сестра", "أختي"],
    ["ma mère", "my mother", "моя мама", "أمي"],
    ["mon père", "my father", "мій тато", "أبي"],
    ["mon grand-père", "my grandfather", "мій дідусь", "جدّي"],
    ["ma grand-mère", "my grandmother", "моя бабуся", "جدّتي"],
    ["un furet", "a ferret", "тхір", "ابن مقرض"],
    ["un hamster", "a hamster", "хом’як", "هامستر"],
    ["un poisson rouge", "a goldfish", "золота рибка", "سمكة ذهبية"],
    ["un chien", "a dog", "собака", "كلب"],
    ["un chat", "a cat", "кіт", "قطّ"],
    ["une tortue", "a tortoise", "черепаха", "سلحفاة"],
    ["Le cheval", "The horse", "Кінь", "الحصان"],
    ["Le chien", "The dog", "Собака", "الكلب"],
    ["Le chat", "The cat", "Кіт", "القطّ"],
    ["Le chiot", "The puppy", "Цуценя", "الجرو"],
    ["Le poulain", "The foal", "Лоша", "المهر"],
    ["Le chaton", "The kitten", "Кошеня", "الهريرة"],
    ["frère", "brother", "брат", "أخ"],
    ["mère", "mother", "мама", "أم"],
    ["père", "father", "тато", "أب"],
    ["furet", "ferret", "тхір", "ابن مقرض"],
    ["chat", "cat", "кіт", "قطّ"],
    ["chien", "dog", "собака", "كلب"],
    ["tortue", "tortoise", "черепаха", "سلحفاة"],
    ["hamster", "hamster", "хом’як", "هامستر"],
    // the sound [y]
    [
      "Le son [y] s’écrit « u ».",
      "The sound [y] is written « u ».",
      "Звук [y] пишеться «u».",
      "الصوت [y] يُكتب « u ».",
    ],
    [
      "u… tortue, furet, tu",
      "u… tortoise, ferret, you",
      "u… черепаха, тхір, ти",
      "u… سلحفاة، ابن مقرض، أنت",
    ],
    ["jumeaux", "twins", "близнюки", "توأمان"],
    ["plus", "more", "більше", "أكثر"],
    ["une", "a / one", "одна", "واحدة"],
    ["salut", "hi", "привіт", "مرحبًا"],
    ["tu", "you", "ти", "أنت"],
    [
      "Hurluberlu",
      "Hurluberlu (a funny name: scatterbrain)",
      "Гурлюберлю (смішне прізвище: дивак)",
      "أورلوبيرلو (اسم مضحك: طائش)",
    ],
    ["huit", "eight", "вісім", "ثمانية"],
    ["maman", "mum", "мама", "ماما"],
    ["poisson", "fish", "риба", "سمكة"],
    ["sœur", "sister", "сестра", "أخت"],
    ["famille", "family", "родина", "عائلة"],
    ["tortues", "tortoises", "черепахи", "سلاحف"],
    ["chiens", "dogs", "собаки", "كلاب"],
    ["Où", "where", "де", "أين"],
    ["rien", "nothing", "нічого", "لا شيء"],
    ["sait", "knows", "знає", "يعرف"],
    [
      "🔊 On entend [y] ?",
      "Do you hear [y]?",
      "Чуєш звук [y]?",
      "هل تسمع الصوت [y]؟",
    ],
    // exercises
    [
      "La maman de Léo s’appelle Christine.",
      "Léo’s mum is called Christine.",
      "Маму Лео звати Крістіна.",
      "اسم أم ليو كريستين.",
    ],
    [
      "Sophie a quatre ans.",
      "Sophie is four.",
      "Софі чотири роки.",
      "عمر صوفي أربع سنوات.",
    ],
    [
      "Léo a huit ans.",
      "Léo is eight.",
      "Лео вісім років.",
      "عمر ليو ثماني سنوات.",
    ],
    [
      "Jacques est le frère de Léo.",
      "Jacques is Léo’s brother.",
      "Жак — брат Лео.",
      "جاك أخو ليو.",
    ],
    ["Vrai.", "True.", "Правда.", "صحيح."],
    ["Faux.", "False.", "Неправда.", "خطأ."],
    [
      "Faux. Léo a neuf ans.",
      "False. Léo is nine.",
      "Неправда. Лео дев’ять років.",
      "خطأ. عمر ليو تسع سنوات.",
    ],
    [
      "Faux. Jacques est le grand-père de Léo.",
      "False. Jacques is Léo’s grandfather.",
      "Неправда. Жак — дідусь Лео.",
      "خطأ. جاك جدّ ليو.",
    ],
    [
      "Comment s’appellent les parents ?",
      "What are the parents called?",
      "Як звати батьків?",
      "ما اسما الوالدين؟",
    ],
    [
      "Et les grands-parents ?",
      "And the grandparents?",
      "А бабусю й дідуся?",
      "والجدّان؟",
    ],
    [
      "Comment s’appelle la sœur de Léo ?",
      "What is Léo’s sister called?",
      "Як звати сестру Лео?",
      "ما اسم أخت ليو؟",
    ],
    [
      "Comment s’appelle le furet ?",
      "What is the ferret called?",
      "Як звати тхора?",
      "ما اسم ابن مقرض؟",
    ],
    [
      "Christine et Jean.",
      "Christine and Jean.",
      "Крістіна і Жан.",
      "كريستين وجان.",
    ],
    [
      "Amélie et Jacques.",
      "Amélie and Jacques.",
      "Амелі і Жак.",
      "أميلي وجاك.",
    ],
    ["Sophie et Théo.", "Sophie and Théo.", "Софі і Тео.", "صوفي وتيو."],
    ["Sophie.", "Sophie.", "Софі.", "صوفي."],
    ["Isabelle.", "Isabelle.", "Ізабель.", "إيزابيل."],
    ["Lin.", "Lin.", "Лін.", "لين."],
    ["Hector.", "Hector.", "Гектор.", "هكتور."],
    ["Théo.", "Théo.", "Тео.", "تيو."],
    ["Jacques.", "Jacques.", "Жак.", "جاك."],
    [
      "Elle s’appelle Éric.",
      "Her name is Éric.",
      "Її звати Ерік.",
      "اسمها إريك.",
    ],
    [
      "Isabelle a un chien.",
      "Isabelle has a dog.",
      "В Ізабель є собака.",
      "لدى إيزابيل كلب.",
    ],
    [
      "Sophie a un chat.",
      "Sophie has a cat.",
      "У Софі є кіт.",
      "لدى صوفي قطّ.",
    ],
    [
      "Ahmed a un hamster.",
      "Ahmed has a hamster.",
      "В Ахмеда є хом’як.",
      "لدى أحمد هامستر.",
    ],
    [
      "Lin a un furet.",
      "Lin has a ferret.",
      "У Лін є тхір.",
      "لدى لين ابن مقرض.",
    ],
    [
      "Théo a une tortue.",
      "Théo has a tortoise.",
      "У Тео є черепаха.",
      "لدى تيو سلحفاة.",
    ],
    [
      "Léo a un poisson rouge.",
      "Léo has a goldfish.",
      "У Лео є золота рибка.",
      "لدى ليو سمكة ذهبية.",
    ],
    [
      "Faux. Isabelle a un chat.",
      "False. Isabelle has a cat.",
      "Неправда. В Ізабель є кіт.",
      "خطأ. لدى إيزابيل قطّ.",
    ],
    [
      "Faux. Sophie a un furet.",
      "False. Sophie has a ferret.",
      "Неправда. У Софі є тхір.",
      "خطأ. لدى صوفي ابن مقرض.",
    ],
    [
      "Faux. Lin a un poisson rouge.",
      "False. Lin has a goldfish.",
      "Неправда. У Лін є золота рибка.",
      "خطأ. لدى لين سمكة ذهبية.",
    ],
    [
      "Faux. Léo a un chien.",
      "False. Léo has a dog.",
      "Неправда. У Лео є собака.",
      "خطأ. لدى ليو كلب.",
    ],
    [
      "Le bébé du cheval, c’est…",
      "The horse’s baby is…",
      "Дитинча коня — це…",
      "صغير الحصان هو…",
    ],
    [
      "Le bébé du chien, c’est…",
      "The dog’s baby is…",
      "Дитинча собаки — це…",
      "صغير الكلب هو…",
    ],
    [
      "Le bébé du chat, c’est…",
      "The cat’s baby is…",
      "Дитинча кота — це…",
      "صغير القطّ هو…",
    ],
  ];
  const NUM = [
    "zéro",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
  ];
  const NUM_T = [
    ["zero", "нуль", "صفر"],
    ["one", "один", "واحد"],
    ["two", "два", "اثنان"],
    ["three", "три", "ثلاثة"],
    ["four", "чотири", "أربعة"],
    ["five", "п’ять", "خمسة"],
    ["six", "шість", "ستة"],
    ["seven", "сім", "سبعة"],
    ["eight", "вісім", "ثمانية"],
    ["nine", "дев’ять", "تسعة"],
    ["ten", "десять", "عشرة"],
    ["eleven", "одинадцять", "أحد عشر"],
    ["twelve", "дванадцять", "اثنا عشر"],
  ];
  const DICT = {};
  for (const [fr, en, uk, ar] of T) DICT[fr] = [en, uk, ar];
  NUM.forEach((w, i) => (DICT[w] = NUM_T[i]));
  // « Il ou Elle ? »: Il s’appelle Léo. / Elle s’appelle Sophie.
  for (const [n, g, en, uk, ar] of [
    ["Léo", "Il", "His", "Його звати Лео.", "اسمه ليو."],
    ["Théo", "Il", "His", "Його звати Тео.", "اسمه تيو."],
    ["Sophie", "Elle", "Her", "Її звати Софі.", "اسمها صوفي."],
    ["Christine", "Elle", "Her", "Її звати Крістіна.", "اسمها كريستين."],
    ["Jean", "Il", "His", "Його звати Жан.", "اسمه جان."],
    ["Amélie", "Elle", "Her", "Її звати Амелі.", "اسمها أميلي."],
    ["Jacques", "Il", "His", "Його звати Жак.", "اسمه جاك."],
    ["Hector", "Il", "His", "Його звати Гектор.", "اسمه هكتور."],
  ])
    DICT[`${g} s’appelle ${n}.`] = [`${en} name is ${n}.`, uk, ar];
  const line = (who, fr) => ({ who, fr });
  const W = (fr, img) => ({
    fr,
    img,
    en: DICT[fr][0],
    uk: DICT[fr][1],
    ar: DICT[fr][2],
  });
  // [picture, French] lists for "Écoute et touche"
  const FAM = [
    ["p4", "mon frère"],
    ["p3", "ma sœur"],
    ["mere", "ma mère"],
    ["pere", "mon père"],
    ["gp", "mon grand-père"],
    ["gm", "ma grand-mère"],
  ];
  const ANI = [
    ["furet", "un furet"],
    ["hamster", "un hamster"],
    ["poisson", "un poisson rouge"],
    ["chien", "un chien"],
    ["chat", "un chat"],
    ["tortue", "une tortue"],
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
  // Vrai ou faux: the right answer first ("Faux. …" with the correction)
  const vf = (img, q, fix) => ({
    type: "mc",
    img,
    q,
    opts: fix ? [fix, "Vrai."] : ["Vrai.", "Faux."],
  });
  // [y] in the song: [word, has the sound]
  const hearY = ([w, yes]) => ({
    type: "yn",
    emoji: "🎵",
    fr: w,
    a: yes,
    ask: "🔊 On entend [y] ?",
    x: `${w} : ${yes ? "on entend [y]." : "on n’entend pas [y]."}`,
    ...(yes ? {} : { fix: `${w} : on n’entend pas [y].` }),
  });
  for (const w of [
    "Hurluberlu",
    "chiens",
    "tortues",
    "Où",
    "rien",
    "plus",
    "famille",
    "sait",
  ]) {
    DICT[`${w} : on entend [y].`] = [
      `${w}: you hear [y].`,
      `${w}: чути [y].`,
      `${w}: نسمع [y].`,
    ];
    DICT[`${w} : on n’entend pas [y].`] = [
      `${w}: you don’t hear [y].`,
      `${w}: [y] не чути.`,
      `${w}: لا نسمع [y].`,
    ];
  }

  window.LESSON = {
    n: 2,
    key: "fr3-u2",
    imgDir: "unite-2",
    native: true,
    label: "Unité 2",
    grade: 3,
    title: "Voici ma famille !",
    en: "Here is my family! · the family, numbers 0–12, pets, baby animals",
    uk: "Ось моя родина! · родина, числа 0–12, домашні тварини, дитинчата",
    ar: "هذه عائلتي! · العائلة، الأعداد 0–12، الحيوانات الأليفة، صغار الحيوانات",
    book: "Léo et Théo Plus 1 · Livre p. 16–25",
    cover: "p1",

    learn: [
      {
        k: "video",
        v: "cartoon-2",
        t: "Voici ma famille !",
        en: "Video: the cartoon",
        from: "Livre p. 16 ex. 1",
        img: "p1",
      },
      { k: "story", img: "p6" },
      { k: "words", img: "chien" },
      {
        k: "video",
        v: "video-2",
        t: "Ma famille",
        en: "Video: my family",
        from: "Livre p. 18 ex. 5",
        img: "tablette",
      },
      { k: "sound", s: "u", img: "huit" },
      {
        k: "video",
        v: "civilisation-2",
        t: "Les bébés animaux",
        en: "Video: baby animals",
        from: "Livre p. 22 ex. 2",
        img: "chiot",
      },
    ],
    play: [
      { k: "listen", img: "p3" },
      { k: "match", img: "gm" },
      { k: "ilelle", img: "mere" },
      { k: "bword", img: "tortue" },
    ],

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
        img: "p4",
        g: "il",
        en: "Théo, Léo’s twin brother",
        uk: "Тео, брат-близнюк Лео",
        ar: "تيو، توأم ليو",
      },
      {
        fr: "Sophie",
        img: "p3",
        g: "elle",
        en: "Sophie, their little sister",
        uk: "Софі, їхня молодша сестричка",
        ar: "صوفي، أختهما الصغيرة",
      },
      {
        fr: "Christine",
        img: "mere",
        g: "elle",
        en: "Christine, their mum",
        uk: "Крістіна, їхня мама",
        ar: "كريستين، أمهم",
      },
      {
        fr: "Jean",
        img: "pere",
        g: "il",
        en: "Jean, their dad",
        uk: "Жан, їхній тато",
        ar: "جان، أبوهم",
      },
      {
        fr: "Amélie",
        img: "gm",
        g: "elle",
        en: "Amélie, their granny",
        uk: "Амелі, їхня бабуся",
        ar: "أميلي، جدّتهم",
      },
      {
        fr: "Jacques",
        img: "gp",
        g: "il",
        en: "Jacques, their grandpa",
        uk: "Жак, їхній дідусь",
        ar: "جاك، جدّهم",
      },
      {
        fr: "Hector",
        img: "p5",
        g: "il",
        en: "Hector, the ferret",
        uk: "Гектор, тхір",
        ar: "هكتور، ابن مقرض",
      },
    ],

    phrases: [
      ...FAM.map(([img, fr]) => W(fr, img)),
      ...ANI.map(([img, fr]) => W(fr, img)),
      W("Le cheval", "cheval"),
      W("Le poulain", "poulain"),
      W("Le chien", "chien2"),
      W("Le chiot", "chiot"),
      W("Le chat", "chat2"),
      W("Le chaton", "chaton"),
      ...NUM.map((fr, i) => ({
        fr,
        img: `n${i}`,
        en: NUM_T[i][0],
        uk: NUM_T[i][1],
        ar: NUM_T[i][2],
      })),
    ],

    // p. 21 ex. 14 Boîte à sons
    sounds: [
      {
        s: "u",
        ipa: "[y]",
        intro: "Le son [y] s’écrit « u ».",
        hear: "u… tortue, furet, tu",
        img: "huit",
        words: [
          "tortue",
          "furet",
          "jumeaux",
          "plus",
          "une",
          "salut",
          "tu",
          "Hurluberlu",
          "huit",
        ],
        pics: {
          tortue: "tortue",
          furet: "furet",
          jumeaux: "p4",
          plus: { emoji: "➕" },
          une: { emoji: "1️⃣" },
          salut: { emoji: "👋" },
          tu: { emoji: "👉" },
          Hurluberlu: "hurluberlu",
          huit: "huit",
          chien: "chien",
          chat: "chat",
          maman: "mere",
          poisson: "poisson",
          mère: "mere",
          père: "pere",
        },
        not: ["chien", "chat", "maman", "poisson", "mère", "père"],
      },
    ],

    story: [
      {
        img: "p1",
        lines: [
          line(
            "Léo",
            "Salut ! Aujourd’hui nous avons organisé une fête pour mamie. Voici toute ma famille !",
          ),
        ],
      },
      {
        img: "p2",
        lines: [
          line("Léo", "Maman s’appelle Christine et papa s’appelle Jean."),
        ],
      },
      {
        img: "p3",
        lines: [
          line("Léo", "Ma petite sœur s’appelle Sophie. Elle a quatre ans."),
        ],
      },
      {
        img: "p4",
        lines: [
          line("Léo", "Lui, c’est mon frère Théo : il a neuf ans, comme moi !"),
        ],
      },
      {
        img: "p5",
        lines: [
          line("Léo", "Hector le furet, c’est notre animal domestique !"),
        ],
      },
      {
        img: "p6",
        lines: [
          line(
            "Léo",
            "Et voici mes grands-parents ! Mamie s’appelle Amélie et papy Jacques.",
          ),
        ],
      },
      { img: "p7", lines: [line("Léo", "Oh non, Hector !")] },
      { img: "p8", lines: [line("Amélie", "Mmmh, que c’est bon !")] },
      {
        title: "🎵 Ma famille",
        img: "leo",
        lines: [
          "Bonjour à tous,",
          "les garçons et les filles :",
          "je vous présente ma famille !",
          "Voici mon père et ma mère,",
          "ma petite sœur",
          "et mon frère !",
          "Mais ce n’est pas",
          "encore fini :",
          "les voilà,",
          "mamie et papy !",
        ].map((fr) => line("", fr)),
      },
      {
        img: "freres",
        lines: [
          "Tu as des frères et sœurs ?",
          "Oui, j’ai un frère.",
          "Comment s’appelle ton frère ?",
          "Il s’appelle Éric.",
          "Et toi ?",
          "Moi, je n’ai pas de frère et je n’ai pas de sœur.",
        ].map((fr) => line("", fr)),
      },
      {
        img: "age",
        lines: [
          "Quel âge as-tu ?",
          "J’ai neuf ans.",
          "Et toi, quel âge as-tu ?",
          "Moi, j’ai déjà dix ans !",
        ].map((fr) => line("", fr)),
      },
      {
        img: "animaux",
        lines: [
          "Tu as des animaux ?",
          "Non, je n’ai pas d’animaux.",
          "Oui, j’ai deux chiens et un chat.",
        ].map((fr) => line("", fr)),
      },
      {
        title: "🎵 La famille Hurluberlu",
        img: "hurluberlu",
        lines: [
          "La famille Hurluberlu a",
          "dix chiens et dix tortues.",
          "Où sont les chiens ?",
          "On n’en sait rien.",
          "Et les tortues ?",
          "On ne sait plus.",
        ].map((fr) => line("", fr)),
      },
      {
        title: "🌳 Mes compétences · L’arbre généalogique",
        img: "arbre",
        lines: [
          "Salut, voici la famille de Léo : il a un frère jumeau et une petite sœur.",
          "Son frère s’appelle Théo et sa sœur s’appelle Sophie.",
          "Son père s’appelle Jean et sa mère s’appelle Christine.",
          "Ses grands-parents s’appellent Henri, Emma, Jacques et Amélie.",
        ].map((fr) => line("", fr)),
      },
      {
        img: "questions",
        lines: [
          "Comment s’appelle ton papa ?",
          "Mon papa s’appelle David.",
          "Et ta maman ?",
          "Elle s’appelle Lucie.",
        ].map((fr) => line("", fr)),
      },
    ],

    build: [
      { fr: "frère", img: "p4" },
      { fr: "mère", img: "mere" },
      { fr: "père", img: "pere" },
      { fr: "furet", img: "furet" },
      { fr: "chat", img: "chat" },
      { fr: "chien", img: "chien" },
      { fr: "tortue", img: "tortue" },
      { fr: "hamster", img: "hamster" },
    ],

    exercises: [
      {
        k: "vf",
        t: "Vrai ou faux ?",
        en: "True or false?",
        img: "p2",
        from: "Livre p. 17 ex. 2",
        keep: true,
        items: [
          vf("p2", "La maman de Léo s’appelle Christine."),
          vf("p3", "Sophie a quatre ans."),
          vf("p4", "Léo a huit ans.", "Faux. Léo a neuf ans."),
          vf(
            "p6",
            "Jacques est le frère de Léo.",
            "Faux. Jacques est le grand-père de Léo.",
          ),
        ],
      },
      {
        k: "reponds",
        t: "Réponds",
        en: "Answer",
        img: "p1",
        from: "Livre p. 17 ex. 3",
        keep: true,
        items: [
          {
            type: "mc",
            img: "p2",
            q: "Comment s’appellent les parents ?",
            opts: [
              "Christine et Jean.",
              "Amélie et Jacques.",
              "Sophie et Théo.",
            ],
          },
          {
            type: "mc",
            img: "p6",
            q: "Et les grands-parents ?",
            opts: [
              "Amélie et Jacques.",
              "Christine et Jean.",
              "Sophie et Théo.",
            ],
          },
          {
            type: "mc",
            img: "p3",
            q: "Comment s’appelle la sœur de Léo ?",
            opts: ["Sophie.", "Isabelle.", "Lin."],
          },
          {
            type: "mc",
            img: "p5",
            q: "Comment s’appelle le furet ?",
            opts: ["Hector.", "Théo.", "Jacques."],
          },
        ],
      },
      {
        k: "famille",
        t: "Écoute et dis le numéro",
        en: "Listen, tap the person",
        img: "tablette",
        from: "Livre p. 18 ex. 5",
        items: FAM.map((_, k) => tapOf(FAM, k)),
      },
      {
        k: "freres",
        t: "Écoute et demande à tes camarades",
        en: "Brothers and sisters: pick the answer",
        img: "freres",
        from: "Livre p. 18 ex. 6",
        items: [
          {
            type: "mc",
            img: "freres",
            q: "Comment s’appelle ton frère ?",
            opts: [
              "Il s’appelle Éric.",
              "Elle s’appelle Éric.",
              "J’ai neuf ans.",
            ],
          },
        ],
      },
      {
        k: "nombres",
        t: "Écoute et associe",
        en: "Numbers 0 to 12: match the number and the word",
        img: "nombres",
        from: "Livre p. 19 ex. 7",
        items: [
          [0, 1, 2, 3],
          [4, 5, 6, 7, 8],
          [9, 10, 11, 12],
        ].map((g) => ({
          type: "match",
          pairs: g.map((i) => ({ img: `n${i}`, fr: NUM[i] })),
        })),
      },
      {
        k: "age",
        t: "Quel âge as-tu ?",
        en: "How old are you? Look at the candles",
        img: "age",
        from: "Livre p. 19 ex. 8",
        items: [
          {
            type: "mc",
            emoji: "🎂9",
            q: "Quel âge as-tu ?",
            opts: ["J’ai neuf ans.", "J’ai dix ans.", "J’ai huit ans."],
          },
          {
            type: "mc",
            emoji: "🎂10",
            q: "Et toi, quel âge as-tu ?",
            opts: ["J’ai dix ans.", "J’ai neuf ans.", "J’ai huit ans."],
          },
        ],
      },
      {
        k: "animaux",
        t: "Les animaux domestiques",
        en: "Listen, tap the pet",
        img: "poisson",
        from: "Livre p. 20 ex. 9",
        items: ANI.map((_, k) => tapOf(ANI, k)),
      },
      {
        k: "vf2",
        t: "Vrai ou faux ? Corrige",
        en: "True or false? Correct it",
        img: "chat",
        from: "Livre p. 20 ex. 10",
        keep: true,
        items: [
          vf("chat", "Isabelle a un chien.", "Faux. Isabelle a un chat."),
          vf("furet", "Sophie a un chat.", "Faux. Sophie a un furet."),
          vf("hamster", "Ahmed a un hamster."),
          vf("poisson", "Lin a un furet.", "Faux. Lin a un poisson rouge."),
          vf("tortue", "Théo a une tortue."),
          vf("chien", "Léo a un poisson rouge.", "Faux. Léo a un chien."),
        ],
      },
      {
        k: "son-y",
        t: "Cherche dans la chanson les mots avec le son [y]",
        en: "Do you hear [y]?",
        img: "hurluberlu",
        from: "Livre p. 21 ex. 15",
        keep: true,
        items: [
          ["Hurluberlu", true],
          ["chiens", false],
          ["tortues", true],
          ["Où", false],
          ["rien", false],
          ["plus", true],
          ["famille", false],
          ["sait", false],
        ].map(hearY),
      },
      {
        k: "bebes",
        t: "Cherche le bébé animal",
        en: "Find the baby animal",
        img: "chiot",
        from: "Livre p. 22 ex. 2",
        items: [
          {
            type: "mc",
            img: "cheval",
            q: "Le bébé du cheval, c’est…",
            opts: ["Le poulain", "Le chiot", "Le chaton"],
          },
          {
            type: "mc",
            img: "chien2",
            q: "Le bébé du chien, c’est…",
            opts: ["Le chiot", "Le chaton", "Le poulain"],
          },
          {
            type: "mc",
            img: "chat2",
            q: "Le bébé du chat, c’est…",
            opts: ["Le chaton", "Le poulain", "Le chiot"],
          },
          {
            type: "match",
            pairs: [
              { img: "poulain", fr: "Le poulain" },
              { img: "chiot", fr: "Le chiot" },
              { img: "chaton", fr: "Le chaton" },
            ],
          },
        ],
      },
    ],

    dict: DICT,
    auto: () => null,
  };
  (window.FR_DATA = window.FR_DATA || {}).u2 = window.LESSON;
})();
