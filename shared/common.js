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
  return { esc, shuf, pick, star, lessonCard };
})();
