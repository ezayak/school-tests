// Math · Grade 4 · Lesson 5-5 « Generate a Pattern » (Reveal Math, Unit 5).
// Sources: Student Edition Vol. 1 p. 149–152, Student Practice Book p. 43–44. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The terms are worked out from the rule (terms, step from shared/math-kit.js).
const { step } = MathKit;
// the first n terms: start, then the rule again and again
const terms = (start, rule, n = 5) => {
  const out = [start];
  while (out.length < n) out.push(rule(out[out.length - 1]));
  return out;
};
const termsMC = (q, right, wrong, x) => ({
  type: "mc",
  q,
  opts: [right.join(", "), ...wrong.map((w) => w.join(", "))],
  vis: { kind: "lines", rows: [right.slice(0, 2).join(", ") + ", …"] },
  x,
});

window.LESSON = {
  n: "5-5",
  key: "math4-l5-5",
  grade: 4,
  title: "Make a Pattern from a Rule",
  en: "Use a rule to make the terms of a pattern, and find a term with a table",
  unit: "Unit 5 · Lesson 5-5",
  book: "Book p. 149–152 · Practice Book p. 43–44",
  imgDir: "img/lesson-5-5",
  cover: "curious",
  question: {
    q: "How does a [rule] tell me what a pattern looks like?",
    a: "The rule says how to get the next [term]. Start at 12, add 5: 17, 22, 27, 32, [37]. Day 5: 5 × 5 + 12 = 37.",
    img: "curious",
  },
  words: [
    { w: "Pattern", m: "shapes or numbers that follow a rule" },
    { w: "Rule", m: "what to do each time: add 5, subtract 4, double …" },
    { w: "Term", m: "one number or shape in a pattern: the 5th term is 37" },
    { w: "Table", m: "rows and columns: day, rule, pages read" },
  ],
  ideas: [
    {
      t: "Which doesn't belong?",
      ic: "🤔",
      img: "curious",
      lines: [
        "14, 12, 10 … subtract 2. 7, 9, 11 … add 2. 0, 4, 8 … add 4.",
        "1, 2, 4, 8, 16 … [multiply by 2].",
        "It is the only one that does not add or subtract.",
      ],
    },
    {
      t: "Thomas's book",
      ic: "📖",
      lines: [
        "Thomas is on page 12. He reads [5 pages] each day.",
        "Day 1: 1 × 5 + 12 = 17. Day 2: 2 × 5 + 12 = 22.",
        "Day 5: 5 × 5 + 12 = [37].",
      ],
      vis: { kind: "lines", rows: ["17, 22, 27, 32, 37"] },
    },
    {
      t: "Start and rule",
      ic: "▶️",
      lines: [
        "Start with 40, subtract 4:",
        "40, 36, 32, 28, [24].",
        "Each term comes from the one [before] it.",
      ],
      vis: {
        kind: "lines",
        rows: ["40 − 4 = 36", "36 − 4 = 32", "32 − 4 = 28"],
      },
    },
    {
      t: "Shape patterns",
      ic: "🌷",
      img: "planters",
      lines: [
        "Red, yellow, white, then again: red, yellow, white …",
        "The unit has [3] tulips.",
        "The 7th planter starts a new unit: [red].",
      ],
    },
  ],

  games: [
    {
      k: "terms",
      t: "Make the pattern",
      en: "Start and rule",
      ic: "▶️",
      items: [
        [5, "add 3", (v) => v + 3],
        [50, "subtract 5", (v) => v - 5],
        [2, "multiply by 2", (v) => v * 2],
        [7, "add 7", (v) => v + 7],
        [30, "subtract 6", (v) => v - 6],
      ].map(([s, name, r]) => {
        const right = terms(s, r);
        return termsMC(
          `Start with ${s}, ${name}. What are the first five terms?`,
          right,
          [terms(s, (v) => v + 1), terms(s, (v) => v + 2).map((v) => v * 2)],
          `[${right.join(", ")}]`,
        );
      }),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 149–152",
      t: "Be Curious",
      en: "Which doesn't belong?",
      ic: "🤔",
      from: "Book p. 149 · Be Curious",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Which pattern does not add or subtract the same number each time?",
          opts: [
            "1, 2, 4, 8, 16",
            "14, 12, 10, 8, 6",
            "7, 9, 11, 13, 15",
            "0, 4, 8, 12, 16",
          ],
          img: "curious",
          x: "1, 2, 4, 8, 16 [multiplies by 2]. The others add or subtract 2 or 4.",
        },
        {
          type: "open",
          q: "Which doesn't belong? Is there another answer?",
          img: "curious",
          // unverified: no key for this lesson; more than one answer is right
          a: "1, 2, 4, 8, 16: it multiplies by 2. Another answer: 14, 12, 10, 8, 6 is the only one that gets smaller.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 149–152",
      t: "Learn: Thomas's pages",
      en: "Start at 12, add 5",
      ic: "📖",
      from: "Book p. 150 · Learn",
      keep: true,
      items: [
        step(
          "Thomas is on page 12 and reads 5 pages a day. What page is he on after day 1?",
          "1 × 5 + 12",
          "",
          { pre: "Day 1: 1 × 5 + 12 =" },
        ),
        step("After day 3?", "3 × 5 + 12", "", { pre: "Day 3: 3 × 5 + 12 =" }),
        step("After day 5?", "5 × 5 + 12", "", { pre: "Day 5: 5 × 5 + 12 =" }),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 149–152",
      t: "Work Together",
      en: "Rows of counters",
      ic: "🤝",
      from: "Book p. 150 · Work Together",
      keep: true,
      items: [
        {
          type: "num",
          q: "Jasmine makes a row of 2 counters. Each new row has 1 more counter. How many counters in the 6th row?",
          a: 7,
          post: "counters",
          vis: { kind: "lines", rows: ["2, 3, 4, 5, 6, ?"] },
          x: "2, 3, 4, 5, 6, [7].",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 149–152",
      t: "On My Own 1–4",
      en: "The first five terms",
      ic: "▶️",
      from: "Book p. 151 · On My Own 1–4",
      keep: true,
      items: [
        termsMC(
          "Start with 40, subtract 4. The first five terms?",
          terms(40, (v) => v - 4),
          [
            [40, 44, 48, 52, 56],
            [40, 30, 20, 10, 0],
          ],
          "[40, 36, 32, 28, 24]",
        ),
        {
          type: "mc",
          q: "2 circles, 1 square, repeating. The first five shapes?",
          opts: ["⚪ ⚪ ⬛ ⚪ ⚪", "⚪ ⬛ ⚪ ⬛ ⚪", "⚪ ⚪ ⬛ ⬛ ⚪"],
          vis: { kind: "lines", rows: ["⚪ ⚪ ⬛ …"] },
          x: "Circle, circle, square, then again: [circle, circle].",
        },
        termsMC(
          "Start with 14 dots in a row, subtract 2 dots each row. The first five rows?",
          terms(14, (v) => v - 2),
          [
            [14, 16, 18, 20, 22],
            [14, 13, 12, 11, 10],
          ],
          "[14, 12, 10, 8, 6] dots",
        ),
        termsMC(
          "Start with 3, add 6. The first five terms?",
          terms(3, (v) => v + 6),
          [
            [3, 6, 9, 12, 15],
            [3, 18, 108, 648, 3888],
          ],
          "[3, 9, 15, 21, 27]",
        ),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 149–152",
      t: "On My Own 5–8",
      en: "Tables and rules",
      ic: "📋",
      from: "Book p. 151 · On My Own 5–8",
      keep: true,
      items: [
        step(
          "Hector puts 3 photos on page 1 and 3 more on each page. Page 2: (1 × 3) + 3 = 6. How many on page 4?",
          "(3 × 3) + 3",
          "photos",
        ),
        step("How many on page 6?", "(5 × 3) + 3", "photos"),
        step(
          "Floor rows have 5 seats; each stair row has 2 more seats on each end. Row 8: (8 × 4) + 5 = 37. How many in row 6?",
          "(6 × 4) + 5",
          "seats",
        ),
        step("How many in row 10?", "(10 × 4) + 5", "seats"),
        step(
          "Carton 1 has 3 pairs of socks; each carton has double the one before. Carton 2?",
          "2 × 3",
          "pairs",
        ),
        step("Carton 3?", "4 × 3", "pairs"),
        // unverified: the table says "number of socks" with the rule 1 × 3 = 3, so it counts pairs
        step("Carton 4?", "8 × 3", "pairs"),
        {
          type: "open",
          q: "Make a pattern with 5 terms. What rule does it follow?",
          vis: { kind: "lines", rows: ["start …, rule …"] },
          // unverified: a model answer; any pattern with a rule is right
          a: "Start with 5, add 5: 5, 10, 15, 20, 25. The rule is add 5.",
        },
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 149–152",
      t: "On My Own 9–12",
      en: "Tulips, miles, Dante",
      ic: "🧠",
      from: "Book p. 152 · On My Own 9–12",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Frank plants red, yellow and white tulips in turn in 7 planters. What color is the 7th planter?",
          opts: ["Red", "Yellow", "White"],
          keep: ["Red", "Yellow", "White"],
          icons: ["🔴", "🟡", "⚪"],
          img: "planters",
          x: "Red, yellow, white, red, yellow, white, [red].",
        },
        {
          type: "mc",
          q: "What color is the 5th planter?",
          opts: ["Yellow", "Red", "White"],
          keep: ["Red", "Yellow", "White"],
          icons: ["🟡", "🔴", "⚪"],
          img: "planters",
          x: "Red, yellow, white, red, [yellow].",
        },
        step(
          "Lola travels 4 miles to school and back each day. How many miles in 5 days?",
          "5 × 4",
          "miles",
        ),
        step("In 20 days?", "20 × 4", "miles"),
        {
          type: "tf",
          q: "The rule: add 4 squares to each column, starting with 2. Dante's 5th column has 18 squares. Does it follow the rule?",
          a: true,
          yes: ["Yes, it does", "No, it doesn't"],
          vis: { kind: "lines", rows: ["2, 6, 10, 14, 18"] },
          x: "2, 6, 10, 14, [18]: the 5th column has 18 squares.",
        },
        {
          type: "num",
          q: "The rule: add 6, starting with 8. How much greater is the 6th term than the 4th term?",
          a: 12,
          vis: { kind: "lines", rows: ["8, 14, 20, 26, 32, 38"] },
          x: "38 − 26 = [12]: two more steps of 6.",
        },
        {
          type: "open",
          q: "Reflect: How can a pattern rule tell you what the pattern will look like?",
          vis: {
            kind: "lines",
            rows: ["start 12, add 5", "12, 17, 22, 27, 32, 37"],
          },
          // unverified: a model answer, the book gives none
          a: "The rule tells me how to get each next term from the one before (add 5). With the start number I can write as many terms as I want.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 43–44",
      t: "Additional Practice 1–6",
      en: "Lesson 5-5",
      ic: "📘",
      from: "Practice Book p. 43–44",
      keep: true,
      items: [
        {
          type: "num",
          q: "Sasha plants 5 bulbs in the first row and 1 more in each new row. How many bulbs in the 5th row?",
          a: 9,
          post: "bulbs",
          vis: { kind: "lines", rows: ["5, 6, 7, 8, ?"] },
          x: "5, 6, 7, 8, [9].",
        },
        step(
          "Marco puts 4 cards in the first row and 2 more in each new row. How many cards in the 7th row?",
          "4 + 6 × 2",
          "cards",
          {
            vis: { kind: "lines", rows: ["4, 6, 8, 10, 12, 14, ?"] },
          },
        ),
        termsMC(
          "Start with 18, add 9. The first five terms?",
          terms(18, (v) => v + 9),
          [
            [18, 19, 20, 21, 22],
            [18, 27, 37, 48, 60],
          ],
          "[18, 27, 36, 45, 54]",
        ),
        termsMC(
          "Start with one dot, add two for the next row. The first four rows?",
          terms(1, (v) => v + 2, 4),
          [
            [1, 2, 3, 4],
            [1, 2, 4, 8],
          ],
          "[1, 3, 5, 7] dots",
        ),
        step(
          "Row 1 has 10 seats; each row has 4 more than the row before. How many seats in row 4?",
          "10 + 3 × 4",
          "seats",
        ),
        step("Row 5?", "10 + 4 × 4", "seats"),
        step("Row 6?", "10 + 5 × 4", "seats"),
        // unverified: "Total Seats" read as all the seats from row 1 to that row
        step(
          "All the seats in rows 1 to 4 (10, 14, 18, 22)?",
          "10 + 14 + 18 + 22",
          "seats",
        ),
        step("Rows 1 to 5?", "64 + 26", "seats"),
        step("Rows 1 to 6?", "90 + 30", "seats"),
        {
          type: "tf",
          q: "The rule: subtract 3 circles from each row, starting with 30. Mitchell's 5th term has 15 circles. Does it follow the rule?",
          a: false,
          yes: ["Yes, it does", "No, it doesn't"],
          vis: { kind: "lines", rows: ["30, 27, 24, 21, ?"] },
          x: "30, 27, 24, 21, [18]: the 5th term should be 18, not 15.",
        },
      ],
    },
  ],
};
[
  ["10 + 14 + 18 + 22", 64],
  ["64 + 26", 90],
].forEach(([e, v]) => {
  if (MathKit.value(e) !== v) throw new Error(`lesson-5-5: ${e} is not ${v}`);
});
