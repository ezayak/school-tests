// Math · Grade 4 · Lesson 9-1 « Understand Decomposing Fractions » (Reveal Math, Unit 9 « Addition and Subtraction Meanings and Strategies with Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 1:27–2:21; no page numbers;
// On My Own 7 read from the frames between), Student Practice Book p. 89–90 (and the Unit 9 Family Letter). No teacher's key. Log: grade-4/math/SOURCES.md.
// The book's "decompose" questions take many answers: here they are "which sum is right?" (one right sum, the others are one part off)
// or "how many unit fractions?", so one answer can be checked.
const S = (parts, d) => parts.map((p) => `{${p}/${d}}`).join(" + ");
const tot = (parts) => parts.reduce((a, b) => a + b, 0);
// "Which sum is equal to {n/d}?" right: the parts of a right sum; wrong: other part lists (their totals are not n)
const sumQ = (q, [n, d], right, wrong, more = {}) => {
  if (tot(right) !== n) throw new Error(`sumQ ${n}/${d}: ${right}`);
  return {
    type: "mc",
    q,
    opts: [right, ...wrong].map((p) => S(p, d)),
    vis: {
      kind: "fline",
      hi: n > d ? Math.ceil(n / d) : 1,
      lines: [{ d, pt: n }],
    },
    x: `${right.join(" + ")} = ${n}: ${S(right, d)} = {${n}/${d}}.`,
    ...more,
  };
};
// "{n/d} is how many {1/d}?"
const unitQ = (q, [n, d], more = {}) => ({
  type: "num",
  q,
  a: n,
  post: `× {1/${d}}`,
  vis:
    n > d
      ? { kind: "fline", hi: Math.ceil(n / d), lines: [{ d, pt: n }] }
      : { kind: "fbar", rows: [{ d, k: n, l: `{${n}/${d}}` }] },
  x: `{${n}/${d}} = ${S(Array(n).fill(1), d)}: [${n}] unit fractions.`,
  ...more,
});

