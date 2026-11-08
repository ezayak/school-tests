// Граматика: who does what, from the parent's boards «Хто що робить?» (claude.ai canvas «Українська абетка», page Мовлення).
// who: the pronouns (w) with a picture (ic, at most 2 emoji), in the order of the verb endings; their colours sp-k0…sp-k6 in speech.css.
// verbs: t = the verb, ic = its picture, stem + end[k] = its form for who[k] («гра» + «є» = він грає). example: the verb of the
// pronoun cards («Він грає»).
window.SPEECH_GRAMMAR = {
  lang: "uk-UA",
  who: [
    { w: "я", ic: "🙋‍♂️" },
    { w: "ти", ic: "🫵" },
    { w: "він", ic: "👦" },
    { w: "вона", ic: "👧" },
    { w: "ми", ic: "🙋‍♂️👧" },
    { w: "ви", ic: "🫵👥" },
    { w: "вони", ic: "👦👧" },
  ],
  example: 4,
  verbs: [
    {
      t: "спати",
      ic: "😴",
      stem: "сп",
      end: ["лю", "иш", "ить", "ить", "имо", "ите", "лять"],
    },
    {
      t: "пити",
      ic: "🥤",
      stem: "п’",
      end: ["ю", "єш", "є", "є", "ємо", "єте", "ють"],
    },
    {
      t: "співати",
      ic: "🎤",
      stem: "співа",
      end: ["ю", "єш", "є", "є", "ємо", "єте", "ють"],
    },
    {
      t: "читати",
      ic: "📖",
      stem: "чита",
      end: ["ю", "єш", "є", "є", "ємо", "єте", "ють"],
    },
    {
      t: "грати",
      ic: "🧸",
      stem: "гра",
      end: ["ю", "єш", "є", "є", "ємо", "єте", "ють"],
    },
    {
      t: "плавати",
      ic: "🏊",
      stem: "плава",
      end: ["ю", "єш", "є", "є", "ємо", "єте", "ють"],
    },
    {
      t: "писати",
      ic: "✍️",
      stem: "пиш",
      end: ["у", "еш", "е", "е", "емо", "ете", "уть"],
    },
    {
      t: "їсти",
      ic: "🍎",
      stem: "ї",
      end: ["м", "си", "сть", "сть", "мо", "сте", "дять"],
    },
    {
      t: "стрибати",
      ic: "🤸",
      stem: "стриба",
      end: ["ю", "єш", "є", "є", "ємо", "єте", "ють"],
    },
  ],
};
