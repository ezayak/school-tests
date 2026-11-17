// Plays one of My dictations in Arabic (play-ar.html?id=…) with the Arabic dictation game (shared/spelling-ar.js):
// gives it the same data as the spelling game of the other languages (MyDict.toSpelling).
// Loaded after shared/dictation-store.js and before the engine. None on this device: back to the list; not Arabic: play.html.
(function () {
  const id = new URLSearchParams(location.search).get("id");
  const d = id && MyDict.get(id);
  if (!d || !MyDict.LANGS[d.lang].rtl) {
    location.replace(d ? MyDict.playUrl(d) : "index.html");
    window.SPELLING = { title: "", lang: "ar", items: [] };
    return;
  }
  window.SPELLING = MyDict.toSpelling(d);
  document.title = d.title + " · My dictation";
})();
