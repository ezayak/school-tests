// Положення предметів: one group per position, from the parent's two posters «Положення предметів» (Documents/2026-2027/Alex/Speech).
// t: the position (shown big, said first); f: its family: «біля» and «поруч» mean the same, so the guessing game never asks one
// with the other as a wrong answer; cards: one per poster picture, w = the sentence that says who is where, the position in [ ],
// pic = the picture in ../img/positions/ (<name>.jpg, cut from the posters without their label).
// «зліва від» / «справа від» are left out: the pictures do not show whose left or right.
// snd / wsnd on a card: a recording of the position / the sentence ("audio/pid.mp3", from this folder) instead of the device voice.
window.SPEECH_POSITIONS = {
  lang: "uk-UA",
  groups: [
    {
      t: "на",
      f: "on",
      cards: [
        { w: "Собака [на] коробці", pic: "on-1" },
        { w: "Собака [на] сумці", pic: "on-2" },
        { w: "М’яч [на] столі", pic: "on-table-1" },
        { w: "Книжка і м’яч [на] столі", pic: "on-table-2" },
        { w: "Сумка [на] стільці", pic: "on-chair-1" },
        { w: "Сумка [на] стільці", pic: "on-chair-2" },
        { w: "Планшет [на] дивані", pic: "on-sofa-1" },
        { w: "Планшет [на] дивані", pic: "on-sofa-2" },
      ],
    },
    {
      t: "під",
      f: "under",
      cards: [
        { w: "Кіт [під] столом", pic: "under-1" },
        { w: "Кіт [під] столом", pic: "under-2" },
        { w: "Телефон [під] столом", pic: "under-table-1" },
        { w: "Кіт [під] столом", pic: "under-table-2" },
        { w: "М’яч [під] диваном", pic: "under-sofa-1" },
        { w: "Собака [під] диваном", pic: "under-sofa-2" },
      ],
    },
    {
      t: "біля",
      f: "near",
      cards: [
        { w: "Книжка [біля] коробки", pic: "near-1" },
        { w: "Кіт [біля] книжки", pic: "near-2" },
        { w: "Кіт [біля] столу", pic: "near-table-1" },
        { w: "Кіт [біля] стільця", pic: "near-chair-1" },
      ],
    },
    {
      t: "поруч",
      f: "near",
      cards: [
        { w: "Планшет [поруч] із сумкою", pic: "beside-1" },
        { w: "Планшет [поруч] із м’ячем", pic: "beside-2" },
      ],
    },
    {
      t: "всередині",
      f: "in",
      cards: [
        { w: "Телефон [всередині] коробки", pic: "inside-1" },
        { w: "Телефон [всередині] сумки", pic: "inside-2" },
        { w: "Кіт [всередині] коробки", pic: "in-box-1" },
        { w: "Олівець [всередині] коробки", pic: "in-box-2" },
      ],
    },
    {
      t: "у",
      f: "in",
      cards: [
        { w: "Книжка [у] сумці", pic: "in-bag-1" },
        { w: "Олівець [у] сумці", pic: "in-bag-2" },
      ],
    },
    {
      t: "перед",
      f: "front",
      cards: [
        { w: "М’яч [перед] коробкою", pic: "front-1" },
        { w: "М’яч [перед] книжкою", pic: "front-2" },
      ],
    },
    {
      t: "за",
      f: "behind",
      cards: [
        { w: "Кіт [за] коробкою", pic: "behind-1" },
        { w: "Олівець [за] книжкою", pic: "behind-2" },
        { w: "Собака [за] дверима", pic: "behind-door-1" },
        { w: "Кіт [за] дверима", pic: "behind-door-2" },
      ],
    },
    {
      t: "між",
      f: "between",
      cards: [
        { w: "Олівець [між] книжками", pic: "between-1" },
        { w: "Планшет [між] собакою і котом", pic: "between-2" },
        { w: "Олівець [між] стільцем і столом", pic: "between-chair-table-1" },
        { w: "М’яч [між] стільцем і столом", pic: "between-chair-table-2" },
      ],
    },
    {
      t: "над",
      f: "over",
      cards: [
        { w: "Планшет [над] коробкою", pic: "over-1" },
        { w: "Книжка [над] котом", pic: "over-2" },
      ],
    },
  ],
};
