// Science · Grade 4 · Topic 7 · Lesson 2 « External Structures and Functions of Plants » (book pages 292–299).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// Exercises: Term 2 booklet practice sheet (pp. 16–18) + Lesson Quiz (pp. 19–21), and the book's own questions.
// The booklet has no answer key: see grade-4/science/UNVERIFIED.md.

// Every answer has a picture (Alex has aphasia: the picture explains the word or the sentence).
// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name in img/lesson-2/
// (the e-*.jpg drawings: .claude/skills/science-lesson/scripts/pictures/topic-7-lesson-2.py), a Lesson 1 picture ("../lesson-1/…"), or 1–2 emoji.
const mc = (q, answers, more) => {
  const isImg = (p) => /^[a-z.][a-z0-9./-]*$/.test(p);
  const opts = answers.map((a) => a[0]);
  const pics = answers.map((a) => (isImg(a[1]) ? a[1] : null));
  const icons = answers.map((a) => (isImg(a[1]) ? null : a[1]));
  return {
    type: "mc",
    q,
    opts,
    ...(pics.some(Boolean) ? { pics } : {}),
    ...(icons.some(Boolean) ? { icons } : {}),
    ...more,
  };
};
// the plant parts, each with its picture (the part in red)
const PART = {
  Cuticle: "e-cuticle",
  Thorns: "cactus-thorns",
  Bark: "bark",
  Prickles: "🌹",
  Petals: "e-flower-petal",
  Sepal: "e-flower-sepal",
  Stamen: "e-flower-stamen",
  Pistil: "e-flower-pistil",
  Ovary: "e-flower-ovary",
  Pollen: "e-flower-pollen",
  Bee: "bee",
  Stomata: "e-stomata",
  Roots: "roots-c",
  Stem: "🌿",
  Leaves: "🍃",
  Flower: "🌸",
  Veins: "../lesson-1/leaf-diagram",
  Xylem: "../lesson-1/stem-tubes",
  Phloem: "../lesson-1/stem-tubes",
};
// answers by name: parts("Cuticle", "Sepal") → [["Cuticle", "e-cuticle"], ["Sepal", "e-flower-sepal"]];
// a name in lower case ("cuticle") keeps its case on the button
const parts = (...names) =>
  names.map((n) => [n, PART[n[0].toUpperCase() + n.slice(1)]]);
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
      ].map(([q, a, b, c, img]) =>
        mc(`${q}: which part?`, parts(a, b, c), { img }),
      ),
    },
    {
      k: "seeds",
      t: "How do the seeds travel?",
      en: "Wind, water, animals, pop!",
      ic: "🌬️",
      items: [
        [
          "Dandelion",
          0,
          "dandelion",
          "The seeds are [light] and fluffy: the wind carries them far.",
        ],
        [
          "Coconut",
          1,
          "coconut",
          "A coconut [floats] on the sea to a new beach.",
        ],
        [
          "Red berries",
          2,
          "berries",
          "Birds [eat] the berries and drop the seeds in a new place.",
        ],
        [
          "Milkweed pod",
          3,
          "milkweed",
          "The pod [pops] open and throws the seeds out.",
        ],
        [
          "Pine cone",
          4,
          "pine-cone",
          "The cone [holds] the seeds and opens when they are ready.",
        ],
      ].map(([t, k, img, x]) => {
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
          x,
        };
      }),
    },
    {
      k: "mf",
      t: "Male or female?",
      en: "Stamen and pistil",
      ic: "🌼",
      items: [
        mc(
          "The [stamen] is the ___ part.",
          [
            ["male", "♂️"],
            ["female", "♀️"],
          ],
          { img: "e-flower-stamen", two: true },
        ),
        mc(
          "The [pistil] is the ___ part.",
          [
            ["female", "♀️"],
            ["male", "♂️"],
          ],
          { img: "e-flower-pistil", two: true },
        ),
        mc("Pollen is made by the ___", parts("stamen", "pistil", "sepal"), {
          img: "e-flower-pollen",
        }),
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
      k: "ps-who",
      t: "Who am I?",
      en: "Booklet · Practice sheet",
      ic: "❓",
      from: "Booklet · Practice sheet p. 16",
      keep: true,
      items: [
        [
          "I have a variety of colors, patterns, shapes and odors that attract pollinators.",
          "Petals",
          ["Sepal", "Stamen"],
          "flower",
        ],
        [
          "I am the male part of a flower that makes pollen.",
          "Stamen",
          ["Pistil", "Petals"],
          "flower-parts",
        ],
        [
          "I am the male reproductive cell.",
          "Pollen",
          ["Ovary", "Sepal"],
          "bee",
        ],
        [
          "I contain the plant's female reproductive parts and receive pollen transferred from a stamen.",
          "Pistil",
          ["Stamen", "Petals"],
          "flower-parts",
        ],
        [
          "I protect the budding flower by wrapping around it.",
          "Sepal",
          ["Petals", "Pistil"],
          "flower-parts",
        ],
        [
          "I am the female reproductive part inside the flower.",
          "Ovary",
          ["Stamen", "Pollen"],
          "../lesson-1/ovary",
        ],
        [
          "I am attracted to the flower colors and the ultraviolet light which you cannot see.",
          "Bee",
          ["Pollen", "Petals"],
          "flower",
        ],
      ].map(([q, right, others, img]) =>
        mc(`${q} [Who am I?]`, parts(right, ...others), { img }),
      ),
    },
    {
      k: "ps-tf",
      t: "True or false",
      en: "Booklet · Practice sheet",
      ic: "✅",
      from: "Booklet · Practice sheet p. 16",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Trees with thick bark are more likely to die when fires happen in their environment.",
          a: false,
          img: "bark",
          x: "Thick bark [protects] the tree from fire. Trees with [thin] bark are more likely to die.",
        },
        {
          type: "tf",
          q: "Only the kind of the plant's external structures depends on the environment in which the plant survives.",
          a: false,
          img: "cactus-thorns",
          x: "Not only the outside parts: the [inside] (internal) parts depend on the environment too.",
        },
        {
          type: "tf",
          q: "The cuticle cannot completely seal the leaf.",
          a: true,
          img: "e-stomata",
          x: "Air must get in through the [stomata], so the cuticle cannot close the leaf completely.",
        },
        {
          type: "tf",
          q: "Stems have one shape and colour in all plants.",
          a: false,
          emoji: "🌿🌳",
          x: "Some stems are [green] and soft, others are [woody], like a tree trunk.",
        },
        {
          type: "tf",
          q: "The bark on the Scots pine tree is very thick.",
          a: true,
          img: "bark",
          x: "The thick bark protects the Scots pine from [fires].",
        },
        {
          type: "tf",
          q: "The water for the plant is best taken in through the leaves of the plant and not the roots.",
          a: false,
          img: "roots-c",
          x: "Water is best taken in through the [roots], not the leaves.",
        },
        {
          type: "tf",
          q: "Plants lose water through their leaves.",
          a: true,
          emoji: "🍃💧",
          x: "That is why the leaves have a waxy [cuticle]: it keeps water in.",
        },
      ],
    },
    {
      k: "ps-choose",
      t: "Choose",
      en: "Booklet · Practice sheet",
      ic: "📝",
      from: "Booklet · Practice sheet p. 17",
      keep: true,
      items: [
        mc(
          "___ is an external structure of a plant that helps protect the plant from losing too much water.",
          parts("Cuticle", "Sepal", "Stamen", "Roots"),
          { emoji: "🍃💧" },
        ),
        mc(
          "Choose one way thorns help a plant.",
          [
            ["They stop predators from eating the plant.", "🐐🚫"],
            ["They take in and store water.", "💧"],
            ["They store seeds.", "🌰"],
            ["They save water.", "🚰"],
          ],
          {
            img: "cactus-thorns",
            x: "Thorns are [sharp]: animals do not want to eat the cactus.",
          },
        ),
        mc(
          "Plant leaves have a ___ to keep unwanted water from entering the plant.",
          parts("cuticle", "stem", "roots", "flower"),
          { emoji: "🌧️🍃" },
        ),
        mc(
          "___ are external structures of plants found on the stem or the leaves.",
          parts("Thorns", "Cuticle", "Bark", "Sepal"),
          { emoji: "🌵" },
        ),
        mc(
          "The cuticle must work with the ___ to make sure that air can enter the plant.",
          parts("stomata", "veins", "xylem", "phloem"),
          {
            img: "e-cuticle",
            x: "The stomata are tiny holes: [air] goes in through them.",
          },
        ),
        mc(
          "___ is the waxy structure that prevents unwanted water from entering the plant leaf.",
          parts("Cuticle", "Bark", "Thorns", "Prickles"),
          { emoji: "🌧️🍃" },
        ),
        mc(
          "___ is the outside barrier that protects the tree from harmful materials or organisms in its environment.",
          parts("Bark", "Stem", "Cuticle", "Flower"),
          { emoji: "🌳🛡️" },
        ),
      ],
    },
    {
      k: "ps-table",
      t: "Ovary and stamen",
      en: "Booklet · Practice sheet · complete the table",
      ic: "📋",
      from: "Booklet · Practice sheet p. 18",
      keep: true,
      items: [
        mc(
          "The [ovary]: internal or external?",
          [
            ["Internal (inside)", "e-flower-ovary"],
            ["External (outside)", "e-flower-petal"],
          ],
          {
            img: "../lesson-1/ovary",
            two: true,
            x: "The ovary is [inside] the pistil: you cannot see it from outside.",
          },
        ),
        mc(
          "The [ovary]: male or female?",
          [
            ["female", "♀️"],
            ["male", "♂️"],
          ],
          { img: "e-flower-ovary", two: true },
        ),
        mc(
          "The [ovary]: what does it make?",
          [
            ["eggs", "🥚"],
            ["pollen", "e-flower-pollen"],
          ],
          {
            img: "e-flower-ovary",
            two: true,
            x: "The ovary makes [eggs]. With pollen, the eggs become seeds.",
          },
        ),
        mc(
          "The [stamen]: internal or external?",
          [
            ["External (outside)", "e-flower-stamen"],
            ["Internal (inside)", "e-flower-ovary"],
          ],
          {
            img: "flower",
            two: true,
            x: "You can [see] the stamens on the outside of the flower.",
          },
        ),
        mc(
          "The [stamen]: male or female?",
          [
            ["male", "♂️"],
            ["female", "♀️"],
          ],
          { img: "e-flower-stamen", two: true },
        ),
        mc(
          "The [stamen]: what does it make?",
          [
            ["pollen", "e-flower-pollen"],
            ["eggs", "🥚"],
          ],
          { img: "e-flower-stamen", two: true },
        ),
      ],
    },
    {
      k: "ps-ext",
      t: "Write the external structure",
      en: "Booklet · Practice sheet",
      ic: "✍️",
      from: "Booklet · Practice sheet p. 18",
      keep: true,
      items: [
        ["Covers the tree trunk.", "Bark", "🌳"],
        ["Covers the leaf.", "Cuticle", "🍃"],
        ["Covers the stem of roses.", "Prickles", "🌹"],
        ["Sharp, pointy structures on plant leaves or stems.", "Thorns", "🌵"],
      ].map(([q, right, emoji]) =>
        mc(
          `${q} Which one?`,
          parts(
            right,
            ...["Cuticle", "Thorns", "Bark", "Prickles"].filter(
              (w) => w !== right,
            ),
          ),
          {
            emoji,
            ...(right === "Prickles"
              ? { x: "Roses have [prickles]. They are like thorns." }
              : {}),
          },
        ),
      ),
    },
    {
      k: "quiz",
      t: "Lesson Quiz",
      en: "Booklet · Lesson Quiz",
      ic: "⭐",
      from: "Booklet · Lesson Quiz p. 19–21",
      keep: true,
      items: [
        mc(
          "Which external structure on a plant helps protect the plant from losing too much water?",
          parts("cuticle", "roots", "sepal", "stamen"),
          { emoji: "🍃💧" },
        ),
        mc(
          "Which root system [best] provides water to the plant, such as the leaves?",
          [
            ["C: many roots, wide and deep", "roots-c"],
            ["A: short roots", "roots-a"],
            ["B: one long root", "roots-b"],
            ["D: roots only near the top", "roots-d"],
          ],
          {
            img: "roots-all",
            keep: [
              "A: short roots",
              "B: one long root",
              "C: many roots, wide and deep",
              "D: roots only near the top",
            ],
            x: "More roots that go wide and deep can take in [more water].",
          },
        ),
        mc(
          "Look at the picture: a strong wind. Which stem would [best] survive?",
          [
            ["thick stem covered with bark", "💪🌳"],
            ["thick stem with no bark", "💪🌱"],
            ["thin stem with no bark", "🌱"],
            ["thin stem covered with thick bark", "🥢🌳"],
          ],
          {
            img: "windy-tree",
            x: "A [thick] stem does not break in the wind, and the [bark] protects it.",
          },
        ),
        mc(
          "A botanist studies plants. Botanists ___ plants according to their structures.",
          [
            ["classify", "🗂️"],
            ["protect", "🛡️"],
            ["damage", "💥"],
          ],
          { emoji: "👩‍🔬🌸", x: "Classify = put into [groups]." },
        ),
        mc(
          "Reproductive structures such as the ___, the pistil, and the stamen help botanists group plants.",
          parts("sepal", "stem", "leaves"),
          {
            img: "flower-parts",
            x: "The sepal, pistil and stamen are parts of the [flower]: they help make new plants.",
          },
        ),
        mc(
          "Which [best] describes how the flower parts work together to make new plants?",
          [
            [
              "The petals of the flower attract pollinators that move pollen from the stamen to the pistil. The sepal protects the seeds until they are dispersed.",
              "e-flower-petal",
            ],
            [
              "The stamen of the flower attracts pollinators that move pollen from the petals to the pistil. The sepal protects the seeds until they are dispersed.",
              "e-flower-stamen",
            ],
            [
              "The pistil of the flower attracts pollinators that move pollen from the stamen to the leaves. The sepal protects the seeds until they are dispersed.",
              "e-flower-pistil",
            ],
            [
              "The sepal of the flower attracts pollinators that move pollen from the petals to the pistil. The stamen protects the seeds until they are dispersed.",
              "e-flower-sepal",
            ],
          ],
          {
            img: "bee",
            x: "The colorful [petals] call the bee. The bee carries pollen from the [stamen] to the [pistil].",
          },
        ),
        mc(
          "Plants reproduce best when their seeds move far away. Which picture [best] shows a plant scattering its seeds?",
          [
            ["B: a dandelion", "seed-b"],
            ["A: a lily", "seed-a"],
            ["C: two flowers", "seed-c"],
            ["D: pine trees", "seed-d"],
          ],
          {
            img: "seeds-all",
            keep: [
              "A: a lily",
              "B: a dandelion",
              "C: two flowers",
              "D: pine trees",
            ],
            x: "The [wind] blows the light dandelion seeds far away.",
          },
        ),
      ],
    },
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
