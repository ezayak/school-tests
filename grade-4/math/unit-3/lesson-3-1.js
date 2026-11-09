// Math · Grade 4 · Lesson 3-1 « Estimate Sums or Differences » (Reveal Math, Unit 3).
// Sources: Student Edition Vol. 1 p. 59–62, Student Practice Book p. 9–10. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// The estimates use one strategy each, as the book's Learn does: round to the nearest hundred, or front-end (keep the first digit).
// Estimates and exact answers are worked out by shared/math-kit.js (round, frontEnd, calc); the exact answers are column sums (col).
const { fmt, round, frontEnd, calc, col, prob } = MathKit;
const S = { "+": "+", "-": "−" };
const roundEst = (a, op, b) => calc(round(a, 2), op, round(b, 2));
const frontEst = (a, op, b) => calc(frontEnd(a), op, frontEnd(b));
// "Round to the nearest hundred and estimate": the rounded numbers are shown
const estQ = (a, op, b, more = {}) =>
  prob(
    `Estimate ${fmt(a)} ${S[op]} ${fmt(b)}: round both numbers to the nearest hundred.`,
    roundEst(a, op, b),
    {
      kind: "lines",
      rows: [
        `${fmt(a)} → ${fmt(round(a, 2))}`,
        `${fmt(b)} → ${fmt(round(b, 2))}`,
      ],
    },
    "",
    `${fmt(round(a, 2))} ${S[op]} ${fmt(round(b, 2))} = [${fmt(roundEst(a, op, b))}]`,
    more,
  );
// the table of p. 61: the rounding and the front-end estimates; which one is closer to the actual answer?
const closer = (a, op, b) => {
  const ex = calc(a, op, b),
    r = roundEst(a, op, b),
    f = frontEst(a, op, b);
  const R = `Rounding: ${fmt(r)}`,
    F = `Front-end: ${fmt(f)}`;
  return {
    type: "mc",
    q: `${fmt(a)} ${S[op]} ${fmt(b)} = ${fmt(ex)}. Which estimate is closer to the actual answer?`,
    opts: Math.abs(r - ex) <= Math.abs(f - ex) ? [R, F] : [F, R],
    keep: [R, F],
    two: true,
    vis: {
      kind: "lines",
      rows: [
        `${fmt(round(a, 2))} ${S[op]} ${fmt(round(b, 2))} = ${fmt(r)}`,
        `${fmt(frontEnd(a))} ${S[op]} ${fmt(frontEnd(b))} = ${fmt(f)}`,
      ],
    },
    x: `The actual answer is ${fmt(ex)}: ${fmt(Math.abs(r - ex))} from the rounding estimate, ${fmt(Math.abs(f - ex))} from the front-end estimate.`,
  };
};

