// Dictation Unit 2 Week 5 · English, Grade 4. Source: 20261111-Dictation-Unit2-Week5.pdf (dictation on 16 Nov). Engine: shared/spelling.js.
window.SPELLING = {
  title: "Unit 2 · Week 5",
  heading: "Dictation:",
  subtitle: "Grade 4 English · Dictation",
  lang: "en-US", // voice language
  pattern: "Suffixes: -ness · -ly · -est · -ful · -less · -fully",
  langs: { uk: "Українська", ar: "العربية" },
  items: [
    {
      w: "hardly",
      pic: "hardly",
      mark: [4, 2],
      tr: { uk: "ледве, майже не", ar: "بالكاد" },
    },
    {
      w: "wonderful",
      pic: "wonderful",
      mark: [6, 3],
      tr: { uk: "чудовий", ar: "رائع" },
    },
    {
      w: "darkness",
      pic: "darkness",
      mark: [4, 4],
      tr: { uk: "темрява", ar: "ظلام" },
    },
    {
      w: "shapeless",
      pic: "shapeless",
      mark: [5, 4],
      tr: { uk: "безформний", ar: "بلا شكل" },
    },
    {
      w: "clearest",
      pic: "clearest",
      mark: [5, 3],
      tr: { uk: "найясніший", ar: "الأصفى" },
    },
    {
      w: "spoonful",
      pic: "spoonful",
      mark: [5, 3],
      tr: { uk: "повна ложка", ar: "ملء ملعقة" },
    },
    {
      w: "carefully",
      pic: "carefully",
      mark: [4, 5],
      tr: { uk: "обережно", ar: "بحذر" },
    },
    {
      w: "painless",
      pic: "painless",
      mark: [4, 4],
      tr: { uk: "безболісний", ar: "بلا ألم" },
    },
    {
      w: "illness",
      pic: "illness",
      mark: [3, 4],
      tr: { uk: "хвороба", ar: "مرض" },
    },
    {
      w: "slowly",
      pic: "slowly",
      mark: [4, 2],
      tr: { uk: "повільно", ar: "ببطء" },
    },
    {
      w: "There were hardly any pears left.",
      type: "sentence",
      key: "hardly",
      pic: "pears",
      tr: {
        uk: "Груш майже не лишилося.",
        ar: "لم يبقَ من الإجاص شيء تقريبًا.",
      },
    },
    {
      w: "The parade is a wonderful event.",
      type: "sentence",
      key: "wonderful",
      pic: "parade",
      tr: { uk: "Парад — чудова подія.", ar: "الاستعراض حدث رائع." },
    },
    {
      w: "The darkness hid him from view.",
      type: "sentence",
      key: "darkness",
      pic: "night",
      tr: {
        uk: "Темрява сховала його від очей.",
        ar: "أخفاه الظلام عن الأنظار.",
      },
    },
    {
      w: "The empty bag looked shapeless.",
      type: "sentence",
      key: "shapeless",
      pic: "bag",
      tr: {
        uk: "Порожня торба здавалася безформною.",
        ar: "بدت الحقيبة الفارغة بلا شكل.",
      },
    },
    {
      w: "The sky was clearest at dusk.",
      type: "sentence",
      key: "clearest",
      pic: "dusk",
      tr: {
        uk: "Небо було найяснішим у сутінках.",
        ar: "كانت السماء أصفى ما تكون عند الغسق.",
      },
    },
    {
      w: "A spoonful of honey is sweet.",
      type: "sentence",
      key: "spoonful",
      pic: "honey",
      tr: { uk: "Ложка меду солодка.", ar: "ملعقة من العسل حلوة." },
    },
    {
      w: "He wrapped his foot carefully.",
      type: "sentence",
      key: "carefully",
      pic: "foot",
      tr: { uk: "Він обережно забинтував ногу.", ar: "لفّ قدمه بحذر." },
    },
    {
      w: "The haircut was painless.",
      type: "sentence",
      key: "painless",
      pic: "haircut",
      tr: {
        uk: "Стрижка була безболісною.",
        ar: "كانت قصّة الشعر بلا ألم.",
      },
    },
    {
      w: "An illness can last a long time.",
      type: "sentence",
      key: "illness",
      pic: "sickbed",
      tr: {
        uk: "Хвороба може тривати довго.",
        ar: "قد يدوم المرض وقتًا طويلًا.",
      },
    },
    {
      w: "Walk slowly on the ice.",
      type: "sentence",
      key: "slowly",
      pic: "ice",
      tr: { uk: "Іди повільно по льоду.", ar: "امشِ ببطء على الجليد." },
    },
  ],
  hub: "../../term-1/english/index.html",
  pics: ({ em, SKY, G }) => ({
    hardly: () =>
      SKY +
      G(150, "wood") +
      `${em(110, 96, 86, "🧺")}${em(230, 104, 40, "🍐")}`,
    wonderful: () =>
      SKY +
      G(150, "grass") +
      `${em(160, 92, 100, "🤩")}${em(60, 40, 30, "✨")}${em(265, 40, 30, "✨")}`,
    darkness: () =>
      `<rect class="f-deep" width="320" height="180"/>${em(250, 40, 40, "🌙")}${em(70, 40, 16, "⭐")}${em(140, 26, 12, "⭐")}`,
    shapeless: () => SKY + G(150) + `${em(160, 92, 100, "☁️")}`,
    clearest: () =>
      SKY +
      G(150, "grass") +
      `${em(160, 70, 90, "☀️")}${em(250, 125, 36, "🔭")}`,
    spoonful: () => SKY + G(150, "wood") + `${em(160, 92, 100, "🥄")}`,
    carefully: () =>
      SKY +
      G(150, "wood") +
      `${em(110, 96, 80, "🧒")}${em(220, 100, 64, "🥚")}`,
    painless: () =>
      SKY + G(150) + `${em(120, 96, 80, "😊")}${em(230, 96, 64, "🩹")}`,
    illness: () => SKY + G(150, "wood") + `${em(160, 92, 100, "🤒")}`,
    slowly: () => SKY + G(150, "grass") + `${em(160, 100, 100, "🐢")}`,
    pears: () =>
      SKY +
      G(150, "wood") +
      `${em(150, 104, 100, "🧺")}${em(150, 56, 40, "🍐")}${em(265, 50, 38, "🤷")}`,
    parade: () =>
      SKY +
      G(150, "road") +
      `${em(70, 110, 56, "🥁")}${em(160, 104, 64, "🎺")}${em(250, 110, 56, "🎉")}${em(160, 34, 34, "🎈")}`,
    night: () =>
      `<rect class="f-deep" width="320" height="180"/>${em(260, 36, 36, "🌙")}${em(150, 110, 70, "🌳")}<g opacity="0.35">${em(210, 120, 56, "🚶")}</g>`,
    bag: () =>
      SKY +
      G(150, "wood") +
      `<g transform="translate(160 108) scale(1.4 0.55)">${em(0, 0, 90, "🛍️")}</g>${em(260, 50, 34, "❓")}`,
    dusk: () =>
      `<rect class="f-heat" width="320" height="180" opacity="0.55"/>${G(150, "grass")}${em(160, 140, 80, "🌅")}${em(70, 40, 18, "⭐")}${em(250, 30, 14, "⭐")}`,
    honey: () =>
      SKY +
      G(150, "wood") +
      `${em(110, 96, 86, "🍯")}${em(220, 104, 64, "🥄")}${em(280, 50, 32, "😋")}`,
    foot: () =>
      SKY +
      G(150, "wood") +
      `${em(120, 100, 86, "🦶")}${em(230, 96, 60, "🩹")}${em(250, 40, 30, "🤲")}`,
    haircut: () =>
      SKY + G(150, "wood") + `${em(140, 96, 90, "💇‍♂️")}${em(250, 96, 60, "😊")}`,
    sickbed: () =>
      SKY +
      G(150, "wood") +
      `${em(120, 100, 90, "🛌")}${em(230, 90, 64, "📅")}${em(200, 40, 30, "🤒")}`,
    ice: () =>
      SKY +
      G(140, "snow") +
      `<ellipse class="f-water" cx="170" cy="160" rx="120" ry="14" opacity="0.6"/>${em(160, 96, 90, "🚶")}${em(270, 130, 34, "🧊")}${em(60, 40, 30, "🐢")}`,
  }),
};
