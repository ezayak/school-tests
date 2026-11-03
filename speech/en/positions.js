// Positions in English: the Ukrainian cards (../uk/positions.js) with English sentences, the same pictures (img: ../../uk/img/positions/).
// t: the position (shown big, said first); f: its family: «near» and «next to», «inside» and «in» mean the same, so the guessing game
// never asks one with the other as a wrong answer; cards: w = the sentence, the position in [ ], pic = the picture.
// snd / wsnd on a card: a recording of the position / the sentence ("audio/pid.mp3", from this folder) instead of the device voice.
window.SPEECH_POSITIONS = {
  lang: "en-US",
  img: "../../uk/img/positions/",
  groups: [
    {
      t: "on",
      f: "on",
      cards: [
        { w: "The dog is [on] the box", pic: "on-1" },
        { w: "The dog is [on] the bag", pic: "on-2" },
        { w: "The ball is [on] the table", pic: "on-table-1" },
        { w: "The book and the ball are [on] the table", pic: "on-table-2" },
        { w: "The bag is [on] the chair", pic: "on-chair-1" },
        { w: "The bag is [on] the chair", pic: "on-chair-2" },
        { w: "The tablet is [on] the sofa", pic: "on-sofa-1" },
        { w: "The tablet is [on] the sofa", pic: "on-sofa-2" },
      ],
    },
    {
      t: "under",
      f: "under",
      cards: [
        { w: "The cat is [under] the table", pic: "under-1" },
        { w: "The cat is [under] the table", pic: "under-2" },
        { w: "The phone is [under] the table", pic: "under-table-1" },
        { w: "The cat is [under] the table", pic: "under-table-2" },
        { w: "The ball is [under] the sofa", pic: "under-sofa-1" },
        { w: "The dog is [under] the sofa", pic: "under-sofa-2" },
      ],
    },
    {
      t: "near",
      f: "near",
      cards: [
        { w: "The book is [near] the box", pic: "near-1" },
        { w: "The cat is [near] the book", pic: "near-2" },
        { w: "The cat is [near] the table", pic: "near-table-1" },
        { w: "The cat is [near] the chair", pic: "near-chair-1" },
      ],
    },
    {
      t: "next to",
      f: "near",
      cards: [
        { w: "The tablet is [next to] the bag", pic: "beside-1" },
        { w: "The tablet is [next to] the ball", pic: "beside-2" },
      ],
    },
    {
      t: "inside",
      f: "in",
      cards: [
        { w: "The phone is [inside] the box", pic: "inside-1" },
        { w: "The phone is [inside] the bag", pic: "inside-2" },
        { w: "The cat is [inside] the box", pic: "in-box-1" },
        { w: "The pencil is [inside] the box", pic: "in-box-2" },
      ],
    },
    {
      t: "in",
      f: "in",
      cards: [
        { w: "The book is [in] the bag", pic: "in-bag-1" },
        { w: "The pencil is [in] the bag", pic: "in-bag-2" },
      ],
    },
    {
      t: "in front of",
      f: "front",
      cards: [
        { w: "The ball is [in front of] the box", pic: "front-1" },
        { w: "The ball is [in front of] the book", pic: "front-2" },
      ],
    },
    {
      t: "behind",
      f: "behind",
      cards: [
        { w: "The cat is [behind] the box", pic: "behind-1" },
        { w: "The pencil is [behind] the book", pic: "behind-2" },
        { w: "The dog is [behind] the door", pic: "behind-door-1" },
        { w: "The cat is [behind] the door", pic: "behind-door-2" },
      ],
    },
    {
      t: "between",
      f: "between",
      cards: [
        { w: "The pencil is [between] the books", pic: "between-1" },
        { w: "The tablet is [between] the dog and the cat", pic: "between-2" },
        {
          w: "The pencil is [between] the chair and the table",
          pic: "between-chair-table-1",
        },
        {
          w: "The ball is [between] the chair and the table",
          pic: "between-chair-table-2",
        },
      ],
    },
    {
      t: "above",
      f: "over",
      cards: [
        { w: "The tablet is [above] the box", pic: "over-1" },
        { w: "The book is [above] the cat", pic: "over-2" },
      ],
    },
  ],
};