window.LESSON = {
  n: "3-1",
  key: "math4-l3-1",
  grade: 4,
  title: "Estimate Sums and Differences",
  en: "Round or use front-end estimation to find about how much, and check if an answer is reasonable",
  unit: "Unit 3 · Lesson 3-1",
  book: "Book p. 59–62 · Practice Book p. 9–10",
  imgDir: "img/lesson-3-1",
  cover: "curious",
  question: {
    q: "How can I [estimate] a sum or a difference?",
    a: "Round the numbers, then add or subtract: 3,919 + 3,564 ≈ 3,900 + 3,600 = [7,500]. Or keep only the first digits ([front-end]): 3,000 + 3,000 = 6,000.",
    img: "table",
  },
  words: [
    { w: "Estimate", m: "a number close to the real answer: about 7,500" },
    { w: "Round", m: "change to a close, easy number: 3,919 → 3,900" },
    {
      w: "Front-end estimation",
      m: "keep the first digit, the others become 0: 3,919 → 3,000",
    },
    { w: "Exact", m: "the real answer: 3,919 + 3,564 = 7,483" },
    { w: "Reasonable", m: "it makes sense: close to the estimate" },
    { w: "Range", m: "between two numbers: between 700 and 900" },
  ],
  ideas: [
    {
      t: "What's the question?",
      ic: "🛝",
      img: "curious",
      lines: [
        "A principal has some money for new [playground equipment].",
        "A question: [how much] does it cost? Can she buy all of it?",
        "We don't need the exact answer: an [estimate] is enough.",
      ],
    },
    {
      t: "Can she buy two items?",
      ic: "💵",
      img: "table",
      lines: [
        "She has about [$8,000].",
        "Double slide $3,919 + climbing wall $3,564 = ?",
        "Estimate first: is it [more] or [less] than $8,000?",
      ],
    },
    {
      t: "One way: round",
      ic: "🎯",
      lines: [
        "Round to the nearest [hundred]: 3,919 → 3,900, 3,564 → 3,600.",
        "3,900 + 3,600 = [7,500].",
        "7,500 < 8,000: she can buy both.",
      ],
      vis: { kind: "lines", rows: ["3,919 + 3,564", "3,900 + 3,600 = 7,500"] },
    },
    {
      t: "Another way: front-end",
      ic: "✂️",
      lines: [
        "[Front-end]: keep the first digit, the rest become 0.",
        "3,919 → 3,000. 3,564 → 3,000.",
        "3,000 + 3,000 = [6,000].",
      ],
      vis: { kind: "lines", rows: ["3,919 + 3,564", "3,000 + 3,000 = 6,000"] },
    },
    {
      t: "Is the answer reasonable?",
      ic: "✅",
      lines: [
        "The exact sum: 3,919 + 3,564 = [7,483].",
        "It is close to the estimates 7,500 and 6,000.",
        "An estimate tells us if an answer [makes sense].",
      ],
      vis: { kind: "colshow", op: "+", a: 3919, b: 3564 },
    },
    {
      t: "A range",
      ic: "↔️",
      lines: [
        "1,191 − 347: round one way → 1,100 − 400 = 700.",
        "Round the other way → 1,200 − 300 = 900.",
        "The answer is [between 700 and 900] (it is 844).",
      ],
      vis: { kind: "lines", rows: ["1,100 − 400 = 700", "1,200 − 300 = 900"] },
    },
  ],

  games: [
    {
      k: "round",
      t: "Round and estimate",
      en: "To the nearest hundred",
      ic: "🎯",
      items: [
        [2475, "+", 1318],
        [6820, "-", 3154],
        [5049, "+", 2961],
        [9372, "-", 4708],
        [1550, "+", 2449],
        [8125, "-", 690],
      ].map(([a, op, b]) => estQ(a, op, b)),
    },
    {
      k: "front",
      t: "Front-end",
      en: "Keep the first digit",
      ic: "✂️",
      items: [
        [4721, "+", 2389],
        [8650, "-", 3120],
        [6199, "+", 1987],
        [7342, "-", 5876],
        [3098, "+", 5555],
      ].map(([a, op, b]) =>
        prob(
          `Front-end estimate: ${fmt(a)} ${S[op]} ${fmt(b)}`,
          frontEst(a, op, b),
          {
            kind: "lines",
            rows: [
              `${fmt(a)} → ${fmt(frontEnd(a))}`,
              `${fmt(b)} → ${fmt(frontEnd(b))}`,
            ],
          },
          "",
          `${fmt(frontEnd(a))} ${S[op]} ${fmt(frontEnd(b))} = [${fmt(frontEst(a, op, b))}]`,
        ),
      ),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · p. 59–62",
      t: "Be Curious",
      en: "What's the question?",
      ic: "🛝",
      from: "Book p. 59 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "A principal has some money for new playground equipment. What's the question?",
          img: "curious",
          // unverified: no key for this lesson
          a: "How much do the slides, the dome and the climbing wall cost? Does the principal have enough money to buy them all? Which ones can she buy?",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · p. 59–62",
      t: "Learn: the playground",
      en: "Can she buy the slide and the wall?",
      ic: "💵",
      from: "Book p. 60 · Learn",
      keep: true,
      items: [
        estQ(3919, "+", 3564, { img: "table" }),
        prob(
          "Front-end estimate: 3,919 + 3,564",
          6000,
          { kind: "lines", rows: ["3,919 → 3,000", "3,564 → 3,000"] },
          "",
          "3,000 + 3,000 = [6,000]",
        ),
        col(3919, "+", 3564, "The exact cost:"),
        {
          type: "tf",
          q: "The principal has about $8,000. Can she order the double slide and the climbing wall?",
          a: true,
          yes: ["Yes, she can", "No, she can't"],
          img: "table",
          x: "3,919 + 3,564 = 7,483: less than [8,000].",
        },
      ],
    },
    {
      k: "together",
      g: "📗 Book · p. 59–62",
      t: "Work Together",
      en: "All three items",
      ic: "🤝",
      from: "Book p. 60 · Work Together",
      keep: true,
      items: [
        {
          type: "mc",
          q: "About how much more money does the principal need to buy all three items?",
          opts: ["About $1,700", "About $700", "About $3,700"],
          img: "table",
          x: "3,900 + 2,200 + 3,600 = 9,700. 9,700 − 8,000 = [1,700].",
        },
      ],
    },
    {
      k: "own1",
      g: "📗 Book · p. 59–62",
      t: "On My Own 1–2",
      en: "Estimate",
      ic: "🎯",
      from: "Book p. 61 · On My Own 1–2",
      keep: true,
      items: [
        {
          type: "mc",
          q: "Estimate 12,258 + 14,926.",
          opts: ["27,000", "2,700", "270,000"],
          vis: { kind: "lines", rows: ["12,258 → 12,000", "14,926 → 15,000"] },
          x: "Round to the nearest [thousand]: 12,000 + 15,000 = 27,000.",
        },
        estQ(5246, "-", 392),
      ],
    },
    {
      k: "own3",
      g: "📗 Book · p. 59–62",
      t: "On My Own 3–7",
      en: "Rounding or front-end?",
      ic: "📋",
      from: "Book p. 61 · On My Own 3–7",
      keep: true,
      items: [
        [8303, "-", 2789],
        [3783, "+", 1416],
        [3155, "+", 2205],
        [9875, "-", 4968],
        [4228, "+", 986],
      ].flatMap(([a, op, b]) => [estQ(a, op, b), closer(a, op, b)]),
    },
    {
      k: "own8",
      g: "📗 Book · p. 59–62",
      t: "On My Own 8–12",
      en: "Is it reasonable?",
      ic: "🧠",
      from: "Book p. 61–62 · On My Own 8–12",
      keep: true,
      items: [
        estQ(2352, "+", 8761),
        {
          type: "tf",
          q: "Anton wrote 1,988 − 713 = 275. Is the difference reasonable?",
          a: false,
          yes: ["Yes, it is", "No, it is not"],
          vis: {
            kind: "lines",
            rows: ["1,988 − 713 = 275 ?", "2,000 − 700 = 1,300"],
          },
          x: "The estimate is 2,000 − 700 = 1,300: 275 is [too far]. The exact answer is 1,275.",
        },
        {
          type: "tf",
          q: "Last year 1,578 students, this year 2,138. Carmen says the number grew by over 500. Is she right?",
          a: true,
          yes: ["Yes, she is", "No, she is not"],
          vis: { kind: "lines", rows: ["2,138 − 1,578 = ?"] },
          x: "2,138 − 1,578 = 560: [more than 500].",
        },
        {
          type: "tf",
          q: "Two seal pups weigh 8,250 grams and 7,920 grams. Hiro says together they weigh over 15,000 grams. Is that reasonable?",
          a: true,
          yes: ["Yes, it is", "No, it is not"],
          vis: { kind: "lines", rows: ["8,250 → 8,000", "7,920 → 8,000"] },
          x: "8,000 + 8,000 = 16,000: [over 15,000]. The exact total is 16,170 grams.",
        },
        {
          type: "mc",
          q: "Tanya walked 9,526 steps, Marcus 7,488. Tanya says the difference is about 3,000, Marcus says about 2,000. Who is right?",
          opts: ["Marcus", "Tanya"],
          two: true,
          vis: { kind: "lines", rows: ["9,526 → 9,500", "7,488 → 7,500"] },
          x: "9,500 − 7,500 = [2,000]. The exact difference is 2,038.",
        },
        {
          type: "open",
          q: "Reflect: What do you need to think about when you choose an estimation strategy?",
          vis: {
            kind: "lines",
            rows: ["3,900 + 3,600 = 7,500", "3,000 + 3,000 = 6,000"],
          },
          // unverified: a model answer, the book gives none
          a: "How close the estimate must be. Rounding to the nearest hundred is closer; front-end is faster but less close. For money I want to be sure I have enough.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 9–10",
      t: "Additional Practice 1–6",
      en: "Lesson 3-1",
      ic: "📘",
      from: "Practice Book p. 9–10",
      keep: true,
      items: [
        ...[
          [749, "+", 2810],
          [4968, "-", 354],
          [3583, "+", 5685],
          [14632, "-", 10766],
        ].flatMap(([a, op, b]) => [
          estQ(a, op, b),
          col(a, op, b, "Now the actual answer:"),
        ]),
        estQ(934, "+", 4634, {
          q: "A company ships 934 small and 4,634 large packages. About how many altogether? Round to the nearest hundred.",
          post: "packages",
        }),
        estQ(2891, "-", 1163, {
          q: "A store sells 1,163 bananas and 2,891 apples. About how many more apples? Round to the nearest hundred.",
          post: "apples",
        }),
        {
          type: "open",
          q: "A banker estimates $3,417 − $1,092 to be $2,330. Do you agree with the estimate?",
          vis: { kind: "lines", rows: ["3,417 → 3,400", "1,092 → 1,100"] },
          // unverified: no key; the book may want either answer with a reason
          a: "It is close: the exact difference is $2,325. But it is not a rounded estimate: rounding to the nearest hundred gives $3,400 − $1,100 = $2,300.",
        },
        {
          type: "mc",
          q: "In which range is the sum of 2,195 and 985?",
          opts: [
            "Between 3,000 and 3,200",
            "Between 2,000 and 2,200",
            "Between 4,000 and 5,000",
          ],
          vis: {
            kind: "lines",
            rows: ["2,100 + 900 = 3,000", "2,200 + 1,000 = 3,200"],
          },
          x: "Round down: 2,100 + 900 = 3,000. Round up: 2,200 + 1,000 = 3,200. The sum is 3,180.",
        },
        {
          type: "tf",
          q: "Arnold estimates 8,438 − 5,534 as 2,910. Luetta estimates 2,900. Can both estimates be right?",
          a: true,
          yes: ["Yes, both", "No"],
          vis: {
            kind: "lines",
            rows: ["8,440 − 5,530 = 2,910", "8,400 − 5,500 = 2,900"],
          },
          x: "Arnold rounded to the [tens], Luetta to the [hundreds]. Both are close to 2,904.",
        },
      ],
    },
  ],
};
