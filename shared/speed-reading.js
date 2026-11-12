// Speed reading (Optima, Швидкочитання): small games that train reading accuracy and the eye.
// <body data-view="list"> → the hub (window.SPEED from list.js): the cards in three side-bar sections
// (Kit.sideNav; the page loads shared/common.js first): Щодня · Книжка · Тексти.
(function () {
  "use strict";
  const { esc } = Kit;
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "game";
  const SUBJ = "Швидкочитання";
  const HOME = "../../../index.html";

  /* ================= the hub ================= */
  if (view === "list") {
    const S = window.SPEED || { grade: 3, items: [] };
    const SECS = [
      {
        k: "daily",
        ic: "🎯",
        t: "Щодня",
        label: "Гра",
        soon: "Ігри на щодень з’являться тут.",
      },
      {
        k: "book",
        ic: "📒",
        t: "Книжка",
        label: "Гра",
        soon: "Вправи для очей із книжки з’являться тут.",
      },
      {
        k: "texts",
        ic: "⏱",
        t: "Тексти",
        label: "Текст",
        soon: "Тексти з книжки з’являться тут.",
      },
    ];
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="${HOME}">← Усі ігри</a><span class="eyebrow">${esc(S.grade)} клас · ${SUBJ}</span></div>
    <h1 class="hero-title"><span class="k">${SUBJ}</span></h1>
    <p class="howto">${esc(S.intro || "")}</p>
  </section>
  <div id="secs"></div>`;
    Kit.sideNav(
      document.getElementById("secs"),
      SECS.map((s) => {
        const list = S.items.filter((it) => it.sec === s.k);
        return {
          k: s.k,
          ic: s.ic,
          t: s.t,
          n: list.length || null,
          html: list.length
            ? `<div class="items">${list.map((it) => Kit.lessonCard(it, s.label)).join("")}</div>`
            : `<div class="soon">${esc(s.soon)}</div>`,
        };
      }),
    );
    document.title = `${SUBJ} · ${S.grade} клас`;
    return;
  }
})();
