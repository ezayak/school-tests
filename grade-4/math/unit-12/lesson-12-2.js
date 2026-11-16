// Math · Grade 4 · Lesson 12-2 « Understand Decimal Notation » (Reveal Math, Unit 12 « Decimal Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 25:30–26:30; no page numbers;
// the grids of On My Own 1–4 counted on the frames, 8–10 read from the frames between), Student Practice Book p. 125–126. No teacher's key.
// Decimals are typed with the point key (num with a decimal answer). Log: grade-4/math/SOURCES.md.
const T = (k) => ({ d: 10, k, sq: true });
const H = (k) => ({ d: 100, g: 10, k, sq: true });
// model of w wholes and a part: rows of full squares then the part
const decQ = (q, value, vis, x, more = {}) => ({
  type: "num",
  q,
  a: value,
  dec: true,
  vis,
  x,
  ...more,
});

window.LESSON = {
  n: "12-2",
  key: "math4-l12-2",
  grade: 4,
  title: "Decimals",
  en: "Write tenths and hundredths as decimals: 0.2, 0.37, 1.55",
  unit: "Unit 12 · Lesson 12-2",
  book: "e-book Lesson 12-2 · Practice Book p. 125–126",
  imgDir: "img/lesson-12-2",
  cover: "curious",
  question: {
    q: "How are [fractions] with denominators 10 and 100 related to [decimals]?",
    // unverified: a model answer, the book gives none
    a: "They are the same numbers written in two ways: {2/10} = 0.2, {37/100} = 0.37, {1 55/100} = 1.55. The decimal point separates the wholes from the parts.",
    img: "curious",
  },
  words: [
    { w: "Decimal", m: "a number with a decimal point: 0.37, 1.2" },
    { w: "Decimal point", m: "the dot between the whole number and the parts" },
    { w: "Tenths place", m: "the first digit after the point: 0.[3]7" },
    { w: "Hundredths place", m: "the second digit after the point: 0.3[7]" },
  ],
  ideas: [
    {
      t: "Prices",
      ic: "🛒",
      img: "curious",
      lines: [
        "$1.65, $2.49, 99¢: prices use a [decimal point].",
        "Dollars before the point, cents after it.",
      ],
    },
    {
      t: "Tenths",
      ic: "🟦",
      lines: [
        "Kayla won by {2/10} second.",
        "{2/10} = [0.2]: 2 in the tenths place.",
      ],
      vis: { kind: "fbar", rows: [T(2)] },
    },
    {
      t: "Hundredths",
      ic: "🟧",
      lines: [
        "Jensen won by {37/100} second.",
        "{37/100} = [0.37]: 3 tenths and 7 hundredths.",
      ],
      vis: { kind: "fbar", rows: [H(37)] },
    },
  ],

  games: [
    {
      k: "dec",
      t: "Fraction to decimal",
      en: "Type the decimal",
      ic: "🔢",
      items: [
        [4, 10],
        [9, 10],
        [25, 100],
        [7, 100],
        [60, 100],
        [83, 100],
      ].map(([n, d]) =>
        decQ(
          `Write {${n}/${d}} as a decimal.`,
          n / d,
          { kind: "fbar", rows: [d === 10 ? T(n) : H(n)] },
          `{${n}/${d}} = [${n / d}]`,
        ),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 12-2",
      t: "Be Curious",
      en: "Market prices",
      ic: "🛒",
      from: "e-book 12-2 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Prices of fruit and vegetables: $1.65, $2.49, $1.39, 99¢, 79¢. They use a decimal point between dollars and cents. I wonder which is cheapest.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 12-2",
      t: "Learn: swimming times",
      en: "Kayla and Jensen",
      ic: "🏊",
      from: "e-book 12-2 · Learn",
      keep: true,
      items: [
        decQ(
          "Kayla won by {2/10} second. Write it as a decimal.",
          0.2,
          { kind: "fbar", rows: [T(2)] },
          "{2/10} = [0.2] (or 0.20)",
        ),
        decQ(
          "Jensen won by {37/100} second. Write it as a decimal.",
          0.37,
          { kind: "fbar", rows: [H(37)] },
          "{37/100} = [0.37]",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 12-2",
      t: "Work Together",
      en: "Two boards",
      ic: "🪵",
      from: "e-book 12-2 · Work Together",
      keep: true,
      items: [
        decQ(
          "Alan's board is {1 7/10} meters long. Write it as a decimal.",
          1.7,
          { kind: "lines", rows: ["{1 7/10} = ?"] },
          "{1 7/10} = [1.7]",
        ),
        decQ(
          "Hannah's board is {1 56/100} meters long. Write it as a decimal.",
          1.56,
          { kind: "lines", rows: ["{1 56/100} = ?"] },
          "{1 56/100} = [1.56]",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 12-2",
      t: "On My Own 1–10",
      en: "Models, shading, equivalents",
      ic: "🟦",
      from: "e-book 12-2 · On My Own 1–10",
      keep: true,
      items: [
        decQ(
          "What number does the model show? Write it as a decimal.",
          0.28,
          { kind: "fbar", rows: [H(28)] },
          "28 of 100: {28/100} = [0.28]",
        ),
        decQ(
          "What number does the model show? Write it as a decimal.",
          1.9,
          { kind: "fbar", side: true, rows: [T(10), T(9)] },
          "1 whole and 9 tenths: {1 9/10} = [1.9]",
        ),
        decQ(
          "What number does the model show? Write it as a decimal.",
          1.55,
          { kind: "fbar", side: true, rows: [H(100), H(55)] },
          "1 whole and 55 hundredths: {1 55/100} = [1.55]",
        ),
        decQ(
          "What number does the model show? Write it as a decimal.",
          2.5,
          { kind: "fbar", side: true, rows: [T(10), T(10), T(5)] },
          "2 wholes and 5 tenths: {2 5/10} = [2.5]",
        ),
        {
          type: "num",
          q: "How many strips do you shade to show 0.8?",
          a: 8,
          post: "strips",
          vis: { kind: "fbar", rows: [T(0)] },
          x: "0.8 = {8/10}: [8] strips.",
        },
        {
          type: "num",
          q: "How many squares do you shade to show 0.67?",
          a: 67,
          post: "squares",
          vis: { kind: "fbar", rows: [H(0)] },
          x: "0.67 = {67/100}: [67] squares.",
        },
        decQ(
          "Write an equivalent decimal: {9/100} = ?",
          0.09,
          { kind: "fbar", rows: [H(9)] },
          "{9/100} = [0.09]",
        ),
        {
          type: "num",
          q: "Write an equivalent fraction: {?/10} = 0.9",
          fr: "?/10",
          a: 9,
          vis: { kind: "fbar", rows: [T(9)] },
          x: "0.9 = {[9]/10}",
        },
        {
          type: "num",
          q: "Write an equivalent fraction: {?/10} = 0.6",
          fr: "?/10",
          a: 6,
          vis: { kind: "fbar", rows: [T(6)] },
          x: "0.6 = {[6]/10}",
        },
        {
          type: "num",
          q: "Write an equivalent mixed number: 1.04 = {1 ?/100}",
          pre: "1.04 = 1",
          fr: "?/100",
          a: 4,
          vis: { kind: "fbar", side: true, rows: [H(100), H(4)] },
          x: "1.04 = {1 [4]/100}",
        },
      ],
    },
    {
      k: "own11",
      g: "📗 Book · Lesson 12-2",
      t: "On My Own 11–14",
      en: "Puppy, balloon, pairs, juice",
      ic: "🐶",
      from: "e-book 12-2 · On My Own 11–14",
      keep: true,
      items: [
        decQ(
          "A newborn puppy weighs {3/10} kilogram. Write it as a decimal.",
          0.3,
          { kind: "fbar", rows: [T(3)] },
          "{3/10} = [0.3]",
        ),
        decQ(
          "STEM: a balloon appears for {1 2/100} seconds. What decimal is that?",
          1.02,
          { kind: "lines", rows: ["{1 2/100} = ?"] },
          "{1 2/100} = [1.02]",
        ),
        {
          type: "mc",
          q: "Which is a pair of equivalent numbers?",
          opts: [
            "0.9 and {9/10}",
            "{2/10} and 2.10",
            "1.6 and {1/6}",
            "{1 3/10} and 0.3",
          ],
          vis: { kind: "lines", rows: ["? = ?"] },
          x: "{9/10} = 0.9. ({2/10} = 0.2, {1 3/10} = 1.3, {1/6} is not a decimal fraction.)",
        },
        {
          type: "mc",
          q: "Extend: Antony has {5/10} liter of juice and Jan has 0.50 liter. What can you say?",
          opts: [
            "They have the same amount",
            "Antony has more",
            "Jan has more",
          ],
          vis: { kind: "fbar", side: true, rows: [T(5), H(50)] },
          x: "{5/10} = 0.5 = 0.50: the same amount.",
        },
        {
          type: "open",
          q: "Reflect: What is the relationship between fractions with denominators 10 and 100 and decimals?",
          vis: { kind: "lines", rows: ["{3/10} = 0.3", "{37/100} = 0.37"] },
          // unverified: a model answer, the book gives none
          a: "They show the same numbers: tenths are the first place after the decimal point and hundredths the second. {37/100} = 0.37.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 125–126",
      t: "Additional Practice 1–11",
      en: "Lesson 12-2",
      ic: "📘",
      from: "Practice Book p. 125–126",
      keep: true,
      items: [
        decQ(
          "Write the decimal for the model.",
          0.4,
          { kind: "fbar", rows: [T(4)] },
          "{4/10} = [0.4]",
        ),
        decQ(
          "Write the decimal for the model.",
          0.28,
          { kind: "fbar", rows: [H(28)] },
          "{28/100} = [0.28]",
        ),
        decQ(
          "Write the decimal for the model.",
          2.3,
          { kind: "fbar", side: true, rows: [T(10), T(10), T(3)] },
          "{2 3/10} = [2.3]",
        ),
        decQ(
          "Write {2 79/100} as a decimal.",
          2.79,
          { kind: "lines", rows: ["{2 79/100}"] },
          "[2.79]",
        ),
        decQ(
          "Write six hundredths as a decimal.",
          0.06,
          { kind: "fbar", rows: [H(6)] },
          "{6/100} = [0.06]",
        ),
        decQ(
          "Write one and 2 tenths as a decimal.",
          1.2,
          { kind: "lines", rows: ["1 and {2/10}"] },
          "{1 2/10} = [1.2]",
        ),
        decQ(
          "Write {1 5/10} as a decimal.",
          1.5,
          { kind: "lines", rows: ["{1 5/10}"] },
          "[1.5]",
        ),
        decQ(
          "Write {2 9/10} as a decimal.",
          2.9,
          { kind: "lines", rows: ["{2 9/10}"] },
          "[2.9]",
        ),
        decQ(
          "Write {1 7/100} as a decimal.",
          1.07,
          { kind: "lines", rows: ["{1 7/100}"] },
          "[1.07]",
        ),
        {
          type: "multi",
          q: "Which pairs are NOT equivalent? Choose all.",
          opts: [
            ["{4/10} and 4.1", true],
            ["2.6 and {26/10}", false],
            ["3.7 and {3 7/10}", false],
            ["{2 2/10} and 2.2", false],
            ["{1 41/100} and 1.41", false],
            ["1.79 and {1 79/100}", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "🔢" })),
          vis: { kind: "lines", rows: ["≠ ?"] },
          x: "{4/10} = 0.4, not 4.1. All the other pairs are equal.",
        },
        {
          type: "num",
          q: "Winter sells 3.5 pounds of apples. Write it as a fraction: 3 and ? tenths.",
          pre: "3.5 = 3",
          fr: "?/10",
          a: 5,
          emoji: "🍎",
          x: "3.5 = {3 [5]/10} pounds.",
        },
      ],
    },
  ],
};
