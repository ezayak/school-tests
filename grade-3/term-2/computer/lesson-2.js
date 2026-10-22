// Computer · Grade 3 · Term 2 · Unit 2 · Lesson 2 « Working with text » (book pages 36–37 and 44–51).
// All the content of the lesson. The how-to's are done in Mini Word (wordsim.js); words are "w:<paragraph>:<word>"
// in the book's text (start doc "robots": 0 Robots! · 1 Robots are all around us … · 2 There are robots … · 3 When I go …).
(function () {
  const R = { doc: "robots" };
  const SEL_TITLE = {
    act: "select",
    t: "w:0:0",
    say: "Select the word [Robots!].",
  };
  window.LESSON = {
    n: 2,
    grade: 3,
    title: "Working with text",
    unit: "Unit 2 · Lesson 2",
    book: "Book pages 36–37, 44–51",
    cover: "highlighted",
    question: {
      q: "What program can you use to write an article about robots? Does [formatting] make it more interesting?",
      a: "[Microsoft Word]. Bold, colours and highlight make the text [interesting] and [easy to read].",
      img: "typing",
    },

    ideas: [
      {
        t: "Microsoft Word",
        lines: [
          "[Word] is a program to [write] and [format] text.",
          "Formatting makes text more interesting and easier to understand.",
        ],
        img: "typing",
      },
      {
        t: "Select first!",
        lines: [
          "First [select] the text: drag over it.",
          "Then press the button.",
        ],
        img: "select-text",
        tip: {
          img: "boy-select",
          say: "Remember to [select] the text before you format it.",
        },
        howto: "bui",
      },
      {
        t: "Font, size and colour",
        lines: [
          "Home tab › Font group:",
          "[Font] list = the kind of letters. [Font Size] = how big.",
          "[Font Color] = the colour of the letters.",
        ],
        vis: { kind: "emoji", e: "🔤 🔠 🎨" },
        howto: "font",
      },
      {
        t: "Bold, Italic, Underline",
        lines: [
          "[B] Bold = thick letters.",
          "[I] Italic = sloping letters.",
          "[U] Underline = a line under the words.",
        ],
        img: "underline",
        howto: "bui",
      },
      {
        t: "Highlight",
        lines: [
          "[Text Highlight Color] colours behind the words, like a marker pen.",
          "Click the arrow, choose [Yellow], then select the text.",
          "[Stop Highlighting] switches it off.",
        ],
        img: "highlighted",
        howto: "highlight",
      },
      {
        t: "Find a word",
        lines: [
          "Home tab › Editing › [Find].",
          "Or press [Ctrl] + [F].",
          "Type the word: it is [highlighted] everywhere in the text.",
        ],
        img: "find",
        tip: {
          img: "boy-tip",
          say: "You can also press [Ctrl] + [F] to use Find.",
        },
        howto: "find",
      },
      {
        t: "Undo",
        lines: [
          "Changed your mind? Click [Undo] or press [Ctrl] + [Z].",
          "Some things can't be undone, like [saving] a file.",
        ],
        img: "undo",
        howto: "undo",
      },
      {
        t: "Zoom in and out",
        lines: [
          "The [zoom slider] is on the status bar at the bottom.",
          "Drag it right: [bigger]. Drag it left: [smaller].",
          "The real font size does [not] change.",
        ],
        img: "zoom",
        howto: "zoom",
      },
      {
        t: "Shortcut keys",
        lines: [
          "[Ctrl] + [B] = Bold · [Ctrl] + [I] = Italic · [Ctrl] + [U] = Underline",
          "[Ctrl] + [Z] = Undo · [Ctrl] + [F] = Find",
        ],
        vis: {
          kind: "lines",
          rows: [
            "Ctrl + B  →  Bold",
            "Ctrl + I  →  Italic",
            "Ctrl + U  →  Underline",
            "Ctrl + Z  →  Undo",
            "Ctrl + F  →  Find",
          ],
        },
        howto: "keys",
      },
      {
        t: "Print",
        lines: [
          "[File] tab › [Print].",
          "Choose the printer, then click [Print].",
        ],
        vis: { kind: "emoji", e: "📄 ➜ 🖨️" },
        howto: "print",
      },
    ],

    howto: [
      {
        k: "font",
        t: "Change the font",
        code: "Do you remember?",
        ic: "🔤",
        start: R,
        steps: [
          SEL_TITLE,
          { act: "click", t: "font-name", say: "Click the [Font] list." },
          {
            act: "click",
            t: "font:Comic Sans MS",
            say: "Choose [Comic Sans MS].",
          },
        ],
      },
      {
        k: "size",
        t: "Change the font size",
        code: "Do you remember?",
        ic: "🔠",
        start: R,
        steps: [
          SEL_TITLE,
          { act: "click", t: "font-size", say: "Click the [Font Size] list." },
          { act: "click", t: "size:22", say: "Choose [22]." },
        ],
      },
      {
        k: "color",
        t: "Change the font color",
        code: "Do you remember?",
        ic: "🎨",
        start: R,
        steps: [
          SEL_TITLE,
          {
            act: "click",
            t: "color-arrow",
            say: "Click the arrow next to [Font Color].",
          },
          { act: "click", t: "color:red", say: "Choose [red]." },
        ],
      },
      {
        k: "bui",
        t: "Bold, Italic and Underline",
        code: "2.2.2",
        ic: "🅱️",
        img: "underline",
        start: R,
        steps: [
          SEL_TITLE,
          { act: "click", t: "fmt:bold", say: "Click [Bold]." },
          { act: "click", t: "fmt:italic", say: "Next, click [Italic]." },
          { act: "click", t: "fmt:underline", say: "Then, click [Underline]." },
        ],
      },
      {
        k: "highlight",
        t: "Highlight text",
        code: "2.2.3",
        ic: "🖍️",
        img: "highlight",
        start: R,
        steps: [
          {
            act: "click",
            t: "hl-arrow",
            say: "Click the arrow next to [Text Highlight Color].",
          },
          { act: "click", t: "hl:yellow", say: "Click [Yellow]." },
          {
            act: "select",
            t: "w:2:0",
            to: "w:2:13",
            say: "Select the sentence [There are robots … factories.]",
          },
        ],
      },
      {
        k: "find",
        t: "Find a word",
        code: "2.2.4",
        ic: "🔍",
        img: "find",
        start: R,
        steps: [
          {
            act: "click",
            t: "edit:find",
            say: "On the Home tab, click [Find].",
          },
          {
            act: "type",
            t: "nav-search",
            text: "robots",
            say: "The Navigation pane opens. Type [robots].",
          },
          {
            act: "look",
            t: "nav-search",
            say: "All the words [robots] are highlighted!",
            wait: 1500,
          },
        ],
      },
      {
        k: "undo",
        t: "Undo an action",
        code: "2.2.5",
        ic: "↩️",
        img: "undo",
        start: R,
        steps: [
          SEL_TITLE,
          { act: "click", t: "fmt:underline", say: "Click [Underline]." },
          {
            act: "click",
            t: "qat-undo",
            say: "Changed your mind? Click [Undo].",
          },
        ],
      },
      {
        k: "zoom",
        t: "Zoom in and out",
        code: "2.2.6",
        ic: "🔎",
        img: "zoom",
        start: R,
        steps: [
          {
            act: "slide",
            t: "zoom-range",
            min: 150,
            say: "Drag the zoom slider to the [right]. The text gets bigger.",
          },
          {
            act: "slide",
            t: "zoom-range",
            max: 90,
            say: "Now drag it to the [left]. The text gets smaller.",
          },
        ],
      },
      {
        k: "keys",
        t: "Shortcut keys",
        code: "Ctrl + B · I · U · Z",
        ic: "⌨️",
        start: R,
        steps: [
          SEL_TITLE,
          {
            act: "key",
            t: "key:Ctrl+B",
            key: "Ctrl+B",
            say: "Press [Ctrl] + [B]: bold.",
          },
          {
            act: "key",
            t: "key:Ctrl+I",
            key: "Ctrl+I",
            say: "Press [Ctrl] + [I]: italic.",
          },
          {
            act: "key",
            t: "key:Ctrl+U",
            key: "Ctrl+U",
            say: "Press [Ctrl] + [U]: underline.",
          },
          {
            act: "key",
            t: "key:Ctrl+Z",
            key: "Ctrl+Z",
            say: "Press [Ctrl] + [Z]: undo the last action.",
          },
        ],
      },
      {
        k: "print",
        t: "Print a document",
        code: "Do you remember?",
        ic: "🖨️",
        start: R,
        steps: [
          { act: "click", t: "tab:File", say: "Click the [File] tab." },
          { act: "click", t: "file:print", say: "Select [Print]." },
          {
            act: "click",
            t: "print:go",
            say: "Check the printer, then click [Print].",
          },
        ],
      },
    ],

    games: [
      {
        k: "button",
        t: "Which button?",
        en: "Find the right Word button",
        ic: "🅱️",
        items: [
          {
            type: "mc",
            q: "Make the text [thick and dark].",
            opts: ["Bold", "Italic", "Underline"],
            oi: ["bold", "italic", "underline"],
          },
          {
            type: "mc",
            q: "Make the letters [slope].",
            opts: ["Italic", "Bold", "Underline"],
            oi: ["italic", "bold", "underline"],
          },
          {
            type: "mc",
            q: "Put a [line under] the words.",
            opts: ["Underline", "Bold", "Italic"],
            oi: ["underline", "bold", "italic"],
          },
          {
            type: "mc",
            q: "Colour [behind] the words, like a marker.",
            opts: ["Text Highlight Color", "Font Color"],
            oi: ["highlight", "fontcolor"],
          },
          {
            type: "mc",
            q: "Change the [colour of the letters].",
            opts: ["Font Color", "Text Highlight Color"],
            oi: ["fontcolor", "highlight"],
          },
          {
            type: "mc",
            q: "[Find] a word in the text.",
            opts: ["Find", "Undo", "Save"],
            oi: ["find", "undo", "save"],
          },
          {
            type: "mc",
            q: "Go back: [undo] your last action.",
            opts: ["Undo", "Find", "Bold"],
            oi: ["undo", "find", "bold"],
          },
        ],
      },
      {
        k: "keys",
        t: "Shortcut keys",
        en: "Match the keys and what they do",
        ic: "⌨️",
        items: [
          {
            type: "match",
            pairs: [
              { icon: "key:Ctrl+B", label: "Bold" },
              { icon: "key:Ctrl+I", label: "Italic" },
              { icon: "key:Ctrl+U", label: "Underline" },
              { icon: "key:Ctrl+Z", label: "Undo" },
              { icon: "key:Ctrl+F", label: "Find" },
            ],
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Word",
        en: "Format the text by yourself",
        ic: "📝",
        items: [
          {
            type: "sim",
            q: "Make the title [bold].",
            start: { doc: "robots", sel: [0, 0, 0, 0] },
            steps: [
              {
                act: "click",
                t: "fmt:bold",
                say: "The title is selected. Make it [bold].",
              },
            ],
          },
          {
            type: "sim",
            q: "Make the word [robots] italic.",
            start: R,
            steps: [
              {
                act: "select",
                t: "w:3:9",
                say: "Select the word [robots,] in the last line.",
              },
              { act: "click", t: "fmt:italic", say: "Click [Italic]." },
            ],
          },
          {
            type: "sim",
            q: "Make the title [red].",
            start: { doc: "robots", sel: [0, 0, 0, 0] },
            steps: [
              {
                act: "click",
                t: "color-arrow",
                say: "Click the arrow next to [Font Color].",
              },
              { act: "click", t: "color:red", say: "Choose [red]." },
            ],
          },
          {
            type: "sim",
            q: "Find the word [doctors].",
            start: R,
            steps: [
              {
                act: "key",
                t: "key:Ctrl+F",
                key: "Ctrl+F",
                say: "Press [Ctrl] + [F].",
              },
              {
                act: "type",
                t: "nav-search",
                text: "doctors",
                say: "Type [doctors].",
              },
            ],
          },
          {
            type: "sim",
            q: "Undo the bold.",
            start: { doc: "robots", sel: [0, 0, 0, 0] },
            steps: [
              { act: "click", t: "fmt:bold", say: "Click [Bold]." },
              {
                act: "key",
                t: "key:Ctrl+Z",
                key: "Ctrl+Z",
                say: "Now undo it: press [Ctrl] + [Z].",
              },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Formatting facts",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "You must select the text before you make it bold.",
            a: true,
            img: "boy-select",
          },
          {
            type: "tf",
            q: "Ctrl + F opens Find.",
            a: true,
            vis: { kind: "lines", rows: ["Ctrl + F"] },
          },
          {
            type: "tf",
            q: "Ctrl + Z makes the text bold.",
            a: false,
            x: "[Ctrl] + [Z] = Undo. [Ctrl] + [B] = Bold.",
            vis: { kind: "lines", rows: ["Ctrl + Z"] },
          },
          {
            type: "tf",
            q: "Zoom makes the font size bigger.",
            a: false,
            img: "zoom",
            x: "Zoom only makes it look bigger on the screen.",
          },
          {
            type: "tf",
            q: "Highlight is like a marker pen.",
            a: true,
            img: "highlighted",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "bui" },
          { type: "order", howto: "highlight" },
          { type: "order", howto: "print" },
        ],
      },
    ],

    exercises: [
      {
        k: "choose",
        t: "Choose the answer",
        en: "Book · Hands on 1.1–1.3",
        ic: "✅",
        from: "Book · Hands on! 1.1–1.3",
        items: [
          {
            type: "mc",
            q: "Which tab contains the option to make text bold?",
            opts: ['The "Home" tab', 'The "View" tab', 'The "File" tab'],
          },
          {
            type: "mc",
            q: "Where can you find the option to zoom in on your document?",
            opts: [
              "On the status bar",
              'On the "Home" tab',
              'On the "File" tab',
            ],
            img: "zoom",
          },
          {
            type: "mc",
            q: 'Which of the following is not a formatting option in the "Font" group?',
            opts: ["Find", "Bold", "Highlight"],
          },
        ],
      },
      {
        k: "handson",
        t: "True or false",
        en: "Book · Hands on 2.1–2.5",
        ic: "⚖️",
        from: "Book · Hands on! 2.1–2.5",
        items: [
          {
            type: "tf",
            q: 'The keyboard shortcut to open the "Find" tool in Microsoft Word is Ctrl + F.',
            a: true,
          },
          {
            type: "tf",
            q: "You can undo a formatting change by pressing Ctrl + Z.",
            a: true,
          },
          {
            type: "tf",
            q: 'Using the "Underline" option will change the font color to black.',
            a: false,
            x: "Underline only puts a [line under] the words.",
          },
          {
            type: "tf",
            q: 'You can undo the "Save" command by pressing the Undo button.',
            a: false,
            x: "You [can't] undo saving a file.",
          },
          {
            type: "tf",
            q: "Adjusting the zoom slider will increase the font size of the text.",
            a: false,
            x: "Zoom does [not] change the font size.",
            img: "zoom",
          },
        ],
      },
      {
        k: "think",
        t: "Think and answer",
        en: "Book · Hands on 3",
        ic: "💭",
        from: "Book · Hands on! 3",
        items: [
          {
            type: "open",
            q: "Why is it useful to highlight text in a document?",
            a: "Highlight makes the [important] words [stand out], so they are easy to find and remember.",
            img: "highlighted",
          },
        ],
      },
      {
        k: "word",
        t: "Do it in Word",
        en: "Book · Hands on 4",
        ic: "🖥️",
        from: "Book · Hands on! 4",
        items: [
          {
            type: "sim",
            q: "Make the whole text [Bold] and [Italic].",
            start: { doc: "global" },
            steps: [
              { act: "select", t: "all", say: "Select the whole text." },
              { act: "click", t: "fmt:bold", say: "Click [Bold]." },
              { act: "click", t: "fmt:italic", say: "Click [Italic]." },
            ],
          },
          {
            type: "sim",
            q: "[Underline] the first sentence.",
            start: { doc: "global" },
            steps: [
              {
                act: "select",
                t: "w:0:0",
                to: "w:0:8",
                say: "Select the first sentence: [Every year … hotter.]",
              },
              { act: "click", t: "fmt:underline", say: "Click [Underline]." },
            ],
          },
          {
            type: "sim",
            q: "Highlight the second sentence in [yellow].",
            start: { doc: "global" },
            steps: [
              {
                act: "select",
                t: "w:0:9",
                to: "w:0:18",
                say: "Select the second sentence: [This is called … Earth.]",
              },
              {
                act: "click",
                t: "hl-arrow",
                say: "Click the arrow next to [Text Highlight Color].",
              },
              { act: "click", t: "hl:yellow", say: "Click [Yellow]." },
            ],
          },
        ],
      },
      {
        k: "pa4",
        t: "Practical Assessment 4",
        en: "Booklet · Working with text",
        ic: "📒",
        from: "Booklet · Practical Assessment (4)",
        items: [
          {
            type: "mc",
            q: "To highlight the selected text:",
            opts: ["Text Highlight Color", "Font Color"],
            oi: ["highlight", "fontcolor"],
          },
          {
            type: "mc",
            q: 'To use "Bold", you ___ select the text.',
            opts: ["should", "shouldn't"],
          },
          {
            type: "mc",
            q: "To add and remove text formatting, such as Bold, Italic, Underline, Highlight and Font Color, you ___ select the text first.",
            opts: ["should", "shouldn't"],
          },
          {
            type: "mc",
            q: "Can you find any word in the document easily?",
            opts: ["Yes", "No"],
            img: "find",
          },
          {
            type: "mc",
            q: "You use ___ to find a word or phrase.",
            opts: ["Ctrl+F", "Ctrl+W"],
          },
          {
            type: "mc",
            q: "You use ___ to get back the last action.",
            opts: ["Ctrl+Z", "Z+Ctrl"],
          },
          {
            type: "mc",
            q: 'Which tab contains the "Find" command?',
            opts: ["Home", "File", "Insert", "Draw", "Design", "Layout"],
          },
          {
            type: "tf",
            q: "You can use Ctrl+Z after you save your file.",
            a: false,
            x: "You [can't] undo saving.",
          },
          {
            type: "tf",
            q: "You can use Ctrl+S to save your Word file.",
            a: true,
          },
          {
            type: "tf",
            q: "You use Ctrl+Z to find a word.",
            a: false,
            x: "[Ctrl] + [F] finds a word.",
          },
          {
            type: "tf",
            q: "Ctrl+F can only find numbers, not words.",
            a: false,
            x: "It finds [words] too.",
          },
          {
            type: "mc",
            q: 'Which key do you use with the "F" key to search for a text?',
            opts: ["Ctrl", "Shift", "Fn"],
          },
          {
            type: "mc",
            q: "Which one is Ctrl+F?",
            opts: ["Find", "Replace", "Select"],
            oi: ["find", "replace", "select"],
          },
        ],
      },
      {
        k: "hw2",
        t: "Practical Homework 2",
        en: "Working with text",
        ic: "📝",
        from: "Practical Graded Homework (2)",
        items: [
          {
            type: "mc",
            q: "How do you find your phrase?",
            opts: ["Ctrl+F", "Ctrl+Z", "Ctrl+B"],
          },
          {
            type: "mc",
            q: "How do you get the action back?",
            opts: ["Ctrl+Z", "Ctrl+F", "Ctrl+U"],
          },
          { type: "mc", q: "To bold:", opts: ["Ctrl+B", "Ctrl+I", "Ctrl+U"] },
          { type: "mc", q: "To italic:", opts: ["Ctrl+I", "Ctrl+B", "Ctrl+Z"] },
          {
            type: "mc",
            q: "To underline:",
            opts: ["Ctrl+U", "Ctrl+I", "Ctrl+F"],
          },
          {
            type: "mc",
            q: "Which one is [Font Color]?",
            opts: ["Font Color", "Text Highlight Color", "Bold"],
            oi: ["fontcolor", "highlight", "bold"],
          },
          {
            type: "mc",
            q: "Which one is [Text Highlight Color]?",
            opts: ["Text Highlight Color", "Font Color", "Underline"],
            oi: ["highlight", "fontcolor", "underline"],
          },
          {
            type: "tf",
            q: "You use F + Ctrl to find a phrase.",
            a: true,
            x: "[Ctrl] and [F] together.",
          },
          {
            type: "tf",
            q: "You use Shift + B to bold the selected text.",
            a: false,
            x: "[Ctrl] + [B] makes it bold.",
          },
          {
            type: "mc",
            q: "Can you use Ctrl+B, Ctrl+I or Ctrl+U without selecting?",
            opts: ["No", "Yes"],
            x: "[Select] the text first.",
          },
        ],
      },
    ],
  };
})();
