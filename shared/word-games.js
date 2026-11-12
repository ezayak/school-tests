/* =====================================================================
   Reading games, one engine for two games: Arabic (Grade 3 and 4) and, for Catch, Ukrainian (Optima Швидкочитання).
   <body data-game="catch">: «اِلْتَقِطِ الْكَلِمَةَ» Catch the word. A word is said; chips with words fly in from
     every side; tap the chip of the word you heard (each tapped chip is read aloud). A right tap fills the bucket,
     a wrong one spills water. 3 right taps fill a bucket, then the next word is said. 10 buckets end the game:
     the time is shown and the best time of the level is kept on this device. Levels: 2–3 letters, long words.
     Data: window.GAME_WORDS = [[word, en, uk], …] (arabic-reading/game-words.js).
   <body data-game="catch" data-lang="uk">: «Ловимо фішки», the same game in Ukrainian, for reading accuracy.
     The word is shown in the bar (👀 Бачу) or only said (🔊 Чую, device voice); the other chips are mostly its look-alikes.
     Data: window.CATCH = {levels: [{k, t, sub, slow, groups: [["стра", "стри", "стро"], …]}]}: a group = words that look alike;
     the target of a bucket is any word of the level. The best time is kept per level and per way (see / hear).
   <body data-game="gaps">: «أَكْمِلِ الْجُمْلَةَ» Complete the sentence. A sentence with a missing word and 5 words
     to choose from; a clock runs for each sentence. Time up: one heart lost (3 hearts). The game ends after
     10 sentences or when the hearts are gone. A picture can explain the sentence; it can be turned off.
     Data: window.GAME_SENTENCES = [{q: "… ___ …", a, o: [4 wrong], img | ic, en, uk}, …].
   The page loads shared/common.js (Kit) and its back links (window.READING_LINKS: arabic-reading/hub.js, or the data file) first.
   ===================================================================== */
