// Builders for the Grade 4 Math book lessons (grade-4/math/unit-N/lesson-N-M.js): numbers in words and expanded form,
// bar diagrams for comparison problems, and the common question shapes. No page code here: it also runs in node (check.js, add.js).
// A lesson page loads it after shared/math.js and before its lesson-N-M.js. Use: const { fmt, words, expanded, timesBar, prob } = MathKit;
window.MathKit = (function () {
  const fmt = (n) => Number(n).toLocaleString("en-US");
  const digitAt = (n, j) => Math.floor(n / 10 ** j) % 10;
  const PLACE = [
    "ones",
    "tens",
    "hundreds",
    "thousands",
    "ten thousands",
    "hundred thousands",
    "millions",
    "ten millions",
    "hundred millions",
  ];
  const ONES = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const TENS = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  // 0–999 in words: "five hundred ninety-six"
  const w3 = (n) => {
    const h = Math.floor(n / 100),
      r = n % 100;
    const p = [];
    if (h) p.push(ONES[h] + " hundred");
    if (r && r < 20) p.push(ONES[r]);
    else if (r)
      p.push(TENS[Math.floor(r / 10)] + (r % 10 ? "-" + ONES[r % 10] : ""));
    return p.join(" ");
  };
  // the word form as the book writes it: "one million, five hundred seventy-six thousand, five hundred ninety-six"
  const words = (n) => {
    if (!n) return "zero";
    const per = [
      [Math.floor(n / 1e6), " million"],
      [Math.floor(n / 1e3) % 1000, " thousand"],
      [n % 1000, ""],
    ];
    return per
      .filter(([v]) => v)
      .map(([v, s]) => w3(v) + s)
      .join(", ");
  };
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  // the values of the digits that are not 0: [500000, 30000, 800, 70, 9]
  const parts = (n) =>
    [...String(n)]
      .map((d, i, a) => Number(d) * 10 ** (a.length - 1 - i))
      .filter(Boolean);
  const expanded = (n) => parts(n).map(fmt).join(" + ");
  // likely mistakes: one part 10 times too big or too small, two digits swapped
  const wrongExpanded = (n) => {
    const p = parts(n),
      out = [];
    for (let k = 0; k < p.length && out.length < 3; k++) {
      const q = p.slice();
      q[k] = k % 2 ? q[k] / 10 : q[k] * 10;
      if (
        Number.isInteger(q[k]) &&
        q[k] &&
        !q
          .slice(0, k)
          .concat(q.slice(k + 1))
          .includes(q[k])
      )
        out.push(q.map(fmt).join(" + "));
    }
    return out;
  };
  // numbers that look like n: two neighbouring digits swapped, a 0 moved
  const lookAlikes = (n) => {
    const s = String(n),
      out = new Set();
    for (let k = 0; k + 1 < s.length; k++) {
      if (s[k] === s[k + 1] || (k === 0 && s[1] === "0")) continue;
      out.add(Number(s.slice(0, k) + s[k + 1] + s[k] + s.slice(k + 2)));
    }
    out.delete(n);
    return [...out];
  };
  // "Which is the word form of 830,249?" (the right one first, then words of look-alike numbers)
  const wordMC = (n, q, more = {}) => ({
    type: "mc",
    q: q || `Which is the word form of ${fmt(n)}?`,
    opts: [
      cap(words(n)),
      ...lookAlikes(n)
        .slice(0, 2)
        .map((m) => cap(words(m))),
    ],
    vis: { kind: "pv", n },
    x: "Read each [period] and say its name: million, thousand.",
    ...more,
  });
  const expMC = (n, q, more = {}) => ({
    type: "mc",
    q: q || `Which is the expanded form of ${fmt(n)}?`,
    opts: [expanded(n), ...wrongExpanded(n).slice(0, 2)],
    vis: { kind: "pv", n },
    x: "Each digit times its [place]. Skip the 0s.",
    ...more,
  });

  // compare: "643,290 ___ 643,209" with < = >; the first different digit is yellow (numbers of the same length)
  const cmp = (a, b, more = {}) => {
    const s = a > b ? ">" : a < b ? "<" : "=";
    const la = String(a).length,
      lb = String(b).length;
    let j = -1;
    if (la === lb)
      for (let k = la - 1; k >= 0 && j < 0; k--)
        if (digitAt(a, k) !== digitAt(b, k)) j = k;
    return {
      type: "mc",
      q: `${fmt(a)} ___ ${fmt(b)}`,
      opts: [s, ...["<", ">", "="].filter((o) => o !== s)],
      keep: ["<", "=", ">"],
      vis: {
        kind: "digits",
        rows: [
          { n: a, hl: j < 0 ? [] : [j] },
          { n: b, hl: j < 0 ? [] : [j] },
        ],
      },
      x:
        s === "="
          ? "The same digit in every place."
          : la !== lb
            ? `${fmt(Math.max(a, b))} has [more digits]: it is greater.`
            : `The first different place is the [${PLACE[j]}]: ${digitAt(a, j)} ${s} ${digitAt(b, j)}.`,
      ...more,
    };
  };
  // round to a place (j = 0 ones, 1 tens, 2 hundreds …); halfway goes up
  const PLACE1 = [
    "one",
    "ten",
    "hundred",
    "thousand",
    "ten thousand",
    "hundred thousand",
    "million",
  ];
  const round = (n, j) => Math.round(n / 10 ** j) * 10 ** j;
  const roundQ = (n, j, q, more = {}) => {
    const lo = Math.floor(n / 10 ** j) * 10 ** j,
      hi = lo + 10 ** j,
      r = round(n, j);
    return {
      type: "num",
      q: q || `Round ${fmt(n)} to the nearest ${PLACE1[j]}.`,
      a: r,
      vis: { kind: "nline", lo, hi, n, hide: true },
      x:
        n === lo
          ? `It is already a whole ${PLACE1[j]}: [${fmt(r)}].`
          : `${fmt(n)} is between ${fmt(lo)} and ${fmt(hi)}. ${n - lo === hi - n ? "Halfway: round up to" : "It is closer to"} [${fmt(r)}].`,
      ...more,
    };
  };

  // front-end estimation: keep the first digit, the others become 0 (3,919 → 3,000)
  const frontEnd = (n) => {
    const p = 10 ** (String(n).length - 1);
    return Math.floor(n / p) * p;
  };
  // add or subtract in columns (shared/math.js "col"); op "+" or "-"
  const col = (a, op, b, q, more = {}) => ({
    type: "col",
    op,
    a,
    b,
    ...(q ? { q } : {}),
    ...more,
  });
  const calc = (a, op, b) => (op === "+" ? a + b : a - b);

  // partial sums: one question per place ("Add the tens: 10 + 90 ="), then the partial sums added
  const partials = (a, b) => {
    const len = Math.max(String(a).length, String(b).length);
    const sums = [];
    const qs = [];
    for (let j = 0; j < len; j++) {
      const x = digitAt(a, j) * 10 ** j,
        y = digitAt(b, j) * 10 ** j;
      sums.push(x + y);
      qs.push({
        type: "num",
        q: `${fmt(a)} + ${fmt(b)}: add the ${PLACE[j]}.`,
        pre: `${fmt(x)} + ${fmt(y)} =`,
        a: x + y,
        vis: {
          kind: "digits",
          rows: [
            { n: a, hl: [j] },
            { n: b, hl: [j] },
          ],
        },
        x: `${fmt(x)} + ${fmt(y)} = [${fmt(x + y)}]`,
      });
    }
    qs.push({
      type: "num",
      q: `Add the partial sums of ${fmt(a)} + ${fmt(b)}.`,
      pre: `${sums.map(fmt).join(" + ")} =`,
      a: a + b,
      vis: { kind: "lines", rows: sums.map(fmt) },
      x: `${sums.map(fmt).join(" + ")} = [${fmt(a + b)}]`,
    });
    return qs;
  };
  // adjust the addends: b goes up to a round number, a goes down the same (1,613 + 1,297 → 1,610 + 1,300)
  const adjust = (a, b, j = 2) => {
    const d = Math.ceil(b / 10 ** j) * 10 ** j - b;
    return {
      type: "num",
      q: `Add by adjusting: ${fmt(a)} + ${fmt(b)}`,
      pre: `${fmt(a - d)} + ${fmt(b + d)} =`,
      a: a + b,
      vis: {
        kind: "lines",
        rows: [
          `${fmt(a)} − ${d} → ${fmt(a - d)}`,
          `${fmt(b)} + ${d} → ${fmt(b + d)}`,
        ],
      },
      x: `${fmt(b)} + ${d} = ${fmt(b + d)}, ${fmt(a)} − ${d} = ${fmt(a - d)}. ${fmt(a - d)} + ${fmt(b + d)} = [${fmt(a + b)}]`,
    };
  };

  // subtract by decomposing b: 9,856 − 6,298 → − 6,000 − 200 − 90 − 8
  const decompQ = (a, b, q, more = {}) => {
    const ps = parts(b);
    let r = a;
    const steps = ps.map((p) => {
      const t = `${fmt(r)} − ${fmt(p)} = ${fmt(r - p)}`;
      r -= p;
      return t;
    });
    return {
      type: "num",
      q:
        q ||
        `${fmt(a)} − ${fmt(b)}: break ${fmt(b)} into parts and take them away.`,
      a: a - b,
      vis: {
        kind: "lines",
        rows: [`${fmt(b)} = ${ps.map(fmt).join(" + ")}`, ...steps.slice(0, 1)],
      },
      x: `${steps.join(", ")}. ${fmt(a)} − ${fmt(b)} = [${fmt(a - b)}]`,
      ...more,
    };
  };
  // subtract by adjusting: add (or take) the same to both numbers so b is round (9,856 − 6,298 → 9,858 − 6,300)
  const adjustSub = (a, b, j = 2, q, more = {}) => {
    const r = b % 10 ** j;
    const d = r <= 10 ** j / 2 ? -r : 10 ** j - r;
    const sg = (n) => (d < 0 ? `${fmt(n)} − ${-d}` : `${fmt(n)} + ${d}`);
    return {
      type: "num",
      q: q || `Subtract by adjusting: ${fmt(a)} − ${fmt(b)}`,
      pre: `${fmt(a + d)} − ${fmt(b + d)} =`,
      a: a - b,
      vis: {
        kind: "lines",
        rows: [`${sg(a)} → ${fmt(a + d)}`, `${sg(b)} → ${fmt(b + d)}`],
      },
      x: `${d < 0 ? "Take " + -d + " from" : "Add " + d + " to"} [both] numbers: ${fmt(a + d)} − ${fmt(b + d)} = [${fmt(a - b)}].`,
      ...more,
    };
  };

  // one step of a multi-step problem: the equation is shown, the answer is worked out here ("9,200 − 2,700" → 6,500)
  const value = (expr) =>
    Function(
      `return (${expr.replace(/,/g, "").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")})`,
    )();
  const step = (q, expr, post, more = {}) => {
    const a = value(expr);
    return {
      type: "num",
      q,
      pre: `${expr} =`,
      a,
      post,
      vis: { kind: "lines", rows: [expr + " = ?"] },
      x: `${expr} = [${fmt(a)}]`,
      ...more,
    };
  };

  // bar diagrams (shared/math.js "bar"); the unknown is a yellow "?"
  // lb has m more than la
  const moreBar = (la, a, lb, m) => ({
    kind: "bar",
    rows: [
      { l: la, segs: [{ t: fmt(a), v: a }] },
      {
        l: lb,
        segs: [
          { t: fmt(a), v: a },
          { t: `${m} more`, v: Math.max(m, a / 3), c: 2 },
        ],
        brace: { t: "?", q: true },
      },
    ],
  });
  // lb has n times as many as la (la known)
  const timesBar = (la, a, lb, n) => ({
    kind: "bar",
    rows: [
      { l: la, segs: [{ t: fmt(a) }] },
      { l: lb, seg: { t: fmt(a) }, times: n, brace: { t: "?", q: true } },
    ],
  });
  // lb (= total) is n times as many as la: la unknown
  const partBar = (lb, total, n, la) => ({
    kind: "bar",
    rows: [
      { l: lb, seg: { t: "?", q: true }, times: n, brace: { t: fmt(total) } },
      { l: la, segs: [{ t: "?", q: true }] },
    ],
  });
  // how many times as many is big than small?
  const howBar = (lb, big, la, small) => ({
    kind: "bar",
    rows: [
      {
        l: lb,
        segs: [{ t: fmt(big), v: big }],
        brace: { t: "? times", q: true },
      },
      { l: la, segs: [{ t: fmt(small), v: small }] },
    ],
  });
  // a total made of parts (one may be unknown): [[label, value or "?"], …]
  const sumBar = (segs, total) => ({
    kind: "bar",
    rows: [
      {
        l: "",
        segs: segs.map(([t, v], k) =>
          v === "?"
            ? { t: "?", q: true, v: 1 }
            : { t: t || fmt(v), v: 1, c: k },
        ),
        brace: total === "?" ? { t: "?", q: true } : { t: fmt(total) },
      },
    ],
  });
  // a word problem: type the answer; x = the equation with the answer in [brackets]
  const prob = (q, a, vis, post, x, more = {}) => ({
    type: "num",
    q,
    a,
    vis,
    post,
    x,
    ...more,
  });
  return {
    fmt,
    digitAt,
    PLACE,
    words,
    cap,
    parts,
    expanded,
    wrongExpanded,
    lookAlikes,
    wordMC,
    expMC,
    cmp,
    PLACE1,
    round,
    roundQ,
    frontEnd,
    col,
    calc,
    partials,
    adjust,
    decompQ,
    adjustSub,
    value,
    step,
    moreBar,
    timesBar,
    partBar,
    howBar,
    sumBar,
    prob,
  };
})();
