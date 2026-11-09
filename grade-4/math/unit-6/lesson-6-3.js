// Math · Grade 4 · Lesson 6-3 « Use the Distributive Property to Multiply » (Reveal Math, Unit 6).
// Sources: Student Edition Vol. 1 p. 173–176, Student Practice Book p. 51–52. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Partial products come from shared/math-kit.js (distrib: a × b = (a × p) + (a × q), each part worked out).
const { distrib } = MathKit;
// "Which expressions show a × b?" (choose all): (a × p) + (a × q) is right when p + q = b
const splitQ = (a, b, pairs) => ({
  type: "multi",
  q: `Which expressions show how to break up ${a} × ${b}? Choose all.`,
  opts: pairs.map(([p, q]) => ({
    t: `(${a} × ${p}) + (${a} × ${q})`,
    ok: p + q === b,
    emoji: "✖️",
  })),
});

window.LESSON = {
  n: "6-3",
  key: "math4-l6-3",
  grade: 4,
  title: "Break Apart to Multiply",
  en: "The Distributive Property: break one factor into parts and add the partial products",
  unit: "Unit 6 · Lesson 6-3",
  book: "Book p. 173–176 · Practice Book p. 51–52",
  imgDir: "img/lesson-6-3",
  cover: "curious",
  question: {
    q: "How can I find a product by [breaking apart] a factor?",
    a: "7 × 12: break 12 into 10 + 2. 7 × 10 = 70 and 7 × 2 = 14 are the [partial products]. Add them: 70 + 14 = [84].",
    img: "array",
  },
  words: [
    {
      w: "Distributive Property",
      m: "a × b = a × (part 1) + a × (part 2): 7 × 12 = 7 × 10 + 7 × 2",
    },
    { w: "Decompose", m: "break a number into parts: 12 = 10 + 2" },
    { w: "Partial product", m: "the product of one part: 7 × 10 = 70" },
    { w: "Array", m: "dots in equal rows and columns" },
  ],
  ideas: [
    {
      t: "Is it always true?",
      ic: "🔴",
      img: "curious",
      lines: [
        "5 rows of 6 buttons: 4 red and 2 blue in each row.",
        "5 × 6 = 5 × 4 + 5 × 2 = 20 + 10 = [30].",
        "Breaking a row into parts does not change the total: [always] true.",
      ],
    },
    {
      t: "Break 12 into 10 + 2",
      ic: "✂️",
      img: "array",
      lines: [
        "7 rows of 12 dots. Cut each row into 10 and 2.",
        "7 × 10 = [70] and 7 × 2 = [14].",
        "70 + 14 = [84], so 7 × 12 = 84.",
      ],
    },
    {
      t: "Different ways",
      ic: "🔀",
      lines: [
        "6 × 15 = (6 × 10) + (6 × 5) = 60 + 30 = 90.",
        "6 × 15 = (6 × 7) + (6 × 8) = 42 + 48 = 90.",
        "Any parts work if they [add up] to the factor.",
      ],
      vis: { kind: "lines", rows: ["15 = 10 + 5", "15 = 7 + 8"] },
    },
    {
      t: "Check the parts",
      ic: "⚠️",
      lines: [
        "4 × 9 with (4 × 4) + (4 × 4)? 4 + 4 = 8, [not 9]!",
        "The parts must add up to the factor you break.",
        "(4 × 5) + (4 × 4) = 20 + 16 = [36].",
      ],
      vis: { kind: "lines", rows: ["4 + 4 = 8 ✗", "5 + 4 = 9 ✓"] },
    },
  ],

  games: [
    {
      k: "break",
      keep: true,
      t: "Break it apart",
      en: "Tens and ones",
      ic: "✂️",
      items: [
        ...distrib(3, 16, 10),
        ...distrib(6, 14, 10),
        ...distrib(8, 12, 10),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 173–176",
      t: "Be Curious",
      en: "5 × 6 = 5 × 4 + 5 × 2",
      ic: "🔴",
      from: "Book p. 173 · Be Curious",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Is 5 × 6 = 5 × 4 + 5 × 2 always true?",
          a: true,
          yes: ["Yes", "No"],
          img: "curious",
          x: "5 × 4 + 5 × 2 = 20 + 10 = [30] = 5 × 6. The 6 buttons in a row are 4 red + 2 blue.",
        },
        {
          type: "open",
          q: "Why is it always true?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Each row of 6 buttons is 4 red and 2 blue. 5 rows of 4 red plus 5 rows of 2 blue are all the buttons, 5 rows of 6.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 173–176",
      t: "Learn: 7 × 12",
      en: "12 = 10 + 2",
      ic: "✂️",
      from: "Book p. 174 · Learn",
      keep: true,
      items: distrib(7, 12, 10, "7 × 12: break 12 into 10 + 2.", {
        img: "array",
        vis: undefined,
      }),
    },
    {
      k: "together",
      g: "📗 Book · p. 173–176",
      t: "Work Together",
      en: "6 × 15, two ways",
      ic: "🤝",
      from: "Book p. 174 · Work Together",
      keep: true,
      items: [
        ...distrib(6, 15, 10, "6 × 15, one way: 15 = 10 + 5."),
        ...distrib(6, 15, 7, "Another way: 15 = 7 + 8."),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 173–176",
      t: "On My Own 1–6",
      en: "Use the Distributive Property",
      ic: "✖️",
      from: "Book p. 175 · On My Own 1–6",
      keep: true,
      items: [
        ...distrib(5, 13, 10, "5 × 13 = 5 × (10 + 3)."),
        ...distrib(4, 15, 10, "4 × 15 = 4 × (10 + 5)."),
        ...distrib(7, 9, 5, "7 × 9: break 9 into 5 + 4."),
        ...distrib(8, 12, 10, "12 × 8 = 8 × 12: break 12 into 10 + 2."),
        ...distrib(3, 14, 10, "3 × 14: break 14 into 10 + 4."),
        ...distrib(5, 17, 10, "5 × 17: break 17 into 10 + 7."),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 173–176",
      t: "On My Own 7–10",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 176 · On My Own 7–10",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Quin finds 6 × 8 with (3 × 8) + (3 × 8). Jasmine uses (6 × 4) + (6 × 4). Who is correct?",
          opts: ["Both are correct", "Only Quin", "Only Jasmine"],
          vis: {
            kind: "lines",
            rows: [
              "(3 × 8) + (3 × 8) = 24 + 24",
              "(6 × 4) + (6 × 4) = 24 + 24",
            ],
          },
          x: "Quin breaks 6 into 3 + 3, Jasmine breaks 8 into 4 + 4. Both give [48].",
        },
        ...distrib(6, 13, 10, "Kayla planted 6 rows of 13 bulbs. 13 = 10 + 3."),
        ...distrib(4, 14, 10, "4 shelves hold 14 boxes each. 14 = 10 + 4."),
        {
          type: "num",
          q: "Each row of a pillow has 7 stars and 8 squares. 35 + 40 = 75. How many rows are there?",
          a: 5,
          post: "rows",
          vis: { kind: "lines", rows: ["35 = ? × 7", "40 = ? × 8"] },
          x: "35 = 5 × 7 and 40 = 5 × 8: [5] rows. 5 × 15 = 75.",
        },
        {
          type: "open",
          q: "Reflect: How can you find products using the Distributive Property?",
          img: "array",
          // unverified: a model answer, the book gives none
          a: "Break one factor into easy parts (often tens and ones), multiply each part by the other factor, then add the partial products.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 51–52",
      t: "Additional Practice 1–6",
      en: "Lesson 6-3",
      ic: "📘",
      from: "Practice Book p. 51–52",
      keep: true,
      items: [
        splitQ(5, 9, [
          [5, 4],
          [7, 2],
          [3, 2],
          [8, 1],
        ]),
        splitQ(4, 7, [
          [2, 2],
          [4, 3],
          [5, 2],
          [7, 7],
        ]),
        ...distrib(6, 8, 5, "Find 6 × 8 by breaking 8 into 5 + 3."),
        ...distrib(8, 9, 5, "Find 8 × 9 by breaking 9 into 5 + 4."),
        ...distrib(9, 9, 5, "Find 9 × 9 by breaking one 9 into 5 + 4."),
        {
          type: "tf",
          q: "Carson thinks you can find 4 × 9 with (4 × 4) + (4 × 4). Is he right?",
          a: false,
          yes: ["Yes, he is", "No, he is not"],
          vis: { kind: "lines", rows: ["4 + 4 = 8", "(4 × 4) + (4 × 4) = 32"] },
          x: "4 + 4 = 8, not 9: that is 4 × 8 = 32. Use (4 × 5) + (4 × 4) = [36].",
        },
      ],
    },
  ],
};
