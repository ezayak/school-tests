// Dictation Unit 1 Week 3 · English, Grade 4. Source: Dictation sheet, Unit 1 Week 3 (28 Sep). Engine: shared/spelling.js.
window.SPELLING = {
  title: "Unit 1 · Week 3",
  heading: "Dictation:",
  subtitle: "Grade 4 English · Dictation",
  lang: "en-US", // voice language
  pattern: "Long e: e · ee · e_e · ie · ey · ea · y · ei",
  langs: { uk: "Українська", ar: "العربية" },
  items: [
    {
      w: "zebra",
      pic: "zebra",
      mark: [1, 1],
      tr: { uk: "зебра", ar: "حمار وحشي" },
    },
    { w: "deed", pic: "deed", tr: { uk: "вчинок", ar: "فِعل" } },
    { w: "concrete", pic: "concrete", tr: { uk: "бетон", ar: "خرسانة" } },
    {
      w: "belief",
      pic: "belief",
      tr: { uk: "віра, переконання", ar: "اعتقاد" },
    },
    { w: "honey", pic: "honey", tr: { uk: "мед", ar: "عسل" } },
    { w: "breathe", pic: "breathe", tr: { uk: "дихати", ar: "يتنفّس" } },
    {
      w: "family",
      pic: "family",
      mark: [5, 1],
      tr: { uk: "сім'я", ar: "عائلة" },
    },
    {
      w: "receive",
      pic: "receive",
      tr: { uk: "отримувати", ar: "يستلم" },
    },
    {
      w: "The zebra had a lot of stripes.",
      type: "sentence",
      key: "zebra",
      pic: "zebra2",
      tr: {
        uk: "У зебри було багато смужок.",
        ar: "كان للحمار الوحشي خطوط كثيرة.",
      },
    },
    {
      w: "Are you sorry for that deed?",
      type: "sentence",
      key: "deed",
      pic: "deed",
      tr: {
        uk: "Ти шкодуєш про той вчинок?",
        ar: "هل أنت آسف على ذلك الفعل؟",
      },
    },
    {
      w: "The sidewalk is made of concrete.",
      type: "sentence",
      key: "concrete",
      pic: "sidewalk",
      tr: {
        uk: "Тротуар зроблений з бетону.",
        ar: "الرصيف مصنوع من الخرسانة.",
      },
    },
    {
      w: "Kevin thinks it is beyond belief.",
      type: "sentence",
      key: "belief",
      pic: "wow",
      tr: {
        uk: "Кевін думає, що в це неможливо повірити.",
        ar: "يعتقد كيفن أن هذا لا يُصدَّق.",
      },
    },
    {
      w: "Do you want honey in your tea?",
      type: "sentence",
      key: "honey",
      pic: "honeytea",
      tr: { uk: "Хочеш мед у чай?", ar: "هل تريد عسلًا في شايك؟" },
    },
    {
      w: "People can't breathe under water.",
      type: "sentence",
      key: "breathe",
      pic: "underwater",
      tr: {
        uk: "Люди не можуть дихати під водою.",
        ar: "لا يستطيع الناس التنفّس تحت الماء.",
      },
    },
    {
      w: "Let's go home to your family.",
      type: "sentence",
      key: "family",
      pic: "home",
      tr: {
        uk: "Ходімо додому, до твоєї сім'ї.",
        ar: "لنذهب إلى البيت، إلى عائلتك.",
      },
    },
    {
      w: "I was happy to receive a letter from my friend.",
      type: "sentence",
      key: "receive",
      pic: "letter",
      tr: {
        uk: "Я був радий отримати листа від друга.",
        ar: "كنت سعيدًا باستلام رسالة من صديقي.",
      },
    },
  ],
  pics: ({ em, SKY, G }) => ({
    zebra: () => SKY + G(150, "grass") + `${em(160, 92, 104, "🦓")}`,
    zebra2: () =>
      SKY +
      G(140, "wheat") +
      `${em(110, 96, 90, "🦓")}${em(230, 104, 70, "🦓")}${em(270, 36, 32, "☀️")}`,
    deed: () =>
      SKY +
      G(150, "wood") +
      `${em(220, 96, 80, "😳")}<path class="f-cool" d="M60,150 L76,118 L92,132 L104,108 L120,150Z"/><path class="f-cool" d="M126,150 L138,124 L150,140 L160,150Z"/>${em(96, 80, 30, "💥")}`,
    concrete: () =>
      SKY +
      G(150) +
      `<rect class="f-metal" x="50" y="40" width="220" height="110" rx="4"/>${[...Array(26)].map((_, i) => `<circle class="f-ink" cx="${62 + ((i * 37) % 200)}" cy="${52 + ((i * 23) % 90)}" r="${1.5 + (i % 3)}" opacity=".25"/>`).join("")}<path class="st-ink" d="M140,40 L150,70 L138,96 L152,130" stroke-width="2" opacity=".5"/>${em(286, 130, 34, "🏗️")}`,
    belief: () =>
      SKY +
      G(150) +
      `${em(120, 104, 80, "🧒")}<ellipse class="f-card" cx="230" cy="54" rx="60" ry="36"/><ellipse class="st-ink" cx="230" cy="54" rx="60" ry="36" stroke-width="2"/><circle class="f-card" cx="172" cy="96" r="8"/><circle class="st-ink" cx="172" cy="96" r="8" stroke-width="2"/>${em(214, 54, 34, "⭐")}${em(250, 54, 30, "💖")}`,
    honey: () =>
      SKY +
      G(150, "wood") +
      `${em(140, 96, 96, "🍯")}${em(240, 56, 40, "🐝")}${em(270, 96, 30, "🐝")}`,
    breathe: () =>
      SKY +
      G(150) +
      `${em(110, 96, 90, "🧒")}${em(210, 80, 50, "🌬️")}<path class="st-cool" d="M150,90 C180,80 200,100 230,92" stroke-width="3"/>${em(270, 110, 40, "🫁")}`,
    family: () =>
      SKY +
      G(150) +
      `${em(70, 98, 64, "👨")}${em(130, 98, 64, "👩")}${em(190, 112, 46, "👦")}${em(240, 112, 46, "👧")}${em(160, 34, 28, "❤️")}`,
    receive: () =>
      SKY +
      G(150) +
      `${em(110, 96, 90, "📬")}${em(220, 74, 54, "✉️")}<path class="st-ke" d="M200,96 C180,116 160,116 146,104" stroke-width="3" marker-end="url(#ah-ke)"/>`,
    sidewalk: () =>
      SKY +
      `<rect class="f-grass" y="90" width="320" height="30"/><rect class="f-metal" y="120" width="320" height="60"/>${[40, 110, 180, 250].map((x) => `<line class="st-ink" x1="${x}" y1="120" x2="${x - 14}" y2="180" stroke-width="2" opacity=".35"/>`).join("")}${em(150, 100, 56, "🚶")}${em(270, 70, 46, "🏠")}${em(50, 70, 40, "🌳")}`,
    wow: () =>
      SKY +
      G(150) +
      `${em(110, 98, 92, "😲")}${em(220, 72, 56, "🤯")}${em(270, 130, 30, "✨")}${em(50, 40, 26, "✨")}`,
    honeytea: () =>
      SKY +
      G(150, "wood") +
      `${em(110, 100, 80, "🍵")}${em(214, 96, 80, "🍯")}${em(258, 46, 30, "🐝")}`,
    underwater: () =>
      `<rect class="f-water" width="320" height="180"/>${[...Array(7)].map((_, i) => `<circle class="st-card" cx="${170 + (i % 3) * 10}" cy="${70 - i * 9}" r="${3 + (i % 3)}" stroke-width="2"/>`).join("")}${em(150, 106, 80, "🤿")}${em(60, 140, 34, "🐠")}${em(270, 60, 34, "🐟")}${em(260, 150, 30, "🪸")}`,
    home: () =>
      SKY +
      G(150) +
      `${em(230, 92, 96, "🏡")}${em(70, 112, 46, "🧒")}${em(118, 112, 46, "👧")}<path class="st-ke" d="M140,120 C160,120 170,110 178,104" stroke-width="3" marker-end="url(#ah-ke)"/>`,
    letter: () =>
      SKY +
      G(150) +
      `${em(110, 100, 86, "😄")}${em(220, 90, 72, "💌")}${em(270, 40, 26, "✨")}`,
  }),
};
