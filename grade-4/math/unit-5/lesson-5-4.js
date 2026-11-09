// Math · Grade 4 · Lesson 5-4 « Number or Shape Patterns » (Reveal Math, Unit 5).
// Sources: Student Edition Vol. 1 p. 145–148, Student Practice Book p. 41–42. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Number sequences are extended by their rule here (extend); shape patterns are pictures cropped from the book.
const extend = (seq, rule, count = 3) => {
  const out = [];
  let v = seq[seq.length - 1];
  for (let k = 0; k < count; k++) out.push((v = rule(v)));
  return out;
};
const R = {
  "+": (n) => (v) => v + n,
  "−": (n) => (v) => v - n,
  "×": (n) => (v) => v * n,
};
const ruleName = (op, n) =>
  op === "+" ? `Add ${n}` : op === "−" ? `Subtract ${n}` : `Multiply by ${n}`;
// "What is the rule?" for a number sequence (the right rule first, then likely mistakes)
const ruleQ = (seq, op, n, wrong) => ({
  type: "mc",
  q: `${seq.join(", ")}, … What is the rule?`,
  opts: [ruleName(op, n), ...wrong],
  vis: { kind: "lines", rows: [seq.join(", ")] },
  x: `${seq[0]} ${op} ${n} = ${R[op](n)(seq[0])}: [${ruleName(op, n).toLowerCase()}] each time.`,
});
// "What are the next three numbers?" (worked out from the rule)
const nextQ = (seq, op, n, q) => {
  const next = extend(seq, R[op](n));
  const wrong1 = extend(seq, R["+"](op === "+" ? n + 1 : 1));
  const wrong2 = extend(seq, R[op === "−" ? "+" : "−"](n)).map((v) =>
    Math.abs(v),
  );
  return {
    type: "mc",
    q: q || `${seq.join(", ")}, … What are the next three numbers?`,
    opts: [next.join(", "), wrong1.join(", "), wrong2.join(", ")],
    vis: { kind: "lines", rows: [seq.join(", ") + ", ?, ?, ?"] },
    x: `The rule is ${ruleName(op, n).toLowerCase()}: [${next.join(", ")}].`,
  };
};
// a shape pattern from a picture: "What is the pattern unit / rule?"
const shapeQ = (q, img, right, wrong, x) => ({
  type: "mc",
  q,
  img,
  opts: [right, ...wrong],
  x,
});

