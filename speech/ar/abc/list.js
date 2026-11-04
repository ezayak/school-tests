// ABC (Speech, Arabic): the games of this group, one card each (path: a page in this folder). The interface is in English,
// as in the Arabic lessons; the letters and words are classical Arabic.
window.SPEECH_LIST = {
  title: "الْحُرُوف · ABC",
  intro:
    "Choose a game. Cards: first the letter's name, then the word. Guess the letter: listen and find it. Build the word: put the letters in order. Catch the letter: tap only that letter.",
  items: [
    {
      n: 1,
      title: "Cards",
      en: "Letter, pause, word",
      path: "cards.html",
      ic: "🔤",
      note: "28 letters",
    },
    {
      n: 2,
      title: "Guess the letter",
      en: "Listen and tap the letter",
      path: "guess.html",
      ic: "👂",
      note: "10 letters a game",
    },
    {
      n: 3,
      title: "Build the word",
      en: "A word from letters: with the word or the picture only",
      path: "build.html",
      ic: "🧱",
      note: "28 words · 8 a game",
    },
    {
      n: 4,
      title: "Catch the letter",
      en: "Tap the letter that flies",
      path: "fly.html",
      ic: "🎈",
      note: "10 letters a game",
    },
  ],
};
