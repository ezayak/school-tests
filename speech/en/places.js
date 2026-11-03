// Put it there, in English: loads after ../uk/places.js (the scenes' drawings and spots) and puts in the English words.
// things: t = the start of the sentence ("The cat is"); say: for each scene in its order, the end of the sentence
// for each position it has ("The cat is [under] the table" = thing + position + say).
(function (P) {
  P.things = [
    { t: "The ball is", ic: "⚽" },
    { t: "The cat is", ic: "🐱" },
    { t: "The dog is", ic: "🐶" },
    { t: "The book is", ic: "📘" },
    { t: "The phone is", ic: "📱" },
  ];
  const say = [
    // the table
    {
      on: "the table",
      above: "the table",
      under: "the table",
      near: "the table",
      "next to": "the table",
    },
    // the box
    {
      on: "the box",
      above: "the box",
      behind: "the box",
      "in front of": "the box",
      near: "the box",
      "next to": "the box",
    },
    // the open box
    {
      inside: "the box",
      in: "the box",
      above: "the box",
      "in front of": "the box",
      near: "the box",
      "next to": "the box",
    },
    // the chair
    {
      on: "the chair",
      above: "the chair",
      under: "the chair",
      near: "the chair",
      "next to": "the chair",
    },
    // two boxes
    { between: "the boxes", above: "the boxes" },
  ];
  P.scenes.forEach((sc, k) => (sc.say = say[k]));
})(window.SPEECH_PLACES);
