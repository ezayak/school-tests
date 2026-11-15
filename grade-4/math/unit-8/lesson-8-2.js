// Math · Grade 4 · Lesson 8-2 « Generate Equivalent Fractions Using Models » (Reveal Math, Unit 8 « Fraction Equivalence »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-18-07.mp4, 0:48–1:45; no page numbers),
// Student Practice Book p. 81–82. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The book's "find an equivalent fraction" takes any right fraction: the questions here give the bottom number, so one answer can be checked.
// "{a/b} = {?/d}": the top number, multiplying (or dividing) the top and the bottom by the same number
const eqQ = (q, [a, b], d, vis, more = {}) => {
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
    vis: vis || { kind: "lines", rows: [`{${a}/${b}} = {?/${d}}`] },
    x: `${how}: {${a}/${b}} = {[${t}]/${d}}`,
    ...more,
  };
};

window.LESSON = {
  n: "8-2",
  key: "math4-l8-2",
  grade: 4,
  title: "Make Equivalent Fractions",
  en: "Multiply or divide the top and the bottom by the same number",
  unit: "Unit 8 · Lesson 8-2",
  book: "e-book Lesson 8-2 · Practice Book p. 81–82",
  imgDir: "img/lesson-8-2",
  cover: "pizza",
  question: {
    q: "How do I make an [equivalent fraction]?",
    // unverified: a model answer, the book gives none
    a: "Multiply (or divide) the top and the bottom by the [same number]: {4/6} = {8/12} (× 2), {8/12} = {2/3} (÷ 4).",
    img: "pizza",
  },
  words: [
    {
      w: "Equivalent fractions",
      m: "fractions with the same value: {4/6} = {8/12}",
    },
    { w: "Numerator", m: "the top number of a fraction" },
    { w: "Denominator", m: "the bottom number of a fraction" },
    { w: "Multiply", m: "× : {4/6} = {8/12} (4 × 2, 6 × 2)" },
    { w: "Divide", m: "÷ : {8/12} = {2/3} (8 ÷ 4, 12 ÷ 4)" },
  ],
  ideas: [
    {
      t: "Which doesn't belong?",
      ic: "🤔",
      lines: [
        "{1/4}, {3/12}, {2/5}, {2/8}",
        "{1/4} = {3/12} = {2/8}: the same amount.",
        "[{2/5}] doesn't belong: it is more.",
      ],
      vis: { kind: "lines", rows: ["{1/4}   {3/12}   {2/5}   {2/8}"] },
    },
    {
      t: "Alexa and Sari",
      ic: "🍕",
      img: "pizza",
      lines: [
        "Alexa cut her pizza into 6 pieces and ate {4/6}.",
        "Sari ate the same amount, but cut her pizza into 12 pieces.",
        "Sari ate [{8/12}] of her pizza.",
      ],
    },
    {
      t: "The same amount",
      ic: "🟧",
      lines: [
        "6 equal parts, 4 are shaded: {4/6}.",
        "12 equal parts, 8 are shaded: {8/12}.",
        "{4/6} = {8/12}",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 6, k: 4, l: "Alexa" },
          { d: 12, g: 2, k: 8, l: "Sari" },
        ],
      },
    },
    {
      t: "Multiply by the same number",
      ic: "✖️",
      lines: [
        "Multiply the top and the bottom by the [same number].",
        "4 × 2 = 8, 6 × 2 = 12: {4/6} = {8/12}",
        "4 × 3 = 12, 6 × 3 = 18: {4/6} = {12/18}",
      ],
      vis: {
        kind: "lines",
        rows: ["{4/6} = {8/12}", "{4/6} = {12/18}"],
        note: "× 2 and × 3, on the top and on the bottom",
      },
    },
    {
      t: "Twice as many parts",
      ic: "🍫",
      lines: [
        "{1/3} = {2/6}: there is twice the number of parts [shaded],",
        "and twice the number of parts [in the whole].",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 3, k: 1, l: "{1/3}" },
          { d: 6, k: 2, l: "{2/6}" },
        ],
      },
    },
    {
      t: "Divide too",
      ic: "➗",
      lines: [
        "Divide the top and the bottom by the [same number].",
        "8 ÷ 4 = 2, 12 ÷ 4 = 3: {8/12} = {2/3}",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 12, k: 8, l: "{8/12}" },
          { d: 3, k: 2, l: "{2/3}" },
        ],
      },
    },
  ],

  games: [
    {
      k: "times",
      t: "Multiply top and bottom",
      en: "Find the top number",
      ic: "✖️",
      items: [
        [[1, 3], 9],
        [[2, 5], 10],
        [[3, 4], 12],
        [[1, 6], 12],
        [[5, 8], 16],
        [[2, 3], 9],
        [[3, 5], 15],
        [[1, 4], 20],
      ].map(([f, d]) => eqQ("What number is missing?", f, d)),
    },
    {
      k: "divide",
      t: "Divide top and bottom",
      en: "Fewer, bigger parts",
      ic: "➗",
      items: [
        [[6, 9], 3],
        [[4, 10], 5],
        [[9, 12], 4],
        [[10, 12], 6],
        [[6, 8], 4],
        [[15, 20], 4],
      ].map(([f, d]) => eqQ("What number is missing?", f, d)),
    },
    {
      k: "odd",
      t: "Which doesn't belong?",
      en: "Three are equivalent",
      ic: "🤔",
      items: [
        ["{1/3}", "{2/6}", "{3/9}", "{3/6}"],
        ["{1/2}", "{2/4}", "{5/10}", "{3/8}"],
        ["{3/4}", "{6/8}", "{9/12}", "{4/6}"],
        ["{2/5}", "{4/10}", "{6/15}", "{2/6}"],
        ["{2/3}", "{4/6}", "{8/12}", "{3/4}"],
      ].map((o) => ({
        type: "mc",
        q: "Which fraction doesn't belong?",
        opts: [o[3], o[0], o[1], o[2]],
        vis: { kind: "lines", rows: [o.join("   ")] },
        x: `${o[0]} = ${o[1]} = ${o[2]}. ${o[3]} is not the same amount.`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 8-2",
      t: "Be Curious",
      en: "Which doesn't belong?",
      ic: "🤔",
      from: "e-book 8-2 · Be Curious",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Which doesn't belong? {1/4}, {3/12}, {2/5}, {2/8}",
          opts: ["{2/5}", "{1/4}", "{3/12}", "{2/8}"],
          vis: { kind: "lines", rows: ["{1/4}   {3/12}   {2/5}   {2/8}"] },
          // unverified: no key; any answer with a reason is right, this is the one about equivalence
          x: "{1/4} = {3/12} = {2/8}. {2/5} is not equivalent to them.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 8-2",
      t: "Learn: two pizzas",
      en: "Alexa and Sari",
      ic: "🍕",
      from: "e-book 8-2 · Learn",
      keep: true,
      items: [
        eqQ(
          "Alexa ate {4/6} of her pizza. Sari ate the same amount, but cut her pizza into 12 pieces. What fraction could Sari have eaten?",
          [4, 6],
          12,
          {
            kind: "fbar",
            side: true,
            rows: [
              { d: 6, k: 4, l: "Alexa" },
              { d: 12, g: 2, l: "Sari" },
            ],
          },
          { img: "pizza" },
        ),
        eqQ(
          "Another way: multiply the top and the bottom of {4/6} by 3.",
          [4, 6],
          18,
          { kind: "lines", rows: ["4 × 3 = ?", "6 × 3 = 18"] },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 8-2",
      t: "Work Together",
      en: "The missing fraction in a pattern",
      ic: "🤝",
      from: "e-book 8-2 · Work Together",
      keep: true,
      items: [
        {
          type: "num",
          q: "{3/4} = {6/8} = ? = {12/16}. Look at the bottom numbers: 4, 8, ?, 16. What is the missing bottom number?",
          a: 12,
          vis: { kind: "lines", rows: ["{3/4} = {6/8} = {?/?} = {12/16}"] },
          x: "4, 8, [12], 16: 4 more each time (4 × 3 = 12).",
        },
        eqQ(
          "What is the missing top number? 3, 6, ?, 12",
          [3, 4],
          12,
          { kind: "lines", rows: ["{3/4} = {6/8} = {?/12} = {12/16}"] },
          {
            x: "3 × 3 = 9, 4 × 3 = 12: {3/4} = {[9]/12}. The pattern: 3, 6, 9, 12.",
          },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 8-2",
      t: "On My Own 1–4",
      en: "Use the model",
      ic: "🟧",
      from: "e-book 8-2 · On My Own 1–4",
      keep: true,
      items: [
        // unverified: the book takes any equivalent fraction; the bottom number is given here
        eqQ(
          "Use the model to find an equivalent fraction. Cut every third in 2.",
          [2, 3],
          6,
          { kind: "fbar", rows: [{ d: 3, k: 2 }] },
        ),
        eqQ(
          "Use the model to find an equivalent fraction. Look at the columns.",
          [6, 10],
          5,
          { kind: "fbar", rows: [{ d: 10, g: 2, k: 6 }] },
        ),
        eqQ(
          "Use the model to find an equivalent fraction. Cut every fourth in 2.",
          [3, 4],
          8,
          { kind: "fbar", rows: [{ d: 4, k: 3, pie: true }] },
        ),
        eqQ(
          "Use the model to find an equivalent fraction. Cut every fifth in 2.",
          [4, 5],
          10,
          { kind: "fbar", rows: [{ d: 5, k: 4, pie: true }] },
        ),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · Lesson 8-2",
      t: "On My Own 5–8",
      en: "Fill in the blank",
      ic: "🔢",
      from: "e-book 8-2 · On My Own 5–8",
      keep: true,
      items: [
        {
          type: "num",
          q: "Find the missing number in the equivalent fraction.",
          pre: "{1/5} =",
          fr: "2/?",
          a: 10,
          vis: { kind: "lines", rows: ["{1/5} = {2/?}", "1 × 2 = 2"] },
          x: "1 × 2 = 2, 5 × 2 = 10: {1/5} = {2/[10]}",
        },
        {
          type: "num",
          q: "Find the missing number in the equivalent fraction.",
          pre: "{3/4} =",
          fr: "75/?",
          a: 100,
          vis: { kind: "lines", rows: ["{3/4} = {75/?}", "3 × 25 = 75"] },
          x: "3 × 25 = 75, 4 × 25 = 100: {3/4} = {75/[100]}",
        },
        eqQ("Find the missing number in the equivalent fraction.", [14, 12], 6),
        eqQ("Find the missing number in the equivalent fraction.", [12, 9], 3),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 8-2",
      t: "On My Own 9–12",
      en: "Tea, a model, Theo",
      ic: "🍵",
      from: "e-book 8-2 · On My Own 9–12",
      keep: true,
      items: [
        eqQ(
          "Sanjay pours a half gallon of green tea into 4 glasses, the same amount in each. Cut each half in 4: how many eighths are in a half?",
          [1, 2],
          8,
          { kind: "fbar", rows: [{ d: 8, k: 4, l: "{1/2}" }] },
        ),
        {
          type: "num",
          q: "How much of a gallon is in each glass?",
          pre: "Each glass:",
          fr: "1/?",
          post: "gallon",
          a: 8,
          vis: { kind: "fbar", rows: [{ d: 8, k: 4, l: "{4/8}" }] },
          x: "{1/2} = {4/8}: 4 glasses of {1/[8]} gallon.",
        },
        {
          type: "num",
          q: "Name a fraction that the model represents: count the small parts.",
          fr: "?/12",
          a: 10,
          vis: { kind: "fbar", rows: [{ d: 12, g: 2, k: 10 }] },
          x: "10 of 12 parts are shaded: {[10]/12}.",
        },
        {
          type: "num",
          q: "Name another fraction for the same model: count the columns.",
          fr: "?/6",
          a: 5,
          vis: { kind: "fbar", rows: [{ d: 12, g: 2, k: 10 }] },
          x: "5 of 6 columns are shaded: {[5]/6} = {10/12}.",
        },
        {
          type: "tf",
          q: "Error Analysis: Theo says {2/4} and {4/6} are equivalent fractions. Is he right?",
          a: false,
          yes: ["Yes, he is right", "No, he is not"],
          vis: {
            kind: "fbar",
            rows: [
              { d: 4, k: 2, l: "{2/4}" },
              { d: 6, k: 4, l: "{4/6}" },
            ],
          },
          x: "{2/4} = {1/2}, but {4/6} = {2/3}: not the same size. 2 × 2 = 4, but 4 × 2 = 8, not 6.",
        },
        {
          type: "tf",
          q: "Extend Your Thinking: are the fractions {6/4} and {9/6} equivalent?",
          a: true,
          yes: ["Yes", "No"],
          vis: { kind: "lines", rows: ["{6/4}  and  {9/6}"] },
          x: "6 ÷ 2 = 3, 4 ÷ 2 = 2: {6/4} = {3/2}. 9 ÷ 3 = 3, 6 ÷ 3 = 2: {9/6} = {3/2}. Both are {3/2}.",
        },
        {
          type: "open",
          q: "Reflect: How did patterns between equivalent fractions help you solve problems in the lesson?",
          vis: { kind: "lines", rows: ["{3/4} = {6/8} = {9/12} = {12/16}"] },
          // unverified: a model answer, the book gives none
          a: "The tops and the bottoms grow by the same number each time (3, 6, 9, 12 and 4, 8, 12, 16): I multiply both by the same number to find the next equivalent fraction.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 81–82",
      t: "Additional Practice 1–4",
      en: "Lesson 8-2",
      ic: "📘",
      from: "Practice Book p. 81–82",
      keep: true,
      items: [
        {
          type: "num",
          q: "Write the fraction shown by the first model.",
          fr: "?/4",
          a: 2,
          vis: { kind: "fbar", rows: [{ d: 4, k: 2 }] },
          x: "2 of 4 parts are shaded: {[2]/4}.",
        },
        {
          type: "num",
          q: "Write the fraction shown by the second model.",
          fr: "?/12",
          a: 5,
          vis: { kind: "fbar", rows: [{ d: 12, g: 2, on: [0, 1, 2, 3, 5] }] },
          x: "5 of 12 parts are shaded: {[5]/12}.",
        },
        {
          type: "tf",
          q: "Are {2/4} and {5/12} equivalent?",
          a: false,
          yes: ["Yes", "No"],
          vis: {
            kind: "fbar",
            rows: [
              { d: 4, k: 2, l: "{2/4}" },
              { d: 12, g: 2, on: [0, 1, 2, 3, 5], l: "{5/12}" },
            ],
          },
          x: "{2/4} = {6/12}, not {5/12}: the shaded parts are not the same size.",
        },
        {
          type: "num",
          q: "{8/12} = {2/3}. Divide the top and the bottom by the same number. What number?",
          pre: "8 ÷",
          post: "= 2",
          a: 4,
          vis: {
            kind: "fline",
            lines: [
              { d: 12, pt: 8, lab: false },
              { d: 3, pt: 2, lab: false },
            ],
          },
          x: "8 ÷ [4] = 2, 12 ÷ 4 = 3: {8/12} = {2/3}.",
        },
        // unverified: the book takes any number to multiply and divide by; × 2 and ÷ 2 are asked here
        eqQ(
          "Find a fraction equivalent to {6/10} by multiplication: multiply by 2.",
          [6, 10],
          20,
        ),
        eqQ(
          "Find a fraction equivalent to {6/10} by division: divide by 2.",
          [6, 10],
          5,
        ),
        ...[8, 12, 100].map((d) =>
          eqQ(
            `{3/4} of the storage space on Anna's phone is filled by apps. Find the equivalent fraction with the denominator ${d}.`,
            [3, 4],
            d,
            {
              kind: "fbar",
              rows: [{ d: 4, k: 3, l: "{3/4}" }],
            },
            { emoji: "📱" },
          ),
        ),
      ],
    },
  ],
};
