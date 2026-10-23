// Science · Grade 4 · Topic 2 · Lesson 2 « Nonrenewable Energy Sources » (book pages 64–73).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 2,
  key: "sci4-t2-l2",
  grade: 4,
  title: "Nonrenewable Energy Sources",
  unit: "Topic 2 · Lesson 2",
  book: "Book pages 64–73",
  cover: "oil-rigs",
  question: {
    q: "Where do [fossil fuels] come from? Why will they [run out]?",
    a: "They formed from [ancient plants and animals] over [millions of years]. We use them much faster, so they are [nonrenewable].",
    img: "oil-rigs",
  },
  // the book's vocabulary + academic vocabulary (page 64)
  words: [
    { w: "Nonrenewable", m: "cannot be replaced fast: one day it runs out" },
    {
      w: "Fossil fuel",
      m: "a fuel made from plants and animals that died long ago",
    },
    { w: "Coal", m: "a hard black fossil fuel, from old swamp plants" },
    { w: "Petroleum", m: "a liquid fossil fuel: oil" },
    { w: "Natural gas", m: "a fossil fuel that is a gas" },
    {
      w: "Nuclear fuel",
      m: "a fuel that makes heat when its tiny particles split",
    },
    { w: "Uranium", m: "the nuclear fuel, found in rocks" },
    { w: "Outcome", m: "a result" },
  ],

  ideas: [
    {
      t: "Nonrenewable",
      lines: [
        "Some energy sources take [millions of years] to form.",
        "We use them up much [faster].",
        "They are [nonrenewable]: one day they [run out].",
      ],
      vis: { kind: "emoji", e: "⛏️ ⏳ ❌" },
    },
    {
      t: "Fossil fuels",
      lines: [
        "[Fossil fuels] formed underground from [ancient plants and animals].",
        "The three main fossil fuels: [coal], [petroleum] (oil) and [natural gas].",
        "They burn and give [heat] and [light].",
      ],
      vis: { kind: "emoji", e: "⛏️ 🛢️ 🔥" },
    },
    {
      t: "A bad outcome: pollution",
      lines: [
        "Burning fossil fuels can [harm] the environment.",
        "It makes [air pollution] and [acid] rivers and lakes.",
      ],
      vis: { kind: "emoji", e: "🏭 💨 🌫️" },
    },
    {
      t: "How coal forms",
      lines: [
        "Long ago, plants in [swamps] died and sank.",
        "Layers were covered by soil and rock.",
        "Heat and pressure changed them into hard black [coal]. It took more than [10 million years].",
      ],
      img: "coal-forms",
    },
    {
      t: "Digging coal",
      lines: [
        "People dig coal out of [mines].",
        "Big trucks carry it.",
        "When coal is used up, [no new coal] replaces it.",
      ],
      img: "coal-truck",
    },
    {
      t: "The canary in the mine",
      lines: [
        "Long ago, miners took a [canary] bird into the mine.",
        "If a poison gas was there, the bird [stopped singing].",
        "Then the miners left [quickly]. Today they use electronic detectors.",
      ],
      img: "canary-mine",
    },
    {
      t: "How petroleum forms",
      lines: [
        "Tiny [ocean] plants and animals died and fell to the bottom.",
        "Sand and mud covered them. Over a long time they became [oil] and [natural gas].",
        "Today the oil fills tiny holes in rock [deep underground].",
      ],
      img: "petroleum-forms",
    },
    {
      t: "Petroleum (oil)",
      lines: [
        "[Petroleum] is a [liquid] fossil fuel: oil.",
        "Oil rigs pump it out of the ground.",
        "We make [gasoline], [diesel], [plastics] and medicines from it.",
      ],
      img: "oil-rigs",
    },
    {
      t: "Natural gas",
      lines: [
        "[Natural gas] is a fossil fuel that is a [gas].",
        "Pipes bring it to homes for [heating] and [cooking].",
        "It is stored in strong [round tanks].",
      ],
      img: "gas-tanks",
    },
    {
      t: "Nuclear fuel",
      lines: [
        "[Nuclear] power plants use [uranium], found in rocks.",
        "Uranium is [not burned]: its tiny particles [split] and make heat.",
        "Heat → steam → turbine → generator → [electricity].",
      ],
      img: "nuclear-plant",
    },
    {
      t: "They will run out",
      lines: [
        "[Coal], [petroleum], [natural gas] and [uranium] are nonrenewable.",
        "There is only a [limited] amount. One day they [run out].",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "coal-truck", label: "Coal" },
          { img: "oil-rigs", label: "Petroleum" },
          { img: "gas-tanks", label: "Natural gas" },
          { img: "nuclear-plant", label: "Uranium" },
        ],
      },
    },
  ],

  games: [
    {
      k: "which",
      t: "Which fuel?",
      en: "Coal, petroleum, natural gas, uranium",
      ic: "⛏️",
      items: [
        ["A hard black rock, made from old swamp plants.", 0],
        ["A liquid. We make gasoline from it.", 1],
        ["A gas. We use it to cook and heat homes.", 2],
        ["It is not burned: its particles split to make heat.", 3],
        ["It is stored in strong round tanks.", 2],
        ["Oil rigs pump it out of the ground.", 1],
        ["People dig it out of mines with big trucks.", 0],
      ].map(([q, k]) => {
        const all = [
          ["Coal", "coal-truck"],
          ["Petroleum", "oil-rigs"],
          ["Natural gas", "gas-tanks"],
          ["Uranium", "nuclear-plant"],
        ];
        const o = [all[k], ...all.filter((_, i) => i !== k)]; // the right one first
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          pics: o.map((x) => x[1]),
        };
      }),
    },
    {
      k: "renew",
      t: "Will it run out?",
      en: "Nonrenewable or renewable",
      ic: "⏳",
      items: [
        ["Coal", true, "⛏️"],
        ["Petroleum (oil)", true, "🛢️"],
        ["Natural gas", true, "🔥"],
        ["Uranium", true, "☢️"],
        ["Sunlight", false, "☀️"],
        ["Wind", false, "🌬️"],
        ["Moving water", false, "🌊"],
      ].map(([t, non, e]) => ({
        type: "mc",
        q: `[${t}]: will it run out?`,
        opts: non
          ? ["Nonrenewable: it runs out", "Renewable: it does not"]
          : ["Renewable: it does not", "Nonrenewable: it runs out"],
        icons: non ? ["⏳", "♻️"] : ["♻️", "⏳"],
        two: true,
        emoji: e,
      })),
    },
    {
      k: "order",
      t: "How did it form?",
      en: "Put it in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "How [coal] forms",
          ask: "Put the steps of how coal forms in order.",
          hint: "The plants grow first.",
          steps: [
            { say: "Plants grow in swamps", e: "🌳" },
            { say: "The plants die and sink", e: "🍂" },
            { say: "Soil and rock cover the layers", e: "🪨" },
            { say: "Heat and pressure, 10 million years", e: "⏳" },
            { say: "Coal", img: "coal-truck" },
          ],
        },
        {
          type: "order",
          t: "How [petroleum] forms",
          ask: "Put the steps of how petroleum forms in order.",
          hint: "Tiny ocean living things first.",
          steps: [
            { say: "Tiny ocean plants and animals die", e: "🦠" },
            { say: "They fall to the bottom", e: "⬇️" },
            { say: "Sand and mud cover them", e: "🏖️" },
            { say: "They become oil and natural gas", img: "oil-rigs" },
          ],
        },
        {
          type: "order",
          t: "A [nuclear] power plant",
          ask: "Put the steps of the nuclear power plant in order.",
          hint: "The uranium is mined first.",
          steps: [
            { say: "Uranium is dug out of rocks", e: "⛏️" },
            { say: "Its particles split: heat", e: "🔥" },
            { say: "Steam turns the turbine", e: "🌀" },
            { say: "The generator makes electricity", e: "⚡" },
          ],
        },
      ],
    },
    {
      k: "uses",
      t: "What do we use them for?",
      en: "Choose all",
      ic: "🛠️",
      items: [
        {
          type: "multi",
          q: "What do we make from [petroleum]? (choose all)",
          opts: [
            { t: "Gasoline", emoji: "⛽", ok: true },
            { t: "Plastics", emoji: "🧴", ok: true },
            { t: "Medicines", emoji: "💊", ok: true },
            { t: "Wood", emoji: "🪵" },
            { t: "Water", emoji: "💧" },
          ],
        },
        {
          type: "multi",
          q: "What do we use [natural gas] for at home? (choose all)",
          opts: [
            { t: "Cooking", emoji: "🍳", ok: true },
            { t: "Heating", emoji: "🔥", ok: true },
            { t: "Hot water", emoji: "🚿", ok: true },
            { t: "Drinking", emoji: "🥤" },
          ],
        },
        {
          type: "multi",
          q: "Which ones are [fossil fuels]? (choose all)",
          opts: [
            { t: "Coal", img: "coal-truck", ok: true },
            { t: "Petroleum", img: "oil-rigs", ok: true },
            { t: "Natural gas", img: "gas-tanks", ok: true },
            { t: "Sunlight", emoji: "☀️" },
            { t: "Wind", emoji: "🌬️" },
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
          q: "What are some examples of nonrenewable energy sources?",
          a: "[Coal], [petroleum], [natural gas] and [uranium].",
          emoji: "⛏️ 🛢️ 🔥 ☢️",
        },
        {
          type: "open",
          q: "What are three ways that people use natural resources?",
          a: "To make [electricity], to fuel [cars], to [heat] and [cook] in homes, to make [plastics] and medicines.",
          emoji: "⚡ 🚗 🍳",
        },
        {
          type: "open",
          q: "Carbon from coal and oxygen from the air make a poison gas. What process makes the gas?",
          a: "[Combustion]: burning the coal.",
          img: "canary-mine",
        },
        {
          type: "open",
          q: "What do you think would happen if coal did not form?",
          a: "We would [not have coal] to burn for heat and electricity.",
          img: "coal-forms",
        },
        {
          type: "open",
          q: "Why do you think coal and petroleum are different?",
          a: "They formed from [different] living things: coal from [swamp plants], petroleum from tiny [ocean] plants and animals.",
          img: "petroleum-forms",
        },
        {
          type: "open",
          q: "Oil rigs drill and pump petroleum out of the ground. How might this affect the environment?",
          a: "Oil can [spill] and [pollute] the land and water, and harm animals.",
          img: "oil-rigs",
        },
        {
          type: "open",
          q: "The energy of fossil fuels first came from the sun. How does the energy of a moving person also come from the sun?",
          a: "We eat [food] from plants. The plants got their energy from the [sun].",
          emoji: "☀️ 🌱 🍎 🏃",
        },
      ],
    },
  ],
};
