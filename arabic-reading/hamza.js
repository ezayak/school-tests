// Arabic reading · Step 9: hamzat al-qat' and hamzat al-wasl, alif layyina ى (Grade 3 and 4).
// Source: booklet «خطة علاجية للقراءة والكتابة» p. 14 (تَاسِعًا: هَمْزَةُ الْقَطْعِ وَهَمْزَةُ الْوَصْلِ · عَاشِرًا: الْأَلِفُ اللَّيِّنَةُ عَلَى صُورَةِ يَاءٍ «ى»).
// The guide has no worksheet for them.
(function () {
  // booklet p. 14, row by row (right to left): [word, picture, en, uk, wasl]
  const HAMZA = [
    ["أُذُن", "👂", "ear", "вухо"],
    ["اسْتَمِعْ", "🎧", "listen!", "слухай!", 1],
    ["أَنَا", "🙋", "I", "я"],
    ["اسْم", "🏷️", "name", "ім'я", 1],
    ["أَزْرَق", "🔵", "blue", "синій"],
    ["أَكَلَ", "🍽️", "he ate", "він з'їв"],
    ["أَمْجَد", "👦", "Amjad (a boy's name)", "Амджад (ім'я хлопчика)"],
    ["أُخْت", "👧", "sister", "сестра"],
    ["أَبِيهِ", "👨", "his father", "його батька"],
    ["أَخَذَ", "🤲", "he took", "він узяв"],
    ["ابْن", "👶", "son", "син", 1],
    ["أَحْمَر", "🔴", "red", "червоний"],
    ["أَخٌ", "🧑‍🤝‍🧑", "brother", "брат"],
    ["أَحْلَام", "💭", "dreams", "мрії"],
    ["أَمَرَ", "🫵", "he ordered", "він наказав"],
    ["أَنْف", "👃", "nose", "ніс"],
  ];
  const ALIF = [
    ["عَلَى", "⬆️", "on", "на"],
    ["أَتَمَنَّى", "🌠", "I wish", "я бажаю"],
    ["كُبْرَى", "🏔️", "the biggest (fem.)", "найбільша"],
    ["رَأَى", "👀", "he saw", "він побачив"],
    ["الْمَرْعَى", "🐄", "the pasture", "пасовище"],
    ["مُسْتَشْفَى", "🏥", "hospital", "лікарня"],
    ["اشْتَرَى", "🛍️", "he bought", "він купив", 1],
    ["بُشْرَى", "🎉", "good news", "добра звістка"],
    ["أَحْلَى", "🍭", "sweeter, nicer", "солодший, кращий"],
    ["أَهْوَى", "❤️", "I love (a hobby)", "я захоплююся"],
  ];
  const W = Object.fromEntries([...HAMZA, ...ALIF].map((w) => [w[0], w]));
  for (const w of [
    ["اسْتَيْقَظَ", "⏰", "he woke up", "він прокинувся", 1],
    ["هُنَا", "📍", "here", "тут"],
    ["عَصَا", "🦯", "stick", "палиця"],
  ])
    W[w[0]] = w;
  const KINDS = ["هَمْزَةُ قَطْعٍ (أ)", "هَمْزَةُ وَصْلٍ (ا)"];

  const read = ([a, ic, en, uk]) => ({
    type: "read",
    q: "اقْرَأِ الْكَلِمَةَ",
    a,
    ic,
    en: `Read the word: ${en}.`,
    uk: `Прочитай слово: ${uk}.`,
  });
  const kind = (w) => ({
    type: "mc",
    q: `الْهَمْزَةُ فِي «${w}»: ___`,
    say: w,
    o: W[w][4] ? [KINDS[1], KINDS[0]] : KINDS,
    keep: KINDS,
    ic: W[w][1],
    en: `Hamzat al-qat' (أ, written with its little hamza) or hamzat al-wasl (ا, plain alif)? (${W[w][2]})`,
    uk: `Хамза аль-кат' (أ, з маленькою хамзою) чи хамза аль-васль (ا, просто аліф)? (${W[w][3]})`,
  });
  // the first letter: أ or ا
  const first = (q, w) => ({
    type: "mc",
    q,
    say: w,
    o: W[w][4] ? ["ا", "أَ"] : [w.slice(0, 2), "ا"],
    keep: ["أَ", "أُ", "ا"],
    ic: W[w][1],
    en: `How does the word start: أ (hamzat al-qat') or ا (hamzat al-wasl)? (${W[w][2]})`,
    uk: `Як починається слово: أ (хамза аль-кат') чи ا (хамза аль-васль)? (${W[w][3]})`,
  });
  // the last letter: ى (alif layyina) or ا
  const last = (q, w, right) => ({
    type: "mc",
    q,
    say: w,
    o: right === "ى" ? ["ى", "ا"] : ["ا", "ى"],
    keep: ["ى", "ا"],
    ic: W[w][1],
    en: `How does the word end: ى (an alif written like a ya without dots) or ا? (${W[w][2]})`,
    uk: `Як закінчується слово: ى (аліф, написаний як я без крапок) чи ا? (${W[w][3]})`,
  });

  window.LESSON = {
    n: "rd9",
    title: "هَمْزَةُ الْقَطْعِ وَالْوَصْلِ · الْأَلِفُ اللَّيِّنَةُ",
    en: "Hamza: أ and ا · the alif ى",
    uk: "Хамза: أ і ا · аліф ى",
    unit: "Arabic reading · Step 9 · booklet p. 14",
    cover: "img/hamza/tile.jpg",
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
        sub: ["Games with أ, ا and ى", "أَلْعَابُ الْهَمْزَةِ وَالْأَلِفِ"],
      },
    ],
    stories: [],
    exercises: [
      {
        k: "hamza",
        tab: "read",
        t: "هَمْزَةُ الْقَطْعِ وَهَمْزَةُ الْوَصْلِ",
        ic: "🅰️",
        en: "Hamzat al-qat' أ and hamzat al-wasl ا (booklet p. 14)",
        uk: "Хамза аль-кат' أ і хамза аль-васль ا (зошит, с. 14)",
        rule: {
          t: "📘 The rule · الْقَاعِدَةُ",
          ar: "هَمْزَةُ الْقَطْعِ تُكْتَبُ (أ)، مِثَالٌ: أَخَذَ. هَمْزَةُ الْوَصْلِ تُكْتَبُ (ا)، مِثَالٌ: ابْن.",
          en: "Hamzat al-qat' is written أ (with a little hamza), example: أَخَذَ (he took). Hamzat al-wasl is written ا (a plain alif), example: ابْن (son).",
          uk: "Хамзу аль-кат' пишуть أ (з маленькою хамзою), приклад: أَخَذَ (він узяв). Хамзу аль-васль пишуть ا (просто аліф), приклад: ابْن (син).",
        },
        items: HAMZA.map(read),
      },
      {
        k: "alif",
        tab: "read",
        t: "الْأَلِفُ اللَّيِّنَةُ (ى)",
        ic: "🔚",
        en: "The alif written like a ya ى at the end of a word (booklet p. 14)",
        uk: "Аліф, написаний як я ى у кінці слова (зошит, с. 14)",
        rule: {
          t: "📘 The alif ى · الْأَلِفُ اللَّيِّنَةُ",
          ar: "الْأَلِفُ اللَّيِّنَةُ تُنْطَقُ أَلِفًا، وَتُكْتَبُ فِي آخِرِ بَعْضِ الْكَلِمَاتِ عَلَى صُورَةِ يَاءٍ بِلَا نُقَطٍ (ى)، مِثَالٌ: عَلَى.",
          en: "This alif sounds like a (long a), but at the end of some words it is written like a ya without dots: ى. Example: عَلَى (on).",
          uk: "Цей аліф звучить як довге «а», але в кінці деяких слів його пишуть як я без крапок: ى. Приклад: عَلَى (на).",
        },
        items: ALIF.map(read),
      },

      {
        k: "kind",
        tab: "games",
        t: "قَطْعٌ أَمْ وَصْلٌ؟",
        ic: "🔎",
        en: "Hamzat al-qat' or hamzat al-wasl? (booklet p. 14)",
        uk: "Хамза аль-кат' чи хамза аль-васль? (зошит, с. 14)",
        rule: "hamza",
        items: [
          "أَخَذَ",
          "ابْن",
          "أُذُن",
          "اسْتَمِعْ",
          "أَزْرَق",
          "اسْم",
          "أُخْت",
          "اشْتَرَى",
          "أَحْمَر",
          "اسْتَيْقَظَ",
          "أَنْف",
          "أَمْجَد",
        ].map(kind),
      },
      {
        k: "first",
        tab: "games",
        t: "أ أَمْ ا؟",
        ic: "✏️",
        en: "Hear the word and choose its first letter: أ or ا (booklet p. 14)",
        uk: "Почуй слово і вибери першу літеру: أ чи ا (зошит, с. 14)",
        rule: "hamza",
        items: [
          first("___زْرَق", "أَزْرَق"),
          first("___سْم", "اسْم"),
          first("___كَلَ", "أَكَلَ"),
          first("___بْن", "ابْن"),
          first("___حْمَر", "أَحْمَر"),
          first("___سْتَمِعْ", "اسْتَمِعْ"),
          first("___نَا", "أَنَا"),
          first("___شْتَرَى", "اشْتَرَى"),
        ],
      },
      {
        k: "last",
        tab: "games",
        t: "ى أَمْ ا؟",
        ic: "🔚",
        en: "Hear the word and choose its last letter: ى or ا (booklet p. 14)",
        uk: "Почуй слово і вибери останню літеру: ى чи ا (зошит, с. 14)",
        rule: "alif",
        items: [
          last("عَلَ___", "عَلَى", "ى"),
          last("مُسْتَشْفَ___", "مُسْتَشْفَى", "ى"),
          last("أَنَ___", "أَنَا", "ا"),
          last("اشْتَرَ___", "اشْتَرَى", "ى"),
          last("هُنَ___", "هُنَا", "ا"),
          last("كُبْرَ___", "كُبْرَى", "ى"),
          last("رَأَ___", "رَأَى", "ى"),
          last("عَصَ___", "عَصَا", "ا"),
          last("أَحْلَ___", "أَحْلَى", "ى"),
        ],
      },
    ],
    gloss: {
      ...Object.fromEntries(
        Object.values(W).map(([w, , en, uk]) => [w, [en, uk]]),
      ),
      هَمْزَةُ: ["hamza (the glottal stop)", "хамза"],
      الْهَمْزَةُ: ["the hamza", "хамза"],
      الْقَطْعِ: [
        "al-qat' (the hamza that is always said)",
        "аль-кат' (хамза, яку завжди вимовляють)",
      ],
      وَالْوَصْلِ: ["and al-wasl", "і аль-васль"],
      وَهَمْزَةُ: ["and hamza", "і хамза"],
      الْوَصْلِ: ["al-wasl (a plain alif)", "аль-васль (просто аліф)"],
      قَطْعٍ: ["qat' (always said)", "кат' (завжди вимовляють)"],
      وَصْلٍ: ["wasl (a plain alif)", "васль (просто аліф)"],
      قَطْعٌ: ["qat'", "кат'"],
      وَصْلٌ: ["wasl", "васль"],
      أَمْ: ["or", "чи"],
      الْأَلِفُ: ["the alif", "аліф"],
      اللَّيِّنَةُ: ["the soft (alif)", "м'який (аліф)"],
      اقْرَأِ: ["read", "прочитай"],
      الْكَلِمَةَ: ["the word", "слово"],
      فِي: ["in", "у"],
      // the halves of a word with a gap
      ...Object.fromEntries(
        [
          "زْرَق",
          "سْم",
          "كَلَ",
          "بْن",
          "حْمَر",
          "سْتَمِعْ",
          "نَا",
          "شْتَرَى",
          "عَلَ",
          "مُسْتَشْفَ",
          "أَنَ",
          "اشْتَرَ",
          "هُنَ",
          "كُبْرَ",
          "رَأَ",
          "عَصَ",
          "أَحْلَ",
        ].map((x) => [x, ["(a piece of the word)", "(частина слова)"]]),
      ),
    },
  };
})();
