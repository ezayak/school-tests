// Stormy Weather (Wonders Genre Passages, Grade 4 Unit 1 Weeks 3 and 4, realistic fiction). Classwork Booklet Term 1, pages 11–13.
// Engine: shared/story.js. The booklet has no model answers for its 3 questions: the answers here are written from the text.
window.STORY = {
  key: "en4-stormy-weather",
  title: "Stormy Weather",
  kind: "Realistic fiction · Classwork booklet",
  cover: "img/stormy-weather/science-fair.jpg",
  lesson: { path: "unit1-week3.html", label: "Unit 1 · Week 3" },
  question: "How do your actions affect others?",
  gloss: {
    nightmare: "a very bad dream; something very bad",
    assigned: "gave her a job to do",
    partner: "a person who works with you",
    sighed: "breathed out loudly, a little sad",
    cats: "raining cats and dogs = raining very, very hard",
    soaking: "very, very wet",
    atmosphere: "the air around the Earth",
    lame: "boring, not good",
    diorama: "a small model of a place inside a box",
    climate: "the usual weather of a place",
    soggy: "wet and soft",
    meteorologists:
      "scientists who study the weather and tell us the weather news",
    meteorologist:
      "a scientist who studies the weather and tells us the weather news",
    presentation: "a talk to show and explain something to a group",
    yards: "the whole nine yards = everything, all of it",
    bees: "as busy as bees = very, very busy",
    barometers: "tools that measure the air pressure",
    radar: "a tool that finds rain and storms far away",
    predictions: "what you think will happen",
    satellite: "a machine in space that goes around the Earth",
    guess: "your guess is as good as mine = I don’t know either",
    downtown: "the middle of the city",
    studio: "a room where TV shows are made",
    project: "show a picture on a screen",
    trophies: "prize cups for the winners",
    audience: "the people who watch a show",
  },
  pages: [
    {
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { t: "Science Fair next week!", x: 50, y: 37, s: 7, c: "light" },
          { e: "👧🏽", x: 30, y: 72, s: 30 },
          { e: "😖", x: 30, y: 14, s: 13, a: "shake" },
          { e: "👦", x: 72, y: 72, s: 30 },
          { t: "Big Brain!", x: 76, y: 16, s: 7, c: "bad", a: "pop:0.6" },
        ],
        cap: "Marta has to work with Eddie.",
      },
      text: [
        "“This is going to be a nightmare!” Marta Ramirez said to herself. The Science Fair was next week. Her teacher Mr. Mitchell had assigned her a project about the weather, which sounded fun. But he also made Eddie Lewis her partner, which did not sound like fun. Eddie was always making fun of her. He called her “Big Brain” because she liked to study.",
        "Marta sighed and knew she’d make the best of it. She planned to meet Eddie at the library after school to talk about the project.",
      ],
      easy: "Marta has a weather project for the Science Fair. Her partner is Eddie. Eddie makes fun of her and calls her “Big Brain”.",
    },
    {
      vis: {
        kind: "scene",
        bg: "rain",
        items: [
          { e: "☁️", x: 50, y: 12, s: 36 },
          { e: "🐱", x: 30, y: 16, s: 10, dy: 70, a: "fall" },
          { e: "🐶", x: 60, y: 16, s: 10, dy: 70, a: "fall:0.8" },
          { e: "💧", x: 44, y: 18, s: 7, dy: 70, a: "fall:0.4" },
          { e: "💧", x: 74, y: 18, s: 7, dy: 70, a: "fall:1.2" },
          { e: "🏃‍♀️", x: 14, y: 76, s: 22, dx: 60, a: "go", f: 1 },
          { e: "📚", x: 86, y: 72, s: 18 },
        ],
        cap: "It was raining cats and dogs!",
      },
      text: [
        "That afternoon, it was raining cats and dogs as Marta ran from the main school building to the library. She arrived soaking wet.",
        "As she and Eddie sat at a table, Marta ran down a list of topics. “What about a study of the atmosphere?”",
        "Eddie shook his head. “Lame.”",
        "“How about a diorama of animals that live in a desert climate?” Marta asked, but Eddie shook his head again.",
      ],
      easy: "It rains very hard. Marta runs to the library and gets very wet. She has ideas, but Eddie says no to all of them.",
    },
    {
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🧑‍🔬", x: 30, y: 62, s: 32 },
          { e: "🌦️", x: 70, y: 32, s: 26, a: "float" },
          { e: "📺", x: 72, y: 68, s: 26 },
          { t: "weather reporter", x: 34, y: 16, s: 7, a: "pop:0.5" },
        ],
        cap: "a meteorologist",
      },
      text: [
        "Marta tried to flip through her science book to look for more ideas, but it was too soggy. “Wish I had known it was going to rain because I would have brought an umbrella. Hey, what about a presentation on meteorologists?”",
        "“What’s a meteorologist?”",
        "“That’s a weather reporter, which sounds like a fun job!” she said.",
        "“You would want a boring job like that, Big Brain!”",
      ],
      easy: "Marta has a new idea: a talk about meteorologists, the weather reporters. Eddie says it is boring.",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👧🏽", x: 30, y: 58, s: 30 },
          { e: "👦", x: 70, y: 58, s: 30 },
          { e: "🤝", x: 50, y: 66, s: 18, a: "pop:1 pulse:1.6" },
          { t: "We have to work together.", x: 50, y: 16, s: 7, a: "pop:0.4" },
        ],
        cap: "partners",
      },
      text: [
        "Marta’s smile fell. “Do you want to do a good job on this project? Get a good grade? Win a prize? The whole nine yards?”",
        "“Yeah,” Eddie answered.",
        "“Mr. Mitchell made us partners, so we have to work together.”",
        "“Fine, we’ll do the weather people idea,” Eddie said.",
      ],
      easy: "Marta says: we are partners, so we must work together. Eddie agrees to do the meteorologist idea.",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🐝", x: 20, y: 24, s: 12, a: "wander" },
          { e: "🐝", x: 80, y: 30, s: 12, a: "wander:1" },
          { e: "📡", x: 26, y: 64, s: 22 },
          { e: "🗺️", x: 52, y: 66, s: 24 },
          { e: "🌡️", x: 76, y: 64, s: 20, a: "pulse" },
        ],
        cap: "as busy as bees",
      },
      text: [
        "Marta and Eddie spent the next week as busy as bees. They learned about the tools meteorologists use, like barometers and radar. They learned how they come up with predictions, and they learned how they make weather maps.",
        "At first, Eddie was mostly bored, but as the week went on, he became more and more interested. He still called Marta “Big Brain” though, and she didn’t like that very much.",
      ],
      easy: "They work very hard all week. They learn about weather tools and weather maps. Eddie starts to like the project.",
    },
    {
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "📺", x: 50, y: 40, s: 40 },
          { e: "🗺️", x: 50, y: 38, s: 16, a: "blink" },
          { e: "👦", x: 26, y: 74, s: 22 },
          { e: "❓", x: 26, y: 52, s: 12, a: "pulse" },
          { e: "👧🏽", x: 76, y: 74, s: 22 },
          { e: "💡", x: 76, y: 52, s: 12, a: "pop:1.2 pulse:1.8" },
        ],
        cap: "How does it all work together?",
      },
      text: [
        "“When meteorologists talk about the weather on TV, they stand in front of a screen that shows maps, charts, and satellite images. How does everything work together?” Eddie asked one afternoon.",
        "“Your guess is as good as mine,” Marta replied.",
        "“How can we figure it out?” he asked. “Any big ideas, Big Brain?”",
        "Marta thought for a minute. “I think I might.”",
      ],
      easy: "Eddie has a question: how does the weather screen on TV work? Marta does not know, but she has an idea.",
    },
    {
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "🎥", x: 22, y: 58, s: 26 },
          { e: "🟩", x: 66, y: 46, s: 50 },
          { e: "👩‍💼", x: 66, y: 56, s: 26 },
          { e: "🌧️", x: 58, y: 30, s: 12, a: "show" },
          { e: "📝", x: 18, y: 22, s: 14, a: "nod" },
        ],
        cap: "Stormy Weathers at the TV studio",
      },
      text: [
        "The next day was Saturday. Eddie got a text from Marta asking him to meet her at a building downtown. Eddie and his father met Marta and her mother. They all took an elevator up to a television studio.",
        "“What are we doing here?” Eddie asked.",
        "“I e-mailed Stormy Weathers, the meteorologist from the news, and I asked if we could visit the studio to get the answer to our question.”",
        "“You’re so smart!” Eddie said.",
        "Stormy Weathers showed them the screen she stood in front of to give reports on TV. It was all green and could be used to project any image. As she talked, the kids took very careful notes.",
      ],
      easy: "Marta wrote to a TV meteorologist. They visit the TV studio. The screen is green, and it can show any picture.",
    },
    {
      img: "img/stormy-weather/science-fair.jpg",
      text: [
        "That Monday, Marta and Eddie gave their presentation at the Science Fair and won first prize. As the audience clapped, they held up their trophies.",
        "“Maybe it’s not such a bad thing to have a big brain,” Eddie said.",
        "“Not at all,” Marta replied.",
      ],
      easy: "Marta and Eddie win first prize! Now Eddie thinks a big brain is a good thing.",
    },
  ],
  summary: [
    {
      t: "Characters",
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { e: "👧🏽", x: 30, y: 70, s: 32 },
          { e: "👦", x: 70, y: 70, s: 32 },
          { e: "👩‍💼", x: 50, y: 34, s: 18 },
        ],
      },
      text: "Marta, who likes to study. Eddie, her partner. Stormy Weathers, a TV meteorologist.",
    },
    {
      t: "Setting",
      vis: {
        kind: "scene",
        bg: "rain",
        items: [
          { e: "🏫", x: 30, y: 60, s: 32 },
          { e: "📚", x: 70, y: 62, s: 26 },
        ],
      },
      text: "At school, in the library and in a TV studio, the week before the Science Fair.",
    },
    {
      t: "Problem",
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { e: "😖", x: 34, y: 60, s: 30, a: "shake" },
          { t: "Big Brain!", x: 70, y: 40, s: 9, c: "bad" },
        ],
      },
      text: "Marta has to work with Eddie, who makes fun of her and does not like her ideas.",
    },
    {
      t: "Events",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "🐝", x: 26, y: 30, s: 14, a: "wander" },
          { e: "🗺️", x: 56, y: 60, s: 30 },
        ],
      },
      text: "They choose meteorologists. They work hard all week. Eddie asks how the TV weather screen works.",
    },
    {
      t: "Solution",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "🟩", x: 56, y: 48, s: 46 },
          { e: "👩‍💼", x: 56, y: 56, s: 24 },
          { e: "📝", x: 20, y: 30, s: 16, a: "nod" },
        ],
      },
      text: "Marta e-mails Stormy Weathers, and they visit the TV studio to find the answer. They win first prize.",
    },
    {
      t: "Message",
      img: "img/stormy-weather/science-fair.jpg",
      text: "Working together helps. Being smart is a good thing. Eddie learns to respect Marta.",
    },
  ],
  questions: [
    {
      tag: "Genre",
      img: "img/stormy-weather/science-fair.jpg",
      q: "What kind of story is “Stormy Weather”?",
      o: ["realistic fiction", "fantasy", "argumentative text"],
      x: "The characters and the events could be real: a school, a Science Fair, a TV studio.",
    },
    {
      tag: "Plot: Conflict",
      vis: {
        kind: "scene",
        bg: "school",
        items: [
          { e: "😖", x: 34, y: 60, s: 30, a: "shake" },
          { t: "Big Brain!", x: 70, y: 40, s: 9, c: "bad" },
        ],
      },
      q: "What is Marta’s problem at the beginning?",
      o: [
        "Her partner Eddie always makes fun of her.",
        "She does not like the weather.",
        "She lost her science book.",
      ],
    },
    {
      tag: "Idioms",
      vis: {
        kind: "scene",
        bg: "rain",
        items: [
          { e: "☁️", x: 50, y: 14, s: 34 },
          { e: "💧", x: 30, y: 22, s: 8, dy: 60, a: "fall" },
          { e: "💧", x: 50, y: 22, s: 8, dy: 60, a: "fall:0.5" },
          { e: "💧", x: 70, y: 22, s: 8, dy: 60, a: "fall:1" },
          { e: "☂️", x: 50, y: 74, s: 24 },
        ],
      },
      q: "“It was raining cats and dogs.” What does it mean?",
      o: [
        "It was raining very hard.",
        "Cats and dogs fell from the sky.",
        "It was a little bit cloudy.",
      ],
      x: "Marta arrived soaking wet: it rained a lot.",
    },
    {
      tag: "Vocabulary",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🧑‍🔬", x: 30, y: 62, s: 32 },
          { e: "🌦️", x: 70, y: 40, s: 30, a: "float" },
        ],
      },
      q: "What is a meteorologist?",
      o: ["a weather reporter", "a science teacher", "a TV studio"],
      x: "“That’s a weather reporter, which sounds like a fun job!”",
    },
    {
      tag: "Idioms",
      vis: {
        kind: "scene",
        bg: "sky",
        items: [
          { e: "🐝", x: 30, y: 40, s: 18, a: "wander" },
          { e: "🐝", x: 64, y: 50, s: 18, a: "wander:1" },
          { e: "🌼", x: 50, y: 76, s: 20 },
        ],
      },
      q: "“Marta and Eddie spent the next week as busy as bees.” What does it mean?",
      o: [
        "They worked very hard.",
        "They played with bees.",
        "They did nothing.",
      ],
    },
    {
      tag: "Make predictions",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👧🏽", x: 40, y: 60, s: 34 },
          { e: "💡", x: 66, y: 30, s: 22, a: "pulse" },
        ],
      },
      q: "Eddie asks, “Any big ideas, Big Brain?” Marta says, “I think I might.” What do you predict Marta will do?",
      o: [
        "She will find a way to get the answer.",
        "She will stop the project.",
        "She will ask for a new partner.",
      ],
      x: "Marta is a problem solver: she e-mails Stormy Weathers and they visit the TV studio.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "room",
        items: [
          { e: "👦", x: 40, y: 62, s: 34 },
          { t: "Lame.", x: 66, y: 30, s: 10, c: "bad", a: "pop:0.5" },
        ],
      },
      q: "What can you tell about Eddie from what he says to Marta in the library?",
      a: "Eddie is not interested in the project at first. He says “Lame” to Marta’s ideas and calls her “Big Brain”, so he is not kind to her.",
    },
    {
      tag: "Text evidence",
      type: "open",
      vis: {
        kind: "scene",
        bg: "plain",
        items: [
          { e: "📧", x: 30, y: 50, s: 30, a: "pulse" },
          { e: "👩‍💼", x: 70, y: 56, s: 30 },
        ],
      },
      q: "How does the author show that Marta is a problem solver?",
      a: "When they do not know how the TV weather screen works, Marta e-mails Stormy Weathers and asks to visit the TV studio to get the answer.",
    },
    {
      tag: "Text evidence",
      type: "open",
      img: "img/stormy-weather/science-fair.jpg",
      q: "How does Eddie’s attitude toward Marta change by the end of the story?",
      a: "At first Eddie makes fun of Marta. At the end he says, “You’re so smart!” and “Maybe it’s not such a bad thing to have a big brain.” Now he respects her.",
    },
    {
      tag: "Plot",
      img: "img/stormy-weather/science-fair.jpg",
      q: "How does the story end?",
      o: [
        "Marta and Eddie win first prize at the Science Fair.",
        "Marta and Eddie lose the Science Fair.",
        "Eddie gets a new partner.",
      ],
    },
  ],
};
