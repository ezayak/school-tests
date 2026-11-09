// Math · Grade 4 · Lesson 3-3 « Understand an Addition Algorithm » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 69–72, Student Practice Book p. 13–14. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The sums are column sums (col, shared/math.js); partial sums come from shared/math-kit.js (partials).
const { fmt, col, partials } = MathKit;

window.LESSON = {
  n: "3-3",
  key: "math4-l3-3",
  grade: 4,
  title: "Add in Columns",
  en: "The addition algorithm: line up the places and add from the ones to the left",
  unit: "Unit 3 · Lesson 3-3",
  book: "Book p. 69–72 · Practice Book p. 13–14",
  imgDir: "img/lesson-3-3",
  cover: "curious",
  question: {
    q: "How does [place value] help me add with an [algorithm]?",
    a: "Write the numbers in columns: ones under ones, tens under tens. Add the [ones] first, then the tens, the hundreds … 2,654 + 1,243 = [3,897].",
    img: "kitten",
  },
  words: [
    {
      w: "Algorithm",
      m: "a set of steps that always works: add the ones, then the tens …",
    },
    { w: "Column", m: "the digits of one place, one under the other" },
    { w: "Align", m: "line up: ones under ones, tens under tens" },
    {
      w: "Partial sums",
      m: "add each place and write each part, then add the parts",
    },
    { w: "Sum", m: "the answer of an addition" },
  ],
  ideas: [
    {
      t: "How are they the same?",
      ic: "🗺️",
      img: "curious",
      lines: [
        "Two routes go to the [same place].",
        "One is short and straight, one has [turns].",
        "Like adding: different ways, the [same] answer.",
      ],
    },
    {
      t: "The kitten",
      ic: "🐱",
      img: "kitten",
      lines: [
        "In November the kitten weighed [2,654] grams.",
        "Now it is [1,243] grams more.",
        "2,654 + 1,243 = ?",
      ],
    },
    {
      t: "One way: partial sums",
      ic: "🧩",
      lines: [
        "Ones 4 + 3 = [7]. Tens 50 + 40 = [90].",
        "Hundreds 600 + 200 = [800]. Thousands 2,000 + 1,000 = [3,000].",
        "7 + 90 + 800 + 3,000 = [3,897].",
      ],
      vis: { kind: "lines", rows: ["7", "90", "800", "3,000", "3,897"] },
    },
    {
      t: "Another way: the algorithm",
      ic: "📐",
      lines: [
        "Line up the places. Start with the [ones]: 4 + 3 = 7.",
        "Tens 5 + 4 = 9, hundreds 6 + 2 = 8, thousands 2 + 1 = 3.",
        "One digit for each place: [3,897] grams.",
      ],
      vis: { kind: "colshow", op: "+", a: 2654, b: 1243 },
    },
    {
      t: "Line them up!",
      ic: "⚠️",
      lines: [
        "235 + 34: the 4 goes under the [5], the 3 under the 3.",
        "Mabel put 34 too far left and got 575: [wrong].",
        "Maderia lined up the places: 235 + 34 = [269].",
      ],
      vis: { kind: "colshow", op: "+", a: 235, b: 34 },
    },
  ],

  games: [
    {
      k: "col",
      t: "Add in columns",
      en: "Ones first",
      ic: "📐",
      items: [
        [3412, 2345],
        [6203, 1574],
        [25140, 3607],
        [4071, 5826],
        [51320, 26457],
        [8102, 795],
      ].map(([a, b]) => col(a, "+", b)),
    },
    {
      k: "partial",
      t: "Partial sums",
      en: "One place at a time",
      ic: "🧩",
      items: partials(4325, 2163),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 69–72",
      t: "Be Curious",
      en: "Two routes",
      ic: "🗺️",
      from: "Book p. 69 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Both routes start at the same place and end at the same place. The blue route is straight and short; the purple route has many turns and is longer.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 69–72",
      t: "Learn: the kitten",
      en: "2,654 + 1,243",
      ic: "🐱",
      from: "Book p. 70 · Learn",
      keep: true,
      items: [
        ...partials(2654, 1243),
        col(
          2654,
          "+",
          1243,
          "Now with the algorithm. The kitten weighed 2,654 grams and is now 1,243 grams heavier:",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 69–72",
      t: "Work Together",
      en: "Mabel and Maderia",
      ic: "🤝",
      from: "Book p. 70 · Work Together",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Mabel and Maderia added 235 + 34. Mabel got 575, Maderia got 269. Who added incorrectly?",
          opts: ["Mabel", "Maderia"],
          two: true,
          vis: { kind: "colshow", op: "+", a: 235, b: 34 },
          x: "Mabel did not [line up] the places: she added 340, not 34. 235 + 34 = 269.",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 69–72",
      t: "On My Own 1–6",
      en: "What is the sum?",
      ic: "➕",
      from: "Book p. 71 · On My Own 1–6",
      keep: true,
      items: [
        [4380, 612],
        [12943, 4036],
        [42818, 7120],
        [8405, 1571],
        [7364, 2321],
        [4129, 2530],
      ].map(([a, b]) => col(a, "+", b)),
    },
    {
      k: "own7",
      g: "📗 Book · p. 69–72",
      t: "On My Own 7–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 71–72 · On My Own 7–12",
      keep: true,
      items: [
        col(
          1217,
          "+",
          761,
          "A copier costs $1,217 and a laptop $761. How much for both?",
        ),
        col(
          64457,
          "+",
          3502,
          "A factory made 64,457 car parts in three weeks and 3,502 in the fourth week. How many in all?",
        ),
        ...partials(64203, 23562),
        {
          type: "num",
          q: "Two concerts had 9,698 people in all. The first concert had 4,467. How many came to the second concert?",
          pre: "4,467 + ? = 9,698 → ? =",
          a: 5231,
          vis: {
            kind: "bar",
            rows: [
              {
                l: "",
                segs: [
                  { t: "4,467", v: 1 },
                  { t: "?", q: true, v: 1 },
                ],
                brace: { t: "9,698" },
              },
            ],
          },
          x: "4,467 + [5,231] = 9,698. Think: what goes with 4,467 to make 9,698 in each place?",
        },
        col(
          1183,
          "+",
          815,
          "A ship traveled 1,183 miles and will travel 815 miles more. What is the total distance?",
        ),
        {
          type: "mc",
          q: "How did you know to add for the ship's total distance?",
          opts: [
            "Two parts make the whole trip",
            "The ship goes back",
            "One part is bigger",
          ],
          vis: {
            kind: "bar",
            rows: [
              {
                l: "",
                segs: [
                  { t: "1,183", v: 1183 },
                  { t: "815", v: 815, c: 1 },
                ],
                brace: { t: "?", q: true },
              },
            ],
          },
          x: "The [total] of two parts: add.",
        },
        ...partials(3616, 5372),
        col(3616, "+", 5372, "Now with the algorithm:"),
        {
          type: "mc",
          q: "How are partial sums and the algorithm alike and different?",
          opts: [
            "Both add place by place; the algorithm writes one digit for each place",
            "Only partial sums use place value",
            "They give different answers",
          ],
          vis: { kind: "colshow", op: "+", a: 3616, b: 5372 },
          x: "Both give [8,988]. Partial sums write 8, 80, 900, 8,000; the algorithm writes them in one line.",
        },
        {
          type: "open",
          q: "Reflect: How does place value help you add with an algorithm?",
          vis: { kind: "colshow", op: "+", a: 2654, b: 1243 },
          // unverified: a model answer, the book gives none
          a: "I line up the digits by place value: ones under ones, tens under tens. Then I add each column, starting with the ones.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 13–14",
      t: "Additional Practice 1–12",
      en: "Lesson 3-3",
      ic: "📘",
      from: "Practice Book p. 13–14",
      keep: true,
      items: [
        ...[
          [2365, 423],
          [5617, 372],
          [7408, 1211],
          [8371, 1522],
          [21396, 5401],
          [33544, 2135],
          [26496, 11502],
          [46837, 22141],
        ].map(([a, b]) => col(a, "+", b)),
        col(
          1124,
          "+",
          571,
          "A library donates 1,124 books and 571 movies. How many items?",
        ),
        col(
          2130,
          "+",
          742,
          "Olivia has 2,130 songs on her computer and 742 on her phone. How many in all?",
        ),
        col(
          12571,
          "+",
          14305,
          "A store makes $12,571 in January and $14,305 in February. How much in both months?",
        ),
        col(
          13421,
          "+",
          15364,
          "Natalya walks 13,421 steps on Monday and 15,364 on Tuesday. How many steps?",
        ),
        col(
          13537,
          "+",
          15412,
          "Otelia walks 13,537 steps on Monday and 15,412 on Tuesday. How many steps?",
        ),
        {
          type: "mc",
          q: "Natalya walks 28,785 steps, Otelia 28,949. Who walks more?",
          opts: ["Otelia", "Natalya"],
          two: true,
          vis: {
            kind: "digits",
            rows: [
              { n: 28785, hl: [2] },
              { n: 28949, hl: [2] },
            ],
          },
          x: "Hundreds: [9] > 7, so 28,949 > 28,785.",
        },
      ],
    },
  ],
};
