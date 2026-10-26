// English · Grade 4 · Term 1. Add one entry per lesson, dictation or story (newest last), and its files to "also" in games.js for offline use.
window.ENGLISH = {
  grade: 4,
  term: 1,
  heading: "Lessons, dictations & stories",
  intro:
    "Pick a lesson, a dictation or a story. Lessons have the booklet stories, words, grammar and idioms with moving pictures, games and the booklet exercises. Everything is read aloud.",
  items: [
    {
      kind: "Lesson",
      title: "Unit 1 · Week 3",
      sound: "Compound sentences",
      words:
        "FANBOYS · long e · 8 words · The Talent Show, Stormy Weather, An Honestly Fun Camp, A Surprise for Emily",
      note: "5 stories · 15 exercise sets",
      path: "unit1-week3.html",
    },
    {
      kind: "Lesson",
      title: "Unit 1 · Week 4",
      sound: "Complex sentences",
      words: "Clauses · subordinating conjunctions · long i · 12 idioms",
      note: "12 idioms · 15 exercise sets",
      path: "unit1-week4.html",
    },
    {
      kind: "Lesson",
      title: "Unit 1 · Week 5",
      sound: "Run-on sentences",
      words:
        "Fragments · long o · suffixes · 8 words · A Helping Hand, homework, pets",
      note: "3 texts · 17 exercise sets",
      path: "unit1-week5.html",
    },
    {
      kind: "Dictation",
      title: "Unit 1 · Week 3",
      sound: "Long e",
      date: "28 Sep",
      words: "zebra, deed, concrete, belief, honey, breathe, family, receive",
      note: "8 words & 8 sentences",
      path: "english-dictation-unit1-week3.html",
    },
    {
      kind: "Dictation",
      title: "Unit 1 · Week 4",
      sound: "Long i",
      date: "26 Oct",
      words:
        "climb, pies, die, fright, slight, drive, shy, minding, pride, sly",
      note: "10 words & 10 sentences",
      path: "english-dictation-unit1-week4.html",
    },
    {
      kind: "Story",
      title: "The Dream Team",
      sound: "Realistic fiction",
      words:
        "Read along, summary, questions · Paired read: Making a Difference",
      note: "15 pages · 27 questions",
      path: "story-dream-team.html",
    },
    ...[
      [
        "The Talent Show",
        "Shared read · Unit 1 Week 3",
        "story-talent-show.html",
        "7 pages · 12 questions",
      ],
      [
        "Stormy Weather",
        "Classwork booklet · Unit 1 Weeks 3–4",
        "story-stormy-weather.html",
        "8 pages · 10 questions",
      ],
      [
        "An Honestly Fun Camp",
        "Homework booklet · Unit 1 Week 3",
        "story-honest-camp.html",
        "9 pages · 8 questions",
      ],
      [
        "A Surprise for Emily",
        "Homework booklet · Unit 1 Week 3",
        "story-surprise-emily.html",
        "6 pages · 7 questions",
      ],
      [
        "A Helping Hand",
        "Classwork booklet · Unit 1 Week 5",
        "story-helping-hand.html",
        "5 pages · 11 questions",
      ],
      [
        "Should Kids Have Homework Every Day?",
        "Homework booklet · Unit 1 Week 5",
        "story-homework.html",
        "4 pages · 6 questions",
      ],
      [
        "Should Kids Have Pets?",
        "Homework booklet · Unit 1 Week 5",
        "story-pets.html",
        "5 pages · 6 questions",
      ],
    ].map(([title, words, path, note]) => ({
      kind: "Story",
      title,
      sound: /Should|Helping/.test(title)
        ? "Argumentative text"
        : "Realistic fiction",
      words,
      note,
      path,
    })),
  ],
};
