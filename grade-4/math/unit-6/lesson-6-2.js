// Math · Grade 4 · Lesson 6-2 « Estimate Products » (Reveal Math, Unit 6).
// Sources: Student Edition Vol. 1 p. 169–172, Student Practice Book p. 49–50. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Each estimate names its strategy (round to a place, or a compatible number = the nearest 50), so the answer is fixed; worked out by shared/math-kit.js.
const { fmt, round, roundQ, step, PLACE1 } = MathKit;
const near50 = (n) => Math.round(n / 50) * 50;
// round the big factor to place j, then multiply
const byRound = (big, small, j, q) => [
  roundQ(
    big,
    j,
    q ? `${q} First round ${fmt(big)} to the nearest ${PLACE1[j]}.` : undefined,
  ),
  step(
    `Now multiply: about how much is ${fmt(big)} × ${small}?`,
    `${fmt(round(big, j))} × ${small}`,
    "",
  ),
];
// a compatible number close to big (the nearest 50), then multiply
const byCompat = (big, small, q) =>
  step(
    q ||
      `Estimate ${fmt(big)} × ${small} with a compatible number: ${fmt(near50(big))} is close to ${fmt(big)} and easy to multiply.`,
    `${fmt(near50(big))} × ${small}`,
    "",
  );
const aboutMC = (q, right, wrong, x, vis) => ({
  type: "mc",
  q,
  opts: [right, ...wrong].map((n) => `About ${fmt(n)}`),
  vis,
  x,
});

