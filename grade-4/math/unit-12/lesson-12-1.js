// Math · Grade 4 · Lesson 12-1 « Understand Tenths and Hundredths » (Reveal Math, Unit 12 « Decimal Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 24:35–25:30; no page numbers;
// On My Own 1, 3, 4, 9 read from the frames between), Student Practice Book p. 123–124 (and the Unit 12 Family Letter). No teacher's key.
// Drawings: a tenths strip = fbar d: 10; a hundredths grid = fbar d: 100, g: 10 (filled column by column). Log: grade-4/math/SOURCES.md.
const tenths = (k, l) => ({
  d: 10,
  k,
  sq: true,
  ...(l !== undefined ? { l } : {}),
});
const hund = (k, l) => ({
  d: 100,
  g: 10,
  k,
  sq: true,
  ...(l !== undefined ? { l } : {}),
});
// what fraction does the grid show
const gridQ = (q, k, d, more = {}) => ({
  type: "num",
  q,
  fr: `?/${d}`,
  a: k,
  vis: { kind: "fbar", rows: [d === 10 ? tenths(k) : hund(k)] },
  x: `${k} of ${d} parts are shaded: {[${k}]/${d}}.`,
  ...more,
});
// {a/10} = {?/100} and back
const to100 = (q, a, more = {}) => ({
  type: "num",
  q,
  pre: `{${a}/10} =`,
  fr: "?/100",
  a: a * 10,
  vis: { kind: "fbar", side: true, rows: [tenths(a), hund(a * 10)] },
  x: `${a} × 10 = ${a * 10}: {${a}/10} = {[${a * 10}]/100}.`,
  ...more,
});
const to10 = (q, h, more = {}) => ({
  type: "num",
  q,
  pre: `{${h}/100} =`,
  fr: "?/10",
  a: h / 10,
  vis: { kind: "fbar", side: true, rows: [hund(h), tenths(h / 10)] },
  x: `${h} ÷ 10 = ${h / 10}: {${h}/100} = {[${h / 10}]/10}.`,
  ...more,
});

