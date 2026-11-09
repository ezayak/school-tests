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

  // the Distributive Property: a × b = (a × p) + (a × q) with q = b − p: the two partial products, then their sum
  const distrib = (a, b, p, q0, more = {}) => {
    const q = b - p;
    const intro =
      q0 || `${fmt(a)} × ${fmt(b)} = ${fmt(a)} × (${fmt(p)} + ${fmt(q)}).`;
    const area = (cells) => ({ kind: "area", rows: [a], cols: [p, q], cells });
    return [
      {
        type: "num",
        q: `${intro} First part:`,
        pre: `${fmt(a)} × ${fmt(p)} =`,
        a: a * p,
        vis: area(["?", ""]),
        x: `${fmt(a)} × ${fmt(p)} = [${fmt(a * p)}]`,
        ...more,
      },
      {
        type: "num",
        q: `${fmt(a)} × ${fmt(b)}, second part:`,
        pre: `${fmt(a)} × ${fmt(q)} =`,
        a: a * q,
        vis: area([a * p, "?"]),
        x: `${fmt(a)} × ${fmt(q)} = [${fmt(a * q)}]`,
      },
      {
        type: "num",
        q: `Add the partial products: ${fmt(a)} × ${fmt(b)} = ?`,
        pre: `${fmt(a * p)} + ${fmt(a * q)} =`,
        a: a * b,
        vis: area([a * p, a * q]),
        x: `${fmt(a * p)} + ${fmt(a * q)} = [${fmt(a * b)}]`,
      },
    ];
  };

  // an area model with any parts: rows [60, 5] × cols [200, 30, 4]; one question per cell (filled in as you go), then the sum
  const areaQ = (rowParts, colParts, intro, more = {}) => {
    const A = rowParts.reduce((x, y) => x + y, 0),
      B = colParts.reduce((x, y) => x + y, 0);
    const cells = [];
    rowParts.forEach((r) => colParts.forEach((c) => cells.push([r, c])));
    const shown = cells.map(() => "");
    const vis = () => ({
      kind: "area",
      rows: rowParts,
      cols: colParts,
      cells: shown.slice(),
    });
    const qs = cells.map(([r, c], k) => {
      shown[k] = "?";
      const it = {
        type: "num",
        q: k
          ? `${fmt(A)} × ${fmt(B)}, next part:`
          : `${intro || `${fmt(A)} × ${fmt(B)}: break the factors by place value.`} First part:`,
        pre: `${fmt(r)} × ${fmt(c)} =`,
        a: r * c,
        vis: vis(),
        x: `${fmt(r)} × ${fmt(c)} = [${fmt(r * c)}]`,
        ...(k ? {} : more),
      };
      shown[k] = r * c;
      return it;
    });
    const ps = cells.map(([r, c]) => fmt(r * c)).join(" + ");
    qs.push({
      type: "num",
      q: `Add the partial products: ${fmt(A)} × ${fmt(B)} = ?`,
      pre: `${ps} =`,
      a: A * B,
      vis: vis(),
      x: `${ps} = [${fmt(A * B)}]`,
    });
    return qs;
  };

  // compatible numbers for division: multiples of d × 10, d × 100 … (a basic fact with zeros); the closest to n first
  const compatList = (n, d) => {
    const out = [];
    for (let sc = 1; sc <= 10 ** String(n).length; sc *= 10)
      for (let m = 1; m <= 9; m++) {
        const c = m * d * sc;
        if (c >= n / 3 && c <= n * 2 && !out.includes(c)) out.push(c);
      }
    return out.sort((a, b) => Math.abs(a - n) - Math.abs(b - n));
  };
  const compat = (n, d) => compatList(n, d)[0];
  // "Which compatible number?" then "Estimate n ÷ d"
  const estDiv = (n, d, q, post = "") => {
    const c = compat(n, d);
    const others = compatList(n, d).filter(
      (x) => x !== c && Math.abs(x - n) > Math.abs(c - n),
    );
    const near = [Math.round(n / 100) * 100, Math.round(n / 10) * 10].find(
      (x) => x !== c && x % d,
    );
    const wrong = [near, others[0]].filter((x) => x !== undefined && x !== c);
    return [
      {
        type: "mc",
        q: `${q ? q + " " : ""}Estimate ${fmt(n)} ÷ ${d}. Which number is close to ${fmt(n)} and easy to divide by ${d}?`,
        opts: [fmt(c), ...wrong.slice(0, 2).map(fmt)],
        vis: { kind: "lines", rows: [`${fmt(n)} ÷ ${d}`] },
        x: `${fmt(c)} ÷ ${d} = ${fmt(c / d)}: a basic fact with zeros. ${fmt(c)} is the [closest] such number to ${fmt(n)}.`,
      },
      {
        type: "num",
        q: `About how much is ${fmt(n)} ÷ ${d}?`,
        pre: `${fmt(c)} ÷ ${d} =`,
        a: c / d,
        post,
        vis: { kind: "lines", rows: [`${fmt(n)} → ${fmt(c)}`] },
        x: `${fmt(c)} ÷ ${d} = [${fmt(c / d)}]`,
      },
    ];
  };
  // a range for the quotient: the compatible numbers just below and just above n
  const rangeDiv = (n, d, q) => {
    const L = compatList(n, d);
    const lo = Math.max(...L.filter((x) => x <= n)),
      hi = Math.min(...L.filter((x) => x >= n));
    return [
      {
        type: "num",
        q: `${q ? q + " " : ""}${fmt(n)} ÷ ${d}: the low end of the range.`,
        pre: `${fmt(lo)} ÷ ${d} =`,
        a: lo / d,
        vis: { kind: "lines", rows: [`${fmt(lo)} < ${fmt(n)} < ${fmt(hi)}`] },
        x: `${fmt(lo)} ÷ ${d} = [${fmt(lo / d)}]`,
      },
      {
        type: "num",
        q: `${fmt(n)} ÷ ${d}: the high end of the range.`,
        pre: `${fmt(hi)} ÷ ${d} =`,
        a: hi / d,
        vis: { kind: "lines", rows: [`${fmt(lo)} < ${fmt(n)} < ${fmt(hi)}`] },
        x: `${fmt(hi)} ÷ ${d} = [${fmt(hi / d)}]. The quotient is between ${fmt(lo / d)} and ${fmt(hi / d)}.`,
      },
    ];
  };

  // partial quotients: take away d × chunk until nothing is left, then add the chunks (105 ÷ 5: 20 + 1 = 21)
  const chunksOf = (n, d) => {
    const out = [];
    let r = n;
    while (r >= d) {
      let k = 10 ** (String(Math.floor(r / d)).length - 1);
      const c = Math.floor(r / d / k) * k;
      out.push(c);
      r -= c * d;
    }
    return out;
  };
  // rem: true → a remainder is allowed (235 ÷ 8 = 29 R3): one more question asks for it
  const partialQ = (n, d, chunks, intro, rem = false) => {
    const cs = chunks || chunksOf(n, d);
    const qs = [];
    let r = n;
    const done = [];
    cs.forEach((c, k) => {
      qs.push({
        type: "num",
        q: `${k ? `${fmt(n)} ÷ ${d}, next:` : `${intro || `${fmt(n)} ÷ ${d}: take away groups of ${d}.`}`} Take away ${d} × ${fmt(c)}. What is left?`,
        pre: `${fmt(r)} − ${fmt(d * c)} =`,
        a: r - d * c,
        vis: {
          kind: "lines",
          rows: [
            `${fmt(n)} ÷ ${d}`,
            ...done,
            `${fmt(r)} − ${fmt(d * c)} (${d} × ${fmt(c)})`,
          ],
        },
        x: `${fmt(r)} − ${fmt(d * c)} = [${fmt(r - d * c)}]`,
      });
      done.push(`${fmt(r)} − ${fmt(d * c)} = ${fmt(r - d * c)} (${fmt(c)})`);
      r -= d * c;
    });
    if (rem ? r >= d : r !== 0)
      throw new Error(`partialQ ${n} ÷ ${d}: ${r} left`);
    const Q = (n - r) / d;
    qs.push({
      type: "num",
      q: `Add the partial quotients: ${fmt(n)} ÷ ${d} = ?${rem ? " (without the remainder)" : ""}`,
      pre: `${cs.map(fmt).join(" + ")} =`,
      a: Q,
      vis: { kind: "lines", rows: done },
      x: `${cs.map(fmt).join(" + ")} = [${fmt(Q)}]`,
    });
    if (rem)
      qs.push({
        type: "num",
        q: `${fmt(n)} ÷ ${d} = ${fmt(Q)} R ?. What is the remainder?`,
        pre: `${fmt(n)} ÷ ${d} = ${fmt(Q)} R`,
        a: r,
        vis: {
          kind: "lines",
          rows: [...done.slice(-1), `${fmt(Q)} × ${d} = ${fmt(Q * d)}`],
        },
        x: `${fmt(n)} − ${fmt(Q * d)} = [${r}]: less than ${d}, so it is left over.`,
      });
    return qs;
  };

  // a remainder in a story: the division, what to do with the remainder (ignore | use | up | frac), then the answer
  const L = (...rows) => ({ kind: "lines", rows });
  const HOW = {
    ignore: "Ignore the remainder",
    use: "Use the remainder as the answer",
    up: "Add one to the quotient",
    frac: "Write the remainder as a fraction",
  };
  const HOWS = Object.values(HOW);
  const ICON = {
    [HOW.ignore]: "🚫",
    [HOW.use]: "🎯",
    [HOW.up]: "➕",
    [HOW.frac]: "½",
  };
  // q: the problem; how: ignore | use | up | frac; post: the unit of the answer
  const remQ = (q, n, d, how, post) => {
    const Q = Math.floor(n / d),
      R = n % d;
    const ans = { ignore: Q, use: R, up: Q + 1 }[how];
    const why = {
      ignore: `Only ${Q} full groups: the ${R} left over don't make another one.`,
      use: `The question asks what is left over: the remainder ${R}.`,
      up: `${Q} groups are not enough: the ${R} left over need one more.`,
      frac: `The ${R} left over can be cut in ${d} equal parts: ${Q} and ${R}/${d}.`,
    }[how];
    const items = [
      {
        type: "num",
        q: `${q} First divide: ${n} ÷ ${d} = ? R ?. What is the quotient?`,
        pre: `${n} ÷ ${d} =`,
        post: "R ?",
        a: Q,
        vis: L(`${n} ÷ ${d} = ? R ?`, `${d} × ? ≤ ${n}`),
        x: `${d} × ${Q} = ${d * Q}, ${n} − ${d * Q} = ${R}: ${n} ÷ ${d} = [${Q}] R${R}.`,
      },
      {
        type: "mc",
        q: `${n} ÷ ${d} = ${Q} R${R}. What do you do with the remainder?`,
        opts: [HOW[how], ...HOWS.filter((h) => h !== HOW[how])],
        keep: HOWS,
        icons: [HOW[how], ...HOWS.filter((h) => h !== HOW[how])].map(
          (h) => ICON[h],
        ),
        vis: L(q),
        x: why,
      },
    ];
    if (how !== "frac")
      items.push({
        type: "num",
        q: `So what is the answer? ${q}`,
        a: ans,
        post,
        vis: L(`${n} ÷ ${d} = ${Q} R${R}`),
        x: `${why} [${ans}] ${post}.`,
      });
    else
      items.push({
        type: "mc",
        q: `So what is the answer? ${q}`,
        opts: [`${Q} ${R}/${d} ${post}`, `${Q} ${post}`, `${Q + 1} ${post}`],
        vis: L(`${n} ÷ ${d} = ${Q} R${R}`),
        x: why,
      });
    return items;
  };

  // factors and primes
  const factors = (n) =>
    Array.from({ length: n }, (_, k) => k + 1).filter((k) => n % k === 0);
  const factorPairs = (n) =>
    factors(n)
      .filter((k) => k * k <= n)
      .map((k) => [k, n / k]);
  const isPrime = (n) => factors(n).length === 2;
  // "What are all the factor pairs of 14?" (choose all); wrong pairs are near misses (3 × 5 for 14)
  const pairsQ = (n, q, more = {}) => {
    const ok = factorPairs(n).map(([a, b]) => `${a} × ${b}`);
    const no = [];
    for (let k = 2; k <= 9 && no.length < 2; k++) {
      const m = Math.round(n / k);
      if (n % k && m > 1 && k <= m && !no.includes(`${k} × ${m}`))
        no.push(`${k} × ${m}`);
    }
    return {
      type: "multi",
      q: q || `What are all the factor pairs of ${n}? Choose all.`,
      opts: [
        ...ok.map((t) => ({ t, ok: true, emoji: "✖️" })),
        ...no.map((t) => ({ t, emoji: "✖️" })),
      ],
      ...more,
    };
  };

  // "Is 15 prime or composite?"
  const primeQ = (n, q, more = {}) => {
    const p = isPrime(n);
    const ps = factorPairs(n).map(([a, b]) => `${a} × ${b}`);
    return {
      type: "mc",
      q: q || `Is ${n} prime or composite?`,
      opts: p ? ["Prime", "Composite"] : ["Composite", "Prime"],
      keep: ["Prime", "Composite"],
      icons: p ? ["1️⃣", "🔢"] : ["🔢", "1️⃣"],
      two: true,
      vis: { kind: "lines", rows: [`${n} = ? × ?`] },
      x: p
        ? `${n} = ${ps[0]} only: one factor pair, [prime].`
        : `${n} = ${ps.join(" = ")}: more than one factor pair, [composite].`,
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
    distrib,
    areaQ,
    compat,
    compatList,
    estDiv,
    rangeDiv,
    chunksOf,
    partialQ,
    remQ,
    factors,
    factorPairs,
    isPrime,
    pairsQ,
    primeQ,
    moreBar,
    timesBar,
    partBar,
    howBar,
    sumBar,
    prob,
  };
})();
