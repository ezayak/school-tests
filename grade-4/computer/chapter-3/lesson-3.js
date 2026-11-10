// Computer · Grade 4 · Unit 3 · Lesson 3 « Sending files » (book pages 112–122).
// All the content of the lesson. The how-to's are done in Mini Edge and Mini Outlook (shared/netsim.js). Same format as lesson-1.js.
// Book mistake fixed: the first heading of p. 112 says "SmartArt"; the section is about attachments, so the card says "Attachments".
// Left out: Hands on 4 "In your notebook, draw the images you found" (drawing). Hands on 2.1 (a list in Word) is an open task here.
// The e-book's Hands on answers were not shown in the screenshots: the answers here are from the lesson text (// unverified, UNVERIFIED.md).
(function () {
  const RESULTS = {
    app: "edge",
    page: "results",
    q: "healthy food",
    itab: "Images",
  };
  const TOMMAIL = {
    me: "tom",
    compose: { to: "Stella", subject: "Healthy food project" },
  };
  const ATTACH = (folder, file, what) => [
    {
      act: "click",
      t: "cm:attach",
      say: "Click the [Attach file] icon 📎.",
    },
    {
      act: "click",
      t: "attach:browse",
      say: "Click [Browse this computer].",
    },
    ...(folder === "Pictures"
      ? []
      : [
          {
            act: "click",
            t: "fd:nav:" + folder,
            say: `Click [${folder}].`,
          },
        ]),
    { act: "click", t: "fd:file:" + file, say: `Click ${what}.` },
    { act: "click", t: "fd:open", say: "Click [Open]." },
  ];
  const GOOGLE = [
    {
      act: "type",
      t: "e:addr",
      text: "www.google.com",
      say: "In the address bar, type [www.google.com].",
    },
    { act: "key", t: "key:Enter", key: "Enter", say: "Press [Enter]." },
    { act: "click", t: "g:images", say: "Click [Images]." },
  ];
  const SEARCH = (q) => [
    {
      act: "type",
      t: "g:q",
      text: q,
      say: `Type a key word: [${q}].`,
    },
    { act: "key", t: "key:Enter", key: "Enter", say: "Press [Enter]." },
  ];
  const SAVEIMG = (i, what) => [
    { act: "right", t: "gimg:" + i, say: `Right-click ${what}.` },
    { act: "click", t: "cx:saveimg", say: "Click [Save image as]." },
    { act: "click", t: "fd:save", say: "Click [Save]." },
  ];
  const KINDS = [
    "Document file",
    "Image file",
    "Music or audio file",
    "Video file",
    "Presentation file",
  ];
  const KIC = ["file:docx", "file:png", "file:mp3", "file:mp4", "file:pptx"];
  // the right kind first, then the others in the same order
  const kind = (q, k, x) => ({
    type: "mc",
    q,
    opts: [KINDS[k], ...KINDS.filter((_, i) => i !== k)],
    oi: [KIC[k], ...KIC.filter((_, i) => i !== k)],
    ...(x ? { x } : {}),
  });
  const SENDS = [
    "A picture from your family vacation",
    "An essay or a short story you wrote",
    "A slideshow presentation for a class project",
    "A recording of a song you created",
    "A video of a class performance",
  ];
  const sends = (q, k, img) => ({
    type: "mc",
    q,
    img,
    opts: [SENDS[k], ...SENDS.filter((_, i) => i !== k)],
  });

  window.LESSON = {
    n: 3,
    grade: 4,
    title: "Sending files",
    unit: "Unit 3 · Lesson 3",
    book: "Book pages 112–122",
    cover: "attach",
    question: {
      q: "Have you ever sent a [picture] through an email? Why might someone need to [attach a file] instead of just typing a message?",
      a: "Some things are not words: a [photo], a [song], a [video] or your [homework]. You attach the file, and your friend can open it.", // unverified: the book asks, it has no answer
      img: "attach",
    },
    words: [
      {
        w: "Attachment",
        m: "a file you send with your email",
      },
      { w: "Attach file 📎", m: "the button that adds a file to your email" },
      {
        w: "Usage rights",
        m: "the permission to use a picture, change it or share it",
      },
      {
        w: "Save image as",
        m: "save a picture from the Internet on your computer",
      },
      { w: "Any duration", m: "choose how long the videos are" },
      { w: "ZIP file", m: "files made smaller (compressed) to send them" },
      {
        w: "Preview",
        m: "quickly look at an attached file without downloading it",
      },
      {
        w: "Remove Attachment",
        m: "take the file off the email before sending",
      },
    ],

    ideas: [
      {
        t: "Attachments",
        lines: [
          "Sometimes you want to share [more than words]: a document, a picture, a video.",
          "An [attachment] is any file you send with your email. Your friend can [open] it or [save] it.",
        ],
        img: "attach",
        howto: "attach",
      },
      {
        t: "Document files",
        lines: ["Your [homework] for the teacher, or a [text] for a friend."],
        img: "doc-ic",
      },
      {
        t: "Image files",
        lines: ["A [picture] of your vacation, or a [drawing] you made."],
        img: "image-ic",
      },
      {
        t: "Music or audio files",
        lines: ["A [song] you recorded."],
        img: "audio-ic",
      },
      {
        t: "Video files",
        lines: [
          "A [video] from a class party, or one you made on your computer.",
        ],
        img: "video-ic",
      },
      {
        t: "Presentation files",
        lines: ["Your homework [presentation] for the teacher or the class."],
        img: "pres-ic",
      },
      {
        t: "Too big?",
        lines: [
          "If the files are [too big] to send by email,",
          "[compress] them into a [ZIP] file.",
        ],
        img: "girl",
      },
      {
        t: "Find images on the Internet",
        lines: [
          "Open [Microsoft Edge]. Type [www.google.com] and press [Enter].",
          "Click [Images], type a key word, like [healthy food], and press [Enter].",
        ],
        img: "google",
        howto: "images",
      },
      {
        t: "Tools",
        lines: [
          "Click [Tools] to choose the [Size] and the [Color] of the pictures.",
          "[Usage rights]: find pictures you have [permission] to use, change or share by email.",
        ],
        img: "tools",
        howto: "tools",
      },
      {
        t: "Small or large?",
        lines: [
          "[Smaller] photos are easier to send by email.",
          "[Large] photos are best for printing or for a presentation.",
        ],
        img: "boy-glasses",
      },
      {
        t: "Save an image",
        lines: [
          "Click the picture: it opens [bigger]. [Right-click] it › [Save image as].",
          "The [photo icon] finds more pictures like it.",
        ],
        img: "save-image",
        howto: "saveimg",
      },
      {
        t: "Smart tip",
        lines: [
          "Respect the work of [photographers].",
          "Download ONLY photos that are [free] and have the right [usage rights].",
        ],
        vis: { kind: "emoji", e: "📷 ✅" },
      },
      {
        t: "Videos on the Internet",
        lines: [
          "Videos make your ideas more interesting. [Ask your teacher] before you download one.",
          "[Short] videos are better. [Any duration] chooses how long they are.",
        ],
        img: "videos",
        howto: "videos",
      },
      {
        t: "Attach a file",
        lines: [
          "Write your email, click the [Attach file] icon 📎.",
          "[Browse this computer] › find the file › [Open].",
        ],
        img: "attach",
        howto: "attach",
      },
      {
        t: "Music you pay for",
        lines: [
          "Do [not] attach or send music files that you have to [pay] for.",
          "It is [illegal].",
        ],
        vis: { kind: "emoji", e: "🎵 💲 🚫" },
      },
      {
        t: "Extra tips",
        lines: [
          "Right-click an attached picture: [Preview], [Open], [Copy], [Save As].",
          "[Remove Attachment] takes it off the email before you send it.",
        ],
        img: "att-options",
        howto: "extra",
      },
      {
        t: "You got a file",
        lines: [
          "A message with a file has a 📎 or a [small picture].",
          "Right-click the file › [Save As] › choose the folder › [Save].",
        ],
        img: "inbox-att",
        howto: "saveatt",
      },
      {
        t: "Smart tip: big files",
        lines: [
          "Don't attach [very large] files, like a 1-hour video.",
          "They take a long time to send, or never arrive.",
        ],
        vis: { kind: "emoji", e: "🎬 ⏳" },
      },
      {
        t: "Rules for attachments",
        lines: [
          "Don't open attachments from people you [don't know]: they can have [viruses]. Not sure? Ask an adult.",
          "The [file name] says what is inside, like [MyHomework.docx].",
        ],
        vis: { kind: "emoji", e: "🦠 🚫 · 📄" },
      },
      {
        t: "Which program opens it?",
        lines: [
          "An attached file opens with the [usual program] of your computer.",
          "If you [save] it, you can open it with [any program].",
        ],
        img: "save-att",
      },
    ],

    howto: [
      {
        k: "images",
        t: "Search for images",
        code: "3.3.1",
        ic: "🔎",
        img: "google",
        start: { app: "edge" },
        steps: [...GOOGLE, ...SEARCH("healthy food")],
      },
      {
        k: "tools",
        t: "Images that match your needs",
        code: "3.3.2",
        ic: "🧰",
        img: "tools",
        start: RESULTS,
        steps: [
          {
            act: "click",
            t: "g:tools",
            say: "Click [Tools] to open more options.",
          },
          { act: "click", t: "g:size", say: "Click [Size]." },
          {
            act: "click",
            t: "opt:Medium",
            say: "Click the size you want: [Medium].",
          },
        ],
      },
      {
        k: "saveimg",
        t: "Save an image",
        code: "3.3.3",
        ic: "💾",
        img: "save-image",
        start: RESULTS,
        steps: [
          {
            act: "click",
            t: "gimg:4",
            say: "Click the picture of the [apples]. It opens bigger.",
          },
          { act: "right", t: "g:big", say: "Right-click the big picture." },
          { act: "click", t: "cx:saveimg", say: "Click [Save image as]." },
          {
            act: "click",
            t: "fd:save",
            say: "Click [Save]. The picture is in [Pictures].",
          },
        ],
      },
      {
        k: "videos",
        t: "Search for videos",
        code: "3.3.4",
        ic: "🎬",
        img: "videos",
        start: { app: "edge", page: "google" },
        steps: [
          ...SEARCH("yellow fruits"),
          { act: "click", t: "g:tab:Videos", say: "Click [Videos]." },
          { act: "click", t: "gvid:0", say: "Click the video to open it." },
          { act: "click", t: "yt:play", say: "Click ▶ to play it." },
        ],
      },
      {
        k: "attach",
        t: "Attach a file",
        code: "3.3.5",
        ic: "📎",
        img: "attach",
        start: TOMMAIL,
        steps: [
          {
            act: "type",
            t: "cm:body",
            text: "Hello Stella, I am sending some photos for the project about healthy food.",
            say: "Type your message.",
          },
          ...ATTACH("Pictures", "apples", "the photo [apples]"),
          { act: "click", t: "cm:send", say: "Click [Send]." },
        ],
      },
      {
        k: "extra",
        t: "Preview or remove an attachment",
        code: "3.3.6",
        ic: "🖼️",
        img: "att-options",
        start: {
          me: "tom",
          compose: {
            to: "Stella",
            subject: "Healthy food project",
            att: ["apples.png", "fruits.png"],
          },
        },
        steps: [
          {
            act: "right",
            t: "catt:apples.png",
            say: "Right-click the file [apples.png].",
          },
          {
            act: "click",
            t: "cattm:preview",
            say: "Click [Preview] to look at it quickly.",
          },
          { act: "click", t: "pv:close", say: "Close the preview." },
          {
            act: "right",
            t: "catt:fruits.png",
            say: "Right-click the file [fruits.png].",
          },
          {
            act: "click",
            t: "cattm:remove",
            say: "Click [Remove Attachment]. It is off the email.",
          },
        ],
      },
      {
        k: "saveatt",
        t: "Save an attachment",
        code: "3.3.7",
        ic: "📥",
        img: "save-att",
        start: { me: "stella" },
        steps: [
          {
            act: "click",
            t: "msg:apples",
            say: "Find the new message and click it.",
          },
          {
            act: "look",
            t: "att:apples.png",
            say: "A preview of the email appears on the right, with the file.",
          },
          {
            act: "right",
            t: "att:apples.png",
            say: "Right-click the attachment.",
          },
          { act: "click", t: "attm:saveas", say: "Click [Save As]." },
          {
            act: "click",
            t: "fd:save",
            say: "Choose the folder and click [Save].",
          },
        ],
      },
    ],

    games: [
      {
        k: "kind",
        t: "Which kind of file?",
        en: "Document, image, music, video, presentation",
        ic: "🗂️",
        items: [
          kind("The [story] you wrote for your teacher", 0),
          kind("A [drawing] you made", 1),
          kind("A [song] you recorded", 2),
          kind("A [video] of the class party", 3),
          kind("Your [slides] for the class project", 4),
        ],
      },
      {
        k: "ok",
        t: "Is it OK?",
        en: "Rules for files and pictures",
        ic: "🛡️",
        items: [
          {
            type: "tf",
            q: "Download any photo you like from the Internet.",
            a: false,
            x: "Only photos that are [free] and have the right [usage rights].",
            img: "tools",
          },
          {
            type: "tf",
            q: "Small photos are easier to send by email.",
            a: true,
            img: "boy-glasses",
          },
          {
            type: "tf",
            q: "Send a 1-hour video by email.",
            a: false,
            x: "Very large files take a long time, or [never arrive].",
            vis: { kind: "emoji", e: "🎬 ⏳" },
          },
          {
            type: "tf",
            q: "Open an attachment from someone you don't know.",
            a: false,
            x: "It can have [viruses]. Ask an adult.",
            vis: { kind: "emoji", e: "❓ 📎 🦠" },
          },
          {
            type: "tf",
            q: "Name your file so it says what is inside, like MyHomework.docx.",
            a: true,
            icon: "file:docx",
          },
          {
            type: "tf",
            q: "Send a song you had to pay for to all your friends.",
            a: false,
            x: "Sending music you pay for is [illegal].",
            icon: "file:mp3",
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Edge & Outlook",
        en: "Pictures, videos, attachments",
        ic: "📎",
        items: [
          {
            type: "sim",
            q: "Find [large] pictures of [yellow fruits].",
            start: { app: "edge", page: "gimages" },
            steps: [
              ...SEARCH("yellow fruits"),
              { act: "click", t: "g:tools", say: "Click [Tools]." },
              { act: "click", t: "g:size", say: "Click [Size]." },
              { act: "click", t: "opt:Large", say: "Click [Large]." },
            ],
          },
          {
            type: "sim",
            q: "Find [short] videos about yellow fruits.",
            start: {
              app: "edge",
              page: "results",
              q: "yellow fruits",
              itab: "Videos",
            },
            steps: [
              { act: "click", t: "g:dur", say: "Click [Any duration]." },
              {
                act: "click",
                t: "opt:Short (0-4 min)",
                say: "Click [Short (0-4 min)].",
              },
            ],
          },
          {
            type: "sim",
            q: "Send your [homework] to Mrs. Smith.",
            start: {
              me: "stella",
              compose: { to: "teacher@school.com", subject: "My homework" },
            },
            steps: [
              ...ATTACH("Documents", "MyHomework", "[MyHomework]"),
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
          {
            type: "sim",
            q: "[Remove] the wrong file before you send.",
            start: {
              me: "tom",
              compose: {
                to: "Stella",
                subject: "Healthy food project",
                att: ["apples.png", "My song.mp3"],
              },
            },
            steps: [
              {
                act: "right",
                t: "catt:My song.mp3",
                say: "Right-click the song: it is the wrong file.",
              },
              {
                act: "click",
                t: "cattm:remove",
                say: "Click [Remove Attachment].",
              },
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "images" },
          { type: "order", howto: "saveatt" },
        ],
      },
    ],

    exercises: [
      {
        k: "send",
        t: "What would you send?",
        en: "Book · Hands on 1.1–1.5",
        ic: "🗂️",
        from: "Book p. 120 · Hands on! 1.1–1.5",
        keep: true,
        items: [
          // unverified (all five): no key in the screenshots
          sends("What would you send as a document file?", 1, "doc-ic"),
          sends("What would you send as an image file?", 0, "image-ic"),
          sends("What would you send as a presentation file?", 2, "pres-ic"),
          sends(
            "What would you send as a music or an audio file?",
            3,
            "audio-ic",
          ),
          sends("What would you send as a video file?", 4, "video-ic"),
        ],
      },
      {
        k: "doc",
        t: "A Word document as an attachment",
        en: "Book · Hands on 2.1–2.2",
        ic: "📄",
        from: "Book pp. 120–121 · Hands on! 2.1–2.2",
        keep: true,
        items: [
          {
            type: "open",
            q: "List five well-known animals from your country in a text document.",
            a: "Open [Word]. Write [five animals] from your country, one on each line. Save the file with a clear name, like [Animals of my country.docx].", // unverified: the animals are the child's own
            img: "doc-ic",
          },
          {
            type: "sim",
            q: "Send an email to one of your classmates with this text document as an attachment.",
            start: { me: "stella" },
            steps: [
              { act: "click", t: "ol:newmail", say: "Click [New mail]." },
              {
                act: "type",
                t: "cm:to",
                text: "alex.bacademy@outlook.com",
                say: "In [To], type your classmate's address: Alex.",
              },
              {
                act: "type",
                t: "cm:subject",
                text: "Animals of my country",
                say: "In [Subject], type [Animals of my country].",
              },
              ...ATTACH(
                "Documents",
                "Animals of my country",
                "[Animals of my country]",
              ),
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
        ],
      },
      {
        k: "food",
        t: "An image as an attachment",
        en: "Book · Hands on 3.1–3.2 in Mini Edge & Outlook",
        ic: "🍕",
        from: "Book p. 121 · Hands on! 3.1–3.2",
        keep: true,
        items: [
          {
            type: "sim",
            q: "Search the Internet for an image of your [favorite food]. Save the image on your computer.",
            start: { app: "edge" },
            steps: [
              ...GOOGLE,
              ...SEARCH("pizza"),
              ...SAVEIMG(0, "the first picture"),
            ],
          },
          {
            type: "sim",
            q: "Send an email to one of your classmates with this image as an attachment. In the email, ask your friend about their [favorite foods].",
            start: {
              me: "stella",
              files: { Pictures: [{ name: "pizza-1", ext: "jpg", e: "🍕🍕" }] },
            },
            steps: [
              { act: "click", t: "ol:newmail", say: "Click [New mail]." },
              {
                act: "type",
                t: "cm:to",
                text: "lisa-dt-ba@outlook.com",
                say: "In [To], type your classmate's address: Lisa.",
              },
              {
                act: "type",
                t: "cm:subject",
                text: "My favorite food",
                say: "In [Subject], type [My favorite food].",
              },
              {
                act: "type",
                t: "cm:body",
                text: "Hi Lisa! My favorite food is pizza. What are your favorite foods?",
                say: "Type your message and ask about her favorite foods.",
              },
              ...ATTACH("Pictures", "pizza-1", "your picture [pizza-1]"),
              { act: "click", t: "cm:send", say: "Click [Send]." },
            ],
          },
        ],
      },
      {
        k: "veg",
        t: "Free images of vegetables",
        en: "Book · Hands on 4 in Mini Edge",
        ic: "🥕",
        from: "Book p. 122 · Hands on! 4",
        items: [
          {
            type: "sim",
            q: "Search the Internet for [free] images of [vegetables] and save [two] of them to your computer.",
            start: { app: "edge", page: "gimages" },
            steps: [
              ...SEARCH("vegetables"),
              { act: "click", t: "g:tools", say: "Click [Tools]." },
              { act: "click", t: "g:rights", say: "Click [Usage rights]." },
              {
                act: "click",
                t: "opt:Creative Commons licenses",
                say: "Click [Creative Commons licenses]: free pictures.",
              },
              ...SAVEIMG(0, "the [carrots]"),
              ...SAVEIMG(1, "the [broccoli]"),
            ],
          },
        ],
      },
    ],
  };
})();
