// The English ABC: one card per letter, a simple word for each with an emoji picture (the cards of the Ukrainian ABC in English).
// up / lo: the letter; name: what the voice says for the letter (its name, as the uppercase letter: a US voice says «ay», «bee»);
// w: the word, its letter in [ ]; ic: the picture (emoji); k: v = vowel (red), none = consonant (blue).
// snd / wsnd: a recording of the letter / the word ("audio/b.mp3", from this folder) instead of the device voice.
window.SPEECH_LETTERS = {
  lang: "en-US",
  items: [
    { up: "A", lo: "a", name: "A", w: "[a]pple", ic: "🍎", k: "v" },
    { up: "B", lo: "b", name: "B", w: "[b]all", ic: "⚽" },
    { up: "C", lo: "c", name: "C", w: "[c]at", ic: "🐱" },
    { up: "D", lo: "d", name: "D", w: "[d]og", ic: "🐶" },
    { up: "E", lo: "e", name: "E", w: "[e]gg", ic: "🥚", k: "v" },
    { up: "F", lo: "f", name: "F", w: "[f]ish", ic: "🐟" },
    { up: "G", lo: "g", name: "G", w: "[g]rapes", ic: "🍇" },
    { up: "H", lo: "h", name: "H", w: "[h]at", ic: "🎩" },
    { up: "I", lo: "i", name: "I", w: "[i]ce", ic: "🧊", k: "v" },
    { up: "J", lo: "j", name: "J", w: "[j]uice", ic: "🧃" },
    { up: "K", lo: "k", name: "K", w: "[k]ey", ic: "🔑" },
    { up: "L", lo: "l", name: "L", w: "[l]ion", ic: "🦁" },
    { up: "M", lo: "m", name: "M", w: "[m]oon", ic: "🌙" },
    { up: "N", lo: "n", name: "N", w: "[n]ose", ic: "👃" },
    { up: "O", lo: "o", name: "O", w: "[o]range", ic: "🍊", k: "v" },
    { up: "P", lo: "p", name: "P", w: "[p]ig", ic: "🐷" },
    { up: "Q", lo: "q", name: "Q", w: "[q]ueen", ic: "👸" },
    { up: "R", lo: "r", name: "R", w: "[r]abbit", ic: "🐰" },
    { up: "S", lo: "s", name: "S", w: "[s]un", ic: "☀️" },
    { up: "T", lo: "t", name: "T", w: "[t]ree", ic: "🌳" },
    { up: "U", lo: "u", name: "U", w: "[u]mbrella", ic: "☂️", k: "v" },
    { up: "V", lo: "v", name: "V", w: "[v]an", ic: "🚐" },
    { up: "W", lo: "w", name: "W", w: "[w]hale", ic: "🐳" },
    { up: "X", lo: "x", name: "X", w: "bo[x]", ic: "📦" },
    { up: "Y", lo: "y", name: "Y", w: "[y]arn", ic: "🧶" },
    { up: "Z", lo: "z", name: "Z", w: "[z]ebra", ic: "🦓" },
  ],
};
