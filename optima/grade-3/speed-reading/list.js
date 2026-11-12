// Швидкочитання (Optima, 3 клас): the hub's cards, one per game or text, in three side-bar sections:
// sec: "daily" (Щодня: games from speed-reading.txt) · "book" (Книжка: eye exercises of «Школа швидкочитання»)
// · "texts" (Тексти: the booklet's texts with a stopwatch).
// Card: {sec, n, title, en (the line under the title), path, ic (emoji on the card), note}.
// Add the game's files to "also" of the Швидкочитання entry in games.js.
window.SPEED = {
  grade: 3,
  intro:
    "Короткі ігри щодня, вправи для очей із книжки і тексти на швидкість. Спершу читаємо правильно, а тоді швидше.",
  items: [
    {
      sec: "daily",
      n: 1,
      title: "Ловимо фішки",
      en: "Знайди слово серед схожих, поки воно летить",
      path: "catch.html",
      ic: "🪣",
      note: "Склади · Слова · Закінчення · найкращий час",
    },
    {
      sec: "daily",
      n: 2,
      title: "Склади-блискавки",
      en: "Склад чи слово з’являється на мить: прочитай вголос",
      path: "flash.html",
      ic: "⚡",
      note: "Збіги приголосних · схожі склади · слова зі збігами · довгі слова",
    },
    {
      sec: "daily",
      n: 3,
      title: "Яке слово?",
      en: "Побач слово і знайди його серед схожих",
      path: "which.html",
      ic: "🔍",
      note: "Склади · Слова · Закінчення",
    },
    {
      sec: "daily",
      n: 4,
      title: "Пропущене",
      en: "Встав склад або закінчення",
      path: "gaps.html",
      ic: "🧩",
      note: "Склад у слові · закінчення в реченні",
    },
    {
      sec: "daily",
      n: 5,
      title: "Читаємо фразами",
      en: "Читай частинами, а не по слову",
      path: "phrases.html",
      ic: "🐾",
      note: "Слово до слова · речення частинами",
    },
    {
      sec: "daily",
      n: 6,
      title: "Яка картинка?",
      en: "Прочитай речення і знайди малюнок",
      path: "pics.html",
      ic: "🖼️",
      note: "5 речень · малюнок росте",
    },
  ],
};
