// Computer lessons for Grade 3, all terms. One entry per chapter (a folder chapter-N/ with its lessons);
// add one entry per lesson (and its files to "also" in games.js for offline use).
// path and cover are relative to the chapter folder.
window.CS_LESSONS = {
  grade: 3,
  intro:
    "Pick a lesson. Each lesson has big pictures from the book, games, and the school exercises. Everything can be read aloud.",
  chapters: [
    {
      n: 1,
      dir: "chapter-1",
      items: [
        {
          n: 1,
          title: "Storage",
          en: "Hard disk, USB flash drive, memory card, CD / DVD, Blu-ray",
          path: "lesson-1.html",
          cover: "img/lesson-1/usb.jpg",
          note: "9 picture cards · 5 games · 2 exercises",
        },
        {
          n: 2,
          title: "Print",
          en: "Inkjet, laser, thermal, 3D, dot matrix, plotter, scanner",
          path: "lesson-2.html",
          cover: "img/lesson-2/desk-printer.jpg",
          note: "13 picture cards · 4 videos · 4 games · 7 exercises",
        },
        {
          n: 3,
          title: "Capture",
          en: "Microphone, webcam, digital camera, smartphone, video camera",
          path: "lesson-3.html",
          cover: "img/lesson-3/video-camera.jpg",
          note: "12 picture cards · 4 games · 5 exercises",
        },
        {
          n: 4,
          title: "Interacting",
          en: "Touchpad, touchscreen, stylus, game controllers, VR, assistive technology",
          path: "lesson-4.html",
          cover: "img/lesson-4/gamepad.jpg",
          note: "15 picture cards · 5 games · 8 exercises",
        },
      ],
    },
    {
      n: 2,
      dir: "chapter-2",
      title: "My first article",
      items: [
        {
          n: 1,
          title: "Robots in our daily lives",
          en: "What a robot is, fixed and mobile robots, sensors, where robots help us",
          path: "lesson-1.html",
          cover: "img/lesson-1/mobile-robot.jpg",
          note: "11 picture cards · 5 games · 5 exercises",
        },
        {
          n: 2,
          title: "Working with text",
          en: "Font, size, colour, bold, italic, underline, highlight, Find, Undo, zoom",
          path: "lesson-2.html",
          cover: "img/lesson-2/highlighted.jpg",
          note: "10 picture cards · 10 how-to's in Mini Word · 5 games · 6 exercises",
        },
        {
          n: 3,
          title: "Paragraph formatting",
          en: "Paragraphs, line breaks, alignment, bullets and numbers, symbols",
          path: "lesson-3.html",
          cover: "img/lesson-3/volcano.jpg",
          note: "10 picture cards · 7 how-to's in Mini Word · 5 games · 5 exercises",
        },
        {
          n: 4,
          title: "Checking and saving",
          en: "Spelling and grammar, the Editor, Save As in a folder, Save",
          path: "lesson-4.html",
          cover: "img/lesson-4/saved.jpg",
          note: "8 picture cards · 5 how-to's in Mini Word · 4 games · 6 exercises",
        },
      ],
    },
  ],
};