window.LESSON = {
  n: "12-1",
  key: "math4-l12-1",
  grade: 4,
  title: "Tenths and Hundredths",
  en: "Tenths and hundredths: dimes and pennies, strips and grids",
  unit: "Unit 12 · Lesson 12-1",
  book: "e-book Lesson 12-1 · Practice Book p. 123–124",
  imgDir: "img/lesson-12-1",
  cover: "curious",
  question: {
    q: "How are [tenths] and [hundredths] related?",
    // unverified: a model answer, the book gives none
    a: "1 tenth is 10 hundredths: {1/10} = {10/100}, like 1 dime = 10 pennies. {3/10} = {30/100}.",
    img: "curious",
  },
  words: [
    {
      w: "Tenth",
      m: "1 of 10 equal parts: {1/10}, a dime is a tenth of a dollar",
    },
    {
      w: "Hundredth",
      m: "1 of 100 equal parts: {1/100}, a penny is a hundredth of a dollar",
    },
    { w: "Equivalent", m: "{3/10} = {30/100}" },
    { w: "Grid", m: "a square cut in 10 strips or 100 small squares" },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🟦",
      img: "curious",
      lines: [
        "2 of 10 strips, and 20 of 100 squares.",
        "{2/10} = {20/100}: the [same amount] is shaded.",
      ],
    },
    {
      t: "Dimes",
      ic: "🪙",
      lines: [
        "One dime is {1/10} of a dollar: a [tenth].",
        "3 dimes are {3/10} of a dollar.",
      ],
      vis: { kind: "fbar", rows: [tenths(3, "3 dimes")] },
    },
    {
      t: "Pennies",
      ic: "🟤",
      lines: [
        "One penny is {1/100} of a dollar: a [hundredth].",
        "30 pennies are {30/100} of a dollar.",
      ],
      vis: { kind: "fbar", rows: [hund(30, "30 pennies")] },
    },
    {
      t: "The same value",
      ic: "🟰",
      lines: [
        "3 dimes = 30 pennies.",
        "{3/10} = {30/100}: multiply the top and the bottom by [10].",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [tenths(3, "{3/10}"), hund(30, "{30/100}")],
      },
    },
  ],

  games: [
    {
      k: "grid",
      t: "What does the grid show?",
      en: "Tenths and hundredths",
      ic: "🟦",
      items: [
        [4, 10],
        [7, 10],
        [35, 100],
        [62, 100],
        [9, 10],
        [8, 100],
      ].map(([k, d]) => gridQ("What fraction does the grid show?", k, d)),
    },
    {
      k: "eq",
      t: "Tenths to hundredths",
      en: "× 10 or ÷ 10",
      ic: "🔁",
      items: [
        to100("Write it in hundredths.", 4),
        to100("Write it in hundredths.", 9),
        to10("Write it in tenths.", 50),
        to10("Write it in tenths.", 20),
        to100("Write it in hundredths.", 1),
        to10("Write it in tenths.", 70),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 12-1",
      t: "Be Curious",
      en: "Two grids",
      ic: "🟦",
      from: "e-book 12-1 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "The same: both show the same amount, {2/10} = {20/100}. Different: one is cut into 10 strips (tenths), the other into 100 small squares (hundredths).",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 12-1",
      t: "Learn: dimes and pennies",
      en: "Keisha's money jar",
      ic: "🪙",
      from: "e-book 12-1 · Learn",
      keep: true,
      items: [
        gridQ("Keisha has 3 dimes. What fraction of a dollar is that?", 3, 10),
        gridQ(
          "She has 30 pennies. What fraction of a dollar is that?",
          30,
          100,
        ),
        {
          type: "mc",
          q: "How does the value of the 3 dimes compare to the value of the 30 pennies?",
          opts: [
            "They are equal",
            "The dimes are worth more",
            "The pennies are worth more",
          ],
          vis: { kind: "fbar", side: true, rows: [tenths(3), hund(30)] },
          x: "{3/10} = {30/100}: the same value.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 12-1",
      t: "Work Together",
      en: "Carlos's water",
      ic: "💧",
      from: "e-book 12-1 · Work Together",
      keep: true,
      items: [
        to10(
          "Carlos drank {70/100} liter of water. How many tenths of a liter?",
          70,
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 12-1",
      t: "On My Own 1–9",
      en: "Shade, read, write",
      ic: "🟦",
      from: "e-book 12-1 · On My Own 1–9",
      keep: true,
      items: [
        {
          type: "num",
          q: "Shade the grid to show {6/10}. How many strips do you shade?",
          a: 6,
          post: "strips",
          vis: { kind: "fbar", rows: [tenths(0)] },
          x: "{6/10}: [6] of the 10 strips.",
        },
        {
          type: "num",
          q: "Shade the grid to show {40/100}. How many columns of 10 squares?",
          a: 4,
          post: "columns",
          vis: { kind: "fbar", rows: [hund(0)] },
          x: "40 squares = [4] columns of 10.",
        },
        gridQ("What fraction does the grid represent?", 8, 10),
        gridQ("What fraction does the grid represent?", 20, 100),
        to10("Write {70/100} with a denominator of 10.", 70),
        {
          type: "num",
          q: "Fill in the blank.",
          fr: "?/100",
          post: "= {5/10}",
          a: 50,
          vis: { kind: "fbar", side: true, rows: [hund(50), tenths(5)] },
          x: "5 × 10 = 50: {[50]/100} = {5/10}.",
        },
        to100("Write {2/10} with a denominator of 100.", 2),
        to10("Write {60/100} with a denominator of 10.", 60),
        {
          type: "multi",
          q: "Which fractions are equivalent to a fraction with a denominator of 10? Choose all.",
          opts: [
            ["{10/100}", true],
            ["{1 40/100}", true],
            ["{3/100}", false],
            ["{25/100}", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "🟦" })),
          vis: { kind: "lines", rows: ["? = {?/10}"] },
          x: "{10/100} = {1/10} and {1 40/100} = {1 4/10}: the tops end in 0. {3/100} and {25/100} do not.",
        },
      ],
    },
    {
      k: "own10",
      g: "📗 Book · Lesson 12-1",
      t: "On My Own 10–12",
      en: "Marta, dimes, 13 tenths",
      ic: "⚠️",
      from: "e-book 12-1 · On My Own 10–12",
      keep: true,
      items: [
        {
          type: "tf",
          q: "Error Analysis: Marta wrote {90/100} = {90/100 ÷ 10} = {90/10}. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: { kind: "lines", rows: ["{90/100} = {90/10} ?"] },
          x: "She divided only the bottom. Divide both: 90 ÷ 10 = 9, so {90/100} = {9/10}.",
        },
        to10("Find the correct equivalent fraction.", 90),
        to100(
          "Show 8 dimes on the hundredths grid: {8/10} is how many hundredths?",
          8,
        ),
        {
          type: "mc",
          q: "Extend: what are two ways to write {13/10}?",
          opts: [
            "{1 3/10} and {130/100}",
            "{1 3/10} and {13/100}",
            "{3/10} and {30/100}",
            "{13 1/10} and {1 30/100}",
          ],
          vis: { kind: "lines", rows: ["{13/10} = ?"] },
          // unverified: the book takes any two right ways
          x: "{13/10} = {1 3/10} = {130/100} = {1 30/100}.",
        },
        {
          type: "open",
          q: "Reflect: How did you use your understanding of equivalent fractions during this lesson?",
          vis: { kind: "fbar", side: true, rows: [tenths(3), hund(30)] },
          // unverified: a model answer, the book gives none
          a: "I multiplied or divided the top and the bottom by 10 to change tenths to hundredths and back: {3/10} = {30/100}.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 123–124",
      t: "Additional Practice 1–7",
      en: "Lesson 12-1",
      ic: "📘",
      from: "Practice Book p. 123–124",
      keep: true,
      items: [
        gridQ("What fraction does the grid represent?", 6, 10),
        gridQ("What fraction does the grid represent?", 80, 100),
        to10("Complete the equation.", 60),
        to100("Complete the equation.", 3),
        {
          type: "multi",
          q: "Which fractions are equivalent to a fraction with the denominator of 10? Choose all.",
          opts: [
            ["{30/100}", true],
            ["{10/100}", true],
            ["{25/100}", false],
            ["{65/100}", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "🟦" })),
          vis: { kind: "lines", rows: ["? = {?/10}"] },
          x: "{30/100} = {3/10}, {10/100} = {1/10}. 25 and 65 can't be divided by 10.",
        },
        {
          type: "num",
          q: "Write {12/10} as a mixed number with a denominator of 100.",
          pre: "{12/10} = 1",
          fr: "?/100",
          a: 20,
          vis: { kind: "fbar", side: true, rows: [hund(100), hund(20)] },
          x: "{12/10} = {1 2/10} = {1 [20]/100}.",
        },
        to100(
          "Show 7 dimes on the hundredths grid: {7/10} is how many hundredths?",
          7,
        ),
      ],
    },
  ],
};
