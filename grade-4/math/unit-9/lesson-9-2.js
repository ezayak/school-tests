// Math · Grade 4 · Lesson 9-2 « Represent Adding Fractions » (Reveal Math, Unit 9 « Addition and Subtraction Meanings and Strategies with Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 2:21–3:27; no page numbers;
// On My Own 1 and 2 read from the frames between: 2 = Aaron's jumps 4, 1, 2 twelfths), Student Practice Book p. 91–92 (6: Julio's jumps 3, 1, 4, 3 twelfths).
// No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
const S = (parts, d) => parts.map((p) => `{${p}/${d}}`).join(" + ");
const tot = (parts) => parts.reduce((a, b) => a + b, 0);
// "{a/d} + {b/d} = ?": the top of the sum; the model is d tiles (or a number line with jumps when the sum is more than 1)
const addQ = (q, parts, d, more = {}) => {
  const n = tot(parts);
  return {
    type: "num",
    q,
    pre: `${S(parts, d)} =`,
    fr: `?/${d}`,
    a: n,
    vis:
      n > d
        ? {
            kind: "fline",
            hi: Math.ceil(n / d),
            lines: [{ d, jumps: parts, lab: false }],
          }
        : { kind: "fbar", rows: [{ d }] },
    x: `${parts.join(" + ")} = ${n}: ${S(parts, d)} = {[${n}]/${d}}. The bottom number stays ${d}.`,
    ...more,
  };
};

