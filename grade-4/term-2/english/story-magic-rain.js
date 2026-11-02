// The Magic of Rain (a lyric poem). Homework Booklet Term 2, pages 14–15, Unit 2 Week 5, poetry. Engine: shared/story.js.
// One page per stanza (poem: true keeps the lines). No answer key: the answers are unverified (UNVERIFIED.md).
window.STORY = {
  key: "en4-magic-rain",
  title: "The Magic of Rain",
  kind: "Poetry · Homework booklet",
  cover: "img/magic-rain/raindrops.jpg",
  hub: "../../term-1/english/index.html",
  question: "How are writers inspired by nature?",
  gloss: {
    raindrops: "drops of rain",
    windowpane: "the glass of a window",
    soothing: "making you feel calm",
    rhythm: "a beat that comes again and again",
    gentle: "soft and kind",
    refrain: "a part of a song that is sung again and again",
    silver: "a shiny grey colour",
    sparkling: "shining with little flashes of light",
    hue: "a colour",
    hum: "to sing with your mouth closed",
    secret: "hidden; nobody knows it",
    breeze: "a soft, light wind",
    note: "one sound in music",
    chord: "some music notes played together",
    melody: "a tune; the music of a song",
    ignored: "not listened to",
    glee: "great joy",
    harmony: "music notes that sound nice together",
    lyric:
      "a lyric poem tells the poet’s own feelings, often with rhyme, like a song",
    serenity: "calm and peace",
    haiku:
      "a short poem from Japan: 3 lines, with 5, 7 and 5 syllables, about nature",
    metaphor: "says one thing is another thing: each drop is a note",
    syllables: "the beats in a word: rain-drops = 2 syllables",
    stanza: "a group of lines in a poem, like a paragraph",
    rhymes: "words that end with the same sound: along, song",
  },
  pages: [
    {
      poem: true,
      img: "img/magic-rain/raindrops.jpg",
      text: [
        "Raindrops dance on my windowpane,",
        "A soothing rhythm, a gentle refrain.",
        "The world outside is fresh and new,",
        "Washed in silver, a sparkling hue.",
      ],
      easy: "The rain falls on my window. It sounds calm, like a song. Outside, everything looks new, clean and shiny.",
    },
    {
      poem: true,
      vis: {
        kind: "scene",
        bg: "rain",
        items: [
          { e: "😌", x: 40, y: 56, s: 30 },
          { e: "🎵", x: 68, y: 34, s: 16, a: "float" },
          { e: "🎶", x: 80, y: 50, s: 14, a: "float:0.6" },
        ],
        cap: "each drop is a note",
      },
      text: [
        "I close my eyes and hum along,",
        "To nature’s soft and secret song.",
        "Each drop is a note, each breeze is a chord,",
        "A melody that can’t be ignored.",
      ],
      easy: "I close my eyes and sing softly with the rain. The rain and the wind make music.",
    },
    {
      poem: true,
      vis: {
        kind: "scene",
        bg: "rain",
        items: [
          { e: "🌷", x: 30, y: 70, s: 24, a: "grow" },
          { e: "🌻", x: 52, y: 70, s: 24, a: "grow:0.4" },
          { e: "🌼", x: 74, y: 70, s: 22, a: "grow:0.8" },
        ],
        cap: "the flowers lift their heads",
      },
      text: [
        "The flowers lift their heads in glee,",
        "As rain taps out its harmony.",
        "The earth is singing, bright and free,",
        "A lyric of pure serenity.",
      ],
      easy: "The flowers are happy in the rain. The whole earth seems to sing. Everything is calm and peaceful.",
    },
  ],
  summary: [
    {
      t: "What the poem is about",
      img: "img/magic-rain/raindrops.jpg",
      text: "The poet listens to the rain. The rain sounds like music, and it makes the world fresh, happy and calm.",
    },
    {
      t: "A lyric poem",
      vis: {
        kind: "scene",
        bg: "rain",
        items: [
          { e: "😌", x: 40, y: 56, s: 30 },
          { e: "🎵", x: 70, y: 36, s: 16, a: "float" },
        ],
      },
      text: "The poet shares feelings (“I close my eyes and hum along”), and the poem has rhyme and rhythm, like a song.",
    },
    {
      t: "Metaphors",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "💧", x: 30, y: 50, s: 26 },
          { t: "=", c: "plain", x: 50, y: 50, s: 12 },
          { e: "🎵", x: 70, y: 50, s: 26, a: "pulse" },
        ],
      },
      text: "“Each drop is a note, each breeze is a chord.” The rain and the wind are music.",
    },
    {
      t: "Rhyme",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { t: "along · song", c: "good", x: 50, y: 34, s: 12 },
          { t: "chord · ignored", c: "plain", x: 50, y: 66, s: 12 },
        ],
      },
      text: "The lines rhyme in pairs: windowpane, refrain; new, hue; along, song; chord, ignored; glee, harmony; free, serenity.",
    },
  ],
  questions: [
    {
      tag: "Details",
      img: "img/magic-rain/raindrops.jpg",
      q: "What dances on the windowpane?",
      o: ["raindrops", "leaves", "flowers"],
      x: "“Raindrops dance on my windowpane.”",
    },
    {
      tag: "Details",
      vis: {
        kind: "scene",
        bg: "rain",
        items: [
          { e: "🌷", x: 34, y: 70, s: 24, a: "grow" },
          { e: "🌻", x: 64, y: 70, s: 24, a: "grow:0.4" },
        ],
      },
      q: "What do the flowers do in the rain?",
      o: [
        "They lift their heads in glee.",
        "They fall down.",
        "They hide from the rain.",
      ],
    },
    {
      tag: "Feelings",
      vis: {
        kind: "scene",
        bg: "rain",
        items: [{ e: "😌", x: 50, y: 54, s: 34 }],
      },
      q: "How does the poet feel about the rain?",
      o: ["happy and calm", "angry", "scared"],
      x: "The rain is “soothing” and “a melody”; it brings “serenity”.",
    },
    {
      tag: "Question 1",
      img: "img/magic-rain/raindrops.jpg",
      q: "What is the type of this poem?",
      o: ["It is a lyric poem.", "It is a haiku poem."],
      x: "It has many lines, rhyme and the poet’s feelings. A haiku has only 3 lines.",
    },
    {
      tag: "Question 2",
      type: "open",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "💧", x: 30, y: 50, s: 26 },
          { t: "=", c: "plain", x: 50, y: 50, s: 12 },
          { e: "🎵", x: 70, y: 50, s: 26, a: "pulse" },
        ],
      },
      q: "Find and write one metaphor from the poem.",
      a: "“Each drop is a note.” (Also: “each breeze is a chord”.)",
    },
    {
      tag: "Question 3",
      type: "open",
      img: "img/magic-rain/raindrops.jpg",
      q: "Write the number of syllables in the first line.",
      a: "8 syllables: Rain-drops (2) dance (1) on (1) my (1) win-dow-pane (3).",
    },
    {
      tag: "Question 4",
      type: "open",
      vis: {
        kind: "scene",
        bg: "rain",
        items: [
          { e: "😌", x: 40, y: 56, s: 30 },
          { e: "🎵", x: 70, y: 34, s: 16, a: "float" },
        ],
      },
      q: "Write the end rhymes in the second stanza.",
      a: "along – song, chord – ignored.",
    },
  ],
};
