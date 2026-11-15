// Math · Grade 4 · Lesson 10-1 « Understand Decomposing Mixed Numbers » (Reveal Math, Unit 10 « Addition and Subtraction Strategies with Mixed Numbers »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 9:35–10:40; no page numbers),
// Student Practice Book p. 101–102 (and the Unit 10 Family Letter). No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The book's "decompose" questions take many answers: here they ask for the fraction (top number) or choose a right sum.
// "{w n/d} = {?/d}": a mixed number as a fraction
const toFracQ = (q, [w, n, d], more = {}) => ({
  type: "num",
  q,
  pre: `{${w} ${n}/${d}} =`,
  fr: `?/${d}`,
  a: w * d + n,
  vis: {
    kind: "fbar",
    side: true,
    rows: [...Array.from({ length: w }, () => ({ d, k: d })), { d, k: n }],
  },
  x: `${w} wholes = ${w} × ${d} = ${w * d} parts, + ${n} = ${w * d + n}: {${w} ${n}/${d}} = {[${w * d + n}]/${d}}.`,
  ...more,
});
// "{f/d} = ? wholes and {r/d}": the whole number, then the rest
const toMixedQ = (q, f, d, more = {}) => ({
  type: "num",
  q,
  pre: `{${f}/${d}} =`,
  post: `and {${f % d}/${d}}`,
  a: Math.floor(f / d),
  vis: {
    kind: "fline",
    hi: Math.ceil(f / d),
    lines: [{ d, pt: f, lab: false }],
  },
  x: `${Math.floor(f / d)} × ${d} = ${Math.floor(f / d) * d}, ${f} − ${Math.floor(f / d) * d} = ${f % d}: {${f}/${d}} = {${Math.floor(f / d)} ${f % d}/${d}}, [${Math.floor(f / d)}] wholes.`,
  ...more,
});

