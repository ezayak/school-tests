// The Beauty of Nature (a haiku). Homework Booklet Term 2, page 13, Unit 2 Week 5, poetry. Engine: shared/story.js.
// The booklet's questions 1–2 are multiple choice; no answer key: the answers are unverified (UNVERIFIED.md).
window.STORY = {
  key: "en4-beauty-nature",
  title: "The Beauty of Nature",
  kind: "Poetry · Haiku · Homework booklet",
  cover: "img/beauty-nature/leaves.jpg",
  hub: "../../term-1/english/index.html",
  question: "How are writers inspired by nature?",
  gloss: {
    golden: "the colour of gold, yellow and shiny",
    crisp: "cool, dry and fresh",
    whispers: "speaks very softly",
    autumn: "the season when the leaves fall; also called fall",
    haiku:
      "a short poem from Japan: 3 lines, with 5, 7 and 5 syllables, about nature",
    lyric:
      "a lyric poem tells the poet’s own feelings, often with rhyme, like a song",
    consistent: "always the same",
    meter: "the beat of a poem: how many syllables in each line",
    syllables: "the beats in a word: gol-den = 2 syllables",
    season: "spring, summer, autumn or winter",
  },
  pages: [
    {
      poem: true,
      img: "img/beauty-nature/leaves.jpg",
      text: [
        "Golden leaves falling,",
        "Crisp air whispers through the trees,",
        "Autumn’s song begins.",
      ],
      easy: "Yellow leaves fall from the trees. A cool wind blows softly. Autumn is here.",
    },
  ],
  summary: [
    {
      t: "What the poem is about",
      img: "img/beauty-nature/leaves.jpg",
      text: "Golden leaves fall and a cool wind blows: autumn begins.",
    },
    {
      t: "A haiku: 5 · 7 · 5",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { t: "5", c: "good", x: 26, y: 46, s: 16, a: "pop" },
          { t: "7", c: "good", x: 50, y: 46, s: 16, a: "pop:0.4" },
          { t: "5", c: "good", x: 74, y: 46, s: 16, a: "pop:0.8" },
        ],
      },
      text: "A haiku has 3 lines with 5, 7 and 5 syllables, and it is about nature. Gol-den leaves fall-ing = 5.",
    },
    {
      t: "The season",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🌳", x: 40, y: 50, s: 40 },
          { e: "🍂", x: 64, y: 20, s: 12, dy: 60, a: "fall" },
          { e: "🍁", x: 76, y: 20, s: 12, dy: 60, a: "fall:0.8" },
        ],
      },
      text: "Autumn: the leaves fall and the air is cool and crisp.",
    },
  ],
  questions: [
    {
      tag: "Details",
      img: "img/beauty-nature/leaves.jpg",
      q: "What colour are the leaves in the poem?",
      o: ["golden", "green", "red"],
      x: "“Golden leaves falling.”",
    },
    {
      tag: "Question 1",
      img: "img/beauty-nature/leaves.jpg",
      q: "What is the type of this poem? Why?",
      o: [
        "It is a haiku poem. It has 3 lines with a consistent meter and talks about nature.",
        "It is a lyric poem because it has 3 lines only without a consistent meter.",
        "It is a lyric poem because it talks about nature.",
      ],
      x: "A haiku has 3 lines with 5, 7 and 5 syllables, and it is about nature.",
    },
    {
      tag: "Question 2",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { t: "Gol-den", c: "plain", x: 26, y: 46, s: 12 },
          { t: "leaves", c: "plain", x: 52, y: 46, s: 12 },
          { t: "fall-ing", c: "plain", x: 76, y: 46, s: 12 },
        ],
      },
      q: "How many syllables are in the first line?",
      o: ["5", "3", "7"],
      x: "Gol-den (2) + leaves (1) + fall-ing (2) = 5 syllables.",
    },
    {
      tag: "Question 3",
      type: "open",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🌳", x: 40, y: 50, s: 40 },
          { e: "🍂", x: 64, y: 20, s: 12, dy: 60, a: "fall" },
        ],
      },
      q: "What season is the Haiku describing?",
      a: "Autumn. The poem says “Autumn’s song begins”, and the golden leaves are falling.",
    },
    {
      tag: "Haiku 5 · 7 · 5",
      vis: {
        kind: "scene",
        bg: "grass",
        items: [
          { e: "🌳", x: 40, y: 50, s: 40 },
          { e: "💨", x: 72, y: 40, s: 18, a: "puff" },
        ],
      },
      q: "How many syllables are in the second line: “Crisp air whispers through the trees”?",
      o: ["7", "5", "3"],
      x: "Crisp (1) air (1) whis-pers (2) through (1) the (1) trees (1) = 7 syllables.",
    },
    {
      tag: "Haiku 5 · 7 · 5",
      img: "img/beauty-nature/leaves.jpg",
      q: "How many syllables are in the third line: “Autumn’s song begins”?",
      o: ["5", "7", "3"],
      x: "Au-tumn’s (2) song (1) be-gins (2) = 5 syllables.",
    },
  ],
};
