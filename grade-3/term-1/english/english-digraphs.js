// Dictation Unit 2 Week 5 · English, Grade 3. Source: 20261112-dictationmemo-Unit2-Week5.pdf (dictation on 18 Nov). Engine: shared/spelling.js.
window.SPELLING = {
  title: "Unit 2 · Week 5",
  heading: "Dictation:",
  subtitle: "Grade 3 English · Dictation",
  lang: "en-US", // voice language
  pattern: "Consonant digraphs: ch · tch · th · wh · sh",
  langs: { uk: "Українська", ar: "العربية" },
  items: [
    {
      w: "pitch",
      pic: "pitch",
      mark: [2, 3],
      tr: { uk: "футбольне поле", ar: "ملعب" },
    },
    {
      w: "teacher",
      pic: "teacher",
      mark: [3, 2],
      tr: { uk: "учитель", ar: "معلّم" },
    },
    {
      w: "cheese",
      pic: "cheese",
      mark: [0, 2],
      tr: { uk: "сир", ar: "جبن" },
    },
    {
      w: "thick",
      pic: "thick",
      mark: [0, 2],
      tr: { uk: "товстий", ar: "سميك" },
    },
    {
      w: "truth",
      pic: "truth",
      mark: [3, 2],
      tr: { uk: "правда", ar: "الحقيقة" },
    },
    {
      w: "pathway",
      pic: "pathway",
      mark: [2, 2],
      tr: { uk: "стежка", ar: "ممرّ" },
    },
    {
      w: "them",
      pic: "them",
      mark: [0, 2],
      tr: { uk: "їх, їм", ar: "هم (لهم)" },
    },
    {
      w: "whales",
      pic: "whales",
      mark: [0, 2],
      tr: { uk: "кити", ar: "حيتان" },
    },
    {
      w: "much",
      pic: "much",
      mark: [2, 2],
      tr: { uk: "багато", ar: "كثير" },
    },
    {
      w: "lunch",
      pic: "lunch",
      mark: [3, 2],
      tr: { uk: "обід", ar: "غداء" },
    },
    {
      w: "stretch",
      pic: "stretch",
      mark: [4, 3],
      tr: { uk: "розтягуватися", ar: "يتمدّد" },
    },
    {
      w: "favorite",
      emoji: "😍",
      mark: [0, 0], // no digraph: nothing highlighted
      tr: { uk: "улюблений", ar: "مفضّل" },
    },
    {
      w: "hatch",
      pic: "hatch",
      mark: [2, 3],
      tr: { uk: "вилуплюватися", ar: "يفقس" },
    },
    {
      w: "fuzzy",
      emoji: "🧸",
      mark: [0, 0], // no digraph: nothing highlighted
      tr: { uk: "пухнастий", ar: "زغبي" },
    },
    {
      w: "chick",
      pic: "chick",
      mark: [0, 2],
      tr: { uk: "курча", ar: "كتكوت" },
    },
    {
      w: "The runner needed to stretch.",
      type: "sentence",
      pic: "stretch",
      key: "stretch",
      tr: {
        uk: "Бігунові треба було розтягнутися.",
        ar: "كان العدّاء بحاجة إلى أن يتمدّد.",
      },
    },
    {
      w: "What is your favorite color?",
      type: "sentence",
      pic: "color",
      key: "What",
      tr: {
        uk: "Який твій улюблений колір?",
        ar: "ما لونك المفضّل؟",
      },
    },
    {
      w: "Will the baby birds hatch today?",
      type: "sentence",
      pic: "hatch",
      key: "hatch",
      tr: {
        uk: "Чи вилупляться пташенята сьогодні?",
        ar: "هل ستفقس الطيور الصغيرة اليوم؟",
      },
    },
    {
      w: "The chick is soft and fuzzy.",
      type: "sentence",
      pic: "chick",
      key: "chick",
      tr: {
        uk: "Курчатко м’яке й пухнасте.",
        ar: "الكتكوت ناعم وزغبي.",
      },
    },
    {
      w: "The fish swam past the boat.",
      type: "sentence",
      pic: "fish",
      key: "fish",
      tr: {
        uk: "Риба пропливла повз човен.",
        ar: "سبحت السمكة بجانب القارب.",
      },
    },
  ],
  pics: ({ em, wv, SKY, G }) => ({
    pitch: () =>
      SKY +
      `<rect class="f-grass" y="70" width="320" height="110"/><rect class="st-snow" x="30" y="84" width="260" height="84" stroke-width="3" fill="none"/><line class="st-snow" x1="160" y1="84" x2="160" y2="168" stroke-width="3"/><circle class="st-snow" cx="160" cy="126" r="18" stroke-width="3" fill="none"/>${em(200, 140, 26, "⚽")}${em(270, 40, 40, "🥅")}${em(60, 40, 34, "☀️")}`,
    teacher: () =>
      SKY +
      G(150, "wood") +
      `<rect class="f-deep" x="150" y="30" width="150" height="80" rx="4"/>${em(225, 70, 50, "🔤")}${em(100, 96, 96, "🧑‍🏫")}`,
    cheese: () => SKY + G(150, "wood") + `${em(160, 92, 100, "🧀")}`,
    thick: () =>
      SKY +
      G(150, "wood") +
      `<rect class="f-heat" x="40" y="70" width="120" height="80" rx="6"/><rect class="st-ink" x="40" y="70" width="120" height="80" rx="6" stroke-width="2"/><rect class="f-cool" x="200" y="142" width="90" height="8" rx="2"/><rect class="st-ink" x="200" y="142" width="90" height="8" rx="2" stroke-width="1.5"/>${em(100, 40, 40, "👍")}<path class="st-ink" d="M20,74 L20,146" stroke-width="3" marker-start="url(#ah-ink)" marker-end="url(#ah-ink)"/>`,
    truth: () =>
      SKY +
      G(150) +
      `${em(130, 96, 92, "🧒")}${em(220, 60, 44, "💬")}${em(220, 58, 26, "✅")}`,
    pathway: () =>
      SKY +
      G(120, "grass") +
      `<path class="f-sand" d="M140,120 L180,120 L240,180 L80,180 Z"/>${em(60, 100, 50, "🌳")}${em(270, 100, 50, "🌳")}${em(160, 90, 44, "🏡")}`,
    them: () =>
      SKY +
      G(150) +
      `${em(60, 100, 56, "🧒")}${em(108, 90, 34, "👉")}${em(200, 102, 58, "👦")}${em(250, 102, 58, "👧")}`,
    whales: () =>
      `<rect class="f-water" width="320" height="180"/>${wv(0, 40, 320, 6, 40, "cool", 3)}${em(100, 110, 80, "🐋")}${em(230, 120, 60, "🐳")}`,
    much: () =>
      SKY +
      G(150, "wood") +
      `${[
        [70, 120],
        [110, 120],
        [150, 120],
        [190, 120],
        [230, 120],
        [90, 86],
        [130, 86],
        [170, 86],
        [210, 86],
        [110, 52],
        [150, 52],
        [190, 52],
      ]
        .map(([x, y]) => em(x, y, 40, "🍎"))
        .join("")}`,
    lunch: () =>
      SKY +
      G(150, "wood") +
      `<ellipse class="f-snow" cx="120" cy="120" rx="80" ry="22"/>${em(90, 100, 60, "🥪")}${em(150, 104, 50, "🍎")}${em(250, 70, 60, "🕛")}`,
    stretch: () =>
      SKY +
      G(150) +
      `${em(130, 96, 96, "🧘")}${em(240, 104, 56, "🏃")}${em(250, 40, 30, "👟")}`,
    color: () =>
      SKY +
      G(150) +
      `${em(70, 100, 64, "🧒")}${em(70, 44, 40, "❓")}${["f-heat", "f-cool", "f-hl", "f-grass"].map((c, i) => `<circle class="${c}" cx="${150 + i * 44}" cy="100" r="18"/>`).join("")}`,
    hatch: () =>
      SKY +
      G(150, "grass") +
      `<ellipse class="f-wood" cx="160" cy="128" rx="100" ry="22"/>${em(120, 110, 50, "🥚")}${em(200, 110, 50, "🐣")}${em(260, 50, 40, "🐦")}`,
    chick: () => SKY + G(150, "grass") + `${em(160, 96, 100, "🐥")}`,
    fish: () =>
      `<rect class="f-sky" width="320" height="70"/><rect class="f-water" y="70" width="320" height="110"/>${em(110, 56, 70, "⛵")}${em(200, 130, 60, "🐟")}<path class="st-ink" d="M250,130 L300,130" stroke-width="3" marker-end="url(#ah-ink)"/>`,
  }),
};
