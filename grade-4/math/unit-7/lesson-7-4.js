// Math · Grade 4 · Lesson 7-4 « Understand Partial Quotients » (Reveal Math, Unit 7).
// Sources: Student Edition Vol. 1 p. 219–222, Student Practice Book p. 69–70. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Partial quotients come from shared/math-kit.js (partialQ: take away groups of the divisor, then add the chunks; it throws if something is left).
const { partialQ } = MathKit;

window.LESSON = {
  n: "7-4",
  key: "math4-l7-4",
  grade: 4,
  title: "Partial Quotients",
  en: "Divide by taking away easy groups (10s, then ones) and adding them up",
  unit: "Unit 7 · Lesson 7-4",
  book: "Book p. 219–222 · Practice Book p. 69–70",
  imgDir: "img/lesson-7-4",
  cover: "curious",
  question: {
    q: "How can [partial quotients] help me divide a 3-digit number?",
    a: "Take away easy groups: 105 ÷ 5 → 5 × 20 = 100, then 5 × 1 = 5. Nothing is left. Add the parts: 20 + 1 = [21].",
    img: "blocks",
  },
  words: [
    {
      w: "Partial quotient",
      m: "one part of the answer: 105 ÷ 5 = 20 + 1, 20 and 1 are partial quotients",
    },
    { w: "Compatible numbers", m: "easy numbers to divide: 100 ÷ 5 = 20" },
    { w: "Dividend", m: "the number you divide: 105" },
    { w: "Divisor", m: "the number you divide by: 5" },
    { w: "Quotient", m: "the answer: 21" },
  ],
  ideas: [
    {
      t: "Tell me everything you can",
      ic: "🥜",
      img: "curious",
      lines: [
        "A big bag of nuts and a scoop.",
        "We could share the nuts into [equal] bags.",
        "That is [division].",
      ],
    },
    {
      t: "105 bags on 5 tables",
      ic: "🧱",
      img: "blocks",
      lines: [
        "105 = 10 tens and 5 ones.",
        "Give each table [2 tens]: 5 × 20 = 100 used.",
        "5 ones are left: [1] more for each table.",
      ],
    },
    {
      t: "Write it down",
      ic: "✍️",
      lines: [
        "105 − 100 = 5 (5 × 20)",
        "5 − 5 = 0 (5 × 1)",
        "20 + 1 = [21] bags on each table.",
      ],
      vis: {
        kind: "lines",
        rows: ["105 − 100 = 5 (20)", "5 − 5 = 0 (1)", "20 + 1 = 21"],
      },
    },
    {
      t: "Different chunks, same answer",
      ic: "🔀",
      lines: [
        "316 ÷ 4: take 4 × 70 = 280, then 4 × 9 = 36 → 70 + 9 = [79].",
        "Or 4 × 50, 4 × 20, 4 × 9 → 50 + 20 + 9 = [79].",
        "Take away only what [fits]: never more than you have.",
      ],
      vis: { kind: "lines", rows: ["70 + 9 = 79", "50 + 20 + 9 = 79"] },
    },
  ],

  games: [
    {
      k: "chunks",
      t: "Take away groups",
      en: "Partial quotients",
      ic: "🧱",
      keep: true,
      items: [...partialQ(144, 6), ...partialQ(275, 5)],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 219–222",
      t: "Be Curious",
      en: "A bag of nuts",
      ic: "🥜",
      from: "Book p. 219 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Tell me everything you can.",
          img: "curious",
          // unverified: no key for this lesson
          a: "There is a big bag of red nuts, piles of nuts and a scoop. We could count the nuts and share them equally into smaller bags: that is division.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 219–222",
      t: "Learn: bags of pecans",
      en: "105 ÷ 5",
      ic: "🧱",
      from: "Book p. 220 · Learn",
      keep: true,
      items: partialQ(105, 5, [20, 1], "105 bags of pecans on 5 tables."),
    },
    {
      k: "together",
      g: "📗 Book · p. 219–222",
      t: "Work Together",
      en: "216 ÷ 9",
      ic: "🤝",
      from: "Book p. 220 · Work Together",
      keep: true,
      items: partialQ(216, 9),
    },
    {
      k: "own1",
      g: "📗 Book · p. 219–222",
      t: "On My Own 1–6",
      en: "What is the quotient?",
      ic: "➗",
      from: "Book p. 221 · On My Own 1–6",
      keep: true,
      items: [
        ...partialQ(136, 8),
        ...partialQ(114, 6),
        ...partialQ(115, 5),
        ...partialQ(105, 3),
        ...partialQ(154, 7),
        ...partialQ(342, 9),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 219–222",
      t: "On My Own 7–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 221–222 · On My Own 7–12",
      keep: true,
      items: [
        ...partialQ(
          135,
          9,
          null,
          "Will put 135 quarters in stacks of 9. How many stacks?",
        ),
        ...partialQ(256, 8, null, "256 cards in 8 binders, the same in each."),
        ...partialQ(210, 5, null, "210 workers in 5 equal teams."),
        ...partialQ(
          306,
          9,
          null,
          "306 beads for 9 necklaces, the same in each.",
        ),
        {
          type: "tf",
          q: "Marsha says she can use 10 as the first three partial quotients for 261 ÷ 9. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I disagree"],
          vis: { kind: "lines", rows: ["9 × 10 × 3 = 270", "270 > 261"] },
          x: "Three tens would take away 9 × 30 = 270: more than [261]. Only two tens fit: 261 ÷ 9 = 20 + 9 = 29.",
        },
        ...partialQ(316, 4, [70, 9], "316 ÷ 4, one way: chunks of 70 and 9."),
        ...partialQ(
          316,
          4,
          [50, 20, 9],
          "316 ÷ 4, another way: chunks of 50, 20 and 9.",
        ),
        {
          type: "open",
          q: "Reflect: How can you decide what number to use as a partial quotient?",
          img: "blocks",
          // unverified: a model answer, the book gives none
          a: "I use an easy number like 10, 20, 50 or 100 whose product with the divisor is not more than what is left. Then I keep going until nothing is left.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 69–70",
      t: "Additional Practice 1–8",
      en: "Lesson 7-4",
      ic: "📘",
      from: "Practice Book p. 69–70",
      keep: true,
      items: [
        ...partialQ(185, 5, null, "185 ÷ 5 = a."),
        ...partialQ(228, 3, null, "228 ÷ 3 = c."),
        ...partialQ(423, 9, null, "423 ÷ 9 = b."),
        ...partialQ(637, 7, null, "637 ÷ 7 = d."),
        ...partialQ(
          117,
          9,
          null,
          "Lewis reads 9 chapters in 117 minutes, the same time each.",
        ),
        ...partialQ(
          224,
          7,
          null,
          "7 cinder blocks weigh 224 pounds, the same each.",
        ),
        ...partialQ(
          328,
          8,
          null,
          "Mindy makes $328 selling scarves at $8 each.",
        ),
        ...partialQ(632, 8, [70, 9], "632 ÷ 8, one way: chunks of 70 and 9."),
        ...partialQ(632, 8, [50, 20, 9], "632 ÷ 8, another way: 50, 20 and 9."),
      ],
    },
  ],
};
