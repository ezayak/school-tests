// Put it there, in Arabic: loads after ../uk/places.js (the scenes' drawings and spots) and puts in the Arabic words.
// things: t = the start of the sentence («الْقِطَّةُ»); say: for each scene in its order, the end of the sentence for each
// position it has, in the genitive («الْقِطَّةُ [تَحْتَ] الطَّاوِلَةِ» = thing + position + say).
(function (P) {
  P.things = [
    { t: "الْكُرَةُ", ic: "⚽" },
    { t: "الْقِطَّةُ", ic: "🐱" },
    { t: "الْكَلْبُ", ic: "🐶" },
    { t: "الْكِتَابُ", ic: "📘" },
    { t: "الْهَاتِفُ", ic: "📱" },
  ];
  const table = "الطَّاوِلَةِ",
    box = "الصُّنْدُوقِ",
    chair = "الْكُرْسِيِّ",
    boxes = "الصُّنْدُوقَيْنِ";
  const say = [
    // the table
    {
      عَلَى: table,
      فَوْقَ: table,
      تَحْتَ: table,
      قُرْبَ: table,
      بِجَانِبِ: table,
    },
    // the box
    {
      عَلَى: box,
      فَوْقَ: box,
      خَلْفَ: box,
      أَمَامَ: box,
      قُرْبَ: box,
      بِجَانِبِ: box,
    },
    // the open box
    {
      دَاخِلَ: box,
      فِي: box,
      فَوْقَ: box,
      أَمَامَ: box,
      قُرْبَ: box,
      بِجَانِبِ: box,
    },
    // the chair
    {
      عَلَى: chair,
      فَوْقَ: chair,
      تَحْتَ: chair,
      قُرْبَ: chair,
      بِجَانِبِ: chair,
    },
    // two boxes
    { بَيْنَ: boxes, فَوْقَ: boxes },
  ];
  P.scenes.forEach((sc, k) => (sc.say = say[k]));
})(window.SPEECH_PLACES);
