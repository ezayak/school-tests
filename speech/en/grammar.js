// Grammar in English: the Ukrainian boards «Хто що робить?» (../uk/grammar.js) in English. who: 6 pronouns (English «you» is one
// word for one or many); verbs: stem + end[k] («play» + «s» = he plays; an empty ending leaves the verb as it is).
window.SPEECH_GRAMMAR = {
  lang: "en-US",
  who: [
    { w: "I", ic: "🙋‍♂️" },
    { w: "you", ic: "🫵" },
    { w: "he", ic: "👦" },
    { w: "she", ic: "👧" },
    { w: "we", ic: "🙋‍♂️👧" },
    { w: "they", ic: "👦👧" },
  ],
  example: 4,
  verbs: [
    { t: "sleep", ic: "😴", stem: "sleep", end: ["", "", "s", "s", "", ""] },
    { t: "drink", ic: "🥤", stem: "drink", end: ["", "", "s", "s", "", ""] },
    { t: "sing", ic: "🎤", stem: "sing", end: ["", "", "s", "s", "", ""] },
    { t: "read", ic: "📖", stem: "read", end: ["", "", "s", "s", "", ""] },
    { t: "play", ic: "🧸", stem: "play", end: ["", "", "s", "s", "", ""] },
    { t: "swim", ic: "🏊", stem: "swim", end: ["", "", "s", "s", "", ""] },
    { t: "write", ic: "✍️", stem: "write", end: ["", "", "s", "s", "", ""] },
    { t: "eat", ic: "🍎", stem: "eat", end: ["", "", "s", "s", "", ""] },
    { t: "jump", ic: "🤸", stem: "jump", end: ["", "", "s", "s", "", ""] },
  ],
};
