// Math · Grade 4 · Lesson 3-5 « Strategies to Subtract Multi-Digit Numbers » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 77–80, Student Practice Book p. 17–18. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Decomposing and adjusting come from shared/math-kit.js (decompQ, adjustSub); the differences are worked out there.
const { fmt, col, decompQ, adjustSub } = MathKit;

window.LESSON = {
  n: "3-5",
  key: "math4-l3-5",
  grade: 4,
  title: "Ways to Subtract Big Numbers",
  en: "Subtract by breaking a number into parts, or by adjusting both numbers",
  unit: "Unit 3 · Lesson 3-5",
  book: "Book p. 77–80 · Practice Book p. 17–18",
  imgDir: "img/lesson-3-5",
  cover: "curious",
  question: {
    q: "What [strategies] can I use to subtract big numbers?",
    a: "[Decompose]: take away 6,298 in parts: − 6,000 − 200 − 90 − 8. Or [adjust]: add 2 to both: 9,858 − 6,300 = [3,558].",
    img: "mayor",
  },
  words: [
    { w: "Subtract", m: "take away: 9,856 − 6,298 = 3,558" },
    { w: "Difference", m: "the answer of a subtraction" },
    {
      w: "Decompose",
      m: "break a number into parts: 6,298 = 6,000 + 200 + 90 + 8",
    },
    {
      w: "Adjust",
      m: "add the same to both numbers: the difference stays the same",
    },
    {
      w: "How many more",
      m: "a question for subtraction: the bigger number − the smaller one",
    },
  ],
  ideas: [
    {
      t: "Voting results",
      ic: "🗳️",
      img: "curious",
      lines: [
        "Four people got votes: 9,856 · 6,298 · 3,588 · 1,151.",
        "Who got the most? How many [more] than the others?",
        "To find how many more, we [subtract].",
      ],
    },
    {
      t: "One way: decompose",
      ic: "🧩",
      img: "mayor",
      lines: [
        "9,856 people voted. The mayor got 6,298. The other one?",
        "Break 6,298 into 6,000 + 200 + 90 + 8.",
        "9,856 − 6,000 − 200 − 90 − 8 = [3,558].",
      ],
    },
    {
      t: "Take away the parts",
      ic: "➖",
      lines: [
        "9,856 − 6,000 = 3,856",
        "3,856 − 200 = 3,656 · 3,656 − 90 = 3,566",
        "3,566 − 8 = [3,558]",
      ],
      vis: {
        kind: "lines",
        rows: [
          "9,856 − 6,000 = 3,856",
          "3,856 − 200 = 3,656",
          "3,656 − 90 = 3,566",
          "3,566 − 8 = 3,558",
        ],
      },
    },
    {
      t: "Another way: adjust",
      ic: "🔧",
      lines: [
        "6,298 is close to 6,300: add [2].",
        "Add 2 to the other number too: 9,858.",
        "9,858 − 6,300 = [3,558]. The same answer!",
      ],
      vis: {
        kind: "lines",
        rows: [
          "9,856 + 2 → 9,858",
          "6,298 + 2 → 6,300",
          "9,858 − 6,300 = 3,558",
        ],
      },
    },
    {
      t: "Adjust both the same way",
      ic: "⚠️",
      lines: [
        "In subtraction, add (or take) the [same] number to [both].",
        "Rafael did +2 and −2: 9,800 − 6,096. [Wrong!]",
        "Sadia did +2 and +2: 9,800 − 6,100 = [3,700]. Right!",
      ],
      vis: {
        kind: "lines",
        rows: [
          "9,798 + 2 → 9,800",
          "6,098 + 2 → 6,100",
          "9,800 − 6,100 = 3,700",
        ],
      },
    },
  ],

  games: [
    {
      k: "decomp",
      t: "Take away in parts",
      en: "Decompose",
      ic: "🧩",
      items: [
        [7845, 3421],
        [9638, 5214],
        [6579, 2346],
        [8977, 4752],
      ].map(([a, b]) => decompQ(a, b)),
    },
    {
      k: "adjust",
      t: "Make it round",
      en: "Adjust both numbers",
      ic: "🔧",
      items: [
        [7425, 2998],
        [5310, 1997],
        [8642, 3405],
        [6104, 2899],
        [9050, 4996],
        [7333, 4102],
      ].map(([a, b]) => adjustSub(a, b)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 77–80",
      t: "Be Curious",
      en: "Voting results",
      ic: "🗳️",
      from: "Book p. 77 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What do you notice? What do you wonder?",
          img: "curious",
          // unverified: no key for this lesson
          a: "Four people got votes; two have a check mark (9,856 and 6,298). I wonder who won, and how many more votes the winner got than the others.",
        },
        col(
          9856,
          "-",
          6298,
          "How many more votes did the first person get than the second?",
        ),
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 77–80",
      t: "Learn: the election",
      en: "9,856 − 6,298",
      ic: "🗳️",
      from: "Book p. 78 · Learn",
      keep: true,
      items: [
        decompQ(
          9856,
          6298,
          "9,856 people voted. The new mayor got 6,298 votes. How many votes did the other candidate get? Decompose 6,298.",
          { img: "mayor" },
        ),
        adjustSub(9856, 6298, 2, "Now adjust: add the same number to both."),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 77–80",
      t: "Work Together",
      en: "A county election",
      ic: "🤝",
      from: "Book p. 78 · Work Together",
      keep: true,
      items: [
        col(
          286787,
          "-",
          72455,
          "286,787 people voted. The winner got 72,455 votes. How many votes did the other candidates get?",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 77–80",
      t: "On My Own 1–8",
      en: "Decompose or adjust",
      ic: "➖",
      from: "Book p. 79 · On My Own 1–8",
      keep: true,
      items: [
        ...[
          [2532, 1301],
          [6489, 2472],
          [8018, 7659],
          [11023, 1414],
        ].map(([a, b]) => decompQ(a, b)),
        ...[
          [12469, 10212],
          [97137, 24677],
          [46597, 4267],
          [84649, 126],
        ].map(([a, b]) => adjustSub(a, b)),
      ],
    },
    {
      k: "own9",
      g: "📗 Book · p. 77–80",
      t: "On My Own 9–12",
      en: "Problems",
      ic: "🧠",
      from: "Book p. 79–80 · On My Own 9–12",
      keep: true,
      items: [
        col(
          14299,
          "-",
          13039,
          "A restaurant served 14,299 meals in January and 13,039 in February. How many more in January?",
        ),
        col(
          3568,
          "-",
          2984,
          "3,568 tickets were sold the first night and 2,984 the second night. How many more on the first night?",
        ),
        decompQ(15736, 10302, "15,736 − 10,302: first decompose 10,302."),
        adjustSub(15736, 10302, 2, "15,736 − 10,302: now adjust both numbers."),
        {
          type: "mc",
          q: "How are decomposing and adjusting alike? How are they different?",
          opts: [
            "Both give 5,434; one takes away parts, the other makes a round number",
            "They give different answers",
            "Only adjusting uses place value",
          ],
          vis: {
            kind: "lines",
            rows: ["15,736 − 10,000 − 300 − 2", "15,734 − 10,300"],
          },
          x: "Both make the subtraction easier and give the same difference: [5,434].",
        },
        {
          type: "mc",
          q: "Rafael: 9,798 − 6,098 → +2 and −2 → 9,800 − 6,096 = 3,704. Sadia: +2 and +2 → 9,800 − 6,100 = 3,700. Who is right?",
          opts: ["Sadia", "Rafael"],
          two: true,
          vis: { kind: "lines", rows: ["9,798 − 6,098 = ?"] },
          x: "In subtraction you change [both numbers the same way]. 9,798 − 6,098 = 3,700.",
        },
        {
          type: "open",
          q: "Reflect: How did you decide which strategy to use to find each difference?",
          vis: { kind: "lines", rows: ["9,856 − 6,298", "9,858 − 6,300"] },
          // unverified: a model answer, the book gives none
          a: "When the number I take away is close to a round number (6,298, 4,996), I adjust. Otherwise I decompose it and take away one place at a time.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 17–18",
      t: "Additional Practice 1–8",
      en: "Lesson 3-5",
      ic: "📘",
      from: "Practice Book p. 17–18",
      keep: true,
      items: [
        ...[
          [2985, 1270],
          [7968, 4126],
          [5438, 3215],
          [67855, 33420],
        ].map(([a, b]) => decompQ(a, b)),
        col(
          3241,
          "-",
          2176,
          "A bus driver drives 2,176 miles in December and 3,241 in January. How many more miles in January?",
        ),
        col(
          12064,
          "-",
          10933,
          "Caldon has 12,064 students, Dempsey 10,933. How many more in Caldon?",
        ),
        col(
          5618,
          "-",
          4724,
          "5,618 tickets for the first game, 4,724 for the second. How many more for the first game?",
        ),
        col(
          3217,
          "-",
          2987,
          "The first student got 3,217 votes, the second 2,987. How many more did the first one get?",
        ),
      ],
    },
  ],
};
