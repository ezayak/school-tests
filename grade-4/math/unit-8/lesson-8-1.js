// Math · Grade 4 · Lesson 8-1 « Equivalent Fractions » (Reveal Math, Unit 8 « Fraction Equivalence »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-18-07.mp4, 0:05–0:48; the e-book shows no page numbers),
// Student Practice Book p. 79–80 (and the Unit 8 Family Letter before p. 79). No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Fractions are written "{3/4}" (stacked by Kit.frac); drawings: fbar (fraction strips), fline (fraction number lines) from shared/math.js.
const same = (a, b, c, d) => a * d === b * c;
// "Are they equivalent?" with the two strips on the same whole
const eqTF = (q, [a, b], [c, d], more = {}) => ({
  type: "tf",
  q,
  a: same(a, b, c, d),
  yes: ["Yes", "No"],
  vis: {
    kind: "fbar",
    rows: [
      { d: b, k: a, l: `{${a}/${b}}` },
      { d, k: c, l: `{${c}/${d}}` },
    ],
  },
  x: same(a, b, c, d)
    ? `{${a}/${b}} = {${c}/${d}}: the shaded parts are the [same size].`
    : `{${a}/${b}} and {${c}/${d}}: the shaded parts are [not the same size].${(a * d) % b === 0 ? ` {${a}/${b}} = {${(a * d) / b}/${d}}.` : ""}`,
  ...more,
});
// "{a/b} = {?/d}": the missing top number, with the two number lines (the second one without its fractions)
const topQ = (q, [a, b], d, more = {}) => ({
  type: "num",
  q,
  pre: `{${a}/${b}} =`,
  fr: `?/${d}`,
  a: (a * d) / b,
  vis: {
    kind: "fline",
    lines: [
      { d: b, pt: a },
      { d, lab: false },
    ],
  },
  x: `{${a}/${b}} = {[${(a * d) / b}]/${d}}`,
  ...more,
});

