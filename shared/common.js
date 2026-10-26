// Small helpers shared by every page. Use: const {esc,shuf,pick,star,lessonCard}=Kit;
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
  // One card on a lesson hub (French, Computer); label is "Lesson" / "Leçon"
  const lessonCard = (it, label) => `<a class="item" href="${esc(it.path)}">
    <span class="cov"><img src="${esc(it.cover)}" alt="" loading="lazy"></span>
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
  // tap an animated picture to see it again from the start
  document.addEventListener("click", (e) => {
    const s = e.target.closest && e.target.closest(".scene, .vis-blk");
    if (s && s.getAnimations)
      s.getAnimations({ subtree: true }).forEach((a) => {
        a.cancel();
        a.play();
      });
  });
  return { esc, shuf, pick, star, lessonCard, scene, idiom, blocks };
})();
