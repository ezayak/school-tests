// Math · Grade 4 · Lesson 6-8 « Solve Multi-Step Problems Involving Multiplication » (Reveal Math, Unit 6).
// Sources: Student Edition Vol. 1 p. 195–198, Student Practice Book p. 61–62. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Each problem is cut into steps (shared/math-kit.js step: the equation shown, the answer worked out); the chain is checked at the end.
const { step, value } = MathKit;

window.LESSON = {
  n: "6-8",
  key: "math4-l6-8",
  grade: 4,
  title: "Problems in Steps with ×",
  en: "Multiply for each part of the problem, then add or subtract to finish",
  unit: "Unit 6 · Lesson 6-8",
  book: "Book p. 195–198 · Practice Book p. 61–62",
  imgDir: "img/lesson-6-8",
  cover: "curious",
  question: {
    q: "How do I solve a word problem with [many steps] and multiplication?",
    a: "Find each cost first: 20 cans × $11 = $220, 18 brushes × $3 = $54. Then [add]: 220 + 54 = $274.",
    img: "mural",
  },
  words: [
    { w: "Multi-step problem", m: "a problem you solve in two or more steps" },
    { w: "Each", m: "for one: $11 each → multiply by how many" },
    { w: "Total", m: "everything together: add the parts" },
    { w: "Left", m: "what stays after you spend: subtract" },
  ],
  ideas: [
    {
      t: "What question could you ask?",
      ic: "🍿",
      img: "curious",
      lines: [
        "3 child tickets, 2 adult tickets, drinks and popcorn.",
        "A question: how much do the [tickets] cost?",
        "We need the price of each, then [× how many].",
      ],
    },
    {
      t: "Step 1 and step 2: multiply",
      ic: "🎨",
      img: "mural",
      lines: [
        "20 cans of paint at $11: 20 × 11 = [220].",
        "18 brushes at $3: 18 × 3 = [54].",
        "Each part is a multiplication.",
      ],
    },
    {
      t: "Step 3: put it together",
      ic: "➕",
      lines: [
        "Total cost: 220 + 54 = [274].",
        "Mr. Gomez spent $274.",
        "Money [left]? Subtract the cost from the money you have.",
      ],
      vis: {
        kind: "lines",
        rows: ["20 × 11 = 220", "18 × 3 = 54", "220 + 54 = 274"],
      },
    },
    {
      t: "Check the equation",
      ic: "⚠️",
      lines: [
        "7 boxes with 14 cards each: 7 × [14], not 7 × 9.",
        "Match each number to what it counts.",
        "Boxes × cards in a box = cards.",
      ],
      vis: { kind: "lines", rows: ["7 × 14 = 98 ✓", "7 × 9 ✗"] },
    },
  ],

  games: [
    {
      k: "steps",
      t: "Step by step",
      en: "Buy and pay",
      ic: "🪜",
      keep: true,
      items: [
        step("4 books at $12 each. How much?", "4 × 12", "dollars"),
        step("3 pens at $5 each. How much?", "3 × 5", "dollars"),
        step("Books and pens together?", "48 + 15", "dollars"),
        step("You have $100. How much is left?", "100 − 63", "dollars"),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 195–198",
      t: "Be Curious",
      en: "At the movies",
      ic: "🍿",
      from: "Book p. 195 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What question could you ask?",
          img: "curious",
          // unverified: no key for this lesson
          a: "How much do 3 child tickets and 2 adult tickets cost? How much more is an adult ticket than a child ticket? What is the cost of the tickets, the drinks and the popcorn together?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 195–198",
      t: "Learn: paint and brushes",
      en: "Three steps",
      ic: "🎨",
      from: "Book p. 196 · Learn",
      keep: true,
      items: [
        step(
          "Step 1: 20 cans of paint at $11 each. p = ?",
          "20 × 11",
          "dollars",
          { img: "mural", vis: undefined },
        ),
        step("Step 2: 18 brushes at $3 each. b = ?", "18 × 3", "dollars"),
        step("Step 3: the total cost.", "220 + 54", "dollars"),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 195–198",
      t: "Work Together",
      en: "Museum tickets",
      ic: "🤝",
      from: "Book p. 196 · Work Together",
      keep: true,
      items: [
        step("32 children at $6 each. How much?", "32 × 6", "dollars"),
        step("8 adults at $18 each. How much?", "8 × 18", "dollars"),
        step("What is the total cost?", "192 + 144", "dollars"),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 195–198",
      t: "On My Own 1–6",
      en: "The steps",
      ic: "🪜",
      from: "Book p. 197–198 · On My Own 1–6",
      keep: true,
      items: [
        step("6 adult movie tickets at $11. How much?", "6 × 11", "dollars"),
        step("13 children's tickets at $8. How much?", "13 × 8", "dollars"),
        step("The total cost of the tickets?", "66 + 104", "dollars"),
        step("15 notebooks at $3. How much?", "15 × 3", "dollars"),
        step(
          "12 packages of highlighters at $4. How much?",
          "12 × 4",
          "dollars",
        ),
        step("The total cost?", "45 + 48", "dollars"),
        step(
          "4 cases of raisins, 24 boxes in each. How many boxes?",
          "4 × 24",
          "boxes",
        ),
        step(
          "6 cases of cheese snacks, 18 bags in each. How many bags?",
          "6 × 18",
          "bags",
        ),
        step("How many snacks in all?", "96 + 108", "snacks"),
        step(
          "Barak buys 8 yards of velvet at $19 a yard. How much?",
          "8 × 19",
          "dollars",
        ),
        step("He had $200. How much is left?", "200 − 152", "dollars"),
        step("4 bags of beads at $18. How much?", "4 × 18", "dollars"),
        step("22 clasps at $3. How much?", "22 × 3", "dollars"),
        step("The total cost?", "72 + 66", "dollars"),
        step(
          "Leona sells 24 cups of lemonade at $3. How much money?",
          "24 × 3",
          "dollars",
        ),
        step(
          "She pays back her mother $25. How much does she have now?",
          "72 − 25",
          "dollars",
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 195–198",
      t: "On My Own 7–8",
      en: "Write and check",
      ic: "🧠",
      from: "Book p. 198 · On My Own 7–8",
      keep: true,
      items: [
        {
          type: "open",
          q: "Write a word problem for (11 × 2) + (15 × 5). Then solve it.",
          vis: { kind: "lines", rows: ["(11 × 2) + (15 × 5)"] },
          // unverified: a model answer; any problem is right
          a: "Ana buys 2 books at $11 each and 5 games at $15 each. How much does she spend? 22 + 75 = $97.",
        },
        {
          type: "tf",
          q: "Sona has 7 boxes of thank-you cards with 14 cards in each. Marnie writes c = 7 × 9 for the thank-you cards. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I don't"],
          vis: { kind: "lines", rows: ["7 boxes", "14 cards in each box"] },
          x: "9 is the number of get-well boxes. The thank-you cards are 7 × [14].",
        },
        step("Thank-you cards: 7 boxes of 14.", "7 × 14", "cards"),
        step("Get-well cards: 9 boxes of 18.", "9 × 18", "cards"),
        step("How many cards does Sona have?", "98 + 162", "cards"),
        {
          type: "open",
          q: "Reflect: How can you solve multi-step word problems with multiplication?",
          vis: {
            kind: "lines",
            rows: ["20 × 11 = 220", "18 × 3 = 54", "220 + 54 = 274"],
          },
          // unverified: a model answer, the book gives none
          a: "Find what each part costs or counts with a multiplication (how many × each). Then add the parts for a total, or subtract to find what is left.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 61–62",
      t: "Additional Practice 1–4",
      en: "Lesson 6-8",
      ic: "📘",
      from: "Practice Book p. 61–62",
      keep: true,
      items: [
        step("4 adults at $16. How much?", "4 × 16", "dollars"),
        step("6 children at $11. How much?", "6 × 11", "dollars"),
        step("The total cost?", "64 + 66", "dollars"),
        step(
          "20 boxes of veggie straws, 12 bags in each. How many bags?",
          "20 × 12",
          "bags",
        ),
        step(
          "18 boxes of crackers, 16 bags in each. How many bags?",
          "18 × 16",
          "bags",
        ),
        step("How many bags of snacks in all?", "240 + 288", "bags"),
        step(
          "Omar buys 9 yards of netting at $14. How much?",
          "9 × 14",
          "dollars",
        ),
        step("He had $150. How much is left?", "150 − 126", "dollars"),
        {
          type: "tf",
          q: "8 boxes of notebooks with 15 in each, 11 boxes of folders with 18 in each. Kelsey writes t = (8 × 11) + (15 × 18). Is she right?",
          a: false,
          yes: ["Yes, she is", "No, she is not"],
          vis: {
            kind: "lines",
            rows: ["8 boxes × 15 notebooks", "11 boxes × 18 folders"],
          },
          x: "Multiply the boxes by what is in them: t = (8 × 15) + (11 × 18).",
        },
        step("Notebooks: 8 boxes of 15.", "8 × 15", "notebooks"),
        step("Folders: 11 boxes of 18.", "11 × 18", "folders"),
        step("How many are left in all?", "120 + 198", ""),
      ],
    },
  ],
};
[
  ["20 × 11", 220],
  ["18 × 3", 54],
  ["32 × 6", 192],
  ["8 × 18", 144],
  ["6 × 11", 66],
  ["13 × 8", 104],
  ["15 × 3", 45],
  ["12 × 4", 48],
  ["4 × 24", 96],
  ["6 × 18", 108],
  ["8 × 19", 152],
  ["4 × 18", 72],
  ["22 × 3", 66],
  ["24 × 3", 72],
  ["7 × 14", 98],
  ["9 × 18", 162],
  ["4 × 16", 64],
  ["20 × 12", 240],
  ["18 × 16", 288],
  ["9 × 14", 126],
  ["8 × 15", 120],
  ["11 × 18", 198],
  ["4 × 12", 48],
  ["3 × 5", 15],
  ["48 + 15", 63],
].forEach(([e, v]) => {
  if (value(e) !== v) throw new Error(`lesson-6-8: ${e} is not ${v}`);
});