window.LESSON = {
  n: "8-1",
  key: "math4-l8-1",
  grade: 4,
  title: "Equivalent Fractions",
  en: "Different fractions that show the same amount",
  unit: "Unit 8 · Lesson 8-1",
  book: "e-book Lesson 8-1 · Practice Book p. 79–80",
  imgDir: "img/lesson-8-1",
  cover: "curious",
  question: {
    q: "How can a [picture] help me see if two fractions are equivalent?",
    // unverified: a model answer, the book gives none
    a: "Draw both fractions on the [same whole]: strips or number lines. Same size shaded, or the same point: they are [equivalent]. {1/4} = {3/12}.",
    img: "curious",
  },
  words: [
    { w: "Fraction", m: "a part of a whole: {3/4}" },
    {
      w: "Numerator",
      m: "the top number: how many parts we take ({3/4}: 3)",
    },
    {
      w: "Denominator",
      m: "the bottom number: how many equal parts in the whole ({3/4}: 4)",
    },
    {
      w: "Equivalent fractions",
      m: "fractions that have the same value but different denominators: {1/4} = {3/12}",
    },
    { w: "Whole", m: "all the parts together: {4/4} = 1" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🍍",
      img: "curious",
      lines: [
        "Half a pineapple ring: in [1] piece, in [2] pieces, in [4] pieces.",
        "{1/2} = {2/4} = {4/8}",
        "The [same amount], cut in different pieces.",
      ],
    },
    {
      t: "Marcy and Xavier",
      ic: "📖",
      lines: [
        "Marcy read {1/4} of the book. Xavier read {3/12} of the book.",
        "Did they read the same amount?",
        "The shaded parts are the [same size]: yes!",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 4, k: 1, l: "{1/4}" },
          { d: 12, k: 3, l: "{3/12}" },
        ],
      },
    },
    {
      t: "On a number line",
      ic: "📏",
      lines: [
        "Cut 0 to 1 in 4 parts, and in 12 parts.",
        "{1/4} and {3/12} are at the [same point].",
      ],
      vis: {
        kind: "fline",
        lines: [
          { d: 4, pt: 1 },
          { d: 12, pt: 3 },
        ],
        ring: 1 / 4,
      },
    },
    {
      t: "Equivalent fractions",
      ic: "🟰",
      lines: [
        "The same part of the whole, or the same point on a number line:",
        "they are [equivalent fractions].",
        "{1/4} = {3/12}",
      ],
      vis: { kind: "lines", rows: ["{1/4} = {3/12}"] },
    },
    {
      t: "Work Together",
      ic: "🤝",
      lines: [
        "Are {2/8} and {1/4} equivalent?",
        "The 8 parts are 2 rows of 4. 2 eighths = 1 column = [1 fourth].",
        "{2/8} = {1/4}",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 8, g: 2, k: 2, l: "{2/8}" },
          { d: 4, k: 1, l: "{1/4}" },
        ],
      },
    },
    {
      t: "Cut in smaller pieces",
      ic: "🍎",
      lines: [
        "Riley eats {1/2} of an apple. Everett eats {2/4} of an apple.",
        "Cut each half in 2: [more parts], the same amount.",
        "{1/2} = {2/4}",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 2, k: 1, l: "{1/2}" },
          { d: 4, k: 2, l: "{2/4}" },
        ],
      },
    },
    {
      t: "How to check",
      ic: "🔍",
      lines: [
        "1. Draw both fractions on the [same whole].",
        "2. Shade the parts.",
        "3. The same size? [Equivalent]. Not the same? Not equivalent.",
        "{3/8} and {1/3}: not the same size.",
      ],
      vis: {
        kind: "fbar",
        rows: [
          { d: 8, k: 3, l: "{3/8}" },
          { d: 3, k: 1, l: "{1/3}" },
        ],
      },
    },
  ],

  games: [
    {
      k: "same",
      t: "Equivalent or not?",
      en: "Look at the strips",
      ic: "🟰",
      items: [
        [
          [1, 2],
          [4, 8],
        ],
        [
          [2, 3],
          [8, 12],
        ],
        [
          [1, 3],
          [3, 6],
        ],
        [
          [3, 4],
          [9, 12],
        ],
        [
          [3, 4],
          [5, 8],
        ],
        [
          [2, 5],
          [4, 10],
        ],
        [
          [2, 6],
          [1, 4],
        ],
        [
          [1, 2],
          [5, 10],
        ],
      ].map(([f, g]) =>
        eqTF(`Are {${f[0]}/${f[1]}} and {${g[0]}/${g[1]}} equivalent?`, f, g),
      ),
    },
    {
      k: "top",
      t: "The missing number",
      en: "Count the parts",
      ic: "📏",
      items: [
        [[1, 2], 4],
        [[1, 3], 6],
        [[3, 4], 8],
        [[2, 5], 10],
        [[1, 4], 12],
        [[2, 3], 12],
        [[5, 6], 12],
        [[1, 2], 10],
      ].map(([f, d]) => topQ("What number is missing?", f, d)),
    },
    {
      k: "pick",
      t: "Which one is the same?",
      en: "Choose the equivalent fraction",
      ic: "🍕",
      items: [
        [
          [2, 3],
          ["{4/6}", "{2/6}", "{3/4}", "{4/3}"],
        ],
        [
          [1, 2],
          ["{3/6}", "{1/6}", "{2/3}", "{3/5}"],
        ],
        [
          [3, 5],
          ["{6/10}", "{3/10}", "{5/10}", "{6/5}"],
        ],
        [
          [3, 4],
          ["{6/8}", "{3/8}", "{4/8}", "{4/5}"],
        ],
        [
          [1, 4],
          ["{2/8}", "{1/8}", "{4/8}", "{2/4}"],
        ],
        [
          [4, 6],
          ["{8/12}", "{4/12}", "{6/12}", "{6/8}"],
        ],
      ].map(([[a, b], opts]) => ({
        type: "mc",
        q: `Which fraction is equivalent to {${a}/${b}}?`,
        opts,
        vis: { kind: "fbar", rows: [{ d: b, k: a, l: `{${a}/${b}}` }] },
        x: `{${a}/${b}} = ${opts[0]}`,
      })),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 8-1",
      t: "Be Curious",
      en: "Pieces of pineapple",
      ic: "🍍",
      from: "e-book 8-1 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "The same: each one is half of a pineapple ring, the same amount. Different: 1 piece, 2 pieces, 4 pieces. {1/2} = {2/4} = {4/8}.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 8-1",
      t: "Learn: the same book",
      en: "Marcy and Xavier",
      ic: "📖",
      from: "e-book 8-1 · Learn",
      keep: true,
      items: [
        eqTF(
          "Marcy read {1/4} of the book. Xavier read {3/12} of the book. Did they read the same amount?",
          [1, 4],
          [3, 12],
          {
            x: "{1/4} = {3/12}: the shaded parts are the [same size]. They read the same amount.",
          },
        ),
        topQ("Use the number lines. What number is missing?", [1, 4], 12),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 8-1",
      t: "Work Together",
      en: "2 eighths and 1 fourth",
      ic: "🤝",
      from: "e-book 8-1 · Work Together",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Are {2/8} and {1/4} equivalent fractions? Use the fraction models.",
          a: true,
          yes: ["Yes", "No"],
          vis: {
            kind: "fbar",
            side: true,
            rows: [
              { d: 8, g: 2, k: 2, l: "{2/8}" },
              { d: 4, k: 1, l: "{1/4}" },
            ],
          },
          x: "{2/8} = {1/4}: the 2 shaded eighths are 1 column, the same size as 1 fourth.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 8-1",
      t: "On My Own 1–4",
      en: "Are the fractions equivalent?",
      ic: "🟰",
      from: "e-book 8-1 · On My Own 1–4",
      keep: true,
      items: [
        [[2, 6], [4, 12], "2 × 2 = 4, 6 × 2 = 12: {2/6} = {4/12}."],
        [[4, 10], [3, 6], "{3/6} = {1/2} = {5/10}, not {4/10}."],
        [
          [3, 8],
          [1, 3],
          "{3/8} is a little more than {1/3}: cut a strip in 8 and in 3, the shaded parts are not the same size.",
        ],
        [[8, 10], [4, 5], "4 × 2 = 8, 5 × 2 = 10: {4/5} = {8/10}."],
      ].map(([[a, b], [c, d], x]) => ({
        type: "tf",
        q: "Are the fractions equivalent?",
        a: same(a, b, c, d),
        yes: ["Yes", "No"],
        vis: { kind: "lines", rows: [`{${a}/${b}}  and  {${c}/${d}}`] },
        x,
      })),
    },
    {
      k: "own5",
      g: "📗 Book · Lesson 8-1",
      t: "On My Own 5–6",
      en: "Fill in the blank",
      ic: "📏",
      from: "e-book 8-1 · On My Own 5–6",
      keep: true,
      items: [
        {
          type: "num",
          q: "Use the number line. What number is missing?",
          pre: "{2/4} =",
          fr: "?/8",
          a: 4,
          vis: { kind: "fline", lines: [{ d: 4, pt: 2, lab: false }] },
          x: "{2/4} = {[4]/8}: cut every fourth in 2.",
        },
        {
          type: "num",
          q: "Use the model. What number is missing?",
          pre: "{8/12} =",
          fr: "?/6",
          a: 4,
          vis: { kind: "fbar", rows: [{ d: 12, g: 2, k: 8 }] },
          x: "6 columns, 4 are shaded: {8/12} = {[4]/6}.",
        },
      ],
    },
    {
      k: "own7",
      g: "📗 Book · Lesson 8-1",
      t: "On My Own 7–8",
      en: "Same distance, same amount",
      ic: "🏞️",
      from: "e-book 8-1 · On My Own 7–8",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Kathy lives {2/4} mile from the park. Charles lives {6/12} mile from the park. Do they live the same distance from the park?",
          a: true,
          yes: ["Yes", "No"],
          vis: {
            kind: "lines",
            rows: ["🏠 Kathy: {2/4} mile", "🏠 Charles: {6/12} mile"],
          },
          x: "{2/4} = {1/2} = {6/12}: both live [half a mile] from the park.",
        },
        {
          type: "mc",
          q: "Faye and Omar ate the same amount of a small quesadilla. Faye's was cut into 4 pieces, Omar's into 8 pieces. How many pieces might they each have eaten?",
          opts: [
            "Faye 1 piece, Omar 2 pieces",
            "Faye 2 pieces, Omar 1 piece",
            "Faye 1 piece, Omar 1 piece",
            "Faye 3 pieces, Omar 4 pieces",
          ],
          vis: {
            kind: "fbar",
            rows: [
              { d: 4, l: "Faye" },
              { d: 8, l: "Omar" },
            ],
          },
          // unverified: the book takes several answers (1 and 2, 2 and 4, 3 and 6); only one of them is in the choices
          x: "Omar's pieces are half as big: {1/4} = {2/8}. (2 and 4, or 3 and 6, are right too.)",
        },
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 8-1",
      t: "On My Own 9–12",
      en: "Number lines, lasers, buses, mugs",
      ic: "🚌",
      from: "e-book 8-1 · On My Own 9–12",
      keep: true,
      items: [
        {
          type: "num",
          q: "Eva's number line shows a fraction equivalent to {1/2}. Her point is 5 parts from 0. How many parts are in the whole?",
          pre: "{1/2} =",
          fr: "5/?",
          a: 10,
          vis: { kind: "fline", lines: [{ d: 2, pt: 1 }] },
          x: "5 parts to the middle, 5 more to 1: {1/2} = {5/[10]}.",
        },
        {
          type: "num",
          q: "Malik makes a {2/10} millimeter cut with a laser. What unit fraction is equivalent to {2/10}?",
          pre: "{2/10} =",
          fr: "1/?",
          a: 5,
          vis: { kind: "fbar", rows: [{ d: 10, k: 2, l: "{2/10}" }] },
          x: "2 tenths make 1 fifth: {2/10} = {1/[5]}.",
        },
        {
          type: "num",
          q: "Bus A stops at Second Street every {1/3} hour. Bus B every {1/6} hour. How many sixths are {1/3}?",
          pre: "{1/3} =",
          fr: "?/6",
          a: 2,
          vis: {
            kind: "fline",
            lines: [{ d: 3 }, { d: 6 }],
          },
          x: "{1/3} = {[2]/6}",
        },
        {
          type: "tf",
          q: "Both buses start at 7:00 a.m. Will they ever stop at Second Street at the same time within an hour?",
          a: true,
          yes: ["Yes", "No"],
          vis: {
            kind: "fline",
            lines: [{ d: 3 }, { d: 6 }],
          },
          x: "{1/3} = {2/6}: at 7:20 both buses stop there (and at 7:40 and 8:00).",
        },
        {
          type: "num",
          q: "Cora's mug holds {1/8} gallon. The container holds {3/4} gallon. How many eighths are {3/4}?",
          pre: "{3/4} =",
          fr: "?/8",
          a: 6,
          vis: {
            kind: "fbar",
            rows: [
              { d: 4, k: 3, l: "{3/4}" },
              { d: 8, l: "{1/8}" },
            ],
          },
          x: "{3/4} = {[6]/8}",
        },
        {
          type: "num",
          q: "How many times will Cora fill and empty her {1/8} gallon mug to fill the container?",
          a: 6,
          post: "times",
          emoji: "☕",
          x: "{3/4} = {6/8}: [6] mugs of {1/8} gallon.",
        },
        {
          type: "open",
          q: "Reflect: How can a picture help you see if two fractions are equivalent?",
          vis: {
            kind: "fline",
            lines: [
              { d: 4, pt: 1 },
              { d: 12, pt: 3 },
            ],
            ring: 1 / 4,
          },
          // unverified: a model answer, the book gives none
          a: "Draw both fractions on the same whole, as strips or number lines. If the shaded parts are the same size, or the points are at the same place, the fractions are equivalent: {1/4} = {3/12}.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 79–80",
      t: "Additional Practice 1–5",
      en: "Lesson 8-1",
      ic: "📘",
      from: "Practice Book p. 79–80",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Shade {1/3}, {2/6} and {3/8} in your head. Which two fractions are equivalent?",
          opts: ["{1/3} and {2/6}", "{1/3} and {3/8}", "{2/6} and {3/8}"],
          vis: {
            kind: "fbar",
            rows: [
              { d: 3, l: "{1/3}" },
              { d: 6, l: "{2/6}" },
              { d: 8, l: "{3/8}" },
            ],
          },
          x: "{1/3} = {2/6}: the same size. {3/8} is a little more.",
        },
        {
          type: "num",
          q: "Show that {3/5} and {6/10} are equivalent: cut every fifth in 2.",
          pre: "{3/5} =",
          fr: "?/10",
          a: 6,
          vis: {
            kind: "fbar",
            rows: [
              { d: 5, k: 3, l: "{3/5}" },
              { d: 10, l: "{?/10}" },
            ],
          },
          x: "{3/5} = {[6]/10}",
        },
        {
          type: "num",
          q: "Sadie's fabric is {2/3} yard long. Each third is cut into 4 equal parts. How many parts are in the whole yard?",
          pre: "3 × 4 =",
          a: 12,
          vis: {
            kind: "fbar",
            rows: [
              { d: 3, k: 2, l: "{2/3}" },
              { d: 12, l: "" },
            ],
          },
          x: "3 × 4 = [12] parts: twelfths.",
        },
        {
          type: "num",
          q: "Write the equivalent fraction for Sadie's {2/3} yard.",
          pre: "{2/3} =",
          fr: "?/12",
          a: 8,
          vis: {
            kind: "fbar",
            rows: [
              { d: 3, k: 2, l: "{2/3}" },
              { d: 12, l: "{?/12}" },
            ],
          },
          x: "2 × 4 = 8, 3 × 4 = 12: {2/3} = {[8]/12}.",
        },
        {
          type: "num",
          q: "Dwight walked {2/8} lap of a track. Put every 2 eighths together into fourths. How many fourths?",
          pre: "{2/8} =",
          fr: "?/4",
          a: 1,
          vis: {
            kind: "fbar",
            rows: [
              { d: 8, k: 2, l: "{2/8}" },
              { d: 4, l: "{?/4}" },
            ],
          },
          x: "{2/8} = {[1]/4}",
        },
        {
          type: "num",
          q: "Lucas glues {1/8} inch pieces of plywood to make a {3/4} inch piece. How many eighths are {3/4}?",
          pre: "{3/4} =",
          fr: "?/8",
          a: 6,
          vis: {
            kind: "fbar",
            rows: [
              { d: 4, k: 3, l: "{3/4}" },
              { d: 8, l: "{?/8}" },
            ],
          },
          x: "{3/4} = {[6]/8}",
        },
        {
          type: "num",
          q: "How many {1/8} inch pieces should Lucas glue together?",
          a: 6,
          post: "pieces",
          emoji: "🪵",
          x: "{3/4} = {6/8}: [6] pieces of {1/8} inch.",
        },
      ],
    },
  ],
};