window.LESSON = {
  n: "10-1",
  key: "math4-l10-1",
  grade: 4,
  title: "Break Up Mixed Numbers",
  en: "Mixed numbers as wholes and parts, and as fractions greater than 1",
  unit: "Unit 10 · Lesson 10-1",
  book: "e-book Lesson 10-1 · Practice Book p. 101–102",
  imgDir: "img/lesson-10-1",
  cover: "curious",
  question: {
    q: "How is decomposing a [mixed number] different from decomposing a fraction?",
    // unverified: a model answer, the book gives none
    a: "A mixed number has wholes: I can keep them as 1 + 1, or write each whole as a fraction ({4/4}) first. {2 3/4} = 1 + 1 + {3/4} = {4/4} + {4/4} + {3/4} = {11/4}.",
    img: "curious",
  },
  words: [
    { w: "Mixed number", m: "a whole number and a fraction: {2 3/4}" },
    { w: "Whole-number part", m: "{2 3/4}: the 2" },
    { w: "Fraction part", m: "{2 3/4}: the {3/4}" },
    { w: "Decompose", m: "break into parts: {2 3/4} = 1 + 1 + {3/4}" },
    {
      w: "Fraction greater than 1",
      m: "{11/4}: the top is bigger than the bottom",
    },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🔷",
      img: "curious",
      lines: [
        "Two yellow hexagons and two triangles, or 14 green triangles.",
        "A hexagon is 6 triangles: each triangle is {1/6}.",
        "{2 2/6} = {14/6}: the [same amount].",
      ],
    },
    {
      t: "Ciana's flour",
      ic: "🧁",
      lines: [
        "Ciana needs {2 3/4} cups of flour. She has only a {1/4} cup.",
        "{2 3/4} is a [mixed number]: 2 wholes and {3/4}.",
        "{2 3/4} = 1 + 1 + {3/4}",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 4, k: 4 },
          { d: 4, k: 4 },
          { d: 4, k: 3 },
        ],
      },
    },
    {
      t: "Each whole is {4/4}",
      ic: "🟦",
      lines: [
        "1 = {4/4}, so {2 3/4} = {4/4} + {4/4} + {3/4}.",
        "4 + 4 + 3 = 11: {2 3/4} = [{11/4}].",
        "Ciana fills the {1/4} cup [11] times.",
      ],
      vis: { kind: "lines", rows: ["{4/4} + {4/4} + {3/4} = {11/4}"] },
    },
    {
      t: "Unit fractions",
      ic: "1️⃣",
      lines: [
        "{2 3/4} = {1/4} + {1/4} + … : eleven {1/4}.",
        "A mixed number is a fraction [greater than 1].",
      ],
      vis: { kind: "fline", hi: 3, lines: [{ d: 4, pt: 11 }] },
    },
    {
      t: "Fraction to mixed number",
      ic: "🔁",
      lines: [
        "{17/6}: how many wholes? 6 + 6 = 12, 12 + 6 = 18 is too much.",
        "2 wholes (12 sixths) and 5 sixths left.",
        "{17/6} = {2 5/6}",
      ],
      vis: { kind: "fline", hi: 3, lines: [{ d: 6, pt: 17, lab: false }] },
    },
  ],

  games: [
    {
      k: "tofrac",
      t: "Mixed number to fraction",
      en: "How many parts in all?",
      ic: "🟦",
      items: [
        [1, 2, 3],
        [2, 1, 4],
        [1, 3, 5],
        [3, 1, 2],
        [2, 5, 6],
        [1, 7, 8],
      ].map((m) => toFracQ("Write the mixed number as a fraction.", m)),
    },
    {
      k: "tomixed",
      t: "Fraction to mixed number",
      en: "How many wholes?",
      ic: "🔁",
      items: [
        [7, 3],
        [9, 4],
        [13, 5],
        [11, 2],
        [19, 6],
        [10, 8],
      ].map(([f, d]) => toMixedQ("How many wholes are in it?", f, d)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 10-1",
      t: "Be Curious",
      en: "Pattern blocks",
      ic: "🔷",
      from: "e-book 10-1 · Be Curious",
      keep: true,
      items: [
        {
          type: "num",
          q: "A hexagon is 6 triangles. How many triangles make the 2 hexagons and 2 triangles?",
          a: 14,
          post: "triangles",
          img: "curious",
          x: "6 + 6 + 2 = [14] triangles: {2 2/6} = {14/6}.",
        },
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "The same: both show {2 2/6} = {14/6}, the same amount. Different: on the left 2 whole hexagons and 2 triangles, on the right all small triangles.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 10-1",
      t: "Learn: Ciana's flour",
      en: "Wholes and parts",
      ic: "🧁",
      from: "e-book 10-1 · Learn",
      keep: true,
      items: [
        toFracQ(
          "Ciana needs {2 3/4} cups of flour and has only a {1/4} cup. How many fourths are in {2 3/4}?",
          [2, 3, 4],
        ),
        {
          type: "num",
          q: "How many times will Ciana fill the {1/4} measuring cup?",
          a: 11,
          post: "times",
          emoji: "🥄",
          x: "{2 3/4} = {11/4}: [11] times.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 10-1",
      t: "Work Together",
      en: "Two and one third",
      ic: "🤝",
      from: "e-book 10-1 · Work Together",
      keep: true,
      items: [
        {
          type: "multi",
          q: "How can you decompose {2 1/3}? Choose all the right equations.",
          opts: [
            ["1 + 1 + {1/3}", true],
            ["{3/3} + {3/3} + {1/3}", true],
            ["{7/3}", true],
            ["{2/3} + {1/3}", false],
            ["1 + {1/3}", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "🟦" })),
          vis: {
            kind: "fbar",
            side: true,
            rows: [
              { d: 3, k: 3 },
              { d: 3, k: 3 },
              { d: 3, k: 1 },
            ],
          },
          x: "2 wholes = 1 + 1 = {3/3} + {3/3}, and {1/3}: in all {7/3}.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 10-1",
      t: "On My Own 1–7",
      en: "Decompose, write as a fraction",
      ic: "🧩",
      from: "e-book 10-1 · On My Own 1–7",
      keep: true,
      // unverified: the book takes any decomposition; here the fraction is asked
      items: [
        toFracQ("Decompose {2 3/5}: write it as fifths.", [2, 3, 5]),
        toFracQ("Decompose {1 2/3}: write it as thirds.", [1, 2, 3]),
        toFracQ("Decompose {3 1/4}: write it as fourths.", [3, 1, 4]),
        toFracQ("Decompose {2 1/2}: write it as halves.", [2, 1, 2]),
        toFracQ("What fraction is equivalent to {5 2/3}?", [5, 2, 3]),
        {
          type: "num",
          q: "Linda decomposed a mixed number as {2/2} + {2/2} + {2/2} + {2/2} + {2/2} + {1/2}. What mixed number? How many wholes?",
          post: "wholes and {1/2}",
          a: 5,
          vis: {
            kind: "lines",
            rows: ["{2/2} + {2/2} + {2/2} + {2/2} + {2/2} + {1/2}"],
          },
          x: "Each {2/2} is 1 whole: 5 wholes and {1/2}, {[5] 1/2}.",
        },
        {
          type: "mc",
          q: "What is another way Linda could decompose {5 1/2}?",
          opts: [
            "1 + 1 + 1 + 1 + 1 + {1/2}",
            "{5/2} + {1/2}",
            "5 + 1 + {1/2}",
            "{1/2} + {1/2} + {1/2}",
          ],
          vis: { kind: "lines", rows: ["{5 1/2} = ?"] },
          // unverified: the book takes any right way; one is in the choices
          x: "5 wholes = 1 + 1 + 1 + 1 + 1, and {1/2}. ({5/2} + {1/2} = 3, 5 + 1 + {1/2} = {6 1/2}.)",
        },
        toMixedQ(
          "What mixed number is equivalent to {17/6}? How many wholes?",
          17,
          6,
        ),
      ],
    },
    {
      k: "own8",
      g: "📗 Book · Lesson 10-1",
      t: "On My Own 8–11",
      en: "Oranges, fabric, pills, comparison",
      ic: "🍊",
      from: "e-book 10-1 · On My Own 8–11",
      keep: true,
      items: [
        {
          type: "num",
          q: "Trey took 36 orange slices to a picnic. Each slice was {1/8} of an orange. How many oranges did he take? (Write the whole number part.)",
          pre: "{36/8} =",
          post: "and {4/8} oranges",
          a: 4,
          vis: { kind: "fline", hi: 5, lines: [{ d: 8, pt: 36, lab: false }] },
          x: "4 × 8 = 32, 36 − 32 = 4: {36/8} = {4 4/8}, [4] and {4/8} oranges (4 and a half).",
        },
        {
          type: "mc",
          q: "Kaycee uses {2 7/8} yards of fabric for 3 projects. How much could she have used for each project?",
          opts: [
            "1 yard, 1 yard and {7/8} yard",
            "1 yard, 1 yard and 1 yard",
            "{7/8}, {7/8} and {7/8} yard",
            "2 yards, 1 yard and {7/8} yard",
          ],
          vis: { kind: "lines", rows: ["{2 7/8} = ? + ? + ?"] },
          // unverified: the book takes any 3 parts that make 2 7/8
          x: "1 + 1 + {7/8} = {2 7/8}. (Others: {8/8} + {12/8} + {3/8}, and more.)",
        },
        {
          type: "num",
          q: "STEM Connection: Paul's dog gets {1/2} pill each day. The bottle has {7 1/2} pills. How many days?",
          a: 15,
          post: "days",
          vis: { kind: "lines", rows: ["{7 1/2} = {?/2}"] },
          x: "7 × 2 = 14, + 1 = 15: {7 1/2} = {15/2}, [15] halves, 15 days.",
        },
        {
          type: "mc",
          q: "Extend Your Thinking: what number makes the comparison true? {3 5/8} > 1 + ___ + {5/8}",
          opts: ["1", "2", "3", "{12/8}"],
          vis: { kind: "lines", rows: ["{3 5/8} > 1 + ? + {5/8}"] },
          // unverified: any number less than 2 is right (1, {12/8} …); 1 and 12/8 both work
          x: "1 + 2 + {5/8} = {3 5/8} is equal, not greater. The number must be [less than 2], like 1 ({12/8} works too).",
        },
        {
          type: "open",
          q: "Reflect: How is decomposing mixed numbers different from decomposing fractions?",
          vis: {
            kind: "lines",
            rows: ["{2 3/4} = 1 + 1 + {3/4}", "= {4/4} + {4/4} + {3/4}"],
          },
          // unverified: a model answer, the book gives none
          a: "A mixed number has whole numbers too: I can keep the wholes, or change each whole to a fraction like {4/4} first, then decompose as with fractions.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 101–102",
      t: "Additional Practice 1–6",
      en: "Lesson 10-1",
      ic: "📘",
      from: "Practice Book p. 101–102",
      keep: true,
      items: [
        toFracQ("Write {3 7/10} as an equivalent fraction.", [3, 7, 10]),
        toFracQ("Write {2 5/12} as an equivalent fraction.", [2, 5, 12]),
        toMixedQ("Write {35/6} as a mixed number. How many wholes?", 35, 6),
        {
          type: "multi",
          q: "Decompose {2 3/4} in two different ways. Choose the right ones.",
          opts: [
            ["1 + 1 + {3/4}", true],
            ["{4/4} + {4/4} + {2/4} + {1/4}", true],
            ["{8/4} + {3/4}", true],
            ["{2/4} + {3/4}", false],
            ["2 + {1/4}", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "🟦" })),
          vis: { kind: "lines", rows: ["{2 3/4} = {11/4}"] },
          x: "Each right way makes {11/4}: 4 + 4 + 3, 4 + 4 + 2 + 1, 8 + 3.",
        },
        {
          type: "num",
          q: "Ricardo decomposed a mixed number: {4/5} + {5/5} + {6/5} + {5/5} + {4/5}. What fraction is it?",
          fr: "?/5",
          a: 24,
          vis: { kind: "lines", rows: ["4 + 5 + 6 + 5 + 4 = ?"] },
          x: "4 + 5 + 6 + 5 + 4 = [24]: {24/5}.",
        },
        toMixedQ("Write {24/5} as a mixed number. How many wholes?", 24, 5),
        {
          type: "tf",
          q: "Ann wrote {4 3/8} as {4/1} + {3/8}, then added the tops (4 + 3) and the bottoms (1 + 8): {7/9}. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: { kind: "lines", rows: ["{4 3/8} = {7/9} ?"] },
          x: "She added the bottoms. 4 wholes = {32/8}, and {32/8} + {3/8} = {35/8}. ({7/9} is less than 1!)",
        },
        toFracQ("Find the correct fraction for {4 3/8}.", [4, 3, 8]),
      ],
    },
  ],
};
