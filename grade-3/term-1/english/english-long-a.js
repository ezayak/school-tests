// Long A Spelling · English, Grade 3. Grade 3 spelling list: long a (ai · ay · a_e · eigh · ey). Engine: shared/spelling.js.
window.SPELLING = {
  title: "Long A Words",
  subtitle: "Grade 3 English · Spelling",
  lang: "en-US", // voice language
  pattern: "Long a: ai · ay · a_e · eigh · ey",
  langs: { uk: "Українська", ar: "العربية" },
  items: [
    { w: "plain", pic: "plain", tr: { uk: "рівнина", ar: "سهل" } },
    { w: "fail", pic: "fail", tr: { uk: "провалити", ar: "يفشل" } },
    { w: "grain", pic: "grain", tr: { uk: "зерно", ar: "حبوب" } },
    { w: "paint", pic: "paint", tr: { uk: "фарба", ar: "دهان" } },
    { w: "tray", pic: "tray", tr: { uk: "піднос", ar: "صينية" } },
    { w: "gray", pic: "gray", tr: { uk: "сірий", ar: "رمادي" } },
    { w: "state", pic: "state", tr: { uk: "штат", ar: "ولاية" } },
    { w: "fake", pic: "fake", tr: { uk: "підробка", ar: "مزيَّف" } },
    { w: "weigh", pic: "weigh", tr: { uk: "зважувати", ar: "يَزِن" } },
    { w: "they", pic: "they", tr: { uk: "вони", ar: "هم" } },
    {
      w: "like",
      emoji: "👍",
      tr: { uk: "любити, подобатися", ar: "يُحبّ" },
    },
    {
      w: "braid",
      pic: "braid",
      tr: { uk: "коса; заплітати", ar: "ضفيرة" },
    },
    { w: "hair", emoji: "💇‍♀️", tr: { uk: "волосся", ar: "شَعر" } },
    { w: "snail", pic: "snail", tr: { uk: "равлик", ar: "حلزون" } },
    { w: "moves", emoji: "🚶", tr: { uk: "рухається", ar: "يتحرّك" } },
    { w: "very", emoji: "💯", tr: { uk: "дуже", ar: "جدًّا" } },
    { w: "slowly", emoji: "🐢", tr: { uk: "повільно", ar: "ببطء" } },
    { w: "trees", emoji: "🌳", tr: { uk: "дерева", ar: "أشجار" } },
    { w: "sway", pic: "sway", tr: { uk: "гойдатися", ar: "يتمايل" } },
    { w: "storm", pic: "storm", tr: { uk: "буря", ar: "عاصفة" } },
    { w: "same", emoji: "👯", tr: { uk: "однаковий", ar: "نفسه" } },
    {
      w: "racing",
      pic: "race",
      tr: { uk: "перегони, забіг", ar: "سباق" },
    },
    {
      w: "I like to braid my hair.",
      type: "sentence",
      pic: "braid",
      tr: {
        uk: "Я люблю заплітати волосся в косу.",
        ar: "أحبّ أن أضفر شعري.",
      },
    },
    {
      w: "A snail moves very slowly.",
      type: "sentence",
      pic: "snail",
      tr: {
        uk: "Равлик рухається дуже повільно.",
        ar: "الحلزون يتحرّك ببطء شديد.",
      },
    },
    {
      w: "The trees sway in the wind.",
      type: "sentence",
      pic: "sway",
      tr: {
        uk: "Дерева гойдаються на вітрі.",
        ar: "تتمايل الأشجار في الريح.",
      },
    },
    {
      w: "We had to stay in during the storm.",
      type: "sentence",
      pic: "storm",
      tr: {
        uk: "Нам довелося залишатися вдома під час бурі.",
        ar: "اضطررنا إلى البقاء في الداخل أثناء العاصفة.",
      },
    },
    {
      w: "We had the same racing time.",
      type: "sentence",
      pic: "race",
      tr: {
        uk: "У нас був однаковий час у забігу.",
        ar: "كان لدينا الوقت نفسه في السباق.",
      },
    },
  ],
  pics: ({ em, tx, wv, SKY, G }) => {
    const USP =
      "M28,52 L118,42 L196,46 L226,34 L246,52 L276,44 L298,58 L284,80 L276,104 L262,118 L262,150 L246,140 L222,128 L196,138 L170,160 L150,136 L120,130 L94,142 L70,122 L44,110 L30,84 Z";
    return {
      plain: () =>
        SKY +
        `<rect class="f-grass" y="100" width="320" height="80"/><line class="st-ink" x1="0" y1="100" x2="320" y2="100" stroke-width="2" opacity=".4"/>${[
          [40, 130],
          [120, 150],
          [210, 126],
          [280, 156],
        ]
          .map(([x, y]) => em(x, y, 18, "🌾"))
          .join("")}${em(70, 46, 36, "☀️")}${em(230, 52, 30, "☁️")}`,
      fail: () =>
        SKY +
        G(150, "wood") +
        `<rect class="f-card" x="90" y="24" width="140" height="124" rx="6"/><rect class="st-ink" x="90" y="24" width="140" height="124" rx="6" stroke-width="2"/>${[50, 66, 82, 98, 114].map((y) => `<line class="st-ink" x1="104" y1="${y}" x2="180" y2="${y}" stroke-width="2" opacity=".3"/>`).join("")}<path class="st-heat" d="M130,60 L190,120 M190,60 L130,120" stroke-width="10" stroke-linecap="round"/>${em(268, 110, 48, "😟")}`,
      grain: () =>
        SKY +
        G(150, "wood") +
        `${em(90, 84, 80, "🌾")}<path class="f-wood" d="M170,110 L290,110 Q284,150 230,152 Q176,150 170,110Z"/>${[...Array(18)].map((_, i) => `<ellipse class="f-sand2" cx="${186 + (i % 9) * 11}" cy="${104 - Math.floor(i / 9) * 6}" rx="5" ry="3.5"/>`).join("")}`,
      paint: () =>
        SKY +
        G(150, "wood") +
        `${em(120, 96, 92, "🎨")}${em(232, 90, 66, "🖌️")}<rect class="f-cool" x="250" y="120" width="40" height="30" rx="4"/>`,
      tray: () =>
        SKY +
        G(150, "wood") +
        `<rect class="f-metal" x="50" y="112" width="220" height="16" rx="8"/><rect class="f-metal" x="36" y="104" width="24" height="12" rx="4"/><rect class="f-metal" x="260" y="104" width="24" height="12" rx="4"/>${em(120, 88, 44, "☕")}${em(180, 92, 36, "🍪")}${em(222, 90, 36, "🍎")}`,
      gray: () =>
        SKY +
        G(150) +
        `${em(110, 94, 92, "🐘")}${em(236, 58, 52, "🌫️")}<circle cx="236" cy="128" r="18" fill="#8A8F98"/>`,
      state: () =>
        SKY +
        `<path class="f-sand" d="${USP}"/><path class="st-ink" d="${USP}" stroke-width="2.5"/><polygon class="f-heat" points="130,96 166,96 170,130 150,136 126,126"/><path class="st-ink" d="M130,96 L166,96 L170,130 L150,136 L126,126Z" stroke-width="2"/>${em(150, 114, 18, "⭐")}`,
      fake: () =>
        SKY + G(150) + `${em(120, 92, 90, "🥸")}${em(236, 96, 60, "🎭")}`,
      weigh: () => SKY + G(150, "wood") + `${em(160, 88, 100, "⚖️")}`,
      they: () =>
        SKY +
        G(150) +
        `${em(54, 100, 56, "🧒")}${em(90, 90, 36, "👉", 'transform="scale(-1 1) translate(-180 0)"')}${em(200, 102, 58, "👦")}${em(250, 102, 58, "👧")}${em(225, 40, 28, "💬")}`,
      braid: () =>
        SKY +
        G(150) +
        `${em(140, 90, 96, "👧")}${[0, 1, 2, 3, 4].map((i) => `<circle class="f-wood" cx="${190 + i * 3}" cy="${96 + i * 12}" r="8"/>`).join("")}<circle class="f-heat" cx="204" cy="156" r="5"/>`,
      snail: () =>
        SKY +
        G(140, "grass") +
        `<path class="st-ink" d="M20,138 L170,138" stroke-width="3" stroke-dasharray="3 8" opacity=".5"/>${em(206, 112, 72, "🐌")}${em(70, 60, 30, "⏳")}`,
      sway: () =>
        SKY +
        G(150, "grass") +
        `${em(110, 90, 84, "🌳", 'transform="rotate(14 110 140)"')}${em(220, 96, 72, "🌳", 'transform="rotate(12 220 140)"')}${wv(10, 40, 90, 5, 24, "cool", 3)}${wv(20, 64, 80, 5, 24, "cool", 3)}`,
      storm: () =>
        `<rect class="f-deep" width="320" height="180"/>${G(150)}<rect class="f-wood" x="110" y="80" width="110" height="70"/><polygon class="f-heat" points="100,82 165,40 230,82"/><rect class="f-hl" x="130" y="98" width="34" height="28"/>${em(147, 112, 20, "👨‍👩‍👧")}<rect class="f-wood" x="180" y="110" width="22" height="40"/>${em(60, 36, 46, "⛈️")}${em(270, 40, 40, "🌧️")}${[30, 60, 250, 280, 300].map((x) => `<line class="st-cool" x1="${x}" y1="80" x2="${x - 8}" y2="110" stroke-width="3"/>`).join("")}`,
      race: () =>
        SKY +
        G(150) +
        `<line class="st-ink" x1="60" y1="80" x2="60" y2="150" stroke-width="3"/>${em(72, 72, 30, "🏁")}${em(150, 104, 56, "🏃")}${em(240, 104, 56, "🏃‍♀️")}${em(140, 40, 28, "⏱️")}${tx(160, 40, "12 s", "lbl-big", "start")}${em(230, 40, 28, "⏱️")}${tx(250, 40, "12 s", "lbl-big", "start")}`,
    };
  },
};
