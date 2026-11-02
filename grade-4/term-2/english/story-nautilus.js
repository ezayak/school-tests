// The Nautilus (Wonders Genre Passages, Grade 4 Unit 2 Week 5, lyric poem). Classwork Booklet Term 2, page 12. Engine: shared/story.js.
// One page per stanza (poem: true keeps the lines). No answer key: the open answers are unverified (UNVERIFIED.md).
window.STORY = {
  key: "en4-nautilus",
  title: "The Nautilus",
  kind: "Poetry · Classwork booklet",
  cover: "img/nautilus/nautilus.jpg",
  hub: "../../term-1/english/index.html",
  question: "How are writers inspired by animals?",
  gloss: {
    strangest: "the most unusual",
    creature: "an animal",
    "eight-legged": "with eight legs",
    octopus: "a sea animal with eight legs",
    oddest: "the most strange",
    baffling: "very hard to understand",
    nautilus: "a sea animal that lives in a spiral shell",
    peeks: "looks out quickly",
    spiral: "going round and round, like a snail’s shell",
    sailing: "moving on the water",
    backward: "going back, not forward",
    steer: "to make it go the right way",
    puzzling: "hard to understand",
    lyric: "a lyric poem tells the poet’s own feelings, often with rhyme, like a song",
    rhyme: "words that end with the same sound: sea, me",
    scheme: "a rhyme scheme = which lines rhyme with which",
    speaker: "the person who talks in the poem",
  },
  pages: [
    {
      poem: true,
      img: "img/nautilus/nautilus.jpg",
      text: [
        "The strangest creature in the sea?",
        "Some say the eight-legged octopus.",
        "The oddest always seemed to me",
        "To be the baffling nautilus.",
      ],
      easy: "What is the strangest sea animal? Some people say the octopus. The poet thinks it is the nautilus.",
    },
    {
      poem: true,
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🌊", x: 24, y: 80, s: 22 },
          { e: "🌊", x: 76, y: 80, s: 22 },
          { e: "🐚", x: 66, y: 50, s: 28, dx: -40, a: "move" },
          { e: "👀", x: 66, y: 28, s: 12, dx: -40, a: "move" },
        ],
        cap: "a backward trip",
      },
      text: [
        "He peeks out from his spiral shell",
        "While sailing on a backward trip.",
        "He doesn’t seem to know too well",
        "How best to steer his puzzling ship.",
      ],
      easy: "The nautilus looks out of his round shell. He swims backward. He does not seem to know how to go the right way.",
    },
  ],
  summary: [
    {
      t: "What the poem is about",
      img: "img/nautilus/nautilus.jpg",
      text: "The poet thinks the nautilus is the strangest animal in the sea. It lives in a spiral shell and swims backward.",
    },
    {
      t: "A lyric poem",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "🧒", x: 30, y: 60, s: 30 },
          { e: "💭", x: 62, y: 30, s: 24, a: "pop" },
          { e: "🐚", x: 62, y: 30, s: 12, a: "pop:0.4" },
        ],
      },
      text: "The speaker shares thoughts and feelings: “The oddest always seemed to me”. The poem has rhyme and rhythm, like a song.",
    },
    {
      t: "Rhyme scheme: ABAB",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { t: "sea · me", c: "good", x: 50, y: 34, s: 12 },
          { t: "octopus · nautilus", c: "plain", x: 50, y: 66, s: 12 },
        ],
      },
      text: "Every other line rhymes: sea, me; octopus, nautilus; shell, well; trip, ship.",
    },
    {
      t: "How the speaker feels",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🤔", x: 34, y: 50, s: 28, a: "nod" },
          { e: "🐚", x: 68, y: 56, s: 26 },
        ],
      },
      text: "The words strangest, oddest, baffling and puzzling show that the nautilus surprises and puzzles the speaker.",
    },
  ],
  questions: [
    {
      tag: "Topic",
      img: "img/nautilus/nautilus.jpg",
      q: "Who is the poem about?",
      o: [
        "a nautilus, a sea animal with a spiral shell",
        "an octopus with eight legs",
        "a ship on the sea",
      ],
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [{ e: "🐚", x: 66, y: 54, s: 28, dx: -40, a: "move" }],
      },
      q: "How does the nautilus move?",
      o: ["backward", "very fast forward", "it does not move"],
      x: "“While sailing on a backward trip.”",
    },
    {
      tag: "Rhyme",
      img: "img/nautilus/nautilus.jpg",
      q: "Which word rhymes with “sea”?",
      o: ["me", "octopus", "nautilus"],
    },
    {
      tag: "Rhyme",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🌊", x: 50, y: 80, s: 26 },
          { e: "⛵", x: 50, y: 50, s: 26, a: "swing" },
        ],
      },
      q: "Which word rhymes with “trip”?",
      o: ["ship", "shell", "well"],
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "🧒", x: 30, y: 60, s: 30 },
          { e: "💭", x: 62, y: 30, s: 24 },
        ],
      },
      q: "What makes this poem a lyric poem?",
      a: "The speaker shares thoughts and feelings about the nautilus (“The oddest always seemed to me”), and the poem has rhyme and rhythm, like a song.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { t: "A · B · A · B", c: "good", x: 50, y: 48, s: 16, a: "pop" },
        ],
      },
      q: "What rhyme scheme is used in this poem?",
      a: "ABAB: every other line rhymes. Sea rhymes with me, octopus with nautilus, shell with well, and trip with ship.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🤔", x: 34, y: 50, s: 28, a: "nod" },
          { e: "🐚", x: 68, y: 56, s: 26 },
        ],
      },
      q: "What words show you how the speaker feels about the nautilus?",
      a: "“Strangest”, “oddest”, “baffling” and “puzzling”. They show that the speaker thinks the nautilus is very strange and wonders about it.",
    },
  ],
};
