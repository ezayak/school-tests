// Arabic reading (Grade 3 and Grade 4): one card per step, in the order of the booklet «خطة علاجية للقراءة والكتابة».
// Both Arabic hubs load this file and show it as their Reading section; paths are from this folder.
window.READING = [
  {
    n: 1,
    nAr: "الْأُولَى",
    title: "الْحُرُوفُ وَالْحَرَكَاتُ",
    en: "Letters and harakat",
    path: "letters.html",
    cover: "img/letters/cover.jpg",
    note: "28 letters to read · 6 games · progress checks 1–4",
  },
  {
    n: 2,
    nAr: "الثَّانِيَةُ",
    title: "قِرَاءَةُ كَلِمَاتٍ بَسِيطَةٍ",
    en: "Three-letter words",
    path: "words.html",
    cover: "img/words/cover.jpg",
    note: "65 words to read · 6 games: hear, harakat, picture, blend, order, letter flower",
  },
  {
    n: 3,
    nAr: "الثَّالِثَةُ",
    title: "الْمَدُّ: ا – و – ي",
    en: "Madd: the long vowels ا و ي",
    path: "madd.html",
    cover: "img/madd/cover.jpg",
    note: "89 words to read · 5 games: the madd letter, short or long, the missing letter, picture, order",
  },
  {
    n: 4,
    nAr: "الرَّابِعَةُ",
    title: "الْمَقَاطِعُ السَّاكِنَةُ",
    en: "Sukun and syllables",
    path: "sukun.html",
    cover: "img/sukun/cover.jpg",
    note: "34 words to read · 5 games: hear, where is the sukun, split into syllables, correct the split, the missing syllable",
  },
];
// the folder of this file, so a hub in any folder can link to the cards
window.READING_BASE = document.currentScript.src.replace(/[^/]*$/, "");
