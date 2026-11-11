// Mini Outlook and Mini Edge: a pretend Outlook (new Outlook) and Edge, as in the Grade 4 book Unit 3 « Communicating online », for the Computer
// lessons, made the same way as Mini Word (shared/wordsim.js) so the lesson engine (shared/computer-lesson.js) can use it.
// NetSim.create(box, {start}) draws it inside box. Everything the child can press has data-t="<target>":
//   taskbar "task:outlook"; left rail "rail:mail" "rail:people";
//   Mail: "ol:newmail" "ol:delete" "ol:reply" "ol:replyall" "ol:forward", folders "fold:Inbox" ("Sent Items", "Drafts",
//   "Deleted Items"), messages "msg:<id>" (school, great, healthy, party, apples), the reading pane "rd:reply" "rd:replyall"
//   "rd:forward", an attachment "att:<file>" (right-click → "attm:preview" "attm:open" "attm:onedrive" "attm:copy" "attm:saveas"),
//   New mail / Reply / Forward: "cm:send" "cm:discard" "cm:to" "cm:cc" "cm:bcc" "cm:subject" "cm:body" (inputs; click the body
//   to write in it) "cm:ccbtn" "cm:bccbtn", "cm:attach" → "attach:browse" ("attach:onedrive" "attach:upload" "attach:link"),
//   an attached file "catt:<file>" (right-click → "cattm:preview" "cattm:open" "cattm:copy" "cattm:body" "cattm:onedrive"
//   "cattm:saveas" "cattm:remove"), a word with a red line "sp:<word>" → "spg:<suggestion>" "sp:ignoreall";
//   People: "pp:new" "pp:edit" "pp:delete" "pp:restore" "pp:fav" "pp:mail", lists "pnav:fav" "pnav:all" "pnav:lists"
//   "pnav:deleted", a contact "ct:<First name>", the contact card "card:edit", New / Edit contact "nc:photo" → "photo:<0-5>",
//   "nc:first" "nc:last" "nc:email" "nc:phone" "nc:address" "nc:company" "nc:notes" (inputs) "nc:save" "nc:cancel";
//   the Open / Save As window "fd:nav:<folder>" (Downloads Documents Pictures Music Videos) "fd:file:<name>" "fd:name" (input)
//   "fd:open" "fd:save" "fd:cancel"; a preview "pv:close".
// Mini Edge: taskbar "task:edge"; "e:addr" (input, then key Enter) "e:back" "e:refresh" "e:newtab" "e:tab:<i>" "e:close:<i>",
//   the New tab search box "e:search" (input); Google "g:images" "g:q" (input, then Enter) "g:go", results "g:tab:All|Images|Videos"
//   "g:tools" → "g:size" "g:color" "g:rights" (Images) "g:dur" (Videos) → "opt:<choice>" (Large, Medium, Icon, Red …,
//   Creative Commons licenses, Short (0-4 min) …), a picture "gimg:<i>" (right-click → "cx:saveimg" "cx:copyimg" …), the big
//   picture "g:big" (right-click too) "g:lens" "g:close", a video "gvid:<i>" → "yt:play"; outlook.live.com: "ms:email" (input)
//   "ms:next" "ms:pass" (input) "ms:signin" "ms:back", the Save password bubble "pw:never" "pw:save", Outlook on the web
//   (the same targets as Outlook) and the account picture "acct" → "acct:signout".
// Steps: {act: "click"|"dbl"|"right"|"type"|"key"|"look", t, say}; type: {act: "type", t: "cm:to", text}; key: {act: "key",
//   t: "key:Enter", key: "Enter"}. A type in "cm:body" is done when the body holds the text.
// A start: {me: "stella" | "marco" | "tom", view: "mail" | "people", folder: "Inbox", open: "<mail id>", mails: [ids],
//   compose: {kind: "new" | "reply" | "forward", of: "<mail id>", to, cc, bcc, subject, body, att: ["apples.png"], cc: true …},
//   contacts: ["marco", "alex"] (who is in People; default alex, lisa, tom), sel: "Marco" (a selected contact), fav: ["Alex"],
//   nc: true (the New contact window), files: {Pictures: [{name: "apples", ext: "png", e: "🍎"}]} (more files on the computer),
//   app: "edge" (Mini Edge in front), page: "newtab" | "google" | "gimages" | "results" | "login" | "outlook", q: "healthy food"
//   (the search of "results"), itab: "Images" | "Videos", tools: true, signed: true (signed in to outlook.live.com),
//   askSave: true (Edge asks to save the password after signing in)}.
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

  /* ---------- icons (20 × 20, drawn) ---------- */
  const sv = (body, vb = "0 0 20 20") =>
    `<svg viewBox="${vb}" aria-hidden="true">${body}</svg>`;
  const S = 'fill="none" stroke="currentColor" stroke-width="1.4"';
  const IC = {
    mail: sv(
      `<rect x="2.5" y="4.5" width="15" height="11" rx="1.5" ${S}/><path d="M3 5.5l7 5.5 7-5.5" ${S}/>`,
    ),
    railmail: sv(
      '<rect x="2" y="5" width="16" height="11" rx="2" fill="#0f6cbd"/><path d="M2.5 6l7.5 5.5L17.5 6" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M5 3h10" stroke="#0f6cbd" stroke-width="1.6"/>',
    ),
    calendar: sv(
      '<rect x="3" y="4" width="14" height="13" rx="2" fill="#0f6cbd"/><rect x="4.5" y="8" width="11" height="7.5" fill="#fff"/><path d="M7 10h1M10 10h1M13 10h1M7 13h1M10 13h1" stroke="#0f6cbd" stroke-width="1.4"/>',
    ),
    people: sv(
      '<circle cx="7.5" cy="7" r="3" fill="#0f6cbd"/><circle cx="13.5" cy="8" r="2.4" fill="#5ea6e8"/><path d="M2 16c0-3 2.5-5 5.5-5s5.5 2 5.5 5z" fill="#0f6cbd"/><path d="M12 16c0-2 1-4 3-4s3.5 1.6 3.5 4z" fill="#5ea6e8"/>',
    ),
    groups: sv(
      '<circle cx="6" cy="7" r="2.4" fill="#4f6bed"/><circle cx="14" cy="7" r="2.4" fill="#4f6bed"/><circle cx="10" cy="9" r="2.8" fill="#2b3fb3"/><path d="M4 16c0-3 2.6-5 6-5s6 2 6 5z" fill="#2b3fb3"/>',
    ),
    todo: sv(
      '<path d="M3 10.5l4.5 4.5L17 5" fill="none" stroke="#2564cf" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
    word: sv(
      '<rect x="6" y="3" width="12" height="14" rx="1.5" fill="#41a5ee"/><rect x="2" y="6" width="9" height="9" rx="1.2" fill="#185abd"/><path d="M3.8 8.3l1 4.5 1.2-3.6 1.2 3.6 1-4.5" fill="none" stroke="#fff" stroke-width="1"/>',
    ),
    excel: sv(
      '<rect x="6" y="3" width="12" height="14" rx="1.5" fill="#33c481"/><rect x="2" y="6" width="9" height="9" rx="1.2" fill="#107c41"/><path d="M4.3 8.2l3.4 4.6M7.7 8.2l-3.4 4.6" stroke="#fff" stroke-width="1.2"/>',
    ),
    ppt: sv(
      '<circle cx="11.5" cy="10" r="6.5" fill="#ff8f6b"/><rect x="2" y="6" width="9" height="9" rx="1.2" fill="#c43e1c"/><path d="M5 13V8.3h1.8a1.3 1.3 0 010 2.6H5" fill="none" stroke="#fff" stroke-width="1.1"/>',
    ),
    apps: sv(
      `<rect x="3" y="3" width="6" height="6" rx="1.5" ${S}/><rect x="11" y="3" width="6" height="6" rx="1.5" ${S}/><rect x="3" y="11" width="6" height="6" rx="1.5" ${S}/><rect x="11" y="11" width="6" height="6" rx="1.5" ${S}/>`,
    ),
    newmail: sv(
      `<rect x="2.5" y="4.5" width="15" height="11" rx="1.5" ${S}/><path d="M3 5.5l7 5.5 7-5.5" ${S}/>`,
    ),
    newcontact: sv(
      `<circle cx="8" cy="7" r="3.2" ${S}/><path d="M2.5 17c0-3.2 2.4-5.5 5.5-5.5 1.2 0 2.2.3 3.1.9" ${S}/><path d="M15 11v6M12 14h6" ${S}/>`,
    ),
    edit: sv(
      `<path d="M4 16l1-4 8.5-8.5 3 3L8 15z" ${S}/><path d="M11.5 5.5l3 3" ${S}/>`,
    ),
    trash: sv(
      `<path d="M4 5.5h12M8 5.5V4h4v1.5M5.5 5.5l.8 11h7.4l.8-11" ${S}/><path d="M8.5 8.5v5.5M11.5 8.5v5.5" ${S}/>`,
    ),
    restore: sv(
      `<path d="M5 8h7a4 4 0 010 8H8" ${S}/><path d="M8 5L5 8l3 3" ${S}/>`,
    ),
    archive: sv(
      `<rect x="3" y="4" width="14" height="4" rx="1" ${S}/><path d="M4.5 8v8h11V8M8 11h4" ${S}/>`,
    ),
    report: sv(
      `<path d="M10 2.5l6 2.2v4.6c0 4-2.6 6.6-6 8.2-3.4-1.6-6-4.2-6-8.2V4.7z" ${S}/><path d="M10 6.5v4.5M10 13.2v.4" ${S}/>`,
    ),
    moveto: sv(
      `<path d="M2.5 5.5h5l1.5 1.5h8.5v8.5h-15z" ${S}/><path d="M9 11.5h5M12 9.5l2 2-2 2" ${S}/>`,
    ),
    reply: sv(
      `<path d="M8 5L3 10l5 5" ${S}/><path d="M3.5 10H12a5 5 0 015 5v1" ${S}/>`,
    ),
    replyall: sv(
      `<path d="M7 5L2 10l5 5M11 5l-5 5 5 5" ${S}/><path d="M6.5 10H13a4 4 0 014 4v2" ${S}/>`,
    ),
    forward: sv(
      `<path d="M12 5l5 5-5 5" ${S}/><path d="M16.5 10H8a5 5 0 00-5 5v1" ${S}/>`,
    ),
    star: sv(
      `<path d="M10 2.8l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5L2.8 8l5-.6z" ${S}/>`,
    ),
    starfill: sv(
      '<path d="M10 2.8l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5L2.8 8l5-.6z" fill="#f5b800" stroke="#c48a00" stroke-width="1"/>',
    ),
    addlist: sv(
      `<circle cx="7" cy="7" r="2.6" ${S}/><path d="M2.5 15c0-2.7 2-4.5 4.5-4.5M12 8h6M12 11.5h6M12 15h6" ${S}/>`,
    ),
    manage: sv(
      `<circle cx="7.5" cy="7" r="3" ${S}/><path d="M2.5 16.5c0-3 2.2-5 5-5s5 2 5 5M14 6h4M14 9h4" ${S}/>`,
    ),
    flag: sv(`<path d="M5 17V3.5M5 4h10l-2.5 3.5L15 11H5" ${S}/>`),
    readunread: sv(
      `<path d="M2.5 8.5L10 4l7.5 4.5v8h-15z" ${S}/><path d="M3 9l7 4.5L17 9" ${S}/>`,
    ),
    attach: sv(
      `<path d="M14.5 9.5l-5.6 5.6a3.2 3.2 0 01-4.5-4.5l6.3-6.3a2.2 2.2 0 013.1 3.1l-6.2 6.2a1.1 1.1 0 01-1.6-1.6l5.5-5.5" ${S}/>`,
    ),
    camera: sv(
      '<path d="M3 6.5h3l1.5-2h5L14 6.5h3v9.5H3z" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="10" cy="11" r="3" fill="none" stroke="#fff" stroke-width="1.5"/>',
    ),
    phone: sv(
      `<path d="M6 3l2.2 3.6-1.6 1.6a8 8 0 004.2 4.2l1.6-1.6L16 13l-1.3 2.6c-5.4 0-11.3-5.9-11.3-11.3z" ${S}/>`,
    ),
    home: sv(`<path d="M3 9.5L10 3.5l7 6M5 8v8.5h10V8" ${S}/>`),
    building: sv(
      `<rect x="4" y="3" width="12" height="14" ${S}/><path d="M7 6.5h2M11 6.5h2M7 10h2M11 10h2M9 17v-3h2v3" ${S}/>`,
    ),
    note: sv(
      `<path d="M4 3h9l3 3v11H4z" ${S}/><path d="M7 8h6M7 11h6M7 14h4" ${S}/>`,
    ),
    tag: sv(
      `<path d="M3 3h7l7 7-7 7-7-7z" ${S}/><circle cx="7" cy="7" r="1.2" ${S}/>`,
    ),
    person: sv(
      `<circle cx="10" cy="7" r="3.3" ${S}/><path d="M3.5 17c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" ${S}/>`,
    ),
    personfill: sv(
      '<circle cx="10" cy="6.5" r="3.5" fill="currentColor"/><path d="M3 17c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5z" fill="currentColor"/>',
    ),
    lists: sv(
      `<circle cx="6" cy="6.5" r="2.3" ${S}/><circle cx="12" cy="6.5" r="2.3" ${S}/><path d="M2 14.5c0-2.4 1.8-4 4-4s4 1.6 4 4M14 10.5h4M14 13.5h4" ${S}/>`,
    ),
    search: sv(
      `<circle cx="8.5" cy="8.5" r="5" ${S}/><path d="M12.3 12.3L17 17" ${S}/>`,
    ),
    chev: sv(`<path d="M5.5 8l4.5 4.5L14.5 8" ${S}/>`),
    chevr: sv(`<path d="M8 5.5l4.5 4.5L8 14.5" ${S}/>`),
    close: sv(`<path d="M5 5l10 10M15 5L5 15" ${S}/>`),
    menu: sv(`<path d="M3 5.5h14M3 10h14M3 14.5h14" ${S}/>`),
    plus: sv(`<path d="M10 4v12M4 10h12" ${S}/>`),
    pc: sv(
      `<rect x="2.5" y="4" width="15" height="9.5" rx="1" ${S}/><path d="M6.5 16.5h7M10 13.5v3" ${S}/>`,
    ),
    cloud: sv(
      '<path d="M6 15.5h9.5a3.2 3.2 0 00.3-6.4 4.6 4.6 0 00-8.8-1A3.8 3.8 0 006 15.5z" fill="#0f6cbd"/>',
    ),
    upload: sv(`<path d="M10 14V4M6 8l4-4 4 4M4 16.5h12" ${S}/>`),
    link: sv(
      `<path d="M8.5 11.5a3 3 0 004.2 0l3-3a3 3 0 00-4.2-4.2l-1 1M11.5 8.5a3 3 0 00-4.2 0l-3 3a3 3 0 004.2 4.2l1-1" ${S}/>`,
    ),
    preview: sv(
      `<path d="M5 2.5h7l3.5 3.5v11.5H5z" ${S}/><circle cx="9.5" cy="11" r="2.5" ${S}/><path d="M11.3 12.8l2 2" ${S}/>`,
    ),
    open: sv(
      `<path d="M2.5 15.5V4.5h5l1.5 1.5h6v2.5" ${S}/><path d="M2.5 15.5L5 9h12.5L15 15.5z" ${S}/>`,
    ),
    copy: sv(
      `<rect x="6.5" y="6.5" width="10" height="11" rx="1" ${S}/><path d="M4 13.5V3.5h9" ${S}/>`,
    ),
    saveas: sv(
      `<path d="M3.5 3.5h10l3 3v10h-13z" ${S}/><path d="M6.5 3.5v4h6v-4M6.5 16.5v-5h7v5" ${S}/>`,
    ),
    insertimg: sv(
      `<rect x="2.5" y="4" width="15" height="12" rx="1" ${S}/><path d="M4 14l4-4 3 3 2-2 3 3" ${S}/>`,
    ),
    folder: sv(
      '<path d="M2 5.5a1 1 0 011-1h4.5l1.5 1.5H17a1 1 0 011 1v8.5a1 1 0 01-1 1H3a1 1 0 01-1-1z" fill="#f8c94b"/><path d="M2 8h16v7.5a1 1 0 01-1 1H3a1 1 0 01-1-1z" fill="#ffd968"/>',
    ),
    download: sv(`<path d="M10 3v10M6 9l4 4 4-4M4 16.5h12" ${S}/>`),
    documents: sv(
      `<path d="M5 2.5h7l3.5 3.5v11.5H5z" ${S}/><path d="M7.5 9h6M7.5 12h6M7.5 15h4" ${S}/>`,
    ),
    pictures: sv(
      `<rect x="2.5" y="4" width="15" height="12" rx="1" fill="#2c8ad8"/><path d="M4 14l4-4 3 3 2-2 3 3" fill="none" stroke="#fff" stroke-width="1.3"/>`,
    ),
    music: sv(
      '<circle cx="10" cy="10" r="7.5" fill="#e0443a"/><path d="M9 13.5V6.5l4-1v6.5" fill="none" stroke="#fff" stroke-width="1.4"/><circle cx="7.8" cy="13.6" r="1.5" fill="#fff"/><circle cx="11.8" cy="12.2" r="1.5" fill="#fff"/>',
    ),
    videos: sv(
      `<rect x="2.5" y="4.5" width="15" height="11" rx="1" fill="#7a5ad6"/><path d="M8.5 7.5v5l4.2-2.5z" fill="#fff"/>`,
    ),
    up: sv(`<path d="M10 16V4M5.5 8.5L10 4l4.5 4.5" ${S}/>`),
    back: sv(`<path d="M16 10H4M8.5 5.5L4 10l4.5 4.5" ${S}/>`),
    fwd: sv(`<path d="M4 10h12M11.5 5.5L16 10l-4.5 4.5" ${S}/>`),
    refresh: sv(
      `<path d="M15.5 9.5a5.5 5.5 0 11-1.6-3.9M15.5 3.5v3h-3" ${S}/>`,
    ),
    send: sv('<path d="M2.5 3l15 7-15 7 2-7z" fill="currentColor"/>'),
    bold: '<b style="font:700 13px Georgia,serif">B</b>',
    italic: '<i style="font:italic 13px Georgia,serif">I</i>',
    underline: '<u style="font:13px Georgia,serif">U</u>',
    strike: '<s style="font:13px Georgia,serif">S</s>',
    hl: sv(
      '<path d="M5 13l6-8 3 2-6 8H5z" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="3" y="16" width="14" height="2.5" fill="#ffe800"/>',
    ),
    fontcolor: sv(
      '<path d="M6 13l4-10 4 10M7.4 9.5h5.2" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="3" y="15.5" width="14" height="3" fill="#e0443a"/>',
    ),
    bullets: sv(
      `<circle cx="4.5" cy="5.5" r="1.2" fill="currentColor"/><circle cx="4.5" cy="10" r="1.2" fill="currentColor"/><circle cx="4.5" cy="14.5" r="1.2" fill="currentColor"/><path d="M8 5.5h9M8 10h9M8 14.5h9" ${S}/>`,
    ),
    spell: sv(
      `<path d="M3 13l3-9 3 9M4 10h4M11 13V4h2.5a2.2 2.2 0 010 4.5H11h3a2.3 2.3 0 010 4.5z" ${S}/><path d="M6 17l2 1.5 4-3.5" ${S}/>`,
    ),
    mic: sv(
      `<rect x="7.5" y="2.5" width="5" height="9" rx="2.5" ${S}/><path d="M4.5 9.5a5.5 5.5 0 0011 0M10 15v2.5" ${S}/>`,
    ),
    dots: sv(
      '<circle cx="4.5" cy="10" r="1.3" fill="currentColor"/><circle cx="10" cy="10" r="1.3" fill="currentColor"/><circle cx="15.5" cy="10" r="1.3" fill="currentColor"/>',
    ),
    ignore: sv(
      `<circle cx="10" cy="10" r="6.5" ${S}/><path d="M5.5 14.5l9-9" ${S}/>`,
    ),
    editor: sv(
      `<path d="M4 16l1-4 8.5-8.5 3 3L8 15z" fill="none" stroke="#0f6cbd" stroke-width="1.4"/>`,
    ),
    bell: sv(`<path d="M5 14V9a5 5 0 0110 0v5l1.5 1.5h-13zM8.5 17h3" ${S}/>`),
    gear: sv(
      `<circle cx="10" cy="10" r="2.6" ${S}/><path d="M10 2.5v2.4M10 15.1v2.4M2.5 10h2.4M15.1 10h2.4M4.7 4.7l1.7 1.7M13.6 13.6l1.7 1.7M4.7 15.3l1.7-1.7M13.6 6.4l1.7-1.7" ${S}/>`,
    ),
    edge: sv(
      '<circle cx="10" cy="10" r="8.5" fill="#1b8fd6"/><path d="M18.4 11.4A8.5 8.5 0 012.2 13c1.3 2 4.6 2.8 7.4 2 2.4-.7 3.6-2.6 3.1-3.7H8.1c-.2-2.3 1.6-4.2 4.6-4.2 3.3 0 5.4 2 5.7 4.3z" fill="#3fd18a"/><path d="M7.2 11.3c0-2.9 2.6-5.3 6-5.3a8.5 8.5 0 00-11 6.9c1 1.3 2.6 2.2 4.4 2.4a5 5 0 01.6-4z" fill="#0c59a4"/>',
    ),
    lock: sv(
      `<rect x="5" y="9" width="10" height="8" rx="1.5" ${S}/><path d="M7 9V6.5a3 3 0 016 0V9" ${S}/>`,
    ),
    lens: sv(
      '<circle cx="10" cy="10" r="8" fill="#fff" stroke="#5f6368" stroke-width="1.2"/><circle cx="10" cy="10.5" r="2.6" fill="none" stroke="#4285f4" stroke-width="1.6"/><path d="M5.5 8V5.5H8M12 5.5h2.5V8M14.5 12.5V15H12M8 15H5.5v-2.5" fill="none" stroke="#5f6368" stroke-width="1.2"/>',
    ),
    video: sv(
      `<rect x="2.5" y="5" width="11" height="10" rx="1.5" ${S}/><path d="M13.5 9l4-2.5v7l-4-2.5" ${S}/>`,
    ),
    star2: sv(
      `<path d="M10 3l2 4.3 4.7.5-3.5 3.2 1 4.6L10 13.3 5.8 15.6l1-4.6L3.3 7.8 8 7.3z" ${S}/>`,
    ),
    collections: sv(
      `<rect x="3" y="5" width="11" height="12" rx="1.5" ${S}/><path d="M6 3h10a1 1 0 011 1v11" ${S}/>`,
    ),
    bulb: sv(`<path d="M7 13.5a5 5 0 116 0V15H7zM8 17.5h4" ${S}/>`),
  };
  // the file pictures of the book (p. 112): document, image, audio, video, presentation, and a zip folder
  const page = (inner) =>
    sv(
      `<path d="M4 1.5h8.5L16.5 5.5v13H4z" fill="#fff" stroke="#8a8a8a" stroke-width="1"/><path d="M12.5 1.5v4h4" fill="#e6e6e6" stroke="#8a8a8a" stroke-width="1"/>${inner}`,
    );
  const FILEIC = {
    docx: page(
      '<path d="M6.5 8h7.5M6.5 10.5h7.5M6.5 13h7.5M6.5 15.5h5" stroke="#185abd" stroke-width="1.1"/>',
    ),
    txt: page(
      '<path d="M6.5 8h7.5M6.5 10.5h7.5M6.5 13h7.5M6.5 15.5h5" stroke="#7a7a7a" stroke-width="1.1"/>',
    ),
    png: page(
      '<rect x="5.5" y="7" width="9.5" height="8.5" fill="#bfe3f7"/><path d="M5.8 15.3l3-4 2 2.3 1.5-1.6 2.5 3.3z" fill="#5bb04a"/><circle cx="7.5" cy="9" r="1" fill="#f5c400"/>',
    ),
    mp3: page(
      '<path d="M6 10.5h1.6l2-1.8v6.3l-2-1.8H6z" fill="#f59a23"/><path d="M12 8.5v5.2M14.5 7.5v5.2M12 8.5l2.5-1" stroke="#333" stroke-width="1"/><circle cx="11.4" cy="13.8" r="1" fill="#333"/><circle cx="13.9" cy="12.8" r="1" fill="#333"/>',
    ),
    mp4: page(
      '<rect x="5.5" y="7.5" width="9.5" height="8" fill="#7d7166"/><rect x="7" y="8.7" width="6.5" height="5.6" fill="#bfe3f7"/><circle cx="10.2" cy="11.5" r="1.9" fill="#58a"/><path d="M9.6 10.5v2l1.6-1z" fill="#fff"/>',
    ),
    pptx: page(
      '<path d="M6 8h6M6 10.5h3M6 13h3M6 15.5h6" stroke="#e8534a" stroke-width="1.3"/><circle cx="12.5" cy="12.5" r="2.6" fill="#e8534a"/><path d="M12.5 12.5V9.9a2.6 2.6 0 012.6 2.6z" fill="#fff"/>',
    ),
    zip: sv(
      '<path d="M2 5.5a1 1 0 011-1h4.5l1.5 1.5H17a1 1 0 011 1v8.5a1 1 0 01-1 1H3a1 1 0 01-1-1z" fill="#f8c94b"/><path d="M2 8h16v7.5a1 1 0 01-1 1H3a1 1 0 01-1-1z" fill="#ffd968"/><path d="M10 8v8.5" stroke="#7a5a00" stroke-width="1.6" stroke-dasharray="1.2 1"/>',
    ),
  };
  FILEIC.jpg = FILEIC.png;
  FILEIC.doc = FILEIC.docx;
  FILEIC.wav = FILEIC.mp3;
  const ext = (f) => (String(f).match(/\.(\w+)$/) || [, ""])[1].toLowerCase();
  const fileIc = (f) => FILEIC[ext(f)] || FILEIC.txt;
  const isPic = (f) => /^(png|jpg|jpeg|gif)$/.test(ext(f));

  /* ---------- the people, mails and files of the book ---------- */
  const DIR = {
    stella: {
      first: "Stella",
      last: "",
      email: "stella-ba@outlook.com",
      full: "Stella Binary Academy",
    },
    marco: { first: "Marco", last: "", email: "marco.bacademy@outlook.com" },
    alex: {
      first: "Alex",
      last: "",
      email: "alex.bacademy@outlook.com",
      full: "Alex Binary Academy",
    },
    lisa: { first: "Lisa", last: "", email: "lisa-dt-ba@outlook.com" },
    tom: { first: "Tom", last: "", email: "tom.bacademy@outlook.com" },
    smith: { first: "Mrs.", last: "Smith", email: "teacher@school.com" },
  };
  const nameOf = (p) => p.full || [p.first, p.last].filter(Boolean).join(" ");
  const initials = (n) =>
    String(n || "?")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
  // the mails in the book's pictures; each one is in the Inbox of the person it was sent to
  const MAILS = [
    {
      id: "school",
      from: "marco",
      to: ["stella"],
      subject: "School project",
      body: "Hi Stella,\nDo you want to meet today at 6 p.m. to prepare tomorrow's school project?\nSee you later!\nMarco",
      time: "Thu 9/26",
      n: 1,
    },
    {
      id: "great",
      from: "stella",
      to: ["marco"],
      subject: "School project",
      body: "Great idea!!! See you tomorrow.\nStella",
      time: "Thu 9/26",
      n: 2,
    },
    {
      id: "healthy",
      from: "stella",
      to: ["marco"],
      subject: "Healthy food project",
      body: "Hi Marco,\nDo you want to meet tomorrow at 5 p.m. to prepare our school project?\nSee you soon,\nStella",
      time: "12:02 PM",
      n: 3,
    },
    {
      id: "party",
      from: "stella",
      to: ["marco"],
      subject: "Party invitation",
      body: "Hello friend, I'm having a birthday party this weekend. Can you come?\nStella",
      time: "2:20 PM",
      n: 4,
    },
    {
      id: "apples",
      from: "marco",
      to: ["stella"],
      subject: "Healthy food project",
      body: "Hello Stella,\nI am sending some photos for the project about healthy food.\nBest,\nMarco",
      time: "3:29 PM",
      att: ["apples.png"],
      n: 5,
    },
  ];
  // the files on the pretend computer (the Open and Save As windows); e = the picture of a photo
  const FILES = {
    Downloads: [],
    Documents: [
      { name: "MyHomework", ext: "docx" },
      { name: "Animals of my country", ext: "docx" },
      { name: "Class project", ext: "pptx" },
    ],
    Pictures: [
      { name: "apples", ext: "png", e: "🍎" },
      { name: "fruits", ext: "png", e: "🍇" },
      { name: "salad", ext: "png", e: "🥗" },
    ],
    Music: [{ name: "My song", ext: "mp3" }],
    Videos: [{ name: "Class party", ext: "mp4" }],
  };
  const PIC = { "apples.png": "🍎", "fruits.png": "🍇", "salad.png": "🥗" };
  const PHOTOS = ["🧒🏽", "👦🏻", "👧🏼", "🧑🏾", "🐶", "⚽"];
  // spelling: the words Mini Outlook underlines in red, with its suggestions (the book's p. 125 and p. 127)
  const MISS = {
    bik: ["bike", "Bik", "bikh"],
    todayy: ["Today", "Todays", "Toddy"],
    whait: ["wait", "white", "what"],
    frend: ["friend", "fend", "trend"],
    tomorow: ["tomorrow", "Tomorow"],
    becuase: ["because"],
    plese: ["please", "pulse"],
  };
  const FOLDERS = ["Inbox", "Sent Items", "Drafts", "Deleted Items"];

  /* ---------- what Google finds in Mini Edge: emoji "photos" with a size, a colour and usage rights ---------- */
  const img = (k, e, name, title, site, size, color, cc) => ({
    k,
    e,
    name,
    title,
    site,
    size,
    color,
    cc,
  });
  const IMGS = [
    // healthy food (book pp. 113–115)
    img(
      "food",
      "🥗",
      "healthy-foods",
      "Healthy Foods for Kids",
      "EatingWell",
      "Large",
      "Green",
      true,
    ),
    img(
      "food",
      "🫐",
      "superfoods",
      "10 superfoods to boost a healthy diet",
      "Harvard Health",
      "Large",
      "Purple",
      false,
    ),
    img(
      "food",
      "🥦",
      "super-healthy",
      "50 Foods That Are Super Healthy",
      "Healthline",
      "Medium",
      "Green",
      true,
    ),
    img(
      "food",
      "🥑",
      "heart-healthy",
      "23 Heart Healthy Foods",
      "Prevention",
      "Large",
      "Green",
      false,
    ),
    img("food", "🍎", "apples", "Apples", "EatingWell", "Medium", "Red", true),
    img(
      "food",
      "🐟",
      "fish",
      "Healthy fish for kids",
      "Kids Health",
      "Medium",
      "Blue",
      false,
    ),
    img("food", "🍊", "oranges", "Oranges", "Pixabay", "Icon", "Orange", true),
    img(
      "food",
      "🥛",
      "milk",
      "A glass of milk",
      "Healthline",
      "Icon",
      "White",
      true,
    ),
    // yellow fruits (p. 116)
    img(
      "fruit",
      "🍌",
      "bananas",
      "Bananas",
      "Pixabay",
      "Large",
      "Yellow",
      true,
    ),
    img(
      "fruit",
      "🍋",
      "lemons",
      "Lemons",
      "Wikipedia",
      "Medium",
      "Yellow",
      true,
    ),
    img(
      "fruit",
      "🍍",
      "pineapple",
      "Pineapple",
      "Fruit World",
      "Large",
      "Yellow",
      false,
    ),
    img("fruit", "🥭", "mango", "Mango", "Pixabay", "Medium", "Orange", true),
    img("fruit", "🍐", "pear", "Pear", "Fruit World", "Medium", "Green", false),
    img("fruit", "🍈", "melon", "Melon", "Pixabay", "Icon", "Yellow", true),
    // vegetables (p. 122)
    img("veg", "🥕", "carrots", "Carrots", "Pixabay", "Large", "Orange", true),
    img(
      "veg",
      "🥦",
      "broccoli",
      "Broccoli",
      "Wikipedia",
      "Large",
      "Green",
      true,
    ),
    img(
      "veg",
      "🍅",
      "tomatoes",
      "Tomatoes",
      "Garden Fun",
      "Medium",
      "Red",
      true,
    ),
    img(
      "veg",
      "🥒",
      "cucumber",
      "Cucumber",
      "Veggie Shop",
      "Medium",
      "Green",
      false,
    ),
    img("veg", "🌽", "corn", "Corn", "Pixabay", "Medium", "Yellow", true),
    img(
      "veg",
      "🍆",
      "eggplant",
      "Eggplant",
      "Veggie Shop",
      "Large",
      "Purple",
      false,
    ),
    img(
      "veg",
      "🫑",
      "pepper",
      "Green pepper",
      "Pixabay",
      "Icon",
      "Green",
      true,
    ),
    img(
      "veg",
      "🥬",
      "lettuce",
      "Lettuce",
      "Garden Fun",
      "Medium",
      "Green",
      false,
    ),
  ];
  // other searches (a favourite food, a pet): six pictures of the same thing
  const MORE = {
    pizza: ["🍕", "Red"],
    pasta: ["🍝", "Red"],
    spaghetti: ["🍝", "Red"],
    burger: ["🍔", "Brown"],
    rice: ["🍚", "White"],
    soup: ["🍲", "Orange"],
    cake: ["🍰", "Pink"],
    "ice cream": ["🍨", "Pink"],
    sushi: ["🍣", "Orange"],
    chicken: ["🍗", "Brown"],
    bread: ["🍞", "Brown"],
    cheese: ["🧀", "Yellow"],
    egg: ["🥚", "White"],
    strawberr: ["🍓", "Red"],
    grape: ["🍇", "Purple"],
    watermelon: ["🍉", "Red"],
    chocolate: ["🍫", "Brown"],
    cookie: ["🍪", "Brown"],
    falafel: ["🧆", "Brown"],
    taco: ["🌮", "Yellow"],
    sandwich: ["🥪", "Brown"],
    pancake: ["🥞", "Brown"],
    dumpling: ["🥟", "White"],
    noodle: ["🍜", "Yellow"],
    fries: ["🍟", "Yellow"],
    banana: ["🍌", "Yellow"],
    apple: ["🍎", "Red"],
    orange: ["🍊", "Orange"],
    cherr: ["🍒", "Red"],
    peach: ["🍑", "Orange"],
    cat: ["🐱", "Orange"],
    dog: ["🐶", "Brown"],
    horse: ["🐴", "Brown"],
    fish: ["🐟", "Blue"],
    bird: ["🐦", "Blue"],
    flower: ["🌸", "Pink"],
    car: ["🚗", "Red"],
    football: ["⚽", "Black and white"],
    soccer: ["⚽", "Black and white"],
  };
  const SITES = [
    "Pixabay",
    "Kids Health",
    "Wikipedia",
    "Food Network",
    "Healthline",
    "EatingWell",
  ];
  const SIZES = ["Large", "Medium", "Large", "Icon", "Medium", "Large"];
  function kindOf(q) {
    q = String(q || "").toLowerCase();
    if (/veg/.test(q)) return "veg";
    if (/fruit|yellow/.test(q)) return "fruit";
    if (/food|healthy|lunch|diet/.test(q)) return "food";
    return Object.keys(MORE).find((w) => q.includes(w)) || "";
  }
  function imagesFor(q) {
    const kk = kindOf(q);
    if (!kk) return [];
    if (MORE[kk]) {
      const [e, color] = MORE[kk];
      const W = kk.replace(/^\w/, (c) => c.toUpperCase());
      return ["", "Best ", "", "Homemade ", "", "Funny "].map((pre, i) =>
        img(
          kk,
          i % 2 ? e : e + e,
          `${kk.replace(/\s/g, "-")}-${i + 1}`,
          `${pre}${W} ${["photo", "for kids", "picture", "idea", "drawing", "clipart"][i]}`,
          SITES[i],
          SIZES[i],
          i === 4 ? "Black and white" : color,
          i % 2 === 0,
        ),
      );
    }
    return IMGS.filter((x) => x.k === kk);
  }
  const vid = (t, by, dur, e, d) => ({ t, by, dur, e, d });
  const VIDS = {
    fruit: [
      vid(
        "Learn Yellow Fruits in English! Yellow Fruit Vocabulary List ...",
        "YouTube · BalyanakTV · Oct 5, 2020",
        "2:08",
        "🍌🍋",
        "Hello, Colorful fruit list is going to be published! For this list, the color is yellow. We like to eat yellow fruits too!",
      ),
      vid(
        "Yellow Fruits Song for Kids",
        "YouTube · Kids Songs",
        "3:40",
        "🍍🍌",
        "Sing along with the yellow fruits!",
      ),
      vid(
        "How Do Bananas Grow?",
        "YouTube · Farm Life",
        "11:25",
        "🍌🌴",
        "Visit a banana farm and see how bananas grow.",
      ),
      vid(
        "A Day at the Fruit Market",
        "YouTube · Food Trips",
        "24:10",
        "🍋🥭",
        "A long walk around a big fruit market.",
      ),
    ],
    food: [
      vid(
        "Healthy Food for Kids",
        "YouTube · Kids Learning",
        "3:12",
        "🥗🍎",
        "Learn which foods help you grow strong.",
      ),
      vid(
        "Make a Healthy Lunch Box",
        "YouTube · Cooking Kids",
        "8:45",
        "🥪🥕",
        "Step by step: a healthy lunch box for school.",
      ),
      vid(
        "The Food Groups",
        "YouTube · Science Kids",
        "15:30",
        "🥦🥛",
        "Grains, fruits, vegetables, milk and protein.",
      ),
      vid(
        "Healthy Eating: A Full Day",
        "YouTube · Family Health",
        "32:00",
        "🍳🍲",
        "Breakfast, lunch and dinner the healthy way.",
      ),
    ],
    veg: [
      vid(
        "Vegetables Song for Kids",
        "YouTube · Kids Songs",
        "2:55",
        "🥕🥦",
        "Carrots, broccoli, peas and more!",
      ),
      vid(
        "Grow Your Own Vegetables",
        "YouTube · Garden Fun",
        "12:10",
        "🍅🌱",
        "Plant vegetables at home or at school.",
      ),
      vid(
        "A Visit to a Vegetable Farm",
        "YouTube · Farm Life",
        "22:40",
        "🌽🚜",
        "See how vegetables are picked.",
      ),
    ],
  };
  function videosFor(q) {
    const kk = kindOf(q);
    if (VIDS[kk]) return VIDS[kk];
    if (!MORE[kk]) return [];
    const [e] = MORE[kk];
    const W = kk.replace(/^\w/, (c) => c.toUpperCase());
    return [
      vid(
        `${W} for Kids`,
        "YouTube · Kids Learning",
        "3:05",
        e,
        `A short video about ${kk}.`,
      ),
      vid(
        `All About ${W}`,
        "YouTube · Fun Facts",
        "9:40",
        e + e,
        `Fun facts about ${kk}.`,
      ),
      vid(
        `${W}: The Long Story`,
        "YouTube · Documentaries",
        "28:15",
        e,
        `Everything about ${kk}.`,
      ),
    ];
  }
  const mins = (d) => {
    const [m, sec] = d.split(":").map(Number);
    return m + sec / 60;
  };
  const GOPTS = {
    gsize: ["size", ["Any size", "Large", "Medium", "Icon"]],
    gcolor: [
      "color",
      [
        "Any color",
        "Black and white",
        "Transparent",
        "Red",
        "Orange",
        "Yellow",
        "Green",
        "Blue",
        "Purple",
        "Pink",
        "White",
        "Brown",
      ],
    ],
    grights: [
      "rights",
      ["All", "Creative Commons licenses", "Commercial & other licenses"],
    ],
    gdur: [
      "dur",
      [
        "Any duration",
        "Short (0-4 min)",
        "Medium (4-20 min)",
        "Long (20+ min)",
      ],
    ],
  };
  const SWATCH = {
    Red: "#e53935",
    Orange: "#fb8c00",
    Yellow: "#fdd835",
    Green: "#43a047",
    Blue: "#1e88e5",
    Purple: "#8e24aa",
    Pink: "#ec407a",
    White: "#fff",
    Brown: "#795548",
  };
  const TINT = {
    Red: "#fdecea",
    Orange: "#fff1e0",
    Yellow: "#fffbe0",
    Green: "#eaf6ea",
    Blue: "#e6f1fc",
    Purple: "#f3e8f8",
    Pink: "#fde8f0",
    White: "#f4f4f4",
    Brown: "#f3ebe6",
    "Black and white": "#e9e9e9",
  };
  const CX = [
    ["cx:newtab", "Open link in new tab"],
    ["cx:newwin", "Open link in new window"],
    ["cx:inprivate", "Open link in InPrivate window"],
    ["cx:qr", "Create QR Code for this image"],
    ["cx:copylink", "Copy link"],
    ["cx:imgtab", "Open image in new tab"],
    ["cx:saveimg", "Save image as"],
    ["cx:copyimg", "Copy image"],
    ["cx:editimg", "Edit image"],
    ["cx:searchimg", "Search the web for image"],
    ["cx:collections", "Add to Collections"],
    ["cx:share", "Share"],
  ];

  // every target a lesson step may use (check.js tests the lessons' steps against these)
  const TARGETS = [
    /^task:outlook$/,
    /^rail:(mail|people)$/,
    /^ol:(newmail|delete|reply|replyall|forward)$/,
    /^fold:(Inbox|Sent Items|Drafts|Deleted Items)$/,
    /^msg:\w+$/,
    /^rd:(reply|replyall|forward)$/,
    /^att:.+$/,
    /^attm:(preview|open|onedrive|copy|saveas)$/,
    /^cm:(send|discard|to|cc|bcc|subject|body|ccbtn|bccbtn|attach)$/,
    /^attach:(browse|onedrive|upload|link)$/,
    /^catt:.+$/,
    /^cattm:(preview|open|copy|body|onedrive|saveas|remove)$/,
    /^sp:[a-z]+$/,
    /^spg:.+$/,
    /^sp:ignoreall$/,
    /^pp:(new|edit|delete|restore|fav|mail)$/,
    /^pnav:(fav|all|lists|deleted)$/,
    /^ct:.+$/,
    /^card:edit$/,
    /^nc:(photo|first|last|email|phone|address|company|notes|save|cancel)$/,
    /^photo:[0-5]$/,
    /^fd:nav:(Downloads|Documents|Pictures|Music|Videos)$/,
    /^fd:file:.+$/,
    /^fd:(name|open|save|cancel)$/,
    /^pv:close$/,
    /^task:edge$/,
    /^e:(addr|back|refresh|newtab|search)$/,
    /^e:(tab|close):\d$/,
    /^g:(images|q|go|tools|size|color|rights|dur|big|lens|close)$/,
    /^g:tab:(All|Images|Videos)$/,
    /^opt:.+$/,
    /^gimg:\d+$/,
    /^gvid:\d+$/,
    /^cx:\w+$/,
    /^yt:play$/,
    /^ms:(email|next|pass|signin|back)$/,
    /^pw:(never|save)$/,
    /^acct(:signout)?$/,
    /^key:\w+$/,
  ];

  const ic = (n) => `<span class="ns-i">${IC[n] || ""}</span>`;
  // for the lesson pages: a button of the book ("btn:newcontact"), a rail icon ("people"), a file ("file:docx")
  const BTNS = {
    newmail: ["newmail", "New mail", "blue"],
    newcontact: ["newcontact", "New contact", "blue"],
    editcontact: ["edit", "Edit contact", ""],
    deleted: ["trash", "Deleted", ""],
    delete: ["trash", "Delete", ""],
    fav: ["star", "Add to favorites", ""],
    forward: ["", "Forward", "word"],
    reply: ["reply", "Reply", ""],
    cc: ["", "Cc", "word"],
    bcc: ["", "Bcc", "word"],
    send: ["", "Send", "blue"],
    attach: ["attach", "", ""],
    saveas: ["saveas", "Save As", ""],
    ignoreall: ["ignore", "Ignore all", ""],
  };
  function icon(name) {
    const [base, arg] = String(name).split(":");
    if (base === "btn" && BTNS[arg]) {
      const [i, label, cls] = BTNS[arg];
      return `<span class="ns-bi ${cls}">${i ? ic(i) : ""}${label ? `<span>${esc(label)}</span>` : ""}</span>`;
    }
    if (base === "file")
      return `<span class="ns-ic">${FILEIC[arg] || FILEIC.txt}</span>`;
    if (base === "rail") return `<span class="ns-bi rail">${ic(arg)}</span>`;
    if (base === "photo")
      return `<span class="ns-bi cam">${ic("camera")}</span>`;
    // a bare icon name is drawn like a button of Outlook's left bar (the book's "How is this button used?")
    return IC[base] ? `<span class="ns-bi rail">${ic(base)}</span>` : "";
  }

  /* ================= one Mini Outlook ================= */
  function create(box, opts) {
    opts = opts || {};
    box.classList.add("ns-box");
    box.innerHTML = `<div class="ns-screen" tabindex="0" role="application" aria-label="Pretend Microsoft Outlook"></div>`;
    const scr = box.firstElementChild;
    let k = 1;
    const fit = () => {
      k = box.clientWidth / SW || 1;
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

    /* ---------- state ---------- */
    const person = (key) => DIR[key] || { first: key, last: "", email: key };
    function setup(start) {
      start = start || {};
      stop();
      const me = DIR[start.me] ? start.me : "stella";
      const ids = start.mails || MAILS.map((m) => m.id);
      const mails = MAILS.filter((m) => ids.includes(m.id)).map((m) => {
        const fromMe = m.from === me;
        return {
          ...m,
          to: m.to.map((x) => person(x).email),
          from: m.from,
          att: [...(m.att || [])],
          folder: fromMe ? "Sent Items" : m.to.includes(me) ? "Inbox" : null,
          unread: false,
        };
      });
      const files = {};
      for (const [f, list] of Object.entries(FILES))
        files[f] = [
          // the apples photo is on Tom's computer (book p. 117); the others get it by email
          ...list.filter((x) => x.name !== "apples" || me === "tom"),
          ...((start.files && start.files[f]) || []),
        ].map((x) => ({ ...x }));
      const cts = (start.contacts || ["alex", "lisa", "tom"]).map((key) => ({
        ...person(key),
        phone: "",
        address: "",
        company: "",
        notes: "",
        fav: (start.fav || []).includes(person(key).first),
        photo: null,
        deleted: false,
      }));
      st = {
        me,
        view: start.view || "mail",
        folder: start.folder || "Inbox",
        mails: mails.filter((m) => m.folder),
        open: start.open || null,
        cm: null,
        contacts: cts,
        pnav: start.pnav || "all",
        sel: null,
        nc: null,
        fd: null,
        menu: null,
        pv: null,
        toast: "",
        files,
        ignored: [],
        drafts: 0,
        app: start.app === "edge" ? "edge" : "outlook",
        web: {
          signed: !!start.signed,
          email: "",
          ask: !!start.askSave,
          bubble: false,
          card: false,
          out: false,
        },
        tabs: [],
        tab: 0,
        lastIn: "",
      };
      st.tabs.push(newTab(start.page || "newtab", start));
      if (start.sel) {
        const i = st.contacts.findIndex((c) => c.first === start.sel);
        st.sel = i >= 0 ? i : null;
      }
      if (start.compose) openCompose(start.compose);
      if (start.nc) st.nc = blankContact();
      render();
    }
    const meP = () => DIR[st.me];
    function newTab(page, o) {
      o = o || {};
      return {
        page: page === "outlook" && !st.web.signed ? "login" : page,
        q: o.q || "",
        typed: null,
        qTyped: null,
        itab: o.itab || "All",
        tools: !!o.tools,
        f: {
          size: "Any size",
          color: "Any color",
          rights: "All",
          dur: "Any duration",
        },
        pv: null,
        vid: null,
        playing: false,
        hist: [],
      };
    }
    const T = () => st.tabs[st.tab];
    const cur = () => st.mails.find((m) => m.id === st.open) || null;
    const blankContact = () => ({
      mode: "new",
      i: null,
      first: "",
      last: "",
      email: "",
      phone: "",
      address: "",
      company: "",
      notes: "",
      photo: null,
      pick: false,
    });
    const addr = (key) => person(key).email;
    const who = (key) => {
      const p = DIR[key];
      return p ? nameOf(p) : key;
    };
    function openCompose(c) {
      const of = c.of && st.mails.find((m) => m.id === c.of);
      const kind = c.kind || "new";
      const quote = of ? { ...of } : null;
      st.cm = {
        kind,
        to: c.to ?? (kind === "reply" && of ? who(of.from) : ""),
        cc: c.cc || "",
        bcc: c.bcc || "",
        showCc: !!(c.showCc || c.cc),
        showBcc: !!(c.showBcc || c.bcc),
        subject:
          c.subject ??
          (of ? (kind === "forward" ? "Fw: " : "RE: ") + of.subject : ""),
        body: c.body || "",
        att: [...(c.att || [])],
        quote,
        editing: false,
        time: "12:41 PM",
      };
      st.view = "mail";
    }

    /* ---------- drawing ---------- */
    const btn = (t, inner, cls, label) =>
      `<button type="button" class="ns-b ${cls || ""}" data-t="${esc(t)}"${label ? ` aria-label="${esc(label)}" title="${esc(label)}"` : ""}>${inner}</button>`;
    const avatar = (name, photo, big) =>
      `<span class="ns-av${big ? " big" : ""}" style="--h:${[...String(name)].reduce((a, c) => a + c.charCodeAt(0), 0) % 360}">${photo ? `<span class="ns-ph">${photo}</span>` : esc(initials(name))}</span>`;

    function render() {
      if (!st) return;
      // keep the focus and the text cursor of a box while it is drawn again
      const a = document.activeElement;
      const keep =
        a &&
        scr.contains(a) &&
        (a.tagName === "INPUT" || a.tagName === "TEXTAREA")
          ? { t: a.dataset.t, s: a.selectionStart, e: a.selectionEnd }
          : null;
      scr.innerHTML = `<div class="ns-app">${st.app === "edge" ? edge() : outlook()}</div>
      <div class="ns-task">${btn("task:outlook", `<span class="ol-logo">${IC.railmail}</span>`, "tb" + (st.app === "outlook" ? " on" : ""), "Outlook")}${btn("task:edge", `<span class="ol-logo">${IC.edge}</span>`, "tb" + (st.app === "edge" ? " on" : ""), "Microsoft Edge")}<span class="clk">12:41 PM<br>10/21/2024</span></div>
      ${menu()}${contactDlg()}${fileDlg()}${preview()}
      ${st.toast ? `<div class="ns-toast">${esc(st.toast)}</div>` : ""}
      <div class="ns-cursor${mis && mis.mode === "demo" ? " show" : ""}" aria-hidden="true" style="left:${curPos.x}px;top:${curPos.y}px"><svg viewBox="0 0 24 24"><path d="M3 2l15 11-7 1-3 7z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`;
      if (keep && keep.t) {
        const el = scr.querySelector(`[data-t="${CSS.escape(keep.t)}"]`);
        if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) {
          el.focus({ preventScroll: true });
          try {
            el.setSelectionRange(keep.s, keep.e);
          } catch (e) {}
        }
      }
      if (mis && mis.glowing) glow(true);
    }

    function outlook(web) {
      const P = meP();
      const rail = [
        ["rail:mail", "railmail", "Mail", st.view === "mail"],
        ["rail:calendar", "calendar", "Calendar"],
        ["rail:people", "people", "People", st.view === "people"],
        ["rail:groups", "groups", "Groups"],
        ["rail:todo", "todo", "To Do"],
        ["rail:word", "word", "Word"],
        ["rail:excel", "excel", "Excel"],
        ["rail:ppt", "ppt", "PowerPoint"],
        ["rail:apps", "apps", "More apps"],
      ]
        .map(([t, i, l, on]) => btn(t, ic(i), "rl" + (on ? " on" : ""), l))
        .join("");
      const me = web
        ? `<span class="meet">${ic("video")} Meet Now</span>${ic("bell")}${ic("gear")}${btn("acct", avatar(nameOf(P), null), "acct", "Account")}`
        : `${ic("bell")}${ic("gear")}${ic("bulb")}${avatar(nameOf(P), null)}`;
      return `<div class="ns-top"><b class="brand">Outlook</b><span class="srch">${ic("search")}Search</span><span class="ns-tr">${me}</span></div>
      <div class="ns-olb"><div class="ns-rail">${rail}</div><div class="ns-olm">${st.view === "people" ? peopleView() : mailView()}</div></div>`;
    }

    /* ----- Mini Edge ----- */
    const GLOGO = `<span class="g-logo">${[
      ["G", "#4285f4"],
      ["o", "#ea4335"],
      ["o", "#fbbc05"],
      ["g", "#4285f4"],
      ["l", "#34a853"],
      ["e", "#ea4335"],
    ]
      .map(([c, col]) => `<b style="color:${col}">${c}</b>`)
      .join("")}</span>`;
    const MSLOGO = `<span class="ms-logo"><i style="background:#f25022"></i><i style="background:#7fba00"></i><i style="background:#00a4ef"></i><i style="background:#ffb900"></i></span>`;
    function urlOf(t) {
      const q = encodeURIComponent(t.q).replace(/%20/g, "+");
      return {
        newtab: "",
        google: "https://www.google.com",
        gimages: "https://www.google.com/imghp?hl=en&ogbl",
        results: `https://www.google.com/search?q=${q}${t.itab === "Images" ? "&udm=2" : t.itab === "Videos" ? "&udm=7" : ""}`,
        watch:
          "https://www.youtube.com/watch?v=" +
          (t.vid ? t.vid.dur.replace(":", "") + "kids" : ""),
        login: "https://login.live.com/",
        pass: "https://login.live.com/ppsecure",
        outlook: "https://outlook.live.com/mail/0/",
        notfound: "https://" + (t.bad || ""),
      }[t.page];
    }
    function titleOf(t) {
      return {
        newtab: "New tab",
        google: "Google",
        gimages: "Google Images",
        results: `${t.q} - Google Search`,
        watch: t.vid ? t.vid.t : "YouTube",
        login: "Sign in to your Microsoft account",
        pass: "Sign in to your Microsoft account",
        outlook: `Mail - ${nameOf(meP())} - Outlook`,
        notfound: "Can't reach this page",
      }[t.page];
    }
    function favOf(t) {
      if (t.page === "newtab") return ic("edge");
      if (/^(google|gimages|results)$/.test(t.page))
        return `<b class="g-fav">G</b>`;
      if (t.page === "outlook") return ic("railmail");
      if (t.page === "watch") return `<b class="yt-fav">▶</b>`;
      return MSLOGO;
    }
    function edge() {
      const t = T();
      const tabs = st.tabs
        .map(
          (x, i) =>
            `<div class="ed-tab${i === st.tab ? " on" : ""}">${btn("e:tab:" + i, `${favOf(x)}<span class="tt">${esc(titleOf(x))}</span>`, "tl", titleOf(x))}${btn("e:close:" + i, ic("close"), "tx", "Close tab")}</div>`,
        )
        .join("");
      const addr = t.typed != null ? t.typed : urlOf(t);
      return `<div class="ns-edge"><div class="ed-tabs"><span class="prof">${ic("person")}</span>${tabs}${btn("e:newtab", ic("plus"), "tplus", "New tab")}<span class="ed-wc">— ☐ ✕</span></div>
      <div class="ed-bar">${btn("e:back", ic("back"), "ri0" + (t.hist.length ? "" : " dim"), "Back")}<span class="ns-i dim">${IC.fwd}</span>${btn("e:refresh", ic("refresh"), "ri0", "Refresh")}<label class="ed-addr">${ic(t.page === "newtab" ? "search" : "lock")}<input type="text" data-t="e:addr" value="${esc(addr)}" placeholder="Search or enter web address" autocomplete="off" spellcheck="false" aria-label="Address bar"></label>${ic("star2")}${ic("collections")}${ic("dots")}</div>
      ${t.page === "newtab" ? `<div class="ed-fav">For quick access, place your favorites here on the favorites bar. <u>Manage favorites now</u></div>` : ""}
      <div class="ed-page">${edgePage(t)}</div>${st.web.bubble ? pwBubble() : ""}</div>`;
    }
    function pwBubble() {
      return `<div class="ed-pw"><b>Save password for outlook.live.com?</b><span class="em">${esc(st.web.email || meP().email)}</span><span class="dots">••••••••</span><div class="ed-row">${btn("pw:save", "Save", "send")}${btn("pw:never", "Never", "cancel")}</div></div>`;
    }
    function edgePage(t) {
      const q = t.qTyped != null ? t.qTyped : t.q;
      const box = (cls) =>
        `<label class="g-box ${cls || ""}">${ic("search")}<input type="text" data-t="g:q" value="${esc(q)}" autocomplete="off" spellcheck="false" aria-label="Search">${q ? `<span class="x">${IC.close}</span>` : ""}<span class="mic">${ic("mic")}</span>${btn("g:go", ic("search"), "ri0 g-go", "Search")}</label>`;
      const gtop = `<div class="g-top"><span>Gmail</span>${btn("g:images", "Images", "lk", "Images")}${ic("apps")}<span class="g-sign">Sign in</span></div>`;
      switch (t.page) {
        case "newtab":
          return `<div class="ed-new">${ic("apps")}<div class="ed-ms">${MSLOGO}<span>Microsoft</span></div><label class="ed-search">${ic("search")}<input type="text" data-t="e:search" placeholder="Search the web" autocomplete="off" spellcheck="false" aria-label="Search the web"></label><span class="ed-add">${ic("plus")}<small>Add shortcut</small></span></div>`;
        case "google":
          return `<div class="g-home">${gtop}<div class="g-mid">${GLOGO}${box()}</div></div>`;
        case "gimages":
          return `<div class="g-home">${gtop.replace(/<button[^]*?Images<\/button>/, "")}<div class="g-mid">${GLOGO}<small class="g-sub">images</small>${box()}</div></div>`;
        case "results":
          return results(t, box("small"));
        case "watch":
          return watch(t);
        case "login":
        case "pass":
          return login(t);
        case "outlook":
          return `<div class="ns-web">${outlook(true)}${st.web.card ? acctCard() : ""}</div>`;
        default:
          return `<div class="ed-bad"><span class="big">😕</span><b>Hmm… can't reach this page</b><p>Check the address. Mini Edge knows <b>www.google.com</b> and <b>outlook.live.com</b>.</p></div>`;
      }
    }
    function shownImgs(t) {
      const f = t.f;
      return imagesFor(t.q)
        .map((x, i) => ({ ...x, i }))
        .filter(
          (x) =>
            (f.size === "Any size" || x.size === f.size) &&
            (f.color === "Any color" || x.color === f.color) &&
            (f.rights === "All" ||
              (f.rights === "Creative Commons licenses") === x.cc),
        );
    }
    function results(t, box) {
      const tabs = [
        "All",
        "Images",
        "Videos",
        "Products",
        "News",
        "Books",
        "Finance",
      ]
        .map((x) =>
          /^(All|Images|Videos)$/.test(x)
            ? btn("g:tab:" + x, x, "gt" + (t.itab === x ? " on" : ""))
            : `<span class="gt">${x}</span>`,
        )
        .join("");
      const fb = (key, kk, label) => {
        const v = t.f[GOPTS[kk][0]];
        const def = v === GOPTS[kk][1][0];
        return btn(
          "g:" + key,
          `${esc(def ? label : v)} ${ic("chev")}`,
          "gf" + (def ? "" : " set"),
          label,
        );
      };
      let row = "",
        body = "";
      const all = imagesFor(t.q);
      if (t.itab === "Images") {
        row = t.tools
          ? `<div class="g-tools">${fb("size", "gsize", "Size")}${fb("color", "gcolor", "Color")}${fb("rights", "grights", "Usage rights")}<span class="gf">Type ${ic("chev")}</span><span class="gf">Any time ${ic("chev")}</span><span class="gf">Advanced Search</span></div>`
          : `<div class="g-chips">${["Clipart", "Lunch", "Drawing", "Breakfast", "Chart", "Animated", "Nutrition", "Plate"].map((c) => `<span class="g-chip">${c}</span>`).join("")}</div>`;
        const list = shownImgs(t);
        body = all.length
          ? list.length
            ? `<div class="g-grid${t.pv != null ? " narrow" : ""}">${list.map((x) => btn("gimg:" + x.i, `<span class="gpic" style="background:${TINT[x.color] || "#eee"}"><span>${x.e}</span></span><small class="site">${esc(x.site)}</small><small class="ttl">${esc(x.title)}</small>`, "gimg" + (t.pv === x.i ? " on" : ""), x.title)).join("")}</div>`
            : `<p class="g-none">No pictures match these tools. Try another choice.</p>`
          : `<p class="g-none">Mini Edge has no pictures for “${esc(t.q)}”. Try <b>healthy food</b>, <b>yellow fruits</b>, <b>vegetables</b> or a food like <b>pizza</b>.</p>`;
        if (t.pv != null && all[t.pv]) body += sidePreview(all[t.pv]);
      } else if (t.itab === "Videos") {
        row = `<div class="g-tools">${fb("dur", "gdur", "Any duration")}<span class="gf">Any time ${ic("chev")}</span><span class="gf">Any quality ${ic("chev")}</span><span class="gf">All videos ${ic("chev")}</span><span class="gf">Any source ${ic("chev")}</span><span class="gf">Advanced Search</span></div>`;
        const d = t.f.dur;
        const list = videosFor(t.q)
          .map((v, i) => ({ ...v, i }))
          .filter(
            (v) =>
              d === "Any duration" ||
              (d[0] === "S"
                ? mins(v.dur) <= 4
                : d[0] === "M"
                  ? mins(v.dur) > 4 && mins(v.dur) <= 20
                  : mins(v.dur) > 20),
          );
        body = list.length
          ? `<div class="g-vids">${list.map((v) => `<div class="g-vid"><small class="src">www.youtube.com › watch</small>${btn("gvid:" + v.i, `<span class="vt">${esc(v.t)}</span>`, "vlink", v.t)}<div class="g-vrow">${btn("gvid:" + v.i, `<span class="vth">${v.e}<b>▶</b><i>${v.dur}</i></span>`, "vthb", v.t)}<span class="vd">${esc(v.d)}<br><small>${esc(v.by)}</small></span></div></div>`).join("")}</div>`
          : `<p class="g-none">No videos here. Try another choice, or search <b>yellow fruits</b>.</p>`;
      } else {
        const list = all.slice(0, 3);
        body = list.length
          ? `<div class="g-all">${list.map((x) => `<div class="g-res"><small>${esc(x.site)} · https://www.${x.site.toLowerCase().replace(/\s/g, "")}.com</small><b>${esc(x.title)}</b><span>All about ${esc(x.title.toLowerCase())} for kids and families.</span></div>`).join("")}<div class="g-strip"><b>Images</b><span>${all
              .slice(0, 5)
              .map(
                (x) =>
                  `<span class="gpic sm" style="background:${TINT[x.color] || "#eee"}"><span>${x.e}</span></span>`,
              )
              .join("")}</span></div></div>`
          : `<p class="g-none">Mini Edge has no results for “${esc(t.q)}”. Try <b>healthy food</b> or <b>yellow fruits</b>.</p>`;
      }
      return `<div class="g-res-page"><div class="g-head"><span class="g-logo sm">${GLOGO}</span>${box}<span class="g-hr">${ic("gear")}${ic("apps")}<span class="g-sign">Sign in</span></span></div>
      <div class="g-tabs">${tabs}<span class="gt">⋮ More</span>${t.itab === "Images" ? btn("g:tools", "Tools", "gtools" + (t.tools ? " on" : ""), "Tools") : ""}</div>${row}<div class="g-body">${body}</div></div>`;
    }
    function sidePreview(x) {
      return `<div class="g-side"><div class="gs-h"><b>${esc(x.site)}</b><span>‹ ›</span>${ic("dots")}${btn("g:close", ic("close"), "ri0", "Close")}</div>
      <div class="gs-pic">${btn("g:big", `<span class="gpic big" style="background:${TINT[x.color] || "#eee"}"><span>${x.e}</span></span>`, "gbig", x.title)}${btn("g:lens", ic("lens"), "glens", "Find more pictures like this one")}</div>
      <b class="gs-t">${esc(x.title)}</b><small>${esc(x.size)} · ${x.cc ? "Creative Commons license: free to use" : "Commercial license: ask before you use it"}</small><span class="gs-visit">Visit</span><small class="gs-c">Images may be subject to copyright.</small></div>`;
    }
    function watch(t) {
      const v = t.vid;
      if (!v) return "";
      return `<div class="yt"><div class="yt-top"><b class="yt-logo"><i>▶</i> YouTube</b><span class="yt-s">${esc(t.q)}</span></div><div class="yt-main"><div class="yt-player${t.playing ? " play" : ""}"><span class="ve">${v.e}</span>${btn("yt:play", t.playing ? "❚❚" : "▶", "ytp", t.playing ? "Pause" : "Play")}<span class="ybar"><i></i></span><small>${t.playing ? "0:01" : "0:00"} / ${v.dur}</small></div><b class="yt-t">${esc(v.t)}</b><small>${esc(v.by)}</small><p>${esc(v.d)}</p></div></div>`;
    }
    function login(t) {
      const w = st.web;
      const inner =
        t.page === "login"
          ? `${w.out ? `<p class="ms-out">✓ You signed out of your account. It's a good idea to close all browser windows.</p>` : ""}<b class="ms-h">Sign in</b><input type="text" data-t="ms:email" value="${esc(w.email)}" placeholder="Email, phone, or Skype" autocomplete="off" spellcheck="false" aria-label="Email"><small>No account? <u>Create one!</u></small><div class="ms-row">${btn("ms:next", "Next", "msb")}</div>`
          : `${btn("ms:back", "← " + esc(w.email), "ms-who")}<b class="ms-h">Enter password</b><input type="password" data-t="ms:pass" value="" placeholder="Password" autocomplete="off" aria-label="Password"><small><u>Forgot password?</u></small><small><u>Email code to ${esc((w.email || "").replace(/^(.).*@/, "$1*****@"))}</u></small><div class="ms-row">${btn("ms:signin", "Sign in", "msb")}</div>`;
      return `<div class="ms-page"><div class="ms-card">${MSLOGO}<span class="ms-name">Microsoft</span>${inner}</div>${t.page === "login" ? `<div class="ms-opt">${ic("search")} Sign-in options</div>` : ""}<small class="ms-foot">Terms of use · Privacy & cookies</small></div>`;
    }
    function acctCard() {
      const P = meP();
      return `<div class="ns-acct"><div class="ah">${MSLOGO}<span>Microsoft</span>${btn("acct:signout", "Sign out", "lk", "Sign out")}</div><div class="ab">${avatar(nameOf(P), null, true)}<span><b>${esc(nameOf(P))}</b><br><small>${esc(P.email)}</small><br><u>My Microsoft account</u><br><u>My profile</u></span></div><div class="af">${ic("person")} Sign in with a different account</div></div>`;
    }
    function go(text) {
      const t = T();
      const raw = String(text || "").trim();
      if (!raw) return;
      const u = raw
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "");
      const was = { page: t.page, q: t.q, itab: t.itab, vid: t.vid };
      t.typed = null;
      t.qTyped = null;
      t.pv = null;
      if (/^outlook\.(live|office)\.com/.test(u))
        t.page = st.web.signed ? "outlook" : "login";
      else if (/^(www\.)?google\.com\/imghp|^images\.google\.com/.test(u))
        t.page = "gimages";
      else if (/^(www\.)?google\.com/.test(u)) t.page = "google";
      else if (/^login\.live\.com/.test(u)) t.page = "login";
      else if (!/[./]/.test(u)) {
        t.page = "results";
        t.q = raw;
        t.itab = "All";
      } else {
        t.page = "notfound";
        t.bad = raw;
      }
      t.hist.push(was);
    }
    function search(text) {
      const t = T();
      const q = String(text ?? (t.qTyped != null ? t.qTyped : t.q)).trim();
      if (!q) return;
      t.hist.push({ page: t.page, q: t.q, itab: t.itab, vid: t.vid });
      t.itab =
        t.page === "gimages" ? "Images" : t.page === "results" ? t.itab : "All";
      t.page = "results";
      t.q = q;
      t.qTyped = null;
      t.tools = false;
      t.pv = null;
      t.f = newTab("results").f;
    }
    function edgeAct(a, b, kind, wasMenu) {
      const t = T();
      if (a === "e") {
        if (b === "back" && t.hist.length) {
          Object.assign(t, t.hist.pop(), {
            pv: null,
            typed: null,
            qTyped: null,
          });
        } else if (b === "refresh") toast("The page is new again.");
        else if (b === "newtab") {
          st.tabs.push(newTab("newtab"));
          st.tab = st.tabs.length - 1;
        } else if (b.startsWith("tab:")) st.tab = +b.slice(4);
        else if (b.startsWith("close:")) {
          st.tabs.splice(+b.slice(6), 1);
          if (!st.tabs.length) {
            st.tabs.push(newTab("newtab"));
            st.app = "outlook";
          }
          st.tab = Math.min(st.tab, st.tabs.length - 1);
        }
      }
      if (a === "g") {
        if (b === "images") {
          t.hist.push({ page: t.page, q: t.q, itab: t.itab });
          t.page = "gimages";
          t.qTyped = null;
        } else if (b === "go") search();
        else if (b.startsWith("tab:")) {
          t.itab = b.slice(4);
          t.pv = null;
          t.tools = false;
        } else if (b === "tools") t.tools = !t.tools;
        else if (/^(size|color|rights|dur)$/.test(b))
          menuAt("g" + b, "", "g:" + b);
        else if (b === "close") t.pv = null;
        else if (b === "lens")
          toast("🔍 Visual search: more pictures like this one.");
        else if (b === "big" && kind === "right") menuAt("cx", t.pv, "g:big");
      }
      if (a === "opt" && wasMenu && GOPTS[wasMenu.kind]) {
        t.f[GOPTS[wasMenu.kind][0]] = b;
        t.pv = null;
      }
      if (a === "gimg") {
        if (kind === "right") menuAt("cx", +b, "gimg:" + b);
        else t.pv = +b;
      }
      if (a === "gvid") {
        t.hist.push({ page: t.page, q: t.q, itab: t.itab });
        t.vid = videosFor(t.q)[+b];
        t.page = "watch";
        t.playing = false;
      }
      if (a === "yt") t.playing = !t.playing;
      if (a === "cx" && wasMenu) {
        const x = imagesFor(t.q)[wasMenu.arg];
        if (b === "saveimg" && x)
          st.fd = {
            mode: "save",
            folder: "Pictures",
            name: x.name,
            sel: null,
            file: { name: x.name, ext: "jpg", e: x.e },
            typeName: "JPEG Image",
          };
        else if (b === "copyimg") toast("Picture copied");
        else toast("Not in Mini Edge. Try Save image as.");
      }
      if (a === "ms") {
        const w = st.web;
        if (b === "next") {
          if (!w.email.trim()) return toast("Type your email address.");
          t.page = "pass";
          w.out = false;
        } else if (b === "back") t.page = "login";
        else if (b === "signin") {
          if (!w.pass) return toast("Type your password.");
          const who2 = Object.keys(DIR).find(
            (x) => DIR[x].email === w.email.trim().toLowerCase(),
          );
          if (who2) st.me = who2;
          w.signed = true;
          w.pass = "";
          t.page = "outlook";
          st.view = "mail";
          if (w.ask) w.bubble = true;
        }
      }
      if (a === "pw") {
        st.web.bubble = false;
        toast(
          b === "save"
            ? "⚠️ Saved. On a public computer, never save your password!"
            : "Good! The password is not saved.",
        );
      }
      if (a === "acct") {
        if (b === "signout") {
          Object.assign(st.web, {
            signed: false,
            card: false,
            out: true,
            email: "",
          });
          t.page = "login";
        } else st.web.card = !st.web.card;
      }
    }

    /* ----- Mail ----- */
    function mailView() {
      const c = st.cm;
      const tabs = c
        ? ["Message", "Insert", "Format text", "Draw", "Options"]
        : ["Home", "View", "Help"];
      const rb = c
        ? `<span class="ns-sel w60">Aptos</span><span class="ns-sel w30">12</span>${["bold", "italic", "underline", "strike", "hl", "fontcolor", "bullets"].map((x) => `<span class="ns-b dim2">${IC[x].startsWith("<svg") ? ic(x) : IC[x]}</span>`).join("")}<span class="sep"></span>${btn("cm:attach", ic("attach") + ic("chev"), "ri att", "Attach file")}<span class="ns-b dim2">${ic("spell")}</span><span class="ns-b dim2">${ic("mic")}</span><span class="ns-b dim2">${ic("dots")}</span>`
        : `${btn("ol:newmail", ic("newmail") + "<span>New mail</span>", "new", "New mail")}<span class="ns-b ns-dd">${ic("chev")}</span><span class="sep"></span>${btn("ol:delete", ic("trash") + "<span>Delete</span>", "ri" + (cur() ? "" : " dim"))}${btn("ol:archive", ic("archive") + "<span>Archive</span>", "ri dim")}${btn("ol:report", ic("report") + "<span>Report</span>", "ri dim")}${btn("ol:moveto", ic("moveto") + "<span>Move to</span>", "ri dim")}<span class="sep"></span>${btn("ol:reply", ic("reply") + "<span>Reply</span>", "ri" + (cur() ? "" : " dim"))}${btn("ol:replyall", ic("replyall") + "<span>Reply all</span>", "ri" + (cur() ? "" : " dim"))}${btn("ol:forward", ic("forward") + "<span>Forward</span>", "ri" + (cur() ? "" : " dim"))}`;
      return `<div class="ns-tabs">${ic("menu")}${tabs.map((t, i) => `<span class="tab${i === 0 ? " on" : ""}">${t}</span>`).join("")}</div>
      <div class="ns-rib">${rb}</div>
      <div class="ns-cols"><div class="ns-fold">${folders()}</div><div class="ns-list">${list()}</div><div class="ns-read">${c ? compose() : reading()}</div></div>`;
    }
    function count(f) {
      if (f === "Drafts") return st.cm ? 1 : 0;
      if (f === "Inbox")
        return st.mails.filter((m) => m.folder === f && m.unread).length;
      return 0;
    }
    function folders() {
      const row = (f, sub) => {
        const n = count(f);
        const i = {
          Inbox: "readunread",
          "Sent Items": "send",
          Drafts: "edit",
          "Deleted Items": "trash",
        }[f];
        return btn(
          "fold:" + f,
          `${ic(i)}<span class="fn">${f}</span>${n ? `<b>${n}</b>` : ""}`,
          "fl" + (st.folder === f && !sub ? " on" : ""),
          f,
        );
      };
      return `<div class="fh">${ic("chev")}Favorites</div>${row("Inbox")}${row("Sent Items")}${row("Drafts")}
      <div class="fh">${ic("chev")}${esc(meP().email)}</div>${FOLDERS.map((f) => row(f, true)).join("")}`;
    }
    function list() {
      const rows = st.mails
        .filter((m) => m.folder === st.folder)
        .sort((a, b) => b.n - a.n);
      const draft =
        st.cm && (st.folder === "Drafts" || st.folder === "Inbox")
          ? `<div class="ns-msg draft on">${avatar(nameOf(meP()), null)}<span class="mt"><span class="mf"><i>[Draft]</i> ${esc(nameOf(meP()))}</span><span class="ms">${esc(st.cm.subject || "(No subject)")}</span><span class="mp">${esc((st.cm.body || "").split("\n")[0])}</span></span><span class="mtime">12:41 PM</span></div>`
          : "";
      const one = (m) => {
        const f = st.folder === "Sent Items" ? m.to.join("; ") : who(m.from);
        return btn(
          "msg:" + m.id,
          `${avatar(st.folder === "Sent Items" ? f : who(m.from), null)}<span class="mt"><span class="mf">${esc(f)}${m.att && m.att.length ? `<span class="pc">${ic("attach")}</span>` : ""}</span><span class="ms">${esc(m.subject)}</span><span class="mp">${esc(m.body.replace(/\n/g, " "))}</span></span><span class="mtime">${esc(m.time)}</span>`,
          "ns-msg" +
            (st.open === m.id && !st.cm ? " on" : "") +
            (m.unread ? " unread" : ""),
        );
      };
      return `<div class="lh"><span class="on">Focused</span><span>Other</span><span class="ns-tr">${ic("dots")}</span></div>${draft}${rows.map(one).join("") || (draft ? "" : `<p class="empty">Nothing here.</p>`)}`;
    }
    const bodyHTML = (text) => esc(text).replace(/\n/g, "<br>");
    function attChips(names, prefix) {
      return names.length
        ? `<div class="ns-atts">${names.map((n) => btn(prefix + n, `${PIC[n] ? `<span class="th">${PIC[n]}</span>` : `<span class="ns-ic">${fileIc(n)}</span>`}<span class="an">${esc(n)}</span>`, "ns-att", n)).join("")}</div>`
        : "";
    }
    function reading() {
      const m = cur();
      if (!m)
        return `<div class="ns-none">${IC.railmail}<p>Select an item to read</p></div>`;
      const fromP = person(m.from);
      return `<div class="rh">${esc(m.subject)}</div>
      <div class="rcard"><div class="rfrom">${avatar(who(m.from), null)}<span><b>${esc(who(m.from))}</b> &lt;${esc(fromP.email)}&gt;<br><small>To: ${m.to.includes(meP().email) ? "You" : esc(m.to.join("; "))}${m.cc && m.cc.length ? " · Cc: " + esc(m.cc.join("; ")) : ""}</small></span>
      <span class="ricons">${btn("rdi:reply", ic("reply"), "ri0", "Reply")}${btn("rdi:replyall", ic("replyall"), "ri0", "Reply all")}${btn("rdi:forward", ic("forward"), "ri0", "Forward")}<small>${esc(m.time)}</small></span></div>
      ${attChips(m.att || [], "att:")}
      <div class="rbody">${(m.att || [])
        .filter((n) => PIC[n])
        .map((n) => btn("attimg:" + n, `<span>${PIC[n]}</span>`, "ns-img", n))
        .join("")}${bodyHTML(m.body)}</div>
      <div class="rbtns">${btn("rd:reply", ic("reply") + "Reply", "rb")}${btn("rd:forward", ic("forward") + "Forward", "rb")}</div></div>`;
    }
    // the words of the body, misspelled ones with a red line (data-t="sp:<word>")
    function spellHTML(text) {
      return text
        .split("\n")
        .map((line) =>
          line
            .split(/(\s+)/)
            .map((tok) => {
              const core = tok.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
              const kk = core.toLowerCase();
              if (core && MISS[kk] && !st.ignored.includes(kk)) {
                const [pre, post] = tok.split(core);
                return `${esc(pre)}<span class="ns-miss" data-t="sp:${kk}">${esc(core)}</span>${esc(post)}`;
              }
              return esc(tok);
            })
            .join(""),
        )
        .join("<br>");
    }
    function compose() {
      const c = st.cm;
      const P = meP();
      const row = (label, t, show) =>
        show
          ? `<div class="crow"><span class="cl">${label}</span><input type="text" data-t="${t}" value="${esc(c[t.slice(3)])}" autocomplete="off" spellcheck="false"></div>`
          : "";
      const q = c.quote;
      const quote = q
        ? `<div class="cq"><b>From:</b> ${esc(who(q.from))} &lt;${esc(person(q.from).email)}&gt;<br><b>Sent:</b> Monday, October 21, 2024 ${esc(q.time)}<br><b>To:</b> ${esc(q.to.join("; "))}<br><b>Subject:</b> ${esc(q.subject)}<br><br>${bodyHTML(q.body)}</div>`
        : "";
      return `<div class="ns-cm"><div class="ctop">${btn("cm:send", "Send", "send", "Send")}<span class="ns-b ns-dd2">${ic("chev")}</span><span class="cfrom">From: ${esc(P.email)} ${ic("chev")}</span>${btn("cm:discard", ic("trash"), "ri0", "Discard")}</div>
      <div class="crow">${btn("cm:tobtn", "To", "tob")}<input type="text" data-t="cm:to" value="${esc(c.to)}" autocomplete="off" spellcheck="false" aria-label="To"><span class="ccb">${c.showCc ? "" : btn("cm:ccbtn", "Cc", "lk")}${c.showBcc ? "" : btn("cm:bccbtn", "Bcc", "lk")}</span></div>
      ${row("Cc", "cm:cc", c.showCc)}${row("Bcc", "cm:bcc", c.showBcc)}
      <div class="crow subj"><input type="text" data-t="cm:subject" value="${esc(c.subject)}" placeholder="Add a subject" autocomplete="off" spellcheck="false" aria-label="Subject"><small>Draft saved at ${c.time}</small></div>
      ${attChips(c.att, "catt:")}
      ${c.editing ? `<textarea data-t="cm:body" class="cbody" spellcheck="false" aria-label="Message">${esc(c.body)}</textarea>` : `<div class="cbody view" data-t="cm:body">${c.body ? spellHTML(c.body) : `<span class="ns-ph">Type your message here</span>`}</div>`}
      ${quote}</div>`;
    }

    /* ----- People ----- */
    function shown() {
      return st.contacts
        .map((c, i) => ({ c, i }))
        .filter(({ c }) =>
          st.pnav === "deleted"
            ? c.deleted
            : !c.deleted && (st.pnav !== "fav" || c.fav),
        )
        .sort((a, b) => nameOf(a.c).localeCompare(nameOf(b.c)));
    }
    function peopleView() {
      const sel = st.sel != null ? st.contacts[st.sel] : null;
      const del = st.pnav === "deleted";
      const rb = `${btn("pp:new", ic("newcontact") + "<span>New contact</span>", "new", "New contact")}<span class="ns-b ns-dd">${ic("chev")}</span><span class="sep"></span>${btn("pp:edit", ic("edit") + "<span>Edit</span>", "ri" + (sel && !del ? "" : " dim"))}${btn("pp:delete", ic("trash") + "<span>Delete</span>", "ri" + (sel && !del ? "" : " dim"))}${btn("pp:restore", ic("restore") + "<span>Restore</span>", "ri" + (sel && del ? "" : " dim"))}${btn("pp:fav", ic(sel && sel.fav ? "starfill" : "star") + `<span>${sel && sel.fav ? "Remove from favorites" : "Add to favorites"}</span>`, "ri" + (sel && !del ? "" : " dim"))}${btn("pp:list", ic("addlist") + "<span>Add to list</span>", "ri dim")}${btn("pp:manage", ic("manage") + "<span>Manage contacts</span>", "ri dim")}`;
      const nav = [
        ["pnav:fav", "star", "Favorites", "fav"],
        ["pnav:all", "personfill", "All contacts", "all"],
        ["pnav:lists", "lists", "All contact lists", "lists"],
        ["pnav:deleted", "trash", "Deleted", "deleted"],
      ]
        .map(([t, i, l, kk]) =>
          btn(
            t,
            ic(i) + `<span>${l}</span>`,
            "fl" + (st.pnav === kk ? " on" : ""),
            l,
          ),
        )
        .join("");
      const rows = st.pnav === "lists" ? [] : shown();
      const title = {
        fav: "Favorites",
        all: "All contacts",
        lists: "All contact lists",
        deleted: "Deleted",
      }[st.pnav];
      return `<div class="ns-tabs">${ic("menu")}<span class="tab on">Home</span><span class="tab">View</span><span class="tab">Help</span></div>
      <div class="ns-rib">${rb}</div>
      <div class="ns-cols"><div class="ns-fold"><div class="fh">${ic("chev")}${esc(meP().email)}</div>${nav}<p class="grp">Go to Groups</p></div>
      <div class="ns-list"><div class="lh"><span class="on">${title}</span><span class="ns-tr blue">By first name ${ic("chev")}</span></div>${rows.map(({ c, i }) => btn("ct:" + c.first, `${avatar(nameOf(c), c.photo)}<span class="mt"><span class="mf">${esc(nameOf(c))}${c.fav ? `<span class="pc">${IC.starfill}</span>` : ""}</span><span class="mp">${esc(c.email)}</span></span>`, "ns-msg ct" + (st.sel === i ? " on" : ""))).join("") || `<p class="empty">${st.pnav === "deleted" ? "No deleted contacts." : st.pnav === "fav" ? "No favorites yet." : st.pnav === "lists" ? "No contact lists." : "No contacts yet. Click New contact."}</p>`}</div>
      <div class="ns-read">${sel ? card(sel) : `<div class="ns-none">${IC.people}<p>Select a contact</p></div>`}</div></div>`;
    }
    function card(c) {
      const line = (i, label, v, ph) =>
        `<div class="ci">${ic(i)}<span><small>${label}</small><br>${v ? esc(v) : `<span class="lk2">${ph}</span>`}</span></div>`;
      return `<div class="ns-card"><div class="chd">${avatar(nameOf(c), c.photo, true)}<div><b class="cn">${esc(nameOf(c))}</b><div class="cbtns"><span class="ns-b callb">${ic("phone")} Call ${ic("chev")}</span>${btn("pp:mail", ic("mail"), "ri0", "Send email")}${ic("dots")}</div></div></div>
      <div class="ctabs"><span>Overview</span><span class="on">Contact</span><span>Files</span><span>Messages</span><span>LinkedIn</span></div>
      <div class="cinfo"><b>Contact information</b>${line("mail", "Email", c.email, "Add email")}${c.phone ? line("phone", "Mobile phone", c.phone) : ""}${c.address ? line("home", "Address", c.address) : ""}${c.company ? line("building", "Company", c.company) : ""}${line("tag", "Categories", "", "Add category")}${line("note", "Notes", c.notes, "Add your own notes here")}</div>
      ${c.deleted ? "" : btn("card:edit", ic("edit") + "Edit contact", "editc", "Edit contact")}</div>`;
    }
    function contactDlg() {
      const n = st.nc;
      if (!n) return "";
      const f = (t, label, i, ph) =>
        `<div class="nrow">${ic(i)}<label><small>${label}</small><input type="text" data-t="nc:${t}" value="${esc(n[t])}" placeholder="${ph || ""}" autocomplete="off" spellcheck="false"></label></div>`;
      return `<div class="ns-dim"></div><div class="ns-nc" role="dialog" aria-label="${n.mode === "new" ? "New contact" : "Edit contact"}">
      <div class="nh"><b>${n.mode === "new" ? "New contact" : "Edit contact"}</b>${btn("nc:cancelx", ic("close"), "ri0 x", "Close")}</div>
      <div class="nbody"><div class="ntop">${btn("nc:photo", n.photo ? `<span class="ns-ph">${n.photo}</span>` : ic("camera"), "cam", "Add a photo")}<div class="nnames">${f("first", "First name", "", "")}${f("last", "Last name", "", "")}</div></div>
      ${n.pick ? `<div class="npick"><small>Choose a photo:</small>${PHOTOS.map((p, i) => btn("photo:" + i, p, "pp", "Photo " + (i + 1))).join("")}</div>` : ""}
      ${f("email", "Email address", "mail")}${f("phone", "Mobile phone number", "phone")}${f("address", "Home address", "home")}${f("company", "Company", "building")}${f("notes", "Notes", "note")}</div>
      <div class="nfoot">${btn("nc:save", "Save", "send")}${btn("nc:cancel", "Cancel", "cancel")}</div></div>`;
    }

    /* ----- the Open / Save As window, the preview, the menus ----- */
    function fileDlg() {
      const d = st.fd;
      if (!d) return "";
      const navs = [
        ["Downloads", "download"],
        ["Documents", "documents"],
        ["Pictures", "pictures"],
        ["Music", "music"],
        ["Videos", "videos"],
      ];
      const files = st.files[d.folder] || [];
      const tile = (f) => {
        const full = f.name + "." + f.ext;
        return btn(
          "fd:file:" + f.name,
          `${f.e ? `<span class="th">${f.e}</span>` : `<span class="ns-ic big">${FILEIC[f.ext] || FILEIC.txt}</span>`}<span class="fnm">${esc(f.name)}</span>`,
          "fdt" + (d.sel === f.name ? " on" : ""),
          full,
        );
      };
      return `<div class="ns-dim"></div><div class="ns-fd" role="dialog" aria-label="${d.mode === "open" ? "Open" : "Save As"}">
      <div class="fdh">${ic("folder")}<b>${d.mode === "open" ? "Open" : "Save As"}</b>${btn("fd:cancelx", ic("close"), "ri0 x", "Close")}</div>
      <div class="fdbar">${ic("back")}${ic("fwd")}${ic("up")}<span class="fdpath">${ic(navs.find((x) => x[0] === d.folder)[1])} › ${esc(d.folder)} ›</span><span class="fds">${ic("search")} Search ${esc(d.folder)}</span></div>
      <div class="fdmain"><div class="fdnav">${navs.map(([f, i]) => btn("fd:nav:" + f, ic(i) + `<span>${f}</span>`, "fl" + (d.folder === f ? " on" : ""), f)).join("")}</div>
      <div class="fdfiles">${files.map(tile).join("") || `<p class="empty">This folder is empty.</p>`}</div></div>
      <div class="fdfoot"><label>File name: <input type="text" data-t="fd:name" value="${esc(d.name)}" autocomplete="off" spellcheck="false"></label>${d.mode === "save" ? `<span class="fdtype">Save as type: ${esc(d.typeName || "All files")}</span>` : `<span class="fdtype">All files</span>`}
      <span class="fdb">${btn(d.mode === "open" ? "fd:open" : "fd:save", d.mode === "open" ? "Open" : "Save", "send")}${btn("fd:cancel", "Cancel", "cancel")}</span></div></div>`;
    }
    function preview() {
      const p = st.pv;
      if (!p) return "";
      return `<div class="ns-dim"></div><div class="ns-pv"><div class="fdh">${PIC[p] ? ic("pictures") : `<span class="ns-i">${fileIc(p)}</span>`}<b>${esc(p)}</b>${btn("pv:close", ic("close"), "ri0 x", "Close")}</div><div class="pvb">${PIC[p] ? `<span class="big">${PIC[p]}</span>` : `<span class="ns-ic huge">${fileIc(p)}</span>`}</div></div>`;
    }
    const MENUS = {
      att: [
        ["attm:preview", "preview", "Preview"],
        ["attm:open", "open", "Open"],
        ["attm:onedrive", "cloud", "Save to OneDrive"],
        ["attm:copy", "copy", "Copy"],
        ["attm:saveas", "saveas", "Save As"],
      ],
      catt: [
        ["cattm:preview", "preview", "Preview"],
        ["cattm:open", "open", "Open"],
        ["cattm:copy", "copy", "Copy"],
        ["cattm:body", "insertimg", "Move image to the message body"],
        ["cattm:onedrive", "cloud", "Upload to OneDrive - Personal"],
        ["cattm:saveas", "saveas", "Save As"],
        ["cattm:remove", "close", "Remove Attachment"],
      ],
      attach: [
        ["attach:browse", "pc", "Browse this computer"],
        ["attach:onedrive", "cloud", "OneDrive"],
        ["attach:upload", "upload", "Upload and share"],
        ["attach:link", "link", "Link"],
      ],
    };
    function menu() {
      const m = st.menu;
      if (!m) return "";
      let items;
      let rows = (MENUS[m.kind] || []).length;
      if (GOPTS[m.kind]) {
        const [key, opts] = GOPTS[m.kind];
        rows = opts.length;
        items = opts
          .map((o) =>
            btn(
              "opt:" + o,
              `<span class="ck">${T().f[key] === o ? "✓" : ""}</span>${SWATCH[o] ? `<span class="sw" style="background:${SWATCH[o]}"></span>` : ""}<span>${esc(o)}</span>`,
              "ns-mi",
            ),
          )
          .join("");
      } else if (m.kind === "cx") {
        rows = CX.length * 0.8;
        items = CX.map(([t, l]) =>
          btn(t, `<span>${l}</span>`, "ns-mi cx"),
        ).join("");
      } else if (m.kind === "spell") {
        rows = 5;
        items = `<div class="mh">Spelling</div>${MISS[m.arg].map((w) => btn("spg:" + w, `<span class="ns-i"></span>${esc(w)}`, "ns-mi")).join("")}<div class="mfoot">${btn("sp:ignoreall", ic("ignore"), "ri0", "Ignore all")}<span class="ed">${ic("editor")} Editor</span></div>`;
      } else
        items = MENUS[m.kind]
          .filter(([t]) => !(t === "cattm:body" && !PIC[m.arg]))
          .map(([t, i, l]) => btn(t, ic(i) + `<span>${l}</span>`, "ns-mi"))
          .join("");
      const w =
        m.kind === "catt"
          ? 250
          : m.kind === "cx"
            ? 240
            : m.kind === "grights"
              ? 230
              : 200;
      const x = Math.max(4, Math.min(m.x, SW - w - 4));
      const y = Math.max(4, Math.min(m.y, SH - 40 - rows * 30 - 12));
      return `<div class="ns-menu" style="left:${x}px;top:${y}px;width:${w}px">${items}</div>`;
    }

    /* ---------- what each press does ---------- */
    function toast(t) {
      st.toast = t;
      clearTimeout(toastT);
      toastT = setTimeout(() => {
        if (st) {
          st.toast = "";
          render();
        }
      }, 1800);
    }
    const ALIAS = {
      "rdi:reply": "rd:reply",
      "rdi:replyall": "rd:replyall",
      "rdi:forward": "rd:forward",
      "card:edit": "pp:edit",
      "nc:cancelx": "nc:cancel",
      "fd:cancelx": "fd:cancel",
    };
    function menuAt(kind, arg, t) {
      const el = find(t);
      const c = el ? center(el) : { x: SW / 2, y: SH / 2 };
      const h = el ? el.getBoundingClientRect().height / k : 0;
      st.menu = { kind, arg, x: c.x - 20, y: c.y + h / 2 + 2 };
    }
    function perform(kind, t, info) {
      if (!st) return;
      t = ALIAS[t] || t;
      const wasMenu = st.menu;
      if (!/^(attm|cattm|attach|spg|sp:ignoreall|opt|cx)/.test(t))
        st.menu = null;
      if (!/^acct/.test(t)) st.web.card = false;
      const cut = t.includes(":") ? t.indexOf(":") : t.length;
      const [a, b] = [t.slice(0, cut), t.slice(cut + 1)];
      const c = st.cm;
      if (kind === "right") {
        if (a === "att" || a === "attimg") menuAt("att", b, t);
        else if (a === "catt") menuAt("catt", b, t);
        else if (a === "sp") menuAt("spell", b, t);
        else if (a === "gimg" || t === "g:big") edgeAct(a, b, kind, wasMenu);
        return render();
      }
      if (kind === "key") {
        if (t === "key:Escape") {
          st.menu = null;
          st.pv = null;
        }
        if (t === "key:Enter") enter((info && info.field) || st.lastIn);
        return render();
      }
      switch (a) {
        case "task":
          st.app = b;
          break;
        case "e":
        case "g":
        case "opt":
        case "gimg":
        case "gvid":
        case "yt":
        case "cx":
        case "ms":
        case "pw":
        case "acct":
          edgeAct(a, b, kind, wasMenu);
          break;
        case "rail":
          if (b === "mail" || b === "people") {
            st.view = b;
            st.nc = null;
          } else toast("Mini Outlook has Mail and People.");
          break;
        case "fold":
          st.folder = b;
          st.open = null;
          break;
        case "msg":
          st.open = b;
          st.cm = null;
          break;
        case "ol":
        case "rd":
          if (b === "newmail") openCompose({ kind: "new" });
          else if (b === "delete" && cur()) {
            cur().folder = "Deleted Items";
            st.open = null;
          } else if (cur() && /^(reply|replyall|forward)$/.test(b))
            openCompose({
              kind: b === "forward" ? "forward" : "reply",
              of: st.open,
              ...(b === "replyall"
                ? {
                    cc: cur()
                      .to.filter((x) => x !== meP().email)
                      .join("; "),
                  }
                : {}),
            });
          else if (/^(archive|report|moveto)$/.test(b))
            toast("Not in Mini Outlook.");
          break;
        case "att":
        case "attimg":
          st.pv = b; // a click opens the preview; the menu is a right-click
          break;
        case "attm":
        case "cattm": {
          const f = wasMenu && wasMenu.arg;
          st.menu = null;
          if (!f) break;
          if (b === "preview" || b === "open") st.pv = f;
          else if (b === "copy") toast("Copied " + f);
          else if (b === "onedrive") toast("Saved to OneDrive");
          else if (b === "body") toast("The picture is now in the message.");
          else if (b === "remove" && c) c.att = c.att.filter((x) => x !== f);
          else if (b === "saveas") {
            const [nm, ex] = [f.replace(/\.\w+$/, ""), ext(f)];
            st.fd = {
              mode: "save",
              folder: isPic(f) ? "Pictures" : "Documents",
              name: nm,
              sel: null,
              file: { name: nm, ext: ex, e: PIC[f] },
              typeName: ex.toUpperCase() + (isPic(f) ? " Image" : " File"),
            };
          }
          break;
        }
        case "catt":
          if (kind === "dbl") st.pv = b;
          else menuAt("catt", b, t);
          break;
        case "cm":
          if (!c) break;
          if (b === "body") {
            if (!c.editing) {
              c.editing = true;
              render();
              const ta = find("cm:body");
              if (ta && matchMedia("(hover: hover)").matches) {
                ta.focus({ preventScroll: true });
                ta.setSelectionRange(ta.value.length, ta.value.length);
              }
              return;
            }
          } else c.editing = false;
          if (b === "ccbtn") c.showCc = true;
          if (b === "bccbtn") c.showBcc = true;
          if (b === "attach") menuAt("attach", "", t);
          if (b === "discard") {
            st.cm = null;
            toast("Draft discarded");
          }
          if (b === "send") send();
          break;
        case "attach":
          st.menu = null;
          if (b === "browse")
            st.fd = { mode: "open", folder: "Pictures", name: "", sel: null };
          else toast("Use Browse this computer.");
          break;
        case "sp":
          if (b === "ignoreall") {
            if (wasMenu) st.ignored.push(wasMenu.arg);
            st.menu = null;
          } else menuAt("spell", b, t);
          break;
        case "spg":
          if (c && wasMenu) {
            const re = new RegExp(
              `(^|[^A-Za-z])${wasMenu.arg}(?=[^A-Za-z]|$)`,
              "gi",
            );
            c.body = c.body.replace(re, (m0, p) => p + b);
          }
          st.menu = null;
          break;
        case "pp":
          people(b);
          break;
        case "pnav":
          st.pnav = b;
          st.sel = null;
          break;
        case "ct":
          st.sel = st.contacts.findIndex(
            (x) => x.first === b && (st.pnav === "deleted") === x.deleted,
          );
          if (st.sel < 0) st.sel = null;
          break;
        case "nc":
          contact(b);
          break;
        case "photo":
          if (st.nc) {
            st.nc.photo = PHOTOS[+b];
            st.nc.pick = false;
          }
          break;
        case "fd":
          fileAct(b, kind);
          break;
        case "pv":
          st.pv = null;
          break;
      }
      render();
    }
    // Enter in a box: go to the address, search, the next sign-in page, open or save the file
    function enter(field) {
      const t = T();
      if (field === "e:addr" || field === "e:search") {
        const el = find(field);
        go(
          field === "e:addr"
            ? t.typed != null
              ? t.typed
              : el && el.value
            : el && el.value,
        );
      } else if (field === "g:q") search();
      else if (field === "ms:email") edgeAct("ms", "next");
      else if (field === "ms:pass") edgeAct("ms", "signin");
      else if (field === "fd:name" && st.fd)
        fileAct(st.fd.mode === "open" ? "open" : "save");
    }
    function send() {
      const c = st.cm;
      const list = (s) =>
        String(s || "")
          .split(/[;,]/)
          .map((x) => x.trim())
          .filter(Boolean);
      if (!list(c.to).length && !list(c.cc).length && !list(c.bcc).length) {
        toast("Type an email address in To.");
        return;
      }
      st.mails.push({
        id: "sent" + st.mails.length,
        from: st.me,
        to: list(c.to),
        cc: list(c.cc),
        bcc: list(c.bcc),
        subject: c.subject || "(No subject)",
        body: c.body + (c.quote ? "\n\n— " + c.quote.subject : ""),
        time: "12:41 PM",
        att: [...c.att],
        folder: "Sent Items",
        n: 100 + st.mails.length,
      });
      st.cm = null;
      st.open = null;
      toast("Sent ✓");
    }
    function people(b) {
      const sel = st.sel != null ? st.contacts[st.sel] : null;
      if (b === "new") {
        st.nc = blankContact();
        return;
      }
      if (!sel) return toast("First click a contact.");
      if (b === "edit" && !sel.deleted)
        st.nc = { ...sel, mode: "edit", i: st.sel, pick: false };
      if (b === "delete" && !sel.deleted) {
        sel.deleted = true;
        st.sel = null;
        toast("Contact deleted");
      }
      if (b === "restore" && sel.deleted) {
        sel.deleted = false;
        st.sel = null;
        toast("Contact restored");
      }
      if (b === "fav" && !sel.deleted) {
        sel.fav = !sel.fav;
        toast(sel.fav ? "Added to favorites ⭐" : "Removed from favorites");
      }
      if (b === "mail") openCompose({ kind: "new", to: sel.email });
    }
    function contact(b) {
      const n = st.nc;
      if (!n) return;
      if (b === "photo") n.pick = !n.pick;
      if (b === "cancel") st.nc = null;
      if (b === "save") {
        if (!n.first.trim() && !n.last.trim() && !n.email.trim())
          return toast("Type a name first.");
        const keys = [
          "first",
          "last",
          "email",
          "phone",
          "address",
          "company",
          "notes",
          "photo",
        ];
        const rec = Object.fromEntries(
          keys.map((x) => [x, typeof n[x] === "string" ? n[x].trim() : n[x]]),
        );
        if (n.mode === "edit") Object.assign(st.contacts[n.i], rec);
        else {
          st.contacts.push({ ...rec, fav: false, deleted: false });
          st.sel = st.contacts.length - 1;
        }
        st.pnav = st.pnav === "deleted" ? "all" : st.pnav;
        st.nc = null;
        toast("Contact saved ✓");
      }
    }
    function fileAct(b, kind) {
      const d = st.fd;
      if (!d) return;
      if (b.startsWith("nav:")) {
        d.folder = b.slice(4);
        d.sel = null;
        if (d.mode === "open") d.name = "";
        return;
      }
      if (b.startsWith("file:")) {
        d.sel = b.slice(5);
        d.name = d.sel;
        if (kind === "dbl" && d.mode === "open") fileAct("open");
        return;
      }
      if (b === "cancel") st.fd = null;
      if (b === "open") {
        const f = (st.files[d.folder] || []).find(
          (x) => x.name.toLowerCase() === d.name.trim().toLowerCase(),
        );
        if (!f) return toast("Click a file first.");
        const full = f.name + "." + f.ext;
        if (f.e) PIC[full] = f.e;
        if (st.cm && !st.cm.att.includes(full)) st.cm.att.push(full);
        st.fd = null;
      }
      if (b === "save") {
        const name = d.name.trim() || d.file.name;
        const list = st.files[d.folder];
        const old = list.findIndex(
          (x) => x.name.toLowerCase() === name.toLowerCase(),
        );
        const rec = { ...d.file, name };
        if (old >= 0) list[old] = rec;
        else list.push(rec);
        if (rec.e) PIC[name + "." + rec.ext] = rec.e;
        st.fd = null;
        toast(`Saved in ${d.folder} ✓`);
      }
    }

    /* ---------- the child's pointer and keyboard ---------- */
    const curPos = { x: SW / 2, y: SH / 2 };
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
    let press = null,
      clicks = { t: "", time: 0 },
      lastLong = 0;
    scr.addEventListener("pointerdown", (e) => {
      if (e.button === 2) return;
      const field = e.target.closest("input, textarea");
      if (field) {
        if (mis && mis.mode === "demo") e.preventDefault();
        else if (mis && mis.mode === "try") {
          // a box that is not the one of the step is a wrong place
          const s = mis.steps[mis.i];
          if (s && !(s.act === "type" && s.t === field.dataset.t)) {
            e.preventDefault();
            wrong(s, "place", toScr(e.clientX, e.clientY));
          }
        }
        return;
      }
      const el = e.target.closest("[data-t]");
      e.preventDefault();
      scr.focus({ preventScroll: true });
      if (!el) {
        if (st.menu) {
          st.menu = null;
          render();
        }
        return;
      }
      press = { el, x: e.clientX, y: e.clientY, long: false };
      const p = press;
      p.timer = setTimeout(() => {
        if (press !== p) return;
        p.long = true;
        lastLong = Date.now();
        user("right", el.dataset.t, {});
      }, 550);
    });
    scr.addEventListener("pointermove", (e) => {
      if (
        press &&
        Math.hypot(e.clientX - press.x, e.clientY - press.y) > 10 * k
      ) {
        clearTimeout(press.timer);
      }
    });
    scr.addEventListener("pointerup", (e) => {
      if (!press) return;
      const pr = press;
      press = null;
      clearTimeout(pr.timer);
      if (pr.long) return;
      const el = e.target.closest("[data-t]");
      if (!el || (el !== pr.el && !pr.el.contains(el))) return;
      const t = pr.el.dataset.t;
      const now = Date.now();
      const dbl = clicks.t === t && now - clicks.time < 450;
      clicks = dbl ? { t: "", time: 0 } : { t, time: now };
      user(dbl ? "dbl" : "click", t, {});
    });
    scr.addEventListener("pointercancel", () => {
      if (press) clearTimeout(press.timer);
      press = null;
    });
    scr.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (Date.now() - lastLong < 900) return;
      const el = e.target.closest("[data-t]");
      if (el && !el.matches("input, textarea")) user("right", el.dataset.t, {});
    });
    scr.addEventListener("input", (e) => {
      if (mis && mis.mode === "demo") return;
      onType(e.target);
    });
    function setInput(t, v) {
      if (!t) return;
      if (/^cm:/.test(t) && st.cm) st.cm[t.slice(3)] = v;
      if (/^nc:/.test(t) && st.nc) st.nc[t.slice(3)] = v;
      if (t === "fd:name" && st.fd) st.fd.name = v;
      if (t === "e:addr") T().typed = v;
      if (t === "g:q") T().qTyped = v;
      if (t === "ms:email") st.web.email = v;
      if (t === "ms:pass") st.web.pass = v;
      st.lastIn = t;
    }
    const norm = (x) =>
      String(x || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
    const url = (x) =>
      norm(x)
        .replace(/^https?:\/\//, "")
        .replace(/^www\./, "")
        .replace(/\/+$/, "");
    const typedOk = (s, v) =>
      s.t === "cm:body"
        ? norm(v).includes(norm(s.text))
        : s.t === "e:addr"
          ? url(v) === url(s.text)
          : norm(v) === norm(s.text);
    function onType(el) {
      const t = el.dataset.t;
      setInput(t, el.value);
      const s = mis && mis.mode === "try" && mis.steps[mis.i];
      if (s && s.act === "type" && s.t === t && typedOk(s, el.value)) advance();
    }
    const onDocKey = (e) => {
      if (!box.isConnected) return;
      const a = document.activeElement;
      const inScr = a && scr.contains(a);
      if (a && !inScr && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
      if (inScr && a.tagName === "TEXTAREA") return;
      if (inScr && a.tagName === "INPUT") {
        if (e.key === "Enter") {
          e.preventDefault();
          st.lastIn = a.dataset.t || st.lastIn;
          keyFrom("Enter");
        }
        return;
      }
      if (e.key === "Escape" || (e.key === "Enter" && mis)) {
        if (e.key === "Enter") e.preventDefault();
        keyFrom(e.key);
      }
    };
    document.addEventListener("keydown", onDocKey);
    function keyFrom(key) {
      user("key", "key:" + key, {});
    }

    /* ---------- missions (the same as Mini Word) ---------- */
    function match(s, kind, t) {
      t = ALIAS[t] || t;
      const want = ALIAS[s.t] || s.t;
      if (s.act === "click") return kind === "click" && t === want;
      if (s.act === "dbl") return kind === "dbl" && t === want;
      if (s.act === "right") return kind === "right" && t === want;
      if (s.act === "key")
        return (
          kind === "key" && t.toLowerCase() === ("key:" + s.key).toLowerCase()
        );
      return false;
    }
    function user(kind, t, info) {
      if (!mis) return perform(kind, t, info);
      if (mis.mode === "demo") return;
      if (mis.busy) {
        // Enter pressed right after typing: keep it for the next step
        if (kind === "key") mis.pendingKey = t;
        return;
      }
      let s = mis.steps[mis.i];
      if (!s) return perform(kind, t, info);
      // while the child looks (a "look" step), doing the next step already is fine; anything else waits
      if (s.act === "look") {
        const nx = mis.steps[mis.i + 1];
        if (!nx || !match(nx, kind, t)) return;
        clearTimeout(mis.idle);
        mis.i++;
        s = nx;
        mis.cb.onStep && mis.cb.onStep(mis.i, s);
      }
      if (match(s, kind, t)) {
        perform(kind, t, info);
        advance();
        return;
      }
      const want = ALIAS[s.t] || s.t;
      const tt = ALIAS[t] || t;
      // the first click of a double-click, and clicking the box you will type in, are not mistakes
      if (s.act === "dbl" && kind === "click" && tt === want)
        return perform(kind, t, info);
      if (s.act === "type" && kind === "click" && tt === want)
        return perform(kind, t, info);
      if (kind === "key" && t === "key:Escape") return;
      if (kind === "key" && s.act === "type") return wrong(s, "text");
      wrong(
        s,
        (kind !== s.act && tt === want) || (s.act === "right" && tt === want)
          ? "kind"
          : "place",
      );
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
        .querySelectorAll(".ns-glow")
        .forEach((x) => x.classList.remove("ns-glow"));
      if (!on || !mis) return;
      const s = mis.steps[mis.i];
      if (!s || !s.t) return;
      const el = find(s.t);
      if (el) el.classList.add("ns-glow");
    }
    // a step that types in the message needs the message open for writing
    function ready(s) {
      if (
        s &&
        s.act === "type" &&
        s.t === "cm:body" &&
        st.cm &&
        !st.cm.editing
      ) {
        st.cm.editing = true;
        render();
      }
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
      if (m.i >= m.steps.length) {
        mis = null;
        render();
        m.cb.onDone && m.cb.onDone(m);
        return;
      }
      const s = m.steps[m.i];
      ready(s);
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
      if (m.pendingKey) {
        const key = m.pendingKey;
        m.pendingKey = null;
        if (s.act === "key") return user("key", key, {});
      }
      if (s.act === "look") {
        const at = m.i;
        m.glowing = true;
        glow(true);
        await Promise.race([said || wait(0), wait(5000)]);
        await wait(Math.max(900, s.wait || 0));
        if (mis !== m || m.i !== at) return; // the child already did the next step
        m.i++;
        return step();
      }
      if (s.act === "type") {
        const inp = find(s.t);
        if (inp && matchMedia("(hover: hover)").matches)
          inp.focus({ preventScroll: true });
      }
      m.idle = setTimeout(() => {
        if (mis === m && m.i < m.steps.length) {
          m.glowing = true;
          glow(true);
        }
      }, m.helpAfter ?? 6000);
    }
    async function moveTo(x, y, ms = 650) {
      const c = scr.querySelector(".ns-cursor");
      if (!c) return;
      c.classList.add("show");
      c.style.transition = `left ${ms}ms ease,top ${ms}ms ease`;
      c.style.left = x + "px";
      c.style.top = y + "px";
      curPos.x = x;
      curPos.y = y;
      await wait(ms + 60);
    }
    function ring(x, y, cls) {
      const r = document.createElement("span");
      r.className = "ns-ring " + (cls || "");
      r.style.left = x + "px";
      r.style.top = y + "px";
      scr.appendChild(r);
      setTimeout(() => r.remove(), 700);
    }
    async function typeInto(s, m, ms) {
      let el = find(s.t);
      if (!el) return;
      // the message keeps what is there; a new part starts on a new line
      let base = s.t === "cm:body" && !typedOk(s, el.value) ? el.value : "";
      if (base && !/\s$/.test(base)) base += "\n";
      for (let i = 1; i <= s.text.length; i++) {
        el = find(s.t);
        if (!el || mis !== m) return;
        el.value = base + s.text.slice(0, i);
        setInput(s.t, el.value);
        await wait(ms);
      }
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
        kd.className = "ns-key";
        kd.textContent = s.key === "Enter" ? "Enter ↩" : s.key;
        scr.appendChild(kd);
        await wait(1000);
        kd.remove();
        perform("key", "key:" + s.key, {});
        return;
      }
      const el = find(s.t);
      if (!el) return;
      el.classList.add("ns-glow");
      const c = center(el);
      await moveTo(c.x, c.y);
      if (mis !== m) return;
      if (s.act === "type") {
        el.classList.remove("ns-glow");
        await typeInto(s, m, 70);
        return;
      }
      ring(c.x, c.y);
      if (s.act === "dbl") {
        await wait(160);
        ring(c.x, c.y);
      }
      if (s.act === "right") {
        const lab = document.createElement("div");
        lab.className = "ns-rlab";
        lab.textContent = "Right-click";
        lab.style.left = c.x + 14 + "px";
        lab.style.top = c.y + 10 + "px";
        scr.appendChild(lab);
        setTimeout(() => lab.remove(), 900);
      }
      await wait(250);
      perform(
        s.act === "dbl" ? "dbl" : s.act === "right" ? "right" : "click",
        s.t,
        {},
      );
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
      const c = scr.querySelector(".ns-cursor");
      if (c) c.classList.toggle("show", mis.mode === "demo");
      step();
    }
    function stop() {
      if (mis) clearTimeout(mis.idle);
      mis = null;
      glow(false);
      const c = scr.querySelector(".ns-cursor");
      if (c) c.classList.remove("show");
    }
    // the ⌨️ button under the screen: type the text of the current "type" step for the child
    async function typeFor() {
      if (!mis) return;
      const s = mis.steps[mis.i];
      if (!s || s.act !== "type") return;
      const m = mis;
      m.busy = true;
      ready(s);
      await typeInto(s, m, 60);
      if (mis !== m) return;
      m.busy = false;
      advance();
    }
    // for the test harness: finish the mission the way Show me does it (it counts as done with help)
    async function solve() {
      const m = mis;
      if (!m || m.mode !== "try") return;
      m.wrongs++;
      while (mis === m && m.i < m.steps.length) {
        const i = m.i;
        const s = m.steps[i];
        if (s.act === "look") {
          while (mis === m && m.i === i) await wait(100);
          continue;
        }
        while (m.busy && mis === m) await wait(50);
        if (mis !== m || m.i !== i) continue;
        await demoDo(s);
        if (mis === m && m.i === i) await advance();
        await wait(50);
      }
    }

    setup(opts.start);
    const api = {
      setup,
      run,
      stop,
      find,
      render,
      typeFor,
      solve,
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
        box.classList.remove("ns-box");
        delete box.__sim;
      },
      get state() {
        return st;
      },
      get mission() {
        return mis;
      },
    };
    box.__sim = api;
    return api;
  }

  // name, icon and help line used by the lesson pages for the free-play tile
  window.NetSim = {
    create,
    icon,
    ICONS: IC,
    TARGETS,
    label: "Mini Outlook & Edge",
    ic: "📧",
    hint: "A pretend Outlook and Edge. Write emails, add contacts, attach files, search for pictures. Hold your finger (or right-click) for more. Nothing can break!",
    about: "Play on a pretend Outlook and Edge",
  };
})();
