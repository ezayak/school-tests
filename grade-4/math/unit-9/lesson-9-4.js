// Math · Grade 4 · Lesson 9-4 « Represent Subtracting Fractions » (Reveal Math, Unit 9 « Addition and Subtraction Meanings and Strategies with Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 4:20–5:28; no page numbers;
// On My Own 5 read from the frames between; 12: Carlos jumps back 6 eighths from {10/8}), Student Practice Book p. 95–96.
// No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// "{a/d} − {b/d} = ?": tiles with the taken parts crossed out (or a number line jumping back when a is more than d)
const subQ = (q, a, b, d, more = {}) => ({
  type: "num",
  q,
  pre: `{${a}/${d}} − {${b}/${d}} =`,
  fr: `?/${d}`,
  a: a - b,
  vis:
    a > d
      ? {
          kind: "fline",
          hi: Math.ceil(a / d),
          lines: [{ d, from: a, jumps: [-b], lab: false }],
        }
      : {
          kind: "fbar",
          rows: [
            {
              d,
              k: a,
              cross: Array.from({ length: b }, (_, j) => a - b + j),
            },
          ],
        },
  x: `${a} − ${b} = ${a - b}: {${a}/${d}} − {${b}/${d}} = {[${a - b}]/${d}}. The bottom number stays ${d}.`,
  ...more,
});

