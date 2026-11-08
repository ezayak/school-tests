// Social Studies · Grade 4 · Chapter 1 revision « Geography and the United States » (myWorld Interactive 4, book pp. 37–40).
// All the content of the page. The engine is shared/computer-lesson.js (no Mini Windows); "Chapter 1 Review" on its card (label + n).
// Learn: the book's Visual Review (p. 37) in easy words, the chapter's key words, the story « Marjory Stoneman Douglas » (question 11).
// Exercises: the Chapter 1 Assessment (pp. 38–40), questions 1–9, 11, 12. Left out: 10 (Writing Workshop, two paragraphs on a separate sheet)
// and the Quest Findings video project (p. 41). No answer key: answers from Lessons 1–4 (grade-4/social-studies/UNVERIFIED.md).
// Pictures: img/review/ (.claude/skills/social-studies-lesson/scripts/pictures/chapter-1-review.py) and the lessons' own ("../lesson-1/…").

// Every answer has a picture (Alex has aphasia: the picture explains the word or the sentence).
// mc(q, [[answer, picture], …], more): the first answer is right; a picture is a file name (img/review/ or ../lesson-N/…) or 1–2 emoji.
const mc = (q, answers, more) => {
  const isImg = (p) => /^[a-z.][a-z0-9./-]*$/.test(p);
  const opts = answers.map((a) => a[0]);
  const pics = answers.map((a) => (isImg(a[1]) ? a[1] : null));
  const icons = answers.map((a) => (isImg(a[1]) ? null : a[1]));
  return {
    type: "mc",
    q,
    opts,
    ...(pics.some(Boolean) ? { pics } : {}),
    ...(icons.some(Boolean) ? { icons } : {}),
    ...more,
  };
};
// the 5 regions, each with its map from Lesson 1
const REGIONS = ["Northeast", "Southeast", "Midwest", "Southwest", "West"];
const REG = (r) => [r, "../lesson-1/r-" + r.toLowerCase()];
// "Which region is <state> in?": the right region and the next two on the list
const region = (state, r) => {
  const i = REGIONS.indexOf(r);
  return mc(
    `Which region is [${state}] in?`,
    [r, REGIONS[(i + 1) % 5], REGIONS[(i + 2) % 5]].map(REG),
    {
      img: "../lesson-1/regions-map",
      x: `${state} is in the [${r}].`,
    },
  );
};

