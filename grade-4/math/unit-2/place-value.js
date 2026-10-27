// Math · Grade 4 · Unit 2 « Generalize Place-Value Structure » (Reveal Math, book pages 31–56).
// Lessons 2-1 (the structure of big numbers), 2-2 (read and write), 2-3 (compare), 2-4 (round), the class sheets,
// Homework 1 and the Mid-term 1 extra practice (place-value part).
// Drawings: pv (place-value chart, hl = places from the right: 0 ones, 1 tens, 2 hundreds …), nline (number line) from shared/math.js.
window.LESSON = {
  n: 2,
  key: "math4-u2",
  grade: 4,
  title: "Place Value: Big Numbers",
  unit: "Unit 2",
  book: "Book pages 31–56",
  imgDir: "img",
  cover: "cover",
  question: {
    q: "How can I use [place value] to work with big numbers?",
    a: "Every digit has a [place]. The place tells its [value]: in 582,463 the 8 means [80,000]. Each place is [10 times] the place on its right.",
    img: "cover",
  },
  words: [
    { w: "Digit", m: "one of the signs 0 1 2 3 4 5 6 7 8 9" },
    { w: "Place value", m: "what a digit is worth because of its place" },
    { w: "Period", m: "a group of 3 places: ones, thousands, millions" },
    { w: "Standard form", m: "the number with digits: 582,463" },
    {
      w: "Word form",
      m: "the number in words: five hundred eighty-two thousand, …",
    },
    {
      w: "Expanded form",
      m: "the values added: 500,000 + 80,000 + 2,000 + 400 + 60 + 3",
    },
    { w: "Compare", m: "say which is greater (>) or less (<), or equal (=)" },
    { w: "Round", m: "change to a close, easy number: 532,187 ≈ 500,000" },
  ],
  ideas: [
    {
      t: "Places and periods",
      ic: "🏠",
      lines: [
        "Each digit lives in a [place]: ones, tens, hundreds …",
        "3 places make a [period]: Ones, Thousands, Millions.",
        "A [comma] goes between two periods: 4,582,019.",
      ],
      vis: { kind: "pv", n: 4582019 },
    },
    {
      t: "The value of a digit",
      ic: "💎",
      lines: [
        "The place tells what a digit is [worth].",
        "In 4,582,019 the 5 is in the [hundred thousands] place.",
        "Its value is [500,000].",
      ],
      vis: { kind: "pv", n: 4582019, hl: [5], val: true },
    },
    {
      t: "10 times bigger",
      ic: "🔟",
      lines: [
        "One place to the [left] = [10 times] more.",
        "534: the 5 is worth 500. 5,284: the 5 is worth 5,000.",
        "5,000 is [10 times] 500.",
      ],
      vis: {
        kind: "lines",
        rows: ["534 → 500", "5,284 → 5,000", "5,000 = 10 × 500"],
      },
    },
    {
      t: "Three ways to write a number",
      ic: "✍️",
      lines: [
        "[Standard form]: 582,463",
        "[Word form]: five hundred eighty-two thousand, four hundred sixty-three",
        "[Expanded form]: 500,000 + 80,000 + 2,000 + 400 + 60 + 3",
      ],
      vis: { kind: "pv", n: 582463 },
    },
    {
      t: "Zero keeps the place",
      ic: "0️⃣",
      lines: [
        "Nine hundred fifty-two thousand, [forty] = 952,040.",
        "No hundreds? Write [0]. No ones? Write [0].",
        "In expanded form we skip the 0s: 900,000 + 50,000 + 2,000 + 40.",
      ],
      vis: { kind: "pv", n: 952040 },
    },
    {
      t: "Compare: count the digits",
      ic: "⚖️",
      lines: [
        "806,121 has [6] digits. 86,302 has [5] digits.",
        "More digits = [greater] number.",
        "806,121 [>] 86,302",
      ],
      vis: { kind: "lines", rows: ["806,121", "  86,302", "806,121 > 86,302"] },
    },
    {
      t: "Compare: same number of digits",
      ic: "🔎",
      lines: [
        "Line them up. Start on the [left].",
        "Find the first place that is [different]: 643,290 and 643,209 → tens: [9 > 0].",
        "So 643,290 [>] 643,209. The open mouth eats the bigger one!",
      ],
      vis: {
        kind: "lines",
        rows: ["643,290", "643,209", "643,290 > 643,209 🐊"],
      },
    },
    {
      t: "Round with a number line",
      ic: "📏",
      lines: [
        "Round 334,404 to the nearest [thousand].",
        "It is between 334,000 and 335,000. Halfway is 334,500.",
        "334,404 is [closer] to 334,000.",
      ],
      vis: { kind: "nline", lo: 334000, hi: 335000, n: 334404 },
    },
    {
      t: "The rounding rule",
      ic: "🎯",
      lines: [
        "Look at the digit [on the right] of the rounding place.",
        "[5, 6, 7, 8, 9]: round up. [0, 1, 2, 3, 4]: stay.",
        "Then all the places on the right become [0]: 532,187 → 530,000 (ten thousands).",
      ],
      vis: {
        kind: "pv",
        n: 532187,
        hl: [4, 3],
        cap: "Ten thousands: look at the 2 → stay → 530,000",
      },
    },
  ],

  games: [
    {
      k: "value",
      t: "Value of a digit",
      en: "Look at the yellow digit",
      ic: "💎",
      items: [
        [854099, 4],
        [742954, 5],
        [4582019, 6],
        [378810, 3],
        [543984, 1],
        [9107483, 2],
      ].map(([n, j]) => {
        const d = String(n)[String(n).length - 1 - j];
        return {
          type: "num",
          q: `What is the value of the yellow ${d} in ${n.toLocaleString("en-US")}?`,
          a: d * 10 ** j,
          vis: { kind: "pv", n, hl: [j] },
        };
      }),
    },
    {
      k: "standard",
      t: "Words → number",
      en: "Write the standard form",
      ic: "✍️",
      items: [
        {
          type: "num",
          q: "Nine hundred fifty-two thousand, forty",
          a: 952040,
          emoji: "✍️",
        },
        {
          type: "num",
          q: "Two hundred five thousand, seven hundred eighty-two",
          a: 205782,
          emoji: "✍️",
        },
        {
          type: "num",
          q: "Seven thousand, five hundred three",
          a: 7503,
          emoji: "✍️",
        },
        {
          type: "num",
          q: "Seventy thousand, two hundred ninety-five",
          a: 70295,
          emoji: "✍️",
        },
        { type: "num", q: "70,000 + 4,000 + 900 + 6", a: 74906, emoji: "➕" },
        {
          type: "num",
          q: "500,000 + 80,000 + 2,000 + 400 + 60 + 3",
          a: 582463,
          emoji: "➕",
        },
      ],
    },
    {
      k: "compare",
      t: "Greater or less?",
      en: "< > =",
      ic: "🐊",
      items: [
        [806121, 86302],
        [643290, 643209],
        [90991, 90999],
        [66688, 66639],
        [3498075, 3098475],
        [47215, 47215],
      ].map(([a, b]) => {
        const s = a > b ? ">" : a < b ? "<" : "=";
        return {
          type: "mc",
          q: `${a.toLocaleString("en-US")} ___ ${b.toLocaleString("en-US")}`,
          opts: [s, ...["<", ">", "="].filter((x) => x !== s)],
          keep: ["<", "=", ">"],
          vis: {
            kind: "lines",
            rows: [a.toLocaleString("en-US"), b.toLocaleString("en-US")],
          },
          x:
            s === "="
              ? "Same digits in every place."
              : "Start on the left and find the first different digit.",
        };
      }),
    },
    {
      k: "round",
      t: "Round it",
      en: "Use the number line",
      ic: "🎯",
      items: [
        {
          type: "num",
          q: "Round 334,404 to the nearest thousand.",
          a: 334000,
          vis: { kind: "nline", lo: 334000, hi: 335000, n: 334404, hide: true },
        },
        {
          type: "num",
          q: "Round 84,253 to the nearest ten.",
          a: 84250,
          vis: { kind: "nline", lo: 84250, hi: 84260, n: 84253, hide: true },
        },
        {
          type: "num",
          q: "Round 98,376 to the nearest ten thousand.",
          a: 100000,
          vis: { kind: "nline", lo: 90000, hi: 100000, n: 98376, hide: true },
        },
        {
          type: "num",
          q: "Round 56,762 ants to the nearest thousand.",
          a: 57000,
          vis: { kind: "nline", lo: 56000, hi: 57000, n: 56762, hide: true },
        },
        {
          type: "num",
          q: "Round 543,986 to the nearest thousand.",
          a: 544000,
          vis: { kind: "nline", lo: 543000, hi: 544000, n: 543986, hide: true },
        },
        {
          type: "num",
          q: "Round 532,187 to the nearest hundred thousand.",
          a: 500000,
          vis: { kind: "nline", lo: 500000, hi: 600000, n: 532187, hide: true },
        },
      ],
    },
  ],

  exercises: [
    {
      k: "l21",
      t: "Lesson 2-1 · class sheet",
      en: "The structure of multi-digit numbers",
      ic: "🏠",
      from: "Lesson 2-1",
      items: [
        {
          type: "num",
          q: "The greatest number with the digits 9, 1, 2, 8 and 4 (each one once):",
          a: 98421,
          emoji: "9️⃣1️⃣2️⃣8️⃣4️⃣",
          x: "Biggest digit first: 9, 8, 4, 2, 1.",
        },
        {
          type: "num",
          q: "The least number with the digits 9, 1, 2, 8 and 4:",
          a: 12489,
          emoji: "9️⃣1️⃣2️⃣8️⃣4️⃣",
          x: "Smallest digit first: 1, 2, 4, 8, 9.",
        },
        {
          type: "num",
          q: "The greatest number with 2, 1, 0, 6 and 8:",
          a: 86210,
          emoji: "2️⃣1️⃣0️⃣6️⃣8️⃣",
        },
        {
          type: "num",
          q: "The least number with 2, 1, 0, 6 and 8 (0 can't be first):",
          a: 10268,
          emoji: "2️⃣1️⃣0️⃣6️⃣8️⃣",
          x: "1 first, then 0, then 2, 6, 8.",
        },
        {
          type: "num",
          q: "In 4,582,019, what is the value of the digit 4?",
          a: 4000000,
          vis: { kind: "pv", n: 4582019, hl: [6] },
        },
        {
          type: "num",
          q: "A blue whale weighs 378,810 pounds. What is the value of the 8 in the thousands place?",
          a: 8000,
          vis: { kind: "pv", n: 378810, hl: [3] },
        },
        {
          type: "mc",
          q: "378,810: the 8 in the thousands place and the 8 in the hundreds place. Which is right?",
          opts: [
            "8,000 is 10 times 800",
            "800 is 10 times 8,000",
            "They have the same value",
          ],
          vis: { kind: "pv", n: 378810, hl: [3, 2] },
        },
        {
          type: "mc",
          q: "The value of the 4 in 4,659 is ___ the value of the 4 in 9,468.",
          opts: ["10 times", "100 times", "the same as", "1,000 times"],
          vis: { kind: "lines", rows: ["4,659 → 4,000", "9,468 → 400"] },
        },
      ],
    },
    {
      k: "l22",
      t: "Lesson 2-2 · class sheet",
      en: "Read and write numbers to one million",
      ic: "✍️",
      from: "Lesson 2-2",
      items: [
        {
          type: "num",
          q: "Write in standard form: nine hundred fifty-two thousand, forty",
          a: 952040,
          emoji: "✍️",
        },
        {
          type: "num",
          q: "Write in standard form: two hundred five thousand, seven hundred eighty-two",
          a: 205782,
          emoji: "✍️",
        },
        {
          type: "mc",
          q: "717,029 in expanded form is:",
          opts: [
            "700,000 + 10,000 + 7,000 + 20 + 9",
            "700,000 + 17,000 + 29",
            "7,000 + 1,000 + 700 + 20 + 9",
          ],
          vis: { kind: "pv", n: 717029 },
        },
        {
          type: "mc",
          q: "120,564 in expanded form is:",
          opts: [
            "100,000 + 20,000 + 500 + 60 + 4",
            "100,000 + 20,000 + 5,000 + 60 + 4",
            "10,000 + 2,000 + 500 + 60 + 4",
          ],
          vis: { kind: "pv", n: 120564 },
        },
        {
          type: "mc",
          q: "Which is the word form of 733,452?",
          opts: [
            "Seven hundred thirty-three thousand, four hundred fifty-two",
            "Seventy-three thousand, four hundred fifty-two",
            "Seven hundred thirty-three thousand, five hundred forty-two",
          ],
          vis: { kind: "pv", n: 733452 },
        },
        {
          type: "mc",
          q: "A photo was viewed 582,463 times. Which is the word form?",
          opts: [
            "Five hundred eighty-two thousand, four hundred sixty-three",
            "Fifty-eight thousand, two hundred forty-six",
            "Five hundred eighty-two, four hundred sixty-three thousand",
          ],
          vis: { kind: "pv", n: 582463 },
        },
        {
          type: "mc",
          q: "The expanded form of 9,107,483 is:",
          opts: [
            "9,000,000 + 100,000 + 7,000 + 400 + 80 + 3",
            "9,000,000 + 100,000 + 70,000 + 400 + 80 + 3",
            "900,000 + 10,000 + 7,000 + 400 + 80 + 3",
          ],
          vis: { kind: "pv", n: 9107483 },
        },
      ],
    },
    {
      k: "l23",
      t: "Lesson 2-3 · class sheet",
      en: "Compare multi-digit numbers",
      ic: "⚖️",
      from: "Lesson 2-3",
      items: [
        {
          type: "mc",
          q: "806,121 ___ 86,302",
          opts: [">", "<", "="],
          keep: ["<", "=", ">"],
          vis: { kind: "lines", rows: ["806,121", "86,302"] },
        },
        {
          type: "mc",
          q: "643,290 ___ 643,209",
          opts: [">", "<", "="],
          keep: ["<", "=", ">"],
          vis: { kind: "lines", rows: ["643,290", "643,209"] },
        },
        {
          type: "multi",
          q: "Jasmine wrote 278,376. Which numbers are less than Jasmine's number? Choose all.",
          opts: [
            { t: "269,899", ok: true, emoji: "✅" },
            { t: "270,589", ok: true, emoji: "✅" },
            { t: "277,589", ok: true, emoji: "✅" },
            { t: "287,004", emoji: "❓" },
          ],
          vis: { kind: "lines", rows: ["278,376"] },
        },
        {
          type: "num",
          q: "Which number is smaller: 90,991 or 90,999?",
          a: 90991,
          vis: { kind: "lines", rows: ["90,991", "90,999"] },
        },
        {
          type: "num",
          q: "Which number is smaller: 66,688 or 66,639?",
          a: 66639,
          vis: { kind: "lines", rows: ["66,688", "66,639"] },
        },
        {
          type: "mc",
          q: "Arrange from greatest to least: 81,609 – 180,906 – 9,861 – 108,910 – 18,610",
          opts: [
            "180,906 – 108,910 – 81,609 – 18,610 – 9,861",
            "108,910 – 180,906 – 81,609 – 18,610 – 9,861",
            "9,861 – 18,610 – 81,609 – 108,910 – 180,906",
          ],
          emoji: "📊",
        },
        {
          type: "mc",
          q: "Arrange from greatest to least: 4,373 – 4,378 – 437 – 4,738 – 347",
          opts: [
            "4,738 – 4,378 – 4,373 – 437 – 347",
            "4,378 – 4,738 – 4,373 – 437 – 347",
            "347 – 437 – 4,373 – 4,378 – 4,738",
          ],
          emoji: "📊",
        },
        {
          type: "mc",
          q: "Smith circles 3,498,075. Alex circles 3,098,475. Which number is less?",
          opts: ["3,098,475", "3,498,075"],
          two: true,
          vis: { kind: "lines", rows: ["3,498,075", "3,098,475"] },
        },
      ],
    },
    {
      k: "l24",
      t: "Lesson 2-4 · class sheet",
      en: "Round multi-digit numbers",
      ic: "🎯",
      from: "Lesson 2-4",
      items: [
        {
          type: "num",
          q: "Round 532,187 to the nearest hundred thousand.",
          a: 500000,
          vis: { kind: "pv", n: 532187, hl: [5] },
        },
        {
          type: "num",
          q: "Round 532,187 to the nearest ten thousand.",
          a: 530000,
          vis: { kind: "pv", n: 532187, hl: [4] },
        },
        {
          type: "num",
          q: "Round 532,187 to the nearest hundred.",
          a: 532200,
          vis: { kind: "pv", n: 532187, hl: [2] },
        },
        {
          type: "num",
          q: "Round 334,404 to the nearest thousand.",
          a: 334000,
          vis: { kind: "nline", lo: 334000, hi: 335000, n: 334404, hide: true },
        },
        {
          type: "num",
          q: "Round 84,253 to the nearest ten.",
          a: 84250,
          vis: { kind: "nline", lo: 84250, hi: 84260, n: 84253, hide: true },
        },
        {
          type: "num",
          q: "Round 98,376 to the nearest ten thousand.",
          a: 100000,
          vis: { kind: "nline", lo: 90000, hi: 100000, n: 98376, hide: true },
        },
        ...[
          [771948, 800000, 770000, 772000, 771900],
          [237651, 200000, 240000, 238000, 237700],
          [432181, 400000, 430000, 432000, 432200],
          [567893, 600000, 570000, 568000, 567900],
        ].flatMap(([n, ...r]) =>
          ["hundred thousand", "ten thousand", "thousand", "hundred"].map(
            (p, k) => ({
              type: "num",
              q: `Round ${n.toLocaleString("en-US")} to the nearest ${p}.`,
              a: r[k],
              vis: { kind: "pv", n, hl: [5 - k] },
            }),
          ),
        ),
        {
          type: "num",
          q: "A colony has 56,762 ants. Round to the nearest thousand.",
          a: 57000,
          emoji: "🐜",
        },
      ],
    },
    {
      k: "hw1",
      t: "Homework 1",
      en: "Place value",
      ic: "🏠",
      from: "Homework 1",
      items: [
        {
          type: "mc",
          q: "The number 74,906 in expanded form is:",
          opts: [
            "70,000 + 4,000 + 900 + 6",
            "7,000 + 400 + 90 + 6",
            "7,000 + 40 + 90",
            "40,000 + 7,000 + 96",
          ],
          vis: { kind: "pv", n: 74906 },
        },
        {
          type: "num",
          q: "Seven thousand, five hundred three in standard form:",
          a: 7503,
          emoji: "✍️",
        },
        {
          type: "num",
          q: "The value of the yellow digit in 854,099:",
          a: 50000,
          vis: { kind: "pv", n: 854099, hl: [4] },
        },
        {
          type: "mc",
          q: "The value of the 4 in 4,659 is ___ the value of the 4 in 9,468.",
          opts: ["10 times", "100 times", "the same as", "1,000 times"],
          vis: { kind: "lines", rows: ["4,659 → 4,000", "9,468 → 400"] },
        },
      ],
    },
    {
      k: "mid1",
      t: "Mid-term 1 · extra practice",
      en: "Place-value questions",
      ic: "📝",
      from: "Exam Extra Practice",
      items: [
        {
          type: "mc",
          q: "The expanded form of 53,894 is:",
          opts: [
            "50,000 + 3,000 + 800 + 90 + 4",
            "50,000 + 30,000 + 800 + 90 + 4",
            "5,000 + 3,000 + 800 + 90 + 4",
          ],
          vis: { kind: "pv", n: 53894 },
        },
        {
          type: "mc",
          q: "The place of the yellow digit in 742,954:",
          opts: ["Ten thousands", "Hundred thousands", "Thousands"],
          vis: { kind: "pv", n: 742954, hl: [4] },
        },
        {
          type: "mc",
          q: "Which number is the least?",
          opts: ["9,999", "321,567", "52,875", "78,023"],
          emoji: "🔎",
          x: "It has the fewest digits.",
        },
        {
          type: "num",
          q: "Round 543,986 to the nearest thousand.",
          a: 544000,
          vis: { kind: "nline", lo: 543000, hi: 544000, n: 543986, hide: true },
        },
        {
          type: "mc",
          q: "70,295 in word form is:",
          opts: [
            "Seventy thousand, two hundred ninety-five",
            "Seven thousand, two hundred ninety-five",
            "70,000 + 200 + 90 + 5",
          ],
          vis: { kind: "pv", n: 70295 },
        },
        {
          type: "mc",
          q: "The place of the yellow 6 in 750,659:",
          opts: ["Hundreds", "Thousands", "Ten thousands"],
          vis: { kind: "pv", n: 750659, hl: [2] },
        },
        {
          type: "mc",
          q: "5,976,382 in word form is:",
          opts: [
            "Five million, nine hundred seventy-six thousand, three hundred eighty-two",
            "Five million, ninety-seven thousand, six hundred thirty-eight",
            "Five hundred ninety-seven thousand, six hundred thirty-eight",
          ],
          vis: { kind: "pv", n: 5976382 },
        },
        {
          type: "mc",
          q: "5,976,382 in expanded form is:",
          opts: [
            "5,000,000 + 900,000 + 70,000 + 6,000 + 300 + 80 + 2",
            "5,000,000 + 90,000 + 7,000 + 600 + 30 + 8 + 2",
            "500,000 + 90,000 + 7,000 + 6,000 + 300 + 80 + 2",
          ],
          vis: { kind: "pv", n: 5976382 },
        },
      ],
    },
  ],
};