window.LESSON = {
  n: "6-2",
  key: "math4-l6-2",
  grade: 4,
  title: "Estimate Products",
  en: "Estimate a product with compatible numbers or by rounding",
  unit: "Unit 6 · Lesson 6-2",
  book: "Book p. 169–172 · Practice Book p. 49–50",
  imgDir: "img/lesson-6-2",
  cover: "curious",
  question: {
    q: "How can I [estimate] a product?",
    a: "Change the big factor to an easy number, then multiply. Rounding: 262 × 3 ≈ 300 × 3 = [900]. Compatible number: 262 × 3 ≈ 250 × 3 = [750].",
    img: "curious",
  },
  words: [
    { w: "Estimate", m: "a number close to the real answer: about 900" },
    {
      w: "Compatible numbers",
      m: "numbers close to the real ones that are easy to work with: 250 for 262",
    },
    {
      w: "Round",
      m: "change to the nearest ten, hundred, thousand: 262 → 300",
    },
    { w: "Product", m: "the answer of a multiplication" },
    { w: "About", m: "close to, not exact" },
  ],
  ideas: [
    {
      t: "What could the question be?",
      ic: "🌕",
      img: "curious",
      lines: [
        "87 hours until the eclipse. Leon says about [5,400 minutes].",
        "1 hour = 60 minutes. 87 is close to [90].",
        "90 × 60 = 5,400: “About how many minutes until the eclipse?”",
      ],
    },
    {
      t: "Compatible numbers",
      ic: "🤝",
      lines: [
        "262 apartments, 3 sinks in each: 262 × 3.",
        "250 is close to 262 and easy: 250 × 3 = [750].",
        "About 750 sinks.",
      ],
      vis: { kind: "lines", rows: ["262 × 3", "250 × 3 = 750"] },
    },
    {
      t: "Rounding",
      ic: "🎯",
      lines: [
        "Round 262 to the nearest hundred: [300].",
        "300 × 3 = [900].",
        "About 900 sinks. The real answer (786) is between.",
      ],
      vis: { kind: "nline", lo: 200, hi: 300, n: 262 },
    },
    {
      t: "Use the zeros",
      ic: "0️⃣",
      lines: [
        "300 × 3: 3 × 3 = 9, then two zeros: [900].",
        "6,000 × 5: 6 × 5 = 30, then three zeros: [30,000].",
        "Easy numbers make easy products.",
      ],
      vis: { kind: "lines", rows: ["3 × 3 = 9 → 900", "6 × 5 = 30 → 30,000"] },
    },
  ],

  games: [
    {
      k: "round",
      keep: true,
      t: "Round and multiply",
      en: "To the nearest hundred",
      ic: "🎯",
      items: [
        [318, 4],
        [589, 3],
        [742, 6],
        [451, 8],
      ].flatMap(([b, s]) => byRound(b, s, 2)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 169–172",
      t: "Be Curious",
      en: "The eclipse",
      ic: "🌕",
      from: "Book p. 169 · Be Curious",
      keep: true,
      items: [
        step(
          "87 hours until the eclipse. 87 is close to 90, and 1 hour = 60 minutes. About how many minutes?",
          "90 × 60",
          "minutes",
          { img: "curious", vis: undefined },
        ),
        {
          type: "open",
          q: "Leon said there are about 5,400 minutes until the eclipse. What could the question be?",
          img: "curious",
          // unverified: no key for this lesson
          a: "About how many minutes are there until the total eclipse? (87 hours ≈ 90 hours, and 90 × 60 = 5,400 minutes.)",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 169–172",
      t: "Learn: sinks in a building",
      en: "262 × 3",
      ic: "🚰",
      from: "Book p. 170 · Learn",
      keep: true,
      items: [
        step(
          "262 apartments, 3 sinks in each. Use the compatible number 250: about how many sinks?",
          "250 × 3",
          "sinks",
        ),
        ...byRound(262, 3, 2, "Now use rounding."),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 169–172",
      t: "Work Together",
      en: "168 × 5",
      ic: "🤝",
      from: "Book p. 170 · Work Together",
      keep: true,
      items: [
        ...byRound(168, 5, 2, "168 × 5: estimate with rounding."),
        byCompat(
          168,
          5,
          "Now with a compatible number: 150 is close to 168 and easy to multiply by 5.",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 169–172",
      t: "On My Own 1–8",
      en: "Compatible numbers and rounding",
      ic: "🎯",
      from: "Book p. 171 · On My Own 1–8",
      keep: true,
      items: [
        // unverified: "compatible number" taken as the nearest 50 (the book's own examples: 262 → 250, 141 → 150)
        byCompat(323, 5),
        byCompat(146, 3),
        byCompat(436, 5),
        byCompat(1252, 6),
        ...byRound(247, 7, 2),
        ...byRound(396, 8, 2),
        ...byRound(448, 5, 2),
        ...byRound(3456, 2, 3),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 169–172",
      t: "On My Own 9–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 171–172 · On My Own 9–12",
      keep: true,
      items: [
        aboutMC(
          "A cafeteria serves 2,750 lunches each week. About how many lunches in 4 weeks?",
          12000,
          [1200, 120000],
          "2,750 ≈ 3,000. 3,000 × 4 = [12,000].",
          { kind: "lines", rows: ["2,750 × 4", "3,000 × 4 = ?"] },
        ),
        aboutMC(
          "Penny's Pencils makes 5,980 pencils each day. About how many in 5 days?",
          30000,
          [3000, 300000],
          "5,980 ≈ 6,000. 6,000 × 5 = [30,000].",
          { kind: "lines", rows: ["5,980 × 5", "6,000 × 5 = ?"] },
        ),
        step(
          "9 boxes of 28 notebooks. 28 ≈ 30. About how many notebooks?",
          "9 × 30",
          "notebooks",
        ),
        step(
          "8 boxes of 275 scissors. 275 ≈ 300. About how many scissors?",
          "8 × 300",
          "scissors",
        ),
        step(
          "6 boxes of 3,830 pencils. 3,830 ≈ 4,000. About how many pencils?",
          "6 × 4,000",
          "pencils",
        ),
        {
          type: "multi",
          q: "Which numbers × 5 have an estimated product of 1,500? (Round the number to the nearest hundred.) Choose all.",
          opts: [295, 310, 302, 240, 360].map((n) => ({
            t: String(n),
            ok: round(n, 2) === 300,
            emoji: "🔢",
          })),
        },
        {
          type: "open",
          q: "Reflect: How do you think like a mathematician when you estimate products?",
          vis: {
            kind: "lines",
            rows: ["262 × 3", "250 × 3 = 750", "300 × 3 = 900"],
          },
          // unverified: a model answer, the book gives none
          a: "I change the big number to a close, easy number (rounding or a compatible number), multiply with a basic fact and zeros, and check that the real answer is near.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 49–50",
      t: "Additional Practice 1–6",
      en: "Lesson 6-2",
      ic: "📘",
      from: "Practice Book p. 49–50",
      keep: true,
      items: [
        ...[
          [129, 8],
          [152, 3],
          [372, 2],
          [261, 8],
          [454, 6],
          [258, 5],
          [446, 4],
          [632, 7],
        ].map(([b, s]) =>
          step(
            `Estimate ${b} × ${s}: round ${b} to the nearest hundred (${round(b, 2)}).`,
            `${fmt(round(b, 2))} × ${s}`,
            "",
          ),
        ),
        {
          type: "mc",
          q: "Which is the most precise estimate for 3,781 × 5?",
          opts: ["20,000", "25,000", "15,000", "10,000"],
          keep: ["25,000", "15,000", "20,000", "10,000"],
          vis: { kind: "lines", rows: ["3,781 ≈ 4,000", "4,000 × 5 = ?"] },
          x: "3,781 ≈ 4,000; 4,000 × 5 = [20,000] (C). The real product is 18,905.",
        },
        {
          type: "mc",
          q: "Which is the most precise estimated range for 6,440 × 3?",
          opts: [
            "About 18,000 to 21,000",
            "About 2,500 to 3,000",
            "About 6,000 to 7,000",
            "About 24,000 to 30,000",
          ],
          keep: [
            "About 2,500 to 3,000",
            "About 6,000 to 7,000",
            "About 18,000 to 21,000",
            "About 24,000 to 30,000",
          ],
          vis: {
            kind: "lines",
            rows: ["6,000 × 3 = 18,000", "7,000 × 3 = 21,000"],
          },
          x: "6,440 is between 6,000 and 7,000, so the product is between [18,000] and 21,000 (C).",
        },
        step(
          "Sudie buys 6 packages of 525 sheets. 525 ≈ 500. About how many sheets?",
          "6 × 500",
          "sheets",
        ),
        step(
          "Each book has 785 pages. 785 ≈ 800. About how many pages in 7 books?",
          "7 × 800",
          "pages",
        ),
        {
          type: "tf",
          q: "A store sells 2,875 pounds of fruit each month. The owner estimates 8,000 pounds in 4 months. Is that reasonable?",
          a: false,
          yes: ["Yes, it is", "No, it is not"],
          vis: { kind: "lines", rows: ["2,875 ≈ 3,000", "3,000 × 4 = 12,000"] },
          x: "3,000 × 4 = [12,000]: 8,000 is too low.",
        },
      ],
    },
  ],
};
