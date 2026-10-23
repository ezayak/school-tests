// Science · Grade 4 · Topic 2 · Lesson 4 « Environmental Impacts of Energy Use » (book pages 84–91).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 4,
  key: "sci4-t2-l4",
  grade: 4,
  title: "Environmental Impacts of Energy Use",
  unit: "Topic 2 · Lesson 4",
  book: "Book pages 84–91",
  cover: "ecosystems",
  question: {
    q: "How does using energy [harm] the environment? How can we [help]?",
    a: "Getting, carrying and burning fuels can [pollute] air, water and land and destroy [habitats]. [Scrubbers], cooling towers and [renewable] energy help.",
    img: "ecosystems",
  },
  // the book's vocabulary + academic vocabulary (page 84)
  words: [
    { w: "Impact", m: "an effect, a result" },
    { w: "Emission", m: "something released into the air, water or land" },
    { w: "Pollutant", m: "a harmful substance" },
    { w: "Scrubber", m: "cleans the gases before they go into the air" },
    {
      w: "Greenhouse gas",
      m: "a gas that keeps heat in the air, like carbon dioxide",
    },
    { w: "Habitat", m: "the home of plants and animals" },
    { w: "Acid rain", m: "rain made harmful by pollution" },
  ],

  ideas: [
    {
      t: "Energy use has impacts",
      lines: [
        "Using energy has [impacts] (effects) on the environment.",
        "When we [build], [dig], [carry] or [burn] for energy.",
      ],
      img: "ecosystems",
    },
    {
      t: "Emissions and pollutants",
      lines: [
        "[Emissions]: things released into the air, water or land.",
        "A [pollutant] is a harmful substance.",
        "It can poison the land, the water and the air.",
      ],
      img: "smokestack",
    },
    {
      t: "Acid rain",
      lines: [
        "Burning fossil fuels makes [ash] and harmful chemicals.",
        "Some of them make rain into an [acid].",
        "Acid in lakes and streams harms [fish] and plants.",
      ],
      vis: { kind: "emoji", e: "🏭 🌧️ 🐟" },
    },
    {
      t: "Scrubbers",
      lines: [
        "Power plants use [scrubbers].",
        "The gases pass through the scrubber: [less pollution] goes into the air.",
      ],
      vis: { kind: "emoji", e: "🏭 🧽 💨" },
    },
    {
      t: "Greenhouse gases",
      lines: [
        "Burning always makes [carbon dioxide], a [greenhouse gas].",
        "It keeps [heat] in the air.",
        "Fossil-fuel power plants make a lot of it.",
      ],
      img: "coal-plant",
    },
    {
      t: "Cooling towers",
      lines: [
        "The white “smoke” from tall towers is [water vapor]: a cloud!",
        "The towers cool the hot water, so it is [not dumped] into rivers.",
        "Very hot water would harm the fish.",
      ],
      img: "towers",
    },
    {
      t: "Nuclear power",
      lines: [
        "Nuclear power plants make [no air pollution].",
        "But their [waste] stays dangerous for thousands of years.",
        "They also make a lot of hot water.",
      ],
      vis: { kind: "emoji", e: "☢️ ⚠️" },
    },
    {
      t: "Mining",
      lines: [
        "Coal and uranium are [mined] (dug out).",
        "Forests and fields are removed: the land [changes].",
        "Plants and animals lose their [habitat].",
      ],
      img: "mine",
    },
    {
      t: "Drilling",
      lines: [
        "Drillers make roads and [cut down forests].",
        "Some drilling uses [toxic] (poison) materials.",
        "They can spill and pollute the land and water.",
      ],
      vis: { kind: "emoji", e: "🛢️ 🌲 ❌" },
    },
    {
      t: "Damage to ecosystems",
      lines: [
        "Disturbed land can pollute [streams and rivers].",
        "Roads break up [habitats].",
        "[Dams] can damage stream habitats.",
      ],
      img: "dam-habitat",
    },
    {
      t: "Oil spills",
      lines: [
        "Pipes and ships carry oil and gas.",
        "A leak or a ship crash can [spill] oil.",
        "Oil is very [sticky]. It is very hard to clean up.",
      ],
      img: "oil-spill",
    },
    {
      t: "No fuel, less harm",
      lines: [
        "Energy sources that use [no fuel], like sun and wind, have a [smaller] impact.",
        "There is nothing to mine, carry or burn.",
      ],
      vis: { kind: "emoji", e: "☀️ 🌬️ 🌿" },
    },
  ],

  games: [
    {
      k: "harm",
      t: "What is the harm?",
      en: "Impacts of energy use",
      ic: "⚠️",
      items: [
        {
          type: "mc",
          q: "Burning coal in a power plant.",
          opts: ["Air pollution", "An oil spill", "No harm"],
          icons: ["🌫️", "🛢️", "✅"],
          img: "coal-plant",
        },
        {
          type: "mc",
          q: "An oil ship crashes.",
          opts: ["Oil spills in the ocean", "Acid rain", "No harm"],
          icons: ["🛢️", "🌧️", "✅"],
          emoji: "🚢 💥",
        },
        {
          type: "mc",
          q: "A big surface mine.",
          opts: ["Animals lose their home", "The air gets cleaner", "No harm"],
          icons: ["🦊", "🌿", "✅"],
          img: "surface-mine",
        },
        {
          type: "mc",
          q: "Building a dam.",
          opts: [
            "Stream habitats are damaged",
            "More fish everywhere",
            "No harm",
          ],
          icons: ["🐟", "🐠", "✅"],
          img: "dam-habitat",
        },
        {
          type: "mc",
          q: "A nuclear power plant.",
          opts: [
            "Dangerous waste for a very long time",
            "Smoke and ash",
            "No harm",
          ],
          icons: ["☢️", "🌫️", "✅"],
          emoji: "☢️",
        },
        {
          type: "mc",
          q: "Roads through a forest for drilling.",
          opts: ["Habitats are broken up", "More trees grow", "No harm"],
          icons: ["🛣️", "🌲", "✅"],
          emoji: "🛣️ 🌲",
        },
        {
          type: "mc",
          q: "Very hot water dumped into a river.",
          opts: ["Fish are harmed", "The river gets cleaner", "No harm"],
          icons: ["🐟", "💧", "✅"],
          emoji: "♨️ 🐟",
        },
      ],
    },
    {
      k: "help",
      t: "Helps or harms?",
      en: "Good or bad for the environment",
      ic: "🌿",
      items: [
        ["A scrubber in the power plant", true, "🏭 🧽"],
        ["A cooling tower cools the hot water", true, "towers"],
        ["Solar cells make electricity", true, "☀️ 🔌"],
        ["Wind turbines make electricity", true, "🌬️"],
        ["An oil pipe leaks", false, "🛢️ 💧"],
        ["Cutting down a forest to drill for oil", false, "🌲 🪓"],
        ["Acid rain falls into a lake", false, "🌧️ 🐟"],
      ].map(([q, good, p]) => ({
        type: "mc",
        q,
        opts: good ? ["Helps", "Harms"] : ["Harms", "Helps"],
        icons: good ? ["🌿", "⚠️"] : ["⚠️", "🌿"],
        two: true,
        // a picture name has no emoji in it
        ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
      })),
    },
    {
      k: "pics",
      t: "Pictures and words",
      en: "Match",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "smokestack", label: "Pollution in the air" },
            { img: "oil-spill", label: "An oil spill" },
            { img: "mine", label: "Mining changes the land" },
            { img: "towers", label: "Cooling towers: water vapor" },
          ],
        },
        {
          type: "multi",
          q: "Which ones make [carbon dioxide], a greenhouse gas? (choose all)",
          opts: [
            { t: "A coal power plant", img: "coal-plant", ok: true },
            { t: "A car with gasoline", emoji: "🚗", ok: true },
            { t: "A wind turbine", emoji: "🌬️" },
            { t: "Solar cells", emoji: "☀️" },
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
          q: "What are two ways that power plants can affect the environment?",
          a: "They [pollute the air] (ash, acid rain, carbon dioxide) and can make rivers [too hot].",
          img: "smokestack",
        },
        {
          type: "open",
          q: "How do scrubbers help to reduce pollution?",
          a: "The gases pass through the scrubber. It [traps the pollutants] before they go into the air.",
          emoji: "🏭 🧽 💨",
        },
        {
          type: "open",
          q: "What could happen if a power plant dumps hot water into a river? Should it be allowed?",
          a: "Fish and plants could [die]. It should [not] be allowed.",
          img: "towers",
        },
        {
          type: "open",
          q: "Name two harmful effects of getting fuel out of the ground.",
          a: "Forests are [cut down] and the land [changes]. Toxic materials can [pollute] the land and water.",
          img: "mine",
        },
        {
          type: "open",
          q: "Why does an energy source that does not use fuel have a smaller impact?",
          a: "There is nothing to [mine], [carry] or [burn], so there is less pollution.",
          emoji: "☀️ 🌬️ 🌿",
        },
        {
          type: "open",
          q: "What is one harmful effect of the oil spill in the photo?",
          a: "Oil covers [birds] and [fish] and can kill them. The beach and the water are [polluted].",
          img: "oil-spill",
        },
        {
          type: "open",
          q: "Oil lab: why is oil hard to separate from sand?",
          a: "Oil is very [sticky]. It covers every grain of sand.",
          emoji: "🛢️ 🏖️",
        },
        {
          type: "open",
          q: "Which is more reliable about energy and the environment: a government website or an oil company website? Why?",
          a: "A [government] website. An oil company may want to make oil look good.",
          emoji: "🏛️ 🛢️ 💻",
        },
      ],
    },
  ],
};
