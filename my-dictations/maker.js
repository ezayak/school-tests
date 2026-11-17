// My dictations (my-dictations/index.html): the list of the dictations made on this device, and the maker:
// Step 1 paste the words and sentences, choose pictures or translations → Step 2 check the pictures (emoji)
// or the translations (MyDict.translate, or "cat - кіт" in the list) and the letters to colour → saved.
// Share: a link with the whole dictation in it (MyDict.encode); opening it here offers to save it.
// Storage, share code and emoji: shared/dictation-store.js. The game: play.html (shared/spelling.js),
// for Arabic play-ar.html (the Arabic lesson engine); MyDict.playUrl picks the page.
(function () {
  const { esc } = Kit;
  const M = window.MyDict;
  const app = document.getElementById("app");
  let view = "list";
  // {id, title, lang, show, to, text, items: [{w, s, e, t, m, auto, autoT}]};
  // auto / autoT: the picture / translation was found by the page (it follows a fixed word)
  let draft = null;
  let trRun = 0; // the translating round now running (a new one stops the old one)
  let picking = -1; // the row whose picture picker is open
  let fresh = true; // the first tap in a sentence's picker replaces its picture, the next one adds a second
  let sharing = ""; // the dictation whose share link is shown
  let flash = ""; // the dictation just saved (lit up in the list)
  let incoming; // a dictation from a link: undefined = none, null = a broken link
  const links = {}; // id → share link

  const count = (d) => {
    const w = d.items.filter((i) => !i.s).length,
      s = d.items.length - w;
    return [
      w && `${w} word${w === 1 ? "" : "s"}`,
      s && `${s} sentence${s === 1 ? "" : "s"}`,
    ]
      .filter(Boolean)
      .join(" · ");
  };
  const info = (d) =>
    `${count(d)} · ${M.LANGS[d.lang].name}${d.show === "tr" ? " → " + M.TO[d.to].name : ""}`;
  const thumbs = (d) =>
    `<span class="md-thumbs" aria-hidden="true">${d.items
      .slice(0, 6)
      .map((i) => `<span>${esc(M.pics(i.e)[0] || "❓")}</span>`)
      .join("")}</span>`;
  const top = (back, eyebrow) =>
    `<div class="topbar"><div class="toplinks">${back}</div><span class="eyebrow">${esc(eyebrow)}</span></div>`;
  const msg = (id, text, bad) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
      el.classList.toggle("bad", !!bad);
    }
  };

  /* ---------- the list ---------- */
  function incomingHTML() {
    if (incoming === undefined) return "";
    if (incoming === null)
      return `<section class="card md-incoming pop"><span class="eyebrow">Shared with you</span>
  <h2>This link does not work</h2><p class="hint">Part of it may be missing. Ask the other parent to send it again, or to copy the whole link.</p>
  <div class="row"><button class="btn ghost" type="button" data-act="skip">OK</button></div></section>`;
    const have = M.find(incoming);
    const preview = incoming.items
      .filter((i) => !i.s)
      .slice(0, 12)
      .map((i) => i.w)
      .join(", ");
    return `<section class="card md-incoming pop"><span class="eyebrow">Shared with you</span>
  <h2 dir="auto">${esc(incoming.title)}</h2>${thumbs(incoming)}<p class="note">${esc(info(incoming))}</p>${preview ? `<p class="hint" dir="auto">${esc(preview)}…</p>` : ""}
  ${
    have
      ? `<p><b>You already have this dictation.</b></p><div class="row"><a class="btn" href="${esc(M.playUrl(have))}">▶ Play</a><button class="btn ghost" type="button" data-act="skip">OK</button></div>`
      : `<div class="row"><button class="btn big" type="button" data-act="keep">Save it</button><button class="btn ghost" type="button" data-act="skip">No, thanks</button></div>`
  }</section>`;
  }
  function itemHTML(d) {
    const share =
      sharing === d.id
        ? `<div class="md-share"><p class="hint">Send this link to another parent. When they open it, they can save this dictation on their device.</p>
  <div class="md-line"><input class="md-in" readonly value="${esc(links[d.id] || "…")}" aria-label="Share link" id="link-${esc(d.id)}"><button class="abtn" type="button" data-act="copy" data-id="${esc(d.id)}">Copy</button></div>
  <p class="md-msg" id="smsg-${esc(d.id)}"></p></div>`
        : "";
    return `<article class="md-item${flash === d.id ? " md-new" : ""}">
  <div class="md-head">${thumbs(d)}<div><h3 dir="auto">${esc(d.title)}</h3><span class="note">${esc(info(d))}</span></div></div>
  <div class="md-acts"><a class="btn" href="${esc(M.playUrl(d))}">▶ Play</a><button class="abtn" type="button" data-act="share" data-id="${esc(d.id)}">📤 Share</button><button class="abtn" type="button" data-act="edit" data-id="${esc(d.id)}">✏️ Edit</button><button class="abtn md-del" type="button" data-act="del" data-id="${esc(d.id)}" aria-label="Delete">🗑</button></div>
  ${share}</article>`;
  }
  function list() {
    view = "list";
    const all = M.list();
    app.innerHTML = `<section class="card pop">
  ${top('<a class="back" href="../index.html">← All games</a>', "Games · Dictations")}
  <h1 class="hero-title"><span class="p">My</span> <span class="k">dictations</span></h1>
  <p class="howto">Make a spelling game from any word list: paste the words and sentences, check the pictures, play. Send it to other parents with a link.</p>
  <div class="row"><button class="btn big" type="button" data-act="new">+ New dictation</button></div>
</section>
${incomingHTML()}
${all.length ? `<section class="md-list">${all.map(itemHTML).join("")}</section>` : '<p class="md-empty">No dictations yet. Tap “+ New dictation” to make the first one.</p>'}
<section class="card"><h3>Got a link from another parent?</h3>
  <p class="hint">Paste the link (or the whole message) here and tap Add.</p>
  <div class="md-line"><input class="md-in" id="code" autocomplete="off" placeholder="https://…#add=…" aria-label="Link or code"><button class="btn" type="button" data-act="addcode">Add</button></div>
  <p class="md-msg" id="cmsg"></p></section>
<p class="note">Your dictations are kept on this device, in this browser. Clearing the browser's data deletes them: share them to keep a copy.</p>`;
    // the share links are made now, so a tap on Share can open the device's share menu at once
    all.forEach((d) =>
      M.encode(d).then((c) => {
        links[d.id] = M.link(c);
        const el = document.getElementById("link-" + d.id);
        if (el) el.value = links[d.id];
      }),
    );
    if (flash) {
      const el = app.querySelector(".md-new");
      if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
      flash = "";
    } else window.scrollTo(0, 0);
  }
  function clearHash() {
    incoming = undefined;
    history.replaceState(null, "", location.pathname + location.search);
  }
  async function share(id) {
    const d = M.get(id);
    if (!d) return;
    sharing = sharing === id ? "" : id;
    if (!links[id]) links[id] = M.link(await M.encode(d));
    list();
    if (sharing && navigator.share)
      navigator
        .share({
          title: d.title,
          text: `Dictation “${d.title}” (${count(d)}) for Study Games:`,
          url: links[id],
        })
        .catch(() => {});
  }
  async function copy(id) {
    const el = document.getElementById("link-" + id);
    let ok = false;
    try {
      await navigator.clipboard.writeText(el.value);
      ok = true;
    } catch (e) {
      el.select();
      try {
        ok = document.execCommand("copy");
      } catch (e2) {}
    }
    msg(
      "smsg-" + id,
      ok ? "Copied. Paste it into a message." : "Select the link and copy it.",
      !ok,
    );
  }
  async function addCode() {
    const t = document.getElementById("code").value;
    if (!t.trim()) return msg("cmsg", "Paste a link first.", true);
    const d = await M.decode(t);
    if (!d)
      return msg(
        "cmsg",
        "This link or code does not work. Ask for it again.",
        true,
      );
    incoming = d;
    list();
  }
  function keep() {
    const d = M.save(incoming);
    if (!d) return alert("There is no room left on this device to save it.");
    flash = d.id;
    clearHash();
    list();
  }

  /* ---------- Step 1: paste ---------- */
  // the list as text again (← Back, ✏️ Edit): the words and numbered sentences only; their translations,
  // pictures and letters stay with them in draft.items and come back on Next (next() finds them by the word)
  const toText = (items) => {
    let n = 0;
    return items.map((i) => (i.s ? `${++n}. ${i.w}` : i.w)).join("\n");
  };
  function paste() {
    view = "paste";
    picking = -1;
    app.innerHTML = `<section class="card pop">
  ${top('<button class="back md-link" type="button" data-act="cancel">← My dictations</button>', "Step 1 of 2")}
  <h1 class="hero-title"><span class="p">Paste</span> <span class="k">the list</span></h1>
  <label class="md-lab">Name of the dictation<input class="md-in" id="title" dir="auto" autocomplete="off" maxlength="80" placeholder="For example: Unit 2 · Week 5" value="${esc(draft.title)}"></label>
  <div class="md-opts"><div class="md-lab">Language of the words (for the voice)<div class="seg" role="group" aria-label="Language">${Object.entries(
    M.LANGS,
  )
    .map(
      ([k, L]) =>
        `<button type="button" data-act="lang" data-lang="${k}" aria-pressed="${draft.lang === k}">${esc(L.name)}</button>`,
    )
    .join("")}</div></div>
  <div class="md-lab">Under each word, show<div class="seg" role="group" aria-label="Picture or translation"><button type="button" data-act="show" data-show="pic" aria-pressed="${draft.show !== "tr"}">🖼️ Picture</button><button type="button" data-act="show" data-show="tr" aria-pressed="${draft.show === "tr"}">🌐 Translation</button></div></div></div>
  <div class="md-lab" id="toBox"${draft.show === "tr" ? "" : " hidden"}>Translate to<div class="seg" role="group" aria-label="Translate to">${Object.entries(
    M.TO,
  )
    .map(
      ([k, L]) =>
        `<button type="button" data-act="to" data-to="${k}" aria-pressed="${draft.to === k}"${k === draft.lang.split("-")[0] ? " disabled" : ""}>${esc(L.name)}</button>`,
    )
    .join("")}</div></div>
  <label class="md-lab">Words and sentences<textarea class="md-text" id="text" dir="auto" rows="12" spellcheck="false" placeholder="pitch&#10;teacher&#10;cheese&#10;1. The runner needed to stretch.&#10;2. What is your favorite color?">${esc(draft.text)}</textarea></label>
  <p class="hint">One word or sentence on each line. Numbers like “1.” are taken away.<span id="trHint"${draft.show === "tr" ? "" : " hidden"}> The translations are found on the internet; you can also write them yourself after a dash: <b>cat - кіт</b>.</span></p>
  <div class="row"><button class="btn big" type="button" data-act="next">Next →</button></div>
  <p class="md-msg bad" id="pmsg"></p>
</section>`;
    window.scrollTo(0, 0);
  }
  // the language buttons follow the letters of the text (Arabic letters → العربية), so a list is never played
  // in the wrong game; the parent can still pick French for Latin letters
  // (only the words count, not the translations after a dash); the language to is never the words' own
  function fitLang() {
    const text = document.getElementById("text").value;
    draft.lang = M.fitLang(
      draft.lang,
      draft.show === "tr" ? M.wordsOnly(text) : text,
    );
    draft.to = M.toFor(draft.lang, draft.to);
    app
      .querySelectorAll("[data-lang]")
      .forEach((x) =>
        x.setAttribute("aria-pressed", x.dataset.lang === draft.lang),
      );
    app.querySelectorAll("[data-to]").forEach((x) => {
      x.setAttribute("aria-pressed", x.dataset.to === draft.to);
      x.disabled = x.dataset.to === draft.lang.split("-")[0];
    });
  }
  async function next() {
    draft.title = document.getElementById("title").value.trim();
    draft.text = document.getElementById("text").value;
    fitLang();
    const tr = draft.show === "tr";
    const items = M.parse(draft.text, draft.lang, tr);
    if (!items.length)
      return msg("pmsg", "Paste at least one word first.", true);
    msg("pmsg", "Finding pictures…");
    await Promise.all([M.loadEmoji(draft.lang), M.loadEmoji("en-US")]);
    // a line that was there before keeps the picture, translation and letters chosen for it
    const old = draft.items || [];
    const keys = items.filter((i) => !i.s).map((i) => i.w);
    draft.items = items.map((it) => {
      const o = old.find((x) => x.w === it.w && x.s === it.s);
      const e =
        o && !o.auto
          ? { e: o.e, m: o.m }
          : { e: M.suggest(it, draft.lang, keys), auto: true };
      // a translation written in the list wins; else the one found before (in the same language)
      const t = it.t
        ? { t: it.t }
        : o && o.t && draft.toWas === draft.to
          ? { t: o.t, autoT: o.autoT }
          : {};
      return { w: it.w, s: it.s, ...e, ...t };
    });
    draft.toWas = draft.to;
    check();
    if (tr) translateAll();
  }
  // the missing translations, 4 at a time; each row is filled in as its answer comes
  async function translateAll() {
    const run = ++trRun;
    const todo = draft.items.filter((it) => !it.t && it.w.trim());
    if (!todo.length) return;
    let done = 0,
      found = 0;
    const show = () =>
      msg(
        "tmsg",
        done < todo.length
          ? `Translating… ${done} / ${todo.length}`
          : found === todo.length
            ? "Translated. Check them and fix any that are wrong."
            : `${todo.length - found} could not be translated (no internet?). Type them in.`,
        done === todo.length && found < todo.length,
      );
    show();
    const queue = todo.slice();
    const worker = async () => {
      while (queue.length) {
        const it = queue.shift();
        const w = it.w;
        const t = await M.translate(w, draft.lang, draft.to);
        if (run !== trRun || !draft) return;
        done++;
        if (t && it.w === w && !it.t) {
          found++;
          it.t = t;
          it.autoT = true;
          const inp = app.querySelector(
            `.md-t[data-i="${draft.items.indexOf(it)}"]`,
          );
          if (inp && !inp.value) inp.value = t;
        }
        show();
      }
    };
    await Promise.all([worker(), worker(), worker(), worker()]);
  }

  /* ---------- Step 2: check the pictures ---------- */
  // the letters to colour: words only, not Arabic (its letters join and carry tashkeel)
  const letters = (it, i) =>
    it.s || M.LANGS[draft.lang].rtl
      ? ""
      : `<div class="md-letters" aria-label="Tap the letters to colour">${[
          ...it.w,
        ]
          .map((c, j) =>
            c === " "
              ? '<span class="md-sp"></span>'
              : `<button type="button" class="md-l" data-act="letter" data-i="${i}" data-j="${j}" aria-pressed="${(it.m || []).includes(j)}">${esc(c)}</button>`,
          )
          .join("")}</div>`;
  const grid = (es, i) =>
    es.length
      ? es
          .map(
            (e) =>
              `<button type="button" class="md-e" data-act="set" data-i="${i}" data-e="${esc(e)}">${esc(e)}</button>`,
          )
          .join("")
      : '<p class="hint">No pictures for this word. Search for another word, or type an emoji.</p>';
  const EMO = /\p{Extended_Pictographic}/u;
  function found(q, i) {
    q = q.trim();
    if (!q)
      return M.choices(draft.items[i].w, draft.lang, {
        keys: draft.items.filter((x) => !x.s).map((x) => x.w),
      });
    if (EMO.test(q)) return [M.pics(q).join("")].filter(Boolean);
    return M.choices(q, draft.lang, { search: true });
  }
  function picker(it, i) {
    return `<div class="md-pick">
  <p class="hint">${it.s ? "Tap one or two pictures for this sentence." : "Tap a picture."} Now: <span class="md-now">${esc(it.e || "none")}</span></p>
  <div class="md-grid" id="grid">${grid(found("", i), i)}</div>
  <input class="md-in md-q" id="q" dir="auto" data-i="${i}" autocomplete="off" placeholder="Search: cat, ball, rain… or type an emoji" aria-label="Search a picture">
  <div class="row"><button class="abtn" type="button" data-act="set" data-i="${i}" data-e="">No picture</button><button class="abtn" type="button" data-act="pick" data-i="${i}">Done</button></div>
</div>`;
  }
  // translations: no picture button, a translation box under the word instead
  const trBox = (it, i) =>
    `<label class="md-tl"><span aria-hidden="true">🌐</span><input class="md-in md-t" dir="auto" data-i="${i}" value="${esc(it.t || "")}" autocomplete="off" aria-label="Translation" placeholder="${esc(M.TO[draft.to].name)}"></label>`;
  const row = (it, i) => {
    const tr = draft.show === "tr";
    return `<div class="md-row${tr ? " tr" : ""}" data-i="${i}">
  ${tr ? "" : `<button type="button" class="md-pic${M.pics(it.e).length > 1 ? " two" : ""}" data-act="pick" data-i="${i}" aria-label="Change the picture" aria-expanded="${picking === i}">${esc(it.e || "❓")}</button>`}
  <div class="md-main"><input class="md-in md-w" dir="auto" data-i="${i}" value="${esc(it.w)}" autocomplete="off" spellcheck="false" aria-label="${it.s ? "Sentence" : "Word"}" placeholder="${it.s ? "Type a sentence" : "Type a word"}">${letters(it, i)}${tr ? trBox(it, i) : ""}</div>
  <button type="button" class="md-x" data-act="drop" data-i="${i}" aria-label="Delete">🗑</button>
  ${picking === i ? picker(it, i) : ""}
</div>`;
  };
  function part(s) {
    const rows = draft.items
      .map((it, i) => (it.s === s ? row(it, i) : ""))
      .join("");
    const n = draft.items.filter((it) => it.s === s).length;
    return `<section class="card"><h2>${s ? "Sentences" : "Words"} <small class="md-n">${n}</small></h2>
  <div class="md-rows">${rows}</div>
  <div class="row"><button class="abtn" type="button" data-act="add" data-s="${s ? 1 : 0}">+ Add a ${s ? "sentence" : "word"}</button></div></section>`;
  }
  function check(focus) {
    view = "check";
    const y = window.scrollY;
    app.innerHTML = `<section class="card pop">
  ${top('<button class="back md-link" type="button" data-act="back">← Step 1</button>', "Step 2 of 2")}
  <h1 class="hero-title"><span class="p">Check</span> <span class="k">the ${draft.show === "tr" ? "translations" : "pictures"}</span></h1>
  <p class="howto">${draft.show === "tr" ? `Each word shows its translation (${esc(M.TO[draft.to].name)}) instead of a picture: fix any that are wrong.` : "Tap a picture to change it."} You can fix a word here${M.LANGS[draft.lang].rtl ? "" : ", and tap its letters to colour the sound your child learns (you can skip this)"}.</p>
  ${draft.show === "tr" ? '<p class="md-msg" id="tmsg"></p>' : ""}
</section>
${part(false)}${part(true)}
<section class="card"><div class="row"><button class="btn big" type="button" data-act="save">Save ✓</button><button class="btn ghost" type="button" data-act="back">← Back</button></div><p class="md-msg bad" id="kmsg"></p></section>`;
    if (focus != null) {
      const el = app.querySelector(`.md-w[data-i="${focus}"]`);
      el.focus();
      el.scrollIntoView({ block: "center" });
    } else window.scrollTo(0, y);
  }
  // a word changed: its letters and (if the page chose it) its picture follow, without drawing the page again
  function edited(i, w) {
    const it = draft.items[i];
    w = M.plain(w, draft.lang); // Arabic: no tashkeel
    const inp = app.querySelector(`.md-w[data-i="${i}"]`);
    if (inp && inp.value !== w) inp.value = w;
    if (it.w === w) return;
    it.w = w;
    delete it.m;
    if (it.auto)
      it.e = M.suggest(
        it,
        draft.lang,
        draft.items.filter((x) => !x.s).map((x) => x.w),
      );
    const r = app.querySelector(`.md-row[data-i="${i}"]`);
    const pic = r.querySelector(".md-pic");
    if (pic) {
      pic.textContent = it.e || "❓";
      pic.classList.toggle("two", M.pics(it.e).length > 1);
    }
    // a translation found by the page is found again for the new word
    if (draft.show === "tr" && (it.autoT || !it.t)) {
      delete it.t;
      const ti = r.querySelector(".md-t");
      if (ti) ti.value = "";
      translateAll();
    }
    const L = r.querySelector(".md-letters");
    if (L) L.outerHTML = letters(it, i);
  }
  function setPic(i, e) {
    const it = draft.items[i];
    it.auto = false;
    // a sentence: the first tap replaces its picture, the second adds a second emoji
    it.e = it.s && e && !fresh ? M.pics(M.pics(it.e)[0] + e).join("") : e;
    fresh = false;
    if (!it.s || !e || M.pics(it.e).length >= 2) picking = -1;
    check();
  }
  function save() {
    const items = draft.items
      .filter((it) => it.w.trim())
      .map(({ auto, autoT, ...it }) => it);
    if (!items.length) return msg("kmsg", "Add at least one word first.", true);
    const d = M.save({
      id: draft.id,
      title: draft.title,
      lang: draft.lang,
      made: draft.made,
      show: draft.show,
      to: draft.to,
      items,
    });
    if (!d)
      return msg(
        "kmsg",
        "There is no room left on this device to save it.",
        true,
      );
    flash = d.id;
    draft = null;
    list();
  }

  /* ---------- taps and typing ---------- */
  app.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-act]");
    if (!b) return;
    const i = +b.dataset.i;
    const id = b.dataset.id;
    switch (b.dataset.act) {
      case "new":
        draft = {
          id: "",
          title: "",
          lang: "en-US",
          show: "pic",
          to: "uk",
          text: "",
          items: [],
        };
        return paste();
      case "cancel":
        trRun++;
        draft = null;
        return list();
      case "lang":
        draft.lang = b.dataset.lang;
        app
          .querySelectorAll("[data-lang]")
          .forEach((x) => x.setAttribute("aria-pressed", x === b));
        draft.title = document.getElementById("title").value;
        draft.text = document.getElementById("text").value;
        fitLang();
        return;
      case "show":
        draft.show = b.dataset.show;
        app
          .querySelectorAll("[data-show]")
          .forEach((x) => x.setAttribute("aria-pressed", x === b));
        document.getElementById("toBox").hidden = draft.show !== "tr";
        document.getElementById("trHint").hidden = draft.show !== "tr";
        fitLang();
        return;
      case "to":
        draft.to = b.dataset.to;
        fitLang();
        return;
      case "next":
        return next();
      case "back":
        trRun++;
        draft.text = toText(draft.items.filter((it) => it.w.trim()));
        return paste();
      case "pick":
        picking = picking === i ? -1 : i;
        fresh = true;
        check();
        if (picking >= 0)
          app.querySelector(".md-pick").scrollIntoView({ block: "nearest" });
        return;
      case "set":
        return setPic(i, b.dataset.e);
      case "letter": {
        const it = draft.items[i],
          j = +b.dataset.j;
        const m = new Set(it.m || []);
        m.has(j) ? m.delete(j) : m.add(j);
        it.m = [...m].sort((a, c) => a - c);
        b.setAttribute("aria-pressed", m.has(j));
        return;
      }
      case "drop":
        draft.items.splice(i, 1);
        picking = -1;
        return check();
      case "add": {
        const s = b.dataset.s === "1";
        // after the last row of its kind
        let at = draft.items.length;
        if (!s) at = draft.items.filter((x) => !x.s).length;
        const its = draft.items
          .filter((x) => !x.s)
          .concat(draft.items.filter((x) => x.s));
        its.splice(at, 0, { w: "", s, e: "", auto: true });
        draft.items = its;
        picking = -1;
        return check(at);
      }
      case "save":
        return save();
      case "share":
        return share(id);
      case "copy":
        return copy(id);
      case "edit": {
        const d = M.get(id);
        if (!d) return;
        draft = {
          ...d,
          toWas: d.to,
          text: toText(d.items),
          items: d.items.map((it) => ({ ...it })),
        };
        picking = -1;
        return Promise.all([M.loadEmoji(d.lang), M.loadEmoji("en-US")]).then(
          () => check(),
        );
      }
      case "del": {
        const d = M.get(id);
        if (d && confirm(`Delete “${d.title}”?`)) {
          M.remove(id);
          list();
        }
        return;
      }
      case "addcode":
        return addCode();
      case "keep":
        return keep();
      case "skip":
        clearHash();
        return list();
    }
  });
  app.addEventListener("input", (ev) => {
    const t = ev.target;
    if (t.classList.contains("md-q")) {
      const i = +t.dataset.i;
      document.getElementById("grid").innerHTML = grid(found(t.value, i), i);
    }
    if (t.id === "text") fitLang();
  });
  app.addEventListener("change", (ev) => {
    const t = ev.target;
    if (t.classList.contains("md-w"))
      edited(+t.dataset.i, t.value.replace(/\s+/g, " ").trim());
    // a translation typed by the parent stays, even when the word changes
    if (t.classList.contains("md-t")) {
      const it = draft.items[+t.dataset.i];
      it.t = t.value.replace(/\s+/g, " ").trim();
      it.autoT = false;
    }
  });
  app.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && ev.target.id === "code") addCode();
    if (ev.key === "Enter" && /md-[wt]\b/.test(ev.target.className))
      ev.target.blur();
  });

  /* ---------- start: a shared link (#add=…) or the list ---------- */
  async function start() {
    if (/[#&]add=/.test(location.hash))
      incoming = await M.decode(location.hash);
    list();
  }
  addEventListener("hashchange", start);
  start();
})();
