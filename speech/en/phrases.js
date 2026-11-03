// I want…: the Ukrainian sentence starts (../uk/phrases.js) in English, with the same collage pictures (img: ../../uk/img/things/).
// One group per start of a sentence (t, shown big and said first); cards: w = the whole sentence, the thing in [ ], pic = the picture.
// snd / wsnd on a card: a recording of the start / the sentence ("audio/pid.mp3", from this folder) instead of the device voice.
window.SPEECH_PHRASES = {
  lang: "en-US",
  img: "../../uk/img/things/",
  groups: [
    {
      t: "I want to eat…",
      cards: [
        { w: "I want to eat an [apple]", pic: "apple" },
        { w: "I want to eat a [banana]", pic: "banana" },
        { w: "I want to eat a [sandwich]", pic: "sandwich" },
        { w: "I want to eat [pizza]", pic: "pizza" },
        { w: "I want to eat [ice cream]", pic: "icecream" },
      ],
    },
    {
      t: "I want to drink…",
      cards: [{ w: "I want to drink [water]", pic: "water" }],
    },
    {
      t: "Give me…",
      cards: [
        { w: "Give me a [pencil]", pic: "pencil" },
        { w: "Give me a [pen]", pic: "pen" },
        { w: "Give me a [notebook]", pic: "notebook" },
        { w: "Give me a [book]", pic: "book" },
        { w: "Give me an [eraser]", pic: "eraser" },
        { w: "Give me my [backpack]", pic: "backpack" },
        { w: "Give me the [ball]", pic: "ball" },
        { w: "Give me my [phone]", pic: "phone" },
        { w: "Give me the [tablet]", pic: "tablet" },
      ],
    },
    {
      t: "I want to…",
      cards: [
        { w: "I want to [read]", pic: "read" },
        { w: "I want to [draw]", pic: "draw" },
        { w: "I want to [play]", pic: "play" },
        { w: "I want to play [chess]", pic: "chess" },
        { w: "I want to do a [puzzle]", pic: "puzzle" },
        { w: "I want to play with [blocks]", pic: "blocks" },
        { w: "I want to play [games]", pic: "games" },
      ],
    },
    {
      t: "I don’t want to…",
      cards: [
        { w: "I don’t want to [go to bed]", pic: "sleep" },
        { w: "I don’t want to [eat]", pic: "eat" },
        { w: "I don’t want to [get dressed]", pic: "dress" },
        { w: "I don’t want to [draw]", pic: "draw" },
      ],
    },
    {
      t: "I need to…",
      cards: [
        { w: "I need to [go to the bathroom]", pic: "toilet" },
        { w: "I need to [get dressed]", pic: "dress" },
        { w: "I need to [wash my clothes]", pic: "wash" },
        { w: "I need to [take out the trash]", pic: "trash" },
        { w: "I need to [go to bed]", pic: "sleep" },
      ],
    },
  ],
};