window.LESSON = {
  n: "5-4",
  key: "math4-l5-4",
  grade: 4,
  title: "Number and Shape Patterns",
  en: "Repeating patterns (a pattern unit) and growing patterns (a pattern rule)",
  unit: "Unit 5 · Lesson 5-4",
  book: "Book p. 145–148 · Practice Book p. 41–42",
  imgDir: "img/lesson-5-4",
  cover: "curious",
  question: {
    q: "How can I tell if shapes or numbers follow a [pattern]?",
    a: "Look for a part that [repeats] (the pattern unit: circle, triangle, square …) or a [rule] that makes it grow (add 4: 10, 14, 18, 22 …).",
    img: "necklace-a",
  },
  words: [
    { w: "Pattern", m: "shapes or numbers that follow a rule" },
    { w: "Sequence", m: "shapes or numbers in an order" },
    {
      w: "Pattern unit",
      m: "the part of a repeating pattern that repeats: circle, triangle, square",
    },
    { w: "Pattern rule", m: "what happens each time: add 4, multiply by 2 …" },
    { w: "Repeating pattern", m: "the same unit again and again" },
    { w: "Growing pattern", m: "it gets bigger by a rule each time" },
  ],
  ideas: [
    {
      t: "What do you notice?",
      ic: "🧱",
      img: "curious",
      lines: [
        "Top: colours that come back again and again: a [repeating] pattern.",
        "Bottom: towers 1, 2, 3, 4 … blocks tall.",
        "Each tower has [1 more] block: a growing pattern.",
      ],
    },
    {
      t: "A repeating pattern",
      ic: "📿",
      img: "necklace-a",
      lines: [
        "Necklace A: circle, triangle, square, circle, triangle, square …",
        "The [pattern unit] is blue circle, yellow triangle, red square.",
        "Next: a [blue circle], a yellow triangle, a red square.",
      ],
    },
    {
      t: "A growing pattern",
      ic: "📈",
      img: "necklace-b",
      lines: [
        "Necklace B: 1 square, then 2 squares, then 3 squares …",
        "The [pattern rule]: add 1 more red square each time.",
        "Next: circle, triangle and [4] red squares.",
      ],
    },
    {
      t: "Number patterns",
      ic: "🔢",
      lines: [
        "10, 14, 18, 22, …: each number is [4 more].",
        "The rule is add 4: 26, 30, [34].",
        "6, 12, 24, 48: multiply by [2] each time.",
      ],
      vis: {
        kind: "lines",
        rows: ["10, 14, 18, 22, 26, 30, 34", "6, 12, 24, 48, 96"],
      },
    },
    {
      t: "The 30th bead",
      ic: "🔮",
      img: "own11",
      lines: [
        "The unit has [3] beads: circle, triangle, square.",
        "Beads 3, 6, 9 … 30 are squares: 30 = 10 × 3.",
        "The 30th bead is a [square].",
      ],
    },
  ],

  games: [
    {
      k: "rule",
      t: "What is the rule?",
      en: "Number patterns",
      ic: "🔍",
      items: [
        [[5, 9, 13, 17], "+", 4, ["Add 5", "Multiply by 2"]],
        [[3, 9, 27, 81], "×", 3, ["Add 6", "Add 3"]],
        [[60, 52, 44, 36], "−", 8, ["Subtract 6", "Add 8"]],
        [[7, 14, 28, 56], "×", 2, ["Add 7", "Add 14"]],
        [[11, 22, 33, 44], "+", 11, ["Multiply by 2", "Add 10"]],
      ].map(([s, op, n, w]) => ruleQ(s, op, n, w)),
    },
    {
      k: "next",
      t: "What comes next?",
      en: "Three more numbers",
      ic: "➡️",
      items: [
        [[8, 16, 24, 32], "+", 8],
        [[100, 90, 80, 70], "−", 10],
        [[2, 6, 18, 54], "×", 3],
        [[15, 30, 45, 60], "+", 15],
      ].map(([s, op, n]) => nextQ(s, op, n)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 145–148",
      t: "Be Curious",
      en: "Blocks",
      ic: "🧱",
      from: "Book p. 145 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "The top blocks repeat: two blocks stacked, then a row, again and again. The towers at the bottom grow: each one is 1 block taller than the one before. I wonder how tall the next tower would be.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 145–148",
      t: "Learn: Opa's necklaces",
      en: "What comes next?",
      ic: "📿",
      from: "Book p. 146 · Learn",
      keep: true,
      items: [
        shapeQ(
          "Necklace A: what will Opa add next?",
          "necklace-a",
          "A blue circle, a yellow triangle, a red square",
          ["Two red squares", "A yellow triangle, a blue circle"],
          "The [pattern unit] repeats: circle, triangle, square.",
        ),
        shapeQ(
          "Necklace B: after the last circle, what will Opa add?",
          "necklace-b",
          "A yellow triangle and four red squares",
          [
            "A yellow triangle and three red squares",
            "A blue circle and a red square",
          ],
          "The rule: [one more] red square each time: 1, 2, 3, then 4.",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 145–148",
      t: "Work Together",
      en: "10, 14, 18, 22",
      ic: "🤝",
      from: "Book p. 146 · Work Together",
      keep: true,
      items: [nextQ([10, 14, 18, 22], "+", 4)],
    },
    {
      k: "own1",
      g: "📗 Book · p. 145–148",
      t: "On My Own 1–6",
      en: "The pattern unit or rule",
      ic: "🔍",
      from: "Book p. 147 · On My Own 1–6",
      keep: true,
      items: [
        shapeQ(
          "What is the pattern unit?",
          "own1",
          "Square, square, circle, triangle",
          ["Square, circle, triangle", "Square, square, circle"],
          "Square, square, circle, triangle, then it [repeats].",
        ),
        ruleQ([6, 12, 24, 48, 96], "×", 2, ["Add 6", "Add 12"]),
        {
          type: "mc",
          q: "4, 8, 10, 4, 8, 10: what is the pattern unit?",
          opts: ["4, 8, 10", "Add 4", "4, 8"],
          vis: { kind: "lines", rows: ["4, 8, 10, 4, 8, 10"] },
          x: "[4, 8, 10] repeats: a repeating pattern.",
        },
        shapeQ(
          "What is the rule?",
          "own4",
          "Add 2 circles each row",
          ["Add 1 circle each row", "Add 3 circles each row"],
          "1, 3, 5, 7 circles: [add 2].",
        ),
        shapeQ(
          "What is the rule?",
          "own5",
          "Add 4 squares each time",
          ["Add 2 squares each time", "Add 5 squares each time"],
          "1, 5, 9 squares: [add 4] (one more at the end of each arm).",
        ),
        ruleQ([12, 20, 28, 36, 44], "+", 8, ["Add 12", "Multiply by 2"]),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 145–148",
      t: "On My Own 7–11",
      en: "Extend the pattern",
      ic: "➡️",
      from: "Book p. 147–148 · On My Own 7–11",
      keep: true,
      items: [
        nextQ([36, 30, 24], "−", 6),
        shapeQ(
          "1, 3, 5 squares. How many squares in the next three shapes?",
          "own8",
          "7, 9, 11",
          ["6, 7, 8", "8, 11, 14"],
          "[Add 2] squares each time, one on each arm.",
        ),
        {
          type: "mc",
          q: "_, 4, 8, _, 32, _, 128: what are the missing numbers?",
          opts: ["2 … 16 … 64", "0 … 20 … 100", "2 … 12 … 80"],
          vis: { kind: "lines", rows: ["_, 4, 8, _, 32, _, 128"] },
          x: "Multiply by [2]: 2, 4, 8, 16, 32, 64, 128.",
        },
        shapeQ(
          "2, 5, 7 dots. How many dots in the next three shapes?",
          "own10",
          "10, 12, 15",
          ["9, 11, 13", "8, 10, 12"],
          // unverified: no key; read as rows of 2 and 3 dots added in turn
          "Rows of 2 and 3 dots are added in turn: 2, 2 + 3, 2 + 3 + 2, then [10], 12, 15.",
        ),
        shapeQ(
          "What is the 30th bead on the string?",
          "own11",
          "A square",
          ["A circle", "A triangle"],
          "The unit has 3 beads. 30 = 10 × 3, so the 30th bead ends a unit: a [square].",
        ),
        {
          type: "open",
          q: "Reflect: How can you tell whether a sequence of shapes or numbers follows a pattern?",
          img: "necklace-a",
          // unverified: a model answer, the book gives none
          a: "I look for a part that repeats (the pattern unit), or I check what changes from one to the next: if it is the same every time (add 4, multiply by 2), that is the pattern rule.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 41–42",
      t: "Additional Practice 1–10",
      en: "Lesson 5-4",
      ic: "📘",
      from: "Practice Book p. 41–42",
      keep: true,
      items: [
        nextQ([16, 24, 32, 40], "+", 8),
        nextQ([3, 6, 12, 24], "×", 2),
        nextQ([49, 42, 35, 28], "−", 7),
        nextQ([90, 75, 60, 45], "−", 15),
        shapeQ(
          "1, 4, 7, 10 squares. What is the rule?",
          "pb5",
          "Add 3 squares each row",
          ["Add 4 squares each row", "Multiply by 2"],
          "1, 4, 7, 10: [add 3].",
        ),
        ruleQ([22, 34, 46, 58], "+", 12, ["Add 10", "Add 22"]),
        shapeQ(
          "What is the pattern unit?",
          "pb7",
          "Circle, star, square, square, triangle",
          ["Circle, star, square", "Circle, star, square, triangle"],
          "Circle, star, square, square, triangle, then it [repeats].",
        ),
        ruleQ([5, 15, 45, 135], "×", 3, ["Add 10", "Add 30"]),
        nextQ([26, 39, 52], "+", 13),
        shapeQ(
          "5, 7, 9 squares. How many in the next three shapes?",
          "pb10",
          "11, 13, 15",
          ["10, 11, 12", "12, 15, 18"],
          "[Add 2] squares each time: one more on each leg.",
        ),
      ],
    },
  ],
};
