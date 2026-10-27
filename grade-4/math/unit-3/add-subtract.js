// Math · Grade 4 · Unit 3 « Addition and Subtraction Strategies and Algorithms » (Reveal Math, book pages 57–100).
// Lessons 3-4 (add with regrouping) and 3-7 (subtract with regrouping), the extra practice sheets and Homework 2 (part A).
// The engine is shared/computer-lesson.js; the column sums, the schemas and the number pad come from shared/math.js.
// col: {op, a, b} – the child writes the carries in the small boxes and the answer under the line.
// A word problem: story: {q, vis: <schema>, ask: true, ans: "… {} …"} – first "Add or subtract?", then the columns.
window.LESSON = {
  n: 3,
  key: "math4-u3",
  grade: 4,
  title: "Add and Subtract Big Numbers",
  unit: "Unit 3",
  book: "Book pages 57–100",
  imgDir: "img",
  cover: "cover",
  question: {
    q: "How can I [add] and [subtract] big numbers?",
    a: "Write them in [columns]: ones under ones, tens under tens. Start with the [ones]. 10 ones make 1 ten: [carry] it, or [regroup] when the top digit is too small.",
    img: "cover",
  },
  words: [
    { w: "Sum", m: "the answer when you add (+)" },
    { w: "Difference", m: "the answer when you subtract (−)" },
    { w: "Algorithm", m: "steps you always do in the same order" },
    {
      w: "Regroup",
      m: "change 10 ones into 1 ten (or 1 ten into 10 ones), 10 tens into 1 hundred …",
    },
    {
      w: "Carry",
      m: "write the extra ten in the small box above the next place",
    },
    {
      w: "Estimate",
      m: "a number close to the answer, to check if it makes sense",
    },
    { w: "Altogether / in all", m: "put together: add" },
    { w: "How many more / left", m: "find a part or the difference: subtract" },
  ],
  ideas: [
    {
      t: "Line up the places",
      ic: "📏",
      lines: [
        "Write the numbers [one under the other].",
        "[Ones] under ones, [tens] under tens, [hundreds] under hundreds …",
        "Each place has its own colour. Start on the right, with the [ones].",
      ],
      vis: {
        kind: "colshow",
        op: "+",
        a: 2431,
        b: 5345,
        cap: "2,431 + 5,345 = 7,976",
      },
    },
    {
      t: "10 ones = 1 ten",
      ic: "🔟",
      lines: [
        "8 + 6 = [14]. 14 ones = 1 ten and 4 ones.",
        "Write [4] in the ones. Write the [1] in the small box above the [tens].",
        "Then add the tens with the 1: 5 + 2 + [1] = 8.",
      ],
      vis: {
        kind: "colshow",
        op: "+",
        a: 1458,
        b: 926,
        cap: "1,458 + 926 = 2,384",
      },
    },
    {
      t: "Carry again and again",
      ic: "🔁",
      lines: [
        "Every place can make [10 or more].",
        "Write the ones digit, [carry the 1] to the next place on the left.",
        "At the end, the last 1 goes in front: 11,536 has [5 digits].",
      ],
      vis: {
        kind: "colshow",
        op: "+",
        a: 7861,
        b: 3675,
        cap: "7,861 + 3,675 = 11,536",
      },
    },
    {
      t: "Subtract: top − bottom",
      ic: "➖",
      lines: [
        "The [bigger] number goes on top.",
        "In every place: [top digit − bottom digit].",
        "Start with the [ones] again.",
      ],
      vis: {
        kind: "colshow",
        op: "-",
        a: 9875,
        b: 4523,
        cap: "9,875 − 4,523 = 5,352",
      },
    },
    {
      t: "Regroup to subtract",
      ic: "🔀",
      lines: [
        "Ones: 2 − 5? [2 is less than 5]: we can't.",
        "Take [1 ten] from the tens: 1 ten = 10 ones. Now 12 − 5 = [7].",
        "The tens gave 1 away: cross out [4], write [3] above it. 3 − 1 = 2.",
      ],
      vis: {
        kind: "colshow",
        op: "-",
        a: 5742,
        b: 2315,
        cap: "5,742 − 2,315 = 3,427",
      },
    },
    {
      t: "Regroup across a zero",
      ic: "0️⃣",
      lines: [
        "Ones: 5 − 7? Take 1 from the tens, but the tens are [0]!",
        "So the tens take 1 from the hundreds first. A 0 that gives 1 away becomes [9].",
        "Go slowly, one place at a time. 💡 Help shows each step.",
      ],
      vis: {
        kind: "colshow",
        op: "-",
        a: 4005,
        b: 1237,
        cap: "4,005 − 1,237 = 2,768",
      },
    },
    {
      t: "Check with the opposite",
      ic: "✅",
      lines: [
        "Subtraction and addition are [opposites].",
        "8,722 − 7,095 = 1,627. Check: [1,627 + 7,095] = 8,722 ✓",
        "If you get the top number back, your answer is right.",
      ],
      vis: {
        kind: "colshow",
        op: "+",
        a: 1627,
        b: 7095,
        cap: "1,627 + 7,095 = 8,722 ✓",
      },
    },
    {
      t: "Schema: put together → add",
      ic: "🧩",
      lines: [
        "Draw a [bar] for each part.",
        "We know the [parts]. The [whole] (?) is missing.",
        "Words: [altogether], [in all], [both], [total]. → We [add].",
      ],
      vis: {
        kind: "bar",
        rows: [
          { l: "East school", e: "🏫", segs: [{ t: "4,307", v: 4307 }] },
          { l: "West school", e: "🏫", segs: [{ t: "3,559", v: 3559 }] },
        ],
        total: { t: "? in all" },
        note: "4,307 + 3,559 = ?",
      },
    },
    {
      t: "Schema: a part is missing → subtract",
      ic: "✂️",
      lines: [
        "We know the [whole] and [one part].",
        "The other part (?) is missing.",
        "Words: [left], [still], [how many more to go]. → We [subtract]: whole − part.",
      ],
      vis: {
        kind: "bar",
        rows: [
          {
            l: "The trip",
            e: "🚗",
            brace: { t: "8,476 miles" },
            segs: [
              { t: "5,389 done", v: 5389 },
              { t: "? left", v: 3087, q: true },
            ],
          },
        ],
        note: "8,476 − 5,389 = ?",
      },
    },
    {
      t: "Schema: compare → subtract",
      ic: "⚖️",
      lines: [
        "Two bars: one is [longer].",
        "The question: [how many more]? or [how many fewer]?",
        "The difference (?) is the extra piece. → [big − small].",
      ],
      vis: {
        kind: "bar",
        rows: [
          { l: "Black & white", e: "🖤", segs: [{ t: "2,265", v: 2265 }] },
          {
            l: "Colour",
            e: "🌈",
            segs: [
              { t: "1,575", v: 1575 },
              { t: "? more", v: 690, q: true },
            ],
          },
        ],
        note: "2,265 − 1,575 = ?",
      },
    },
    {
      t: "Estimate first",
      ic: "🎯",
      lines: [
        "[Round] the numbers to the nearest thousand.",
        "3,919 + 3,564 → 4,000 + 4,000 = [8,000].",
        "The real answer, 7,483, is [close] to 8,000: it makes sense!",
      ],
      vis: {
        kind: "lines",
        rows: ["3,919 → 4,000", "3,564 → 4,000", "≈ 8,000"],
      },
    },
  ],

  games: [
    {
      k: "add",
      t: "Add in columns",
      en: "Carry the tens · 6 sums",
      ic: "➕",
      items: [
        { type: "col", op: "+", a: 1234, b: 4568 },
        { type: "col", op: "+", a: 2744, b: 1306 },
        { type: "col", op: "+", a: 4827, b: 3505 },
        { type: "col", op: "+", a: 9087, b: 7668 },
        { type: "col", op: "+", a: 12058, b: 4867 },
        { type: "col", op: "+", a: 38763, b: 18764 },
      ],
    },
    {
      k: "sub",
      t: "Subtract in columns",
      en: "Regroup · 6 differences",
      ic: "➖",
      items: [
        { type: "col", op: "-", a: 9875, b: 4523 },
        { type: "col", op: "-", a: 8722, b: 7095 },
        { type: "col", op: "-", a: 6805, b: 4782 },
        { type: "col", op: "-", a: 34612, b: 17947 },
        { type: "col", op: "-", a: 17425, b: 3680 },
        { type: "col", op: "-", a: 5000, b: 1236 },
      ],
    },
    {
      k: "story",
      t: "Word problems with a schema",
      en: "Add or subtract? Then solve",
      ic: "🧩",
      items: [
        {
          type: "col",
          op: "+",
          a: 1250,
          b: 875,
          story: {
            ask: true,
            q: "A library has 1,250 books. It buys 875 more books. How many books does it have now?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "Books",
                  e: "📚",
                  brace: { t: "? books now", q: true },
                  segs: [
                    { t: "1,250 had", v: 1250 },
                    { t: "875 more", v: 875, c: 1 },
                  ],
                },
              ],
            },
            ans: "The library has {} books now.",
          },
        },
        {
          type: "col",
          op: "-",
          a: 3400,
          b: 1275,
          story: {
            ask: true,
            q: "A farm had 3,400 eggs. It sold 1,275 eggs. How many eggs are left?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "Eggs",
                  e: "🥚",
                  brace: { t: "3,400 eggs" },
                  segs: [
                    { t: "1,275 sold", v: 1275 },
                    { t: "? left", v: 2125, q: true },
                  ],
                },
              ],
            },
            ans: "{} eggs are left.",
          },
        },
        {
          type: "col",
          op: "-",
          a: 8848,
          b: 6962,
          story: {
            ask: true,
            q: "Mount Everest is 8,848 meters tall. Mount Aconcagua is 6,962 meters tall. How much taller is Mount Everest?",
            vis: {
              kind: "bar",
              rows: [
                { l: "Everest", e: "🏔️", segs: [{ t: "8,848 m", v: 8848 }] },
                {
                  l: "Aconcagua",
                  e: "⛰️",
                  segs: [
                    { t: "6,962 m", v: 6962 },
                    { t: "?", v: 1886, q: true },
                  ],
                },
              ],
            },
            why: "Two bars to compare. The question is how much taller: the difference. We subtract: big − small.",
            ans: "Mount Everest is {} meters taller.",
          },
        },
        {
          type: "col",
          op: "+",
          a: 12560,
          b: 9845,
          story: {
            ask: true,
            q: "A zoo had 12,560 visitors on Saturday and 9,845 visitors on Sunday. How many visitors came in all?",
            vis: {
              kind: "bar",
              rows: [
                { l: "Saturday", e: "🦁", segs: [{ t: "12,560", v: 12560 }] },
                { l: "Sunday", e: "🦒", segs: [{ t: "9,845", v: 9845 }] },
              ],
              total: { t: "? in all" },
            },
            ans: "{} visitors came in all.",
          },
        },
        {
          type: "col",
          op: "-",
          a: 1630,
          b: 845,
          story: {
            ask: true,
            q: "Hiro weighs two sea lions together: 1,630 pounds. One sea lion weighs 845 pounds. How much does the other one weigh?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "Sea lions",
                  e: "🦭",
                  brace: { t: "1,630 pounds" },
                  segs: [
                    { t: "845", v: 845 },
                    { t: "?", v: 785, q: true },
                  ],
                },
              ],
            },
            ans: "The other sea lion weighs {} pounds.",
          },
        },
        {
          type: "col",
          op: "+",
          a: 467,
          b: 838,
          story: {
            ask: true,
            q: "Luca's family drove 467 miles on the first day and 838 miles on the next day. How many miles did they drive in the first two days?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "Miles",
                  e: "🚙",
                  brace: { t: "? miles", q: true },
                  segs: [
                    { t: "467", v: 467 },
                    { t: "838", v: 838, c: 1 },
                  ],
                },
              ],
            },
            ans: "They drove {} miles.",
          },
        },
      ],
    },
    {
      k: "which",
      t: "Add or subtract?",
      en: "Read the schema",
      ic: "🤔",
      items: [
        {
          type: "mc",
          q: "We know both parts. The whole is missing. What do we do?",
          opts: ["Add", "Subtract"],
          two: true,
          keep: ["Add", "Subtract"],
          icons: ["➕", "➖"],
          vis: {
            kind: "bar",
            rows: [
              {
                l: "",
                brace: { t: "?", q: true },
                segs: [
                  { t: "part", v: 3 },
                  { t: "part", v: 2, c: 1 },
                ],
              },
            ],
          },
        },
        {
          type: "mc",
          q: "We know the whole and one part. What do we do to find the other part?",
          opts: ["Subtract", "Add"],
          two: true,
          keep: ["Add", "Subtract"],
          icons: ["➖", "➕"],
          vis: {
            kind: "bar",
            rows: [
              {
                l: "",
                brace: { t: "whole" },
                segs: [
                  { t: "part", v: 3 },
                  { t: "?", v: 2, q: true },
                ],
              },
            ],
          },
        },
        {
          type: "mc",
          q: "“How many more?” Two bars, we need the difference. What do we do?",
          opts: ["Subtract", "Add"],
          two: true,
          keep: ["Add", "Subtract"],
          icons: ["➖", "➕"],
          vis: {
            kind: "bar",
            rows: [
              { l: "Big", segs: [{ t: "big", v: 5 }] },
              {
                l: "Small",
                segs: [
                  { t: "small", v: 3 },
                  { t: "?", v: 2, q: true },
                ],
              },
            ],
          },
        },
        {
          type: "mc",
          q: "“How many in all?” — what do we do?",
          opts: ["Add", "Subtract"],
          two: true,
          keep: ["Add", "Subtract"],
          icons: ["➕", "➖"],
          emoji: "🍎 + 🍏 = ?",
        },
        {
          type: "mc",
          q: "“How many are left?” — what do we do?",
          opts: ["Subtract", "Add"],
          two: true,
          keep: ["Add", "Subtract"],
          icons: ["➖", "➕"],
          emoji: "🍪🍪🍪 → 😋",
        },
        {
          type: "mc",
          q: "Which number goes on top when we subtract 7,095 from 8,722?",
          opts: ["8,722 (the bigger one)", "7,095 (the smaller one)"],
          vis: { kind: "colshow", op: "-", a: 8722, b: 7095 },
        },
      ],
    },
    {
      k: "est",
      t: "Estimate",
      en: "Round, then add or subtract",
      ic: "🎯",
      items: [
        {
          type: "mc",
          q: "Estimate 3,919 + 3,564. Round to the nearest thousand.",
          opts: [
            "4,000 + 4,000 = 8,000",
            "3,000 + 3,000 = 6,000",
            "4,000 + 3,000 = 7,000",
          ],
          x: "3,919 → 4,000 and 3,564 → 4,000 (the hundreds digit is 5 or more: round up).",
          emoji: "🎯",
        },
        {
          type: "mc",
          q: "Estimate 6,210 − 2,890. Round to the nearest thousand.",
          opts: [
            "6,000 − 3,000 = 3,000",
            "7,000 − 2,000 = 5,000",
            "6,000 − 2,000 = 4,000",
          ],
          x: "6,210 → 6,000 (2 < 5), 2,890 → 3,000 (8 ≥ 5).",
          emoji: "🎯",
        },
        {
          type: "mc",
          q: "Alex got 7,861 + 3,675 = 21,536. Does it make sense? Estimate: 8,000 + 4,000 = 12,000.",
          opts: ["No: 21,536 is too far from 12,000", "Yes, it is fine"],
          x: "The right answer is 11,536.",
          emoji: "🤔",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "l34",
      t: "Lesson 3-4 · On My Own",
      en: "Book pages 75–76: add with regrouping",
      ic: "➕",
      from: "Lesson 3-4",
      items: [
        { type: "col", op: "+", a: 1458, b: 926 },
        { type: "col", op: "+", a: 4239, b: 765 },
        { type: "col", op: "+", a: 2744, b: 1306 },
        { type: "col", op: "+", a: 4827, b: 3505 },
        { type: "col", op: "+", a: 9087, b: 7668 },
        { type: "col", op: "+", a: 12058, b: 4867 },
        {
          type: "col",
          op: "+",
          a: 4569,
          b: 5286,
          story: {
            ask: true,
            q: "A car maker has made 4,569 cars so far this month. They will make 5,286 more cars this month. How many cars will they make this month?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "Cars",
                  e: "🚗",
                  brace: { t: "? cars", q: true },
                  segs: [
                    { t: "4,569 so far", v: 4569 },
                    { t: "5,286 more", v: 5286, c: 1 },
                  ],
                },
              ],
            },
            ans: "They will make {} cars this month.",
          },
        },
        {
          type: "col",
          op: "+",
          a: 1425,
          b: 395,
          story: {
            ask: true,
            q: "Trevon had 1,425 trading cards. Now he has 395 more cards than he started with. How many cards does he have now?",
            vis: {
              kind: "bar",
              rows: [
                { l: "Before", e: "🃏", segs: [{ t: "1,425", v: 1425 }] },
                {
                  l: "Now",
                  e: "🃏",
                  brace: { t: "?", q: true },
                  segs: [
                    { t: "1,425", v: 1425 },
                    { t: "395 more", v: 395, c: 1 },
                  ],
                },
              ],
            },
            why: "Now = what he had + 395 more. The whole is missing: we add.",
            ans: "Trevon has {} cards now.",
          },
        },
        {
          type: "col",
          op: "+",
          a: 1305,
          b: 1238,
          story: {
            ask: true,
            q: "Luca's family drove 1,305 miles in two days. Then they drove 1,238 miles more. How many miles have they driven so far?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "Miles",
                  e: "🚙",
                  brace: { t: "? so far", q: true },
                  segs: [
                    { t: "1,305", v: 1305 },
                    { t: "1,238", v: 1238, c: 1 },
                  ],
                },
              ],
            },
            ans: "They have driven {} miles so far.",
          },
        },
        {
          type: "col",
          op: "+",
          a: 1259,
          b: 1259,
          story: {
            ask: true,
            q: "On the trip home they stopped exactly halfway, after 1,259 miles. How many miles is the whole trip home?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "Trip home",
                  e: "🏠",
                  brace: { t: "? miles", q: true },
                  segs: [
                    { t: "1,259 (half)", v: 1259 },
                    { t: "1,259 (half)", v: 1259, c: 1 },
                  ],
                },
              ],
            },
            why: "Two equal halves make the whole: 1,259 + 1,259.",
            ans: "The trip home is {} miles.",
          },
        },
      ],
    },
    {
      k: "x34",
      t: "Extra practice 3-4",
      en: "School sheet: sums and word problems",
      ic: "📝",
      from: "Extra Practice 3-4",
      items: [
        { type: "col", op: "+", a: 7861, b: 3675 },
        { type: "col", op: "+", a: 38763, b: 18764 },
        { type: "col", op: "+", a: 2349, b: 8254 },
        { type: "col", op: "+", a: 63417, b: 22480 },
        { type: "col", op: "+", a: 28456, b: 25282 },
        {
          type: "col",
          op: "+",
          a: 4307,
          b: 3559,
          story: {
            ask: true,
            q: "Lakeside High School East has 4,307 students. Lakeside High School West has 3,559 students. How many students do both schools have altogether?",
            vis: {
              kind: "bar",
              rows: [
                { l: "East", e: "🏫", segs: [{ t: "4,307", v: 4307 }] },
                { l: "West", e: "🏫", segs: [{ t: "3,559", v: 3559 }] },
              ],
              total: { t: "? students" },
            },
            ans: "Both schools have {} students altogether.",
          },
        },
        {
          type: "col",
          op: "+",
          a: 11285,
          b: 7825,
          story: {
            ask: true,
            q: "In a week, 7,825 tourists visited a temple. In the next week 11,285 tourists visited it. How many tourists visited the temple in the two weeks?",
            vis: {
              kind: "bar",
              rows: [
                { l: "Week 1", e: "🛕", segs: [{ t: "7,825", v: 7825 }] },
                { l: "Week 2", e: "🛕", segs: [{ t: "11,285", v: 11285 }] },
              ],
              total: { t: "? tourists" },
            },
            ans: "{} tourists visited the temple in two weeks.",
          },
        },
      ],
    },
    {
      k: "l37",
      t: "Lesson 3-7 · On My Own",
      en: "Book pages 87–88: subtract with regrouping",
      ic: "➖",
      from: "Lesson 3-7",
      items: [
        { type: "col", op: "-", a: 7570, b: 453 },
        { type: "col", op: "-", a: 33071, b: 2893 },
        { type: "col", op: "-", a: 12050, b: 7983 },
        { type: "col", op: "-", a: 4382, b: 633 },
        { type: "col", op: "-", a: 67821, b: 7954 },
        { type: "col", op: "-", a: 172005, b: 48273 },
        { type: "col", op: "-", a: 6805, b: 4782 },
        { type: "col", op: "-", a: 87034, b: 77245 },
        {
          type: "col",
          op: "-",
          a: 42215,
          b: 41384,
          story: {
            ask: true,
            q: "A baseball league had 41,384 hits in the fall season and 42,215 hits in the spring season. How many more hits did it have in the spring?",
            vis: {
              kind: "bar",
              rows: [
                { l: "Spring", e: "⚾", segs: [{ t: "42,215", v: 42215 }] },
                {
                  l: "Fall",
                  e: "🍂",
                  segs: [
                    { t: "41,384", v: 41384 },
                    { t: "?", v: 831, q: true },
                  ],
                },
              ],
            },
            ans: "{} more hits in the spring.",
          },
        },
        {
          type: "col",
          op: "-",
          a: 39105,
          b: 35698,
          story: {
            ask: true,
            q: "A company bought a truck for $35,698. A year later it bought a second truck for $39,105. How much more did they spend on the second truck?",
            vis: {
              kind: "bar",
              rows: [
                { l: "2nd truck", e: "🚚", segs: [{ t: "$39,105", v: 39105 }] },
                {
                  l: "1st truck",
                  e: "🚚",
                  segs: [
                    { t: "$35,698", v: 35698 },
                    { t: "?", v: 3407, q: true },
                  ],
                },
              ],
            },
            ans: "They spent ${} more.",
          },
        },
        {
          type: "mc",
          q: "Julio did 22,723 − 12,644 and got 10,179. Do you agree?",
          opts: [
            "No: the answer is 10,079. He forgot that the hundreds gave 1 away (7 → 6).",
            "Yes, 10,179 is right.",
          ],
          vis: { kind: "lines", rows: ["  22,723", "− 12,644", "= 10,179 ?"] },
        },
      ],
    },
    {
      k: "x37",
      t: "Lesson 3-7 · class sheet",
      en: "School sheet: differences and word problems",
      ic: "📝",
      from: "Lesson 3-7 sheet",
      items: [
        { type: "col", op: "-", a: 352498, b: 154784 },
        { type: "col", op: "-", a: 986253, b: 796352 },
        { type: "col", op: "-", a: 34612, b: 17947 },
        { type: "col", op: "-", a: 75297, b: 67289 },
        {
          type: "col",
          op: "-",
          a: 78906,
          b: 14398,
          story: {
            ask: true,
            q: "Singing for Your Supper sold 78,906 tickets this year. This is 14,398 more tickets than last year. How many tickets did it sell last year?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "This year",
                  e: "🎤",
                  brace: { t: "78,906" },
                  segs: [
                    { t: "? last year", v: 64508, q: true },
                    { t: "14,398 more", v: 14398, c: 1 },
                  ],
                },
              ],
            },
            why: "This year = last year + 14,398 more. We know the whole (78,906) and one part (14,398): we subtract.",
            ans: "Singing for Your Supper sold {} tickets last year.",
          },
        },
        {
          type: "mc",
          q: "What is the difference? 17,425 − 3,680",
          opts: ["13,745", "13,865", "14,265", "14,325"],
          emoji: "🧮",
          x: "Check: 13,745 + 3,680 = 17,425 ✓",
        },
        {
          type: "col",
          op: "-",
          a: 8476,
          b: 5389,
          story: {
            ask: true,
            q: "A road trip was 8,476 miles in total. After the first part they had travelled 5,389 miles. How many miles are left?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "The trip",
                  e: "🚗",
                  brace: { t: "8,476 miles" },
                  segs: [
                    { t: "5,389 done", v: 5389 },
                    { t: "? left", v: 3087, q: true },
                  ],
                },
              ],
            },
            ans: "{} miles are left.",
          },
        },
      ],
    },
    {
      k: "hw2",
      t: "Homework 2 · Part A",
      en: "27 October 2026",
      ic: "🏠",
      from: "Homework 2",
      items: [
        { type: "col", op: "+", a: 39209, b: 1435 },
        { type: "col", op: "-", a: 8722, b: 7095 },
        { type: "col", op: "+", a: 37391, b: 85642 },
        {
          type: "col",
          op: "-",
          a: 2265,
          b: 1575,
          story: {
            ask: true,
            q: "Jack has 2,265 black and white photos and 1,575 colour photos. How many more black and white photos does he have?",
            vis: {
              kind: "bar",
              rows: [
                {
                  l: "Black & white",
                  e: "🖤",
                  segs: [{ t: "2,265", v: 2265 }],
                },
                {
                  l: "Colour",
                  e: "🌈",
                  segs: [
                    { t: "1,575", v: 1575 },
                    { t: "? more", v: 690, q: true },
                  ],
                },
              ],
            },
            ans: "He has {} more black and white photos.",
          },
        },
      ],
    },
  ],
};
