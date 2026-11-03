// Постав: the scenes of the placing game (Речення). A scene is drawn in a 400×300 box (floor at 275):
// back = the parts behind a placed thing (the floor, back legs, the inside of a box), front = the parts in front of it.
// zones: the spots a thing can go; f = the meaning (as f in positions.js: one zone serves біля and поруч, всередині and у),
// x, y = its middle in the 400×300 box, s = the thing's size in % of the scene's width, back: 1 = drawn behind the front parts.
// say: the end of the sentence for each position the scene has ("Кіт [під] столом" = thing + position + say).
// things: what is placed (t = the word that starts the sentence, ic = the picture).
window.SPEECH_PLACES = {
  things: [
    { t: "М’яч", ic: "⚽" },
    { t: "Кіт", ic: "🐱" },
    { t: "Собака", ic: "🐶" },
    { t: "Книжка", ic: "📘" },
    { t: "Телефон", ic: "📱" },
  ],
  scenes: [
    {
      name: "стіл",
      back: '<rect class="w2" x="146" y="158" width="12" height="104"/><rect class="w2" x="242" y="158" width="12" height="104"/>',
      front:
        '<rect class="w" x="100" y="146" width="200" height="22" rx="4"/><rect class="w" x="114" y="168" width="16" height="107"/><rect class="w" x="270" y="168" width="16" height="107"/>',
      zones: [
        { f: "on", x: 200, y: 112, s: 16 },
        { f: "over", x: 200, y: 40, s: 14 },
        { f: "under", x: 200, y: 232, s: 14, back: 1 },
        { f: "near", x: 348, y: 240, s: 16 },
      ],
      say: {
        на: "столі",
        над: "столом",
        під: "столом",
        біля: "столу",
        поруч: "зі столом",
      },
    },
    {
      name: "коробка",
      back: "",
      front:
        '<polygon class="b" points="140,175 172,148 292,148 260,175"/><polygon class="b2" points="260,175 292,148 292,250 260,275"/><rect class="b" x="140" y="175" width="120" height="100"/><line x1="200" y1="175" x2="200" y2="200"/>',
      zones: [
        { f: "on", x: 172, y: 122, s: 15 },
        { f: "over", x: 210, y: 36, s: 13 },
        { f: "behind", x: 268, y: 136, s: 15, back: 1 },
        { f: "front", x: 200, y: 262, s: 17 },
        { f: "near", x: 348, y: 245, s: 15 },
      ],
      say: {
        на: "коробці",
        над: "коробкою",
        за: "коробкою",
        перед: "коробкою",
        біля: "коробки",
        поруч: "із коробкою",
      },
    },
    {
      name: "відкрита коробка",
      back: '<polygon class="b3" points="140,175 172,148 292,148 260,175"/><polygon class="b2" points="172,148 292,148 302,112 184,112"/>',
      front:
        '<polygon class="b2" points="260,175 292,148 292,250 260,275"/><rect class="b" x="140" y="175" width="120" height="100"/>',
      zones: [
        { f: "in", x: 216, y: 150, s: 15, back: 1 },
        { f: "over", x: 216, y: 40, s: 13 },
        { f: "front", x: 200, y: 262, s: 17 },
        { f: "near", x: 348, y: 245, s: 15 },
      ],
      say: {
        всередині: "коробки",
        у: "коробці",
        над: "коробкою",
        перед: "коробкою",
        біля: "коробки",
        поруч: "із коробкою",
      },
    },
    {
      name: "стілець",
      back: '<rect class="w2" x="152" y="182" width="10" height="82"/><rect class="w2" x="232" y="182" width="10" height="82"/>',
      front:
        '<rect class="w" x="128" y="70" width="16" height="104" rx="4"/><rect class="w" x="122" y="168" width="140" height="16" rx="4"/><rect class="w" x="130" y="184" width="14" height="91"/><rect class="w" x="244" y="184" width="14" height="91"/>',
      zones: [
        { f: "on", x: 205, y: 136, s: 14 },
        { f: "over", x: 215, y: 36, s: 12 },
        { f: "under", x: 195, y: 240, s: 13, back: 1 },
        { f: "near", x: 335, y: 245, s: 15 },
      ],
      say: {
        на: "стільці",
        над: "стільцем",
        під: "стільцем",
        біля: "стільця",
        поруч: "зі стільцем",
      },
    },
    {
      name: "дві коробки",
      back: "",
      front:
        '<polygon class="b" points="50,190 72,170 172,170 150,190"/><polygon class="b2" points="150,190 172,170 172,255 150,275"/><rect class="b" x="50" y="190" width="100" height="85"/><polygon class="b" points="250,190 272,170 372,170 350,190"/><polygon class="b2" points="350,190 372,170 372,255 350,275"/><rect class="b" x="250" y="190" width="100" height="85"/>',
      zones: [
        { f: "between", x: 211, y: 245, s: 14 },
        { f: "over", x: 211, y: 60, s: 13 },
      ],
      say: { між: "коробками", над: "коробками" },
    },
  ],
};
