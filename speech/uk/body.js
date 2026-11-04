// Частини тіла: one card per picture of the parent's poster «Частини тіла й обличчя» (Documents/2026-2027/Alex/Speech),
// pictures in ../img/body/ (cut below the labels). Groups: тіло, обличчя (t: a button in the cards' panel).
// A card: t = the word (shown big, said first), w = «Це моя [голова]», pic, f = its family: pictures that look alike
// (рука, зап’ястя, кисть; нога, щиколотка, стопа; очі, вії; рот, зуби, губи; волосся, лоб, скроні; щоки, підборіддя)
// share one, so the guessing game never shows them together. The poster's «грудь» is «груди» here.
// snd / wsnd on a card: a recording of the word / the sentence ("audio/pid.mp3", from this folder) instead of the device voice.
window.SPEECH_BODY = {
  lang: "uk-UA",
  groups: [
    {
      t: "Тіло",
      cards: [
        { t: "голова", w: "Це моя [голова]", pic: "head", f: "head" },
        { t: "шия", w: "Це моя [шия]", pic: "neck", f: "neck" },
        { t: "плече", w: "Це моє [плече]", pic: "shoulder", f: "shoulder" },
        { t: "рука", w: "Це моя [рука]", pic: "arm", f: "arm" },
        { t: "лікоть", w: "Це мій [лікоть]", pic: "elbow", f: "elbow" },
        { t: "зап’ястя", w: "Це моє [зап’ястя]", pic: "wrist", f: "arm" },
        { t: "кисть", w: "Це моя [кисть]", pic: "hand", f: "arm" },
        { t: "спина", w: "Це моя [спина]", pic: "back", f: "back" },
        { t: "груди", w: "Це мої [груди]", pic: "chest", f: "chest" },
        { t: "живіт", w: "Це мій [живіт]", pic: "belly", f: "belly" },
        { t: "нога", w: "Це моя [нога]", pic: "leg", f: "leg" },
        { t: "коліно", w: "Це моє [коліно]", pic: "knee", f: "knee" },
        { t: "щиколотка", w: "Це моя [щиколотка]", pic: "ankle", f: "leg" },
        { t: "стопа", w: "Це моя [стопа]", pic: "foot", f: "leg" },
      ],
    },
    {
      t: "Обличчя",
      cards: [
        { t: "очі", w: "Це мої [очі]", pic: "eyes", f: "eye" },
        { t: "брови", w: "Це мої [брови]", pic: "eyebrows", f: "brow" },
        { t: "вії", w: "Це мої [вії]", pic: "eyelashes", f: "eye" },
        { t: "ніс", w: "Це мій [ніс]", pic: "nose", f: "nose" },
        { t: "рот", w: "Це мій [рот]", pic: "mouth", f: "mouth" },
        { t: "вуха", w: "Це мої [вуха]", pic: "ears", f: "ear" },
        { t: "волосся", w: "Це моє [волосся]", pic: "hair", f: "hair" },
        { t: "лоб", w: "Це мій [лоб]", pic: "forehead", f: "hair" },
        { t: "щоки", w: "Це мої [щоки]", pic: "cheeks", f: "cheek" },
        { t: "підборіддя", w: "Це моє [підборіддя]", pic: "chin", f: "cheek" },
        { t: "язик", w: "Це мій [язик]", pic: "tongue", f: "tongue" },
        { t: "зуби", w: "Це мої [зуби]", pic: "teeth", f: "mouth" },
        { t: "губи", w: "Це мої [губи]", pic: "lips", f: "mouth" },
        { t: "скроні", w: "Це мої [скроні]", pic: "temples", f: "hair" },
      ],
    },
  ],
};
