// Science · Grade 4 · Topic 5 · Lesson 2 « Weather Hazards » (book pages 218–225).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
const HAZARDS = [
  ["Flood", "flooded-house"],
  ["Drought", "drought"],
  ["Blizzard", "blizzard"],
  ["Tornado", "tornado"],
  ["Avalanche", "avalanche"],
];
window.LESSON = {
  n: 2,
  key: "sci4-t5-l2",
  grade: 4,
  title: "Weather Hazards",
  unit: "Topic 5 · Lesson 2",
  book: "Book pages 218–225",
  cover: "tornado",
  question: {
    q: "How can [weather] be dangerous for people?",
    a: "Too much rain makes [floods]; no rain makes a [drought]. [Blizzards], [tornadoes] and [hurricanes] have strong winds. Snow and soil can slide down mountains.",
    img: "tornado",
  },
  // the book's vocabulary + academic vocabulary (page 218) + words of the lesson
  words: [
    { w: "Flood", m: "water covers land that is usually dry" },
    { w: "Drought", m: "a long time with no rain" },
    { w: "Blizzard", m: "a snowstorm with strong winds" },
    { w: "Tornado", m: "a funnel of wind from a cloud to the ground" },
    { w: "Hurricane", m: "a huge storm with strong wind and heavy rain" },
    { w: "Avalanche", m: "snow, ice and rock slide down a mountain" },
    { w: "Landslide", m: "rock and soil slide down a hill" },
    { w: "Outcome", m: "a result" },
  ],

  ideas: [
    {
      t: "Avalanche",
      lines: [
        "Too much new snow, melting or an earthquake can make snow [slide].",
        "An [avalanche]: snow, ice and rock rush down the mountain.",
        "Skiers must stay in [safe] areas.",
      ],
      img: "avalanche",
    },
    {
      t: "Flood",
      lines: [
        "A [flood]: water covers land that is usually [dry].",
        "A river overflows onto the farm fields.",
        "Water fills streets and houses.",
      ],
      img: "flooded-house",
    },
    {
      t: "Floods harm farms",
      lines: [
        "The water [washes away] the soil.",
        "Plants can [drown] or rot.",
      ],
      img: "flood-farm",
    },
    {
      t: "Drought",
      lines: [
        "A [drought]: no rain for a long time. Very dry weather.",
        "The ground cracks. Plants [dry up] and die.",
        "Animals have little water and food.",
      ],
      img: "drought",
    },
    {
      t: "Blizzard",
      lines: [
        "A [blizzard]: a snowstorm with strong winds.",
        "Driving is dangerous. The [electricity] can go off.",
        "Heavy snow can break roofs and trees. People can get too [cold].",
      ],
      img: "blizzard",
    },
    {
      t: "Tornado",
      lines: [
        "A [tornado]: a spinning funnel of wind from a cloud to the ground.",
        "A small one pulls up trees.",
        "A strong one can destroy whole [neighborhoods].",
      ],
      img: "tornado",
    },
    {
      t: "Hurricane",
      lines: [
        "A [hurricane] starts over [warm ocean] water.",
        "Very strong [winds] break buildings and trees.",
        "Heavy [rain] and the sea rising ([storm surge]) flood towns.",
      ],
      img: "flooded-street",
    },
    {
      t: "Landslides",
      lines: [
        "A [landslide]: rock and soil slide down a hill.",
        "Heavy rain or earthquakes loosen the ground.",
        "It can block a river and cause a [flood].",
      ],
      vis: { kind: "emoji", e: "⛰️ 🪨 ⬇️ 🏠" },
    },
    {
      t: "Where are earthquakes most dangerous?",
      lines: [
        "This map shows earthquake hazards around the world.",
        "Red = [very high]. Most are at the edges of [plates].",
      ],
      img: "quake-map",
    },
  ],

  games: [
    {
      k: "which",
      t: "Which hazard?",
      en: "Flood, drought, blizzard, tornado, avalanche",
      ic: "🌪️",
      items: [
        ["Water covers the streets and houses.", 0],
        ["No rain for months. Plants dry up.", 1],
        ["A snowstorm with strong winds.", 2],
        ["A spinning funnel of wind touches the ground.", 3],
        ["Snow rushes down the mountain.", 4],
        ["The river overflows onto the farm.", 0],
      ].map(([q, k]) => {
        const o = [0, 1, 2].map((d) => HAZARDS[(k + d * 2) % HAZARDS.length]);
        return {
          type: "mc",
          q,
          opts: o.map((x) => x[0]),
          pics: o.map((x) => x[1]),
        };
      }),
    },
    {
      k: "much",
      t: "Too much or too little?",
      en: "Rain",
      ic: "🌧️",
      items: [
        {
          type: "mc",
          q: "Too [much] rain can cause ___",
          opts: ["a flood", "a drought"],
          two: true,
          img: "flood-farm",
        },
        {
          type: "mc",
          q: "Too [little] rain for a long time is ___",
          opts: ["a drought", "a flood"],
          two: true,
          img: "drought",
        },
        {
          type: "mc",
          q: "Where do hurricanes start?",
          opts: ["Over warm ocean water", "On cold mountains", "In the desert"],
          icons: ["🌊", "🏔️", "🏜️"],
          img: "flooded-street",
        },
        {
          type: "multi",
          q: "How can a hurricane cause a flood? (choose all)",
          opts: [
            { t: "Heavy rain", emoji: "🌧️", ok: true },
            { t: "The sea rises (storm surge)", emoji: "🌊", ok: true },
            { t: "Sunshine", emoji: "☀️" },
          ],
        },
      ],
    },
    {
      k: "safe",
      t: "Stay safe",
      en: "What should you do?",
      ic: "🦺",
      items: [
        {
          type: "mc",
          q: "Skiing in the mountains: where should you stay?",
          opts: ["In areas marked safe", "Anywhere you like"],
          img: "avalanche",
        },
        {
          type: "mc",
          q: "A blizzard is coming. What is safest?",
          opts: ["Stay inside and keep warm", "Go for a long drive"],
          img: "blizzard",
        },
        {
          type: "mc",
          q: "A tornado is coming. Where should you go?",
          opts: [
            "Inside, to a low room without windows",
            "Outside to watch it",
          ],
          img: "tornado",
        },
        {
          type: "mc",
          q: "The river is flooding. What should you do?",
          opts: ["Go to higher ground", "Walk into the water"],
          img: "flooded-house",
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
          q: "How can a tornado affect people?",
          a: "Strong winds can [destroy] houses and pull up trees. People can get [hurt].",
          img: "tornado",
        },
        {
          type: "open",
          q: "A big hurricane hits the coast. Name three ways it affects people.",
          a: "Wind [breaks] buildings, rain and storm surge [flood] towns, and the [electricity] goes off.",
          img: "flooded-street",
        },
        {
          type: "open",
          q: "How does a flood affect the soil and the farm plants?",
          a: "The water [washes away] the soil, and the plants can [drown].",
          img: "flood-farm",
        },
        {
          type: "open",
          q: "How can a drought affect plants and animals?",
          a: "Plants [dry up] and die. Animals have little [water] and [food].",
          img: "drought",
        },
        {
          type: "open",
          q: "How are landslides and avalanches alike?",
          a: "Both [slide down] a slope and can [damage] buildings and roads.",
          img: "avalanche",
        },
        {
          type: "open",
          q: "The city's river flooded. Name ways a city can reduce flood damage.",
          a: "Build [walls] along the river, keep clean [water] stored, build houses on [higher] ground.",
          img: "flooded-house",
        },
        {
          type: "open",
          q: "Earthquakes usually happen where plates meet. What can you say about places with high earthquake risk?",
          a: "They are near the [edges] of plates.",
          img: "quake-map",
        },
      ],
    },
  ],
};
