// Math · Grade 4 · Lesson 3-9 « Solve Multi-Step Problems Involving Addition and Subtraction » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 93–96, Student Practice Book p. 25–26. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Each problem is cut into steps (shared/math-kit.js step: the equation is shown, the answer worked out); the chain is checked at the end.
const { fmt, step, sumBar, value } = MathKit;

window.LESSON = {
  n: "3-9",
  key: "math4-l3-9",
  grade: 4,
  title: "More Problems in Steps",
  en: "Add and subtract in several steps: money, tickets, miles and weights",
  unit: "Unit 3 · Lesson 3-9",
  book: "Book p. 93–96 · Practice Book p. 25–26",
  imgDir: "img/lesson-3-9",
  cover: "learn-bar",
  question: {
    q: "How do I plan the [steps] of a problem?",
    a: "Ask what you need first. Money left: 268,495 − 129,390 = 139,105. Money needed: 86,200 + 63,750 = 149,950. Then compare: 149,950 − 139,105 = [10,845].",
    img: "learn-bar",
  },
  words: [
    { w: "Multi-step problem", m: "a problem you solve in two or more steps" },
    { w: "Account", m: "the money a group has in the bank" },
    { w: "Spend", m: "pay money: the money in the account goes down (−)" },
    { w: "Raise", m: "get money: the money in the account goes up (+)" },
    { w: "Strategy", m: "a way to solve a problem" },
  ],
  ideas: [
    {
      t: "What math do you see?",
      ic: "🌲",
      lines: [
        "Save My Forest had some money. They [spent] some on trails.",
        "They [need] money for the lake and for training.",
        "Spend → subtract. Need two things → add them.",
      ],
      vis: {
        kind: "lines",
        rows: ["had − spent = left", "lake + training = needed"],
      },
    },
    {
      t: "Step 1: money left",
      ic: "1️⃣",
      img: "learn-bar",
      lines: [
        "They had $268,495 and spent $129,390.",
        "m = 268,495 − 129,390",
        "m = [139,105]: $139,105 left.",
      ],
    },
    {
      t: "Step 2: money needed",
      ic: "2️⃣",
      lines: [
        "Lake $86,200 + training $63,750.",
        "86,200 + 63,750 = [149,950].",
        "They need $149,950.",
      ],
      vis: sumBar(
        [
          ["86,200", 86200],
          ["63,750", 63750],
        ],
        "?",
      ),
    },
    {
      t: "Step 3: how much more?",
      ic: "3️⃣",
      lines: [
        "They need 149,950 but have only 139,105.",
        "149,950 − 139,105 = [10,845].",
        "They need $10,845 more.",
      ],
      vis: { kind: "colshow", op: "-", a: 149950, b: 139105 },
    },
  ],

  games: [
    {
      k: "steps",
      t: "Step by step",
      en: "Money in and out",
      ic: "🪜",
      items: [
        step(
          "A club has $5,200. It spends $1,850. How much is left?",
          "5,200 − 1,850",
          "dollars",
        ),
        step(
          "Then it raises $2,300. How much now?",
          "3,350 + 2,300",
          "dollars",
        ),
        step(
          "A bike costs $640 and a helmet $85. How much for both?",
          "640 + 85",
          "dollars",
        ),
        step(
          "Sam has $900. How much is left after buying both?",
          "900 − 725",
          "dollars",
        ),
        step(
          "A trip is 1,500 miles. Day 1: 420 miles, day 2: 465 miles. How far in two days?",
          "420 + 465",
          "miles",
        ),
        step("How many miles are left?", "1,500 − 885", "miles"),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 93–96",
      t: "Be Curious",
      en: "What math do you see?",
      ic: "🌲",
      from: "Book p. 93 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "The Save My Forest group had some money. They spent some on new trails. They now need some money to clean the lake and some for training. What math do you see?",
          vis: {
            kind: "lines",
            rows: ["had − spent = left", "lake + training = needed"],
          },
          // unverified: no key for this lesson
          a: "Subtraction: the money they had minus the money spent on trails is the money left. Addition: the lake money plus the training money is the money needed. Then compare the two to see if they have enough.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 93–96",
      t: "Learn: Save My Forest",
      en: "Three steps",
      ic: "🌲",
      from: "Book p. 94 · Learn",
      keep: true,
      items: [
        step(
          "Step 1: they had $268,495 and spent $129,390 on trails. m = ?",
          "268,495 − 129,390",
          "dollars",
          { img: "learn-bar" },
        ),
        step(
          "Step 2: the lake costs $86,200 and training $63,750. How much in all?",
          "86,200 + 63,750",
          "dollars",
        ),
        step(
          "Step 3: they need $149,950 and have $139,105. How much more do they need?",
          "149,950 − 139,105",
          "dollars",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 93–96",
      t: "Work Together",
      en: "Save Forest Tigers",
      ic: "🐯",
      from: "Book p. 94 · Work Together",
      keep: true,
      items: [
        step(
          "The group had $90,357. They spent $74,240 on rescue. How much was left?",
          "90,357 − 74,240",
          "dollars",
        ),
        step(
          "They raised $41,500. How much then?",
          "16,117 + 41,500",
          "dollars",
        ),
        step(
          "They spent $19,450 on a campaign. How much is in their account?",
          "57,617 − 19,450",
          "dollars",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 93–96",
      t: "On My Own 1–4",
      en: "Problems in steps",
      ic: "🪜",
      from: "Book p. 95 · On My Own 1–4",
      keep: true,
      items: [
        step(
          "Michael's family drives 2,120 miles in four days: 517, 535 and 493 miles in the first three days. How many miles in three days?",
          "517 + 535 + 493",
          "miles",
        ),
        step("How many miles are left to drive?", "2,120 − 1,545", "miles"),
        step(
          "Cans: week 1 1,415, week 2 973. Week 3: 200 more than week 2. How many in week 3?",
          "973 + 200",
          "cans",
        ),
        step(
          "How many cans in the first three weeks?",
          "1,415 + 973 + 1,173",
          "cans",
        ),
        step(
          "After week 4 they had 4,542 cans. How many in week 4?",
          "4,542 − 3,561",
          "cans",
          {
            vis: sumBar(
              [
                ["1,415", 1415],
                ["973", 973],
                ["1,173", 1173],
                ["", "?"],
              ],
              4542,
            ),
          },
        ),
        step(
          "First game: 25,050 student and 30,975 general tickets. How many tickets?",
          "25,050 + 30,975",
          "tickets",
        ),
        step(
          "Next game: 27,365 student and 18,527 general tickets. How many?",
          "27,365 + 18,527",
          "tickets",
        ),
        step(
          "How many more tickets for the first game?",
          "56,025 − 45,892",
          "tickets",
        ),
        step(
          "5,789 tickets in advance, 512 on Friday, 928 on Sunday. How many?",
          "5,789 + 512 + 928",
          "tickets",
        ),
        step(
          "They sold 8,054 in all. How many at the door on Saturday?",
          "8,054 − 7,229",
          "tickets",
        ),
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 93–96",
      t: "On My Own 5–6",
      en: "The seal pup and the garden club",
      ic: "🦭",
      from: "Book p. 96 · On My Own 5–6",
      keep: true,
      items: [
        step(
          "A seal pup weighed 7,125 grams. It gained 3,238 grams, then 4,615 grams. How much does it weigh now?",
          "7,125 + 3,238 + 4,615",
          "grams",
        ),
        {
          type: "tf",
          q: "The seal must weigh at least 18,000 grams to go back to the ocean. It weighs 14,978 grams. Can it be released?",
          a: false,
          yes: ["Yes, it can", "No, not yet"],
          vis: { kind: "lines", rows: ["14,978 < 18,000"] },
          x: "14,978 is [less than] 18,000.",
        },
        step("How many more grams must it gain?", "18,000 − 14,978", "grams"),
        step(
          "A garden club wants land that costs $18,287. It has $15,185. How much more does it need?",
          "18,287 − 15,185",
          "dollars",
        ),
        {
          type: "mc",
          q: "The club collects $500 every month, starting in January. In which month can it buy the land?",
          opts: ["July", "June", "August"],
          keep: ["June", "July", "August"],
          vis: {
            kind: "lines",
            rows: ["$3,102 needed", "6 × $500 = $3,000", "7 × $500 = $3,500"],
          },
          // unverified: no key; January's dues are counted as the first month
          x: "6 months give $3,000: not enough. [7] months (January to July) give $3,500: enough.",
        },
        {
          type: "open",
          q: "Reflect: Choose a problem you solved. How could you solve it another way?",
          vis: {
            kind: "lines",
            rows: ["2,120 − 517 − 535 − 493", "2,120 − (517 + 535 + 493)"],
          },
          // unverified: a model answer, the book gives none
          a: "Michael's trip: I added the three days (1,545) and subtracted from 2,120. Another way: subtract each day from 2,120, one after the other: 2,120 − 517 − 535 − 493 = 575.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 25–26",
      t: "Additional Practice 1–4",
      en: "Lesson 3-9",
      ic: "📘",
      from: "Practice Book p. 25–26",
      keep: true,
      items: [
        step(
          "The association had $4,715 and collects $1,348 in dues. How much do they have?",
          "4,715 + 1,348",
          "dollars",
        ),
        {
          type: "tf",
          q: "The landscaping costs $5,215. They have $6,063. Do they have enough?",
          a: true,
          yes: ["Yes, enough", "No, not enough"],
          vis: { kind: "lines", rows: ["6,063 > 5,215"] },
          x: "$6,063 is more than $5,215: $848 is left.",
        },
        step(
          "2,736 tickets in advance and 3,835 on Friday. How many?",
          "2,736 + 3,835",
          "tickets",
        ),
        step(
          "They sold 10,922 in all. How many on Saturday?",
          "10,922 − 6,571",
          "tickets",
        ),
        step(
          "Pledges: $7,462 the first week, $5,890 the last week. How much in these two weeks?",
          "7,462 + 5,890",
          "dollars",
        ),
        step(
          "The total was $20,704. How much in the second week?",
          "20,704 − 13,352",
          "dollars",
        ),
        step(
          "Kayla's trip is 2,787 miles: 825 miles on days 1 and 2, 1,043 on day 3. How far in three days?",
          "825 + 1,043",
          "miles",
        ),
        step(
          "How many miles are left for the fourth day?",
          "2,787 − 1,868",
          "miles",
        ),
      ],
    },
  ],
};
// the steps use the answer of the step before: check the chain (a wrong number throws when the page loads)
[
  ["268,495 − 129,390", 139105],
  ["86,200 + 63,750", 149950],
  ["90,357 − 74,240", 16117],
  ["16,117 + 41,500", 57617],
  ["5,200 − 1,850", 3350],
  ["640 + 85", 725],
  ["420 + 465", 885],
  ["517 + 535 + 493", 1545],
  ["973 + 200", 1173],
  ["1,415 + 973 + 1,173", 3561],
  ["25,050 + 30,975", 56025],
  ["27,365 + 18,527", 45892],
  ["5,789 + 512 + 928", 7229],
  ["7,125 + 3,238 + 4,615", 14978],
  ["18,287 − 15,185", 3102],
  ["4,715 + 1,348", 6063],
  ["2,736 + 3,835", 6571],
  ["7,462 + 5,890", 13352],
  ["825 + 1,043", 1868],
].forEach(([e, v]) => {
  if (value(e) !== v) throw new Error(`lesson-3-9: ${e} is not ${v}`);
});
