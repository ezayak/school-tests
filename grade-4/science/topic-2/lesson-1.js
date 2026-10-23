// Science · Grade 4 · Topic 2 · Lesson 1 « Energy Conversions » (book pages 56–63).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 1,
  key: "sci4-t2-l1",
  grade: 4,
  title: "Energy Conversions",
  unit: "Topic 2 · Lesson 1",
  book: "Book pages 56–63",
  cover: "power-plant",
  question: {
    q: "How do we change [natural resources] into [energy] we can use?",
    a: "We burn [fuels] or use [batteries]. A power plant changes [chemical energy] into [electrical energy].",
    img: "power-plant",
  },
  // the book's vocabulary + academic vocabulary (page 56)
  words: [
    { w: "Fuel", m: "a material that gives off heat when it burns" },
    { w: "Combustion", m: "burning a fuel to make heat and light" },
    { w: "Turbine", m: "a machine that spins: heat becomes motion" },
    { w: "Generator", m: "a machine that changes motion into electricity" },
    {
      w: "Battery",
      m: "stores chemical energy and changes it into electricity",
    },
    { w: "Device", m: "something made for a special job" },
    { w: "Primary", m: "first, original" },
  ],

  ideas: [
    {
      t: "We use a lot of energy",
      lines: [
        "We use energy to [heat] and [light] buildings.",
        "We use it for tools, cars and [devices].",
        "A [device] is made for a special job, like a phone.",
      ],
      img: "city",
    },
    {
      t: "Electricity comes from other energy",
      lines: [
        "Devices that plug into the wall need [electrical energy].",
        "It is made by [changing] another form of energy.",
      ],
      vis: { kind: "emoji", e: "🔌 ⚡" },
    },
    {
      t: "Fuels",
      lines: [
        "A [fuel] gives off [heat] when it burns.",
        "[Coal], [natural gas], [oil] (petroleum) and [wood] are fuels.",
      ],
      vis: { kind: "emoji", e: "🪵 ⛽ 🔥" },
    },
    {
      t: "Combustion",
      lines: [
        "[Combustion]: burning a fuel to make [heat] and [light].",
        "The fuel mixes with [oxygen] from the air.",
        "The stored [chemical energy] comes out.",
      ],
      img: "candles",
    },
    {
      t: "The sun comes first",
      lines: [
        "The [primary] (first) source of energy of most fuels is the [sun].",
        "Plants store the sun's energy, like in wood.",
        "Coal, oil and gas formed from old plants and animals, underground, over a [very long time].",
      ],
      vis: { kind: "emoji", e: "☀️ 🌳 ⏳ ⛏️" },
    },
    {
      t: "Fuel in a car",
      lines: [
        "In the engine, gasoline and air [burn].",
        "Chemical energy → [heat]. Hot gases push the engine parts: the car [moves].",
        "After a long drive the car hood feels [hot].",
      ],
      vis: { kind: "emoji", e: "⛽ 🔥 🚗" },
    },
    {
      t: "Power plant: the boiler",
      lines: [
        "Coal burns in the [boiler].",
        "Chemical energy → [heat]. The heat turns water into [steam].",
      ],
      img: "boiler",
    },
    {
      t: "Power plant: the turbine",
      lines: [
        "The hot steam flows through the [turbine].",
        "The turbine [spins]: heat → [energy of motion].",
      ],
      img: "turbine",
    },
    {
      t: "Power plant: the generator",
      lines: [
        "The turbine turns the [generator].",
        "Inside, a [magnet] spins in a coil of copper wire.",
        "Motion → [electrical energy].",
      ],
      img: "generator",
    },
    {
      t: "Power plant: the cooling tower",
      lines: [
        "The steam cools down in the [cooling tower].",
        "It becomes [liquid water] again.",
      ],
      img: "cooling-tower",
    },
    {
      t: "The whole power plant",
      lines: [
        "Coal → boiler → turbine → generator → wires to our homes.",
        "[Chemical] → [heat] → [motion] → [electrical] energy.",
      ],
      img: "power-plant",
    },
    {
      t: "Batteries",
      lines: [
        "A [battery] stores [chemical energy].",
        "It changes it into [electrical energy]. No burning!",
        "Phones, flashlights and computers use batteries.",
      ],
      img: "batteries",
    },
    {
      t: "New cars",
      lines: [
        "Most cars use [gasoline].",
        "[Hybrid] cars use gasoline and electricity. [Electric] cars use only batteries.",
        "A [solar car] charges its batteries with [sunlight].",
      ],
      img: "solar-car",
    },
  ],

  games: [
    {
      k: "plant",
      t: "The power plant",
      en: "Put it in order",
      ic: "🏭",
      items: [
        {
          type: "order",
          t: "How a [power plant] makes electricity",
          ask: "Put the parts of the power plant in order.",
          hint: "The coal burns first.",
          steps: [
            { say: "Coal burns in the boiler", img: "boiler" },
            { say: "Steam spins the turbine", img: "turbine" },
            { say: "The turbine turns the generator", img: "generator" },
            { say: "Electricity goes to our homes", e: "🏠" },
          ],
        },
        {
          type: "order",
          t: "The energy changes",
          ask: "Put the energy changes of the power plant in order.",
          hint: "Start with the coal.",
          steps: [
            { say: "Chemical energy (coal)", e: "⛏️" },
            { say: "Heat (steam)", e: "♨️" },
            { say: "Motion (the turbine spins)", e: "🌀" },
            { say: "Electrical energy", e: "⚡" },
          ],
        },
        {
          type: "order",
          t: "Where the energy of coal came from",
          ask: "Put the story of coal in order.",
          hint: "It starts with the sun.",
          steps: [
            { say: "The sun", e: "☀️" },
            { say: "Plants grow with sunlight", e: "🌳" },
            { say: "Old plants stay underground a very long time", e: "⏳" },
            { say: "Coal", e: "⛏️" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "boiler", label: "Boiler: burns coal, makes steam" },
            { img: "turbine", label: "Turbine: spins" },
            { img: "generator", label: "Generator: makes electricity" },
            {
              img: "cooling-tower",
              label: "Cooling tower: steam becomes water",
            },
          ],
        },
      ],
    },
    {
      k: "fuel",
      t: "Fuel or not?",
      en: "Does it burn and give heat?",
      ic: "🔥",
      items: [
        ["Coal", true, "⛏️"],
        ["Wood", true, "🪵"],
        ["Natural gas", true, "🔥"],
        ["Gasoline (oil)", true, "⛽"],
        ["Water", false, "💧"],
        ["Sand", false, "🏖️"],
        ["Glass", false, "🥛"],
      ].map(([t, f, e]) => ({
        type: "mc",
        q: `[${t}]: is it a fuel?`,
        opts: f ? ["Fuel", "Not a fuel"] : ["Not a fuel", "Fuel"],
        icons: f ? ["🔥", "🚫"] : ["🚫", "🔥"],
        two: true,
        emoji: e,
      })),
    },
    {
      k: "change",
      t: "Which energy change?",
      en: "From … to …",
      ic: "🔄",
      items: [
        {
          type: "mc",
          q: "A battery in a flashlight",
          opts: [
            "chemical → electrical",
            "electrical → chemical",
            "sound → light",
          ],
          img: "batteries",
        },
        {
          type: "mc",
          q: "The generator",
          opts: ["motion → electrical", "electrical → motion", "heat → sound"],
          img: "generator",
        },
        {
          type: "mc",
          q: "The turbine",
          opts: ["heat → motion", "motion → heat", "light → sound"],
          img: "turbine",
        },
        {
          type: "mc",
          q: "The boiler",
          opts: ["chemical → heat", "heat → chemical", "electrical → sound"],
          img: "boiler",
        },
        {
          type: "mc",
          q: "A car engine",
          opts: [
            "chemical → heat → motion",
            "motion → chemical",
            "light → heat",
          ],
          emoji: "🚗",
        },
        {
          type: "mc",
          q: "The solar panels on the solar car",
          opts: ["light → electrical", "electrical → light", "sound → motion"],
          img: "solar-car",
        },
        {
          type: "mc",
          q: "A burning candle",
          opts: [
            "chemical → heat and light",
            "light → chemical",
            "sound → heat",
          ],
          img: "candles",
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
          q: "Why is it correct to say that the sun is the primary source of most of the electricity we use?",
          a: "Most electricity comes from burning [fuels]. The energy in fuels first came from the [sun]: plants stored the sunlight.",
          emoji: "☀️ 🌳 ⚡",
        },
        {
          type: "open",
          q: "A car uses fuel to move. What energy changes happen?",
          a: "[Chemical] energy in the gasoline → [heat] → [motion] (kinetic energy).",
          emoji: "⛽ 🚗",
        },
        {
          type: "open",
          q: "Where might the chemical energy to make electric current be stored?",
          a: "In a [battery], or in a [fuel] like coal.",
          img: "batteries",
        },
        {
          type: "open",
          q: "Label the power plant: what energy change happens in the boiler, the turbine and the generator?",
          a: "Boiler: chemical → [heat]. Turbine: heat → [motion]. Generator: motion → [electrical].",
          img: "power-plant",
        },
        {
          type: "open",
          q: "Why might a solar car have trouble traveling at night?",
          a: "There is [no sunlight] at night, so the solar panels cannot charge the batteries. Idea: charge the batteries during the day.",
          img: "solar-car",
        },
        {
          type: "open",
          q: "Potato lab: how do you know that a change in energy happened in the circuit?",
          a: "The LED bulb [lit up]. Chemical energy in the potato changed into [electrical] energy, then into [light].",
          emoji: "🥔 💡",
        },
      ],
    },
  ],
};
