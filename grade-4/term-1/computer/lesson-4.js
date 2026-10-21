// Computer · Grade 4 · Unit 1 · Lesson 4 « Protect my computer » (book pages 40–49).
// All the content of the lesson. The engine is computer-lesson.js, Mini Windows is winsim.js. Same format as lesson-1.js.
(function () {
  const SEC = { app: "Windows Security", secPage: "virus" };
  const FROZEN = {
    open: "Documents/My story.docx",
    frozen: true,
    shortcuts: [{ of: "Documents/My story.docx", in: "Desktop" }],
  };

  window.LESSON = {
    n: 4,
    grade: 4,
    title: "Protect my computer",
    unit: "Unit 1 · Lesson 4",
    book: "Book pages 40–49",
    cover: "security",
    question: {
      q: "Did you know there are [viruses] that can harm your computer?",
      a: "Yes! An [antivirus] program keeps the computer [safe].",
      img: "security",
    },

    ideas: [
      {
        t: "Troubleshoot",
        lines: [
          "Sometimes the computer has a [problem].",
          "[Troubleshoot] = find the problem and [fix] it.",
        ],
        img: "troubleshoot",
      },
      {
        t: "Restart",
        lines: [
          "Is the computer acting [strangely]?",
          "[Restart] it. This fixes many problems.",
        ],
        vis: { kind: "emoji", e: "🔄💻" },
        howto: "restart",
      },
      {
        t: "Check the power",
        lines: [
          "Is the battery [low]?",
          "[Plug in] the charger until it is full.",
        ],
        vis: { kind: "emoji", e: "🔌🔋" },
        howto: "battery",
      },
      {
        t: "Check the Wi-Fi",
        lines: ["No Internet?", "Check that the [Wi-Fi] is [on]."],
        vis: { kind: "emoji", e: "📶" },
        howto: "wifi",
      },
      {
        t: "Close and open again",
        lines: ["A program does not work?", "[Close] it and [open] it again."],
        vis: { kind: "emoji", e: "❌ ➜ 📂" },
        howto: "frozen",
      },
      {
        t: "Get Help",
        lines: ["Have a question?", "Use the [Get Help] app to find answers."],
        img: "gethelp",
        howto: "get-help",
      },
      {
        t: "Malware",
        lines: [
          "[Malware] = a bad program.",
          "A [virus] is malware.",
          "It can harm files, copy your data, and harm [phones] too.",
        ],
        vis: { kind: "emoji", e: "🦠💻📱" },
      },
      {
        t: "Antivirus",
        lines: [
          "An [antivirus] finds and removes malware.",
          "[Windows Security] is an antivirus. It is free.",
        ],
        img: "security",
        howto: "virus",
      },
      {
        t: "Scan",
        lines: [
          "[Quick scan] checks the important places. It is fast.",
          "[Full scan] checks everything. It is slow.",
        ],
        img: "scan-options",
        howto: "scan",
      },
      {
        t: "Update the antivirus",
        lines: [
          "New viruses come [every day].",
          "[Update] the antivirus often so it knows them.",
        ],
        img: "prot-updates",
        howto: "update-av",
      },
      {
        t: "Windows Update",
        lines: ["Keep the computer [updated].", "Always say [yes] to updates!"],
        img: "win-update",
        howto: "windows-update",
      },
      {
        t: "Be careful with email",
        lines: [
          "Don't open emails from people you [don't know].",
          "[Attachments] can have viruses.",
        ],
        img: "email-boy",
      },
      {
        t: "Download safely",
        lines: [
          "Only download from [trusted] places.",
          "Ask a grown-up first.",
        ],
        vis: { kind: "emoji", e: "✅🌐🙋" },
      },
    ],

    howto: [
      {
        k: "restart",
        code: "Tip",
        t: "Restart the computer",
        ic: "🔄",
        img: "troubleshoot",
        start: {},
        steps: [
          { act: "click", t: "task-start", say: "Click [Start]." },
          { act: "click", t: "start-power", say: "Click the [Power] button." },
          { act: "click", t: "power:restart", say: "Click [Restart]." },
          {
            act: "look",
            t: null,
            wait: 2600,
            say: "The computer turns off and on [again].",
          },
        ],
      },
      {
        k: "battery",
        code: "Tip",
        t: "Check the power",
        ic: "🔋",
        img: "troubleshoot",
        start: { battery: 8 },
        steps: [
          {
            act: "click",
            t: "tray-battery",
            say: "The battery is [low]! Click the [battery] icon.",
          },
          { act: "click", t: "bat:plug", say: "Click [Plug in the charger]." },
          { act: "look", t: "tray-battery", say: "It is [charging] ⚡." },
        ],
      },
      {
        k: "wifi",
        code: "Tip",
        t: "Check the Wi-Fi",
        ic: "📶",
        img: "check-more",
        start: { wifi: false },
        steps: [
          {
            act: "click",
            t: "tray-wifi",
            say: "No Internet. Click the [Wi-Fi] icon.",
          },
          { act: "click", t: "qs:wifi", say: "Click [Wi-Fi] to turn it on." },
          { act: "look", t: "tray-wifi", say: "The Wi-Fi is [on] again!" },
        ],
      },
      {
        k: "frozen",
        code: "Tip",
        t: "Close and open a program again",
        ic: "❌",
        img: "check-more",
        start: FROZEN,
        steps: [
          { act: "look", t: null, say: "The program is [not responding]." },
          { act: "click", t: "view-close", say: "Close it: click [X]." },
          {
            act: "dbl",
            t: "desk:My story.docx - Shortcut",
            say: "Open it [again].",
          },
          { act: "look", t: null, say: "It [works] again!" },
        ],
      },
      {
        k: "get-help",
        code: "1.4.1",
        t: "Search for help",
        ic: "❓",
        img: "gethelp",
        video: "l4-get-help",
        start: {},
        steps: [
          { act: "click", t: "task-start", say: "Click [Start]." },
          { act: "click", t: "start-all", say: "Click [All]." },
          {
            act: "click",
            t: "app:Get Help",
            say: "Find and click [Get Help].",
          },
          {
            act: "type",
            t: "help-input",
            text: "cannot print",
            say: "Type your problem: [cannot print].",
          },
          { act: "key", t: "key:Enter", key: "Enter", say: "Press [Enter]." },
          { act: "look", t: null, say: "Read the [steps] and follow them." },
        ],
      },
      {
        k: "scan",
        code: "1.4.2",
        t: "Scan for viruses",
        ic: "🛡️",
        img: "security",
        video: "l4-scan",
        start: {},
        steps: [
          { act: "click", t: "task-start", say: "Click [Start]." },
          {
            act: "type",
            t: "start-search",
            text: "Windows Security",
            say: "Type [Windows Security].",
          },
          {
            act: "click",
            t: "app:Windows Security",
            say: "Click [Windows Security].",
          },
          {
            act: "click",
            t: "sec:virus",
            say: "Click [Virus & threat protection].",
          },
          { act: "click", t: "sec:quick", say: "Click [Quick scan]." },
          {
            act: "look",
            t: null,
            wait: 3400,
            say: "The computer is [scanning]. Wait…",
          },
          { act: "click", t: "sec:options", say: "Click [Scan options]." },
          { act: "click", t: "sec:radio:full", say: "Choose [Full scan]." },
          { act: "click", t: "sec:scannow", say: "Click [Scan now]." },
          {
            act: "look",
            t: null,
            wait: 2000,
            say: "A full scan checks [everything]. It takes longer.",
          },
        ],
      },
      {
        k: "update-av",
        code: "1.4.3",
        t: "Update the antivirus",
        ic: "🔄",
        img: "prot-updates",
        video: "l4-update-antivirus",
        start: SEC,
        steps: [
          {
            act: "click",
            t: "sec:updates",
            say: "Click [Protection updates].",
          },
          { act: "click", t: "sec:check", say: "Click [Check for updates]." },
          {
            act: "look",
            t: null,
            wait: 2400,
            say: "Look at [Last update]: today! Now you are protected.",
          },
        ],
      },
      {
        k: "windows-update",
        code: "1.4.4",
        t: "Update Windows",
        ic: "⬆️",
        img: "win-update",
        start: {},
        steps: [
          { act: "click", t: "task-start", say: "Click [Start]." },
          { act: "click", t: "app:Settings", say: "Click [Settings]." },
          {
            act: "click",
            t: "setnav:Windows Update",
            say: "Click [Windows Update].",
          },
          { act: "click", t: "wu:check", say: "Click [Check for updates]." },
          { act: "look", t: null, wait: 2800, say: "You're [up to date]!" },
        ],
      },
      {
        k: "virus",
        code: "Try it",
        t: "Find and remove a virus",
        ic: "🦠",
        img: "security",
        start: { ...SEC, virus: true },
        steps: [
          { act: "click", t: "sec:quick", say: "Click [Quick scan]." },
          {
            act: "look",
            t: null,
            wait: 3400,
            say: "Oh no! The scan found a [virus].",
          },
          { act: "click", t: "sec:remove", say: "Click [Remove]." },
          {
            act: "look",
            t: null,
            say: "The virus is [gone]. The computer is safe!",
          },
        ],
      },
    ],

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
            steps: [{ act: "click", t: "task-start", say: "Click [Start]." }],
          },
          {
            type: "sim",
            start: { pre: [{ act: "click", t: "task-start" }] },
            steps: [
              {
                act: "click",
                t: "start-all",
                say: "Click [All] to see all the apps.",
              },
            ],
          },
          {
            type: "sim",
            start: {
              pre: [
                { act: "click", t: "task-start" },
                { act: "click", t: "start-all" },
              ],
            },
            steps: [
              { act: "click", t: "app:Get Help", say: "Click [Get Help]." },
            ],
          },
          {
            type: "sim",
            start: { pre: [{ act: "click", t: "task-start" }] },
            steps: [
              {
                act: "click",
                t: "start-power",
                say: "Click the [Power] button.",
              },
            ],
          },
          {
            type: "sim",
            start: {
              pre: [
                { act: "click", t: "task-start" },
                { act: "click", t: "start-power" },
              ],
            },
            steps: [
              { act: "click", t: "power:restart", say: "Click [Restart]." },
            ],
          },
          {
            type: "sim",
            start: { app: "Windows Security" },
            steps: [
              {
                act: "click",
                t: "sec:virus",
                say: "Click [Virus & threat protection].",
              },
            ],
          },
          {
            type: "sim",
            start: SEC,
            steps: [
              { act: "click", t: "sec:quick", say: "Click [Quick scan]." },
            ],
          },
          {
            type: "sim",
            start: SEC,
            steps: [
              { act: "click", t: "sec:options", say: "Click [Scan options]." },
            ],
          },
          {
            type: "sim",
            start: SEC,
            steps: [
              {
                act: "click",
                t: "sec:updates",
                say: "Click [Protection updates].",
              },
            ],
          },
          {
            type: "sim",
            start: { ...SEC, secPage: "updates" },
            steps: [
              {
                act: "click",
                t: "sec:check",
                say: "Click [Check for updates].",
              },
            ],
          },
          {
            type: "sim",
            start: { wifi: false },
            steps: [
              {
                act: "click",
                t: "tray-wifi",
                say: "No Internet! Click the [Wi-Fi] icon.",
              },
            ],
          },
          {
            type: "sim",
            start: { settings: "update" },
            steps: [
              {
                act: "click",
                t: "wu:check",
                say: "Click [Check for updates].",
              },
            ],
          },
        ],
      },
      {
        k: "fix",
        t: "What's wrong? Fix it!",
        en: "Choose the best fix",
        ic: "🧰",
        items: [
          {
            type: "mc",
            q: "The screen is black. The battery is [0%].",
            emoji: "🪫",
            opts: [
              "Plug in the charger",
              "Delete a file",
              "Change the background",
            ],
          },
          {
            type: "mc",
            q: "The [Internet] does not work.",
            emoji: "📵",
            opts: ["Check the Wi-Fi", "Rename a file", "Turn up the volume"],
          },
          {
            type: "mc",
            q: "A program is [not responding].",
            emoji: "⏳",
            opts: [
              "Close it and open it again",
              "Empty the Recycle Bin",
              "Change the time",
            ],
          },
          {
            type: "mc",
            q: "The computer is acting [strangely].",
            emoji: "😵",
            opts: ["Restart it", "Make a shortcut", "Change the resolution"],
          },
          {
            type: "mc",
            q: "An email from someone you [don't know].",
            emoji: "📧",
            opts: ["Don't open it", "Open the attachment", "Reply quickly"],
          },
          {
            type: "mc",
            q: "You want to check for [viruses].",
            emoji: "🦠",
            opts: [
              "Run a scan in Windows Security",
              "Restart the printer",
              "Open the volume mixer",
            ],
          },
          {
            type: "mc",
            q: "You don't know how to fix a problem.",
            emoji: "❓",
            opts: ["Use Get Help", "Delete the program", "Unplug the computer"],
          },
        ],
      },
      {
        k: "safe",
        t: "Safe or not safe?",
        en: "True or false",
        ic: "🛡️",
        items: [
          {
            type: "tf",
            q: "A virus is a kind of malware.",
            a: true,
            emoji: "🦠",
          },
          {
            type: "tf",
            q: "Malware can harm phones and tablets too.",
            a: true,
            emoji: "📱",
          },
          {
            type: "tf",
            q: "Update the antivirus often.",
            a: true,
            img: "prot-updates",
          },
          {
            type: "tf",
            q: "It is OK to open emails from people you don't know.",
            a: false,
            img: "email-boy",
          },
          {
            type: "tf",
            q: "You can download games from any website.",
            a: false,
            emoji: "🌐",
            x: "Only download from trusted places. Ask a grown-up.",
          },
          {
            type: "tf",
            q: "A full scan is faster than a quick scan.",
            a: false,
            x: "The quick scan is fast. The full scan checks everything, so it is slow.",
          },
          {
            type: "tf",
            q: "Always say yes to updates.",
            a: true,
            img: "win-update",
          },
        ],
      },
      {
        k: "order",
        t: "Steps in order",
        en: "Put the steps in the right order",
        ic: "🔢",
        items: [
          { type: "order", howto: "get-help" },
          { type: "order", howto: "scan" },
          { type: "order", howto: "update-av" },
          { type: "order", howto: "windows-update" },
          { type: "order", howto: "restart" },
        ],
      },
    ],

    exercises: [
      {
        k: "words",
        t: "Choose the word",
        en: "Book · Hands on 1.1–1.6",
        ic: "🔤",
        from: "Book · Hands on! 1.1–1.6",
        items: [
          {
            type: "mc",
            q: "When a computer isn't working correctly, a simple troubleshooting strategy is to ___ the device.",
            opts: ["restart", "delete", "rename"],
          },
          {
            type: "mc",
            q: "An ___ program is designed to detect and remove malware from your computer.",
            opts: ["antivirus", "email", "Paint"],
            img: "security",
          },
          {
            type: "mc",
            q: "It is important to update your antivirus software regularly to protect your computer from the latest ___.",
            opts: ["viruses", "pictures", "shortcuts"],
            img: "prot-updates",
          },
          {
            type: "mc",
            q: "Running a ___ helps check your computer for any harmful files or programs.",
            opts: ["scan", "restart", "shortcut"],
            img: "scan-options",
          },
          {
            type: "mc",
            q: "Do not open email messages from an unknown ___.",
            opts: ["sender", "computer", "folder"],
            img: "email-boy",
          },
          {
            type: "mc",
            q: "To keep your computer safe, only download ___ from trusted sources.",
            opts: ["files", "viruses", "malware"],
          },
        ],
      },
      {
        k: "choose",
        t: "Choose the answer",
        en: "Book · Hands on 2.1–2.3",
        ic: "✅",
        from: "Book · Hands on! 2.1–2.3",
        items: [
          {
            type: "mc",
            q: "What is the main purpose of antivirus software?",
            opts: [
              "To detect and remove malware",
              "To organize files and folders",
              "To increase the speed of the computer",
            ],
          },
          {
            type: "mc",
            q: "What should you do to make sure your antivirus software works effectively?",
            opts: [
              "Update it regularly",
              "Uninstall it every month",
              "Disable it when using the Internet",
            ],
          },
          {
            type: "mc",
            q: "Which of the following is an example of malware?",
            opts: [
              "A computer virus",
              "A file manager",
              "A spreadsheet application",
            ],
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
            q: "Why is it important to keep your computer safe from viruses? How can checking for updates help protect your computer?",
            a: "Viruses can [harm] files and [copy] your data. Updates teach the antivirus the [new] viruses.",
            img: "security",
          },
        ],
      },
      {
        k: "handson",
        t: "Do it on the computer",
        en: "Book · Hands on 4.1",
        ic: "🖥️",
        from: "Book · Hands on! 4.1 · The screen freezes while playing a video",
        items: [
          {
            type: "sim",
            q: "1. Use Get Help to solve the problem.",
            start: {},
            steps: [
              { act: "click", t: "task-start", say: "Click [Start]." },
              { act: "click", t: "start-all", say: "Click [All]." },
              { act: "click", t: "app:Get Help", say: "Click [Get Help]." },
              {
                act: "type",
                t: "help-input",
                text: "screen freezes",
                say: "Type your question: [screen freezes].",
              },
              {
                act: "key",
                t: "key:Enter",
                key: "Enter",
                say: "Press [Enter].",
              },
              {
                act: "look",
                t: null,
                say: "Read the steps. Write what you learn in your [notebook].",
              },
            ],
          },
          {
            type: "sim",
            q: "2. Check for viruses.",
            start: {},
            steps: [
              { act: "click", t: "task-start", say: "Click [Start]." },
              {
                act: "type",
                t: "start-search",
                text: "Windows Security",
                say: "Type [Windows Security].",
              },
              {
                act: "click",
                t: "app:Windows Security",
                say: "Click [Windows Security].",
              },
              {
                act: "click",
                t: "sec:virus",
                say: "Click [Virus & threat protection].",
              },
              { act: "click", t: "sec:quick", say: "Click [Quick scan]." },
              {
                act: "look",
                t: null,
                wait: 3400,
                say: "Wait for the scan to finish.",
              },
            ],
          },
          {
            type: "sim",
            q: "3. Update your antivirus program.",
            start: SEC,
            steps: [
              {
                act: "click",
                t: "sec:updates",
                say: "Click [Protection updates].",
              },
              {
                act: "click",
                t: "sec:check",
                say: "Click [Check for updates].",
              },
              {
                act: "look",
                t: null,
                wait: 2400,
                say: "Write the [last update] date in your notebook.",
              },
            ],
          },
        ],
      },
    ],
  };
})();
