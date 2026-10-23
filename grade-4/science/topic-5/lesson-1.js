// Science · Grade 4 · Topic 5 · Lesson 1 « Tectonic Hazards » (book pages 208–217).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 1,
  key: "sci4-t5-l1",
  grade: 4,
  title: "Tectonic Hazards",
  unit: "Topic 5 · Lesson 1",
  book: "Book pages 208–217",
  cover: "volcano",
  question: {
    q: "How can [earthquakes], [tsunamis] and [volcanoes] harm people?",
    a: "Earthquakes [shake] and break buildings and roads. Tsunamis are huge waves that [flood] the coast. Volcanoes send out hot [lava], [ash] and gas.",
    img: "tsunami",
  },
  // the book's vocabulary + academic vocabulary (page 208)
  words: [
    { w: "Crust", m: "the thin rock layer on top of the Earth" },
    { w: "Fault", m: "a crack in the crust where the rock moves" },
    { w: "Earthquake", m: "a sudden shaking of the ground" },
    { w: "Tsunami", m: "a series of huge ocean waves" },
    { w: "Volcano", m: "an opening where hot rock comes out of the Earth" },
    { w: "Eruption", m: "when a volcano sends out lava, ash and gas" },
    { w: "Hazard", m: "a danger to people" },
  ],

  ideas: [
    {
      t: "Earth's plates move",
      lines: [
        "The Earth's [crust] is broken into big [plates].",
        "The plates move very slowly: a few centimeters a year.",
        "They push, pull or slide past each other.",
      ],
      img: "slide-past",
    },
    {
      t: "Faults",
      lines: [
        "A [fault] is a crack where two sides slide past each other.",
        "The [San Andreas] fault in California is 1,300 km long.",
      ],
      img: "san-andreas",
    },
    {
      t: "Earthquakes",
      lines: [
        "Stress builds up along a fault.",
        "Then it is released: an [earthquake]. The ground [shakes].",
        "Sometimes one plate slides [under] another.",
      ],
      img: "slide-under",
    },
    {
      t: "Small and big earthquakes",
      lines: [
        "The [magnitude] (M) tells how strong an earthquake is.",
        "Below M3: people don't feel it. M5: pictures fall off walls.",
        "Above M6: buildings fall, roads [break]. Fires can start.",
      ],
      img: "road-crack",
    },
    {
      t: "Earthquake damage",
      lines: [
        "Buildings can [collapse].",
        "Highways and bridges can fall down.",
        "Houses can slide down hills: [landslides].",
      ],
      img: "house-damage",
    },
    {
      t: "Tsunamis",
      lines: [
        "An earthquake under the ocean moves the seafloor.",
        "It makes huge waves: a [tsunami].",
        "Near the coast the waves get [taller] and [flood] the land.",
      ],
      img: "tsunami",
    },
    {
      t: "Tsunami warnings",
      lines: [
        "Earthquakes cannot be [predicted].",
        "But special [buoys] in the ocean warn people of giant waves.",
      ],
      img: "buoy",
    },
    {
      t: "Volcanoes",
      lines: [
        "A [volcano]: an opening where very hot material comes out of the Earth.",
        "An [eruption]: the volcano sends out lava, ash and gas.",
      ],
      img: "volcano",
    },
    {
      t: "Volcano hazards",
      lines: [
        "[Lava] burns everything. It cools into rock.",
        "Hot [ash] clouds move very fast and burn.",
        "Ash and melted ice make rivers of [mud].",
      ],
      img: "volcano-town",
    },
  ],

  games: [
    {
      k: "which",
      t: "Earthquake, tsunami or volcano?",
      en: "Which hazard?",
      ic: "🌋",
      items: [
        ["The ground shakes.", 0],
        ["Huge waves flood the coast.", 1],
        ["Hot lava and ash come out.", 2],
        ["Pictures fall off the walls.", 0],
        ["An earthquake under the ocean makes giant waves.", 1],
        ["A river of mud comes down the mountain.", 2],
      ].map(([q, k]) => {
        const all = [
          ["Earthquake", "road-crack"],
          ["Tsunami", "tsunami"],
          ["Volcano", "volcano"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)];
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          pics: o.map((x) => x[1]),
        };
      }),
    },
    {
      k: "strong",
      t: "How strong?",
      en: "Magnitude",
      ic: "📈",
      items: [
        {
          type: "mc",
          q: "An earthquake [below M3]: what happens?",
          opts: ["People don't feel it", "Buildings fall down"],
          icons: ["😴", "🏚️"],
          emoji: "📉",
        },
        {
          type: "mc",
          q: "An [M5] earthquake: what happens?",
          opts: ["Pictures fall off walls", "Nothing at all"],
          icons: ["🖼️", "😴"],
          emoji: "🏠",
        },
        {
          type: "mc",
          q: "An earthquake [above M6]: what happens?",
          opts: ["Buildings fall, roads break", "People don't feel it"],
          icons: ["🏚️", "😴"],
          img: "highway",
        },
        {
          type: "mc",
          q: "A bigger M number means ___",
          opts: ["a stronger earthquake", "a weaker earthquake"],
          two: true,
          emoji: "📈",
        },
      ],
    },
    {
      k: "order",
      t: "How a tsunami happens",
      en: "Put it in order",
      ic: "🌊",
      items: [
        {
          type: "order",
          t: "A [tsunami]",
          ask: "Put the steps of a tsunami in order.",
          hint: "The earthquake comes first.",
          steps: [
            { say: "An earthquake under the ocean", e: "💥" },
            { say: "The seafloor moves the water", e: "🌊" },
            { say: "Huge waves move in all directions", img: "tsunami" },
            { say: "The waves get taller at the coast", e: "⬆️" },
            { say: "The water floods the land", e: "🏘️" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "san-andreas", label: "Fault" },
            { img: "buoy", label: "Tsunami warning buoy" },
            { img: "volcano", label: "Eruption" },
            { img: "house-damage", label: "Earthquake damage" },
          ],
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
          q: "How might a volcano affect people who live near it?",
          a: "Lava and hot ash can [burn] homes. Ash makes it hard to [breathe]. Mud rivers can destroy towns.",
          img: "volcano-town",
        },
        {
          type: "open",
          q: "How can an earthquake affect people?",
          a: "Buildings, roads and bridges can [break]. Fires can start. It can cause a [tsunami].",
          img: "house-damage",
        },
        {
          type: "open",
          q: "What causes an earthquake?",
          a: "Plates move and [stress] builds up along a [fault]. When it is released, the ground shakes.",
          img: "slide-past",
        },
        {
          type: "open",
          q: "Why do scientists watch earthquakes to help warn about tsunamis?",
          a: "Earthquakes under the ocean [cause] tsunamis. A warning gives people time to [move away].",
          img: "buoy",
        },
        {
          type: "open",
          q: "How could a school reduce damage from an M5 earthquake?",
          a: "Fix shelves and pictures to the [walls], practice [earthquake drills], build [strong] walls.",
          emoji: "🏫 🧱",
        },
        {
          type: "open",
          q: "A volcano near a city may erupt. Name two problems and two ways to help.",
          a: "Problems: [ash] makes breathing hard, roofs [collapse]. Help: wear [masks], make strong roofs, [leave] the city.",
          img: "volcano",
        },
        {
          type: "open",
          q: "What might you see in a town near an erupting volcano?",
          a: "[Ash] everywhere, smoke in the sky, lava, damaged buildings.",
          img: "volcano-town",
        },
      ],
    },
  ],
};
