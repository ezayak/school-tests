// Long O Spelling · English, Grade 3. Grade 3 spelling list: long o (oa · o_e · ow · old). Engine: shared/spelling.js.
window.SPELLING = {
  title: "Long O Words",
  subtitle: "Grade 3 English · Spelling",
  lang: "en-US", // voice language
  pattern: "Long o: oa · o_e · ow · old",
  langs: { uk: "Українська", ar: "العربية" },
  items: [
    { w: "coast", pic: "coast", tr: { uk: "узбережжя", ar: "ساحل" } },
    { w: "toad", pic: "toad", tr: { uk: "ропуха", ar: "علجوم" } },
    { w: "soak", pic: "soak", tr: { uk: "замочувати", ar: "يَنقَع" } },
    { w: "scold", pic: "scold", tr: { uk: "сварити", ar: "يُوَبِّخ" } },
    { w: "slope", pic: "slope", tr: { uk: "схил", ar: "منحدر" } },
    { w: "broke", pic: "broke", tr: { uk: "зламав", ar: "انكسر" } },
    { w: "note", pic: "note", tr: { uk: "записка", ar: "ملاحظة" } },
    { w: "bone", pic: "bone", tr: { uk: "кістка", ar: "عظمة" } },
    { w: "slow", pic: "slow", tr: { uk: "повільний", ar: "بطيء" } },
    { w: "show", pic: "show", tr: { uk: "вистава", ar: "عرض" } },
    {
      w: "He was a friend, not a foe.",
      type: "sentence",
      pic: "friend",
      tr: {
        uk: "Він був другом, а не ворогом.",
        ar: "كان صديقًا، لا عدوًّا.",
      },
    },
    {
      w: "Ice can float on water.",
      type: "sentence",
      pic: "ice",
      tr: {
        uk: "Лід може плавати на воді.",
        ar: "يمكن للثلج أن يطفو على الماء.",
      },
    },
    {
      w: "The pet store sold fish.",
      type: "sentence",
      pic: "petstore",
      tr: {
        uk: "Зоомагазин продавав рибу.",
        ar: "باع متجر الحيوانات الأليفة السمك.",
      },
    },
    {
      w: "The metal was a gold color.",
      type: "sentence",
      pic: "gold",
      tr: {
        uk: "Метал був золотого кольору.",
        ar: "كان المعدن ذهبيّ اللون.",
      },
    },
    {
      w: "Some people burn coal for heat.",
      type: "sentence",
      pic: "coal",
      tr: {
        uk: "Деякі люди спалюють вугілля, щоб зігрітися.",
        ar: "بعض الناس يحرقون الفحم للتدفئة.",
      },
    },
  ],
  pics: ({ em, tx, wv, SKY, G, bubble }) => ({
    coast: () =>
      SKY +
      `<rect class="f-water" y="92" width="320" height="88"/><path class="f-sand" d="M150,180 C170,130 210,100 320,96 L320,180Z"/><path class="f-grass" d="M210,104 C250,86 290,84 320,84 L320,100 C280,100 240,104 210,112Z"/>${[
        [188, 150, 14],
        [214, 136, 10],
        [170, 166, 12],
      ]
        .map(
          ([x, y, r]) =>
            `<circle class="f-rock" cx="${x}" cy="${y}" r="${r}"/>`,
        )
        .join(
          "",
        )}${wv(10, 120, 120, 4, 26, "card", 3)}${wv(30, 150, 110, 4, 26, "card", 3)}${em(270, 40, 34, "☀️")}`,
    toad: () =>
      SKY +
      G(140, "grass") +
      `<ellipse class="f-water" cx="160" cy="150" rx="110" ry="16"/>${em(160, 100, 96, "🐸")}`,
    soak: () =>
      SKY +
      G(150, "wood") +
      `<path class="f-green" d="M70,96 L250,96 L230,150 L90,150Z"/><ellipse class="f-water" cx="160" cy="98" rx="90" ry="12"/>${em(160, 78, 58, "👕", 'transform="rotate(-8 160 78)"')}${em(110, 40, 30, "💧")}${em(214, 50, 24, "💧")}${wv(110, 106, 100, 3, 20, "card", 2)}`,
    scold: () =>
      SKY +
      G(150) +
      `${em(100, 96, 96, "👩")}${em(176, 78, 40, "☝️", 'transform="rotate(30 176 78)"')}${em(250, 116, 62, "😢")}${bubble(100, 24, "No!", 80)}`,
    slope: () =>
      SKY +
      `<polygon class="f-grass" points="0,160 320,60 320,180 0,180"/><line class="st-ink" x1="0" y1="160" x2="320" y2="60" stroke-width="3"/>${[
        [70, 128],
        [150, 103],
        [230, 78],
      ]
        .map(([x, y]) => em(x, y - 20, 44, "🌳"))
        .join("")}`,
    broke: () =>
      SKY +
      G(150) +
      `${em(112, 96, 70, "✏️", 'transform="rotate(-30 112 96)"')}${em(212, 96, 70, "✏️", 'transform="rotate(30 212 96) scale(-1 1) translate(-424 0)"')}<path class="st-ink" d="M156,70 L166,86 L154,96 L166,110" stroke-width="3" fill="none"/>${tx(160, 34, "snap!", "lbl-ke")}`,
    note: () => SKY + G(150, "wood") + `${em(160, 92, 100, "📝")}`,
    bone: () =>
      SKY + G(150) + `${em(140, 96, 96, "🦴")}${em(256, 116, 50, "🐕")}`,
    slow: () =>
      SKY +
      G(140, "grass") +
      `<path class="st-ink" d="M20,138 L170,138" stroke-width="3" stroke-dasharray="3 8" opacity=".5"/>${em(206, 112, 72, "🐌")}${em(70, 60, 30, "⏳")}`,
    show: () =>
      `<rect class="f-deep" width="320" height="180"/><rect class="f-wood" x="40" y="100" width="240" height="14"/><path class="f-heat" d="M40,10 L120,10 Q90,60 64,100 L40,100Z"/><path class="f-heat" d="M280,10 L200,10 Q230,60 256,100 L280,100Z"/><rect class="f-heat" x="40" y="6" width="240" height="14"/>${em(140, 80, 40, "🧒")}${em(184, 80, 40, "👧")}${em(150, 22, 18, "⭐")}${[60, 100, 140, 180, 220, 260].map((x) => `<circle class="f-ink" cx="${x}" cy="152" r="16" opacity=".85"/>`).join("")}${tx(160, 40, "", "lbl")}`,
    friend: () =>
      SKY +
      G(150) +
      `${em(110, 96, 96, "🧑")}${em(214, 108, 80, "🐕")}${em(162, 40, 34, "❤️")}`,
    ice: () =>
      SKY +
      `<rect class="f-water" y="100" width="320" height="80"/>${em(160, 96, 80, "🧊")}${wv(20, 122, 90, 3, 22, "card", 2)}${wv(210, 130, 90, 3, 22, "card", 2)}`,
    petstore: () =>
      SKY +
      G(150) +
      `<rect class="f-heat" x="40" y="20" width="240" height="26" rx="4"/>${tx(160, 33, "PET STORE", "lbl-light")}<rect class="f-card" x="50" y="46" width="220" height="104"/><rect class="f-water" x="66" y="66" width="188" height="70" rx="6" opacity=".8"/>${em(110, 96, 32, "🐠")}${em(170, 110, 28, "🐟")}${em(220, 90, 28, "🐡")}`,
    gold: () =>
      SKY +
      G(150, "wood") +
      `${em(130, 96, 92, "🪙")}${em(214, 80, 40, "🔩")}${em(246, 50, 26, "✨")}${em(90, 46, 22, "✨")}`,
    coal: () =>
      SKY +
      G(150) +
      `<rect class="f-ink" x="110" y="96" width="100" height="54" rx="6"/>${[
        [134, 96],
        [160, 92],
        [186, 96],
      ]
        .map(
          ([x, y]) =>
            `<polygon class="f-rock" points="${x - 12},${y} ${x - 4},${y - 12} ${x + 10},${y - 8} ${x + 12},${y + 2}"/>`,
        )
        .join(
          "",
        )}${em(160, 64, 50, "🔥")}${em(66, 110, 56, "🧑")}${em(256, 110, 56, "👩")}`,
  }),
};
