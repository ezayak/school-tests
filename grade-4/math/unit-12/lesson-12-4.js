// Math · Grade 4 · Lesson 12-4 « Adding Decimals Using Fractions » (Reveal Math, Unit 12 « Decimal Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 27:20–28:30; no page numbers;
// text by OCR, fractions read on the frames), Student Practice Book p. 129–130. No teacher's key. Log: grade-4/math/SOURCES.md.
// {a/10} + {b/100}: write the tenths as hundredths, then add.
const H = (k) => ({ d: 100, g: 10, k, sq: true });
// terms: [[n, 10 | 100], …] in the printed order
const addQ = (q, terms, more = {}) => {
  const hs = terms.map(([n, d]) => (d === 10 ? n * 10 : n));
  const tot = hs.reduce((a, b) => a + b, 0);
  const expr = terms.map(([n, d]) => `{${n}/${d}}`).join(" + ");
  const as100 = hs.map((h) => `{${h}/100}`).join(" + ");
  return {
    type: "num",
    q,
    pre: `${expr} =`,
    fr: "?/100",
    a: tot,
    vis: { kind: "fbar", side: true, rows: hs.map((h) => H(h)) },
    x: `${expr} = ${as100} = {[${tot}]/100}`,
    ...more,
  };
};

window.LESSON = {
  n: "12-4",
  key: "math4-l12-4",
  grade: 4,
  title: "Add Tenths and Hundredths",
  en: "Write tenths as hundredths, then add",
  unit: "Unit 12 · Lesson 12-4",
  book: "e-book Lesson 12-4 · Practice Book p. 129–130",
  imgDir: "img/lesson-12-4",
  cover: "curious",
  question: {
    q: "How can I add a fraction with a denominator of 10 and one with a denominator of 100?",
    // unverified: a model answer, the book gives none
    a: "Make the parts the same size: write the tenths as hundredths ({4/10} = {40/100}), then add the hundredths: {40/100} + {8/100} = {48/100}.",
    img: "curious",
  },
  words: [
    { w: "Tenths", m: "{4/10} = {40/100}" },
    { w: "Hundredths", m: "{8/100}" },
    { w: "Same size parts", m: "add only parts of the same size" },
    { w: "Sum", m: "{48/100}" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🪙",
      img: "curious",
      lines: [
        "Coins falling into a jar: dimes and pennies.",
        "A dime is {1/10} of a dollar, a penny {1/100}.",
      ],
    },
    {
      t: "Lauren's puzzle",
      ic: "🧩",
      lines: [
        "Lauren did {4/10} of a puzzle, then {8/100} more.",
        "The parts are [not the same size].",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [{ d: 10, k: 4, sq: true }, H(8)],
      },
    },
    {
      t: "Make them hundredths",
      ic: "🟦",
      lines: [
        "{4/10} = {40/100}.",
        "{40/100} + {8/100} = [{48/100}] of the puzzle.",
      ],
      vis: { kind: "fbar", side: true, rows: [H(40), H(8), H(48)] },
    },
  ],

  games: [
    {
      k: "add",
      t: "Add tenths and hundredths",
      en: "Make them hundredths",
      ic: "➕",
      items: [
        [
          [3, 10],
          [12, 100],
        ],
        [
          [45, 100],
          [2, 10],
        ],
        [
          [7, 10],
          [9, 100],
        ],
        [
          [16, 100],
          [5, 10],
        ],
        [
          [1, 10],
          [61, 100],
        ],
        [
          [30, 100],
          [6, 10],
        ],
      ].map((t) => addQ("What is the sum?", t)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 12-4",
      t: "Be Curious",
      en: "A coin jar",
      ic: "🪙",
      from: "e-book 12-4 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Coins are falling into a jar: pennies, dimes and other coins. I wonder how much money is in the jar.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 12-4",
      t: "Learn: Lauren's puzzle",
      en: "4/10 + 8/100",
      ic: "🧩",
      from: "e-book 12-4 · Learn",
      keep: true,
      items: [
        {
          type: "num",
          q: "Write {4/10} as hundredths.",
          pre: "{4/10} =",
          fr: "?/100",
          a: 40,
          vis: { kind: "fbar", rows: [H(40)] },
          x: "{4/10} = {[40]/100}",
        },
        addQ(
          "Lauren did {4/10} of a puzzle, then {8/100}. How much has she completed?",
          [
            [4, 10],
            [8, 100],
          ],
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 12-4",
      t: "Work Together",
      en: "Carly hikes",
      ic: "🥾",
      from: "e-book 12-4 · Work Together",
      keep: true,
      items: [
        addQ(
          "Carly hikes {24/100} km, then {5/10} km. How far in all?",
          [
            [24, 100],
            [5, 10],
          ],
          { post: "km" },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 12-4",
      t: "On My Own 1–8",
      en: "What is the sum?",
      ic: "➕",
      from: "e-book 12-4 · On My Own 1–8",
      keep: true,
      items: [
        addQ("What is the sum?", [
          [2, 10],
          [11, 100],
        ]),
        addQ("What is the sum?", [
          [42, 100],
          [1, 10],
        ]),
        addQ("What is the sum?", [
          [4, 10],
          [9, 100],
        ]),
        addQ("What is the sum?", [
          [53, 100],
          [3, 10],
        ]),
        addQ("What is the sum?", [
          [2, 10],
          [13, 100],
        ]),
        addQ("What is the sum?", [
          [21, 100],
          [7, 10],
        ]),
        addQ(
          "Keegan walks {5/10} mile, then {35/100} mile to the park. How far in all?",
          [
            [5, 10],
            [35, 100],
          ],
          { post: "mile" },
        ),
        {
          type: "multi",
          q: "Which addition problems have a sum of {62/100}? Choose all.",
          opts: [
            ["{6/10} + {2/100}", true],
            ["{4/10} + {22/100}", true],
            ["{6/100} + {2/10}", false],
            ["{4/10} + {58/100}", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "➕" })),
          vis: { kind: "lines", rows: ["? = {62/100}"] },
          x: "60 + 2 = 62 and 40 + 22 = 62. (6 + 20 = 26, 40 + 58 = 98.)",
        },
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 12-4",
      t: "On My Own 9–12",
      en: "Memory, missing parts, mural, liquids",
      ic: "💻",
      from: "e-book 12-4 · On My Own 9–12",
      keep: true,
      items: [
        addQ(
          "STEM: {7/10} of Grace's computer memory is full. A new program takes {23/100}. How much is full now?",
          [
            [7, 10],
            [23, 100],
          ],
        ),
        {
          type: "mc",
          q: "Complete the addition: {?/10} + {?/100} = {54/100}",
          opts: [
            "{5/10} + {4/100}",
            "{4/10} + {5/100}",
            "{5/10} + {40/100}",
            "{54/10} + {0/100}",
          ],
          vis: { kind: "lines", rows: ["{?/10} + {?/100} = {54/100}"] },
          // unverified: the book takes any right pair (also 4/10 + 14/100 …)
          x: "{5/10} = {50/100}, 50 + 4 = 54.",
        },
        addQ(
          "Ling paints {6/10} of a mural on Saturday and {25/100} on Sunday. How much did she complete?",
          [
            [6, 10],
            [25, 100],
          ],
        ),
        {
          type: "mc",
          q: "Extend: the beakers hold {27/100} L, {9/100} L and {3/10} L. Two were poured together and there is more than {1/2} liter. Which two?",
          opts: [
            "{27/100} and {3/10}",
            "{27/100} and {9/100}",
            "{9/100} and {3/10}",
          ],
          vis: { kind: "lines", rows: ["{27/100}  {9/100}  {3/10}"] },
          x: "{27/100} + {30/100} = {57/100} > {50/100}. The others: {36/100} and {39/100}.",
        },
        {
          type: "open",
          q: "Reflect: How can you add a fraction with a denominator of 10 and a fraction with a denominator of 100?",
          vis: {
            kind: "lines",
            rows: ["{4/10} = {40/100}", "{40/100} + {8/100} = {48/100}"],
          },
          // unverified: a model answer, the book gives none
          a: "Write the tenths as an equivalent fraction in hundredths, so the parts are the same size, then add the numerators.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 129–130",
      t: "Additional Practice 1–10",
      en: "Lesson 12-4",
      ic: "📘",
      from: "Practice Book p. 129–130",
      keep: true,
      items: [
        addQ("Find the sum.", [
          [57, 100],
          [1, 10],
        ]),
        addQ("Find the sum.", [
          [4, 10],
          [19, 100],
        ]),
        addQ("Find the sum.", [
          [65, 100],
          [2, 10],
        ]),
        addQ("Find the sum.", [
          [12, 100],
          [1, 10],
        ]),
        addQ("Find the sum.", [
          [27, 100],
          [3, 10],
        ]),
        addQ("Find the sum.", [
          [5, 10],
          [38, 100],
        ]),
        addQ("Find the sum.", [
          [8, 10],
          [14, 100],
        ]),
        {
          type: "num",
          q: "Find the unknown: {54/100} + {?/10} = {74/100}",
          pre: "{54/100} +",
          fr: "?/10",
          post: "= {74/100}",
          a: 2,
          vis: { kind: "lines", rows: ["54 + ? = 74"] },
          x: "74 − 54 = 20 hundredths = {[2]/10}.",
        },
        addQ(
          "Kelly has {4/10} pound of carrots and {31/100} pound of potatoes. How much?",
          [
            [4, 10],
            [31, 100],
          ],
          { post: "pound" },
        ),
        addQ(
          "Tony rides {83/100} mile to school, then {1/10} mile to practice. How far?",
          [
            [83, 100],
            [1, 10],
          ],
          { post: "mile" },
        ),
      ],
    },
  ],
};
