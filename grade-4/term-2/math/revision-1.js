// Math · Grade 4 · Term 2 · Mid-term revision (Math Quest): Lessons 4-3, 4-4, 5-1, 5-2 and 14-2.
// A Quest for shared/quest.js (format at the top of that file). Its card is in games.js (Grade 4 · Term 2 · Mid-term exam).
// Source: the parent's note for Mid-term 2 (2026-11-24): « Lessons: 4-3, 4-4, 5-1, 5-2 and 14-2 », with the school files
// 20261116-L_4-3.pdf, 20261116-L_4-4.pdf, 20261119-L_5-1.pdf, 20261116-L_14-2.pdf (the teacher's keys of On My Own) and
// 20261116-Extra_Practice_-_L14-2.pdf (class sheet, no key);
// added 2026-11-25: 20261125-L_5-2.pdf (the key of 5-2 On My Own) and the class sheet 20261125-L5-2.pdf (no key). No new exercises: the questions are the lessons' own
// (grade-4/math/unit-4/lesson-4-3.js, lesson-4-4.js, unit-5/lesson-5-1.js, lesson-5-2.js, unit-14/lesson-14-2.js:
// Be Curious, Learn, Work Together, On My Own, Practice Book, the Extra Practice sheet), their pictures by path.
// Answers: the keys of 4-3, 4-4, 5-1, 5-2 and 14-2 (they agree with the lessons); the 5-2 class sheet and the Extra Practice sheet have no key (worked out).
// Changed to fit the Quest: typed numbers became A B C D answers (the right one and the likely mistakes: multiplied instead of divided,
// subtracted, one off); « choose all the factor pairs » became « which list has all the pairs »; « choose all » became one right answer.
// The bar diagrams, arrays and angles are drawn here in SVG, as in the lessons. Left out: the open answers (What do you notice?,
// Reflect, « write a word problem for 35 ÷ 5 ») and the drawing tasks (14-2 On My Own 7–9, 12, Extra Practice 3).

const fmt = (n) => n.toLocaleString("en-US");
const TF = ["True", "False"];
const YN = ["Yes", "No"];
const PIC = (u, l, n) => `../../math/unit-${u}/img/lesson-${l}/${n}.jpg`;

/* ---------- drawings (320 × 180) ---------- */
const T = (x, y, t, c = "lbl", more = "") =>
  `<text class="${c}" x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central"${more}>${t}</text>`;
const box = (x, y, w, h, t, q) =>
  `<rect class="${q ? "f-hl" : "f-card"}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3" stroke="#1B2440" stroke-width="2"/>` +
  T(x + w / 2, y + h / 2, t, q ? "lbl-big" : "lbl");
const label = (y, t) =>
  T(48, y, t, "lbl", t.length > 9 ? ' style="font-size:10px"' : "");
// a brace over or under a bar from x1 to x2 at y (up = the ticks point down)
const brace = (x1, x2, y, t, q, up) => {
  const d = up ? 6 : -6;
  return (
    `<path d="M${x1} ${y + d}V${y}H${x2}V${y + d}" class="st-ink" stroke-width="2"/>` +
    T((x1 + x2) / 2, y - (up ? 12 : -12), t, q ? "lbl-ke" : "lbl-big")
  );
};
const X0 = 95,
  W = 210;
// lb has n times as many as la: la known, lb unknown (?)
const timesBar = (la, a, lb, n) => {
  const w = W / Math.max(n, 2);
  return (
    label(45, la) +
    box(X0, 30, w, 30, fmt(a)) +
    label(115, lb) +
    Array.from({ length: n }, (_, i) =>
      box(X0 + i * w, 100, w, 30, fmt(a)),
    ).join("") +
    brace(X0, X0 + n * w, 142, "?", true, false)
  );
};
// lb (the total) is n times as many as la: la unknown
const partBar = (lb, total, n, la) => {
  const w = W / n;
  return (
    brace(X0, X0 + W, 36, fmt(total), false, true) +
    label(60, lb) +
    Array.from({ length: n }, (_, i) =>
      box(X0 + i * w, 45, w, 30, "?", true),
    ).join("") +
    label(130, la) +
    box(X0, 115, w, 30, "?", true)
  );
};
// how many times as many is big than small?
const howBar = (lb, big, la, small) =>
  brace(X0, X0 + W, 36, "? times", true, true) +
  label(60, lb) +
  box(X0, 45, W, 30, fmt(big)) +
  label(130, la) +
  box(X0, 115, Math.max(30, (W * small) / big), 30, fmt(small));
// lines of big text: equations, numbers (a long line gets smaller, to stay in the 300 px of the picture)
const lines = (...rows) =>
  rows
    .map((r, i) =>
      T(
        160,
        90 + (i - (rows.length - 1) / 2) * 34,
        r,
        "lbl-big",
        ` style="font-size:${Math.min(24, Math.floor(560 / r.length))}px"`,
      ),
    )
    .join("");
