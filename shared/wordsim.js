// Mini Word: a pretend Microsoft Word for the Computer lessons (Grade 3 and Grade 4, chapter 2), made the same way as
// Mini Windows (grade-4/computer/chapter-1/winsim.js) so the lesson engine (shared/computer-lesson.js) can use it.
// WordSim.create(box, {start}) draws it inside box. Everything the child can press has data-t="<target>":
//   tabs "tab:Home" "tab:Insert" "tab:Review" "tab:View" "tab:File", Font group "font-name" → "font:Arial",
//   "font-size" → "size:14", "fmt:bold" "fmt:italic" "fmt:underline", "fmt:hl" / "hl-arrow" → "hl:yellow" "hl:none" "hl:stop",
//   "fmt:color" / "color-arrow" → "color:red", Paragraph "para:bullets" / "bullets-arrow" → "bullet:0", "para:numbering",
//   "align:left|center|right|justify", "edit:find" → "nav-search" (input), Insert "ins:symbol" → "sym:0",
//   Review "rev:spelling" → "sug:around" "ed:ignore1" "ed:ignoreall", Quick Access "qat-save" "qat-undo" "qat-redo",
//   File "file:save" "file:saveas" "file:print" "file-back", Save As "saveas:browse" → "dlg:nav:Documents" "dlg:filename" (input) "dlg:save",
//   Print "print:go", zoom "zoom-range" (slider) "zoom:in" "zoom:out", the words of the document "w:<paragraph>:<word>".
// Steps: {act: "click"|"dbl"|"select"|"type"|"key"|"slide"|"look", t, say}
//   select: {act: "select", t: "w:0:0", to: "w:0:2"} or t: "all" / "para:1"; type: {act: "type", t: "doc"|"nav-search"|"dlg:filename", text}
//   key: {act: "key", t: "key:Ctrl+B", key: "Ctrl+B"} (also "Enter", "Shift+Enter", "F7"); slide: {act: "slide", t: "zoom-range", min: 150}
// Grade 4 (Unit 2): Paragraph "para:indent-dec" "para:indent-inc" "para:spacing" → "ls:1.5" "sp:before" "sp:after",
//   "para:shade" / "shade-arrow" → "shade:0" "shade:none", "para:borders" / "borders-arrow" → "border:outside" (bottom top left right
//   none all inside ih), "para:marks" (Show/Hide ¶), "pstart:<p>" (the start of a paragraph, for Tab), the Font window "font-dlg" →
//   "fd:tab:Advanced" "fd:spacing" → "fdsp:Expanded" "fd:by" (input) "fd:ok", Replace "edit:replace" → "rp:find" "rp:with" (inputs)
//   "rp:replace" "rp:all" "rp:next" "rp:ok" "rp:cancel", Insert "ins:pictures" → "pics:device" → "ip:elephant" "ip:insert",
//   "ins:shapes" → "shp:explosion" → "page", "ins:smartart" → "sacat:Pyramid" "sal:basic-pyramid" "sad:ok", the pictures and
//   diagrams "obj:<p>", SmartArt "sabox:<i>" "sa-pane" "sat:<i>" (inputs) "sad:colors" → "sacol:1" "sas:2", Shape Format "shs:1",
//   Picture Format "pf:removebg" "pf:color" → "pcol:gray" "pf:artistic" → "part:pencil" "pstyle:0" "pf:border" → "pbd:red"
//   "pf:effects" → "peff:shadow" "pf:position" → "ppos:tr" "pf:wrap" → "pwrap:square" "pf:crop" "crop-h", Editor "edc:grammar"
//   "ed:read" "ed:stop", View "view:read" "view:print" "view:web" "view:ruler", Read Mode "rm:view" → "rm:edit",
//   Print "pr:copies" "pr:pages" (inputs) "pr:up" "pr:down" "pr:printer" → "prn:1" "pr:what" → "prw:cur" "pr:orient" → "pro:landscape"
//   "pr:prev" "pr:next" "pr:zin" "pr:zout". Keys also "Tab", "Delete", "Ctrl+H", "Ctrl+P".
// A start: {doc: "robots" | "robotsList" | "robotsMiss" | "oneParagraph" | "global" | "volcano" | "olympic" (Grade 3) |
//   "animals" | "animalsPic" | "dolphin" | "tiny" | "parrot" | "sports" | "school" | "schoolPyr" | "water" | "waterCycle" |
//   "facts" | "grammar" | "marco" | "marcoFixed" | "report" (Grade 4),
//   sel: "all" | "para:0" | [p0, w0, p1, w1], caret: [p, w], tab: "Insert", fmt: [{r: [p0, w0, p1, w1], b: true, …}],
//   file: "saveas" | "print", nav: true, editor: true, saved: "Robots around us", zoom: 100,
//   obj: <p> (a selected picture or diagram), marks: true, ruler: true, view: "read" | "web", replace: true, para: [{p, indent, …}]}
(function () {
  "use strict";
  const SW = 960,
    SH = 540;
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const FONTS = [
    "Aptos",
    "Arial",
    "Calibri",
    "Comic Sans MS",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
  ];
  const FONTCSS = {
    Aptos: "Aptos, 'Segoe UI', system-ui, sans-serif",
    Arial: "Arial, Helvetica, sans-serif",
    Calibri: "Calibri, Carlito, 'Segoe UI', sans-serif",
    "Comic Sans MS": "'Comic Sans MS', 'Comic Neue', 'Chalkboard SE', cursive",
    "Courier New": "'Courier New', Courier, monospace",
    Georgia: "Georgia, serif",
    "Times New Roman": "'Times New Roman', Times, serif",
    Verdana: "Verdana, Geneva, sans-serif",
  };
  const SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36];
  const HL = [
    ["yellow", "#ffff00"],
    ["bright green", "#00ff00"],
    ["turquoise", "#00ffff"],
    ["pink", "#ff00ff"],
    ["blue", "#3b7bff"],
    ["red", "#ff3b3b"],
    ["dark blue", "#1f3a93"],
    ["teal", "#008080"],
    ["green", "#00a000"],
    ["violet", "#8a2be2"],
    ["dark red", "#a00000"],
    ["dark yellow", "#a0a000"],
    ["gray", "#9a9a9a"],
    ["light gray", "#d0d0d0"],
    ["black", "#000000"],
  ];
  const COLORS = [
    ["dark red", "#c00000"],
    ["red", "#ff0000"],
    ["orange", "#ffc000"],
    ["yellow", "#ffff00"],
    ["light green", "#92d050"],
    ["green", "#00b050"],
    ["light blue", "#00b0f0"],
    ["blue", "#0070c0"],
    ["dark blue", "#002060"],
    ["purple", "#7030a0"],
    ["white", "#ffffff"],
  ];
  const hlHex = (n) => (HL.find((x) => x[0] === n) || [0, n])[1];
  const colHex = (n) => (COLORS.find((x) => x[0] === n) || [0, n])[1];
  const SYMBOLS = [
    "☺",
    "★",
    "♥",
    "✓",
    "©",
    "™",
    "€",
    "£",
    "±",
    "≠",
    "÷",
    "×",
    "∞",
    "α",
    "π",
    "Ω",
    "☼",
    "♪",
  ];
  const BULLETS = ["•", "○", "■", "❖", "➢", "✓"];
  const SPACINGS = ["1.0", "1.15", "1.5", "2.0", "2.5", "3.0"];
  // Shading: the book's example is the first one
  const SHADES = [
    ["Dark Blue, Text 2, Lighter 90%", "#dde6f5"],
    ["Blue, Accent 1, Lighter 80%", "#c9e2f7"],
    ["Orange, Accent 2, Lighter 80%", "#fbdccb"],
    ["Green, Accent 6, Lighter 80%", "#d5ecc9"],
    ["Gold, Accent 4, Lighter 80%", "#fff0c2"],
    ["Gray, Lighter 80%", "#e6e6e6"],
    ["Blue", "#4a86c8"],
    ["Dark Blue", "#1f3a68"],
    ["Yellow", "#ffff00"],
    ["Light Green", "#92d050"],
  ];
  const BORDERS = [
    ["bottom", "Bottom Border"],
    ["top", "Top Border"],
    ["left", "Left Border"],
    ["right", "Right Border"],
    null,
    ["none", "No Border"],
    ["all", "All Borders"],
    ["outside", "Outside Borders"],
    ["inside", "Inside Borders"],
    null,
    ["ih", "Inside Horizontal Border"],
    ["iv", "Inside Vertical Border", true],
    ["dd", "Diagonal Down Border", true],
    null,
    ["hline", "Horizontal Line", true],
  ];
  const PCOLORS = [
    ["none", "No Recolor", ""],
    ["gray", "Grayscale", "grayscale(1)"],
    ["sepia", "Sepia", "sepia(1)"],
    ["wash", "Washout", "brightness(1.35) contrast(0.55)"],
    ["blue", "Blue", "grayscale(1) sepia(1) hue-rotate(170deg) saturate(3)"],
    ["green", "Green", "grayscale(1) sepia(1) hue-rotate(60deg) saturate(2.5)"],
  ];
  const ARTISTIC = [
    ["none", "None", ""],
    ["pencil", "Pencil Sketch", "grayscale(1) contrast(2.2) brightness(1.25)"],
    ["blur", "Blur", "blur(2.5px)"],
    ["paint", "Paint Strokes", "saturate(2.6) contrast(1.4)"],
    ["glow", "Glowing Edges", "invert(1) hue-rotate(180deg) contrast(1.6)"],
  ];
  const PSTYLES = [
    "Simple Frame, White",
    "Soft Edge Rectangle",
    "Drop Shadow Rectangle",
    "Rounded Diagonal Corner",
    "Reflected Rounded Rectangle",
    "Metal Oval",
  ];
  const PEFFECTS = [
    ["none", "No Effect"],
    ["shadow", "Shadow"],
    ["reflection", "Reflection"],
    ["glow", "Glow"],
    ["soft", "Soft Edges"],
    ["3d", "3-D Rotation"],
  ];
  // Position (Arrange group): in line, or a place on the page with the text around the picture
  const PPOS = [
    ["tl", "Top Left"],
    ["tc", "Top Center"],
    ["tr", "Top Right"],
    ["ml", "Middle Left"],
    ["mc", "Middle Center"],
    ["mr", "Middle Right"],
    ["bl", "Bottom Left"],
    ["bc", "Bottom Center"],
    ["br", "Bottom Right"],
  ];
  const PWRAP = [
    ["inline", "In Line with Text"],
    ["square", "Square"],
    ["tight", "Tight"],
    ["tb", "Top and Bottom"],
    ["behind", "Behind Text"],
    ["front", "In Front of Text"],
  ];
  const SACOLORS = [
    ["Colored Fill - Accent 1", ["#156082"]],
    [
      "Colorful - Accent Colors",
      ["#156082", "#e97132", "#196b24", "#0f9ed5", "#a02b93"],
    ],
    [
      "Colorful Range - Accent Colors 2 to 3",
      ["#e97132", "#c25a1f", "#196b24", "#2f8a3a", "#0f9ed5"],
    ],
    ["Colored Fill - Accent 2", ["#e97132"]],
    ["Colored Fill - Accent 6", ["#4ea72e"]],
  ];
  const SASTYLES = [
    "Simple Fill",
    "White Outline",
    "Subtle Effect",
    "Moderate Effect",
    "Intense Effect",
  ];
  // the SmartArt window: a category, then a layout (only some of them can be inserted)
  const SALAYOUTS = {
    List: [
      ["blist", "Basic Block List"],
      ["vlist", "Vertical Bullet List"],
    ],
    Process: [
      ["bprocess", "Basic Process"],
      ["chevron", "Basic Chevron Process"],
    ],
    Cycle: [
      ["basic-cycle", "Basic Cycle", 1],
      ["text-cycle", "Text Cycle", 1],
      ["cont-cycle", "Continuous Cycle"],
    ],
    Hierarchy: [
      ["org", "Organization Chart"],
      ["hier", "Hierarchy"],
    ],
    Relationship: [
      ["venn", "Basic Venn"],
      ["balance", "Balance"],
    ],
    Matrix: [["matrix", "Basic Matrix"]],
    Pyramid: [
      ["basic-pyramid", "Basic Pyramid", 1],
      ["inv-pyramid", "Inverted Pyramid"],
      ["pyr-list", "Pyramid List"],
    ],
    Picture: [["pic-acc", "Accented Picture"]],
  };
  const SADESC = {
    "basic-pyramid":
      "Use to show proportional, interconnected, or hierarchical relationships with the largest part on the bottom.",
    "text-cycle":
      "Use to represent a continuing sequence of stages, tasks, or events in a circular flow. Emphasizes the arrows or flow rather than the stages or steps.",
    "basic-cycle":
      "Use to represent a continuing sequence of stages, tasks, or events in a circular flow. Emphasizes the stages or steps.",
  };
  const SHAPES = [
    ["Rectangles", [["rect", "Rectangle"]]],
    [
      "Basic Shapes",
      [
        ["oval", "Oval"],
        ["tri", "Triangle"],
      ],
    ],
    ["Block Arrows", [["arrow", "Arrow: Right"]]],
    [
      "Stars and Banners",
      [
        ["explosion", "Explosion: 8 Points"],
        ["star5", "Star: 5 Points"],
        ["ribbon", "Ribbon"],
      ],
    ],
  ];
  const SHSTYLES = [
    ["#156082", "#0e4a63"],
    ["#e97132", "#a9501f"],
    ["#196b24", "#10481a"],
    ["#0f9ed5", "#0b6f96"],
    ["#a02b93", "#6e1d65"],
    ["#ffc000", "#b58800"],
    ["#ffffff", "#156082"],
  ];
  const PRINTERS = [
    ["HP LaserJet", "Ready · on this computer (local printer)"],
    ["Office printer", "Ready · shared on the network (network printer)"],
    ["Microsoft Print to PDF", "Ready · saves a PDF file"],
  ];
  const PRWHAT = [
    ["all", "Print All Pages", "The whole thing"],
    ["sel", "Print Selection", "Just what you selected"],
    ["cur", "Print Current Page", "Just this page"],
    ["custom", "Custom Print", "Type specific pages, sections or ranges"],
  ];
  // the pretend pictures of "This Device": drawings, so Remove Background, Color and Crop can change them
  const DRAW = {
    elephant: {
      name: "Elephant.jpg",
      bg: '<rect width="200" height="140" fill="#cfe6f3"/><rect y="98" width="200" height="42" fill="#c9b07e"/><circle cx="34" cy="44" r="22" fill="#6f9d4a"/><circle cx="54" cy="54" r="16" fill="#83b25a"/><rect x="36" y="58" width="7" height="42" fill="#7a5532"/><circle cx="178" cy="22" r="10" fill="#ffd34d"/>',
      fg: '<ellipse cx="104" cy="80" rx="46" ry="28" fill="#8e8a86"/><rect x="70" y="94" width="13" height="30" rx="4" fill="#837f7b"/><rect x="88" y="98" width="13" height="27" rx="4" fill="#7a7672"/><rect x="114" y="98" width="13" height="27" rx="4" fill="#837f7b"/><rect x="130" y="94" width="13" height="30" rx="4" fill="#7a7672"/><circle cx="148" cy="66" r="20" fill="#8e8a86"/><ellipse cx="138" cy="66" rx="13" ry="18" fill="#7d7975"/><path d="M162 72q10 18 2 40" fill="none" stroke="#8e8a86" stroke-width="8" stroke-linecap="round"/><path d="M158 82q6 6 12 4" fill="none" stroke="#fffbe8" stroke-width="3" stroke-linecap="round"/><circle cx="154" cy="60" r="2.2" fill="#222"/><path d="M58 76q-8 6-6 16" fill="none" stroke="#8e8a86" stroke-width="3"/>',
    },
    parrot: {
      name: "Parrot.jpg",
      bg: '<rect width="200" height="140" fill="#a9c99a"/><ellipse cx="30" cy="30" rx="34" ry="20" fill="#6e9a5d"/><ellipse cx="170" cy="40" rx="40" ry="24" fill="#5e8a50"/><ellipse cx="160" cy="110" rx="38" ry="22" fill="#7aa86a"/><ellipse cx="34" cy="104" rx="30" ry="20" fill="#86b175"/><rect x="82" y="108" width="36" height="32" fill="#a99a86"/>',
      fg: '<path d="M100 98l-6 40" stroke="#1f6b35" stroke-width="7" stroke-linecap="round"/><ellipse cx="100" cy="72" rx="17" ry="27" fill="#d9262b"/><path d="M92 58q-14 22 4 44l12-6q-6-20-16-38z" fill="#2c9a4a"/><circle cx="100" cy="42" r="13" fill="#d9262b"/><path d="M108 40q9 2 7 10-4-2-8-4z" fill="#f3a32c"/><circle cx="104" cy="38" r="2" fill="#222"/><path d="M94 100l-2 8M104 100l2 8" stroke="#555" stroke-width="2.5"/>',
    },
    dolphin: {
      name: "Dolphin.jpg",
      bg: '<rect width="200" height="140" fill="#3d8fd1"/><rect y="0" width="200" height="40" fill="#9fd3f5"/><path d="M0 44q25-8 50 0t50 0 50 0 50 0V60H0z" fill="#5aa6e0"/><path d="M0 100q25-6 50 0t50 0 50 0 50 0" fill="none" stroke="#79b9e8" stroke-width="3"/>',
      fg: '<path d="M30 92q40-50 110-30 18 6 32 2-6 10-22 12 8 10 2 22-10-12-26-14-40 18-96 8z" fill="#7b8fa3"/><path d="M96 58l10-16 6 20z" fill="#6d8195"/><path d="M60 88q20 10 46 6" fill="none" stroke="#dfe6ee" stroke-width="5" stroke-linecap="round"/><circle cx="150" cy="70" r="2.4" fill="#222"/>',
    },
    pingpong: {
      name: "Ping-pong.jpg",
      bg: '<rect width="200" height="140" fill="#f2e2c4"/><rect y="112" width="200" height="28" fill="#c79a62"/>',
      fg: '<path d="M30 96h140l-16-34H46z" fill="#1d7f4f"/><path d="M100 62v34" stroke="#fff" stroke-width="2"/><path d="M42 72h116" stroke="#e8e8e8" stroke-width="3"/><rect x="38" y="96" width="5" height="24" fill="#555"/><rect x="157" y="96" width="5" height="24" fill="#555"/><circle cx="48" cy="40" r="13" fill="#d22d2d"/><rect x="45" y="51" width="6" height="16" rx="2" fill="#8a5a2b"/><circle cx="156" cy="40" r="13" fill="#d22d2d"/><rect x="153" y="51" width="6" height="16" rx="2" fill="#8a5a2b"/><circle cx="110" cy="38" r="4" fill="#fff" stroke="#bbb"/>',
    },
  };
  const picSVG = (k, small, vb = "0 0 200 140", nobg) => {
    const D = DRAW[k] || DRAW.elephant;
    return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice"${small ? ' class="sm"' : ""} aria-hidden="true">${nobg ? "" : D.bg}${D.fg}</svg>`;
  };
  // a star with n points between radius r1 and r2
  const star = (n, r1, r2, cx, cy) =>
    "M" +
    Array.from({ length: n * 2 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / n;
      const r = i % 2 ? r2 : r1;
      return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join("L") +
    "Z";
  const SHAPE_D = {
    rect: "M8 14H152V106H8Z",
    oval: "M80 12A72 48 0 1 1 79.9 12Z",
    tri: "M80 8L152 112H8Z",
    arrow: "M8 40H96V12L152 60 96 108V80H8Z",
    explosion:
      "M80 4L94 34 128 12 118 46 156 50 126 70 148 102 110 92 104 120 84 98 60 120 58 90 20 104 40 74 4 58 38 46 24 14 62 32Z",
    star5: star(5, 58, 24, 80, 64),
    ribbon:
      "M4 40H28V24H132V40H156L144 60 156 80H132V96H28V80H4L16 60ZM28 40V80M132 40V80",
  };
  const shapeSVG = (k, fill, line) =>
    `<svg viewBox="0 0 160 124" aria-hidden="true"><path d="${SHAPE_D[k] || SHAPE_D.rect}" fill="${fill}" stroke="${line}" stroke-width="4" stroke-linejoin="round"/></svg>`;
  // the Position list: where the picture goes on a little page
  const posIcon = (k) => {
    const lines = [0, 1, 2, 3, 4, 5]
      .map(
        (i) =>
          `<path d="M3 ${4 + i * 3.2}H21" stroke="#9a9a9a" stroke-width="1.2"/>`,
      )
      .join("");
    if (k === "inline")
      return `<svg viewBox="0 0 24 24">${lines}<rect x="3" y="9" width="7" height="6" fill="#0f9ed5"/></svg>`;
    const x = { l: 3, c: 8.5, r: 14 }[k[1]],
      y = { t: 3, m: 9, b: 15 }[k[0]];
    return `<svg viewBox="0 0 24 24"><rect x=".5" y=".5" width="23" height="23" fill="#fff" stroke="#bbb"/>${lines}<rect x="${x}" y="${y}" width="7" height="6" fill="#0f9ed5"/></svg>`;
  };
  const wrapIcon = (k) => {
    const L = (y, a, b) =>
      `<path d="M${a} ${y}H${b}" stroke="#777" stroke-width="1.3"/>`;
    const rows = {
      inline: L(5, 2, 18) + L(15, 2, 18),
      square: L(3, 2, 18) + L(7, 13, 18) + L(11, 13, 18) + L(15, 2, 18),
      tight: L(3, 2, 18) + L(7, 12, 18) + L(11, 12, 18) + L(15, 2, 18),
      tb: L(2, 2, 18) + L(17, 2, 18),
      behind: L(3, 2, 18) + L(7, 2, 18) + L(11, 2, 18) + L(15, 2, 18),
      front: L(3, 2, 18) + L(7, 2, 18) + L(11, 2, 18) + L(15, 2, 18),
    }[k];
    const pic =
      k === "tight"
        ? '<circle cx="7" cy="9" r="3.6" fill="#0f9ed5"/>'
        : `<rect x="${k === "inline" ? 4 : 3}" y="${k === "inline" ? 7.5 : 5.5}" width="7" height="${k === "inline" ? 5 : 7}" fill="#0f9ed5"${k === "behind" ? ' opacity=".45"' : ""}/>`;
    return `<span class="wd-i"><svg viewBox="0 0 20 20">${k === "front" ? rows + pic : pic + rows}</svg></span>`;
  };
  // a small drawing of a SmartArt layout (the SmartArt window, the Layouts group)
  function saThumb(k) {
    const c = "#4a86c8";
    const box = (x, y, w, h) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
    const d = {
      "basic-pyramid": `<path d="M30 4L46 18H14Z" fill="${c}"/><path d="M13 20H47L54 32H6Z" fill="${c}"/><path d="M5 34H55L60 42H0Z" fill="${c}" opacity=".85"/>`,
      "inv-pyramid": `<path d="M2 4H58L50 16H10Z" fill="${c}"/><path d="M11 18H49L41 30H19Z" fill="${c}"/><path d="M20 32H40L30 42Z" fill="${c}"/>`,
      "pyr-list": `<path d="M18 4L34 40H2Z" fill="${c}"/>${box(30, 8, 26, 8)}${box(30, 20, 26, 8)}${box(30, 32, 26, 8)}`,
      "text-cycle": `<circle cx="30" cy="23" r="15" fill="none" stroke="${c}" stroke-width="4" stroke-dasharray="14 5"/>`,
      "basic-cycle": [0, 1, 2, 3, 4]
        .map((i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          return `<circle cx="${(30 + 16 * Math.cos(a)).toFixed(1)}" cy="${(23 + 16 * Math.sin(a)).toFixed(1)}" r="5" fill="${c}"/>`;
        })
        .join(""),
      "cont-cycle": `<circle cx="30" cy="23" r="16" fill="none" stroke="${c}" stroke-width="5"/>`,
      blist: [0, 1, 2, 3, 4, 5]
        .map((i) => box(4 + (i % 3) * 18, 8 + Math.floor(i / 3) * 16, 15, 12))
        .join(""),
      vlist: [0, 1, 2].map((i) => box(6, 5 + i * 13, 48, 10)).join(""),
      bprocess: `${box(2, 16, 14, 12)}<path d="M18 22h4" stroke="${c}" stroke-width="2"/>${box(23, 16, 14, 12)}<path d="M39 22h4" stroke="${c}" stroke-width="2"/>${box(44, 16, 14, 12)}`,
      chevron: [0, 1, 2]
        .map(
          (i) =>
            `<path d="M${2 + i * 19} 14h12l6 8-6 8H${2 + i * 19}l6-8z" fill="${c}"/>`,
        )
        .join(""),
      org: `${box(22, 4, 16, 10)}${box(4, 30, 14, 10)}${box(23, 30, 14, 10)}${box(42, 30, 14, 10)}<path d="M30 14v8M11 30v-8h38v8M30 22v8" fill="none" stroke="${c}" stroke-width="1.5"/>`,
      hier: `${box(22, 4, 16, 9)}${box(10, 18, 14, 9)}${box(36, 18, 14, 9)}${box(4, 32, 12, 9)}${box(18, 32, 12, 9)}${box(44, 32, 12, 9)}`,
      venn: `<circle cx="22" cy="18" r="11" fill="${c}" opacity=".6"/><circle cx="38" cy="18" r="11" fill="${c}" opacity=".6"/><circle cx="30" cy="30" r="11" fill="${c}" opacity=".6"/>`,
      balance: `<path d="M8 26L52 18" stroke="${c}" stroke-width="3"/><path d="M30 22L24 40H36Z" fill="${c}"/>`,
      matrix: `${box(10, 4, 19, 17)}${box(31, 4, 19, 17)}${box(10, 23, 19, 17)}${box(31, 23, 19, 17)}`,
      "pic-acc": `<rect x="8" y="4" width="44" height="30" fill="#cfe6f3" stroke="${c}"/><path d="M10 32l12-14 10 10 6-6 12 10z" fill="#83b25a"/>${box(8, 36, 44, 6)}`,
    }[k];
    return `<svg viewBox="0 0 60 44" class="sat" aria-hidden="true">${d || ""}</svg>`;
  }
  // a keyboard shortcut does the same as a button
  const KEYS = {
    "Ctrl+B": "fmt:bold",
    "Ctrl+I": "fmt:italic",
    "Ctrl+U": "fmt:underline",
    "Ctrl+Z": "qat-undo",
    "Ctrl+Y": "qat-redo",
    "Ctrl+F": "edit:find",
    "Ctrl+S": "qat-save",
    "Ctrl+L": "align:left",
    "Ctrl+E": "align:center",
    "Ctrl+R": "align:right",
    "Ctrl+J": "align:justify",
    "Ctrl+H": "edit:replace",
    "Ctrl+P": "file:print",
    F7: "rev:spelling",
  };
  const KEYOF = Object.fromEntries(
    Object.entries(KEYS).map(([k, v]) => [v, k]),
  );

  /* ---------- the documents the lessons start with (the book's texts) ---------- */
  const T_ROBOTS = [
    "Robots!",
    "Robots are all around us, helping with tasks to make our lives easier. We see them in many places in our city.",
    "There are robots that open doors, help doctors in hospitals, and work in factories. Some robots can even deliver packages.",
    "When I go to the mall, I often see robots, like:",
  ];
  const T_LIST = [
    { t: "Automatic doors that open when I walk toward them.", list: "bullet" },
    { t: "ATMs that let people take out money quickly.", list: "bullet" },
    { t: "Vending machines that provide snacks and drinks.", list: "bullet" },
    "These robots make everyday tasks faster and simpler, and we often use them without thinking about it.",
  ];
  const T_AMAZING = [
    { t: "Amazing animals", h: 1 },
    "You might think that what makes us different from animals is our ability to think and to build friendships with others, but in fact, animals are capable of more extraordinary things than you might imagine. Find out why...",
    { t: "True friendship", h: 2 },
    "In many cultures, elephants are seen as a symbol of wisdom and are known for having an excellent memory. They have the largest brains of all land animals, and their intelligence is evident in their ability to learn, use tools, and even in their sense of humor. They are very social animals, and although they live in herds, they spend their lives in pairs devoted to a best friend. These friendships between elephants are well-known, but in an elephant sanctuary, an unusual friendship blossomed.",
    "Kiko, an Asian elephant, chose Bella, a giraffe, as her best friend. The odd pair loved spending all their time together, eating, sleeping, and playing. Then one day, Bella had an accident. For the entire three weeks it took her to recover, Kiko waited outside the sanctuary office. She was free to wander the 2200 acres, but she was loyal to her friend and chose to wait for her to get better. It just shows us how animals don't consider differences when they choose their friends.",
  ];
  const T_DOLPHIN = [
    { t: "Dolphin to the rescue!", h: 2 },
    "Dolphins are well known for their intelligence and their ability to understand human language.",
    "However, many people do not realize how well they communicate with other animals sharing the oceans. In 2008, two whales, a mother and her calf, got stuck in shallow waters off the coast of New Zealand. A group of people gathered at once, wanting to help. They spent hours trying to direct the whales back into deep waters. Both the rescuers and whales were exhausted, and after some time, the authorities were at a loss. They didn't know what to do next, and in the end, they decided to give up. They were considering putting the animals down when a dolphin turned up. Somehow, it calmed the whales down and communicated with them. Within a few minutes, the whales followed the dolphin back to the freedom of safe waters. The dolphin had saved their lives and had accomplished something that humans had not been able to. It reminds us that even though we might not understand what animals say, other animals probably do!",
  ];
  const T_TINY = [
    "Tiny and Leo",
    "There once was a little mouse named Tiny. One day, Tiny was looking for food when he saw a mango. He tried to carry the mango, but it was too heavy.",
    'A hungry snake saw the mouse and said, "I can help you. I can carry the mango in my mouth."',
    "Tiny knew that the snake wanted to eat him. He was very scared.",
    "Leo the Lion heard the snake talking to the mouse.",
    '"I am going to save that little mouse," thought the lion.',
    'Leo went behind the snake and said, "Don\'t touch the little mouse."',
    "Tiny hid behind the mango. He was scared of the lion. Leo picked up the mango, and Tiny, and carried them to a safe spot in the forest. Leo and Tiny shared the mango and became good friends.",
  ];
  const T_SPORTS = [
    {
      t: "Which is the most popular sport in your country?",
      h: 1,
      align: "center",
    },
    "a) Ping-Pong",
    "b) Ice hockey",
    "c) Cricket",
    "Hello! My name is Nukia Lee, and I am from China. Ping-pong is one of the most popular sports in my country. You play the game on a table with a net. Two or four players hit a ball back and forth with paddles.",
    "Hi! My name is Natasha, and I am from Russia. Ice hockey is the most popular sport in my country. You play this sport in a hockey rink. There are six players on each team.",
    "Hello! My name is Nick, and I am from Australia. Cricket is the most popular sport in my country. In a cricket match, there are two teams. Each team has eleven players.",
  ];
  const T_SCHOOL = [
    { t: "Our school", h: 1 },
    "This is how our school is organized.",
  ];
  const T_WATER = [
    { t: "The water cycle", h: 1 },
    "Water moves around the Earth again and again.",
  ];
  const T_MARCO = [
    "Dear Marco,",
    "How are things? I hop you are well. I went on a feild trip last Friday and I had a fantastic time. We went by bus to the city and visited the Science Museum. We arived there at about 10:30. It took us two hours to get there because of the traffic, but we didn't mind. We had fun on the bus, too. We spent all day at the museum and we saw old and new inventions and fossils of dinosurs. We even experienced a great 3D movie. My favorite place, though, was the experiment room. We could do our own experiments! It was so cool! I think it was the best field trip ever!",
    "See you soon,",
    "Alex",
  ];
  const DOCS = {
    robots: { paras: T_ROBOTS },
    robotsList: { paras: [...T_ROBOTS, ...T_LIST] },
    robotsMiss: {
      paras: [
        T_ROBOTS[0],
        T_ROBOTS[1].replace("around", "arround"),
        ...T_ROBOTS.slice(2),
        ...T_LIST,
      ],
      miss: { arround: ["around", "about", "nearby", "near"] },
    },
    oneParagraph: {
      paras: [
        "Robots are all around us, helping with tasks to make our lives easier. We see them in many places in our city. There are robots that open doors, help doctors in hospitals, and work in factories. Some robots can even deliver packages.",
      ],
    },
    global: {
      paras: [
        "Every year, our planet is becoming hotter and hotter. This is called global warming, and it's changing the Earth. It is caused by humans doing things like cutting down trees and burning fossil fuels.",
      ],
    },
    volcano: {
      paras: [
        "A volcano is a mountain with a hole at the top, where hot materials from deep inside the Earth can emerge. Enormous volcanoes can change the Earth's climate. Here are three things that can come out of a volcano:",
      ],
    },
    olympic: {
      paras: [
        "The Olympic Games are the bigest international sporting event in the world, in which thousands of athletes take part. The ancient Olympic Games were held in Olympia, Greece. Today, the modern Olympics bring together nations from arond the world to celebrate sport and unity.",
      ],
      miss: {
        bigest: ["biggest", "bigots", "begets"],
        arond: ["around", "aroid", "Aron"],
      },
    },
    blank: { paras: [""] },
    // Grade 4, Unit 2 «Working with text»
    animals: { paras: T_AMAZING },
    animalsPic: {
      paras: [
        ...T_AMAZING.slice(0, 4),
        { o: { type: "pic", k: "elephant" } },
        T_AMAZING[4],
      ],
    },
    dolphin: { paras: T_DOLPHIN },
    tiny: { paras: T_TINY },
    parrot: {
      paras: [
        { t: "My favorite bird", h: 1 },
        { o: { type: "pic", k: "parrot" } },
        "This parrot is red and green. It lives in the forest.",
      ],
    },
    sports: { paras: T_SPORTS },
    school: { paras: T_SCHOOL },
    schoolPyr: {
      paras: [
        ...T_SCHOOL,
        {
          o: {
            type: "sa",
            k: "basic-pyramid",
            items: ["Principal", "Teachers", "Students"],
          },
        },
      ],
    },
    water: { paras: T_WATER },
    waterCycle: {
      paras: [
        ...T_WATER,
        {
          o: {
            type: "sa",
            k: "text-cycle",
            items: [
              "Evaporation",
              "Condensation",
              "Precipitation",
              "Collection",
            ],
          },
        },
      ],
    },
    facts: {
      paras: [
        { t: "Fun facts", h: 1 },
        "Elephants have the largest brains of all land animals.",
      ],
    },
    grammar: {
      paras: [
        { t: "My little brother", h: 2 },
        "He don't like to eat vegetables. He likes apples and bananas.",
      ],
      gram: {
        "don't": { s: ["doesn't", "didn't"], why: "Subject-Verb Agreement" },
      },
    },
    marco: {
      paras: T_MARCO,
      miss: {
        feild: ["field", "fields"],
        arived: ["arrived", "derived"],
        dinosurs: ["dinosaurs", "dinosaur"],
      },
      gram: { hop: { s: ["hope", "hopped"], why: "Word choice" } },
    },
    marcoFixed: {
      paras: T_MARCO.map((p) =>
        p
          .replace("hop ", "hope ")
          .replace("feild", "field")
          .replace("arived", "arrived")
          .replace("dinosurs", "dinosaurs"),
      ),
    },
    report: {
      paras: [
        ...T_AMAZING.slice(0, 4),
        { o: { type: "pic", k: "elephant", wrap: "square", h: "l" } },
        T_AMAZING[4],
        ...T_DOLPHIN,
      ],
    },
  };
  const bare = (t) =>
    String(t).replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  // a paragraph: its words, and the Grade 4 settings (indent, spacing, shading, borders) or a picture / diagram (o)
  function makeDoc(key) {
    const d = DOCS[key] || DOCS.robots;
    return {
      name: "Document1",
      miss: d.miss || {},
      gram: d.gram || {},
      paras: d.paras.map((p) => {
        p = typeof p === "string" ? { t: p } : p;
        const para = {
          w: (p.t || "")
            .split(/\s+/)
            .filter(Boolean)
            .map((t) => ({ t })),
          align: p.align || "left",
          list: p.list || null,
          bul: p.bul || "•",
          tight: !!p.tight,
        };
        if (p.h) para.h = p.h;
        if (p.o)
          para.o = {
            wrap: "inline",
            h: "l",
            ...JSON.parse(JSON.stringify(p.o)),
          };
        return para;
      }),
    };
  }

  /* ---------- icons (also used on the lesson pages: WordSim.icon("bold")) ---------- */
  const sv = (d, vb = "0 0 20 20") =>
    `<svg viewBox="${vb}" aria-hidden="true">${d}</svg>`;
  const lines = (xs) =>
    xs
      .map(
        ([x1, x2], i) =>
          `<path d="M${x1} ${4 + i * 4}H${x2}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
      )
      .join("");
  const IC = {
    word: `<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="5" y="2" width="13" height="16" rx="2" fill="#41a5ee"/><rect x="5" y="2" width="13" height="5" rx="1" fill="#2b7cd3"/><rect x="2" y="5" width="10" height="10" rx="1.5" fill="#185abd"/><path d="M4 7.5l1.2 5 1.3-4 1.3 4 1.2-5" fill="none" stroke="#fff" stroke-width="1.1" stroke-linejoin="round"/></svg>`,
    paste: sv(
      '<rect x="4" y="3.5" width="12" height="14" rx="1.5" fill="#f4e3c0" stroke="#7a5b2b"/><rect x="7" y="2" width="6" height="3" rx="1" fill="#9a9a9a"/><rect x="8" y="8" width="8" height="10" rx="1" fill="#fff" stroke="#555"/>',
    ),
    bold: sv(
      '<text x="10" y="15" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="14" fill="currentColor">B</text>',
    ),
    italic: sv(
      '<text x="10" y="15" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="14" fill="currentColor">I</text>',
    ),
    underline: sv(
      '<text x="10" y="13.5" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="currentColor">U</text><path d="M5 17H15" stroke="currentColor" stroke-width="1.5"/>',
    ),
    highlight: (c = "#ffff00") =>
      sv(
        `<path d="M6 12l6-8 3 2.2-6 8z" fill="#fff" stroke="#333" stroke-width="1.1" stroke-linejoin="round"/><path d="M6 12l3 2.2-2.6 1.3z" fill="#555"/><rect x="2" y="16.3" width="16" height="3" fill="${c}" stroke="#999" stroke-width=".4"/>`,
      ),
    fontcolor: (c = "#ff0000") =>
      sv(
        `<text x="10" y="13" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="currentColor">A</text><rect x="2" y="15.8" width="16" height="3.4" fill="${c}"/>`,
      ),
    bullets: sv(
      '<circle cx="3.5" cy="5" r="1.4" fill="currentColor"/><circle cx="3.5" cy="10" r="1.4" fill="currentColor"/><circle cx="3.5" cy="15" r="1.4" fill="currentColor"/><path d="M7 5H18M7 10H18M7 15H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    ),
    numbering: sv(
      '<text x="1.5" y="7" font-size="5.5" font-family="Arial" fill="currentColor">1</text><text x="1.5" y="12" font-size="5.5" font-family="Arial" fill="currentColor">2</text><text x="1.5" y="17" font-size="5.5" font-family="Arial" fill="currentColor">3</text><path d="M7 5H18M7 10H18M7 15H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    ),
    "align-left": sv(
      lines([
        [2, 18],
        [2, 12],
        [2, 18],
        [2, 12],
      ]),
    ),
    "align-center": sv(
      lines([
        [2, 18],
        [5, 15],
        [2, 18],
        [5, 15],
      ]),
    ),
    "align-right": sv(
      lines([
        [2, 18],
        [8, 18],
        [2, 18],
        [8, 18],
      ]),
    ),
    justify: sv(
      lines([
        [2, 18],
        [2, 18],
        [2, 18],
        [2, 18],
      ]),
    ),
    find: sv(
      '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11.8 11.8L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    ),
    replace: sv(
      '<text x="1" y="9" font-size="8" font-family="Arial" fill="#2b7cd3">b</text><text x="9" y="17" font-size="8" font-family="Arial" fill="#c33">c</text><path d="M4 12q0 5 5 5M14 8q0-5-5-5" fill="none" stroke="currentColor" stroke-width="1.2"/>',
    ),
    select: sv(
      '<path d="M5 3l10 7-4.5 1 2.5 5-2 1-2.5-5L5 15z" fill="#fff" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
    ),
    symbol: sv(
      '<text x="10" y="16" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="currentColor">Ω</text>',
    ),
    spelling: sv(
      '<text x="1" y="9" font-size="7.5" font-family="Arial" font-weight="700" fill="currentColor">ABC</text><path d="M4 13l3.5 3.5L16 8" fill="none" stroke="#1c8f4e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
    save: sv(
      '<path d="M3 3h11l3 3v11H3z" fill="#8a4fc8" stroke="#5d2f94" stroke-linejoin="round"/><rect x="6" y="3" width="7" height="5" fill="#fff"/><rect x="5.5" y="11" width="9" height="6" rx="1" fill="#fff"/>',
    ),
    undo: sv(
      '<path d="M6 7h7a4 4 0 010 8H8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M8 3.5L4.5 7 8 10.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
    redo: sv(
      '<path d="M14 7H7a4 4 0 000 8h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M12 3.5L15.5 7 12 10.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
    zoom: sv(
      '<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11.8 11.8L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5.5 8h5M8 5.5v5" stroke="currentColor" stroke-width="1.4"/>',
    ),
    print: sv(
      '<rect x="5" y="2.5" width="10" height="5" fill="#fff" stroke="currentColor"/><rect x="2" y="7" width="16" height="7" rx="1.5" fill="#d9dde3" stroke="currentColor"/><rect x="5" y="11.5" width="10" height="6" fill="#fff" stroke="currentColor"/>',
    ),
    folder: sv(
      '<path d="M2 5.5a1 1 0 011-1h4.5l2 2H17a1 1 0 011 1V15a1 1 0 01-1 1H3a1 1 0 01-1-1z" fill="#f6c343" stroke="#c8961d"/>',
    ),
    docfile: sv(
      '<path d="M5 2h7l4 4v12H5z" fill="#fff" stroke="#7a8796"/><rect x="3" y="8" width="8" height="7" rx="1" fill="#185abd"/><text x="7" y="13.7" text-anchor="middle" font-size="5.5" font-family="Arial" font-weight="700" fill="#fff">W</text>',
    ),
    // Grade 4
    "indent-inc": sv(
      '<path d="M9 4H18M9 8H18M9 12H18M2 16H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M2 5.5l4 2.5-4 2.5z" fill="#2b7cd3"/>',
    ),
    "indent-dec": sv(
      '<path d="M9 4H18M9 8H18M9 12H18M2 16H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 5.5l-4 2.5 4 2.5z" fill="#2b7cd3"/>',
    ),
    linespacing: sv(
      '<path d="M4 3.5v13" stroke="#2b7cd3" stroke-width="1.5"/><path d="M1.5 6L4 3.5 6.5 6M1.5 14L4 16.5 6.5 14" fill="none" stroke="#2b7cd3" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 5H18M9 10H18M9 15H18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    ),
    shading: (c = "#dde6f5") =>
      sv(
        `<path d="M3.5 9.5l5.5-6 6 6-5.5 5.5z" fill="#fff" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M3.5 9.5h11.5" stroke="currentColor" stroke-width="1"/><path d="M16 10.5q1.7 2.4 0 3.4-1.7-1 0-3.4z" fill="currentColor"/><rect x="2" y="16.3" width="16" height="3" fill="${c}" stroke="#888" stroke-width=".5"/>`,
      ),
    borders: (k = "bottom") => {
      const d = {
        bottom: "M3 17H17",
        top: "M3 3H17",
        left: "M3 3V17",
        right: "M17 3V17",
        outside: "M3 3H17V17H3Z",
        all: "M3 3H17V17H3ZM10 3V17M3 10H17",
        inside: "M10 3V17M3 10H17",
        ih: "M3 10H17",
        iv: "M10 3V17",
        dd: "M3 3L17 17",
        hline: "M2 10H18",
        none: "",
      }[k];
      return sv(
        `<path d="M3 3H17V17H3ZM10 3V17M3 10H17" fill="none" stroke="#9a9a9a" stroke-width="1" stroke-dasharray="1 1.6"/>${d ? `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${k === "hline" ? 2.6 : 1.8}"/>` : ""}`,
      );
    },
    marks: sv(
      '<text x="10" y="16" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="currentColor">¶</text>',
    ),
    sort: sv(
      '<text x="1" y="9" font-size="7.5" font-family="Arial" fill="currentColor">A</text><text x="1" y="18" font-size="7.5" font-family="Arial" fill="currentColor">Z</text><path d="M13 3v13M10.5 13.5L13 16.5l2.5-3" fill="none" stroke="#2b7cd3" stroke-width="1.5"/>',
    ),
    launcher: sv(
      '<path d="M4 4h12v12H4z" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 8l6 6M14 9.5V14H9.5" fill="none" stroke="currentColor" stroke-width="1.3"/>',
    ),
    picture: sv(
      '<rect x="2" y="3.5" width="16" height="13" rx="1.5" fill="#fff" stroke="currentColor" stroke-width="1.3"/><path d="M3 15l5-6 4 4 2-2 3 4z" fill="#2b9a5a"/><circle cx="14" cy="7" r="1.7" fill="#f3b72b"/>',
    ),
    shapes: sv(
      '<circle cx="7" cy="8" r="5" fill="#9cc3ec" stroke="#2b7cd3"/><rect x="9" y="9" width="9" height="8" fill="#fbd08a" stroke="#c87a10"/>',
    ),
    smartart: sv(
      '<rect x="7" y="2" width="6" height="5" fill="#2b9a5a"/><rect x="1.5" y="13" width="6" height="5" fill="#2b9a5a"/><rect x="12.5" y="13" width="6" height="5" fill="#2b9a5a"/><path d="M10 7v3M4.5 13v-3h11v3" fill="none" stroke="currentColor" stroke-width="1.2"/>',
    ),
    icons: sv(
      '<circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="7.5" cy="8.5" r="1" fill="currentColor"/><circle cx="12.5" cy="8.5" r="1" fill="currentColor"/><path d="M6.5 12q3.5 3 7 0" fill="none" stroke="currentColor" stroke-width="1.3"/>',
    ),
    removebg: sv(
      '<rect x="2" y="3" width="16" height="14" fill="#e542b4" opacity=".55"/><rect x="2" y="3" width="16" height="14" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M5 17q0-6 5-6t5 6z" fill="#fff" stroke="currentColor"/><circle cx="10" cy="8" r="2.6" fill="#fff" stroke="currentColor"/>',
    ),
    piccolor: sv(
      '<rect x="2" y="2" width="7" height="7" fill="#e97132"/><rect x="11" y="2" width="7" height="7" fill="#0f9ed5"/><rect x="2" y="11" width="7" height="7" fill="#4ea72e"/><rect x="11" y="11" width="7" height="7" fill="#9a9a9a"/>',
    ),
    artistic: sv(
      '<rect x="2" y="3.5" width="13" height="11" fill="#fff" stroke="currentColor" stroke-width="1.2"/><path d="M3 13l4-5 3 3 2-2 2 4z" fill="#8dbf6a"/><path d="M12 18l6-8 1.2 1-6 8z" fill="#c87a10"/>',
    ),
    corrections: sv(
      '<circle cx="10" cy="10" r="4" fill="#f3b72b"/><path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3M4 4l2 2M14 14l2 2M4 16l2-2M14 6l2-2" stroke="#c87a10" stroke-width="1.4"/>',
    ),
    picborder: sv(
      '<rect x="2" y="5" width="13" height="11" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 1.2"/><path d="M12 13l6-9 1.4 1-6 9-2 1z" fill="#2b7cd3"/>',
    ),
    piceffects: sv(
      '<rect x="5" y="5" width="13" height="12" rx="1" fill="#bbb"/><rect x="2" y="2" width="13" height="12" rx="1" fill="#fff" stroke="currentColor" stroke-width="1.2"/><path d="M3.5 12.5l3.5-4 3 3 1.5-1.5 2.5 2.5z" fill="#0f9ed5"/>',
    ),
    position: sv(
      '<rect x="3" y="1.5" width="14" height="17" fill="#fff" stroke="currentColor" stroke-width="1.2"/><path d="M5 4.5H15M5 15.5H15" stroke="#999" stroke-width="1.2"/><rect x="7" y="7" width="6" height="6" fill="#0f9ed5"/>',
    ),
    wraptext: sv(
      '<path d="M2 3.5H18M2 7.5H8M2 11.5H8M2 15.5H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="10" y="6" width="8" height="7" fill="#0f9ed5"/>',
    ),
    crop: sv(
      '<path d="M5 1.5V15H18.5M1.5 5H15V18.5" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    ),
    readmode: sv(
      '<path d="M10 5q-4-2.5-8-1.5v12q4-1 8 1.5 4-2.5 8-1.5v-12q-4-1-8 1.5z" fill="#fff" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 5v12M4 7h4M4 10h4M12 7h4M12 10h4" stroke="currentColor" stroke-width=".9"/>',
    ),
    printlayout: sv(
      '<rect x="4" y="1.5" width="12" height="17" fill="#fff" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 5H13.5M6.5 8H13.5M6.5 11H13.5M6.5 14H11" stroke="currentColor" stroke-width="1"/>',
    ),
    weblayout: sv(
      '<rect x="2" y="2" width="16" height="13" fill="#fff" stroke="currentColor" stroke-width="1.2"/><path d="M2 5H18" stroke="currentColor" stroke-width="1.2"/><circle cx="12" cy="13" r="5" fill="#fff" stroke="#2b7cd3" stroke-width="1.2"/><path d="M7 13h10M12 8q-3 5 0 10M12 8q3 5 0 10" fill="none" stroke="#2b7cd3" stroke-width=".9"/>',
    ),
    changecolors: sv(
      '<circle cx="6" cy="7" r="4" fill="#e97132"/><circle cx="14" cy="7" r="4" fill="#0f9ed5"/><circle cx="10" cy="14" r="4" fill="#4ea72e"/>',
    ),
    ruler: sv(
      '<rect x="1.5" y="6" width="17" height="8" fill="#fff" stroke="currentColor" stroke-width="1.2"/><path d="M4.5 6v3M7.5 6v2M10.5 6v3M13.5 6v2M16.5 6v3" stroke="currentColor" stroke-width="1"/>',
    ),
    copies: sv(
      '<rect x="6" y="2" width="11" height="13" fill="#fff" stroke="currentColor" stroke-width="1.1"/><rect x="3" y="5" width="11" height="13" fill="#fff" stroke="currentColor" stroke-width="1.1"/><path d="M5.5 9H11.5M5.5 12H11.5" stroke="currentColor"/>',
    ),
    portrait: sv(
      '<rect x="5" y="1.5" width="10" height="17" fill="#fff" stroke="currentColor" stroke-width="1.2"/><path d="M7 5H13M7 8H13M7 11H13" stroke="currentColor"/>',
    ),
    landscape: sv(
      '<rect x="1.5" y="5" width="17" height="10" fill="#fff" stroke="currentColor" stroke-width="1.2"/><path d="M4 8H16M4 11H16" stroke="currentColor"/>',
    ),
  };
  const ic = (n, arg) =>
    `<span class="wd-i">${typeof IC[n] === "function" ? IC[n](arg) : IC[n] || ""}</span>`;
  // for the lesson pages: a Word button ("bold", "highlight", …) or a key ("key:Ctrl+B")
  function icon(name) {
    if (String(name).startsWith("key:"))
      return `<span class="wd-keys">${String(name)
        .slice(4)
        .split("+")
        .map((k) => `<kbd>${esc(k)}</kbd>`)
        .join("<b>+</b>")}</span>`;
    // "borders:outside" → the Borders icon with that border
    const [base, arg] = String(name).split(":");
    return `<span class="wd-ic">${typeof IC[base] === "function" ? IC[base](arg) : IC[base] || ""}</span>`;
  }

  /* ================= one Mini Word ================= */
  function create(box, opts) {
    opts = opts || {};
    box.classList.add("wd-box");
    box.innerHTML = `<div class="wd-screen" tabindex="0" role="application" aria-label="Pretend Microsoft Word"></div>`;
    const scr = box.firstElementChild;
    let k = 1;
    const fit = () => {
      k = box.clientWidth / SW;
      scr.style.transform = `scale(${k})`;
      box.style.height = SH * k + "px";
    };
    fit();
    const ro = "ResizeObserver" in window ? new ResizeObserver(fit) : null;
    if (ro) ro.observe(box);
    else addEventListener("resize", fit);

    let st = null,
      mis = null,
      toastT = 0;
    const timers = new Set();
    const later = (fn, ms) => {
      const t = setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    };

    /* ---------- state ---------- */
    function setup(start) {
      start = start || {};
      timers.forEach(clearTimeout);
      timers.clear();
      const doc = makeDoc(start.doc);
      st = {
        doc,
        sel: null,
        caret: null,
        tab: start.tab || "Home",
        menu: null,
        pen: null, // highlighter pen colour (Text Highlight Color with nothing selected)
        hlColor: "yellow",
        fontColor: "red",
        nav: start.nav ? { q: start.find || "" } : null,
        editor: null,
        file: start.file || null,
        dlg: null,
        saved: start.saved ? { name: start.saved, folder: "Documents" } : null,
        zoom: start.zoom || 100,
        undo: [],
        redo: [],
        toast: null,
        ignored: new Set(),
        tw: null, // the word being typed
        typed: "",
        // Grade 4
        obj: start.obj ?? null, // the selected picture, SmartArt or shape (its paragraph)
        saBox: null,
        saPane: start.obj != null,
        crop: null,
        placing: null, // a shape waiting to be drawn on the page
        marks: !!start.marks,
        ruler: !!start.ruler,
        view: start.view || "print",
        rmMenu: false,
        shade: 0,
        border: "bottom",
        fd: null, // the Font window
        rp: start.replace ? { find: "", rep: "", at: null } : null,
        ip: null, // Insert Picture
        sad: null, // Choose a SmartArt Graphic
        pr: {
          copies: 1,
          printer: 0,
          what: "all",
          pages: "",
          orient: "portrait",
          page: 0,
          zoom: 1,
        },
      };
      if (st.saved) doc.name = st.saved;
      (start.para || []).forEach(({ p, ...set }) =>
        Object.assign(doc.paras[p], set),
      );
      (start.fmt || []).forEach((f) => {
        const [p0, w0, p1, w1] = f.r;
        eachIn({ a: { p: p0, w: w0 }, b: { p: p1, w: w1 } }, (w) => {
          for (const key of ["b", "i", "u", "hl", "c", "f", "s", "cs", "sh"])
            if (f[key] !== undefined) w[key] = f[key];
        });
      });
      if (start.sel) setSel(start.sel);
      const last = doc.paras.length - 1;
      st.caret = start.caret
        ? { p: start.caret[0], w: start.caret[1] }
        : { p: last, w: doc.paras[last].w.length - 1 };
      if (start.editor) openEditor();
      render();
    }
    function setSel(v) {
      const P = st.doc.paras;
      if (v === "all") {
        const lp = P.length - 1;
        st.sel = { a: { p: 0, w: 0 }, b: { p: lp, w: P[lp].w.length - 1 } };
      } else if (typeof v === "string" && v.startsWith("para:")) {
        const p = +v.slice(5);
        st.sel = { a: { p, w: 0 }, b: { p, w: P[p].w.length - 1 } };
      } else st.sel = { a: { p: v[0], w: v[1] }, b: { p: v[2], w: v[3] } };
    }
    const cmp = (x, y) => x.p - y.p || x.w - y.w;
    const range = (x, y) => (cmp(x, y) <= 0 ? { a: x, b: y } : { a: y, b: x });
    function eachIn(r, fn) {
      if (!r) return;
      const P = st.doc.paras;
      for (let p = r.a.p; p <= r.b.p; p++) {
        const ws = P[p].w;
        const w0 = p === r.a.p ? r.a.w : 0,
          w1 = p === r.b.p ? r.b.w : ws.length - 1;
        for (let w = Math.max(0, w0); w <= w1 && w < ws.length; w++)
          fn(ws[w], p, w);
      }
    }
    const inSel = (p, w) =>
      st.sel && cmp(st.sel.a, { p, w }) <= 0 && cmp({ p, w }, st.sel.b) <= 0;
    const selWords = () => {
      const a = [];
      eachIn(st.sel, (w) => a.push(w));
      return a;
    };
    const selParas = () => {
      if (st.sel) {
        const a = [];
        for (let p = st.sel.a.p; p <= st.sel.b.p; p++) a.push(p);
        return a;
      }
      return st.caret ? [st.caret.p] : [];
    };
    function snap() {
      st.undo.push(JSON.stringify({ paras: st.doc.paras }));
      if (st.undo.length > 60) st.undo.shift();
      st.redo = [];
    }
    function restore(json) {
      st.doc.paras = JSON.parse(json).paras;
      st.sel = null;
      const lp = st.doc.paras.length - 1;
      st.caret = { p: lp, w: st.doc.paras[lp].w.length - 1 };
      st.tw = null;
    }
    function toast(t, ms = 2200) {
      st.toast = t;
      clearTimeout(toastT);
      toastT = setTimeout(() => {
        if (st) {
          st.toast = null;
          render();
        }
      }, ms);
    }
    const missKey = (w) => bare(w.t).toLowerCase();
    const isMiss = (w, p, i) =>
      st.doc.miss[missKey(w)] &&
      !st.ignored.has(missKey(w)) &&
      !st.ignored.has(p + ":" + i);
    // grammar mistakes (double blue line) are listed apart in the Editor: Corrections › Grammar
    const isGram = (w, p, i) =>
      st.doc.gram[missKey(w)] &&
      !st.ignored.has(missKey(w)) &&
      !st.ignored.has(p + ":" + i);
    function nextMiss(cat) {
      const test = cat === "gr" ? isGram : isMiss;
      const P = st.doc.paras;
      for (let p = 0; p < P.length; p++)
        for (let i = 0; i < P[p].w.length; i++)
          if (test(P[p].w[i], p, i)) return { p, w: i };
      return null;
    }
    function countMiss(cat) {
      const test = cat === "gr" ? isGram : isMiss;
      let n = 0;
      st.doc.paras.forEach((para, p) =>
        para.w.forEach((w, i) => test(w, p, i) && n++),
      );
      return n;
    }
    function openEditor() {
      st.editor = Object.keys(st.doc.gram).length
        ? { cat: null }
        : { cur: nextMiss() };
      st.nav = null;
    }
    // after a fix: the next mistake of the same kind, or back to the list of kinds
    function nextInEditor(fixed) {
      const cat = st.editor && st.editor.cat;
      if (cat === undefined) return (st.editor = { cur: nextMiss(), fixed });
      const cur = nextMiss(cat);
      st.editor = cur ? { cat, cur, fixed } : { cat: null, fixed };
    }

    /* ---------- what the buttons do ---------- */
    function toggle(key) {
      const ws = selWords();
      if (!ws.length) {
        toast("Select the text first.");
        return;
      }
      snap();
      const on = !ws.every((w) => w[key]);
      ws.forEach((w) => (w[key] = on));
    }
    function setAll(key, v) {
      const ws = selWords();
      if (!ws.length) {
        toast("Select the text first.");
        return false;
      }
      snap();
      ws.forEach((w) => (w[key] = v));
      return true;
    }
    function insertWord(text) {
      snap();
      const c = st.caret || { p: 0, w: -1 };
      const ws = st.doc.paras[c.p].w;
      const near = ws[c.w] || ws[c.w + 1] || {};
      const w = {
        t: text,
        b: near.b,
        i: near.i,
        u: near.u,
        c: near.c,
        f: near.f,
        s: near.s,
      };
      ws.splice(c.w + 1, 0, w);
      st.caret = { p: c.p, w: c.w + 1 };
      st.sel = null;
      return w;
    }
    function removeSel() {
      const { a, b } = st.sel;
      const P = st.doc.paras;
      if (a.p === b.p) P[a.p].w.splice(a.w, b.w - a.w + 1);
      else {
        const tail = P[b.p].w.slice(b.w + 1);
        P[a.p].w.splice(a.w);
        P[a.p].w.push(...tail);
        P.splice(a.p + 1, b.p - a.p);
      }
      st.caret = { p: a.p, w: a.w - 1 };
      st.sel = null;
      st.tw = null;
    }
    function typeChar(ch) {
      if (ch === " ") {
        st.tw = null;
        st.typed += " ";
        render();
        return;
      }
      if (st.sel) {
        // typing replaces the selected words
        snap();
        removeSel();
      }
      const c = st.caret;
      if (st.tw && c && st.tw.p === c.p && st.tw.w === c.w) {
        st.doc.paras[c.p].w[c.w].t += ch;
      } else {
        insertWord(ch);
        st.tw = { ...st.caret };
      }
      st.typed += ch;
      render();
    }
    function backspace() {
      const c = st.caret;
      if (!c) return;
      const P = st.doc.paras;
      if (st.typed) st.typed = st.typed.slice(0, -1);
      if (c.w < 0) {
        if (c.p === 0) return;
        snap();
        const prev = P[c.p - 1];
        const at = prev.w.length - 1;
        prev.w.push(...P[c.p].w);
        P.splice(c.p, 1);
        st.caret = { p: c.p - 1, w: at };
      } else {
        if (!st.tw) snap();
        const w = P[c.p].w[c.w];
        w.t = w.t.slice(0, -1);
        if (!w.t) {
          P[c.p].w.splice(c.w, 1);
          st.caret = { p: c.p, w: c.w - 1 };
          st.tw = null;
        }
      }
      render();
    }
    function enter(soft) {
      snap();
      const c = st.caret || { p: st.doc.paras.length - 1, w: -1 };
      const P = st.doc.paras;
      const cur = P[c.p];
      if (!soft && cur.list && !cur.w.length) {
        cur.list = null; // Enter on an empty bullet ends the list
      } else {
        const rest = cur.w.splice(c.w + 1);
        P.splice(c.p + 1, 0, {
          w: rest,
          align: cur.align,
          list: soft ? null : cur.list,
          bul: cur.bul,
          tight: !!soft,
        });
        st.caret = { p: c.p + 1, w: -1 };
      }
      st.sel = null;
      st.tw = null;
      st.typed = "";
    }
    /* ---------- Grade 4: paragraph settings ---------- */
    const textParas = () => selParas().filter((p) => !st.doc.paras[p].o);
    function eachPara(fn) {
      const ps = textParas();
      if (!ps.length) {
        toast("Click in the paragraph first.");
        return;
      }
      snap();
      ps.forEach((p) => fn(st.doc.paras[p]));
    }
    // whole paragraphs (or just the cursor) get the shading; a few selected words get it alone
    function wholeParas() {
      if (!st.sel) return true;
      const { a, b } = st.sel;
      return a.w <= 0 && b.w >= st.doc.paras[b.p].w.length - 1;
    }
    function shadeIt(i) {
      if (i !== "none") st.shade = +i;
      const c = i === "none" ? null : SHADES[+i][1];
      if (wholeParas()) eachPara((P) => (P.shade = c));
      else setAll("sh", c);
    }
    // a border on several paragraphs goes around them as one block
    function borderIt(k) {
      const ps = textParas();
      if (!ps.length) {
        toast("Click in the paragraph first.");
        return;
      }
      st.border = k;
      snap();
      const P = st.doc.paras;
      const first = ps[0],
        last = ps[ps.length - 1];
      ps.forEach((p) => {
        if (k === "none") return (P[p].bd = null);
        const b = { ...(P[p].bd || {}) };
        if (k === "left" || k === "outside" || k === "all") b.l = true;
        if (k === "right" || k === "outside" || k === "all") b.r = true;
        if (p === first && (k === "top" || k === "outside" || k === "all"))
          b.t = true;
        if (p === last && (k === "bottom" || k === "outside" || k === "all"))
          b.b = true;
        if (p !== last && (k === "inside" || k === "ih" || k === "all"))
          b.mid = true;
        P[p].bd = b;
      });
    }
    // Tab at the start of a paragraph indents its first line
    function tabKey() {
      const c = st.caret;
      if (!st.sel && c && c.w === -1 && !st.doc.paras[c.p].o) {
        snap();
        st.doc.paras[c.p].first = true;
        return;
      }
      toast("Click at the start of the paragraph, then press Tab.");
    }
    function delKey() {
      const o = selObj();
      if (o) {
        snap();
        if (o.type === "sa" && st.saBox != null && o.items.length > 1) {
          o.items.splice(st.saBox, 1);
          st.saBox = null;
          return;
        }
        st.doc.paras.splice(st.obj, 1);
        st.obj = null;
        st.saBox = null;
        if (!tabs.includes(st.tab)) st.tab = "Home";
        const lp = st.doc.paras.length - 1;
        if (st.caret && st.caret.p > lp)
          st.caret = { p: lp, w: st.doc.paras[lp].w.length - 1 };
        return;
      }
      if (st.sel) {
        snap();
        removeSel();
      }
    }

    // Editor › Read context: the sentence with the mistake, read aloud
    function readAloud(m) {
      const ws = st.doc.paras[m.p].w;
      let a = m.w,
        b = m.w;
      while (a > 0 && !/[.!?]$/.test(ws[a - 1].t)) a--;
      while (b < ws.length - 1 && !/[.!?]$/.test(ws[b].t)) b++;
      const text = ws
        .slice(a, b + 1)
        .map((x) => x.t)
        .join(" ");
      toast("🔊 " + text, 3200);
      try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        u.rate = 0.9;
        speechSynthesis.speak(u);
      } catch (e) {}
    }
    // the printed pages: about 30 lines on a page (20 when it lies sideways)
    function pages() {
      const cap = st.pr.orient === "landscape" ? 20 : 30;
      const per = st.pr.orient === "landscape" ? 95 : 70;
      const out = [[]];
      let n = 0;
      st.doc.paras.forEach((para, p) => {
        const len = para.o
          ? 8
          : Math.max(
              1,
              Math.ceil(para.w.map((w) => w.t).join(" ").length / per),
            ) + 1;
        if (n + len > cap && out[out.length - 1].length) {
          out.push([]);
          n = 0;
        }
        out[out.length - 1].push(p);
        n += len;
      });
      return out;
    }

    /* ---------- Grade 4: Find and Replace ---------- */
    function findHits(q) {
      const qs = String(q || "")
        .trim()
        .split(/\s+/)
        .map((x) => bare(x).toLowerCase())
        .filter(Boolean);
      const hits = [];
      if (!qs.length) return hits;
      st.doc.paras.forEach((para, p) => {
        for (let i = 0; i + qs.length <= para.w.length; i++)
          if (qs.every((x, j) => bare(para.w[i + j].t).toLowerCase() === x))
            hits.push({ p, w: i, n: qs.length });
      });
      return hits;
    }
    // the punctuation around the old words stays, and a capital letter stays a capital
    function replaceAt(h, rep) {
      const ws = st.doc.paras[h.p].w;
      const first = ws[h.w],
        last = ws[h.w + h.n - 1];
      const b0 = bare(first.t),
        b1 = bare(last.t);
      const lead = first.t.slice(0, first.t.indexOf(b0));
      const tail = last.t.slice(last.t.lastIndexOf(b1) + b1.length);
      const rw = String(rep || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      if (!rw.length) {
        ws.splice(h.w, h.n);
        return 0;
      }
      if (/^\p{Lu}/u.test(b0) && /^\p{Ll}/u.test(rw[0]))
        rw[0] = rw[0][0].toUpperCase() + rw[0].slice(1);
      const nw = rw.map((t, k) => ({
        ...first,
        t: (k ? "" : lead) + t + (k === rw.length - 1 ? tail : ""),
      }));
      ws.splice(h.w, h.n, ...nw);
      return nw.length;
    }
    function rpNext(after) {
      const hits = findHits(st.rp.find);
      const from = after || { p: 0, w: -1 };
      const h = hits.find((x) => cmp({ p: x.p, w: x.w }, from) > 0);
      if (!h) {
        st.rp.at = null;
        st.sel = null;
        st.rp.msg = hits.length
          ? "We finished searching the document."
          : "We couldn't find what you are looking for.";
        return;
      }
      st.rp.at = h;
      st.sel = { a: { p: h.p, w: h.w }, b: { p: h.p, w: h.w + h.n - 1 } };
    }
    function replaceCmd(arg) {
      const R = st.rp;
      if (arg === "next") return rpNext(R.at);
      if (arg === "replace") {
        const at = R.at;
        const ok =
          at && findHits(R.find).some((x) => x.p === at.p && x.w === at.w);
        if (!ok) return rpNext(at); // the first press finds it
        snap();
        const n = replaceAt(at, R.rep);
        R.count = (R.count || 0) + 1;
        return rpNext({ p: at.p, w: at.w + n - 1 });
      }
      if (arg === "all") {
        const hits = findHits(R.find);
        if (hits.length) {
          snap();
          hits.reverse().forEach((x) => replaceAt(x, R.rep));
        }
        st.sel = null;
        R.at = null;
        R.count = (R.count || 0) + hits.length;
        R.msg = hits.length
          ? `All done. We made ${hits.length} replacement${hits.length === 1 ? "" : "s"}.`
          : "We couldn't find what you are looking for.";
        return;
      }
      if (arg === "ok") R.msg = null;
      if (arg === "cancel") st.rp = null;
    }

    /* ---------- Grade 4: pictures, SmartArt and shapes ---------- */
    const CTX = {
      pic: ["Picture Format"],
      sa: ["SmartArt Design", "Format"],
      shape: ["Shape Format"],
    };
    const selObj = () =>
      (st.obj != null && st.doc.paras[st.obj] && st.doc.paras[st.obj].o) ||
      null;
    function deselect() {
      if (st.obj == null) return;
      st.obj = null;
      st.saBox = null;
      st.crop = null;
      if (!tabs.includes(st.tab)) st.tab = "Home";
    }
    // a new picture, diagram or shape goes after the paragraph with the cursor, and is selected
    function insertObj(o, tab) {
      snap();
      const P = st.doc.paras;
      const at = st.sel ? st.sel.b.p : st.caret ? st.caret.p : P.length - 1;
      P.splice(at + 1, 0, {
        w: [],
        align: "left",
        list: null,
        bul: "•",
        tight: false,
        o: { wrap: "inline", h: "l", ...o },
      });
      st.sel = null;
      st.obj = at + 1;
      st.saBox = null;
      st.saPane = o.type === "sa";
      st.tab = tab;
      st.caret = { p: at, w: P[at].w.length - 1 };
    }
    // Position: top / middle / bottom of the text, left / center / right, with the text around it
    function placePic(k) {
      const o = selObj();
      if (!o) return;
      snap();
      if (k === "inline") {
        o.wrap = "inline";
        o.h = "l";
        return;
      }
      o.h = k[1];
      if (o.wrap === "inline") o.wrap = "square";
      const P = st.doc.paras;
      const [para] = P.splice(st.obj, 1);
      const text = P.map((x, i) => i).filter((i) => !P[i].o);
      const body = text.filter((i) => !P[i].h);
      const to =
        k[0] === "t"
          ? (body[0] ?? 0)
          : k[0] === "b"
            ? (body[body.length - 1] ?? P.length)
            : (body[Math.floor((body.length - 1) / 2)] ?? 0);
      P.splice(to, 0, para);
      st.obj = to;
    }
    function cropDone() {
      const o = selObj();
      if (o) {
        snap();
        o.crop = true;
      }
      st.crop = null;
    }
    function picCmd(cmd, arg, tog) {
      const o = selObj();
      if (!o) return toast("Click the picture first.");
      if (cmd === "pf") {
        if (arg === "removebg") {
          snap();
          o.nobg = !o.nobg;
          if (o.nobg) toast("✓ Only the main subject is kept.");
        } else if (arg === "reset") {
          snap();
          ["col", "art", "sty", "eff", "bd", "nobg", "crop"].forEach(
            (x) => delete o[x],
          );
        } else if (arg === "crop") {
          if (st.crop) cropDone();
          else st.crop = { moved: false };
        } else tog("p" + arg);
        return;
      }
      snap();
      if (cmd === "pcol") o.col = arg;
      if (cmd === "part") o.art = arg;
      if (cmd === "pstyle") o.sty = +arg;
      if (cmd === "peff") o.eff = arg;
      if (cmd === "pbd") o.bd = arg === "none" ? null : arg;
      if (cmd === "pwrap") o.wrap = arg;
    }
    function command(t) {
      const [cmd, arg] = [t.split(":")[0], t.slice(t.indexOf(":") + 1)];
      const wasMenu = st.menu;
      st.menu = null;
      const tog = (m) => (st.menu = wasMenu === m ? null : m);
      switch (cmd) {
        // Grade 4
        case "ls":
          return eachPara((P) => (P.ls = +arg));
        case "sp":
          if (arg === "before") return eachPara((P) => (P.before = !P.before));
          return eachPara((P) => (P.noAfter = !P.noAfter));
        case "shade-arrow":
          return tog("shade");
        case "shade":
          return shadeIt(arg);
        case "borders-arrow":
          return tog("borders");
        case "border":
          return borderIt(arg);
        case "pstart":
          return;
        case "font-dlg": {
          const w0 = selWords()[0] || {};
          st.fd = {
            tab: "Font",
            sp: w0.cs > 0 ? "Expanded" : w0.cs < 0 ? "Condensed" : "Normal",
            by: w0.cs ? Math.abs(w0.cs) + " pt" : "",
          };
          return;
        }
        case "fd":
          if (arg.startsWith("tab:")) st.fd.tab = arg.slice(4);
          else if (arg === "spacing") tog("fdsp");
          else if (arg === "ok") {
            const by = parseFloat(st.fd.by) || 0;
            const v =
              st.fd.sp === "Expanded" ? by : st.fd.sp === "Condensed" ? -by : 0;
            st.fd = null;
            setAll("cs", v || null);
          } else st.fd = null;
          return;
        case "fdsp":
          st.fd.sp = arg;
          if (arg !== "Normal" && !st.fd.by) st.fd.by = "1 pt";
          if (arg === "Normal") st.fd.by = "";
          return;
        case "rp":
          return replaceCmd(arg);
        case "obj":
          st.obj = +arg;
          st.sel = null;
          st.saBox = null;
          st.crop = null;
          return;
        case "pf":
        case "pcol":
        case "part":
        case "pstyle":
        case "peff":
        case "pbd":
        case "pwrap":
          return picCmd(cmd, arg, tog);
        case "ppos":
          return placePic(arg);
        case "crop-h":
          if (st.crop) st.crop.moved = true;
          return;
        case "pics":
          if (arg === "device") st.ip = { pick: null };
          return;
        case "ip":
          if (DRAW[arg]) st.ip.pick = arg;
          else if (arg === "insert" && st.ip.pick) {
            const k = st.ip.pick;
            st.ip = null;
            insertObj({ type: "pic", k }, "Picture Format");
          } else if (arg === "cancel") st.ip = null;
          return;
        case "shp":
          st.placing = arg;
          toast("Drag on the page to draw the shape.");
          return;
        case "shs": {
          const o = selObj();
          if (o) {
            snap();
            o.sty = +arg;
          }
          return;
        }
        case "sacat":
          st.sad.cat = arg;
          return;
        case "sal":
          st.sad.pick = arg;
          return;
        case "sad":
          if (arg === "ok") {
            const k = st.sad.pick;
            st.sad = null;
            if (k)
              insertObj(
                {
                  type: "sa",
                  k,
                  items: Array(k === "basic-pyramid" ? 3 : 5).fill("[Text]"),
                  col: 0,
                  sty: 0,
                },
                "SmartArt Design",
              );
          } else if (arg === "cancel") st.sad = null;
          else if (arg === "colors") tog("sacol");
          return;
        case "sabox":
          st.saBox = +arg;
          return;
        case "sa-pane":
          st.saPane = !st.saPane;
          return;
        case "sacol":
        case "sas": {
          const o = selObj();
          if (o) {
            snap();
            o[cmd === "sacol" ? "col" : "sty"] = +arg;
          }
          return;
        }
        case "rm":
          if (arg === "view") tog("rmview");
          else if (arg === "edit") st.view = "print";
          return;
        case "edc": {
          const cat = arg === "grammar" ? "gr" : "sp";
          const cur = nextMiss(cat);
          st.editor = cur ? { cat, cur } : { cat: null };
          return;
        }
        case "pr": {
          const R = st.pr;
          if (arg === "up" || arg === "down") R.copiesTxt = null;
          if (arg === "up") R.copies = Math.min(99, R.copies + 1);
          else if (arg === "down") R.copies = Math.max(1, R.copies - 1);
          else if (arg === "printer") tog("printer");
          else if (arg === "what") tog("prwhat");
          else if (arg === "orient") tog("orient");
          else if (arg === "next")
            R.page = Math.min(pages().length - 1, R.page + 1);
          else if (arg === "prev") R.page = Math.max(0, R.page - 1);
          else if (arg === "zin") R.zoom = Math.min(1.6, R.zoom + 0.2);
          else if (arg === "zout") R.zoom = Math.max(0.6, R.zoom - 0.2);
          return;
        }
        case "prn":
          st.pr.printer = +arg;
          return;
        case "prw":
          st.pr.what = arg;
          return;
        case "pro":
          st.pr.orient = arg;
          st.pr.page = 0;
          return;
        // Grade 3 and 4
        case "tab":
          if (arg === "File") st.file = "home";
          else st.tab = arg;
          break;
        case "font-name":
          st.menu = wasMenu === "font" ? null : "font";
          break;
        case "font-size":
          st.menu = wasMenu === "size" ? null : "size";
          break;
        case "font":
          setAll("f", arg);
          break;
        case "size":
          setAll("s", +arg);
          break;
        case "fmt":
          if (arg === "bold") toggle("b");
          else if (arg === "italic") toggle("i");
          else if (arg === "underline") toggle("u");
          else if (arg === "hl") {
            if (st.sel) setAll("hl", st.hlColor);
            else st.pen = st.pen ? null : st.hlColor;
          } else if (arg === "color") setAll("c", st.fontColor);
          break;
        case "hl-arrow":
          st.menu = wasMenu === "hl" ? null : "hl";
          break;
        case "hl":
          if (arg === "stop") st.pen = null;
          else if (arg === "none") {
            if (st.sel) setAll("hl", null);
            st.pen = null;
          } else {
            st.hlColor = arg;
            if (st.sel) setAll("hl", arg);
            else st.pen = arg; // the highlighter pen: now select the text
          }
          break;
        case "color-arrow":
          st.menu = wasMenu === "color" ? null : "color";
          break;
        case "color":
          if (arg !== "auto") st.fontColor = arg;
          setAll("c", arg === "auto" ? null : arg);
          break;
        case "bullets-arrow":
          st.menu = wasMenu === "bullets" ? null : "bullets";
          break;
        case "bullet":
        case "para": {
          if (arg === "indent-inc" || arg === "indent-dec")
            return eachPara(
              (P) =>
                (P.indent = Math.max(
                  0,
                  Math.min(
                    6,
                    (P.indent || 0) + (arg === "indent-inc" ? 1 : -1),
                  ),
                )),
            );
          if (arg === "spacing") return tog("spacing");
          if (arg === "shade") return shadeIt(st.shade);
          if (arg === "borders") return borderIt(st.border);
          if (arg === "marks") return (st.marks = !st.marks);
          snap();
          const ps = selParas();
          if (cmd === "bullet") {
            ps.forEach((p) => {
              const P = st.doc.paras[p];
              if (arg === "none") P.list = null;
              else {
                P.list = "bullet";
                P.bul = BULLETS[+arg] || "•";
              }
            });
          } else {
            const kind = arg === "numbering" ? "number" : "bullet";
            const on = !ps.every((p) => st.doc.paras[p].list === kind);
            ps.forEach((p) => (st.doc.paras[p].list = on ? kind : null));
          }
          break;
        }
        case "align":
          snap();
          selParas().forEach((p) => (st.doc.paras[p].align = arg));
          break;
        case "edit":
          if (arg === "find") {
            st.nav = st.nav || { q: "" };
            st.editor = null;
          }
          if (arg === "replace")
            st.rp = st.rp || { find: "", rep: "", at: null };
          break;
        case "nav-close":
          st.nav = null;
          break;
        case "ins":
          if (arg === "symbol")
            st.menu = wasMenu === "symbol" ? null : "symbol";
          if (arg === "pictures" || arg === "shapes") tog(arg);
          if (arg === "smartart") st.sad = { cat: "All", pick: null };
          break;
        case "sym":
          insertWord(SYMBOLS[+arg] || "☺");
          break;
        case "rev":
          if (arg === "spelling") openEditor();
          break;
        case "sug": {
          const m = st.editor && st.editor.cur;
          if (m) {
            snap();
            const w = st.doc.paras[m.p].w[m.w];
            const b = bare(w.t);
            w.t = w.t.replace(b, arg);
          }
          nextInEditor(true);
          break;
        }
        case "ed": {
          const m = st.editor && st.editor.cur;
          if (m) {
            const w = st.doc.paras[m.p].w[m.w];
            if (arg === "read") {
              readAloud(m);
              break;
            }
            st.ignored.add(
              arg === "ignoreall" || arg === "stop"
                ? missKey(w)
                : m.p + ":" + m.w,
            );
          }
          nextInEditor();
          break;
        }
        case "ed-close":
          st.editor = null;
          break;
        case "qat-undo":
          if (st.undo.length) {
            st.redo.push(JSON.stringify({ paras: st.doc.paras }));
            restore(st.undo.pop());
          }
          break;
        case "qat-redo":
          if (st.redo.length) {
            st.undo.push(JSON.stringify({ paras: st.doc.paras }));
            restore(st.redo.pop());
          }
          break;
        case "qat-save":
        case "file":
          if (cmd === "qat-save" || arg === "save") {
            if (st.saved) {
              st.file = null;
              toast(`✓ Saved: ${st.doc.name}.docx`);
            } else st.file = "saveas";
          } else st.file = arg; // saveas, print, home
          break;
        case "file-back":
          st.file = null;
          break;
        case "saveas":
          st.dlg = {
            folder: "This PC",
            name:
              bare(st.doc.paras[0].w.map((w) => w.t).join(" ")).slice(0, 30) ||
              "Document1",
          };
          break;
        case "dlg":
          if (arg.startsWith("nav:")) st.dlg.folder = arg.slice(4);
          else if (arg === "save") {
            const name = (st.dlg.name || "Document1").trim() || "Document1";
            st.saved = { name, folder: st.dlg.folder };
            st.doc.name = name;
            st.dlg = null;
            st.file = null;
            toast(`✓ Saved in ${st.saved.folder}: ${name}.docx`, 3000);
          } else if (arg === "cancel") st.dlg = null;
          break;
        case "print": {
          const R = st.pr;
          const what = PRWHAT.find((x) => x[0] === R.what);
          st.file = null;
          toast(
            `🖨️ Printing${R.copies > 1 ? ` ${R.copies} copies` : ""}${R.what !== "all" ? ` · ${what[1]}${R.what === "custom" && R.pages ? " " + R.pages : ""}` : ""}${R.orient === "landscape" ? " · Landscape" : ""}… ✓`,
            2600,
          );
          break;
        }
        case "zoom":
          st.zoom =
            arg === "in"
              ? Math.min(200, st.zoom + 10)
              : arg === "out"
                ? Math.max(50, st.zoom - 10)
                : 100;
          break;
        case "view":
          if (arg === "nav") st.nav = st.nav ? null : { q: "" };
          if (arg === "ruler") st.ruler = !st.ruler;
          if (arg === "read" || arg === "print" || arg === "web") st.view = arg;
          break;
      }
    }
    function doKey(key) {
      if (KEYS[key]) return command(KEYS[key]);
      if (key === "Ctrl+A") return setSel("all");
      if (key === "Enter" && st.crop) return cropDone();
      if (key === "Enter" && st.file === "print") return command("print:go"); // Ctrl + P, Enter
      if (key === "Tab") return tabKey();
      if (key === "Delete") return delKey();
      if (key === "Enter") return enter(false);
      if (key === "Shift+Enter") return enter(true);
      if (key === "Backspace") return backspace();
      if (key === "Escape") {
        st.menu = null;
        st.dlg = null;
        st.fd = st.rp = st.ip = st.sad = st.crop = st.placing = null;
      }
    }
    function perform(kind, t, info) {
      if (kind === "select") {
        if (st.pen && st.sel) {
          setAll("hl", st.pen);
        }
      } else if (kind === "key") doKey(t.slice(4));
      else if (/^(w:|para:\d|pstart:|page$)/.test(t)) {
        const pos = info && info.pos;
        st.menu = null;
        deselect();
        if (st.placing) {
          // the shape is drawn where the finger is
          const P = st.doc.paras;
          st.caret = pos || {
            p: P.length - 1,
            w: P[P.length - 1].w.length - 1,
          };
          insertObj({ type: "shape", k: st.placing, sty: 0 }, "Shape Format");
          st.placing = null;
        } else if (kind === "dbl" && pos && pos.w >= 0) {
          st.sel = { a: pos, b: pos };
          if (st.pen) setAll("hl", st.pen);
        } else if (pos) {
          st.sel = null;
          st.caret = pos;
          st.tw = null;
        }
      } else command(t);
      render();
    }

    /* ---------- drawing ---------- */
    const tabs = [
      "File",
      "Home",
      "Insert",
      "Draw",
      "Design",
      "Layout",
      "References",
      "Mailings",
      "Review",
      "View",
      "Help",
    ];
    const btn = (t, inner, cls = "", label = "") =>
      `<button type="button" class="wd-b ${cls}" data-t="${esc(t)}"${label ? ` aria-label="${esc(label)}"` : ""}>${inner}</button>`;
    const deco = (inner, cls = "") =>
      `<span class="wd-b deco ${cls}">${inner}</span>`;
    const big = (t, icn, label, cls = "") =>
      t
        ? btn(t, `${ic(icn)}<span>${label}</span>`, "big " + cls)
        : deco(`${ic(icn)}<span>${label}</span>`, "big " + cls);
    const group = (name, inner, cls = "", launch) =>
      `<div class="wd-grp ${cls}"><div class="wd-gin">${inner}</div><div class="wd-gl">${name}${launch ? btn(launch, ic("launcher"), "lch", name + " settings") : ""}</div></div>`;
    const sw = (t, color, label, on) =>
      `<button type="button" class="wd-b sw${on ? " on" : ""}" data-t="${esc(t)}" aria-label="${esc(label)}" style="background:${color}"></button>`;
    const chev = '<i class="wd-chev"></i>';
    const onM = (m) => (st.menu === m ? " on" : "");
    function curFmt() {
      const ws = selWords();
      const w0 =
        ws[0] || (st.caret && st.doc.paras[st.caret.p].w[st.caret.w]) || {};
      return {
        f: w0.f || "Aptos",
        s: w0.s || 12,
        b: ws.length && ws.every((w) => w.b),
        i: ws.length && ws.every((w) => w.i),
        u: ws.length && ws.every((w) => w.u),
        align: (st.doc.paras[selParas()[0]] || {}).align || "left",
        list: (st.doc.paras[selParas()[0]] || {}).list,
      };
    }
    function ribbon() {
      const f = curFmt();
      if (st.tab === "Home")
        return (
          group(
            "Clipboard",
            big(null, "paste", "Paste") +
              `<div class="wd-col">${deco("✂")}${deco("⧉")}${deco("🖌")}</div>`,
          ) +
          group(
            "Font",
            `<div class="wd-row">${btn("font-name", `<span class="nm" style="font-family:${FONTCSS[f.f]}">${esc(f.f)}</span><i class="wd-chev"></i>`, "box fontbox" + (st.menu === "font" ? " on" : ""), "Font")}${btn("font-size", `<span class="nm">${f.s}</span><i class="wd-chev"></i>`, "box sizebox" + (st.menu === "size" ? " on" : ""), "Font size")}${deco("A<sup>▲</sup>", "sm")}${deco("A<sup>▼</sup>", "sm")}${deco("Aa", "sm")}</div>
            <div class="wd-row">${btn("fmt:bold", ic("bold"), "sq" + (f.b ? " on" : ""), "Bold")}${btn("fmt:italic", ic("italic"), "sq" + (f.i ? " on" : ""), "Italic")}${btn("fmt:underline", ic("underline"), "sq" + (f.u ? " on" : ""), "Underline")}${deco("<s>ab</s>", "sm")}${deco("x<sub>2</sub>", "sm")}${deco("x<sup>2</sup>", "sm")}<span class="wd-sep"></span>${btn("fmt:hl", ic("highlight", hlHex(st.hlColor)), "sq" + (st.pen ? " on pen" : ""), "Text Highlight Color")}${btn("hl-arrow", '<i class="wd-chev"></i>', "arr" + (st.menu === "hl" ? " on" : ""), "Highlight colors")}${btn("fmt:color", ic("fontcolor", colHex(st.fontColor)), "sq", "Font Color")}${btn("color-arrow", '<i class="wd-chev"></i>', "arr" + (st.menu === "color" ? " on" : ""), "Font colors")}</div>`,
            "",
            "font-dlg",
          ) +
          group(
            "Paragraph",
            `<div class="wd-row">${btn("para:bullets", ic("bullets"), "sq" + (f.list === "bullet" ? " on" : ""), "Bullets")}${btn("bullets-arrow", '<i class="wd-chev"></i>', "arr" + (st.menu === "bullets" ? " on" : ""), "Bullet library")}${btn("para:numbering", ic("numbering"), "sq" + (f.list === "number" ? " on" : ""), "Numbering")}<span class="wd-sep"></span>${btn("para:indent-dec", ic("indent-dec"), "sq", "Decrease Indent")}${btn("para:indent-inc", ic("indent-inc"), "sq", "Increase Indent")}<span class="wd-sep"></span>${deco(ic("sort"), "sq")}${btn("para:marks", ic("marks"), "sq" + (st.marks ? " on" : ""), "Show/Hide")}</div>
            <div class="wd-row">${["left", "center", "right", "justify"].map((a) => btn("align:" + a, ic(a === "justify" ? "justify" : "align-" + a), "sq" + (f.align === a ? " on" : ""), a === "justify" ? "Justify" : "Align " + a)).join("")}${btn("para:spacing", ic("linespacing") + chev, "sq wide" + onM("spacing"), "Line and Paragraph Spacing")}<span class="wd-sep"></span>${btn("para:shade", ic("shading", SHADES[st.shade][1]), "sq", "Shading")}${btn("shade-arrow", chev, "arr" + onM("shade"), "Shading colors")}${btn("para:borders", ic("borders", st.border), "sq", "Borders")}${btn("borders-arrow", chev, "arr" + onM("borders"), "Borders list")}</div>`,
          ) +
          group(
            "Styles",
            `<div class="wd-styles"><span class="on">Normal</span><span>No Spacing</span><span class="h">Heading 1</span></div>`,
          ) +
          group(
            "Editing",
            `<div class="wd-col edit">${btn("edit:find", `${ic("find")}<span>Find</span>`, "line")}${btn("edit:replace", `${ic("replace")}<span>Replace</span>`, "line")}${deco(`${ic("select")}<span>Select</span>`, "line")}</div>`,
          )
        );
      if (st.tab === "Insert")
        return (
          group(
            "Pages",
            `<div class="wd-col">${deco("📄 Cover Page", "line")}${deco("▭ Blank Page", "line")}${deco("⤓ Page Break", "line")}</div>`,
          ) +
          group("Tables", big(null, "numbering", "Table")) +
          group(
            "Illustrations",
            `<div class="wd-row">${btn("ins:pictures", `${ic("picture")}<span>Pictures</span>`, "big" + onM("pictures"))}${btn("ins:shapes", `${ic("shapes")}<span>Shapes</span>`, "big" + onM("shapes"))}${deco(`${ic("icons")}<span>Icons</span>`, "big")}${btn("ins:smartart", `${ic("smartart")}<span>SmartArt</span>`, "big")}</div>`,
          ) +
          group("Links", big(null, "select", "Link")) +
          group(
            "Text",
            `<div class="wd-col">${deco("A Text Box", "line")}${deco("𝒜 WordArt", "line")}</div>`,
          ) +
          group(
            "Symbols",
            `<div class="wd-col">${deco("π Equation", "line")}${btn("ins:symbol", `${ic("symbol")}<span>Symbol</span><i class="wd-chev"></i>`, "line" + (st.menu === "symbol" ? " on" : ""))}</div>`,
          )
        );
      if (st.tab === "Review")
        return (
          group(
            "Proofing",
            `<div class="wd-row">${deco("✍️<span>Editor</span>", "big")}<div class="wd-col">${btn("rev:spelling", `${ic("spelling")}<span>Spelling and Grammar</span>`, "line")}${deco("📖 Thesaurus", "line")}${deco("🔢 Word Count", "line")}</div></div>`,
          ) +
          group("Speech", deco("🔊<span>Read Aloud</span>", "big")) +
          group(
            "Accessibility",
            deco("✔<span>Check Accessibility</span>", "big"),
          ) +
          group("Language", deco("🌐<span>Language</span>", "big")) +
          group(
            "Comments",
            `<div class="wd-col">${deco("💬 New Comment", "line")}${deco("🗑 Delete", "line")}</div>`,
          )
        );
      if (st.tab === "View")
        return (
          group(
            "Views",
            `<div class="wd-row">${btn("view:read", `${ic("readmode")}<span>Read Mode</span>`, "big")}${btn("view:print", `${ic("printlayout")}<span>Print Layout</span>`, "big" + (st.view === "print" ? " on" : ""))}${btn("view:web", `${ic("weblayout")}<span>Web Layout</span>`, "big" + (st.view === "web" ? " on" : ""))}</div>`,
          ) +
          group(
            "Immersive",
            `<div class="wd-row">${deco("🎯<span>Focus</span>", "big")}${deco("📖<span>Immersive Reader</span>", "big")}</div>`,
          ) +
          group(
            "Show",
            `<div class="wd-col">${btn("view:ruler", `${st.ruler ? "☑" : "☐"} Ruler`, "line")}${deco("☐ Gridlines", "line")}${btn("view:nav", `${st.nav ? "☑" : "☐"} Navigation Pane`, "line")}</div>`,
          ) +
          group(
            "Zoom",
            `<div class="wd-row">${deco(`${ic("zoom")}<span>Zoom</span>`, "big")}${btn("zoom:100", "<b>100</b><span>100%</span>", "big")}${deco("📄<span>One Page</span>", "big")}</div>`,
          )
        );
      const o = selObj() || {};
      if (st.tab === "Picture Format")
        return (
          group(
            "Adjust",
            `<div class="wd-row">${btn("pf:removebg", `${ic("removebg")}<span>Remove Background</span>`, "big" + (o.nobg ? " on" : ""))}${deco(`${ic("corrections")}<span>Corrections</span>`, "big")}<div class="wd-col">${btn("pf:color", `${ic("piccolor")}<span>Color</span>${chev}`, "line" + onM("pcolor"))}${btn("pf:artistic", `${ic("artistic")}<span>Artistic Effects</span>${chev}`, "line" + onM("partistic"))}${btn("pf:reset", "↺ Reset Picture", "line")}</div></div>`,
          ) +
          group(
            "Picture Styles",
            `<div class="wd-row"><div class="wd-psg">${PSTYLES.map((n, i) => btn("pstyle:" + i, `<span class="pth s${i}"></span>`, "pst" + (o.sty === i ? " on" : ""), n)).join("")}</div><div class="wd-col">${btn("pf:border", `${ic("picborder")}<span>Picture Border</span>${chev}`, "line" + onM("pborder"))}${btn("pf:effects", `${ic("piceffects")}<span>Picture Effects</span>${chev}`, "line" + onM("peffects"))}${deco("▦ Picture Layout", "line")}</div></div>`,
          ) +
          group(
            "Arrange",
            `<div class="wd-row">${btn("pf:position", `${ic("position")}<span>Position</span>`, "big" + onM("pposition"))}${btn("pf:wrap", `${ic("wraptext")}<span>Wrap Text</span>`, "big" + onM("pwrap"))}<div class="wd-col">${deco("⬆ Bring Forward", "line")}${deco("⬇ Send Backward", "line")}</div></div>`,
          ) +
          group(
            "Size",
            `<div class="wd-row">${btn("pf:crop", `${ic("crop")}<span>Crop</span>`, "big" + (st.crop ? " on" : ""))}<div class="wd-col">${deco("↕ 4.5 cm", "line")}${deco("↔ 6.4 cm", "line")}</div></div>`,
          )
        );
      if (st.tab === "SmartArt Design")
        return (
          group(
            "Create Graphic",
            `<div class="wd-col">${deco("➕ Add Shape", "line")}${btn("sa-pane", "☰ Text Pane", "line" + (st.saPane ? " on" : ""))}${deco("⇄ Right to Left", "line")}</div>`,
          ) +
          group(
            "Layouts",
            `<div class="wd-row">${["basic-pyramid", "text-cycle", "blist", "bprocess"].map((k) => deco(saThumb(k), "lay")).join("")}</div>`,
          ) +
          group(
            "SmartArt Styles",
            `<div class="wd-row">${btn("sad:colors", `${ic("changecolors")}<span>Change Colors</span>`, "big" + onM("sacol"))}${SASTYLES.map((n, i) => btn("sas:" + i, `<span class="sth t${i}"></span>`, "sst" + ((o.sty || 0) === i ? " on" : ""), n)).join("")}</div>`,
          ) +
          group("Reset", deco("↺<span>Reset Graphic</span>", "big"))
        );
      if (st.tab === "Shape Format")
        return (
          group(
            "Insert Shapes",
            `<div class="wd-row">${deco(ic("shapes"), "sq")}${deco("A Text Box", "line")}</div>`,
          ) +
          group(
            "Shape Styles",
            `<div class="wd-row">${SHSTYLES.map(([fl, ln], i) => btn("shs:" + i, `<span class="shth" style="background:${fl};border-color:${ln}">Abc</span>`, "shst" + ((o.sty || 0) === i ? " on" : ""), "Shape style " + (i + 1))).join("")}</div>`,
          ) +
          group(
            "Arrange",
            `<div class="wd-col">${deco("⬆ Bring Forward", "line")}${deco("⬇ Send Backward", "line")}</div>`,
          )
        );
      const other =
        {
          Format: ["🎨 Shape Fill", "✏️ Shape Outline", "✨ Shape Effects"],
          Draw: ["✏️ Draw", "🖊️ Pen", "🧽 Eraser"],
          Design: ["🎨 Themes", "🅰 Fonts", "🖌 Page Color"],
          Layout: ["📐 Margins", "🔄 Orientation", "📏 Size"],
          References: ["📑 Table of Contents", "¹ Footnote", "📚 Citation"],
          Mailings: ["✉️ Envelopes", "🏷 Labels", "📨 Mail Merge"],
          Help: ["❓ Help", "💬 Feedback", "🎓 Training"],
        }[st.tab] || [];
      return group(
        st.tab,
        `<div class="wd-row">${other.map((x) => deco(`${x.split(" ")[0]}<span>${x.split(" ").slice(1).join(" ")}</span>`, "big")).join("")}</div>`,
      );
    }
    function menus() {
      if (!st.menu) return "";
      if (st.menu === "font")
        return `<div class="wd-menu m-font"><div class="mh">All Fonts</div>${FONTS.map((n) => btn("font:" + n, `<span style="font-family:${FONTCSS[n]}">${esc(n)}</span>`, "mi")).join("")}</div>`;
      if (st.menu === "size")
        return `<div class="wd-menu m-size">${SIZES.map((n) => btn("size:" + n, String(n), "mi")).join("")}</div>`;
      if (st.menu === "hl")
        return `<div class="wd-menu m-hl"><div class="wd-sw">${HL.map(([n, h]) => btn("hl:" + n, "", "sw", n)).join("")}</div>${btn("hl:none", "No Color", "mi")}${btn("hl:stop", "Stop Highlighting", "mi" + (st.pen ? "" : " dim"))}</div>`.replace(
          /data-t="hl:([^"]+)" aria-label="[^"]*"><\/button>/g,
          (m, n) =>
            m.replace(
              "></button>",
              ` style="background:${hlHex(n)}"></button>`,
            ),
        );
      if (st.menu === "color")
        return `<div class="wd-menu m-color">${btn("color:auto", "■ Automatic", "mi")}<div class="mh">Standard Colors</div><div class="wd-sw">${COLORS.map(([n]) => btn("color:" + n, "", "sw", n)).join("")}</div></div>`.replace(
          /data-t="color:([^"]+)" aria-label="[^"]*"><\/button>/g,
          (m, n) =>
            m.replace(
              "></button>",
              ` style="background:${colHex(n)}"></button>`,
            ),
        );
      if (st.menu === "bullets")
        return `<div class="wd-menu m-bul"><div class="mh">Bullet Library</div><div class="wd-sw">${btn("bullet:none", "None", "bl")}${BULLETS.map((b, i) => btn("bullet:" + i, esc(b), "bl")).join("")}</div></div>`;
      if (st.menu === "symbol")
        return `<div class="wd-menu m-sym"><div class="wd-sw">${SYMBOLS.map((s, i) => btn("sym:" + i, esc(s), "sy")).join("")}</div><span class="mi dim">Ω More Symbols…</span></div>`;
      return menus4();
    }
    // the Grade 4 menus
    function menus4() {
      const m = st.menu;
      const o = selObj() || {};
      const dim = (t) => `<span class="mi dim">${t}</span>`;
      const sep = '<div class="msep"></div>';
      if (m === "spacing") {
        const P = st.doc.paras[textParas()[0]] || {};
        return `<div class="wd-menu m-ls">${SPACINGS.map((v) => btn("ls:" + v, `<span class="ck">${(P.ls || 1.15) === +v ? "✓" : ""}</span>${v}`, "mi")).join("")}${dim("Line Spacing Options…")}${sep}${btn("sp:before", `${ic("linespacing")} ${P.before ? "Remove" : "Add"} Space Before Paragraph`, "mi")}${btn("sp:after", `${ic("linespacing")} ${P.noAfter ? "Add" : "Remove"} Space After Paragraph`, "mi")}</div>`;
      }
      if (m === "shade")
        return `<div class="wd-menu m-shade"><div class="mh">Theme Colors</div><div class="wd-sw">${SHADES.slice(
          0,
          6,
        )
          .map(([n, h], i) => sw("shade:" + i, h, n))
          .join(
            "",
          )}</div><div class="mh">Standard Colors</div><div class="wd-sw">${SHADES.slice(
          6,
        )
          .map(([n, h], i) => sw("shade:" + (i + 6), h, n))
          .join(
            "",
          )}</div>${btn("shade:none", "No Color", "mi")}${dim("🎨 More Colors…")}</div>`;
      if (m === "borders")
        return `<div class="wd-menu m-bd">${BORDERS.map((x) => (!x ? sep : x[2] ? dim(`${ic("borders", x[0])} ${x[1]}`) : btn("border:" + x[0], `${ic("borders", x[0])} ${x[1]}`, "mi"))).join("")}</div>`;
      if (m === "fdsp")
        return `<div class="wd-menu m-fdsp">${["Normal", "Expanded", "Condensed"].map((x) => btn("fdsp:" + x, x, "mi")).join("")}</div>`;
      if (m === "pictures")
        return `<div class="wd-menu m-pics"><div class="mh">Insert Picture From</div>${btn("pics:device", `${ic("picture")} This Device…`, "mi")}${dim("🖼️ Stock Images…")}${dim("🌐 Online Pictures…")}</div>`;
      if (m === "shapes")
        return `<div class="wd-menu m-shapes">${SHAPES.map(([g, xs]) => `<div class="mh">${g}</div><div class="wd-sw">${xs.map(([k, n]) => btn("shp:" + k, shapeSVG(k, "#fff", "#444"), "shb", n)).join("")}${'<span class="shb dim"></span>'.repeat(Math.max(0, 6 - xs.length))}</div>`).join("")}</div>`;
      const thumbs = (list, cmd, key) =>
        `<div class="wd-pg">${list.map(([k, n, f]) => btn(cmd + ":" + k, `<span class="pthumb" style="${f ? `filter:${f}` : ""}">${picSVG(o.k, true)}</span><small>${n}</small>`, "pc" + ((o[key] || "none") === k ? " on" : ""), n)).join("")}</div>`;
      if (m === "pcolor")
        return `<div class="wd-menu m-pc"><div class="mh">Recolor</div>${thumbs(PCOLORS, "pcol", "col")}</div>`;
      if (m === "partistic")
        return `<div class="wd-menu m-pc">${thumbs(ARTISTIC, "part", "art")}</div>`;
      if (m === "pborder")
        return `<div class="wd-menu m-pbd"><div class="mh">Theme Colors</div><div class="wd-sw">${COLORS.map(([n, h]) => sw("pbd:" + n, h, n)).join("")}</div>${btn("pbd:none", "No Outline", "mi")}${dim("Weight ›")}${dim("Dashes ›")}</div>`;
      if (m === "peffects")
        return `<div class="wd-menu m-peff">${PEFFECTS.map(([k, n]) => btn("peff:" + k, n + " ›", "mi" + ((o.eff || "none") === k ? " on" : ""))).join("")}</div>`;
      if (m === "pposition")
        return `<div class="wd-menu m-pos"><div class="mh">In Line with Text</div><div class="wd-sw">${btn("ppos:inline", posIcon("inline"), "pp", "In Line with Text")}</div><div class="mh">With Text Wrapping</div><div class="wd-sw">${PPOS.map(([k, n]) => btn("ppos:" + k, posIcon(k), "pp", n)).join("")}</div>${dim("More Layout Options…")}</div>`;
      if (m === "pwrap")
        return `<div class="wd-menu m-wrap">${PWRAP.map(([k, n]) => btn("pwrap:" + k, `${wrapIcon(k)} ${n}`, "mi" + (o.wrap === k ? " on" : ""))).join("")}${sep}${dim("Edit Wrap Points")}${dim("Move with Text")}${dim("More Layout Options…")}</div>`;
      if (m === "sacol")
        return `<div class="wd-menu m-sacol">${SACOLORS.map(([n, cs], i) => btn("sacol:" + i, `<span class="sacs">${[0, 1, 2, 3].map((k) => `<i style="background:${cs[k % cs.length]}"></i>`).join("")}</span><small>${esc(n)}</small>`, "mi" + ((o.col || 0) === i ? " on" : ""))).join("")}</div>`;
      if (m === "rmview")
        return `<div class="wd-menu m-rm">${btn("rm:edit", "✏️ Edit Document", "mi")}${sep}${["Navigation Pane", "Show Comments", "Column Width ›", "Page Color ›", "Layout ›", "Syllables", "Text Spacing", "Read Aloud"].map(dim).join("")}</div>`;
      if (m === "printer")
        return `<div class="wd-menu m-pr">${PRINTERS.map(([n, d], i) => btn("prn:" + i, `🖨️ <span><b>${esc(n)}</b><small>${esc(d)}</small></span>`, "mi pr")).join("")}</div>`;
      if (m === "prwhat")
        return `<div class="wd-menu m-pr"><div class="mh">Document</div>${PRWHAT.map(([k, n, d]) => btn("prw:" + k, `<span><b>${n}</b><small>${d}</small></span>`, "mi pr" + (st.pr.what === k ? " on" : ""))).join("")}${sep}${dim("Only Print Odd Pages")}${dim("Only Print Even Pages")}</div>`;
      if (m === "orient")
        return `<div class="wd-menu m-pr">${btn("pro:portrait", `${ic("portrait")} Portrait Orientation`, "mi pr")}${btn("pro:landscape", `${ic("landscape")} Landscape Orientation`, "mi pr")}</div>`;
      return "";
    }
    function wordStyle(w) {
      const s = [];
      if (w.f) s.push(`font-family:${FONTCSS[w.f] || w.f}`);
      if (w.s) s.push(`font-size:${(w.s / 12).toFixed(3)}em`);
      if (w.c) s.push(`color:${colHex(w.c)}`);
      if (w.hl) s.push(`background:${hlHex(w.hl)}`);
      else if (w.sh) s.push(`background:${w.sh}`);
      if (w.cs) s.push(`letter-spacing:${(w.cs / 11).toFixed(3)}em`);
      return s.join(";");
    }
    // a paragraph's indent, spacing, shading and borders
    function paraStyle(para, next) {
      const s = [];
      if (para.indent) s.push(`margin-left:${para.indent * 2.4}em`);
      if (para.ls)
        s.push(`line-height:${((1.35 * para.ls) / 1.15).toFixed(2)}`);
      if (para.before) s.push("margin-top:0.8em");
      if (para.noAfter) s.push("margin-bottom:0");
      if (para.shade) s.push(`background:${para.shade}`);
      const b = para.bd;
      if (b && (b.t || b.b || b.l || b.r || b.mid)) {
        const L = "1.5px solid #222";
        if (b.t) s.push(`border-top:${L}`);
        if (b.b || b.mid) s.push(`border-bottom:${L}`);
        if (b.l) s.push(`border-left:${L}`);
        if (b.r) s.push(`border-right:${L}`);
        s.push("padding:0.15em 0.35em");
        // a block of paragraphs with one border: no gap between them
        if (!b.b && next && next.bd)
          s.push("margin-bottom:0;padding-bottom:0.6em");
      } else if (para.shade) s.push("padding:0 0.2em");
      return s.join(";");
    }
    function objHTML(o, p) {
      const on = st.obj === p;
      if (o.type === "pic") {
        const fil = [
          (PCOLORS.find((x) => x[0] === o.col) || [])[2],
          (ARTISTIC.find((x) => x[0] === o.art) || [])[2],
        ]
          .filter(Boolean)
          .join(" ");
        const cls = ["wd-obj", "wd-pic", "wr-" + o.wrap, "h-" + o.h];
        if (o.sty != null) cls.push("ps" + o.sty);
        if (o.eff && o.eff !== "none") cls.push("pe-" + o.eff);
        if (on) cls.push("osel");
        if (on && st.crop) cls.push("cropping", st.crop.moved ? "moved" : "");
        const bd = o.bd ? `border:3px solid ${colHex(o.bd)};` : "";
        return `<div class="${cls.join(" ")}" data-t="obj:${p}"><div class="pin" style="${bd}${fil ? `filter:${fil}` : ""}">${picSVG(o.k, false, o.crop ? "40 22 132 96" : "0 0 200 140", o.nobg)}</div>${on && st.crop ? `<div class="crop"><i></i>${btn("crop-h", "", "ch", "Crop handle")}</div>` : ""}</div>`;
      }
      if (o.type === "shape") {
        const [fl, ln] = SHSTYLES[o.sty || 0];
        return `<div class="wd-obj wd-shape${on ? " osel" : ""}" data-t="obj:${p}">${shapeSVG(o.k, fl, ln)}</div>`;
      }
      return saHTML(o, p, on);
    }
    // SmartArt: a pyramid, or a cycle of stages with arrows
    function saHTML(o, p, on) {
      const cs = SACOLORS[o.col || 0][1];
      const fill = (i) => cs[i % cs.length];
      const n = o.items.length;
      const box = (i) =>
        `class="sab${on && st.saBox === i ? " bsel" : ""}"${on ? ` data-t="sabox:${i}"` : ""}`;
      const label = (t, x, y, col, fs = 13) =>
        `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" fill="${col}" font-size="${fs}">${esc(t)}</text>`;
      let g = "";
      if (o.k === "basic-pyramid") {
        const top = 6,
          bot = 154,
          H = (bot - top) / n;
        const xl = (y) => 120 - ((y - top) / (bot - top)) * 108;
        g = o.items
          .map((t, i) => {
            const y0 = top + i * H + (i ? 2 : 0),
              y1 = top + (i + 1) * H;
            return `<g ${box(i)}><path d="M${xl(y0).toFixed(1)} ${y0.toFixed(1)}H${(240 - xl(y0)).toFixed(1)}L${(240 - xl(y1)).toFixed(1)} ${y1.toFixed(1)}H${xl(y1).toFixed(1)}Z" fill="${fill(i)}"/>${i ? label(t, 120, (y0 + y1) / 2 + 5, "#fff") : label(t, 120, y0 + H * 0.82, "#fff", 11)}</g>`;
          })
          .join("");
      } else {
        const cx = 120,
          cy = 80,
          r = 60;
        const at = (a, rr = r) => [
          cx + rr * Math.cos(a),
          cy + rr * 0.95 * Math.sin(a),
        ];
        const step = (2 * Math.PI) / n;
        g = o.items
          .map((t, i) => {
            const a = -Math.PI / 2 + i * step;
            const [x, y] = at(a);
            // the arrow from this stage to the next one
            const a0 = a + step * 0.28,
              a1 = a + step * 0.72;
            const [x0, y0] = at(a0, r - 6),
              [x1, y1] = at(a1, r - 6);
            const tx = -Math.sin(a1),
              ty = Math.cos(a1),
              nx = Math.cos(a1),
              ny = Math.sin(a1);
            const head = `M${(x1 + tx * 8).toFixed(1)} ${(y1 + ty * 8).toFixed(1)}L${(x1 + nx * 6).toFixed(1)} ${(y1 + ny * 6).toFixed(1)}L${(x1 - nx * 6).toFixed(1)} ${(y1 - ny * 6).toFixed(1)}Z`;
            const arrow =
              o.k === "text-cycle" || n > 1
                ? `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)}A${r - 6} ${(r - 6) * 0.95} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${fill(i)}" stroke-width="${o.k === "text-cycle" ? 7 : 3}"/><path d="${head}" fill="${fill(i)}"/>`
                : "";
            const node =
              o.k === "basic-cycle"
                ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="21" fill="${fill(i)}"/>${label(t, x, y + 4, "#fff")}`
                : `<rect x="${(x - 44).toFixed(1)}" y="${(y - 11).toFixed(1)}" width="88" height="20" fill="#fff" opacity=".01"/>${label(t, x, y + 4, "#222")}`;
            return `${arrow}<g ${box(i)}>${node}</g>`;
          })
          .join("");
      }
      const pane =
        on && st.saPane
          ? `<div class="sa-pane"><div class="sph">Type your text here</div>${o.items.map((t, i) => `<div class="spr">•<input type="text" data-t="sat:${i}" value="${esc(t === "[Text]" ? "" : t)}" placeholder="[Text]" autocomplete="off" spellcheck="false"></div>`).join("")}</div>`
          : "";
      return `<div class="wd-obj wd-sa sas${o.sty || 0}${on ? " osel" : ""}" data-t="obj:${p}">${on ? btn("sa-pane", st.saPane ? "‹" : "›", "sap", "Text Pane") : ""}${pane}<svg viewBox="0 0 240 160" aria-hidden="true">${g}</svg></div>`;
    }
    function page() {
      const P = st.doc.paras;
      const q = st.nav && st.nav.q.trim().toLowerCase();
      const cur = st.editor && st.editor.cur;
      let num = 0;
      return P.map((para, p) => {
        if (para.o) return objHTML(para.o, p);
        num = para.list === "number" ? num + 1 : 0;
        const lead =
          para.list === "bullet"
            ? `<span class="wd-lead">${esc(para.bul || "•")}</span>`
            : para.list === "number"
              ? `<span class="wd-lead">${num}.</span>`
              : "";
        const caretAt =
          st.caret && st.caret.p === p && !st.sel && st.obj == null
            ? st.caret.w
            : -2;
        const ws = para.w
          .map((w, i) => {
            const cls = ["wd-w"];
            if (w.b) cls.push("b");
            if (w.i) cls.push("i");
            if (w.u) cls.push("u");
            if (isMiss(w, p, i)) cls.push("miss");
            if (isGram(w, p, i)) cls.push("gram");
            if (inSel(p, i)) cls.push("sel");
            if (q && q.length > 1 && bare(w.t).toLowerCase().includes(q))
              cls.push("found");
            if (cur && cur.p === p && cur.w === i) cls.push("cur");
            const sp =
              i < para.w.length - 1
                ? `<span class="wd-sp${inSel(p, i) && inSel(p, i + 1) ? " sel" : ""}"> </span>`
                : "";
            return `<span class="${cls.join(" ")}" data-t="w:${p}:${i}" style="${wordStyle(w)}">${esc(w.t)}${caretAt === i ? '<i class="wd-caret"></i>' : ""}</span>${sp}`;
          })
          .join("");
        const ps = paraStyle(para, P[p + 1]);
        const pm = st.marks
          ? `<span class="wd-pm">${P[p + 1] && P[p + 1].tight ? "↵" : "¶"}</span>`
          : "";
        const tab = para.first
          ? `<span class="wd-tab">${st.marks ? "→" : ""}</span>`
          : "";
        return `<div class="wd-p a-${para.align}${para.tight ? " tight" : ""}${para.list ? " li" : ""}${para.h ? " h" + para.h : ""}" data-t="para:${p}"${ps ? ` style="${ps}"` : ""}><span class="wd-ps" data-t="pstart:${p}"></span>${lead}${caretAt === -1 ? '<i class="wd-caret"></i>' : ""}${tab}${ws || "&#8203;"}${pm}</div>`;
      }).join("");
    }
    function navPane() {
      if (!st.nav) return "";
      const q = st.nav.q.trim().toLowerCase();
      const hits = [];
      if (q.length > 1)
        st.doc.paras.forEach((para, p) => {
          if (para.w.some((w) => bare(w.t).toLowerCase().includes(q)))
            hits.push(
              para.w
                .map((w) =>
                  bare(w.t).toLowerCase().includes(q)
                    ? `<b>${esc(w.t)}</b>`
                    : esc(w.t),
                )
                .join(" "),
            );
        });
      const n =
        q.length > 1
          ? st.doc.paras.reduce(
              (a, para) =>
                a +
                para.w.filter((w) => bare(w.t).toLowerCase().includes(q))
                  .length,
              0,
            )
          : 0;
      return `<div class="wd-nav"><div class="wd-ph"><b>Navigation</b>${btn("nav-close", "✕", "x", "Close")}</div>
        <div class="wd-search">${ic("find")}<input type="text" data-t="nav-search" value="${esc(st.nav.q)}" placeholder="Search document" autocomplete="off" spellcheck="false"></div>
        <div class="wd-res">${q.length > 1 ? `<div class="cnt">${n} result${n === 1 ? "" : "s"}</div><div class="wd-rt"><span>Headings</span><span>Pages</span><span class="on">Results</span></div>${hits.map((h) => `<div class="hit">${h}</div>`).join("")}` : '<div class="cnt muted">Type a word to find it.</div>'}</div></div>`;
    }
    function editorPane() {
      if (!st.editor) return "";
      const E = st.editor;
      const head = `<div class="wd-ph"><b>Editor</b>${btn("ed-close", "✕", "x", "Close")}</div>`;
      const done = `<div class="wd-ed">${head}<div class="wd-done">✅<b>All done!</b><span>No more suggestions. Your text looks good.</span></div></div>`;
      // Grade 4: first the list of kinds of mistakes (Corrections: Spelling, Grammar)
      if (E.cat === null) {
        const sp = countMiss("sp"),
          gr = countMiss("gr");
        if (!sp && !gr) return done;
        return `<div class="wd-ed">${head}<div class="wd-score"><span>Editor score</span><b>${Math.max(40, 100 - 6 * (sp + gr))}%</b></div>
        <div class="wd-lh">Corrections</div>${btn("edc:spelling", `<span>Spelling</span><b>${sp}</b>`, "cat")}${btn("edc:grammar", `<span>Grammar</span><b>${gr}</b>`, "cat")}
        <div class="wd-lh">Refinements</div>${deco("<span>Clarity</span><b>0</b>", "cat")}${deco("<span>Conciseness</span><b>0</b>", "cat")}</div>`;
      }
      const m = E.cur;
      const gram = E.cat === "gr";
      const left = countMiss(gram ? "gr" : "sp");
      if (!m) return done;
      const para = st.doc.paras[m.p];
      const w = para.w[m.w];
      const G = gram ? st.doc.gram[missKey(w)] : null;
      const sugs = gram ? G.s : st.doc.miss[missKey(w)] || [];
      const ctx = para.w
        .slice(Math.max(0, m.w - 3), m.w + 4)
        .map((x) =>
          x === w
            ? `<b class="bad${gram ? " g" : ""}">${esc(x.t)}</b>`
            : esc(x.t),
        )
        .join(" ");
      const ign = gram
        ? `${btn("ed:ignore1", "⊘ Ignore once", "line")}${btn("ed:stop", "⊘ Stop checking for this", "line")}`
        : `${btn("ed:ignore1", "⊘ Ignore once", "line")}${btn("ed:ignoreall", "⊘ Ignore all", "line")}${deco("📕 Add to dictionary", "line")}`;
      return `<div class="wd-ed">${head}
        <div class="wd-left">${left} remaining</div><div class="wd-kind"><b>${gram ? "Grammar" : "Spelling"}</b><span>${gram ? esc(G.why) : "Not in Dictionary"}</span></div>
        <div class="wd-ctx">…${ctx}…</div><div class="wd-cons">Consider:</div>
        <div class="wd-sugs">${sugs.map((s, i) => btn("sug:" + s, esc(s), "sug" + (i ? "" : " first"))).join("")}</div>
        <div class="wd-ign">${E.cat !== undefined ? btn("ed:read", "🔊 Read context", "line") : ""}${ign}</div></div>`;
    }
    function backstage() {
      if (!st.file) return "";
      const nav = [
        ["home", "🏠 Home"],
        [null, "📄 New"],
        [null, "📂 Open"],
        ["-"],
        [null, "Get Add-ins"],
        [null, "Info"],
        ["save", "Save"],
        ["saveas", "Save As"],
        ["print", "Print"],
        [null, "Export"],
        [null, "Close"],
      ];
      let main = "";
      if (st.file === "saveas")
        main = `<h2>Save As</h2><div class="wd-sa"><div class="locs"><span class="lh">Personal</span>${deco("☁️ OneDrive - Personal", "loc")}<span class="lh">Other locations</span>${deco("💻 This PC", "loc")}${deco("➕ Add a Place", "loc")}${btn("saveas:browse", `${ic("folder")}<span>Browse</span>`, "loc browse")}</div><div class="right"><div class="path">📁 OneDrive</div><div class="fake">Enter file name here</div><div class="fake">Word Document (*.docx)</div></div></div>`;
      else if (st.file === "print") {
        const R = st.pr;
        const pg = pages();
        const cur = Math.min(R.page, pg.length - 1);
        const what = PRWHAT.find((x) => x[0] === R.what);
        const prn = PRINTERS[R.printer];
        const sheet = pg[cur]
          .map((p) => {
            const P = st.doc.paras[p];
            if (P.o)
              return P.o.type === "pic"
                ? `<div class="sp-pic">${picSVG(P.o.k, true, "0 0 200 140", P.o.nobg)}</div>`
                : `<div class="sp-pic">▦</div>`;
            return `<p class="a-${P.align}">${esc(P.w.map((w) => w.t).join(" "))}</p>`;
          })
          .join("");
        main = `<h2>Print</h2><div class="wd-pr"><div class="opts">
          <div class="row">${btn("print:go", `${ic("print")}<span>Print</span>`, "printbtn")}<span class="copies">Copies: <input type="text" inputmode="numeric" data-t="pr:copies" value="${esc(R.copiesTxt ?? R.copies)}" autocomplete="off" aria-label="Copies"><span class="spin">${btn("pr:up", "▲", "spb", "More copies")}${btn("pr:down", "▼", "spb", "Fewer copies")}</span></span></div>
          <div class="lh">Printer</div>${btn("pr:printer", `<span class="pi">🖨️</span><span class="tx"><b>${esc(prn[0])}</b><small>${esc(prn[1])}</small></span>${chev}`, "dd" + onM("printer"))}
          <div class="lh">Settings</div>${btn("pr:what", `<span class="tx"><b>${what[1]}</b><small>${what[2]}</small></span>${chev}`, "dd" + onM("prwhat"))}
          <div class="pgs"><span>Pages:</span><input type="text" data-t="pr:pages" value="${esc(R.pages)}" autocomplete="off" spellcheck="false" aria-label="Pages"></div>
          <div class="fake">Print One Sided</div><div class="fake">Collated 1,2,3</div>
          ${btn("pr:orient", `${ic(R.orient)}<span class="tx"><b>${R.orient === "landscape" ? "Landscape" : "Portrait"} Orientation</b></span>${chev}`, "dd" + onM("orient"))}</div>
          <div class="prev"><div class="sheet ${R.orient}" style="transform:scale(${R.zoom})">${sheet}</div>
          <div class="pnav">${btn("pr:prev", "◀", "pn", "Previous page")}<span>${cur + 1} of ${pg.length}</span>${btn("pr:next", "▶", "pn", "Next page")}<span class="pz">${btn("pr:zout", "−", "z", "Zoom out")}<i class="zb"><i style="left:${Math.round(((R.zoom - 0.6) / 1) * 100)}%"></i></i>${btn("pr:zin", "+", "z", "Zoom in")}<span>${Math.round(R.zoom * 100)}%</span></span></div></div></div>`;
      } else
        main = `<h2>Good afternoon</h2><div class="wd-new">${deco('<span class="blank"></span><span>Blank document</span>', "tpl")}</div><div class="lh">Recent</div><div class="fake">${ic("docfile")} ${esc(st.doc.name)}.docx</div>`;
      return `<div class="wd-file"><div class="fnav">${btn("file-back", "⬅", "back", "Back")}${nav.map(([k, t]) => (k === "-" ? '<span class="sep"></span>' : k ? btn("file:" + k, t, st.file === k ? "on" : "") : `<span class="fi2">${t}</span>`)).join("")}</div><div class="fmain">${main}</div></div>`;
    }
    function dialogs4() {
      const inp = (t, v, lab) =>
        `<input type="text" data-t="${t}" value="${esc(v)}" autocomplete="off" spellcheck="false" aria-label="${esc(lab)}">`;
      if (st.fd) {
        const F = st.fd;
        const f = curFmt();
        const by = parseFloat(F.by) || 0;
        const ls = F.sp === "Expanded" ? by : F.sp === "Condensed" ? -by : 0;
        const sample =
          selWords()
            .map((w) => w.t)
            .join(" ")
            .slice(0, 40) || "Aptos";
        return `<div class="wd-dlg wd-fd"><div class="bar"><b>Font</b>${btn("fd:cancel", "✕", "x", "Close")}</div>
          <div class="fdt">${btn("fd:tab:Font", "Font", "tb" + (F.tab === "Font" ? " on" : ""))}${btn("fd:tab:Advanced", "Advanced", "tb" + (F.tab === "Advanced" ? " on" : ""))}</div>
          <div class="fdb">${
            F.tab === "Font"
              ? `<div class="g3"><label>Font:</label><label>Font style:</label><label>Size:</label><span class="fake">${esc(f.f)}</span><span class="fake">Regular</span><span class="fake">${f.s}</span></div><div class="lh">Effects</div><div class="fx">☐ Strikethrough &nbsp; ☐ Superscript &nbsp; ☐ Subscript</div>`
              : `<div class="lh">Character Spacing</div><div class="g4"><label>Scale:</label><span class="fake">100%</span><span></span><span></span><label>Spacing:</label>${btn("fd:spacing", `<span>${F.sp}</span>${chev}`, "box fdsp" + onM("fdsp"))}<label>By:</label>${inp("fd:by", F.by, "By")}<label>Position:</label><span class="fake">Normal</span><label>By:</label><span class="fake"></span></div>`
          }<div class="lh">Preview</div><div class="fprev"><span style="letter-spacing:${(ls / 11).toFixed(3)}em">${esc(sample)}</span></div></div>
          <div class="btns">${deco("Set As Default", "")}<span class="gap"></span>${btn("fd:ok", "OK", "pri")}${btn("fd:cancel", "Cancel", "")}</div></div>`;
      }
      if (st.rp) {
        const R = st.rp;
        return `<div class="wd-dlg wd-rp"><div class="bar"><b>Find and Replace</b>${btn("rp:cancel", "✕", "x", "Close")}</div>
          <div class="fdt"><span class="tb">Find</span><span class="tb on">Replace</span><span class="tb">Go To</span></div>
          <div class="rpf"><label>Find what:</label>${inp("rp:find", R.find, "Find what")}<label>Replace with:</label>${inp("rp:with", R.rep, "Replace with")}</div>
          <div class="btns">${deco("More &gt;&gt;", "")}<span class="gap"></span>${btn("rp:replace", "Replace", "")}${btn("rp:all", "Replace All", "")}${btn("rp:next", "Find Next", "")}${btn("rp:cancel", "Cancel", "")}</div>
          ${R.msg ? `<div class="rpmsg"><div class="mb"><b>Microsoft Word</b><p>${esc(R.msg)}</p>${btn("rp:ok", "OK", "pri")}</div></div>` : ""}</div>`;
      }
      if (st.ip) {
        const k = st.ip.pick;
        return `<div class="wd-dlg wd-ip"><div class="bar">${ic("word")}<b>Insert Picture</b>${btn("ip:cancel", "✕", "x", "Close")}</div>
          <div class="crumb">← → ↑ &nbsp; 💻 This PC › <b>Pictures</b></div>
          <div class="body"><div class="side">${["Desktop", "Documents", "Pictures"].map((f) => `<span class="wd-b fl${f === "Pictures" ? " on" : ""}">${ic("folder")}<span>${f}</span></span>`).join("")}</div>
          <div class="files thumbs">${Object.entries(DRAW)
            .map(([x, d]) =>
              btn(
                "ip:" + x,
                `<span class="th">${picSVG(x, true)}</span><span>${esc(d.name)}</span>`,
                "pfile" + (k === x ? " on" : ""),
              ),
            )
            .join("")}</div></div>
          <div class="fields"><label>File name:</label><span class="fake">${k ? esc(DRAW[k].name) : ""}</span><label>Type:</label><span class="fake">All Pictures</span></div>
          <div class="btns">${btn("ip:insert", "Insert", "pri" + (k ? "" : " dim"))}${btn("ip:cancel", "Cancel", "")}</div></div>`;
      }
      if (st.sad) {
        const D = st.sad;
        const all = Object.values(SALAYOUTS).flat();
        const list = D.cat === "All" ? all : SALAYOUTS[D.cat];
        const pick = all.find((x) => x[0] === D.pick);
        return `<div class="wd-dlg wd-sad"><div class="bar"><b>Choose a SmartArt Graphic</b>${btn("sad:cancel", "✕", "x", "Close")}</div>
          <div class="body"><div class="side">${["All", ...Object.keys(SALAYOUTS)].map((c) => btn("sacat:" + c, `<span>${c}</span>`, "fl" + (D.cat === c ? " on" : ""))).join("")}</div>
          <div class="files lays">${list.map(([x, n, ok]) => (ok ? btn("sal:" + x, saThumb(x), "lay" + (D.pick === x ? " on" : ""), n) : `<span class="wd-b lay deco" aria-label="${esc(n)}">${saThumb(x)}</span>`)).join("")}</div>
          <div class="desc">${pick ? `<div class="big">${saThumb(pick[0])}</div><b>${esc(pick[1])}</b><p>${esc(SADESC[pick[0]] || "")}</p>` : ""}</div></div>
          <div class="btns">${btn("sad:ok", "OK", "pri" + (D.pick ? "" : " dim"))}${btn("sad:cancel", "Cancel", "")}</div></div>`;
      }
      return "";
    }
    // Read Mode: the whole screen is the text, in columns; View › Edit Document goes back
    function readMode() {
      if (st.view !== "read") return "";
      const body = st.doc.paras
        .map((P) =>
          P.o
            ? P.o.type === "pic"
              ? `<div class="rpic">${picSVG(P.o.k, true, "0 0 200 140", P.o.nobg)}</div>`
              : ""
            : `<p class="${P.h ? "h" + P.h : ""}">${esc(P.w.map((w) => w.t).join(" "))}</p>`,
        )
        .join("");
      return `<div class="wd-read"><div class="rbar"><span class="rb">File</span><span class="rb">Tools</span>${btn("rm:view", "View", "rb" + onM("rmview"))}<span class="rt">${esc(st.doc.name)} - Word</span></div><div class="rbody">${body}</div><span class="rarr">▶</span></div>`;
    }
    function ruler() {
      if (!st.ruler || st.view !== "print") return "";
      const P = st.doc.paras[selParas()[0]] || {};
      return `<div class="wd-ruler"><span class="mg l"></span><span class="mg r"></span>${Array.from({ length: 12 }, (_, i) => `<b style="left:${50 + (i + 1) * 38}px">${i + 1}</b>`).join("")}<i class="ind" style="left:${50 + (P.indent || 0) * 36}px"></i></div>`;
    }
    function dialog() {
      if (!st.dlg) return dialogs4();
      const fs = ["Downloads", "Documents", "Pictures", "Music", "Videos"];
      return `<div class="wd-dlg"><div class="bar">${ic("word")}<b>Save As</b>${btn("dlg:cancel", "✕", "x", "Close")}</div>
        <div class="crumb">← → ↑ &nbsp; 📁 › <b>${esc(st.dlg.folder)}</b></div>
        <div class="body"><div class="side">${fs.map((f) => btn("dlg:nav:" + f, `${ic("folder")}<span>${f}</span>`, "fl" + (st.dlg.folder === f ? " on" : ""))).join("")}</div><div class="files">${st.dlg.folder === "Documents" ? '<span class="muted">No items match your search.</span>' : ""}</div></div>
        <div class="fields"><label>File name:</label><input type="text" data-t="dlg:filename" value="${esc(st.dlg.name)}" autocomplete="off" spellcheck="false"><label>Save as type:</label><span class="fake">Word Document (*.docx)</span></div>
        <div class="btns">${btn("dlg:save", "Save", "pri")}${btn("dlg:cancel", "Cancel", "")}</div></div>`;
    }
    function render() {
      if (!st) return;
      // keep the focus and the text cursor of an input while it is drawn again
      const a = document.activeElement;
      const keep =
        a && scr.contains(a) && a.tagName === "INPUT" && a.type === "text"
          ? { t: a.dataset.t, s: a.selectionStart, e: a.selectionEnd }
          : null;
      const words = st.doc.paras.reduce((n, p) => n + p.w.length, 0);
      scr.innerHTML = `<div class="wd-title">${ic("word")}<span class="as">AutoSave <i class="tg"></i> Off</span>${btn("qat-save", ic("save"), "q", "Save")}${btn("qat-undo", ic("undo"), "q" + (st.undo.length ? "" : " dim"), "Undo")}${btn("qat-redo", ic("redo"), "q" + (st.redo.length ? "" : " dim"), "Redo")}<span class="nm">${esc(st.doc.name)} - Word</span><span class="srch">${ic("find")} Search</span><span class="me">BA</span><span class="wc">— ☐ ✕</span></div>
      <div class="wd-tabs">${[...tabs, ...((selObj() && CTX[selObj().type]) || [])].map((t) => btn("tab:" + t, t, "tab" + (st.tab === t && t !== "File" ? " on" : "") + (t === "File" ? " file" : "") + (tabs.includes(t) ? "" : " ctx"))).join("")}<span class="cmt">💬 Comments</span></div>
      <div class="wd-ribbon">${ribbon()}</div>
      <div class="wd-body">${navPane()}<div class="wd-area${st.pen ? " pen" : ""}${st.placing ? " placing" : ""}" data-t="page">${ruler()}<div class="wd-page${st.marks ? " marks" : ""}${st.view === "web" ? " web" : ""}" style="font-size:${(15 * st.zoom) / 100}px">${page()}</div></div>${editorPane()}</div>
      <div class="wd-status"><span>Page 1 of ${pages().length}</span><span>${words} words</span><span class="views">${btn("view:read", ic("readmode"), "vb" + (st.view === "read" ? " on" : ""), "Read Mode")}${btn("view:print", ic("printlayout"), "vb" + (st.view === "print" ? " on" : ""), "Print Layout")}${btn("view:web", ic("weblayout"), "vb" + (st.view === "web" ? " on" : ""), "Web Layout")}</span>${btn("zoom:out", "−", "z", "Zoom out")}<input type="range" data-t="zoom-range" min="50" max="200" step="10" value="${st.zoom}" aria-label="Zoom">${btn("zoom:in", "+", "z", "Zoom in")}<span class="pct">${st.zoom}%</span></div>
      ${readMode()}${menus()}${backstage()}${dialog()}
      ${st.toast ? `<div class="wd-toast">${esc(st.toast)}</div>` : ""}
      <div class="wd-cursor${mis && mis.mode === "demo" ? " show" : ""}" aria-hidden="true" style="left:${cur.x}px;top:${cur.y}px"><svg viewBox="0 0 24 24"><path d="M3 2l15 11-7 1-3 7z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`;
      if (keep) {
        const el = scr.querySelector(`input[data-t="${keep.t}"]`);
        if (el) {
          el.focus({ preventScroll: true });
          try {
            el.setSelectionRange(keep.s, keep.e);
          } catch (e) {}
        }
      }
      // an open list sits under its button
      const mEl = scr.querySelector(".wd-menu");
      const anchor = {
        font: "font-name",
        size: "font-size",
        hl: "hl-arrow",
        color: "color-arrow",
        bullets: "bullets-arrow",
        symbol: "ins:symbol",
        spacing: "para:spacing",
        shade: "shade-arrow",
        borders: "borders-arrow",
        fdsp: "fd:spacing",
        pictures: "ins:pictures",
        shapes: "ins:shapes",
        pcolor: "pf:color",
        partistic: "pf:artistic",
        pborder: "pf:border",
        peffects: "pf:effects",
        pposition: "pf:position",
        pwrap: "pf:wrap",
        sacol: "sad:colors",
        rmview: "rm:view",
        printer: "pr:printer",
        prwhat: "pr:what",
        orient: "pr:orient",
      }[st.menu];
      const aEl = anchor && find(anchor);
      if (mEl && aEl) {
        const c = center(aEl);
        const h = aEl.offsetHeight;
        mEl.style.left =
          Math.max(
            4,
            Math.min(
              SW - mEl.offsetWidth - 4,
              c.x -
                (anchor === "font-name" || anchor === "font-size"
                  ? aEl.offsetWidth / 2
                  : 20),
            ),
          ) + "px";
        mEl.style.top =
          Math.max(4, Math.min(SH - mEl.offsetHeight - 4, c.y + h / 2 + 2)) +
          "px";
      }
      if (mis && mis.glowing) glow(true);
    }

    /* ---------- the child's pointer and keyboard ---------- */
    const cur = { x: SW / 2, y: SH / 2 };
    const toScr = (cx, cy) => {
      const r = scr.getBoundingClientRect();
      return { x: (cx - r.left) / k, y: (cy - r.top) / k };
    };
    function center(el) {
      const r = el.getBoundingClientRect(),
        s = scr.getBoundingClientRect();
      return {
        x: (r.left + r.width / 2 - s.left) / k,
        y: (r.top + r.height / 2 - s.top) / k,
      };
    }
    // the place in the text under the finger: a word, the end of a paragraph, or the end of the text
    function posAt(cx, cy) {
      const el = document.elementFromPoint(cx, cy);
      if (!el || !scr.contains(el)) return null;
      const ps = el.closest(".wd-ps");
      if (ps) return { p: +ps.dataset.t.split(":")[1], w: -1, ps: true };
      const w = el.closest(".wd-w");
      if (w) {
        const [, p, i] = w.dataset.t.split(":");
        return { p: +p, w: +i };
      }
      const pa = el.closest(".wd-p");
      if (pa) {
        const p = +pa.dataset.t.split(":")[1];
        return { p, w: st.doc.paras[p].w.length - 1 };
      }
      if (el.closest(".wd-area")) {
        const p = st.doc.paras.length - 1;
        return { p, w: st.doc.paras[p].w.length - 1 };
      }
      return null;
    }
    const docStep = (s) =>
      s &&
      (s.act === "select" ||
        s.act === "type" ||
        ((s.act === "click" || s.act === "dbl") &&
          /^(w:|para:\d|page$|pstart:)/.test(s.t || "")));
    let press = null,
      clicks = { t: "", n: 0, time: 0 },
      raf = 0;
    scr.addEventListener("pointerdown", (e) => {
      if (e.button === 2) return;
      const inp = e.target.closest("input");
      if (inp) {
        if (mis && mis.mode === "demo") e.preventDefault();
        return;
      }
      const textEl = e.target.closest(".wd-area");
      const el = e.target.closest("[data-t]");
      if (!el) return;
      e.preventDefault();
      scr.focus({ preventScroll: true });
      // a picture, diagram or its handles are pressed like buttons; drawing a shape presses the page
      if (textEl && st.placing && !e.target.closest(".wd-menu")) {
        press = { el: textEl, text: false };
        return;
      }
      if (textEl && e.target.closest(".wd-obj")) {
        press = { el, text: false };
        return;
      }
      if (textEl && !e.target.closest(".wd-menu")) {
        if (mis && (mis.mode === "demo" || mis.busy)) return;
        if (mis && mis.mode === "try" && !docStep(mis.steps[mis.i])) {
          wrong(mis.steps[mis.i], "place", toScr(e.clientX, e.clientY));
          return;
        }
        const pos = posAt(e.clientX, e.clientY);
        if (!pos) return;
        press = {
          text: true,
          start: pos,
          moved: false,
          id: e.pointerId,
          x: e.clientX,
          y: e.clientY,
        };
        try {
          scr.setPointerCapture(e.pointerId);
        } catch (_) {}
        return;
      }
      press = { el, text: false };
    });
    scr.addEventListener("pointermove", (e) => {
      if (!press || !press.text) return;
      const pos = posAt(e.clientX, e.clientY);
      if (!pos || pos.w < 0) return;
      const s = press.start.w < 0 ? { p: press.start.p, w: 0 } : press.start;
      // a drag inside one word selects that word (like the letters of it in Word)
      const far = Math.hypot(e.clientX - press.x, e.clientY - press.y) > 8 * k;
      if (!press.moved && pos.p === s.p && pos.w === s.w && !far) return;
      press.moved = true;
      st.sel = range(s, pos);
      st.tw = null;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    });
    scr.addEventListener("pointerup", (e) => {
      if (!press) return;
      const pr = press;
      press = null;
      if (pr.text) {
        if (pr.moved) return user("select", "doc", {});
        const pos = pr.start;
        const t = pos.ps ? `pstart:${pos.p}` : `w:${pos.p}:${pos.w}`;
        const now = Date.now();
        clicks =
          clicks.t === t && now - clicks.time < 450
            ? { t, n: clicks.n + 1, time: now }
            : { t, n: 1, time: now };
        if (clicks.n === 3) {
          // three clicks: the whole paragraph
          st.sel = {
            a: { p: pos.p, w: 0 },
            b: { p: pos.p, w: st.doc.paras[pos.p].w.length - 1 },
          };
          return user("select", "doc", {});
        }
        return user(clicks.n === 2 ? "dbl" : "click", t, { pos });
      }
      const el = e.target.closest("[data-t]");
      if (!el || (el !== pr.el && !pr.el.contains(el))) return;
      user("click", pr.el.dataset.t, {});
    });
    scr.addEventListener("pointercancel", () => (press = null));
    // typing in the boxes (Find, file name) and moving the zoom slider
    scr.addEventListener("input", (e) => {
      const el = e.target;
      const t = el.dataset.t;
      if (mis && mis.mode === "demo") return;
      if (t === "zoom-range") {
        st.zoom = +el.value;
        const pct = scr.querySelector(".pct");
        if (pct) pct.textContent = st.zoom + "%";
        const pg = scr.querySelector(".wd-page");
        if (pg) pg.style.fontSize = (15 * st.zoom) / 100 + "px";
        const s = mis && mis.steps[mis.i];
        if (
          s &&
          s.act === "slide" &&
          ((s.min != null && st.zoom >= s.min) ||
            (s.max != null && st.zoom <= s.max))
        )
          advance();
        return;
      }
      onType(el);
    });
    scr.addEventListener("focusin", (e) => {
      const t = e.target.dataset && e.target.dataset.t;
      if (t === "dlg:filename" || t === "pr:copies") e.target.select();
    });
    // what a box on the screen holds
    function setInput(t, v) {
      if (t === "nav-search" && st.nav) st.nav.q = v;
      if (t === "dlg:filename" && st.dlg) st.dlg.name = v;
      if (t === "fd:by" && st.fd) st.fd.by = v;
      if (t === "rp:find" && st.rp) st.rp.find = v;
      if (t === "rp:with" && st.rp) st.rp.rep = v;
      if (t === "pr:copies") {
        st.pr.copiesTxt = v; // what the child typed, also an empty box
        st.pr.copies = Math.max(1, Math.min(99, parseInt(v, 10) || 1));
      }
      if (t === "pr:pages") {
        st.pr.pages = v;
        if (v.trim()) st.pr.what = "custom"; // Word switches to Custom Print
      }
      const o = selObj();
      if (/^sat:\d+$/.test(t) && o && o.items)
        o.items[+t.slice(4)] = v || "[Text]";
    }
    function onType(el) {
      const t = el.dataset.t;
      setInput(t, el.value);
      render();
      const s = mis && mis.mode === "try" && mis.steps[mis.i];
      if (s && s.act === "type" && s.t === t && norm(el.value) === norm(s.text))
        advance();
    }
    const norm = (x) =>
      String(x || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
    function keyName(e) {
      if (e.key === "F7") return "F7";
      if ((e.ctrlKey || e.metaKey) && e.key.length === 1)
        return "Ctrl+" + e.key.toUpperCase();
      if (e.key === "Enter") return e.shiftKey ? "Shift+Enter" : "Enter";
      if (e.key === "Backspace" || e.key === "Escape" || e.key === "Delete")
        return e.key;
      // Tab only while Mini Word has the focus (else it moves around the page)
      if (e.key === "Tab" && !e.shiftKey && document.activeElement === scr)
        return "Tab";
      return null;
    }
    const onDocKey = (e) => {
      if (!box.isConnected) return;
      const a = document.activeElement;
      if (a && a.tagName === "INPUT" && scr.contains(a)) {
        if (e.key === "Enter") e.preventDefault();
        return;
      }
      // typing in a box somewhere else on the page is not for Mini Word
      if (
        a &&
        !scr.contains(a) &&
        (a.tagName === "INPUT" ||
          a.tagName === "TEXTAREA" ||
          a.tagName === "SELECT" ||
          a.isContentEditable)
      )
        return;
      const name = keyName(e);
      if (name) {
        if (name !== "Escape") e.preventDefault();
        return keyFrom(name);
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (mis && (mis.mode === "demo" || mis.busy)) return;
        const s = mis && mis.steps[mis.i];
        if (mis && !(s && s.act === "type" && s.t === "doc")) return;
        e.preventDefault();
        typeChar(e.key);
        checkTyped();
      }
    };
    document.addEventListener("keydown", onDocKey);
    function keyFrom(key) {
      user("key", "key:" + key, {});
    }
    function checkTyped() {
      const s = mis && mis.mode === "try" && mis.steps[mis.i];
      if (
        s &&
        s.act === "type" &&
        s.t === "doc" &&
        norm(st.typed) === norm(s.text)
      )
        advance();
    }

    /* ---------- missions (the same as Mini Windows) ---------- */
    function target(s) {
      const P = st.doc.paras;
      if (s.t === "all") {
        const lp = P.length - 1;
        return { a: { p: 0, w: 0 }, b: { p: lp, w: P[lp].w.length - 1 } };
      }
      if (s.t.startsWith("para:")) {
        const p = +s.t.slice(5);
        return { a: { p, w: 0 }, b: { p, w: P[p].w.length - 1 } };
      }
      const [, p0, w0] = s.t.split(":");
      const [, p1, w1] = (s.to || s.t).split(":");
      return range({ p: +p0, w: +w0 }, { p: +p1, w: +w1 });
    }
    // the selection holds the words of the step, and nothing outside their paragraphs
    function selOk(s) {
      if (!st.sel) return false;
      const r = target(s);
      return (
        cmp(st.sel.a, r.a) <= 0 &&
        cmp(r.b, st.sel.b) <= 0 &&
        st.sel.a.p >= r.a.p &&
        st.sel.b.p <= r.b.p
      );
    }
    function match(s, kind, t) {
      if (s.act === "click")
        return (
          (kind === "click" && t === s.t) ||
          (kind === "key" && KEYOF[s.t] && t === "key:" + KEYOF[s.t])
        );
      if (s.act === "dbl") return kind === "dbl" && t === s.t;
      if (s.act === "key")
        return (
          (kind === "key" &&
            t.toLowerCase() === ("key:" + s.key).toLowerCase()) ||
          (kind === "click" && KEYS[s.key] === t)
        );
      return false;
    }
    function user(kind, t, info) {
      if (!mis) return perform(kind, t, info);
      if (mis.mode === "demo" || mis.busy) return;
      const s = mis.steps[mis.i];
      if (!s) return perform(kind, t, info);
      if (match(s, kind, t)) {
        perform(kind, t, info);
        advance();
        return;
      }
      if (
        s.act === "select" &&
        (kind === "select" ||
          ((kind === "dbl" || kind === "click") && /^w:/.test(t)))
      ) {
        perform(kind, t, info);
        if (selOk(s)) advance();
        else if (kind !== "click") wrong(s, "place");
        return;
      }
      if (s.act === "dbl" && kind === "click" && t === s.t)
        return perform(kind, t, info);
      if (
        s.act === "type" &&
        s.t === "doc" &&
        kind === "click" &&
        /^(w:|para:\d|page$|pstart:)/.test(t)
      )
        return perform(kind, t, info);
      if (s.act === "type" && kind === "click" && t === s.t) return;
      if (kind === "key" && s.act !== "key") {
        if (t === "key:Backspace") {
          if (s.act === "type" && s.t === "doc") perform(kind, t, info);
          return;
        }
        // another shortcut (Ctrl+A, Escape …): do it, it is not a mistake
        if (!/^key:(Shift\+)?Enter$/.test(t)) return perform(kind, t, info);
      }
      wrong(s, kind !== s.act && t === s.t ? "kind" : "place");
    }
    function wrong(s, why, p) {
      mis.wrongs++;
      if (p) ring(p.x, p.y, "no");
      mis.glowing = true;
      glow(true);
      mis.cb.onWrong && mis.cb.onWrong(s, why);
    }
    const find = (t) => {
      if (t == null) return null;
      const all = [...scr.querySelectorAll(`[data-t="${CSS.escape(t)}"]`)];
      return all.find((x) => x.offsetParent !== null) || all[0] || null;
    };
    function glow(on) {
      scr
        .querySelectorAll(".wd-glow")
        .forEach((x) => x.classList.remove("wd-glow"));
      if (!on || !mis) return;
      const s = mis.steps[mis.i];
      if (!s || !s.t) return;
      if (s.act === "select") {
        const r = target(s);
        eachIn(r, (w, p, i) => {
          const el = find(`w:${p}:${i}`);
          if (el) el.classList.add("wd-glow");
        });
        return;
      }
      if (s.act === "type" && s.t === "doc") {
        const c = scr.querySelector(".wd-caret");
        if (c) c.classList.add("wd-glow");
        return;
      }
      const el = find(s.t);
      if (el) el.classList.add("wd-glow");
    }
    async function advance() {
      if (!mis) return;
      const m = mis;
      m.busy = true;
      m.glowing = false;
      glow(false);
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
      st.typed = "";
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
      if (s.act === "type" && s.t !== "doc") {
        const inp = find(s.t);
        if (inp && matchMedia("(hover: hover)").matches)
          inp.focus({ preventScroll: true });
      }
      if ((s.act === "type" && s.t === "doc") || s.act === "key")
        scr.focus({ preventScroll: true });
      m.idle = setTimeout(() => {
        if (mis === m && m.i < m.steps.length) {
          m.glowing = true;
          glow(true);
        }
      }, m.helpAfter ?? 6000);
    }
    async function moveTo(x, y, ms = 650) {
      const c = scr.querySelector(".wd-cursor");
      if (!c) return;
      c.classList.add("show");
      c.style.transition = `left ${ms}ms ease,top ${ms}ms ease`;
      c.style.left = x + "px";
      c.style.top = y + "px";
      cur.x = x;
      cur.y = y;
      await wait(ms + 60);
    }
    function ring(x, y, cls) {
      const r = document.createElement("span");
      r.className = "wd-ring " + (cls || "");
      r.style.left = x + "px";
      r.style.top = y + "px";
      scr.appendChild(r);
      setTimeout(() => r.remove(), 700);
    }
    async function demoDo(s) {
      const m = mis;
      if (s.act === "look") {
        glow(true);
        await wait(Math.max(1400, s.wait || 0));
        glow(false);
        return;
      }
      if (s.act === "key") {
        const kd = document.createElement("div");
        kd.className = "wd-key";
        kd.textContent = s.key === "Enter" ? "Enter ↩" : s.key;
        scr.appendChild(kd);
        await wait(1000);
        kd.remove();
        perform("key", "key:" + s.key, {});
        return;
      }
      if (s.act === "select") {
        const r = target(s);
        const list = [];
        eachIn(r, (w, p, i) => list.push({ p, w: i }));
        const first = find(`w:${list[0].p}:${list[0].w}`);
        if (!first) return;
        const c0 = center(first);
        await moveTo(c0.x - first.offsetWidth / 2, c0.y);
        for (const pos of list) {
          if (mis !== m) return;
          st.sel = range(list[0], pos);
          render();
          const el = find(`w:${pos.p}:${pos.w}`);
          if (el) {
            const c = center(el);
            await moveTo(c.x + el.offsetWidth / 2, c.y, 110);
          }
        }
        perform("select", "doc", {});
        return;
      }
      if (s.act === "type" && s.t === "doc") {
        for (const ch of s.text) {
          if (mis !== m) return;
          typeChar(ch);
          await wait(110);
        }
        return;
      }
      const el = find(s.t);
      if (!el) return;
      el.classList.add("wd-glow");
      const c = center(el);
      await moveTo(c.x, c.y);
      if (mis !== m) return;
      if (s.act === "type") {
        el.value = "";
        for (let i = 1; i <= s.text.length; i++) {
          const e2 = find(s.t);
          if (!e2 || mis !== m) return;
          e2.value = s.text.slice(0, i);
          setInput(s.t, e2.value);
          render();
          await wait(120);
        }
        return;
      }
      if (s.act === "slide") {
        const to = s.min != null ? s.min + 10 : s.max - 10;
        while (st.zoom !== to && mis === m) {
          st.zoom += st.zoom < to ? 10 : -10;
          render();
          await wait(90);
        }
        return;
      }
      ring(c.x, c.y);
      if (s.act === "dbl") {
        await wait(160);
        ring(c.x, c.y);
      }
      await wait(250);
      const pos = /^w:/.test(s.t)
        ? { p: +s.t.split(":")[1], w: +s.t.split(":")[2] }
        : /^pstart:/.test(s.t)
          ? { p: +s.t.split(":")[1], w: -1 }
          : null;
      perform(s.act === "dbl" ? "dbl" : "click", s.t, { pos });
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
      const c = scr.querySelector(".wd-cursor");
      if (c) c.classList.toggle("show", mis.mode === "demo");
      step();
    }
    function stop() {
      if (mis) clearTimeout(mis.idle);
      mis = null;
      glow(false);
      const c = scr.querySelector(".wd-cursor");
      if (c) c.classList.remove("show");
    }
    // the word button under the screen: type the text of the current "type" step for the child
    async function typeFor() {
      if (!mis) return;
      const s = mis.steps[mis.i];
      if (!s || s.act !== "type") return;
      const m = mis;
      m.busy = true;
      if (s.t === "doc") {
        for (const ch of s.text.slice(st.typed.length)) {
          typeChar(ch);
          await wait(90);
          if (mis !== m) return;
        }
        m.busy = false;
        checkTyped();
        return;
      }
      for (let i = 1; i <= s.text.length; i++) {
        const el = find(s.t);
        if (!el || mis !== m) return;
        el.value = s.text.slice(0, i);
        setInput(s.t, el.value);
        if (i < s.text.length) render();
        await wait(100);
      }
      m.busy = false;
      onType(find(s.t));
    }

    setup(opts.start);
    return {
      setup,
      run,
      stop,
      find,
      render,
      typeFor,
      pressKey: keyFrom,
      showHelp: () => {
        if (mis) {
          mis.glowing = true;
          glow(true);
        }
      },
      destroy() {
        stop();
        timers.forEach(clearTimeout);
        clearTimeout(toastT);
        document.removeEventListener("keydown", onDocKey);
        if (ro) ro.disconnect();
        box.innerHTML = "";
        box.classList.remove("wd-box");
      },
      get state() {
        return st;
      },
      get mission() {
        return mis;
      },
    };
  }

  // name, icon and help line used by the lesson pages for the free-play tile
  window.WordSim = {
    create,
    icon,
    ICONS: IC,
    label: "Mini Word",
    ic: "📝",
    hint: "A pretend Word. Select text, press the buttons, type. Nothing can break!",
    about: "Play on a pretend Word",
  };
})();
