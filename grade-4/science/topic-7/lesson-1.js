// Science · Grade 4 · Topic 7 · Lesson 1 « Internal Structures and Functions of Plants » (book pages 282–291).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 1,
  key: "sci4-t7-l1",
  grade: 4,
  title: "Internal Structures and Functions of Plants",
  unit: "Topic 7 · Lesson 1",
  book: "Book pages 282–291",
  cover: "leaf-diagram",
  question: {
    q: "What parts are [inside] a plant? What do they [do]?",
    a: "Inside the leaf, [chloroplasts] make food and [stomata] let air in. Tubes ([xylem] and [phloem]) carry water and food. The [ovary] makes seeds.",
    img: "leaf-diagram",
  },
  // the book's vocabulary + academic vocabulary (page 282) + words of the lesson
  words: [
    { w: "Structure", m: "a part of a living thing" },
    { w: "Function", m: "the job of a part" },
    { w: "External", m: "outside" },
    { w: "Internal", m: "inside" },
    {
      w: "Ovary",
      m: "the part of a flower that makes eggs; seeds grow inside",
    },
    {
      w: "Photosynthesis",
      m: "a plant makes its own food (sugar) with sunlight",
    },
    { w: "Chloroplast", m: "the tiny green part in a leaf that makes food" },
    { w: "Stomata", m: "tiny holes in a leaf that let air in and out" },
    {
      w: "Vascular system",
      m: "small tubes that carry water and food in a plant",
    },
    { w: "Xylem", m: "tubes that carry water up from the roots" },
    { w: "Phloem", m: "tubes that carry food from the leaves" },
  ],

  ideas: [
    {
      t: "Outside and inside",
      lines: [
        "A plant is a [system]: its parts ([structures]) work together.",
        "[External] parts are outside and easy to see.",
        "[Internal] parts are inside. We cut the plant open to see them.",
      ],
      img: "aloe",
    },
    {
      t: "Seeds inside fruits",
      lines: [
        "An orange has many [small seeds] inside.",
        "A peach has one big hard [pit] with a seed inside.",
      ],
      img: "fruits",
    },
    {
      t: "Every part has a job",
      lines: [
        "Each structure has a [function]: a job.",
        "Jobs: [survive], [grow], [protect], make [new plants].",
      ],
      vis: { kind: "emoji", e: "🌱 🛡️ 🌸" },
    },
    {
      t: "The ovary",
      lines: [
        "The [ovary] is inside the flower.",
        "It makes [eggs]. The [seeds] grow there.",
      ],
      img: "ovary",
    },
    {
      t: "From flower to tomato",
      lines: [
        "The seeds in a tomato started as eggs in the flower's [ovary].",
        "The ovary grows into the [fruit].",
      ],
      img: "tomato",
    },
    {
      t: "Plants make their own food",
      lines: [
        "[Photosynthesis]: the plant makes its own food ([sugar]).",
        "It needs [sunlight], [water] and [carbon dioxide] from the air.",
        "It gives out [oxygen].",
      ],
      img: "plant",
    },
    {
      t: "Chloroplasts",
      lines: [
        "[Chloroplasts] are tiny green parts inside the leaf.",
        "Photosynthesis happens [inside] them.",
      ],
      img: "leaf-inside",
    },
    {
      t: "Stomata",
      lines: [
        "[Stomata] are tiny holes in the leaf.",
        "They take in [carbon dioxide] from the air.",
        "They let out other gases, like [oxygen].",
      ],
      img: "stoma",
    },
    {
      t: "The vascular system",
      lines: [
        "The [vascular system]: small tubes that carry things through the plant.",
        "[Xylem]: carries [water] [up] from the roots.",
        "[Phloem]: carries [food] from the leaves to all parts.",
      ],
      img: "stem-tubes",
    },
    {
      t: "The cactus",
      lines: [
        "A cactus lives in the [desert]: little rain.",
        "Its big stem takes in water and [stores] it for a long time.",
      ],
      img: "cactus",
    },
  ],

  games: [
    {
      k: "job",
      t: "What is its job?",
      en: "Structure and function",
      ic: "🌿",
      items: [
        ["It carries water up from the roots.", "Xylem", "stem-tubes"],
        ["It carries food from the leaves.", "Phloem", "stem-tubes"],
        ["Seeds grow inside it.", "Ovary", "ovary"],
        ["Tiny holes that let air in.", "Stomata", "stoma"],
        ["Photosynthesis happens inside it.", "Chloroplast", "leaf-inside"],
      ].map(([q, right, img], _, all) => ({
        type: "mc",
        q,
        opts: [
          right,
          ...all
            .map((x) => x[1])
            .filter((x) => x !== right)
            .slice(0, 2),
        ],
        img,
      })),
    },
    {
      k: "photo",
      t: "Photosynthesis",
      en: "What does the plant need?",
      ic: "☀️",
      items: [
        {
          type: "multi",
          q: "What does a plant need to make food? (choose all)",
          opts: [
            { t: "Sunlight", emoji: "☀️", ok: true },
            { t: "Water", emoji: "💧", ok: true },
            { t: "Carbon dioxide", emoji: "💨", ok: true },
            { t: "Candy", emoji: "🍬" },
            { t: "Darkness", emoji: "🌑" },
          ],
        },
        {
          type: "mc",
          q: "What food does the plant make?",
          opts: ["Sugar", "Salt", "Meat"],
          icons: ["🍬", "🧂", "🍖"],
          img: "plant",
        },
        {
          type: "mc",
          q: "What gas does the plant give out?",
          opts: ["Oxygen", "Smoke"],
          two: true,
          img: "leaf-inside",
        },
        {
          type: "mc",
          q: "A plant has no chloroplasts. What happens?",
          opts: ["It cannot make food", "It grows faster"],
          img: "leaf-inside",
        },
      ],
    },
    {
      k: "io",
      t: "Inside or outside?",
      en: "Internal or external",
      ic: "🔍",
      items: [
        ["Colorful petals", false, "🌸"],
        ["The ovary of a flower", true, "ovary"],
        ["Xylem tubes in the stem", true, "stem-tubes"],
        ["The bark of a tree", false, "🌳"],
        ["Chloroplasts in a leaf", true, "leaf-inside"],
        ["The gel inside an aloe leaf", true, "aloe"],
      ].map(([t, inside, p]) => ({
        type: "mc",
        q: `[${t}]: inside or outside the plant?`,
        opts: inside
          ? ["Internal (inside)", "External (outside)"]
          : ["External (outside)", "Internal (inside)"],
        icons: inside ? ["🔍", "👀"] : ["👀", "🔍"],
        two: true,
        ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
      })),
    },
    {
      k: "updown",
      t: "Which way?",
      en: "Xylem and phloem",
      ic: "↕️",
      items: [
        {
          type: "mc",
          q: "Xylem carries water ___",
          opts: ["up, from the roots", "down, to the roots"],
          img: "stem-tubes",
        },
        {
          type: "mc",
          q: "Phloem carries food ___",
          opts: ["from the leaves to all parts", "only up"],
          img: "stem-tubes",
        },
        {
          type: "mc",
          q: "Where does a cactus store water?",
          opts: ["In its big stem", "In its flowers"],
          img: "cactus",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 1 Check and more",
      ic: "📕",
      from: "Book · Lesson 1",
      items: [
        {
          type: "open",
          q: "Complete: xylem = ___. The female flower part for reproduction = ___. Carries sugars through the plant = ___.",
          a: "Xylem carries [water up from the roots]. The [ovary]. The [phloem].",
          img: "stem-tubes",
        },
        {
          type: "open",
          q: "Why are the colorful petals of a flower not an internal structure?",
          a: "They are on the [outside]: we can see them without cutting the plant.",
          emoji: "🌸 👀",
        },
        {
          type: "open",
          q: "Why do you think the peach seed is inside a hard pit?",
          a: "To [protect] the seed.",
          img: "fruits",
        },
        {
          type: "open",
          q: "What would happen to a plant with no chloroplasts?",
          a: "It could [not make food] and would die.",
          img: "leaf-inside",
        },
        {
          type: "open",
          q: "How is a desert plant different from a forest plant?",
          a: "A desert plant, like a cactus, must [store water] for a long time.",
          img: "cactus",
        },
        {
          type: "open",
          q: "Put celery in colored water. What happens? Why?",
          a: "The color goes [up] the stem into the leaves. The [xylem] carries the water up.",
          emoji: "🥬 🧪",
        },
        {
          type: "open",
          q: "How do xylem and phloem move things in different ways? How are they the same?",
          a: "Xylem moves water only [up]. Phloem moves food in [many directions]. Both are [tubes] that carry things.",
          img: "stem-tubes",
        },
      ],
    },
  ],
};
