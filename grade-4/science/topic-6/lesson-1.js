// Science · Grade 4 · Topic 6 · Lesson 1 « Patterns in Fossils and Rock Formations » (book pages 248–254).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 1,
  key: "sci4-t6-l1",
  grade: 4,
  title: "Patterns in Fossils and Rock Formations",
  unit: "Topic 6 · Lesson 1",
  book: "Book pages 248–254",
  cover: "peru",
  question: {
    q: "What can [fossils] and [rock layers] tell us about the past?",
    a: "Fossils show what [living things] were like long ago and where they lived. Rock layers are in order: the [oldest] is usually at the [bottom].",
    img: "fossil",
  },
  // the book's vocabulary + academic vocabulary (page 248) + rock words
  words: [
    {
      w: "Fossil",
      m: "what is left in rock of a plant or animal from long ago",
    },
    {
      w: "Sediment",
      m: "tiny bits of rock and dead things that settle in layers",
    },
    { w: "Strata", m: "rock layers" },
    { w: "Horizontal", m: "flat, side to side, like the ground" },
    { w: "Fault", m: "a crack in the Earth where rocks move" },
    { w: "Core sample", m: "a long tube of rock taken from underground" },
    { w: "Geologic time scale", m: "a timeline of Earth's history" },
  ],

  ideas: [
    {
      t: "Finding fossils",
      lines: [
        "Workers found [elephant] bones while building a subway.",
        "Scientists use [radar] to see under the ground without digging.",
      ],
      img: "radar",
    },
    {
      t: "What is a fossil?",
      lines: [
        "A [fossil]: what is left of a plant or animal from [long ago].",
        "Fossils are found in [rock].",
      ],
      img: "fossil",
    },
    {
      t: "How a body fossil forms",
      lines: [
        "An animal dies and is covered by [sediment]: mud and sand.",
        "The soft parts decay. [Minerals] slowly replace the bones.",
        "The bones turn into rock.",
      ],
      vis: { kind: "emoji", e: "🦴 ⏳ 🪨" },
    },
    {
      t: "Other fossils",
      lines: [
        "[Cast and mold] fossils: the shape of a body pressed into rock.",
        "[Trace] fossils: footprints, burrows, nests.",
      ],
      img: "ammonite",
    },
    {
      t: "Fossils give clues",
      lines: [
        "Did it live on [land] or in [water]?",
        "Was the climate [warm] or [cold]?",
      ],
      vis: { kind: "emoji", e: "🐟 🦖 ☀️ ❄️" },
    },
    {
      t: "Rock layers",
      lines: [
        "Sediments settle in [layers]. New layers go [on top].",
        "The layers harden into rock in [horizontal] (flat) patterns.",
        "Most fossils are in these [sedimentary] rocks.",
      ],
      img: "dig-layers",
    },
    {
      t: "Oldest at the bottom",
      lines: [
        "Rock layers are called [strata].",
        "Usually the [bottom] layer is the [oldest]. The top is the [youngest].",
        "Scientists take long tubes of rock: [core samples].",
      ],
      img: "cores",
    },
    {
      t: "Rock layers can change",
      lines: [
        "Along a [fault] (a crack) the rocks can move, tilt or flip over.",
        "Then an older layer can be [on top].",
        "Hot [magma] can push in and harden into new rock.",
      ],
      vis: { kind: "emoji", e: "🪨 ↕️ 🌋" },
    },
    {
      t: "Rainbow Mountain",
      lines: [
        "Floods and dry times left layers of different [colors].",
        "The Earth pushed the layers [up].",
        "Minerals met the air and became even more colorful.",
      ],
      img: "peru",
    },
    {
      t: "The geologic time scale",
      lines: [
        "Fossils are in rock layers in a certain [order].",
        "Scientists made a timeline of Earth: the [geologic time scale].",
        "Dinosaurs died out about [65 million] years ago.",
      ],
      img: "time-scale",
    },
  ],

  games: [
    {
      k: "layers",
      t: "Which layer is older?",
      en: "Rock layers in order",
      ic: "🪨",
      items: [
        {
          type: "mc",
          q: "Which layer is the [oldest]?",
          opts: ["A (the bottom)", "E (the top)", "C (the middle)"],
          img: "dig-layers",
        },
        {
          type: "mc",
          q: "Which layer is the [youngest]?",
          opts: ["E (the top)", "A (the bottom)", "C (the middle)"],
          img: "dig-layers",
        },
        {
          type: "mc",
          q: "New layers of sediment form ___",
          opts: ["on top", "under the old layers"],
          two: true,
          img: "dig-layers",
        },
        {
          type: "mc",
          q: "Rocks move along a fault. An older layer can end up ___",
          opts: ["on top", "gone forever"],
          two: true,
          emoji: "🪨 ↕️",
        },
        {
          type: "mc",
          q: "Is the lowest layer [always] the oldest?",
          opts: ["Not always: layers can move", "Yes, always"],
          img: "cores",
        },
      ],
    },
    {
      k: "fossil",
      t: "Fossil or not?",
      en: "Is it a fossil?",
      ic: "🦴",
      items: [
        ["A dinosaur bone that turned to rock", true, "🦴"],
        ["A footprint in rock from long ago", true, "👣"],
        ["A shell shape in rock", true, "ammonite"],
        ["A plastic toy dinosaur", false, "🦖"],
        ["A leaf that fell yesterday", false, "🍂"],
        ["A nest from long ago, in rock", true, "🪺"],
      ].map(([t, yes, p]) => ({
        type: "mc",
        q: `[${t}]: is it a fossil?`,
        opts: yes ? ["Yes, a fossil", "No"] : ["No", "Yes, a fossil"],
        icons: yes ? ["🦴", "🚫"] : ["🚫", "🦴"],
        two: true,
        ...(p === "ammonite" ? { img: p } : { emoji: p }),
      })),
    },
    {
      k: "order",
      t: "What happens first?",
      en: "Put it in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "How a [body fossil] forms",
          ask: "Put the steps of how a body fossil forms in order.",
          hint: "The animal dies first.",
          steps: [
            { say: "An animal dies", e: "🦴" },
            { say: "Mud and sand cover it", e: "🏖️" },
            { say: "The soft parts decay", e: "⏳" },
            { say: "Minerals replace the bones", e: "🪨" },
            { say: "Scientists find the fossil", img: "fossil" },
          ],
        },
        {
          type: "order",
          t: "How [Rainbow Mountain] formed",
          ask: "Put the steps of how Rainbow Mountain formed in order.",
          hint: "The floods come first.",
          steps: [
            { say: "Floods and dry times leave layers", e: "🌊" },
            { say: "The layers harden into rock", e: "🪨" },
            { say: "The Earth pushes the layers up", e: "⛰️" },
            { say: "The air makes the minerals colorful", img: "peru" },
          ],
        },
      ],
    },
    {
      k: "time",
      t: "The time scale",
      en: "Eras of Earth",
      ic: "🦕",
      items: [
        {
          type: "mc",
          q: "Which era is [now]?",
          opts: ["Cenozoic", "Mesozoic", "Paleozoic", "Precambrian"],
          img: "time-scale",
        },
        {
          type: "mc",
          q: "In which era did [dinosaurs] live?",
          opts: ["Mesozoic", "Cenozoic", "Precambrian"],
          img: "time-scale",
        },
        {
          type: "mc",
          q: "Which era is the [oldest]?",
          opts: ["Precambrian", "Cenozoic", "Mesozoic"],
          img: "time-scale",
        },
        {
          type: "mc",
          q: "Dinosaurs died out about ___ years ago.",
          opts: ["65 million", "65", "6 thousand"],
          img: "time-scale",
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
          q: "What can a fossil show about animals and plants from long ago?",
          a: "Their [size] and [shape], what they [ate], whether they lived on [land] or in [water], and the [climate].",
          img: "fossil",
        },
        {
          type: "open",
          q: "What patterns can be seen in fossils and rock formations?",
          a: "Rock layers are [horizontal]. [Older] layers are usually at the bottom. Fossils are in a certain [order].",
          img: "dig-layers",
        },
        {
          type: "open",
          q: "Describe the steps that form a body fossil.",
          a: "The animal dies and is [covered by sediment]. The soft parts decay. [Minerals replace] the bones.",
          emoji: "🦴 🏖️ 🪨",
        },
        {
          type: "open",
          q: "In a core sample, will the lowest layer always be the oldest? Why?",
          a: "[Not always]. Faults can move or flip the layers, and magma can push in.",
          img: "cores",
        },
        {
          type: "open",
          q: "At the dig site, which layer is the youngest? Why?",
          a: "Layer [E]. It is on [top], and new layers form on top.",
          img: "dig-layers",
        },
        {
          type: "open",
          q: "How long ago did dinosaurs go extinct?",
          a: "About [65 million] years ago.",
          img: "time-scale",
        },
        {
          type: "open",
          q: "How could scientists find the oldest rock layer at Rainbow Mountain?",
          a: "Study the [order] of the layers and the [fossils] in them.",
          img: "peru",
        },
        {
          type: "open",
          q: "What can the place where a fossil is found tell scientists?",
          a: "Where the organism [lived] (land or water) and [how old] it is.",
          emoji: "🗺️ 🦴",
        },
        {
          type: "open",
          q: "Press a sugar cube into clay, then wash the sugar away with water. How does this show how fossils form?",
          a: "The sugar dissolves and leaves its [shape] in the clay, like a mold fossil.",
          emoji: "🧊 💧",
        },
      ],
    },
  ],
};
