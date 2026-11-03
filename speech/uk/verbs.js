// Дії: everyday verbs in groups (t: the group, a button in the cards' panel). A card: t = the verb (shown big, said first),
// w = how he says it about himself, the verb in [ ] («Я [їм]»); pic = a picture of the parent's collage in ../img/things/,
// or ic = an emoji (at most 2, no space) when the collage has none.
// snd / wsnd on a card: a recording of the verb / the sentence ("audio/pid.mp3", from this folder) instead of the device voice.
window.SPEECH_VERBS = {
  lang: "uk-UA",
  groups: [
    {
      t: "Вдома",
      cards: [
        { t: "їсти", w: "Я [їм]", pic: "eat" },
        { t: "пити", w: "Я [п’ю]", pic: "water" },
        { t: "спати", w: "Я [сплю]", pic: "sleep" },
        { t: "митися", w: "Я [миюся]", ic: "🛁" },
        { t: "чистити зуби", w: "Я [чищу] зуби", ic: "🪥" },
        { t: "одягатися", w: "Я [одягаюся]", pic: "dress" },
        { t: "готувати", w: "Я [готую]", ic: "🍳" },
        { t: "прибирати", w: "Я [прибираю]", ic: "🧹" },
      ],
    },
    {
      t: "Рухаюся",
      cards: [
        { t: "ходити", w: "Я [ходжу]", ic: "🚶" },
        { t: "бігати", w: "Я [бігаю]", ic: "🏃" },
        { t: "сидіти", w: "Я [сиджу]", ic: "🪑" },
        { t: "стояти", w: "Я [стою]", ic: "🧍" },
        { t: "плавати", w: "Я [плаваю]", ic: "🏊" },
        { t: "танцювати", w: "Я [танцюю]", ic: "💃" },
        { t: "їхати", w: "Я [їду]", ic: "🚲" },
      ],
    },
    {
      t: "Вчуся і граю",
      cards: [
        { t: "читати", w: "Я [читаю]", pic: "read" },
        { t: "писати", w: "Я [пишу]", ic: "✍️" },
        { t: "малювати", w: "Я [малюю]", pic: "draw" },
        { t: "грати", w: "Я [граю]", pic: "play" },
        { t: "рахувати", w: "Я [рахую]", ic: "🔢" },
        { t: "слухати", w: "Я [слухаю]", ic: "🎧" },
        { t: "дивитися", w: "Я [дивлюся]", ic: "👀" },
        { t: "говорити", w: "Я [говорю]", ic: "🗣️" },
        { t: "співати", w: "Я [співаю]", ic: "🎤" },
      ],
    },
  ],
};
