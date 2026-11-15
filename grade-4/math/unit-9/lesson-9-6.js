// Math · Grade 4 · Lesson 9-6 « Solve Problems Involving Fractions » (Reveal Math, Unit 9 « Addition and Subtraction Meanings and Strategies with Fractions »).
// Sources: Student Edition Volume 2 as the online e-book (screencast books/Screencast From 2026-11-15 18-24-52.mp4, 6:44–7:50; no page numbers),
// Student Practice Book p. 99–100. No teacher's key for this lesson. Log: grade-4/math/SOURCES.md.
// Problems in two steps are one question per step; the chain is checked at the end of the file.
// One step: "{a/d} + {b/d} − {c/d} = ?" (ops: [["+", b], ["−", c]])
const stepQ = (q, start, ops, d, more = {}) => {
  let r = start;
  for (const [o, n] of ops) r = o === "+" ? r + n : r - n;
  const e =
    `{${start}/${d}}` + ops.map(([o, n]) => ` ${o} {${n}/${d}}`).join("");
  const t = `${start}` + ops.map(([o, n]) => ` ${o} ${n}`).join("");
  return {
    type: "num",
    q,
    pre: `${e} =`,
    fr: `?/${d}`,
    a: r,
    vis: { kind: "lines", rows: [`${e} = ?`] },
    x: `${t} = ${r}: ${e} = {[${r}]/${d}}.`,
    ...more,
  };
};
// a bar model: rows of fraction parts, "?" for the unknown
const bars = (rows, total) => ({
  kind: "bar",
  rows: rows.map(([l, segs]) => ({
    l,
    segs: segs.map(([t, v, q]) => ({ t, v, q })),
  })),
  ...(total ? { total: { t: total } } : {}),
});

