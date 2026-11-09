// Math · Grade 4 · Lesson 7-8 « Solve Multi-Step Problems Using Division » (Reveal Math, Unit 7).
// Sources: Student Edition Vol. 1 p. 237–240, Student Practice Book p. 77–78. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The first step is worked out by shared/math-kit.js (step), the division with its remainder by remQ; the chain is checked at the end.
const { step, remQ, value } = MathKit;
const lines = (...rows) => ({ kind: "lines", rows });

window.LESSON = {
  n: "7-8",
  key: "math4-l7-8",
  grade: 4,
  title: "Problems in Steps with ÷",
  en: "Add or subtract first, then divide, and decide what to do with the remainder",
  unit: "Unit 7 · Lesson 7-8",
  book: "Book p. 237–240 · Practice Book p. 77–78",
  imgDir: "img/lesson-7-8",
  cover: "roses-bar",
  question: {
    q: "How do I solve a problem with [more than one step] and a division?",
    a: "Find what you need first: 124 − 18 = 106 roses. Then divide: 106 ÷ 6 = 17 R4. Read the question to decide about the remainder: [17] bouquets.",
    img: "roses-bar",
  },
  words: [
    { w: "Multi-step problem", m: "a problem you solve in two or more steps" },
    { w: "Remainder", m: "what is left over after dividing" },
    { w: "Each", m: "for one: 6 roses in each bouquet → divide by 6" },
    { w: "Plan", m: "decide the steps before you start" },
  ],
  ideas: [
    {
      t: "What math do you see?",
      ic: "🌹",
      lines: [
        "Kim had some roses and [gave some away]: subtract.",
        "She puts the same number in each bouquet: [divide].",
        "Two steps: first subtract, then divide.",
      ],
      vis: lines(
        "roses − given away = left",
        "left ÷ roses in a bouquet = bouquets",
      ),
    },
    {
      t: "Step 1: subtract",
      ic: "1️⃣",
      img: "roses-bar",
      lines: [
        "124 roses, 18 for her mother.",
        "r = 124 − 18 = [106].",
        "Kim has 106 roses for the bouquets.",
      ],
    },
    {
      t: "Step 2: divide",
      ic: "2️⃣",
      lines: [
        "106 ÷ 6: 6 × 10 = 60, 6 × 7 = 42 → 17, and 4 are left.",
        "106 ÷ 6 = [17 R4].",
        "Kim can make 17 bouquets; 4 roses are left.",
      ],
      vis: lines("106 − 60 = 46 (10)", "46 − 42 = 4 (7)", "17 R4"),
    },
    {
      t: "Make a plan",
      ic: "🗺️",
      lines: [
        "Read the question twice. What do you need [first]?",
        "Together → add. Gave away, damaged → subtract.",
        "Shared, each, in groups → [divide].",
      ],
      vis: lines("+ / −  first", "÷  then", "the remainder: think!"),
    },
  ],

  games: [
    {
      k: "steps",
      t: "Two steps",
      en: "Then divide",
      ic: "🪜",
      keep: true,
      items: [
        step(
          "A class has 58 pencils and gets 14 more. How many pencils?",
          "58 + 14",
          "pencils",
        ),
        ...remQ(
          "72 pencils, 8 in each box. How many boxes?",
          72,
          8,
          "ignore",
          "boxes",
        ),
        step(
          "A farmer picks 95 apples. 7 are bad. How many good apples?",
          "95 − 7",
          "apples",
        ),
        ...remQ(
          "88 good apples, 5 in each bag. How many bags are needed for all of them?",
          88,
          5,
          "up",
          "bags",
        ),
      ],
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 237–240",
      t: "Be Curious",
      en: "What math do you see?",
      ic: "🌹",
      from: "Book p. 237 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "Kim is making bouquets with some roses in each. She had some roses and gave some to her mother. What math do you see?",
          vis: lines(
            "roses − given away = left",
            "left ÷ roses in a bouquet = bouquets",
          ),
          // unverified: no key for this lesson
          a: "Subtraction: the roses she had minus the roses she gave away. Division: the roses left shared equally into bouquets. Maybe a remainder: roses that don't make a full bouquet.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 237–240",
      t: "Learn: Kim's bouquets",
      en: "Subtract, then divide",
      ic: "🌹",
      from: "Book p. 238 · Learn",
      keep: true,
      items: [
        step(
          "Kim had 124 roses and gave 18 to her mother. How many are left? r = ?",
          "124 − 18",
          "roses",
          { img: "roses-bar", vis: undefined },
        ),
        ...remQ(
          "106 roses, 6 in each bouquet. How many bouquets can Kim make?",
          106,
          6,
          "ignore",
          "bouquets",
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 237–240",
      t: "Work Together",
      en: "Bottles of juice",
      ic: "🤝",
      from: "Book p. 238 · Work Together",
      keep: true,
      items: [
        step(
          "Roger had 64 bottles; 12 were damaged. How many good bottles?",
          "64 − 12",
          "bottles",
        ),
        ...remQ(
          "52 bottles, 9 in each carton. How many cartons to pack them all?",
          52,
          9,
          "up",
          "cartons",
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 237–240",
      t: "On My Own 1–4",
      en: "Solve each problem",
      ic: "🪜",
      from: "Book p. 239 · On My Own 1–4",
      keep: true,
      items: [
        step(
          "235 sticky note packages in one box, 224 in another. How many in all?",
          "235 + 224",
          "packages",
        ),
        step(
          "459 packages shared equally by 9 classes. How many each?",
          "459 ÷ 9",
          "packages",
        ),
        step(
          "A florist has 875 flowers and uses 49 in a bouquet. How many are left?",
          "875 − 49",
          "flowers",
        ),
        ...remQ(
          "826 flowers, 8 in each vase. How many vases for all of them?",
          826,
          8,
          "up",
          "vases",
        ),
        step(
          "Carly has 168 stickers in one book and 492 in another. How many?",
          "168 + 492",
          "stickers",
        ),
        step(
          "6 stickers on each page. How many pages has she filled?",
          "660 ÷ 6",
          "pages",
        ),
        {
          type: "open",
          q: "Write a multi-step word problem for 2 + 4 = g and 204 ÷ g = ?. Then solve it.",
          vis: lines("2 + 4 = g", "204 ÷ g = ?"),
          // unverified: a model answer; any problem is right
          a: "A bus has 2 seats on the left and 4 on the right in each row: 2 + 4 = 6 seats. How many rows for 204 people? 204 ÷ 6 = 34 rows.",
        },
      ],
    },
    {
      k: "own5",
      g: "📗 Book · p. 237–240",
      t: "On My Own 5–8",
      en: "Think it through",
      ic: "🧠",
      from: "Book p. 240 · On My Own 5–8",
      keep: true,
      items: [
        step(
          "Finn needs a 78-foot border; each board is 3 feet. How many boards?",
          "78 ÷ 3",
          "boards",
        ),
        ...remQ(
          "26 boards, sold in packages of 3. How many packages should Finn order?",
          26,
          3,
          "up",
          "packages",
        ),
        step(
          "129 girls and 204 boys go hiking. How many students?",
          "129 + 204",
          "students",
        ),
        ...remQ(
          "333 students, at most 6 with each guide. How many guides are needed?",
          333,
          6,
          "up",
          "guides",
        ),
        step(
          "Karen has made 304 frogs. How many more to make 1,000?",
          "1,000 − 304",
          "frogs",
        ),
        ...remQ(
          "She makes 7 frogs a day. How many days until she has 696 more?",
          696,
          7,
          "up",
          "days",
        ),
        {
          type: "mc",
          q: "Ryan's work for 174 students and 13 teachers at tables of 8: (174 + 13) = 187, 187 ÷ 8 = 23 R3. What does 23 R3 mean?",
          opts: [
            "23 full tables and 3 people left",
            "23 people at 3 tables",
            "3 tables of 23 people",
          ],
          vis: lines("174 + 13 = 187", "187 ÷ 8 = 23 R3"),
          x: "187 people. 23 tables are full; [3] people still need a seat.",
        },
        ...remQ(
          "So how many tables do they need for all 187 people?",
          187,
          8,
          "up",
          "tables",
        ),
        {
          type: "open",
          q: "Reflect: Why might you have to interpret a remainder when you solve a problem?",
          vis: lines("23 R3 → 24 tables"),
          // unverified: a model answer, the book gives none
          a: "Because the answer has to make sense in the story: 23 R3 tables means we need 24 tables so that everyone sits, but 17 R4 bouquets means only 17 full bouquets.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 77–78",
      t: "Additional Practice 1–4",
      en: "Lesson 7-8",
      ic: "📘",
      from: "Practice Book p. 77–78",
      keep: true,
      items: [
        step(
          "744 pencils; 72 go to the office. How many are left?",
          "744 − 72",
          "pencils",
        ),
        step(
          "672 pencils shared by 7 classrooms. How many each?",
          "672 ÷ 7",
          "pencils",
        ),
        step(
          "Cooper has 112 pictures in one album and 162 in another. How many?",
          "112 + 162",
          "pictures",
        ),
        // unverified: "pages filled" read as full pages (30), the 31st page has 4 pictures
        ...remQ(
          "274 pictures, 9 on each page. How many pages are filled?",
          274,
          9,
          "ignore",
          "pages",
        ),
        step(
          "100 oatmeal, 150 chocolate chip and 98 snickerdoodle cookies. How many cookies?",
          "100 + 150 + 98",
          "cookies",
        ),
        step("4 cookies in each bag. How many bags?", "348 ÷ 4", "bags"),
        step("They sell 82 bags. How many bags are left?", "87 − 82", "bags"),
        step("How many cookies are left over?", "5 × 4", "cookies"),
        step(
          "164 fourth graders and 178 fifth graders. How many students?",
          "164 + 178",
          "students",
        ),
        step(
          "342 students in 9 rows. How many in each row?",
          "342 ÷ 9",
          "students",
        ),
      ],
    },
  ],
};
[
  ["124 − 18", 106],
  ["64 − 12", 52],
  ["235 + 224", 459],
  ["875 − 49", 826],
  ["168 + 492", 660],
  ["78 ÷ 3", 26],
  ["129 + 204", 333],
  ["1,000 − 304", 696],
  ["174 + 13", 187],
  ["744 − 72", 672],
  ["112 + 162", 274],
  ["100 + 150 + 98", 348],
  ["348 ÷ 4", 87],
  ["164 + 178", 342],
  ["58 + 14", 72],
  ["95 − 7", 88],
].forEach(([e, v]) => {
  if (value(e) !== v) throw new Error(`lesson-7-8: ${e} is not ${v}`);
});
