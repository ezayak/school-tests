// Science · Grade 4 · Topic 4 · Lesson 1 « Maps and Data » (book pages 156–163).
// All the content of the lesson. The engine is shared/computer-lesson.js (no Mini Windows).
// No school sheets yet: the exercises are the book's own questions, with model answers written from the book text.
window.LESSON = {
  n: 1,
  key: "sci4-t4-l1",
  grade: 4,
  title: "Maps and Data",
  unit: "Topic 4 · Lesson 1",
  book: "Book pages 156–163",
  cover: "street-map",
  question: {
    q: "How do [maps] help us learn about a place?",
    a: "Maps use [symbols], a [legend], a [compass rose] and a [scale]. Different maps show different things: land, roads, places or resources.",
    img: "us-map",
  },
  // the book's vocabulary + academic vocabulary (page 156)
  words: [
    { w: "Map", m: "a drawing of a place, seen from above" },
    { w: "Symbol", m: "a small picture, line or color on a map" },
    { w: "Legend", m: "the key: it tells what the symbols mean" },
    { w: "Compass rose", m: "shows north, east, south and west" },
    { w: "Map scale", m: "shows how far the real distance is" },
    { w: "Feature", m: "a part of something, like a hill or a river" },
  ],

  ideas: [
    {
      t: "Maps help us find our way",
      lines: [
        "A map of a race shows the [path], the [finish] and the water stops.",
        "A map shows a big place on a small sheet of paper.",
      ],
      img: "race-map",
    },
    {
      t: "A school map",
      lines: [
        "A map of a school shows the rooms.",
        "The gym, the cafeteria, the science lab.",
      ],
      img: "school-map",
    },
    {
      t: "Symbols and the legend",
      lines: [
        "[Symbols]: small pictures, lines or colors on a map.",
        "The [legend] (key) tells what each symbol means.",
      ],
      img: "legend",
    },
    {
      t: "Compass rose and scale",
      lines: [
        "The [compass rose] shows directions: [N] north, [E] east, [S] south, [W] west.",
        "The [map scale] shows how far it really is, in miles or kilometers.",
      ],
      img: "legend",
    },
    {
      t: "Physical map",
      lines: [
        "A [physical map] shows the land: hills, rivers, lakes.",
        "[Blue] = water. [Brown] and dark green = high land, mountains.",
        "Light green = flat land, [plains].",
      ],
      img: "us-map",
    },
    {
      t: "Street map",
      lines: [
        "A [road map] shows the streets and highways.",
        "It must change when new roads are built.",
      ],
      img: "street-map",
    },
    {
      t: "Topographic map",
      lines: [
        "A [topographic map] shows how high the land is with [contour lines].",
        "Lines [close together] = steep land. Lines far apart = flat land.",
      ],
      img: "topo-map",
    },
    {
      t: "Satellite map",
      lines: [
        "A [satellite] in space takes a picture of the place.",
        "Today most maps use information from satellites. [GPS] shows where you are.",
      ],
      img: "satellite-map",
    },
    {
      t: "Attractions map",
      lines: [
        "This map shows places to visit: the bridge, the zoo, the stadium.",
      ],
      img: "attractions-map",
    },
    {
      t: "Resource map",
      lines: [
        "A [resource map] shows what an area makes or grows.",
        "This map of Virginia shows apples, corn, cows, fish and more.",
      ],
      img: "virginia",
    },
  ],

  games: [
    {
      k: "parts",
      t: "Parts of a map",
      en: "Symbol, legend, compass rose, scale",
      ic: "🧭",
      items: [
        [
          "It shows north, east, south and west.",
          "Compass rose",
          "Legend",
          "Map scale",
        ],
        [
          "It tells what the symbols mean.",
          "Legend",
          "Compass rose",
          "Map scale",
        ],
        [
          "It shows how far the real distance is.",
          "Map scale",
          "Legend",
          "Symbol",
        ],
        [
          "A small picture or line on the map.",
          "Symbol",
          "Map scale",
          "Compass rose",
        ],
      ].map(([q, a, b, c]) => ({
        type: "mc",
        q,
        opts: [a, b, c],
        img: "legend",
      })),
    },
    {
      k: "type",
      t: "Which map?",
      en: "Kinds of maps",
      ic: "🗺️",
      items: [
        ["Shows hills, rivers and mountains", 0],
        ["Shows streets and highways", 1],
        ["Shows how steep the land is with lines", 2],
        ["A picture taken from space", 3],
        ["Shows what an area grows or makes", 4],
      ].map(([q, k]) => {
        const all = [
          ["Physical map", "us-map"],
          ["Street map", "street-map"],
          ["Topographic map", "topo-map"],
          ["Satellite map", "satellite-map"],
          ["Resource map", "virginia"],
        ];
        const o = [all[k], all[(k + 1) % 5], all[(k + 3) % 5]];
        return {
          type: "mc",
          q: `${q}: which map?`,
          opts: o.map((x) => x[0]),
          pics: o.map((x) => x[1]),
        };
      }),
    },
    {
      k: "colors",
      t: "Read the map",
      en: "Colors and lines",
      ic: "🎨",
      items: [
        {
          type: "mc",
          q: "On a physical map, [blue] shows ___",
          opts: ["water", "mountains", "roads"],
          icons: ["💧", "⛰️", "🛣️"],
          img: "us-map",
        },
        {
          type: "mc",
          q: "On a physical map, [brown] shows ___",
          opts: ["high land, mountains", "water", "cities"],
          icons: ["⛰️", "💧", "🏙️"],
          img: "us-map",
        },
        {
          type: "mc",
          q: "Contour lines [close together] show ___",
          opts: ["steep land", "flat land", "water"],
          img: "topo-map",
        },
        {
          type: "mc",
          q: "On the compass rose, [N] means ___",
          opts: ["north", "near", "new"],
          img: "legend",
        },
        {
          type: "mc",
          q: "Which tool shows exactly where you are?",
          opts: ["GPS", "A legend", "A ruler"],
          icons: ["📡", "🔑", "📏"],
          img: "satellite-map",
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
            { img: "us-map", label: "Physical map" },
            { img: "street-map", label: "Street map" },
            { img: "satellite-map", label: "Satellite map" },
            { img: "virginia", label: "Resource map" },
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
          q: "Use the Virginia map. Where are cows and pigs farmed? Which tools on the map help most?",
          a: "Look at the [symbols] for cows and pigs. The [legend] (key) tells what they mean.",
          img: "virginia",
        },
        {
          type: "open",
          q: "Jake has a 100-year-old map. Which features could show it is the same town? (lake, police station, creek, swamp, hill, library, park, canyon, farm)",
          a: "Natural features that do not change: [Elm Lake], [Duncan Creek], [Burdock Swamp], [Hubbard's Hill], [Rickard Canyon].",
          img: "landscape",
        },
        {
          type: "open",
          q: "How is a map scale useful?",
          a: "It tells how [far] places really are from each other.",
          img: "legend",
        },
        {
          type: "open",
          q: "What would you put in a legend for a map with mountains and coastlines?",
          a: "A symbol for [mountains], a color for [water], a line for the [coast].",
          img: "landscape",
        },
        {
          type: "open",
          q: "Is San Francisco flat or hilly? How do you know?",
          a: "[Hilly]. The contour lines are [close together] in many places.",
          img: "topo-map",
        },
        {
          type: "open",
          q: "How is a satellite map different from the other maps?",
          a: "It is a real [photo] taken from [space].",
          img: "satellite-map",
        },
        {
          type: "open",
          q: "How can a map help runners see a big park on a small sheet of paper?",
          a: "It shows the whole park [from above], smaller, with the path, water stops and finish.",
          img: "race-map",
        },
      ],
    },
  ],
};
