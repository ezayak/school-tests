// Computer · Grade 4 · Chapter 2 · Unit 2 · Lesson 2 « Images and graphics » (book pages 68–79).
// All the content of the lesson. The how-to's are done in Mini Word (shared/wordsim.js). Same format as lesson-1.js.
(function () {
  const PIC = { doc: "animalsPic" }; // the elephant is paragraph 4
  const CLICK_PIC = {
    act: "click",
    t: "obj:4",
    say: "Click the [picture] of the elephant.",
  };
  const PF = {
    act: "click",
    t: "tab:Picture Format",
    say: "Click the [Picture Format] tab.",
  };
  window.LESSON = {
    n: 2,
    grade: 4,
    title: "Images and graphics",
    unit: "Unit 2 · Lesson 2",
    book: "Book pages 68–79",
    cover: "picture-styles",
    question: {
      q: "How can [borders] or [effects] make pictures better? How do [shapes] and [diagrams] help to share ideas?",
      a: "Pictures [show] what the words say. [SmartArt] and [shapes] make ideas [clear] and easy to understand.",
      img: "boy-glasses",
    },
    words: [
      {
        w: "Picture Format",
        m: "the tab that changes a picture: colour, style, border, position, size",
      },
      { w: "Remove Background", m: "keeps only the main subject of a picture" },
      { w: "Crop", m: "cuts away the parts of a picture you don't want" },
      { w: "Wrap Text", m: "how the text goes around a picture" },
      {
        w: "SmartArt",
        m: "a diagram that shows ideas in order, in levels or in a cycle",
      },
      {
        w: "Shapes",
        m: "stars, arrows, circles, banners to add to a document",
      },
    ],

    ideas: [
      {
        t: "Pictures in a document",
        lines: [
          "A picture [shows] what you describe in words.",
          "[Insert] tab › [Pictures] › [This Device]: a picture from your computer.",
        ],
        img: "elephant-oval",
        howto: "insert",
      },
      {
        t: "The Picture Format tab",
        lines: [
          "[Click the picture]: the [Picture Format] tab appears.",
          "Change the size, shape, colour and position of the picture.",
        ],
        img: "picture-format",
        howto: "removebg",
      },
      {
        t: "Remove Background",
        lines: [
          "It removes the background of the picture.",
          "It keeps only the [main subject], like the parrot.",
        ],
        img: "picture-styles",
        howto: "removebg",
      },
      {
        t: "Color and Artistic Effects",
        lines: [
          "Play with the [colour] and the [brightness].",
          "There are hundreds of combinations!",
        ],
        vis: {
          kind: "icons",
          items: [
            { type: "piccolor", label: "Color" },
            { type: "artistic", label: "Artistic Effects" },
          ],
        },
        howto: "color",
      },
      {
        t: "Picture Styles",
        lines: [
          "A new [outline] or a [shadow] in one click.",
          "Try them all! This elephant has the [Metal Oval] style.",
        ],
        img: "elephant-oval",
        howto: "style",
      },
      {
        t: "Picture Border and Picture Effects",
        lines: [
          "[Picture Border]: the colour, width or style of the edge.",
          "[Picture Effects]: shadow, glow, reflection or 3-D.",
        ],
        img: "arrange",
        howto: "border",
      },
      {
        t: "Position",
        lines: [
          "Choose [where] the picture is on the page.",
          "Try all the options to see how the picture and the text fit together.",
        ],
        img: "arrange",
        howto: "position",
      },
      {
        t: "Wrap Text",
        lines: [
          "How the [text goes around] the picture.",
          "[In Line with Text] · [Square] · [Tight] · [Top and Bottom] · [Behind Text] · [In Front of Text]",
        ],
        img: "wrap-text",
        howto: "wrap",
      },
      {
        t: "Crop",
        lines: [
          "Keep only the [part you want].",
          "Click [Crop], move the black handles, press [Enter].",
        ],
        vis: { kind: "icons", items: [{ type: "crop", label: "Crop" }] },
        howto: "crop",
      },
      {
        t: "SmartArt: a pyramid",
        lines: [
          "[SmartArt] makes a clear diagram.",
          "A [pyramid] shows levels from [top to bottom], like the people in a school.",
        ],
        img: "pyramid",
        tip: {
          img: "boy-glasses",
          say: "Every SmartArt has its own meaning. Choose the one that best shows what you want to explain.",
        },
        howto: "pyramid",
      },
      {
        t: "Change the colours",
        lines: [
          "Click the SmartArt › [SmartArt Design] tab › [Change Colors].",
          "For example, [Colorful - Accent Colors].",
        ],
        img: "pyramid-colors",
        howto: "colors",
      },
      {
        t: "SmartArt: a cycle",
        lines: [
          "A [cycle] shows the [stages] of a process that goes round and round.",
          "For example, the [water cycle].",
        ],
        img: "text-cycle",
        howto: "cycle",
      },
      {
        t: "Shapes",
        lines: [
          "Flags, arrows, circles, stars and more.",
          "[Insert] › [Shapes] › choose one › [drag] it on the page.",
          "You can change the size, colour and font of the text in a shape.",
        ],
        img: "shapes",
        howto: "shape",
      },
    ],

    howto: [
      {
        k: "insert",
        t: "Insert a picture",
        code: "Do you remember?",
        ic: "🖼️",
        img: "elephant-oval",
        start: { doc: "animals" },
        steps: [
          {
            act: "click",
            t: "w:3:83",
            say: "Click after [blossomed.]",
          },
          { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
          { act: "click", t: "ins:pictures", say: "Click [Pictures]." },
          { act: "click", t: "pics:device", say: "Click [This Device]." },
          {
            act: "click",
            t: "ip:elephant",
            say: "Click the picture [Elephant.jpg].",
          },
          { act: "click", t: "ip:insert", say: "Click [Insert]." },
        ],
      },
      {
        k: "removebg",
        t: "Remove the background",
        code: "2.2.1",
        ic: "✂️",
        img: "picture-styles",
        start: { doc: "parrot" },
        steps: [
          {
            act: "click",
            t: "obj:1",
            say: "Click the [picture] of the parrot.",
          },
          PF,
          {
            act: "click",
            t: "pf:removebg",
            say: "Click [Remove Background].",
          },
        ],
      },
      {
        k: "color",
        t: "Change the colours",
        code: "2.2.1",
        ic: "🎨",
        img: "picture-format",
        start: { doc: "parrot" },
        steps: [
          {
            act: "click",
            t: "obj:1",
            say: "Click the [picture] of the parrot.",
          },
          PF,
          { act: "click", t: "pf:color", say: "Click [Color]." },
          { act: "click", t: "pcol:sepia", say: "Click [Sepia]." },
          {
            act: "click",
            t: "pf:artistic",
            say: "Click [Artistic Effects].",
          },
          {
            act: "click",
            t: "part:pencil",
            say: "Click [Pencil Sketch].",
          },
        ],
      },
      {
        k: "style",
        t: "Choose a picture style",
        code: "2.2.1",
        ic: "🖼",
        img: "elephant-oval",
        start: PIC,
        steps: [
          CLICK_PIC,
          PF,
          {
            act: "click",
            t: "pstyle:5",
            say: "In [Picture Styles], click [Metal Oval].",
          },
        ],
      },
      {
        k: "border",
        t: "Border and effects",
        code: "2.2.2",
        ic: "✨",
        img: "arrange",
        start: PIC,
        steps: [
          CLICK_PIC,
          PF,
          { act: "click", t: "pf:border", say: "Click [Picture Border]." },
          { act: "click", t: "pbd:blue", say: "Click [blue]." },
          { act: "click", t: "pf:effects", say: "Click [Picture Effects]." },
          { act: "click", t: "peff:shadow", say: "Click [Shadow]." },
        ],
      },
      {
        k: "position",
        t: "Change the position",
        code: "2.2.2",
        ic: "📍",
        img: "arrange",
        start: PIC,
        steps: [
          CLICK_PIC,
          PF,
          { act: "click", t: "pf:position", say: "Click [Position]." },
          {
            act: "click",
            t: "ppos:tr",
            say: "Click [Top Right]: the picture goes to the top, on the right.",
          },
        ],
      },
      {
        k: "wrap",
        t: "Wrap the text",
        code: "2.2.3",
        ic: "🔁",
        img: "wrap-text",
        start: PIC,
        steps: [
          CLICK_PIC,
          PF,
          { act: "click", t: "pf:wrap", say: "Click [Wrap Text]." },
          {
            act: "click",
            t: "pwrap:square",
            say: "Click [Square]: the text goes around the picture.",
          },
        ],
      },
      {
        k: "crop",
        t: "Crop a picture",
        code: "2.2.2",
        ic: "⛶",
        img: "arrange",
        start: PIC,
        steps: [
          CLICK_PIC,
          PF,
          { act: "click", t: "pf:crop", say: "Click [Crop]." },
          {
            act: "click",
            t: "crop-h",
            say: "Move the black [handle] to keep only the elephant.",
          },
          {
            act: "key",
            t: "key:Enter",
            key: "Enter",
            say: "Press [Enter].",
          },
        ],
      },
      {
        k: "pyramid",
        t: "Insert a SmartArt pyramid",
        code: "2.2.4",
        ic: "🔺",
        img: "pyramid",
        start: { doc: "school" },
        steps: [
          { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
          { act: "click", t: "ins:smartart", say: "Click [SmartArt]." },
          { act: "click", t: "sacat:Pyramid", say: "Click [Pyramid]." },
          {
            act: "click",
            t: "sal:basic-pyramid",
            say: "Click the [Basic Pyramid].",
          },
          { act: "click", t: "sad:ok", say: "Click [OK]." },
          {
            act: "type",
            t: "sat:0",
            text: "Principal",
            say: "Type [Principal] in the first box.",
          },
          {
            act: "type",
            t: "sat:1",
            text: "Teachers",
            say: "Type [Teachers] in the second box.",
          },
          {
            act: "type",
            t: "sat:2",
            text: "Students",
            say: "Type [Students] in the third box.",
          },
        ],
      },
      {
        k: "colors",
        t: "Change the SmartArt colours",
        code: "2.2.5",
        ic: "🌈",
        img: "pyramid-colors",
        start: { doc: "schoolPyr" },
        steps: [
          { act: "click", t: "obj:2", say: "Click the [pyramid]." },
          {
            act: "click",
            t: "tab:SmartArt Design",
            say: "Click the [SmartArt Design] tab.",
          },
          {
            act: "click",
            t: "sad:colors",
            say: "Click [Change Colors].",
          },
          {
            act: "click",
            t: "sacol:1",
            say: "Click [Colorful - Accent Colors].",
          },
        ],
      },
      {
        k: "cycle",
        t: "Insert a SmartArt cycle",
        code: "2.2.6",
        ic: "🔄",
        img: "text-cycle",
        start: { doc: "water" },
        steps: [
          { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
          { act: "click", t: "ins:smartart", say: "Click [SmartArt]." },
          { act: "click", t: "sacat:Cycle", say: "Click [Cycle]." },
          {
            act: "click",
            t: "sal:text-cycle",
            say: "Click [Text Cycle].",
          },
          { act: "click", t: "sad:ok", say: "Click [OK]." },
          {
            act: "click",
            t: "sabox:4",
            say: "We need only 4 stages. Click the last [Text] box.",
          },
          {
            act: "key",
            t: "key:Delete",
            key: "Delete",
            say: "Press [Delete].",
          },
          {
            act: "type",
            t: "sat:0",
            text: "Evaporation",
            say: "Type [Evaporation].",
          },
          {
            act: "type",
            t: "sat:1",
            text: "Condensation",
            say: "Type [Condensation].",
          },
          {
            act: "type",
            t: "sat:2",
            text: "Precipitation",
            say: "Type [Precipitation].",
          },
          {
            act: "type",
            t: "sat:3",
            text: "Collection",
            say: "Type [Collection].",
          },
        ],
      },
      {
        k: "shape",
        t: "Insert a shape",
        code: "2.2.7",
        ic: "⭐",
        img: "shapes",
        start: { doc: "facts" },
        steps: [
          { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
          { act: "click", t: "ins:shapes", say: "Click [Shapes]." },
          {
            act: "click",
            t: "shp:explosion",
            say: "In [Stars and Banners], click the first one.",
          },
          {
            act: "click",
            t: "page",
            say: "Drag on the [page] to draw the shape.",
          },
          {
            act: "click",
            t: "shs:1",
            say: "In [Shape Styles], click the [orange] style.",
          },
        ],
      },
    ],

    games: [
      {
        k: "button",
        t: "Which button?",
        en: "Picture Format buttons",
        ic: "🔘",
        items: [
          {
            type: "mc",
            q: "Keep only the [parrot], without the trees.",
            opts: ["Remove Background", "Crop", "Picture Effects"],
            oi: ["removebg", "crop", "piceffects"],
          },
          {
            type: "mc",
            q: "Cut away the [edges] of the picture.",
            opts: ["Crop", "Wrap Text", "Picture Border"],
            oi: ["crop", "wraptext", "picborder"],
          },
          {
            type: "mc",
            q: "Put the text [around] the picture.",
            opts: ["Wrap Text", "Position", "Color"],
            oi: ["wraptext", "position", "piccolor"],
          },
          {
            type: "mc",
            q: "Give the picture a [shadow] or a [glow].",
            opts: ["Picture Effects", "Picture Border", "Crop"],
            oi: ["piceffects", "picborder", "crop"],
          },
          {
            type: "mc",
            q: "Put a [blue line] around the picture.",
            opts: ["Picture Border", "Picture Effects", "Remove Background"],
            oi: ["picborder", "piceffects", "removebg"],
          },
          {
            type: "mc",
            q: "Make a [diagram] of ideas.",
            opts: ["SmartArt", "Shapes", "Pictures"],
            oi: ["smartart", "shapes", "picture"],
          },
          {
            type: "mc",
            q: "Add a [star] or an [arrow].",
            opts: ["Shapes", "SmartArt", "Pictures"],
            oi: ["shapes", "smartart", "picture"],
          },
        ],
      },
      {
        k: "smartart",
        t: "Which SmartArt?",
        en: "Pyramid or cycle",
        ic: "🔺",
        items: [
          {
            type: "mc",
            q: "Show the [levels] in a school: principal, teachers, students.",
            vis: { kind: "emoji", e: "👩‍💼 ➡ 👩‍🏫 ➡ 🧒" },
            opts: ["Pyramid", "Cycle"],
            icons: ["🔺", "🔄"],
          },
          {
            type: "mc",
            q: "Show the [water cycle]: evaporation, condensation, precipitation, collection.",
            vis: { kind: "emoji", e: "☀️ 💧 ☁️ 🌧️" },
            opts: ["Cycle", "Pyramid"],
            icons: ["🔄", "🔺"],
          },
          {
            type: "mc",
            q: "Show how a [butterfly] grows: egg, caterpillar, chrysalis, butterfly, egg again.",
            vis: { kind: "emoji", e: "🥚 🐛 🦋" },
            opts: ["Cycle", "Pyramid"],
            icons: ["🔄", "🔺"],
          },
          {
            type: "mc",
            q: "Show a [team]: the captain on top, then the players.",
            vis: { kind: "emoji", e: "🧢 ⚽ 👟" },
            opts: ["Pyramid", "Cycle"],
            icons: ["🔺", "🔄"],
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Word",
        en: "Pictures, SmartArt, shapes",
        ic: "📝",
        items: [
          {
            type: "sim",
            q: "Keep only the [parrot].",
            start: { doc: "parrot", obj: 1, tab: "Picture Format" },
            steps: [
              {
                act: "click",
                t: "pf:removebg",
                say: "The picture is selected. Click [Remove Background].",
              },
            ],
          },
          {
            type: "sim",
            q: "Make the picture [gray].",
            start: { doc: "parrot", obj: 1, tab: "Picture Format" },
            steps: [
              { act: "click", t: "pf:color", say: "Click [Color]." },
              { act: "click", t: "pcol:gray", say: "Click [Grayscale]." },
            ],
          },
          {
            type: "sim",
            q: "Put the text [around] the elephant, on the [left] of it.",
            start: { doc: "animalsPic", obj: 4, tab: "Picture Format" },
            steps: [
              { act: "click", t: "pf:position", say: "Click [Position]." },
              { act: "click", t: "ppos:mr", say: "Click [Middle Right]." },
            ],
          },
          {
            type: "sim",
            q: "Give the elephant a [rounded] style.",
            start: { doc: "animalsPic", obj: 4, tab: "Picture Format" },
            steps: [
              {
                act: "click",
                t: "pstyle:3",
                say: "In [Picture Styles], click [Rounded Diagonal Corner].",
              },
            ],
          },
          {
            type: "sim",
            q: "Add a [star] to the fun facts.",
            start: { doc: "facts" },
            steps: [
              { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
              { act: "click", t: "ins:shapes", say: "Click [Shapes]." },
              {
                act: "click",
                t: "shp:star5",
                say: "Click the star [Star: 5 Points].",
              },
              {
                act: "click",
                t: "page",
                say: "Drag on the [page] to draw it.",
              },
            ],
          },
          {
            type: "sim",
            q: "Make the pyramid [colourful].",
            start: { doc: "schoolPyr", obj: 2, tab: "SmartArt Design" },
            steps: [
              {
                act: "click",
                t: "sad:colors",
                say: "Click [Change Colors].",
              },
              {
                act: "click",
                t: "sacol:1",
                say: "Click [Colorful - Accent Colors].",
              },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Picture facts",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "The Picture Format tab appears when you click a picture.",
            a: true,
            img: "picture-format",
          },
          {
            type: "tf",
            q: "A cycle shows levels from top to bottom.",
            a: false,
            x: "A [pyramid] shows levels. A [cycle] shows stages that go round.",
            img: "text-cycle",
          },
          {
            type: "tf",
            q: '"Behind Text" puts the picture behind the words.',
            a: true,
            img: "wrap-text",
          },
          {
            type: "tf",
            q: "Remove Background deletes the whole picture.",
            a: false,
            x: "It keeps the [main subject].",
            img: "picture-styles",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "insert" },
          { type: "order", howto: "pyramid" },
          { type: "order", howto: "shape" },
        ],
      },
    ],

    exercises: [
      {
        k: "buttons",
        t: "What does this button do?",
        en: "Book · Hands on 1.1–1.4",
        ic: "🔘",
        from: "Book · Hands on! 1.1–1.4",
        items: [
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "removebg",
            opts: [
              "Keeps only the main subject of an image and deletes the background",
              "Allows you to position an image on the page and choose how text flows around it",
              "Cuts unwanted areas from an image",
              "Adds special visual effects like shadow, glow, or 3D to the image",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "piceffects",
            opts: [
              "Adds special visual effects like shadow, glow, or 3D to the image",
              "Allows you to position an image on the page and choose how text flows around it",
              "Cuts unwanted areas from an image",
              "Keeps only the main subject of an image and deletes the background",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "wraptext",
            opts: [
              "Allows you to position an image on the page and choose how text flows around it",
              "Cuts unwanted areas from an image",
              "Adds special visual effects like shadow, glow, or 3D to the image",
              "Keeps only the main subject of an image and deletes the background",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "crop",
            opts: [
              "Cuts unwanted areas from an image",
              "Allows you to position an image on the page and choose how text flows around it",
              "Adds special visual effects like shadow, glow, or 3D to the image",
              "Keeps only the main subject of an image and deletes the background",
            ],
          },
        ],
      },
      {
        k: "fill",
        t: "Complete the sentence",
        en: "Book · Hands on 2.1–2.5",
        ic: "✏️",
        from: "Book · Hands on! 2.1–2.5",
        items: [
          {
            type: "mc",
            q: "To change how a picture looks by adding styles, colors, or borders, use the ___ tab.",
            opts: ["Picture Format", "Home", "Insert", "View"],
            img: "picture-format",
          },
          {
            type: "mc",
            q: "To place a picture in a specific spot on the page, use the ___ option.",
            opts: ["Position", "Crop", "Color"],
            img: "arrange",
          },
          {
            type: "mc",
            q: "If you want to change the color, width, or style of a picture's edges, use the ___ feature.",
            opts: ["Picture Border", "Picture Effects", "Remove Background"],
            icon: "picborder",
          },
          {
            type: "mc",
            q: "The ___ SmartArt shows relationships from top to bottom in an organized way.",
            opts: ["Pyramid", "Cycle", "List"],
            img: "pyramid",
          },
          {
            type: "mc",
            q: "The ___ SmartArt shows the different stages of a process.",
            opts: ["Cycle", "Pyramid", "Matrix"],
            img: "text-cycle",
          },
        ],
      },
      {
        k: "handson",
        t: "True or false",
        en: "Book · Hands on 3.1–3.5",
        ic: "⚖️",
        from: "Book · Hands on! 3.1–3.5",
        items: [
          {
            type: "tf",
            q: 'The "Crop" tool allows you to adjust the brightness and color of a picture.',
            a: false,
            x: "Crop [cuts away] parts of the picture. [Color] changes the colour.",
            icon: "crop",
          },
          {
            type: "tf",
            q: 'Using the "Wrap Text" option, you can control how text surrounds a picture.',
            a: true,
            img: "wrap-text",
          },
          {
            type: "tf",
            q: 'The "Remove Background" tool takes away parts of an image, so only the main subject is shown.',
            a: true,
            img: "picture-styles",
          },
          {
            type: "tf",
            q: 'The "Picture Border" option lets you add a shadow or glow effect to a picture.',
            a: false,
            x: "Shadow and glow are in [Picture Effects]. Picture Border changes the [edge].",
            icon: "picborder",
          },
          {
            type: "tf",
            q: "Shapes cannot contain text.",
            a: false,
            x: "You [can] type text in a shape and change its size, colour and font.",
            img: "shapes",
          },
        ],
      },
      {
        k: "sports",
        t: "The sports page",
        en: "Book · Hands on 4 and 5",
        ic: "🏓",
        from: "Book · Hands on! 4–5",
        items: [
          {
            type: "sim",
            q: "Add the [ping-pong] picture after Nukia's paragraph.",
            img: "sports",
            start: { doc: "sports", caret: [4, 43] },
            steps: [
              {
                act: "click",
                t: "tab:Insert",
                say: "The cursor is after [paddles.] Click the [Insert] tab.",
              },
              { act: "click", t: "ins:pictures", say: "Click [Pictures]." },
              { act: "click", t: "pics:device", say: "Click [This Device]." },
              {
                act: "click",
                t: "ip:pingpong",
                say: "Click [Ping-pong.jpg].",
              },
              { act: "click", t: "ip:insert", say: "Click [Insert]." },
              { act: "click", t: "pf:wrap", say: "Click [Wrap Text]." },
              { act: "click", t: "pwrap:square", say: "Click [Square]." },
            ],
          },
          {
            type: "sim",
            q: "Make the question stand out: a [border] around it and [gold] shading.",
            start: { doc: "sports", sel: "para:0" },
            steps: [
              {
                act: "click",
                t: "borders-arrow",
                say: "Click the small arrow next to [Borders].",
              },
              {
                act: "click",
                t: "border:outside",
                say: "Click [Outside Borders].",
              },
              {
                act: "click",
                t: "shade-arrow",
                say: "Click the small arrow next to [Shading].",
              },
              { act: "click", t: "shade:4", say: "Click the [gold] colour." },
            ],
          },
          {
            type: "open",
            q: "Make a SmartArt in Word about the most popular sports in China, Russia and Australia. What do you write in it?",
            a: "[China]: Ping-pong, a table with a net. [Russia]: Ice hockey, in a rink. [Australia]: Cricket, two teams of eleven players.",
            img: "sports-smartart",
          },
        ],
      },
      {
        k: "animal",
        t: "My favourite animal",
        en: "Book · Hands on 6",
        ic: "🐘",
        from: "Book · Hands on! 6",
        items: [
          {
            type: "sim",
            q: "Insert a picture of your animal and give it a [border].",
            start: { doc: "facts", caret: [1, 8] },
            steps: [
              { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
              { act: "click", t: "ins:pictures", say: "Click [Pictures]." },
              { act: "click", t: "pics:device", say: "Click [This Device]." },
              {
                act: "click",
                t: "ip:elephant",
                say: "Click [Elephant.jpg].",
              },
              { act: "click", t: "ip:insert", say: "Click [Insert]." },
              { act: "click", t: "pf:border", say: "Click [Picture Border]." },
              { act: "click", t: "pbd:green", say: "Click [green]." },
            ],
          },
          {
            type: "open",
            q: "Why are these three things important for your animal to survive: food, water and shelter?",
            a: "[Food] gives it energy, [water] keeps it alive, and a [shelter] keeps it safe from the weather and from danger.",
            vis: { kind: "emoji", e: "🐘 🌿 💧 🏠" },
          },
          {
            type: "open",
            q: "How does your SmartArt make the information easier to understand?",
            a: "The ideas are in [boxes] with [colours] and in [order], so you understand them [at a glance].",
            img: "pyramid-colors",
          },
        ],
      },
    ],
  };
})();
