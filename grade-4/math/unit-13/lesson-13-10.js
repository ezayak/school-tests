// Math · Grade 4 · Lesson 13-10 « Display and Interpret Data on a Line Plot » (Reveal Math, Unit 13 « Units of Measurement and Data »).
// Sources: the e-book video (books/Screencast From 2026-11-15 18-24-52.mp4, keep frames k1501–k1530; On My Own 4 and 6 from the frames
// f10046, f10091), Practice Book p. 151–152. No teacher's key. "Represent the data in a line plot" = one question per mark count.
// Log: grade-4/math/SOURCES.md.
const HAND = {
  kind: "lplot",
  title: "Hand Length (in.)",
  ticks: [
    "5",
    "{5 1/8}",
    "{5 2/8}",
    "{5 3/8}",
    "{5 4/8}",
    "{5 5/8}",
    "{5 6/8}",
    "{5 7/8}",
    "6",
  ],
  xs: [0, 1, 2, 0, 5, 2, 3, 1, 1],
};
const PENCIL = {
  kind: "lplot",
  title: "Pencil Lengths (in.)",
  ticks: ["{4 1/4}", "{4 2/4}", "{4 3/4}", "5"],
  xs: [3, 1, 4, 2],
};
const JUMP = {
  kind: "lplot",
  title: "Long Jump Distances (ft)",
  ticks: ["3", "{3 1/2}", "4", "{4 1/2}", "5"],
  xs: [7, 6, 3, 5, 0],
};
const SAX = {
  kind: "lplot",
  title: "Saxophone Practice (hours)",
  ticks: ["0", "{1/2}", "1", "{1 1/2}", "2"],
  xs: [2, 1, 2, 2, 0],
};
const HIKE = {
  kind: "lplot",
  title: "Distance Hiked (miles)",
  ticks: [
    "2",
    "{2 1/4}",
    "{2 2/4}",
    "{2 3/4}",
    "3",
    "{3 1/4}",
    "{3 2/4}",
    "{3 3/4}",
    "4",
  ],
  xs: [1, 1, 0, 1, 0, 2, 1, 0, 1],
};
const COLOR = {
  kind: "lplot",
  title: "Color Pencil Lengths (in.)",
  ticks: [
    "6",
    "{6 1/8}",
    "{6 2/8}",
    "{6 3/8}",
    "{6 4/8}",
    "{6 5/8}",
    "{6 6/8}",
    "{6 7/8}",
    "7",
  ],
  xs: [1, 1, 1, 1, 1, 3, 0, 1, 1],
};
const FISH = {
  kind: "lplot",
  title: "Fish Lengths (in.)",
  ticks: ["8", "{8 1/4}", "{8 2/4}", "{8 3/4}", "9"],
  xs: [1, 2, 1, 3, 1],
};
// a table as text rows
const table = (rows) => ({ kind: "lines", rows });
// how many marks go above a value (the plot is not shown: it would give the answer)
const marks = (q, plot, i, rows) => ({
  type: "num",
  q,
  a: plot.xs[i],
  post: "✕",
  vis: table(rows),
  x: `The table has ${plot.xs[i]} value${plot.xs[i] === 1 ? "" : "s"} of ${plot.ticks[i]}: [${plot.xs[i]}] ✕ above ${plot.ticks[i]}.`,
});
const SAX_ROWS = [
  "Mon {1 1/2}, Tue 0, Wed {1/2}",
  "Thu 1, Fri 1, Sat 0, Sun {1 1/2}",
];
const HIKE_ROWS = [
  "Mon {3 1/4}, Tue 2, Wed {3 2/4}, Thu {2 1/4}",
  "Fri 4, Sat {2 3/4}, Sun {3 1/4}",
];
const COLOR_ROWS = [
  "{6 3/8}, {6 5/8}, {6 7/8}, 6, {6 5/8}",
  "{6 4/8}, {6 1/8}, 7, {6 5/8}, {6 2/8}",
];
const PENCIL_ROWS = ["{4 3/4}: 4", "5: 2", "{4 1/4}: 3", "{4 2/4}: 1"];

