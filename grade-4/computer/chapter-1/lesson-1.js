// Computer · Grade 4 · Unit 1 · Lesson 1 « My desktop » (book pages 9–19, CW1, HW1).
// All the content of the lesson. The engine is computer-lesson.js, Mini Windows is winsim.js.
// Text: [word] is a key word (coloured). Pictures: img: "name" (img/lesson-1/name.jpg) or vis: {kind: …} (drawn).
// Mini Windows steps: {act: click | dbl | right | drag | type | hover | look, t: "<target>", say: "…"}.
window.LESSON = {
  n: 1,
  grade: 4,
  title: "My desktop",
  unit: "Unit 1 · Lesson 1",
  book: "Book pages 9–19",
  cover: "move-shortcut",
  question: {
    q: "Where should we keep the files we use most often?",
    a: "On the [desktop], as [shortcuts]!",
    img: "desktop-shortcut",
  },

  // 📖 Big ideas: one picture, a few short sentences
  ideas: [
    {
      t: "Files",
      lines: ["A [file] keeps your work.", "There are many kinds of files."],
      vis: {
        kind: "icons",
        items: [
          { type: "jpg", label: "Image file" },
          { type: "mp3", label: "Sound file" },
          { type: "docx", label: "Text file" },
          { type: "pptx", label: "Presentation" },
          { type: "mp4", label: "Video" },
        ],
      },
    },
    {
      t: "Every file has an icon",
      lines: [
        "The [icon] shows the kind of file.",
        "Look at the picture on the icon.",
      ],
      vis: {
        kind: "icons",
        size: 84,
        items: [
          { type: "jpg", label: "Picture" },
          { type: "mp3", label: "Sound" },
          { type: "docx", label: "Word" },
          { type: "pdf", label: "PDF" },
        ],
      },
    },
    {
      t: "Programs make files",
      lines: ["[Word] makes a document.", "[Paint] makes a picture."],
      vis: {
        kind: "flow",
        rows: [
          { from: "📝 Word", type: "docx", label: "Document" },
          { from: "🎨 Paint", type: "jpg", label: "Picture" },
        ],
      },
    },
    {
      t: "Move files",
      lines: [
        "Connect a phone to the computer.",
        "You can [transfer] (move) files.",
      ],
      img: "transfer",
    },
    {
      t: "Give files good names",
      lines: [
        "Every file needs a [name].",
        "Choose a name that tells what is inside.",
      ],
      vis: {
        kind: "compare",
        bad: [
          { type: "jpg", label: "File 1" },
          { type: "docx", label: "File 2" },
          { type: "txt", label: "File 3" },
        ],
        good: [
          { type: "jpg", label: "Boat" },
          { type: "docx", label: "Grammar" },
          { type: "txt", label: "Codes" },
        ],
      },
    },
    {
      t: "Name . extension",
      lines: [
        "[Grammar] is the name.",
        "[docx] is the extension.",
        "Always a [dot] between them!",
      ],
      vis: { kind: "nameext", name: "Grammar", ext: "docx", type: "docx" },
    },
    {
      t: "The extension tells the type",
      lines: ["The [extension] tells the computer what kind of file it is."],
      vis: {
        kind: "icons",
        size: 60,
        items: [
          { type: "docx", label: ".docx = Word" },
          { type: "pdf", label: ".pdf = PDF" },
          { type: "pptx", label: ".pptx = slides" },
          { type: "jpg", label: ".jpg = picture" },
          { type: "mp3", label: ".mp3 = sound" },
          { type: "mp4", label: ".mp4 = video" },
        ],
      },
    },
    {
      t: "File size",
      lines: [
        "A file takes [space] on the computer.",
        "We measure it in [bytes].",
      ],
      vis: {
        kind: "lines",
        rows: ["1 KB = 1,024 bytes", "1 MB = 1,048,576 bytes"],
        note: "KB = kilobyte · MB = megabyte",
      },
    },
    {
      t: "Big and small files",
      lines: ["[Videos] and [pictures] are big.", "[Text] files are small."],
      vis: {
        kind: "sizes",
        items: [
          { type: "txt", name: "Codes.txt", kb: 2 },
          { type: "docx", name: "Grammar.docx", kb: 501 },
          { type: "jpg", name: "Boat.jpg", kb: 2100 },
          { type: "mp4", name: "School trip.mp4", kb: 48000 },
        ],
      },
    },
    {
      t: "See the size",
      lines: ["[Point] to a file with the mouse.", "A box shows the [size]."],
      img: "size-tip",
      howto: "size",
    },
    {
      t: "Search",
      lines: [
        "Lost a file? [Search] for it!",
        "Use the [Search] button or [File Explorer].",
      ],
      img: "search-taskbar",
      howto: "search-taskbar",
    },
    {
      t: "Search filters",
      lines: ["Filters find files by [date] or [size]."],
      img: "filters",
      howto: "filters",
    },
    {
      t: "The star *",
      lines: ["Don't know the whole name?", "[*] means: any letters."],
      vis: {
        kind: "wild",
        pattern: "*ball",
        items: [
          { type: "jpg", label: "Baseball" },
          { type: "jpg", label: "Basketball" },
          { type: "jpg", label: "Football" },
        ],
      },
      tip: {
        img: "wildcard-boy",
        say: "Type *ball to find baseball, basketball and football.",
      },
    },
    {
      t: "Shortcut",
      lines: [
        "A [shortcut] is a link.",
        "It opens a file [fast].",
        "Look for the small [arrow].",
      ],
      vis: {
        kind: "icons",
        size: 84,
        items: [
          { type: "docx", label: "Grammar.docx", mark: "file" },
          {
            type: "docx",
            sc: true,
            label: "Grammar.docx - Shortcut",
            mark: "link",
          },
        ],
      },
      howto: "create-shortcut",
    },
    {
      t: "Shortcuts on the desktop",
      lines: [
        "Put shortcuts on the [desktop].",
        "Then you find your files quickly.",
      ],
      img: "desktop-shortcut",
      howto: "desktop-shortcut",
    },
    {
      t: "Delete a shortcut",
      lines: [
        "Delete the shortcut: only the [link] goes.",
        "The real [file stays].",
      ],
      vis: {
        kind: "flow",
        rows: [
          {
            from: "🗑️",
            type: "docx",
            sc: true,
            label: "Shortcut: gone",
            x: true,
          },
          { from: "✅", type: "docx", label: "File: still here" },
        ],
      },
      howto: "delete-shortcut",
    },
    {
      t: "Be safe",
      lines: ["Work in a room with [good light]."],
      vis: { kind: "emoji", e: "💡🪟" },
    },
  ],

  // 🖱️ How to …: the book's steps, done in Mini Windows (▶ Show me / ✋ Your turn)
  howto: [
    {
      k: "size",
      code: "1.1.4",
      t: "See the size of a file",
      ic: "📏",
      img: "size-tip",
      start: { explorer: "Documents/Lessons/Reading" },
      steps: [
        {
          act: "hover",
          t: "file:Grammar.docx",
          say: "Point to [Grammar.docx].",
        },
        {
          act: "click",
          t: "tip-size",
          say: "Look at the [size]: 501 KB. Tap it.",
        },
      ],
    },
    {
      k: "search-taskbar",
      code: "1.1.5",
      t: "Search with the Search button",
      ic: "🔍",
      img: "search-taskbar",
      video: "l1-search-taskbar",
      start: {},
      steps: [
        {
          act: "click",
          t: "task-search",
          say: "Click [Search] on the taskbar.",
        },
        {
          act: "type",
          t: "search-input",
          text: "Subjects",
          say: "Type [Subjects].",
        },
        { act: "click", t: "result:Subjects", say: "Click [Subjects]." },
        { act: "look", t: null, say: "The [Subjects] folder is open!" },
      ],
    },
    {
      k: "search-explorer",
      code: "1.1.6",
      t: "Search in File Explorer",
      ic: "📁",
      img: "explorer-search",
      video: "l1-search-explorer",
      start: {},
      steps: [
        { act: "click", t: "task-explorer", say: "Click [File Explorer]." },
        { act: "click", t: "exp-search", say: "Click the [search box]." },
        {
          act: "type",
          t: "exp-search",
          text: "geography",
          say: "Type [geography].",
        },
        { act: "look", t: "sres:Geography", say: "Look at the [results]." },
        { act: "dbl", t: "sres:Geography", say: "Double-click [Geography]." },
      ],
    },
    {
      k: "filters",
      code: "1.1.7",
      t: "Search filters",
      ic: "🎚️",
      img: "filters",
      start: { explorer: "Documents" },
      steps: [
        { act: "click", t: "exp-search", say: "Click the [search box]." },
        { act: "type", t: "exp-search", text: "docx", say: "Type [docx]." },
        { act: "click", t: "searchopt", say: "Click [Search options]." },
        { act: "click", t: "sopt:date", say: "Point to [Date modified]." },
        { act: "click", t: "filt:date:Today", say: "Click [Today]." },
        { act: "look", t: null, say: "Now you see only files from [today]." },
      ],
    },
    {
      k: "create-shortcut",
      code: "1.1.8",
      t: "Make a shortcut",
      ic: "🔗",
      img: "create-shortcut",
      video: "l1-create-shortcut",
      start: { explorer: "Documents/Lessons/Reading" },
      steps: [
        {
          act: "right",
          t: "file:Grammar.docx",
          say: "Right-click [Grammar.docx].",
        },
        { act: "click", t: "menu:more", say: "Click [Show more options]." },
        {
          act: "click",
          t: "menu:create-shortcut",
          say: "Click [Create shortcut].",
        },
        {
          act: "look",
          t: "file:Grammar.docx - Shortcut",
          say: "Here is the [shortcut]. See the little [arrow]!",
        },
      ],
    },
    {
      k: "move-shortcut",
      code: "1.1.9",
      t: "Move a shortcut",
      ic: "✋",
      img: "move-shortcut",
      video: "l1-move-shortcut",
      start: {
        explorer: "Documents/Lessons/Reading",
        shortcuts: [
          {
            of: "Documents/Lessons/Reading/Grammar.docx",
            in: "Documents/Lessons/Reading",
          },
        ],
      },
      steps: [
        {
          act: "click",
          t: "file:Grammar.docx - Shortcut",
          say: "Click the [shortcut].",
        },
        {
          act: "drag",
          t: "file:Grammar.docx - Shortcut",
          to: "desktop",
          say: "[Drag] it to the desktop and let go.",
        },
        {
          act: "look",
          t: "desk:Grammar.docx - Shortcut",
          say: "Now it is on the [desktop]!",
        },
      ],
    },
    {
      k: "desktop-shortcut",
      code: "1.1.10",
      t: "Make a shortcut on the desktop",
      ic: "🖥️",
      img: "desktop-shortcut",
      video: "l1-desktop-shortcut",
      start: { explorer: "Documents/Lessons/Reading" },
      steps: [
        {
          act: "click",
          t: "file:Grammar.docx",
          say: "Find [Grammar.docx]. Click it.",
        },
        { act: "right", t: "file:Grammar.docx", say: "[Right-click] it." },
        { act: "click", t: "menu:more", say: "Click [Show more options]." },
        { act: "click", t: "menu:sendto", say: "Point to [Send to]." },
        {
          act: "click",
          t: "send:desktop-shortcut",
          say: "Click [Desktop (create shortcut)].",
        },
        {
          act: "look",
          t: "desk:Grammar.docx - Shortcut",
          say: "The shortcut is on the [desktop]!",
        },
      ],
    },
    {
      k: "delete-shortcut",
      code: "1.1.11",
      t: "Delete a shortcut",
      ic: "🗑️",
      img: "delete-shortcut",
      video: "l1-delete-shortcut",
      start: {
        explorer: "Documents/Lessons/Reading",
        shortcuts: [
          { of: "Documents/Lessons/Reading/Grammar.docx", in: "Desktop" },
        ],
      },
      steps: [
        {
          act: "right",
          t: "desk:Grammar.docx - Shortcut",
          say: "Right-click the [shortcut].",
        },
        { act: "click", t: "mi:delete", say: "Click [Delete] 🗑." },
        {
          act: "look",
          t: "file:Grammar.docx",
          say: "The [file] is still here. Only the shortcut is gone.",
        },
      ],
    },
  ],

  // 🎲 Play
  games: [
    {
      k: "where",
      t: "Where do I click?",
      en: "Find the right place on the screen",
      ic: "🎯",
      items: [
        {
          type: "sim",
          start: {},
          steps: [
            {
              act: "click",
              t: "task-search",
              say: "Click the [Search] button.",
            },
          ],
        },
        {
          type: "sim",
          start: {},
          steps: [
            { act: "click", t: "task-explorer", say: "Open [File Explorer]." },
          ],
        },
        {
          type: "sim",
          start: { explorer: "" },
          steps: [
            { act: "click", t: "exp-search", say: "Click the [search box]." },
          ],
        },
        {
          type: "sim",
          start: { explorer: "" },
          steps: [
            { act: "click", t: "nav:Documents", say: "Open [Documents]." },
          ],
        },
        {
          type: "sim",
          start: { explorer: "Documents/Lessons/Reading" },
          steps: [
            {
              act: "right",
              t: "file:Grammar.docx",
              say: "Right-click [Grammar.docx].",
            },
          ],
        },
        {
          type: "sim",
          start: {
            explorer: "Documents/Lessons/Reading",
            pre: [{ act: "right", t: "file:Grammar.docx" }],
          },
          steps: [
            { act: "click", t: "menu:more", say: "Click [Show more options]." },
          ],
        },
        {
          type: "sim",
          start: {
            explorer: "Documents/Lessons/Reading",
            pre: [
              { act: "right", t: "file:Grammar.docx" },
              { act: "click", t: "menu:more" },
            ],
          },
          steps: [
            {
              act: "click",
              t: "menu:create-shortcut",
              say: "Click [Create shortcut].",
            },
          ],
        },
        {
          type: "sim",
          start: {
            explorer: "Documents/Lessons/Reading",
            pre: [
              { act: "right", t: "file:Grammar.docx" },
              { act: "click", t: "menu:more" },
            ],
          },
          steps: [
            { act: "click", t: "menu:sendto", say: "Point to [Send to]." },
          ],
        },
        {
          type: "sim",
          start: {
            explorer: "Documents/Lessons/Reading",
            pre: [
              { act: "right", t: "file:Grammar.docx" },
              { act: "click", t: "menu:more" },
              { act: "click", t: "menu:sendto" },
            ],
          },
          steps: [
            {
              act: "click",
              t: "send:desktop-shortcut",
              say: "Click [Desktop (create shortcut)].",
            },
          ],
        },
        {
          type: "sim",
          start: {
            explorer: "Documents/Lessons/Reading",
            shortcuts: [
              {
                of: "Documents/Lessons/Reading/Grammar.docx",
                in: "Documents/Lessons/Reading",
              },
            ],
          },
          steps: [
            {
              act: "click",
              t: "file:Grammar.docx - Shortcut",
              say: "Click the [shortcut]. Look for the arrow!",
            },
          ],
        },
        {
          type: "sim",
          start: {
            explorer: "Documents/Lessons/Reading",
            shortcuts: [
              { of: "Documents/Lessons/Reading/Grammar.docx", in: "Desktop" },
            ],
            pre: [{ act: "right", t: "desk:Grammar.docx - Shortcut" }],
          },
          steps: [
            { act: "click", t: "mi:delete", say: "Click the [Delete] icon." },
          ],
        },
        {
          type: "sim",
          start: { explorer: "Documents/Lessons/Reading" },
          steps: [
            {
              act: "hover",
              t: "file:Grammar.docx",
              say: "Point to [Grammar.docx] to see its size.",
            },
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
        { type: "order", howto: "create-shortcut" },
        { type: "order", howto: "desktop-shortcut" },
        { type: "order", howto: "search-taskbar" },
        { type: "order", howto: "search-explorer" },
        { type: "order", howto: "delete-shortcut" },
      ],
    },
    {
      k: "types",
      t: "File types",
      en: "Match the icon and the file type",
      ic: "🗂️",
      items: [
        {
          type: "match",
          pairs: [
            { icon: "jpg", label: "Image file" },
            { icon: "mp3", label: "Sound file" },
            { icon: "docx", label: "Word document" },
          ],
        },
        {
          type: "match",
          pairs: [
            { icon: "pptx", label: "Presentation" },
            { icon: "mp4", label: "Video" },
            { icon: "pdf", label: "PDF file" },
          ],
        },
      ],
    },
    {
      k: "ext",
      t: "Name . extension",
      en: "Tap the name, the dot or the extension",
      ic: "🔤",
      items: [
        { type: "parts", file: "Grammar.docx", icon: "docx", ask: "ext" },
        { type: "parts", file: "Boat.jpg", icon: "jpg", ask: "name" },
        { type: "parts", file: "Song.mp3", icon: "mp3", ask: "dot" },
        { type: "parts", file: "Homework.pdf", icon: "pdf", ask: "ext" },
        { type: "parts", file: "Codes.txt", icon: "txt", ask: "name" },
        { type: "parts", file: "Trip.mp4", icon: "mp4", ask: "ext" },
        { type: "parts", file: "Lesson 1.pptx", icon: "pptx", ask: "name" },
      ],
    },
    {
      k: "size",
      t: "Big or small?",
      en: "Which file is bigger?",
      ic: "⚖️",
      items: [
        {
          type: "mc",
          q: "Which file is [bigger]?",
          opts: ["School trip.mp4 · 48 MB", "Codes.txt · 2 KB"],
          oi: ["mp4", "txt"],
          two: true,
        },
        {
          type: "mc",
          q: "Which file is [bigger]?",
          opts: ["Boat.jpg · 2 MB", "Lesson 1.docx · 13 KB"],
          oi: ["jpg", "docx"],
          two: true,
        },
        {
          type: "mc",
          q: "Which file is [smaller]?",
          opts: ["Codes.txt · 2 KB", "Song.mp3 · 4 MB"],
          oi: ["txt", "mp3"],
          two: true,
        },
        {
          type: "mc",
          q: "Which is [more]?",
          opts: ["1 MB", "1 KB"],
          two: true,
          say: ["1 megabyte", "1 kilobyte"],
        },
        {
          type: "mc",
          q: "1 KB = ___ bytes",
          opts: ["1,024", "101", "10"],
          say: ["one thousand and twenty-four", "one hundred and one", "ten"],
        },
        {
          type: "mc",
          q: "A [video] or a [text]: which is usually bigger?",
          opts: ["Video", "Text"],
          oi: ["mp4", "txt"],
          two: true,
        },
      ],
    },
    {
      k: "which",
      t: "Shortcut or file?",
      en: "Find the shortcut",
      ic: "↗️",
      items: [
        {
          type: "mc",
          q: "Which one is a [shortcut]?",
          opts: ["Grammar.docx - Shortcut", "Grammar.docx"],
          oi: ["docx*", "docx"],
          two: true,
        },
        {
          type: "mc",
          q: "Which one is a [shortcut]?",
          opts: ["Boat.jpg - Shortcut", "Boat.jpg"],
          oi: ["jpg*", "jpg"],
          two: true,
        },
        {
          type: "mc",
          q: "Which one is the [real file]?",
          opts: ["Song.mp3", "Song.mp3 - Shortcut"],
          oi: ["mp3", "mp3*"],
          two: true,
        },
        {
          type: "mc",
          q: "Which one is a [shortcut]?",
          opts: ["Game - Shortcut", "Game"],
          oi: ["app*", "app"],
          two: true,
        },
      ],
    },
  ],

  // ✏️ School exercises
  exercises: [
    {
      k: "tf",
      t: "True or False",
      en: "Book · Hands on 1.1–1.6",
      ic: "✅",
      from: "Book · Hands on! 1.1–1.6",
      items: [
        {
          type: "tf",
          q: "A file's size is measured in bytes. 1 KB = 1,024 bytes.",
          a: true,
          vis: { kind: "lines", rows: ["1 KB = 1,024 bytes"] },
        },
        {
          type: "tf",
          q: "You can use the Search button on the taskbar to find files and folders.",
          a: true,
          img: "search-taskbar",
        },
        {
          type: "tf",
          q: "A shortcut is a link to a folder, file, or program. It helps you open it quickly.",
          a: true,
          vis: {
            kind: "icons",
            items: [{ type: "docx", sc: true, label: "Shortcut" }],
          },
        },
        {
          type: "tf",
          q: "You can create a shortcut by dragging the file or program to the desktop.",
          a: true,
          img: "move-shortcut",
        },
        {
          type: "tf",
          q: "Moving a shortcut also moves the original file.",
          a: false,
          x: "Only the shortcut moves. The file stays in its folder.",
        },
        {
          type: "tf",
          q: "Deleting a shortcut also deletes the original file.",
          a: false,
          x: "Only the shortcut is deleted. The file stays.",
        },
      ],
    },
    {
      k: "words",
      t: "Choose the word",
      en: "Book · Hands on 2.1–2.6",
      ic: "🔤",
      from: "Book · Hands on! 2.1–2.6",
      items: [
        {
          type: "mc",
          q: "Each type of file has a specific ___ that helps you know what kind of file it is.",
          opts: ["icon", "name", "size"],
          vis: {
            kind: "icons",
            items: [{ type: "jpg" }, { type: "mp3" }, { type: "docx" }],
          },
        },
        {
          type: "mc",
          q: "To search for a file or folder, click the ___ button on the taskbar.",
          opts: ["Search", "Start", "Delete"],
          img: "search-taskbar",
        },
        {
          type: "mc",
          q: "A ___ is a link that lets you open a file or program quickly.",
          opts: ["shortcut", "folder", "extension"],
          vis: { kind: "icons", items: [{ type: "docx", sc: true }] },
        },
        {
          type: "mc",
          q: "To create a shortcut, right-click the file, select ___, and click Create shortcut.",
          opts: ["Show more options", "Rename", "Open"],
          img: "create-shortcut",
        },
        {
          type: "mc",
          q: "To move a shortcut to your desktop, click and ___ it to the desktop.",
          opts: ["drag", "delete", "type"],
          img: "move-shortcut",
        },
        {
          type: "mc",
          q: "To open the Show more options menu, you need to ___ on the file or program.",
          opts: ["right-click", "double-click", "type"],
        },
      ],
    },
    {
      k: "think",
      t: "Think and answer",
      en: "Book · Hands on 3 · notebook",
      ic: "💭",
      from: "Book · Hands on! 3 · Notebook question",
      items: [
        {
          type: "open",
          q: "Why does deleting a shortcut not delete the original file?",
          a: "A shortcut is only a [link]. The real file stays in its [folder].",
          vis: {
            kind: "flow",
            rows: [
              {
                from: "🗑️",
                type: "docx",
                sc: true,
                label: "Shortcut",
                x: true,
              },
              { from: "✅", type: "docx", label: "File" },
            ],
          },
        },
        {
          type: "open",
          q: "How can folders for shortcuts keep your desktop tidy?",
          a: "The desktop is [clean]. You [find] things faster.",
          img: "desktop-shortcut",
        },
      ],
    },
    {
      k: "handson",
      t: "Do it on the computer",
      en: "Book · Hands on 4",
      ic: "🖥️",
      from: "Book · Hands on! 4",
      items: [
        {
          type: "sim",
          q: "Work with folders and shortcuts.",
          start: { files: [{ name: "Sun.jpg", in: "Desktop", kb: 1300 }] },
          steps: [
            { act: "click", t: "task-explorer", say: "Open [File Explorer]." },
            {
              act: "click",
              t: "nav:Pictures",
              say: "Open the [Pictures] folder.",
            },
            {
              act: "drag",
              t: "desk:Sun.jpg",
              to: "exp-main",
              say: "Drag [Sun.jpg] from the desktop into Pictures.",
            },
            { act: "right", t: "file:Sun.jpg", say: "Right-click [Sun.jpg]." },
            { act: "click", t: "menu:more", say: "Click [Show more options]." },
            {
              act: "click",
              t: "menu:create-shortcut",
              say: "Click [Create shortcut].",
            },
            {
              act: "right",
              t: "file:Sun.jpg - Shortcut",
              say: "Right-click the [shortcut].",
            },
            { act: "click", t: "mi:delete", say: "Click [Delete] 🗑." },
            {
              act: "look",
              t: "file:Sun.jpg",
              say: "Can you still find the picture? [Yes]!",
            },
          ],
        },
      ],
    },
    {
      k: "cw1",
      t: "Class work 1",
      en: "CW1 · Choose",
      ic: "📝",
      from: "CW1 for Term 1 · U1 L1",
      items: [
        {
          type: "mc",
          q: "A file's size is measured in ___",
          opts: ["bytes", "CM", "KM"],
        },
        {
          type: "tf",
          q: "All the files have the same icon.",
          a: false,
          yes: ["Yes", "No"],
          vis: {
            kind: "icons",
            items: [
              { type: "jpg" },
              { type: "mp3" },
              { type: "docx" },
              { type: "pdf" },
            ],
          },
        },
        {
          type: "mc",
          q: "To look for a file, you should use the ___ box.",
          opts: ["Search", "Menu"],
          oh: [{ kind: "searchbox" }, { kind: "ribbon" }],
          two: true,
          say: ["Search box", "Home, Insert, Design"],
        },
        {
          type: "mc",
          q: "Which type of file is created when you write a story?",
          opts: ["Word file", "Sound file"],
          oi: ["docx", "mp3"],
          two: true,
        },
        {
          type: "mc",
          q: "A file extension tells the ___",
          opts: ["file's type", "file's icon"],
          vis: { kind: "nameext", name: "Grammar", ext: "docx", type: "docx" },
        },
        {
          type: "mc",
          q: "One kilobyte (KB) equals ___ bytes.",
          opts: ["1,024", "101"],
          two: true,
        },
        {
          type: "mc",
          q: "There is always a ___ between the name and the extension.",
          opts: ["dot", "slash", "dash"],
          say: ["dot", "slash", "dash"],
          vis: {
            kind: "nameext",
            name: "Grammar",
            ext: "docx",
            type: "docx",
            hideDot: true,
          },
        },
        {
          type: "mc",
          q: "What is the file [name]?",
          opts: ["Lesson 1-My desktop", "9,610 KB", ".ppt"],
          vis: {
            kind: "filerow",
            type: "pptx",
            name: "Lesson 1-My desktop",
            size: "9,610 KB",
          },
        },
        {
          type: "mc",
          q: "What is the file [extension]?",
          opts: [".ppt", ".docx", "KB"],
          vis: {
            kind: "filerow",
            type: "pptx",
            name: "Lesson 1-My desktop",
            size: "9,610 KB",
          },
          x: "It is a PowerPoint file: .ppt",
        },
        {
          type: "mc",
          q: "What is the file [size]?",
          opts: ["9,610 KB", "Lesson 1", ".ppt"],
          vis: {
            kind: "filerow",
            type: "pptx",
            name: "Lesson 1-My desktop",
            size: "9,610 KB",
          },
        },
      ],
    },
    {
      k: "hw1",
      t: "Homework 1",
      en: "HW1 · Lesson 1 part",
      ic: "🏠",
      from: "HW1 for Term 1 · U1 L1 & 2",
      items: [
        {
          type: "mc",
          q: "The file extension of a saved document is ___",
          opts: [".docx", ".xlsx", ".pdf"],
          oi: ["docx", "xlsx", "pdf"],
        },
        {
          type: "mc",
          q: "You have ___ ways to search for a file.",
          opts: ["many", "one"],
          two: true,
        },
        {
          type: "mc",
          q: "You can create a shortcut by ___ the file to the desktop.",
          opts: ["dragging", "copying", "clicking"],
        },
        {
          type: "mc",
          q: "Which one of these is a [shortcut]?",
          opts: ["With the arrow", "Without the arrow"],
          oi: ["app*", "app"],
          two: true,
        },
        {
          type: "tf",
          q: "You cannot transfer a picture from your phone to the computer.",
          a: false,
          yes: ["Yes", "No"],
          img: "transfer",
        },
        {
          type: "mc",
          q: "To search for a file, click the ___ button on the taskbar.",
          opts: ["Search", "shortcut", "Show more options"],
        },
        {
          type: "mc",
          q: "A ___ is a link that lets you open a file quickly.",
          opts: ["shortcut", "Search", "Show more options"],
        },
        {
          type: "mc",
          q: "You should select ___ to create a shortcut.",
          opts: ["Show more options", "Search", "shortcut"],
        },
      ],
    },
  ],
};
