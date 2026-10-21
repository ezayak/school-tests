// Mini Windows: a pretend Windows 11 desktop for the Computer lessons (Grade 4).
// WinSim.create(box, opts) draws it inside box. Everything the child can press has data-t="<target>",
// e.g. "task-search", "file:Grammar.docx", "menu:more". A mission is a list of steps
// {act:'click'|'dbl'|'right'|'drag'|'type'|'hover'|'look', t:'<target>', to:'desktop', text:'Subjects'}.
//   sim.run(steps, {mode:'demo'|'try', onStep(i,step) → Promise, onWrong(step,why), onDone()})
// 'demo' moves a pretend mouse and does each step by itself; 'try' waits for the child and gently
// blocks wrong clicks (the right place glows). Without a mission everything just works (free play).
(function () {
  "use strict";
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const SW = 960,
    SH = 540,
    TB = 48; // screen size (scaled to fit) and taskbar height
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ================= icons (simple drawings, not real logos) ================= */
  const page = (band, label, extra = "") =>
    `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 3h20l10 10v32H10z" fill="#fff" stroke="#8a94a6" stroke-width="1.6"/><path d="M30 3v10h10" fill="#e9edf3" stroke="#8a94a6" stroke-width="1.6"/>${band ? `<rect x="4" y="18" width="22" height="18" rx="3" fill="${band}"/><text x="15" y="31" text-anchor="middle" font-size="${label.length > 3 ? 7.5 : 9}" font-weight="700" fill="#fff" font-family="Arial,sans-serif">${label}</text>` : ""}<g stroke="#b5bdc9" stroke-width="1.6">${band ? '<path d="M29 22h7M29 27h7M29 32h7M14 40h22"/>' : '<path d="M15 16h20M15 21h20M15 26h20M15 31h20M15 36h14"/>'}</g>${extra}</svg>`;
  const ICONS = {
    folder: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M3 10a3 3 0 0 1 3-3h12l4 5h20a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#e8a91c"/><path d="M3 17h42v22a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#ffcf4a"/></svg>`,
    zip: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M3 10a3 3 0 0 1 3-3h12l4 5h20a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#e8a91c"/><path d="M3 17h42v22a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#ffcf4a"/><path d="M22 17h5v25h-5z" fill="#6b7280"/><g fill="#d1d5db"><rect x="22" y="19" width="2.5" height="2.5"/><rect x="24.5" y="22" width="2.5" height="2.5"/><rect x="22" y="25" width="2.5" height="2.5"/><rect x="24.5" y="28" width="2.5" height="2.5"/><rect x="22" y="31" width="2.5" height="2.5"/></g></svg>`,
    docx: page("#2b62c9", "DOC"),
    pdf: page("#d23b2e", "PDF"),
    pptx: page("#d2622a", "PPT"),
    xlsx: page("#1e8a4c", "XLS"),
    txt: page("", "TXT"),
    mp3: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 3h20l10 10v32H10z" fill="#fff" stroke="#8a94a6" stroke-width="1.6"/><path d="M30 3v10h10" fill="#e9edf3" stroke="#8a94a6" stroke-width="1.6"/><path d="M21 34V18l12-3v15" fill="none" stroke="#7b3fe4" stroke-width="2.6"/><circle cx="18" cy="34" r="4" fill="#7b3fe4"/><circle cx="30" cy="31" r="4" fill="#7b3fe4"/></svg>`,
    mp4: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 3h20l10 10v32H10z" fill="#fff" stroke="#8a94a6" stroke-width="1.6"/><path d="M30 3v10h10" fill="#e9edf3" stroke="#8a94a6" stroke-width="1.6"/><rect x="14" y="18" width="22" height="16" rx="3" fill="#1f2937"/><path d="M22 22v8l7-4z" fill="#fff"/></svg>`,
    jpg: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="3" y="8" width="42" height="32" rx="3" fill="#7cc7f2"/><circle cx="35" cy="17" r="5" fill="#ffd23f"/><path d="M3 32l12-11 10 9 6-5 14 12v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#5bb04a"/><rect x="3" y="8" width="42" height="32" rx="3" fill="none" stroke="#3b6e93" stroke-width="1.6"/></svg>`,
    bin: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 13h26l-3 30H14z" fill="#dbe7f3" stroke="#6b84a0" stroke-width="1.8"/><path d="M8 10h32" stroke="#6b84a0" stroke-width="3" stroke-linecap="round"/><path d="M19 22a6 6 0 0 1 10 0M30 30a6 6 0 0 1-9 4M18 31l-1-4" fill="none" stroke="#2f7de1" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    binfull: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 6l6 6M24 4v8M33 6l-5 6" stroke="#9aa6b5" stroke-width="3"/><path d="M11 13h26l-3 30H14z" fill="#dbe7f3" stroke="#6b84a0" stroke-width="1.8"/><path d="M8 10h32" stroke="#6b84a0" stroke-width="3" stroke-linecap="round"/><path d="M19 22a6 6 0 0 1 10 0M30 30a6 6 0 0 1-9 4M18 31l-1-4" fill="none" stroke="#2f7de1" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    pc: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="8" width="40" height="26" rx="3" fill="#2f7de1" stroke="#1f4f8f" stroke-width="1.6"/><path d="M19 34h10l2 6H17z" fill="#9aa6b5"/><path d="M13 41h22" stroke="#6b7280" stroke-width="3" stroke-linecap="round"/></svg>`,
    app: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="5" y="5" width="38" height="38" rx="10" fill="#f39a1e"/><path d="M24 12l3.6 7.4 8.1 1.1-5.9 5.7 1.4 8.1L24 30.4l-7.2 3.9 1.4-8.1-5.9-5.7 8.1-1.1z" fill="#fff"/></svg>`,
    start: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="4" width="40" height="40" rx="10" fill="#2f7de1"/><g fill="#fff">${[14, 24, 34].map((x) => [14, 24, 34].map((y) => `<circle cx="${x}" cy="${y}" r="3.4"/>`).join("")).join("")}</g></svg>`,
    explorer: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M3 10a3 3 0 0 1 3-3h12l4 5h20a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#e8a91c"/><path d="M3 17h42v22a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#ffcf4a"/><rect x="12" y="27" width="24" height="5" rx="2" fill="#2f7de1"/></svg>`,
    browser: `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="19" fill="#1fa37a"/><path d="M5 24h38M24 5c-8 8-8 30 0 38M24 5c8 8 8 30 0 38" fill="none" stroke="#fff" stroke-width="2.2"/></svg>`,
    store: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 15h34l-3 27H10z" fill="#3f6fd8"/><path d="M17 15a7 7 0 0 1 14 0" fill="none" stroke="#3f6fd8" stroke-width="3"/><g fill="#fff"><rect x="17" y="22" width="6" height="6"/><rect x="25" y="22" width="6" height="6"/><rect x="17" y="30" width="6" height="6"/><rect x="25" y="30" width="6" height="6"/></g></svg>`,
    search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M15 15l6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    home: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-8 9 8v10h-6v-6H9v6H3z" fill="#e8661a"/></svg>`,
    gallery: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" fill="#2f7de1"/><path d="M2 17l6-6 5 5 3-3 6 6" fill="none" stroke="#fff" stroke-width="2"/></svg>`,
    desktop: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="2" fill="#2aa0d8"/><path d="M8 21h8" stroke="#6b7280" stroke-width="2.4"/></svg>`,
    downloads: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M6 10l6 6 6-6M4 21h16" fill="none" stroke="#1f8a4c" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    documents: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 2h10l4 4v16H5z" fill="#8094b3"/><path d="M8 10h8M8 14h8M8 18h5" stroke="#fff" stroke-width="1.6"/></svg>`,
    pictures: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" fill="#3a8ee8"/><circle cx="16" cy="9" r="2" fill="#ffd23f"/><path d="M2 18l7-7 6 6" fill="none" stroke="#fff" stroke-width="2"/></svg>`,
    music: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#e0443a"/><path d="M10 16V8l6-1v7" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="9" cy="16" r="2" fill="#fff"/><circle cx="15" cy="14" r="2" fill="#fff"/></svg>`,
    videos: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" fill="#7b3fe4"/><path d="M10 9v6l5-3z" fill="#fff"/></svg>`,
    battery: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="20.5" y="10" width="2" height="4" rx="1" fill="currentColor"/></svg>`,
    wifioff: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".35"/><circle cx="12" cy="19.5" r="1.6" fill="currentColor" opacity=".35"/><path d="M4 3l16 18" stroke="#d23b2e" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    mute: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" stroke="#d23b2e" stroke-width="2" stroke-linecap="round"/></svg>`,
    shield: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10z" fill="#2f7de1"/><path d="M17 24l5 5 10-11" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    shieldx: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10z" fill="#d23b2e"/><path d="M18 18l12 12M30 18L18 30" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/></svg>`,
    speaker: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" fill="currentColor"/><path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a8.5 8.5 0 0 1 0 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    wifi: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="19.5" r="1.6" fill="currentColor"/></svg>`,
  };
  // small line icons (menus, toolbar, power): drawn, not font symbols, so no tablet shows an empty box
  const sv = (d, extra = "") =>
    `<svg class="ws-g" viewBox="0 0 16 16" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${d}</g>${extra}</svg>`;
  const G = {
    power: sv('<path d="M8 2v6"/><path d="M4.6 4.4a5 5 0 1 0 6.8 0"/>'),
    sleep: sv(
      '<path d="M12.5 10.5A5.5 5.5 0 0 1 5.5 3.5a5.5 5.5 0 1 0 7 7z"/>',
    ),
    restart: sv('<path d="M13 8a5 5 0 1 1-1.6-3.7"/><path d="M13 2.5v3h-3"/>'),
    refresh: sv('<path d="M13 8a5 5 0 1 1-1.6-3.7"/><path d="M13 2.5v3h-3"/>'),
    undo: sv(
      '<path d="M3.5 6.5h6a3.5 3.5 0 0 1 0 7H6"/><path d="M6 3.5l-3 3 3 3"/>',
    ),
    cut: sv(
      '<circle cx="4.5" cy="12" r="2"/><circle cx="11.5" cy="12" r="2"/><path d="M6 10.5L12 2M10 10.5L4 2"/>',
    ),
    copy: sv(
      '<rect x="5" y="5" width="8.5" height="8.5" rx="1.5"/><path d="M3 10.5V3.8A1.3 1.3 0 0 1 4.3 2.5H10.5"/>',
    ),
    paste: sv(
      '<rect x="3" y="3" width="10" height="11" rx="1.5"/><path d="M6 3V2h4v1"/><path d="M5.5 7h5M5.5 9.5h5"/>',
    ),
    rename: sv(
      '<rect x="1.5" y="3.5" width="13" height="9" rx="1.5"/><path d="M4.5 10.5l2-5 2 5M5.2 9h2.6"/><path d="M11 5.5v5"/>',
    ),
    share: sv(
      '<path d="M8 10V2.5M5 5.5l3-3 3 3"/><path d="M3 8.5v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4"/>',
    ),
    trash: sv(
      '<path d="M2.5 4h11M6 4V2.5h4V4"/><path d="M4 4l.8 9.5h6.4L12 4"/><path d="M6.8 6.5v4.5M9.2 6.5v4.5"/>',
    ),
    star: sv(
      '<path d="M8 2l1.8 3.8 4.2.5-3.1 2.9.8 4.1L8 11.3 4.3 13.3l.8-4.1L2 6.3l4.2-.5z"/>',
    ),
    more: sv(
      '<path d="M9.5 2.5h4v4M13.5 2.5L9 7M6.5 13.5h-4v-4M2.5 13.5L7 9"/>',
    ),
    openwith: sv(
      '<rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="M1.5 5.5h13"/>',
    ),
    newp: sv('<circle cx="8" cy="8" r="6"/><path d="M8 5v6M5 8h6"/>'),
    sort: sv(
      '<path d="M5 2.5v11M2.5 11L5 13.5 7.5 11M11 13.5v-11M8.5 5L11 2.5 13.5 5"/>',
    ),
    dots: sv(
      "",
      '<g fill="currentColor"><circle cx="3" cy="8" r="1.3"/><circle cx="8" cy="8" r="1.3"/><circle cx="13" cy="8" r="1.3"/></g>',
    ),
    terminal: sv(
      '<rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="M4.5 6l2 2-2 2M8 10.5h3.5"/>',
    ),
    pane: sv(
      '<rect x="1.5" y="2.5" width="13" height="11" rx="1.5"/><path d="M10 2.5v11"/>',
    ),
    vxl: sv('<rect x="2" y="2" width="12" height="12" rx="1.5"/>'),
    vlarge: sv(
      '<rect x="2" y="3" width="12" height="9" rx="1.5"/><path d="M5 14h6"/>',
    ),
    vmedium: sv(
      '<rect x="3.5" y="4" width="9" height="7" rx="1.2"/><path d="M6 13h4"/>',
    ),
    vsmall: sv(
      '<rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/>',
    ),
    vlist: sv('<path d="M2 4h2M6 4h8M2 8h2M6 8h8M2 12h2M6 12h8"/>'),
    vdetails: sv('<path d="M2 3.5h12M2 6.5h12M2 9.5h12M2 12.5h12"/>'),
    vtiles: sv(
      '<rect x="2" y="3" width="4" height="4" rx="1"/><path d="M8 4h6M8 6h4"/><rect x="2" y="9" width="4" height="4" rx="1"/><path d="M8 10h6M8 12h4"/>',
    ),
    vcontent: sv(
      '<rect x="2" y="2.5" width="3.5" height="3.5" rx=".8"/><path d="M7.5 3.5h6.5M7.5 5.5h4"/><rect x="2" y="10" width="3.5" height="3.5" rx=".8"/><path d="M7.5 11h6.5M7.5 13h4"/>',
    ),
    enter: sv('<path d="M13 3v5a2 2 0 0 1-2 2H3"/><path d="M6 7l-3 3 3 3"/>'),
  };
  // little arrow in the corner: this icon is a shortcut
  const SC_ARROW = `<svg class="ws-sc" viewBox="0 0 16 16" aria-hidden="true"><rect x="0.8" y="0.8" width="14.4" height="14.4" rx="2" fill="#fff" stroke="#6b7280" stroke-width="1.2"/><path d="M4 12c0-4 2-6 6-6M7.5 3.5L10.5 6 7.5 8.5" fill="none" stroke="#2f7de1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const TYPE_NAME = {
    folder: "File folder",
    zip: "Compressed (zipped) Folder",
    docx: "Microsoft Word Document",
    pdf: "PDF Document",
    pptx: "PowerPoint Presentation",
    xlsx: "Excel Worksheet",
    txt: "Text Document",
    mp3: "MP3 Audio File",
    mp4: "MP4 Video File",
    jpg: "JPG File",
    png: "PNG File",
    lnk: "Shortcut",
  };
  function iconOf(n) {
    if (n.type === "lnk") {
      const t = n.target;
      return `<span class="ws-ic">${ICONS[icKey(t)] || ICONS.txt}${SC_ARROW}</span>`;
    }
    return `<span class="ws-ic">${ICONS[icKey(n)] || ICONS.txt}</span>`;
  }
  const icKey = (n) => (n ? (n.type === "png" ? "jpg" : n.type) : "txt");
  // for the lesson pages: a file icon as HTML (type, optional shortcut arrow)
  function icon(type, shortcut) {
    if (String(type).endsWith("*")) {
      type = type.slice(0, -1);
      shortcut = true;
    }
    return `<span class="ws-ic">${ICONS[type === "png" ? "jpg" : type] || ICONS.txt}${shortcut ? SC_ARROW : ""}</span>`;
  }

  /* ================= the files on the pretend computer ================= */
  // d = days ago (for "Date modified"); kb = size in KB
  function defaultFS() {
    const F = (name, kids) => ({
        name,
        type: "folder",
        kids: kids || [],
        d: 3,
      }),
      f = (name, kb, d, extra) => ({
        name,
        type: name.split(".").pop().toLowerCase(),
        kb,
        d: d ?? 5,
        ...extra,
      });
    return F("This PC", [
      F("Desktop", []),
      F("Downloads", [f("Homework.pdf", 220, 1), f("Song.mp3", 3800, 12)]),
      F("Documents", [
        F("Lessons", [
          F("Reading", [
            f("Grammar.docx", 501, 0, { author: "BinaryAcademy" }),
            f("Lesson 1.docx", 13, 2),
          ]),
        ]),
        F("Subjects", [
          F("Geography", [f("Example.docx", 13, 0)]),
          F("Reading", []),
          F("Science", []),
        ]),
        f("My story.docx", 24, 1),
        f("Codes.txt", 2, 40),
        f("Lesson 1-My desktop.pptx", 9610, 6),
      ]),
      F("Pictures", [
        f("Boat.jpg", 2100, 3),
        f("Baseball.jpg", 1800, 9),
        f("Basketball.jpg", 1650, 9),
        f("Football.jpg", 1720, 20),
        f("Cat.png", 950, 400),
      ]),
      F("Music", [f("Happy song.mp3", 4200, 30)]),
      F("Videos", [f("School trip.mp4", 48000, 60)]),
    ]);
  }
  const PLACES = [
    "Desktop",
    "Downloads",
    "Documents",
    "Pictures",
    "Music",
    "Videos",
  ];
  // time zones [label, hours from UTC]; the first one is where the pretend computer starts
  const ZONES = [
    ["(UTC+03:00) Kuwait, Riyadh", 3],
    ["(UTC+02:00) Cairo", 2],
    ["(UTC+02:00) Kyiv", 2],
    ["(UTC+00:00) London", 0],
    ["(UTC+01:00) Paris", 1],
    ["(UTC+04:00) Abu Dhabi", 4],
    ["(UTC+09:00) Tokyo", 9],
    ["(UTC-05:00) Eastern Time (US & Canada)", -5],
  ];
  // screen resolutions [label, how much bigger things look]
  const RES = [
    ["1920 × 1080 (Recommended)", 1],
    ["1600 × 900", 1.2],
    ["1366 × 768", 1.4],
    ["1280 × 720", 1.5],
    ["1024 × 768", 1.75],
    ["800 × 600", 2],
  ];

  /* ================= the simulator ================= */
  function create(box, opts) {
    opts = opts || {};
    box.classList.add("ws-box");
    box.innerHTML = `<div class="ws-screen" role="application" aria-label="Pretend Windows computer"></div>`;
    const scr = box.firstElementChild;
    let k = 1;
    // f = screen resolution factor: lower resolution → bigger things (f > 1); the screen is LW() × LH() pretend pixels
    let f = 1;
    const LW = () => Math.round(SW / f),
      LH = () => Math.round(SH / f);
    const fit = () => {
      k = box.clientWidth / SW;
      scr.style.width = LW() + "px";
      scr.style.height = LH() + "px";
      scr.style.transform = `scale(${k * f})`;
      box.style.height = SH * k + "px";
    };
    fit();
    const ro = "ResizeObserver" in window ? new ResizeObserver(fit) : null;
    if (ro) ro.observe(box);
    else addEventListener("resize", fit);

    let lastTouch = false;
    let st,
      uid = 1,
      mis = null,
      lastClick = { t: "", time: 0 },
      cursorXY = { x: LW() / 2, y: LH() / 2 };
    const nodes = new Map();
    function index(n, parent) {
      n.id = n.id || "n" + uid++;
      n.parent = parent || null;
      nodes.set(n.id, n);
      (n.kids || []).forEach((c) => index(c, n));
    }
    const byPath = (p) => {
      let n = st.fs;
      for (const part of p.split("/").filter(Boolean)) {
        n = (n.kids || []).find(
          (x) => x.name.toLowerCase() === part.toLowerCase(),
        );
        if (!n) return null;
      }
      return n;
    };
    const pathOf = (n) => {
      const a = [];
      while (n && n !== st.fs) {
        a.unshift(n.name);
        n = n.parent;
      }
      return a;
    };
    const findName = (name) =>
      [...nodes.values()].find(
        (n) =>
          n.name.toLowerCase() === String(name).toLowerCase() && !n.deleted,
      );
    const desktopNode = () => byPath("Desktop");
    const sizeTxt = (kb) =>
      kb >= 1024
        ? (kb / 1024).toFixed(kb >= 10240 ? 0 : 1) + " MB"
        : kb.toLocaleString("en-US") + " KB";
    const dateOf = (n) => {
      const d = new Date();
      d.setDate(d.getDate() - (n.d || 0));
      d.setHours(16, 18, 0, 0);
      return d;
    };
    const dateTxt = (n) => {
      const d = dateOf(n);
      return `${d.getDate()}/${d.getMonth() + 1}/${String(d.getFullYear()).slice(2)} 4:18 PM`;
    };

    /* ---------- state ---------- */
    function setup(start) {
      start = start || {};
      uid = 1;
      nodes.clear();
      clearTimers();
      f = 1;
      fit();
      st = {
        fs: defaultFS(),
        wins: [],
        menu: null,
        search: null,
        tip: null,
        deskSel: null,
        bin: [],
        clip: null,
        rename: null,
        dlg: null,
        key: null,
        start: null,
        fly: null,
        res: RES[0][0],
        wall: start.wall || 0,
        night: false,
        vol: start.vol ?? 60,
        wifi: start.wifi !== false,
        bat: start.battery ?? 85,
        charging: false,
        zone: start.zone || ZONES[0][0],
        autozone: false,
        autotime: start.autotime !== false,
        dst: true,
        manual: 0,
        wu: "done",
        wuTime: null,
        scan: null,
        lastScan: null,
        secUpd: null,
        virus: !!start.virus,
        boot: null,
      };
      index(st.fs, null);
      // files already in the Recycle Bin: bin: [{name, from: "Documents", kb}]
      (start.bin || []).forEach((b) => {
        const from = byPath(b.from || "Documents");
        const n = mkFile(b.name, b.kb, b.d);
        n.deleted = true;
        index(n, from);
        st.bin.push({ n, from });
      });
      // zip files: zips: [{name: "My courses.zip", in: "Documents", files: [{name, kb}]}]
      (start.zips || []).forEach((z) => {
        const where = byPath(z.in);
        if (!where) return;
        const kids = (z.files || []).map((f) => mkFile(f.name, f.kb, f.d));
        const n = { name: z.name, type: "zip", kids, d: z.d || 0 };
        n.kb = zipKb(n);
        where.kids.push(n);
        index(n, where);
      });
      (start.shortcuts || []).forEach((s) => {
        const t = byPath(s.of);
        const where = byPath(s.in || "Desktop");
        if (t && where) addShortcut(t, where);
      });
      (start.files || []).forEach((s) => {
        const where = byPath(s.in);
        if (where) {
          const n = mkFile(s.name, s.kb, s.d);
          where.kids.push(n);
          index(n, where);
        }
      });
      if (start.explorer != null) {
        const w0 = openExplorer(
          start.explorer === "bin"
            ? "bin"
            : start.explorer
              ? byPath(start.explorer)
              : null,
        );
        if (start.view) w0.view = start.view;
      }
      if (start.settings) openSet(start.settings);
      if (start.app) openApp(start.app);
      if (start.secPage) {
        const w0 = st.wins.find((x) => x.type === "sec");
        if (w0) w0.page = start.secPage;
      }
      if (start.open) {
        const n0 = byPath(start.open);
        if (n0) {
          openNode(n0, null);
          if (start.frozen) {
            const v = st.wins.find((x) => x.type === "view");
            if (v) v.frozen = true;
          }
        }
      }
      if (start.select) {
        const w = topExp();
        const n =
          w && w.dir ? w.dir.kids.find((x) => x.name === start.select) : null;
        if (n) w.sel = n.id;
      }
      if (start.searchText) {
        const w = topExp();
        if (w) {
          w.q = start.searchText;
        }
      }
      render();
      (start.pre || []).forEach((s) => {
        const el = find(s.t);
        if (el) {
          const c = center(el);
          perform(s.act, s.t, {
            id: el.dataset.id,
            x: c.x,
            y: c.y,
            dest: s.to,
          });
        }
      });
    }
    // timers (scans, updates, restart …) are cleared when the screen starts again
    let timers = [];
    const after = (ms, fn) => {
      const id = setTimeout(() => {
        timers = timers.filter((x) => x !== id);
        fn();
        render();
      }, ms);
      timers.push(id);
    };
    const every = (ms, fn) => {
      const id = setInterval(fn, ms);
      timers.push(id);
      return id;
    };
    function clearTimers() {
      timers.forEach((id) => {
        clearTimeout(id);
        clearInterval(id);
      });
      timers = [];
    }
    // the pretend clock: time zone and "set manually" change it
    const zoneOff = (label) =>
      (ZONES.find((z) => z[0] === label) || ZONES[0])[1];
    const simNow = () =>
      new Date(
        Date.now() +
          (zoneOff(st.zone) - zoneOff(ZONES[0][0])) * 3600e3 +
          st.manual,
      );
    const fmtTime = (d) =>
      d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const fmtDay = (d) =>
      d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    function setRes(label) {
      const r = RES.find((x) => x[0] === label);
      if (!r) return;
      st.res = label;
      f = r[1];
      fit();
    }
    function openSet(page) {
      let w = st.wins.find((x) => x.type === "set");
      if (!w) {
        w = { type: "set", page };
        st.wins.push(w);
      } else {
        w.page = page;
        bringToTop(w);
      }
      return w;
    }
    function openWin(w) {
      st.wins = st.wins.filter((x) => x.type !== w.type);
      st.wins.push(w);
      return w;
    }
    function openApp(name) {
      st.start = null;
      st.search = null;
      if (name === "File Explorer") {
        const ex = topExp();
        if (ex) bringToTop(ex);
        else openExplorer(null);
        return;
      }
      if (name === "Settings") return openSet("home");
      if (name === "Get Help")
        return openWin({ type: "help", q: "", res: null, fixed: false });
      if (name === "Windows Security")
        return openWin({ type: "sec", page: "home", radio: "quick" });
      openWin({ type: "app", name });
    }
    function restart() {
      st.boot = "Restarting";
      st.start = null;
      st.menu = null;
      st.fly = null;
      render();
      after(2600, () => {
        st.boot = null;
        st.wins = st.wins.filter((w) => w.type !== "view" && w.type !== "app");
        st.wins.forEach((w) => {
          if (w.frozen) w.frozen = false;
        });
      });
    }
    function runScan(kind) {
      const w = st.wins.find((x) => x.type === "sec");
      if (w) w.page = "virus";
      st.scan = { kind, p: 0 };
      const total = kind === "Full" ? 5200 : 3200;
      const t0 = Date.now();
      const id = every(120, () => {
        const p = Math.min(100, Math.round(((Date.now() - t0) / total) * 100));
        if (st.scan) st.scan.p = p;
        const bar = scr.querySelector(".ws-prog i");
        if (bar) bar.style.width = p + "%";
        const tx = scr.querySelector(".ws-progtx");
        if (tx)
          tx.textContent = `${kind} scan running… ${p}%  ·  ${Math.round(p * 293.6).toLocaleString("en-US")} files scanned`;
        if (p >= 100) {
          clearInterval(id);
          st.scan = null;
          st.lastScan = { kind, when: simNow(), found: st.virus ? 1 : 0 };
          render();
        }
      });
    }
    function mkFile(name, kb, d) {
      return {
        name,
        type: name.split(".").pop().toLowerCase(),
        kb: kb || 10,
        d: d || 0,
      };
    }
    // how much a zip file squeezes each kind of file (pictures and videos are already squeezed)
    const RATIO = {
      docx: 0.62,
      txt: 0.35,
      pdf: 0.9,
      pptx: 0.85,
      xlsx: 0.6,
      jpg: 0.98,
      png: 0.97,
      mp3: 0.97,
      mp4: 0.99,
      zip: 1,
      lnk: 1,
    };
    function zipKb(n) {
      const sum = (x) =>
        x.type === "folder" || x.type === "zip"
          ? (x.kids || []).reduce((a, c) => a + sum(c), 0)
          : (x.kb || 0) * (RATIO[x.type] ?? 0.8);
      return Math.max(1, Math.round(sum(n)));
    }
    function clone(n) {
      const c = {
        name: n.name,
        type: n.type,
        kb: n.kb,
        d: 0,
        target: n.target,
        author: n.author,
      };
      if (n.kids) c.kids = n.kids.map(clone);
      return c;
    }
    function uniqueName(where, name) {
      if (!where.kids.some((x) => x.name === name)) return name;
      const m = name.match(/^(.*?)(\.[^.]+)?$/);
      let i = 2;
      while (where.kids.some((x) => x.name === `${m[1]} (${i})${m[2] || ""}`))
        i++;
      return `${m[1]} (${i})${m[2] || ""}`;
    }
    function makeZip(t) {
      const where = t.parent;
      const base =
        t.type === "folder" ? t.name : t.name.replace(/\.[^.]+$/, "");
      const z = {
        name: uniqueName(where, base + ".zip"),
        type: "zip",
        kids: t.type === "folder" ? t.kids.map(clone) : [clone(t)],
        d: 0,
      };
      z.kb = zipKb(z);
      where.kids.push(z);
      index(z, where);
      return z;
    }
    function startRename(n) {
      if (n && n.id !== "bin") {
        st.rename = { id: n.id, v: n.name, fresh: true };
        st.menu = null;
      }
    }
    function commitRename() {
      const r = st.rename;
      st.rename = null;
      if (!r) return;
      const n = nodes.get(r.id);
      if (!n) return;
      let v = String(r.v || "").trim();
      if (!v) return;
      const ext =
        n.type !== "folder" && /\.[^.]+$/.test(n.name)
          ? n.name.match(/\.[^.]+$/)[0]
          : "";
      if (ext && !/\.[^.\s]+$/.test(v)) v += ext;
      if (v !== n.name) n.name = uniqueName(n.parent, v);
    }
    function paste(to) {
      const c = st.clip;
      if (!c || !to || to === "bin") return;
      const n = nodes.get(c.id);
      if (!n) return;
      if (c.mode === "cut") {
        if (n.parent === to) return;
        n.parent.kids = n.parent.kids.filter((x) => x !== n);
        n.name = uniqueName(to, n.name);
        to.kids.push(n);
        n.parent = to;
        st.clip = null;
      } else {
        const k = clone(n);
        k.name = uniqueName(to, k.name);
        to.kids.push(k);
        index(k, to);
      }
      const w = topExp();
      if (w) w.sel = (c.mode === "cut" ? n : to.kids[to.kids.length - 1]).id;
    }
    function extractInto(z, dest) {
      (z.kids || []).forEach((k) => {
        const c = clone(k);
        c.name = uniqueName(dest, c.name);
        dest.kids.push(c);
        index(c, dest);
      });
      return dest;
    }
    function extractTo(z, dest) {
      const f = {
        name: uniqueName(dest, z.name.replace(/\.zip$/i, "")),
        type: "folder",
        kids: (z.kids || []).map(clone),
        d: 0,
      };
      dest.kids.push(f);
      index(f, dest);
      return f;
    }
    function addShortcut(target, where) {
      let name = target.name + " - Shortcut";
      let i = 2;
      while (where.kids.some((x) => x.name === name))
        name = `${target.name} - Shortcut (${i++})`;
      const n = { name, type: "lnk", target, kb: 1, d: 0 };
      where.kids.push(n);
      index(n, where);
      return n;
    }
    function openExplorer(dir) {
      const w = {
        type: "exp",
        dir: dir || null,
        q: "",
        filt: null,
        view: "medium",
        cols: ["Date modified", "Type", "Size"],
        sel: null,
        back: [],
        fwd: [],
      }; // dir null = Home, 'bin' = Recycle Bin
      st.wins = st.wins.filter((x) => x.type !== "exp");
      st.wins.push(w);
      return w;
    }
    const topExp = () => [...st.wins].reverse().find((w) => w.type === "exp");
    const closeMenus = () => {
      st.menu = null;
      st.tip = null;
    };

    /* ---------- drawing ---------- */
    function render() {
      const act = document.activeElement;
      const keepT =
        act && scr.contains(act) && act.dataset ? act.dataset.t : null;
      const caret = act && act.selectionStart;
      const dk = desktopNode();
      scr.innerHTML = `<div class="ws-desk wall-${st.wall}" data-t="desktop" data-drop="desktop">
        <div class="ws-dicons">${deskIcon({ id: "bin", name: "Recycle Bin", type: "bin" }, "bin")}${dk.kids.map((n) => deskIcon(n)).join("")}</div>
      </div>
      ${st.wins.map((w, i) => ({ exp: explorerHTML, view: viewerHTML, set: setHTML, help: helpHTML, sec: secHTML, app: appHTML })[w.type](w, i)).join("")}
      ${st.search ? searchHTML() : ""}
      ${st.start ? startHTML() : ""}
      ${st.fly ? flyHTML() : ""}
      ${st.menu ? menuHTML() : ""}
      ${st.tip ? tipHTML() : ""}
      ${st.dlg ? dlgHTML() : ""}
      ${st.key ? `<div class="ws-key">${esc(st.key)}</div>` : ""}
      ${taskbarHTML()}
      ${st.night ? '<div class="ws-night"></div>' : ""}
      ${st.boot ? `<div class="ws-boot"><span class="ws-spin"></span><b>${esc(st.boot)}</b></div>` : ""}
      <div class="ws-cursor${mis && mis.mode === "demo" ? " show" : ""}" aria-hidden="true" style="left:${cursorXY.x}px;top:${cursorXY.y}px"><svg viewBox="0 0 24 24"><path d="M3 2l15 11-7 1-3 7z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`;
      if (keepT) {
        const el = scr.querySelector(`input[data-t="${keepT}"]`);
        if (el) {
          el.focus({ preventScroll: true });
          try {
            el.setSelectionRange(caret, caret);
          } catch (e) {}
        }
      }
      scr
        .querySelectorAll("input[data-t]")
        .forEach((inp) => (inp.oninput = () => onType(inp)));
      scr.querySelectorAll("input[type=range][data-t]").forEach((r) => {
        r.onwheel = (e) => {
          e.preventDefault();
          r.value = Math.max(
            0,
            Math.min(100, +r.value + (e.deltaY < 0 ? 4 : -4)),
          );
          onType(r);
        };
      });
      scr
        .querySelectorAll(
          'input[data-t="help-input"],input[data-t="start-search"]',
        )
        .forEach(
          (inp) =>
            (inp.onkeydown = (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                keyFrom("Enter");
              }
            }),
        );
      const ri = scr.querySelector('input[data-t="rename-input"]');
      if (ri) {
        ri.onkeydown = (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            keyFrom("Enter");
          } else if (e.key === "Escape") {
            e.preventDefault();
            st.rename = null;
            render();
          }
        };
        if (st.rename.fresh) {
          st.rename.fresh = false;
          ri.focus({ preventScroll: true });
          const dot = ri.value.lastIndexOf(".");
          const n = nodes.get(st.rename.id);
          try {
            ri.setSelectionRange(
              0,
              n && n.type !== "folder" && dot > 0 ? dot : ri.value.length,
            );
          } catch (e) {}
        }
      }
      placeMenus();
      if (mis) markStep();
      opts.onRender && opts.onRender();
    }
    function deskIcon(n, special) {
      const sel = st.deskSel === (special || n.id);
      const ic =
        special === "bin"
          ? `<span class="ws-ic">${st.bin.length ? ICONS.binfull : ICONS.bin}</span>`
          : iconOf(n);
      const tag = st.rename && st.rename.id === n.id ? "div" : "button";
      return `<${tag} ${tag === "button" ? 'type="button"' : ""} class="ws-dicon${sel ? " sel" : ""}${cutCls(n)}" data-t="${special ? "desk:" + n.name : "desk:" + esc(n.name)}" data-id="${special || n.id}" data-drag="${special ? "" : "1"}">${ic}${nameHTML(n)}</${tag}>`;
    }
    function taskbarHTML() {
      const d = simNow();
      const tm = fmtTime(d);
      const dt = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
      const expOpen = st.wins.some((w) => w.type === "exp");
      return `<div class="ws-task">
      <div class="ws-tmid">
        <button type="button" class="ws-tb${st.start ? " open" : ""}" data-t="task-start" aria-label="Start">${ICONS.start}</button>
        <button type="button" class="ws-tsearch${st.search ? " on" : ""}" data-t="task-search">${ICONS.search}<span>Search</span></button>
        <button type="button" class="ws-tb${expOpen ? " open" : ""}" data-t="task-explorer" aria-label="File Explorer">${ICONS.explorer}</button>
        <button type="button" class="ws-tb" data-t="task-browser" aria-label="Browser">${ICONS.browser}</button>
        <button type="button" class="ws-tb" data-t="task-store" aria-label="Store">${ICONS.store}</button>
      </div>
      <div class="ws-tray"><span class="ws-lang">ENG</span><button type="button" class="ws-tic" data-t="tray-wifi" aria-label="Wi-Fi">${st.wifi ? ICONS.wifi : ICONS.wifioff}</button><button type="button" class="ws-tic" data-t="tray-speaker" aria-label="Volume">${st.vol > 0 ? ICONS.speaker : ICONS.mute}</button><button type="button" class="ws-tic ws-batt${st.bat < 20 && !st.charging ? " low" : ""}" data-t="tray-battery" aria-label="Battery">${ICONS.battery}<i style="width:${Math.max(6, Math.round(st.bat * 0.62))}%"></i>${st.charging ? "<b>⚡</b>" : ""}</button><button type="button" class="ws-clock" data-t="tray-clock"><span>${tm}</span><span>${dt}</span></button></div>
    </div>`;
    }
    // the name under an icon, or a box to type a new name (Rename)
    const nameHTML = (n) =>
      st.rename && st.rename.id === n.id
        ? `<input type="text" class="ws-ren" data-t="rename-input" value="${esc(st.rename.v)}" autocomplete="off" spellcheck="false" enterkeyhint="done">`
        : `<span class="ws-nm">${esc(n.name)}</span>`;
    const cutCls = (n) =>
      st.clip && st.clip.mode === "cut" && st.clip.id === n.id ? " cut" : "";
    const COLS = {
      "Date modified": (n) => dateTxt(n),
      Type: (n) => TYPE_NAME[n.type] || "File",
      Size: (n) => (n.type === "folder" ? "" : sizeTxt(n.kb)),
      "Date created": (n) => dateTxt({ d: (n.d || 0) + 3 }),
      Authors: (n) => n.author || "",
      Tags: () => "",
    };
    const navItem = (t, ic, label, on) =>
      `<button type="button" class="ws-nav${on ? " on" : ""}" data-t="${t}" data-drop="${t}">${ICONS[ic] || ""}<span>${label}</span></button>`;
    function explorerHTML(w, i) {
      const bin = w.dir === "bin";
      const title = w.q
        ? `${w.q} - Search Results`
        : bin
          ? "Recycle Bin"
          : w.dir
            ? w.dir.name
            : "Home";
      const crumbs = w.q
        ? ["Search Results in Home"]
        : bin
          ? ["Recycle Bin"]
          : w.dir
            ? ["This PC", ...pathOf(w.dir)].slice(1)
            : ["Home"];
      const gcols = `26px minmax(0,1.6fr) ${w.cols.map(() => "minmax(0,1fr)").join(" ")}`;
      let items;
      if (w.q) {
        items = searchAll(w.q, w.filt);
      } else if (w.dir === null) items = PLACES.map((p) => byPath(p));
      else if (w.dir === "bin") items = st.bin.map((b) => b.n);
      else items = w.dir.kids;
      const body = w.q
        ? `<div class="ws-list">${items.length ? items.map((n) => `<button type="button" class="ws-row${w.sel === n.id ? " sel" : ""}" data-t="sres:${esc(n.name)}" data-id="${n.id}" data-drag="1">${iconOf(n)}<span class="ws-rn"><b>${esc(n.name)}</b><small>Date modified: ${dateTxt(n)}</small></span><span class="ws-rp">C:\\Users\\Binary\\${esc(pathOf(n.parent).join("\\"))}</span>${n.kb && n.type !== "folder" ? `<span class="ws-rs">Size: ${sizeTxt(n.kb)}</span>` : ""}</button>`).join("") : '<p class="ws-empty">No items match your search.</p>'}</div>`
        : w.view === "details"
          ? `<div class="ws-details" style="--gc:${gcols}"><button type="button" class="ws-dh" data-t="det-header"><span></span><span>Name</span>${w.cols.map((c) => `<span>${esc(c)}</span>`).join("")}</button>${items
              .map((n) => {
                const tg =
                  st.rename && st.rename.id === n.id ? "div" : "button";
                return `<${tg} ${tg === "button" ? 'type="button"' : ""} class="ws-drow${w.sel === n.id ? " sel" : ""}${cutCls(n)}" data-t="file:${esc(n.name)}" data-id="${n.id}" data-drag="1">${iconOf(n)}${tg === "div" ? nameHTML(n) : `<span>${esc(n.name)}</span>`}${w.cols.map((c) => `<span>${esc(COLS[c](n))}</span>`).join("")}</${tg}>`;
              })
              .join(
                "",
              )}${items.length ? "" : '<p class="ws-empty">This folder is empty.</p>'}</div>`
          : `<div class="ws-grid v-${w.view.replace(/ /g, "-")}">${
              items.length
                ? items
                    .map((n) => {
                      const tg =
                        st.rename && st.rename.id === n.id ? "div" : "button";
                      return `<${tg} ${tg === "button" ? 'type="button"' : ""} class="ws-file${w.sel === n.id ? " sel" : ""}${cutCls(n)}" data-t="file:${esc(n.name)}" data-id="${n.id}" data-drag="1">${iconOf(n)}${nameHTML(n)}${w.view === "tiles" || w.view === "content" ? `<span class="ws-meta"><small>${esc(TYPE_NAME[n.type] || "File")}</small><small>${n.type === "folder" ? dateTxt(n) : sizeTxt(n.kb)}</small></span>` : ""}</${tg}>`;
                    })
                    .join("")
                : `<p class="ws-empty">${bin ? "The Recycle Bin is empty." : "This folder is empty."}</p>`
            }</div>`;
      const onPlace = (p) =>
        !w.q &&
        w.dir &&
        !bin &&
        pathOf(w.dir)[0] === p &&
        pathOf(w.dir).length === 1;
      return `<div class="ws-win ws-exp${i === st.wins.length - 1 ? " top" : ""}" data-win="${i}">
      <div class="ws-tabs"><span class="ws-tab">${bin ? ICONS.bin : w.dir && w.dir.type === "zip" ? ICONS.zip : ICONS.folder}<span>${esc(title)}</span><button type="button" class="ws-x" data-t="exp-close" aria-label="Close tab"><i class=ws-xi></i></button></span><span class="ws-plus">+</span>
        <span class="ws-wbtns"><span><i class=ws-mini></i></span><span><i class=ws-maxi></i></span><button type="button" data-t="exp-close" aria-label="Close"><i class=ws-xi></i></button></span></div>
      <div class="ws-addr"><button type="button" class="ws-ab" data-t="exp-back" aria-label="Back">←</button><button type="button" class="ws-ab" data-t="exp-fwd" aria-label="Forward">→</button><button type="button" class="ws-ab" data-t="exp-up" aria-label="Up">↑</button><button type="button" class="ws-ab" data-t="exp-refresh" aria-label="Refresh">${G.refresh}</button>
        <div class="ws-crumbs">${crumbs.map((c) => `<span>›</span><span>${esc(c)}</span>`).join("")}</div>
        <label class="ws-sbox">${'<input type="text" data-t="exp-search" placeholder="Search ' + esc(w.dir && !bin ? w.dir.name : bin ? "Recycle Bin" : "Home") + '" value="' + esc(w.q) + '" autocomplete="off" spellcheck="false" enterkeyhint="search">'}${ICONS.search}</label></div>
      <div class="ws-tools"><span class="ws-new">${G.newp} New<i class=ws-chev></i></span><span class="ws-sep"></span>
        <button type="button" class="ws-tool" data-t="tool-cut" aria-label="Cut">${G.cut}</button><button type="button" class="ws-tool" data-t="tool-copy" aria-label="Copy">${G.copy}</button><button type="button" class="ws-tool" data-t="tool-paste" aria-label="Paste">${G.paste}</button><button type="button" class="ws-tool" data-t="tool-rename" aria-label="Rename">${G.rename}</button><button type="button" class="ws-tool" data-t="tool-share" aria-label="Share">${G.share}</button><button type="button" class="ws-tool" data-t="tool-delete" aria-label="Delete">${G.trash}</button><span class="ws-sep"></span>
        <button type="button" class="ws-tool wide" data-t="tool-sort">${G.sort} Sort<i class=ws-chev></i></button><button type="button" class="ws-tool wide" data-t="tool-view">${G.vdetails} View<i class=ws-chev></i></button>${bin ? `<button type="button" class="ws-tool wide" data-t="bin-empty">${G.trash} Empty Recycle Bin</button>` : ""}${w.q ? '<button type="button" class="ws-tool wide" data-t="searchopt">🔍 Search options<i class=ws-chev></i></button>' : ""}<button type="button" class="ws-tool" data-t="tool-more" aria-label="More">${G.dots}</button></div>
      <div class="ws-body"><div class="ws-side">${navItem("nav:Home", "home", "Home", !w.q && w.dir === null)}${navItem("nav:Gallery", "gallery", "Gallery", false)}<span class="ws-hr"></span>
        ${PLACES.map((p) => navItem("nav:" + p, p.toLowerCase(), p, onPlace(p))).join("")}</div>
        <div class="ws-main" data-t="exp-bg" data-drop="exp-main">${body}</div></div>
      <div class="ws-status">${items.length} item${items.length === 1 ? "" : "s"}${w.sel && nodes.get(w.sel) ? ` · 1 item selected · ${nodes.get(w.sel).type === "folder" ? "" : sizeTxt(nodes.get(w.sel).kb)}` : ""}</div>
    </div>`;
    }
    function viewerHTML(w, i) {
      const n = w.node;
      const pic = n.type === "jpg" || n.type === "png";
      if (!n.parent) return "";
      return `<div class="ws-win ws-view${i === st.wins.length - 1 ? " top" : ""}${w.frozen ? " frozen" : ""}" data-win="${i}"><div class="ws-vbar">${iconOf(n)}<span>${esc(n.name)}${w.frozen ? " (Not Responding)" : ""}</span><button type="button" class="ws-x" data-t="view-close" aria-label="Close"><i class=ws-xi></i></button></div>
      <div class="ws-vbody">${pic ? `<div class="ws-photo">${ICONS.jpg}</div>` : `<div class="ws-paper"><h4>${esc(n.name.replace(/\.[^.]+$/, ""))}</h4>${"<i></i>".repeat(7)}</div>`}<p class="ws-vnote">📂 ${esc(["This PC", ...pathOf(n.parent)].join(" › "))}</p></div></div>`;
    }
    /* ---------- Settings ---------- */
    const SETNAV = [
      ["Home", "🏠", "home"],
      ["System", "🖥️", "display"],
      ["Bluetooth & devices", "🔵", "other"],
      ["Network & internet", "📶", "network"],
      ["Personalization", "🖌️", "personalization"],
      ["Apps", "🧩", "other"],
      ["Accounts", "👤", "other"],
      ["Time & language", "🕒", "datetime"],
      ["Gaming", "🎮", "other"],
      ["Accessibility", "♿", "other"],
      ["Privacy & security", "🛡️", "other"],
      ["Windows Update", "🔄", "update"],
    ];
    const tog = (t, on, dis) =>
      `<button type="button" class="ws-tog${on ? " on" : ""}${dis ? " dis" : ""}" data-t="${t}" ${dis ? 'aria-disabled="true"' : ""}><span>${on ? "On" : "Off"}</span><i></i></button>`;
    const srow = (ic, title, sub, right, t) =>
      `<${t ? 'button type="button"' : "div"} class="ws-srow"${t ? ` data-t="${t}"` : ""}><span class="ws-sic">${ic}</span><span class="ws-stx"><b>${title}</b>${sub ? `<small>${sub}</small>` : ""}</span><span class="ws-sr">${right || ""}</span></${t ? "button" : "div"}>`;
    const thumbs = (pre, n, sel) =>
      `<div class="ws-thumbs">${Array.from({ length: n }, (_, j) => `<button type="button" class="ws-thumb${sel === j + 1 ? " on" : ""}" data-t="${pre}:${j + 1}" aria-label="Picture ${j + 1}"><i class="wall-${j + 1}"></i></button>`).join("")}</div>`;
    function setHTML(w, i) {
      const nav = SETNAV.map(
        ([n, ic, pg]) =>
          `<button type="button" class="ws-nav${pg === w.page || (pg === "display" && w.page === "mixer") || (pg === "personalization" && w.page === "background") ? " on" : ""}" data-t="setnav:${n}"><span class="ws-nic">${ic}</span><span>${n}</span></button>`,
      ).join("");
      const d = simNow();
      let crumb, body;
      switch (w.page) {
        case "datetime":
          crumb = ["Time & language", "Date & time"];
          body = `<div class="ws-bigtime"><b>${fmtTime(d)}</b><small>${fmtDay(d)}</small><span class="ws-tzinfo">🌐 Time zone<br><small>${esc(st.zone)}</small></span></div>
          ${srow("🌐", "Set time zone automatically", "", tog("set:autozone", st.autozone))}
          ${srow("", "Time zone", "", `<button type="button" class="ws-drop${st.autozone ? " dis" : ""}" data-t="set:zone">${esc(st.zone)}<i class=ws-chev></i></button>`)}
          ${srow("", "Adjust for daylight saving time automatically", "", tog("set:dst", st.dst))}
          ${srow("🕒", "Set time automatically", "", tog("set:autotime", st.autotime))}
          ${srow("", "Set the date and time manually", "", `<button type="button" class="ws-btn${st.autotime ? " dis" : ""}" data-t="set:change">Change</button>`)}`;
          break;
        case "display":
          crumb = ["System", "Display"];
          body = `<h6>Brightness &amp; color</h6>${srow("☀️", "Night light", "Use warmer colors to help block blue light", tog("set:night", st.night))}
          <h6>Scale &amp; layout</h6>${srow("🔍", "Scale", "Change the size of text, apps, and other items", '<span class="ws-drop">100% (Recommended)<i class=ws-chev></i></span>')}
          ${srow("🖥️", "Display resolution", "Adjust the resolution to fit your connected display", `<button type="button" class="ws-drop" data-t="set:res">${esc(st.res)}<i class=ws-chev></i></button>`)}
          ${srow("🔄", "Display orientation", "", '<span class="ws-drop">Landscape<i class=ws-chev></i></span>')}`;
          break;
        case "personalization":
          crumb = ["Personalization"];
          body = `<div class="ws-ptop"><div class="ws-prev wall-${st.wall}"><i></i></div><div><small>Select a theme to apply</small>${thumbs("theme", 6, st.wall)}</div></div>
          ${srow("🖼️", "Background", "Background image, color, slideshow", "›", "set:background")}${srow("🎨", "Colors", "Accent color, transparency effects", "›")}${srow("🖌️", "Themes", "Install, create, manage", "›")}${srow("✨", "Dynamic Lighting", "Connected devices, effects", "›")}`;
          break;
        case "background":
          crumb = ["Personalization", "Background"];
          body = `<div class="ws-ptop"><div class="ws-prev wall-${st.wall}"><i></i></div></div>
          ${srow("🖼️", "Personalize your background", "A picture background applies to your current desktop", '<span class="ws-drop">Picture<i class=ws-chev></i></span>')}
          <div class="ws-recent"><small>Recent images</small>${thumbs("bg", 5, st.wall)}</div>
          ${srow("", "Choose a photo", "", '<span class="ws-btn">Browse photos</span>')}${srow("", "Choose a fit for your desktop image", "", '<span class="ws-drop">Fill<i class=ws-chev></i></span>')}`;
          break;
        case "mixer":
          crumb = ["System", "Sound", "Volume mixer"];
          body = `<h6>System</h6><div class="ws-srow"><span class="ws-sic">${st.vol > 0 ? ICONS.speaker : ICONS.mute}</span><span class="ws-stx"><b>Volume</b></span><span class="ws-sr ws-vol"><input type="range" min="0" max="100" value="${st.vol}" data-t="vol-range" aria-label="Volume"><b class="ws-volnum">${st.vol}</b></span></div>
          ${srow("🔈", "Output device", "", '<span class="ws-drop">Speakers<i class=ws-chev></i></span>')}${srow("🎤", "Input device", "", '<span class="ws-drop">No input devices found<i class=ws-chev></i></span>')}
          <h6>Apps</h6>${srow("🔔", "System sounds", "", '<span class="ws-sr ws-vol"><input type="range" min="0" max="100" value="100" aria-label="System sounds" tabindex="-1"></span>')}`;
          break;
        case "update":
          crumb = ["Windows Update"];
          body = `<div class="ws-wu"><span class="ws-wuic${st.wu === "checking" ? " spin" : ""}">🔄</span><span><b>${st.wu === "checking" ? "Checking for updates…" : "You’re up to date"}</b><small>${st.wu === "checking" ? "Please wait" : "Last checked: " + (st.wuTime ? "Today, " + fmtTime(st.wuTime) : "Today, 10:29 AM")}</small></span><button type="button" class="ws-btn pri" data-t="wu:check">Check for updates</button></div>`;
          break;
        case "network":
          crumb = ["Network & internet"];
          body = `${srow(st.wifi ? ICONS.wifi : ICONS.wifioff, "Wi-Fi", st.wifi ? "Connected · Home" : "Off", tog("qs:wifi", st.wifi))}`;
          break;
        case "home":
          crumb = ["Home"];
          body = `<p class="ws-sp">Welcome! Choose a setting on the left.</p><div class="ws-hometiles">${[
            ["🖥️", "System", "setnav:System"],
            ["🖌️", "Personalization", "setnav:Personalization"],
            ["🕒", "Time & language", "setnav:Time & language"],
            ["🔄", "Windows Update", "setnav:Windows Update"],
          ]
            .map(
              ([e, n, t]) =>
                `<button type="button" class="ws-htile" data-t="${t}"><span>${e}</span>${n}</button>`,
            )
            .join("")}</div>`;
          break;
        default:
          crumb = ["Settings"];
          body = '<p class="ws-sp">Nothing to change here in Mini Windows.</p>';
      }
      return `<div class="ws-win ws-set${i === st.wins.length - 1 ? " top" : ""}" data-win="${i}"><div class="ws-vbar"><span class="ws-app sm">⚙️</span><span>Settings</span><span class="ws-wbtns"><span><i class=ws-mini></i></span><span><i class=ws-maxi></i></span><button type="button" data-t="win-close:set" aria-label="Close"><i class=ws-xi></i></button></span></div>
      <div class="ws-sbody"><div class="ws-side ws-snav"><div class="ws-user"><span>👤</span><b>Binary Academy</b></div><span class="ws-find">Find a setting 🔍</span>${nav}</div>
      <div class="ws-spage"><h3 class="ws-crumb">${crumb.map((c, j) => (j < crumb.length - 1 ? `<span>${esc(c)}</span> › ` : `<b>${esc(c)}</b>`)).join("")}</h3>${body}</div></div></div>`;
    }
    /* ---------- Start menu ---------- */
    const APPS = [
      ["Browser", "🌐"],
      ["Calculator", "🧮"],
      ["Camera", "📷"],
      ["Clock", "⏰"],
      ["File Explorer", "📁"],
      ["Game Bar", "🎮"],
      ["Get Help", "❓"],
      ["Get Started", "🚀"],
      ["Mail", "✉️"],
      ["Notepad", "📝"],
      ["Paint", "🎨"],
      ["Photos", "🖼️"],
      ["Settings", "⚙️"],
      ["Windows Security", "🛡️"],
    ];
    const PINNED = [
      "Browser",
      "Mail",
      "Calculator",
      "Settings",
      "File Explorer",
      "Photos",
      "Notepad",
      "Paint",
      "Clock",
      "Camera",
      "Get Started",
      "Game Bar",
    ];
    const appIc = (n) =>
      `<span class="ws-app">${(APPS.find((a) => a[0] === n) || ["", "🪟"])[1]}</span>`;
    function startHTML() {
      const s = st.start;
      const q = (s.q || "").trim().toLowerCase();
      let inner;
      if (q) {
        const apps = APPS.filter((a) => a[0].toLowerCase().includes(q));
        const files = searchAll(q).slice(0, 4);
        inner = `<b class="ws-sh">Best match</b>${apps.length ? `<button type="button" class="ws-best" data-t="app:${apps[0][0]}">${appIc(apps[0][0])}<span><b>${apps[0][0]}</b><small>System</small></span></button>` : files.length ? `<button type="button" class="ws-best" data-t="result:${esc(files[0].name)}" data-id="${files[0].id}">${iconOf(files[0])}<span><b>${esc(files[0].name)}</b><small>${TYPE_NAME[files[0].type] || "File"}</small></span></button>` : '<p class="ws-empty">No results</p>'}
        ${apps
          .slice(1)
          .map(
            (a) =>
              `<button type="button" class="ws-sres" data-t="app:${a[0]}">${appIc(a[0])}<span>${a[0]}</span></button>`,
          )
          .join(
            "",
          )}${(apps.length ? files : files.slice(1)).map((n) => `<button type="button" class="ws-sres" data-t="result:${esc(n.name)}" data-id="${n.id}">${iconOf(n)}<span>${esc(n.name)}</span></button>`).join("")}`;
      } else if (s.all)
        inner = `<div class="ws-stitle"><b>All apps</b><button type="button" class="ws-btn" data-t="start-all">‹ Back</button></div><div class="ws-alist">${APPS.map((a, j) => `${j === 0 || APPS[j - 1][0][0] !== a[0][0] ? `<span class="ws-letter">${a[0][0]}</span>` : ""}<button type="button" class="ws-sres" data-t="app:${a[0]}">${appIc(a[0])}<span>${a[0]}<small>System</small></span></button>`).join("")}</div>`;
      else
        inner = `<div class="ws-stitle"><b>Pinned</b><button type="button" class="ws-btn" data-t="start-all">All ›</button></div><div class="ws-pins">${PINNED.map((n) => `<button type="button" class="ws-pin" data-t="app:${n}">${appIc(n)}<span>${n}</span></button>`).join("")}</div>
      <div class="ws-stitle"><b>Recommended</b></div><div class="ws-recs"><span>${ICONS.docx}<b>My story.docx</b></span><span>${ICONS.jpg}<b>Boat.jpg</b></span></div>`;
      return `<div class="ws-startm"><label class="ws-sin">${ICONS.search}<input type="text" data-t="start-search" placeholder="Search for apps, settings, and documents" value="${esc(s.q || "")}" autocomplete="off" spellcheck="false" enterkeyhint="search"></label>
      <div class="ws-sbody2">${inner}</div><div class="ws-sfoot"><span>👤 Binary Academy</span><button type="button" class="ws-pow" data-t="start-power" aria-label="Power">${G.power}</button></div></div>`;
    }
    /* ---------- Get Help ---------- */
    const HELP = [
      {
        k: /print/,
        t: "Printer troubleshooter",
        steps: [
          "Turn the printer off and on.",
          "Check the cable or the Wi-Fi.",
          "Check that there is paper.",
          "Try to print again.",
        ],
        ask: true,
      },
      {
        k: /sound|volume|hear/,
        t: "Sound troubleshooter",
        steps: [
          "Click the speaker icon.",
          "Check the volume is not 0.",
          "Check the speakers are plugged in.",
        ],
      },
      {
        k: /internet|wifi|wi-fi|network/,
        t: "Network troubleshooter",
        steps: [
          "Click the Wi-Fi icon.",
          "Turn Wi-Fi on.",
          "Restart the router.",
        ],
      },
      {
        k: /freez|slow|stuck|video|not respond/,
        t: "My PC freezes",
        steps: [
          "Close the program and open it again.",
          "Restart the computer.",
          "Scan for viruses with Windows Security.",
          "Check for updates.",
        ],
      },
      {
        k: /.*/,
        t: "Help with Windows",
        steps: [
          "Restart the computer.",
          "Check for updates.",
          "Ask a grown-up for help.",
        ],
      },
    ];
    function helpHTML(w, i) {
      const r = w.res;
      return `<div class="ws-win ws-help${i === st.wins.length - 1 ? " top" : ""}" data-win="${i}"><div class="ws-vbar"><span class="ws-app sm">❓</span><span>Get Help</span><span class="ws-wbtns"><span><i class=ws-mini></i></span><span><i class=ws-maxi></i></span><button type="button" data-t="win-close:help" aria-label="Close"><i class=ws-xi></i></button></span></div>
      <div class="ws-hbody">${
        r
          ? `<div class="ws-hq"><label class="ws-sin">${ICONS.search}<input type="text" data-t="help-input" value="${esc(w.q)}" autocomplete="off" spellcheck="false"></label></div>
        <div class="ws-hres"><div class="ws-hcard"><h5>${esc(r.t)}</h5><p>We are sorry you have a problem. Try these steps:</p><ol>${r.steps.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
          ${r.ask ? (w.fixed ? '<p class="ws-ok"><i class=ws-ck></i> Done! Is the problem fixed? Great.</p>' : '<p>Do we have your consent to run the diagnostics?</p><div class="ws-hbtns"><button type="button" class="ws-btn pri" data-t="help-yes">Yes</button><button type="button" class="ws-btn" data-t="help-no">No</button></div>') : ""}</div>
          <div class="ws-hmore"><b>More help</b>${[r.t.replace("troubleshooter", "problems") + " in Windows", "How to fix it step by step", "Ask the community"].map((x) => `<span class="ws-link">${esc(x)}</span>`).join("")}</div></div>`
          : `<h4>We're here to help</h4><p>Tell us your problem so we can get you the right help and support.</p>
        <div class="ws-hq"><label class="ws-sin">${ICONS.search}<input type="text" data-t="help-input" placeholder="Example: Can't install Office" value="${esc(w.q)}" autocomplete="off" spellcheck="false"></label><button type="button" class="ws-btn" data-t="help-go">Get Help</button></div>
        <b class="ws-sh">Common searches</b>${["Set up scanner in Windows", "Fix ethernet connection problems", "How to install Office"].map((x) => `<span class="ws-link">🔎 ${x}</span>`).join("")}`
      }</div></div>`;
    }
    /* ---------- Windows Security ---------- */
    const SECNAV = [
      ["home", "🏠", "Home"],
      ["virus", "🛡️", "Virus & threat protection"],
      ["acc", "👤", "Account protection"],
      ["fw", "📶", "Firewall & network protection"],
      ["app", "🗔", "App & browser control"],
      ["dev", "💻", "Device security"],
      ["perf", "❤️", "Device performance & health"],
      ["fam", "👪", "Family options"],
      ["hist", "🕘", "Protection history"],
    ];
    function secHTML(w, i) {
      const ls = st.lastScan;
      const threat = ls && ls.found && st.virus;
      const updTxt = st.secUpd
        ? "Today, " + fmtTime(st.secUpd)
        : "10/13/2026 11:44 PM";
      let body;
      if (w.page === "home")
        body = `<h4>Security at a glance</h4><p class="ws-sp">See what's happening with the security and health of your device.</p><div class="ws-sectiles">
      <button type="button" class="ws-sectile${threat ? " bad" : ""}" data-t="sec:virus">${threat ? ICONS.shieldx : ICONS.shield}<b>Virus &amp; threat protection</b><small>${threat ? "Action needed" : "No action needed."}</small></button>
      <span class="ws-sectile">${ICONS.shield}<b>Account protection</b><small>No action needed.</small></span><span class="ws-sectile">${ICONS.shield}<b>Firewall &amp; network protection</b><small>No action needed.</small></span><span class="ws-sectile">${ICONS.shield}<b>App &amp; browser control</b><small>No action needed.</small></span></div>`;
      else if (w.page === "virus")
        body = `<h4>🛡️ Virus &amp; threat protection</h4><p class="ws-sp">Protection for your device against threats.</p>
      <h5>Current threats</h5>${
        st.scan
          ? `<div class="ws-progbox"><span class="ws-progtx">${st.scan.kind} scan running… ${st.scan.p}%</span><span class="ws-prog"><i style="width:${st.scan.p}%"></i></span></div>`
          : threat
            ? `<div class="ws-threat"><b>⚠️ 1 threat found</b><span>Trojan:Win32/FakeGame (a virus)</span><button type="button" class="ws-btn pri" data-t="sec:remove">Remove</button></div>`
            : `<p class="ws-sp">${ls ? `<i class=ws-ck></i> No current threats.<br>Last scan: ${fmtTime(ls.when)} (${ls.kind.toLowerCase()} scan)<br>0 threats found.` : "No current threats.<br>Last scan: 10/9/2026 3:00 PM (quick scan)<br>0 threats found."}</p>`
      }
      <button type="button" class="ws-btn" data-t="sec:quick">Quick scan</button><span class="ws-link" data-t="sec:options" role="button">Scan options</span><span class="ws-link">Allowed threats</span><span class="ws-link">Protection history</span>
      <h5>🔄 Virus &amp; threat protection updates</h5><p class="ws-sp">Security intelligence is up to date.<br>Last update: ${updTxt}</p><span class="ws-link" data-t="sec:updates" role="button">Protection updates</span>`;
      else if (w.page === "options")
        body = `<span class="ws-link" data-t="sec:virus" role="button">‹ Back</span><h4>Scan options</h4><p class="ws-sp">Run a quick, full, custom, or Microsoft Defender Antivirus (offline) scan.</p>
      ${[
        [
          "quick",
          "Quick scan",
          "Checks folders in your system where threats are commonly found.",
        ],
        [
          "full",
          "Full scan",
          "Checks all files and running programs on your hard disk. This scan could take longer than one hour.",
        ],
        [
          "custom",
          "Custom scan",
          "Choose which files and locations you want to check.",
        ],
        [
          "offline",
          "Microsoft Defender Antivirus (offline scan)",
          "Some malicious software can be particularly difficult to remove from your device.",
        ],
      ]
        .map(
          ([k, t, d]) =>
            `<button type="button" class="ws-radio${w.radio === k ? " on" : ""}" data-t="sec:radio:${k}"><i></i><span><b>${t}</b><small>${d}</small></span></button>`,
        )
        .join("")}
      <button type="button" class="ws-btn" data-t="sec:scannow">Scan now</button>`;
      else if (w.page === "updates")
        body = `<span class="ws-link" data-t="sec:virus" role="button">‹ Back</span><h4>🔄 Protection updates</h4><p class="ws-sp">View information about your security intelligence version, and check for updates.</p>
      <h5>Security intelligence</h5><p class="ws-sp">Microsoft Defender Antivirus uses security intelligence to detect threats. We try to automatically download the most recent intelligence to protect your device against the newest threats.</p>
      <p class="ws-sp">Security intelligence version: 1.419.${st.secUpd ? "512" : "487"}.0<br><b class="ws-lastupd">Last update: ${st.secChecking ? "checking…" : updTxt}</b></p><button type="button" class="ws-btn" data-t="sec:check">Check for updates</button>`;
      else
        body = `<h4>${esc((SECNAV.find((x) => x[0] === w.page) || ["", "", ""])[2])}</h4><p class="ws-sp"><i class=ws-ck></i> No action needed.</p>`;
      return `<div class="ws-win ws-sec${i === st.wins.length - 1 ? " top" : ""}" data-win="${i}"><div class="ws-vbar"><span class="ws-app sm">🛡️</span><span>Windows Security</span><span class="ws-wbtns"><span><i class=ws-mini></i></span><span><i class=ws-maxi></i></span><button type="button" data-t="win-close:sec" aria-label="Close"><i class=ws-xi></i></button></span></div>
      <div class="ws-sbody"><div class="ws-side ws-snav">${SECNAV.map(([k, e, n]) => `<button type="button" class="ws-nav${w.page === k || (k === "virus" && (w.page === "options" || w.page === "updates")) ? " on" : ""}" data-t="secnav:${k}"><span class="ws-nic">${e}</span><span>${n}</span></button>`).join("")}</div><div class="ws-spage">${body}</div></div></div>`;
    }
    function appHTML(w, i) {
      return `<div class="ws-win ws-appw${i === st.wins.length - 1 ? " top" : ""}" data-win="${i}"><div class="ws-vbar">${appIc(w.name)}<span>${esc(w.name)}</span><span class="ws-wbtns"><button type="button" data-t="win-close:app" aria-label="Close"><i class=ws-xi></i></button></span></div><div class="ws-vbody"><span class="ws-bigapp">${(APPS.find((a) => a[0] === w.name) || ["", "🪟"])[1]}</span><p class="ws-vnote">${esc(w.name)} is open.</p></div></div>`;
    }
    /* ---------- small windows from the taskbar: calendar, quick settings, battery ---------- */
    function flyHTML() {
      const d = simNow();
      if (st.fly === "cal") {
        const y = d.getFullYear(),
          m = d.getMonth();
        const first = new Date(y, m, 1).getDay();
        const days = new Date(y, m + 1, 0).getDate();
        return `<div class="ws-fly ws-cal"><b class="ws-calt">${fmtDay(d)}</b><div class="ws-calm">${d.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div><div class="ws-calg">${["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((x) => `<i>${x}</i>`).join("")}${"<span></span>".repeat(first)}${Array.from({ length: days }, (_, j) => `<span class="${j + 1 === d.getDate() ? "on" : ""}">${j + 1}</span>`).join("")}</div><div class="ws-calbig">${fmtTime(d)}</div></div>`;
      }
      if (st.fly === "qs")
        return `<div class="ws-fly ws-qs"><div class="ws-qtiles"><button type="button" class="ws-qt${st.wifi ? " on" : ""}" data-t="qs:wifi">${st.wifi ? ICONS.wifi : ICONS.wifioff}<span>Wi-Fi</span><small>${st.wifi ? "Home" : "Off"}</small></button><span class="ws-qt on">🔵<span>Bluetooth</span></span><span class="ws-qt">✈️<span>Airplane mode</span></span><span class="ws-qt">🔋<span>Battery saver</span></span></div>
      <div class="ws-qvol">${st.vol > 0 ? ICONS.speaker : ICONS.mute}<input type="range" min="0" max="100" value="${st.vol}" data-t="vol-range" aria-label="Volume"><b class="ws-volnum">${st.vol}</b></div></div>`;
      if (st.fly === "bat")
        return `<div class="ws-fly ws-batf"><b>🔋 Battery: ${st.bat}%</b><small>${st.charging ? "⚡ Charging. Keep it plugged in until it is full." : st.bat < 20 ? "The battery is low! Plug in your charger." : "Battery is OK."}</small>${st.charging ? "" : `<button type="button" class="ws-btn pri" data-t="bat:plug">🔌 Plug in the charger</button>`}</div>`;
      return "";
    }
    function searchHTML() {
      const q = st.search.q;
      const res = q ? searchAll(q) : [];
      const best = res[0];
      return `<div class="ws-spanel"><label class="ws-sin">${ICONS.search}<input type="text" data-t="search-input" placeholder="Type here to search" value="${esc(q)}" autocomplete="off" spellcheck="false" enterkeyhint="search"></label>
      <div class="ws-scols"><div class="ws-sleft">${
        q
          ? `<b class="ws-sh">Best match</b>${best ? `<button type="button" class="ws-best" data-t="result:${esc(best.name)}" data-id="${best.id}">${iconOf(best)}<span><b>${esc(best.name)}</b><small>${TYPE_NAME[best.type] || "File"}</small></span></button>` : '<p class="ws-empty">No results</p>'}
        ${
          res.length > 1
            ? `<b class="ws-sh">More results</b>${res
                .slice(1, 7)
                .map(
                  (n) =>
                    `<button type="button" class="ws-sres" data-t="result:${esc(n.name)}" data-id="${n.id}">${iconOf(n)}<span>${esc(n.name)}</span></button>`,
                )
                .join("")}`
            : ""
        }`
          : `<b class="ws-sh">Top apps</b><div class="ws-apps">${["explorer", "browser", "store"].map((a) => `<span>${ICONS[a]}</span>`).join("")}</div><p class="ws-empty">Type a name to find a file or folder.</p>`
      }</div>
      ${best ? `<div class="ws-sright">${iconOf(best)}<b>${esc(best.name)}</b><small>${TYPE_NAME[best.type] || "File"}</small><span class="ws-open" >📂 Open</span></div>` : ""}</div></div>`;
    }
    // Windows 11 menu, the old long menu ("Show more options") and its "Send to" list
    const MENU_NEW = [
      ["open", "📂", "Open"],
      ["openwith", G.openwith, "Open with", "›"],
      ["share", G.share, "Share"],
      ["fav", G.star, "Add to Favorites"],
      ["compressto", "🗜️", "Compress to...", "›"],
      ["path", G.copy, "Copy as path"],
      ["props", "🔧", "Properties"],
      ["notepad", "📝", "Edit in Notepad"],
      ["more", G.more, "Show more options"],
    ];
    const MENU_OLD = [
      ["open", "", "Open"],
      ["edit", "", "Edit"],
      ["new", "", "New"],
      ["print", "", "Print"],
      ["-"],
      ["openwith", "", "Open with..."],
      ["access", "", "Give access to", "›"],
      ["path", "", "Copy as path"],
      ["share", "", "Share"],
      ["restore", "", "Restore previous versions"],
      ["-"],
      ["sendto", "", "Send to", "›"],
      ["-"],
      ["cut", "", "Cut"],
      ["copy", "", "Copy"],
      ["-"],
      ["create-shortcut", "", "Create shortcut"],
      ["delete", "", "Delete"],
      ["rename", "", "Rename"],
      ["-"],
      ["props", "", "Properties"],
    ];
    const SENDTO = [
      ["bt", "🔵", "Bluetooth device"],
      ["zip", "🗜️", "Compressed (zipped) folder"],
      ["desktop-shortcut", "🖥️", "Desktop (create shortcut)"],
      ["docs", "📄", "Documents"],
      ["mail", "✉️", "Mail recipient"],
    ];
    const MENU_ZIP_NEW = [
      ["open", "📂", "Open"],
      ["extract", "📤", "Extract All..."],
      ["openwith", G.openwith, "Open with", "›"],
      ["share", G.share, "Share"],
      ["fav", G.star, "Add to Favorites"],
      ["path", G.copy, "Copy as path"],
      ["props", "🔧", "Properties"],
      ["more", G.more, "Show more options"],
    ];
    const MENU_BIN_NEW = [
      ["share", G.share, "Share"],
      ["restore", G.undo, "Restore"],
      ["compressto", "🗜️", "Compress to...", "›"],
      ["props", "🔧", "Properties"],
      ["more", G.more, "Show more options"],
    ];
    const MENU_BIN_OLD = [
      ["restore", "", "Restore"],
      ["-"],
      ["cut", "", "Cut"],
      ["-"],
      ["delete", "", "Delete"],
      ["-"],
      ["props", "", "Properties"],
    ];
    const MENU_BINICON = [
      ["open", "📂", "Open"],
      ["empty", G.trash, "Empty Recycle Bin"],
      ["pinqa", "📌", "Pin to Quick access"],
      ["pinstart", "📌", "Pin to Start"],
      ["props", "🔧", "Properties"],
      ["more", G.more, "Show more options"],
    ];
    const VIEWS = [
      "Extra large icons",
      "Large icons",
      "Medium icons",
      "Small icons",
      "List",
      "Details",
      "Tiles",
      "Content",
    ];
    const VIEW_KEY = {
      "Extra large icons": "xl",
      "Large icons": "large",
      "Medium icons": "medium",
      "Small icons": "small",
      List: "list",
      Details: "details",
      Tiles: "tiles",
      Content: "content",
    };
    const VIEW_IC = {
      "Extra large icons": G.vxl,
      "Large icons": G.vlarge,
      "Medium icons": G.vmedium,
      "Small icons": G.vsmall,
      List: G.vlist,
      Details: G.vdetails,
      Tiles: G.vtiles,
      Content: G.vcontent,
    };
    const MENU_CLOCK = [
      ["adjust", "⚙️", "Adjust date and time"],
      ["notif", "⚙️", "Notifications settings"],
    ];
    const MENU_SPEAKER = [
      ["sound-trouble", "", "Troubleshoot sound problems"],
      ["mixer", "⚙️", "Open volume mixer"],
      ["soundset", "⚙️", "Sound settings"],
    ];
    const MENU_POWER = [
      ["sleep", G.sleep, "Sleep"],
      ["shutdown", G.power, "Shut down"],
      ["restart", G.restart, "Restart"],
    ];
    const MENU_BG = [
      ["view", G.vsmall, "View", "›"],
      ["sort", G.sort, "Sort by", "›"],
      ["refresh", G.refresh, "Refresh"],
      ["paste", G.paste, "Paste"],
      ["-"],
      ["undo", G.undo, "Undo"],
      ["newitem", G.newp, "New", "›"],
      ["-"],
      ["display", "🖥️", "Display settings"],
      ["personalize", "🖌️", "Personalize"],
      ["-"],
      ["terminal", G.terminal, "Open in Terminal"],
      ["bgmore", G.more, "Show more options"],
    ];
    const FILTERS = {
      date: [
        "Today",
        "Yesterday",
        "This week",
        "Last week",
        "This month",
        "Last month",
        "This year",
        "Last year",
      ],
      size: [
        "Empty (0 KB)",
        "Tiny (0 - 16 KB)",
        "Small (16 KB - 1 MB)",
        "Medium (1 - 128 MB)",
        "Large (128 MB - 1 GB)",
        "Huge (1 - 4 GB)",
        "Gigantic (>4 GB)",
      ],
    };
    const MENU_SOPT = [
      ["all", "<i class=ws-ck></i>", "All subfolders"],
      ["cur", "", "Current folder"],
      ["-"],
      ["date", "📅", "Date modified", "›"],
      ["kind", "🏷", "Kind", "›"],
      ["size", "📏", "Size", "›"],
      ["-"],
      ["sys", "<i class=ws-ck></i>", "System files"],
      ["zipf", "", "Zipped (compressed) folders"],
      ["contents", "", "File contents"],
    ];
    function menuRows(list, pre) {
      return list
        .map((r) =>
          r[0] === "-"
            ? '<span class="ws-msep"></span>'
            : `<button type="button" class="ws-mi${st.menu.sub === r[0] ? " on" : ""}" data-t="${pre}:${r[0]}">${r[1] !== undefined ? `<span class="ws-mic">${r[1]}</span>` : ""}<span>${esc(r[2])}</span>${r[3] ? '<span class="ws-marr">›</span>' : ""}</button>`,
        )
        .join("");
    }
    function menuHTML() {
      const m = st.menu;
      let x = m.x,
        y = m.y;
      let inner;
      const tn = m.id && m.id !== "bin" ? nodes.get(m.id) : null;
      const inBin = tn && tn.deleted;
      if (m.kind === "new")
        inner = inBin
          ? `<div class="ws-micons"><button type="button" data-t="mi:cut" aria-label="Cut">${G.cut}</button><button type="button" data-t="mi:delete" aria-label="Delete">${G.trash}</button></div>${menuRows(MENU_BIN_NEW, "menu")}`
          : `<div class="ws-micons"><button type="button" data-t="mi:cut" aria-label="Cut">${G.cut}</button><button type="button" data-t="mi:copy" aria-label="Copy">${G.copy}</button><button type="button" data-t="mi:rename" aria-label="Rename">${G.rename}</button><button type="button" data-t="mi:share" aria-label="Share">${G.share}</button><button type="button" data-t="mi:delete" aria-label="Delete">${G.trash}</button></div>${menuRows(tn && tn.type === "zip" ? MENU_ZIP_NEW : MENU_NEW, "menu")}`;
      else if (m.kind === "old")
        inner = menuRows(inBin ? MENU_BIN_OLD : MENU_OLD, "menu");
      else if (m.kind === "binicon") inner = menuRows(MENU_BINICON, "menu");
      else if (m.kind === "clock") inner = menuRows(MENU_CLOCK, "menu");
      else if (m.kind === "speaker") inner = menuRows(MENU_SPEAKER, "menu");
      else if (m.kind === "power") inner = menuRows(MENU_POWER, "power");
      else if (m.kind === "zones")
        inner = ZONES.map(
          (z) =>
            `<button type="button" class="ws-mi${z[0] === st.zone ? " on" : ""}" data-t="zone:${esc(z[0])}"><span>${esc(z[0])}</span></button>`,
        ).join("");
      else if (m.kind === "res")
        inner = RES.map(
          (r) =>
            `<button type="button" class="ws-mi${r[0] === st.res ? " on" : ""}" data-t="res:${esc(r[0])}"><span>${esc(r[0])}</span></button>`,
        ).join("");
      else if (m.kind === "view")
        inner =
          VIEWS.map(
            (v) =>
              `<button type="button" class="ws-mi" data-t="view:${v}"><span class="ws-mic">${VIEW_KEY[v] === m.cur ? "•" : VIEW_IC[v]}</span><span>${v}</span></button>`,
          ).join("") +
          `<span class="ws-msep"></span><button type="button" class="ws-mi" data-t="view:pane"><span class="ws-mic">${G.pane}</span><span>Details pane</span></button><button type="button" class="ws-mi" data-t="view:preview"><span class="ws-mic">${G.pane}</span><span>Preview pane</span></button>`;
      else if (m.kind === "cols")
        inner = `<button type="button" class="ws-mi" data-t="col:fit"><span class="ws-mic"></span><span>Size Column to Fit</span></button><button type="button" class="ws-mi" data-t="col:fitall"><span class="ws-mic"></span><span>Size All Columns to Fit</span></button><span class="ws-msep"></span><span class="ws-mi off"><span class="ws-mic"><i class=ws-ck></i></span><span>Name</span></span>${Object.keys(
          COLS,
        )
          .map(
            (c) =>
              `<button type="button" class="ws-mi" data-t="col:${c}"><span class="ws-mic">${m.cols.includes(c) ? "<i class=ws-ck></i>" : ""}</span><span>${c}</span></button>`,
          )
          .join("")}`;
      else if (m.kind === "bg") inner = menuRows(MENU_BG, "bgmenu");
      else if (m.kind === "sopt") inner = menuRows(MENU_SOPT, "sopt");
      const wd =
        m.kind === "clock"
          ? 205
          : m.kind === "old"
            ? 230
            : m.kind === "zones"
              ? 330
              : m.kind === "speaker"
                ? 240
                : 250;
      x = Math.max(4, Math.min(x, LW() - wd - 6));
      y = Math.max(4, y);
      let sub = "";
      if (m.sub === "sendto")
        sub = `<div class="ws-menu ws-sub" style="left:${x + wd - 6}px;top:${y + 300}px">${menuRows(SENDTO, "send")}</div>`;
      if (m.kind === "bg" && m.sub === "view")
        sub = `<div class="ws-menu ws-sub" style="left:${x + wd - 6}px;top:${y}px">${VIEWS.map((v) => `<button type="button" class="ws-mi" data-t="view:${v}"><span class="ws-mic">${VIEW_IC[v]}</span><span>${v}</span></button>`).join("")}</div>`;
      if (m.kind === "sopt" && (m.sub === "date" || m.sub === "size"))
        sub = `<div class="ws-menu ws-sub" style="left:${x + wd - 6}px;top:${y + (m.sub === "date" ? 70 : 120)}px">${FILTERS[m.sub].map((f) => `<button type="button" class="ws-mi" data-t="filt:${m.sub}:${esc(f)}"><span>${esc(f)}</span></button>`).join("")}</div>`;
      return `<div class="ws-menu ws-m-${m.kind}" style="left:${x}px;top:${y}px;width:${wd}px">${inner}</div>${sub}`;
    }
    // dialogs: Extract All (+ choose a folder), "are you sure?" before deleting for ever
    function dlgHTML() {
      const d = st.dlg;
      if (d.kind === "extract") {
        const z = nodes.get(d.zip);
        const path =
          "C:\\Users\\Binary\\" +
          [...pathOf(d.dest)].join("\\") +
          (d.picked ? "" : "\\" + z.name.replace(/\.zip$/i, ""));
        return `<div class="ws-dlg ws-ext"><div class="ws-dbar"><span>←</span>${ICONS.zip}<span>Extract Compressed (Zipped) Folders</span><button type="button" class="ws-x" data-t="dlg:cancel" aria-label="Close"><i class=ws-xi></i></button></div>
        <div class="ws-dbody"><h5>Select a Destination and Extract Files</h5><p>Files will be extracted to this folder:</p>
        <div class="ws-drowp"><span class="ws-path">${esc(path)}</span><button type="button" class="ws-btn" data-t="dlg:browse">Browse...</button></div>
        <p class="ws-chk"><span class="ws-cb"><i class=ws-ck></i></span> Show extracted files when complete</p></div>
        <div class="ws-dfoot"><button type="button" class="ws-btn pri" data-t="dlg:extract">Extract</button><button type="button" class="ws-btn" data-t="dlg:cancel">Cancel</button></div>
        ${
          d.browse
            ? `<div class="ws-dlg ws-dest"><div class="ws-dbar"><span>Select a destination</span><button type="button" class="ws-x" data-t="dlg:nobrowse" aria-label="Close"><i class=ws-xi></i></button></div>
          <div class="ws-dbody2"><div class="ws-side">${PLACES.map((p) => `<button type="button" class="ws-nav${d.pick === p ? " on" : ""}" data-t="dest:${p}">${ICONS[p.toLowerCase()]}<span>${p}</span></button>`).join("")}</div>
          <div class="ws-dlist">${
            (byPath(d.pick || "Documents").kids || [])
              .filter((x) => x.type === "folder")
              .map((x) => `<span>${ICONS.folder}${esc(x.name)}</span>`)
              .join("") || "<small>(no folders)</small>"
          }</div></div>
          <div class="ws-dfoot"><span class="ws-fld">Folder: <b>${esc(d.pick || "Documents")}</b></span><button type="button" class="ws-btn pri" data-t="dlg:select">Select Folder</button><button type="button" class="ws-btn" data-t="dlg:nobrowse">Cancel</button></div></div>`
            : ""
        }
      </div>`;
      }
      if (d.kind === "dt") {
        const t = new Date(d.t);
        const M = t.toLocaleDateString("en-US", { month: "long" });
        const H = t.getHours() % 12 || 12;
        const ap = t.getHours() < 12 ? "AM" : "PM";
        const sp = (k, v, lab) =>
          `<span class="ws-spin2"><small>${lab}</small><button type="button" data-t="dt:${k}:+" aria-label="${lab} up"><i class=ws-up></i></button><b>${v}</b><button type="button" data-t="dt:${k}:-" aria-label="${lab} down"><i class=ws-down></i></button></span>`;
        return `<div class="ws-dlg ws-dtd"><div class="ws-dbar"><span>Change date and time</span></div><div class="ws-dbody ws-blue"><h5>Change date and time</h5><p>Date</p><div class="ws-spins">${sp("month", M, "Month")}${sp("day", t.getDate(), "Day")}${sp("year", t.getFullYear(), "Year")}</div>
        <p>Time</p><div class="ws-spins">${sp("hour", H, "Hour")}${sp("min", String(t.getMinutes()).padStart(2, "0"), "Minute")}${sp("ampm", ap, "AM/PM")}</div></div>
        <div class="ws-dfoot"><button type="button" class="ws-btn pri" data-t="dlg:dtchange">Change</button><button type="button" class="ws-btn" data-t="dlg:cancel">Cancel</button></div></div>`;
      }
      if (d.kind === "keep")
        return `<div class="ws-dlg ws-keep"><div class="ws-dbody"><h5>Keep these display settings?</h5><p>Reverting to previous display settings in <b class="ws-cd">${d.secs}</b> seconds.</p></div><div class="ws-dfoot"><button type="button" class="ws-btn" data-t="dlg:keep">Keep changes</button><button type="button" class="ws-btn pri" data-t="dlg:revert">Revert</button></div></div>`;
      if (d.kind === "confirm") {
        const many = d.count !== 1;
        return `<div class="ws-dlg ws-conf"><div class="ws-dbar"><span>${many ? "Delete Multiple Items" : "Delete File"}</span><button type="button" class="ws-x" data-t="dlg:no" aria-label="Close"><i class=ws-xi></i></button></div>
        <div class="ws-dbody ws-warn"><span class="ws-tri">⚠️</span><p>Are you sure you want to permanently delete ${many ? `these ${d.count} items` : "this file"}?</p></div>
        <div class="ws-dfoot"><button type="button" class="ws-btn pri" data-t="dlg:yes">Yes</button><button type="button" class="ws-btn" data-t="dlg:no">No</button></div></div>`;
      }
      return "";
    }
    // keep menus on the screen and put a sub-menu next to its row
    function placeMenus() {
      const mm = scr.querySelector(".ws-menu:not(.ws-sub)");
      if (!mm) return;
      const bottom = LH() - TB - 4;
      if (mm.offsetTop + mm.offsetHeight > bottom)
        mm.style.top = Math.max(4, bottom - mm.offsetHeight) + "px";
      const sub = scr.querySelector(".ws-sub");
      const row = mm.querySelector(".ws-mi.on");
      if (sub && row) {
        let top = mm.offsetTop + row.offsetTop - 4;
        if (top + sub.offsetHeight > bottom)
          top = Math.max(4, bottom - sub.offsetHeight);
        sub.style.top = top + "px";
        let left = mm.offsetLeft + mm.offsetWidth - 4;
        if (left + sub.offsetWidth > LW() - 4)
          left = Math.max(4, mm.offsetLeft - sub.offsetWidth + 4);
        sub.style.left = left + "px";
      }
    }
    function tipHTML() {
      const n = nodes.get(st.tip.id);
      if (!n) return "";
      const x = Math.min(st.tip.x + 14, LW() - 270),
        y = Math.min(st.tip.y + 22, LH() - TB - 110);
      return `<div class="ws-tip" style="left:${x}px;top:${y}px"><span>Type: ${esc(TYPE_NAME[n.type] || "File")}</span>${n.author ? `<span>Authors: ${esc(n.author)}</span>` : ""}${n.type !== "folder" ? `<button type="button" class="ws-tsize" data-t="tip-size">Size: ${sizeTxt(n.kb)}</button>` : ""}<span>Date modified: ${dateTxt(n)}</span></div>`;
    }

    /* ---------- search ---------- */
    function searchAll(q, filt) {
      q = String(q).trim().toLowerCase();
      if (!q) return [];
      let test;
      if (q.includes("*")) {
        const re = new RegExp(
          "^" +
            q
              .split("*")
              .map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
              .join(".*") +
            "$",
          "i",
        );
        test = (n) =>
          re.test(n.name.replace(/\.[^.]+$/, "")) || re.test(n.name);
      } else test = (n) => n.name.toLowerCase().includes(q);
      let res = [...nodes.values()].filter(
        (n) => n !== st.fs && !n.deleted && n.type !== "lnk" && test(n),
      );
      if (filt) {
        res = res.filter((n) => filterOK(n, filt));
      }
      const starts = (n) =>
        n.name.toLowerCase().startsWith(q.replace(/\*/g, "")) ? 0 : 1;
      return res.sort(
        (a, b) =>
          starts(a) - starts(b) ||
          (a.type === "folder" ? 0 : 1) - (b.type === "folder" ? 0 : 1) ||
          a.name.localeCompare(b.name),
      );
    }
    function filterOK(n, f) {
      const [k, v] = f;
      if (k === "date") {
        const d = n.d || 0;
        return {
          Today: d === 0,
          Yesterday: d === 1,
          "This week": d < 7,
          "Last week": d >= 7 && d < 14,
          "This month": d < 30,
          "Last month": d >= 30 && d < 60,
          "This year": d < 365,
          "Last year": d >= 365,
        }[v];
      }
      if (k === "size") {
        const kb = n.type === "folder" ? 0 : n.kb || 0;
        return {
          "Empty (0 KB)": kb === 0,
          "Tiny (0 - 16 KB)": kb > 0 && kb <= 16,
          "Small (16 KB - 1 MB)": kb > 16 && kb <= 1024,
          "Medium (1 - 128 MB)": kb > 1024 && kb <= 131072,
          "Large (128 MB - 1 GB)": kb > 131072 && kb <= 1048576,
          "Huge (1 - 4 GB)": kb > 1048576 && kb <= 4194304,
          "Gigantic (>4 GB)": kb > 4194304,
        }[v];
      }
      return true;
    }

    /* ---------- what each action does ---------- */
    const nodeOf = (info) => (info && info.id ? nodes.get(info.id) : null);
    function openNode(n, w) {
      if (!n) return;
      if (n.type === "lnk") return openNode(n.target, null);
      if (n.deleted) return;
      if (n.type === "folder" || n.type === "zip") {
        w = w || topExp() || openExplorer(n);
        if (w.dir !== n || w.q) {
          w.back.push({ dir: w.dir, q: w.q });
          w.fwd = [];
        }
        w.dir = n;
        w.q = "";
        w.filt = null;
        w.sel = null;
        bringToTop(w);
        return;
      }
      st.wins = st.wins.filter((x) => x.type !== "view");
      st.wins.push({ type: "view", node: n });
    }
    function bringToTop(w) {
      st.wins = st.wins.filter((x) => x !== w);
      st.wins.push(w);
    }
    function restore(n) {
      const b = st.bin.find((x) => x.n === n);
      if (!b) return;
      st.bin = st.bin.filter((x) => x !== b);
      n.deleted = false;
      n.name = uniqueName(b.from, n.name);
      b.from.kids.push(n);
      n.parent = b.from;
      const w = topExp();
      if (w && w.sel === n.id) w.sel = null;
    }
    function purge(n) {
      st.bin = st.bin.filter((x) => x.n !== n);
      nodes.delete(n.id);
      const w = topExp();
      if (w && w.sel === n.id) w.sel = null;
    }
    function del(n) {
      if (!n || n.type === "bin") return;
      const p = n.parent;
      p.kids = p.kids.filter((x) => x !== n);
      n.deleted = true;
      st.bin.push({ n, from: p });
      const w = topExp();
      if (w && w.sel === n.id) w.sel = null;
      if (st.deskSel === n.id) st.deskSel = null;
    }
    function perform(kind, t, info) {
      info = info || {};
      const w = topExp();
      const n = nodeOf(info);
      const [head, ...rest] = t.split(":");
      const arg = rest.join(":");
      if (kind === "hover") {
        if (n) {
          st.tip = { id: n.id, x: info.x || 0, y: info.y || 0 };
        }
        return render();
      }
      if (kind === "right") {
        st.search = null;
        st.tip = null;
        if (st.rename) commitRename();
        if (head === "file" || head === "desk" || head === "sres") {
          if (n) {
            if (head === "desk") st.deskSel = n.id;
            else if (w) w.sel = n.id;
          }
          if (info.id === "bin") {
            st.deskSel = "bin";
            st.menu = {
              kind: "binicon",
              id: "bin",
              x: info.x,
              y: info.y,
              sub: null,
              where: head,
            };
          } else
            st.menu = {
              kind: "new",
              id: info.id,
              x: info.x,
              y: info.y,
              sub: null,
              where: head,
            };
        } else if (head === "desktop" || head === "exp-bg") {
          st.menu = {
            kind: "bg",
            x: info.x,
            y: info.y,
            sub: null,
            where: head,
          };
        } else if (head === "tray-clock") {
          st.fly = null;
          st.menu = {
            kind: "clock",
            x: LW() - 215,
            y: LH() - TB - 90,
            sub: null,
          };
        } else if (head === "tray-speaker") {
          st.fly = null;
          st.menu = {
            kind: "speaker",
            x: LW() - 300,
            y: LH() - TB - 110,
            sub: null,
          };
        } else if (head === "det-header" && w) {
          st.menu = {
            kind: "cols",
            x: info.x,
            y: info.y,
            sub: null,
            cols: w.cols,
          };
        }
        return render();
      }
      if (kind === "drag") {
        if (n && info.dest === "desktop") {
          const dk = desktopNode();
          if (n.parent !== dk) {
            n.parent.kids = n.parent.kids.filter((x) => x !== n);
            dk.kids.push(n);
            n.parent = dk;
            st.deskSel = n.id;
            if (w && w.sel === n.id) w.sel = null;
          }
        } else if (n && info.dest === "exp-main") {
          const to = w && w.dir && w.dir !== "bin" && !w.q ? w.dir : null;
          if (to && n.deleted) return render();
          if (to && to !== n.parent && to !== n) {
            n.parent.kids = n.parent.kids.filter((x) => x !== n);
            to.kids.push(n);
            n.parent = to;
            if (st.deskSel === n.id) st.deskSel = null;
            w.sel = n.id;
          }
        } else if (n && info.dest && info.dest.startsWith("nav:")) {
          const to = byPath(info.dest.slice(4));
          if (to && to !== n.parent && to !== n) {
            n.parent.kids = n.parent.kids.filter((x) => x !== n);
            to.kids.push(n);
            n.parent = to;
          }
        }
        return render();
      }
      if (kind === "dbl") {
        closeMenus();
        if (st.rename) commitRename();
        if (head === "desk") {
          if (info.id === "bin") {
            const ex = topExp() || openExplorer(null);
            if (ex.dir !== "bin") ex.back.push({ dir: ex.dir, q: ex.q });
            ex.dir = "bin";
            ex.q = "";
            ex.sel = null;
            bringToTop(ex);
          } else openNode(n);
        } else if (head === "file" || head === "sres" || head === "result") {
          if (head === "result") st.search = null;
          openNode(n, head === "result" ? null : w);
        }
        return render();
      }
      if (kind === "type") {
        return;
      }
      if (kind === "key") {
        if (arg === "F2") {
          const id = (w && w.sel) || st.deskSel;
          if (id && id !== "bin") startRename(nodes.get(id));
        } else if (arg === "Enter") {
          const hw =
            st.wins.length && st.wins[st.wins.length - 1].type === "help"
              ? st.wins[st.wins.length - 1]
              : null;
          if (st.rename) commitRename();
          else if (st.start && (st.start.q || "").trim()) {
            const q = st.start.q.trim().toLowerCase();
            const a = APPS.find((x) => x[0].toLowerCase().includes(q));
            if (a) openApp(a[0]);
            else {
              const r = searchAll(q)[0];
              st.start = null;
              if (r) openNode(r, null);
            }
          } else if (hw && hw.q.trim())
            hw.res = HELP.find((h) => h.k.test(hw.q.toLowerCase()));
          else {
            const id = w && w.sel;
            if (id) openNode(nodes.get(id), w);
          }
        }
        return render();
      }
      if (st.rename && head !== "rename-input") {
        commitRename();
      }
      // click
      if (
        ![
          "menu",
          "send",
          "mi",
          "sopt",
          "filt",
          "bgmenu",
          "view",
          "col",
          "power",
          "zone",
          "res",
        ].includes(head)
      )
        st.menu = null;
      if (
        ![
          "task-start",
          "start-all",
          "start-search",
          "start-power",
          "power",
        ].includes(head)
      )
        st.start = null;
      if (
        ![
          "tray-clock",
          "tray-wifi",
          "tray-speaker",
          "tray-battery",
          "qs",
          "bat",
          "vol-range",
        ].includes(head)
      )
        st.fly = null;
      if (head !== "tip-size") st.tip = null;
      if (
        head !== "task-search" &&
        head !== "search-input" &&
        head !== "result"
      )
        st.search = null;
      switch (head) {
        case "desktop":
          st.deskSel = null;
          break;
        case "desk":
          st.deskSel = info.id;
          break;
        case "task-search":
          st.search = st.search ? null : { q: "" };
          break;
        case "task-explorer": {
          const ex = topExp();
          if (ex) bringToTop(ex);
          else openExplorer(null);
          break;
        }
        case "result":
          openNode(n, null);
          break;
        case "exp-close":
          st.wins = st.wins.filter((x) => x.type !== "exp");
          break;
        case "view-close":
          st.wins = st.wins.filter((x) => x.type !== "view");
          break;
        case "exp-back":
          if (w && w.back.length) {
            w.fwd.push({ dir: w.dir, q: w.q });
            const b = w.back.pop();
            w.dir = b.dir;
            w.q = b.q;
            w.sel = null;
          }
          break;
        case "exp-fwd":
          if (w && w.fwd.length) {
            w.back.push({ dir: w.dir, q: w.q });
            const f = w.fwd.pop();
            w.dir = f.dir;
            w.q = f.q;
            w.sel = null;
          }
          break;
        case "exp-up":
          if (w && w.dir && w.dir !== "bin") {
            w.back.push({ dir: w.dir, q: w.q });
            w.dir = w.dir.parent === st.fs ? null : w.dir.parent;
            w.q = "";
            w.sel = null;
          }
          break;
        case "nav":
          if (w) {
            w.back.push({ dir: w.dir, q: w.q });
            w.q = "";
            w.filt = null;
            w.sel = null;
            w.dir = arg === "Home" || arg === "Gallery" ? null : byPath(arg);
          }
          break;
        case "file":
        case "sres":
          if (w) w.sel = info.id;
          break;
        case "exp-bg":
          if (w && !info.id) w.sel = null;
          break;
        case "task-start":
          st.start = st.start ? null : { all: false, q: "" };
          st.search = null;
          break;
        case "start-all":
          if (st.start) st.start.all = !st.start.all;
          break;
        case "start-power":
          st.menu = {
            kind: "power",
            x: (info.x || 600) - 60,
            y: (info.y || 400) - 130,
            sub: null,
          };
          break;
        case "power":
          st.menu = null;
          if (arg === "restart" || arg === "shutdown") restart();
          else {
            st.boot = "Sleeping… press any key";
            st.start = null;
            after(1800, () => {
              st.boot = null;
            });
          }
          st.start = null;
          break;
        case "app":
          openApp(arg);
          break;
        case "win-close":
          st.wins = st.wins.filter((x) => x.type !== arg);
          break;
        case "tray-clock":
          st.fly = st.fly === "cal" ? null : "cal";
          break;
        case "tray-wifi":
        case "tray-speaker":
          st.fly = st.fly === "qs" ? null : "qs";
          break;
        case "tray-battery":
          st.fly = st.fly === "bat" ? null : "bat";
          break;
        case "qs":
          if (arg === "wifi") st.wifi = !st.wifi;
          break;
        case "bat":
          if (arg === "plug") {
            st.charging = true;
            after(1200, () => {
              st.bat = Math.max(st.bat, 60);
            });
          }
          break;
        case "setnav": {
          const pg = (SETNAV.find((x) => x[0] === arg) || [])[2];
          if (pg) openSet(pg);
          break;
        }
        case "set": {
          if (arg === "autozone") st.autozone = !st.autozone;
          else if (arg === "dst") st.dst = !st.dst;
          else if (arg === "autotime") {
            st.autotime = !st.autotime;
            if (st.autotime) st.manual = 0;
          } else if (arg === "night") st.night = !st.night;
          else if (arg === "zone") {
            if (!st.autozone)
              st.menu = {
                kind: "zones",
                x: info.x ? info.x - 200 : 500,
                y: (info.y || 200) + 14,
                sub: null,
              };
          } else if (arg === "res")
            st.menu = {
              kind: "res",
              x: info.x ? info.x - 120 : 600,
              y: (info.y || 200) + 14,
              sub: null,
            };
          else if (arg === "change") {
            if (!st.autotime) st.dlg = { kind: "dt", t: simNow().getTime() };
          } else if (arg === "background") openSet("background");
          break;
        }
        case "zone":
          st.zone = arg;
          st.menu = null;
          break;
        case "res": {
          st.menu = null;
          const prev = st.res;
          if (arg !== prev) {
            setRes(arg);
            st.dlg = { kind: "keep", secs: 15, prev };
            const id = every(1000, () => {
              const d = st.dlg;
              if (!d || d.kind !== "keep") {
                clearInterval(id);
                return;
              }
              d.secs--;
              const c = scr.querySelector(".ws-cd");
              if (c) c.textContent = d.secs;
              if (d.secs <= 0) {
                clearInterval(id);
                if (!mis) {
                  setRes(d.prev);
                  st.dlg = null;
                  render();
                } else {
                  d.secs = 1;
                }
              }
            });
          }
          break;
        }
        case "theme":
        case "bg":
          st.wall = +arg;
          break;
        case "dt": {
          const d = st.dlg;
          if (!d || d.kind !== "dt") break;
          const [k2, sg] = arg.split(":");
          const t = new Date(d.t);
          const v = sg === "+" ? 1 : -1;
          if (k2 === "hour") t.setHours(t.getHours() + v);
          if (k2 === "min") t.setMinutes(t.getMinutes() + v);
          if (k2 === "day") t.setDate(t.getDate() + v);
          if (k2 === "month") t.setMonth(t.getMonth() + v);
          if (k2 === "year") t.setFullYear(t.getFullYear() + v);
          if (k2 === "ampm") t.setHours(t.getHours() + 12 * v);
          d.t = t.getTime();
          break;
        }
        case "wu":
          if (st.wu !== "checking") {
            st.wu = "checking";
            after(2500, () => {
              st.wu = "done";
              st.wuTime = simNow();
            });
          }
          break;
        case "help-go": {
          const hw = st.wins.find((x) => x.type === "help");
          if (hw && hw.q.trim())
            hw.res = HELP.find((h) => h.k.test(hw.q.toLowerCase()));
          break;
        }
        case "help-yes": {
          const hw = st.wins.find((x) => x.type === "help");
          if (hw) hw.fixed = true;
          break;
        }
        case "help-no":
          break;
        case "secnav": {
          const sw = st.wins.find((x) => x.type === "sec");
          if (sw) sw.page = arg;
          break;
        }
        case "sec": {
          const sw = st.wins.find((x) => x.type === "sec");
          if (!sw) break;
          if (arg === "virus" || arg === "options" || arg === "updates")
            sw.page = arg;
          else if (arg === "quick") {
            if (!st.scan) runScan("Quick");
          } else if (arg.startsWith("radio:")) sw.radio = arg.slice(6);
          else if (arg === "scannow") {
            if (!st.scan)
              runScan(
                {
                  quick: "Quick",
                  full: "Full",
                  custom: "Custom",
                  offline: "Offline",
                }[sw.radio] || "Quick",
              );
          } else if (arg === "check") {
            st.secChecking = true;
            after(2000, () => {
              st.secChecking = false;
              st.secUpd = simNow();
            });
          } else if (arg === "remove") {
            st.virus = false;
          }
          break;
        }
        case "tool-delete":
          if (w && w.sel) {
            const t0 = nodes.get(w.sel);
            if (t0 && t0.deleted) purge(t0);
            else del(t0);
          }
          break;
        case "tool-view":
          if (w)
            st.menu = {
              kind: "view",
              x: info.x ? info.x - 40 : 540,
              y: (info.y || 110) + 16,
              sub: null,
              cur: w.view,
            };
          break;
        case "view": {
          st.menu = null;
          const v = VIEW_KEY[arg];
          if (w && v) w.view = v;
          break;
        }
        case "col": {
          const m = st.menu;
          st.menu = null;
          if (w && COLS[arg]) {
            w.cols = w.cols.includes(arg)
              ? w.cols.filter((c) => c !== arg)
              : [...w.cols, arg];
          }
          break;
        }
        case "tool-rename":
          if (w && w.sel) startRename(nodes.get(w.sel));
          break;
        case "tool-cut":
          if (w && w.sel) st.clip = { id: w.sel, mode: "cut" };
          break;
        case "tool-copy":
          if (w && w.sel) st.clip = { id: w.sel, mode: "copy" };
          break;
        case "tool-paste":
          if (w && w.dir && !w.q) paste(w.dir);
          break;
        case "bin-empty":
          if (st.bin.length) st.dlg = { kind: "confirm", count: st.bin.length };
          break;
        case "dlg": {
          const d = st.dlg;
          if (!d) break;
          if (arg === "cancel" || arg === "no") st.dlg = null;
          else if (arg === "yes") {
            st.bin.forEach((b) => nodes.delete(b.n.id));
            st.bin = [];
            st.dlg = null;
          } else if (arg === "keep") st.dlg = null;
          else if (arg === "revert") {
            setRes(d.prev);
            st.dlg = null;
          } else if (arg === "dtchange") {
            st.manual += d.t - simNow().getTime();
            st.dlg = null;
          } else if (arg === "browse") {
            d.browse = true;
            d.pick = d.pick || pathOf(d.dest)[0] || "Documents";
          } else if (arg === "nobrowse") d.browse = false;
          else if (arg === "select") {
            d.dest = byPath(d.pick || "Documents");
            d.browse = false;
            d.picked = true;
          } else if (arg === "extract") {
            const z = nodes.get(d.zip);
            st.dlg = null;
            if (z) {
              const f = d.picked
                ? extractInto(z, d.dest)
                : extractTo(z, d.dest);
              const ex = topExp() || openExplorer(f);
              ex.back.push({ dir: ex.dir, q: ex.q });
              ex.dir = f;
              ex.q = "";
              ex.sel = null;
              bringToTop(ex);
            }
          }
          break;
        }
        case "dest":
          if (st.dlg) st.dlg.pick = arg;
          break;
        case "searchopt":
          st.menu = {
            kind: "sopt",
            x: info.x || 560,
            y: (info.y || 110) + 10,
            sub: null,
          };
          break;
        case "sopt":
          if (st.menu)
            st.menu.sub = arg === "date" || arg === "size" ? arg : null;
          break;
        case "filt":
          if (w) {
            const [fk, ...fv] = arg.split(":");
            w.filt = [fk, fv.join(":")];
          }
          st.menu = null;
          break;
        case "mi": {
          const m = st.menu;
          const target = m && m.id && m.id !== "bin" ? nodes.get(m.id) : null;
          st.menu = null;
          if (arg === "delete") {
            if (target && target.deleted) purge(target);
            else del(target);
          }
          if (arg === "rename") startRename(target);
          if (arg === "cut" && target) st.clip = { id: target.id, mode: "cut" };
          if (arg === "copy" && target)
            st.clip = { id: target.id, mode: "copy" };
          break;
        }
        case "menu": {
          const m = st.menu;
          const target = m && m.id && m.id !== "bin" ? nodes.get(m.id) : null;
          if (arg === "more") {
            st.menu = { ...m, kind: "old", sub: null };
            break;
          }
          if (arg === "sendto") {
            st.menu = { ...m, sub: "sendto" };
            break;
          }
          st.menu = null;
          if (arg === "open" && target) openNode(target, w);
          if (arg === "create-shortcut" && target) {
            const s = addShortcut(target, target.parent);
            if (m.where === "desk") st.deskSel = s.id;
            else if (w) w.sel = s.id;
          }
          if (arg === "delete") {
            if (target && target.deleted) purge(target);
            else del(target);
          }
          if (arg === "rename") startRename(target);
          if (arg === "cut" && target) st.clip = { id: target.id, mode: "cut" };
          if (arg === "copy" && target)
            st.clip = { id: target.id, mode: "copy" };
          if (arg === "restore" && target) restore(target);
          if (arg === "extract" && target) {
            st.dlg = {
              kind: "extract",
              zip: target.id,
              dest: target.parent,
              picked: false,
            };
          }
          if (arg === "empty") {
            if (st.bin.length)
              st.dlg = { kind: "confirm", count: st.bin.length };
          }
          if (arg === "adjust") openSet("datetime");
          if (arg === "notif") openSet("home");
          if (arg === "mixer" || arg === "soundset") openSet("mixer");
          if (arg === "sound-trouble") {
            const hw = openWin({
              type: "help",
              q: "sound",
              res: null,
              fixed: false,
            });
            hw.res = HELP[1];
          }
          if (arg === "open" && m.id === "bin") {
            const ex = topExp() || openExplorer(null);
            ex.dir = "bin";
            ex.q = "";
            bringToTop(ex);
          }
          break;
        }
        case "send": {
          const m = st.menu;
          const target = m && m.id ? nodes.get(m.id) : null;
          st.menu = null;
          if (arg === "desktop-shortcut" && target) {
            addShortcut(
              target.type === "lnk" ? target.target : target,
              desktopNode(),
            );
          }
          if (arg === "zip" && target) {
            const z = makeZip(target);
            if (w && m.where !== "desk") w.sel = z.id;
            else st.deskSel = z.id;
          }
          break;
        }
        case "bgmenu": {
          const m = st.menu;
          if (arg === "view") {
            st.menu = { ...m, sub: "view" };
            break;
          }
          st.menu = null;
          if (arg === "display") openSet("display");
          if (arg === "personalize") openSet("personalization");
          if (arg === "paste") {
            if (m.where === "desktop") paste(desktopNode());
            else if (w && w.dir && !w.q) paste(w.dir);
          }
          break;
        }
      }
      render();
    }

    /* ---------- the child's pointer: click, double-click, right-click (long press), drag, hover ---------- */
    const toScr = (cx, cy) => {
      const r = scr.getBoundingClientRect();
      return { x: (cx - r.left) / (k * f), y: (cy - r.top) / (k * f) };
    };
    let press = null;
    scr.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const el = e.target.closest("[data-t]");
      if (!el) return;
      if (press && press.lp) return;
      const p = toScr(e.clientX, e.clientY);
      user("right", el, p);
    });
    scr.addEventListener("pointerdown", (e) => {
      lastTouch = e.pointerType !== "mouse";
      if (e.button === 2) return;
      const el = e.target.closest("[data-t]");
      if (!el) return;
      const p = toScr(e.clientX, e.clientY);
      if (el.tagName === "INPUT") {
        const s = mis && mis.mode === "try" && !mis.busy && mis.steps[mis.i];
        if (s && s.act === "click" && s.t === el.dataset.t) advance();
        else if (mis && mis.mode === "demo") e.preventDefault();
        return;
      }
      press = {
        el,
        x: e.clientX,
        y: e.clientY,
        p,
        lp: false,
        drag: null,
        id: e.pointerId,
        touch: e.pointerType !== "mouse",
      };
      if (press.touch)
        press.timer = setTimeout(() => {
          if (press && !press.drag) {
            press.lp = true;
            user("right", el, p);
          }
        }, 560);
    });
    scr.addEventListener("pointermove", (e) => {
      if (!press) {
        if (e.pointerType === "mouse") {
          if (e.target.closest(".ws-tip")) return;
          const el = e.target.closest(
            '[data-t^="file:"],[data-t^="desk:"],[data-t^="sres:"]',
          );
          hoverOn(el, e);
        }
        return;
      }
      const dx = e.clientX - press.x,
        dy = e.clientY - press.y;
      if (
        !press.drag &&
        press.el.dataset.drag === "1" &&
        Math.hypot(dx, dy) > 10
      ) {
        clearTimeout(press.timer);
        const g = document.createElement("div");
        g.className = "ws-ghost";
        g.innerHTML = press.el.innerHTML;
        scr.appendChild(g);
        press.drag = g;
        try {
          scr.setPointerCapture(e.pointerId);
        } catch (_) {}
      }
      if (press.drag) {
        const p = toScr(e.clientX, e.clientY);
        press.drag.style.left = p.x - 30 + "px";
        press.drag.style.top = p.y - 30 + "px";
        const over = dropAt(e.clientX, e.clientY);
        scr
          .querySelectorAll(".ws-over")
          .forEach((x) => x.classList.remove("ws-over"));
        if (over) over.classList.add("ws-over");
      }
    });
    const dropAt = (cx, cy) => {
      const els = document.elementsFromPoint(cx, cy);
      const d = els.find((x) => x.dataset && x.dataset.drop && scr.contains(x));
      return d || null;
    };
    scr.addEventListener("pointerup", (e) => {
      if (!press) return;
      clearTimeout(press.timer);
      const pr = press;
      press = null;
      if (pr.drag) {
        pr.drag.remove();
        scr
          .querySelectorAll(".ws-over")
          .forEach((x) => x.classList.remove("ws-over"));
        const d = dropAt(e.clientX, e.clientY);
        user(
          "drag",
          pr.el,
          toScr(e.clientX, e.clientY),
          d ? d.dataset.drop : null,
        );
        return;
      }
      if (pr.lp) return;
      const el = e.target.closest("[data-t]");
      if (!el || (el !== pr.el && !pr.el.contains(el))) return;
      const now = Date.now();
      const t = pr.el.dataset.t;
      if (lastClick.t === t && now - lastClick.time < 450) {
        lastClick = { t: "", time: 0 };
        user("dbl", pr.el, pr.p);
      } else {
        lastClick = { t, time: now };
        user("click", pr.el, pr.p);
      }
    });
    scr.addEventListener("pointercancel", () => {
      if (press) {
        clearTimeout(press.timer);
        if (press.drag) press.drag.remove();
        press = null;
      }
    });
    scr.addEventListener("keydown", (e) => {
      const el = e.target.closest("[data-t]");
      if (!el || el.tagName === "INPUT") return;
      if (e.key === "Enter") {
        e.preventDefault();
        user("dbl", el, center(el));
      } else if (e.key === " ") {
        e.preventDefault();
        user("click", el, center(el));
      } else if (e.key === "ContextMenu" || (e.shiftKey && e.key === "F10")) {
        e.preventDefault();
        user("right", el, center(el));
      }
    });
    let hoverT = null;
    function hoverOn(el, e) {
      if (st.menu) return;
      const id = el && el.dataset.id;
      if (!el || !id || id === "bin") {
        if (st.tip && !hoverT) {
          st.tip = null;
          render();
        }
        clearTimeout(hoverT);
        hoverT = null;
        return;
      }
      if (st.tip && st.tip.id === id) return;
      clearTimeout(hoverT);
      const p = toScr(e.clientX, e.clientY);
      hoverT = setTimeout(() => {
        hoverT = null;
        user("hover", el, p);
      }, 450);
    }
    function center(el) {
      const r = el.getBoundingClientRect(),
        s = scr.getBoundingClientRect();
      return {
        x: (r.left + r.width / 2 - s.left) / (k * f),
        y: (r.top + r.height / 2 - s.top) / (k * f),
      };
    }
    function onType(inp) {
      const t = inp.dataset.t;
      const v = inp.value;
      if (t === "rename-input") {
        if (st.rename) st.rename.v = v;
        if (mis && mis.mode === "try") {
          const s = mis.steps[mis.i];
          const vv = v.trim().toLowerCase(),
            tt = String(s && s.text).toLowerCase();
          if (
            s &&
            s.act === "type" &&
            s.t === t &&
            (vv === tt || vv.startsWith(tt + "."))
          )
            advance();
        }
        return;
      }
      if (t === "vol-range") {
        st.vol = +v;
        scr.querySelectorAll(".ws-volnum").forEach((b) => (b.textContent = v));
        scr.querySelectorAll('input[data-t="vol-range"]').forEach((r) => {
          if (r !== inp) r.value = v;
        });
        const tic = scr.querySelector('[data-t="tray-speaker"]');
        if (tic) tic.innerHTML = st.vol > 0 ? ICONS.speaker : ICONS.mute;
        if (mis && mis.mode === "try") {
          const s = mis.steps[mis.i];
          if (
            s &&
            s.act === "slide" &&
            s.t === t &&
            ((s.max != null && +v <= s.max) || (s.min != null && +v >= s.min))
          )
            advance();
        }
        return;
      }
      if (t === "help-input") {
        const hw = st.wins.find((x) => x.type === "help");
        if (hw) hw.q = v;
        if (mis && mis.mode === "try") {
          const s = mis.steps[mis.i];
          if (
            s &&
            s.act === "type" &&
            s.t === t &&
            v.trim().toLowerCase() === String(s.text).toLowerCase()
          )
            advance();
        }
        return;
      }
      if (t === "start-search") {
        if (st.start) st.start.q = v;
      } else if (t === "search-input") {
        st.search = { q: v };
      } else if (t === "exp-search") {
        const w = topExp();
        if (w) {
          if (v && !w.q) {
            w.back.push({ dir: w.dir, q: "" });
          }
          w.q = v;
          w.sel = null;
          if (!v) w.filt = null;
        }
      }
      render();
      if (mis && mis.mode === "try") {
        const s = mis.steps[mis.i];
        if (
          s &&
          s.act === "type" &&
          s.t === t &&
          v.trim().toLowerCase() === String(s.text).toLowerCase()
        )
          advance();
      }
    }

    /* ---------- missions ---------- */
    const find = (t) => {
      if (t == null) return null;
      const all = [...scr.querySelectorAll(`[data-t="${CSS.escape(t)}"]`)];
      return all.find((x) => x.offsetParent !== null) || all[0] || null;
    };
    // the child did something: check it against the mission step
    // a key on the keyboard (F2, Enter), or the key button under the screen
    function keyFrom(key) {
      const p = { x: LW() / 2, y: LH() / 2 };
      user("key", { dataset: { t: "key:" + key } }, p);
    }
    const onDocKey = (e) => {
      if (!box.isConnected) return;
      if (e.key === "F2") {
        e.preventDefault();
        keyFrom("F2");
      } else if (
        e.key === "Enter" &&
        e.target &&
        scr.contains(e.target) &&
        e.target.dataset &&
        e.target.dataset.t === "exp-search"
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", onDocKey);
    function user(kind, el, p, dest) {
      const t = el.dataset.t;
      const info = { id: el.dataset.id, x: p.x, y: p.y, dest };
      if (!mis) {
        return perform(kind, t, info);
      }
      if (mis.mode === "demo" || mis.busy) return;
      const s = mis.steps[mis.i];
      if (!s) return perform(kind, t, info);
      if (match(s, kind, t, info)) {
        perform(s.act === "hover" ? "hover" : kind, t, info);
        advance();
        return;
      }
      // things that are fine on the way: one click before a double-click, selecting before dragging, hovering, closing an open menu
      if (kind === "hover" && s.act !== "hover") return;
      if (
        kind === "click" &&
        (s.act === "dbl" || s.act === "drag" || s.act === "hover") &&
        t === s.t
      ) {
        return perform(kind, t, info);
      }
      if (kind === "click" && s.act === "type" && t === s.t) {
        el.focus && el.focus();
        return;
      }
      if (kind === "key" && s.act !== "key") return perform(kind, t, info);
      if (
        kind === "click" &&
        s.act === "click" &&
        t.startsWith("desk") &&
        s.t &&
        s.t.startsWith("desk") &&
        t !== s.t
      ) {
        wrong(s, el, "place");
        return;
      }
      wrong(s, el, kind !== s.act && t === s.t ? "kind" : "place", p);
    }
    function match(s, kind, t, info) {
      if (s.t !== t) return false;
      if (s.act === "hover") return kind === "hover" || kind === "click";
      if (s.act === "drag")
        return kind === "drag" && info.dest === (s.to || "desktop");
      if (s.act === "key") return kind === "key";
      if (s.act === "slide") return false;
      return s.act === kind;
    }
    function wrong(s, el, why, p) {
      mis.wrongs++;
      if (p) {
        const r = document.createElement("span");
        r.className = "ws-ring no";
        r.style.left = p.x + "px";
        r.style.top = p.y + "px";
        scr.appendChild(r);
        setTimeout(() => r.remove(), 700);
      }
      glow(true);
      mis.cb.onWrong && mis.cb.onWrong(s, why);
    }
    function glow(on) {
      scr
        .querySelectorAll(".ws-glow")
        .forEach((x) => x.classList.remove("ws-glow"));
      if (!on || !mis) return;
      const s = mis.steps[mis.i];
      if (!s || !s.t) return;
      const el = find(s.t);
      if (el) el.classList.add("ws-glow");
      if (s.act === "drag") {
        const d = scr.querySelector(`[data-drop="${s.to || "desktop"}"]`);
        if (d && d !== el) d.classList.add("ws-glowdrop");
      }
    }
    function markStep() {
      if (mis.glowing) glow(true);
    }
    async function advance() {
      if (!mis) return;
      const m = mis;
      m.busy = true;
      glow(false);
      scr
        .querySelectorAll(".ws-glowdrop")
        .forEach((x) => x.classList.remove("ws-glowdrop"));
      m.i++;
      await wait(m.mode === "demo" ? 500 : 350);
      if (mis !== m) return;
      step();
    }
    async function step() {
      const m = mis;
      if (!m) return;
      clearTimeout(m.idle);
      m.glowing = false;
      if (m.i >= m.steps.length) {
        mis = null;
        render();
        m.cb.onDone && m.cb.onDone(m);
        return;
      }
      const s = m.steps[m.i];
      const said = m.cb.onStep ? m.cb.onStep(m.i, s) : null;
      if (m.mode === "demo") {
        await Promise.race([said || wait(0), wait(4500)]);
        if (mis !== m) return;
        await demoDo(s);
        if (mis !== m) return;
        m.i++;
        await wait(700);
        if (mis !== m) return;
        return step();
      }
      m.busy = false;
      if (s.act === "look") {
        m.glowing = true;
        glow(true);
        await Promise.race([said || wait(0), wait(5000)]);
        await wait(Math.max(900, s.wait || 0));
        if (mis !== m) return;
        m.i++;
        return step();
      }
      if (s.act === "type") {
        const inp = find(s.t);
        if (inp && !lastTouch) inp.focus({ preventScroll: true });
      }
      m.idle = setTimeout(() => {
        if (mis === m && m.i < m.steps.length) {
          m.glowing = true;
          glow(true);
        }
      }, m.helpAfter ?? 6000);
    }
    // demo: move the pretend mouse and do the step
    async function moveTo(x, y, ms = 650) {
      const c = scr.querySelector(".ws-cursor");
      if (!c) return;
      c.classList.add("show");
      c.style.transition = `left ${ms}ms ease,top ${ms}ms ease`;
      c.style.left = x + "px";
      c.style.top = y + "px";
      cursorXY = { x, y };
      await wait(ms + 60);
    }
    function ring(x, y, cls) {
      const r = document.createElement("span");
      r.className = "ws-ring " + (cls || "");
      r.style.left = x + "px";
      r.style.top = y + "px";
      scr.appendChild(r);
      setTimeout(() => r.remove(), 700);
    }
    async function demoDo(s) {
      const m = mis;
      if (s.act === "look") {
        glow(true);
        await wait(Math.max(1200, s.wait || 0));
        glow(false);
        return;
      }
      if (s.act === "key") {
        st.key = s.key === "Enter" ? "Enter" : s.key;
        const kd = document.createElement("div");
        kd.className = "ws-key";
        kd.textContent = st.key;
        scr.appendChild(kd);
        await wait(900);
        st.key = null;
        kd.remove();
        perform("key", s.t, {});
        return;
      }
      const el = find(s.t);
      if (!el) return;
      el.classList.add("ws-glow");
      const c = center(el);
      await moveTo(c.x, c.y);
      if (mis !== m) return;
      if (s.act === "slide") {
        const to =
          s.max != null ? Math.max(0, s.max - 10) : Math.min(100, s.min + 10);
        let v = +el.value;
        const stp = v < to ? 3 : -3;
        while (stp > 0 ? v < to : v > to) {
          v += stp;
          el.value = v;
          onType(el);
          await wait(40);
          if (mis !== m) return;
        }
        return;
      }
      if (s.act === "type") {
        el.focus({ preventScroll: true });
        if (s.t === "rename-input") {
          el.value = "";
          onType(el);
        }
        for (let i = 1; i <= s.text.length; i++) {
          el.value = s.text.slice(0, i);
          onType(el);
          await wait(140);
          if (mis !== m) return;
        }
        return;
      }
      if (s.act === "drag") {
        const d = scr.querySelector(`[data-drop="${s.to || "desktop"}"]`);
        const g = document.createElement("div");
        g.className = "ws-ghost";
        g.innerHTML = el.innerHTML;
        g.style.left = c.x - 30 + "px";
        g.style.top = c.y - 30 + "px";
        scr.appendChild(g);
        let tx = 60,
          ty = LH() - 120;
        if (d && s.to && s.to !== "desktop") {
          const dc = center(d);
          tx = dc.x;
          ty = dc.y;
        }
        g.style.transition = "left 900ms ease,top 900ms ease";
        await wait(30);
        g.style.left = tx - 30 + "px";
        g.style.top = ty - 30 + "px";
        await moveTo(tx, ty, 900);
        g.remove();
        perform("drag", s.t, {
          id: el.dataset.id,
          dest: s.to || "desktop",
          x: tx,
          y: ty,
        });
        return;
      }
      if (s.act === "hover") {
        await wait(300);
        perform("hover", s.t, { id: el.dataset.id, x: c.x, y: c.y });
        await wait(600);
        return;
      }
      ring(c.x, c.y, s.act === "right" ? "right" : "");
      if (s.act === "dbl") {
        await wait(160);
        ring(c.x, c.y);
      }
      await wait(250);
      perform(s.act, s.t, { id: el.dataset.id, x: c.x, y: c.y });
    }
    function run(steps, cb) {
      stop();
      mis = {
        steps,
        cb: cb || {},
        mode: (cb && cb.mode) || "try",
        i: 0,
        wrongs: 0,
        busy: false,
        helpAfter: cb && cb.helpAfter,
      };
      const c = scr.querySelector(".ws-cursor");
      if (c) c.classList.toggle("show", mis.mode === "demo");
      step();
    }
    function stop() {
      if (mis) {
        clearTimeout(mis.idle);
      }
      mis = null;
      glow(false);
      scr
        .querySelectorAll(".ws-glowdrop")
        .forEach((x) => x.classList.remove("ws-glowdrop"));
      const c = scr.querySelector(".ws-cursor");
      if (c) c.classList.remove("show");
    }
    // type the text of the current "type" step for the child (the word button under the screen)
    async function typeFor() {
      if (!mis) return;
      const s = mis.steps[mis.i];
      if (!s || s.act !== "type") return;
      const el = find(s.t);
      if (!el) return;
      el.focus({ preventScroll: true });
      const m = mis;
      m.busy = true;
      for (let i = 1; i <= s.text.length; i++) {
        el.value = s.text.slice(0, i);
        if (i < s.text.length) {
          if (s.t === "rename-input") {
            if (st.rename) st.rename.v = el.value;
          } else {
            const keepBusy = m.busy;
            onTypeQuiet(el);
          }
        }
        await wait(110);
        if (mis !== m) return;
      }
      m.busy = false;
      onType(el);
    }
    function onTypeQuiet(inp) {
      const t = inp.dataset.t;
      const v = inp.value;
      if (t === "help-input") {
        const hw = st.wins.find((x) => x.type === "help");
        if (hw) hw.q = v;
        return;
      }
      if (t === "start-search") {
        if (st.start) st.start.q = v;
      } else if (t === "search-input") {
        st.search = { q: v };
      } else if (t === "exp-search") {
        const w = topExp();
        if (w) {
          if (v && !w.q) {
            w.back.push({ dir: w.dir, q: "" });
          }
          w.q = v;
          w.sel = null;
        }
      }
      render();
    }
    // the key button under the screen (for tablets without F2)
    function pressKey(key) {
      keyFrom(key);
    }

    setup(opts.start);
    return {
      setup,
      run,
      stop,
      find,
      render,
      typeFor,
      pressKey,
      showHelp: () => {
        if (mis) {
          mis.glowing = true;
          glow(true);
        }
      },
      destroy() {
        stop();
        clearTimers();
        document.removeEventListener("keydown", onDocKey);
        if (ro) ro.disconnect();
        box.innerHTML = "";
      },
      get state() {
        return st;
      },
      get mission() {
        return mis;
      },
      byPath,
    };
  }

  window.WinSim = { create, icon, ICONS };
})();
