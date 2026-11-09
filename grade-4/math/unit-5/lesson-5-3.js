// Math · Grade 4 · Lesson 5-3 « Understand Multiples » (Reveal Math, Unit 5).
// Sources: Student Edition Vol. 1 p. 141–144, Student Practice Book p. 39–40. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The lists of multiples and the "choose all" answers are worked out here (seq, mult); factors from shared/math-kit.js.
const { factors, step } = MathKit;
const seq = (n, from, count) =>
  Array.from({ length: count }, (_, k) => n * (from + k));
// "What are the next five multiples of 4?" (the right list first, then the likely mistakes: counting by 1, doubling)
const nextMC = (n, count = 5, q) => {
  const right = seq(n, 2, count).join(", ");
  const by1 = Array.from({ length: count }, (_, k) => n + 1 + k).join(", ");
  const dbl = Array.from({ length: count }, (_, k) => n * 2 ** (k + 1)).join(
    ", ",
  );
  return {
    type: "mc",
    q: q || `${n}, … What are the next ${count} multiples of ${n}?`,
    opts: [right, by1, dbl],
    vis: { kind: "lines", rows: [`${n} × 2, ${n} × 3, ${n} × 4 …`] },
    x: `Count by ${n}s: ${n}, [${right}].`,
  };
};
// "Which numbers are multiples of 4?" (choose all)
const multQ = (n, list, q) => ({
  type: "multi",
  q: q || `Which numbers are multiples of ${n}? Choose all.`,
  opts: list.map((m) => ({ t: String(m), ok: m % n === 0, emoji: "🔢" })),
});

