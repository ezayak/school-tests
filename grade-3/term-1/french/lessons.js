// French lessons for Grade 3. Add one entry per lesson (and its files to "also" in games.js for offline use).
// The pages use the Grade 4 engine: ../../../grade-4/term-1/french/french-lesson.js
// Two groups in the side bar: the book « Léo et Théo Plus 1 » (one lesson per Unité, book exercises only)
// and the teacher's lessons (her slides and sheets).
const BOOK = [
  {
    n: 0,
    title: "Bienvenue !",
    en: "Welcome! · menu, taxi, croissant…, Lève-toi !, Lis !…, the alphabet, the new friends",
    path: "unite-0.html",
    cover: "img/unite-0/amis.jpg",
    note: "Livre p. 4–7 · 1 video · 12 instructions · 10 words · 4 games · 8 exercises",
  },
  {
    n: 1,
    title: "Salut, les amis !",
    en: "Hi, friends! · Je m’appelle…, Bonjour, Bonsoir, Bonne nuit, Comment ça va ?",
    path: "unite-1.html",
    cover: "img/unite-1/amis.jpg",
    note: "Livre p. 8–15 · 2 videos · 14 words · 4 games · 10 exercises",
  },
  {
    n: 2,
    title: "Voici ma famille !",
    en: "Here is my family! · mon frère, ma sœur…, les nombres de 0 à 12, les animaux, le son [y]",
    path: "unite-2.html",
    cover: "img/unite-2/p1.jpg",
    note: "Livre p. 16–25 · 3 videos · 31 words · 4 games · 10 exercises",
  },
];
const TEACHER = [
  {
    n: 1,
    title: "La présentation",
    en: "Introducing yourself · Je m’appelle…, J’ai … ans, Je suis en 3ème primaire, Mon école s’appelle…, Léo et Théo",
    path: "lesson-1.html",
    cover: "img/lesson-1/bonjour.jpg",
    note: "Slides · 20 words · 5 games · 6 exercises",
  },
  {
    n: 2,
    title: "Les salutations",
    en: "Greetings · bonjour, bonsoir, bonne nuit, au revoir, salut",
    path: "lesson-2.html",
    ic: "👋",
    note: "Story · 9 words · 4 games · 3 exercises",
  },
  {
    n: 3,
    title: "Les consignes de la classe",
    en: "Classroom instructions · Lève-toi !, Lis !, Écris !…",
    path: "lesson-3.html",
    cover: "img/lesson-3/consignes.jpg",
    note: "12 instructions · 3 games · 3 exercises",
  },
  {
    n: 4,
    title: "Les lettres et les mots",
    en: "Letters and words · voyelles et consonnes, biberon, croissant, taxi…",
    path: "lesson-4.html",
    cover: "img/lesson-4/croissant.jpg",
    note: "12 cards · 4 games · 5 exercises",
  },
];
window.FR_LESSONS = {
  grade: 3,
  term: 1,
  groups: [
    {
      k: "book",
      ic: "📘",
      t: "Léo et Théo Plus 1",
      label: "Unité",
      intro:
        "The book « Léo et Théo Plus 1 »: one lesson per unit, with the book's pictures, words, songs and exercises.",
      empty: "The book lessons are coming soon.",
      items: BOOK,
    },
    {
      k: "teacher",
      ic: "🏫",
      t: "Teacher's lessons",
      label: "Leçon",
      intro:
        "The teacher's lessons: her slides, class work and homework sheets.",
      items: TEACHER,
    },
  ],
};
