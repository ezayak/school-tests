// Math · Grade 4 · Lesson 3-7 « Understand a Subtraction Algorithm Involving Regrouping » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 85–88, Student Practice Book p. 21–22, the teacher's key for p. 87–88 (Term 1/20261022-L_3-7.pdf, every answer matches).
// The Lesson 3-7 class sheet (20261022-L3-7.pdf) is on the Unit 3 page (add-subtract.js), not here. Log: grade-4/math/SOURCES.md.
// The differences are column subtractions (col, shared/math.js: tap a digit to cross it out and write the regrouped number above).
const { fmt, col } = MathKit;
// "8 tens 4 ones = 7 tens and ? ones"
const PL = ["ones", "tens", "hundreds", "thousands"];
const borrow = (big, small, j) => ({
  type: "num",
  q: `Regroup 1 of the ${PL[j + 1]} as 10 ${PL[j]}: ${big} ${PL[j + 1]} ${small} ${PL[j]} = ${big - 1} ${PL[j + 1]} and how many ${PL[j]}?`,
  pre: `${big - 1} ${PL[j + 1]} +`,
  post: PL[j],
  a: small + 10,
  vis: {
    kind: "lines",
    rows: [
      `${big} ${PL[j + 1]} ${small} ${PL[j]}`,
      `${big - 1} ${PL[j + 1]} ? ${PL[j]}`,
    ],
  },
  x: `${small} + 10 = [${small + 10}] ${PL[j]}.`,
});

