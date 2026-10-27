// Math for the lesson engine (shared/computer-lesson.js): question types and drawings, given to the engine as window.CS_EXT.
// The page loads shared/common.js, this file, its lesson-N.js, then the engine.
// Made for a child who learns from pictures: numbers are written in place-value columns with a colour per place,
// answers are typed on a big number pad (no tablet keyboard), and 💡 Help explains one column at a time.
//
// Question types:
//   {type: "col", op: "+" | "-", a: 1234, b: 4568}            – add / subtract in columns: boxes above for the carried tens
//                                                                 (or the regrouped number), boxes below for the answer
//     + story: {q: "the word problem", vis: {kind: "bar", …}, ask: true, why: "…", ans: "They have {} students."}
//       ask: first "Add or subtract?" with the schema, then the columns
//   {type: "num", q, a: 12, pre: "3 × 4 =", post: "", vis | img | emoji, x}  – type a number
//   {type: "flower", n: 4, q}                                  – the times-table flower: n × 1 … n × 10 on the petals
// Drawings (vis):
//   bar     – bar model (schema) of a word problem: rows of parts, ? for the unknown, braces for the total
//   groups  – equal groups of things; array – rows and columns; cubes – sticks of cubes (times as many)
//   pv      – place-value chart; nline – number line for rounding; colshow – a worked example in columns
(function () {
  "use strict";
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const fmt = (n) => Number(n).toLocaleString("en-US");
  const kw = (t) => esc(t).replace(/\[([^\]]+)\]/g, '<b class="kw">$1</b>');
  // digits from the right: 4568 → [8, 6, 5, 4]
  const dr = (n) => String(n).split("").reverse().map(Number);
  const PL = [
    "ones",
    "tens",
    "hundreds",
    "thousands",
    "ten thousands",
    "hundred thousands",
    "millions",
    "ten millions",
  ];
  const PS = ["O", "T", "H", "Th", "TTh", "HTh", "M", "TM"];
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const MINUS = "−";
  const sym = (op) => (op === "+" ? "+" : MINUS);

  /* ---------- the number pad (also the computer keyboard) ---------- */
  let keyFn = null; // the pad of the question on screen
  document.addEventListener("keydown", (e) => {
    if (!keyFn || !document.contains(keyFn.el)) return;
    if (/^[0-9]$/.test(e.key)) keyFn.fn(e.key);
    else if (e.key === "Backspace" || e.key === "Delete") keyFn.fn("del");
    else if (e.key === "Enter") keyFn.fn("ok");
    else if (e.key === "ArrowLeft") keyFn.fn("left");
    else if (e.key === "ArrowRight") keyFn.fn("right");
    else return;
    e.preventDefault();
  });
  const padHTML = () =>
    `<div class="mx-pad" role="group" aria-label="Number pad">${[
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]
      .map((d) => `<button type="button" data-k="${d}">${d}</button>`)
      .join(
        "",
      )}<button type="button" data-k="del" class="del" aria-label="Delete">⌫</button><button type="button" data-k="0">0</button><button type="button" data-k="ok" class="ok" aria-label="Check">✓</button></div>`;
  function bindPad(root, fn) {
    const el = root.querySelector(".mx-pad");
    el.querySelectorAll("[data-k]").forEach(
      (b) => (b.onclick = () => fn(b.dataset.k)),
    );
    keyFn = { el, fn };
  }
  // a message under the question that is not the end of it (the engine's feedback() adds the → button)
  function note(ok, html) {
    const box = document.getElementById("fbx");
    if (box)
      box.innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><span>${html}</span></div>`;
  }

  /* ---------- columns: the numbers, the carries, the answer, worked out column by column ---------- */
  function solve(op, a, b) {
    const A = dr(a),
      B = dr(b),
      res = op === "+" ? a + b : a - b,
      R = dr(res);
    const C =
      op === "+"
        ? Math.max(A.length, B.length) + 1
        : Math.max(A.length, B.length);
    const marks = {}, // what is written in the box above a column (carry / regrouped number)
      steps = []; // one explanation per column, said by 💡 Help
    if (op === "+") {
      let c = 0;
      for (let j = 0; j < C; j++) {
        if (j >= Math.max(A.length, B.length) && !c) break;
        const parts = [A[j], B[j]].filter((x) => x !== undefined);
        if (c) parts.push(1);
        const s = (A[j] || 0) + (B[j] || 0) + c;
        let t = `${cap(PL[j])}: ${parts.join(" + ")} = ${s}.`;
        if (s >= 10 && j + 1 < C) {
          t += ` Write ${s % 10}, and carry 1 to the ${PL[j + 1]} (the box above).`;
          marks[j + 1] = 1;
        } else t += ` Write ${s}.`;
        steps.push({ j, t: c ? t.replace(/ \+ 1 =/, " + 1 (carried) =") : t });
        c = s >= 10 ? 1 : 0;
      }
    } else {
      const T = A.slice(); // the top digits, changed by regrouping
      for (let j = 0; j < C; j++) {
        const bo = B[j] || 0;
        let cur = T[j],
          t = `${cap(PL[j])}: `;
        if (cur !== A[j])
          t +=
            A[j] === 0
              ? `0 became 10, then gave 1 away: now ${cur}. `
              : `now ${cur} (it gave 1 away). `;
        if (cur < bo) {
          // take 1 from the next place that is not 0; the 0s on the way become 9
          let k = j + 1;
          while (T[k] === 0) k++;
          const one = PL[j + 1].replace(/s$/, "");
          if (k === j + 1)
            t += `${cur} is less than ${bo}: take 1 from the ${PL[k]} (1 ${one} = 10 ${PL[j]}). ${T[k]} → ${T[k] - 1}. `;
          else
            t += `${cur} is less than ${bo}. The ${PL.slice(j + 1, k).join(" and the ")} are 0: go to the ${PL[k]}. ${T[k]} → ${T[k] - 1}, and every 0 on the way → 9. `;
          T[k]--;
          marks[k] = T[k];
          for (let m = j + 1; m < k; m++) marks[m] = T[m] = 9;
          cur += 10;
          marks[j] = cur;
          t += `Write ${cur} above. ${cur} ${MINUS} ${bo} = ${cur - bo}.`;
        } else t += `${cur} ${MINUS} ${bo} = ${cur - bo}.`;
        if (j > 0 && j >= R.length) t += " A 0 in front is not written.";
        steps.push({ j, t });
      }
    }
    // the answer row, from the right, with blanks in front
    const want = Array.from({ length: C }, (_, j) =>
      j < R.length ? String(R[j]) : "",
    );
    return { A, B, R, C, res, marks, steps, want };
  }
  // the column grid; play: boxes to type in; show: a worked example (all filled in)
  function gridHTML(op, a, b, show) {
    const P = solve(op, a, b);
    const cols = (f) =>
      Array.from({ length: P.C }, (_, k) => f(P.C - 1 - k)).join(""); // left → right, j counted from the right
    const cm = (j) => (j % 3 === 0 && j > 0 ? " cm" : ""); // a comma after thousands, millions
    const box = (r, j, val) =>
      show
        ? `<span class="mx-c bx ${r} p${j}${val !== "" && val !== undefined ? " fill" : " empty"}${r === "a" ? cm(j) : ""}">${val ?? ""}</span>`
        : `<button type="button" class="mx-c bx ${r} p${j}${r === "a" ? cm(j) : ""}" data-r="${r}" data-j="${j}" aria-label="${r === "a" ? "Answer" : op === "+" ? "Carry" : "Regroup"}, ${PL[j]}"></button>`;
    const head = cols(
      (j) => `<span class="mx-c hd p${j}" title="${PL[j]}">${PS[j]}</span>`,
    );
    const carry = cols((j) =>
      op === "+" && j === 0
        ? '<span class="mx-c"></span>'
        : box("c", j, show ? (P.marks[j] ?? "") : ""),
    );
    const num = (D, crossable) =>
      cols(
        (j) =>
          `<span class="mx-c dg p${j}${D[j] === undefined ? " none" : cm(j)}${crossable && P.marks[j] !== undefined ? " cross" : ""}"${!show && D[j] !== undefined && op === "-" && crossable ? ` data-x="${j}"` : ""}>${D[j] ?? ""}</span>`,
      );
    const ans = cols((j) => box("a", j, show ? P.want[j] : ""));
    return `<div class="mx-grid${show ? " show" : ""}" style="--cols:${P.C}">
      <span class="mx-c"></span>${head}
      <span class="mx-c"></span>${carry}
      <span class="mx-c"></span>${num(P.A, show)}
      <span class="mx-c op">${sym(op)}</span>${num(P.B, false)}
      <span class="mx-line"></span>
      <span class="mx-c"></span>${ans}
    </div>`;
  }

  /* ---------- question: add / subtract in columns (and the word problem before it) ---------- */
  function itCol(it, E) {
    const st = it.story;
    let tries = 0;
    const said = (t) => E.say(t);
    if (st && st.ask) return askOp();
    work();

    // 1. the word problem and its schema: add or subtract?
    function askOp() {
      const ops = [
        ["+", "➕ Add"],
        ["-", "➖ Subtract"],
      ];
      E.app.innerHTML = `${E.hud()}<section class="card pop fc">${E.split(
        `${E.fromTag()}${E.pic({ vis: st.vis }, "pic card mx-schema")}`,
        `${E.qHTML(st.q)}
        <p class="hint">Look at the schema. Do we <b>add</b> or <b>subtract</b>?</p>
        <div class="opts two">${ops.map(([o, t]) => `<div class="optrow"><button type="button" class="opt" data-op="${o}"><span class="ot">${t}</span></button></div>`).join("")}</div>
        <div id="fbx" class="fbx"></div>`,
      )}</section>`;
      E.bindHome();
      document.getElementById("sq").onclick = () => E.sayQ(E.plain(st.q));
      E.app.querySelectorAll("[data-op]").forEach(
        (bt) =>
          (bt.onclick = () => {
            if (bt.dataset.op !== it.op) {
              tries++;
              bt.classList.add("wrong");
              bt.disabled = true;
              note(
                false,
                "Look at the schema again: what is missing, the whole or a part?",
              );
              said("Not this one. Try again!");
              return;
            }
            bt.classList.add("right");
            E.app
              .querySelectorAll("[data-op]")
              .forEach((x) => (x.disabled = true));
            const w =
              st.why ||
              (it.op === "+"
                ? "We know the parts. The whole is missing: we add."
                : "We know the whole and one part. A part is missing: we subtract.");
            note(
              true,
              `<b>${it.op === "+" ? "Add" : "Subtract"}!</b> ${kw(w)}<div class="row center"><button type="button" class="btn" id="goCol">✏️ ${fmt(it.a)} ${sym(it.op)} ${fmt(it.b)} →</button></div>`,
            );
            said(E.plain(w));
            document.getElementById("goCol").onclick = work;
          }),
      );
      E.autoSayQ(E.plain(st.q));
    }

    // 2. the columns
    function work() {
      const P = solve(it.op, it.a, it.b);
      const q = st
        ? st.q
        : it.q ||
          (it.op === "+" ? "What is the sum?" : "What is the difference?");
      const task = `${fmt(it.a)} ${sym(it.op)} ${fmt(it.b)}`;
      const main = `<div class="mx-work">${gridHTML(it.op, it.a, it.b)}${padHTML()}</div>
        <div class="mx-help" id="mxh" hidden></div>
        <div class="row center mx-acts"><button type="button" class="btn ghost" id="helpBtn">💡 Help</button><button type="button" class="btn" id="chkBtn">✓ Check</button></div>
        <div id="fbx" class="fbx"></div>`;
      E.app.innerHTML = `${E.hud()}<section class="card pop fc mx-colq">${
        st
          ? E.split(
              `${E.fromTag()}${E.pic({ vis: st.vis }, "pic card mx-schema")}<div class="q sm"><span class="say" id="qt">${kw(st.q)}</span><button type="button" class="abtn" id="sq" aria-label="Listen">🔊</button></div>`,
              main,
            )
          : `<div class="row center">${E.fromTag()}</div><div class="q"><span class="say big" id="qt">${kw(q)} <b class="mx-task">${task}</b></span><button type="button" class="abtn" id="sq" aria-label="Listen">🔊</button></div>${main}`
      }</section>`;
      E.bindHome();
      document.getElementById("sq").onclick = () =>
        E.sayQ(E.plain(q) + (st ? "" : " " + task));
      const grid = E.app.querySelector(".mx-grid");
      const bx = (r, j) => grid.querySelector(`[data-r="${r}"][data-j="${j}"]`);
      let cur = bx("a", 0),
        helped = 0;
      const focus = (el) => {
        if (!el) return;
        grid
          .querySelectorAll(".bx.on")
          .forEach((x) => x.classList.remove("on"));
        cur = el;
        el.dataset.fresh = "";
        el.classList.add("on");
      };
      focus(cur);
      grid
        .querySelectorAll(".bx")
        .forEach((el) => (el.onclick = () => focus(el)));
      // subtraction: tap a digit of the top number to cross it out (like on paper)
      grid
        .querySelectorAll("[data-x]")
        .forEach((el) => (el.onclick = () => el.classList.toggle("cross")));
      const answer = () =>
        Array.from({ length: P.C }, (_, j) => bx("a", j).textContent);
      function check() {
        const got = answer();
        if (got.every((x) => x === "")) {
          note(
            false,
            "Type the answer in the boxes under the line. Start with the ones →.",
          );
          return said("Start with the ones.");
        }
        // blanks or 0 in front are the same
        let lead = true;
        const norm = got
          .slice()
          .reverse()
          .map((x) => {
            if (lead && (x === "" || x === "0")) return "";
            lead = false;
            return x;
          })
          .reverse();
        const want = P.want;
        const bad = [];
        for (let j = 0; j < P.C; j++) {
          const el = bx("a", j);
          el.classList.remove("ok", "no");
          if (norm[j] !== want[j]) {
            bad.push(j);
            el.classList.add("no");
          } else if (want[j] !== "") el.classList.add("ok");
        }
        if (!bad.length) return win();
        tries++;
        if (tries >= 3) return lose();
        const first = Math.min(...bad);
        note(
          false,
          `Not yet. Look again at the <b>${PL[first]}</b> (the red box). ${tries === 2 ? "Tap 💡 Help if you need it." : ""}`,
        );
        said(`Not yet. Look again at the ${PL[first]}.`);
        focus(bx("a", first));
      }
      function finish(ok) {
        keyFn = null;
        grid.querySelectorAll(".bx").forEach((el) => (el.onclick = null));
        // Help and Check are done: their room goes to the answer
        E.app.querySelector(".mx-acts").remove();
        E.app.querySelector(".mx-pad").remove();
        document.getElementById("mxh").remove();
        // fill in the carries / regrouping so the child sees the whole sum
        Object.entries(P.marks).forEach(([j, v]) => {
          const el = bx("c", j);
          if (el && el.textContent !== String(v)) {
            el.textContent = v;
            el.classList.add("shown");
          }
        });
        P.want.forEach((v, j) => {
          const el = bx("a", j);
          el.textContent = v;
          el.classList.remove("no", "on");
          if (v !== "") el.classList.add("ok");
        });
        const sent = st && st.ans ? st.ans.replace("{}", fmt(P.res)) : "";
        const line = `${task} = <b>${fmt(P.res)}</b>${sent ? `<br>${kw(sent)}` : ""}`;
        E.feedback(ok, line);
        said(
          `${task} = ${fmt(P.res)}. ${E.plain(sent)}`.replace(/−/g, "minus"),
        );
      }
      function win() {
        if (!tries && !helped) E.addPts(1);
        else
          E.S.miss.push({
            vis: { kind: "colshow", op: it.op, a: it.a, b: it.b },
            right: `${task} = ${fmt(P.res)}`,
          });
        finish(true);
      }
      function lose() {
        E.S.miss.push({
          vis: { kind: "colshow", op: it.op, a: it.a, b: it.b },
          right: `${task} = ${fmt(P.res)}`,
        });
        finish(false);
      }
      // 💡 Help: the next column that is not right yet, explained
      document.getElementById("helpBtn").onclick = () => {
        helped++;
        const got = answer();
        const s =
          P.steps.find((x) => got[x.j] !== P.want[x.j]) ||
          P.steps[P.steps.length - 1];
        const h = document.getElementById("mxh");
        h.hidden = false;
        h.innerHTML = `<b>💡</b> <span>${esc(s.t)}</span>`;
        grid.querySelectorAll(".hl").forEach((x) => x.classList.remove("hl"));
        grid.querySelectorAll(`.p${s.j}`).forEach((x) => x.classList.add("hl"));
        focus(bx("a", s.j));
        said(s.t.replace(/−/g, "minus"));
      };
      document.getElementById("chkBtn").onclick = check;
      bindPad(E.app, (k) => {
        if (k === "ok") return check();
        if (!cur) return;
        const r = cur.dataset.r,
          j = +cur.dataset.j;
        if (k === "left") return focus(bx(r, j + 1) || cur);
        if (k === "right") return focus(bx(r, j - 1) || cur);
        cur.classList.remove("ok", "no");
        if (k === "del") {
          cur.textContent = "";
          return;
        }
        if (r === "a") {
          cur.textContent = k;
          focus(bx("a", j + 1) || cur); // next: the place on the left
        } else if (it.op === "+") {
          cur.textContent = k;
          focus(bx("a", j));
        } else {
          // regrouped number: up to 2 digits (12, 15 …)
          cur.textContent =
            cur.textContent.length === 1 && cur.dataset.fresh
              ? cur.textContent + k
              : k;
          cur.dataset.fresh = cur.textContent.length === 1 ? "1" : "";
        }
      });
      if (!st) E.autoSayQ(E.plain(q) + " " + task.replace(/−/g, "minus"));
    }
  }

  /* ---------- question: type a number ---------- */
  function itNum(it, E) {
    let tries = 0,
      val = "";
    const side = `${E.fromTag()}${E.hasPic(it) ? E.pic(it) : ""}`;
    const main = `${E.qHTML(it.q)}
      <div class="mx-numrow">${it.pre ? `<span class="mx-pre">${kw(it.pre)}</span>` : ""}<span class="mx-num on" id="nv" aria-live="polite"></span>${it.post ? `<span class="mx-pre">${kw(it.post)}</span>` : ""}</div>
      ${padHTML()}
      <div id="fbx" class="fbx"></div>`;
    E.app.innerHTML = `${E.hud()}<section class="card pop fc mx-numq">${E.hasPic(it) ? E.split(side, main) : `<div class="row center">${E.fromTag()}</div>${main}`}</section>`;
    E.bindHome();
    document.getElementById("sq").onclick = () => E.sayQ(E.plain(it.q));
    const nv = document.getElementById("nv");
    const want = Number(String(it.a).replace(/,/g, ""));
    const show = () => (nv.textContent = val ? fmt(val) : "");
    function done(ok) {
      keyFn = null;
      nv.textContent = fmt(want);
      nv.classList.remove("on", "no");
      nv.classList.add("ok");
      const full = `${it.pre ? it.pre + " " : ""}[${fmt(want)}]${it.post ? " " + it.post : ""}`;
      E.feedback(ok, `${kw(full)}${it.x ? `<br>${kw(it.x)}` : ""}`);
      E.say(`${E.plain(full)}. ${E.plain(it.x || "")}`);
    }
    bindPad(E.app, (k) => {
      nv.classList.remove("no");
      if (k === "del") val = val.slice(0, -1);
      else if (k === "ok") {
        if (!val) return;
        if (Number(val) === want) {
          if (!tries) E.addPts(1);
          else
            E.S.miss.push({
              img: it.img,
              vis: it.vis,
              emoji: it.emoji,
              right: `${it.q} → ${fmt(want)}`,
            });
          return done(true);
        }
        tries++;
        nv.classList.add("no");
        if (tries >= 2) {
          E.S.miss.push({
            img: it.img,
            vis: it.vis,
            emoji: it.emoji,
            right: `${it.q} → ${fmt(want)}`,
          });
          return done(false);
        }
        note(false, it.hint ? kw(it.hint) : "Not yet. Try again!");
        E.say(it.hint ? E.plain(it.hint) : "Not yet. Try again!");
        val = "";
      } else if (/^\d$/.test(k) && val.length < 9)
        val = val === "0" ? k : val + k;
      show();
    });
    E.autoSayQ(E.plain(it.q));
  }

  /* ---------- question: the times-table flower ---------- */
  const FN = 10; // petals: n × 1 … n × 10
  function itFlower(it, E) {
    const n = it.n;
    const order = Array.from({ length: FN }, (_, k) => k + 1);
    let cur = 0,
      checked = false;
    const petals = order
      .map((m, k) => {
        const ang = (360 / FN) * k;
        return `<div class="mx-pet" style="--a:${ang}deg"><div class="pin"><span class="m">${m}</span><button type="button" class="bx" data-k="${k}" aria-label="${n} times ${m}"></button></div></div>`;
      })
      .join("");
    const side = `${E.fromTag()}<div class="mx-flower" style="--fc:${it.c || "var(--accent)"}">${petals}<div class="mx-mid">${n} ×</div></div>`;
    const main = `${E.qHTML(it.q || `Fill the ${n} times flower: ${n} × the number on the petal.`)}
      <p class="hint">Tap a petal, then type. ${n} × 1, ${n} × 2 … count by ${n}s!</p>
      ${padHTML()}
      <div id="fbx" class="fbx"></div>`;
    E.app.innerHTML = `${E.hud()}<section class="card pop fc mx-flq">${E.split(side, main)}</section>`;
    E.bindHome();
    const q = E.plain(it.q || `Fill the ${n} times flower.`);
    document.getElementById("sq").onclick = () => E.sayQ(q);
    const bxs = [...E.app.querySelectorAll(".mx-flower .bx")];
    const focus = (k) => {
      bxs.forEach((b) => b.classList.remove("on"));
      cur = k;
      bxs[k].classList.add("on");
    };
    bxs.forEach((b, k) => (b.onclick = () => focus(k)));
    focus(0);
    function check() {
      if (bxs.some((b) => b.textContent === ""))
        return (
          note(false, "Fill every petal first."),
          E.say("Fill every petal first.")
        );
      let pts = 0;
      bxs.forEach((b, k) => {
        const ok = Number(b.textContent) === n * (k + 1);
        b.classList.toggle("ok", ok);
        b.classList.toggle("no", !ok);
        if (ok && !checked) pts++;
      });
      const wrong = bxs.filter((b) => b.classList.contains("no")).length;
      if (!checked) {
        E.addPts(pts);
        checked = true;
      }
      if (!wrong) {
        keyFn = null;
        E.feedback(
          true,
          `The ${n} times table: ${order.map((m) => n * m).join(", ")}`,
        );
        E.say(`The ${n} times table: ${order.map((m) => n * m).join(", ")}`);
        return;
      }
      if (bxs.some((b) => b.dataset.tried) || wrong === 0) {
        // second check: show the right numbers
        keyFn = null;
        bxs.forEach((b, k) => {
          if (b.classList.contains("no")) {
            b.textContent = n * (k + 1);
            b.classList.replace("no", "fix");
          }
        });
        E.S.miss.push({
          vis: {
            kind: "lines",
            rows: order.map((m) => `${n} × ${m} = ${n * m}`),
          },
          right: `The ${n} times table`,
        });
        E.feedback(
          false,
          `The ${n} times table: ${order.map((m) => n * m).join(", ")}`,
        );
        return;
      }
      bxs.forEach((b) => (b.dataset.tried = "1"));
      note(
        false,
        `${wrong} red petal${wrong > 1 ? "s" : ""}: try again! Tip: add ${n} to the petal before.`,
      );
      E.say("Try the red petals again.");
      focus(bxs.findIndex((b) => b.classList.contains("no")));
    }
    bindPad(E.app, (k) => {
      const b = bxs[cur];
      if (k === "ok") return check();
      if (k === "left" || k === "right")
        return focus((cur + (k === "right" ? 1 : FN - 1)) % FN);
      b.classList.remove("ok", "no");
      if (k === "del") b.textContent = b.textContent.slice(0, -1);
      else if (b.textContent.length < 3) {
        b.textContent += k;
        // two digits are enough for most petals: go on to the next one
        if (
          String(n * (cur + 1)).length === b.textContent.length &&
          cur + 1 < FN &&
          !b.dataset.tried
        )
          focus(cur + 1);
      }
    });
    E.autoSayQ(q);
  }

  /* ---------- drawings ---------- */
  const COL = ["c1", "c2", "c3", "c4"];
  // bar model: {rows: [{l, e, segs: [{t, v, q, c}], seg: {…}, times: 5, brace: {t}}], total: {t}}
  function bar(v) {
    const rows = v.rows.map((r) => ({
      ...r,
      segs: r.seg ? Array.from({ length: r.times || 1 }, () => r.seg) : r.segs,
    }));
    const tot = (r) => r.segs.reduce((a, s) => a + (s.v || 1), 0);
    const mx = Math.max(...rows.map(tot));
    const row = (r, k) =>
      `<div class="mb-row">
        <span class="mb-l">${r.e ? `<span class="e">${esc(r.e)}</span>` : ""}${esc(r.l || "")}</span>
        <div class="mb-track">
          ${r.brace ? `<div class="mb-brace${r.brace.q ? " q" : ""}" style="width:${(tot(r) / mx) * 100}%"><b>${esc(r.brace.t)}</b></div>` : ""}
          <div class="mb-bar" style="width:${(tot(r) / mx) * 100}%">${r.segs
            .map(
              (s, i) =>
                `<span class="mb-seg ${s.q ? "q" : COL[(s.c ?? k) % 4]}" style="flex:${s.v || 1}">${esc(s.t ?? "")}</span>`,
            )
            .join("")}</div>
          ${r.under ? `<div class="mb-under" style="width:${(tot(r) / mx) * 100}%">${esc(r.under)}</div>` : ""}
        </div>
      </div>`;
    return `<div class="vis-mbar${v.total ? " has-total" : ""}">
      ${v.title ? `<div class="mb-title">${esc(v.title)}</div>` : ""}
      <div class="mb-rows">${rows.map(row).join("")}${v.total ? `<div class="mb-total${v.total.q !== false ? " q" : ""}"><b>${esc(v.total.t)}</b></div>` : ""}</div>
      ${v.note ? `<small>${kw(v.note)}</small>` : ""}
    </div>`;
  }
  // equal groups: n plates of `of` things
  function groups(v) {
    return `<div class="vis-groups"><div class="gs">${Array.from(
      { length: v.n },
      () =>
        `<div class="g">${Array.from({ length: v.of }, () => `<span>${esc(v.e || "🍎")}</span>`).join("")}</div>`,
    ).join(
      "",
    )}</div>${v.cap !== "" ? `<div class="cap">${kw(v.cap || `${v.n} groups of ${v.of} = ${v.n} × ${v.of}`)}</div>` : ""}</div>`;
  }
  // array: r rows, c in each row
  function array(v) {
    const cell = v.e
      ? `<span class="e">${esc(v.e)}</span>`
      : '<span class="dot"></span>';
    return `<div class="vis-array"><div class="ar" style="--c:${v.c}">${Array.from(
      { length: v.r },
      (_, i) =>
        `<div class="arow"><span class="rl">${i + 1}</span>${Array.from({ length: v.c }, () => cell).join("")}</div>`,
    ).join(
      "",
    )}</div>${v.cap !== "" ? `<div class="cap">${kw(v.cap || `${v.r} rows of ${v.c} = ${v.r} × ${v.c}`)}</div>` : ""}</div>`;
  }
  // sticks of cubes: {rows: [{l, n, times, c}], cap}
  function cubes(v) {
    return `<div class="vis-cubes">${v.rows
      .map(
        (r, k) =>
          `<div class="cr"><span class="cl">${esc(r.l)}</span><div class="sticks">${Array.from(
            { length: r.times || 1 },
            () =>
              `<span class="stick ${COL[(r.c ?? k) % 4]}">${Array.from({ length: r.n }, () => "<i></i>").join("")}</span>`,
          ).join(
            "",
          )}</div><span class="cn">${r.n * (r.times || 1)}</span></div>`,
      )
      .join("")}${v.cap ? `<div class="cap">${kw(v.cap)}</div>` : ""}</div>`;
  }
  // place-value chart: {n, hl: [places from the right], val: true}
  function pv(v) {
    const D = dr(v.n);
    const len = Math.max(D.length, v.min || 0);
    const per = Math.ceil(len / 3);
    const names = ["Ones", "Thousands", "Millions"];
    const hl = v.hl || [];
    let head = "",
      sub = "",
      digs = "";
    for (let p = per - 1; p >= 0; p--) {
      const w = Math.min(3, len - p * 3);
      head += `<span class="pp pp${p}" style="grid-column:span ${w}">${names[p]}</span>`;
      for (let j = p * 3 + w - 1; j >= p * 3; j--) {
        sub += `<span class="ps p${j}${j % 3 === 0 ? " end" : ""}">${["O", "T", "H"][j % 3]}</span>`;
        digs += `<span class="pd p${j}${j % 3 === 0 ? " end" : ""}${hl.includes(j) ? " hl" : ""}">${D[j] ?? ""}</span>`;
      }
    }
    const vals = hl
      .map(
        (j) =>
          `<div><b class="hlb">${D[j]}</b> is in the <b>${PL[j]}</b> place: its value is <b>${fmt(D[j] * 10 ** j)}</b></div>`,
      )
      .join("");
    return `<div class="vis-pv"><div class="pvg" style="--n:${len}">${head}${sub}${digs}</div>${v.val ? `<div class="pvv">${vals}</div>` : ""}${v.cap ? `<div class="cap">${kw(v.cap)}</div>` : ""}</div>`;
  }
  // number line for rounding: {lo, hi, n} – where is n? closer to lo or to hi?
  function nline(v) {
    const pos = (x) => ((x - v.lo) / (v.hi - v.lo)) * 100;
    const mid = (v.lo + v.hi) / 2;
    const to = v.n >= mid ? v.hi : v.lo;
    return `<div class="vis-nline"><div class="nl">
      <span class="tk end" style="left:0%"><b>${fmt(v.lo)}</b></span>
      <span class="tk mid" style="left:50%"><b>${fmt(mid)}</b><small>halfway</small></span>
      <span class="tk end" style="left:100%"><b>${fmt(v.hi)}</b></span>
      <span class="pt${v.hide ? " hide" : ""}" style="left:${pos(v.n)}%"><b>${fmt(v.n)}</b></span>
      ${v.hide ? "" : `<span class="go" style="left:${Math.min(pos(v.n), pos(to))}%;width:${Math.abs(pos(to) - pos(v.n))}%"></span>`}
    </div>${v.hide ? "" : `<div class="cap">${kw(v.cap || `${fmt(v.n)} is closer to [${fmt(to)}]`)}</div>`}</div>`;
  }
  // a worked example in columns
  function colshow(v) {
    return `<div class="vis-colshow">${gridHTML(v.op, v.a, v.b, true)}${v.cap ? `<div class="cap">${kw(v.cap)}</div>` : ""}</div>`;
  }

  window.CS_EXT = {
    items: { col: itCol, num: itNum, flower: itFlower },
    pts: { flower: () => FN },
    vis: { bar, groups, array, cubes, pv, nline, colshow },
  };
})();