(function () {
  const { esc, shuf } = Kit;
  const app = document.getElementById("app");
  const GAME = document.body.dataset.game;
  const UK = document.body.dataset.lang === "uk";
  const V = UK ? Kit.voice("uk-UA") : Kit.voice("ar", { online: true });
  const H = /[ً-ْٰـ]/g;
  const bare = (s) => String(s).replace(H, "");
  const store = {
    get(k, d) {
      try {
        const v = localStorage.getItem(k);
        return v === null ? d : v;
      } catch (e) {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch (e) {}
    },
  };
  const say = (t) => {
    V.hush();
    return V.say(t);
  };
  const links = () =>
    `<div class="links">${(window.READING_LINKS || [])
      .map(([h, t]) => `<a class="back" href="${esc(h)}">${esc(t)}</a>`)
      .join("")}</div>`;
  const clock = (ms) => {
    const s = Math.max(0, Math.round(ms / 1000));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };
  // a time for one sentence, as on the buttons: "45 s", "1 min", "2 min"
  const secsLabel = (t) => (t >= 60 ? `${t / 60} min` : `${t} s`);
  const noVoice = () =>
    V.has()
      ? ""
      : '<p class="note">No Arabic voice and no internet right now: the word is written instead of said.</p>';

  /* ---------------- Catch the word ---------------- */
  // Ukrainian: the levels come from window.CATCH; mates.get(word) = the look-alikes of a word in its level
  const UKL = UK ? (window.CATCH || {}).levels || [] : [];
  const LEVELS = UK
    ? Object.fromEntries(UKL.map((l) => [l.k, l]))
    : {
        short: {
          t: "2–3 letters",
          ar: "كَلِمَاتٌ قَصِيرَةٌ",
          ok: (n) => n >= 2 && n <= 3,
        },
        long: {
          t: "Long words",
          ar: "كَلِمَاتٌ طَوِيلَةٌ",
          ok: (n) => n >= 5,
          slow: true,
        },
      };
  const FIRST = Object.keys(LEVELS)[0];
  const BUCKETS = 10,
    FILL = 3; // right taps to fill one bucket
  const P = UK ? "uk-catch-" : "ar-catch-"; // keys on this device
  // the texts of the start, play and end screens
  const TX = UK
    ? {
        title: '<h1 class="hero-title">Ловимо фішки</h1>',
        sub: "Знайди слово, поки воно летить",
        howto: `Подивись на слово вгорі і торкнись такої самої фішки. Будь уважним: інші фішки дуже схожі! Правильна фішка наливає воду у відерце 💧, неправильна розливає. Наповни ${BUCKETS} відерець якнайшвидше!`,
        none: "Ще немає рекорду",
        start: "▶ Почати",
        again: "Ще раз",
        quit: "Зупинити гру",
        done: (n) => `${n} відерець!`,
        rec: "Новий рекорд!",
        best: (t) => `Твій рекорд: ${t}`,
        wrong: (n) => `помилок: ${n}`,
        play: "Грати ще",
        levels: "Інший рівень",
        cheer: (r) => (r ? "Новий рекорд!" : "Молодець!"),
      }
    : {
        title:
          '<h1 class="hero-title ar" dir="rtl">اِلْتَقِطِ الْكَلِمَةَ</h1>',
        sub: "Catch the word",
        howto: `Listen to the word, then tap its chip when it flies by. A right tap fills the bucket 💧, a wrong tap spills water. Fill ${BUCKETS} buckets as fast as you can!`,
        none: "No record yet",
        start: "▶ Start · اِبْدَأْ",
        again: "Listen again",
        quit: "Stop the game",
        done: (n) => `${n} buckets!`,
        rec: "A new record! · رَقْمٌ قِيَاسِيٌّ جَدِيدٌ",
        best: (t) => `Your best: ${t}`,
        wrong: (n) => `${n} wrong ${n === 1 ? "tap" : "taps"}`,
        play: "Play again",
        levels: "Change level",
        cheer: (r) => (r ? "رَقْمٌ قِيَاسِيٌّ جَدِيدٌ" : "أَحْسَنْتَ"),
      };
  // Ukrainian: 👀 see the word in the bar, or 🔊 only hear it (needs a voice)
  const mode = () =>
    UK && V.has() && store.get(P + "mode", "see") === "hear" ? "hear" : "see";
  const bestKey = (k) => P + "best-" + k + (UK ? "-" + mode() : "");
  const letters = (w) => bare(w).replace(/^ال/, "").length;
  const BUCKET_SVG = `<svg class="ag-pail-line" viewBox="0 0 100 120" aria-hidden="true"><path d="M8 26 Q50 -14 92 26" fill="none" stroke="currentColor" stroke-width="5"/><path d="M4 26 L96 26 L84 116 L16 116 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/></svg>`;
  const levelHTML = (l) =>
    UK
      ? `<span>${esc(l.t)}</span><small>${esc(l.sub || "")}</small>`
      : `<span class="ar">${l.ar}</span><small>${l.t}</small>`;
  const modeHTML = () =>
    UK && V.has()
      ? `<div class="ag-opts-row"><div class="og"><span class="lab">Слово</span><div class="seg" role="group" aria-label="Слово"><button type="button" data-m="see" aria-pressed="${mode() === "see"}">👀 Бачу</button><button type="button" data-m="hear" aria-pressed="${mode() === "hear"}">🔊 Чую</button></div></div></div>`
      : "";

  function catchStart() {
    let lv = store.get(P + "level", FIRST);
    if (!LEVELS[lv]) lv = FIRST;
    const best = (k) => +store.get(bestKey(k), 0);
    app.innerHTML = `<section class="card pop ag-start">
      <div class="toprow">${links()}</div>
      <div class="ag-hero" aria-hidden="true"><span>🪣</span><span>💧</span><span>🐸</span></div>
      ${TX.title}
      <p class="ag-sub">${TX.sub}</p>
      <p class="howto">${TX.howto}</p>
      ${modeHTML()}<div class="ag-levels" role="group" aria-label="Level">${Object.entries(
        LEVELS,
      )
        .map(
          ([k, l]) =>
            `<button type="button" class="ag-level" data-lv="${k}" aria-pressed="${k === lv}">${levelHTML(l)}<small class="ag-rec">${best(k) ? "🏆 " + clock(best(k)) : TX.none}</small></button>`,
        )
        .join("")}</div>
      ${UK ? "" : noVoice()}
      <button class="btn big ag-go" id="go" type="button">${TX.start}</button>
    </section>`;
    app.querySelectorAll("[data-lv]").forEach(
      (b) =>
        (b.onclick = () => {
          lv = b.dataset.lv;
          store.set(P + "level", lv);
          app
            .querySelectorAll("[data-lv]")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
        }),
    );
    // another way (see / hear) has its own records: draw the screen again
    app.querySelectorAll("[data-m]").forEach(
      (b) =>
        (b.onclick = () => {
          store.set(P + "mode", b.dataset.m);
          catchStart();
        }),
    );
    app.querySelector("#go").onclick = () => catchPlay(lv);
  }

  // the words of a level: Arabic by length, Ukrainian from the look-alike groups (each word once)
  function levelWords(lv) {
    if (!UK)
      return {
        WORDS: (window.GAME_WORDS || []).filter((w) =>
          LEVELS[lv].ok(letters(w[0])),
        ),
        mates: null,
      };
    const byWord = new Map(),
      mates = new Map();
    for (const g of LEVELS[lv].groups || [])
      for (const w of g) {
        if (!byWord.has(w)) byWord.set(w, [w]);
        const m = mates.get(byWord.get(w)) || new Set();
        g.forEach((x) => x !== w && m.add(x));
        mates.set(byWord.get(w), m);
      }
    for (const [w, m] of mates)
      mates.set(
        w,
        [...m].map((x) => byWord.get(x)),
      );
    return { WORDS: [...byWord.values()], mates };
  }

  function catchPlay(lv) {
    const { WORDS, mates } = levelWords(lv);
    const see = mode() === "see";
    const order = shuf(WORDS);
    app.innerHTML = `<section class="card ag-play">
      <div class="ag-bar">
        <button type="button" class="abtn" id="quit" aria-label="${TX.quit}">←</button>
        ${!UK || V.has() ? `<button type="button" class="abtn big" id="again"><span class="e">🔊</span> ${TX.again}</button>` : ""}
        ${UK ? `<span class="ag-target${see ? " see" : ""}" id="target"></span>` : '<span class="ag-target ar" id="target" dir="rtl"></span>'}
        <span class="ag-clock">⏱ <b id="clock">0:00</b></span>
      </div>
      <div class="ag-field">
        <div class="ag-sky" id="sky"><div class="ag-cloud c1"></div><div class="ag-cloud c2"></div></div>
        <div class="ag-side">
          <div class="ag-bucket" id="bucket"><div class="ag-pail"><div class="ag-water" id="water"></div></div>${BUCKET_SVG}</div>
          <div class="ag-count"><b id="nb">0</b> / ${BUCKETS}</div>
          <div class="ag-row" id="row">${"<i></i>".repeat(BUCKETS)}</div>
        </div>
      </div>
    </section>`;
    const sky = app.querySelector("#sky"),
      bucketEl = app.querySelector("#bucket"),
      water = app.querySelector("#water"),
      targetEl = app.querySelector("#target");
    let target = null,
      k = 0,
      full = 0,
      lvl = 0,
      chips = [],
      since = 0,
      last = 0,
      t0 = 0,
      wrong = 0,
      others = 0, // chips of other words since the last chip of the target
      raf = 0,
      over = false,
      waiting = true; // between buckets: no chips are caught
    const setWater = () => {
      water.style.height = (lvl / FILL) * 100 + "%";
    };
    const nextWord = () => {
      target = order[k++ % order.length];
      targetEl.textContent = see || !V.has() ? target[0] : "";
      waiting = false;
      since = 0;
      // a burst of 3 chips from 3 different sides; the target is one of them, at a random place
      const sides = shuf([0, 1, 2, 3]),
        at = Math.floor(Math.random() * 3);
      for (let n = 0; n < 3; n++) spawn(n === at ? target : other(), sides[n]);
      others = 2 - at;
      if (!see || !UK) say(target[0]);
    };
    const againBtn = app.querySelector("#again");
    if (againBtn) againBtn.onclick = () => target && say(target[0]);
    app.querySelector("#quit").onclick = () => {
      stop();
      catchStart();
    };
    function stop() {
      over = true;
      cancelAnimationFrame(raf);
      clearInterval(tick);
      V.hush();
    }
    // a chip: the target about every third time (always when none of it is flying), else a look-alike or any word
    // the next chip: the target about every third chip, but never before 2 chips of other words
    // (so the right word is never simply the first one to come), else a look-alike or any word
    function pickWord() {
      const hasTarget = chips.some((c) => c.w === target && !c.done);
      if (others >= 2 && (!hasTarget || Math.random() < 0.34)) {
        others = 0;
        return target;
      }
      others++;
      return other();
    }
    function other() {
      // Ukrainian: mostly a look-alike of the target (стра → стри, стро)
      if (mates) {
        const near = mates.get(target) || [];
        if (near.length && Math.random() < 0.7)
          return near[Math.floor(Math.random() * near.length)];
      }
      const near = WORDS.filter(
        (w) =>
          w !== target &&
          (bare(w[0])[0] === bare(target[0])[0] ||
            letters(w[0]) === letters(target[0])),
      );
      const from = near.length > 4 && Math.random() < 0.6 ? near : WORDS;
      let w = from[Math.floor(Math.random() * from.length)];
      if (w === target) w = WORDS[(WORDS.indexOf(w) + 1) % WORDS.length];
      return w;
    }
    const COLORS = [
      "#ffe14d",
      "#9be7ff",
      "#c6dbae",
      "#f8c8dc",
      "#ffd3a5",
      "#d7c8f5",
    ];
    function spawn(word, from) {
      const W = sky.clientWidth,
        Hh = sky.clientHeight;
      const w = word || pickWord();
      const el = document.createElement("button");
      el.type = "button";
      el.className = UK ? "ag-chip" : "ag-chip ar";
      if (!UK) el.dir = "rtl";
      el.textContent = w[0];
      el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      sky.appendChild(el);
      const cw = el.offsetWidth,
        ch = el.offsetHeight;
      const speed = (LEVELS[lv].slow ? 0.13 : 0.15) * Math.max(W, 420); // px per second
      const side = from != null ? from : Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      if (side === 0) {
        x = -cw;
        y = Math.random() * (Hh - ch);
        vx = speed;
        vy = (Math.random() - 0.5) * speed * 0.5;
      } else if (side === 1) {
        x = W;
        y = Math.random() * (Hh - ch);
        vx = -speed;
        vy = (Math.random() - 0.5) * speed * 0.5;
      } else if (side === 2) {
        x = Math.random() * (W - cw);
        y = -ch;
        vx = (Math.random() - 0.5) * speed * 0.5;
        vy = speed * 0.7;
      } else {
        x = Math.random() * (W - cw);
        y = Hh;
        vx = (Math.random() - 0.5) * speed * 0.5;
        vy = -speed * 0.7;
      }
      const c = { el, w, x, y, vx, vy, cw, ch, done: false };
      el.onpointerdown = (e) => {
        e.preventDefault();
        tap(c);
      };
      chips.push(c);
    }
    function drop(cls) {
      const d = document.createElement("span");
      d.className = "ag-drop " + cls;
      d.textContent = cls === "in" ? "💧" : "💦";
      bucketEl.appendChild(d);
      setTimeout(() => d.remove(), 900);
    }
    function tap(c) {
      if (c.done || over) return;
      c.done = true;
      say(c.w[0]);
      if (waiting) {
        c.el.classList.add("gone");
        return;
      }
      if (c.w === target) {
        c.el.classList.add("ok");
        lvl++;
        drop("in");
        setWater();
        if (lvl >= FILL) bucketFull();
      } else {
        c.el.classList.add("no");
        wrong++;
        if (lvl > 0) {
          lvl--;
          drop("out");
          setWater();
        }
        bucketEl.classList.remove("shake");
        void bucketEl.offsetWidth;
        bucketEl.classList.add("shake");
      }
      setTimeout(() => {
        c.el.remove();
        chips = chips.filter((x) => x !== c);
      }, 450);
    }
    function bucketFull() {
      full++;
      waiting = true;
      app.querySelector("#nb").textContent = full;
      app.querySelector(`#row i:nth-child(${full})`).classList.add("on");
      bucketEl.classList.add("full");
      // the chips fly away, the bucket empties, then the next word
      chips.forEach((c) => c.el.classList.add("gone"));
      setTimeout(() => {
        chips.forEach((c) => c.el.remove());
        chips = [];
        bucketEl.classList.remove("full");
        lvl = 0;
        setWater();
        if (full >= BUCKETS) {
          stop(); // the clock and the chips stop before the end screen
          return catchEnd(lv, Date.now() - t0, wrong);
        }
        setTimeout(nextWord, 500);
      }, 1300);
    }
    function frame(now) {
      if (over) return;
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      since += dt;
      const W = sky.clientWidth,
        Hh = sky.clientHeight;
      if (!waiting && since > 0.9 && chips.length < 7) {
        since = 0;
        spawn();
      }
      for (const c of chips) {
        if (c.done) continue;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.el.style.transform = `translate(${c.x}px, ${c.y}px)`;
        if (
          c.x < -c.cw - 40 ||
          c.x > W + 40 ||
          c.y < -c.ch - 40 ||
          c.y > Hh + 40
        ) {
          c.done = true;
          c.el.remove();
        }
      }
      chips = chips.filter((c) => c.el.isConnected);
      raf = requestAnimationFrame(frame);
    }
    const tick = setInterval(() => {
      if (t0 && !over)
        app.querySelector("#clock").textContent = clock(Date.now() - t0);
    }, 250);
    setWater();
    t0 = Date.now();
    nextWord();
    raf = requestAnimationFrame(frame);
    addEventListener("pagehide", stop, { once: true });
  }

  function catchEnd(lv, ms, wrong) {
    const key = bestKey(lv),
      best = +store.get(key, 0),
      record = !best || ms < best;
    if (record) store.set(key, ms);
    app.innerHTML = `<section class="card pop ag-end">
      <div class="toprow">${links()}</div>
      <div class="ag-hero" aria-hidden="true">${record ? "<span>🏆</span>" : ""}<span>🪣</span><span>🎉</span></div>
      <h1 class="hero-title">${TX.done(BUCKETS)}</h1>
      <p class="ag-time">⏱ ${clock(ms)}</p>
      <p class="ag-sub">${record ? TX.rec : TX.best(clock(best))}</p>
      <p class="note">${esc(LEVELS[lv].t)} · ${TX.wrong(wrong)}</p>
      <div class="row" style="justify-content:center"><button class="btn big" id="again" type="button">${TX.play}</button><button class="btn ghost" id="levels" type="button">${TX.levels}</button></div>
    </section>`;
    say(TX.cheer(record));
    app.querySelector("#again").onclick = () => catchPlay(lv);
    app.querySelector("#levels").onclick = catchStart;
  }

  /* ---------------- Complete the sentence ---------------- */
  const ROUND = 10,
    HEARTS = 3,
    TIMES = [20, 30, 45, 60, 120];
  const sentHTML = (q, fill, cls) =>
    esc(q).replace(
      /_{3,}/,
      `<span class="ag-gap ${cls || ""}">${fill ? esc(fill) : ""}</span>`,
    );

  function gapsStart() {
    let secs = +store.get("ar-gaps-time", 30);
    if (!TIMES.includes(secs)) secs = 30;
    let pic = store.get("ar-gaps-pic", "1") === "1";
    app.innerHTML = `<section class="card pop ag-start">
      <div class="toprow">${links()}</div>
      <div class="ag-hero" aria-hidden="true"><span>📖</span><span>❤️</span><span>⏳</span></div>
      <h1 class="hero-title ar" dir="rtl">أَكْمِلِ الْجُمْلَةَ</h1>
      <p class="ag-sub">Complete the sentence</p>
      <p class="howto">Read the sentence and choose the missing word from 5 words. A wrong word costs a heart ❤️, and so does running out of time. Complete ${ROUND} sentences with your ${HEARTS} hearts!</p>
      <div class="ag-opts-row">
        <div class="og"><span class="lab">Time for a sentence</span><div class="seg" role="group" aria-label="Time">${TIMES.map((t) => `<button type="button" data-t="${t}" aria-pressed="${t === secs}">${secsLabel(t)}</button>`).join("")}</div></div>
        <div class="og"><span class="lab">Picture</span><div class="seg" role="group" aria-label="Picture"><button type="button" data-p="1" aria-pressed="${pic}">🖼️ On</button><button type="button" data-p="0" aria-pressed="${!pic}">Off</button></div></div>
      </div>
      <button class="btn big ag-go" id="go" type="button">▶ Start · اِبْدَأْ</button>
    </section>`;
    app.querySelectorAll("[data-t]").forEach(
      (b) =>
        (b.onclick = () => {
          secs = +b.dataset.t;
          store.set("ar-gaps-time", secs);
          app
            .querySelectorAll("[data-t]")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
        }),
    );
    app.querySelectorAll("[data-p]").forEach(
      (b) =>
        (b.onclick = () => {
          pic = b.dataset.p === "1";
          store.set("ar-gaps-pic", pic ? "1" : "0");
          app
            .querySelectorAll("[data-p]")
            .forEach((x) => x.setAttribute("aria-pressed", x === b));
        }),
    );
    app.querySelector("#go").onclick = () => gapsPlay(secs);
  }

  function gapsPlay(secs) {
    // with pictures on, only the sentences that have a picture (the picture helps to understand them)
    const all = window.GAME_SENTENCES || [];
    const withPic = all.filter((x) => x.img || x.ic);
    const list = shuf(
      store.get("ar-gaps-pic", "1") === "1" && withPic.length >= ROUND
        ? withPic
        : all,
    );
    let i = 0,
      done = 0,
      hearts = HEARTS,
      timer = 0,
      over = false;
    const stop = () => {
      over = true;
      clearTimeout(timer);
      V.hush();
    };
    function show() {
      const s = list[i++ % list.length];
      const pic = store.get("ar-gaps-pic", "1") === "1";
      const opts = shuf([s.a, ...s.o]);
      const picHTML = s.img
        ? `<img src="${esc(s.img)}" alt="">`
        : s.ic
          ? `<span class="ag-emo" aria-hidden="true">${esc(s.ic)}</span>`
          : `<span class="ag-emo" aria-hidden="true">📖</span>`;
      app.innerHTML = `<section class="card ag-play ag-gaps">
        <div class="ag-bar">
          <button type="button" class="abtn" id="quit" aria-label="Stop the game">←</button>
          <span class="ag-hearts" aria-label="${hearts} hearts">${"<i>❤️</i>".repeat(hearts)}${"<i class='lost'>🤍</i>".repeat(HEARTS - hearts)}</span>
          <span class="ag-done">⭐ <b>${done}</b> / ${ROUND}</span>
          <button type="button" class="abtn" id="picT" aria-pressed="${pic}">🖼️ ${pic ? "Picture on" : "Picture off"}</button>
        </div>
        <div class="ag-timer"><i id="bar" style="animation-duration:${secs}s"></i></div>
        <div class="ag-qbox${pic ? "" : " nopic"}">
          <div class="ag-pic">${picHTML}</div>
          <div class="ag-q">
            <p class="ag-sent ar" dir="rtl" id="sent">${sentHTML(s.q)}</p>
            <button type="button" class="abtn" id="hear"><span class="e">🔊</span> Listen</button>
          </div>
        </div>
        <div class="ag-words" dir="rtl">${opts.map((o, j) => `<button type="button" class="ag-word ar" data-j="${j}">${esc(o)}</button>`).join("")}</div>
      </section>`;
      const sent = app.querySelector("#sent"),
        bar = app.querySelector("#bar");
      const full = () => s.q.replace(/_{3,}/, s.a);
      let answered = false;
      app.querySelector("#quit").onclick = () => {
        stop();
        gapsStart();
      };
      app.querySelector("#hear").onclick = () => say(s.q.replace(/_{3,}/, "…"));
      app.querySelector("#picT").onclick = (e) => {
        const on = !app.querySelector(".ag-qbox").classList.toggle("nopic");
        store.set("ar-gaps-pic", on ? "1" : "0");
        e.currentTarget.setAttribute("aria-pressed", on);
        e.currentTarget.textContent = `🖼️ ${on ? "Picture on" : "Picture off"}`;
      };
      const next = (ms) =>
        setTimeout(() => {
          if (over) return;
          if (done >= ROUND || hearts <= 0) gapsEnd(done, hearts, secs);
          else show();
        }, ms);
      app.querySelectorAll("[data-j]").forEach(
        (b) =>
          (b.onclick = () => {
            if (answered || over) return;
            const w = opts[+b.dataset.j];
            if (w === s.a) {
              answered = true;
              clearTimeout(timer);
              bar.style.animationPlayState = "paused";
              b.classList.add("ok");
              app
                .querySelectorAll("[data-j]")
                .forEach((x) => (x.disabled = true));
              sent.innerHTML = sentHTML(s.q, s.a, "ok");
              done++;
              app.querySelector(".ag-done b").textContent = done;
              say(full()).then(() => next(500));
            } else {
              // a wrong word costs a heart, like the end of the time
              b.classList.add("no");
              b.disabled = true;
              say(w);
              loseHeart();
              if (hearts <= 0) {
                answered = true;
                clearTimeout(timer);
                bar.style.animationPlayState = "paused";
                reveal();
                say(full()).then(() => next(900));
              }
            }
          }),
      );
      function loseHeart() {
        hearts--;
        const left = app.querySelectorAll(".ag-hearts i:not(.lost)");
        const h = left[left.length - 1];
        if (h) {
          h.textContent = "💔";
          h.classList.add("break", "lost");
        }
      }
      // the right word is shown in the sentence and among the words
      function reveal() {
        app.querySelectorAll("[data-j]").forEach((x) => {
          x.disabled = true;
          if (opts[+x.dataset.j] === s.a) x.classList.add("show");
        });
        sent.innerHTML = sentHTML(s.q, s.a, "late");
      }
      // time is up: a heart is lost, the right word is shown and read
      timer = setTimeout(() => {
        if (answered || over) return;
        answered = true;
        loseHeart();
        reveal();
        say(full()).then(() => next(900));
      }, secs * 1000);
    }
    addEventListener("pagehide", stop, { once: true });
    show();
  }

  function gapsEnd(done, hearts, secs) {
    const win = done >= ROUND;
    const key = "ar-gaps-best-" + secs,
      best = +store.get(key, 0);
    if (done > best) store.set(key, done);
    app.innerHTML = `<section class="card pop ag-end">
      <div class="toprow">${links()}</div>
      <div class="ag-hero" aria-hidden="true">${win ? "<span>🏆</span><span>📖</span><span>🎉</span>" : "<span>💪</span><span>📖</span>"}</div>
      <h1 class="hero-title">${win ? "You did it!" : "Good try!"}</h1>
      <p class="ag-time">⭐ ${done} / ${ROUND}</p>
      <p class="ag-sub">${win ? `${"❤️".repeat(hearts)} hearts left · أَحْسَنْتَ` : "No hearts left · حَاوِلْ مَرَّةً أُخْرَى"}</p>
      <p class="note">${secsLabel(secs)} for a sentence · your best: ${Math.max(best, done)} / ${ROUND}</p>
      <div class="row" style="justify-content:center"><button class="btn big" id="again" type="button">Play again</button><button class="btn ghost" id="set" type="button">Settings</button></div>
    </section>`;
    say(win ? "أَحْسَنْتَ" : "حَاوِلْ مَرَّةً أُخْرَى");
    app.querySelector("#again").onclick = () => gapsPlay(secs);
    app.querySelector("#set").onclick = gapsStart;
  }

  if (GAME === "catch") catchStart();
  else gapsStart();
})();
