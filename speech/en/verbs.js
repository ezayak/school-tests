// Verbs in English: the Ukrainian verbs (../uk/verbs.js) in English, with the same pictures (img: ../../uk/img/things/).
// Groups (t: a button in the cards' panel); a card: t = the verb (shown big, said first), w = how he says it about himself,
// the verb in [ ] («I [eat]»); pic = a collage picture, or ic = an emoji (at most 2, no space).
// snd / wsnd on a card: a recording of the verb / the sentence ("audio/pid.mp3", from this folder) instead of the device voice.
window.SPEECH_VERBS = {
  lang: "en-US",
  img: "../../uk/img/things/",
  groups: [
    {
      t: "At home",
      cards: [
        { t: "eat", w: "I [eat]", pic: "eat" },
        { t: "drink", w: "I [drink]", pic: "water" },
        { t: "sleep", w: "I [sleep]", pic: "sleep" },
        { t: "wash", w: "I [wash]", ic: "🛁" },
        { t: "brush teeth", w: "I [brush] my teeth", ic: "🪥" },
        { t: "get dressed", w: "I [get dressed]", pic: "dress" },
        { t: "cook", w: "I [cook]", ic: "🍳" },
        { t: "clean", w: "I [clean]", ic: "🧹" },
      ],
    },
    {
      t: "Moving",
      cards: [
        { t: "walk", w: "I [walk]", ic: "🚶" },
        { t: "run", w: "I [run]", ic: "🏃" },
        { t: "sit", w: "I [sit]", ic: "🪑" },
        { t: "stand", w: "I [stand]", ic: "🧍" },
        { t: "swim", w: "I [swim]", ic: "🏊" },
        { t: "dance", w: "I [dance]", ic: "💃" },
        { t: "ride", w: "I [ride] my bike", ic: "🚲" },
      ],
    },
    {
      t: "Learn and play",
      cards: [
        { t: "read", w: "I [read]", pic: "read" },
        { t: "write", w: "I [write]", ic: "✍️" },
        { t: "draw", w: "I [draw]", pic: "draw" },
        { t: "play", w: "I [play]", pic: "play" },
        { t: "count", w: "I [count]", ic: "🔢" },
        { t: "listen", w: "I [listen]", ic: "🎧" },
        { t: "look", w: "I [look]", ic: "👀" },
        { t: "talk", w: "I [talk]", ic: "🗣️" },
        { t: "sing", w: "I [sing]", ic: "🎤" },
      ],
    },
  ],
};