window.LESSON = {
  n: "13-10",
  key: "math4-l13-10",
  grade: 4,
  title: "Line Plots",
  en: "Show measurements as ✕ marks above a number line, and read them",
  unit: "Unit 13 · Lesson 13-10",
  book: "e-book Lesson 13-10 · Practice Book p. 151–152",
  imgDir: "img/lesson-13-10",
  cover: "curious",
  question: {
    q: "How can you use data on a [line plot] to solve problems involving fractions?",
    // unverified: a model answer, the book gives none
    a: "Each ✕ is one measurement. I count the ✕ above a number, find the most common one, and add or subtract the fractions: 6 − {5 1/8} = {7/8}.",
    img: "curious",
  },
  words: [
    { w: "Line plot", m: "a number line with an ✕ for each data value" },
    { w: "Data", m: "measurements or counts that you collect" },
    { w: "Most common", m: "the value with the most ✕" },
  ],
  ideas: [
    {
      t: "Ant lengths",
      ic: "🐜",
      img: "curious",
      lines: [
        "Many ants are measured: {2 1/2} in., {3 5/8} in., {3 3/4} in. …",
        "How can we see them all at once?",
      ],
    },
    {
      t: "Kade's hand lengths",
      ic: "✋",
      lines: [
        "Kade measured the hand lengths of her class to the nearest [eighth] inch.",
        "Use the least value and the greatest value as the [end points].",
      ],
      vis: { ...HAND, xs: HAND.xs.map(() => 0) },
    },
    {
      t: "Plot each data point",
      ic: "✕",
      lines: ["Put one [✕] above the number for each hand length."],
      vis: HAND,
    },
    {
      t: "Read the plot",
      ic: "🔍",
      lines: [
        "The most common length is {5 4/8} inches: [5] ✕.",
        "Longest − shortest: 6 − {5 1/8} = [{7/8}] inch.",
        "No one had 5 or {5 3/8} inches.",
      ],
      vis: HAND,
    },
    {
      t: "Fish lengths",
      ic: "🐟",
      lines: [
        "8, {8 1/4}, {8 1/4}, {8 2/4}, {8 3/4}, {8 3/4}, {8 3/4}, 9.",
        "The most common: {8 3/4} inches.",
      ],
      vis: FISH,
    },
  ],

  games: [
    {
      k: "read",
      t: "Read the line plot",
      en: "Count the ✕",
      ic: "🔍",
      items: [
        {
          type: "num",
          q: "How many fish are {8 1/4} inches long?",
          a: 2,
          vis: FISH,
          x: "[2] ✕ above {8 1/4}.",
        },
        {
          type: "num",
          q: "How many fish were measured in all?",
          a: 8,
          vis: FISH,
          x: "1 + 2 + 1 + 3 + 1 = [8] ✕.",
        },
        {
          type: "num",
          q: "How many pencils are longer than {4 1/2} inches?",
          a: 6,
          vis: PENCIL,
          x: "4 + 2 = [6] ✕ above {4 3/4} and 5.",
        },
        {
          type: "mc",
          q: "Which length is the most common?",
          opts: ["{4 3/4} in.", "{4 1/4} in.", "5 in.", "{4 2/4} in."],
          vis: PENCIL,
          x: "{4 3/4} has the most ✕: 4.",
        },
        {
          type: "num",
          q: "How many hands are {5 6/8} inches long?",
          a: 3,
          vis: HAND,
          x: "[3] ✕ above {5 6/8}.",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 13-10",
      t: "Be Curious",
      en: "Ants",
      ic: "🐜",
      from: "e-book 13-10 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: the book takes any answer
          a: "I notice many ants of {2 1/2}, {3 5/8} and {3 3/4} inches; some lengths repeat. I wonder which length is the most common.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 13-10",
      t: "Learn and Work Together",
      en: "Hand lengths; pencil lengths",
      ic: "✋",
      from: "e-book 13-10 · Learn, Work Together",
      keep: true,
      items: [
        {
          type: "mc",
          q: "What was the most common hand length?",
          opts: [
            "{5 4/8} inches",
            "{5 6/8} inches",
            "6 inches",
            "{5 1/8} inches",
          ],
          vis: HAND,
          x: "{5 4/8} has the most ✕: 5.",
        },
        {
          type: "mc",
          q: "What is the difference between the longest and the shortest hand length?",
          opts: ["{7/8} inch", "1 inch", "{1/8} inch", "{6/8} inch"],
          vis: HAND,
          x: "The longest is 6, the shortest {5 1/8}: 6 − {5 1/8} = {7/8} inch.",
        },
        {
          type: "open",
          q: "Math Is… Thinking: How does a line plot help you analyze data?",
          vis: HAND,
          // unverified: a model answer, the book gives none
          a: "It shows every measurement in order. I can see the most common value, the longest and the shortest, and values nobody had.",
        },
        ...[
          [0, "How many ✕ go above {4 1/4}?"],
          [1, "How many ✕ go above {4 2/4}?"],
          [2, "How many ✕ go above {4 3/4}?"],
          [3, "How many ✕ go above 5?"],
        ].map(([i, q]) =>
          marks(
            `Work Together: show the pencil lengths in a line plot. ${q}`,
            PENCIL,
            i,
            PENCIL_ROWS,
          ),
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 13-10",
      t: "On My Own 1–6",
      en: "Long jumps, saxophone practice",
      ic: "🏃",
      from: "e-book 13-10 · On My Own 1–6",
      keep: true,
      items: [
        {
          type: "mc",
          q: "What was the greatest distance jumped?",
          opts: ["{4 1/2} feet", "5 feet", "3 feet", "4 feet"],
          vis: JUMP,
          x: "The ✕ furthest to the right is above {4 1/2}. Nobody jumped 5 feet.",
        },
        {
          type: "num",
          q: "How many students jumped 4 feet or greater?",
          a: 8,
          vis: JUMP,
          x: "3 above 4 and 5 above {4 1/2}: 3 + 5 = [8].",
        },
        {
          type: "num",
          q: "How many students jumped {4 1/2} feet?",
          a: 5,
          vis: JUMP,
          x: "[5] ✕ above {4 1/2}.",
        },
        {
          type: "num",
          q: "How many students jumped {3 1/2} feet?",
          a: 6,
          vis: JUMP,
          x: "[6] ✕ above {3 1/2}.",
        },
        ...[0, 1, 2, 3].map((i) =>
          marks(
            `Represent Jackson's saxophone practice on a line plot. How many ✕ go above ${SAX.ticks[i]}?`,
            SAX,
            i,
            SAX_ROWS,
          ),
        ),
        {
          type: "num",
          q: "How many hours did Jackson practice in all?",
          a: 5.5,
          post: "hours",
          vis: SAX,
          x: "{1 1/2} + {1/2} + 1 + 1 + {1 1/2} = {5 1/2}: [5.5] hours.",
        },
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 13-10",
      t: "On My Own 7–10",
      en: "Kireka's family hike",
      ic: "🥾",
      from: "e-book 13-10 · On My Own 7–10",
      keep: true,
      items: [
        ...[0, 1, 3, 5, 6, 8].map((i) =>
          marks(
            `Complete the line plot of the distances hiked. How many ✕ go above ${HIKE.ticks[i]}?`,
            HIKE,
            i,
            HIKE_ROWS,
          ),
        ),
        {
          type: "mc",
          q: "Which distance was most frequently hiked?",
          opts: ["{3 1/4} miles", "4 miles", "2 miles", "{3 2/4} miles"],
          vis: HIKE,
          x: "{3 1/4} has 2 ✕, the others 1.",
        },
        {
          type: "num",
          q: "What is the difference between the longest and shortest distance hiked?",
          a: 2,
          post: "miles",
          vis: HIKE,
          x: "4 − 2 = [2] miles.",
        },
        {
          type: "tf",
          q: "Extend: Kireka's family had a goal to hike more than 20 miles. Did they meet their goal?",
          a: true,
          yes: ["Yes, they did", "No, they didn't"],
          vis: HIKE,
          x: "{3 1/4} + 2 + {3 2/4} + {2 1/4} + 4 + {2 3/4} + {3 1/4} = 21 miles: more than 20.",
        },
        {
          type: "open",
          q: "Reflect: How can you use data on a line plot to solve problems involving fractions?",
          vis: HIKE,
          // unverified: a model answer, the book gives none
          a: "I read the values from the ✕ marks and add or subtract the fractions, like 4 − 2 = 2 miles, or add all the distances.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 151–152",
      t: "Additional Practice 1–5",
      en: "Color pencil lengths",
      ic: "📘",
      from: "Practice Book p. 151–152",
      keep: true,
      items: [
        ...[0, 1, 5, 6, 7, 8].map((i) =>
          marks(
            `Represent Cameron's color pencil lengths in a line plot. How many ✕ go above ${COLOR.ticks[i]}?`,
            COLOR,
            i,
            COLOR_ROWS,
          ),
        ),
        {
          type: "num",
          q: "Use your line plot. How many color pencils have the least common length (a length that is on the plot)?",
          a: 1,
          post: "pencil",
          vis: COLOR,
          // unverified: several lengths tie with 1 pencil; the book has no key
          x: "6, {6 1/8}, {6 2/8}, {6 3/8}, {6 4/8}, {6 7/8} and 7 each have [1] pencil.",
        },
        {
          type: "mc",
          q: "Which length was the most common? How many color pencils are this long?",
          opts: [
            "{6 5/8} in.: 3 pencils",
            "{6 6/8} in.: 3 pencils",
            "7 in.: 1 pencil",
            "{6 5/8} in.: 2 pencils",
          ],
          vis: COLOR,
          x: "{6 5/8} has 3 ✕.",
        },
        {
          type: "mc",
          q: "Are there any lengths on your line plot that are not represented?",
          opts: [
            "Yes: {6 6/8} inches",
            "No, all are represented",
            "Yes: 6 inches",
            "Yes: 7 inches",
          ],
          vis: COLOR,
          // unverified: no key
          x: "No pencil is {6 6/8} inches long: no ✕ above it.",
        },
        {
          type: "mc",
          q: "Shari wants her line plot to be as accurate as possible. Should she measure to the nearest eighth inch or quarter inch?",
          opts: ["The nearest eighth inch", "The nearest quarter inch"],
          vis: { kind: "lines", rows: ["{1/8} in. < {1/4} in."] },
          // unverified: no key
          x: "An eighth inch is smaller than a quarter inch, so the measurements are closer to the real lengths.",
        },
      ],
    },
  ],
};
