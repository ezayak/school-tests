// Small helpers shared by every page. Use: const {esc,shuf,pick,star,lessonCard,dragTiles}=Kit;
window.Kit = (function () {
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const shuf = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  function star(on) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" fill="${on ? "var(--hl)" : "var(--card)"}" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  }
  // One card on a lesson hub (French, Computer, Ukrainian reading); label is "Lesson" / "Leçon" / "Текст".
  // The cover is a picture (cover), or a big emoji (ic) when the lesson has no picture.
  const lessonCard = (it, label) => `<a class="item" href="${esc(it.path)}">
    <span class="cov">${it.cover ? `<img src="${esc(it.cover)}" alt="" loading="lazy">` : `<span class="ic" aria-hidden="true">${esc(it.ic || "📖")}</span>`}</span>
    <span class="in"><span class="n">${label} ${esc(it.n)}</span><span class="t">${esc(it.title)}</span><span class="w">${esc(it.en || "")}</span>
    <span class="meta"><span>${esc(it.note || "")}</span><span class="go play-arrow">Open →</span></span></span></a>`;
  // An animated picture made of emoji (English words and idioms). v = {bg, items: [...], cap}.
  // bg: "sky" | "night" | "room" | "grass" | "stage" | "school" | "rain" | "plain".
  // Item: {e: "🐱"} or a word bubble {t: "Yes!", c: "good" | "bad"}; x, y: its middle, in % of the picture;
  // s: size in % of the picture's smaller side; r: turn (deg); f: 1 = mirror; dx, dy: how far it goes (move, go, fall, shoot), in %;
  // a: animations "name", "name:delay" or "name:delay:seconds", several with spaces ("pop:0.5 float:1").
  // Names: pop fade out move grow (once); fall float shake pulse spin puff nod jump swing wander squeeze blink wave (again and again);
  // go shoot show hide (a 3-second story that starts again: before → after). Tap the picture to start it again.
  const SC_DUR = {
    pop: 0.5,
    fade: 0.6,
    out: 0.6,
    move: 1.6,
    grow: 1.2,
    fall: 2.2,
    float: 2.4,
    shake: 0.5,
    pulse: 1.2,
    spin: 2.5,
    puff: 2.4,
    nod: 1.4,
    jump: 0.9,
    swing: 1.6,
    wander: 3.2,
    squeeze: 1.6,
    blink: 1.2,
    wave: 1.2,
  };
  const SC_ONCE = ["pop", "fade", "out", "move", "grow"];
  function scene(v) {
    const anim = (a) =>
      String(a || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((x) => {
          const [n, d = 0, t] = x.split(":");
          const once = SC_ONCE.includes(n);
          return `sc-${n} ${t || SC_DUR[n] || 3}s ${once ? "ease-out" : "ease-in-out"} ${d}s ${once ? "both" : "infinite"}`;
        })
        .join(", ");
    const item = (o) => {
      const pos = `left:${o.x ?? 50}%;top:${o.y ?? 50}%;--s:${o.s ?? (o.t != null ? 9 : 22)};${o.z ? `z-index:${o.z};` : ""}`;
      const mv = `--dx:${o.dx ?? 0};--dy:${o.dy ?? 0};--r:${o.r ?? 0}deg;--f:${o.f ? -1 : 1};${o.a ? `animation:${anim(o.a)};` : ""}`;
      return `<span class="sc-it" style="${pos}"><span class="${o.t != null ? `sc-t${o.c ? " " + o.c : ""}` : "sc-e"}" style="${mv}">${esc(o.t != null ? o.t : o.e)}</span></span>`;
    };
    return `<div class="scene sc-${esc(v.bg || "plain")}" role="img" aria-label="${esc(v.cap || "")}">${(v.items || []).map(item).join("")}${v.cap ? `<span class="sc-cap">${esc(v.cap)}</span>` : ""}<span class="sc-re" aria-hidden="true">↻</span></div>`;
  }
  // an idiom: what the words say, and what it really means (two animated pictures)
  const idiom = (v) =>
    `<div class="vis-idiom"><div class="idp lit"><b>🔤 The words say…</b>${scene(v.words)}</div><div class="idp real"><b>💡 It really means…</b>${scene(v.means)}</div></div>`;
  // sentence parts as coloured blocks (grammar): rows of [text, kind]; kind: i = independent clause, d = dependent clause,
  // c = conjunction, p = punctuation, f = fragment, x = a mistake, l = a plain label
  const BLK = {
    i: "independent clause",
    d: "dependent clause",
    c: "conjunction",
    f: "fragment",
  };
  function blocks(v) {
    const used = new Set();
    let n = 0; // the blocks pop in one after the other
    const rows = v.rows
      .map(
        (r) =>
          `<div class="blk-row">${r
            .map(([t, k]) => {
              used.add(k);
              return `<span class="blk b-${k}" style="animation-delay:${n++ * 0.2}s">${esc(t)}</span>`;
            })
            .join("")}</div>`,
      )
      .join(v.join ? `<div class="blk-join">${esc(v.join)}</div>` : "");
    const legend = Object.keys(BLK)
      .filter((k) => used.has(k))
      .map((k) => `<span class="blk b-${k} lg">${BLK[k]}</span>`)
      .join("");
    return `<div class="vis-blk">${v.title ? `<b class="blk-title">${esc(v.title)}</b>` : ""}${rows}${v.legend === false ? "" : `<div class="blk-legend">${legend}</div>`}${v.note ? `<small>${esc(v.note)}</small>` : ""}</div>`;
  }
  // Tiles moved from a bank onto a line by dragging or tapping (letters of a word, words of a sentence). Styles: drag-words.css.
  // L, B: the line and bank elements; tiles: [{t}] in bank order. opts: {cls: extra tile class, ph: line placeholder (text, or a function that returns it),
  // mark(w, k): extra class of a tile on the line (e.g. "ok" / "no" after a check), onPlace(w): a tile went onto the line, onChange(line, bank)}.
  // Returns {line, bank, use(line, bank), draw, lock, unlock}; use() switches to other arrays (one line per word). A dir="rtl" line works too.
  function dragTiles(L, B, tiles, opts = {}) {
    let line = [],
      bank = tiles.slice(),
      locked = false;
    const tile = (w, k, from) =>
      `<button type="button" class="tile ${opts.cls || ""}${from === "line" && opts.mark ? " " + opts.mark(w, k) : ""}" data-from="${from}" data-k="${k}">${esc(w.t)}</button>`;
    function draw() {
      L.innerHTML = line.length
        ? line.map((w, k) => tile(w, k, "line")).join("")
        : `<span class="ph">${esc((typeof opts.ph === "function" ? opts.ph() : opts.ph) || "")}</span>`;
      B.innerHTML = bank.map((w, k) => tile(w, k, "bank")).join("");
      if (locked) {
        L.querySelectorAll(".tile").forEach((t) => (t.disabled = true));
        return;
      }
      [...L.querySelectorAll(".tile"), ...B.querySelectorAll(".tile")].forEach(
        bind,
      );
      if (opts.onChange) opts.onChange(line, bank);
    }
    function move(from, k, to, idx) {
      const src = from === "line" ? line : bank;
      const [w] = src.splice(k, 1);
      const dst = to === "line" ? line : bank;
      if (idx != null && from === to && idx > k) idx--;
      if (idx == null || idx > dst.length) idx = dst.length;
      dst.splice(idx, 0, w);
      draw();
      if (from === "bank" && to === "line" && opts.onPlace) opts.onPlace(w);
    }
    // where a tile dropped at (x, y) goes in the line
    function insertIndex(x, y) {
      const rtl = getComputedStyle(L).direction === "rtl";
      let idx = 0;
      for (const t of L.querySelectorAll(".tile")) {
        const r = t.getBoundingClientRect();
        if (y < r.top - 4) break;
        if (
          y <= r.bottom + 4 &&
          (rtl ? x > r.right - r.width / 2 : x < r.left + r.width / 2)
        )
          break;
        idx++;
      }
      return idx;
    }
    const toggle = (from, k) =>
      from === "bank"
        ? move("bank", k, "line", null)
        : move("line", k, "bank", null);
    function bind(el) {
      el.onpointerdown = (e) => {
        if (locked) return;
        e.preventDefault();
        const from = el.dataset.from,
          k = +el.dataset.k,
          sx = e.clientX,
          sy = e.clientY,
          r = el.getBoundingClientRect(),
          ox = sx - r.left,
          oy = sy - r.top;
        let ghost = null;
        try {
          el.setPointerCapture(e.pointerId);
        } catch (_) {}
        const inLine = (ev) => {
          const lr = L.getBoundingClientRect();
          return (
            ev.clientX >= lr.left &&
            ev.clientX <= lr.right &&
            ev.clientY >= lr.top - 10 &&
            ev.clientY <= lr.bottom + 10
          );
        };
        const mv = (ev) => {
          if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 6) {
            ghost = el.cloneNode(true);
            ghost.classList.add("drag");
            ghost.style.width = r.width + "px";
            document.body.appendChild(ghost);
            el.classList.add("ghost");
          }
          if (ghost) {
            ghost.style.left = ev.clientX - ox + "px";
            ghost.style.top = ev.clientY - oy + "px";
            L.classList.toggle("over", inLine(ev));
          }
        };
        const up = (ev) => {
          removeEventListener("pointermove", mv);
          removeEventListener("pointerup", up);
          removeEventListener("pointercancel", up);
          L.classList.remove("over");
          if (!ghost) return toggle(from, k);
          ghost.remove();
          el.classList.remove("ghost");
          if (inLine(ev))
            move(from, k, "line", insertIndex(ev.clientX, ev.clientY));
          else if (from === "line") move("line", k, "bank", null);
          else draw();
        };
        // on the window, not the tile: the release still arrives if the finger leaves it
        addEventListener("pointermove", mv);
        addEventListener("pointerup", up);
        addEventListener("pointercancel", up);
      };
      el.onkeydown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle(el.dataset.from, +el.dataset.k);
        }
      };
    }
    draw();
    return {
      get line() {
        return line;
      },
      get bank() {
        return bank;
      },
      use(l, b) {
        line = l;
        bank = b;
        draw();
      },
      draw,
      lock() {
        locked = true;
        draw();
      },
      unlock() {
        locked = false;
        draw();
      },
    };
  }
  // tap an animated picture to see it again from the start
  document.addEventListener("click", (e) => {
    const s = e.target.closest && e.target.closest(".scene, .vis-blk");
    if (s && s.getAnimations)
      s.getAnimations({ subtree: true }).forEach((a) => {
        a.cancel();
        a.play();
      });
  });
  return { esc, shuf, pick, star, lessonCard, scene, idiom, blocks, dragTiles };
})();
