// Arabic dictation game (My dictations, my-dictations/play-ar.html): the look of the spelling games (shared/spelling.js,
// spelling.css: the same header, mode tiles, top bar, cards and score screen), for Arabic words and sentences:
//   📇 Read · flash cards: the picture, the word, 🔊 Listen / 🐢 Slowly, ← Back / Next →
//   👂 Listen and choose · hear a word, tap it among 4 words of the list (words only, from 2 words)
//   🔤 Listen and build · hear it, put its letters in order (right to left, joined above the line; a sentence: its words)
//   ✍️ Dictation · hear it, type it; checked by its letters only (no tashkeel, alef forms, ى / ي, ة / ه)
// Data: window.SPELLING as for shared/spelling.js (MyDict.toSpelling): title, heading, subtitle, home, hub, hubName,
// items [{w, type: "sentence" | undefined, emoji | img}]. The page loads shared/common.js first.
// Voice: Google's online voice while online, the device voice only offline (Kit.voice "ar" online; the page has
// <meta name="referrer" content="no-referrer">): the Arabic voice installed on the tablet does not speak.
(function () {
  const LIST = window.SPELLING;
  const { esc, shuf, pick, star } = Kit;
  const app = document.getElementById("app");
  document.body.classList.add("sp-ar");
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
  const WORDS = LIST.items.filter((i) => i.type !== "sentence");
  const SENTS = LIST.items.filter((i) => i.type === "sentence");
  // a "word" with a space is built from its words, like a sentence
  const many = (it) => it.type === "sentence" || /\s/.test(it.w);
  const bolt =
    '<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16"><path d="M9 1L3 9h4l-1 6 6-8H8z" fill="#1B2440"/></svg>';
  const ar = (t, cls = "") =>
    `<span class="ar${cls ? " " + cls : ""}" dir="rtl" lang="ar">${esc(t)}</span>`;

  /* ---------- the picture: an emoji or a picture file (a translation card) ---------- */
  const drawPic = (it, cls = "scene") =>
    it.img
      ? `<div class="${cls}" role="img" aria-label="Picture"><img src="${esc(it.img)}" alt="" style="width:100%;height:100%;object-fit:cover;display:block"></div>`
      : `<div class="${cls}" role="img" aria-label="Picture"><svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet"><rect class="f-sky" width="320" height="180"/><text class="emo" x="160" y="92" font-size="96" text-anchor="middle" dominant-baseline="central">${esc(it.emoji || "❓")}</text></svg></div>`;

  /* ---------- voice ---------- */
  const V = Kit.voice("ar", { online: true });
  let slow = store.get("sp-voice", "normal") === "slow";
  const say = (t, forceSlow) => {
    V.hush();
    V.say(t, (forceSlow ?? slow) ? 0.5 : 0.8);
  };
  const hush = () => V.hush();

  /* ---------- checking: letters only ---------- */
  const normAr = (w) =>
    String(w)
      .replace(/[ً-ٰٟـ]/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/[^ء-ي]/g, "");

  /* ---------- home ---------- */
  const MODES = [
    {
      k: "learn",
      ic: "📇",
      t: "Read",
      d: "Flash cards: the picture, the word, listen",
    },
    WORDS.length > 1 && {
      k: "choose",
      ic: "👂",
      t: "Listen and choose",
      d: "Hear a word, tap it",
    },
    {
      k: "build",
      ic: "🔤",
      t: "Listen and build",
      d: "Put the letters in order: words or whole sentences",
    },
    {
      k: "listen",
      ic: "✍️",
      t: "Dictation",
      d: "Hear the word or sentence, then type it",
    },
  ].filter(Boolean);
  const MODE_NAME = {
    learn: "Read",
    choose: "Listen and choose",
    build: "Listen and build",
    listen: "Dictation",
  };
  function home() {
    hush();
    app.innerHTML = `<section class="card pop">
  <div class="topbar"><div class="toplinks"><a class="back" href="${esc(LIST.home || "../index.html")}">← All games</a><a class="back" href="${esc(LIST.hub || "index.html")}">${esc(LIST.hubName || "My dictations")}</a></div><span class="eyebrow">${esc(LIST.subtitle || "")}</span></div>
  <h1 class="hero-title"><span class="p">${esc(LIST.heading || "Dictation:")}</span> <span class="k" dir="auto">${esc(LIST.title)}</span></h1>
  <div class="thumbs">${LIST.items
    .slice(0, 10)
    .map((it) => drawPic(it))
    .join("")}</div>
  <p class="howto">Ready? Pick a mode.</p>
  <div class="modes">${MODES.map((m) => `<button type="button" class="mode" id="mode-${m.k}" data-m="${m.k}"><span class="mi-ic">${m.ic}</span><b>${m.t}</b><small>${m.d}</small></button>`).join("")}</div>
  <div class="opts-row">
    <div class="og og-right"><span class="lab">Voice</span><div class="seg" role="group" aria-label="Voice speed"><button type="button" id="sp-norm" data-sp="0" aria-pressed="${!slow}">Normal</button><button type="button" id="sp-slow" data-sp="1" aria-pressed="${slow}">🐢 Slow</button></div></div>
  </div>
  ${V.has() ? "" : '<p class="note">No Arabic voice and no internet right now: the word is shown instead of said.</p>'}
</section>`;
    app
      .querySelectorAll("[data-m]")
      .forEach((b) => (b.onclick = () => startMode(b.dataset.m)));
    app.querySelectorAll("[data-sp]").forEach(
      (b) =>
        (b.onclick = () => {
          slow = b.dataset.sp === "1";
          store.set("sp-voice", slow ? "slow" : "normal");
          home();
        }),
    );
  }

  /* ---------- shared game state ---------- */
  const S = { mode: null, list: [], i: 0, score: 0, max: 0, miss: [] };
  function hud(label) {
    const pct = Math.round((S.i / Math.max(1, S.list.length)) * 100);
    return `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to modes">←</button><span class="qnum">${label}</span><div class="meter" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress"><i style="width:${pct}%"></i></div>${S.mode === "learn" ? "" : `<span class="score" aria-label="Points">${bolt}<b id="pts">${S.score}</b></span>`}</div>`;
  }
  const bindHome = () => (document.getElementById("homeBtn").onclick = home);
  const listOf = (k) =>
    k === "words"
      ? shuf(WORDS)
      : k === "sentences"
        ? shuf(SENTS)
        : shuf(WORDS).concat(shuf(SENTS));
  function startMode(m, opt) {
    S.mode = m;
    S.i = 0;
    S.score = 0;
    S.miss = [];
    if (m === "learn") {
      S.learnSet = "all";
      S.showWord = store.get("sp-show", "1") === "1";
      return learn();
    }
    if (m === "choose") {
      S.list = shuf(WORDS);
      S.max = S.list.length;
      return choose();
    }
    // build and dictation: words, sentences or both
    if (SENTS.length && WORDS.length && !opt) return chooseKind(m);
    S.kind = opt || (WORDS.length ? "words" : "sentences");
    S.list = listOf(S.kind);
    S.max = S.list.length;
    return m === "build" ? build() : listen();
  }
  function chooseKind(m) {
    hush();
    const opts = [
      ["words", "🔤", "Words", `${WORDS.length} words`],
      ["sentences", "📝", "Sentences", `${SENTS.length} sentences`],
      ["both", "⭐", "Both", `${WORDS.length + SENTS.length} in total`],
    ];
    app.innerHTML = `<div class="hud"><button type="button" class="abtn" id="homeBtn" aria-label="Back to modes">←</button><span class="qnum">${esc(MODE_NAME[m])}</span></div>
<section class="card pop">
  <p class="qtext">What do you want to practise?</p>
  <div class="modes">${opts.map(([k, ic, t, d]) => `<button type="button" class="mode" id="lsk-${k}" data-k="${k}"><span class="mi-ic">${ic}</span><b>${t}</b><small>${d}</small></button>`).join("")}</div>
</section>`;
    bindHome();
    app
      .querySelectorAll("[data-k]")
      .forEach((b) => (b.onclick = () => startMode(m, b.dataset.k)));
  }
  function next() {
    S.i++;
    if (S.i >= S.list.length) return end();
    ({ choose, listen, build })[S.mode]();
  }
  function fb(ok, html) {
    return `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? pick(["أَحْسَنْتَ! Well done!", "مُمْتَازٌ! Excellent!", "صَحِيحٌ! Correct!"]) : "Not quite."}</b><span>${html}</span></div><div class="row" style="justify-content:flex-end;margin-top:4px"><button class="btn next" id="nextBtn" type="button">${S.i + 1 < S.list.length ? "Next" : "See my score"}</button></div>`;
  }
  function bindNext() {
    const n = document.getElementById("nextBtn");
    n.onclick = next;
    n.focus({ preventScroll: true });
  }
  // 🔊 Listen / 🐢 Slowly for a word or sentence; with no voice it is shown instead (written)
  const audio = (big) =>
    V.has()
      ? `<div class="audio"><button type="button" class="abtn${big ? " big" : ""}" id="say1"><span class="e">🔊</span> Listen</button><button type="button" class="abtn" id="say2"><span class="e">🐢</span> Slowly</button></div>`
      : "";
  const noVoice = (it) =>
    V.has() ? "" : `<div class="fc-word sent">${ar(it.w)}</div>`;
  function bindAudio(it) {
    const a = document.getElementById("say1"),
      b = document.getElementById("say2");
    if (a) a.onclick = () => say(it.w, false);
    if (b) b.onclick = () => say(it.w, true);
  }

  /* ---------- 📇 READ: flash cards ---------- */
  function learn() {
    hush();
    const set =
      S.learnSet === "words"
        ? WORDS
        : S.learnSet === "sentences"
          ? SENTS
          : LIST.items;
    if (S.i >= set.length) S.i = 0;
    if (S.i < 0) S.i = set.length - 1;
    const it = set[S.i];
    S.list = set;
    const sent = it.type === "sentence";
    const word = `<div class="fc-word${sent ? " sent" : ""}">${ar(it.w)}</div>`;
    app.innerHTML = `${hud(`Card ${S.i + 1} of ${set.length}`)}<section class="card pop fc">
  <div class="opts-row" style="justify-content:center">
    ${
      SENTS.length && WORDS.length
        ? `<div class="seg" role="group" aria-label="Cards">${[
            ["all", "All"],
            ["words", "Words"],
            ["sentences", "Sentences"],
          ]
            .map(
              ([k, n]) =>
                `<button type="button" id="ls-${k}" data-ls="${k}" aria-pressed="${S.learnSet === k}">${n}</button>`,
            )
            .join("")}</div>`
        : ""
    }
    <div class="seg" role="group" aria-label="Show word"><button type="button" id="sw-1" data-sw="1" aria-pressed="${S.showWord}">Picture + word</button><button type="button" id="sw-0" data-sw="0" aria-pressed="${!S.showWord}">Picture only</button></div>
  </div>
  ${drawPic(it)}
  <div id="wordBox">${S.showWord ? word : `<button type="button" class="fc-hidden" id="reveal">Tap to see the ${sent ? "sentence" : "word"}</button>`}</div>
  ${audio(false)}
  <div class="nav"><button type="button" class="btn ghost" id="prevBtn">← Back</button><button type="button" class="btn" id="nextCard">Next →</button></div>
</section>`;
    bindHome();
    bindAudio(it);
    app.querySelectorAll("[data-ls]").forEach(
      (b) =>
        (b.onclick = () => {
          S.learnSet = b.dataset.ls;
          S.i = 0;
          learn();
        }),
    );
    app.querySelectorAll("[data-sw]").forEach(
      (b) =>
        (b.onclick = () => {
          S.showWord = b.dataset.sw === "1";
          store.set("sp-show", S.showWord ? "1" : "0");
          learn();
        }),
    );
    const rv = document.getElementById("reveal");
    if (rv)
      rv.onclick = () => {
        document.getElementById("wordBox").innerHTML = word;
        say(it.w, false);
      };
    document.getElementById("prevBtn").onclick = () => {
      S.i--;
      learn();
    };
    document.getElementById("nextCard").onclick = () => {
      S.i++;
      learn();
    };
  }

  /* ---------- 👂 LISTEN AND CHOOSE (words) ---------- */
  function choose() {
    const it = S.list[S.i];
    // 3 other words of the list, the ones of a similar length first
    const others = shuf(WORDS.filter((x) => normAr(x.w) !== normAr(it.w)))
      .sort(
        (a, b) =>
          Math.abs(a.w.length - it.w.length) -
          Math.abs(b.w.length - it.w.length),
      )
      .slice(0, 3);
    const opts = shuf([it, ...others]);
    app.innerHTML = `${hud(`Word ${S.i + 1} of ${S.list.length}`)}<section class="card pop fc">
  ${drawPic(it, "scene small")}
  ${audio(true)}${noVoice(it)}
  <div class="sp-choices">${opts.map((o, k) => `<button type="button" class="mi word" id="ch-${k}" data-k="${k}">${ar(o.w, "tx")}</button>`).join("")}</div>
  <div id="fbx" style="width:100%"></div>
</section>`;
    bindHome();
    bindAudio(it);
    setTimeout(() => say(it.w), 350);
    app.querySelectorAll("[data-k]").forEach(
      (b) =>
        (b.onclick = () => {
          const o = opts[+b.dataset.k];
          const ok = o === it;
          app.querySelectorAll("[data-k]").forEach((x, k) => {
            x.disabled = true;
            if (opts[k] === it) x.classList.add("ok");
          });
          if (!ok) b.classList.add("no");
          if (ok) S.score++;
          else S.miss.push({ q: "Listen and choose", your: o.w, right: it.w });
          document.getElementById("pts").textContent = S.score;
          document.getElementById("fbx").innerHTML = fb(
            ok,
            ok ? ar(it.w) : `The word was ${ar(it.w)}`,
          );
          say(it.w);
          bindNext();
        }),
    );
  }

  /* ---------- 🔤 LISTEN AND BUILD (Kit.dragTiles, right to left) ---------- */
  function build() {
    const it = S.list[S.i];
    const words = many(it);
    // a word: its letters; a sentence: its words (the end punctuation stays in place, not a tile)
    const [, body, end] = words
      ? it.w.match(/^(.*?)([.،؟!?]*)$/)
      : [0, it.w, ""];
    const parts = words ? body.split(" ") : [...body];
    const sep = words ? " " : "";
    let bank = shuf(parts.map((t) => ({ t })));
    for (
      let n = 0;
      n < 6 && parts.length > 1 && bank.map((x) => x.t).join(sep) === body;
      n++
    )
      bank = shuf(bank);
    app.innerHTML = `${hud(`${it.type === "sentence" ? "Sentence" : "Word"} ${S.i + 1} of ${S.list.length}`)}<section class="card pop fc">
  ${drawPic(it, "scene small")}
  <div class="audio">${V.has() ? '<button type="button" class="abtn" id="say1"><span class="e">🔊</span> Listen</button><button type="button" class="abtn" id="say2"><span class="e">🐢</span> Slowly</button>' : ""}<button type="button" class="abtn" id="helpBtn"><span class="e">💡</span> Help</button></div>${noVoice(it)}
  ${words ? "" : '<div class="joined" dir="rtl" lang="ar" id="joined" aria-hidden="true"></div>'}
  <div class="slots" id="line" dir="rtl" aria-label="Your ${words ? "sentence" : "word"}"></div>
  <div class="letters" id="bank" dir="rtl" aria-label="${words ? "Words" : "Letters"}"></div>
  <p class="hint">Drag the ${words ? "words" : "letters"} onto the line, or tap them.</p>
  <div id="fbx" style="width:100%;display:flex;flex-direction:column;gap:10px"><div class="row" style="justify-content:center"><button class="btn" id="checkBtn" type="button" disabled>Check my ${words ? "sentence" : "word"}</button></div></div>
</section>`;
    bindHome();
    bindAudio(it);
    setTimeout(() => say(it.w), 350);
    const L = document.getElementById("line");
    let help = 0;
    const T = Kit.dragTiles(L, document.getElementById("bank"), bank, {
      cls: words ? "ar" : "letter",
      ph: `Drop the ${words ? "words" : "letters"} here`,
      joined: document.getElementById("joined"),
      onChange: (l) => {
        const cb = document.getElementById("checkBtn");
        if (cb) cb.disabled = l.length !== parts.length;
      },
    });
    // Help: keep the right tiles at the start of the line, send the rest back, put the next right one in
    document.getElementById("helpBtn").onclick = () => {
      const line = T.line.slice(),
        bk = T.bank.slice();
      let j = 0;
      while (j < line.length && line[j].t === parts[j]) j++;
      if (j >= parts.length) return;
      bk.push(...line.splice(j));
      const k = bk.findIndex((x) => x.t === parts[j]);
      line.push(...bk.splice(k, 1));
      help++;
      T.use(line, bk);
    };
    document.getElementById("checkBtn").onclick = () => {
      const mine = T.line.map((x) => x.t).join(sep);
      const ok = mine === body;
      if (ok) S.score++;
      if (!ok || help)
        S.miss.push({
          q: "Listen and build",
          your: ok ? "" : mine + end,
          right: it.w,
          help,
        });
      document.getElementById("pts").textContent = S.score;
      L.classList.add(ok ? "ok" : "no");
      document.getElementById("helpBtn").disabled = true;
      T.lock();
      document.getElementById("fbx").innerHTML = fb(
        ok,
        ok
          ? ar(it.w)
          : `The right ${words ? "sentence" : "word"} is ${ar(it.w)}${words ? "" : " = " + esc(parts.join(" + "))}`,
      );
      say(it.w);
      bindNext();
    };
  }

  /* ---------- ✍️ DICTATION: hear and type ---------- */
  function listen() {
    const it = S.list[S.i];
    const sent = it.type === "sentence";
    app.innerHTML = `${hud(`${sent ? "Sentence" : "Word"} ${S.i + 1} of ${S.list.length}`)}<section class="card pop fc">
  ${audio(true)}${noVoice(it)}
  <div id="hintBox" style="width:100%;display:flex;flex-direction:column;align-items:center;gap:8px"></div>
  <input class="spell-in" id="spell" type="text" dir="rtl" lang="ar" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="اُكْتُبْ هُنَا…" aria-label="Your answer">
  <div class="row" style="justify-content:center;gap:10px"><button type="button" class="btn ghost" id="hintBtn">🖼️ Show picture</button><button type="button" class="btn" id="checkBtn">Check</button></div>
  <div id="fbx" style="width:100%;display:flex;flex-direction:column;gap:10px"></div>
</section>`;
    bindHome();
    bindAudio(it);
    const showPic = () => {
      document.getElementById("hintBox").innerHTML = drawPic(it, "scene ls");
      const hb = document.getElementById("hintBtn");
      if (hb) hb.remove();
    };
    document.getElementById("hintBtn").onclick = showPic;
    const inp = document.getElementById("spell");
    inp.focus({ preventScroll: true });
    setTimeout(() => say(it.w), 350);
    let done = false;
    const check = () => {
      if (done) return;
      const v = inp.value;
      if (!v.trim()) return inp.focus();
      done = true;
      inp.disabled = true;
      document.getElementById("checkBtn").parentElement.remove();
      const ok = normAr(v) === normAr(it.w);
      if (ok) S.score++;
      else S.miss.push({ q: "Dictation", your: v, right: it.w });
      document.getElementById("pts").textContent = S.score;
      document.getElementById("fbx").innerHTML = fb(
        ok,
        ok ? ar(it.w) : `You wrote ${ar(v)}. The right spelling is ${ar(it.w)}`,
      );
      showPic();
      bindNext();
    };
    document.getElementById("checkBtn").onclick = check;
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        check();
      }
    });
  }

  /* ---------- END ---------- */
  function end() {
    hush();
    const pct = Math.round((S.score / Math.max(1, S.max)) * 100);
    const st = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
    const msg =
      pct === 100
        ? "Perfect spelling!"
        : pct >= 90
          ? "Excellent!"
          : pct >= 70
            ? "Good work! Practise the words below."
            : "Keep practising. Read the cards, then play again.";
    const lines = (m) =>
      [
        m.help && `💡 Help tapped ${m.help} ${m.help === 1 ? "time" : "times"}`,
        m.your && `You wrote: ${ar(m.your)}`,
        m.right && `Right: ${ar(m.right)}`,
      ].filter(Boolean);
    app.innerHTML = `<section class="card pop">
  <span class="eyebrow">${MODE_NAME[S.mode]} · your score</span>
  <div class="big-score">${S.score}<small> / ${S.max} points</small></div>
  <div class="stars">${[0, 1, 2].map((i) => star(i < st)).join("")}</div>
  <h2>${pct}% · ${msg}</h2>
  <div class="row"><button class="btn big" id="againBtn" type="button">Play again</button><button class="btn ghost" id="modesBtn" type="button">Other modes</button></div>
</section>
${S.miss.length ? `<section class="card"><h3>Let's review (${S.miss.length})</h3><ul class="review">${S.miss.map((m) => `<li><div class="q">${esc(m.q)}</div><div class="a">${lines(m).join("<br>")}</div></li>`).join("")}</ul></section>` : ""}`;
    document.getElementById("againBtn").onclick = () =>
      startMode(S.mode, S.kind);
    document.getElementById("modesBtn").onclick = home;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  home();
})();
