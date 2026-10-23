// Science · Grade 4 · Topic 2 · Lesson 3 « Renewable Energy Sources » (book pages 74–81).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
const SOURCES = [
  ["Solar energy", "solar-roof"],
  ["Wind energy", "wind"],
  ["Hydropower", "dam"],
  ["Geothermal energy", "geothermal"],
  ["Biomass", "biomass"],
];
window.LESSON = {
  n: 3,
  key: "sci4-t2-l3",
  grade: 4,
  title: "Renewable Energy Sources",
  unit: "Topic 2 · Lesson 3",
  book: "Book pages 74–81",
  cover: "renewable-all",
  question: {
    q: "Which energy sources do [not run out]?",
    a: "[Renewable] sources: the [sun], the [wind], moving [water], the Earth's [heat], and [plants] we can grow again.",
    img: "renewable-all",
  },
  // the book's vocabulary + academic vocabulary (page 74)
  words: [
    { w: "Renewable", m: "does not run out, or can be made again" },
    { w: "Solar energy", m: "energy from the sun" },
    { w: "Solar cell", m: "changes sunlight into electricity" },
    { w: "Wind energy", m: "the energy of moving air" },
    { w: "Hydropower", m: "the energy of moving water" },
    { w: "Geothermal energy", m: "heat from inside the Earth" },
    { w: "Biomass", m: "plant materials we burn for energy, like wood" },
    { w: "Available", m: "there when you need it" },
  ],

  ideas: [
    {
      t: "Renewable energy is all around",
      lines: [
        "[Renewable] energy does [not run out].",
        "The sun, the wind, moving water, the Earth's heat and plants.",
      ],
      img: "renewable-all",
    },
    {
      t: "The sun",
      lines: [
        "Every day the sun gives Earth [10,000 times] more energy than people use.",
        "It will shine for [billions] of years.",
      ],
      img: "sun",
    },
    {
      t: "Solar energy at home",
      lines: [
        "Sunlight can [heat] a house or water.",
        "[Solar cells] on the roof change sunlight into [electricity].",
        "Extra electricity can be stored in a [battery].",
      ],
      img: "solar-roof",
    },
    {
      t: "No sun at night",
      lines: [
        "At [night] there is no sunlight.",
        "Solar cells cannot make electricity in the dark.",
        "Solar energy is not always [available].",
      ],
      vis: { kind: "emoji", e: "🌙 ❌ ☀️" },
    },
    {
      t: "Wind energy",
      lines: [
        "The sun heats the air, so the air [moves]: that is [wind].",
        "[Wind turbines] change the motion into [electricity].",
        "The wind may stop, but it always starts again.",
      ],
      img: "wind",
    },
    {
      t: "Hydropower",
      lines: [
        "[Hydropower]: the energy of [moving water].",
        "A [dam] holds water in a lake. The water flows through and turns a [turbine].",
        "The turbine turns a [generator]: electricity.",
      ],
      img: "dam",
    },
    {
      t: "Rain fills the rivers",
      lines: [
        "The sun makes water [evaporate]. It falls again as [rain] and [snow].",
        "Rivers flow, and their energy can make electricity.",
      ],
      img: "hydropower",
    },
    {
      t: "Geothermal energy",
      lines: [
        "[Geothermal energy]: heat from [inside the Earth].",
        "It heats water under the ground.",
        "The warm water can heat homes and buildings.",
      ],
      img: "geothermal",
    },
    {
      t: "Biomass",
      lines: [
        "Plants store the sun's energy.",
        "[Biomass]: plant materials, like [firewood], that we burn.",
        "We can [plant again], so it is renewable.",
      ],
      img: "biomass",
    },
    {
      t: "Fuel from corn",
      lines: [
        "Corn can be made into a fuel: [ethanol] (alcohol).",
        "Most gasoline has some alcohol in it.",
        "But it needs a lot of [land], and corn is also [food].",
      ],
      vis: { kind: "emoji", e: "🌽 ➡️ ⛽" },
    },
    {
      t: "Renewable or not?",
      lines: [
        "[Renewable]: sun, wind, water, Earth's heat, plants. They do not run out.",
        "[Nonrenewable]: coal, oil, gas, uranium. They run out.",
      ],
      vis: {
        kind: "strip",
        items: SOURCES.map(([label, img]) => ({ img, label })),
      },
    },
  ],

  games: [
    {
      k: "which",
      t: "Which energy source?",
      en: "Sun, wind, water, Earth, plants",
      ic: "♻️",
      items: [
        ["Solar cells on the roof use it.", 0],
        ["Big turbines turn when the air moves.", 1],
        ["Water flows through a dam and turns a turbine.", 2],
        ["Heat from inside the Earth warms the water.", 3],
        ["We burn firewood.", 4],
        ["It does not work at night.", 0],
        ["Corn is made into fuel.", 4],
        ["Rivers flow after rain and snow.", 2],
      ].map(([q, k]) => {
        // the right one and the next two, so there are 3 answers
        const o = [0, 1, 2].map((d) => SOURCES[(k + d) % SOURCES.length]);
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
      en: "Renewable or nonrenewable",
      ic: "⏳",
      items: [
        ["Sunlight", false, "☀️"],
        ["Wind", false, "🌬️"],
        ["A flowing river", false, "🌊"],
        ["Heat from inside the Earth", false, "🌋"],
        ["Firewood (we can plant more trees)", false, "🪵"],
        ["Coal", true, "⛏️"],
        ["Petroleum (oil)", true, "🛢️"],
        ["Natural gas", true, "🔥"],
        ["Uranium", true, "☢️"],
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
      k: "how",
      t: "How does it work?",
      en: "Put it in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "[Hydropower]",
          ask: "Put the steps of hydropower in order.",
          hint: "The rain comes first.",
          steps: [
            { say: "Rain fills the lake", e: "🌧️" },
            { say: "Water flows through the dam", img: "dam" },
            { say: "The water turns the turbine", e: "🌀" },
            { say: "The generator makes electricity", e: "⚡" },
          ],
        },
        {
          type: "order",
          t: "[Wind] energy",
          ask: "Put the steps of wind energy in order.",
          hint: "The sun comes first.",
          steps: [
            { say: "The sun heats the air", e: "☀️" },
            { say: "The air moves: wind", e: "🌬️" },
            { say: "The turbine blades spin", img: "wind" },
            { say: "The generator makes electricity", e: "⚡" },
          ],
        },
        {
          type: "order",
          t: "[Solar] energy at home",
          ask: "Put the steps of solar energy at home in order.",
          hint: "Sunlight first.",
          steps: [
            { say: "Sunlight", e: "☀️" },
            { say: "Solar cells on the roof", img: "solar-roof" },
            { say: "Electricity for the house", e: "💡" },
            { say: "The battery stores the extra", e: "🔋" },
          ],
        },
      ],
    },
    {
      k: "good",
      t: "Good and not so good",
      en: "Choose all",
      ic: "⚖️",
      items: [
        {
          type: "multi",
          q: "What is [good] about solar energy? (choose all)",
          opts: [
            { t: "It does not run out", emoji: "♻️", ok: true },
            { t: "There is a lot of it", emoji: "☀️", ok: true },
            { t: "It works at night", emoji: "🌙" },
            { t: "It must be dug out of a mine", emoji: "⛏️" },
          ],
        },
        {
          type: "multi",
          q: "What is a [problem] with fuel from corn? (choose all)",
          opts: [
            { t: "It needs a lot of land", emoji: "🌾", ok: true },
            { t: "Corn is also food", emoji: "🍽️", ok: true },
            { t: "We can never grow corn again", emoji: "❌" },
          ],
        },
        {
          type: "multi",
          q: "Which ones make [electricity]? (choose all)",
          opts: [
            { t: "Wind turbines", img: "wind", ok: true },
            { t: "A dam", img: "dam", ok: true },
            { t: "Solar cells", img: "solar-roof", ok: true },
            { t: "A tree", emoji: "🌳" },
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
          q: "The sections are called Renewable Fuel, Hydropower and Energy That Does Not Run Out. How are they the same?",
          a: "They are all about [renewable] energy sources.",
          emoji: "🌽 🌊 ☀️",
        },
        {
          type: "open",
          q: "Farmers grow corn to make fuel for cars. Is fuel made from corn renewable? Why?",
          a: "[Yes]. Farmers can [grow more corn] again and again.",
          emoji: "🌽 ➡️ ⛽",
        },
        {
          type: "open",
          q: "How can air be used as an energy source?",
          a: "The [wind] turns wind turbines. They turn generators that make [electricity].",
          img: "wind",
        },
        {
          type: "open",
          q: "Which renewable sources would you use to make electricity for your school?",
          a: "[Solar cells] on the roof, [wind turbines], [hydropower] from a river.",
          img: "renewable-all",
        },
        {
          type: "open",
          q: "Using corn for fuel: what happens to the corn we have for food?",
          a: "There is [less corn] for food.",
          emoji: "🌽 ⛽ 🍽️",
        },
        {
          type: "open",
          q: "Engineers design solar energy for a whole home. What problems must they think about?",
          a: "No sun at [night] and on cloudy days, so it needs a [battery]. Enough [roof space]. The cost.",
          img: "solar-roof",
        },
        {
          type: "open",
          q: "Put white paper and black paper in the sun for an hour. Touch them. What do you notice? Why?",
          a: "The [black] paper is warmer. It takes in more of the sun's energy.",
          emoji: "⬛ ⬜ ☀️",
        },
      ],
    },
  ],
};
