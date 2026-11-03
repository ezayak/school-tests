// Positions in Arabic (classical, full tashkeel): the Ukrainian cards (../uk/positions.js) with Arabic sentences, the same pictures
// (img: ../../uk/img/positions/). t: the position; f: its family (قُرْبَ and بِجَانِبِ, دَاخِلَ and فِي mean the same);
// cards: w = the sentence (the noun after the position in the genitive), the position in [ ], pic = the picture.
// note: the guessing game's note about the families, in these words.
window.SPEECH_POSITIONS = {
  lang: "ar",
  img: "../../uk/img/positions/",
  // \u2068 … \u2069: each Arabic word isolated, so the English sentence keeps its order
  note: "«\u2068قُرْبَ\u2069» and «\u2068بِجَانِبِ\u2069», «\u2068دَاخِلَ\u2069» and «\u2068فِي\u2069» mean the same.",
  groups: [
    {
      t: "عَلَى",
      f: "on",
      cards: [
        { w: "الْكَلْبُ [عَلَى] الصُّنْدُوقِ", pic: "on-1" },
        { w: "الْكَلْبُ [عَلَى] الْحَقِيبَةِ", pic: "on-2" },
        { w: "الْكُرَةُ [عَلَى] الطَّاوِلَةِ", pic: "on-table-1" },
        { w: "الْكِتَابُ وَالْكُرَةُ [عَلَى] الطَّاوِلَةِ", pic: "on-table-2" },
        { w: "الْحَقِيبَةُ [عَلَى] الْكُرْسِيِّ", pic: "on-chair-1" },
        { w: "الْحَقِيبَةُ [عَلَى] الْكُرْسِيِّ", pic: "on-chair-2" },
        { w: "الْجِهَازُ اللَّوْحِيُّ [عَلَى] الْأَرِيكَةِ", pic: "on-sofa-1" },
        { w: "الْجِهَازُ اللَّوْحِيُّ [عَلَى] الْأَرِيكَةِ", pic: "on-sofa-2" },
      ],
    },
    {
      t: "تَحْتَ",
      f: "under",
      cards: [
        { w: "الْقِطَّةُ [تَحْتَ] الطَّاوِلَةِ", pic: "under-1" },
        { w: "الْقِطَّةُ [تَحْتَ] الطَّاوِلَةِ", pic: "under-2" },
        { w: "الْهَاتِفُ [تَحْتَ] الطَّاوِلَةِ", pic: "under-table-1" },
        { w: "الْقِطَّةُ [تَحْتَ] الطَّاوِلَةِ", pic: "under-table-2" },
        { w: "الْكُرَةُ [تَحْتَ] الْأَرِيكَةِ", pic: "under-sofa-1" },
        { w: "الْكَلْبُ [تَحْتَ] الْأَرِيكَةِ", pic: "under-sofa-2" },
      ],
    },
    {
      t: "قُرْبَ",
      f: "near",
      cards: [
        { w: "الْكِتَابُ [قُرْبَ] الصُّنْدُوقِ", pic: "near-1" },
        { w: "الْقِطَّةُ [قُرْبَ] الْكِتَابِ", pic: "near-2" },
        { w: "الْقِطَّةُ [قُرْبَ] الطَّاوِلَةِ", pic: "near-table-1" },
        { w: "الْقِطَّةُ [قُرْبَ] الْكُرْسِيِّ", pic: "near-chair-1" },
      ],
    },
    {
      t: "بِجَانِبِ",
      f: "near",
      cards: [
        {
          w: "الْجِهَازُ اللَّوْحِيُّ [بِجَانِبِ] الْحَقِيبَةِ",
          pic: "beside-1",
        },
        { w: "الْجِهَازُ اللَّوْحِيُّ [بِجَانِبِ] الْكُرَةِ", pic: "beside-2" },
      ],
    },
    {
      t: "دَاخِلَ",
      f: "in",
      cards: [
        { w: "الْهَاتِفُ [دَاخِلَ] الصُّنْدُوقِ", pic: "inside-1" },
        { w: "الْهَاتِفُ [دَاخِلَ] الْحَقِيبَةِ", pic: "inside-2" },
        { w: "الْقِطَّةُ [دَاخِلَ] الصُّنْدُوقِ", pic: "in-box-1" },
        { w: "الْقَلَمُ [دَاخِلَ] الصُّنْدُوقِ", pic: "in-box-2" },
      ],
    },
    {
      t: "فِي",
      f: "in",
      cards: [
        { w: "الْكِتَابُ [فِي] الْحَقِيبَةِ", pic: "in-bag-1" },
        { w: "الْقَلَمُ [فِي] الْحَقِيبَةِ", pic: "in-bag-2" },
      ],
    },
    {
      t: "أَمَامَ",
      f: "front",
      cards: [
        { w: "الْكُرَةُ [أَمَامَ] الصُّنْدُوقِ", pic: "front-1" },
        { w: "الْكُرَةُ [أَمَامَ] الْكِتَابِ", pic: "front-2" },
      ],
    },
    {
      t: "خَلْفَ",
      f: "behind",
      cards: [
        { w: "الْقِطَّةُ [خَلْفَ] الصُّنْدُوقِ", pic: "behind-1" },
        { w: "الْقَلَمُ [خَلْفَ] الْكِتَابِ", pic: "behind-2" },
        { w: "الْكَلْبُ [خَلْفَ] الْبَابِ", pic: "behind-door-1" },
        { w: "الْقِطَّةُ [خَلْفَ] الْبَابِ", pic: "behind-door-2" },
      ],
    },
    {
      t: "بَيْنَ",
      f: "between",
      cards: [
        { w: "الْقَلَمُ [بَيْنَ] الْكُتُبِ", pic: "between-1" },
        {
          w: "الْجِهَازُ اللَّوْحِيُّ [بَيْنَ] الْكَلْبِ وَالْقِطَّةِ",
          pic: "between-2",
        },
        {
          w: "الْقَلَمُ [بَيْنَ] الْكُرْسِيِّ وَالطَّاوِلَةِ",
          pic: "between-chair-table-1",
        },
        {
          w: "الْكُرَةُ [بَيْنَ] الْكُرْسِيِّ وَالطَّاوِلَةِ",
          pic: "between-chair-table-2",
        },
      ],
    },
    {
      t: "فَوْقَ",
      f: "over",
      cards: [
        { w: "الْجِهَازُ اللَّوْحِيُّ [فَوْقَ] الصُّنْدُوقِ", pic: "over-1" },
        { w: "الْكِتَابُ [فَوْقَ] الْقِطَّةِ", pic: "over-2" },
      ],
    },
  ],
};
