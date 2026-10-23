// Science · Grade 4 · Topic 7 · Lesson 2 « External Structures and Functions of Plants » (book pages 292–299).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 2,
  key: "sci4-t7-l2",
  grade: 4,
  title: "External Structures and Functions of Plants",
  unit: "Topic 7 · Lesson 2",
  book: "Book pages 292–299",
  cover: "flower-parts",
  question: {
    q: "How do the [outside] parts of a plant help it [survive] and make [new plants]?",
    a: "The [cuticle] keeps water in, [thorns] and [bark] protect, and the [flower] parts make seeds. Seeds are [scattered] in many ways.",
    img: "flower-parts",
  },
  // the book's vocabulary + academic vocabulary (page 292)
  words: [
    { w: "Cuticle", m: "a waxy covering on a leaf that keeps water in" },
    { w: "Thorn", m: "a sharp point that keeps animals away" },
    { w: "Bark", m: "the hard covering of a tree trunk" },
    { w: "Petal", m: "the colorful part of a flower" },
    { w: "Sepal", m: "wraps and protects the flower bud" },
    { w: "Stamen", m: "the male part of a flower; it makes pollen" },
    { w: "Pistil", m: "the female part of a flower; it gets pollen" },
    { w: "Pollinator", m: "an animal that carries pollen, like a bee" },
    { w: "Classify", m: "to put into groups" },
  ],

  ideas: [
    {
      t: "External structures",
      lines: [
        "Outside parts: [leaves], [stems], [roots], [flowers].",
        "Also [bark] and [thorns].",
        "They help the plant [survive], [grow] and make new plants.",
      ],
      vis: { kind: "emoji", e: "🍃 🌱 🌸 🌳" },
    },
    {
      t: "The cuticle",
      lines: [
        "Leaves have a [cuticle]: a waxy covering.",
        "It keeps [water] inside the leaf.",
        "Desert plants have [thick], waxy leaves.",
      ],
      img: "berries",
    },
    {
      t: "Berries scatter seeds",
      lines: [
        "Animals eat the red [berries].",
        "They carry the [seeds] to new places.",
      ],
      img: "berries",
    },
    {
      t: "Thorns",
      lines: [
        "[Thorns] are sharp points on stems or leaves.",
        "They keep thirsty animals [away] from the cactus.",
        "Roses have [prickles], like thorns.",
      ],
      img: "cactus-thorns",
    },
    {
      t: "Stems and bark",
      lines: [
        "Some stems are [green]. Others are [woody].",
        "Tree trunks are covered in [bark]. It [protects] the tree.",
        "Thick bark protects this pine tree from [fire].",
      ],
      img: "bark",
    },
    {
      t: "The parts of a flower",
      lines: [
        "[Petals]: colors and smells call pollinators.",
        "[Stamen]: the male part. It makes [pollen].",
        "[Pistil]: the female part. It gets the pollen. [Sepal]: wraps the bud.",
      ],
      img: "flower",
    },
    {
      t: "Pollinators",
      lines: [
        "A [bee] carries pollen from flower to flower.",
        "Bees see [ultraviolet] light that we cannot see.",
        "The patterns show the bee where the [nectar] is.",
      ],
      img: "bee",
    },
    {
      t: "Seeds travel: wind",
      lines: [
        "Dandelion seeds are [light] and [fluffy].",
        "The [wind] blows them far away.",
      ],
      img: "dandelion",
    },
    {
      t: "Seeds travel: water and more",
      lines: [
        "A [coconut] floats on water for a long time.",
        "A milkweed pod [explodes] and throws its seeds.",
        "A pine cone [stores] its seeds until they are ready.",
      ],
      img: "coconut",
    },
    {
      t: "Picking apples",
      lines: [
        "Engineers built an [apple vacuum] machine.",
        "A tube carries the apples gently to a bin, so they don't [bruise].",
      ],
      img: "apples",
    },
  ],

  games: [
    {
      k: "job",
      t: "What does it do?",
      en: "Outside parts and their jobs",
      ic: "🌸",
      // each row: the job, the right part, two parts that are easy to mix up with it, the picture
      items: [
        ["Keeps water inside the leaf", "Cuticle", "Bark", "Thorns", "berries"],
        ["Keeps animals away", "Thorns", "Cuticle", "Petals", "cactus-thorns"],
        [
          "Protects the tree trunk from fire",
          "Bark",
          "Cuticle",
          "Sepal",
          "bark",
        ],
        ["Makes pollen", "Stamen", "Pistil", "Sepal", "flower"],
        ["Gets the pollen", "Pistil", "Stamen", "Petals", "flower"],
        [
          "Calls pollinators with colors",
          "Petals",
          "Sepal",
          "Stamen",
          "flower",
        ],
        ["Wraps the flower bud", "Sepal", "Petals", "Pistil", "flower"],
      ].map(([q, a, b, c, img]) => ({
        type: "mc",
        q: `${q}: which part?`,
        opts: [a, b, c],
        img,
      })),
    },
    {
      k: "seeds",
      t: "How do the seeds travel?",
      en: "Wind, water, animals, pop!",
      ic: "🌬️",
      items: [
        ["Dandelion", 0, "dandelion"],
        ["Coconut", 1, "coconut"],
        ["Red berries", 2, "berries"],
        ["Milkweed pod", 3, "milkweed"],
        ["Pine cone", 4, "pine-cone"],
      ].map(([t, k, img]) => {
        const all = [
          ["The wind blows them", "🌬️"],
          ["They float on water", "🌊"],
          ["Animals eat them", "🐦"],
          ["The pod explodes", "💥"],
          ["It keeps them until they are ready", "⏳"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)].slice(0, 3); // 3 answers
        return {
          type: "mc",
          q: `[${t}]: how do the seeds travel?`,
          opts: o.map((x) => x[0]),
          icons: o.map((x) => x[1]),
          img,
        };
      }),
    },
    {
      k: "mf",
      t: "Male or female?",
      en: "Stamen and pistil",
      ic: "🌼",
      items: [
        {
          type: "mc",
          q: "The [stamen] is the ___ part.",
          opts: ["male", "female"],
          two: true,
          img: "flower",
        },
        {
          type: "mc",
          q: "The [pistil] is the ___ part.",
          opts: ["female", "male"],
          two: true,
          img: "flower",
        },
        {
          type: "mc",
          q: "Pollen is made by the ___",
          opts: ["stamen", "pistil", "sepal"],
          img: "flower",
        },
        {
          type: "mc",
          q: "Who carries the pollen?",
          opts: ["A bee", "A rock", "The roots"],
          icons: ["🐝", "🪨", "🌱"],
          img: "bee",
        },
      ],
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
            { img: "cactus-thorns", label: "Thorns" },
            { img: "bark", label: "Bark" },
            { img: "bee", label: "Pollinator" },
            { img: "dandelion", label: "Seeds in the wind" },
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
          q: "A disease makes the cuticle on a plant's leaves disappear. What would most likely happen? Why?",
          a: "The plant would [lose water] and dry out. The cuticle keeps water in.",
          img: "berries",
        },
        {
          type: "open",
          q: "How are the stamen and pistil part of reproduction?",
          a: "The [stamen] makes pollen. The [pistil] gets the pollen. Then [seeds] can form.",
          img: "flower",
        },
        {
          type: "open",
          q: "How are a leaf cuticle and a thorn the same?",
          a: "Both [protect] the plant.",
          img: "cactus-thorns",
        },
        {
          type: "open",
          q: "Which leaf works best in a dry place: a thin one or a thick, waxy one? Why?",
          a: "A [thick, waxy] leaf. It keeps and stores more water.",
          emoji: "🍃 🏜️",
        },
        {
          type: "open",
          q: "Bark protects a tree. What do people use for protection?",
          a: "[Clothes], [shoes], hats, helmets.",
          img: "bark",
        },
        {
          type: "open",
          q: "How do petals help a plant?",
          a: "Their [colors] and [smells] call pollinators. They also protect the inside parts.",
          img: "bee",
        },
        {
          type: "open",
          q: "Choose one seed. How does it travel?",
          a: "Dandelion: [wind]. Coconut: [water]. Berries: [animals]. Milkweed: the pod [explodes].",
          img: "dandelion",
        },
      ],
    },
  ],
};