// r rows of c things
const array = (r, c, e) => {
  const s = Math.min(280 / c, 160 / r);
  let o = "";
  for (let i = 0; i < r; i++)
    for (let j = 0; j < c; j++)
      o += `<text class="emo" x="${160 + (j - (c - 1) / 2) * s}" y="${90 + (i - (r - 1) / 2) * s}" font-size="${s * 0.8}" text-anchor="middle" dominant-baseline="central">${e}</text>`;
  return o;
};
// an angle of deg degrees: one ray at `from` degrees (0 = right, counterclockwise); circle: the whole turn, dashed
const angle = (deg, from = 0, circle = false, v = [160, 92], R = 72) => {
  const pt = (d, r = R) => [
    v[0] + r * Math.cos((d * Math.PI) / 180),
    v[1] - r * Math.sin((d * Math.PI) / 180),
  ];
  const [ax, ay] = pt(from),
    [bx, by] = pt(from + deg);
  const ray = (x, y) =>
    `<line x1="${v[0]}" y1="${v[1]}" x2="${x}" y2="${y}" class="st-ink" stroke-width="4" stroke-linecap="round"/>`;
  let mark;
  if (deg === 90) {
    const [px, py] = pt(from, 16),
      [qx, qy] = pt(from + 90, 16);
    mark = `<path d="M${px} ${py}L${px + qx - v[0]} ${py + qy - v[1]}L${qx} ${qy}" class="st-ke" stroke-width="3"/>`;
  } else {
    const [px, py] = pt(from, 24),
      [qx, qy] = pt(from + deg, 24);
    mark = `<path d="M${px} ${py}A24 24 0 ${deg > 180 ? 1 : 0} 0 ${qx} ${qy}" class="st-ke" stroke-width="3"/>`;
  }
  return (
    (circle
      ? `<circle cx="${v[0]}" cy="${v[1]}" r="${R * 0.75}" class="st-pe" stroke-width="2" stroke-dasharray="5 5"/>`
      : "") +
    ray(ax, ay) +
    ray(bx, by) +
    mark +
    `<circle cx="${v[0]}" cy="${v[1]}" r="5" class="f-ink"/>`
  );
};

/* ---------- questions ---------- */
// a number answer: the right one first, then up to 3 wrong ones (the likely mistakes); tpl: "#" is the number ("$#", "# pages")
const numQ = (l, q, a, wrong, svg, x, tpl = "#") => {
  const o = [a];
  for (const w of wrong)
    if (w > 0 && Number.isInteger(w) && !o.includes(w) && o.length < 4)
      o.push(w);
  return { l, svg, q, o: o.map((n) => tpl.replace("#", fmt(n))), x };
};
// the small amount: total is n times as many as ? → total ÷ n (mistakes: multiplied, subtracted, one off)
const divQ = (l, q, total, n, svg, x, tpl) => {
  if (total % n) throw new Error(`${total} ÷ ${n}`);
  const a = total / n;
  return numQ(
    l,
    q,
    a,
    [total * n, total - n, a + 1, a - 1],
    svg,
    x || `${total} ÷ ${n} = ${a}, so ${total} = ${n} × ${a}.`,
    tpl,
  );
};
// the big amount: n times as many as a → n × a (mistakes: added, one group more or less)
const mulQ = (l, q, a, n, svg, x, tpl) =>
  numQ(
    l,
    q,
    n * a,
    [n + a, (n + 1) * a, (n - 1) * a],
    svg,
    x || `${n} × ${a} = ${n * a}.`,
    tpl,
  );
// how many times as many? big ÷ small (mistakes: subtracted, one off)
const howQ = (l, q, big, small, svg, x, tpl = "# times") => {
  if (big % small) throw new Error(`${big} ÷ ${small}`);
  const a = big / small;
  return numQ(
    l,
    q,
    a,
    [big - small, a + 1, a - 1],
    svg,
    x || `${big} ÷ ${small} = ${a}, so ${big} = ${a} × ${small}.`,
    tpl,
  );
};
const tf = (l, q, a, svg, x, o = TF) => ({
  l,
  svg,
  q,
  o,
  c: a ? 0 : 1,
  k: 1,
  x,
});

// factors
const factorPairs = (n) => {
  const p = [];
  for (let a = 1; a * a <= n; a++) if (n % a === 0) p.push([a, n / a]);
  return p;
};
const isPrime = (n) => n > 1 && factorPairs(n).length === 1;
const pairText = (p) => p.map(([a, b]) => `${a} × ${b}`).join(", ");
// near misses: k × (n / k rounded) where k is not a factor
const nearMiss = (n) => {
  const no = [];
  for (let k = 2; k <= 9 && no.length < 2; k++) {
    const m = Math.round(n / k);
    if (n % k && m > 1 && k <= m) no.push([k, m]);
  }
  return no;
};
// "which list has all the factor pairs?" (the lesson's « choose all the factor pairs »)
const pairsQ = (l, n, q) => {
  const p = factorPairs(n),
    [m1, m2] = nearMiss(n);
  const wrong =
    p.length > 1
      ? [p.slice(0, -1), [...p.slice(0, -1), m1], [...p, m2 || m1]]
      : [[...p, m1], [...p, m2 || m1], [[1, n], m1, m2 || m1].slice(0, 2)];
  const o = [pairText(p)];
  for (const w of wrong.map(pairText)) if (!o.includes(w)) o.push(w);
  return {
    l,
    svg: lines(`${n} = ? × ?`),
    q: q || `Which list has all the factor pairs of ${n}?`,
    o: o.slice(0, 3),
    x: `${n} = ${p.map(([a, b]) => `${a} × ${b}`).join(" = ")}.${p.length === 1 ? " Only 1 and itself." : ""}`,
  };
};
// "is n prime or composite?"
const primeQ = (l, n) => {
  const p = factorPairs(n),
    pr = isPrime(n);
  return {
    l,
    svg: lines(`${n} = ? × ?`),
    q: `Is ${n} prime or composite?`,
    o: ["Prime", "Composite"],
    c: pr ? 0 : 1,
    k: 1,
    x: pr
      ? `${n} = 1 × ${n} only: one factor pair, so ${n} is prime.`
      : `${n} = ${pairText(p).replace(/, /g, " = ")}: more than one factor pair, so ${n} is composite.`,
  };
};
// "is k a factor of n?" (equal rows)
const rowsTF = (l, q, n, k, x) =>
  tf(
    l,
    q,
    n % k === 0,
    lines(`${k} × ? = ${n}`),
    x ||
      (n % k === 0
        ? `${n} = ${k} × ${n / k}: ${k} is a factor of ${n}.`
        : `${k} is not a factor of ${n}: ${k} × ${Math.floor(n / k)} = ${k * Math.floor(n / k)}, ${k} × ${Math.floor(n / k) + 1} = ${k * (Math.floor(n / k) + 1)}.`),
    YN,
  );

