// Computer · Grade 3 · Unit 1 · Lesson 4 « Interacting » (book pages 23–29).
// All the content of the lesson. Same format as lesson-1.js. The "Unit 1 review" exercise is the
// school's "My Devices" assessment, which asks about all four lessons.
window.LESSON = {
  n: 4,
  grade: 3,
  title: "Interacting",
  unit: "Unit 1 · Lesson 4",
  book: "Book pages 23–29",
  cover: "gamepad",
  question: {
    q: "How have devices [changed] the way we use computers? What is [good] about them, and what is [hard]?",
    a: "Now we can use [touch], a [pen], [game controllers], [VR] and our [voice]. Computers are easier and more fun for [everyone].",
    img: "touchpad",
  },

  ideas: [
    {
      t: "Many ways to use a computer",
      lines: [
        "A [keyboard] and a [mouse] are not the only ways!",
        "We can touch, draw, play, move and talk to computers.",
      ],
      vis: { kind: "emoji", e: "⌨️ 🖱️ 👆 🎮 🥽 🎤" },
    },
    {
      t: "Touchpad",
      lines: [
        "Laptops have a [touchpad]. It can [replace the mouse].",
        "Move your finger: the cursor moves.",
        "Some touchpads [zoom] with two fingers.",
      ],
      img: "touchpad",
    },
    {
      t: "Touchscreen",
      lines: [
        "Give commands by [touching] the screen.",
        "Tablets, smartphones and game consoles have touchscreens.",
        "A [screen protector] keeps it safe from scratches.",
      ],
      img: "protector",
    },
    {
      t: "Stylus",
      lines: [
        "A [stylus] looks like a [pen].",
        "Select things or [draw] on the touchscreen.",
        "One end has a precise tip, the other end a digital [eraser].",
      ],
      img: "stylus",
    },
    {
      t: "Graphic tablet",
      lines: [
        "Also called a [digitizer].",
        "[Draw] by hand, like with a pencil and paper.",
        "[Graphic designers] love it.",
      ],
      img: "graphic-tablet",
    },
    {
      t: "Trackball",
      lines: [
        "It looks like an [upside-down mouse] with a ball.",
        "Roll the ball with your [fingers] or [palm].",
      ],
      img: "trackball",
    },
    {
      t: "Game pad",
      lines: [
        "A [game controller] with buttons and [thumbsticks].",
        "Also called a joypad or control pad.",
      ],
      img: "gamepad",
    },
    {
      t: "Driving wheel",
      lines: [
        "A special game pad for [car driving] games.",
        "Game pads come in [different forms].",
      ],
      img: "wheel",
    },
    {
      t: "Joystick",
      lines: [
        "A big place to [grip] with your hand, and buttons.",
        "For [flight simulators] and action games.",
      ],
      img: "joystick",
    },
    {
      t: "VR headset",
      lines: [
        "[Virtual reality] (VR): a place made by a computer.",
        "Wear the headset over your [eyes]. You feel like you are there!",
        "It has buttons and motion controls.",
      ],
      img: "vr-headset",
    },
    {
      t: "VR glove",
      lines: [
        "It looks like a simple [glove].",
        "See your [hand] move in VR and feel you are touching things.",
        "Used in virtual reality and [robotics].",
      ],
      img: "vr-glove",
    },
    {
      t: "Assistive technology",
      lines: [
        "Special tools for people who have trouble [seeing], [hearing], [moving] or [learning].",
        "[Everyone] can use them!",
      ],
      vis: { kind: "emoji", e: "♿ 👂 👓" },
    },
    {
      t: "Speech recognition",
      lines: [
        "Control the computer with your [voice].",
        "Open apps, write and search the Internet by speaking.",
        "It helps people who find a keyboard or mouse [hard].",
      ],
      img: "speech",
    },
    {
      t: "Braille keyboard",
      lines: [
        "The keys have [raised dots].",
        "For people who are [blind] or can't see well.",
        "They [feel] the dots with their fingers.",
      ],
      img: "braille",
    },
    {
      t: "Head mouse",
      lines: [
        "For people who [can't use their hands].",
        "Move your [head]: the cursor moves.",
      ],
      img: "head-mouse",
    },
  ],

  games: [
    {
      k: "touch",
      t: "Touch practice",
      en: "Tap, swipe, zoom and draw",
      ic: "👆",
      items: [
        {
          type: "touch",
          g: "tap",
          q: "A touchscreen: [tap] the star 3 times.",
          x: "[Tap] = touch the screen one time.",
        },
        {
          type: "touch",
          g: "swipe",
          q: "[Swipe] to see the next picture.",
          pics: ["gamepad", "joystick", "vr-headset", "trackball"],
          x: "[Swipe] = slide your finger across the screen.",
        },
        {
          type: "touch",
          g: "pinch",
          q: "[Zoom in] with two fingers to see the dots.",
          img: "braille",
          x: "Two fingers apart = [zoom in]. Together = zoom out.",
        },
        {
          type: "touch",
          g: "draw",
          q: "Draw on the screen like with a [stylus].",
          x: "A [stylus] is a pen for touchscreens.",
        },
      ],
    },
    {
      k: "which",
      t: "Which device?",
      en: "Choose the right device",
      ic: "🎮",
      items: [
        {
          type: "mc",
          q: "You want to [draw] pictures by hand on the computer.",
          opts: ["Graphic tablet", "Joystick", "Trackball"],
          pics: ["graphic-tablet", "joystick", "trackball"],
        },
        {
          type: "mc",
          q: "You play a [flight] game.",
          opts: ["Joystick", "Braille keyboard", "Touchpad"],
          pics: ["joystick", "braille", "touchpad"],
        },
        {
          type: "mc",
          q: "It looks like an [upside-down mouse].",
          opts: ["Trackball", "Game pad", "Stylus"],
          pics: ["trackball", "gamepad", "stylus"],
        },
        {
          type: "mc",
          q: "You play a [car race] game.",
          opts: ["Driving wheel", "Graphic tablet", "VR glove"],
          pics: ["wheel", "graphic-tablet", "vr-glove"],
        },
        {
          type: "mc",
          q: "You use a laptop [without a mouse].",
          opts: ["Touchpad", "Joystick", "Driving wheel"],
          pics: ["touchpad", "joystick", "wheel"],
        },
        {
          type: "mc",
          q: "You want to [feel] things in virtual reality.",
          opts: ["VR glove", "Trackball", "Stylus"],
          pics: ["vr-glove", "trackball", "stylus"],
        },
        {
          type: "mc",
          q: "It has buttons and [thumbsticks].",
          opts: ["Game pad", "Head mouse", "Touchpad"],
          pics: ["gamepad", "head-mouse", "touchpad"],
        },
      ],
    },
    {
      k: "helps",
      t: "Who does it help?",
      en: "Assistive technology",
      ic: "🤝",
      items: [
        {
          type: "place",
          q: "Maya is [blind]. Which keyboard helps her type?",
          thing: { emoji: "👧🏽", label: "Maya can't see" },
          spots: [
            { t: "Braille keyboard", img: "braille" },
            { t: "Joystick", img: "joystick" },
            { t: "Game pad", img: "gamepad" },
          ],
        },
        {
          type: "place",
          q: "Omar [can't use his hands]. What helps him move the cursor?",
          thing: { emoji: "👦🏻", label: "Omar can't use his hands" },
          spots: [
            { t: "Head mouse", img: "head-mouse" },
            { t: "Trackball", img: "trackball" },
            { t: "Stylus", img: "stylus" },
          ],
        },
        {
          type: "place",
          q: "Sara finds [typing hard]. She wants to write with her voice.",
          thing: { emoji: "👩🏼", label: "Sara finds typing hard" },
          spots: [
            { t: "Speech recognition", img: "speech" },
            { t: "Graphic tablet", img: "graphic-tablet" },
            { t: "Driving wheel", img: "wheel" },
          ],
        },
      ],
    },
    {
      k: "order",
      t: "How a touchscreen works",
      en: "Put the steps in order",
      ic: "🔢",
      items: [
        {
          type: "order",
          t: "Use a [touchscreen]",
          steps: [
            { say: "The user taps or swipes the touchscreen." },
            { say: "The computer processes the input." },
            { say: "The device shows the requested action." },
            { say: "The user sees the new screen." },
          ],
        },
      ],
    },
    {
      k: "match",
      t: "Match",
      en: "Pictures and names",
      ic: "🔗",
      items: [
        {
          type: "match",
          pairs: [
            { img: "touchpad", label: "Touchpad" },
            { img: "stylus", label: "Stylus" },
            { img: "graphic-tablet", label: "Graphic tablet" },
            { img: "trackball", label: "Trackball" },
            { img: "joystick", label: "Joystick" },
            { img: "vr-headset", label: "VR headset" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "gamepad", label: "Game pad" },
            { img: "wheel", label: "Driving wheel" },
            { img: "vr-glove", label: "VR glove" },
            { img: "speech", label: "Speech recognition" },
            { img: "braille", label: "Braille keyboard" },
            { img: "head-mouse", label: "Head mouse" },
          ],
        },
      ],
    },
  ],

  exercises: [
    {
      k: "words",
      t: "Choose the word",
      en: "Book · Hands on 1.1–1.5",
      ic: "🔤",
      from: "Book · Hands on! 1.1–1.5",
      items: [
        {
          type: "mc",
          q: "A ___ makes you feel as if you are in a different world by creating a virtual reality experience. It is worn over the eyes.",
          opts: ["VR headset", "VR glove", "joystick"],
        },
        {
          type: "mc",
          q: "A ___ is a device often used in flight simulators or action games.",
          opts: ["joystick", "stylus", "touchscreen"],
        },
        {
          type: "mc",
          q: "A ___ lets you give commands by touching the monitor with your fingers.",
          opts: ["touchscreen", "trackball", "VR glove"],
        },
        {
          type: "mc",
          q: "A ___ is a pen-like tool with precise tips that helps you interact with touchscreens.",
          opts: ["stylus", "joystick", "VR headset"],
        },
        {
          type: "mc",
          q: "A ___ is a wearable device that allows users to interact with virtual environments by providing hand and motion control.",
          opts: ["VR glove", "stylus", "touchscreen"],
        },
      ],
    },
    {
      k: "means",
      t: "What does it do?",
      en: "Book · Hands on 2.1–2.3",
      ic: "✅",
      from: "Book · Hands on! 2.1–2.3",
      items: [
        {
          type: "mc",
          q: "[Touchscreen]",
          img: "protector",
          opts: [
            "Allows users to interact with a computer by touching the screen.",
            "Used for designing or drawing by hand.",
            "A controller that is commonly used in flight simulation games.",
          ],
        },
        {
          type: "mc",
          q: "[Joystick]",
          img: "joystick",
          opts: [
            "A controller that is commonly used in flight simulation games.",
            "Used for designing or drawing by hand.",
            "Allows users to interact with a computer by touching the screen.",
          ],
        },
        {
          type: "mc",
          q: "[Graphic tablet]",
          img: "graphic-tablet",
          opts: [
            "Used for designing or drawing by hand.",
            "A controller that is commonly used in flight simulation games.",
            "Allows users to interact with a computer by touching the screen.",
          ],
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
          q: "Speech recognition technology allows people to control devices and type text using their voice.",
          a: true,
          img: "speech",
        },
        {
          type: "tf",
          q: "A head mouse is a device used by people who cannot use their hands, tracking head movements instead.",
          a: true,
          img: "head-mouse",
        },
        {
          type: "tf",
          q: "Braille keyboards are designed for people who are visually impaired or blind. They have raised dots.",
          a: true,
          img: "braille",
        },
        {
          type: "tf",
          q: "Assistive technologies are only useful for people who have physical disabilities.",
          a: false,
          x: "[Everyone] can benefit from them.",
          vis: { kind: "emoji", e: "♿ 👂 👓" },
        },
        {
          type: "tf",
          q: "A VR glove is used to make typing on a keyboard more accurate for people who cannot hear.",
          a: false,
          img: "vr-glove",
          x: "A VR glove puts your [hand] into virtual reality.",
        },
      ],
    },
    {
      k: "think",
      t: "Think and answer",
      en: "Book · Hands on 4–5",
      ic: "💭",
      from: "Book · Hands on! 4–5",
      items: [
        {
          type: "open",
          q: "You are working on a digital drawing. You have a graphic tablet, a touchscreen and a mouse. Which one would you choose? Why?",
          a: "The [graphic tablet], because you can draw by hand, like with a [pencil] and paper.",
          img: "graphic-tablet",
        },
        {
          type: "open",
          q: "Design your own tool to help people use a computer. How does it work? Who does it help?",
          a: "For example: [glasses] that move the cursor when you [blink]. They help people who [can't use their hands].",
          vis: { kind: "emoji", e: "💡 🛠️" },
        },
      ],
    },
    {
      k: "hw2",
      t: "Graded Homework 2",
      en: "Interacting",
      ic: "📝",
      from: "Graded Homework (2)",
      items: [
        {
          type: "tf",
          q: "VR stands for Virtual Reality.",
          a: true,
          img: "vr-headset",
        },
        {
          type: "tf",
          q: "The trackball and the stylus are input devices.",
          a: true,
          img: "trackball",
        },
        {
          type: "tf",
          q: "A stylus is used for drawing and writing.",
          a: true,
          img: "stylus",
        },
        {
          type: "tf",
          q: "VR headset and VR glove are used only for games.",
          a: false,
          img: "vr-glove",
          x: "The VR glove is also used in [robotics].",
        },
        {
          type: "tf",
          q: "A Braille keyboard is made for anyone.",
          a: false,
          img: "braille",
          x: "It is made for people who are [blind] or can't see well.",
        },
        {
          type: "mc",
          q: "Who uses a [Braille] keyboard?",
          opts: ["People who are blind or can't see well", "Anyone"],
          img: "braille",
        },
        {
          type: "mc",
          q: "Who can [speech recognition] help?",
          opts: ["People who have trouble typing", "Students in exams"],
          img: "speech",
        },
        {
          type: "mc",
          q: "Who can use a [head mouse]?",
          opts: [
            "People who cannot use their hands",
            "People who move the pointer",
          ],
          img: "head-mouse",
        },
        {
          type: "multi",
          q: "Choose the [assistive technology].",
          opts: [
            { t: "Speech recognition", img: "speech", ok: true },
            { t: "Braille keyboard", img: "braille", ok: true },
            { t: "Head mouse", img: "head-mouse", ok: true },
            { t: "Rainbow keyboard", emoji: "⌨️🌈" },
          ],
        },
      ],
    },
    {
      k: "pa3",
      t: "Practical Assessment 3",
      en: "Booklet · Interacting A",
      ic: "📒",
      from: "Booklet · Practical Assessment (3)",
      items: [
        {
          type: "mc",
          q: "You use the ___ instead of the mouse with the laptop.",
          opts: ["touchpad", "touch keyboard"],
          img: "touchpad",
        },
        {
          type: "mc",
          q: "It can replace the mouse:",
          opts: ["touchpad", "computer case"],
        },
        {
          type: "mc",
          q: "You can use me instead of your finger on the touchscreen.",
          opts: ["stylus", "red pen"],
          img: "stylus",
        },
        {
          type: "mc",
          q: "The ___ is popular among graphic designers.",
          opts: ["graphic tablet", "graphic organizer"],
          img: "graphic-tablet",
        },
        {
          type: "mc",
          q: "The ___ resembles an upside-down mouse.",
          opts: ["trackball", "stylus"],
          img: "trackball",
        },
        {
          type: "mc",
          q: "A ___ comes in different forms.",
          opts: ["game pad", "touchscreen"],
          img: "wheel",
        },
        {
          type: "tf",
          q: "A trackball is an input device.",
          a: true,
          img: "trackball",
        },
        {
          type: "tf",
          q: "Graphic tablets (digitizers) are input devices.",
          a: true,
          img: "graphic-tablet",
        },
        {
          type: "tf",
          q: "You use a stylus without a touchscreen.",
          a: false,
          img: "stylus",
          x: "A stylus works [on a touchscreen].",
        },
        {
          type: "multi",
          q: "Choose all the devices you can [interact] with when you work on the computer.",
          opts: [
            { t: "Touchscreen", ok: true },
            { t: "Trackball", ok: true },
            { t: "Stylus", ok: true },
            { t: "Book" },
            { t: "Digitizer", ok: true },
            { t: "Game pad", ok: true },
          ],
        },
      ],
    },
    {
      k: "pa4",
      t: "Practical Assessment 4",
      en: "Booklet · Interacting B",
      ic: "📒",
      from: "Booklet · Practical Assessment (4)",
      items: [
        {
          type: "tf",
          q: "VR stands for Virtual Reality.",
          a: true,
          img: "vr-headset",
        },
        {
          type: "tf",
          q: "A VR glove resembles a simple glove.",
          a: true,
          img: "vr-glove",
        },
        {
          type: "tf",
          q: "Assistive technology is designed for people who have trouble seeing, hearing, moving or learning.",
          a: true,
          vis: { kind: "emoji", e: "♿ 👂 👓" },
        },
        {
          type: "tf",
          q: "Speech recognition is useful for people who have difficulty using a keyboard or a mouse.",
          a: true,
          img: "speech",
        },
        {
          type: "mc",
          q: "People who have trouble [seeing] use a:",
          opts: ["Braille keyboard", "Joystick", "Game pad"],
          pics: ["braille", "joystick", "gamepad"],
        },
        {
          type: "multi",
          q: "Choose the signs made for people who have trouble [seeing], [hearing] or [moving].",
          opts: [
            { t: "Wheelchair", emoji: "♿", ok: true },
            { t: "Ear", emoji: "👂", ok: true },
            { t: "Glasses", emoji: "👓", ok: true },
            { t: "No food", emoji: "🚫🍔" },
            { t: "Game zone", emoji: "🎮" },
            { t: "Restaurant", emoji: "🍴" },
          ],
        },
        {
          type: "match",
          pairs: [
            { img: "braille", label: "Raised dots" },
            { img: "speech", label: "Open apps with your voice" },
            { img: "head-mouse", label: "Move the cursor with your head" },
          ],
        },
      ],
    },
    {
      k: "review",
      t: "Unit 1 review",
      en: "Assessments · My Devices, Interacting",
      ic: "🏆",
      from: "Assessment · My Devices · Interacting",
      items: [
        {
          type: "mc",
          q: "Which device is most used in supermarkets to print receipts?",
          opts: ["Thermal printer", "Inkjet printer", "Laser printer"],
        },
        {
          type: "mc",
          q: "What is the main purpose of a microphone in a computer?",
          opts: [
            "To capture sound and record audio",
            "To print high-quality images",
            "To store data permanently",
          ],
        },
        {
          type: "mc",
          q: "Which input device allows a user to control a computer by touching the screen directly?",
          opts: ["Touchscreen", "Keyboard", "Mouse"],
        },
        {
          type: "mc",
          q: "Which of the following is an example of an assistive technology?",
          opts: [
            "A Braille keyboard for visually impaired users",
            "A device that provides sound for music",
            "A printer that prints color images",
          ],
        },
        {
          type: "mc",
          q: "Which of the following is NOT a data storage device?",
          opts: ["Joystick", "Memory card", "USB flash drive"],
          pics: ["joystick", null, null],
        },
        {
          type: "mc",
          q: "A ___ is a type of interactive device that lets you see a 3D digital world by wearing it.",
          opts: ["VR headset", "web camera", "trackball"],
        },
        {
          type: "mc",
          q: "If you want to control your computer by swiping, tapping or pinching the screen, you would use a ___.",
          opts: ["touchscreen", "joystick", "camera"],
        },
        {
          type: "mc",
          q: "Blu-ray disc is…",
          opts: [
            "A disc that can store high-definition movies and large amounts of data",
            "A small, portable device used in smartphones and cameras",
            "A disc that stores music or documents but has less space than a DVD",
          ],
        },
        {
          type: "mc",
          q: "External hard drive is…",
          opts: [
            "A device with the largest storage capacity, used for backing up files",
            "A disc that stores music or documents but has less space than a DVD",
            "A small, portable device used in smartphones and cameras",
          ],
        },
        {
          type: "mc",
          q: "CD is…",
          opts: [
            "A disc that stores music or documents but has less space than a DVD",
            "A device with the largest storage capacity, used for backing up files",
            "A disc that can store high-definition movies",
          ],
        },
        {
          type: "mc",
          q: "Memory card is…",
          opts: [
            "A small, portable device often used in smartphones and cameras",
            "A disc that can store high-definition movies",
            "A device with the largest storage capacity",
          ],
        },
        {
          type: "mc",
          q: "Which device helps people with visual impairments type using touch?",
          opts: ["Braille keyboard", "Stylus", "Game pad", "Touchpad"],
        },
        {
          type: "mc",
          q: "Which device helps you play games and has buttons and thumbsticks?",
          opts: ["Game pad", "Trackball", "Stylus", "Touchpad"],
        },
        {
          type: "mc",
          q: "What is the device called that makes you feel like you are in a different place using a computer?",
          opts: ["VR headset", "Mouse", "Stylus", "Trackball"],
        },
        {
          type: "mc",
          q: "Which device resembles a glove and lets you feel objects in virtual reality?",
          opts: ["VR glove", "Trackball", "Stylus", "Game pad"],
        },
        {
          type: "mc",
          q: "What device is used for drawing images on a computer like using a pencil on paper?",
          opts: ["Graphic tablet", "Game pad", "Joystick", "Trackball"],
        },
        {
          type: "order",
          t: "Use a [touchscreen] to interact with a device",
          steps: [
            { say: "The user taps or swipes the touchscreen." },
            { say: "The computer processes the input." },
            { say: "The device responds by displaying the requested action." },
            {
              say: "The user views or interacts with the new screen or action.",
            },
          ],
        },
      ],
    },
  ],
};
