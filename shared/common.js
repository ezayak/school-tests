// Small helpers shared by every page. Use: const {esc,shuf,pick,star,lessonCard,dragTiles,voice,sideNav,frac,fracSay}=Kit; review mode: Kit.review
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
  // done: the lesson is finished on this device → a green tag on the cover with that text ("✓ Пройдено").
  // term: the school term of its booklet sheets (2, 3…) → a "Term 2" tag after "Lesson 4", as on the English page.
  // label: this card's own word instead of label ({label: "Chapter 1", n: "Review"} → "Chapter 1 Review").
  const lessonCard = (
    it,
    label,
  ) => `<a class="item${it.done ? " done" : ""}" href="${esc(it.path)}">
    <span class="cov">${it.cover ? `<img src="${esc(it.cover)}" alt="" loading="lazy">` : `<span class="ic" aria-hidden="true">${esc(it.ic || "📖")}</span>`}${it.done ? `<span class="done-tag">${esc(it.done)}</span>` : ""}</span>
    <span class="in"><span class="n">${it.label ? esc(it.label) : label} ${esc(it.n)}${it.term ? ` <span class="term">Term ${esc(it.term)}</span>` : ""}</span><span class="t">${esc(it.title)}</span><span class="w">${esc(it.en || "")}</span>
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
  // mark(w, k): extra class of a tile on the line (e.g. "ok" / "no" after a check), onPlace(w): a tile went onto the line, onChange(line, bank),
  // joined: an element (class "joined") that shows the tiles on the line joined into one word, so the child sees the Arabic letters connect}.
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
      if (opts.joined) opts.joined.textContent = line.map((w) => w.t).join("");
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
  // The device voice for one language (lang: "uk-UA", "en-US", "ar"): {ok, has(), say(text, rate), hush()}.
  // ok: the device can speak; has(): a voice of that language is installed; say() ends when the text has been said
  // (or could not be said, at most 3.5 s); punctuation is not read.
  // opt.online (Arabic): Google's online voice says it while the device is online, the device voice only offline
  // (the Arabic voice installed on the tablet does not speak); has() is then true while online. The page needs
  // <meta name="referrer" content="no-referrer">: Google refuses requests with a referrer.
  function voice(lang, opt) {
    const online = !!(opt && opt.online);
    const URL = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang.split("-")[0]}&q=`;
    let player = null;
    const ok = "speechSynthesis" in window || online;
    const re = new RegExp("^" + lang.split("-")[0], "i");
    let v = null;
    function pickVoice() {
      try {
        v = speechSynthesis.getVoices().find((x) => re.test(x.lang)) || null;
      } catch (e) {}
    }
    if ("speechSynthesis" in window) {
      pickVoice();
      try {
        speechSynthesis.addEventListener("voiceschanged", pickVoice);
      } catch (e) {
        speechSynthesis.onvoiceschanged = pickVoice;
      }
    }
    // a player that is done with: stopped and its sound let go, so the browser frees it
    function drop(p) {
      if (!p) return;
      try {
        p.onended = p.onerror = p.onplaying = null;
        p.pause();
        p.removeAttribute("src");
        p.load();
      } catch (e) {}
    }
    function hush() {
      if ("speechSynthesis" in window)
        try {
          speechSynthesis.cancel();
        } catch (e) {}
      drop(player);
      player = null;
    }
    const net = () => online && navigator.onLine;
    // the online voice: ends with the sound (at most 8 s). Each sound gets a new player and the last one is let go:
    // a phone's player that changes its sound many times a second (a game with taps) can get stuck and never play again.
    // A sound that has not started after 3 s is given up, so the next one plays.
    function sayOnline(text) {
      return new Promise((res) => {
        let done = false,
          started = false;
        const p = new Audio();
        const fin = () => {
          if (done) return;
          done = true;
          if (player === p && !started) {
            drop(p);
            player = null;
          }
          res();
        };
        try {
          drop(player);
          player = p;
          p.onended = fin;
          p.onerror = fin;
          p.onplaying = () => (started = true);
          p.src = URL + encodeURIComponent(text);
          p.playbackRate = 0.85;
          p.play().catch(fin);
        } catch (e) {
          fin();
        }
        setTimeout(() => started || fin(), 3000);
        setTimeout(fin, 8000);
      });
    }
    function say(text, rate) {
      if (net()) return sayOnline(text);
      return new Promise((res) => {
        if (!("speechSynthesis" in window)) return res();
        try {
          const u = new SpeechSynthesisUtterance(text.replace(/[.,!?:;]/g, ""));
          u.lang = lang;
          if (v) u.voice = v;
          u.rate = rate || 0.7;
          let done = false;
          const fin = () => {
            if (!done) {
              done = true;
              res();
            }
          };
          u.onend = fin;
          u.onerror = fin;
          setTimeout(fin, 3500);
          speechSynthesis.speak(u);
        } catch (e) {
          res();
        }
      });
    }
    return { ok, has: () => !!v || net(), say, hush };
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
  // A hub page in sections with a side bar to move between them (Arabic: Lessons · Tests · Homework · Reading).
  // host: the element to fill; secs: [{k, ic, t, ar, n, html}]: key, emoji, name, Arabic name (optional),
  // count on the button (optional), the section's content. The open section is remembered on this device for this page
  // and is in the URL (#tests), so a link to "index.html#tests" opens it and "index.html" opens the last one.
  // Landscape tablet: a bar on the left; phone or portrait: a row of tabs on top. Only one section: no bar.
  // opt = {open, pick}: the page keeps the open section itself (the home page, whose address holds the school and grade):
  // open = the key of the open section, a tap calls pick(key); no URL, no memory, no hashchange listener.
  // opt.href(key) (optional): the link of each button, so it can be copied (the home page: #sjas/grade-4/revision-t2).
  function sideNav(host, secs, opt) {
    const key = "snav:" + location.pathname;
    secs = secs.filter(Boolean);
    if (secs.length < 2) {
      host.innerHTML = secs.length ? secs[0].html : "";
      return;
    }
    const mem = {
      get() {
        try {
          return localStorage.getItem(key);
        } catch (e) {
          return null;
        }
      },
      set(v) {
        try {
          localStorage.setItem(key, v);
        } catch (e) {}
      },
    };
    const has = (k) => secs.some((s) => s.k === k);
    const now = () => {
      if (opt) return has(opt.open) ? opt.open : secs[0].k;
      const h = decodeURIComponent(location.hash.slice(1));
      if (has(h)) return h;
      const m = mem.get();
      return has(m) ? m : secs[0].k;
    };
    host.innerHTML = `<div class="snav-wrap"><nav class="snav" aria-label="Sections">${secs
      .map(
        (s) =>
          `<a href="${esc(opt && opt.href ? opt.href(s.k) : "#" + s.k)}" data-sec="${esc(s.k)}"><span class="si" aria-hidden="true">${esc(s.ic || "")}</span><span class="st">${esc(s.t)}${s.ar ? `<span class="sa ar" dir="rtl">${esc(s.ar)}</span>` : ""}</span>${s.n != null ? `<span class="sn">${esc(s.n)}</span>` : ""}</a>`,
      )
      .join("")}</nav><div class="snav-panel"></div></div>`;
    const panel = host.querySelector(".snav-panel");
    function show() {
      const k = now();
      if (!opt) mem.set(k);
      host
        .querySelectorAll("[data-sec]")
        .forEach((a) =>
          a.dataset.sec === k
            ? a.setAttribute("aria-current", "page")
            : a.removeAttribute("aria-current"),
        );
      panel.innerHTML = secs.find((s) => s.k === k).html;
    }
    // a tap replaces the address instead of adding to the history: the back button leaves the hub
    host.querySelectorAll("[data-sec]").forEach(
      (a) =>
        (a.onclick = (e) => {
          e.preventDefault();
          if (opt) return a.dataset.sec === now() || opt.pick(a.dataset.sec);
          history.replaceState(null, "", "#" + a.dataset.sec);
          show();
        }),
    );
    if (!opt) addEventListener("hashchange", show);
    show();
  }
  // Fractions in a text (Math): "{3/4}", a mixed number "{2 1/3}", the one to find "{?/8}" or "{[6]/8}".
  // frac() takes escaped HTML and stacks them; fracSay() gives the words for the voice ("2 and 1 third").
  const FR = /\{(?:(\d+) )?([^{}/\s]+)\/([^{}/\s]+)\}/g;
  const frac = (h) =>
    String(h).replace(
      FR,
      (_, w, n, d) =>
        `${w ? `<span class="frw">${w}</span>` : ""}<span class="fr">${[n, d].map((x) => `<span${x === "?" ? ' class="frq"' : ""}>${x}</span>`).join("")}</span>`,
    );
  const DEN = {
    2: ["half", "halves"],
    3: ["third"],
    4: ["fourth"],
    5: ["fifth"],
    6: ["sixth"],
    7: ["seventh"],
    8: ["eighth"],
    9: ["ninth"],
    10: ["tenth"],
    12: ["twelfth"],
    100: ["hundredth"],
  };
  const fracSay = (t) =>
    String(t).replace(FR, (_, w, n, d) => {
      const D = DEN[d];
      const f =
        d === "?"
          ? `${n} over what number`
          : !D
            ? `${n} over ${d}`
            : n === "?"
              ? `how many ${D[1] || D[0] + "s"}`
              : `${n} ${n === "1" ? D[0] : D[1] || D[0] + "s"}`;
      return (w ? w + " and " : "") + f;
    });
  // Review mode (the parent only): tap any page title (or an exercise's "… · 3/10" line) 6 times quickly to turn it on / off on this device.
  // Then a ✎ button writes a note about what is on screen; notes go to the sorting page on the Pi
  // (.claude/scripts/inbox/review.py) and wait on the device while it cannot be reached.
  // What is on screen is read from the page; an engine can say it better with Kit.review.item = () => "slide 4: …".
  const review = (function () {
    const ROOT = (document.currentScript?.src || "").replace(
      /shared\/common\.js.*$/,
      "",
    );
    const LOCAL = /^http:\/\/(127\.0\.0\.1|localhost)[:/]/.test(location.href);
    const SERVER = LOCAL
      ? "http://127.0.0.1:8770"
      : "https://mollers-pi.cheetah-krait.ts.net";
    const ON = "kit-review",
      QUEUE = "kit-review-queue";
    const store = {
      get(k) {
        try {
          return localStorage.getItem(k);
        } catch (e) {
          return null;
        }
      },
      set(k, v) {
        try {
          v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v);
        } catch (e) {}
      },
    };
    const queue = () => {
      try {
        return JSON.parse(store.get(QUEUE) || "[]");
      } catch (e) {
        return [];
      }
    };
    // What is on screen, read from the page (an engine can set its own Kit.review.item):
    // text the parent selected, the #part, the side-bar tab, the headings in view, the text in the middle of the screen.
    let sel = "",
      selAt = 0;
    document.addEventListener("selectionchange", () => {
      const t = String(getSelection() || "").trim();
      if (t) ((sel = t), (selAt = Date.now()));
    });
    const short = (t, n) => {
      t = String(t).replace(/\s+/g, " ").trim();
      return t.length > n ? t.slice(0, n) + "…" : t;
    };
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.bottom > 0 && r.top < innerHeight;
    };
    function onScreen() {
      const out = [];
      if (sel && Date.now() - selAt < 20000)
        out.push(`selected «${short(sel, 300)}»`);
      if (location.hash) out.push(decodeURIComponent(location.hash));
      const tab = document.querySelector('[aria-current="page"]');
      if (tab) out.push(`tab «${short(tab.innerText, 40)}»`);
      const hs = [...document.querySelectorAll("h2, h3")].filter(inView);
      if (hs.length)
        out.push(
          hs
            .slice(0, 3)
            .map((h) => `«${short(h.innerText, 60)}»`)
            .join(", "),
        );
      let el = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
      while (el && el.parentElement && el.innerText.trim().length < 20)
        el = el.parentElement;
      if (el && el !== document.body)
        out.push(`middle «${short(el.innerText, 160)}»`);
      return out.join(" · ");
    }
    const api = { item: onScreen };
    let btn = null;

    function toast(msg) {
      document.querySelectorAll(".kit-rv-toast").forEach((x) => x.remove());
      const t = document.createElement("div");
      t.className = "kit-rv-toast";
      t.textContent = msg;
      document.body.append(t);
      setTimeout(() => t.remove(), 2500);
    }
    function paint() {
      const n = queue().length;
      if (btn) btn.dataset.wait = n ? String(n) : "";
    }
    async function flush() {
      for (const note of queue()) {
        try {
          const r = await fetch(SERVER + "/api/review", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(note),
          });
          if (!r.ok && r.status !== 400) break; // 400: a broken note, dropped
        } catch (e) {
          break; // not reachable: try again later
        }
        store.set(
          QUEUE,
          JSON.stringify(queue().filter((x) => x.id !== note.id)),
        );
      }
      paint();
    }
    function write() {
      let item = "";
      try {
        item = String(api.item() || "");
      } catch (e) {}
      const d = document.createElement("dialog");
      d.className = "kit-rv-dlg";
      d.innerHTML = `<form method="dialog">
        <b>Review note</b>
        ${item ? `<div class="kit-rv-on">On screen: ${esc(item)}</div>` : ""}
        <textarea rows="5" placeholder="What is wrong, what should it be?"></textarea>
        <div class="kit-rv-row"><button value="">Cancel</button><button value="send" class="kit-rv-send">Send</button></div>
      </form>`;
      document.body.append(d);
      d.addEventListener("close", () => {
        const text = d.querySelector("textarea").value.trim();
        d.remove();
        if (d.returnValue !== "send" || !text) return;
        const note = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          page: location.href.split(/[?#]/)[0].replace(ROOT, ""),
          title:
            document.querySelector("h1")?.textContent.trim() || document.title,
          item,
          text,
        };
        store.set(QUEUE, JSON.stringify(queue().concat(note)));
        flush().then(() =>
          toast(
            queue().some((x) => x.id === note.id)
              ? "Saved here: it is sent when the Pi can be reached"
              : "Note sent ✓",
          ),
        );
      });
      d.showModal();
      d.querySelector("textarea").focus();
    }
    function show(on) {
      btn?.remove();
      btn = null;
      if (!on) return;
      btn = document.createElement("button");
      btn.className = "kit-rv-btn";
      btn.type = "button";
      btn.title = "Review note";
      btn.textContent = "✎";
      btn.onclick = write;
      document.body.append(btn);
      paint();
    }
    function toggle() {
      const on = !store.get(ON);
      store.set(ON, on ? "1" : null);
      show(on);
      toast(on ? "Review mode on" : "Review mode off");
    }

    // Tap a title 6 times, each tap within 1 s of the last (titles are drawn by the engines and redrawn,
    // so the listener is on the document). From the 3rd tap a message counts down: the parent sees it is counting.
    const TAPS = 6;
    let taps = 0,
      last = 0;
    document.addEventListener("pointerdown", (e) => {
      if (!e.isPrimary) return;
      const now = Date.now();
      if (!e.target.closest?.("h1, .qnum")) return void (taps = 0);
      taps = now - last < 1000 ? taps + 1 : 1;
      last = now;
      if (taps >= TAPS) {
        taps = 0;
        toggle();
      } else if (taps >= 3) {
        const n = TAPS - taps;
        toast(`${n} more tap${n > 1 ? "s" : ""}`);
      }
    });
    // Android: a long press opens the menu; not on a title
    document.addEventListener("contextmenu", (e) => {
      if (e.target.closest?.("h1, .qnum")) e.preventDefault();
    });
    const start = () => {
      show(!!store.get(ON));
      flush();
    };
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", start)
      : start();
    addEventListener("online", flush);
    return api;
  })();

  /* ---------- the word clipboard: words saved from a lesson's word pop-up for My dictations ---------- */
  // localStorage "saved-words": {lang: [{w, en, uk, …}]}; lang as in My dictations ("ar", "en-US", "fr-FR", "uk-UA"),
  // each word with its translations by language code. The maker's Paste (my-dictations/maker.js) reads it.
  const saved = (function () {
    const KEY = "saved-words";
    const all = () => {
      try {
        const o = JSON.parse(localStorage.getItem(KEY) || "{}");
        return o && typeof o === "object" && !Array.isArray(o) ? o : {};
      } catch (e) {
        return {};
      }
    };
    const put = (o) => {
      try {
        localStorage.setItem(KEY, JSON.stringify(o));
        return true;
      } catch (e) {
        return false;
      }
    };
    const list = (lang) => (Array.isArray(all()[lang]) ? all()[lang] : []);
    const has = (lang, w) => list(lang).some((x) => x.w === w);
    // tr: {en: "…", uk: "…"}; false when there is no room on the device
    function add(lang, w, tr) {
      const o = all();
      const a = Array.isArray(o[lang]) ? o[lang] : [];
      if (!a.some((x) => x.w === w)) a.push({ w, ...(tr || {}) });
      o[lang] = a;
      return put(o);
    }
    // only the words of this language
    function clear(lang) {
      const o = all();
      delete o[lang];
      put(o);
    }
    // the languages with saved words, and how many: {ar: 5}
    const counts = () =>
      Object.fromEntries(
        Object.entries(all())
          .filter(([, a]) => Array.isArray(a) && a.length)
          .map(([k, a]) => [k, a.length]),
      );
    return { list, has, add, clear, counts };
  })();

  return {
    esc,
    shuf,
    pick,
    star,
    lessonCard,
    scene,
    idiom,
    blocks,
    dragTiles,
    voice,
    sideNav,
    frac,
    fracSay,
    review,
    saved,
  };
})();
