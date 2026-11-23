// Social Studies · Grade 3 · Term 2 · Mid-term revision (Explorers Quest): Chapter 3 « Communities Build a Nation » · Lesson 2 « Early Explorers ».
// A Quest for shared/quest.js (format at the top of that file). Its card is in games.js (Grade 3 · Term 2 · Mid-term exam).
// Reuses the lesson grade-3/social-studies/chapter-3/lesson-2.js: its questions as Quest questions, its pictures (imgDir points to the lesson's folder).
// Sources (through the lesson): 20261123-chapter 3 lesson 2 2026-2027.pdf (teacher's slides, pp. 1–17),
// 20261123-Term (2) Graded Homework (1) 2026-2027.pdf (p. 1, correct the underlined words).
// No answer key: the answers follow the slides, as in the lesson.
// Left out: the lesson's Learn cards (the lesson has them); « Columbus's trip » (put in order) became two choose questions;
// the three « Words » picture matches became matching rounds (words and meanings, explorers and what they did).

const TF = ["True", "False"];
const COUNTRIES = ["Spain", "France", "England"];
// a question whose answer is one of the three countries (right first, the others after it)
const country = (q, p, right, x) => ({
  l: 2,
  p,
  q,
  o: [right, ...COUNTRIES.filter((c) => c !== right)],
  x,
});
// true or false: a = true / false
const tf = (q, a, p, x) => ({ l: 2, p, q, o: TF, c: a ? 0 : 1, k: 1, x });

