// Computer · Grade 4 · Unit 3 · Lesson 4 « Email rules » (book pages 123–127).
// All the content of the lesson. The how-to's are done in Mini Outlook (shared/netsim.js). Same format as lesson-1.js.
// Hands on 2.2–2.4 (p. 127) are dropdowns whose choices were closed in the screenshots: the choices here are likely ones
// written for the lesson (// unverified, TODO.md, UNVERIFIED.md). Hands on 2.1 is only the line "To: teacher@school.com".
// The e-book's Hands on answers were not shown in the screenshots: the answers here are from the lesson text (// unverified, UNVERIFIED.md).
(function () {
  const RIDE = {
    me: "stella",
    compose: {
      to: "Marco",
      subject: "Weekend ride",
      body: "Hi Marco,\n\nI bought a new bik!\nWe should go for a ride this weekend.\n\nSee you soon,\nStella",
    },
  };
  // Hands on 3 as the book prints it: the closing and the greeting are swapped, two words have a red line
  const MISTAKES = {
    me: "stella",
    compose: {
      to: "Marco",
      subject: "A new board game",
      body: "Best regards (your friend's name),\nTodayy, my father and I, went to buy an new board game. I cannot whait to play with it. Do you want to join me?\nDear\n(Your name)",
    },
  };
  const JOHNSON = { kind: "emoji", e: "👩‍🏫 🔬" };
  window.LESSON = {
    n: 4,
    grade: 4,
    title: "Email rules",
    unit: "Unit 3 · Lesson 4",
    book: "Book pages 123–127",
    cover: "etiquette",
    question: {
      q: "Why do you think it is good to always be [polite] when sending an email?",
      a: "A polite email shows [respect]. People understand it better and are happy to [help] you and [reply] kindly.", // unverified: the book asks, it has no answer
      img: "email-2",
    },
    words: [
      {
        w: "Polite",
        m: "nice and kind: please, thank you, a greeting",
      },
      {
        w: "Email etiquette",
        m: "simple rules that make your emails clear, polite and easy to read",
      },
      { w: "Greeting", m: "the hello at the start: Dear …, Hello …" },
      {
        w: "Closing",
        m: "the end before your name: Best regards, Thank you, Have a great day",
      },
      {
        w: "Spell check",
        m: "the tool that finds and fixes spelling mistakes",
      },
      { w: "Red line", m: "a word underlined in red has a spelling mistake" },
      { w: "Ignore all", m: "keep the word as it is, everywhere" },
    ],

    ideas: [
      {
        t: "Be polite",
        lines: [
          "Always be polite, especially in an email to your [teacher] or someone [older] than you.",
          "Read the two emails and compare them.",
        ],
        img: "emails-1-2",
      },
      {
        t: "Email 1: not polite",
        lines: [
          "No greeting, no name, no please, no thank you.",
          "“Send me the answers.” sounds [rude].",
        ],
        img: "email-1",
      },
      {
        t: "Email 2: polite",
        lines: [
          "A greeting: “Hello Mrs. Smith”. A question with [please]. [Thank you so much!]",
          "A closing and a name: “Best regards, Stella”.",
        ],
        img: "email-2",
        howto: "write",
      },
      {
        t: "Email etiquette",
        lines: [
          "An email is like talking [face-to-face]: be polite and kind.",
          "[Email etiquette] means simple rules that make your emails clear, polite and easy to read.",
        ],
        img: "etiquette",
      },
      {
        t: "Why the rules?",
        lines: [
          "[Nice words] show you respect the person. A [clear] email is easy to understand.",
          "Being [kind] makes good friends: people reply kindly to you.",
        ],
        vis: { kind: "emoji", e: "🙂 💬 🤝" },
      },
      {
        t: "The parts of a polite email",
        lines: [
          "A [greeting] and the name: “Dear …” or “Hello …”. A [short] message, to the point.",
          "A [closing]: “Best regards”, “Thank you” or “Have a great day”. Then [your name].",
        ],
        img: "etiquette",
        howto: "write",
      },
      {
        t: "Spell check",
        lines: [
          "Check your email for [spelling mistakes], even to a friend.",
          "A word with a [red line] has a mistake. Click it and choose the right word.",
        ],
        img: "spell",
        howto: "spell",
      },
      {
        t: "Ignore all",
        lines: [
          "Is the word right (a name, for example)? Click [Ignore all]: the red line goes away.",
          "Before you send: [no red lines] left!",
        ],
        img: "spell",
      },
      {
        t: "History: dictionaries",
        lines: [
          "Before computers, people checked spelling in big [printed dictionaries].",
          "The words are in [ABC order]: you look page by page. It takes time!",
        ],
        vis: { kind: "emoji", e: "📖 🔤" },
      },
    ],

    howto: [
      {
        k: "write",
        t: "Write a polite email",
        code: "Figure 3.4.1",
        ic: "💌",
        img: "etiquette",
        start: { me: "stella" },
        steps: [
          { act: "click", t: "ol:newmail", say: "Click [New mail]." },
          {
            act: "type",
            t: "cm:to",
            text: "teacher@school.com",
            say: "In [To], type your teacher's address.",
          },
          {
            act: "type",
            t: "cm:subject",
            text: "Question about Homework",
            say: "In [Subject], type [Question about Homework].",
          },
          {
            act: "type",
            t: "cm:body",
            text: "Hello Mrs. Smith,",
            say: "Start with a polite [greeting] and the name: [Hello Mrs. Smith].",
          },
          {
            act: "type",
            t: "cm:body",
            text: "I am having trouble understanding the homework from today's lesson. Could you please help explain it to me? Thank you so much!",
            say: "Write a [short] message, to the point.",
          },
          {
            act: "type",
            t: "cm:body",
            text: "Best regards, Stella",
            say: "Close politely: [Best regards], and end with [your name].",
          },
          { act: "click", t: "cm:send", say: "Click [Send]." },
        ],
      },
      {
        k: "spell",
        t: "Correct a mistake",
        code: "3.4.2",
        ic: "🔤",
        img: "spell",
        start: RIDE,
        steps: [
          {
            act: "click",
            t: "sp:bik",
            say: "Click the word with the [red line]: [bik].",
          },
          {
            act: "click",
            t: "spg:bike",
            say: "From the [Spelling] list, click the right word: [bike].",
          },
          {
            act: "click",
            t: "cm:send",
            say: "No more red lines. Click [Send].",
          },
        ],
      },
    ],

    games: [
      {
        k: "polite",
        t: "Polite or not?",
        en: "Which one is polite?",
        ic: "🙂",
        items: [
          {
            type: "mc",
            q: "Which one is polite?",
            vis: { kind: "emoji", e: "👩‍🏫 📧" },
            opts: [
              "Could you please help me with the homework?",
              "Send me the answers.",
            ],
          },
          {
            type: "mc",
            q: "Which greeting is good for your [teacher]?",
            vis: { kind: "emoji", e: "👋 👩‍🏫" },
            opts: ["Dear Mrs. Smith,", "Hey you!"],
          },
          {
            type: "mc",
            q: "Which closing is polite?",
            vis: { kind: "emoji", e: "✍️ 🙏" },
            opts: ["Best regards,", "Bye. Whatever."],
          },
          {
            type: "mc",
            q: "Which message is [short and to the point]?",
            vis: { kind: "emoji", e: "✉️ 🎯" },
            opts: [
              "I will be late to the meeting. I am sorry!",
              "So, today I woke up and then I had breakfast and then my cat and then … I will be late.",
            ],
          },
        ],
      },
      {
        k: "parts",
        t: "Build a polite email",
        en: "Put the parts in order",
        ic: "🧩",
        items: [
          {
            type: "order",
            t: "A polite email",
            ask: "Put the parts of the email in order.",
            hint: "Greeting first, your name last.",
            steps: [
              { say: "To: teacher@school.com", e: "📧" },
              { say: "Subject: Question about Homework", e: "🏷️" },
              { say: "Hello Mrs. Smith,", e: "👋" },
              {
                say: "I am having trouble understanding the homework. Could you please help explain it to me? Thank you so much!",
                e: "✉️",
              },
              { say: "Best regards,", e: "🙏" },
              { say: "Stella", e: "✍️" },
            ],
          },
          { type: "order", howto: "spell" },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Outlook",
        en: "Spell check",
        ic: "🔤",
        items: [
          {
            type: "sim",
            q: "Fix the word with the red line.",
            start: {
              me: "stella",
              compose: {
                to: "Lisa",
                subject: "Party",
                body: "Hi Lisa,\nThank you for the party. You are a great frend!\nStella",
              },
            },
            steps: [
              { act: "click", t: "sp:frend", say: "Click the red word." },
              {
                act: "click",
                t: "spg:friend",
                say: "Click [friend].",
              },
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
          {
            type: "sim",
            q: "Two red words! Fix them both.",
            start: {
              me: "stella",
              compose: {
                to: "Tom",
                subject: "Meeting",
                body: "Hi Tom,\nPlese come to the meeting tomorow.\nThank you!\nStella",
              },
            },
            steps: [
              { act: "click", t: "sp:plese", say: "Click the red word." },
              { act: "click", t: "spg:please", say: "Click [please]." },
              {
                act: "click",
                t: "sp:tomorow",
                say: "Click the next red word.",
              },
              { act: "click", t: "spg:tomorrow", say: "Click [tomorrow]." },
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Email rules",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "Sending an email is like talking to someone face-to-face.",
            a: true,
            img: "etiquette",
          },
          {
            type: "tf",
            q: "Spelling does not matter in an email to a friend.",
            a: false,
            x: "Check your spelling [even] when you write to a friend.",
            img: "spell",
          },
          {
            type: "tf",
            q: "A word underlined in red has a spelling mistake.",
            a: true,
            img: "spell",
          },
          {
            type: "tf",
            q: "You end the email with your name.",
            a: true,
            img: "email-2",
          },
          {
            type: "tf",
            q: "Before computers, people checked spelling in printed dictionaries.",
            a: true,
            vis: { kind: "emoji", e: "📖 🔤" },
          },
        ],
      },
    ],

    exercises: [
      {
        k: "better",
        t: "Which email is better?",
        en: "Book p. 123 · Write in your notebook",
        ic: "📝",
        from: "Book p. 123",
        items: [
          {
            type: "mc",
            q: "Which of the above emails is better to send to your teacher, and why?",
            img: "emails-1-2",
            opts: ["Email 2", "Email 1"],
            x: "Email 2 is polite: a [greeting], [please] and [thank you], a [closing] and a [name].", // unverified
          },
        ],
      },
      {
        k: "make",
        t: "Make them polite",
        en: "Book · Hands on 1.1–1.2",
        ic: "💌",
        from: "Book p. 126 · Hands on! 1.1–1.2",
        keep: true,
        items: [
          // unverified (model answers): no key in the screenshots
          {
            type: "open",
            q: "You email the cafeteria at school where you left your lunchbox. Make the email polite.",
            a: "Subject: Lost lunchbox · [Dear] cafeteria team, I think I left my lunchbox in the cafeteria today. Could you [please] keep it for me? I will come and get it. [Thank you so much!] Best regards, Stella",
            img: "lunchbox",
          },
          {
            type: "open",
            q: "You email your classmates to let them know you will be late to a meeting about the class project. Make the email polite.",
            a: "Subject: Late to meeting · [Hi] Lisa, I am [sorry], I am going to be a little late to our meeting about the class project tomorrow. Please start without me. See you soon! Best, Stella",
            img: "late",
          },
        ],
      },
      {
        k: "teacher",
        t: "An email to your teacher",
        en: "Book · Hands on 2.1–2.4",
        ic: "👩‍🏫",
        from: "Book p. 127 · Hands on! 2.1–2.4",
        keep: true,
        items: [
          // unverified (all five): the dropdown choices were not visible; these are likely choices
          {
            type: "mc",
            q: "To: teacher@school.com · Subject: ___ about the science project",
            vis: JOHNSON,
            opts: ["Question", "Answers", "Hurry"],
          },
          {
            type: "mc",
            q: "___ Mrs. Johnson,",
            vis: { kind: "emoji", e: "👋 👩‍🏫" },
            opts: ["Dear", "Hey", "Yo"],
          },
          {
            type: "mc",
            q: "I am having some trouble with the science project that is due next week. Could you please help me understand how to start the project? ___ for your time and help!",
            vis: JOHNSON,
            opts: ["Thank you", "Hurry up", "No thanks"],
          },
          {
            type: "mc",
            q: "___ regards,",
            vis: { kind: "emoji", e: "🙏 ✍️" },
            opts: ["Best", "Bad", "No"],
          },
          {
            type: "mc",
            q: "Best regards, ___ (the last line)",
            vis: { kind: "emoji", e: "✍️ 🙂" },
            opts: ["your name", "Mrs. Johnson", "teacher@school.com"],
          },
        ],
      },
      {
        k: "fix",
        t: "Find and fix the mistakes",
        en: "Book · Hands on 3",
        ic: "🛠️",
        from: "Book p. 127 · Hands on! 3",
        keep: true,
        items: [
          {
            type: "sim",
            q: "First fix the [red words] with the spell check.",
            start: MISTAKES,
            steps: [
              {
                act: "click",
                t: "sp:todayy",
                say: "Click the red word [Todayy].",
              },
              { act: "click", t: "spg:Today", say: "Click [Today]." },
              {
                act: "click",
                t: "sp:whait",
                say: "Click the red word [whait].",
              },
              { act: "click", t: "spg:wait", say: "Click [wait]." },
            ],
          },
          {
            type: "mc",
            q: "my father and I went to buy ___ new board game.",
            img: "mistakes",
            opts: ["a", "an"],
            x: "[a] new: “new” starts with a consonant sound.",
          },
          {
            type: "mc",
            q: "Which line comes [first]?",
            img: "mistakes",
            opts: ["Dear (your friend's name),", "Best regards,"],
            x: "The greeting comes first. [Best regards] comes at the end, before your name.",
          },
          {
            type: "open",
            q: "Read the following email. Find and fix the mistakes and type it correctly using the rules you have learned. Then send it to a classmate.",
            a: "Dear Marco, · Today, my father and I went to buy [a] new board game. I cannot [wait] to play with it. Do you want to join me? · Best regards, · Stella", // unverified
            img: "mistakes",
          },
        ],
      },
    ],
  };
})();
