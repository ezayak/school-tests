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
];
// the folder of this file, so a hub in any folder can link to the cards
window.READING_BASE = document.currentScript.src.replace(/[^/]*$/, "");
