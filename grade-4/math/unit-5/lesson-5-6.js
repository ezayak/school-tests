// Math · Grade 4 · Lesson 5-6 « Analyze Features of a Pattern » (Reveal Math, Unit 5).
// Sources: Student Edition Vol. 1 p. 153–156, Student Practice Book p. 45–46. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Pictures cropped from the book (dot columns 8, 6, 8, 6, 8; rectangles 1 × 2, 2 × 3, 3 × 4; flags; telescopes 2, 4, 2, 4).
const { step } = MathKit;
const tf = (q, a, x, more = {}) => ({
  type: "tf",
  q,
  a,
  yes: ["True", "False"],
  x,
  ...more,
});
const lines = (...rows) => ({ kind: "lines", rows });

window.LESSON = {
  n: "5-6",
  key: "math4-l5-6",
  grade: 4,
  title: "Features of a Pattern",
  en: "Find what is true about a pattern beyond its rule: multiples, odd or even, what comes later",
  unit: "Unit 5 · Lesson 5-6",
  book: "Book p. 153–156 · Practice Book p. 45–46",
  imgDir: "img/lesson-5-6",
  cover: "curious",
  question: {
    q: "How can I find [features] of a pattern that the rule does not say?",
    a: "Make a table and look: 3, 6, 9, 12, 15 sticks are all [multiples of 3]. So a triangle with 34 sticks can never be in the pattern.",
    img: "triangles",
  },
  words: [
    { w: "Feature", m: "something that is true about every term of a pattern" },
    { w: "Pattern rule", m: "what to do each time: add 3" },
    { w: "Term", m: "one number or shape of the pattern" },
    { w: "Multiple", m: "a number times 1, 2, 3 …: 3, 6, 9, 12" },
    {
      w: "Even / odd",
      m: "even ends in 0, 2, 4, 6, 8; odd ends in 1, 3, 5, 7, 9",
    },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🔢",
      img: "curious",
      lines: [
        "24, 30, 36, 42, 48 and 13, 19, 25, 31, 37: both [add 6].",
        "The top numbers are all [even], multiples of 6.",
        "The bottom numbers are all [odd].",
      ],
    },
    {
      t: "Triangles of sticks",
      ic: "🔺",
      img: "triangles",
      lines: [
        "3, 6, 9, 12, 15 sticks: [3 more] each time.",
        "Every number is a [multiple of 3].",
        "34 is not a multiple of 3: no triangle has [34] sticks.",
      ],
    },
    {
      t: "A repeating pattern",
      ic: "🚩",
      img: "flags",
      lines: [
        "Flags: orange, blue, orange, green, then again.",
        "The unit has [4] flags. 47 = 4 × 11 + 3.",
        "The 47th flag is the 3rd of a unit: [orange].",
      ],
    },
    {
      t: "Odd and even places",
      ic: "🔭",
      img: "telescopes",
      lines: [
        "Posts 1, 3, 5 … have [2] telescopes.",
        "Posts 2, 4, 6 … have [4] telescopes.",
        "Post 18 is even: 4 telescopes.",
      ],
    },
  ],

  games: [
    {
      k: "feature",
      t: "True or false?",
      en: "Features of patterns",
      ic: "🔍",
      items: [
        tf(
          "5, 10, 15, 20, 25: all terms are multiples of 5.",
          true,
          "Add 5 starting at 5: [multiples of 5].",
          { vis: lines("5, 10, 15, 20, 25") },
        ),
        tf(
          "5, 10, 15, 20, 25: all terms are odd.",
          false,
          "10 and 20 are [even].",
          { vis: lines("5, 10, 15, 20, 25") },
        ),
        tf(
          "2, 6, 10, 14, 18: all terms are even.",
          true,
          "Even + 4 is always [even].",
          { vis: lines("2, 6, 10, 14, 18") },
        ),
        tf(
          "2, 6, 10, 14, 18: 40 can be a term.",
          false,
          "The terms are 2, 6, 10 … 38, 42: [40] is not one of them.",
          { vis: lines("2, 6, 10, 14, 18 …") },
        ),
        tf(
          "7, 14, 21, 28: all terms are multiples of 7.",
          true,
          "Add 7 starting at 7: [multiples of 7].",
          { vis: lines("7, 14, 21, 28") },
        ),
        tf(
          "3, 9, 27, 81: all terms are odd.",
          true,
          "Odd × 3 is always [odd].",
          { vis: lines("3, 9, 27, 81") },
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 153–156",
      t: "Be Curious",
      en: "Two rows of numbers",
      ic: "🔢",
      from: "Book p. 153 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Same: both add 6 each time. Different: the top numbers are even (multiples of 6); the bottom numbers are odd.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 153–156",
      t: "Learn: triangles of sticks",
      en: "Will he use 34 sticks?",
      ic: "🔺",
      from: "Book p. 154 · Learn",
      keep: true,
      items: [
        {
          type: "num",
          q: "3, 6, 9, 12 … sticks. How many sticks in the 5th triangle?",
          a: 15,
          post: "sticks",
          img: "triangles",
          x: "12 + 3 = [15]",
        },
        tf(
          "Will Charlie ever use exactly 34 sticks for a triangle?",
          false,
          "The numbers of sticks are [multiples of 3]. 34 is not (33 = 11 × 3, 36 = 12 × 3).",
          { yes: ["Yes", "No"], img: "triangles" },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 153–156",
      t: "Work Together",
      en: "The 47th flag",
      ic: "🚩",
      from: "Book p. 154 · Work Together",
      keep: true,
      items: [
        {
          type: "mc",
          q: "The flags repeat: orange, blue, orange, green. What is the 47th flag?",
          opts: ["Orange zigzag", "Blue stripes", "Green dots"],
          keep: ["Orange zigzag", "Blue stripes", "Green dots"],
          icons: ["🟧", "🟦", "🟩"],
          img: "flags",
          x: "4 flags in a unit. 44 = 11 × 4 ends a unit; 45 orange, 46 blue, [47 orange].",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 153–156",
      t: "On My Own 1–3",
      en: "True or false?",
      ic: "✅",
      from: "Book p. 155 · On My Own 1–3",
      keep: true,
      items: [
        tf(
          "Start with 4, multiply by 2: all terms are multiples of 4.",
          true,
          "4, 8, 16, 32 …: all [multiples of 4].",
          { vis: lines("4, 8, 16, 32, 64") },
        ),
        tf(
          "All terms are multiples of 2.",
          true,
          "4, 8, 16, 32 are all [even].",
          { vis: lines("4, 8, 16, 32, 64") },
        ),
        tf(
          "All terms are even numbers.",
          true,
          "× 2 always gives an [even] number.",
          { vis: lines("4, 8, 16, 32, 64") },
        ),
        tf(
          "The 16th column will have 8 dots.",
          false,
          "Columns 1, 3, 5 … have 8 dots, columns 2, 4, 6 … have 6. 16 is even: [6] dots.",
          { img: "own2" },
        ),
        tf(
          "The number of dots in every column is a multiple of 2.",
          true,
          "8 and 6 are both [even].",
          { img: "own2" },
        ),
        tf(
          "The number of dots grows in each term.",
          false,
          "8, 6, 8, 6, 8: it [goes up and down].",
          { img: "own2" },
        ),
        tf(
          "All side lengths are multiples of 2.",
          false,
          "The sides are 1 and 2, 2 and 3, 3 and 4: [1 and 3] are odd.",
          { img: "own3" },
        ),
        tf("Each term grows by 1 row.", true, "1 row, 2 rows, [3 rows].", {
          img: "own3",
        }),
        tf(
          "The perimeter of each term is a multiple of 2.",
          true,
          "Perimeters 6, 10, 14: all [even].",
          { img: "own3" },
        ),
      ],
    },
    {
      k: "own4",
      g: "📗 Book · p. 153–156",
      t: "On My Own 4–6",
      en: "18, 24, 30, 36, 42",
      ic: "🔢",
      from: "Book p. 155–156 · On My Own 4–6",
      keep: true,
      items: [
        {
          type: "mc",
          q: "18, 24, 30, 36, 42, … What is the pattern rule?",
          opts: ["Add 6", "Add 18", "Multiply by 2"],
          vis: lines("18, 24, 30, 36, 42"),
          x: "18 + 6 = 24: [add 6].",
        },
        {
          type: "mc",
          q: "What is a feature that the rule does not say?",
          opts: [
            "All the terms are multiples of 6",
            "All the terms are odd",
            "All the terms end in 2",
          ],
          vis: lines("18, 24, 30, 36, 42"),
          x: "It starts at 18 = 3 × 6 and adds 6, so every term is a [multiple of 6] (and even).",
        },
        tf(
          "Can 72 be part of the pattern?",
          true,
          "72 = 12 × 6 and it is greater than 18: 42, 48, 54, 60, 66, [72].",
          { yes: ["Yes", "No"], vis: lines("18, 24, 30, 36, 42 …") },
        ),
      ],
    },
    {
      k: "own7",
      g: "📗 Book · p. 153–156",
      t: "On My Own 7–8",
      en: "Telescopes and squares",
      ic: "🔭",
      from: "Book p. 156 · On My Own 7–8",
      keep: true,
      items: [
        {
          type: "mc",
          q: "What is Haley's pattern rule for the telescopes?",
          opts: [
            "2 telescopes, then 4, again and again",
            "Add 2 telescopes at each post",
            "4 telescopes at every post",
          ],
          img: "telescopes",
          x: "2, 4, 2, 4: a [repeating] pattern.",
        },
        {
          type: "mc",
          q: "What is a feature the rule does not say?",
          opts: [
            "Odd posts have 2, even posts have 4",
            "Every post has an odd number",
            "The posts get bigger and bigger",
          ],
          img: "telescopes",
          x: "Posts 1, 3 → 2 telescopes; posts 2, 4 → 4 telescopes. Every post has an [even] number.",
        },
        {
          type: "num",
          q: "How many telescopes will be at the 18th post?",
          a: 4,
          post: "telescopes",
          img: "telescopes",
          x: "18 is even, so [4] telescopes.",
        },
        step(
          "Stacy's first square has 2-inch sides; each new square has sides 1 inch longer. The 9th square has 10-inch sides. What is its area?",
          "10 × 10",
          "square inches",
          {
            vis: lines("2, 3, 4, 5, 6, 7, 8, 9, 10 inches"),
          },
        ),
        {
          type: "open",
          q: "Reflect: How can you analyze a pattern to find its features?",
          img: "triangles",
          // unverified: a model answer, the book gives none
          a: "Make a table of the terms and look at them: are they all even or odd, multiples of a number, does something repeat at odd or even places?",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 45–46",
      t: "Additional Practice 1–5",
      en: "Lesson 5-6",
      ic: "📘",
      from: "Practice Book p. 45–46",
      keep: true,
      items: [
        tf(
          "Start with 5, multiply by 3: all terms are multiples of 5.",
          true,
          "5, 15, 45, 135: all [multiples of 5].",
          { vis: lines("5, 15, 45, 135") },
        ),
        tf(
          "All terms are multiples of 3.",
          false,
          "[5] is not a multiple of 3.",
          { vis: lines("5, 15, 45, 135") },
        ),
        tf(
          "All terms are even numbers.",
          false,
          "5 × 3 = 15: odd × 3 is always [odd].",
          { vis: lines("5, 15, 45, 135") },
        ),
        tf("Each row grows by 1.", true, "Rows of 1, 2, [3] dots.", {
          img: "pb2",
        }),
        tf(
          "The circles always add up to an odd number.",
          false,
          "1, 3, [6]: 6 is even.",
          { img: "pb2" },
        ),
        // unverified: "the rows alternate from odd to even" read as rows of 1, 2, 3 dots
        tf(
          "The rows alternate from odd to even.",
          true,
          "Rows of 1 (odd), 2 (even), [3] (odd) dots.",
          { img: "pb2" },
        ),
        {
          type: "mc",
          q: "24, 36, 48, 60, 72, … What is the pattern rule?",
          opts: ["Add 12", "Add 24", "Multiply by 2"],
          vis: lines("24, 36, 48, 60, 72"),
          x: "24 + 12 = 36: [add 12].",
        },
        {
          type: "mc",
          q: "What is a feature that the rule does not say?",
          opts: [
            "All the terms are multiples of 12",
            "All the terms are odd",
            "All the terms end in 4",
          ],
          vis: lines("24, 36, 48, 60, 72"),
          x: "It starts at 24 = 2 × 12 and adds 12, so every term is a [multiple of 12].",
        },
        step(
          "Zoe's first square has 3-inch sides; each new one is 2 inches longer: 3, 5, 7, 9. What is the area of the 4th square?",
          "9 × 9",
          "square inches",
        ),
      ],
    },
  ],
};
