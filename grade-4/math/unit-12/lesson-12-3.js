// Math · Grade 4 · Lesson 12-3 « Compare Decimals » (Reveal Math, Unit 12 « Decimal Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 26:30–27:20; no page numbers;
// text read with OCR (scripts/ocr.sh), numbers checked on the frames), Student Practice Book p. 127–128. No teacher's key.
// The e-book says "Complete exercises 9 through 13" but the video shows 9–12 only. Log: grade-4/math/SOURCES.md.
const sign = (a, b) => (Math.abs(a - b) < 1e-9 ? "=" : a < b ? "<" : ">");
const hund = (x) => Math.round(x * 100);
const cmpQ = (a, b, more = {}) => {
  const s = sign(a, b);
  return {
    type: "mc",
    q: `Compare: ${a} ___ ${b}`,
    opts: [s, ...["<", "=", ">"].filter((o) => o !== s)],
    keep: ["<", "=", ">"],
    vis: { kind: "lines", rows: [`${a}   ?   ${b}`] },
    help: {
      t: "Write both in hundredths",
      lines: ["0.4 = 0.40: 40 hundredths.", "Then compare the hundredths."],
    },
    x: `${a} = {${hund(a)}/100}, ${b} = {${hund(b)}/100}: ${hund(a)} ${s} ${hund(b)}, so ${a} ${s} ${b}.`,
    ...more,
  };
};