window.LESSON = {
  n: "3-7",
  key: "math4-l3-7",
  grade: 4,
  title: "Subtract with Regrouping",
  en: "When the top digit is smaller, take 1 from the next place: 10 more in this place",
  unit: "Unit 3 · Lesson 3-7",
  book: "Book p. 85–88 · Practice Book p. 21–22",
  imgDir: "img/lesson-3-7",
  cover: "curious",
  question: {
    q: "What do I do when the top digit is [smaller] than the bottom digit?",
    a: "[Regroup]: take 1 from the next place on the left. 8 tens 4 ones = 7 tens 14 ones, and 14 − 5 = [9].",
    img: "tickets",
  },
  words: [
    {
      w: "Regroup",
      m: "change 1 of a place into 10 of the place on its right: 1 ten = 10 ones",
    },
    { w: "Difference", m: "the answer of a subtraction" },
    { w: "Fewer", m: "less: 2,475 fewer tickets → subtract" },
    {
      w: "Algorithm",
      m: "steps that always work: subtract the ones, then the tens …",
    },
  ],
  ideas: [
    {
      t: "Sticky notes",
      ic: "🗒️",
      img: "curious",
      lines: [
        "Packs of [1,000] sheets and pads of [100] sheets.",
        "1 pack of 1,000 = [10] pads of 100.",
        "That is regrouping: one big pack becomes 10 small ones.",
      ],
    },
    {
      t: "Step 1: regroup a ten",
      ic: "1️⃣",
      img: "tickets",
      lines: [
        "6,384 tickets − 2,475. Ones: 4 − 5? Too small!",
        "8 tens 4 ones = [7 tens 14 ones].",
        "14 − 5 = [9]. Tens: 7 − 7 = [0].",
      ],
    },
    {
      t: "Step 3: regroup a thousand",
      ic: "3️⃣",
      lines: [
        "Hundreds: 3 − 4? Too small!",
        "6 thousands 3 hundreds = [5 thousands 13 hundreds].",
        "13 − 4 = 9. Thousands: 5 − 2 = 3. Answer: [3,909].",
      ],
      vis: { kind: "colshow", op: "-", a: 6384, b: 2475 },
    },
    {
      t: "Don't take the small from the big",
      ic: "⚠️",
      lines: [
        "Setsuko did 54,392 − 38,576 = 24,224: in each column he took the [smaller] digit from the bigger one.",
        "That is wrong: regroup when the [top] digit is smaller.",
        "54,392 − 38,576 = [15,816].",
      ],
      vis: { kind: "colshow", op: "-", a: 54392, b: 38576 },
    },
  ],

  games: [
    {
      k: "borrow",
      t: "Regroup",
      en: "1 ten = 10 ones",
      ic: "🔄",
      items: [
        [8, 4, 0],
        [5, 2, 0],
        [3, 6, 1],
        [7, 0, 0],
        [6, 3, 2],
        [9, 1, 1],
      ].map(([b, s, j]) => borrow(b, s, j)),
    },
    {
      k: "col",
      t: "Subtract and regroup",
      en: "In columns",
      ic: "📐",
      items: [
        [5432, 1678],
        [8205, 3517],
        [62341, 28756],
        [7000, 2468],
        [40513, 17829],
        [9361, 4874],
      ].map(([a, b]) => col(a, "-", b)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 85–88",
      t: "Be Curious",
      en: "Sticky notes",
      ic: "🗒️",
      from: "Book p. 85 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "How are they the same? How are they different?",
          img: "curious",
          // unverified: p. 85 is not in the teacher's key
          a: "Both show packs of 1,000 sheets and pads of 100 sheets. The top has two packs of 1,000 and one pad of 100; the bottom has only one pack of 1,000 but many more pads of 100. One pack of 1,000 is the same as 10 pads of 100.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 85–88",
      t: "Learn: train tickets",
      en: "6,384 − 2,475",
      ic: "🚆",
      from: "Book p. 86 · Learn",
      keep: true,
      items: [
        borrow(8, 4, 0),
        borrow(6, 3, 2),
        col(
          6384,
          "-",
          2475,
          "6,384 tickets were sold on Wednesday. On Thursday, 2,475 fewer. How many on Thursday?",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 85–88",
      t: "Work Together",
      en: "Friday and Saturday",
      ic: "🤝",
      from: "Book p. 86 · Work Together",
      keep: true,
      items: [
        col(
          7025,
          "-",
          1249,
          "7,025 tickets on Friday. On Saturday, 1,249 fewer. How many on Saturday?",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 85–88",
      t: "On My Own 1–8",
      en: "What is the difference?",
      ic: "➖",
      from: "Book p. 87 · On My Own 1–8",
      keep: true,
      items: [
        [7570, 453],
        [33071, 2893],
        [12050, 7983],
        [4382, 633],
        [67821, 7954],
        [172005, 48273],
        [6805, 4782],
        [87034, 77245],
      ].map(([a, b]) => col(a, "-", b)),
    },
    {
      k: "own9",
      g: "📗 Book · p. 85–88",
      t: "On My Own 9–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 88 · On My Own 9–12",
      keep: true,
      items: [
        col(
          42215,
          "-",
          41384,
          "A league had 41,384 hits in the fall and 42,215 in the spring. How many more in the spring?",
        ),
        col(
          39105,
          "-",
          35698,
          "A truck cost $35,698. A second truck cost $39,105. How much more was the second truck?",
        ),
        {
          type: "tf",
          q: "Julio subtracted 22,723 − 12,644 and got 10,179. Do you agree?",
          a: false,
          yes: ["Yes, I agree", "No, I disagree"],
          vis: { kind: "lines", rows: ["22,723", "− 12,644", "10,179 ?"] },
          x: "He did not regroup the 7 hundreds as 6 hundreds and 10 tens. The difference is [10,079].",
        },
        col(22723, "-", 12644, "Now subtract 22,723 − 12,644 the right way:"),
        col(
          263498,
          "-",
          12498,
          "A game sold 263,498 copies in the first month and 12,498 fewer in the second month. How many in the second month?",
        ),
        col(
          251000,
          "-",
          120512,
          "The second month: 251,000. The third month: 120,512. What is the difference?",
        ),
        {
          type: "open",
          q: "Reflect: How is the subtraction algorithm with regrouping like the addition algorithm with regrouping? How is it different?",
          vis: { kind: "colshow", op: "-", a: 6384, b: 2475 },
          // unverified: the key says "answers may vary"
          a: "Both line up the places and start with the ones, and both regroup 10 of one place as 1 of the next. In addition I carry 1 to the left; in subtraction I take 1 from the left and get 10 more on the right.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 21–22",
      t: "Additional Practice 1–13",
      en: "Lesson 3-7",
      ic: "📘",
      from: "Practice Book p. 21–22",
      keep: true,
      items: [
        ...[
          [2461, 397],
          [3309, 1857],
          [7910, 4761],
          [18847, 6995],
          [20955, 18293],
          [26008, 14350],
          [31701, 19568],
          [43998, 25479],
          [61597, 24600],
          [80645, 32470],
        ].map(([a, b]) => col(a, "-", b)),
        col(
          2265,
          "-",
          1575,
          "Sonny has 2,265 cards. His organizer holds 1,575. How many cards will not fit?",
        ),
        col(
          7615,
          "-",
          3978,
          "Florence has 7,615 black and white photos and 3,978 color photos. How many more black and white?",
        ),
        {
          type: "mc",
          q: "Setsuko did 54,392 − 38,576 and got 24,224. What did he do wrong?",
          opts: [
            "He took the smaller digit from the bigger one instead of regrouping",
            "He forgot to line up the places",
            "Nothing: the answer is right",
          ],
          vis: { kind: "lines", rows: ["54,392", "− 38,576", "24,224 ?"] },
          x: "Ones: 2 − 6 needs regrouping (12 − 6 = 6), not 6 − 2. The answer is [15,816].",
        },
        col(54392, "-", 38576, "Now find the correct answer:"),
      ],
    },
  ],
};
