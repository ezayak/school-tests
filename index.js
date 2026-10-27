// Main screen: school switch, grade + subject filters, game cards, install button.
(function () {
  // One button per school in the switch. A game belongs to the school in its school: field (no field = SJAS).
  // logo: a picture in icons/ (wide: true for a logo with the name in it), or ic: an emoji shown with the name.
  // revisions: false → only the Subjects cards, no Revisions part.
  const SCHOOLS = [
    { k: "sjas", name: "SJAS", logo: "icons/sjas.png", revisions: true },
    {
      k: "optima",
      name: "Optima",
      logo: "icons/optima.svg",
      wide: true,
      revisions: false,
    },
  ];
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
    "Українська література": "var(--ulit)",
  };
  const ALL = window.GAMES || [];
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
  let school = store.get("st-school") || "sjas";
  if (!SCHOOLS.some((s) => s.k === school)) school = "sjas";
  let term = +store.get("st-term") || 0; // chosen term for Revisions; 0 = the latest term with a revision
  // the games, grades and subjects of the chosen school, and its saved grade / subject filters
  // (SJAS keeps the old keys st-grade / st-subject, the other schools add their name)
  let SCH, games, grades, subjects, grade, subject;
  const key = (k) => (school === "sjas" ? k : `${k}-${school}`);
  function useSchool() {
    SCH = SCHOOLS.find((s) => s.k === school);
    games = ALL.filter((g) => (g.school || "sjas") === school);
    grades = [...new Set(games.map((g) => g.grade))].sort((a, b) => a - b);
    subjects = [...new Set(games.map((g) => g.subject))].sort();
    grade = store.get(key("st-grade")) || "all";
    subject = store.get(key("st-subject")) || "all";
    if (grade !== "all" && !grades.includes(+grade)) grade = "all";
    if (subject !== "all" && !subjects.includes(subject)) subject = "all";
    document.body.dataset.school = school; // its own paper colour (shared/theme.css)
  }
  const pIdx = (p) => {
    const i = PERIODS.indexOf(p);
    return i < 0 ? 99 : i;
  };
  function draw() {
    document.getElementById("school").innerHTML = SCHOOLS.map(
      (s) =>
        `<button type="button" id="sc-${s.k}" data-sc="${s.k}" aria-pressed="${s.k === school}" title="${esc(s.name)}">${s.logo ? `<img${s.wide ? ' class="wide"' : ""} src="${esc(s.logo)}" alt="${esc(s.name)}">` : `<span aria-hidden="true">${s.ic || ""}</span>${esc(s.name)}`}</button>`,
    ).join("");
    document.querySelectorAll("[data-sc]").forEach(
      (b) =>
        (b.onclick = () => {
          if (b.dataset.sc === school) return;
          school = b.dataset.sc;
          store.set("st-school", school);
          useSchool();
          draw();
        }),
    );
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
          store.set(key("st-grade"), grade);
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
          store.set(key("st-subject"), subject);
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
            return `<section class="grade"><h2>Grade ${gr}<small>${gs.length} game${gs.length > 1 ? "s" : ""}</small></h2>${subjectCards(gs)}${SCH.revisions ? revisions(gs) : ""}</section>`;
          })
          .join("")
      : '<p class="empty">No games for this choice yet.</p>';
    document.querySelectorAll("[data-t]").forEach(
      (b) =>
        (b.onclick = () => {
          term = +b.dataset.t;
          store.set("st-term", term);
          draw();
        }),
    );
    // Mid-term / Final fold: remember open or closed for each grade, term and exam
    document
      .querySelectorAll("details[data-k]")
      .forEach(
        (d) =>
          (d.ontoggle = () =>
            store.set("st-fold-" + d.dataset.k, d.open ? "1" : "0")),
      );
  }
  const bySubject = (a, b) => a.subject.localeCompare(b.subject);
  const card = (g) =>
    `<a class="game${g.subject === "Religion" ? " light-c" : ""}" style="--c:${SUBJ[g.subject] || "var(--other)"}" href="${esc(g.path)}"><span class="subj">${esc(g.subject)}</span><span class="t">${esc(g.title)}</span><span class="l">${esc(g.lesson || "")}</span><p class="tp">${esc(g.topics || "")}</p><span class="meta"><span>${g.countLabel ? esc(g.countLabel) : g.questions ? g.questions + " questions" : ""}${g.year ? " · " + esc(g.year) : ""}</span><span class="go play-arrow">${g.hub ? "Open →" : "Play →"}</span></span></a>`;
  // Revisions → term buttons (one term at a time) → Mid-term / Final, each a section that folds → subject cards
  function revisions(gs) {
    const rev = gs.filter((g) => g.period !== "Subjects");
    if (!rev.length) return "";
    const gr = rev[0].grade;
    const terms = [
      ...new Set(
        games
          .filter((g) => g.grade === gr && g.period !== "Subjects")
          .map((g) => g.term),
      ),
    ].sort((a, b) => a - b);
    const t = terms.includes(term) ? term : terms[terms.length - 1];
    const inTerm = rev.filter((g) => g.term === t);
    const periods = [
      ...new Set([
        "Mid-term exam",
        "Final exam",
        ...inTerm.map((g) => g.period),
      ]),
    ].sort((a, b) => pIdx(a) - pIdx(b));
    return `<div class="part"><div class="part-head"><h3>Revisions</h3><div class="filters terms" role="group" aria-label="Show term">${terms
      .map(
        (v) =>
          `<button type="button" id="t-${gr}-${v}" data-t="${v}" aria-pressed="${v === t}">Term ${esc(v)}</button>`,
      )
      .join("")}</div></div>${periods
      .map((p) => {
        const items = inTerm.filter((g) => g.period === p).sort(bySubject);
        const k = `${gr}-${t}-${p}`;
        const saved = store.get("st-fold-" + k);
        const open = saved === null ? items.length > 0 : saved === "1";
        return `<details class="period" data-k="${esc(k)}"${open ? " open" : ""}><summary>${esc(p.replace(/ exam$/, ""))}<small>${items.length || "No"} revision${items.length === 1 ? "" : "s"}</small></summary>${items.length ? `<div class="cards">${items.map(card).join("")}</div>` : '<p class="empty">No revisions yet.</p>'}</details>`;
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
  useSchool();
  draw();
})();
