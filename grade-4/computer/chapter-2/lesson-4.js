// Computer · Grade 4 · Chapter 2 · Unit 2 · Lesson 4 « Views and print » (book pages 86–94).
// All the content of the lesson. The how-to's are done in Mini Word (shared/wordsim.js). Same format as lesson-1.js.
// Hands on 4.1 is left out: it did not load in the book.
(function () {
  const R = { doc: "report" };
  const P = { doc: "report", file: "print" };
  const VIEW = { act: "click", t: "tab:View", say: "Click the [View] tab." };
  window.LESSON = {
    n: 4,
    grade: 4,
    title: "Views and print",
    unit: "Unit 2 · Lesson 4",
    book: "Book pages 86–94",
    cover: "views",
    question: {
      q: "Is it hard to read a [long document] on your device? What could make it [easier]?",
      a: "[Read Mode] makes reading easier. [Print Preview] shows the pages before you print them.",
      img: "read-mode",
    },
    words: [
      {
        w: "Print Layout",
        m: "the usual view: it shows how the document looks on paper",
      },
      { w: "Web Layout", m: "shows how the document looks on a website" },
      {
        w: "Read Mode",
        m: "the best view to read: big text, most buttons hidden",
      },
      { w: "Print Preview", m: "shows how the pages will be printed" },
      { w: "Copies", m: "how many times the document is printed" },
      {
        w: "Orientation",
        m: "Portrait = the page stands up; Landscape = the page lies sideways",
      },
    ],

    ideas: [
      {
        t: "Document views",
        lines: [
          "You can look at your document in [different ways].",
          "[View] tab › [Views] group.",
        ],
        img: "views",
        howto: "web",
      },
      {
        t: "Print Layout",
        lines: [
          "The [usual view] of Microsoft Word.",
          "It shows how the document looks [on paper]. Use it if you are going to print.",
        ],
        vis: {
          kind: "icons",
          items: [{ type: "printlayout", label: "Print Layout" }],
        },
        howto: "web",
      },
      {
        t: "Web Layout",
        lines: ["It shows how the document looks [on a website]."],
        vis: {
          kind: "icons",
          items: [{ type: "weblayout", label: "Web Layout" }],
        },
        howto: "web",
      },
      {
        t: "Read Mode",
        lines: [
          "The [best view to read]. It fills the screen and hides most buttons.",
          "To write again: [View] › [Edit Document].",
        ],
        img: "read-mode",
        howto: "read",
      },
      {
        t: "Be safe!",
        lines: [
          "[Sit properly] at the computer, so your neck and back don't hurt.",
          "A healthy mind in a healthy body!",
        ],
        vis: { kind: "emoji", e: "🪑 🧍 💪" },
      },
      {
        t: "Print quickly",
        lines: [
          "Check that the computer is [connected] to a printer.",
          "Press [Ctrl] + [P], then [Enter].",
        ],
        vis: {
          kind: "icons",
          items: [
            { type: "key:Ctrl+P", label: "Ctrl + P" },
            { type: "key:Enter", label: "Enter" },
          ],
        },
        howto: "quick",
      },
      {
        t: "The Print screen",
        lines: [
          "[File] tab › [Print].",
          "On the [right]: the [Print Preview]. On the [left]: the [Settings].",
        ],
        img: "print",
        howto: "print",
      },
      {
        t: "Printer and copies",
        lines: [
          "A [local printer] is connected to your computer. A [network printer] is shared.",
          "[Copies]: type the number, or use the arrows.",
        ],
        img: "print",
        howto: "copies",
      },
      {
        t: "What to print",
        lines: [
          "[Print All Pages]: the whole document. [Print Selection]: only what you selected.",
          "[Print Current Page]: the page in the preview. [Custom Print]: pages you type, like [1-5, 8].",
        ],
        img: "print-settings",
        howto: "custom",
      },
      {
        t: "Portrait or Landscape",
        lines: [
          "[Portrait]: the page stands up (vertical).",
          "[Landscape]: the page lies sideways (horizontal).",
        ],
        vis: {
          kind: "icons",
          items: [
            { type: "portrait", label: "Portrait" },
            { type: "landscape", label: "Landscape" },
          ],
        },
        howto: "landscape",
      },
      {
        t: "Smart tip",
        lines: [
          "Is there [enough paper]?",
          "5 pages × 10 copies = [50 sheets] of paper.",
        ],
        vis: {
          kind: "lines",
          rows: ["5 pages × 10 copies", "= 50 sheets"],
        },
      },
    ],

    howto: [
      {
        k: "read",
        t: "Read Mode",
        code: "2.4.2",
        ic: "📖",
        img: "read-mode",
        start: R,
        steps: [
          VIEW,
          { act: "click", t: "view:read", say: "Click [Read Mode]." },
          {
            act: "click",
            t: "rm:view",
            say: "To write again, click [View].",
          },
          { act: "click", t: "rm:edit", say: "Click [Edit Document]." },
        ],
      },
      {
        k: "web",
        t: "Web Layout and Print Layout",
        code: "2.4.1",
        ic: "🌐",
        img: "views",
        start: R,
        steps: [
          VIEW,
          {
            act: "click",
            t: "view:web",
            say: "Click [Web Layout]: like a website.",
          },
          {
            act: "click",
            t: "view:print",
            say: "Click [Print Layout]: like on paper.",
          },
        ],
      },
      {
        k: "quick",
        t: "Print quickly",
        code: "Ctrl + P",
        ic: "⌨️",
        start: R,
        steps: [
          {
            act: "key",
            t: "key:Ctrl+P",
            key: "Ctrl+P",
            say: "Press [Ctrl] + [P].",
          },
          {
            act: "key",
            t: "key:Enter",
            key: "Enter",
            say: "Press [Enter]. The document is printed.",
          },
        ],
      },
      {
        k: "print",
        t: "The Print screen",
        code: "2.4.3",
        ic: "🖨️",
        img: "print",
        start: R,
        steps: [
          { act: "click", t: "tab:File", say: "Click the [File] tab." },
          { act: "click", t: "file:print", say: "Click [Print]." },
          {
            act: "click",
            t: "pr:next",
            say: "On the right is the [Print Preview]. Click the arrow to see the next page.",
          },
          { act: "click", t: "print:go", say: "Click [Print]." },
        ],
      },
      {
        k: "copies",
        t: "Copies and printer",
        code: "2.4.3",
        ic: "📑",
        img: "print",
        start: P,
        steps: [
          {
            act: "type",
            t: "pr:copies",
            text: "4",
            say: "In [Copies], type [4].",
          },
          {
            act: "click",
            t: "pr:printer",
            say: "Click the [Printer] list.",
          },
          {
            act: "click",
            t: "prn:1",
            say: "Click [Office printer], the network printer.",
          },
          { act: "click", t: "print:go", say: "Click [Print]." },
        ],
      },
      {
        k: "custom",
        t: "Print some pages",
        code: "2.4.4",
        ic: "🔢",
        img: "print-settings",
        start: P,
        steps: [
          {
            act: "click",
            t: "pr:what",
            say: "Under [Settings], click [Print All Pages].",
          },
          { act: "click", t: "prw:custom", say: "Click [Custom Print]." },
          {
            act: "type",
            t: "pr:pages",
            text: "1, 3",
            say: "In [Pages], type [1, 3].",
          },
          { act: "click", t: "print:go", say: "Click [Print]." },
        ],
      },
      {
        k: "landscape",
        t: "Landscape orientation",
        code: "2.4.4",
        ic: "↔️",
        img: "print-settings",
        start: P,
        steps: [
          {
            act: "click",
            t: "pr:orient",
            say: "Click [Portrait Orientation].",
          },
          {
            act: "click",
            t: "pro:landscape",
            say: "Click [Landscape Orientation]: the page lies sideways.",
          },
          { act: "click", t: "print:go", say: "Click [Print]." },
        ],
      },
    ],

    games: [
      {
        k: "view",
        t: "Which view?",
        en: "Read Mode, Print Layout, Web Layout",
        ic: "👀",
        items: [
          {
            type: "mc",
            q: "I want to [read] a long story.",
            opts: ["Read Mode", "Print Layout", "Web Layout"],
            oi: ["readmode", "printlayout", "weblayout"],
          },
          {
            type: "mc",
            q: "I want to see how it looks [on paper].",
            opts: ["Print Layout", "Read Mode", "Web Layout"],
            oi: ["printlayout", "readmode", "weblayout"],
          },
          {
            type: "mc",
            q: "I want to see how it looks [on a website].",
            opts: ["Web Layout", "Print Layout", "Read Mode"],
            oi: ["weblayout", "printlayout", "readmode"],
          },
        ],
      },
      {
        k: "setting",
        t: "Which setting?",
        en: "The Print settings",
        ic: "🖨️",
        items: [
          {
            type: "mc",
            q: "Print the [whole] document.",
            vis: { kind: "emoji", e: "📄📄📄" },
            opts: ["Print All Pages", "Print Current Page", "Print Selection"],
          },
          {
            type: "mc",
            q: "Print only the [page in the preview].",
            vis: { kind: "emoji", e: "👀 📄" },
            opts: ["Print Current Page", "Print All Pages", "Custom Print"],
          },
          {
            type: "mc",
            q: "Print only the [paragraph I selected].",
            vis: { kind: "emoji", e: "🖱️ ▬▬" },
            opts: ["Print Selection", "Print All Pages", "Custom Print"],
          },
          {
            type: "mc",
            q: "Print [pages 1 and 3].",
            vis: { kind: "lines", rows: ["Pages: 1, 3"] },
            opts: ["Custom Print", "Print Current Page", "Print Selection"],
          },
          {
            type: "mc",
            q: "Print the page [sideways].",
            opts: ["Landscape", "Portrait"],
            oi: ["landscape", "portrait"],
          },
          {
            type: "mc",
            q: "Print it [3 times].",
            vis: { kind: "emoji", e: "🖨️ × 3" },
            opts: ["Copies: 3", "Pages: 3"],
          },
        ],
      },
      {
        k: "do",
        t: "Do it in Mini Word",
        en: "Views and printing",
        ic: "📝",
        items: [
          {
            type: "sim",
            q: "Open [Read Mode].",
            start: { doc: "report", tab: "View" },
            steps: [
              { act: "click", t: "view:read", say: "Click [Read Mode]." },
            ],
          },
          {
            type: "sim",
            q: "Go back from Read Mode to [edit] the document.",
            start: { doc: "report", view: "read" },
            steps: [
              { act: "click", t: "rm:view", say: "Click [View]." },
              { act: "click", t: "rm:edit", say: "Click [Edit Document]." },
            ],
          },
          {
            type: "sim",
            q: "Print [2 copies] with the arrows.",
            start: P,
            steps: [
              { act: "click", t: "pr:up", say: "Click the [up] arrow ▲." },
              { act: "click", t: "print:go", say: "Click [Print]." },
            ],
          },
          {
            type: "sim",
            q: "Print only [page 2].",
            start: P,
            steps: [
              {
                act: "click",
                t: "pr:next",
                say: "Click the arrow ▶ to see [page 2].",
              },
              {
                act: "click",
                t: "pr:what",
                say: "Click [Print All Pages].",
              },
              {
                act: "click",
                t: "prw:cur",
                say: "Click [Print Current Page].",
              },
              { act: "click", t: "print:go", say: "Click [Print]." },
            ],
          },
        ],
      },
      {
        k: "tf",
        t: "True or false?",
        en: "Views and print facts",
        ic: "✅",
        items: [
          {
            type: "tf",
            q: "Print Layout is the usual view of Microsoft Word.",
            a: true,
            icon: "printlayout",
          },
          {
            type: "tf",
            q: "In Read Mode you see all the buttons of the ribbon.",
            a: false,
            x: "Read Mode [hides] most of the buttons.",
            img: "read-mode",
          },
          {
            type: "tf",
            q: "Portrait means the page lies sideways.",
            a: false,
            x: "Portrait [stands up]. [Landscape] lies sideways.",
            icon: "portrait",
          },
          {
            type: "tf",
            q: "5 pages and 10 copies need 50 sheets of paper.",
            a: true,
            vis: { kind: "lines", rows: ["5 × 10 = 50"] },
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "read" },
          { type: "order", howto: "custom" },
        ],
      },
    ],

    exercises: [
      {
        k: "buttons",
        t: "What does this button do?",
        en: "Book · Hands on 1.1–1.3",
        ic: "🔘",
        from: "Book · Hands on! 1.1–1.3",
        items: [
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "readmode",
            opts: [
              "Makes it easier to read the document by resizing the text and hiding most of the editing tools",
              "Shows how the document will be displayed when printed on paper",
              "Shows the document as it would look on a web page",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "weblayout",
            opts: [
              "Shows the document as it would look on a web page",
              "Shows how the document will be displayed when printed on paper",
              "Makes it easier to read the document by resizing the text and hiding most of the editing tools",
            ],
          },
          {
            type: "mc",
            q: "What does this button do in Microsoft Word?",
            icon: "printlayout",
            opts: [
              "Shows how the document will be displayed when printed on paper",
              "Makes it easier to read the document by resizing the text and hiding most of the editing tools",
              "Shows the document as it would look on a web page",
            ],
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
            q: 'The "Read Mode" tool is available on the "Review" tab.',
            a: false,
            x: "Read Mode is on the [View] tab.",
            img: "views",
          },
          {
            type: "tf",
            q: "To print a copy of your document, you can press Ctrl + P on the keyboard.",
            a: true,
            icon: "key:Ctrl+P",
          },
          {
            type: "tf",
            q: 'You can find local or network printers in the "Printer" list if they are available.',
            a: true,
            img: "print",
          },
          {
            type: "tf",
            q: 'The command "Print All Pages" prints the whole document.',
            a: true,
            img: "print-settings",
          },
          {
            type: "tf",
            q: 'To print a document horizontally, you have to select "Landscape Orientation."',
            a: true,
            icon: "landscape",
          },
        ],
      },
      {
        k: "fill",
        t: "Complete the sentence",
        en: "Book · Hands on 3.1–3.4",
        ic: "✏️",
        from: "Book · Hands on! 3.1–3.4",
        items: [
          {
            type: "mc",
            q: '___ prints only the page that is displayed in "Print Preview."',
            opts: [
              "Print Current Page",
              "Print All Pages",
              "Print Selection",
              "Custom Print",
            ],
            img: "print-settings",
          },
          {
            type: "mc",
            q: "To print a document four times, you have to change the ___ value.",
            opts: ["Copies", "Pages", "Printer"],
            img: "print",
          },
          {
            type: "mc",
            q: "___ allows you to print specific pages or sections of a document.",
            opts: [
              "Custom Print",
              "Print All Pages",
              "Print Current Page",
              "Print Selection",
            ],
            img: "print-settings",
          },
          {
            type: "mc",
            q: "___ allows you to print only a highlighted or selected part of a document.",
            opts: [
              "Print Selection",
              "Print Current Page",
              "Print All Pages",
              "Custom Print",
            ],
            img: "print-settings",
          },
        ],
      },
      {
        k: "practise",
        t: "Print it",
        en: "Book · pages 88–89 in Mini Word",
        ic: "🖨️",
        from: "Book · pages 88–89",
        items: [
          {
            type: "sim",
            q: "Print the story [4 times], sideways.",
            start: R,
            steps: [
              {
                act: "key",
                t: "key:Ctrl+P",
                key: "Ctrl+P",
                say: "Press [Ctrl] + [P].",
              },
              {
                act: "type",
                t: "pr:copies",
                text: "4",
                say: "In [Copies], type [4].",
              },
              {
                act: "click",
                t: "pr:orient",
                say: "Click [Portrait Orientation].",
              },
              {
                act: "click",
                t: "pro:landscape",
                say: "Click [Landscape Orientation].",
              },
              { act: "click", t: "print:go", say: "Click [Print]." },
            ],
          },
          {
            type: "sim",
            q: "Print only [pages 1 to 2].",
            start: P,
            steps: [
              {
                act: "type",
                t: "pr:pages",
                text: "1-2",
                say: "In [Pages], type [1-2]. Word chooses [Custom Print].",
              },
              { act: "click", t: "print:go", say: "Click [Print]." },
            ],
          },
        ],
      },
    ],
  };
})();
