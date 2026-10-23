// Science · Grade 4 · Topic 6 · Lesson 2 « Evidence of Change on Earth » (book pages 258–267).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 2,
  key: "sci4-t6-l2",
  grade: 4,
  title: "Evidence of Change on Earth",
  unit: "Topic 6 · Lesson 2",
  book: "Book pages 258–267",
  cover: "dinosaur",
  question: {
    q: "How do fossils and rock layers show that the Earth [changes]?",
    a: "Sea fossils on dry land show the land was once under [water]. Rock layers [move], [fold] and [wear away]. Key beds show big events, like the [asteroid] that ended the dinosaurs.",
    img: "folding",
  },
  // the book's vocabulary + academic vocabulary (page 258) + words of the lesson
  words: [
    {
      w: "Key bed",
      m: "a rock layer that is easy to recognize, used to match places",
    },
    {
      w: "Index fossil",
      m: "a fossil from one time that tells the age of a layer",
    },
    { w: "Sample", m: "a small piece to study" },
    { w: "Folding", m: "rock layers bend and tilt" },
    { w: "Erosion", m: "rock is worn away" },
    {
      w: "Mass extinction",
      m: "many kinds of living things die out at the same time",
    },
    { w: "Extinct", m: "gone forever" },
  ],

  ideas: [
    {
      t: "Digging deep",
      lines: [
        "Engineers drill very deep holes.",
        "The deepest hole is more than [12 kilometers] deep, in Russia.",
        "They found tiny plankton [fossils] 6.5 kilometers down!",
      ],
      img: "drill",
    },
    {
      t: "Fossil clues",
      lines: [
        "Shells and fins = a [watery] place long ago.",
        "Pollen fossils show which [plants] grew there.",
      ],
      img: "sea-fossils",
    },
    {
      t: "Land that was once sea",
      lines: [
        "Coral fossils far from the ocean: there was once a [shallow sea].",
        "Sea level goes [down]: dry land. Sea level goes [up]: the land floods.",
      ],
      vis: { kind: "emoji", e: "🐚 🌊 🏜️" },
    },
    {
      t: "Index fossils",
      lines: [
        "[Index fossils] come from one special time.",
        "Rock layers with the same index fossils are the [same age].",
        "[Trilobites] are famous index fossils.",
      ],
      img: "trilobite",
    },
    {
      t: "Faults",
      lines: [
        "[Faults] are deep cracks in the Earth's crust.",
        "Earthquakes move the rocks along the fault.",
        "An older layer can end up [higher] than a younger one.",
      ],
      img: "faults",
    },
    {
      t: "Folding and erosion",
      lines: [
        "Rock layers form flat. [Folding] bends them up: a mountain.",
        "[Erosion] wears the mountain away.",
        "New layers form on top: the order of the layers [changes].",
      ],
      img: "folding",
    },
    {
      t: "Key beds",
      lines: [
        "A [key bed] is a layer that is easy to recognize.",
        "Scientists use it to [match] layers in different places.",
        "Ash from volcanoes or dust from asteroids can make key beds.",
      ],
      img: "key-beds",
    },
    {
      t: "The K-T boundary",
      lines: [
        "A thin clay layer from about [66 million] years ago.",
        "It has [iridium], a metal that comes from space rocks.",
      ],
      img: "kt-layer",
    },
    {
      t: "The end of the dinosaurs",
      lines: [
        "A huge [asteroid] crashed into the Earth.",
        "Dust in the air changed the [climate].",
        "Dinosaurs and many other living things became [extinct].",
      ],
      img: "dinosaur",
    },
  ],

  games: [
    {
      k: "clues",
      t: "What do the fossils tell us?",
      en: "Clues about the past",
      ic: "🔎",
      items: [
        {
          type: "mc",
          q: "Fossil shells and fish fins in a rock layer. What was there?",
          opts: ["Water", "A desert", "A forest"],
          icons: ["🌊", "🏜️", "🌲"],
          img: "sea-fossils",
        },
        {
          type: "mc",
          q: "Coral fossils far from the ocean. What was there long ago?",
          opts: ["A shallow sea", "It was always dry land"],
          emoji: "🪸",
        },
        {
          type: "mc",
          q: "Land animal fossils between layers of sea fossils. What happened?",
          opts: [
            "The sea went down, then came back",
            "The land animals could swim",
          ],
          emoji: "🐚 🦖 🐚",
        },
        {
          type: "mc",
          q: "Pollen fossils tell us ___",
          opts: ["which plants grew there", "how old the sun is"],
          emoji: "🌼",
        },
        {
          type: "mc",
          q: "Two places have the same index fossil. The rock layers are ___",
          opts: ["the same age", "the same color"],
          img: "trilobite",
        },
        {
          type: "mc",
          q: "There is iridium in the clay layer. What happened?",
          opts: ["An asteroid hit the Earth", "A big flood"],
          icons: ["☄️", "🌊"],
          img: "kt-layer",
        },
      ],
    },
    {
      k: "order",
      t: "What happens first?",
      en: "Put it in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "How rock layers [change]",
          ask: "Put the steps of how rock layers change in order.",
          hint: "The flat layers come first.",
          steps: [
            { say: "Flat rock layers form", e: "🟫" },
            { say: "The layers fold: a mountain", img: "folding" },
            { say: "Erosion wears the mountain down", e: "🌬️" },
            { say: "New layers form on top", e: "⬆️" },
          ],
        },
        {
          type: "order",
          t: "The end of the [dinosaurs]",
          ask: "Put the steps of the end of the dinosaurs in order.",
          hint: "The asteroid comes first.",
          steps: [
            { say: "An asteroid hits the Earth", e: "☄️" },
            { say: "Dust fills the air", e: "🌫️" },
            { say: "The climate changes", e: "❄️" },
            { say: "The dinosaurs become extinct", img: "dinosaur" },
          ],
        },
      ],
    },
    {
      k: "tf",
      t: "True or false?",
      en: "Rocks and fossils",
      ic: "✅",
      items: [
        {
          type: "tf",
          q: "A fault is younger than the rocks around it.",
          a: true,
          img: "faults",
        },
        {
          type: "tf",
          q: "After rocks move along a fault, an older layer can be on top.",
          a: true,
          img: "faults",
        },
        {
          type: "tf",
          q: "Rock layers always stay flat and never move.",
          a: false,
          img: "folding",
          x: "Layers can [fold], [tilt] and [break].",
        },
        {
          type: "tf",
          q: "Dinosaurs became extinct about 66 million years ago.",
          a: true,
          img: "dinosaur",
        },
        {
          type: "tf",
          q: "Sea fossils can never be found on dry land.",
          a: false,
          img: "sea-fossils",
          x: "The land was once under the [sea].",
        },
      ],
    },
    {
      k: "words",
      t: "Pictures and words",
      en: "Match",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "trilobite", label: "Index fossil" },
            { img: "faults", label: "Fault" },
            { img: "folding", label: "Folding" },
            { img: "kt-layer", label: "Key bed (K-T boundary)" },
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
          q: "What can scientists learn about the history of Earth from fossils?",
          a: "What [lived] there, whether it was [land or sea], the [climate], and how [old] the layers are.",
          img: "sea-fossils",
        },
        {
          type: "open",
          q: "How do scientists match rock layers from different places on Earth?",
          a: "With [key beds] and [index fossils].",
          img: "key-beds",
        },
        {
          type: "open",
          q: "What events could put land animal fossils between layers of sea fossils?",
          a: "The sea level went [down] (dry land with land animals), then went [up] again (sea animals).",
          emoji: "🐚 🦖 🐚",
        },
        {
          type: "open",
          q: "In diagram B, how might a scientist know that two rock layers are different ages?",
          a: "By the [fossils] in them and their [order]. The fault moved the layers.",
          img: "faults",
        },
        {
          type: "open",
          q: "A friend says his fossil is over 100 million years old. What questions could you ask to check?",
          a: "Which [layer] was it found in? Are there [index fossils] with it?",
          img: "trilobite",
        },
        {
          type: "open",
          q: "Why did the dinosaurs become extinct?",
          a: "A huge [asteroid] hit the Earth. Dust changed the [climate].",
          img: "dinosaur",
        },
        {
          type: "open",
          q: "What would you want to see if you dug deep into the Earth?",
          a: "Rock [layers], [fossils], maybe very hot rock.",
          img: "drill",
        },
      ],
    },
  ],
};