// angles
const KINDS = ["Acute", "Right", "Obtuse"];
const kind = (d) => (d < 90 ? "Acute" : d === 90 ? "Right" : "Obtuse");
const WHY = {
  Acute: "less than a right angle (less than ¼ of a whole circle)",
  Right: "exactly ¼ of a whole circle, a square corner",
  Obtuse: "greater than a right angle (more than ¼ of a circle)",
};
const classQ = (q, deg, from, x) => ({
  l: "14-2",
  svg: angle(deg, from),
  q,
  o: KINDS,
  c: KINDS.indexOf(kind(deg)),
  k: 1,
  x:
    x ||
    `The turn from one ray to the other is ${WHY[kind(deg)]}: ${kind(deg).toLowerCase()}.`,
});
const ROT = [
  "Less than ¼ of a whole circle",
  "Equal to ¼ of a whole circle",
  "More than ¼ of a whole circle",
];
const rotQ = (q, deg, from = 0) => ({
  l: "14-2",
  svg: angle(deg, from, true),
  q,
  o: ROT,
  c: deg < 90 ? 0 : deg === 90 ? 1 : 2,
  k: 1,
  x: `It is ${kind(deg).toLowerCase()}: ${ROT[deg < 90 ? 0 : deg === 90 ? 1 : 2].toLowerCase()}.`,
});

