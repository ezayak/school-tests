// Math · Grade 4 · Lesson 7-3 « Find Equal Shares » (Reveal Math, Unit 7).
// Sources: Student Edition Vol. 1 p. 215–218, Student Practice Book p. 67–68. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Quotients are worked out by shared/math-kit.js (step); each share is a bar diagram with the part unknown (partBar).
const { step, partBar } = MathKit;
// "n shared equally into d groups"
const share = (q, n, d, post = "", more = {}) =>
  step(q, `${n} ÷ ${d}`, post, {
    vis: partBar(`${n}`, n, d, "1 share"),
    ...more,
  });

window.LESSON = {
  n: "7-3",
  key: "math4-l7-3",
  grade: 4,
  title: "Equal Shares",
  en: "Divide a 2-digit number by sharing it equally; check with multiplication",
  unit: "Unit 7 · Lesson 7-3",
  book: "Book p. 215–218 · Practice Book p. 67–68",
  imgDir: "img/lesson-7-3",
  cover: "curious",
  question: {
    q: "How can [equal sharing] help me divide?",
    a: "Put the things into the groups one at a time until none are left, then count one group: 42 ÷ 3 = [14]. Check: 3 × 14 = 42.",
    img: "counters",
  },
  words: [
    { w: "Equal shares", m: "every group gets the same number" },
    { w: "Divide (÷)", m: "share into equal groups: 42 ÷ 3 = 14" },
    { w: "Quotient", m: "the answer of a division: how many in each share" },
    { w: "Related multiplication", m: "3 × 14 = 42 checks 42 ÷ 3 = 14" },
  ],
  ideas: [
    {
      t: "Tell me everything you can",
      ic: "⭐",
      img: "curious",
      lines: [
        "Five students in a sticker club share their stickers [equally].",
        "Each student gets the [same number] of stickers.",
        "To find each share, we [divide] by 5.",
      ],
    },
    {
      t: "42 avocados in 3 crates",
      ic: "🥑",
      img: "counters",
      lines: [
        "Share 42 counters into [3] equal groups.",
        "There are [14] in each group.",
        "42 ÷ 3 = 14: 14 avocados in each crate.",
      ],
    },
    {
      t: "Check with multiplication",
      ic: "🔄",
      lines: [
        "3 groups of 14: 3 × 14 = [42].",
        "Multiplication and division are [related].",
        "38 ÷ 2 = 19 because 2 × 19 = 38.",
      ],
      vis: { kind: "lines", rows: ["42 ÷ 3 = 14", "3 × 14 = 42"] },
    },
    {
      t: "Share in steps",
      ic: "🪜",
      lines: [
        "92 apples in 4 bins: give 10 to each bin → 40 used.",
        "52 are left: give 13 more to each → 52 used.",
        "10 + 13 = [23] apples in each bin.",
      ],
      vis: {
        kind: "lines",
        rows: ["4 × 10 = 40", "92 − 40 = 52", "4 × 13 = 52"],
      },
    },
  ],

  games: [
    {
      k: "share",
      t: "Share equally",
      en: "2-digit ÷ 1-digit",
      ic: "🍪",
      items: [
        [48, 4],
        [65, 5],
        [57, 3],
        [76, 2],
        [84, 6],
        [98, 7],
      ].map(([n, d]) =>
        share(
          `${n} shared equally into ${d} groups. How many in each group?`,
          n,
          d,
        ),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 215–218",
      t: "Be Curious",
      en: "A sticker club",
      ic: "⭐",
      from: "Book p. 215 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Five students collected some stickers and want to share them equally. Tell me everything you can.",
          img: "curious",
          // unverified: no key for this lesson
          a: "There are many sticker sheets. Five students share them equally, so each gets the same number. To find each share, divide the number of stickers by 5.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 215–218",
      t: "Learn: avocados in crates",
      en: "42 ÷ 3",
      ic: "🥑",
      from: "Book p. 216 · Learn",
      keep: true,
      items: [
        share(
          "Ralph puts 42 avocados into 3 crates, the same in each. How many in each crate?",
          42,
          3,
          "avocados",
          { img: "counters", vis: undefined },
        ),
        step("Check: 3 × 14 = ?", "3 × 14", ""),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 215–218",
      t: "Work Together",
      en: "Beads in bracelets",
      ic: "🤝",
      from: "Book p. 216 · Work Together",
      keep: true,
      items: [
        share(
          "Shannon uses 52 beads for 4 bracelets, the same in each. How many beads in each bracelet?",
          52,
          4,
          "beads",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 215–218",
      t: "On My Own 1–6",
      en: "Share and divide",
      ic: "➗",
      from: "Book p. 217 · On My Own 1–6",
      keep: true,
      items: [
        share(
          "12 counters are shared equally into 3 groups. How many in each group?",
          12,
          3,
          "counters",
        ),
        share(
          "25 counters are shared equally into 5 groups. How many in each group?",
          25,
          5,
          "counters",
        ),
        share("49 ÷ 7 = ?", 49, 7),
        share("39 ÷ 3 = ?", 39, 3),
        share("66 ÷ 6 = ?", 66, 6),
        share("75 ÷ 5 = ?", 75, 5),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 215–218",
      t: "On My Own 7–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 217–218 · On My Own 7–12",
      keep: true,
      items: [
        share(
          "91 students in the chorus, 7 in each row. How many rows?",
          91,
          7,
          "rows",
        ),
        share(
          "Four students share 68 binder clips equally. How many each?",
          68,
          4,
          "clips",
        ),
        share(
          "Sasha scores 96 points in 6 games, the same in each. How many in each game?",
          96,
          6,
          "points",
        ),
        share(
          "Raul uses 72 nails for 3 drawers, the same for each. How many for each drawer?",
          72,
          3,
          "nails",
        ),
        {
          type: "tf",
          q: "Marcie says 84 ÷ 4 = 20. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I disagree"],
          vis: { kind: "lines", rows: ["4 × 20 = 80", "84 ÷ 4 = ?"] },
          x: "4 × 20 = 80, not 84. 84 ÷ 4 = [21], because 4 × 21 = 84.",
        },
        step(
          "Mr. Smith gives 1 apple to each of 4 bins, 10 times. How many apples is that?",
          "4 × 10",
          "apples",
        ),
        step(
          "He had 92 apples. How many are left to share?",
          "92 − 40",
          "apples",
        ),
        {
          type: "open",
          q: "Reflect: How can you explain dividing by using equal shares?",
          img: "counters",
          // unverified: a model answer, the book gives none
          a: "I put the things into the groups one at a time (or 10 at a time) until none are left. The number in one group is the quotient. I check it with multiplication.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 67–68",
      t: "Additional Practice 1–8",
      en: "Lesson 7-3",
      ic: "📘",
      from: "Practice Book p. 67–68",
      keep: true,
      items: [
        share("86 ÷ 2 = q. q = ?", 86, 2),
        share("78 ÷ 3 = n. n = ?", 78, 3),
        share("70 ÷ 5 = m. m = ?", 70, 5),
        share("84 ÷ 7 = t. t = ?", 84, 7),
        share(
          "Veronica keeps 52 ribbons in 4 boxes, the same in each. How many in each box?",
          52,
          4,
          "ribbons",
        ),
        share("84 chairs, 6 at each table. How many tables?", 84, 6, "tables"),
        share(
          "Brian paints birdhouses for 85 minutes, 5 minutes for each. How many birdhouses?",
          85,
          5,
          "birdhouses",
        ),
        {
          type: "tf",
          q: "Kim buys 3 pencils for 87 cents, the same price each. She says each pencil cost 25 cents. Is she right?",
          a: false,
          yes: ["Yes, she is", "No, she is not"],
          vis: { kind: "lines", rows: ["3 × 25 = 75", "87 ÷ 3 = ?"] },
          x: "3 × 25 = 75, not 87. 87 ÷ 3 = [29] cents, because 3 × 29 = 87.",
        },
      ],
    },
  ],
};
