// Math · Grade 4 · Lesson 8-3 « Generate Equivalent Fractions Using Number Lines » (Reveal Math, Unit 8 « Fraction Equivalence »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-18-07.mp4, 1:45–2:47; no page numbers),
// Student Practice Book p. 83–84. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The book's "find an equivalent fraction" takes any right fraction: the questions here give the bottom number, so one answer can be checked.
// "{a/b} = {?/d}" with the number line of the book (b parts, the point at a; lab: false like the book)
const lineQ = (q, [a, b], d, more = {}) => {
  const t = (a * d) / b;
  const how =
    d > b
      ? `${a} × ${d / b} = ${t}, ${b} × ${d / b} = ${d}`
      : `${a} ÷ ${b / d} = ${t}, ${b} ÷ ${b / d} = ${d}`;
  return {
    type: "num",
    q,
    pre: `{${a}/${b}} =`,
    fr: `?/${d}`,
    a: t,
    vis: { kind: "fline", lines: [{ d: b, pt: a, lab: false }] },
    x: `${how}: {${a}/${b}} = {[${t}]/${d}}`,
    ...more,
  };
};

window.LESSON = {
  n: "8-3",
  key: "math4-l8-3",
  grade: 4,
  title: "Equivalent Fractions on a Number Line",
  en: "The same point on a number line, cut in more or fewer parts",
  unit: "Unit 8 · Lesson 8-3",
  book: "e-book Lesson 8-3 · Practice Book p. 83–84",
  imgDir: "img/lesson-8-3",
  cover: "trail",
  question: {
    q: "What [patterns] do I see when I find equivalent fractions on a number line?",
    // unverified: a model answer, the book gives none
    a: "Cut every part in 2: twice as many parts, and the point is at twice the number. {1/2} = {2/4}. Put 3 parts together: {9/12} = {3/4}.",
    img: "trail",
  },
  words: [
    {
      w: "Number line",
      m: "a line with numbers in order; 0 to 1 can be cut in equal parts",
    },
    {
      w: "Equivalent fractions",
      m: "the same point on the number line: {1/2} = {2/4}",
    },
    { w: "Multiply", m: "more, smaller parts: {1/2} = {2/4} (× 2)" },
    { w: "Divide", m: "fewer, bigger parts: {9/12} = {3/4} (÷ 3)" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "📏",
      lines: [
        "Three rulers from 0 to 3: in wholes, in halves, in fourths.",
        "{1/2} and {2/4} are at the [same place] on the rulers.",
      ],
      vis: {
        kind: "fline",
        hi: 3,
        lines: [{ d: 1 }, { d: 2 }, { d: 4 }],
      },
    },
    {
      t: "On the trail",
      ic: "🌲",
      img: "trail",
      lines: [
        "Evan hiked {9/12} mile. Carlos hiked {1/2} mile.",
        "The trail map shows fourths: {1/4}, {2/4}, {3/4} mile.",
        "Where is each boy on the trail?",
      ],
    },
    {
      t: "Carlos: multiply by 2",
      ic: "✖️",
      lines: [
        "1 × 2 = 2, 2 × 2 = 4: {1/2} = {2/4}.",
        "Carlos is at [{2/4}] mile on the trail.",
      ],
      vis: {
        kind: "fline",
        lines: [
          { d: 2, pt: 1 },
          { d: 4, pt: 2 },
        ],
        ring: 1 / 2,
      },
    },
    {
      t: "Evan: divide by 3",
      ic: "➗",
      lines: [
        "9 ÷ 3 = 3, 12 ÷ 3 = 4: {9/12} = {3/4}.",
        "Evan is at [{3/4}] mile on the trail.",
      ],
      vis: {
        kind: "fline",
        lines: [
          { d: 4, pt: 3 },
          { d: 12, pt: 9 },
        ],
        ring: 3 / 4,
      },
    },
    {
      t: "Casey and Andre",
      ic: "🚲",
      lines: [
        "Casey rode {2/8} mile, Andre {1/2} mile.",
        "2 ÷ 2 = 1, 8 ÷ 2 = 4: Casey is at {1/4}. 1 × 2 = 2, 2 × 2 = 4: Andre is at {2/4}.",
      ],
      vis: {
        kind: "fline",
        lines: [
          { d: 4, pt: 1 },
          { d: 4, pt: 2 },
        ],
      },
    },
    {
      t: "How to do it",
      ic: "💡",
      lines: [
        "Multiply or divide the top and the bottom by the [same number].",
        "The point stays at the [same place] on the number line.",
        "{8/10} = {4/5}",
      ],
      vis: {
        kind: "fline",
        lines: [
          { d: 10, pt: 8 },
          { d: 5, pt: 4 },
        ],
        ring: 4 / 5,
      },
    },
  ],

  games: [
    {
      k: "line",
      t: "Same point, new fraction",
      en: "Use the number line",
      ic: "📏",
      items: [
        [[2, 4], 8],
        [[1, 3], 6],
        [[4, 6], 3],
        [[3, 5], 10],
        [[6, 8], 4],
        [[2, 3], 12],
        [[8, 12], 3],
        [[1, 2], 10],
      ].map(([f, d]) => lineQ("What number is missing?", f, d)),
    },
    {
      k: "where",
      t: "Which point?",
      en: "Find the equivalent fraction",
      ic: "📍",
      items: [
        [
          [1, 2],
          [4, 8],
          ["{3/8}", "{5/8}", "{6/8}"],
        ],
        [
          [2, 3],
          [8, 12],
          ["{6/12}", "{9/12}", "{4/12}"],
        ],
        [
          [3, 4],
          [6, 8],
          ["{4/8}", "{7/8}", "{3/8}"],
        ],
        [
          [1, 5],
          [2, 10],
          ["{1/10}", "{5/10}", "{3/10}"],
        ],
        [
          [5, 6],
          [10, 12],
          ["{5/12}", "{11/12}", "{8/12}"],
        ],
      ].map(([[a, b], [c, d], no]) => ({
        type: "mc",
        q: `Which fraction is at the same point as {${a}/${b}}?`,
        opts: [`{${c}/${d}}`, ...no],
        vis: {
          kind: "fline",
          lines: [{ d: b, pt: a }, { d }],
        },
        x: `{${a}/${b}} = {${c}/${d}}: ${a} × ${d / b} = ${c}, ${b} × ${d / b} = ${d}.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 8-3",
      t: "Be Curious",
      en: "Three rulers",
      ic: "📏",
      from: "e-book 8-3 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          vis: {
            kind: "fline",
            hi: 3,
            lines: [{ d: 1 }, { d: 2 }, { d: 4 }],
          },
          // unverified: no key for this lesson
          a: "The rulers go from 0 to 3. The first is cut in wholes, the second in halves, the third in fourths. {1/2} and {2/4} are at the same place. I wonder how many fourths make 1 whole.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 8-3",
      t: "Learn: the trail",
      en: "Evan and Carlos",
      ic: "🌲",
      from: "e-book 8-3 · Learn",
      keep: true,
      items: [
        lineQ(
          "Carlos hiked {1/2} mile. The trail map shows fourths. Where is Carlos?",
          [1, 2],
          4,
          { img: "trail", post: "mile" },
        ),
        lineQ(
          "Evan hiked {9/12} mile. Divide the top and the bottom by 3. Where is Evan?",
          [9, 12],
          4,
          { img: "trail", post: "mile" },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 8-3",
      t: "Work Together",
      en: "Eight tenths",
      ic: "🤝",
      from: "e-book 8-3 · Work Together",
      keep: true,
      items: [
        // unverified: the book takes any equivalent fraction; fifths are asked here
        lineQ(
          "What fraction is equivalent to {8/10}? Use the number line and division.",
          [8, 10],
          5,
          {
            vis: {
              kind: "fline",
              lines: [
                { d: 10, pt: 8 },
                { d: 5, lab: false },
              ],
            },
          },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 8-3",
      t: "On My Own 1–4",
      en: "Use the number line",
      ic: "📏",
      from: "e-book 8-3 · On My Own 1–4",
      keep: true,
      // unverified: the book takes any equivalent fraction; the bottom number is given here
      items: [
        lineQ(
          "Use the number line to find an equivalent fraction. Cut every third in 2.",
          [1, 3],
          6,
        ),
        lineQ(
          "Use the number line to find an equivalent fraction. Put every 2 eighths together.",
          [6, 8],
          4,
        ),
        lineQ(
          "Use the number line to find an equivalent fraction. Put every 6 twelfths together.",
          [6, 12],
          2,
        ),
        lineQ(
          "Use the number line to find an equivalent fraction. Cut every sixth in 2.",
          [5, 6],
          12,
        ),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · Lesson 8-3",
      t: "On My Own 5–8",
      en: "Fill in the blank",
      ic: "🔢",
      from: "e-book 8-3 · On My Own 5–8",
      keep: true,
      items: [
        lineQ(
          "Find the missing number in the equivalent fraction.",
          [4, 3],
          12,
          {
            vis: { kind: "lines", rows: ["{4/3} = {?/12}", "3 × 4 = 12"] },
          },
        ),
        {
          type: "num",
          q: "Find the missing number in the equivalent fraction.",
          pre: "{4/12} =",
          fr: "2/?",
          a: 6,
          vis: { kind: "lines", rows: ["{4/12} = {2/?}", "4 ÷ 2 = 2"] },
          x: "4 ÷ 2 = 2, 12 ÷ 2 = 6: {4/12} = {2/[6]}",
        },
        {
          type: "num",
          q: "Find the missing number in the equivalent fraction.",
          pre: "{10/8} =",
          fr: "5/?",
          a: 4,
          vis: { kind: "lines", rows: ["{10/8} = {5/?}", "10 ÷ 2 = 5"] },
          x: "10 ÷ 2 = 5, 8 ÷ 2 = 4: {10/8} = {5/[4]}",
        },
        lineQ(
          "Find the missing number in the equivalent fraction.",
          [1, 4],
          12,
          {
            vis: { kind: "lines", rows: ["{1/4} = {?/12}", "4 × 3 = 12"] },
          },
        ),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 8-3",
      t: "On My Own 9–12",
      en: "Kurt, a race, Nina",
      ic: "🏃",
      from: "e-book 8-3 · On My Own 9–12",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Kurt placed the point on the number line for {3/4}. Do you agree with Kurt?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: { kind: "fline", lines: [{ d: 12, pt: 11, lab: false }] },
          x: "The line is cut in 12 parts and Kurt's point is at {11/12}. {3/4} = {9/12}: the point should be at the 9th mark.",
        },
        {
          type: "num",
          q: "Water stations are set up every {1/3} mile. Where is the first station, in twelfths?",
          pre: "{1/3} =",
          fr: "?/12",
          a: 4,
          vis: {
            kind: "fline",
            lines: [
              { d: 3, pt: 1 },
              { d: 12, lab: false },
            ],
          },
          x: "1 × 4 = 4, 3 × 4 = 12: {1/3} = {[4]/12}",
        },
        {
          type: "tf",
          q: "Ashwin has run {3/12} mile. Has he run past a water station?",
          a: false,
          yes: ["Yes", "No"],
          vis: {
            kind: "fline",
            lines: [{ d: 3 }, { d: 12, pt: 3, lab: false }],
          },
          x: "The first station is at {1/3} = {4/12} mile. {3/12} is less than {4/12}: not yet.",
        },
        // unverified: the book takes any equivalent fraction; thirds are asked here
        lineQ(
          "Nina says the point on the number line represents {4/6}. Use the number line to find an equivalent fraction.",
          [4, 6],
          3,
        ),
        {
          type: "num",
          q: "How can you use division to explain the equivalence? Divide the top and the bottom of {4/6} by what number?",
          pre: "4 ÷",
          post: "= 2",
          a: 2,
          vis: { kind: "lines", rows: ["{4/6} = {2/3}"] },
          x: "4 ÷ [2] = 2, 6 ÷ 2 = 3: {4/6} = {2/3}.",
        },
        {
          type: "mc",
          q: "Extend Your Thinking: what fraction can be written as an equivalent number of fourths and an equivalent number of sixths?",
          opts: ["{1/2}", "{1/4}", "{1/3}", "{1/6}"],
          vis: {
            kind: "fline",
            lines: [{ d: 4 }, { d: 6 }],
          },
          // unverified: the book takes any such fraction (1/2, 1, 3/2 …); one of them is in the choices
          x: "{1/2} = {2/4} = {3/6}: on both lines. ({1/4} is not a number of sixths, {1/3} and {1/6} are not a number of fourths.)",
        },
        {
          type: "open",
          q: "Reflect: What patterns did you notice when you found equivalent fractions on the number line?",
          vis: {
            kind: "fline",
            lines: [
              { d: 2, pt: 1 },
              { d: 4, pt: 2 },
              { d: 8, pt: 4 },
            ],
            ring: 1 / 2,
          },
          // unverified: a model answer, the book gives none
          a: "When the parts are cut in 2, there are twice as many parts and the point is at twice the number: {1/2} = {2/4} = {4/8}. The point stays at the same place.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 83–84",
      t: "Additional Practice 1–7",
      en: "Lesson 8-3",
      ic: "📘",
      from: "Practice Book p. 83–84",
      keep: true,
      items: [
        // unverified: the book takes any equivalent fraction; the bottom number is given here
        lineQ(
          "Use the number line to find an equivalent fraction.",
          [6, 10],
          5,
        ),
        lineQ(
          "Use the number line to find an equivalent fraction.",
          [10, 12],
          6,
        ),
        lineQ("Find the missing number.", [3, 5], 20, {
          vis: { kind: "lines", rows: ["{3/5} = {?/20}", "5 × 4 = 20"] },
        }),
        {
          type: "num",
          q: "Find the missing number.",
          pre: "{7/3} =",
          fr: "49/?",
          a: 21,
          vis: { kind: "lines", rows: ["{7/3} = {49/?}", "7 × 7 = 49"] },
          x: "7 × 7 = 49, 3 × 7 = 21: {7/3} = {49/[21]}",
        },
        {
          type: "mc",
          q: "Which point on the number line can be written as an equivalent number of thirds?",
          opts: ["{6/9}", "{2/9}", "{8/9}"],
          vis: { kind: "fline", lines: [{ d: 9 }] },
          x: "6 ÷ 3 = 2, 9 ÷ 3 = 3: {6/9} = {2/3}. 2 and 8 can't be divided by 3.",
        },
        {
          type: "tf",
          q: "A bike trail has rest areas every {2/3} mile. Jacob has biked {9/12} mile. Has he passed a rest area yet?",
          a: true,
          yes: ["Yes", "No"],
          vis: {
            kind: "fline",
            lines: [
              { d: 3, pt: 2 },
              { d: 12, pt: 9, lab: false },
            ],
          },
          x: "{2/3} = {8/12}. Jacob is at {9/12}: more than {8/12}, so he has passed the first rest area.",
        },
        lineQ(
          "The point on the number line represents {6/8}. Use the number line to find an equivalent fraction.",
          [6, 8],
          4,
        ),
        {
          type: "num",
          q: "How can you use division to explain the equivalence? Divide the top and the bottom of {6/8} by what number?",
          pre: "6 ÷",
          post: "= 3",
          a: 2,
          vis: { kind: "lines", rows: ["{6/8} = {3/4}"] },
          x: "6 ÷ [2] = 3, 8 ÷ 2 = 4: {6/8} = {3/4}.",
        },
      ],
    },
  ],
};
