// Science · Grade 4 · Topic 4 · Lesson 4 « Weathering and Erosion » (book pages 184–193).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 4,
  key: "sci4-t4-l4",
  grade: 4,
  title: "Weathering and Erosion",
  unit: "Topic 4 · Lesson 4",
  book: "Book pages 184–193",
  cover: "arch",
  question: {
    q: "How do [water], [wind] and [ice] change the land?",
    a: "[Weathering] breaks rock into small pieces. [Erosion] carries the pieces away. [Deposition] drops them in a new place.",
    img: "arch",
  },
  // the book's vocabulary + academic vocabulary (page 184) + words of the lesson
  words: [
    { w: "Weathering", m: "rock is broken or worn into small pieces" },
    {
      w: "Chemical weathering",
      m: "chemicals in rain or plants change the rock",
    },
    {
      w: "Physical weathering",
      m: "wind, water, ice or roots crack the rock",
    },
    { w: "Erosion", m: "the broken pieces are carried away" },
    { w: "Deposition", m: "the pieces are dropped in a new place" },
    { w: "Glacier", m: "a huge sheet of slow-moving ice" },
    { w: "Delta", m: "new land where a river drops sand at the sea" },
    { w: "Evidence", m: "something you can see that answers a question" },
  ],

  ideas: [
    {
      t: "Sea walls",
      lines: [
        "A [sea wall] stops big waves from flooding a town.",
        "It keeps the sand and soil from washing away.",
        "But it can block [sea turtles] from the beach.",
      ],
      img: "sea-wall",
    },
    {
      t: "Weathering",
      lines: [
        "[Weathering]: rock is worn away or broken into pieces.",
        "Waves, rivers, rain and wind change rocks.",
        "There are 2 kinds: [chemical] and [physical].",
      ],
      img: "wind-rock",
    },
    {
      t: "Chemical weathering",
      lines: [
        "Rain mixes with [chemicals] in the air. They change the rock.",
        "Rotting plants make chemicals too.",
        "The rock gets [rough], with holes, or changes [color].",
      ],
      img: "statue",
    },
    {
      t: "Physical weathering",
      lines: [
        "[Wind] blows sand that cuts and shapes rock.",
        "Water [freezes] in cracks and breaks the rock.",
        "Plant [roots] grow in cracks and split the rock.",
      ],
      img: "roots",
    },
    {
      t: "Erosion",
      lines: [
        "[Erosion]: the broken pieces are carried [away].",
        "Water, wind, ice and gravity move them.",
        "Waves wear away [cliffs] and beaches.",
      ],
      img: "sea-stacks",
    },
    {
      t: "Glaciers",
      lines: [
        "A [glacier] is a huge sheet of ice.",
        "It moves [very slowly] and scrapes the rock.",
        "It carries rock pieces to new places.",
      ],
      img: "glacier",
    },
    {
      t: "Waves carve the shore",
      lines: [
        "Waves carry sand onto and off beaches.",
        "They can carve [sea caves] and [arches].",
      ],
      img: "arch",
    },
    {
      t: "Deposition",
      lines: [
        "[Deposition]: the pieces are dropped in a [new place].",
        "It happens when water or wind [slows down].",
        "A river drops sand at the sea and makes a [delta].",
      ],
      img: "delta",
    },
    {
      t: "Land changes over time",
      lines: [
        "Weathering, erosion and deposition happen [all the time].",
        "A river can cut a deep [canyon] over thousands of years.",
      ],
      img: "canyon-river",
    },
  ],

  games: [
    {
      k: "which",
      t: "Weathering, erosion or deposition?",
      en: "Break, carry, drop",
      ic: "🪨",
      items: [
        ["Ice in a crack breaks the rock.", 0, "🧊 🪨"],
        ["A river carries sand away.", 1, "🏞️"],
        ["A river drops sand at the sea and makes new land.", 2, "delta"],
        ["Plant roots split a rock.", 0, "roots"],
        ["Wind blows the loose soil away.", 1, "🌬️"],
        ["A glacier carries rocks to a new place.", 1, "glacier"],
        ["Rain changes the color of a statue.", 0, "statue"],
      ].map(([q, k, p]) => {
        const all = [
          ["Weathering: breaks", "🔨"],
          ["Erosion: carries away", "🚚"],
          ["Deposition: drops", "⬇️"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)];
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          icons: o.map((x) => x[1]),
          ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
        };
      }),
    },
    {
      k: "kind",
      t: "Chemical or physical?",
      en: "Two kinds of weathering",
      ic: "🧪",
      items: [
        ["Rain with chemicals makes holes in the rock.", true, "statue"],
        ["Water freezes in a crack and breaks the rock.", false, "🧊"],
        ["Plant roots grow into a crack.", false, "roots"],
        ["Wind blows sand that cuts the rock.", false, "wind-rock"],
        ["A rock changes color.", true, "statue"],
      ].map(([q, chem, p]) => ({
        type: "mc",
        q,
        opts: chem ? ["Chemical", "Physical"] : ["Physical", "Chemical"],
        icons: chem ? ["🧪", "🔨"] : ["🔨", "🧪"],
        two: true,
        ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
      })),
    },
    {
      k: "order",
      t: "Put it in order",
      en: "From rock to new land",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "From a [rock] to new land",
          ask: "Put the steps in order, from a rock to new land.",
          hint: "The rock breaks first.",
          steps: [
            { say: "Weathering breaks the rock", e: "🔨" },
            { say: "Erosion carries the pieces away", e: "🌊" },
            { say: "The water slows down", e: "🐢" },
            { say: "Deposition drops the pieces: new land", img: "delta" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "glacier", label: "Glacier" },
            { img: "delta", label: "Delta" },
            { img: "arch", label: "Sea arch" },
            { img: "canyon-river", label: "River canyon" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 4 Check and more",
      ic: "📕",
      from: "Book · Lesson 4",
      items: [
        {
          type: "open",
          q: "Lucia cleared 5 big rocks from her garden on a slope. It rained twice a week. Mud covered the concrete below, and many plants did not grow. What happened?",
          a: "The rain [eroded] the soil. The soil and seeds were [washed down] the slope.",
          emoji: "🌧️ 🌱 ⛰️",
        },
        {
          type: "open",
          q: "What evidence supports your answer about Lucia's garden?",
          a: "The [mud] on the concrete below, and the plants that did [not grow].",
          emoji: "🟫 🌱",
        },
        {
          type: "open",
          q: "How are weathering and erosion different?",
          a: "[Weathering] breaks the rock. [Erosion] carries the pieces away.",
          img: "canyon-river",
        },
        {
          type: "open",
          q: "What do you think happened to the statue to change its color?",
          a: "[Chemical weathering]: rain with chemicals changed the rock.",
          img: "statue",
        },
        {
          type: "open",
          q: "Why did some parts of this rock wear away and others did not?",
          a: "Some parts are [softer] and wear away faster. Some parts get more [wind] and [water].",
          img: "wind-rock",
        },
        {
          type: "open",
          q: "What might happen to a stone wall with many cracks over 200 years?",
          a: "Plants grow in the cracks. The roots [split] the stones and the wall [crumbles].",
          img: "rock-wall",
        },
        {
          type: "open",
          q: "What must engineers think about when they plan a sea wall?",
          a: "How [strong] the waves are, the [sand] on the beach, and [animals] like sea turtles.",
          img: "sea-wall",
        },
      ],
    },
  ],
};