window.LESSON = {
  n: "9-6",
  key: "math4-l9-6",
  grade: 4,
  title: "Fraction Word Problems",
  en: "Add and subtract fractions to solve problems, one step at a time",
  unit: "Unit 9 · Lesson 9-6",
  book: "e-book Lesson 9-6 · Practice Book p. 99–100",
  imgDir: "img/lesson-9-6",
  cover: "curious",
  question: {
    q: "How do I know whether to [add] or [subtract] in a fraction problem?",
    // unverified: a model answer, the book gives none
    a: 'Draw a bar model. Putting parts together, or "in all": add. Taking away, "less", "how much more", "how much is left": subtract. Some problems need two steps.',
    img: "curious",
  },
  words: [
    { w: "Add", m: "put together: {3/8} + {7/8}" },
    { w: "Subtract", m: "take away, find how much less: {7/8} − {4/8}" },
    { w: "Bar model", m: "a drawing of the parts and the whole of a problem" },
    { w: "Step", m: "a part of a problem: some problems have two steps" },
  ],
  ideas: [
    {
      t: "What math do you see?",
      ic: "🥜",
      img: "curious",
      lines: [
        "A bowl of trail mix: peanuts, raisins, seeds, chocolate.",
        "The parts make the [whole] mix: we can add their weights.",
      ],
    },
    {
      t: "Step 1: the raisins",
      ic: "🍇",
      lines: [
        "Graham uses {7/8} pound of peanuts and {4/8} pound [less] raisins.",
        "Less: subtract. {7/8} − {4/8} = {3/8} pound of raisins.",
      ],
      vis: bars([
        ["peanuts", [["{7/8}", 7]]],
        [
          "raisins",
          [
            ["r", 3, true],
            ["{4/8}", 4],
          ],
        ],
      ]),
    },
    {
      t: "Step 2: the trail mix",
      ic: "🥣",
      lines: [
        "The mix is raisins [and] peanuts: add.",
        "{3/8} + {7/8} = {10/8} pounds of trail mix.",
      ],
      vis: bars(
        [
          [
            "mix",
            [
              ["{3/8}", 3],
              ["{7/8}", 7],
            ],
          ],
        ],
        "w",
      ),
    },
    {
      t: "Add or subtract?",
      ic: "🤔",
      lines: [
        '"In all", "together", "combined": [add].',
        '"Less", "left", "how much more", "still needs": [subtract].',
        "Draw a bar model to see it.",
      ],
      vis: { kind: "lines", rows: ["+ in all", "− left, less"] },
    },
    {
      t: "Two equations",
      ic: "🟰",
      lines: [
        "Erin uses {7/10} load of mulch in front and {4/10} load less in the back.",
        "{7/10} − {4/10} = ?, or ? + {4/10} = {7/10}. Both give {3/10}.",
      ],
      vis: {
        kind: "lines",
        rows: ["{7/10} − {4/10} = {3/10}", "{3/10} + {4/10} = {7/10}"],
      },
    },
  ],

  games: [
    {
      k: "which",
      t: "Add or subtract?",
      en: "Read the problem",
      ic: "🤔",
      items: [
        [
          "Mia has {3/8} cup of milk and gets {2/8} cup more. How much milk now?",
          "Add",
        ],
        [
          "A rope is {9/10} meter. Sam cuts off {4/10} meter. How much is left?",
          "Subtract",
        ],
        [
          "Leo ran {5/6} mile and Ana ran {2/6} mile. How much farther did Leo run?",
          "Subtract",
        ],
        [
          "A cake used {1/4} cup of sugar and {2/4} cup of flour. How much in all?",
          "Add",
        ],
        [
          "{7/12} of a wall is painted. How much still needs paint?",
          "Subtract",
        ],
        [
          "Kim read {2/5} of a book on Monday and {1/5} on Tuesday. How much did she read in all?",
          "Add",
        ],
      ].map(([q, a]) => ({
        type: "mc",
        q,
        opts: [a, a === "Add" ? "Subtract" : "Add"],
        keep: ["Add", "Subtract"],
        emoji: a === "Add" ? "📖" : "📖",
        x:
          a === "Add"
            ? "Parts put together: [add]."
            : "Taking away or finding the difference: [subtract].",
      })),
    },
    {
      k: "solve",
      t: "Solve it",
      en: "One step",
      ic: "✏️",
      items: [
        [
          "Mia has {3/8} cup of milk and gets {2/8} cup more. How much milk now?",
          3,
          [["+", 2]],
          8,
        ],
        [
          "A rope is {9/10} meter. Sam cuts off {4/10} meter. How much is left?",
          9,
          [["−", 4]],
          10,
        ],
        [
          "Leo ran {5/6} mile and Ana ran {2/6} mile. How much farther did Leo run?",
          5,
          [["−", 2]],
          6,
        ],
        [
          "A cake used {1/4} cup of sugar and {2/4} cup of flour. How much in all?",
          1,
          [["+", 2]],
          4,
        ],
      ].map(([q, s, ops, d]) => stepQ(q, s, ops, d)),
    },
  ],

  exercises: [
    {
      k: "curious",
      g: "📗 Book · Lesson 9-6",
      t: "Be Curious",
      en: "Trail mix",
      ic: "🥜",
      from: "e-book 9-6 · Be Curious",
      keep: true,
      items: [
        {
          type: "open",
          q: "What math do you see?",
          img: "curious",
          // unverified: no key; any answer is right
          a: "A mix of peanuts, raisins, seeds and chocolate. Each kind is a part of the whole mix; we could add the weights of the parts, or find how much more of one there is.",
        },
      ],
    },
    {
      k: "learn",
      g: "📗 Book · Lesson 9-6",
      t: "Learn: Graham's trail mix",
      en: "Two steps",
      ic: "🥣",
      from: "e-book 9-6 · Learn",
      keep: true,
      items: [
        stepQ(
          "Step 1: Graham uses {7/8} pound of peanuts and {4/8} pound less raisins than peanuts. What is the weight of the raisins?",
          7,
          [["−", 4]],
          8,
          {
            post: "pound",
            vis: bars([
              ["peanuts", [["{7/8}", 7]]],
              [
                "raisins",
                [
                  ["r", 3, true],
                  ["{4/8}", 4],
                ],
              ],
            ]),
          },
        ),
        stepQ(
          "Step 2: What is the total weight of the trail mix (raisins and peanuts)?",
          3,
          [["+", 7]],
          8,
          {
            post: "pound",
            vis: bars(
              [
                [
                  "mix",
                  [
                    ["{3/8}", 3],
                    ["{7/8}", 7],
                  ],
                ],
              ],
              "w",
            ),
          },
        ),
      ],
    },
    {
      k: "together",
      g: "📗 Book · Lesson 9-6",
      t: "Work Together",
      en: "Heidi paints a wall",
      ic: "🖌️",
      from: "e-book 9-6 · Work Together",
      keep: true,
      items: [
        stepQ(
          "Heidi painted {4/10} of a wall. Her brother painted {3/10}. How much did they paint together?",
          4,
          [["+", 3]],
          10,
          {
            vis: {
              kind: "fbar",
              rows: [
                { d: 10, on: [0, 1, 2, 3], l: "Heidi" },
                { d: 10, on: [4, 5, 6], l: "brother", c: 1 },
              ],
            },
          },
        ),
        stepQ(
          "How much of the wall still needs to be painted? (The whole wall is {10/10}.)",
          10,
          [["−", 7]],
          10,
          {
            vis: { kind: "fbar", rows: [{ d: 10, k: 7 }] },
          },
        ),
      ],
    },
    {
      k: "own1",
      g: "📗 Book · Lesson 9-6",
      t: "On My Own 1–5",
      en: "Recipe, running, tank, salad, park",
      ic: "🍊",
      from: "e-book 9-6 · On My Own 1–5",
      keep: true,
      items: [
        stepQ(
          "Clarice uses {1/4} cup of oil and {2/4} cup of water. How much liquid does she use?",
          1,
          [["+", 2]],
          4,
          { post: "cup", emoji: "🫗" },
        ),
        stepQ(
          "Jen ran {9/10} mile. Her sister ran {12/10} miles. How much farther did her sister run?",
          12,
          [["−", 9]],
          10,
          { post: "mile", emoji: "🏃" },
        ),
        stepQ(
          "Camryn drained {5/12} of a tank. Now {2/12} of the tank is left. How much of the tank was filled before?",
          2,
          [["+", 5]],
          12,
          { emoji: "💧" },
        ),
        stepQ(
          "Sully uses {5/6} pound of oranges and {3/6} pound less berries. How many pounds of berries?",
          5,
          [["−", 3]],
          6,
          {
            post: "pound",
            vis: bars([
              ["oranges", [["{5/6}", 5]]],
              [
                "berries",
                [
                  ["?", 2, true],
                  ["{3/6}", 3],
                ],
              ],
            ]),
          },
        ),
        stepQ(
          "What is the total weight of the oranges and berries?",
          5,
          [["+", 2]],
          6,
          { post: "pound", emoji: "🍊" },
        ),
        stepQ(
          "Marcie's park is a rectangle {3/10} mile by {7/10} mile. How far is it all the way around?",
          3,
          [
            ["+", 7],
            ["+", 3],
            ["+", 7],
          ],
          10,
          {
            post: "mile",
            vis: { kind: "lines", rows: ["↕ {3/10} mi", "↔ {7/10} mi"] },
          },
        ),
        stepQ(
          "Her mother gave her a ride for the last {4/10} mile. How far did Marcie walk?",
          20,
          [["−", 4]],
          10,
          { post: "mile", emoji: "🚗" },
        ),
      ],
    },
    {
      k: "own6",
      g: "📗 Book · Lesson 9-6",
      t: "On My Own 6–9",
      en: "Bike, juice, scarf, your own problem",
      ic: "🚲",
      from: "e-book 9-6 · On My Own 6–9",
      keep: true,
      items: [
        stepQ(
          "Julia rode her bike {8/10} mile, then {1/10} mile to the post office, then {2/10} mile to school. How many miles did she ride?",
          8,
          [
            ["+", 1],
            ["+", 2],
          ],
          10,
          { post: "mile", emoji: "🚲" },
        ),
        stepQ(
          "A bottle had {7/8} gallon of juice. Then {5/8} gallon was poured out. How much was left?",
          7,
          [["−", 5]],
          8,
          { emoji: "🧃" },
        ),
        stepQ(
          "After some juice was added, the bottle had {3/8} gallon. How much juice was added?",
          3,
          [["−", 2]],
          8,
          { emoji: "🧃" },
        ),
        stepQ(
          "Santosh walked {9/10} mile, walked back {3/10} mile for his scarf, then walked another {5/10} mile. How far is he from where he started?",
          9,
          [
            ["−", 3],
            ["+", 5],
          ],
          10,
          { post: "mile", emoji: "🧣" },
        ),
        stepQ(
          "Extend Your Thinking: b = {5/8} + {4/8}. What is b?",
          5,
          [["+", 4]],
          8,
          { pre: "b = {5/8} + {4/8} =" },
        ),
        stepQ("c = b − {2/8}. What is c?", 9, [["−", 2]], 8, {
          pre: "c = {9/8} − {2/8} =",
        }),
        {
          type: "open",
          q: "Write a word problem for b = {5/8} + {4/8}, c = b − {2/8}.",
          vis: { kind: "lines", rows: ["b = {5/8} + {4/8}", "c = b − {2/8}"] },
          // unverified: any matching story is right
          a: "Ana has {5/8} pound of grapes and buys {4/8} pound more: {9/8} pound. She eats {2/8} pound. Now she has {7/8} pound.",
        },
        {
          type: "open",
          q: "Reflect: How can you determine which operations to use to solve problems with fractions?",
          vis: {
            kind: "lines",
            rows: ["+ in all, together", "− less, left, how much more"],
          },
          // unverified: a model answer, the book gives none
          a: "I draw a bar model. If parts are put together, I add; if something is taken away or I compare, I subtract. Some problems need two steps.",
        },
      ],
    },
    {
      k: "pb",
      g: "📘 Practice Book · p. 99–100",
      t: "Additional Practice 1–8",
      en: "Lesson 9-6",
      ic: "📘",
      from: "Practice Book p. 99–100",
      keep: true,
      items: [
        stepQ("Find the number {3/5} less than {8/5}.", 8, [["−", 3]], 5),
        stepQ("Find the number {2/6} greater than {3/6}.", 3, [["+", 2]], 6),
        stepQ("Find the sum of {2/8} and {9/8}.", 2, [["+", 9]], 8),
        stepQ(
          "Now find the number {7/8} less than that sum.",
          11,
          [["−", 7]],
          8,
        ),
        stepQ("Find the difference of {6/12} and {3/12}.", 6, [["−", 3]], 12),
        stepQ(
          "Now find the number {4/12} more than that difference.",
          3,
          [["+", 4]],
          12,
        ),
        stepQ(
          "Mark read {2/12} of a book on Monday and {3/12} more on Tuesday. How much did he read in the two days?",
          2,
          [["+", 3]],
          12,
          { emoji: "📖" },
        ),
        stepQ(
          "He read the rest on Wednesday. How much of the book did he read on Wednesday?",
          12,
          [["−", 5]],
          12,
          { emoji: "📖" },
        ),
        stepQ(
          "In Rachael's necklace {3/8} of the beads are red and {2/8} are orange. What fraction is red or orange?",
          3,
          [["+", 2]],
          8,
          { emoji: "📿" },
        ),
        stepQ(
          "The rest of the beads are yellow. What fraction is yellow?",
          8,
          [["−", 5]],
          8,
          { emoji: "📿" },
        ),
        stepQ(
          "Dwight's car has {5/6} tank of gas. He uses {1/6} to go shopping and {2/6} to visit a friend. How much is left at his friend's house?",
          5,
          [
            ["−", 1],
            ["−", 2],
          ],
          6,
          { emoji: "⛽" },
        ),
        stepQ(
          "After he drives home there is {1/6} tank left. How much gas did he use to drive home?",
          2,
          [["−", 1]],
          6,
          { emoji: "⛽" },
        ),
        stepQ(
          "Erica drank {5/10} gallon of water on Thursday and {2/10} gallon more on Friday. How much did she drink on Friday?",
          5,
          [["+", 2]],
          10,
          {
            post: "gallon",
            emoji: "🥤",
          },
        ),
        stepQ(
          "How much did she drink on Thursday and Friday combined?",
          5,
          [["+", 7]],
          10,
          { post: "gallon", emoji: "🥤" },
        ),
      ],
    },
  ],
};

// the chains of two-step problems: a wrong number here throws on load
const chain = (a, b) => {
  if (a !== b) throw new Error(`lesson 9-6: step answer ${a} is not ${b}`);
};
const EX96 = window.LESSON.exercises;
const at = (k, i) => EX96.find((x) => x.k === k).items[i].a;
chain(at("learn", 0), 3);
chain(at("together", 0), 7);
chain(at("own1", 3), 2);
chain(at("own1", 5), 20);
chain(at("own6", 1), 2);
chain(at("own6", 4), 9);
chain(at("pb", 2), 11);
chain(at("pb", 4), 3);
chain(at("pb", 6), 5);
chain(at("pb", 8), 5);
chain(at("pb", 10), 2);
chain(at("pb", 12), 7);