window.LESSON = {
  n: "Review",
  label: "Chapter 1",
  key: "ss4-c1-review",
  grade: 4,
  title: "Geography and the United States",
  unit: "Chapter 1 · Review",
  book: "Book pp. 37–40",
  imgDir: "img/review",
  cover: "vr-land",
  question: {
    q: "How does [geography] affect the way we live?",
    a: "The land, the [weather] and the [resources] of a place change how people live: their homes, clothes, jobs and activities. People [adapt] to the land and [change] it.",
    img: "vr-people",
  },
  // the chapter's main words (Lessons 1–4) and the landforms of question 1
  words: [
    { w: "Region", m: "an area where places share similar characteristics" },
    { w: "Flood plain", m: "a plain along a river that floods" },
    { w: "Mesa", m: "a hill with a flat top" },
    { w: "Canyon", m: "a deep, rocky valley" },
    { w: "Plateau", m: "flat, raised land" },
    {
      w: "Weather",
      m: "what the air is like today: it changes from day to day",
    },
    { w: "Climate", m: "the weather of a place over a long time" },
    { w: "Natural resource", m: "something in nature that people can use" },
    {
      w: "Capital resource",
      m: "something made by people to make other things",
    },
    { w: "Human resource", m: "people and their skills, ideas and hard work" },
    { w: "Renewable", m: "can be replaced; it does not run out" },
    { w: "Adapt", m: "to change to fit a new place" },
    { w: "Technology", m: "using tools and science to do work" },
  ],

  // the Visual Review (p. 37): one card per lesson
  ideas: [
    {
      t: "Land and regions",
      lines: [
        "The USA has [5 regions]: the Northeast, the Southeast, the Midwest, the Southwest and the West.",
        "Each region has its own [landforms] and [bodies of water].",
        "Every region has big [cities] and places where few people live.",
      ],
      img: "vr-land",
    },
    {
      t: "Weather and climate",
      lines: [
        "[Weather] changes every day. [Climate] is the weather of a place over a long time.",
        "Climate is [temperature], [precipitation] and [humidity].",
        "Climates are different in the 5 regions: where they are, how high, the wind and the oceans change them.",
      ],
      img: "vr-weather",
    },
    {
      t: "Regions and resources",
      lines: [
        "Each region is rich in [natural resources]. Resources and products are different in each region.",
        "[Natural], [capital] and [human] resources make products.",
        "Natural resources are [renewable] or [nonrenewable].",
      ],
      img: "vr-resources",
    },
    {
      t: "People and the land",
      lines: [
        "People live where they do for different reasons.",
        "People [adapt] to the environment, and they [change] it in many ways.",
        "[Technology] helps to save resources and to protect the environment.",
      ],
      img: "vr-people",
    },
  ],

  stories: [
    {
      t: "Marjory Stoneman Douglas",
      en: "Story · for question 11",
      path: "story-douglas.html",
      cover: { src: "img/douglas/douglas.jpg" },
    },
  ],

  games: [
    {
      k: "quiz",
      t: "Chapter quiz",
      en: "One question from each lesson",
      ic: "🧠",
      items: [
        mc(
          "How many regions does the USA have?",
          [
            ["5", "5️⃣"],
            ["3", "3️⃣"],
            ["13", "🔟"],
          ],
          { img: "../lesson-1/regions-5" },
        ),
        mc(
          "What changes [every day]?",
          [
            ["Weather", "🌦️"],
            ["Climate", "🗺️"],
          ],
          {
            emoji: "📅",
            two: true,
            x: "[Weather] changes every day. Climate is the weather over a long time.",
          },
        ),
        mc(
          "Which region is [colder]?",
          [
            ["The Northeast", "../lesson-2/northeast"],
            ["The Southeast", "../lesson-2/florida"],
          ],
          {
            emoji: "🥶",
            two: true,
            x: "The [Northeast] is farther north, far from the [equator].",
          },
        ),
        mc(
          "Which one is a [natural] resource?",
          [
            ["Trees", "../lesson-3/trees"],
            ["A tractor", "../lesson-3/tractor"],
            ["A carpenter", "../lesson-3/carpenter"],
          ],
          { emoji: "🌳" },
        ),
        mc(
          "Which one is [nonrenewable]?",
          [
            ["Coal", "../lesson-3/coal"],
            ["Wind", "../lesson-3/wind"],
            ["Water", "../lesson-3/water"],
          ],
          {
            emoji: "⛔",
            x: "[Coal] cannot be replaced: once we use it, it is gone.",
          },
        ),
        mc(
          "People wear warm clothes in a cold place. They…",
          [
            ["adapt to the land", "🧥"],
            ["change the land", "🚜"],
          ],
          {
            emoji: "❄️",
            two: true,
            x: "To [adapt] is to change yourself to fit the place.",
          },
        ),
        mc(
          "What brings water to the crops?",
          [
            ["Irrigation", "../lesson-4/irrigation-drawing"],
            ["A scrubber", "../lesson-4/e-scrubber"],
          ],
          { emoji: "🌽💧", two: true },
        ),
      ],
    },
    {
      k: "landforms",
      t: "Landforms",
      en: "Match the word and the picture",
      ic: "⛰️",
      items: [
        {
          type: "match",
          pairs: [
            { img: "e-flood-plain", label: "Flood plain" },
            { img: "e-mesa", label: "Mesa" },
            { img: "../lesson-1/lf-canyon", label: "Canyon" },
            { img: "../lesson-1/lf-plateau", label: "Plateau" },
          ],
        },
      ],
    },
    {
      k: "regions",
      t: "The 5 regions",
      en: "Match the name and the map",
      ic: "🗺️",
      items: [
        {
          type: "match",
          pairs: REGIONS.slice(0, 3).map((r) => ({
            img: "../lesson-1/r-" + r.toLowerCase(),
            label: r,
          })),
        },
        {
          type: "match",
          pairs: REGIONS.slice(3).map((r) => ({
            img: "../lesson-1/r-" + r.toLowerCase(),
            label: r,
          })),
        },
      ],
    },
  ],

  exercises: [
    {
      k: "assess",
      t: "Chapter 1 Assessment",
      en: "Book questions 1–12",
      ic: "📘",
      from: "Book pp. 38–40 · Chapter 1 Assessment",
      keep: true,
      items: [
        // 1: match each word to its definition (word cards w-*.jpg: the picture and the word, made by the picture script)
        {
          type: "match",
          pairs: [
            {
              img: "w-flood-plain",
              label: "a plain along a river that floods",
            },
            { img: "w-mesa", label: "hill with a flat top" },
          ],
        },
        {
          type: "match",
          pairs: [
            {
              img: "w-canyon",
              label: "deep, rocky valley",
            },
            {
              img: "w-plateau",
              label: "flat, raised land",
            },
          ],
        },
        // unverified: open questions, model answers written from Lessons 1–4
        {
          type: "open",
          q: "Explain how [regions] and [landforms] can be related.",
          a: "Each region has its own landforms. The [West] has high [mountains], the [Southwest] has [deserts] and [canyons], the [Midwest] has flat [plains], and the [Southeast] has [coastal plains].",
          img: "../lesson-1/regions-map",
        },
        // 3: the region for each state
        region("Georgia", "Southeast"),
        region("Montana", "West"),
        region("New York", "Northeast"),
        region("Illinois", "Midwest"),
        region("Oklahoma", "Southwest"),
        {
          type: "open",
          q: "Compare [weather] and [climate]. How are they different?",
          a: "[Weather] is what the air is like today: it changes from day to day. [Climate] is the usual weather of a place over a long time.",
          img: "vr-weather",
        },
        mc(
          "Identify the missing part of the [water cycle].",
          [
            ["Precipitation (rain and snow)", "🌧️"],
            ["Evaporation", "♨️"],
            ["Condensation", "☁️"],
          ],
          {
            img: "water-cycle",
            x: "Water [evaporates], [condenses] into clouds, then falls as [precipitation]: rain or snow.",
          },
        ),
        {
          type: "open",
          q: "Describe [natural], [human], and [capital] resources. Give an example of each.",
          a: "[Natural] resources come from nature: trees. [Human] resources are people and their skills: a teacher. [Capital] resources are things people make to make other things: a tractor.",
          img: "../lesson-3/natural-chart",
        },
        {
          type: "open",
          q: "Explain why [water] is a renewable resource.",
          a: "Water comes back again and again in the [water cycle]: the rain fills the rivers and lakes again.",
          img: "water-cycle",
        },
        {
          type: "open",
          q: "Explain why the [Northeast] has a colder climate than the [Southeast].",
          a: "The Northeast is [farther north], far from the [equator]. The Southeast is closer to the equator, so it is warmer.",
          img: "../lesson-2/equator",
        },
        {
          type: "open",
          q: "Tell how the [geography] of where you live affects your daily life. Support your answer with examples.",
          a: "Example: where I live it is hot and sunny, so I wear light clothes and we use air conditioning. Near the sea, people swim and go to the beach.",
          img: "vr-people",
        },
        {
          type: "open",
          q: "“There are no other Everglades in the world.” Explain why you think [Douglas] described the Everglades as a unique region.",
          a: "The Everglades are a big wet, marshy place full of animals: alligators, turtles, panthers, birds. There is no other place like it. Douglas wrote about it and worked to [protect] it.",
          img: "../douglas/everglades",
        },
        {
          type: "open",
          q: "Write a summary about the differences in the [climate] across the regions of the United States.",
          a: "[Alaska], in the West, is very cold all year: an [arctic] climate. The [Northeast] has warm summers and cool winters: a [temperate] climate. [Florida], in the Southeast, is near the equator and warm all year: a [tropical] climate. The [Southwest] is hot and dry, with deserts.",
          img: "vr-weather",
        },
      ],
    },
  ],
};
