// Частини тіла · речення: what hurts, what to wash, the daily care («У мене болить [голова]», «Мені треба помити [руки]»,
// «Я чищу [зуби]»), with the pictures of the body poster (img: ../img/body/; face = the poster's big face).
// Played on the phrases pages (cards, build the sentence, guess the sentence); key / group: its own saved place and back link.
window.SPEECH_PHRASES = {
  lang: "uk-UA",
  img: "../img/body/",
  key: "body-say-",
  group: "Частини тіла",
  groups: [
    {
      t: "У мене болить…",
      cards: [
        { w: "У мене болить [голова]", pic: "head" },
        { w: "У мене болить [живіт]", pic: "belly" },
        { w: "У мене болить [вухо]", pic: "ears" },
        { w: "У мене болить [зуб]", pic: "teeth" },
        { w: "У мене болить [спина]", pic: "back" },
        { w: "У мене болить [нога]", pic: "leg" },
        { w: "У мене болить [рука]", pic: "arm" },
        { w: "У мене болить [коліно]", pic: "knee" },
        { w: "У мене болить [шия]", pic: "neck" },
      ],
    },
    {
      t: "Мені треба помити…",
      cards: [
        { w: "Мені треба помити [руки]", pic: "hand" },
        { w: "Мені треба помити [ноги]", pic: "foot" },
        { w: "Мені треба помити [обличчя]", pic: "face" },
        { w: "Мені треба помити [голову]", pic: "hair" },
        { w: "Мені треба помити [вуха]", pic: "ears" },
        { w: "Мені треба помити [шию]", pic: "neck" },
      ],
    },
    {
      t: "Я…",
      cards: [
        { w: "Я чищу [зуби]", pic: "teeth" },
        { w: "Я розчісую [волосся]", pic: "hair" },
        { w: "Я вмиваю [обличчя]", pic: "face" },
        { w: "Я мию [руки]", pic: "hand" },
        { w: "Я чищу [вуха]", pic: "ears" },
      ],
    },
  ],
};
