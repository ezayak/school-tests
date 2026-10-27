// Math · Grade 4 · Unit 4 « Multiplication as Comparison » (Reveal Math, book pages 103–128).
// Starts from the beginning: what multiplication is (equal groups, arrays, the times tables), then Lesson 4-1
// (times as many), its extra practice sheet and Homework 2 (part B).
// Drawings and question types (groups, array, cubes, bar, num, flower) come from shared/math.js.
window.LESSON = {
  n: 4,
  key: "math4-u4",
  grade: 4,
  title: "Multiplication",
  unit: "Unit 4",
  book: "Book pages 103–128",
  imgDir: "img",
  cover: "cover",
  question: {
    q: "What is [multiplication]? How can I [compare] with it?",
    a: "Multiplication is a fast way to add [equal groups]: 3 × 4 = 4 + 4 + 4 = 12. It also compares: 12 is [3 times as many] as 4.",
    img: "cover",
  },
  words: [
    { w: "Multiply (×)", m: "add equal groups fast. × is said “times”" },
    { w: "Equal groups", m: "groups with the same number in each one" },
    { w: "Factor", m: "a number you multiply: in 3 × 4, 3 and 4 are factors" },
    {
      w: "Product",
      m: "the answer of a multiplication: 3 × 4 = 12, 12 is the product",
    },
    { w: "Array", m: "things in rows and columns, every row the same" },
    {
      w: "Times as many",
      m: "compare by multiplying: 5 times as many as 2 is 5 × 2 = 10",
    },
    { w: "Equation", m: "a number sentence with =, like 5 × 6 = 30" },
  ],
  ideas: [
    {
      t: "Equal groups",
      ic: "🍎",
      lines: [
        "3 plates. [4 apples] on each plate.",
        "Every plate has the [same] number: they are [equal groups].",
        "Count by 4s: 4, 8, [12]. 3 groups of 4 = 12.",
      ],
      vis: {
        kind: "groups",
        n: 3,
        of: 4,
        e: "🍎",
        cap: "3 groups of 4 = [12]",
      },
    },
    {
      t: "Adding the same number",
      ic: "➕",
      lines: [
        "4 + 4 + 4 = 12: we add [4] three times.",
        "Multiplication is a [fast way] to do it: 3 × 4 = 12.",
        "Say it: “3 [times] 4 is 12”.",
      ],
      vis: {
        kind: "lines",
        rows: ["4 + 4 + 4 = 12", "3 × 4 = 12"],
        note: "3 times 4",
      },
    },
    {
      t: "The × sign",
      ic: "✖️",
      lines: [
        "[×] means “times” or “groups of”.",
        "3 × 4: [3 groups], [4] in each group.",
        "5 × 2: 5 groups of 2 = 2 + 2 + 2 + 2 + 2 = [10].",
      ],
      vis: { kind: "groups", n: 5, of: 2, e: "🧦", cap: "5 × 2 = [10]" },
    },
    {
      t: "Factors and product",
      ic: "🏷️",
      lines: [
        "The numbers we multiply are [factors].",
        "The answer is the [product].",
        "3 × 4 = 12: 3 and 4 are factors, [12] is the product.",
      ],
      vis: {
        kind: "lines",
        rows: ["3  ×  4  =  12", "factor × factor = product"],
      },
    },
    {
      t: "Arrays: rows and columns",
      ic: "⭐",
      lines: [
        "An [array]: things in rows, the same number in every row.",
        "3 rows, 5 stars in each row: [3 × 5 = 15].",
        "Count by 5s: 5, 10, 15.",
      ],
      vis: {
        kind: "array",
        r: 3,
        c: 5,
        e: "⭐",
        cap: "3 rows of 5 = 3 × 5 = [15]",
      },
    },
    {
      t: "Turn it around",
      ic: "🔄",
      lines: [
        "Turn the array: 5 rows of 3. Still [15] stars!",
        "3 × 5 = 5 × 3 = 15. The order does [not] change the product.",
        "Good trick: if you know 3 × 5, you know [5 × 3] too.",
      ],
      vis: { kind: "array", r: 5, c: 3, e: "⭐", cap: "5 × 3 = 3 × 5 = [15]" },
    },
    {
      t: "Skip counting = times tables",
      ic: "🦘",
      lines: [
        "× 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20",
        "× 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50",
        "× 10: 10, 20, 30 … just put a [0] at the end.",
      ],
      vis: {
        kind: "lines",
        rows: [
          "2, 4, 6, 8, 10 …",
          "5, 10, 15, 20, 25 …",
          "10, 20, 30, 40, 50 …",
        ],
      },
    },
    {
      t: "Easy tricks",
      ic: "🪄",
      lines: [
        "× 1: the same number (7 × 1 = 7). × 0: always [0].",
        "× 2: [double] it (2 × 8 = 8 + 8 = 16).",
        "× 4: double, then double again. × 9: 9 × 6 = 60 − 6 = [54].",
      ],
      vis: {
        kind: "lines",
        rows: ["7 × 1 = 7", "7 × 0 = 0", "2 × 8 = 8 + 8", "9 × 6 = 60 − 6"],
      },
    },
    {
      t: "Times as many",
      ic: "🧱",
      lines: [
        "Stick B has [3] cubes.",
        "Stick A has [4 times as many]: 4 sticks like B.",
        "4 × 3 = [12]. 12 is 4 times as many as 3.",
      ],
      vis: {
        kind: "cubes",
        rows: [
          { l: "Stick B", n: 3, c: 1 },
          { l: "Stick A", n: 3, times: 4, c: 0 },
        ],
        cap: "12 = 4 × 3",
      },
    },
    {
      t: "A schema for times as many",
      ic: "🧩",
      lines: [
        "The football team raises [$100].",
        "The chess club raises [5 times as much]: 5 bars of $100.",
        "5 × $100 = [$500].",
      ],
      vis: {
        kind: "bar",
        rows: [
          { l: "Football", e: "⚽", seg: { t: "$100" }, times: 1 },
          {
            l: "Chess",
            e: "♟️",
            seg: { t: "$100" },
            times: 5,
            brace: { t: "? = 5 × $100", q: true },
          },
        ],
      },
    },
    {
      t: "Read the equation two ways",
      ic: "👀",
      lines: [
        "5 × 6 = 30",
        "30 is [5 times as many] as 6.",
        "30 is also [6 times as many] as 5.",
      ],
      vis: { kind: "array", r: 5, c: 6, cap: "5 × 6 = 30" },
    },
    {
      t: "“More” or “times”?",
      ic: "⚠️",
      lines: [
        "7 [more] than 9: add. 9 + 7 = 16.",
        "7 [times as many] as 9: multiply. 7 × 9 = 63.",
        "Look for the word [times]!",
      ],
      vis: {
        kind: "bar",
        rows: [
          { l: "9", segs: [{ t: "9", v: 9 }] },
          {
            l: "7 more",
            segs: [
              { t: "9", v: 9 },
              { t: "+7", v: 7, c: 1 },
            ],
          },
          { l: "7 times", seg: { t: "9", v: 9 }, times: 7, c: 2 },
        ],
      },
    },
  ],

  games: [
    {
      k: "groups",
      t: "Groups and arrays",
      en: "Look, count, multiply",
      ic: "🍎",
      items: [
        {
          type: "num",
          q: "How many apples? 3 groups of 4.",
          pre: "3 × 4 =",
          a: 12,
          vis: { kind: "groups", n: 3, of: 4, e: "🍎", cap: "" },
        },
        {
          type: "num",
          q: "How many eggs? 2 groups of 6.",
          pre: "2 × 6 =",
          a: 12,
          vis: { kind: "groups", n: 2, of: 6, e: "🥚", cap: "" },
        },
        {
          type: "num",
          q: "How many balls? 5 groups of 3.",
          pre: "5 × 3 =",
          a: 15,
          vis: { kind: "groups", n: 5, of: 3, e: "⚽", cap: "" },
        },
        {
          type: "num",
          q: "How many stars? 4 rows of 5.",
          pre: "4 × 5 =",
          a: 20,
          vis: { kind: "array", r: 4, c: 5, e: "⭐", cap: "" },
        },
        {
          type: "num",
          q: "How many dots? 3 rows of 7.",
          pre: "3 × 7 =",
          a: 21,
          vis: { kind: "array", r: 3, c: 7, cap: "" },
        },
        {
          type: "num",
          q: "How many cookies? 6 rows of 4.",
          pre: "6 × 4 =",
          a: 24,
          vis: { kind: "array", r: 6, c: 4, e: "🍪", cap: "" },
        },
        {
          type: "mc",
          q: "Which multiplication is the same as 6 + 6 + 6 + 6?",
          opts: ["4 × 6", "6 × 6", "4 + 6"],
          vis: { kind: "groups", n: 4, of: 6, e: "🍓", cap: "" },
          x: "6 is added 4 times: 4 groups of 6 = 4 × 6 = 24.",
        },
        {
          type: "mc",
          q: "3 × 8 = 24. What is 8 × 3?",
          opts: ["24", "11", "38"],
          vis: { kind: "array", r: 3, c: 8, cap: "" },
          x: "Turn it around: the product stays the same.",
        },
      ],
    },
    {
      k: "fl1",
      t: "Flowers: × 2, × 5, × 10",
      en: "The easy tables",
      ic: "🌼",
      items: [
        { type: "flower", n: 2, c: "var(--ssa)" },
        { type: "flower", n: 5, c: "var(--cool)" },
        { type: "flower", n: 10, c: "var(--ke)" },
      ],
    },
    {
      k: "fl2",
      t: "Flowers: × 3, × 4",
      en: "Count by 3s and 4s",
      ic: "🌸",
      items: [
        { type: "flower", n: 3, c: "var(--good)" },
        { type: "flower", n: 4, c: "var(--heat)" },
      ],
    },
    {
      k: "fl3",
      t: "Flowers: × 6, × 7, × 8, × 9",
      en: "The hard tables",
      ic: "🌻",
      items: [
        { type: "flower", n: 6, c: "var(--sci)" },
        { type: "flower", n: 7, c: "var(--comp)" },
        { type: "flower", n: 8, c: "var(--pe)" },
        { type: "flower", n: 9, c: "var(--ssa)" },
      ],
    },
    {
      k: "facts",
      t: "Quick facts",
      en: "10 times-table questions",
      ic: "⚡",
      items: [
        [6, 7],
        [8, 4],
        [9, 3],
        [7, 7],
        [6, 8],
        [5, 9],
        [4, 6],
        [9, 8],
        [3, 7],
        [8, 8],
      ].map(([x, y]) => ({
        type: "num",
        q: `What is ${x} × ${y}?`,
        pre: `${x} × ${y} =`,
        a: x * y,
      })),
    },
    {
      k: "comp",
      t: "Times as many",
      en: "Cubes and schemas",
      ic: "🧱",
      items: [
        {
          type: "num",
          q: "Stick A has 3 times as many cubes as stick B. How many cubes in stick A?",
          pre: "3 × 4 =",
          a: 12,
          vis: {
            kind: "cubes",
            rows: [
              { l: "Stick B", n: 4, c: 1 },
              { l: "Stick A", n: 4, times: 3, c: 0 },
            ],
          },
        },
        {
          type: "num",
          q: "Patrick exercised 2 times as many hours as Molar. Molar exercised 6 hours. How many hours did Patrick exercise?",
          a: 12,
          post: "hours",
          vis: {
            kind: "bar",
            rows: [
              { l: "Molar", e: "🏃", seg: { t: "6" }, times: 1 },
              {
                l: "Patrick",
                e: "🏃‍♂️",
                seg: { t: "6" },
                times: 2,
                brace: { t: "?", q: true },
              },
            ],
          },
          x: "2 × 6 = 12",
        },
        {
          type: "num",
          q: "The smallest bottle weighs 8 pounds. The largest weighs 9 times as much. How much does the largest weigh?",
          a: 72,
          post: "pounds",
          vis: {
            kind: "bar",
            rows: [
              { l: "Small", e: "🧴", seg: { t: "8" }, times: 1 },
              {
                l: "Large",
                e: "🛢️",
                seg: { t: "8" },
                times: 9,
                brace: { t: "? = 9 × 8", q: true },
              },
            ],
          },
          x: "9 × 8 = 72",
        },
        {
          type: "num",
          q: "10 is how many times as much as 2?",
          pre: "10 is",
          post: "times as much as 2",
          a: 5,
          vis: {
            kind: "cubes",
            rows: [
              { l: "2", n: 2, c: 1 },
              { l: "10", n: 2, times: 5, c: 0 },
            ],
          },
          x: "5 × 2 = 10",
        },
        {
          type: "mc",
          q: "Sandy has $9. Her brother has 7 times as much money. Which equation shows how much he has?",
          opts: ["7 × 9 = ?", "7 + 9 = ?", "9 − 7 = ?"],
          vis: {
            kind: "bar",
            rows: [
              { l: "Sandy", e: "👧", seg: { t: "$9" }, times: 1 },
              {
                l: "Brother",
                e: "👦",
                seg: { t: "$9" },
                times: 7,
                brace: { t: "?", q: true },
              },
            ],
          },
          x: "“7 times as much” → multiply.",
        },
        {
          type: "mc",
          q: "Freddy watched 7 movies. Betty watched 7 MORE movies than Freddy. Which is right?",
          opts: ["7 + 7 = ?", "7 × 7 = ?"],
          two: true,
          emoji: "🎬",
          x: "“More than” → add. Only “times as many” is multiplication.",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "l41",
      t: "Lesson 4-1 · On My Own",
      en: "Book pages 107–108",
      ic: "📗",
      from: "Lesson 4-1",
      items: [
        {
          type: "mc",
          q: "Which statement can be shown by the equation 3 × 9 = 27?",
          opts: [
            "27 is 3 times as much as 9.",
            "3 is 3 times as much as 27.",
            "27 is 9 times as much as 9.",
            "3 is 9 times as much as 27.",
          ],
          vis: { kind: "lines", rows: ["3 × 9 = 27"] },
          x: "The product (27) is the big number: it is 3 times as much as 9 (and 9 times as much as 3).",
        },
        {
          type: "multi",
          q: "Which statements are true? Choose all that apply.",
          opts: [
            { t: "18 is 2 times as much as 9.", ok: true, emoji: "✅" },
            { t: "18 is 9 times as much as 2.", ok: true, emoji: "✅" },
            { t: "9 is 2 times as much as 18.", emoji: "🤔" },
            { t: "2 is 9 times as much as 18.", emoji: "🤔" },
            { t: "9 is 18 times as much as 2.", emoji: "🤔" },
          ],
          vis: { kind: "lines", rows: ["2 × 9 = 18"] },
        },
        {
          type: "num",
          q: "Complete: There are ___ times as many cubes in stick A as in stick B.",
          a: 3,
          pre: "",
          post: "times as many",
          vis: {
            kind: "cubes",
            rows: [
              { l: "Stick A", n: 4, times: 3, c: 0 },
              { l: "Stick B", n: 4, c: 1 },
            ],
          },
          x: "12 = 3 × 4",
        },
        {
          type: "num",
          q: "Stick 1 has 2 cubes. Stick 2 has 10 cubes. 10 is ___ times as much as 2.",
          pre: "10 is",
          post: "times as much as 2",
          a: 5,
          vis: {
            kind: "cubes",
            rows: [
              { l: "2 cubes", n: 2, c: 1 },
              { l: "10 cubes", n: 2, times: 5, c: 0 },
            ],
          },
          x: "10 = 5 × 2",
        },
        {
          type: "mc",
          q: "Which equation shows: 24 is 4 times as much as 6?",
          opts: ["24 = 4 × 6", "24 = 4 + 6", "6 = 4 × 24", "4 = 24 × 6"],
          vis: {
            kind: "bar",
            rows: [
              { l: "6", seg: { t: "6" }, times: 1 },
              { l: "24", seg: { t: "6" }, times: 4 },
            ],
          },
        },
        {
          type: "mc",
          q: "450 = 90 × 5. Sarah says: 450 is 90 times as much as 5. Mark says: 450 is 5 times as much as 90. Who is right?",
          opts: ["Both are right", "Only Sarah", "Only Mark"],
          emoji: "👧 👦",
          x: "Turn it around: 90 × 5 = 5 × 90. Both ways are true.",
        },
        {
          type: "num",
          q: "16 is 4 times as many as 4. Draw it in your head: how many bars of 4?",
          pre: "16 = ",
          post: "× 4",
          a: 4,
          vis: {
            kind: "bar",
            rows: [
              { l: "4", seg: { t: "4" }, times: 1 },
              { l: "16", seg: { t: "4" }, times: 4 },
            ],
          },
        },
        {
          type: "mc",
          q: "Which equation shows: 36 is 9 times as many as 4 and 4 times as many as 9?",
          opts: ["36 = 9 × 4", "36 = 9 + 4", "36 = 9 − 4"],
          emoji: "🧮",
          x: "36 = 9 × 4 or 36 = 4 × 9.",
        },
        {
          type: "num",
          q: "Aaron plants 4 tomato plants and 3 times as many pepper plants. How many pepper plants?",
          pre: "3 × 4 =",
          post: "pepper plants",
          a: 12,
          vis: {
            kind: "bar",
            rows: [
              { l: "Tomato", e: "🍅", seg: { t: "4" }, times: 1 },
              {
                l: "Pepper",
                e: "🫑",
                seg: { t: "4" },
                times: 3,
                brace: { t: "?", q: true },
              },
            ],
          },
        },
        {
          type: "num",
          q: "Aaron has 12 pepper plants and twice as many zucchini plants. How many zucchini plants?",
          pre: "2 × 12 =",
          post: "zucchini plants",
          a: 24,
          vis: {
            kind: "bar",
            rows: [
              { l: "Pepper", e: "🫑", seg: { t: "12" }, times: 1 },
              {
                l: "Zucchini",
                e: "🥒",
                seg: { t: "12" },
                times: 2,
                brace: { t: "?", q: true },
              },
            ],
          },
          x: "Twice = 2 times.",
        },
        {
          type: "num",
          q: "4 tomato + 12 pepper + 24 zucchini plants. How many plants in all?",
          pre: "4 + 12 + 24 =",
          a: 40,
          vis: {
            kind: "bar",
            rows: [
              {
                l: "All",
                e: "🌱",
                brace: { t: "? in all", q: true },
                segs: [
                  { t: "4", v: 4, c: 1 },
                  { t: "12", v: 12, c: 2 },
                  { t: "24", v: 24, c: 0 },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      k: "x41",
      t: "Extra practice 4-1",
      en: "School sheet",
      ic: "📝",
      from: "Extra Practice 4-1",
      items: [
        {
          type: "mc",
          q: "The chess club raises 5 times as much money as the football team. The football team raises $100. Which equation shows the chess club's money?",
          opts: [
            "5 × $100 = ?",
            "5 + $100 = ?",
            "$100 × ? = 5",
            "5 + ? = $100",
          ],
          vis: {
            kind: "bar",
            rows: [
              { l: "Football", e: "⚽", seg: { t: "$100" }, times: 1 },
              {
                l: "Chess",
                e: "♟️",
                seg: { t: "$100" },
                times: 5,
                brace: { t: "?", q: true },
              },
            ],
          },
        },
        {
          type: "num",
          q: "Patrick exercised 2 times as many hours as Molar last month. Molar exercised 6 hours. How many hours did Patrick exercise?",
          a: 12,
          post: "hours",
          vis: {
            kind: "bar",
            rows: [
              { l: "Molar", e: "🏃", seg: { t: "6" }, times: 1 },
              {
                l: "Patrick",
                e: "🏃‍♂️",
                seg: { t: "6" },
                times: 2,
                brace: { t: "?", q: true },
              },
            ],
          },
          x: "2 × 6 = 12 hours",
        },
        {
          type: "multi",
          q: "Which stories can be solved with 7 × 9 = ? Choose all that apply.",
          opts: [
            {
              t: "Sandy has $9. Her brother has 7 times as much money. How much does he have?",
              ok: true,
              emoji: "💵",
            },
            {
              t: "Stripeville Zoo has 7 times as many birds as Youngville Zoo. Youngville has 9 birds. How many at Stripeville?",
              ok: true,
              emoji: "🦜",
            },
            {
              t: "Freddy watched 7 movies. Betty watched 7 more. How many did Betty watch?",
              emoji: "🎬",
            },
            {
              t: "A tree is 7 feet tall. An older tree is 9 feet taller. How tall are both?",
              emoji: "🌳",
            },
          ],
          vis: { kind: "lines", rows: ["7 × 9 = ?"] },
        },
      ],
    },
    {
      k: "hw2",
      t: "Homework 2 · Part B",
      en: "27 October 2026",
      ic: "🏠",
      from: "Homework 2",
      items: [
        {
          type: "mc",
          q: "Which statement can be shown by the equation 5 × 6 = 30?",
          opts: [
            "30 is 5 times as much as 6",
            "5 is 3 times as much as 30",
            "6 is 30 times as much as 4",
            "5 is 5 times as much as 6",
          ],
          vis: { kind: "array", r: 5, c: 6, cap: "5 × 6 = 30" },
          x: "The product, 30, is the big one: 30 is 5 times as much as 6.",
        },
      ],
    },
  ],
};
