// Science · Grade 4 · Topic 4 · Lesson 2 « Patterns of Earth's Features » (book pages 166–173).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 2,
  key: "sci4-t4-l2",
  grade: 4,
  title: "Patterns of Earth's Features",
  unit: "Topic 4 · Lesson 2",
  book: "Book pages 166–173",
  cover: "himalayas",
  question: {
    q: "Where do we find [mountains], [volcanoes] and [earthquakes]?",
    a: "Mostly at the [edges] of Earth's [plates], where the plates push and move. The ocean floor has mountains, canyons and flat land too.",
    img: "ring-of-fire",
  },
  // the book's vocabulary + academic vocabulary (page 166) + landforms of the lesson
  words: [
    { w: "Landform", m: "a shape of the land, like a mountain or a valley" },
    { w: "Mountain range", m: "a line of mountains" },
    { w: "Canyon", m: "a deep, narrow valley with steep sides" },
    { w: "Butte", m: "a single hill with steep sides and a flat top" },
    { w: "Plateau", m: "a large area of high, flat land" },
    { w: "Plate", m: "a huge piece of Earth's surface that moves" },
    { w: "Fault", m: "a crack in Earth's crust" },
    { w: "Trench", m: "a long, narrow, deep place in the ocean floor" },
    { w: "Pattern", m: "something that happens again and again the same way" },
  ],

  ideas: [
    {
      t: "Dams change the land",
      lines: [
        "Water in a dam makes [electricity].",
        "The water slows down and drops sand and mud: [sediments].",
        "The river's path can [change].",
      ],
      img: "dam",
    },
    {
      t: "Landforms",
      lines: [
        "[Mountain range]: a line of mountains. [Canyon]: deep and narrow.",
        "[Butte]: one hill with a flat top. [Plateau]: big high flat land.",
        "[Cliff]: steep rock at the edge of the water.",
      ],
      img: "cliffs",
    },
    {
      t: "Earth's plates",
      lines: [
        "Earth's surface is broken into huge pieces of rock: [plates].",
        "The plates [move] up, down and sideways.",
        "When plates crash together, [mountains] form.",
      ],
      img: "himalayas",
    },
    {
      t: "The Ring of Fire",
      lines: [
        "Earthquakes and volcanoes happen along [faults] (cracks).",
        "Many are at the edges of plates around the [Pacific Ocean].",
        "This is called the [Ring of Fire].",
      ],
      img: "ring-of-fire",
    },
    {
      t: "A physical map shows landforms",
      lines: [
        "Colors show how [high] the land is.",
        "The [Appalachian] Mountains are on land.",
        "The [Mid-Atlantic Ridge] is a mountain range under the ocean.",
      ],
      img: "physical-map",
    },
    {
      t: "Mountains on land and under water",
      lines: [
        "Both have [high], [rough] ridges.",
        "The Mid-Atlantic Ridge is mostly [under water].",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "land-mountains", label: "On land" },
          { img: "ocean-ridge", label: "Under the ocean" },
        ],
      },
    },
    {
      t: "Under the ocean",
      lines: [
        "[Trenches]: long, narrow, deep places in the ocean floor.",
        "[Ridges]: like mountain ranges. [Basins]: like big flat plains.",
        "There are also underwater [canyons].",
      ],
      img: "seafloor",
    },
  ],

  games: [
    {
      k: "landform",
      t: "Which landform?",
      en: "Mountain, canyon, butte, plateau, cliff",
      ic: "⛰️",
      items: [
        ["A line of mountains", "Mountain range", "Plateau", "Butte"],
        [
          "A deep, narrow valley with steep sides",
          "Canyon",
          "Butte",
          "Plateau",
        ],
        [
          "One hill with steep sides and a flat top",
          "Butte",
          "Canyon",
          "Cliff",
        ],
        [
          "A large area of high, flat land",
          "Plateau",
          "Canyon",
          "Mountain range",
        ],
        ["Steep rock at the edge of the water", "Cliff", "Plateau", "Butte"],
      ].map(([q, a, b, c], i) => ({
        type: "mc",
        q: `${q}: which landform?`,
        opts: [a, b, c],
        // the cliff has a book photo, the others an emoji
        ...(i === 4
          ? { img: "cliffs" }
          : { emoji: ["🏔️🏔️🏔️", "🏜️", "🪨", "🟫"][i] }),
      })),
    },
    {
      k: "plates",
      t: "Plates and patterns",
      en: "Where do they happen?",
      ic: "🌋",
      items: [
        {
          type: "mc",
          q: "Most volcanoes and earthquakes are ___",
          opts: [
            "at the edges of plates",
            "in the middle of the ocean only",
            "everywhere the same",
          ],
          img: "ring-of-fire",
        },
        {
          type: "mc",
          q: "The Ring of Fire is around the ___",
          opts: ["Pacific Ocean", "Atlantic Ocean", "North Pole"],
          img: "ring-of-fire",
        },
        {
          type: "mc",
          q: "Two plates crash together. What can form?",
          opts: ["Mountains", "A lake", "A desert"],
          icons: ["🏔️", "💧", "🏜️"],
          img: "himalayas",
        },
        {
          type: "mc",
          q: "A crack in Earth's crust is a ___",
          opts: ["fault", "butte", "basin"],
          img: "himalayas",
        },
      ],
    },
    {
      k: "ocean",
      t: "Land or ocean floor?",
      en: "The same shapes under the water",
      ic: "🌊",
      items: [
        ["A trench", "Only on the ocean floor"],
        ["A ridge", "Like a mountain range"],
        ["A basin", "Like a big flat plain"],
      ].map(([t, a]) => ({
        type: "mc",
        q: `[${t}] on the ocean floor is ___`,
        opts: [
          a,
          [
            "Only on the ocean floor",
            "Like a mountain range",
            "Like a big flat plain",
          ].find((x) => x !== a),
        ],
        img: "seafloor",
      })),
    },
    {
      k: "match",
      t: "Pictures and words",
      en: "Match",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "ring-of-fire", label: "Ring of Fire" },
            { img: "himalayas", label: "Mountains from plates" },
            { img: "seafloor", label: "Ocean floor" },
            { img: "cliffs", label: "Cliffs" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 2 Check and more",
      ic: "📕",
      from: "Book · Lesson 2",
      items: [
        {
          type: "open",
          q: "Most mountain ranges lie along the edges of continents. Why?",
          a: "The edges are where [plates] meet and [crash together]. That pushes up mountains.",
          img: "himalayas",
        },
        {
          type: "open",
          q: "How do landforms above water compare to landforms in the ocean?",
          a: "They are [alike]: ridges are like mountains, basins like plains, and there are canyons in both.",
          img: "seafloor",
        },
        {
          type: "open",
          q: "How do you think the Himalaya mountains formed?",
          a: "Two [plates] pushed into each other and the land was pushed [up].",
          img: "himalayas",
        },
        {
          type: "open",
          q: "Look at the Ring of Fire map. What pattern do you see?",
          a: "Volcanoes are in a [ring] around the Pacific Ocean, along the [plate boundaries].",
          img: "ring-of-fire",
        },
        {
          type: "open",
          q: "How is a mountain different from a plateau?",
          a: "A mountain is [high and pointed]. A plateau is high but [flat] on top.",
          emoji: "🏔️ 🟫",
        },
        {
          type: "open",
          q: "What could happen if a river's path changes?",
          a: "Some places get [flooded], other places get [no water].",
          img: "dam",
        },
        {
          type: "open",
          q: "How are the mountains on land and the Mid-Atlantic Ridge alike?",
          a: "Both are [long lines of high, rough land].",
          img: "ocean-ridge",
        },
      ],
    },
  ],
};