window.QUEST = {
  key: "g4math-t2-mid",
  hub: "../../math/index.html",
  eyebrow: "Grade 4 Math · Mid-term 2 revision",
  title: ["Math", "Quest"],
  imgDir: "../../math/unit-4/img/lesson-4-3",
  cover: "learn-bar",
  chips: [
    ["Times as many", "pe"],
    ["Divide to compare", "ke"],
    ["Factors", "cool"],
    ["Prime & composite", "green"],
    ["Angles", "heat"],
  ],
  lessons: [
    { n: "4-3", l: "4-3 · Times as many" },
    { n: "4-4", l: "4-4 · Divide to compare" },
    { n: "5-1", l: "5-1 · Factors" },
    { n: "5-2", l: "5-2 · Prime and composite" },
    { n: "14-2", l: "14-2 · Angles" },
  ],
  mc: [
    /* ===== Lesson 4-3 · Solve comparison problems using multiplication ===== */
    mulQ(
      "4-3",
      "Penelope strikes out 3 times as many batters as Madison. Madison strikes out 5. How many does Penelope strike out?",
      5,
      3,
      timesBar("Madison", 5, "Penelope", 3),
      "3 × 5 = 15. Many answers are right in the book: 3 times any number.",
      "# batters",
    ),
    divQ(
      "4-3",
      "Penelope strikes out 21 batters. She strikes out 3 times as many batters as Madison. How many batters does Madison strike out?",
      21,
      3,
      partBar("Penelope", 21, 3, "Madison"),
      "21 = 3 × 7: Madison strikes out 7 batters.",
      "# batters",
    ),
    howQ(
      "4-3",
      "Ty has 32 coins. Dan has 8 coins. How many times as many coins does Ty have than Dan?",
      32,
      8,
      howBar("Ty", 32, "Dan", 8),
      "32 = 4 × 8: Ty has 4 times as many coins.",
    ),
    howQ(
      "4-3",
      "56 is ? times as much as 7.",
      56,
      7,
      howBar("", 56, "", 7),
      "56 = 8 × 7.",
      "#",
    ),
    divQ(
      "4-3",
      "35 is 7 times as many as ?.",
      35,
      7,
      partBar("", 35, 7, ""),
      "35 = 7 × 5.",
      "#",
    ),
    divQ(
      "4-3",
      "24 is 8 times as many as ?.",
      24,
      8,
      partBar("", 24, 8, ""),
      "24 = 8 × 3.",
      "#",
    ),
    howQ(
      "4-3",
      "45 is ? times as much as 9.",
      45,
      9,
      howBar("", 45, "", 9),
      "45 = 5 × 9.",
      "#",
    ),
    mulQ(
      "4-3",
      "Marie read 20 pages last week. She read 2 times as many pages this week. How many pages did she read this week?",
      20,
      2,
      timesBar("Last week", 20, "This week", 2),
      "2 × 20 = 40 pages.",
      "# pages",
    ),
    howQ(
      "4-3",
      "A tomato plant is 48 inches tall. A pepper plant is 8 inches tall. How many times as tall is the tomato plant?",
      48,
      8,
      howBar("Tomato 🍅", 48, "Pepper 🫑", 8),
      "48 = 6 × 8: 6 times as tall.",
      "# times as tall",
    ),
    divQ(
      "4-3",
      "Dana saved $63. Dana saved 7 times as much as Julie. How much did Julie save?",
      63,
      7,
      partBar("Dana", 63, 7, "Julie"),
      "63 = 7 × 9: Julie saved $9.",
      "$#",
    ),
    divQ(
      "4-3",
      "Wilani has 12 nickels. Wilani has 6 times as many nickels as Brenda. How many nickels does Brenda have?",
      12,
      6,
      partBar("Wilani", 12, 6, "Brenda"),
      "12 = 6 × 2: Brenda has 2 nickels.",
      "# nickels",
    ),
    numQ(
      "4-3",
      "Wilani has 12 nickels and Brenda has 2 nickels. A nickel is 5¢. What is the value of all their coins?",
      (12 + 2) * 5,
      [12 + 2, 12 * 5, (12 + 2) * 10],
      lines("12 + 2 = 14 nickels", "14 × 5¢ = ?"),
      "14 × 5¢ = 70¢ (Wilani 60¢ + Brenda 10¢).",
      "#¢",
    ),
    {
      l: "4-3",
      e: "🏃 ⏱️",
      q: "Perry ran 5 times as many minutes as Louis. How many minutes could they have run?",
      o: [
        "Louis 10, Perry 50",
        "Louis 5, Perry 10",
        "Louis 20, Perry 4",
        "Louis 6, Perry 11",
      ],
      x: "50 = 5 × 10. Perry's number is the big one: 5 times Louis's.",
    },
    howQ(
      "4-3",
      "A welder used 4 meters of metal rod last week and 32 meters this week. How many times as many meters did the welder use this week?",
      32,
      4,
      howBar("This week", 32, "Last week", 4),
      "? × 4 = 32: 8 times as many.",
    ),
    divQ(
      "4-3",
      "There are 12 birds in the apple tree. This is 4 times as many birds as in the cherry tree. How many birds are in the cherry tree?",
      12,
      4,
      partBar("Apple tree", 12, 4, "Cherry tree"),
      "4 × 3 = 12: 3 birds.",
      "# birds",
    ),
    divQ(
      "4-3",
      "Vela practiced piano 12 hours. That is 4 times as long as Marina. How many hours did Marina practice?",
      12,
      4,
      partBar("Vela", 12, 4, "Marina"),
      "4 × 3 = 12: Marina practiced 3 hours.",
      "# hours",
    ),
    mulQ(
      "4-3",
      "Rian practiced 2 times as long as Marina (3 hours). How many hours did Rian practice?",
      3,
      2,
      timesBar("Marina", 3, "Rian", 2),
      "2 × 3 = 6 hours.",
      "# hours",
    ),
    howQ(
      "4-3",
      "Vela practiced 12 hours, Rian 6 hours. How many times as long did Vela practice as Rian?",
      12,
      6,
      howBar("Vela", 12, "Rian", 6),
      "12 = 2 × 6: Vela practiced 2 times as long as Rian.",
      "# times as long",
    ),
    {
      l: "4-3",
      svg: timesBar("Lot", 3, "Garage", 5),
      q: "There are 3 cars in a parking lot. There are 5 times as many cars in a parking garage. Which equation shows the problem?",
      o: ["3 × 5 = c", "5 × b = 3", "3 × b = 5", "3 + 5 = c"],
      x: "5 bars of 3 cars: 3 × 5 = c.",
    },
    mulQ(
      "4-3",
      "3 cars in the lot, 5 times as many in the garage. How many cars are in the parking garage?",
      3,
      5,
      timesBar("Lot", 3, "Garage", 5),
      "3 × 5 = 15 cars.",
      "# cars",
    ),
    mulQ(
      "4-3",
      "Marcy studied 4 hours last week. She studies 4 times as many hours this week. How many hours does Marcy study this week?",
      4,
      4,
      timesBar("Last week", 4, "This week", 4),
      "4 × 4 = 16 hours.",
      "# hours",
    ),
    mulQ(
      "4-3",
      "One piece of fabric is 8 feet long. A second piece is 4 times as long. How long is the second piece?",
      8,
      4,
      timesBar("First", 8, "Second", 4),
      "4 × 8 = 32 feet.",
      "# feet",
    ),
    tf(
      "4-3",
      "Jackie has 9 stamps. Kevin has 36 stamps. Kevin says he has 5 times as many stamps as Jackie. Is Kevin correct?",
      false,
      howBar("Kevin", 36, "Jackie", 9),
      "36 = 4 × 9. Kevin has 4 times as many, not 5 (5 × 9 = 45).",
      YN,
    ),
    mulQ(
      "4-3",
      "Erin picked 8 flowers. Jason picked 5 times as many flowers as Erin. How many flowers did Jason pick?",
      8,
      5,
      timesBar("Erin", 8, "Jason", 5),
      "5 × 8 = 40 flowers.",
      "# flowers",
    ),

    /* ===== Lesson 4-4 · Solve comparison problems using division ===== */
    {
      l: "4-4",
      p: PIC(4, "4-4", "curious"),
      q: "How many pairs of gloves cost the same as the coat?",
      o: ["5 pairs", "4 pairs", "6 pairs", "1 pair"],
      x: "Count them: 5 pairs. The coat costs 5 times as much as a pair of gloves.",
    },
    divQ(
      "4-4",
      "A winter coat costs $50. It costs 5 times as much as a pair of gloves. How much does a pair of gloves cost?",
      50,
      5,
      partBar("Coat 🧥", 50, 5, "Gloves 🧤"),
      "50 ÷ 5 = 10: the gloves cost $10.",
      "$#",
    ),
    howQ(
      "4-4",
      "An apple costs 36¢. A banana costs 12¢. How many times as much does the apple cost?",
      36,
      12,
      howBar("Apple 🍎", 36, "Banana 🍌", 12),
      "36 ÷ 12 = 3: 3 times as much.",
      "# times as much",
    ),
    divQ(
      "4-4",
      "24 is 8 times as much as ?.",
      24,
      8,
      partBar("", 24, 8, ""),
      "24 ÷ 8 = 3.",
      "#",
    ),
    howQ(
      "4-4",
      "20 is ? times as much as 5.",
      20,
      5,
      howBar("", 20, "", 5),
      "20 ÷ 5 = 4.",
      "#",
    ),
    howQ(
      "4-4",
      "18 is ? times as much as 6.",
      18,
      6,
      howBar("", 18, "", 6),
      "18 ÷ 6 = 3.",
      "#",
    ),
    divQ(
      "4-4",
      "16 is 4 times as much as ?.",
      16,
      4,
      partBar("", 16, 4, ""),
      "16 ÷ 4 = 4.",
      "#",
    ),
    howQ(
      "4-4",
      "A green string is 48 inches long. A red string is 8 inches long. How many times as long is the green string?",
      48,
      8,
      howBar("Green", 48, "Red", 8),
      "48 ÷ 8 = 6: 6 times as long.",
      "# times as long",
    ),
    divQ(
      "4-4",
      "Ellie has 50 blue blocks. She has 5 times as many blue blocks as white blocks. How many white blocks does she have?",
      50,
      5,
      partBar("Blue", 50, 5, "White"),
      "50 ÷ 5 = 10 white blocks.",
      "# white blocks",
    ),
    {
      l: "4-4",
      svg: partBar("Charlie", 36, 4, "Sister"),
      q: "Charlie read 36 pages, 4 times as many pages as his sister. Which equation shows the problem?",
      o: ["36 ÷ 4 = ?", "4 × 36 = ?", "36 − 4 = ?", "? ÷ 4 = 36"],
      x: "Charlie's 36 pages are 4 equal parts: 36 ÷ 4 = 9 (or 4 × ? = 36).",
    },
    {
      l: "4-4",
      svg: partBar("Charlie", 36, 4, "Sister"),
      q: "Charlie read 36 pages, 4 times as many pages as his sister. Which multiplication equation shows the problem?",
      o: ["4 × ? = 36", "4 × 36 = ?", "36 + 4 = ?", "? ÷ 4 = 36"],
      x: "4 times the sister's pages make 36: 4 × ? = 36, ? = 9.",
    },
    tf(
      "4-4",
      "Michael scored 80 points. His score is 4 times as much as Alicia's. Michael thinks Alicia scored 320 points. Is he right?",
      false,
      partBar("Michael", 80, 4, "Alicia"),
      "Michael multiplied (4 × 80 = 320). His score is the big one, so he should divide: 80 ÷ 4 = 20.",
      ["Yes, he is right", "No, he is not"],
    ),
    divQ(
      "4-4",
      "Michael scored 80 points, 4 times as much as Alicia. How many points did Alicia score?",
      80,
      4,
      partBar("Michael", 80, 4, "Alicia"),
      "80 ÷ 4 = 20 points.",
      "# points",
    ),
    divQ(
      "4-4",
      "A garden is 3 times as long as it is wide. The length is 9 feet. How wide is the garden?",
      9,
      3,
      partBar("Length", 9, 3, "Width"),
      "9 ÷ 3 = 3 feet.",
      "# feet",
    ),
    numQ(
      "4-4",
      "John ran 18 laps. That is twice as far as Mika and Sabrina together. Sabrina ran 5 laps. How many laps did Mika run?",
      18 / 2 - 5,
      [18 / 2, 18 - 5, 18 / 2 + 5],
      partBar("John", 18, 2, "Mika + Sabrina"),
      "18 ÷ 2 = 9 laps together. 9 − 5 = 4 laps for Mika.",
      "# laps",
    ),
    divQ(
      "4-4",
      "The airport is 5 times farther from Cory's home than the library. The airport is 30 miles away. How far is the library?",
      30,
      5,
      partBar("Airport ✈️", 30, 5, "Library 📚"),
      "30 ÷ 5 = 6 miles.",
      "# miles",
    ),
    {
      l: "4-4",
      svg: partBar("", 36, 9, ""),
      q: "36 is 9 times as much as ?. Which division equation is right?",
      o: ["36 ÷ 9 = 4", "36 ÷ 9 = 6", "36 ÷ 9 = 3", "36 ÷ 9 = 9"],
      x: "9 × 4 = 36, so 36 ÷ 9 = 4.",
    },
    {
      l: "4-4",
      svg: partBar("", 48, 6, ""),
      q: "48 feet is 6 times as long as ?. Which division equation is right?",
      o: ["48 ÷ 6 = 8", "48 ÷ 6 = 6", "48 ÷ 6 = 12", "48 ÷ 6 = 4"],
      x: "6 × 8 = 48, so 48 ÷ 6 = 8.",
    },
    divQ(
      "4-4",
      "Peta cuts a string 32 inches long to make a necklace. A necklace is 4 times longer than a bracelet. How long is a bracelet?",
      32,
      4,
      partBar("Necklace", 32, 4, "Bracelet"),
      "32 ÷ 4 = 8 inches.",
      "# inches",
    ),
    divQ(
      "4-4",
      "A food drive fills 27 boxes. This is 3 times as many boxes as last year. How many boxes did they fill last year?",
      27,
      3,
      partBar("This year", 27, 3, "Last year"),
      "27 ÷ 3 = 9 boxes.",
      "# boxes",
    ),
    howQ(
      "4-4",
      "Kai'noa uses 6 cups of flour and 2 cups of sugar. How many times more flour does he use than sugar?",
      6,
      2,
      howBar("Flour", 6, "Sugar", 2),
      "6 ÷ 2 = 3 times more.",
      "# times more",
    ),
    divQ(
      "4-4",
      "Suzanna bakes 45 muffins. This is 5 times the number the original recipe makes. How many muffins does the original recipe make?",
      45,
      5,
      partBar("Suzanna", 45, 5, "Recipe"),
      "45 ÷ 5 = 9 muffins.",
      "# muffins",
    ),

    /* ===== Lesson 5-1 · Understand factors of a number ===== */
    {
      l: "5-1",
      p: PIC(5, "5-1", "curious"),
      q: "How many tickets are in each row?",
      o: ["6 tickets", "5 tickets", "3 tickets", "12 tickets"],
      x: "Every row has 6 tickets: 6 = 1 × 6 = 2 × 3.",
    },
    divQ(
      "5-1",
      "18 stickers in 3 equal rows. How many in each row?",
      18,
      3,
      array(3, 6, "⭐"),
      "18 = 3 × 6.",
      "#",
    ),
    divQ(
      "5-1",
      "18 stickers in 2 equal rows. How many in each row?",
      18,
      2,
      array(2, 9, "⭐"),
      "18 = 2 × 9.",
      "#",
    ),
    pairsQ(
      "5-1",
      18,
      "How can Rachel arrange 18 stickers? Which list has all the factor pairs of 18?",
    ),
    pairsQ("5-1", 48),
    numQ(
      "5-1",
      "How many factor pairs does 48 have?",
      factorPairs(48).length,
      [4, 6, 10],
      lines("1 × 48   2 × 24   3 × 16", "4 × 12   6 × 8"),
      "1 × 48, 2 × 24, 3 × 16, 4 × 12, 6 × 8: 5 pairs.",
      "# pairs",
    ),
    ...[14, 65, 23, 64, 32, 100].map((n) => pairsQ("5-1", n)),
    {
      l: "5-1",
      e: "💐 🏺",
      q: "Adrian puts 12 flowers in vases, the same number in each, and can use up to 6 vases. Which way works?",
      o: ["4 vases of 3", "5 vases of 2", "4 vases of 4", "7 vases of 2"],
      x: "4 × 3 = 12. (3 vases of 4 and 6 vases of 2 work too.)",
    },
    {
      l: "5-1",
      e: "📚 🗄️",
      q: "Setsuko puts 36 books on up to 3 shelves, the same number on each. Which way works?",
      o: [
        "3 shelves of 12",
        "3 shelves of 11",
        "2 shelves of 16",
        "4 shelves of 9",
      ],
      x: "3 × 12 = 36. (1 shelf of 36 and 2 shelves of 18 work too; 4 shelves are too many.)",
    },
    pairsQ(
      "5-1",
      24,
      "24 trophies in equal rows. Which list has all the factor pairs of 24?",
    ),
    rowsTF(
      "5-1",
      "Finn used 84 nails for 7 shelves. Could he use 12 nails for each shelf?",
      84,
      7,
      "7 × 12 = 84: yes, 12 nails for each shelf.",
    ),
    {
      l: "5-1",
      e: "🚗 🚗 🚗",
      q: "Kiara has 30 toy cars: 1 row of 30, 2 rows of 15, 3 rows of 10, 5 rows of 6. Which other arrangement could she show?",
      o: ["6 rows of 5", "4 rows of 7", "7 rows of 4", "8 rows of 4"],
      x: "Turn the factors around: 6 rows of 5, 10 rows of 3, 15 rows of 2, 30 rows of 1.",
    },
    rowsTF("5-1", "Can Ahmet plant 11 bulbs in 3 equal rows?", 11, 3),
    {
      l: "5-1",
      svg: lines("3 pairs", "5 factors"),
      q: "Which number less than 20 has 3 factor pairs but only 5 factors?",
      o: ["16", "12", "18", "9"],
      x: "16 = 1 × 16 = 2 × 8 = 4 × 4. The factors 1, 2, 4, 8, 16: the 4 is used twice in 4 × 4.",
    },
    ...[8, 45, 50, 55, 71].map((n) => pairsQ("5-1", n)),
    pairsQ(
      "5-1",
      32,
      "Angela puts 32 pictures in equal rows. Which list has all the factor pairs of 32?",
    ),
    {
      l: "5-1",
      e: "🖼️ 🗄️",
      q: "Milo puts 20 photos on up to 4 shelves, the same number on each. Which way works?",
      o: [
        "4 shelves of 5",
        "3 shelves of 7",
        "4 shelves of 4",
        "5 shelves of 4",
      ],
      x: "4 × 5 = 20. (1 shelf of 20 and 2 shelves of 10 work too; 5 shelves are too many.)",
    },
    rowsTF(
      "5-1",
      "Jenine says she can put 17 boxes in equal rows of 4. Is she right?",
      17,
      4,
    ),

    /* ===== Lesson 5-2 · Understand prime and composite numbers ===== */
    {
      l: "5-2",
      p: PIC(5, "5-2", "curious"),
      q: "Which number of balloons can be tied in equal bunches of 2 or more (not just one bunch)?",
      o: ["9 balloons", "2 balloons", "5 balloons"],
      x: "9 = 3 × 3: 3 bunches of 3. (8 = 2 × 4 works too.) 2 and 5 stay in one bunch.",
    },
    numQ(
      "5-2",
      "12 basketballs in equal rows. In how many different ways?",
      factorPairs(12).length * 2,
      [3, 4, 2],
      lines("1 × 12   2 × 6   3 × 4", "12 × 1   6 × 2   4 × 3"),
      "3 factor pairs, each turned around: 6 ways.",
      "# ways",
    ),
    numQ(
      "5-2",
      "17 soccer balls in equal rows. In how many different ways?",
      2,
      [1, 3, 4],
      array(1, 17, "⚽"),
      "Only 1 row of 17 or 17 rows of 1: 2 ways.",
      "# ways",
    ),
    primeQ("5-2", 12),
    primeQ("5-2", 17),
    {
      l: "5-2",
      svg: lines("8 · 19 · 33 · 45"),
      q: "Which of these numbers is prime?",
      o: ["19", "8", "33", "45"],
      x: "19 = 1 × 19 only. 8 = 2 × 4, 33 = 3 × 11, 45 = 5 × 9.",
    },
    {
      l: "5-2",
      svg: lines("33 · 45 · 67"),
      q: "Which of these numbers is prime?",
      o: ["67", "33", "45"],
      x: "67 = 1 × 67 only. 33 = 3 × 11, 45 = 5 × 9.",
    },
    ...[3, 24, 15, 31, 87, 2].map((n) => primeQ("5-2", n)),
    tf(
      "5-2",
      "All even numbers greater than 2 are composite.",
      true,
      lines("4 = 2 × 2", "6 = 2 × 3", "8 = 2 × 4"),
      "They all have the factor 2: 4 = 2 × 2, 6 = 2 × 3 …",
    ),
    tf(
      "5-2",
      "1 is a prime number.",
      false,
      lines("1 = 1 × 1"),
      "1 has only one factor. A prime number has two: 1 and itself.",
    ),
    tf(
      "5-2",
      "All odd numbers are prime.",
      false,
      lines("9 = 3 × 3", "15 = 3 × 5"),
      "9 is odd and composite: 9 = 3 × 3.",
    ),
    tf(
      "5-2",
      "All prime numbers are odd.",
      false,
      lines("2 = 1 × 2"),
      "2 is prime and even.",
    ),
    {
      l: "5-2",
      svg: lines("51 · 53 · 55 · 57"),
      q: "Which number greater than 50 is prime?",
      o: ["53", "51", "55", "57"],
      x: "53 = 1 × 53 only. 51 = 3 × 17, 55 = 5 × 11, 57 = 3 × 19.",
    },
    {
      l: "5-2",
      svg: lines("76 · 79 · 83 · 89"),
      q: "Which number greater than 75 is composite?",
      o: ["76", "79", "83", "89"],
      x: "76 = 2 × 38: more than one factor pair. 79, 83 and 89 are prime.",
    },
    tf(
      "5-2",
      "Scott says he can put 71 marbles in equal groups in more than 2 ways. Do you agree?",
      false,
      lines("71 = 1 × 71"),
      "71 is prime: only 1 group of 71 or 71 groups of 1.",
      ["Yes, I agree", "No, I don't"],
    ),
    {
      l: "5-2",
      p: PIC(5, "5-2", "buttons"),
      q: "Armando's round buttons are in 3 rows. How many round buttons are there?",
      o: ["15", "23", "17", "3"],
      x: "3 rows of 5: 15 round buttons.",
    },
    {
      l: "5-2",
      p: PIC(5, "5-2", "buttons"),
      q: "Armando has 23 square, 15 round and 17 triangle buttons. Which type can he put in equal groups of 2 or more?",
      o: ["Round buttons (15)", "Square buttons (23)", "Triangle buttons (17)"],
      x: "15 = 3 × 5 is composite. 23 and 17 are prime: only 1 group.",
    },
    ...[35, 73, 39, 51].map((n) => primeQ("5-2", n)),
    tf(
      "5-2",
      "Odd numbers cannot be composite.",
      false,
      lines("15 = 3 × 5"),
      "15 is odd and composite: 15 = 3 × 5.",
    ),
    tf(
      "5-2",
      "All even numbers are composite.",
      false,
      lines("2 = 1 × 2"),
      "2 is even and prime.",
    ),
    {
      l: "5-2",
      svg: lines("81 · 83 · 85 · 87"),
      q: "Which number between 80 and 90 is prime?",
      o: ["83", "81", "85", "87"],
      x: "83 = 1 × 83 only. 81 = 9 × 9, 85 = 5 × 17, 87 = 3 × 29. (89 is prime too.)",
    },
    {
      l: "5-2",
      svg: lines("101 · 111 · 121 · 133"),
      q: "Which number between 100 and 150 is prime?",
      o: ["101", "111", "121", "133"],
      x: "101 = 1 × 101 only. 111 = 3 × 37, 121 = 11 × 11, 133 = 7 × 19.",
    },
    {
      l: "5-2",
      svg: lines("63 = 1 × 63 = 3 × 21 = 7 × 9"),
      q: "Kevin says he can arrange 63 cards in 6 ways. Randall says 63 is prime and has only 2 ways. Who is right?",
      o: ["Kevin", "Randall"],
      k: 1,
      x: "63 is composite: 3 factor pairs, each turned around = 6 ways.",
    },
    tf(
      "5-2",
      "Jasmine thinks 41 beads can be put in equal groups in more than 2 ways. Is she right?",
      false,
      lines("41 = 1 × 41"),
      "41 is prime: only 1 × 41 and 41 × 1.",
      ["Yes, she is", "No, she is not"],
    ),
    // the class sheet 20261125-L5-2.pdf (no key)
    ...[41, 42, 22, 37].map((n) => primeQ("5-2", n)),
    {
      l: "5-2",
      svg: lines("1 · 4 · 5 · 9"),
      q: "Which number is prime?",
      o: ["1", "4", "5", "9"],
      c: 2,
      k: 1,
      x: "5 = 1 × 5 only. 4 = 2 × 2, 9 = 3 × 3; 1 is not prime.",
    },
    {
      l: "5-2",
      svg: lines("5 · 7 · 10 · 11"),
      q: "Which number is composite?",
      o: ["5", "7", "10", "11"],
      c: 2,
      k: 1,
      x: "10 = 1 × 10 = 2 × 5. 5, 7 and 11 are prime.",
    },
    {
      l: "5-2",
      svg: lines("1 · 2 · 3 · 4"),
      q: "The smallest prime number is …",
      o: ["1", "2", "3", "4"],
      c: 1,
      k: 1,
      x: "2 = 1 × 2 only. 1 is not prime.",
    },
    {
      l: "5-2",
      svg: lines("1 · 2 · 3 · 4"),
      q: "A composite number has more than … factor pair(s).",
      o: ["1", "2", "3", "4"],
      c: 0,
      k: 1,
      x: "A prime number has 1 factor pair; a composite number has more.",
    },
    {
      l: "5-2",
      svg: lines("1 · 2 · 3 · 4"),
      q: "The smallest odd prime number is …",
      o: ["1", "2", "3", "4"],
      c: 2,
      k: 1,
      x: "3 = 1 × 3 only. 2 is even, 1 is not prime.",
    },
    {
      l: "5-2",
      svg: lines("1 · 2 · 3 · 4"),
      q: "Which number is a factor of every number?",
      o: ["1", "2", "3", "4"],
      c: 0,
      k: 1,
      x: "Every number = 1 × itself.",
    },

    /* ===== Lesson 14-2 · Classify angles ===== */
    classQ("∠ABC: what kind of angle is it?", 90, 0),
    classQ("∠PQR: what kind of angle is it?", 135, 0),
    classQ("∠LMN: what kind of angle is it?", 45, 0),
    rotQ("How can you describe the amount of rotation?", 40),
    rotQ("How can you describe the amount of rotation?", 90),
    rotQ("How can you describe the amount of rotation?", 120),
    classQ("How can you classify the angle?", 120, 25),
    classQ("How can you classify the angle?", 50, 0),
    classQ("How can you classify the angle?", 90, 270),
    classQ(
      "A robot makes a turn. Antonio draws the angle. What type of angle is it?",
      30,
      0,
    ),
    {
      l: "14-2",
      svg: `<line x1="20" y1="100" x2="300" y2="100" class="st-ink" stroke-width="4" stroke-linecap="round"/><path d="M184 100A24 24 0 0 0 136 100" class="st-ke" stroke-width="3"/><circle cx="160" cy="100" r="5" class="f-ink"/>`,
      q: "Is the angle greater than, less than, or equal to a ½ turn?",
      o: ["Less than a ½ turn", "Equal to a ½ turn", "Greater than a ½ turn"],
      c: 1,
      k: 1,
      x: "The two rays make a straight line: the turn from one to the other is ½ of a circle.",
    },
    rotQ("Which description matches the figure?", 35),
    rotQ("Which description matches the figure?", 180),
    rotQ("Which description matches the figure?", 90),
    classQ("Identify the angle.", 25, 0),
    classQ("Identify the angle.", 90, 270),
    classQ("Identify the angle.", 140, 0),
    classQ("Identify the angle.", 20, 150),
    {
      l: "14-2",
      svg: angle(40),
      q: "An acute angle measures ___ than a right angle.",
      o: ["less", "more"],
      x: "Acute: less than a right angle.",
    },
    {
      l: "14-2",
      svg: angle(90, 0, true),
      q: "A ¼ rotation forms a ___ angle.",
      o: ["right", "acute", "obtuse"],
      x: "¼ of a circle: a right angle.",
    },
    {
      l: "14-2",
      svg: angle(130),
      q: "A ___ angle measures greater than a right angle.",
      o: ["obtuse", "acute", "right"],
      x: "Greater than a right angle: obtuse.",
    },
    classQ(
      "Caroline draws an angle of ⅓ of a full turn. How can she classify it?",
      120,
      0,
      "⅓ is more than ¼ of a circle: the angle is obtuse.",
    ),
    // the Extra Practice sheet (no key: the angles are judged from the drawing, as in the lesson)
    classQ("How can you classify the angle?", 120, 50),
    classQ("How can you classify the angle?", 45, 135),
    classQ("How can you classify the angle?", 125, 25),
    classQ("How can you classify the angle?", 50, 330),
    {
      l: "14-2",
      svg:
        T(55, 22, "A", "lbl-big") +
        T(160, 22, "B", "lbl-big") +
        T(265, 22, "C", "lbl-big") +
        angle(115, 15, false, [40, 140], 60) +
        angle(30, 0, false, [140, 140], 60) +
        angle(90, 0, false, [245, 140], 60),
      q: "Which figure shows an amount of rotation greater than ¼?",
      o: ["A", "B", "C"],
      k: 1,
      x: "A is wider than a square corner: more than ¼. B is less, C is exactly ¼.",
    },
  ],
  mt: [
    {
      l: "4-3",
      t: "Match each word to its meaning",
      p: [
        ["✖️", "Times as many", "multiply: 3 times as many as 7 is 3 × 7 = 21"],
        ["❓", "Unknown", "the number we look for: ? or a letter"],
        ["🔢", "Factor", "a number we multiply: in 3 × 7, 3 and 7"],
        ["📊", "Bar diagram", "bars that show the amounts in a problem"],
      ],
    },
    {
      l: "4-4",
      t: "Match each word to its meaning",
      p: [
        ["➗", "Divide", "share into equal parts: 50 ÷ 5 = 10"],
        ["⬇️", "Times less than", "$10 is 5 times less than $50"],
        ["🟰", "Equation", "a number sentence with =, like 50 ÷ 5 = 10"],
        ["💲", "Times as much", "$50 is 5 times as much as $10"],
      ],
    },
    {
      l: "4-4",
      t: "Match each problem to its answer",
      p: [
        ["📏", "24 is 8 times as much as ?", "3"],
        ["📏", "20 is ? times as much as 5", "4"],
        ["📏", "48 is ? times as long as 8", "6"],
        ["📏", "50 is 5 times as many as ?", "10"],
      ],
    },
    {
      l: "5-1",
      t: "Match each word to its meaning",
      p: [
        ["🔢", "Factor", "a number you multiply: 3 and 6 are factors of 18"],
        ["👫", "Factor pair", "two factors that make the number: 3 × 6 = 18"],
        ["🎯", "Product", "the answer of a multiplication: 18"],
        ["⭐", "Array", "things in equal rows and columns"],
      ],
    },
    {
      l: "5-1",
      t: "Match each number to all its factor pairs",
      p: [14, 23, 32, 65].map((n) => [
        "🔢",
        String(n),
        pairText(factorPairs(n)),
      ]),
    },
    {
      l: "5-2",
      t: "Match each word to its meaning",
      p: [
        ["1️⃣", "Prime number", "exactly one factor pair: 17 = 1 × 17"],
        [
          "🧱",
          "Composite number",
          "more than one factor pair: 12 = 2 × 6 = 3 × 4",
        ],
        ["2️⃣", "Even", "ends in 0, 2, 4, 6 or 8: 2 is a factor"],
        ["🔸", "Odd", "ends in 1, 3, 5, 7 or 9"],
      ],
    },
    {
      l: "14-2",
      t: "Match each word to its meaning",
      p: [
        ["📐", "Angle", "two rays with the same endpoint"],
        ["📍", "Vertex", "the shared endpoint of the two rays"],
        ["⬛", "Right angle", "a square corner: ¼ of a whole turn"],
        ["🔺", "Acute angle", "less than a right angle"],
        ["↔️", "Obtuse angle", "greater than a right angle"],
      ],
    },
  ],
};
