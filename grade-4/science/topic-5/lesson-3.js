// Science · Grade 4 · Topic 5 · Lesson 3 « Impacts of Natural Hazards » (book pages 226–234).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 3,
  key: "sci4-t5-l3",
  grade: 4,
  title: "Impacts of Natural Hazards",
  unit: "Topic 5 · Lesson 3",
  book: "Book pages 226–234",
  cover: "st-helens-after",
  question: {
    q: "How do natural hazards [affect] people? How can we [reduce] the harm?",
    a: "Hazards can destroy [homes], [crops] and [land]. Strong [buildings], [warnings], [shelters] and help after the hazard reduce the harm.",
    img: "relief",
  },
  // the book's vocabulary + academic vocabulary (page 226) + words of the lesson
  words: [
    { w: "Wildfire", m: "a fire that burns out of control" },
    { w: "Potential", m: "possible, could happen" },
    { w: "Short-term", m: "right away, for a short time" },
    { w: "Long-term", m: "for a long time" },
    { w: "Shelter", m: "a safe place to stay" },
    { w: "Predict", m: "to say what will happen before it happens" },
  ],

  ideas: [
    {
      t: "Strong buildings",
      lines: [
        "Engineers design buildings that [bend] in an earthquake.",
        "Some sit on big [rubber] pads. Some have strong [cross braces] outside.",
      ],
      img: "braced-building",
    },
    {
      t: "Drought: short-term effects",
      lines: [
        "A drought causes [loss of crops] and soil [erosion].",
        "It is hard to feed farm animals.",
        "Planting grasses and trees helps the soil.",
      ],
      vis: { kind: "emoji", e: "☀️ 🌾 🐄" },
    },
    {
      t: "Wildfires",
      lines: [
        "Dry forests can catch fire from [lightning]: a [wildfire].",
        "People must [leave] their homes.",
        "The land recovers quickly: ash feeds the soil and grass grows back.",
      ],
      img: "wildfire",
    },
    {
      t: "Volcanoes: long-term effects",
      lines: [
        "Lava, ash and rock cover the land.",
        "Plants and animals die.",
        "Recovery is [very slow].",
      ],
      img: "st-helens-after",
    },
    {
      t: "30 years later",
      lines: [
        "Mount St. Helens took [more than 30 years] to recover.",
        "A new lake formed. Grass and shrubs grow. Trees take longer.",
      ],
      img: "st-helens-later",
    },
    {
      t: "Predicting hazards",
      lines: [
        "Satellites track [hurricanes]. Scientists can [warn] people.",
        "They watch magma under [volcanoes].",
        "But [earthquakes] cannot be predicted.",
      ],
      img: "hurricane-path",
    },
    {
      t: "When hazards strike",
      lines: [
        "We cannot stop natural hazards, so we must be [prepared].",
        "Cities put [salt] on icy roads. [Shelters] keep people safe.",
        "People get food, clothes, clean water and a place to stay.",
      ],
      img: "relief",
    },
  ],

  games: [
    {
      k: "help",
      t: "What helps?",
      en: "Solutions to hazards",
      ic: "🛟",
      items: [
        [
          "Earthquakes",
          "Buildings that bend, with strong braces",
          "braced-building",
        ],
        ["Icy winter roads", "Put salt on the roads", "🧊 🛣️"],
        [
          "A hurricane is coming",
          "Warn people early with satellites",
          "hurricane-path",
        ],
        [
          "Families lost their homes",
          "Shelters with food, clothes and water",
          "relief",
        ],
        ["Rain washes soil away in a drought", "Plant grasses and trees", "🌱"],
      ].map(([t, a, p], i, all) => ({
        type: "mc",
        q: `[${t}]: what helps?`,
        opts: [a, all[(i + 2) % all.length][1]],
        ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
      })),
    },
    {
      k: "predict",
      t: "Can scientists predict it?",
      en: "Warnings",
      ic: "📡",
      items: [
        ["A hurricane", true, "hurricane-path"],
        ["A volcano eruption", true, "st-helens-after"],
        ["An earthquake", false, "🏚️"],
      ].map(([t, yes, p]) => ({
        type: "mc",
        q: `[${t}]: can scientists predict it?`,
        opts: yes
          ? ["Yes, they can warn people", "No"]
          : ["No, not yet", "Yes"],
        icons: yes ? ["📡", "❓"] : ["❓", "📡"],
        two: true,
        ...(/^[a-z-]+$/.test(p) ? { img: p } : { emoji: p }),
      })),
    },
    {
      k: "time",
      t: "Fast or slow recovery?",
      en: "Short-term and long-term",
      ic: "⏳",
      items: [
        {
          type: "mc",
          q: "After a wildfire, grass grows back ___",
          opts: ["quickly", "never"],
          two: true,
          img: "wildfire",
        },
        {
          type: "mc",
          q: "After a volcano, the land recovers ___",
          opts: ["very slowly", "in one day"],
          two: true,
          img: "st-helens-later",
        },
        {
          type: "mc",
          q: "Mount St. Helens took more than ___ years to recover.",
          opts: ["30", "3", "300"],
          img: "st-helens-later",
        },
        {
          type: "order",
          t: "After a [volcano]",
          ask: "Put the steps after a volcano erupts in order.",
          hint: "The eruption comes first.",
          steps: [
            { say: "The volcano erupts", img: "st-helens-after" },
            { say: "Ash covers the land; plants die", e: "🌫️" },
            { say: "Grass and shrubs grow back", e: "🌱" },
            { say: "Trees grow, many years later", img: "st-helens-later" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "check",
      t: "Book questions",
      en: "Lesson 3 Check and more",
      ic: "📕",
      from: "Book · Lesson 3",
      items: [
        {
          type: "open",
          q: "Name two solutions that reduce the harm of natural hazards.",
          a: "[Strong buildings] that bend in earthquakes, and [warnings] before hurricanes. Also [shelters] and salt on icy roads.",
          img: "braced-building",
        },
        {
          type: "open",
          q: "Choose a natural hazard. Name two ways it can harm people.",
          a: "A flood: it [destroys homes] and makes the water [dirty]. A wildfire: people must [leave], and the smoke is bad to breathe.",
          img: "wildfire",
        },
        {
          type: "open",
          q: "Why does it take so long for land to recover after a volcano?",
          a: "Thick [ash] and [lava rock] cover the land. Plants must grow again slowly.",
          img: "st-helens-later",
        },
        {
          type: "open",
          q: "How does predicting dangerous weather help protect people?",
          a: "People get a [warning] and have time to [prepare] or [leave].",
          img: "hurricane-path",
        },
        {
          type: "open",
          q: "Rocks and soil fall onto a road every time it rains a lot. Give two ideas to stop this.",
          a: "Build a [wall] along the hill. [Plant] trees and grass to hold the soil.",
          emoji: "⛰️ 🪨 🛣️",
        },
        {
          type: "open",
          q: "What could be one good effect of a volcano erupting?",
          a: "Ash makes the soil [rich] for plants, and lava makes [new land].",
          img: "st-helens-after",
        },
        {
          type: "open",
          q: "How would you make a building safer from natural hazards?",
          a: "Use [strong] materials and braces, build it to [bend] in earthquakes, and build away from rivers and steep hills.",
          img: "braced-building",
        },
      ],
    },
  ],
};
