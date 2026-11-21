// Français · Grade 3 · Léo et Théo Plus 1 · Unité 3 « Tous à l’école ! » (Livre p. 26–33): les objets scolaires, les couleurs,
// la salle de classe, dans / sur / sous / devant / derrière, the songs, le son [u], À l’école, sans souci ! Book exercises only.
// Left out: p. 29 ex. 8 (follow the path: listening, no transcript), p. 28 ex. 6 and p. 29 ex. 9 (games with a classmate: their dialogues
// are in the story), p. 32 ex. 1–3 (describe, open choice, mime, colours of your choice: the emotions are words), p. 33 Brico.
// Unverified: p. 30 ex. 11 item 1 correction (the clock is above the board: « au-dessus du tableau » is not in the book), p. 32 ex. 4.
// The engine is grade-4/term-1/french/french-lesson.js. Pictures: img/unite-3/<name>.jpg (book scan out20–out24, own size).
// Videos: video/cartoon-3.mp4 (p. 26 ex. 1), video/video-3.mp4 (p. 28 ex. 5: the school things), video/autour-3.mp4 (p. 32 Le monde autour de toi: the five emotions); online only.
(function () {
  // [French, English, Українська, العربية]
  const T = [
    // the story p. 26
    [
      "Bonjour, les enfants ! Prenez le cahier de Français et le stylo bleu.",
      "Hello, children! Take your French notebook and the blue pen.",
      "Добрий день, діти! Візьміть зошит з французької і синю ручку.",
      "صباح الخير يا أطفال! خذوا دفتر الفرنسية والقلم الأزرق.",
    ],
    ["Léo, dépêche-toi !", "Léo, hurry up!", "Лео, поквапся!", "ليو، أسرع!"],
    [
      "Voici une gomme et un taille-crayon !",
      "Here is an eraser and a pencil sharpener!",
      "Ось гумка і стругачка!",
      "هذه ممحاة ومبراة!",
    ],
    [
      "Un feutre jaune et un stylo rouge !",
      "A yellow felt-tip pen and a red pen!",
      "Жовтий фломастер і червона ручка!",
      "قلم فلوماستر أصفر وقلم أحمر!",
    ],
    [
      "Des crayons de couleur et des ciseaux !",
      "Coloured pencils and scissors!",
      "Кольорові олівці й ножиці!",
      "أقلام تلوين ومقصّ!",
    ],
    [
      "Merci beaucoup, les amis !",
      "Thank you very much, friends!",
      "Щиро дякую, друзі!",
      "شكرًا جزيلًا يا أصدقائي!",
    ],
    [
      "Léo, quel désordre ! Où est ton stylo bleu ?",
      "Léo, what a mess! Where is your blue pen?",
      "Лео, який безлад! Де твоя синя ручка?",
      "ليو، يا لها من فوضى! أين قلمك الأزرق؟",
    ],
    [
      "Voilà mon stylo bleu : il est bien rangé dans ma trousse !",
      "Here is my blue pen: it is put away neatly in my pencil case!",
      "Ось моя синя ручка: вона акуратно лежить у моєму пеналі!",
      "ها هو قلمي الأزرق: إنه مرتّب جيدًا في مقلمتي!",
    ],
    // song « Dans mon cartable »
    [
      "Dans mon cartable",
      "In my school bag",
      "У моєму портфелі",
      "في حقيبتي المدرسية",
    ],
    [
      "tout est rangé,",
      "everything is tidy,",
      "усе на місці,",
      "كلّ شيء مرتّب،",
    ],
    ["tous les livres", "all the books", "усі книжки", "كلّ الكتب"],
    ["et les cahiers.", "and the notebooks.", "і зошити.", "والدفاتر."],
    [
      "J’ai dix feutres",
      "I have ten felt-tip pens",
      "У мене десять фломастерів",
      "لديّ عشرة أقلام فلوماستر",
    ],
    [
      "et douze crayons,",
      "and twelve pencils,",
      "і дванадцять олівців,",
      "واثنا عشر قلم رصاص،",
    ],
    ["quatre gommes", "four erasers", "чотири гумки", "أربع ممحاوات"],
    [
      "et un taille-crayon.",
      "and a pencil sharpener.",
      "і стругачка.",
      "ومبراة.",
    ],
    [
      "De la colle pour coller,",
      "Some glue to stick,",
      "Клей, щоб клеїти,",
      "صمغ للّصق،",
    ],
    [
      "des ciseaux pour découper,",
      "scissors to cut out,",
      "ножиці, щоб вирізати,",
      "مقصّ للقصّ،",
    ],
    [
      "une trousse et deux stylos,",
      "a pencil case and two pens,",
      "пенал і дві ручки,",
      "مقلمة وقلمان،",
    ],
    [
      "tout est prêt pour mon boulot !",
      "everything is ready for my work!",
      "усе готово для моєї роботи!",
      "كلّ شيء جاهز لعملي!",
    ],
    // dialogues p. 28 ex. 6 and p. 29 ex. 9
    ["Qu’est-ce que c’est ?", "What is it?", "Що це?", "ما هذا؟"],
    [
      "Attends… C’est un taille-crayon.",
      "Wait… It is a pencil sharpener.",
      "Зачекай… Це стругачка.",
      "انتظر… هذه مبراة.",
    ],
    [
      "Non, ce n’est pas un taille-crayon. C’est une gomme !",
      "No, it is not a pencil sharpener. It is an eraser!",
      "Ні, це не стругачка. Це гумка!",
      "لا، هذه ليست مبراة. هذه ممحاة!",
    ],
    ["Oh non !", "Oh no!", "Ой ні!", "أوه لا!"],
    ["Vert.", "Green.", "Зелений.", "أخضر."],
    [
      "Voilà la carte ! Et maintenant jaune.",
      "Here is the card! And now yellow.",
      "Ось картка! А тепер жовтий.",
      "ها هي البطاقة! والآن الأصفر.",
    ],
    [
      "Je n’ai pas la carte !",
      "I don’t have the card!",
      "У мене немає картки!",
      "ليست لديّ البطاقة!",
    ],
    // song « La ronde des couleurs »
    [
      "Si tu as du bleu sur toi,",
      "If you are wearing blue,",
      "Якщо на тобі є синє,",
      "إذا كان عليك شيء أزرق،",
    ],
    [
      "lève-toi, lève-toi.",
      "stand up, stand up.",
      "встань, встань.",
      "قِف، قِف.",
    ],
    [
      "lève-toi et chante avec moi !",
      "stand up and sing with me!",
      "встань і співай зі мною!",
      "قِف وغنِّ معي!",
    ],
    ["La la la la…", "La la la la…", "Ля-ля-ля-ля…", "لا لا لا لا…"],
    [
      "assieds-toi, assieds-toi.",
      "sit down, sit down.",
      "сідай, сідай.",
      "اجلس، اجلس.",
    ],
    [
      "assieds-toi et repose-toi !",
      "sit down and rest!",
      "сідай і відпочинь!",
      "اجلس واسترح!",
    ],
    [
      "rouge, jaune, vert",
      "red, yellow, green",
      "червоний, жовтий, зелений",
      "أحمر، أصفر، أخضر",
    ],
    // p. 32
    [
      "Je prépare mon cartable le soir avant de me coucher.",
      "I pack my school bag in the evening before going to bed.",
      "Я збираю портфель увечері перед сном.",
      "أحضّر حقيبتي المدرسية في المساء قبل أن أنام.",
    ],
    [
      "Je vérifie mon cartable le matin avant de déjeuner.",
      "I check my school bag in the morning before breakfast.",
      "Я перевіряю портфель уранці перед сніданком.",
      "أتفقّد حقيبتي المدرسية في الصباح قبل الفطور.",
    ],
    [
      "Je prépare mon cartable le matin avant de partir à l’école.",
      "I pack my school bag in the morning before leaving for school.",
      "Я збираю портфель уранці перед тим, як іти до школи.",
      "أحضّر حقيبتي المدرسية في الصباح قبل الذهاب إلى المدرسة.",
    ],
    [
      "Quelle est la meilleure situation pour aller à l’école sans souci ?",
      "Which is the best way to go to school without worries?",
      "Як найкраще, щоб іти до школи без хвилювань?",
      "ما أفضل طريقة للذهاب إلى المدرسة بلا قلق؟",
    ],
    // emotions, prepositions
    ["joie", "joy", "радість", "الفرح"],
    ["peur", "fear", "страх", "الخوف"],
    ["tristesse", "sadness", "сум", "الحزن"],
    ["colère", "anger", "гнів", "الغضب"],
    ["angoisse", "anxiety", "тривога", "القلق"],
    ["dans", "in", "у", "في"],
    ["sur", "on", "на", "على"],
    ["sous", "under", "під", "تحت"],
    ["devant", "in front of", "перед", "أمام"],
    ["derrière", "behind", "позаду", "خلف"],
    // the sound [u]
    ["tous", "all", "усі", "الجميع"],
    ["bonjour", "hello", "добрий день", "صباح الخير"],
    ["couleur", "colour", "колір", "لون"],
    ["écoute", "listen", "слухай", "استمع"],
    ["nous", "we", "ми", "نحن"],
    ["joue", "play", "грай", "العب"],
    ["trouver", "to find", "знайти", "يجد"],
    ["douze", "twelve", "дванадцять", "اثنا عشر"],
    ["huit", "eight", "вісім", "ثمانية"],
    ["tortue", "tortoise", "черепаха", "سلحفاة"],
    ["furet", "ferret", "тхір", "ابن مقرض"],
    // exercises
    ["Vrai.", "True.", "Правда.", "صحيح."],
    ["Faux.", "False.", "Неправда.", "خطأ."],
    [
      "Isabelle trouve un cahier.",
      "Isabelle finds a notebook.",
      "Ізабель знаходить зошит.",
      "تجد إيزابيل دفترًا.",
    ],
    [
      "Faux. Isabelle trouve une gomme et un taille-crayon.",
      "False. Isabelle finds an eraser and a pencil sharpener.",
      "Неправда. Ізабель знаходить гумку і стругачку.",
      "خطأ. تجد إيزابيل ممحاة ومبراة.",
    ],
    [
      "Le feutre est jaune.",
      "The felt-tip pen is yellow.",
      "Фломастер жовтий.",
      "قلم الفلوماستر أصفر.",
    ],
    [
      "Lin trouve des ciseaux.",
      "Lin finds scissors.",
      "Лін знаходить ножиці.",
      "تجد لين مقصًّا.",
    ],
    [
      "Le stylo bleu est dans le cartable.",
      "The blue pen is in the school bag.",
      "Синя ручка в портфелі.",
      "القلم الأزرق في الحقيبة المدرسية.",
    ],
    [
      "Faux. Le stylo bleu est dans la trousse.",
      "False. The blue pen is in the pencil case.",
      "Неправда. Синя ручка в пеналі.",
      "خطأ. القلم الأزرق في المقلمة.",
    ],
    [
      "Le stylo bleu est dans la trousse.",
      "The blue pen is in the pencil case.",
      "Синя ручка в пеналі.",
      "القلم الأزرق في المقلمة.",
    ],
    [
      "Quels objets demande de prendre la maîtresse ?",
      "Which things does the teacher ask them to take?",
      "Які речі вчителька просить узяти?",
      "ما الأشياء التي تطلب المعلّمة أخذها؟",
    ],
    [
      "Le cahier de Français et le stylo bleu.",
      "The French notebook and the blue pen.",
      "Зошит з французької і синю ручку.",
      "دفتر الفرنسية والقلم الأزرق.",
    ],
    [
      "Une gomme et un taille-crayon.",
      "An eraser and a pencil sharpener.",
      "Гумку і стругачку.",
      "ممحاة ومبراة.",
    ],
    [
      "Des crayons de couleur et des ciseaux.",
      "Coloured pencils and scissors.",
      "Кольорові олівці й ножиці.",
      "أقلام تلوين ومقصّ.",
    ],
    [
      "Quels objets scolaires sont nommés ?",
      "Which school things are named?",
      "Які шкільні речі названо?",
      "ما الأدوات المدرسية المذكورة؟",
    ],
    [
      "Le cahier, le stylo, la gomme, le taille-crayon, le feutre, les crayons de couleur, les ciseaux et la trousse.",
      "The notebook, the pen, the eraser, the pencil sharpener, the felt-tip pen, the coloured pencils, the scissors and the pencil case.",
      "Зошит, ручка, гумка, стругачка, фломастер, кольорові олівці, ножиці і пенал.",
      "الدفتر والقلم والممحاة والمبراة وقلم الفلوماستر وأقلام التلوين والمقصّ والمقلمة.",
    ],
    [
      "La table, la chaise, le tableau et la porte.",
      "The table, the chair, the board and the door.",
      "Стіл, стілець, дошка і двері.",
      "الطاولة والكرسي والسبورة والباب.",
    ],
    [
      "Le livre, la règle et la colle.",
      "The book, the ruler and the glue.",
      "Книжка, лінійка і клей.",
      "الكتاب والمسطرة والصمغ.",
    ],
    [
      "Quels sont les trois couleurs nommées ?",
      "Which three colours are named?",
      "Які три кольори названо?",
      "ما الألوان الثلاثة المذكورة؟",
    ],
    [
      "Bleu, jaune et rouge.",
      "Blue, yellow and red.",
      "Синій, жовтий і червоний.",
      "أزرق وأصفر وأحمر.",
    ],
    [
      "Vert, rose et noir.",
      "Green, pink and black.",
      "Зелений, рожевий і чорний.",
      "أخضر ووردي وأسود.",
    ],
    [
      "Blanc, gris et marron.",
      "White, grey and brown.",
      "Білий, сірий і коричневий.",
      "أبيض ورمادي وبنّي.",
    ],
    [
      "Où se trouve le stylo bleu de Léo ?",
      "Where is Léo’s blue pen?",
      "Де синя ручка Лео?",
      "أين قلم ليو الأزرق؟",
    ],
    ["Dans sa trousse.", "In his pencil case.", "У його пеналі.", "في مقلمته."],
    [
      "Dans le cartable.",
      "In the school bag.",
      "У портфелі.",
      "في الحقيبة المدرسية.",
    ],
    ["Sur la table.", "On the table.", "На столі.", "على الطاولة."],
    [
      "L’horloge est devant le tableau.",
      "The clock is in front of the board.",
      "Годинник перед дошкою.",
      "الساعة أمام السبورة.",
    ],
    [
      "Faux. L’horloge est au-dessus du tableau.",
      "False. The clock is above the board.",
      "Неправда. Годинник над дошкою.",
      "خطأ. الساعة فوق السبورة.",
    ],
    [
      "La poubelle est sous la carte.",
      "The bin is under the map.",
      "Смітник під картою.",
      "سلة المهملات تحت الخريطة.",
    ],
    [
      "L’ordinateur est sur le bureau.",
      "The computer is on the teacher’s desk.",
      "Комп’ютер на вчительському столі.",
      "الحاسوب على المكتب.",
    ],
    [
      "Les tables sont derrière le bureau.",
      "The tables are behind the teacher’s desk.",
      "Парти позаду вчительського столу.",
      "الطاولات خلف المكتب.",
    ],
    [
      "Faux. Les tables sont devant le bureau.",
      "False. The tables are in front of the teacher’s desk.",
      "Неправда. Парти перед учительським столом.",
      "خطأ. الطاولات أمام المكتب.",
    ],
    [
      "Les tables sont devant le bureau.",
      "The tables are in front of the teacher’s desk.",
      "Парти перед учительським столом.",
      "الطاولات أمام المكتب.",
    ],
    [
      "Le stylo rouge est dans la trousse.",
      "The red pen is in the pencil case.",
      "Червона ручка в пеналі.",
      "القلم الأحمر في المقلمة.",
    ],
    [
      "Le cahier violet est sous la chaise.",
      "The purple notebook is under the chair.",
      "Фіолетовий зошит під стільцем.",
      "الدفتر البنفسجي تحت الكرسي.",
    ],
    [
      "Faux. Le cahier violet est sur la table.",
      "False. The purple notebook is on the table.",
      "Неправда. Фіолетовий зошит на парті.",
      "خطأ. الدفتر البنفسجي على الطاولة.",
    ],
    [
      "Le cahier violet est sur la table.",
      "The purple notebook is on the table.",
      "Фіолетовий зошит на парті.",
      "الدفتر البنفسجي على الطاولة.",
    ],
    [
      "Observe bien l’image. Où est Hector ?",
      "Look carefully at the picture. Where is Hector?",
      "Уважно роздивися малюнок. Де Гектор?",
      "انظر جيدًا إلى الصورة. أين هكتور؟",
    ],
    [
      "Hector est dans la poubelle.",
      "Hector is in the bin.",
      "Гектор у смітнику.",
      "هكتور في سلة المهملات.",
    ],
    [
      "Hector est sous la chaise.",
      "Hector is under the chair.",
      "Гектор під стільцем.",
      "هكتور تحت الكرسي.",
    ],
    [
      "Hector est sur le bureau.",
      "Hector is on the teacher’s desk.",
      "Гектор на вчительському столі.",
      "هكتور على المكتب.",
    ],
    ["C’est une gomme !", "It is an eraser!", "Це гумка!", "هذه ممحاة!"],
  ];
  const DICT = {};
  for (const [fr, en, uk, ar] of T) DICT[fr] = [en, uk, ar];

  // [picture, French as printed, English, Українська, العربية, un / une, Arabic without « al- », هذا / هذه]
  const OBJ = [
    [
      "cartable",
      "le cartable",
      "school bag",
      "портфель",
      "الحقيبة المدرسية",
      "un",
      "حقيبة مدرسية",
      "هذه",
    ],
    ["cahier", "le cahier", "notebook", "зошит", "الدفتر", "un", "دفتر", "هذا"],
    ["colle", "la colle", "glue", "клей", "الصمغ"],
    ["regle", "la règle", "ruler", "лінійка", "المسطرة", "une", "مسطرة", "هذه"],
    ["livre", "le livre", "book", "книжка", "الكتاب", "un", "كتاب", "هذا"],
    [
      "feutre",
      "le feutre",
      "felt-tip pen",
      "фломастер",
      "قلم الفلوماستر",
      "un",
      "قلم فلوماستر",
      "هذا",
    ],
    ["ciseaux", "les ciseaux", "scissors", "ножиці", "المقصّ"],
    [
      "trousse",
      "la trousse",
      "pencil case",
      "пенал",
      "المقلمة",
      "une",
      "مقلمة",
      "هذه",
    ],
    ["stylo", "le stylo", "pen", "ручка", "القلم", "un", "قلم", "هذا"],
    [
      "taille",
      "le taille-crayon",
      "pencil sharpener",
      "стругачка",
      "المبراة",
      "un",
      "مبراة",
      "هذه",
    ],
    ["gomme", "la gomme", "eraser", "гумка", "الممحاة", "une", "ممحاة", "هذه"],
    [
      "crayon",
      "le crayon",
      "pencil",
      "олівець",
      "قلم الرصاص",
      "un",
      "قلم رصاص",
      "هذا",
    ],
  ];
  const SALLE = [
    [
      "horloge",
      "l’horloge",
      "clock",
      "годинник",
      "الساعة",
      "une",
      "ساعة",
      "هذه",
    ],
    [
      "tableau",
      "le tableau",
      "board",
      "дошка",
      "السبورة",
      "un",
      "سبورة",
      "هذه",
    ],
    [
      "fenetre",
      "la fenêtre",
      "window",
      "вікно",
      "النافذة",
      "une",
      "نافذة",
      "هذه",
    ],
    ["carte", "la carte", "map", "карта", "الخريطة", "une", "خريطة", "هذه"],
    [
      "ordinateur",
      "l’ordinateur",
      "computer",
      "комп’ютер",
      "الحاسوب",
      "un",
      "حاسوب",
      "هذا",
    ],
    ["craie", "la craie", "chalk", "крейда", "الطبشور", "une", "طبشورة", "هذه"],
    ["porte", "la porte", "door", "двері", "الباب", "une", "باب", "هذا"],
    [
      "poubelle",
      "la poubelle",
      "bin",
      "смітник",
      "سلة المهملات",
      "une",
      "سلة مهملات",
      "هذه",
    ],
    [
      "bureau",
      "le bureau",
      "teacher’s desk",
      "учительський стіл",
      "المكتب",
      "un",
      "مكتب",
      "هذا",
    ],
    ["chaise", "la chaise", "chair", "стілець", "الكرسي", "une", "كرسي", "هذا"],
    ["table", "la table", "table", "парта", "الطاولة", "une", "طاولة", "هذه"],
  ];
  // [picture, French, English, Українська, العربية]
  const COL = [
    ["blanc", "white", "білий", "أبيض"],
    ["jaune", "yellow", "жовтий", "أصفر"],
    ["orange", "orange", "помаранчевий", "برتقالي"],
    ["rouge", "red", "червоний", "أحمر"],
    ["vert", "green", "зелений", "أخضر"],
    ["bleu", "blue", "синій", "أزرق"],
    ["rose", "pink", "рожевий", "وردي"],
    ["violet", "purple", "фіолетовий", "بنفسجي"],
    ["marron", "brown", "коричневий", "بنّي"],
    ["gris", "grey", "сірий", "رمادي"],
    ["noir", "black", "чорний", "أسود"],
  ];
  const bare = (fr) => fr.replace(/^(le |la |les |l’)/, "");
  for (const [, fr, en, uk, ar, un, ar1, dem] of [...OBJ, ...SALLE]) {
    DICT[fr] = [`the ${en}`, uk, ar];
    DICT[bare(fr)] = [en, uk, ar];
    if (!un) continue;
    const a = /^[aeiou]/.test(en) ? "an" : "a";
    DICT[`C’est ${un} ${bare(fr)}.`] = [
      `It is ${a} ${en}.`,
      `Це ${uk}.`,
      `${dem} ${ar1}.`,
    ];
  }
  for (const [fr, en, uk, ar] of COL) DICT[fr] = [en, uk, ar];
  // « Il ou Elle ? »: Il s’appelle Léo. / Elle s’appelle Lin.
  for (const [n, g, en, uk, ar] of [
    ["Léo", "Il", "His", "Його звати Лео.", "اسمه ليو."],
    ["Théo", "Il", "His", "Його звати Тео.", "اسمه تيو."],
    ["Isabelle", "Elle", "Her", "Її звати Ізабель.", "اسمها إيزابيل."],
    ["Ahmed", "Il", "His", "Його звати Ахмед.", "اسمه أحمد."],
    ["Lin", "Elle", "Her", "Її звати Лін.", "اسمها لين."],
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
  // [u] in the pictures: [picture, word, has the sound]
  const hearU = ([img, w, yes]) => ({
    type: "yn",
    img,
    fr: w,
    a: yes,
    ask: "🔊 On entend [u] ?",
    x: `${w} : ${yes ? "on entend [u]." : "on n’entend pas [u]."}`,
    ...(yes ? {} : { fix: `${w} : on n’entend pas [u].` }),
  });
  const SON = [
    ["poubelle2", "poubelle", true],
    ["trousse2", "trousse", true],
    ["tortue", "tortue", false],
    ["huit", "huit", false],
    ["douze", "douze", true],
    ["tache", "rouge", true],
    ["furet", "furet", false],
  ];
  for (const [, w] of SON) {
    DICT[`${w} : on entend [u].`] = [
      `${w}: you hear [u].`,
      `${w}: чути [u].`,
      `${w}: نسمع [u].`,
    ];
    DICT[`${w} : on n’entend pas [u].`] = [
      `${w}: you don’t hear [u].`,
      `${w}: [u] не чути.`,
      `${w}: لا نسمع [u].`,
    ];
  }
  // « Un ou une ? »: every object with un / une
  const UN = [...OBJ, ...SALLE].filter((o) => o[5]);

  window.LESSON = {
    n: 3,
    key: "fr3-u3",
    imgDir: "unite-3",
    native: true,
    label: "Unité 3",
    grade: 3,
    title: "Tous à l’école !",
    en: "Everyone to school! · school things, colours, the classroom, in / on / under",
    uk: "Усі до школи! · шкільне приладдя, кольори, клас, у / на / під",
    ar: "الجميع إلى المدرسة! · الأدوات المدرسية، الألوان، الصف، في / على / تحت",
    book: "Léo et Théo Plus 1 · Livre p. 26–33",
    cover: "p4",

    learn: [
      {
        k: "video",
        v: "cartoon-3",
        t: "Tous à l’école !",
        en: "Video: the cartoon",
        from: "Livre p. 26 ex. 1",
        img: "p2",
      },
      { k: "story", img: "p8" },
      { k: "words", img: "objets" },
      {
        k: "video",
        v: "video-3",
        t: "Les objets scolaires",
        en: "Video: school things",
        from: "Livre p. 28 ex. 5",
        img: "objets",
      },
      { k: "sound", s: "ou", img: "ronde" },
      {
        k: "video",
        v: "autour-3",
        t: "À l’école, sans souci !",
        en: "Video: emotions at school",
        from: "Livre p. 32",
        img: "joie",
      },
    ],
    play: [
      { k: "listen", img: "lin" },
      { k: "match", img: "isabelle" },
      { k: "ilelle", img: "ahmed" },
      {
        k: "game",
        t: "Un ou une ?",
        en: "A or an: un or une?",
        img: "gomme",
        items: UN.map(([img, fr, , , , un]) => ({
          type: "mc",
          img,
          q: `C’est ___ ${bare(fr)}.`,
          opts: un === "un" ? ["un", "une"] : ["une", "un"],
          two: true,
          full: `C’est ${un} ${bare(fr)}.`,
        })),
      },
      {
        k: "game",
        t: "Les couleurs",
        en: "Hear a colour, tap it",
        img: "couleurs",
        items: COL.map((_, k) =>
          tapOf(
            COL.map(([c]) => [c, c]),
            k,
          ),
        ),
      },
      { k: "bword", img: "trousse" },
      { k: "bsent", img: "salle" },
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
        img: "theo",
        g: "il",
        en: "Théo, Léo’s twin brother",
        uk: "Тео, брат-близнюк Лео",
        ar: "تيو، توأم ليو",
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
      {
        fr: "Hector",
        img: "furet",
        g: "il",
        en: "Hector, the ferret",
        uk: "Гектор, тхір",
        ar: "هكتور، ابن مقرض",
      },
    ],

    phrases: [
      ...OBJ.map(([img, fr]) => W(fr, img)),
      ...COL.map(([fr]) => W(fr, fr)),
      ...SALLE.map(([img, fr]) => W(fr, img)),
      ...["dans", "sur", "sous", "devant", "derrière"].map((fr) =>
        W(fr, "p-" + fr.replace("è", "e")),
      ),
      ...["joie", "peur", "tristesse", "colère", "angoisse"].map((fr) =>
        W(fr, fr.replace("è", "e")),
      ),
    ],

    // p. 31 ex. 14 Boîte à sons
    sounds: [
      {
        s: "ou",
        ipa: "[u]",
        intro: "Le son [u] s’écrit « ou ».",
        hear: "ou… bonjour, trousse, rouge",
        img: "ronde",
        words: [
          "tous",
          "bonjour",
          "couleur",
          "sous",
          "écoute",
          "nous",
          "joue",
          "trouver",
          "poubelle",
          "trousse",
          "douze",
          "rouge",
        ],
        pics: {
          tous: "p6",
          bonjour: "maitresse",
          couleur: "couleurs",
          sous: "p-sous",
          écoute: { emoji: "👂" },
          nous: { emoji: "🧑‍🤝‍🧑" },
          joue: "dominos",
          trouver: { emoji: "🔍" },
          poubelle: "poubelle2",
          trousse: "trousse2",
          douze: "douze",
          rouge: "tache",
          tortue: "tortue",
          huit: "huit",
          furet: "furet",
          livre: "livre",
          gomme: "gomme",
          vert: "vert",
        },
        not: ["tortue", "huit", "furet", "livre", "gomme", "vert"],
      },
    ],

    story: [
      {
        img: "p1",
        lines: [
          line(
            "la maîtresse",
            "Bonjour, les enfants ! Prenez le cahier de Français et le stylo bleu.",
          ),
        ],
      },
      { img: "p2", lines: [line("Théo", "Léo, dépêche-toi !")] },
      {
        img: "p4",
        lines: [
          line("Isabelle", "Voici une gomme et un taille-crayon !"),
          line("Ahmed", "Un feutre jaune et un stylo rouge !"),
        ],
      },
      {
        img: "p5",
        lines: [line("Lin", "Des crayons de couleur et des ciseaux !")],
      },
      { img: "p6", lines: [line("Léo", "Merci beaucoup, les amis !")] },
      {
        img: "p7",
        lines: [
          line("la maîtresse", "Léo, quel désordre ! Où est ton stylo bleu ?"),
        ],
      },
      {
        img: "p8",
        lines: [
          line(
            "Léo",
            "Voilà mon stylo bleu : il est bien rangé dans ma trousse !",
          ),
        ],
      },
      {
        title: "🎵 Dans mon cartable",
        img: "sac",
        lines: [
          "Dans mon cartable",
          "tout est rangé,",
          "tous les livres",
          "et les cahiers.",
          "J’ai dix feutres",
          "et douze crayons,",
          "quatre gommes",
          "et un taille-crayon.",
          "De la colle pour coller,",
          "des ciseaux pour découper,",
          "une trousse et deux stylos,",
          "tout est prêt pour mon boulot !",
        ].map((fr) => line("", fr)),
      },
      {
        img: "jeu",
        lines: [
          "Qu’est-ce que c’est ?",
          "Attends… C’est un taille-crayon.",
          "Non, ce n’est pas un taille-crayon. C’est une gomme !",
          "Oh non !",
        ].map((fr) => line("", fr)),
      },
      {
        img: "dominos",
        lines: [
          "Vert.",
          "Voilà la carte ! Et maintenant jaune.",
          "Je n’ai pas la carte !",
        ].map((fr) => line("", fr)),
      },
      {
        title: "🎵 La ronde des couleurs",
        img: "ronde",
        lines: [
          "Si tu as du bleu sur toi,",
          "lève-toi, lève-toi.",
          "Si tu as du bleu sur toi,",
          "lève-toi et chante avec moi !",
          "La la la la…",
          "Si tu as du bleu sur toi,",
          "assieds-toi, assieds-toi.",
          "Si tu as du bleu sur toi,",
          "assieds-toi et repose-toi !",
          "La la la la…",
          "rouge, jaune, vert",
        ].map((fr) => line("", fr)),
      },
      {
        title: "🌍 À l’école, sans souci !",
        img: "photo",
        lines: [
          line("", "Je prépare mon cartable le soir avant de me coucher."),
        ],
      },
    ],

    sentences: [
      { fr: "Le feutre est jaune.", img: "feutre" },
      { fr: "Lin trouve des ciseaux.", img: "p5" },
      { fr: "Le stylo bleu est dans la trousse.", img: "p8" },
      { fr: "L’ordinateur est sur le bureau.", img: "ordinateur" },
      { fr: "Les tables sont devant le bureau.", img: "salle" },
      { fr: "Hector est dans la poubelle.", img: "poubelle" },
      { fr: "C’est une gomme !", img: "gomme" },
    ],

    build: [
      { fr: "cahier", img: "cahier" },
      { fr: "livre", img: "livre" },
      { fr: "stylo", img: "stylo" },
      { fr: "gomme", img: "gomme" },
      { fr: "trousse", img: "trousse" },
      { fr: "règle", img: "regle" },
      { fr: "rouge", img: "rouge" },
      { fr: "bleu", img: "bleu" },
      { fr: "vert", img: "vert" },
      { fr: "table", img: "table" },
      { fr: "porte", img: "porte" },
      { fr: "chaise", img: "chaise" },
    ],

    exercises: [
      {
        k: "vf",
        t: "Vrai ou faux ?",
        en: "True or false?",
        img: "p4",
        from: "Livre p. 27 ex. 2",
        keep: true,
        items: [
          vf(
            "p4",
            "Isabelle trouve un cahier.",
            "Faux. Isabelle trouve une gomme et un taille-crayon.",
          ),
          vf("p4", "Le feutre est jaune."),
          vf("p5", "Lin trouve des ciseaux."),
          vf(
            "p8",
            "Le stylo bleu est dans le cartable.",
            "Faux. Le stylo bleu est dans la trousse.",
          ),
        ],
      },
      {
        k: "reponds",
        t: "Réponds",
        en: "Answer",
        img: "p1",
        from: "Livre p. 27 ex. 3",
        keep: true,
        items: [
          {
            type: "mc",
            img: "p1",
            q: "Quels objets demande de prendre la maîtresse ?",
            opts: [
              "Le cahier de Français et le stylo bleu.",
              "Une gomme et un taille-crayon.",
              "Des crayons de couleur et des ciseaux.",
            ],
          },
          {
            type: "mc",
            img: "p3",
            q: "Quels objets scolaires sont nommés ?",
            opts: [
              "Le cahier, le stylo, la gomme, le taille-crayon, le feutre, les crayons de couleur, les ciseaux et la trousse.",
              "La table, la chaise, le tableau et la porte.",
              "Le livre, la règle et la colle.",
            ],
          },
          {
            type: "mc",
            img: "p4",
            q: "Quels sont les trois couleurs nommées ?",
            opts: [
              "Bleu, jaune et rouge.",
              "Vert, rose et noir.",
              "Blanc, gris et marron.",
            ],
          },
          {
            type: "mc",
            img: "p8",
            q: "Où se trouve le stylo bleu de Léo ?",
            opts: ["Dans sa trousse.", "Dans le cartable.", "Sur la table."],
          },
        ],
      },
      {
        k: "objets",
        t: "Écoute et dis le numéro",
        en: "School things: listen, tap the picture",
        img: "objets",
        from: "Livre p. 28 ex. 5",
        items: OBJ.map((_, k) => tapOf(OBJ, k)),
      },
      {
        k: "couleurs",
        t: "Les couleurs",
        en: "Colours: match the colour and the word",
        img: "couleurs",
        from: "Livre p. 29 ex. 7",
        items: [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10],
        ].map((g) => ({
          type: "match",
          pairs: g.map((i) => ({ img: COL[i][0], fr: COL[i][0] })),
        })),
      },
      {
        k: "salle",
        t: "Dans la salle de classe",
        en: "The classroom: listen, tap the picture",
        img: "salle",
        from: "Livre p. 30 ex. 10",
        items: SALLE.map((_, k) => tapOf(SALLE, k)),
      },
      {
        k: "vf2",
        t: "Vrai ou faux ? Corrige",
        en: "True or false? Correct it",
        img: "prepositions",
        from: "Livre p. 30 ex. 11",
        keep: true,
        items: [
          vf(
            "horloge",
            "L’horloge est devant le tableau.",
            "Faux. L’horloge est au-dessus du tableau.",
          ),
          vf("poubelle", "La poubelle est sous la carte."),
          vf("ordinateur", "L’ordinateur est sur le bureau."),
          vf(
            "salle",
            "Les tables sont derrière le bureau.",
            "Faux. Les tables sont devant le bureau.",
          ),
          vf("table", "Le stylo rouge est dans la trousse."),
          vf(
            "salle",
            "Le cahier violet est sous la chaise.",
            "Faux. Le cahier violet est sur la table.",
          ),
        ],
      },
      {
        k: "hector",
        t: "Où est Hector ?",
        en: "Where is Hector?",
        img: "poubelle",
        from: "Livre p. 30 ex. 12",
        items: [
          {
            type: "mc",
            img: "salle",
            q: "Observe bien l’image. Où est Hector ?",
            opts: [
              "Hector est dans la poubelle.",
              "Hector est sous la chaise.",
              "Hector est sur le bureau.",
            ],
          },
        ],
      },
      {
        k: "son-ou",
        t: "Trouve les mots avec le son [u]",
        en: "Do you hear [u]?",
        img: "trousse2",
        from: "Livre p. 31 ex. 15",
        keep: true,
        items: SON.map(hearU),
      },
      {
        k: "sans-souci",
        t: "À l’école, sans souci !",
        en: "The best way to go to school without worries",
        img: "s1",
        from: "Livre p. 32 ex. 4",
        items: [
          {
            type: "mc",
            img: "photo",
            q: "Quelle est la meilleure situation pour aller à l’école sans souci ?",
            opts: [
              "Je prépare mon cartable le soir avant de me coucher.",
              "Je vérifie mon cartable le matin avant de déjeuner.",
              "Je prépare mon cartable le matin avant de partir à l’école.",
            ],
          },
        ],
      },
    ],

    dict: DICT,
    auto: () => null,
  };
  (window.FR_DATA = window.FR_DATA || {}).u3 = window.LESSON;
})();
