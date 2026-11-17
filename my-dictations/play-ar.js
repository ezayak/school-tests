// Plays one of My dictations in Arabic (play-ar.html?id=…) with the Arabic lesson engine
// (grade-3/term-1/arabic/arabic-lesson.js, not changed): gives it the dictation as window.LESSON (MyDict.toArabicLesson).
// Loaded after shared/dictation-store.js and before the engine. None on this device: back to the list; not Arabic: play.html.
(function () {
  const id = new URLSearchParams(location.search).get("id");
  const d = id && MyDict.get(id);
  if (!d || !MyDict.LANGS[d.lang].rtl) {
    location.replace(d ? MyDict.playUrl(d) : "index.html");
    window.LESSON = { title: "", tabs: [{ k: "w", t: "", ar: "" }] };
    return;
  }
  window.LESSON = MyDict.toArabicLesson(d);
  document.title = d.title + " · My dictation";
})();
