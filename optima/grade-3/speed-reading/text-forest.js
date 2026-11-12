// «Мандрівка до лісу» (speed-reading.txt, Days 23–24): read the same text three times, then find the mistakes.
// readings: the three readings of Day 23 (no race: each time is kept, no record).
// mist: Day 24, the word that is wrong and the word of the text; no bad = the sentence is right
// (the txt gives only the first answer; the others are taken from the text).
window.TEXT = {
  key: "forest",
  title: "Мандрівка до лісу",
  ic: "🐿️",
  paras: [
    [
      "У суботу Максим разом із батьками вирушив до лісу.",
      "Погода була сонячна.",
      "Дорогою вони побачили білку, яка стрибала між деревами.",
      "Максим зупинився, щоб краще її роздивитися.",
      "Потім сім’я знайшла галявину та влаштувала невеликий пікнік.",
    ],
  ],
  readings: [
    "Перше читання: повільно, разом із дорослим.",
    "Друге читання: сам.",
    "Третє читання: фразами, не зупиняючись після кожного слова.",
  ],
  mist: [
    { s: "Білка стрибала між будинками.", bad: "будинками", fix: "деревами" },
    { s: "Максим пішов до лісу в неділю.", bad: "неділю", fix: "суботу" },
    { s: "Сім’я влаштувала пікнік." },
    { s: "Погода була дощова.", bad: "дощова", fix: "сонячна" },
  ],
};
