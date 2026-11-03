// Я хочу…: one group per start of a sentence (t, shown big and said first), from the parent's list («Я хочу їсти…»,
// «Дай мені…», «Я не хочу…», «Мені потрібно…»); cards: one per picture of the collage «Україномовний колаж навчальних
// карток» (Documents/2026-2027/Alex/Speech), w = the whole sentence, the thing in [ ], pic = the picture in ../img/things/.
// snd / wsnd on a card: a recording of the start / the sentence ("audio/pid.mp3", from this folder) instead of the device voice.
window.SPEECH_PHRASES = {
  lang: "uk-UA",
  groups: [
    {
      t: "Я хочу їсти…",
      cards: [
        { w: "Я хочу їсти [яблуко]", pic: "apple" },
        { w: "Я хочу їсти [банан]", pic: "banana" },
        { w: "Я хочу їсти [сендвіч]", pic: "sandwich" },
        { w: "Я хочу їсти [піцу]", pic: "pizza" },
        { w: "Я хочу їсти [морозиво]", pic: "icecream" },
      ],
    },
    {
      t: "Я хочу пити…",
      cards: [{ w: "Я хочу пити [воду]", pic: "water" }],
    },
    {
      t: "Дай мені…",
      cards: [
        { w: "Дай мені [олівець]", pic: "pencil" },
        { w: "Дай мені [ручку]", pic: "pen" },
        { w: "Дай мені [зошит]", pic: "notebook" },
        { w: "Дай мені [книгу]", pic: "book" },
        { w: "Дай мені [ластик]", pic: "eraser" },
        { w: "Дай мені [рюкзак]", pic: "backpack" },
        { w: "Дай мені [м’яч]", pic: "ball" },
        { w: "Дай мені [телефон]", pic: "phone" },
        { w: "Дай мені [планшет]", pic: "tablet" },
      ],
    },
    {
      t: "Я хочу…",
      cards: [
        { w: "Я хочу [читати]", pic: "read" },
        { w: "Я хочу [малювати]", pic: "draw" },
        { w: "Я хочу [грати]", pic: "play" },
        { w: "Я хочу грати в [шахи]", pic: "chess" },
        { w: "Я хочу грати в [пазли]", pic: "puzzle" },
        { w: "Я хочу грати в [конструктор]", pic: "blocks" },
        { w: "Я хочу грати в [ігри]", pic: "games" },
      ],
    },
    {
      t: "Я не хочу…",
      cards: [
        { w: "Я не хочу [лягати спати]", pic: "sleep" },
        { w: "Я не хочу [їсти]", pic: "eat" },
        { w: "Я не хочу [одягатися]", pic: "dress" },
        { w: "Я не хочу [малювати]", pic: "draw" },
      ],
    },
    {
      t: "Мені потрібно…",
      cards: [
        { w: "Мені потрібно [в туалет]", pic: "toilet" },
        { w: "Мені потрібно [одягатися]", pic: "dress" },
        { w: "Мені потрібно [прати одяг]", pic: "wash" },
        { w: "Мені потрібно [викинути сміття]", pic: "trash" },
        { w: "Мені потрібно [лягати спати]", pic: "sleep" },
      ],
    },
  ],
};