window.LESSON = {
  n: "9-4",
  key: "math4-l9-4",
  grade: 4,
  title: "Show Subtracting Fractions",
  en: "Take away fractions with the same denominator using tiles and number lines",
  unit: "Unit 9 · Lesson 9-4",
  book: "e-book Lesson 9-4 · Practice Book p. 95–96",
  imgDir: "img/lesson-9-4",
  cover: "curious",
  question: {
    q: "How can a [picture] show subtracting fractions with like denominators?",
    // unverified: a model answer, the book gives none
    a: "Cross out the tiles you take away, or jump back on a number line. Count what is left: {7/8} − {4/8} = {3/8}. The [bottom number stays the same].",
    img: "curious",
  },
  words: [
    { w: "Subtract", m: "take away: {7/8} − {4/8}" },
    { w: "Difference", m: "the answer of a subtraction: {3/8}" },
    { w: "Like denominators", m: "the same bottom number: {7/8} and {4/8}" },
    { w: "Same whole", m: "we subtract only parts of the same whole" },
  ],
  ideas: [
    {
      t: "Tell me everything you can",
      ic: "🍞",
      img: "curious",
      lines: [
        "A pack of [12] rolls. [2] rolls are on the plate, [10] are left.",
        "Each roll is {1/12} of the pack.",
        "{12/12} − {2/12} = {10/12}",
      ],
    },
    {
      t: "Samantha's ribbon",
      ic: "🎀",
      lines: [
        "Samantha's ribbon is {7/8} yard long. She cuts off a {4/8} yard piece.",
        "7 tiles of {1/8}: cross out [4] tiles. 3 tiles are left.",
        "{7/8} − {4/8} = {3/8} yard.",
      ],
      vis: { kind: "fbar", rows: [{ d: 8, k: 7, cross: [3, 4, 5, 6] }] },
    },
    {
      t: "Jump back",
      ic: "🦘",
      lines: [
        "Start at {7/8} on the number line.",
        "Jump [back] 4 eighths: you land on {3/8}.",
        "Each jump is the same size: {1/8}.",
      ],
      vis: {
        kind: "fline",
        lines: [{ d: 8, from: 7, jumps: [-1, -1, -1, -1] }],
      },
    },
    {
      t: "The bottom stays",
      ic: "🟰",
      lines: [
        "Subtract the [tops]: 7 − 4 = 3.",
        "Keep the [bottom]: eighths stay eighths.",
        "We subtract only parts of the [same whole].",
      ],
      vis: { kind: "lines", rows: ["{7/8} − {4/8} = {3/8}", "7 − 4 = 3"] },
    },
    {
      t: "Five sixths take away three",
      ic: "✖️",
      lines: ["{5/6} − {3/6}: cross out 3 of the 5 sixths.", "{2/6} are left."],
      vis: { kind: "fbar", rows: [{ d: 6, k: 5, cross: [2, 3, 4] }] },
    },
  ],

  games: [
    {
      k: "sub",
      t: "Take away tiles",
      en: "Cross out and count",
      ic: "✖️",
      items: [
        [5, 2, 6],
        [7, 3, 8],
        [9, 4, 10],
        [4, 1, 5],
        [11, 6, 12],
        [3, 2, 4],
        [8, 5, 10],
        [6, 4, 8],
      ].map(([a, b, d]) => subQ("What is the difference?", a, b, d)),
    },
    {
      k: "back",
      t: "Jump back",
      en: "Number lines",
      ic: "🦘",
      items: [
        [7, 3, 6],
        [9, 4, 8],
        [5, 2, 4],
        [8, 5, 5],
      ].map(([a, b, d]) => ({
        type: "mc",
        q: "Which subtraction does the number line show?",
        opts: [
          `{${a}/${d}} − {${b}/${d}} = {${a - b}/${d}}`,
          `{${a}/${d}} + {${b}/${d}} = {${a + b}/${d}}`,
          `{${a}/${d}} − {${b}/${d}} = {${a - b}/0}`,
        ],
        vis: {
          kind: "fline",
          hi: Math.ceil(a / d),
          lines: [{ d, from: a, jumps: [-b] }],
        },
        x: `Start at {${a}/${d}}, jump back ${b}: ${a} − ${b} = ${a - b}, {${a - b}/${d}}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 9-4",
      t: "Be Curious",
      en: "Dinner rolls",
      ic: "🍞",
      from: "e-book 9-4 · Be Curious",
      keep: true,
      items: [
        {
          type: "num",
          q: "A full pack has 12 rolls. How many rolls are still in the pack?",
          a: 10,
          post: "rolls",
          img: "curious",
          x: "12 − 2 = [10]: {10/12} of the pack is left.",
        },
        {
          type: "open",
          q: "Tell me everything you can.",
          img: "curious",
          // unverified: no key; any true statement is right
          a: "A pack of 12 rolls. 2 rolls are on the plate and 10 are in the pack. {12/12} − {2/12} = {10/12}: {10/12} of the pack is left.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 9-4",
      t: "Learn: Samantha's ribbon",
      en: "Tiles and number line",
      ic: "🎀",
      from: "e-book 9-4 · Learn",
      keep: true,
      items: [
        subQ(
          "Samantha's ribbon is {7/8} yard long. One piece is {4/8} yard. How long is the other piece?",
          7,
          4,
          8,
          { post: "yard" },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 9-4",
      t: "Work Together",
      en: "Another ribbon",
      ic: "🤝",
      from: "e-book 9-4 · Work Together",
      keep: true,
      items: [
        subQ(
          "Samantha has another ribbon that is {10/12} yard long. She cuts off a {3/12} yard piece. How long is the other piece?",
          10,
          3,
          12,
          { post: "yard" },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 9-4",
      t: "On My Own 1–9",
      en: "Find the difference",
      ic: "➖",
      from: "e-book 9-4 · On My Own 1–9",
      keep: true,
      items: [
        subQ(
          "The park is {9/10} mile from Ms. Rydal's house. She walks {3/10} mile and rests on a bench. How much farther does she have to walk?",
          9,
          3,
          10,
          { post: "mile" },
        ),
        subQ("Use the fraction model. What is the difference?", 3, 1, 4),
        subQ("Use the fraction model. What is the difference?", 4, 2, 6),
        subQ("Use the fraction model. What is the difference?", 5, 3, 10),
        subQ("Use the fraction model. What is the difference?", 6, 3, 8),
        subQ("Use the number line. What is the difference?", 7, 1, 6),
        subQ("Use the number line. What is the difference?", 8, 4, 5),
        subQ("Use the number line. What is the difference?", 5, 2, 3),
        subQ("Use the number line. What is the difference?", 3, 1, 2),
      ],
    },
    {
      k: "own10",
      g: "📗 Book · Lesson 9-4",
      t: "On My Own 10–12",
      en: "Jackson, which picture, Carlos",
      ic: "💧",
      from: "e-book 9-4 · On My Own 10–12",
      keep: true,
      items: [
        subQ(
          "Error analysis: Jackson has {3/4} liter of water. After soccer practice {1/4} liter is left. How much did he drink?",
          3,
          1,
          4,
          { post: "liter" },
        ),
        {
          type: "tf",
          q: "Jackson thinks he drank more than half a liter. Is he correct?",
          a: false,
          yes: ["Yes, he is correct", "No, he is not"],
          vis: {
            kind: "fline",
            lines: [
              { d: 4, pt: 2 },
              { d: 2, pt: 1 },
            ],
          },
          x: "{3/4} − {1/4} = {2/4} = {1/2}: he drank exactly half a liter, not more.",
        },
        {
          type: "mc",
          q: "Which representation shows {3/2} − {1/2}?",
          opts: [
            "Start at {3/2} and jump back {1/2}",
            "Start at {3/2} and jump forward {1/2}",
            "Start at {1/2} and jump back {3/2}",
            "3 tiles of {1/3}, cross out 1",
          ],
          vis: { kind: "fline", hi: 2, lines: [{ d: 2 }] },
          x: "Start at the first number, {3/2}, and jump [back] {1/2}: you land on {2/2}.",
        },
        {
          type: "mc",
          q: "Extend Your Thinking: Carlos used a number line to find the difference of two fractions. What equation can you write?",
          opts: [
            "{10/8} − {6/8} = {4/8}",
            "{10/8} − {4/8} = {6/8}",
            "{4/8} + {6/8} = {10/8}",
            "{10/8} − {6/8} = {4/0}",
          ],
          vis: {
            kind: "fline",
            hi: 2,
            lines: [
              { d: 8, from: 10, jumps: [-1, -1, -1, -1, -1, -1], lab: false },
            ],
          },
          x: "He starts at {10/8} and jumps back 6 eighths to {4/8}: {10/8} − {6/8} = {4/8}.",
        },
        {
          type: "open",
          q: "Reflect: How can you use representations to subtract fractions with like denominators?",
          vis: { kind: "fbar", rows: [{ d: 8, k: 7, cross: [3, 4, 5, 6] }] },
          // unverified: a model answer, the book gives none
          a: "Show the first fraction with tiles and cross out the parts I take away, or start at it on a number line and jump back. What is left is the difference; the bottom number stays the same.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 95–96",
      t: "Additional Practice 1–6",
      en: "Lesson 9-4",
      ic: "📘",
      from: "Practice Book p. 95–96",
      keep: true,
      items: [
        subQ("Use a representation to find the difference.", 5, 3, 5),
        subQ("Use a representation to find the difference.", 7, 4, 8),
        subQ("Use the number line to find the difference.", 7, 5, 10, {
          vis: {
            kind: "fline",
            lines: [{ d: 10, from: 7, jumps: [-5], lab: false }],
          },
        }),
        subQ(
          "Lamar cuts {2/12} yard off a board that is {9/12} yard long. How long is the board now?",
          9,
          2,
          12,
          {
            post: "yard",
          },
        ),
        subQ(
          "Vanessa had {7/8} of a tank of gas before a trip and {5/8} after the trip. How much gas did she use?",
          7,
          5,
          8,
          { emoji: "⛽" },
        ),
        {
          type: "num",
          q: "Derek mixes {1/4} tablespoon blue paint, {2/4} tablespoon red paint and some yellow paint. The total is {5/4} tablespoon. How much yellow paint?",
          pre: "{5/4} − {1/4} − {2/4} =",
          fr: "?/4",
          post: "tbsp",
          a: 2,
          vis: {
            kind: "fline",
            hi: 2,
            lines: [{ d: 4, jumps: [1, 2], lab: false }],
          },
          x: "1 + 2 = 3 fourths of blue and red; 5 − 3 = 2: {5/4} − {1/4} − {2/4} = {[2]/4}.",
        },
      ],
    },
  ],
};
