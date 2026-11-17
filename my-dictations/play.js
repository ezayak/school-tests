// Plays one of My dictations (play.html?id=…) with the spelling engine: gives shared/spelling.js its data.
// Loaded after shared/dictation-store.js and before shared/spelling.js. No such dictation on this device: back to the list.
(function () {
  const id = new URLSearchParams(location.search).get("id");
  const d = id && MyDict.get(id);
  // none on this device: the list; an Arabic one: its own page (shared/spelling-ar.js)
  if (!d || MyDict.LANGS[d.lang].rtl) {
    location.replace(d ? MyDict.playUrl(d) : "index.html");
    window.SPELLING = { title: "", lang: "en-US", items: [] };
    return;
  }
  window.SPELLING = MyDict.toSpelling(d);
  document.title = d.title;
  document.documentElement.lang = d.lang.split("-")[0];
})();