window.LESSON = {
  n: "9-2",
  key: "math4-l9-2",
  grade: 4,
  title: "Show Adding Fractions",
  en: "Add fractions with the same denominator using tiles and number lines",
  unit: "Unit 9 · Lesson 9-2",
  book: "e-book Lesson 9-2 · Practice Book p. 91–92",
  imgDir: "img/lesson-9-2",
  cover: "curious",
  question: {
    q: "How can a [picture] show adding fractions with like denominators?",
    // unverified: a model answer, the book gives none
    a: "Fraction tiles or jumps on a number line: put the parts together and count them. {3/8} + {5/8} = {8/8}: the [bottom number stays the same].",
    img: "curious",
  },
  words: [
    { w: "Compose", m: "put parts together: {2/8} + {3/8} = {5/8}" },
    { w: "Like denominators", m: "the same bottom number: {3/8} and {5/8}" },
    {
      w: "Fraction tiles",
      m: "pieces of the same whole: 8 tiles of {1/8} make 1",
    },
    { w: "Sum", m: "the answer of an addition: {8/8}" },
  ],
  ideas: [
    {
      t: "What could the question be?",
      ic: "🥪",
      img: "curious",
      lines: [
        "Sandwiches cut in fourths: {2/4}, {3/4} and {1/4} are left on the plates.",
        "How much sandwich is left [in all]?",
        "{2/4} + {3/4} + {1/4} = {6/4}",
      ],
    },
    {
      t: "Loretta's peanut mix",
      ic: "🥜",
      lines: [
        "{3/8} pound of salty peanuts and {5/8} pound of spicy peanuts.",
        "3 tiles of {1/8} and 5 tiles of {1/8}: every tile is the [same size].",
        "{3/8} + {5/8} = {8/8}: she will make {8/8} pound.",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 8, on: [0, 1, 2], l: "{3/8}" },
          { d: 8, on: [3, 4, 5, 6, 7], l: "{5/8}", c: 1 },
        ],
      },
    },
    {
      t: "The bottom stays the same",
      ic: "🟰",
      lines: [
        "Add the [tops]: 3 + 5 = 8.",
        "Keep the [bottom]: eighths stay eighths.",
        "{3/8} + {5/8} = {8/8}, not {8/16}!",
      ],
      vis: {
        kind: "fline",
        lines: [{ d: 8, jumps: [3, 5] }],
      },
    },
    {
      t: "Macie's juice",
      ic: "🧃",
      lines: [
        "{1/4} bottle of juice in a big bottle, {1/4} bottle in a small bottle.",
        "Macie says she will have {1/2} bottle. But the bottles are [not the same size]!",
        "We can add fractions only of the [same whole].",
      ],
      vis: {
        kind: "lines",
        rows: ["🍶 {1/4} of a big bottle", "🧴 {1/4} of a small bottle"],
      },
    },
    {
      t: "Jumps on a number line",
      ic: "🦘",
      lines: [
        "{1/6} + {2/6} + {2/6}: jump 1, then 2, then 2 sixths.",
        "You land on [{5/6}].",
      ],
      vis: { kind: "fline", lines: [{ d: 6, jumps: [1, 2, 2] }] },
    },
  ],

  games: [
    {
      k: "add",
      t: "Add the tiles",
      en: "Same bottom number",
      ic: "🟦",
      items: [
        [[2, 3], 6],
        [[1, 4], 8],
        [[3, 2, 1], 10],
        [[1, 1, 1], 5],
        [[4, 3], 12],
        [[2, 1], 4],
        [[3, 4], 6],
        [[5, 4], 8],
      ].map(([p, d]) => addQ("What is the sum?", p, d)),
    },
    {
      k: "jumps",
      t: "Read the jumps",
      en: "Number lines",
      ic: "🦘",
      items: [
        [[2, 3], 8],
        [[1, 2, 2], 6],
        [[3, 1, 4], 10],
        [[2, 2, 2], 5],
      ].map(([p, d]) => ({
        type: "mc",
        q: "Which addition does the number line show?",
        opts: [
          `${S(p, d)} = {${tot(p)}/${d}}`,
          `${S(p, d)} = {${tot(p)}/${d * p.length}}`,
          `${S(
            p.map((x) => x + 1),
            d,
          )} = {${tot(p) + p.length}/${d}}`,
        ],
        vis: {
          kind: "fline",
          hi: Math.ceil(tot(p) / d),
          lines: [{ d, jumps: p }],
        },
        x: `${p.join(" + ")} = ${tot(p)}: ${S(p, d)} = {${tot(p)}/${d}}. The bottom number stays ${d}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 9-2",
      t: "Be Curious",
      en: "Sandwiches",
      ic: "🥪",
      from: "e-book 9-2 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What could the question be?",
          img: "curious",
          // unverified: no key; any question about the sandwich pieces is right
          a: "How much sandwich is left on the three plates? {2/4} + {3/4} + {1/4} = {6/4}. Or: how much more is on the second plate than on the third?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 9-2",
      t: "Learn: peanut mix",
      en: "Add fraction tiles",
      ic: "🥜",
      from: "e-book 9-2 · Learn",
      keep: true,
      items: [
        addQ(
          "Loretta uses {3/8} pound of salty peanuts and {5/8} pound of spicy peanuts. How many pounds of peanut mix will she make?",
          [3, 5],
          8,
          {
            post: "pound",
            vis: {
              kind: "fbar",
              rows: [
                { d: 8, on: [0, 1, 2], l: "salty" },
                { d: 8, on: [3, 4, 5, 6, 7], l: "spicy", c: 1 },
              ],
            },
          },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 9-2",
      t: "Work Together",
      en: "Macie's juice",
      ic: "🧃",
      from: "e-book 9-2 · Work Together",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Macie has {1/4} of a big bottle of juice and {1/4} of a small bottle. She says if she pours the juice into one bottle, she will have {1/2} bottle. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: {
            kind: "lines",
            rows: ["🍶 {1/4} of a big bottle", "🧴 {1/4} of a small bottle"],
          },
          // unverified: no key; the book's point is the different wholes
          x: "{1/4} + {1/4} = {2/4} = {1/2} only for the same bottle. The bottles are not the same size: we can't add the fractions.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 9-2",
      t: "On My Own 1–7",
      en: "Find the sum",
      ic: "➕",
      from: "e-book 9-2 · On My Own 1–7",
      keep: true,
      items: [
        addQ("How can you find the sum?", [1, 1, 1, 1], 5),
        {
          type: "mc",
          q: "Aaron used a number line to find the sum of three fractions. What fractions did Aaron add?",
          opts: [
            S([4, 1, 2], 12),
            S([3, 1, 3], 12),
            S([4, 2, 2], 12),
            S([1, 1, 1], 12),
          ],
          vis: {
            kind: "fline",
            lines: [{ d: 12, lab: false, jumps: [4, 1, 2] }],
          },
          x: "Count the jumps: 4 twelfths, then 1, then 2: {4/12} + {1/12} + {2/12}.",
        },
        addQ("What is the sum?", [4, 1, 2], 12, {
          vis: {
            kind: "fline",
            lines: [{ d: 12, lab: false, jumps: [4, 1, 2] }],
          },
        }),
        addQ("Use the fraction model. What is the sum?", [5, 2, 3], 12),
        addQ("Use the fraction model. What is the sum?", [2, 5], 8),
        addQ("Use the fraction model. What is the sum?", [1, 1, 1, 1], 6),
        addQ("Use the fraction model. What is the sum?", [1, 2], 4),
        addQ(
          "Hank combines {5/12} gallon of red paint with {6/12} gallon of white paint. How much pink paint does Hank have?",
          [5, 6],
          12,
          { post: "gallon" },
        ),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · Lesson 9-2",
      t: "On My Own 8–12",
      en: "Error, snow, Jin",
      ic: "❄️",
      from: "e-book 9-2 · On My Own 8–12",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Error Analysis: a student wrote {2/6} + {3/6} = {5/12}. Is the student right?",
          a: false,
          yes: ["Yes", "No"],
          vis: { kind: "fline", lines: [{ d: 6, jumps: [2, 3] }] },
          x: "The bottom number stays the same: {2/6} + {3/6} = {5/6}. The student added the bottoms too.",
        },
        addQ("Use the number line. What is the sum?", [2, 2, 2], 5),
        addQ("Use the number line. What is the sum?", [3, 2], 4),
        addQ(
          "Before school it snowed {3/8} inch, during school {2/8} inch, after school {5/8} inch. How much did it snow?",
          [3, 2, 5],
          8,
          { post: "inch" },
        ),
        addQ(
          "Extend Your Thinking: Jin jogged {3/10} km, walked {5/10} km and ran {2/10} km. How far did he go?",
          [3, 5, 2],
          10,
          { post: "km" },
        ),
        {
          type: "tf",
          q: "Jin wants to run or walk at least 1 kilometer each day. Did he meet his goal?",
          a: true,
          yes: ["Yes", "No"],
          vis: {
            kind: "fline",
            lines: [{ d: 10, lab: false, jumps: [3, 5, 2] }],
          },
          x: "{10/10} = 1 kilometer: yes, he met his goal.",
        },
        {
          type: "open",
          q: "Reflect: How can you use representations to show adding fractions with like denominators?",
          vis: { kind: "fline", lines: [{ d: 8, jumps: [3, 5] }] },
          // unverified: a model answer, the book gives none
          a: "With fraction tiles of the same size, or jumps on a number line cut in the same parts. I put the parts together and count them; the bottom number stays the same.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 91–92",
      t: "Additional Practice 1–8",
      en: "Lesson 9-2",
      ic: "📘",
      from: "Practice Book p. 91–92",
      keep: true,
      items: [
        addQ("Use the representation to find the sum.", [4, 2], 8),
        addQ("Use the representation to find the sum.", [1, 1, 2], 5),
        addQ("Use the representation to find the sum.", [8, 2, 2], 12),
        addQ("Use the representation to find the sum.", [1, 2, 3, 1], 10),
        addQ("Use the number line to find the sum.", [3, 2, 2], 6),
        {
          type: "mc",
          q: "Julio used a number line to find the sum of four fractions. What fractions did Julio add together?",
          opts: [
            S([3, 1, 4, 3], 12),
            S([3, 1, 3, 3], 12),
            S([2, 1, 4, 3], 12),
            S([3, 2, 4, 2], 12),
          ],
          vis: {
            kind: "fline",
            lines: [{ d: 12, lab: false, jumps: [3, 1, 4, 3] }],
          },
          x: "Count the jumps: 3, 1, 4, 3 twelfths.",
        },
        addQ("What is the sum of his fractions?", [3, 1, 4, 3], 12, {
          vis: {
            kind: "fline",
            lines: [{ d: 12, lab: false, jumps: [3, 1, 4, 3] }],
          },
        }),
        addQ(
          "Willow mixes {1/4} cup of sugar with {2/4} cup of flour. How many cups of mixture does she have?",
          [1, 2],
          4,
          { post: "cup" },
        ),
        addQ(
          "Alex mows {5/8} of his yard at 10:00 a.m., {1/8} at 2:00 p.m. and {1/8} at 7:00 p.m. How much did he mow?",
          [5, 1, 1],
          8,
        ),
        {
          type: "tf",
          q: "Does Alex mow his whole yard?",
          a: false,
          yes: ["Yes", "No"],
          vis: { kind: "fbar", rows: [{ d: 8, k: 7 }] },
          x: "{5/8} + {1/8} + {1/8} = {7/8}: the whole yard is {8/8}. {1/8} is still not mowed.",
        },
      ],
    },
  ],
};