window.QUEST = {
  key: "g3ss-t2-mid",
  hub: "../../../index.html",
  eyebrow: "Grade 3 Social Studies · Mid-term 2 revision",
  title: ["Explorers", "Quest"],
  imgDir: "../../social-studies/chapter-3/img/lesson-2",
  cover: "explorers",
  chips: [
    ["Spain", "heat"],
    ["France", "cool"],
    ["England", "pe"],
    ["Graded Homework 1", "ke"],
  ],
  mc: [
    /* ===== Who is it? (the explorers, slides pp. 5, 9, 13, 16) ===== */
    {
      l: 2,
      p: "columbus",
      q: "Who is he?",
      o: ["Christopher Columbus", "Amerigo Vespucci", "John Cabot"],
      x: "This is Christopher Columbus, an Italian explorer who sailed from Spain.",
    },
    {
      l: 2,
      p: "jolliet",
      q: "Who explored the Mississippi River in 1673?",
      o: ["Louis Jolliet", "Christopher Columbus", "John Cabot"],
      x: "Louis Jolliet, a French explorer and mapmaker, explored the Mississippi River in 1673.",
    },
    {
      l: 2,
      p: "columbus-map",
      q: "Who sailed from Spain to North America in 1492?",
      o: ["Christopher Columbus", "Louis Jolliet", "Amerigo Vespucci"],
      x: "Columbus sailed across the Atlantic Ocean in 1492.",
    },
    {
      l: 2,
      p: "amerigo",
      q: "North and South America are named after him. Who is he?",
      o: ["Amerigo Vespucci", "John Cabot", "Christopher Columbus"],
      x: "America is named after Amerigo Vespucci.",
    },
    {
      l: 2,
      p: "cabot",
      q: "He was the first person from England to discover North America. Who is he?",
      o: ["John Cabot", "Amerigo Vespucci", "Louis Jolliet"],
      x: "John Cabot was an Italian explorer who sailed for England.",
    },
    {
      l: 2,
      p: "indians-meet",
      q: "Who called the people he met “Indians”?",
      o: ["Christopher Columbus", "Louis Jolliet", "John Cabot"],
      x: "Columbus thought he was in the Indies, in Asia.",
    },

    /* ===== Which country? (slides pp. 4–17) ===== */
    country(
      "Columbus sailed from this country.",
      "columbus-map",
      "Spain",
      "Columbus was Italian, but he sailed from Spain.",
    ),
    country(
      "Amerigo Vespucci sailed from this country.",
      "amerigo",
      "Spain",
      "Amerigo Vespucci was Italian. He sailed from Spain.",
    ),
    country(
      "Its main goal was wealth.",
      "wealth",
      "France",
      "France's main goal was wealth: a large amount of money.",
    ),
    country(
      "Many of its settlers were fur traders.",
      "fur-traders",
      "France",
      "Many early French settlers were fur traders.",
    ),
    country(
      "It wanted to become more powerful by claiming land.",
      "age-exploration",
      "England",
      "Great Britain wanted to become more powerful by claiming land.",
    ),
    country(
      "Its explorers searched for gold and other riches.",
      "gold",
      "Spain",
      "The Spanish (from Spain) searched for gold and other riches.",
    ),
    country(
      "Louis Jolliet was an explorer from this country.",
      "jolliet",
      "France",
      "Louis Jolliet was a French explorer.",
    ),
    country(
      "Henry Hudson, Francis Drake and James Cook were explorers from this country.",
      "uk-flag",
      "England",
      "They were English explorers.",
    ),

    /* ===== Graded Homework (1), Term 2: correct the underlined word ===== */
    {
      l: 2,
      p: "columbus",
      q: "Correct the word: Christopher Columbus was an AMERICAN explorer.",
      o: ["Italian", "French", "English"],
      x: "Christopher Columbus was an Italian explorer. He sailed from Spain.",
    },
    {
      l: 2,
      p: "routes",
      q: "Correct the word: Spain wanted Christopher Columbus to sail to LONDON to search for spices.",
      o: ["China", "Florida", "France"],
      x: "Spain wanted Columbus to sail to China, in Asia, to search for spices.",
    },
    {
      l: 2,
      p: "france-flag",
      q: "Correct the word: France's main goal was GOLD.",
      o: ["wealth", "spices", "land"],
      x: "France's main goal was wealth: a large amount of money. The Spanish searched for gold.",
    },
    {
      l: 2,
      p: "indians-meet",
      q: "Correct the words: The first people who lived in America were called AMERICANS.",
      o: ["Native Indians", "Explorers", "Fur traders"],
      x: "Native Indians were the first people to live in America.",
    },
    {
      l: 2,
      p: "fur-traders",
      q: "Correct the words: French people were SPICE TRADERS.",
      o: ["fur traders", "gold traders", "explorers of China"],
      x: "Many early French settlers were fur traders: they bought and sold animal furs.",
    },

    /* ===== True or false (slides pp. 2–16) ===== */
    tf(
      "Explorers from Spain, France and England searched for a water route to Asia.",
      true,
      "explorers",
      "They searched for a water route to Asia, spices and gold.",
    ),
    tf(
      "Explorers thought going to Asia by land was faster than by water.",
      false,
      "ships-asia",
      "They thought going by water might take less time than by land.",
    ),
    tf(
      "Columbus sailed from Spain to North America in 1492.",
      true,
      "columbus-map",
      "Columbus sailed from Spain in 1492.",
    ),
    tf(
      "Columbus arrived in China.",
      false,
      "florida-map",
      "He thought he was sailing to China, but he landed in the area we call Florida.",
    ),
    tf(
      "Spices helped keep food from spoiling.",
      true,
      "spice-uses",
      "Spices made food taste better and kept it from spoiling.",
    ),
    tf(
      "Amerigo Vespucci was a French explorer.",
      false,
      "amerigo",
      "Amerigo Vespucci was an Italian explorer. He sailed from Spain.",
    ),
    tf(
      "Louis Jolliet explored the Mississippi River in 1673.",
      true,
      "jolliet",
      "Louis Jolliet, a French explorer and mapmaker, explored the Mississippi River in 1673.",
    ),
    tf(
      "Great Britain wanted to become more powerful by claiming land.",
      true,
      "age-exploration",
      "To claim land is to say it belongs to you.",
    ),
    tf(
      "John Cabot was an English explorer.",
      false,
      "cabot",
      "John Cabot was an Italian explorer. He was the first person from England to discover North America.",
    ),

    /* ===== Choose (slides pp. 3–15) ===== */
    {
      l: 2,
      p: "ships-asia",
      q: "A person who travels looking for new lands and discoveries is an …",
      o: ["explorer", "trader", "mapmaker"],
      x: "An explorer travels to find new lands.",
    },
    {
      l: 2,
      p: "routes",
      q: "The way you take to get somewhere is a …",
      o: ["route", "claim", "wealth"],
      x: "A route is the way you take to get somewhere.",
    },
    {
      l: 2,
      p: "fur-traders",
      q: "A person who buys and sells goods is a …",
      o: ["trader", "explorer", "king"],
      x: "A trader buys and sells goods.",
    },
    {
      l: 2,
      p: "indians-meet",
      q: "Why did Columbus call the people “Indians”?",
      o: [
        "He thought he was in the Indies, in Asia.",
        "They came from India with him.",
        "They told him their name.",
      ],
      x: "Columbus thought he had landed in an area of Asia called the Indies.",
    },
    {
      l: 2,
      p: "culture",
      q: "The Spanish also wanted to change the Native Indians' …",
      o: ["religion and culture", "rivers and lakes", "ships"],
      x: "They wanted to change their religion and culture.",
    },
    {
      l: 2,
      p: "age-exploration",
      q: "To claim something is to …",
      o: ["say it belongs to you", "buy and sell it", "cook with it"],
      x: "To claim something is to say it belongs to you.",
    },

    /* ===== Columbus's trip (the lesson's « put in order », slides pp. 5–8) ===== */
    {
      l: 2,
      p: "landing",
      q: "Columbus thought he was sailing to China. Where did he land?",
      o: ["In the area we call Florida", "In China", "In England"],
      x: "He did not arrive in Asia: he landed in the area we call Florida.",
    },
    {
      l: 2,
      p: "china",
      q: "Columbus's trip: what happened first?",
      o: [
        "He sailed from Spain in 1492.",
        "He landed in the area we call Florida.",
        "He called the people there “Indians”.",
      ],
      x: "First he sailed from Spain, then he landed in Florida and met the people he called “Indians”.",
    },
  ],
  mt: [
    {
      l: 2,
      t: "Match each word to its meaning",
      p: [
        [
          "🧭",
          "Explorer",
          "A person who travels looking for new lands and discoveries",
        ],
        ["🗺️", "Route", "The way you take to get somewhere"],
        [
          "🌶️",
          "Spices",
          "Plants that make food taste better and keep it from spoiling",
        ],
        ["💰", "Wealth", "A large amount of money"],
      ],
    },
    {
      l: 2,
      t: "Match each word to its meaning",
      p: [
        ["🛍️", "Trader", "A person who buys and sells goods"],
        ["🦫", "Fur traders", "People who buy and sell animal furs"],
        ["🙋", "Claim", "To say that something belongs to you"],
        ["🏕️", "Native Indians", "The first people to live in America"],
      ],
    },
    {
      l: 2,
      t: "Match each explorer to what he did",
      p: [
        ["⛵", "Christopher Columbus", "Sailed from Spain in 1492"],
        ["🌎", "Amerigo Vespucci", "America is named after him"],
        ["🏞️", "Louis Jolliet", "Explored the Mississippi River"],
        [
          "🇬🇧",
          "John Cabot",
          "First person from England to discover North America",
        ],
      ],
    },
  ],
};
