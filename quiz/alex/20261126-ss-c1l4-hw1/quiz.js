// Sheet quiz: Social Studies Grade 4, Graded Homework (1), Term 2, due 24 November 2026: Chapter 1 « Geography of the United States »,
// Lesson 4 « People and the Land » (myWorld Interactive 4).
// Source: the parent's Telegram photo (job 20261126-071517-quiz-alex, p-1). Pictures: the app's lesson 4 (grade-4/social-studies/chapter-1/img/lesson-4/).
// Changed to fit the quiz: the two open questions (A) and the three blanks (B) made into choices of 3 answers. Format: the top of shared/sheet-quiz.js; rules: the `sheet-quiz` skill.

const IMG = "../../../grade-4/social-studies/chapter-1/img/lesson-4/";
const A = "A · Answer the following questions";
const B = "B · Write the correct term for each of the definition below";

window.SHEET = {
  key: "quiz-alex-20261126-ss-c1l4-hw1",
  lang: "en",
  eyebrow: "Social Studies · Graded Homework (1) · Chapter 1 Lesson 4",
  title: ["People and", "the Land"],
  imgDir: "img",
  cover: { p: IMG + "t-cover.jpg" },
  qs: [
    {
      n: "A1",
      part: A,
      q: "How did people protect the Ogallala Aquifer?",
      help: "The Ogallala Aquifer is a lot of water under the ground. Farms use this water. It means: what did people do so the water is not lost? Think: first the water went in open ditches. The sun dried up a lot of it.",
      p: IMG + "ogallala-map.jpg",
      o: [
        "They carried the water in open ditches in the sun.",
        "They built tunnels under the ground to carry the water.",
        "They pumped out more water for the farms.",
      ],
    },
    {
      n: "A2",
      part: A,
      q: "Why did American Indians change the land by burning forests?",
      help: "Long ago, American Indians made fires in forests and prairies. It means: what did the fire do for them? Think about the land and the soil after the fire.",
      p: IMG + "t-burn.jpg",
      o: [
        "To clear the land and make rich soil for new plants.",
        "To build big cities and roads.",
        "To keep warm in the winter.",
      ],
    },
    {
      n: "B1",
      part: B,
      q: "______ using technology to bring water to crops.",
      help: "Crops are the plants on a farm. Pipes and machines take water to them. What is the word for this?",
      p: IMG + "pivot.jpg",
      o: ["Aquifer", "Erosion", "Irrigation"],
    },
    {
      n: "B2",
      part: B,
      q: "An ______ is an underground layer of rocks that holds water.",
      help: "Underground means under the ground. Here there is rock with water in it. What is the word for this?",
      p: IMG + "e-aquifer.jpg",
      o: ["aquifer", "island", "irrigation"],
    },
    {
      n: "B3",
      part: B,
      q: "______ is a house built on or near a beach.",
      help: "A beach is sand next to the sea. Some houses there stand on tall poles. What do we call this kind of house?",
      p: IMG + "t-beach-house.jpg",
      o: ["Beach house", "Skyway", "Snow house"],
    },
  ],
};
