// Main screen: school switch, grade filter, a side bar (Subjects · Revision T1 · Revision T2 …), game cards, install button.
(function () {
  // One button per school in the switch. A game belongs to the school in its school: field (no field = SJAS).
  // logo: a picture in icons/ (wide: true for a logo with the name in it), or ic: an emoji shown with the name.
  // revisions: true → a side bar: Subjects, then one Revision part per term that has revisions (Mid-term / Final folds);
  // false → only the Subjects cards, no side bar.
  // by: the filter and the sections group the games by this field instead of grade
  // ({f: the field, all: the "all" button, names: {value: its name}, in this order}).
  // subjectsTitle: the heading above the cards (default Subjects).
  const SCHOOLS = [
    { k: "sjas", name: "SJAS", logo: "icons/sjas.png", revisions: true },
    {
      k: "optima",
      name: "Optima",
      logo: "icons/optima.svg",
      wide: true,
      revisions: false,
    },
    {
      k: "speech",
      name: "Мовлення",
      ic: "🗣️",
      revisions: false,
      subjectsTitle: "Topics",
      by: {
        f: "lang",
        all: "All languages",
        names: { uk: "Українська", en: "English", ar: "العربية" },
      },
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
    Math: "var(--math)",
    "Українська література": "var(--ulit)",
    Математика: "var(--math)",
    ABC: "var(--speech)",
    Syllables: "var(--speech)",
    Sentences: "var(--speech)",
    Verbs: "var(--speech)",
    Body: "var(--speech)",
    Grammar: "var(--speech)",
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
  // the games, grades and side bar parts of the chosen school, its saved grade filter and open part
  // (SJAS keeps the old key st-grade, the other schools add their name)
  let SCH, games, grades, terms, grade, sec;
  const key = (k) => (school === "sjas" ? k : `${k}-${school}`);
  // a game's grade (or the school's by field), and its name on the filter and the section
  const lv = (g) => (SCH.by ? g[SCH.by.f] : g.grade);
  const lvName = (v) => (SCH.by ? SCH.by.names[v] || v : "Grade " + v);
  // Anchors: #sjas, #optima/grade-4, #speech/en open that school and its grade (or language) filter; no filter = all.
  // The address follows the switch and the filter (replaceState: no extra Back steps), so a link can be copied at any time.
  function fromHash() {
    const [sc, f] = decodeURIComponent(location.hash.slice(1)).split("/");
    if (!SCHOOLS.some((s) => s.k === sc)) return false;
    school = sc;
    store.set("st-school", school);
    store.set(key("st-grade"), (f || "all").replace(/^grade-/, ""));
    return true;
  }
  function toHash() {
    const f = grade === "all" ? "" : "/" + (SCH.by ? grade : "grade-" + grade);
    history.replaceState(null, "", "#" + school + f);
  }
  function useSchool() {
    SCH = SCHOOLS.find((s) => s.k === school);
    games = ALL.filter((g) => (g.school || "sjas") === school);
    const order = SCH.by ? Object.keys(SCH.by.names) : [];
    grades = [...new Set(games.map(lv))].sort((a, b) =>
      SCH.by ? order.indexOf(a) - order.indexOf(b) : a - b,
    );
    terms = SCH.revisions
      ? [
          ...new Set(
            games.filter((g) => g.period !== "Subjects").map((g) => g.term),
          ),
        ].sort((a, b) => a - b)
      : [];
    grade = store.get(key("st-grade")) || "all";
    if (grade !== "all" && !grades.map(String).includes(grade)) grade = "all";
    sec = store.get(key("st-sec")) || "subjects"; // Kit.sideNav opens Subjects when that part is gone
    document.body.dataset.school = school; // its own paper colour (shared/theme.css)
  }
  const pIdx = (p) => {
    const i = PERIODS.indexOf(p);
    return i < 0 ? 99 : i;
  };
  // School switch, built once: a thumb slides under the chosen logo, and the page slides in from that school's side
  const sw = document.getElementById("school");
  sw.innerHTML =
    '<span class="thumb" aria-hidden="true"></span>' +
    SCHOOLS.map(
      (s) =>
        `<button type="button" id="sc-${s.k}" data-sc="${s.k}" title="${esc(s.name)}">${s.logo ? `<img${s.wide ? ' class="wide"' : ""} src="${esc(s.logo)}" alt="${esc(s.name)}">` : `<span aria-hidden="true">${s.ic || ""}</span>${esc(s.name)}`}</button>`,
    ).join("");
  const thumb = sw.querySelector(".thumb");
  function moveThumb() {
    sw.querySelectorAll("[data-sc]").forEach((b) => {
      const on = b.dataset.sc === school;
      b.setAttribute("aria-pressed", on);
      if (on) {
        thumb.style.left = b.offsetLeft + "px";
        thumb.style.width = b.offsetWidth + "px";
      }
    });
  }
  new ResizeObserver(moveThumb).observe(sw); // again when the logos have loaded
  const calm = matchMedia("(prefers-reduced-motion: reduce)");
  // the same slide for every change on this page: els slide in from the right (dir 1) or the left (dir -1), one after the other
  function slide(els, dir) {
    if (calm.matches || !document.body.animate) return;
    [...els].forEach((el, i) =>
      el.animate(
        [
          { opacity: 0, transform: `translateX(${dir * 40}px)` },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 380,
          delay: i * 60,
          easing: "cubic-bezier(.2,.8,.3,1)",
          fill: "backwards",
        },
      ),
    );
  }
  const place = (k) => SCHOOLS.findIndex((s) => s.k === k);
  sw.querySelectorAll("[data-sc]").forEach(
    (b) =>
      (b.onclick = () => {
        if (b.dataset.sc === school) return;
        const dir = place(b.dataset.sc) > place(school) ? 1 : -1;
        school = b.dataset.sc;
        store.set("st-school", school);
        sw.classList.add("anim"); // no slide on the first drawing, only when a school is tapped
        useSchool();
        moveThumb();
        draw();
        slide(
          [document.querySelector(".tools"), document.getElementById("list")],
          dir,
        );
      }),
  );
  function draw() {
    toHash();
    document.getElementById("filters").innerHTML = ["all", ...grades]
      .map((v) => {
        const n =
          v === "all" ? games.length : games.filter((g) => lv(g) === v).length;
        return `<button type="button" id="f-${v}" data-g="${v}" aria-pressed="${String(v) === String(grade)}"><b>${v === "all" ? (SCH.by ? SCH.by.all : "All grades") : esc(lvName(v))}</b><small>${n} game${n === 1 ? "" : "s"}</small></button>`;
      })
      .join("");
    document.querySelectorAll("[data-g]").forEach(
      (b) =>
        (b.onclick = () => {
          if (b.dataset.g === String(grade)) return;
          const g = ["all", ...grades].map(String);
          const dir =
            g.indexOf(b.dataset.g) > g.indexOf(String(grade)) ? 1 : -1;
          grade = b.dataset.g;
          store.set(key("st-grade"), grade);
          draw();
          slide([panel()], dir);
        }),
    );
    // the side bar: Subjects, then Revision T1, T2 … (only the terms with revisions); the grade filter applies to every part
    const pool = games.filter(
      (g) => grade === "all" || String(lv(g)) === String(grade),
    );
    const parts = [
      {
        k: "subjects",
        ic: "📚",
        t: SCH.subjectsTitle || "Subjects",
        f: (g) => g.period === "Subjects",
        html: subjectCards,
      },
      ...terms.map((t) => ({
        k: "t" + t,
        ic: "📝",
        t: "Revision T" + t,
        f: (g) => g.period !== "Subjects" && g.term === t,
        html: (gs, gr) => revisions(gs, gr, t),
      })),
    ].map((p) => {
      const gs = pool.filter(p.f);
      // a revision part shows every grade that has revisions in any term, so Mid-term / Final say "No revisions yet"
      const shown = grades.filter((gr) =>
        (p.k === "subjects"
          ? gs
          : pool.filter((g) => g.period !== "Subjects")
        ).some((g) => lv(g) === gr),
      );
      return {
        k: p.k,
        ic: p.ic,
        t: p.t,
        n: gs.length,
        html: shown.length
          ? shown
              .map((gr) => {
                const n = gs.filter((g) => lv(g) === gr).length;
                // no side bar (only Subjects): the heading names the part
                return `<section class="grade"><h2>${esc(lvName(gr))}<small>${n} game${n === 1 ? "" : "s"}</small></h2>${terms.length ? "" : `<h3>${esc(p.t)}</h3>`}${p.html(
                  gs.filter((g) => lv(g) === gr),
                  gr,
                )}</section>`;
              })
              .join("")
          : '<p class="empty">No games for this choice yet.</p>',
      };
    });
    const all = parts.map((p) => p.k);
    Kit.sideNav(document.getElementById("list"), parts, {
      open: sec,
      pick(k) {
        const dir = all.indexOf(k) > all.indexOf(sec) ? 1 : -1;
        sec = k;
        store.set(key("st-sec"), sec);
        draw();
        slide([panel()], dir);
      },
    });
    // Mid-term / Final fold: remember open or closed for each grade, term and exam
    document.querySelectorAll("details[data-k]").forEach((d) => {
      // "toggle" also comes when an open section is drawn: the cards slide only after a tap
      d.querySelector("summary").onclick = () => (d.dataset.tapped = "1");
      d.ontoggle = () => {
        store.set("st-fold-" + d.dataset.k, d.open ? "1" : "0");
        if (d.open && d.dataset.tapped)
          slide(d.querySelectorAll(".cards, .empty"), 1);
      };
    });
  }
  // what moves when the grade or the side bar changes: the cards, not the bar
  const panel = () =>
    document.querySelector("#list .snav-panel") ||
    document.getElementById("list");
  const bySubject = (a, b) => a.subject.localeCompare(b.subject);
  const card = (g) =>
    `<a class="game${g.subject === "Religion" ? " light-c" : ""}" style="--c:${SUBJ[g.subject] || "var(--other)"}" href="${esc(g.path)}"><span class="subj">${esc(g.subject)}</span><span class="t">${esc(g.title)}</span><span class="l">${esc(g.lesson || "")}</span><p class="tp">${esc(g.topics || "")}</p><span class="meta"><span>${g.countLabel ? esc(g.countLabel) : g.questions ? g.questions + " questions" : ""}${g.year ? " · " + esc(g.year) : ""}</span><span class="go play-arrow">${g.hub ? "Open →" : "Play →"}</span></span></a>`;
  // Revision Tn → Mid-term / Final, each a section that folds → subject cards
  function revisions(gs, gr, t) {
    const periods = [
      ...new Set(["Mid-term exam", "Final exam", ...gs.map((g) => g.period)]),
    ].sort((a, b) => pIdx(a) - pIdx(b));
    return `<div class="part">${periods
      .map((p) => {
        const items = gs.filter((g) => g.period === p).sort(bySubject);
        const k = `${gr}-${t}-${p}`;
        const saved = store.get("st-fold-" + k);
        const open = saved === null ? items.length > 0 : saved === "1";
        return `<details class="period" data-k="${esc(k)}"${open ? " open" : ""}><summary>${esc(p.replace(/ exam$/, ""))}<small>${items.length || "No"} revision${items.length === 1 ? "" : "s"}</small></summary>${items.length ? `<div class="cards">${items.map(card).join("")}</div>` : '<p class="empty">No revisions yet.</p>'}</details>`;
      })
      .join("")}</div>`;
  }
  // Subjects → one card per subject, its hub holds the lessons of every term
  function subjectCards(gs) {
    return `<div class="part"><div class="cards">${gs.slice().sort(bySubject).map(card).join("")}</div></div>`;
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
  fromHash();
  useSchool();
  moveThumb();
  draw();
  addEventListener("hashchange", () => {
    if (!fromHash()) return;
    useSchool();
    moveThumb();
    draw();
  });
})();
