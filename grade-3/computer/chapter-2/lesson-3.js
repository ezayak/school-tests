// Computer · Grade 3 · Chapter 2 · Unit 2 · Lesson 3 « Paragraph formatting » (book pages 52–60).
// All the content of the lesson. The how-to's are done in Mini Word (wordsim.js). Same format as lesson-2.js.
(function () {
  const R = { doc: "robots" };
  const RL = { doc: "robotsList" };
  const ALL = {
    act: "select",
    t: "all",
    say: "Select all the text: drag from [Robots!] to [like:].",
  };
  window.LESSON = {
    n: 3,
    grade: 3,
    title: "Paragraph formatting",
    unit: "Unit 2 · Lesson 3",
    book: "Book pages 52–60",
    cover: "volcano",
    question: {
      q: "Why is it helpful to split long writing into smaller [parts]?",
      a: "Short [paragraphs], [lists] and [alignment] make the text easy to read.",
      img: "paragraph",
    },

    ideas: [
      {
        t: "What is a paragraph?",
        lines: [
          "A [paragraph] is a group of sentences about [one topic].",
          "Long text is easier to read in paragraphs.",
        ],
        img: "paragraph",
        tip: {
          img: "girl-tip",
          say: "A paragraph is a group of related sentences focused on a specific topic.",
        },
      },
      {
        t: "Don't press Enter on every line",
        lines: [
          "Word moves the text to a [new line] by itself.",
          "Press [Enter] only at the [end of a paragraph].",
        ],
        img: "paragraph",
      },
      {
        t: "Enter = new paragraph",
        lines: [
          "Press [Enter ↩] to start a [new paragraph].",
          "Word adds [extra space] between paragraphs.",
        ],
        img: "enter",
        howto: "enter",
      },
      {
        t: "Shift + Enter = new line",
        lines: [
          "For a poem or a list: a new line, [not] a new paragraph.",
          "Press [Shift] + [Enter]. This is a [line break].",
        ],
        vis: { kind: "lines", rows: ["Shift ⇧ + Enter ↩", "= a new line"] },
        howto: "break",
      },
      {
        t: "Align the text",
        lines: [
          "Home tab › Paragraph group: 4 alignment buttons.",
          "[Align Left] · [Center] · [Align Right] · [Justify]",
          "Select the text first!",
        ],
        vis: {
          kind: "icons",
          items: [
            { type: "align-left", label: "Left" },
            { type: "align-center", label: "Center" },
            { type: "align-right", label: "Right" },
            { type: "justify", label: "Justify" },
          ],
        },
        howto: "align",
      },
      {
        t: "Center and Justify",
        lines: [
          "[Center] puts the text in the [middle] of the page.",
          "[Justify] makes [straight edges] on the left and on the right.",
        ],
        img: "justify",
        tip: {
          img: "girl-point",
          say: "You need to [select] the text first and then apply formatting.",
        },
        howto: "align",
      },
      {
        t: "Shortcut keys",
        lines: [
          "[Ctrl] + [L] = left · [Ctrl] + [E] = center · [Ctrl] + [R] = right",
        ],
        vis: {
          kind: "lines",
          rows: [
            "Ctrl + L  →  Left",
            "Ctrl + E  →  Center",
            "Ctrl + R  →  Right",
          ],
        },
        howto: "keys",
      },
      {
        t: "Bulleted list",
        lines: [
          "A [list] makes things easy to read and remember.",
          "Home tab › [Bullets] •",
          "Press [Enter] for the next bullet. Press Enter [twice] to finish.",
        ],
        img: "bullets",
        howto: "bullets",
      },
      {
        t: "Numbered list",
        lines: ["The same, but click [Numbering]: 1. 2. 3."],
        vis: {
          kind: "lines",
          rows: ["1. Automatic doors", "2. ATMs", "3. Vending machines"],
        },
        howto: "numbers",
      },
      {
        t: "Symbols",
        lines: [
          "[Insert] tab › [Symbol] › choose a symbol.",
          "For example ☺ ★ ♥ © ™",
        ],
        img: "symbol",
        howto: "symbol",
      },
    ],

    howto: [
      {
        k: "enter",
        t: "Start a new paragraph",
        code: "2.3.2",
        ic: "↩️",
        img: "enter",
        start: { doc: "oneParagraph" },
        steps: [
          { act: "click", t: "w:0:21", say: "Click after [city.]" },
          {
            act: "key",
            t: "key:Enter",
            key: "Enter",
            say: "Press [Enter]. A new paragraph starts!",
          },
        ],
      },
      {
        k: "break",
        t: "Line break",
        code: "2.3.3",
        ic: "⤵️",
        start: { doc: "oneParagraph" },
        steps: [
          { act: "click", t: "w:0:12", say: "Click after [easier.]" },
          {
            act: "key",
            t: "key:Shift+Enter",
            key: "Shift+Enter",
            say: "Press [Shift] + [Enter]: a new line, in the same paragraph.",
          },
        ],
      },
      {
        k: "align",
        t: "Change the text alignment",
        code: "2.3.4",
        ic: "↔️",
        img: "align-right",
        start: R,
        steps: [
          ALL,
          { act: "click", t: "align:right", say: "Click [Align Right]." },
          { act: "click", t: "align:center", say: "Click [Center]." },
          { act: "click", t: "align:justify", say: "Click [Justify]." },
          { act: "click", t: "align:left", say: "Click [Align Left]." },
        ],
      },
      {
        k: "keys",
        t: "Align with the keys",
        code: "Ctrl + E · R · L",
        ic: "⌨️",
        start: R,
        steps: [
          ALL,
          {
            act: "key",
            t: "key:Ctrl+E",
            key: "Ctrl+E",
            say: "Press [Ctrl] + [E]: center.",
          },
          {
            act: "key",
            t: "key:Ctrl+R",
            key: "Ctrl+R",
            say: "Press [Ctrl] + [R]: right.",
          },
          {
            act: "key",
            t: "key:Ctrl+L",
            key: "Ctrl+L",
            say: "Press [Ctrl] + [L]: left.",
          },
        ],
      },
      {
        k: "bullets",
        t: "Create a bulleted list",
        code: "2.3.6",
        ic: "•",
        img: "bullets",
        start: R,
        steps: [
          { act: "click", t: "w:3:10", say: "Click after [like:]" },
          {
            act: "key",
            t: "key:Enter",
            key: "Enter",
            say: "Press [Enter] for a new line.",
          },
          {
            act: "click",
            t: "bullets-arrow",
            say: "Click the arrow next to [Bullets].",
          },
          { act: "click", t: "bullet:0", say: "Click the round bullet [•]." },
          {
            act: "type",
            t: "doc",
            text: "Automatic doors",
            say: "Type [Automatic doors].",
          },
          {
            act: "key",
            t: "key:Enter",
            key: "Enter",
            say: "Press [Enter]: a new bullet!",
          },
          { act: "type", t: "doc", text: "ATMs", say: "Type [ATMs]." },
        ],
      },
      {
        k: "numbers",
        t: "Create a numbered list",
        code: "2.3.6",
        ic: "🔢",
        start: RL,
        steps: [
          {
            act: "select",
            t: "w:4:0",
            to: "w:6:6",
            say: "Select the 3 bullets: from [Automatic] to [drinks.]",
          },
          { act: "click", t: "para:numbering", say: "Click [Numbering]." },
        ],
      },
      {
        k: "symbol",
        t: "Insert a symbol",
        code: "2.3.7",
        ic: "☺",
        img: "symbol",
        start: RL,
        steps: [
          { act: "click", t: "w:4:8", say: "Click after [them.]" },
          { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
          { act: "click", t: "ins:symbol", say: "Click [Symbol]." },
          { act: "click", t: "sym:0", say: "Click the smiley [☺]." },
        ],
      },
    ],

    games: [
      {
        k: "align",
        t: "Which alignment?",
        en: "Find the right button",
        ic: "↔️",
        items: [
          {
            type: "mc",
            q: "Put the text in the [middle] of the page.",
            opts: ["Center", "Align Left", "Align Right", "Justify"],
            oi: ["align-center", "align-left", "align-right", "justify"],
          },
          {
            type: "mc",
            q: "Put the text on the [right] side.",
            opts: ["Align Right", "Center", "Align Left", "Justify"],
            oi: ["align-right", "align-center", "align-left", "justify"],
          },
          {
            type: "mc",
            q: "Make [straight edges] on both sides.",
            opts: ["Justify", "Center", "Align Left", "Align Right"],
            oi: ["justify", "align-center", "align-left", "align-right"],
          },
          {
            type: "mc",
            q: "Put the text on the [left] side.",
            opts: ["Align Left", "Align Right", "Center", "Justify"],
            oi: ["align-left", "align-right", "align-center", "justify"],
          },
          {
            type: "mc",
            q: "Make a list with [dots] •",
            opts: ["Bullets", "Numbering", "Justify"],
            oi: ["bullets", "numbering", "justify"],
          },
          {
            type: "mc",
            q: "Make a list with [numbers] 1. 2. 3.",
            opts: ["Numbering", "Bullets", "Center"],
            oi: ["numbering", "bullets", "align-center"],
          },
        ],
      },
      {
        k: "keys",
        t: "Which key?",
        en: "Enter, Shift + Enter, Ctrl + E …",
        ic: "⌨️",
        items: [
          {
            type: "mc",
            q: "Start a new [paragraph].",
            opts: ["Enter", "Shift + Enter", "Ctrl + Enter"],
            oi: ["key:Enter", "key:Shift+Enter", "key:Ctrl+Enter"],
          },
          {
            type: "mc",
            q: "Start a new [line] in the same paragraph.",
            opts: ["Shift + Enter", "Enter", "Ctrl + Shift"],
            oi: ["key:Shift+Enter", "key:Enter", "key:Ctrl+Shift"],
          },
          {
            type: "mc",
            q: "[Center] the text.",
            opts: ["Ctrl + E", "Ctrl + L", "Ctrl + R"],
            oi: ["key:Ctrl+E", "key:Ctrl+L", "key:Ctrl+R"],
          },
          {
            type: "mc",
            q: "Move the text to the [right].",
            opts: ["Ctrl + R", "Ctrl + E", "Ctrl + L"],
            oi: ["key:Ctrl+R", "key:Ctrl+E", "key:Ctrl+L"],
          },
          {
            type: "mc",
            q: "Move the text to the [left].",
            opts: ["Ctrl + L", "Ctrl + R", "Ctrl + E"],
            oi: ["key:Ctrl+L", "key:Ctrl+R", "key:Ctrl+E"],
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Word",
        en: "Paragraphs, lists, symbols",
        ic: "📝",
        items: [
          {
            type: "sim",
            q: "[Center] the title.",
            start: { doc: "robots", sel: [0, 0, 0, 0] },
            steps: [
              {
                act: "click",
                t: "align:center",
                say: "The title is selected. Click [Center].",
              },
            ],
          },
          {
            type: "sim",
            q: "Start a new paragraph after [easier.]",
            start: { doc: "oneParagraph" },
            steps: [
              { act: "click", t: "w:0:12", say: "Click after [easier.]" },
              {
                act: "key",
                t: "key:Enter",
                key: "Enter",
                say: "Press [Enter].",
              },
            ],
          },
          {
            type: "sim",
            q: "Change the bullets to [numbers].",
            start: { doc: "robotsList" },
            steps: [
              {
                act: "select",
                t: "w:4:0",
                to: "w:6:6",
                say: "The lines have bullets. Select them all.",
              },
              {
                act: "click",
                t: "para:numbering",
                say: "Change them to [Numbering].",
              },
            ],
          },
          {
            type: "sim",
            q: "Add a star [★] after the title.",
            start: { doc: "robots", caret: [0, 0] },
            steps: [
              { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
              { act: "click", t: "ins:symbol", say: "Click [Symbol]." },
              { act: "click", t: "sym:1", say: "Click the star [★]." },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Paragraph facts",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "A paragraph is a group of sentences about one topic.",
            a: true,
            img: "paragraph",
          },
          {
            type: "tf",
            q: "You must press Enter at the end of every line.",
            a: false,
            x: "Word moves to a new line [by itself].",
          },
          {
            type: "tf",
            q: "Symbols are on the Insert tab.",
            a: true,
            img: "symbol",
          },
          {
            type: "tf",
            q: "Center puts the text in the middle of the page.",
            a: true,
            img: "align-center",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "bullets" },
          { type: "order", howto: "symbol" },
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
            q: "What key or keys do you press to create a new paragraph in your document?",
            opts: ["Enter", "Shift + Enter", "Ctrl + Enter"],
          },
          {
            type: "mc",
            q: "Which option aligns text evenly between the left and right sides of the page?",
            opts: ["Justify", "Center", "Align Left"],
            oi: ["justify", "align-center", "align-left"],
          },
          {
            type: "mc",
            q: "How do you set the alignment in Microsoft Word?",
            opts: [
              'Go to the "Home" tab and use the "Paragraph" group.',
              'Right-click on text and select "Font."',
              'Go to the "Home" tab and use the "Editing" group.',
            ],
          },
        ],
      },
      {
        k: "handson",
        t: "True or false",
        en: "Book · Hands on 2.1–2.6",
        ic: "⚖️",
        from: "Book · Hands on! 2.1–2.6",
        items: [
          {
            type: "tf",
            q: "The Enter key should be pressed after every sentence to create space between each sentence.",
            a: false,
            x: "Press Enter only at the end of a [paragraph].",
          },
          {
            type: "tf",
            q: 'You can insert special symbols, such as © or ™, by using the "Insert" tab in your document.',
            a: true,
          },
          {
            type: "tf",
            q: 'Using "Justify" will align text to the center of the page.',
            a: false,
            x: "Justify makes [straight edges] on both sides.",
          },
          {
            type: "tf",
            q: 'Bullets and numbers can be added from the "Paragraph" group in the "Home" tab.',
            a: true,
          },
          {
            type: "tf",
            q: "Pressing Enter after typing a bullet point will automatically insert a new bullet in the list.",
            a: true,
          },
          {
            type: "tf",
            q: "You can start a new paragraph by pressing the Shift + Enter keys.",
            a: false,
            x: "Shift + Enter starts a new [line]. Enter starts a new paragraph.",
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
            q: "Why is it important to divide text into paragraphs?",
            a: "Paragraphs make a long text [easy to read]. Each paragraph tells about [one topic].",
            img: "enter",
          },
        ],
      },
      {
        k: "word",
        t: "Do it in Word",
        en: "Book · Hands on 4 · the volcano",
        ic: "🌋",
        from: "Book · Hands on! 4",
        items: [
          {
            type: "sim",
            q: "Use the [Arial] font.",
            start: { doc: "volcano" },
            steps: [
              { act: "select", t: "all", say: "Select the whole paragraph." },
              { act: "click", t: "font-name", say: "Click the [Font] list." },
              { act: "click", t: "font:Arial", say: "Choose [Arial]." },
            ],
          },
          {
            type: "sim",
            q: "Make the letters a little bigger: size [14].",
            start: { doc: "volcano", sel: "all" },
            steps: [
              {
                act: "click",
                t: "font-size",
                say: "Click the [Font Size] list.",
              },
              { act: "click", t: "size:14", say: "Choose [14]." },
            ],
          },
          {
            type: "sim",
            q: "Move the text to the [center] of the page.",
            start: { doc: "volcano", sel: "all" },
            steps: [
              { act: "click", t: "align:center", say: "Click [Center]." },
            ],
          },
          {
            type: "sim",
            q: "Write a bulleted list: [Hot lava], [Ash], [Gases].",
            start: { doc: "volcano" },
            steps: [
              { act: "click", t: "w:0:38", say: "Click after [volcano:]" },
              {
                act: "key",
                t: "key:Enter",
                key: "Enter",
                say: "Press [Enter].",
              },
              { act: "click", t: "para:bullets", say: "Click [Bullets]." },
              {
                act: "type",
                t: "doc",
                text: "Hot lava",
                say: "Type [Hot lava].",
              },
              {
                act: "key",
                t: "key:Enter",
                key: "Enter",
                say: "Press [Enter].",
              },
              { act: "type", t: "doc", text: "Ash", say: "Type [Ash]." },
              {
                act: "key",
                t: "key:Enter",
                key: "Enter",
                say: "Press [Enter].",
              },
              { act: "type", t: "doc", text: "Gases", say: "Type [Gases]." },
            ],
          },
          {
            type: "sim",
            q: "Add a [symbol] at the end of the paragraph.",
            start: { doc: "volcano" },
            steps: [
              { act: "click", t: "w:0:38", say: "Click after [volcano:]" },
              { act: "click", t: "tab:Insert", say: "Click the [Insert] tab." },
              { act: "click", t: "ins:symbol", say: "Click [Symbol]." },
              {
                act: "click",
                t: "sym:0",
                say: "Choose a symbol, for example [☺].",
              },
            ],
          },
        ],
      },
      {
        k: "pa4",
        t: "Practical Assessment 4",
        en: "Booklet · Paragraph formatting",
        ic: "📒",
        from: "Booklet · Practical Assessment (4)",
        items: [
          {
            type: "mc",
            q: "To start a [new line]:",
            opts: ["Shift + Enter", "Ctrl + Shift"],
            oi: ["key:Shift+Enter", "key:Ctrl+Shift"],
          },
          {
            type: "match",
            pairs: [
              { icon: "align-left", label: "Align Left" },
              { icon: "align-center", label: "Center" },
              { icon: "align-right", label: "Align Right" },
              { icon: "justify", label: "Justify" },
            ],
          },
          {
            type: "mc",
            q: "Ctrl+L:",
            opts: [
              "Moves the selected text to the left",
              "Moves the selected text to the right",
              "Moves the selected text to the center",
            ],
          },
          {
            type: "mc",
            q: "Ctrl+R:",
            opts: [
              "Moves the selected text to the right",
              "Moves the selected text to the left",
              "Moves the selected text to the center",
            ],
          },
          {
            type: "mc",
            q: "Ctrl+E:",
            opts: [
              "Moves the selected text to the center",
              "Moves the selected text to the left",
              "Moves the selected text to the right",
            ],
          },
        ],
      },
    ],
  };
})();
