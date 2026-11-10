// English subject page: renders window.ENGLISH (from the grade's english/dictations.js).
// Each item: {kind:"Lesson" | "Dictation" | "Story", title, sound, words, date, term, note, path}; one section per kind, in the order they first appear
// The kinds are sections of the side bar (Kit.sideNav; the page loads shared/common.js first); one kind only: no bar.
// term: 2 shows a small "Term 2" tag in the card's header (items of the grade's later terms, listed on this same page)
(function () {
  const E = window.ENGLISH || { items: [] };
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const card = (it) =>
    `<a class="item" href="${esc(it.path)}"><span class="band"><span class="snd">${esc(it.sound || "")}</span>${it.date ? `<span class="date">${esc(it.date)}</span>` : ""}${it.term ? `<span class="term">Term ${esc(it.term)}</span>` : ""}</span><span class="in"><span class="n">${esc(it.kind || "Dictation")}</span><span class="t">${esc(it.title)}</span><span class="w">${esc(it.words || "")}</span><span class="meta"><span>${esc(it.note || "")}</span><span class="go play-arrow">${{ Story: "Read →", Lesson: "Open →" }[it.kind] || "Play →"}</span></span></span></a>`;
  const kinds = [...new Set(E.items.map((i) => i.kind || "Dictation"))];
  document.getElementById("app").innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="../../../index.html">← All games</a><span class="eyebrow">Grade ${esc(E.grade)} · English</span></div>
    <h1 class="hero-title"><span class="p">English</span> <span class="k">${esc(E.heading || "Dictations")}</span></h1>
    <p class="howto">${esc(E.intro || "Pick a dictation. Each one has Learn cards, Match, Listen & spell and Build the word, for the words and the sentences.")}</p>
  </section>
  <div id="secs"></div>
  <div class="soon">New dictations will be added here, week by week.</div>`;
  const IC = { Lesson: "📘", Dictation: "✏️", Story: "📖" };
  Kit.sideNav(
    document.getElementById("secs"),
    kinds.map((k) => {
      const list = E.items.filter((i) => (i.kind || "Dictation") === k);
      return {
        k: k.toLowerCase(),
        ic: IC[k] || "📄",
        t: k.replace(/y$/, "ie") + "s",
        n: list.length,
        html: `<div class="items">${list.map(card).join("")}</div>`,
      };
    }),
  );
  document.title = `English · Grade ${E.grade}`;
})();
