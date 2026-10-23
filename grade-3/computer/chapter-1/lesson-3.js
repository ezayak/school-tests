// Computer · Grade 3 · Unit 1 · Lesson 3 « Capture » (book pages 18–22).
// All the content of the lesson. Same format as lesson-1.js.
window.LESSON = {
  n: 3,
  grade: 3,
  title: "Capture",
  unit: "Unit 1 · Lesson 3",
  book: "Book pages 18–22",
  cover: "video-camera",
  question: {
    q: "Why are [microphones] and [cameras] important? How do they help us save [special moments]?",
    a: "They [capture] sound, photos and videos. We [keep] them on the computer and [share] them with family and friends.",
    img: "webcam",
  },

  ideas: [
    {
      t: "Capture devices",
      lines: [
        "Some devices [capture] sound, videos and pictures.",
        "Microphones, webcams, digital cameras, smartphones and video cameras.",
      ],
      vis: {
        kind: "strip",
        items: [
          { img: "mic-ic", label: "Microphone" },
          { img: "webcam-ic", label: "Webcam" },
          { img: "camera-ic", label: "Camera" },
          { e: "📱", label: "Smartphone" },
          { img: "vcam-ic", label: "Video camera" },
        ],
      },
    },
    {
      t: "Microphone",
      lines: [
        "A [microphone] captures [sound], like your voice.",
        "Your voice is saved as an [audio file].",
        "Listen to it any time, or send it to a friend.",
      ],
      img: "mic-ic",
    },
    {
      t: "Talk to a friend",
      lines: [
        "Use a [microphone] to speak.",
        "Use [headphones] to listen to your friend.",
        "Microphones are in phones, karaoke, movies, radio and TV.",
      ],
      img: "girl-headset",
    },
    {
      t: "Web camera",
      lines: [
        "[Web camera] = [webcam].",
        "It sends [live video] into the computer.",
        "Use it to make [video calls].",
      ],
      img: "webcam",
    },
    {
      t: "More about webcams",
      lines: [
        "Most laptops have a [built-in] webcam and microphone.",
        "The name comes from the World Wide [Web].",
        "Webcams are also used as [security cameras].",
      ],
      vis: { kind: "emoji", e: "💻 🌐 🏠" },
    },
    {
      t: "Digital camera",
      lines: [
        "It takes [high-definition] photos.",
        "You see the photo on its screen [right away].",
        "Photos are saved on a [memory card].",
      ],
      img: "camera-ic",
    },
    {
      t: "Move your photos",
      lines: [
        "Use the [memory card] to move photos to the [computer].",
        "Keep the lens [clean] with a soft cloth.",
      ],
      img: "girl-camera",
    },
    {
      t: "Smartphone",
      lines: [
        "Many capture tools in [one] device!",
        "A [camera] for photos and videos, a [microphone] for your voice.",
        "You can make [video calls].",
      ],
      vis: { kind: "emoji", e: "📱 📷 🎤" },
    },
    {
      t: "Video camera",
      lines: [
        "A [video camera] records [moving pictures].",
        "Long ago: videotapes and CDs. Today: [memory cards].",
        "We record parties, TV shows and movies.",
      ],
      img: "video-camera",
    },
    {
      t: "Then and now",
      lines: [
        "The first video cameras were [big], [heavy] and low quality.",
        "Today they are [small] and easy to use. Some record at [night]!",
      ],
      img: "boy-film",
    },
    {
      t: "History",
      lines: [
        "[John Logie Baird] made the first video cameras.",
        "The [BBC] used them in the [1930s].",
      ],
      vis: { kind: "emoji", e: "📺 🎥" },
    },
    {
      t: "Keep copies!",
      lines: ["Don't forget to keep [copies] of your photos and videos!"],
      vis: { kind: "emoji", e: "📸 ➜ 💾" },
    },
  ],

  games: [
    {
      k: "studio",
      t: "Capture studio",
      en: "Pick the device for each job",
      ic: "🎬",
      items: [
        {
          type: "place",
          q: "Make a [video] of a family party.",
          thing: { emoji: "🎉", label: "Family party" },
          spots: [
            { t: "Video camera", img: "vcam-ic" },
            { t: "Microphone", img: "mic-ic" },
            { t: "Printer", emoji: "🖨️" },
          ],
        },
        {
          type: "place",
          q: "[Video call] your friend on the computer.",
          thing: { emoji: "👋", label: "Video call" },
          spots: [
            { t: "Webcam", img: "webcam-ic" },
            { t: "Microphone only", img: "mic-ic" },
            { t: "Memory card", emoji: "💾" },
          ],
        },
        {
          type: "place",
          q: "[Record your voice] for a song.",
          thing: { emoji: "🗣️", label: "Your voice" },
          spots: [
            { t: "Microphone", img: "mic-ic" },
            { t: "Digital camera", img: "camera-ic" },
            { t: "Webcam", img: "webcam-ic" },
          ],
        },
        {
          type: "place",
          q: "Take [photographs] on a trip.",
          thing: { emoji: "🏖️", label: "A trip" },
          spots: [
            { t: "Digital camera", img: "camera-ic" },
            { t: "Microphone", img: "mic-ic" },
            { t: "Printer", emoji: "🖨️" },
          ],
        },
        {
          type: "place",
          q: "Watch the front door, like a [security camera].",
          thing: { emoji: "🏠", label: "Front door" },
          spots: [
            { t: "Webcam", img: "webcam-ic" },
            { t: "Microphone", img: "mic-ic" },
            { t: "Memory card", emoji: "💾" },
          ],
        },
        {
          type: "place",
          q: "Sing [karaoke].",
          thing: { emoji: "🎶", label: "Karaoke" },
          spots: [
            { t: "Microphone", img: "mic-ic" },
            { t: "Video camera", img: "vcam-ic" },
            { t: "Digital camera", img: "camera-ic" },
          ],
        },
      ],
    },
    {
      k: "spv",
      t: "Sound, photo or video?",
      en: "What does it capture?",
      ic: "🔊",
      items: [
        {
          type: "place",
          q: "What does a [microphone] capture?",
          thing: { img: "mic-ic", label: "Microphone" },
          spots: [
            { t: "Sound", emoji: "🔊" },
            { t: "Photo", emoji: "🖼️" },
            { t: "Video", emoji: "🎬" },
          ],
        },
        {
          type: "place",
          q: "What does a [digital camera] take?",
          thing: { img: "camera-ic", label: "Digital camera" },
          spots: [
            { t: "Photo", emoji: "🖼️" },
            { t: "Sound only", emoji: "🔊" },
            { t: "Receipts", emoji: "🧾" },
          ],
        },
        {
          type: "place",
          q: "What does a [video camera] record?",
          thing: { img: "vcam-ic", label: "Video camera" },
          spots: [
            { t: "Video", emoji: "🎬" },
            { t: "Sound only", emoji: "🔊" },
            { t: "Receipts", emoji: "🧾" },
          ],
        },
        {
          type: "place",
          q: "What does a [webcam] send to the computer?",
          thing: { img: "webcam-ic", label: "Webcam" },
          spots: [
            { t: "Live video", emoji: "🎬" },
            { t: "Paper", emoji: "📄" },
            { t: "Sound only", emoji: "🔊" },
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
            { img: "mic-ic", label: "Microphone" },
            { img: "webcam-ic", label: "Webcam" },
            { img: "camera-ic", label: "Digital camera" },
            { img: "vcam-ic", label: "Video camera" },
            { emoji: "📱", label: "Smartphone" },
          ],
        },
      ],
    },
    {
      k: "tf",
      t: "True or false?",
      en: "Capture facts",
      ic: "✅",
      items: [
        {
          type: "tf",
          q: "A microphone captures sound.",
          a: true,
          img: "mic-ic",
        },
        {
          type: "tf",
          q: "A webcam is used for video calls.",
          a: true,
          img: "webcam",
        },
        {
          type: "tf",
          q: "A digital camera saves photos on a memory card.",
          a: true,
          img: "camera-ic",
        },
        {
          type: "tf",
          q: "A smartphone can only make phone calls.",
          a: false,
          emoji: "📱",
          x: "It has a [camera] and a [microphone] too.",
        },
        {
          type: "tf",
          q: "Today video cameras are big and heavy.",
          a: false,
          img: "video-camera",
          x: "The [first] ones were big. Today they are [small].",
        },
        {
          type: "tf",
          q: "Clean the camera lens with a soft cloth.",
          a: true,
          img: "girl-camera",
        },
      ],
    },
  ],

  exercises: [
    {
      k: "handson",
      t: "True or false",
      en: "Book · Hands on 1.1–1.5",
      ic: "✅",
      from: "Book · Hands on! 1.1–1.5",
      items: [
        {
          type: "tf",
          q: "A digital camera captures video for live chats and video calls.",
          a: false,
          img: "camera-ic",
          x: "A [webcam] is used for live chats and video calls.",
        },
        {
          type: "tf",
          q: "The main use of a webcam is to take videos for later editing and sharing.",
          a: false,
          img: "webcam",
          x: "A webcam is mostly for [live] video, like video calls.",
        },
        {
          type: "tf",
          q: "A microphone is used to record voice for videos.",
          a: true,
          img: "mic-ic",
        },
        {
          type: "tf",
          q: "The first video cameras were light and the resulting video was of high quality.",
          a: false,
          img: "boy-film",
          x: "They were [heavy] and the quality was [low].",
        },
        {
          type: "tf",
          q: "You can use a smartphone's camera to take photos or record videos.",
          a: true,
          emoji: "📱",
        },
      ],
    },
    {
      k: "words",
      t: "Choose the word",
      en: "Book · Hands on 2.1–2.3",
      ic: "🔤",
      from: "Book · Hands on! 2.1–2.3",
      items: [
        {
          type: "mc",
          q: "A ___ captures sound and turns it into digital audio files.",
          opts: ["microphone", "webcam", "printer"],
        },
        {
          type: "mc",
          q: "A microphone captures sound and turns it into digital ___ files.",
          opts: ["audio", "photo", "video"],
        },
        {
          type: "mc",
          q: "A ___ is used to capture live video for video calls.",
          opts: ["webcam", "microphone", "scanner"],
        },
        {
          type: "mc",
          q: "A webcam is used to capture live ___ for video calls.",
          opts: ["video", "sound only", "receipts"],
        },
        {
          type: "mc",
          q: "A ___ camera can take high-definition photos and store them on a memory card.",
          opts: ["digital", "web", "video"],
        },
      ],
    },
    {
      k: "use",
      t: "What is it for?",
      en: "Book · Hands on 3.1–3.4",
      ic: "🎯",
      from: "Book · Hands on! 3.1–3.4",
      items: [
        {
          type: "mc",
          q: "What do you use this for?",
          img: "mic-ic",
          opts: [
            "Recording your voice",
            "Making a video of a family party",
            "Video calling your friend",
            "Taking photographs on a trip",
          ],
        },
        {
          type: "mc",
          q: "What do you use this for?",
          img: "vcam-ic",
          opts: [
            "Making a video of a family party",
            "Video calling your friend",
            "Recording your voice",
            "Taking photographs on a trip",
          ],
        },
        {
          type: "mc",
          q: "What do you use this for?",
          img: "camera-ic",
          opts: [
            "Taking photographs on a trip",
            "Making a video of a family party",
            "Video calling your friend",
            "Recording your voice",
          ],
        },
        {
          type: "mc",
          q: "What do you use this for?",
          img: "webcam-ic",
          opts: [
            "Video calling your friend",
            "Making a video of a family party",
            "Recording your voice",
            "Taking photographs on a trip",
          ],
        },
      ],
    },
    {
      k: "think",
      t: "Think and answer",
      en: "Book · Hands on 4",
      ic: "💭",
      from: "Book · Hands on! 4",
      items: [
        {
          type: "open",
          q: "Which of these capture devices do you have at [home]?",
          a: "For example: a [smartphone], a [laptop webcam], a [microphone].",
          vis: { kind: "emoji", e: "🏠" },
        },
        {
          type: "open",
          q: "Which capture devices do you have at [school]?",
          a: "For example: [webcams] on the computers, a [microphone], a [camera].",
          vis: { kind: "emoji", e: "🏫" },
        },
      ],
    },
    {
      k: "test",
      t: "Assessment questions",
      en: "My Devices · capture",
      ic: "📝",
      from: "Assessment · My Devices",
      items: [
        {
          type: "mc",
          q: "What is the main purpose of a microphone in a computer?",
          opts: [
            "To capture sound and record audio",
            "To print high-quality images",
            "To store data permanently",
          ],
          img: "mic-ic",
        },
        {
          type: "mc",
          q: "A ___ is a device used to capture digital images and send them directly to a computer for video calls or streaming.",
          opts: ["web camera", "printer", "joystick"],
        },
        {
          type: "mc",
          q: "A device used to capture still images and videos is a ___.",
          opts: ["camera", "touchscreen", "speaker"],
        },
      ],
    },
  ],
};
