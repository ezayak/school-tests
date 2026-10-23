// Main screen: grade + subject filters, game cards, install button.
(function () {
  const PERIODS = [
    "Mid-term exam",
    "Final exam",
    "Subjects",
    "Mid-term 1",
    "Final term 1",
    "Term 1",
    "Mid-term 2",
    "Final term 2",
    "Term 2",
    "Mid-term 3",
    "Final term 3",
    "Term 3",
  ];
  const SUBJ = {
    Science: "var(--sci)",
    "Social Studies": "var(--ss)",
    "Social Studies (Arabic)": "var(--ssa)",
    French: "var(--fr)",
    English: "var(--en)",
    Religion: "var(--rel)",
    Computer: "var(--comp)",
  };
  const games = window.GAMES || [];
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
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
        localStorage.setItem(k, v);
      } catch (e) {}
    },
  };
  let grade = store.get("st-grade") || "all";
  let subject = store.get("st-subject") || "all";
  const grades = [...new Set(games.map((g) => g.grade))].sort((a, b) => a - b);
  const subjects = [...new Set(games.map((g) => g.subject))].sort();
  if (grade !== "all" && !grades.includes(+grade)) grade = "all";
  if (subject !== "all" && !subjects.includes(subject)) subject = "all";
  const pIdx = (p) => {
    const i = PERIODS.indexOf(p);
    return i < 0 ? 99 : i;
  };
  function draw() {
    document.getElementById("filters").innerHTML = ["all", ...grades]
      .map((v) => {
        const n =
          v === "all"
            ? games.length
            : games.filter((g) => g.grade === v).length;
        return `<button type="button" id="f-${v}" data-g="${v}" aria-pressed="${String(v) === String(grade)}"><b>${v === "all" ? "All grades" : "Grade " + v}</b><small>${n} game${n === 1 ? "" : "s"}</small></button>`;
      })
      .join("");
    document.querySelectorAll("[data-g]").forEach(
      (b) =>
        (b.onclick = () => {
          grade = b.dataset.g;
          store.set("st-grade", grade);
          draw();
        }),
    );
    document.getElementById("subjects").innerHTML = ["all", ...subjects]
      .map(
        (v, i) =>
          `<button type="button" id="s-${i}" data-s="${esc(v)}" aria-pressed="${v === subject}"${v === "all" ? "" : ` style="--c:${SUBJ[v] || "var(--other)"}"`}>${v === "all" ? "All subjects" : esc(v)}</button>`,
      )
      .join("");
    document.querySelectorAll("[data-s]").forEach(
      (b) =>
        (b.onclick = () => {
          subject = b.dataset.s;
          store.set("st-subject", subject);
          draw();
        }),
    );
    const pool = games.filter(
      (g) => subject === "all" || g.subject === subject,
    );
    const show = grades.filter(
      (g) =>
        (grade === "all" || String(g) === String(grade)) &&
        pool.some((x) => x.grade === g),
    );
    document.getElementById("list").innerHTML = show.length
      ? show
          .map((gr) => {
            const gs = pool.filter((g) => g.grade === gr);
            return `<section class="grade"><h2>Grade ${gr}<small>${gs.length} game${gs.length > 1 ? "s" : ""}</small></h2>${subjectCards(gs)}${revisions(gs)}</section>`;
          })
          .join("")
      : '<p class="empty">No games for this choice yet.</p>';
  }
  const bySubject = (a, b) => a.subject.localeCompare(b.subject);
  const card = (g) =>
    `<a class="game${g.subject === "Religion" ? " light-c" : ""}" style="--c:${SUBJ[g.subject] || "var(--other)"}" href="${esc(g.path)}"><span class="subj">${esc(g.subject)}</span><span class="t">${esc(g.title)}</span><span class="l">${esc(g.lesson || "")}</span><p class="tp">${esc(g.topics || "")}</p><span class="meta"><span>${g.countLabel ? esc(g.countLabel) : g.questions ? g.questions + " questions" : ""}${g.year ? " · " + esc(g.year) : ""}</span><span class="go play-arrow">${g.hub ? "Open →" : "Play →"}</span></span></a>`;
  // Revisions → Term N → Mid-term / Final → subject cards (every term with a revision shows both exams)
  function revisions(gs) {
    const rev = gs.filter((g) => g.period !== "Subjects");
    if (!rev.length) return "";
    const terms = [...new Set(rev.map((g) => g.term))].sort((a, b) => a - b);
    return `<div class="part"><h3>Revisions</h3>${terms
      .map((t) => {
        const inTerm = rev.filter((g) => g.term === t);
        const periods = [
          ...new Set([
            "Mid-term exam",
            "Final exam",
            ...inTerm.map((g) => g.period),
          ]),
        ].sort((a, b) => pIdx(a) - pIdx(b));
        return `<div class="term"><h4>Term ${esc(t)}</h4>${periods
          .map((p) => {
            const items = inTerm.filter((g) => g.period === p).sort(bySubject);
            return `<div class="period"><h5>${esc(p.replace(/ exam$/, ""))}</h5>${items.length ? `<div class="cards">${items.map(card).join("")}</div>` : '<p class="empty">No revisions yet.</p>'}</div>`;
          })
          .join("")}</div>`;
      })
      .join("")}</div>`;
  }
  // Subjects → one card per subject, its hub holds the lessons of every term
  function subjectCards(gs) {
    const items = gs.filter((g) => g.period === "Subjects").sort(bySubject);
    if (!items.length) return "";
    return `<div class="part"><h3>Subjects</h3><div class="cards">${items.map(card).join("")}</div></div>`;
  }
  // Install button (Android / Chrome / Edge). iPad: Share → Add to Home Screen.
  let deferred = null;
  const ib = document.getElementById("installBtn");
  addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e;
    ib.hidden = false;
  });
  ib.onclick = async () => {
    if (!deferred) return;
    deferred.prompt();
    try {
      await deferred.userChoice;
    } catch (e) {}
    deferred = null;
    ib.hidden = true;
  };
  addEventListener("appinstalled", () => {
    ib.hidden = true;
  });
  const standalone =
    matchMedia("(display-mode: standalone)").matches || navigator.standalone;
  if (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    if (!standalone) {
      const t = document.createElement("p");
      t.className = "ios-tip";
      t.textContent =
        "To install on iPad: tap Share, then “Add to Home Screen”.";
      document.querySelector("header").appendChild(t);
    }
  }
  draw();
})();