window.LESSON = {
  n: "5-3",
  key: "math4-l5-3",
  grade: 4,
  title: "Multiples",
  en: "Multiples: the products of a number and 1, 2, 3 … ; a number is a multiple of its factors",
  unit: "Unit 5 · Lesson 5-3",
  book: "Book p. 141–144 · Practice Book p. 39–40",
  imgDir: "img/lesson-5-3",
  cover: "curious",
  question: {
    q: "What is a [multiple] of a number?",
    a: "A number times 1, 2, 3, 4 …: the multiples of 8 are [8, 16, 24, 32, 40] … Count by 8s. And 8 is a multiple of each of its factors 1, 2, 4, 8.",
    img: "bottles",
  },
  words: [
    {
      w: "Multiple",
      m: "a number times a whole number: 24 = 3 × 8 is a multiple of 8",
    },
    {
      w: "Factor",
      m: "a number you multiply: 8 is a multiple of its factors 1, 2, 4 and 8",
    },
    { w: "Product", m: "the answer of a multiplication" },
    { w: "Count by", m: "skip count: 8, 16, 24, 32 …" },
  ],
  ideas: [
    {
      t: "Which doesn't belong?",
      ic: "🤔",
      img: "curious",
      lines: [
        "5, 10, 15, 23.",
        "5, 10 and 15 are [multiples of 5]: count by 5s.",
        "23 is not: it doesn't end in 0 or 5.",
      ],
    },
    {
      t: "Packs of 8 bottles",
      ic: "💧",
      img: "bottles",
      lines: [
        "Ralph buys packs of [8] water bottles.",
        "1 pack: 8. 2 packs: 16. 3 packs: [24] …",
        "8, 16, 24, 32, 40 are [multiples of 8].",
      ],
    },
    {
      t: "Multiples = times",
      ic: "✖️",
      lines: [
        "1 × 8 = 8, 2 × 8 = 16, 3 × 8 = 24,",
        "4 × 8 = 32, 5 × 8 = 40.",
        "A multiple is a number [times] 1, 2, 3 …",
      ],
      vis: { kind: "groups", n: 3, of: 8, e: "💧", cap: "3 × 8 = [24]" },
    },
    {
      t: "A number is a multiple of its factors",
      ic: "🔄",
      lines: [
        "The factors of 8: 1, 2, 4, 8.",
        "Count by 2s: 2, 4, 6, [8]. Count by 4s: 4, [8].",
        "8 is a multiple of [each] of its factors.",
      ],
      vis: {
        kind: "lines",
        rows: ["1: 1, 2, … 8", "2: 2, 4, 6, 8", "4: 4, 8", "8: 8"],
      },
    },
    {
      t: "Multiples of 5",
      ic: "🖐️",
      lines: [
        "5, 10, 15, 20, 25, 30 …",
        "They all end in [0] or [5].",
        "So 135 is a multiple of 5, 136 is not.",
      ],
      vis: { kind: "lines", rows: ["5, 10, 15, 20, 25, 30"] },
    },
  ],

  games: [
    {
      k: "next",
      t: "Count by",
      en: "The next multiples",
      ic: "🦘",
      items: [3, 6, 8, 9, 11].map((n) => nextMC(n)),
    },
    {
      k: "is",
      t: "Is it a multiple?",
      en: "Choose all",
      ic: "🔢",
      items: [
        [3, [18, 21, 25, 30, 32]],
        [6, [24, 26, 36, 40, 42]],
        [7, [21, 27, 35, 47, 56]],
        [8, [32, 36, 48, 54, 64]],
      ].map(([n, list]) => multQ(n, list)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 141–144",
      t: "Be Curious",
      en: "Which doesn't belong?",
      ic: "🤔",
      from: "Book p. 141 · Be Curious",
      keep: true,
      items: [
        {
          type: "mc",
          q: "5, 10, 15, 23: which number is not a multiple of 5?",
          opts: ["23", "5", "10", "15"],
          img: "curious",
          x: "5 × 1, 5 × 2, 5 × 3 = 5, 10, 15. [23] is between 5 × 4 = 20 and 5 × 5 = 25.",
        },
        {
          type: "open",
          q: "Which doesn't belong? Can you find another answer?",
          img: "curious",
          // unverified: no key for this lesson; more than one answer is right
          a: "23: it is not a multiple of 5 (and it is prime). Other answers: 5 is the only one-digit number; 10 is the only even number.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 141–144",
      t: "Learn: water bottles",
      en: "Multiples of 8",
      ic: "💧",
      from: "Book p. 142 · Learn",
      keep: true,
      items: [
        step(
          "Ralph buys 3 packs of 8 bottles. How many bottles?",
          "3 × 8",
          "bottles",
          { img: "bottles", vis: undefined },
        ),
        step("And 5 packs?", "5 × 8", "bottles", {
          vis: { kind: "groups", n: 5, of: 8, e: "💧", cap: "" },
        }),
        multQ(
          8,
          [16, 24, 30, 40, 12],
          "How many bottles might Ralph buy? Choose all the multiples of 8.",
        ),
        multQ(
          8,
          [1, 2, 3, 4, 8],
          "8 is a multiple of which numbers? Choose all.",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 141–144",
      t: "Work Together",
      en: "Factors of 70",
      ic: "🤝",
      from: "Book p. 142 · Work Together",
      keep: true,
      items: [
        {
          type: "multi",
          q: "Which of these numbers are factors of 70? Choose all.",
          opts: [2, 3, 4, 5, 10, 12, 13].map((k) => ({
            t: String(k),
            ok: factors(70).includes(k),
            emoji: "🔢",
          })),
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 141–144",
      t: "On My Own 1–8",
      en: "Multiples",
      ic: "🦘",
      from: "Book p. 143 · On My Own 1–8",
      keep: true,
      items: [
        ...[4, 7, 12, 15].map((n) => nextMC(n)),
        multQ(4, [14, 16, 34, 64]),
        multQ(9, [91, 89, 45, 18]),
        {
          type: "mc",
          q: "_, 12, 18, _, _, _: what are the missing multiples?",
          opts: ["6 … 24, 30, 36", "0 … 20, 22, 24", "6 … 22, 26, 30"],
          vis: { kind: "lines", rows: ["_, 12, 18, _, _, _"] },
          x: "Count by [6]s: 6, 12, 18, 24, 30, 36.",
        },
        {
          type: "mc",
          q: "_, 10, _, _, _: what are the missing multiples?",
          opts: ["5 … 15, 20, 25", "0 … 20, 30, 40", "9 … 11, 12, 13"],
          vis: { kind: "lines", rows: ["_, 10, _, _, _"] },
          x: "Count by [5]s: 5, 10, 15, 20, 25.",
        },
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 141–144",
      t: "On My Own 9–11",
      en: "Patterns and the Venn diagram",
      ic: "🧠",
      from: "Book p. 143–144 · On My Own 9–11",
      keep: true,
      items: [
        {
          type: "mc",
          q: "What pattern do the products of 5 show?",
          opts: [
            "They end in 0 or 5",
            "They are all odd",
            "They end in 5 only",
          ],
          vis: { kind: "lines", rows: ["5, 10, 15, 20, 25, 30"] },
          x: "A number that ends in [0 or 5] is a multiple of 5.",
        },
        {
          type: "multi",
          q: "3 olives on each slice of pizza. Danny eats 2 or 3 slices. How many olives might he eat? Choose all.",
          opts: [6, 9, 5, 8].map((m) => ({
            t: String(m),
            ok: m % 3 === 0,
            emoji: "🍕",
          })),
        },
        {
          type: "multi",
          q: "Venn diagram: factors of 36 and multiples of 6 (numbers 1–72). Which numbers go in the middle, in both circles? Choose all.",
          opts: [6, 12, 18, 36, 24, 9, 4].map((m) => ({
            t: String(m),
            ok: 36 % m === 0 && m % 6 === 0,
            emoji: "⭕",
          })),
        },
        {
          type: "open",
          q: "Reflect: How can you use patterns to decide whether a number is a multiple of another number?",
          vis: {
            kind: "lines",
            rows: ["5, 10, 15, 20 → 0 or 5", "2, 4, 6, 8, 10 → even"],
          },
          // unverified: a model answer, the book gives none
          a: "Count by the number, or look at the pattern of the last digit: multiples of 2 are even, multiples of 5 end in 0 or 5, multiples of 10 end in 0.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 39–40",
      t: "Additional Practice 1–9",
      en: "Lesson 5-3",
      ic: "📘",
      from: "Practice Book p. 39–40",
      keep: true,
      items: [
        ...[2, 5, 6, 8].map((n) =>
          nextMC(
            n,
            6,
            `${n}, … What are the next six multiples of ${n} (the first seven)?`,
          ),
        ),
        {
          type: "mc",
          q: "Which number is not a multiple of 7?",
          opts: ["17", "14", "49", "70"],
          keep: ["14", "17", "49", "70"],
          vis: { kind: "lines", rows: ["7, 14, 21, … 49, … 70"] },
          x: "14 = 2 × 7, 49 = 7 × 7, 70 = 10 × 7. [17] is not.",
        },
        multQ(9, [90, 27, 29, 72]),
        step(
          "Kiara buys 5 packs of 8 cards. How many cards?",
          "5 × 8",
          "cards",
        ),
        step(
          "4 students at each table. How many paintbrushes for 3 tables?",
          "3 × 4",
          "brushes",
        ),
        step("For 4 tables?", "4 × 4", "brushes"),
        step("For 5 tables?", "5 × 4", "brushes"),
        step(
          "3 items in each gift bag. How many items for 3 bags?",
          "3 × 3",
          "items",
        ),
        step("For 5 bags?", "5 × 3", "items"),
        step("For 7 bags?", "7 × 3", "items"),
      ],
    },
  ],
};
