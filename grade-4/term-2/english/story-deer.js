// Deer (Wonders Genre Passages, Grade 4 Unit 2 Week 5, poetry). Classwork Booklet Term 2, pages 10–11. Engine: shared/story.js.
// One page per stanza (poem: true keeps the lines). The book breaks two long lines for the picture: here they are one line each.
// No answer key: the open answers are unverified (UNVERIFIED.md).
window.STORY = {
  key: "en4-deer",
  title: "Deer",
  kind: "Poetry · Classwork booklet",
  cover: "img/deer/deer.jpg",
  lesson: { path: "unit2-week5.html", label: "Unit 2 · Week 5" },
  hub: "../../term-1/english/index.html",
  question: "How are writers inspired by animals?",
  gloss: {
    headlights: "the big lights at the front of a car",
    yard: "the land around a house",
    photo: "a picture made with a camera",
    dart: "to move away very fast",
    arrows: "thin sticks with a point, shot from a bow",
    disappear: "to go away so you cannot see them",
    spears: "long sticks with a sharp point, used to hunt long ago",
    secret: "hidden; nobody knows it",
    pride: "a point of pride = something you are proud of",
    calm: "quiet and not worried",
    ponds: "small lakes",
    quite: "really, completely",
    simile: "compares two things with like or as: as quick as spears",
    metaphor: "says one thing is another thing: their tails are arrows",
    stanza: "a group of lines in a poem, like a paragraph",
    stanzas: "groups of lines in a poem, like paragraphs",
    rhyme: "words that end with the same sound: high, sky",
    rhythm: "the beat of a poem when you read it aloud",
    speaker: "the person who talks in the poem",
  },
  pages: [
    {
      poem: true,
      img: "img/deer/deer.jpg",
      text: [
        "The headlights turn their dark eyes green.",
        "We see them sitting under trees",
        "at night, in my yard, like a photo of a family.",
      ],
      easy: "At night, the car lights shine on the deer. They sit together under the trees, like a family in a photo.",
    },
    {
      poem: true,
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🦌", x: 30, y: 66, s: 24, dx: 50, a: "out" },
          { e: "🦌", x: 46, y: 70, s: 22, dx: 50, a: "out:0.3" },
          { e: "🦌", x: 60, y: 66, s: 24, dx: 40, a: "out:0.6" },
          { t: "Bye!", c: "light", x: 24, y: 28, s: 12, a: "pop:1.2" },
        ],
        cap: "six white arrows = their white tails",
      },
      text: [
        "Then they dart away, their tails held high,",
        "six white arrows point at the sky.",
        "We don’t even get to say goodbye.",
      ],
      easy: "The deer run away fast. Their white tails point up, like arrows. They go before we can say goodbye.",
    },
    {
      poem: true,
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🦌", x: 40, y: 64, s: 26, a: "fade" },
          { e: "🌲", x: 74, y: 56, s: 34 },
          { e: "🌙", x: 18, y: 20, s: 16 },
        ],
        cap: "as quick as spears",
      },
      text: [
        "Into the night they disappear,",
        "and though they move as quick as spears",
        "a little later they’ll be back here.",
      ],
      easy: "The deer go into the dark and we cannot see them. They are very fast, but they will come back soon.",
    },
    {
      poem: true,
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🏠", x: 28, y: 56, s: 34 },
          { e: "🌲", x: 76, y: 54, s: 32 },
          { e: "🦌", x: 66, y: 70, s: 20, a: "show:1" },
        ],
        cap: "lights off: the deer come out",
      },
      text: [
        "Our lights go off, we’re warm inside,",
        "they come out then, from where they hide.",
        "Their secret place is a point of pride.",
      ],
      easy: "We turn off the lights and stay warm in the house. Then the deer come out of their secret place.",
    },
    {
      poem: true,
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🦌", x: 34, y: 66, s: 26, a: "nod" },
          { e: "🦌", x: 60, y: 68, s: 22, dx: 30, a: "out:1.5" },
          { e: "☀️", x: 82, y: 22, s: 18, a: "grow" },
        ],
        cap: "calm as ponds",
      },
      text: [
        "Calm as ponds, they never fight,",
        "they stand and leave when the sky gets bright.",
        "But the question never sat quite right—",
      ],
      easy: "The deer are calm and quiet. They leave when the morning comes. But the poet has a question.",
    },
    {
      poem: true,
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🌅", x: 50, y: 60, s: 36 },
          { e: "❓", x: 76, y: 26, s: 18, a: "pulse" },
          { t: "Where?", c: "plain", x: 28, y: 26, s: 13, a: "pop" },
        ],
        cap: "the speaker wonders",
      },
      text: ["where do they go when it gets light?"],
      easy: "Where do the deer go in the daytime? The poet does not know.",
    },
  ],
  summary: [
    {
      t: "What the poem is about",
      img: "img/deer/deer.jpg",
      text: "At night, a family sees deer in their yard. The deer run away and come back. In the morning, they leave again.",
    },
    {
      t: "Similes",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "🦌", x: 30, y: 56, s: 30 },
          { t: "as quick as spears", c: "plain", x: 66, y: 34, s: 12 },
          { t: "calm as ponds", c: "plain", x: 66, y: 70, s: 12 },
        ],
      },
      text: "A simile compares with like or as: “like a photo of a family”, “as quick as spears”, “calm as ponds”.",
    },
    {
      t: "Metaphor",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🦌", x: 36, y: 64, s: 30 },
          { e: "🏹", x: 70, y: 36, s: 22, a: "nod" },
        ],
      },
      text: "A metaphor says one thing is another: the white tails are “six white arrows” pointing at the sky.",
    },
    {
      t: "Rhyme",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { t: "high", c: "good", x: 24, y: 40, s: 12 },
          { t: "sky", c: "good", x: 50, y: 40, s: 12 },
          { t: "goodbye", c: "good", x: 76, y: 40, s: 12 },
          { e: "🎵", x: 50, y: 74, s: 16, a: "float" },
        ],
      },
      text: "The ends of the lines rhyme: high, sky, goodbye; disappear, spears, here. The rhyme gives the poem a beat.",
    },
    {
      t: "The question",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [{ e: "❓", x: 50, y: 48, s: 36, a: "pulse" }],
      },
      text: "The poem ends with a question: where do the deer go in the daytime?",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/deer/deer.jpg",
      q: "What is “Deer”?",
      o: ["a poem", "a fairy tale", "an argumentative text"],
      x: "It has short lines, stanzas and rhyme.",
    },
    {
      tag: "Setting",
      img: "img/deer/deer.jpg",
      q: "Where is the speaker when the poem begins?",
      o: [
        "in a car, at night",
        "at school, in the morning",
        "on a boat, in the sea",
      ],
      x: "The headlights shine on the deer, so the speaker is in a car at night.",
    },
    {
      tag: "Metaphor",
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🦌", x: 36, y: 64, s: 30 },
          { e: "🏹", x: 70, y: 34, s: 20 },
        ],
      },
      q: "What are the “six white arrows”?",
      o: [
        "the white tails of the deer",
        "real arrows",
        "the lights of the car",
      ],
      x: "This is a metaphor: the tails are not arrows, but they point up like arrows.",
    },
    {
      tag: "Simile",
      vis: {
        kind: "scene",
        bg: "night",
        items: [{ e: "🦌", x: 30, y: 64, s: 28, dx: 50, a: "out" }],
      },
      q: "“They move as quick as spears.” What is this?",
      o: ["a simile", "a metaphor", "a rhyme"],
      x: "It compares with [as]: a simile uses like or as.",
    },
    {
      tag: "Simile",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🦌", x: 34, y: 64, s: 28, a: "nod" },
          { e: "💧", x: 70, y: 70, s: 18 },
        ],
      },
      q: "“Calm as ponds.” What does it tell us about the deer?",
      o: ["They are quiet and peaceful.", "They are wet.", "They are angry."],
      x: "The water of a pond is still and quiet, like the deer.",
    },
    {
      tag: "Rhyme",
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🦌", x: 40, y: 64, s: 26, a: "fade" },
          { e: "🎵", x: 72, y: 30, s: 16, a: "float" },
        ],
      },
      q: "Which words rhyme in stanza three?",
      o: [
        "disappear, spears, here",
        "night, quick, little",
        "into, they, back",
      ],
    },
    {
      tag: "Text evidence",
      type: "open",
      img: "img/deer/deer.jpg",
      q: "How does the author use simile and metaphor to help the deer come alive?",
      a: "The similes “like a photo of a family”, “as quick as spears” and “calm as ponds” show how the deer look and move. The metaphor “six white arrows” makes us see their white tails pointing up. So we can picture the deer, as if they were alive in front of us.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🦌", x: 30, y: 66, s: 24, dx: 50, a: "out" },
          { e: "🎵", x: 70, y: 30, s: 16, a: "float" },
        ],
      },
      q: "In stanzas two and three, how does the rhyme affect the rhythm of the poem?",
      a: "Every line ends with a rhyme (high, sky, goodbye; disappear, spears, here). The rhymes give the poem a quick, steady beat, so it moves fast, like the deer running away.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🌅", x: 50, y: 60, s: 36 },
          { e: "❓", x: 76, y: 26, s: 18, a: "pulse" },
        ],
      },
      q: "How does the last line of the poem show you what the speaker wonders about the deer?",
      a: "The last line is a question: “where do they go when it gets light?” It shows that the speaker wonders where the deer hide in the daytime.",
    },
    // the easier (E) question sheet, teacher's file of 7 Nov (E2); unverified
    {
      tag: "Simile",
      img: "img/deer/deer.jpg",
      q: "In the first stanza, how does the author use simile to help the reader picture the deer? The author compares the deer to …",
      o: ["a photo of a family", "six white arrows", "the headlights"],
      x: "“like a photo of a family”",
    },
    {
      tag: "Rhyme",
      vis: {
        kind: "scene",
        bg: "night",
        items: [
          { e: "🦌", x: 34, y: 64, s: 28 },
          { e: "⬆️", x: 66, y: 34, s: 20 },
        ],
      },
      q: "Which words rhyme in the second stanza of the poem?",
      o: [
        "high, sky and goodbye",
        "away, tails and arrows",
        "night, yard and family",
      ],
      x: "Then they dart away, their tails held high, six white arrows point at the sky. We don’t even get to say goodbye.",
    },
    {
      tag: "Speaker",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🌅", x: 40, y: 60, s: 32 },
          { e: "❓", x: 70, y: 28, s: 18, a: "pulse" },
        ],
      },
      q: "In the last two lines, what does the speaker think about the deer?",
      o: [
        "The deer are a mystery: the speaker wonders where they go in the daytime.",
        "The deer are dangerous.",
        "The deer are boring.",
      ],
      x: "“But the question never sat quite right — where do they go when it gets light?”",
    },
  ],
};
