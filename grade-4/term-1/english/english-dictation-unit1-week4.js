// Dictation Unit 1 Week 4 · English, Grade 4. Source: Dictation sheet, Unit 1 Week 4 (26 Oct). Engine: shared/spelling.js.
window.SPELLING = {
  title: "Unit 1 · Week 4",
  heading: "Dictation:",
  subtitle: "Grade 4 English · Dictation",
  lang: "en-US", // voice language
  pattern: "Long i: i · i_e · ie · igh · y",
  langs: { uk: "Українська", ar: "العربية" },
  items: [
    {
      w: "climb",
      pic: "climb",
      mark: [2, 1],
      tr: { uk: "лазити, підніматися", ar: "يتسلّق" },
    },
    { w: "pies", pic: "pies", tr: { uk: "пироги", ar: "فطائر" } },
    {
      w: "die",
      pic: "die",
      tr: { uk: "загинути, зів'янути", ar: "يموت" },
    },
    { w: "fright", pic: "fright", tr: { uk: "переляк", ar: "فزع" } },
    {
      w: "slight",
      pic: "slight",
      tr: { uk: "легкий, невеликий", ar: "خفيف" },
    },
    {
      w: "drive",
      pic: "drive",
      tr: { uk: "керувати (авто)", ar: "يقود" },
    },
    {
      w: "shy",
      pic: "shy",
      mark: [2, 1],
      tr: { uk: "сором'язливий", ar: "خجول" },
    },
    {
      w: "minding",
      pic: "minding",
      mark: [1, 1],
      tr: { uk: "займатися (своїм)", ar: "منشغل بـ" },
    },
    { w: "pride", pic: "pride", tr: { uk: "гордість", ar: "فخر" } },
    {
      w: "sly",
      pic: "sly",
      mark: [2, 1],
      tr: { uk: "хитрий", ar: "ماكر" },
    },
    {
      w: "She started to climb the rock wall.",
      type: "sentence",
      key: "climb",
      pic: "rockwall",
      tr: {
        uk: "Вона почала підніматися на скелю.",
        ar: "بدأت تتسلّق الجدار الصخري.",
      },
    },
    {
      w: "She baked two blueberry pies.",
      type: "sentence",
      key: "pies",
      pic: "blueberrypies",
      tr: {
        uk: "Вона спекла два чорничні пироги.",
        ar: "خبزت فطيرتين بالتوت الأزرق.",
      },
    },
    {
      w: "Water the rose, or it will die.",
      type: "sentence",
      key: "die",
      pic: "rose",
      tr: {
        uk: "Полий троянду, бо вона зів'яне.",
        ar: "اسقِ الوردة وإلّا ستموت.",
      },
    },
    {
      w: "The movie gave us a fright.",
      type: "sentence",
      key: "fright",
      pic: "movie",
      tr: { uk: "Фільм нас налякав.", ar: "أفزعنا الفيلم." },
    },
    {
      w: "The baby had a slight fever.",
      type: "sentence",
      key: "slight",
      pic: "fever",
      tr: {
        uk: "У малюка була невелика температура.",
        ar: "كانت لدى الطفل حمّى خفيفة.",
      },
    },
    {
      w: "Do you know how to drive a car?",
      type: "sentence",
      key: "drive",
      pic: "car",
      tr: {
        uk: "Ти вмієш керувати автомобілем?",
        ar: "هل تعرف كيف تقود سيارة؟",
      },
    },
    {
      w: "The shy toddler hid in the room.",
      type: "sentence",
      key: "shy",
      pic: "hide",
      tr: {
        uk: "Сором'язливий малюк сховався в кімнаті.",
        ar: "اختبأ الطفل الخجول في الغرفة.",
      },
    },
    {
      w: "I was minding my own business.",
      type: "sentence",
      key: "minding",
      pic: "business",
      tr: {
        uk: "Я займався своїми справами.",
        ar: "كنت منشغلًا بشؤوني الخاصة.",
      },
    },
    {
      w: "He carried the flag with pride.",
      type: "sentence",
      key: "pride",
      pic: "flag",
      tr: { uk: "Він ніс прапор з гордістю.", ar: "حمل العلم بفخر." },
    },
    {
      w: "The three sly pigs tricked the wolf.",
      type: "sentence",
      key: "sly",
      pic: "pigs",
      tr: {
        uk: "Троє хитрих поросят перехитрили вовка.",
        ar: "خدعت الخنازير الثلاثة الماكرة الذئب.",
      },
    },
  ],
  pics: ({ em, SKY, G }) => ({
    climb: () =>
      SKY +
      G(150) +
      `<path class="f-rock" d="M150,150 L170,20 L250,10 L270,150Z"/>${em(205, 80, 70, "🧗")}`,
    pies: () => SKY + G(150, "wood") + `${em(160, 96, 100, "🥧")}`,
    die: () => SKY + G(150) + `${em(160, 92, 100, "🥀")}`,
    fright: () => SKY + G(150) + `${em(160, 92, 100, "😱")}`,
    slight: () =>
      SKY + G(150) + `${em(130, 96, 90, "🤏")}${em(230, 104, 30, "🫘")}`,
    drive: () => SKY + G(150) + `${em(160, 92, 100, "🚗")}`,
    shy: () => SKY + G(150) + `${em(160, 92, 100, "🫣")}`,
    minding: () =>
      SKY +
      G(150, "wood") +
      `${em(120, 96, 86, "🧑")}${em(220, 104, 60, "📖")}`,
    pride: () =>
      SKY + G(150) + `${em(130, 96, 90, "😌")}${em(230, 90, 60, "🏅")}`,
    sly: () => SKY + G(150, "grass") + `${em(160, 92, 100, "🦊")}`,
    rockwall: () =>
      SKY +
      G(150) +
      `<rect class="f-rock" x="110" y="10" width="140" height="140" rx="6"/>${[...Array(10)].map((_, i) => `<circle class="f-hl" cx="${125 + ((i * 47) % 110)}" cy="${25 + ((i * 29) % 115)}" r="5"/>`).join("")}${em(180, 90, 64, "🧗‍♀️")}`,
    blueberrypies: () =>
      SKY +
      G(150, "wood") +
      `${em(100, 110, 72, "🥧")}${em(200, 110, 72, "🥧")}${em(150, 50, 40, "🫐")}${em(270, 60, 30, "👩‍🍳")}`,
    rose: () =>
      SKY +
      G(150) +
      `${em(110, 96, 80, "🌹")}${em(70, 40, 28, "💧")}${em(100, 30, 22, "💧")}<path class="st-ink" d="M160,96 L196,96" stroke-width="3" marker-end="url(#ah-ke)"/>${em(240, 96, 80, "🥀")}`,
    movie: () =>
      SKY +
      G(150) +
      `<rect class="f-ink" x="40" y="20" width="240" height="90" rx="6"/>${em(160, 64, 50, "👻")}${em(100, 140, 40, "😱")}${em(160, 140, 40, "😨")}${em(220, 140, 40, "🍿")}`,
    fever: () =>
      SKY +
      G(150) +
      `${em(130, 100, 86, "👶")}${em(220, 80, 54, "🌡️")}${em(250, 130, 26, "🤒")}`,
    car: () =>
      SKY +
      `<rect class="f-road" y="120" width="320" height="60"/>${[20, 100, 180, 260].map((x) => `<rect class="f-card" x="${x}" y="148" width="40" height="5"/>`).join("")}${em(160, 110, 90, "🚗")}${em(270, 50, 34, "❓")}`,
    hide: () =>
      SKY +
      G(150, "wood") +
      `${em(230, 90, 110, "🚪")}${em(170, 116, 52, "🧒")}${em(160, 60, 28, "🫣")}`,
    business: () =>
      SKY +
      G(150, "wood") +
      `${em(110, 96, 80, "🧑")}${em(200, 104, 54, "📰")}${em(262, 110, 40, "☕")}`,
    flag: () =>
      SKY +
      G(150, "grass") +
      `${em(140, 100, 86, "🚶")}${em(200, 60, 70, "🚩")}${em(270, 40, 26, "✨")}`,
    pigs: () =>
      SKY +
      G(150, "grass") +
      `${em(60, 110, 52, "🐷")}${em(115, 110, 52, "🐷")}${em(170, 110, 52, "🐷")}${em(260, 96, 78, "🐺")}${em(250, 36, 26, "💨")}`,
  }),
};
