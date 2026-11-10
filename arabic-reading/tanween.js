// Arabic reading · Step 7: tanween (Grade 3 and 4).
// Sources: booklet «خطة علاجية للقراءة والكتابة» p. 10–11 (سَابِعًا: التَّنْوِينُ: الضَّمُّ، الْكَسْرُ، الْفَتْحُ);
// teacher's guide «دليل المعلم» worksheet 32 (p. 68: the kinds of tanween).
(function () {
  // the words of the three lists, by their letters without tanween: [picture, en, uk]
  const M = {
    شجر: ["🌳", "trees", "дерева"],
    بحر: ["🌊", "sea", "море"],
    وردة: ["🌹", "rose", "троянда"],
    بيت: ["🏠", "house", "дім"],
    فصل: ["🍂❄️", "season, class", "пора року, клас"],
    خالد: ["👦", "Khaled (a boy's name)", "Халід (ім'я хлопчика)"],
    كتاب: ["📕", "book", "книжка"],
    دجاج: ["🐔", "chickens", "кури"],
    ثعلب: ["🦊", "fox", "лисиця"],
    باب: ["🚪", "door", "двері"],
    مدرسة: ["🏫", "school", "школа"],
    تمر: ["🌴", "dates (fruit)", "фініки"],
    خاتم: ["💍", "ring", "перстень"],
    طالب: ["🧑‍🎓", "student", "учень"],
    معلم: ["👨‍🏫", "teacher", "учитель"],
    أب: ["👨", "father", "батько"],
    حزين: ["😢", "sad", "сумний"],
    عامر: ["🧒", "Amer (a boy's name)", "Амер (ім'я хлопчика)"],
    حلو: ["🍬", "sweet", "солодкий"],
    بارد: ["🥶", "cold", "холодний"],
    عسل: ["🍯", "honey", "мед"],
    مفيدة: ["👍", "useful", "корисна"],
    شجرة: ["🌲", "tree", "дерево"],
    ساعة: ["⏰", "clock", "годинник"],
    أحلام: ["💭", "dreams", "мрії"],
    قلم: ["✏️", "pencil", "олівець"],
    خروف: ["🐑", "sheep", "баран"],
    صالح: ["😇", "good (a good person)", "добрий (добра людина)"],
    جزر: ["🥕", "carrots", "морква"],
    نظيف: ["🧼", "clean", "чистий"],
    أسبوع: ["📅", "week", "тиждень"],
    مسطرة: ["📏", "ruler", "лінійка"],
    بلح: ["🌴", "dates (fresh)", "свіжі фініки"],
    قصة: ["📖", "story", "оповідання"],
    لذيذ: ["😋", "tasty", "смачний"],
    خيار: ["🥒", "cucumber", "огірок"],
    دجاجة: ["🐔", "hen", "курка"],
    حقيبة: ["🎒", "school bag", "портфель"],
    نشاط: ["🤸", "activity, energy", "активність"],
    تلميذة: ["👩‍🎓", "schoolgirl", "учениця"],
    مبكر: ["🌅", "early", "рано"],
    سبورة: ["⬛", "blackboard", "дошка"],
    فستان: ["👗", "dress", "сукня"],
    عدد: ["🔢", "number", "число"],
    // worksheet 32
    مجتهد: ["📚", "hard-working", "старанний"],
    كلمات: ["🔤", "words", "слова"],
    سماء: ["☁️", "sky", "небо"],
    قطة: ["🐱", "cat", "кішка"],
    علم: ["🧠", "knowledge", "знання"],
    حرف: ["🔠", "a letter", "літера"],
    نشيط: ["🏃", "active, lively", "активний"],
    مفترس: ["🦁", "predator", "хижак"],
    مفتاح: ["🔑", "key", "ключ"],
    لبن: ["🥛", "milk", "молоко"],
  };
  const H = /[ً-ْٰ]/g;
  // the dictionary key of a word: no harakat, no tanween alif, no ال
  const key = (w) =>
    w
      .replace(H, "")
      .replace(/ا$/, (a) => (/ً/.test(w) ? "" : a))
      .replace(/^ال/, "");
  const info = (w) => M[key(w)] || M[key(w).replace(/ا$/, "")];
  const DAMM = [
    ..."شَجَرٌ بَحْرٌ وَرْدَةٌ بَيْتٌ فَصْلٌ خَالِدٌ كِتَابٌ دَجَاجٌ ثَعْلَبٌ بَابٌ مَدْرَسَةٌ تَمْرٌ خَاتَمٌ طَالِبٌ مُعَلِّمٌ أَبٌ حَزِينٌ عَامِرٌ حُلْوٌ بَارِدٌ عَسَلٌ مُفِيدَةٌ شَجَرَةٌ سَاعَةٌ أَحْلَامٌ".split(
      " ",
    ),
  ];
  const KASR =
    "شَجَرٍ بَحْرٍ قَلَمٍ بَيْتٍ فَصْلٍ خَالِدٍ كِتَابٍ خَرُوفٍ ثَعْلَبٍ بَابٍ أَبٍ عَسَلٍ حَزِينٍ صَالِحٍ جَزَرٍ أَحْلَامٍ نَظِيفٍ أُسْبُوعٍ مِسْطَرَةٍ بَلَحٍ".split(
      " ",
    );
  const FATH =
    "شَجَرًا قِصَّةً لَذِيذًا بَيْتًا وَرْدَةً خِيَارًا حَزِينًا دَجَاجَةً ثَعْلَبًا حَقِيبَةً نَشَاطًا كِتَابًا تِلْمِيذَةً مُبَكِّرًا قَلَمًا سَبُّورَةً نَظِيفًا فُسْتَانًا عَدَدًا بَلَحًا".split(
      " ",
    );
  const T3 = ["ـٌ", "ـٍ", "ـً"];
  const KIND = { ـٌ: "ٌ", ـٍ: "ٍ", ـً: "ً" };
  const kindOf = (w) => T3.find((t) => w.includes(KIND[t]));

  const read = (a) => ({
    type: "read",
    q: "اقْرَأِ الْكَلِمَةَ",
    a,
    ic: info(a)[0],
    en: `Read the word, the tanween too: ${info(a)[1]}.`,
    uk: `Прочитай слово, і танвін теж: ${info(a)[2]}.`,
  });
  // which tanween (the word shown and said); the three buttons in a fixed order
  // the options are the word's last letter with each tanween (دٌ · دٍ · دًا), always in this order
  const forms = (w) => {
    const L = key(w).slice(-1);
    return [L + "ٌ", L + "ٍ", L + ("ةء".includes(L) ? "ً" : "ًا")];
  };
  const which = (w) => ({
    type: "mc",
    q: `مَا نَوْعُ التَّنْوِينِ فِي «${w}»؟`,
    say: w,
    o: [
      forms(w)[T3.indexOf(kindOf(w))],
      ...forms(w).filter((_, j) => j !== T3.indexOf(kindOf(w))),
    ],
    keep: forms(w),
    ic: info(w)[0],
    en: `Which tanween is in this word: ـٌ (un), ـٍ (in) or ـً (an)? (${info(w)[1]})`,
    uk: `Який танвін у цьому слові: ـٌ (ун), ـٍ (ін) чи ـً (ан)? (${info(w)[2]})`,
  });
  const hear = (o) => ({
    type: "mc",
    q: "اسْتَمِعْ، ثُمَّ اخْتَرْ مَا تَسْمَعُ",
    say: o[0],
    o,
    ic: info(o[0])[0],
    en: `Listen: un, in or an? Choose the word you hear (${info(o[0])[1]}).`,
    uk: `Послухай: ун, ін чи ан? Вибери слово, яке чуєш (${info(o[0])[2]}).`,
  });
  // tanween with fatha: an alif after the letter, except after ة
  const alif = (o) => ({
    type: "mc",
    q: "الصُّورَةُ: ___",
    o,
    ic: info(o[0])[0],
    en: `Which spelling is right? Tanween with fatha gets an alif after it, except after ة (${info(o[0])[1]}).`,
    uk: `Яке написання правильне? Після танвіну з фатхою пишуть аліф, крім ة (${info(o[0])[2]}).`,
  });
  // is there tanween in the heard word?
  const tf = (w, a, x) => ({
    type: "tf",
    q: "اسْتَمِعْ: هَلْ فِي الْكَلِمَةِ تَنْوِينٌ؟",
    say: w,
    mute: w,
    a,
    x: `${w}: ${x}`,
    ic: info(w)[0],
    en: `Listen: is there tanween (un, in, an) at the end of the word? (${info(w)[1]})`,
    uk: `Послухай: чи є танвін (ун, ін, ан) у кінці слова? (${info(w)[2]})`,
  });
  const letter = (w, right, others) => ({
    type: "mc",
    q: `عَلَى أَيِّ حَرْفٍ التَّنْوِينُ فِي «${w}»؟`,
    say: w,
    o: [right, ...others],
    ic: info(w)[0],
    en: `Which letter has the tanween? (${info(w)[1]})`,
    uk: `Над якою літерою танвін? (${info(w)[2]})`,
  });
  const RULE = {
    t: "📘 The rule · الْقَاعِدَةُ",
    ar: "التَّنْوِينُ ثَلَاثَةُ أَنْوَاعٍ: تَنْوِينُ الضَّمِّ (ـٌ)، تَنْوِينُ الْكَسْرِ (ـٍ)، تَنْوِينُ الْفَتْحِ (ـً). يَخْتَلِفُ تَنْوِينُ الْفَتْحِ فِي إِضَافَةِ أَلِفٍ بَعْدَ الْحَرْفِ الْمُنَوَّنِ عَلَى كُلِّ الْحُرُوفِ، مَا عَدَا التَّاءَ الْمَرْبُوطَةَ (ة).",
    en: "There are three kinds of tanween: with damma ـٌ (un), with kasra ـٍ (in), with fatha ـً (an). Tanween with fatha is different: an alif is written after the letter (كِتَابًا), except after round ta ة (قِصَّةً).",
    uk: "Є три види танвіну: з даммою ـٌ (ун), з кясрою ـٍ (ін), з фатхою ـً (ан). Танвін з фатхою особливий: після літери пишуть аліф (كِتَابًا), крім круглого та ة (قِصَّةً).",
  };

  window.LESSON = {
    n: "rd7",
    title: "التَّنْوِينُ",
    en: "Tanween: un, in, an",
    uk: "Танвін: ун, ін, ан",
    unit: "Arabic reading · Step 7 · booklet p. 10–11",
    cover: "img/tanween/tile.jpg",
    tapq: true,
    links: window.READING_LINKS,
    tabs: [
      {
        k: "read",
        ic: "🔤",
        t: "Read",
        short: "Read",
        ar: "اقْرَأْ",
        sub: [
          "Read each word, then listen to check",
          "اقْرَأْ، ثُمَّ اسْتَمِعْ",
        ],
      },
      {
        k: "games",
        ic: "🎮",
        t: "Games",
        short: "Games",
        ar: "أَلْعَابٌ",
        sub: ["Games with tanween", "أَلْعَابُ التَّنْوِينِ"],
      },
    ],
    stories: [],
    exercises: [
      {
        k: "damm",
        tab: "read",
        t: "تَنْوِينُ الضَّمِّ (ـٌ)",
        ic: "🔵",
        en: "Tanween with damma ـٌ: un (booklet p. 10)",
        uk: "Танвін з даммою ـٌ: ун (зошит, с. 10)",
        rule: RULE,
        items: DAMM.map(read),
      },
      {
        k: "kasr",
        tab: "read",
        t: "تَنْوِينُ الْكَسْرِ (ـٍ)",
        ic: "🟢",
        en: "Tanween with kasra ـٍ: in (booklet p. 11)",
        uk: "Танвін з кясрою ـٍ: ін (зошит, с. 11)",
        rule: "damm",
        items: KASR.map(read),
      },
      {
        k: "fath",
        tab: "read",
        t: "تَنْوِينُ الْفَتْحِ (ـً)",
        ic: "🟠",
        en: "Tanween with fatha ـً: an, with an alif except after ة (booklet p. 11)",
        uk: "Танвін з фатхою ـً: ан, з аліфом, крім ة (зошит, с. 11)",
        rule: "damm",
        items: FATH.map(read),
      },

      {
        k: "which",
        tab: "games",
        t: "مَا نَوْعُ التَّنْوِينِ؟",
        ic: "🔎",
        en: "Which tanween is it: ـٌ, ـٍ or ـً? (guide worksheet 32, task 4, and booklet p. 10–11)",
        uk: "Який це танвін: ـٌ, ـٍ чи ـً? (посібник, аркуш 32, завдання 4, і зошит, с. 10–11)",
        rule: "damm",
        items: [
          "مُجْتَهِدًا",
          "كَلِمَاتٍ",
          "سَمَاءً",
          "قِطَّةً",
          "بَحْرٌ",
          "قَلَمٍ",
          "بَيْتًا",
          "خَرُوفٍ",
          "حُلْوٌ",
          "عَدَدًا",
          "شَجَرَةٍ",
          "مُعَلِّمٌ",
        ].map(which),
      },
      {
        k: "hear",
        tab: "games",
        t: "اسْتَمِعْ وَاخْتَرْ",
        ic: "👂",
        en: "Hear the word: un, in or an? (guide worksheet 32, task 5, and booklet p. 10–11)",
        uk: "Почуй слово: ун, ін чи ан? (посібник, аркуш 32, завдання 5, і зошит, с. 10–11)",
        items: [
          hear(["عِلْمٌ", "عِلْمٍ", "عِلْمًا"]),
          hear(["عِلْمٍ", "عِلْمٌ", "عِلْمًا"]),
          hear(["حَرْفًا", "حَرْفٌ", "حَرْفٍ"]),
          hear(["حَرْفٍ", "حَرْفٌ", "حَرْفًا"]),
          hear(["نَشِيطٌ", "نَشِيطٍ", "نَشِيطًا"]),
          hear(["نَشِيطًا", "نَشِيطٌ", "نَشِيطٍ"]),
          hear(["شَجَرًا", "شَجَرٌ", "شَجَرٍ"]),
          hear(["ثَعْلَبٍ", "ثَعْلَبٌ", "ثَعْلَبًا"]),
          hear(["كِتَابٌ", "كِتَابٍ", "كِتَابًا"]),
          hear(["بَيْتٍ", "بَيْتٌ", "بَيْتًا"]),
        ],
      },
      {
        k: "alif",
        tab: "games",
        t: "أَلِفُ تَنْوِينِ الْفَتْحِ",
        ic: "🅰️",
        en: "Tanween with fatha: with an alif (كِتَابًا) or without, after ة (قِصَّةً)? Choose the right spelling (booklet p. 11)",
        uk: "Танвін з фатхою: з аліфом (كِتَابًا) чи без, після ة (قِصَّةً)? Вибери правильне написання (зошит, с. 11)",
        rule: "damm",
        items: [
          alif(["شَجَرًا", "شَجَرً"]),
          alif(["وَرْدَةً", "وَرْدَةًا"]),
          alif(["كِتَابًا", "كِتَابً"]),
          alif(["حَقِيبَةً", "حَقِيبَةًا"]),
          alif(["قَلَمًا", "قَلَمً"]),
          alif(["تِلْمِيذَةً", "تِلْمِيذَةًا"]),
          alif(["فُسْتَانًا", "فُسْتَانً"]),
          alif(["دَجَاجَةً", "دَجَاجَةًا"]),
        ],
      },
      {
        k: "tf",
        tab: "games",
        t: "هَلْ تَسْمَعُ تَنْوِينًا؟",
        ic: "✋",
        en: "Raise your hand when you hear tanween: is there tanween in the word? (guide worksheet 32, the activity)",
        uk: "Підніми руку, коли чуєш танвін: чи є танвін у слові? (посібник, аркуш 32, вправа)",
        items: [
          tf("كِتَابًا", true, "فِيهَا تَنْوِينُ الْفَتْحِ."),
          tf("لَبَنْ", false, "لَيْسَ فِيهَا تَنْوِينٌ."),
          tf("مَدْرَسَةٍ", true, "فِيهَا تَنْوِينُ الْكَسْرِ."),
          tf("مُجْتَهِدًا", true, "فِيهَا تَنْوِينُ الْفَتْحِ."),
          tf("قَلَمٌ", true, "فِيهَا تَنْوِينُ الضَّمِّ."),
          tf("الْقَلَمُ", false, "لَيْسَ فِيهَا تَنْوِينٌ."),
          tf("بَيْتٍ", true, "فِيهَا تَنْوِينُ الْكَسْرِ."),
          tf("الْبَيْتُ", false, "لَيْسَ فِيهَا تَنْوِينٌ."),
        ],
      },
      {
        k: "letter",
        tab: "games",
        t: "الْحَرْفُ الْمُنَوَّنُ",
        ic: "🎨",
        en: "Which letter has the tanween? (guide worksheet 32, task 6)",
        uk: "Над якою літерою танвін? (посібник, аркуш 32, завдання 6)",
        items: [
          letter("مُفْتَرِسٌ", "س", ["ر", "م"]),
          letter("مِفْتَاحًا", "ح", ["ا", "ت"]),
          letter("شَجَرَةٍ", "ة", ["ر", "ج"]),
          letter("خَاتَمٌ", "م", ["ت", "خ"]),
          letter("لَذِيذًا", "ذ", ["ا", "ل"]),
          letter("أُسْبُوعٍ", "ع", ["و", "ب"]),
        ],
      },
    ],
    gloss: {
      ...Object.fromEntries(
        [
          ...DAMM,
          ...KASR,
          ...FATH,
          "مُجْتَهِدًا",
          "كَلِمَاتٍ",
          "سَمَاءً",
          "قِطَّةً",
          "عِلْمٌ",
          "عِلْمٍ",
          "عِلْمًا",
          "حَرْفٌ",
          "حَرْفٍ",
          "حَرْفًا",
          "نَشِيطٌ",
          "نَشِيطٍ",
          "نَشِيطًا",
          "شَجَرٌ",
          "ثَعْلَبًا",
          "كِتَابٍ",
          "بَيْتٌ",
          "مُفْتَرِسٌ",
          "مِفْتَاحًا",
          "شَجَرَةٍ",
          "قَلَمٌ",
          "الْقَلَمُ",
          "الْبَيْتُ",
          "مَدْرَسَةٍ",
          "لَبَنْ",
        ].map((w) => [w, info(w).slice(1)]),
      ),
      // the fatha tanween written wrong
      ...Object.fromEntries(
        [
          "شَجَرً",
          "وَرْدَةًا",
          "كِتَابً",
          "حَقِيبَةًا",
          "قَلَمً",
          "تِلْمِيذَةًا",
          "فُسْتَانً",
          "دَجَاجَةًا",
        ].map((w) => [
          w,
          [
            `✗ ${info(w.replace(/ًا$/, "ً"))[1]}, spelt wrong`,
            `✗ ${info(w.replace(/ًا$/, "ً"))[2]}, неправильне написання`,
          ],
        ]),
      ),
      التَّنْوِينُ: [
        "tanween (un, in, an at the end)",
        "танвін (ун, ін, ан у кінці)",
      ],
      التَّنْوِينِ: ["tanween", "танвіну"],
      تَنْوِينُ: ["tanween", "танвін"],
      تَنْوِينِ: ["tanween", "танвіну"],
      تَنْوِينٌ: ["tanween", "танвін"],
      تَنْوِينًا: ["tanween", "танвін"],
      الضَّمِّ: ["with damma", "з даммою"],
      الْكَسْرِ: ["with kasra", "з кясрою"],
      الْفَتْحِ: ["with fatha", "з фатхою"],
      اقْرَأِ: ["read", "прочитай"],
      الْكَلِمَةَ: ["the word", "слово"],
      الْكَلِمَةِ: ["the word", "слові"],
      مَا: ["what", "який"],
      نَوْعُ: ["the kind of", "вид"],
      فِي: ["in", "у"],
      اسْتَمِعْ: ["listen", "послухай"],
      ثُمَّ: ["then", "потім"],
      اخْتَرْ: ["choose", "вибери"],
      وَاخْتَرْ: ["and choose", "і вибери"],
      تَسْمَعُ: ["you hear", "ти чуєш"],
      الصُّورَةُ: ["the picture", "малюнок"],
      أَلِفُ: ["the alif of", "аліф"],
      هَلْ: ["is there (question)", "чи"],
      عَلَى: ["on", "на"],
      أَيِّ: ["which", "якій"],
      حَرْفٍ: ["letter", "літері"],
      الْحَرْفُ: ["the letter", "літера"],
      الْمُنَوَّنُ: ["with tanween", "з танвіном"],
    },
  };
})();
