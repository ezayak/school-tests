// Computer · Grade 4 · Unit 3 · Lesson 2 « Forward an email » (book pages 106–111).
// All the content of the lesson. The how-to's are done in Mini Outlook (shared/netsim.js). Same format as lesson-1.js.
// The e-book's Hands on answers were not shown in the screenshots: the answers here are from the lesson text (// unverified, UNVERIFIED.md).
// Book: Figure 3.2.3 shows the subject "Fw: Healthy food project" above the "Party invitation" email; the how-to forwards the Party invitation.
(function () {
  const ALEX = "alex.bacademy@outlook.com";
  const LISA = "lisa-dt-ba@outlook.com";
  const TOM = "tom.bacademy@outlook.com";
  const FW = (of) => ({
    me: "marco",
    compose: { kind: "forward", of, to: ALEX },
  });
  const OPTS = [
    "Sends an email you received to another person",
    "Sends a copy of an email to multiple people, and they know who else received it",
    "Sends a copy of an email to multiple people, and they don't know who else received it",
  ];
  window.LESSON = {
    n: 2,
    grade: 4,
    title: "Forward an email",
    unit: "Unit 3 · Lesson 2",
    book: "Book pages 106–111",
    cover: "forward",
    question: {
      q: "Have you ever needed to share a message with [more than one friend] at the same time?",
      a: "With [Forward], [Cc] and [Bcc] you write the email [once], and many people get it.", // unverified: the book asks, it has no answer
      img: "boy-net",
    },
    words: [
      {
        w: "Forward",
        m: "send an email you got to people who did not get it",
      },
      {
        w: "Cc (Carbon copy)",
        m: "send to more people; everyone sees who else got it",
      },
      {
        w: "Bcc (Blind carbon copy)",
        m: "send to more people; they don't see who else got it",
      },
      { w: "Fw:", m: "the start of the subject of a forwarded email" },
      { w: "Carbon paper", m: "how people copied letters before email" },
    ],

    ideas: [
      {
        t: "Send one email to many people",
        lines: [
          "You don't need to write the same message [again and again].",
          "[Forward], [Cc] and [Bcc] help you.",
        ],
        img: "boy-net",
      },
      {
        t: "Marco's group",
        lines: [
          "“My classmate Stella sent me an email about our project.",
          "I will [send it] to the other members of our group.”",
        ],
        img: "boy-net",
        howto: "forward",
      },
      {
        t: "History: carbon paper",
        lines: [
          "Before email, people used [carbon paper] to copy letters.",
          "Carbon paper between two sheets: you write on the top one, and a [copy] appears on the second one. That is the C of [Cc]!",
        ],
        vis: { kind: "emoji", e: "📄 ✍️ 📄" },
      },
      {
        t: "Forward an email",
        lines: [
          "Share a message someone sent you with people who [did not get it].",
          "Click the email › [Forward] › type the new address › [Send].",
        ],
        img: "forward",
        howto: "forward",
      },
      {
        t: "Your own message",
        lines: [
          "When you forward, you can write [new information] above the original message.",
          "The subject starts with [Fw:].",
        ],
        img: "forward",
        howto: "forward",
      },
      {
        t: "Cc (Carbon copy)",
        lines: [
          "Send one email to [more than one person] at the same time.",
          "Everyone on the Cc list [knows who else] got the message.",
        ],
        img: "cc",
        howto: "cc",
      },
      {
        t: "Bcc (Blind carbon copy)",
        lines: [
          "Bcc works like Cc, but the people on the Bcc list [don't know] who else got the message.",
          "It keeps their email addresses [private].",
        ],
        img: "bcc",
        howto: "bcc",
      },
      {
        t: "Cc and Bcc together",
        lines: [
          "Use [Cc] and [Bcc] to send the same email to [different groups] of people.",
          "For example: Cc your friends, Bcc your parents.",
        ],
        img: "ccbcc",
        howto: "ccbcc",
      },
    ],

    howto: [
      {
        k: "forward",
        t: "Forward an email",
        code: "3.2.1",
        ic: "↪️",
        img: "forward",
        start: { me: "marco" },
        steps: [
          {
            act: "click",
            t: "msg:healthy",
            say: "Click the email you want to forward: [Healthy food project].",
          },
          { act: "click", t: "rd:forward", say: "Click [Forward]." },
          {
            act: "type",
            t: "cm:to",
            text: ALEX,
            say: "Type the new email address: Alex.",
          },
          {
            act: "type",
            t: "cm:body",
            text: "Hi Alex, This is our meeting for the project. Can you come?",
            say: "Add your own message if you want.",
          },
          {
            act: "click",
            t: "cm:send",
            say: "Click [Send]. Alex will get the message.",
          },
        ],
      },
      {
        k: "cc",
        t: "Use Cc",
        code: "3.2.2",
        ic: "👥",
        img: "cc",
        start: FW("healthy"),
        steps: [
          {
            act: "click",
            t: "cm:ccbtn",
            say: "Click [Cc] to add more email addresses.",
          },
          {
            act: "type",
            t: "cm:cc",
            text: `${LISA}; ${TOM}`,
            say: "Add the email addresses: Lisa and Tom.",
          },
          { act: "click", t: "cm:send", say: "Click [Send]." },
        ],
      },
      {
        k: "bcc",
        t: "Use Bcc",
        code: "3.2.3",
        ic: "🙈",
        img: "bcc",
        start: FW("party"),
        steps: [
          {
            act: "click",
            t: "cm:bccbtn",
            say: "Click [Bcc] to add more email addresses.",
          },
          {
            act: "type",
            t: "cm:bcc",
            text: `${LISA}; ${TOM}`,
            say: "Add the email addresses: Lisa and Tom.",
          },
          { act: "click", t: "cm:send", say: "Click [Send]." },
        ],
      },
      {
        k: "ccbcc",
        t: "Cc and Bcc together",
        code: "3.2.4",
        ic: "📨",
        img: "ccbcc",
        start: FW("healthy"),
        steps: [
          { act: "click", t: "cm:ccbtn", say: "Click [Cc]." },
          {
            act: "type",
            t: "cm:cc",
            text: LISA,
            say: "In [Cc], type Lisa's address.",
          },
          { act: "click", t: "cm:bccbtn", say: "Click [Bcc]." },
          {
            act: "type",
            t: "cm:bcc",
            text: TOM,
            say: "In [Bcc], type Tom's address.",
          },
          { act: "click", t: "cm:send", say: "Click [Send]." },
        ],
      },
    ],

    games: [
      {
        k: "which",
        t: "Forward, Cc or Bcc?",
        en: "Pick the right one",
        ic: "📨",
        items: [
          {
            type: "mc",
            q: "Stella sent you an email. Send it to [Alex], who did not get it.",
            opts: ["Forward", "Cc", "Bcc"],
            oi: ["btn:forward", "btn:cc", "btn:bcc"],
          },
          {
            type: "mc",
            q: "Send an email to Alex, and [Lisa] gets it too. Everyone [sees] who got it.",
            opts: ["Cc", "Bcc", "Forward"],
            oi: ["btn:cc", "btn:bcc", "btn:forward"],
          },
          {
            type: "mc",
            q: "Send an email to many parents. They [should not see] each other's addresses.",
            opts: ["Bcc", "Cc", "Forward"],
            oi: ["btn:bcc", "btn:cc", "btn:forward"],
          },
          {
            type: "mc",
            q: "Lisa is on the [Cc] list. Does she see who else got the email?",
            opts: ["Yes", "No"],
            icon: "btn:cc",
            x: "With [Cc], everyone sees who else got it.",
          },
          {
            type: "mc",
            q: "Tom is on the [Bcc] list. Do the others see Tom's address?",
            opts: ["No", "Yes"],
            icon: "btn:bcc",
            x: "[Bcc] keeps Tom's address [private].",
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Outlook",
        en: "Forward, Cc, Bcc",
        ic: "📧",
        items: [
          {
            type: "sim",
            q: "Forward Marco's email [School project] to [Lisa].",
            start: { me: "stella" },
            steps: [
              {
                act: "click",
                t: "msg:school",
                say: "Click the email [School project].",
              },
              { act: "click", t: "rd:forward", say: "Click [Forward]." },
              {
                act: "type",
                t: "cm:to",
                text: LISA,
                say: "Type Lisa's email address.",
              },
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
          {
            type: "sim",
            q: "Write to [Alex] and [Cc] Tom.",
            start: { me: "stella" },
            steps: [
              { act: "click", t: "ol:newmail", say: "Click [New mail]." },
              {
                act: "type",
                t: "cm:to",
                text: ALEX,
                say: "In [To], type Alex's address.",
              },
              { act: "click", t: "cm:ccbtn", say: "Click [Cc]." },
              {
                act: "type",
                t: "cm:cc",
                text: TOM,
                say: "In [Cc], type Tom's address.",
              },
              {
                act: "type",
                t: "cm:subject",
                text: "Project",
                say: "In [Subject], type [Project].",
              },
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
          {
            type: "sim",
            q: "Forward the [Party invitation] to Alex, and [Bcc] Lisa.",
            start: { me: "marco" },
            steps: [
              {
                act: "click",
                t: "msg:party",
                say: "Click the email [Party invitation].",
              },
              { act: "click", t: "rd:forward", say: "Click [Forward]." },
              {
                act: "type",
                t: "cm:to",
                text: ALEX,
                say: "In [To], type Alex's address.",
              },
              { act: "click", t: "cm:bccbtn", say: "Click [Bcc]." },
              {
                act: "type",
                t: "cm:bcc",
                text: LISA,
                say: "In [Bcc], type Lisa's address.",
              },
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Forward, Cc and Bcc",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "Forward sends an email you got to someone else.",
            a: true,
            icon: "btn:forward",
          },
          {
            type: "tf",
            q: "People on the Bcc list can see who else got the email.",
            a: false,
            x: "With [Bcc], they [don't know] who else got it.",
            icon: "btn:bcc",
          },
          {
            type: "tf",
            q: "Cc means carbon copy.",
            a: true,
            icon: "btn:cc",
          },
          {
            type: "tf",
            q: "Before email, people used carbon paper to copy letters.",
            a: true,
            vis: { kind: "emoji", e: "📄 ✍️ 📄" },
          },
          {
            type: "tf",
            q: "When you forward an email, you cannot add your own message.",
            a: false,
            x: "You can write [new information] above the original message.",
            img: "forward",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "forward" },
          { type: "order", howto: "ccbcc" },
        ],
      },
    ],

    exercises: [
      {
        k: "btn",
        t: "What does this button do?",
        en: "Book · Hands on 1.1–1.3",
        ic: "🔘",
        from: "Book p. 110 · Hands on! 1.1–1.3",
        keep: true,
        items: [
          // unverified (all three): no key in the screenshots
          {
            type: "mc",
            q: "What does this button do in Outlook?",
            icon: "btn:forward",
            opts: [OPTS[0], OPTS[1], OPTS[2]],
          },
          {
            type: "mc",
            q: "What does this button do in Outlook?",
            icon: "btn:cc",
            opts: [OPTS[1], OPTS[2], OPTS[0]],
          },
          {
            type: "mc",
            q: "What does this button do in Outlook?",
            icon: "btn:bcc",
            opts: [OPTS[2], OPTS[1], OPTS[0]],
          },
        ],
      },
      {
        k: "ccorbcc",
        t: "Cc or Bcc?",
        en: "Book · Hands on 2.1–2.3",
        ic: "🤔",
        from: "Book pp. 110–111 · Hands on! 2.1–2.3",
        keep: true,
        items: [
          // unverified (all three): no key in the screenshots
          {
            type: "mc",
            q: "Send an email about online safety to [all students and their parents]. Should you use Cc or Bcc? Why?",
            img: "email-safety",
            opts: ["Bcc", "Cc"],
            x: "Many families get it, and they don't all know each other. [Bcc] keeps their email addresses [private].",
          },
          {
            type: "mc",
            q: "Email [team members] about a project. Should you use Cc or Bcc to email the whole team? Why?",
            img: "email-team",
            opts: ["Cc", "Bcc"],
            x: "The team works together. With [Cc] everyone sees who got it and can [reply to all].",
          },
          {
            type: "mc",
            q: "Email [your classmates] to invite them to a class dinner. Should you use Cc or Bcc? Why?",
            img: "email-dinner",
            opts: ["Cc", "Bcc"],
            x: "Classmates know each other. With [Cc] they see who else is [invited].",
          },
        ],
      },
      {
        k: "movie",
        t: "Movie night",
        en: "Book · Hands on 3 in Mini Outlook",
        ic: "🎬",
        from: "Book p. 111 · Hands on! 3",
        items: [
          {
            type: "sim",
            q: "Write and send an email to invite your friends to a [movie night]. [Cc] your friends and [Bcc] your parents to keep their email addresses private.",
            start: { me: "stella" },
            steps: [
              { act: "click", t: "ol:newmail", say: "Click [New mail]." },
              {
                act: "type",
                t: "cm:to",
                text: ALEX,
                say: "In [To], type a friend: Alex.",
              },
              { act: "click", t: "cm:ccbtn", say: "Click [Cc]." },
              {
                act: "type",
                t: "cm:cc",
                text: `${LISA}; ${TOM}`,
                say: "In [Cc], type your other friends: Lisa and Tom.",
              },
              { act: "click", t: "cm:bccbtn", say: "Click [Bcc]." },
              {
                act: "type",
                t: "cm:bcc",
                text: "my.parents@outlook.com",
                say: "In [Bcc], type your parents' address.",
              },
              {
                act: "type",
                t: "cm:subject",
                text: "Movie night",
                say: "In [Subject], type [Movie night].",
              },
              {
                act: "type",
                t: "cm:body",
                text: "Hi friends! Do you want to come to a movie night on Friday at 6 p.m.? Stella",
                say: "Type your invitation.",
              },
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
        ],
      },
    ],
  };
})();