window.LESSON = {
  n: "9-1",
  key: "math4-l9-1",
  grade: 4,
  title: "Break Up a Fraction",
  en: "Decompose a fraction into a sum of fractions with the same denominator",
  unit: "Unit 9 · Lesson 9-1",
  book: "e-book Lesson 9-1 · Practice Book p. 89–90",
  imgDir: "img/lesson-9-1",
  cover: "curious",
  question: {
    q: "How can I find [more than one way] to decompose a fraction?",
    // unverified: a model answer, the book gives none
    a: "Write it as unit fractions first: {4/6} = {1/6} + {1/6} + {1/6} + {1/6}. Then put some of them together: {2/6} + {2/6}, or {3/6} + {1/6}.",
    img: "curious",
  },
  words: [
    {
      w: "Decompose",
      m: "break into parts: {7/12} = {2/12} + {1/12} + {4/12}",
    },
    { w: "Compose", m: "put parts together: {2/8} + {3/8} = {5/8}" },
    { w: "Unit fraction", m: "a fraction with 1 on top: {1/5}" },
    { w: "Like denominators", m: "the same bottom number: {1/4} and {3/4}" },
    { w: "Sum", m: "the answer of an addition" },
  ],
  ideas: [
    {
      t: "Six tenths",
      ic: "🟪",
      img: "curious",
      lines: [
        "6 tiles of {1/10}, put in groups in different ways.",
        "{6/10} = {1/10} + {1/10} + … (6 times)",
        "{6/10} = {2/10} + {3/10} + {1/10}: the [same amount].",
      ],
    },
    {
      t: "Unit fractions",
      ic: "1️⃣",
      lines: [
        "{8/5} is 8 jumps of {1/5} on the number line.",
        "{8/5} = {1/5} + {1/5} + {1/5} + {1/5} + {1/5} + {1/5} + {1/5} + {1/5}",
        "8 parts: the [greatest] number of parts.",
      ],
      vis: { kind: "fline", hi: 2, lines: [{ d: 5, pt: 8 }] },
    },
    {
      t: "Bigger parts",
      ic: "🧩",
      lines: [
        "Put some unit fractions together:",
        "{8/5} = {3/5} + {2/5} + {3/5}",
        "{8/5} = {2/5} + {2/5} + {2/5} + {2/5}, or {5/5} + {3/5}.",
      ],
      vis: {
        kind: "lines",
        rows: ["3 + 2 + 3 = 8", "2 + 2 + 2 + 2 = 8", "5 + 3 = 8"],
        note: "the tops add up to 8, the bottom stays 5",
      },
    },
    {
      t: "Work Together",
      ic: "🤝",
      lines: [
        "Decompose {5/6} into 3 fractions, two different ways:",
        "{5/6} = {1/6} + {1/6} + {3/6}",
        "{5/6} = {2/6} + {2/6} + {1/6}",
      ],
      vis: { kind: "fbar", rows: [{ d: 6, k: 5, l: "{5/6}" }] },
    },
    {
      t: "How to do it",
      ic: "💡",
      lines: [
        "Keep the [bottom number] the same.",
        "Split the [top number]: 4 = 1 + 1 + 1 + 1 = 2 + 2 = 3 + 1.",
        "{4/6} = {2/6} + {2/6} = {3/6} + {1/6}",
      ],
      vis: {
        kind: "fline",
        lines: [{ d: 6, pt: 4 }],
      },
    },
  ],

  games: [
    {
      k: "unit",
      t: "How many unit fractions?",
      en: "Count the parts",
      ic: "1️⃣",
      items: [
        [3, 4],
        [5, 6],
        [7, 10],
        [4, 8],
        [6, 5],
        [9, 12],
      ].map((f) => unitQ(`{${f[0]}/${f[1]}} is how many {1/${f[1]}}?`, f)),
    },
    {
      k: "sum",
      t: "Which sum is right?",
      en: "Decompose",
      ic: "🧩",
      items: [
        [
          [5, 8],
          [2, 3],
          [
            [2, 2],
            [1, 3],
          ],
        ],
        [
          [7, 10],
          [3, 2, 2],
          [
            [3, 3, 2],
            [2, 2, 2],
          ],
        ],
        [
          [4, 6],
          [1, 1, 2],
          [
            [2, 3],
            [1, 1, 1],
          ],
        ],
        [
          [9, 12],
          [4, 5],
          [
            [4, 4],
            [5, 5],
          ],
        ],
        [
          [6, 4],
          [3, 3],
          [
            [3, 2],
            [2, 2, 3],
          ],
        ],
      ].map(([f, r, w]) =>
        sumQ(`Which sum is equal to {${f[0]}/${f[1]}}?`, f, r, w),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 9-1",
      t: "Be Curious",
      en: "Fraction tiles",
      ic: "🟪",
      from: "e-book 9-1 · Be Curious",
      keep: true,
      items: [
        {
          type: "num",
          q: "How many {1/10} tiles are in each row?",
          a: 6,
          img: "curious",
          post: "tiles",
          x: "Each row has [6] tiles of {1/10}: {6/10}.",
        },
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "The same: each row is 6 tiles of {1/10}, {6/10}. Different: the tiles are in different groups: all together, one by one, 2 + 3 + 1.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 9-1",
      t: "Learn: eight fifths",
      en: "The greatest number of parts",
      ic: "1️⃣",
      from: "e-book 9-1 · Learn",
      keep: true,
      items: [
        unitQ(
          "How can you decompose {8/5} into the greatest number of parts? How many {1/5}?",
          [8, 5],
          { vis: { kind: "fline", hi: 2, lines: [{ d: 5, pt: 8 }] } },
        ),
        sumQ(
          "You can put unit fractions together to make greater addends. Which sum is equal to {8/5}?",
          [8, 5],
          [3, 2, 3],
          [
            [3, 3, 3],
            [2, 2, 3],
          ],
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 9-1",
      t: "Work Together",
      en: "Five sixths, two ways",
      ic: "🤝",
      from: "e-book 9-1 · Work Together",
      keep: true,
      items: [
        {
          type: "multi",
          q: "How can you decompose {5/6} into a sum of three fractions? Choose all the right ways.",
          opts: [
            [[1, 1, 3], true],
            [[2, 2, 1], true],
            [[1, 3, 1], true],
            [[2, 2, 2], false],
            [[1, 1, 2], false],
          ].map(([p, ok]) => ({ t: S(p, 6), ok, emoji: "🟧" })),
          vis: { kind: "fbar", rows: [{ d: 6, k: 5, l: "{5/6}" }] },
          x: "The tops must add up to 5: 1 + 1 + 3 = 5, 2 + 2 + 1 = 5, 1 + 3 + 1 = 5. (2 + 2 + 2 = 6 and 1 + 1 + 2 = 4 are wrong.)",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 9-1",
      t: "On My Own 1–6",
      en: "Decompose",
      ic: "🧩",
      from: "e-book 9-1 · On My Own 1–6",
      keep: true,
      items: [
        unitQ(
          "How can you decompose {5/8} into unit fractions? How many {1/8}?",
          [5, 8],
        ),
        unitQ(
          "How can you decompose {4/5} into unit fractions? How many {1/5}?",
          [4, 5],
        ),
        // unverified: the book takes any right sum; one right sum is in the choices
        sumQ(
          "Decompose {12/8} into a sum of 5 fractions. Which sum is right?",
          [12, 8],
          [4, 2, 2, 2, 2],
          [
            [3, 2, 2, 2, 2],
            [4, 4, 2, 2, 2],
            [3, 3, 3, 3],
          ],
        ),
        sumQ(
          "Decompose {9/6} into a sum of 3 fractions. Which sum is right?",
          [9, 6],
          [3, 3, 3],
          [
            [3, 3, 2],
            [4, 4, 4],
            [6, 3],
          ],
        ),
        {
          type: "multi",
          q: "Decompose {7/10} into a sum of 4 fractions. Choose the two (or more) right ways.",
          opts: [
            [[1, 2, 2, 2], true],
            [[4, 1, 1, 1], true],
            [[2, 2, 2, 2], false],
            [[3, 1, 1, 1], false],
          ].map(([p, ok]) => ({ t: S(p, 10), ok, emoji: "🔟" })),
          vis: { kind: "fline", lines: [{ d: 10, pt: 7 }] },
          x: "The tops must add up to 7: 1 + 2 + 2 + 2 = 7, 4 + 1 + 1 + 1 = 7. (2 + 2 + 2 + 2 = 8, 3 + 1 + 1 + 1 = 6.)",
        },
        sumQ(
          "Tricia puts {9/12} of a casserole into 3 containers. What fraction could she have put into each container?",
          [9, 12],
          [3, 3, 3],
          [
            [3, 3, 2],
            [3, 4, 3],
            [9, 9, 9],
          ],
          { emoji: "🥘" },
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 9-1",
      t: "On My Own 7–11",
      en: "Amy, lasagna, ladybugs, Jana",
      ic: "🐞",
      from: "e-book 9-1 · On My Own 7–11",
      keep: true,
      items: [
        {
          type: "num",
          q: "Amy decomposes a fraction into a sum of fractions. What fraction could Amy have decomposed?",
          fr: "?/8",
          post: "= {2/8} + {1/8} + {2/8}",
          a: 5,
          vis: { kind: "lines", rows: ["{?/8} = {2/8} + {1/8} + {2/8}"] },
          x: "2 + 1 + 2 = [5]: {5/8} = {2/8} + {1/8} + {2/8}.",
        },
        // unverified: the book takes any right sum; one right sum is in the choices
        sumQ(
          "A family of 4 ate {7/12} of a lasagna. How much lasagna could each person have eaten?",
          [7, 12],
          [2, 2, 2, 1],
          [
            [2, 2, 2, 2],
            [1, 1, 1, 1],
            [3, 3, 1],
          ],
          { emoji: "🍝" },
        ),
        sumQ(
          "STEM Connection: Owen measures 3 ladybugs. Together they are {9/10} inch long. What length might each ladybug be?",
          [9, 10],
          [3, 3, 3],
          [
            [3, 3, 2],
            [4, 4, 4],
            [2, 2, 2],
          ],
          { emoji: "🐞" },
        ),
        {
          type: "num",
          q: "A team of 6 people ran a relay race. Each person ran {1/4} mile. How far did the team run?",
          fr: "?/4",
          post: "mile",
          a: 6,
          vis: { kind: "lines", rows: ["6 × {1/4} = {?/4}"] },
          x: "6 people × {1/4} mile = {[6]/4} mile.",
        },
        sumQ(
          "A team of 4 people runs the same {6/4} mile. How far might each of the 4 people run?",
          [6, 4],
          [2, 2, 1, 1],
          [
            [1, 1, 1, 1],
            [2, 2, 2, 2],
            [2, 1, 1],
          ],
          { emoji: "🏃" },
        ),
        {
          type: "tf",
          q: "Extend Your Thinking: Jana says {2/3} = {1/3} + {1/3} is the only way to decompose {2/3}. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: {
            kind: "fbar",
            rows: [
              { d: 3, k: 2, l: "{2/3}" },
              { d: 6, k: 4, l: "{4/6}" },
            ],
          },
          x: "{2/3} = {4/6} = {1/6} + {1/6} + {2/6}: there are other ways with an equivalent fraction.",
        },
        {
          type: "open",
          q: "Reflect: How can you find more than one way to decompose a fraction?",
          vis: {
            kind: "lines",
            rows: ["{4/6} = {2/6} + {2/6}", "{4/6} = {3/6} + {1/6}"],
          },
          // unverified: a model answer, the book gives none
          a: "Keep the bottom number. Split the top number in different ways: 4 = 2 + 2 = 3 + 1 = 1 + 1 + 1 + 1.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 89–90",
      t: "Additional Practice 1–7",
      en: "Lesson 9-1",
      ic: "📘",
      from: "Practice Book p. 89–90",
      keep: true,
      // unverified: the book takes any right sum; one right sum is in the choices
      items: [
        sumQ(
          "Decompose {9/4} into a sum of 3 fractions.",
          [9, 4],
          [3, 3, 3],
          [
            [3, 3, 2],
            [4, 4, 4],
            [2, 2, 2],
          ],
        ),
        sumQ(
          "Decompose {6/10} into a sum of 4 fractions.",
          [6, 10],
          [3, 1, 1, 1],
          [
            [2, 2, 2, 2],
            [1, 1, 1, 1],
            [3, 3, 1, 1],
          ],
        ),
        sumQ(
          "Decompose {11/12} into a sum of 6 fractions.",
          [11, 12],
          [2, 2, 2, 2, 2, 1],
          [
            [2, 2, 2, 2, 2, 2],
            [1, 1, 1, 1, 1, 1],
            [3, 2, 2, 2, 2, 1],
          ],
        ),
        {
          type: "multi",
          q: "Show two different ways to decompose {4/5}. Choose all the right ones.",
          opts: [
            [[2, 2], true],
            [[1, 3], true],
            [[1, 1, 1, 1], true],
            [[2, 3], false],
            [[1, 1, 1], false],
          ].map(([p, ok]) => ({ t: S(p, 5), ok, emoji: "🟦" })),
          vis: { kind: "fline", lines: [{ d: 5, pt: 4 }] },
          x: "The tops add up to 4: 2 + 2, 1 + 3, 1 + 1 + 1 + 1. (2 + 3 = 5 and 1 + 1 + 1 = 3 are wrong.)",
        },
        sumQ(
          "Anthony runs {10/12} mile in five parts, with breaks. Which sum shows five smaller distances?",
          [10, 12],
          [2, 2, 2, 2, 2],
          [
            [2, 2, 2, 2],
            [3, 2, 2, 2, 2],
            [1, 1, 1, 1, 1],
          ],
          { emoji: "🏃" },
        ),
        sumQ(
          "Daniel has {7/10} of a book left to read, in three reading sessions. Which sum is right?",
          [7, 10],
          [3, 2, 2],
          [
            [3, 3, 3],
            [2, 2, 2],
            [4, 2, 2],
          ],
          { emoji: "📖" },
        ),
        sumQ(
          "Charnelle decomposes {3/8} into a sum of three fractions. Which three fractions?",
          [3, 8],
          [1, 1, 1],
          [
            [1, 1, 2],
            [3, 3, 3],
            [1, 2, 1, 1],
          ],
          {
            x: "1 + 1 + 1 = 3: {1/8} + {1/8} + {1/8} = {3/8}. With eighths it is the only way to make 3 parts.",
          },
        ),
      ],
    },
  ],
};