window.LESSON = {
  n: "12-3",
  key: "math4-l12-3",
  grade: 4,
  title: "Compare Decimals",
  en: "Compare decimals with number lines, grids and hundredths",
  unit: "Unit 12 · Lesson 12-3",
  book: "e-book Lesson 12-3 · Practice Book p. 127–128",
  imgDir: "img/lesson-12-3",
  cover: "curious",
  question: {
    q: "How is comparing [decimals] like comparing whole numbers?",
    // unverified: a model answer, the book gives none
    a: "Compare place by place from the left: ones, then tenths, then hundredths. Write both with hundredths: 0.4 = 0.40 > 0.25.",
    img: "curious",
  },
  words: [
    { w: "Greater than", m: "> : 0.4 > 0.25" },
    { w: "Less than", m: "< : 0.25 < 0.4" },
    { w: "Equal", m: "= : 1.5 = 1.50" },
    { w: "Hundredths", m: "0.4 = 0.40 = 40 hundredths" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🌳",
      img: "curious",
      lines: [
        "A map of a farm: a distance is 30.25 m.",
        "Decimals measure lengths too.",
      ],
    },
    {
      t: "Genova Trail",
      ic: "🪧",
      lines: [
        "Union Falls 0.4 mi, Rock Bridge 0.25 mi.",
        "0.4 is to the [right] of 0.25 on the number line: 0.4 > 0.25.",
      ],
      vis: {
        kind: "lines",
        rows: ["Union Falls 0.4 mi", "Rock Bridge 0.25 mi"],
      },
    },
    {
      t: "As hundredths",
      ic: "🟦",
      lines: [
        "0.4 = {40/100}, 0.25 = {25/100}.",
        "40 hundredths > 25 hundredths: [0.4 > 0.25].",
      ],
      vis: {
        kind: "fbar",
        side: true,
        rows: [
          { d: 100, g: 10, k: 40, sq: true, l: "0.4" },
          { d: 100, g: 10, k: 25, sq: true, l: "0.25" },
        ],
      },
    },
  ],

  games: [
    {
      k: "cmp",
      t: "Compare decimals",
      en: "<, = or >",
      ic: "⚖️",
      items: [
        [0.3, 0.29],
        [0.07, 0.7],
        [1.4, 1.4],
        [2.15, 2.5],
        [0.62, 0.6],
        [3.09, 3.1],
      ].map(([a, b]) => cmpQ(a, b)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 12-3",
      t: "Be Curious",
      en: "A farm map",
      ic: "🌳",
      from: "e-book 12-3 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "A farm with a barn, a house and fields; one distance is 30.25 meters. I wonder how long the other distances are and which is the longest.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 12-3",
      t: "Learn: the trail",
      en: "0.4 and 0.25",
      ic: "🪧",
      from: "e-book 12-3 · Learn",
      keep: true,
      items: [
        cmpQ(0.4, 0.25, {
          q: "Union Falls is 0.4 mi, Rock Bridge 0.25 mi. Compare: 0.4 ___ 0.25",
        }),
        {
          type: "mc",
          q: "Which distance is greater?",
          opts: ["To Union Falls", "To Rock Bridge", "They are the same"],
          keep: ["To Union Falls", "To Rock Bridge", "They are the same"],
          emoji: "🪧",
          x: "0.4 = 0.40 > 0.25: Union Falls is farther.",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 12-3",
      t: "Work Together",
      en: "1.6 and 1.73",
      ic: "🤝",
      from: "e-book 12-3 · Work Together",
      keep: true,
      items: [cmpQ(1.6, 1.73)],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 12-3",
      t: "On My Own 1–8",
      en: "Compare",
      ic: "⚖️",
      from: "e-book 12-3 · On My Own 1–8",
      keep: true,
      items: [
        cmpQ(0.01, 0.11),
        cmpQ(0.9, 0.09),
        cmpQ(0.39, 0.6),
        cmpQ(1.5, 1.5, {
          q: "Compare: 1.50 ___ 1.5",
          x: "1.50 = 150 hundredths = 1.5.",
        }),
        {
          type: "num",
          q: "Write 0.62 as a fraction.",
          fr: "?/100",
          a: 62,
          vis: { kind: "lines", rows: ["0.62"] },
          x: "0.62 = {[62]/100}",
        },
        cmpQ(0.62, 0.26),
        {
          type: "num",
          q: "Write 0.7 as hundredths.",
          fr: "?/100",
          a: 70,
          vis: { kind: "lines", rows: ["0.7"] },
          x: "0.7 = {7/10} = {[70]/100}",
        },
        cmpQ(0.57, 0.7),
        cmpQ(0.27, 0.4),
        cmpQ(1.4, 0.63),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · Lesson 12-3",
      t: "On My Own 9–12",
      en: "True or not, Mandy, apples, James",
      ic: "🍎",
      from: "e-book 12-3 · On My Own 9–12",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Which comparisons are true? Choose all.",
          opts: [
            ["0.78 < 0.9", true],
            ["2.51 > 2.3", true],
            ["0.4 = 0.04", false],
            ["0.27 > 0.3", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "⚖️" })),
          vis: { kind: "lines", rows: ["true?"] },
          x: "0.78 < 0.90 and 2.51 > 2.30. 0.40 ≠ 0.04 and 0.27 < 0.30.",
        },
        {
          type: "tf",
          q: "Error Analysis: Mandy writes 2.30 > 2.3 because 30 is greater than 3. Is she right?",
          a: false,
          yes: ["Yes, she is right", "No, she is not"],
          vis: { kind: "lines", rows: ["2.30 ? 2.3"] },
          x: "2.3 = 2.30: 3 tenths = 30 hundredths. They are equal.",
        },
        {
          type: "mc",
          q: "Carter bought 0.72 pound of apples and 0.58 pound of bananas. Which weighed more?",
          opts: ["The apples", "The bananas", "The same"],
          keep: ["The apples", "The bananas", "The same"],
          emoji: "🍎",
          x: "72 hundredths > 58 hundredths: the apples.",
        },
        {
          type: "num",
          q: "Extend: James compares two decimals with the same digits: 1.82 > ?. What is the other number?",
          a: 1.28,
          dec: true,
          vis: { kind: "lines", rows: ["1.82 > ?"] },
          // unverified: 1.28 is the one with the same digits 1, 8, 2 in another order that keeps 1 in the ones (2.18 and 2.81 are greater)
          x: "The digits 1, 8, 2: [1.28] < 1.82.",
        },
        {
          type: "open",
          q: "Reflect: How is comparing decimals similar to comparing whole numbers?",
          vis: { kind: "lines", rows: ["0.40 > 0.25", "40 > 25"] },
          // unverified: a model answer, the book gives none
          a: "Compare place by place from the left. With the same number of places (0.40 and 0.25) it is like comparing 40 and 25.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 127–128",
      t: "Additional Practice 1–14",
      en: "Lesson 12-3",
      ic: "📘",
      from: "Practice Book p. 127–128",
      keep: true,
      items: [
        ...[
          [1.1, 1.1],
          [2.4, 2.42],
          [1.08, 1.09],
          [0.6, 0.66],
          [1.88, 1.08],
          [0.95, 0.91],
          [1.2, 1.2],
          [0.3, 0.14],
          [2.12, 2.21],
        ].map(([a, b], i) =>
          cmpQ(
            a,
            b,
            i === 0
              ? { q: "Compare: 1.1 ___ 1.10" }
              : i === 6
                ? { q: "Compare: 1.2 ___ 1.20" }
                : {},
          ),
        ),
        {
          type: "multi",
          q: "Which comparisons are false? Choose all.",
          opts: [
            ["0.49 < 0.47", true],
            ["2.99 < 2.09", true],
            ["1.42 = 1.40", true],
            ["0.8 > 0.79", false],
            ["2.5 = 2.50", false],
            ["1.58 > 1.5", false],
          ].map(([t, ok]) => ({ t, ok, emoji: "⚖️" })),
          vis: { kind: "lines", rows: ["false?"] },
          x: "0.49 > 0.47, 2.99 > 2.09, 1.42 > 1.40: those three are false.",
        },
        cmpQ(1.77, 1.07),
        {
          type: "tf",
          q: "Barry says 0.5 is greater than 0.57. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          vis: { kind: "lines", rows: ["0.50 ? 0.57"] },
          x: "0.5 = 0.50 and 50 < 57: 0.5 < 0.57.",
        },
        {
          type: "mc",
          q: "Lora has $3.41 and Naomi has $3.50. Who has more money?",
          opts: ["Naomi", "Lora", "The same"],
          keep: ["Lora", "Naomi", "The same"],
          emoji: "👛",
          x: "3.50 > 3.41: Naomi.",
        },
        {
          type: "mc",
          q: "Puppy 1 weighs 3.74 pounds and Puppy 2 weighs 3.81 pounds. Which weighs less?",
          opts: ["Puppy 1", "Puppy 2", "The same"],
          keep: ["Puppy 1", "Puppy 2", "The same"],
          emoji: "🐶",
          x: "3.74 < 3.81: Puppy 1.",
        },
      ],
    },
  ],
};
