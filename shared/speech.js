// Speech games (Мовлення): letters, syllables, words, positions and sentences for a child with aphasia.
// Everything is said aloud with the device voice (Kit.voice); a recording (snd) replaces the voice for one item.
// <body data-view="list">  → a group page (window.SPEECH_LIST from list.js: one card per game),
// <body data-view="cards"> → cards: tap a card → the letter (syllable), a pause, the word.
// <body data-view="guess"> → guess: the voice says a letter (syllable), tap it among 4.
// <body data-view="build" data-deck="words"> → build the word from its letters (../letters.js + ../syllables.js).
// <body data-view="fly"> → catch the letter: tap the floating letters that are the one shown (../letters.js).
// <body data-view="place" data-deck="positions"> → put the thing where the sentence says (../positions.js + ../places.js).
// <body data-deck="letters"> (or none) plays window.SPEECH_LETTERS (../letters.js), data-deck="syllables" window.SPEECH_SYLLABLES (../syllables.js),
// data-deck="words" the picture words of both, data-deck="positions" window.SPEECH_POSITIONS (../positions.js).
(function () {
  "use strict";
  const { esc } = Kit;
  const app = document.getElementById("app");
  const view = document.body.dataset.view || "list";
  const HOME = "../../../index.html";
  // The interface texts in the page's language (<html lang>: uk, en; the Arabic pages are in English, like the Arabic
  // lessons); the words to learn are in the data files.
  const TEXTS = {
    uk: {
      home: "← Усі ігри",
      school: "Мовлення",
      game: "Гра",
      soon: "Нові ігри з’являться тут.",
      warn: "На цьому пристрої може не бути українського голосу.",
      again: "Послухати ще раз",
      cards: "Картки",
      hintGroup: "Підказка",
      setGroup: "Що грати",
      chooseAsk: (n) => `Що вчимо? Обери щонайменше ${n} різні.`,
      chooseGroup: "Що вчимо",
      start: "▶ Почати",
      well: "Молодець! ",
      first: (s, n) => `З першого разу: <b>${s}</b> з ${n}`,
      more: "🔁 Ще раз",
      guess: (w) => "Вгадай " + w,
      guessHint: (w) => `Послухай ${w[0]} і натисни на ${w[1]}.`,
      guessModes: ["🖼️ З картинкою", "🔊 Без картинки"],
      build: "Склади слово",
      buildModes: ["🔤 Картинка і слово", "🖼️ Тільки картинка"],
      buildHint: "Подивись на картинку, послухай слово і склади його з літер.",
      helpLetter: "Допомога: наступна літера",
      word: "Слово",
      letters: "Літери",
      fly: "Лови літеру",
      speed: "Швидкість",
      slow: "🐢 Повільно",
      fast: "🐇 Швидше",
      flyHint: "Обери літеру, яку будемо ловити.",
      letter: "Літера",
      any: "Будь-яка",
      catch: "Лови:",
      hearLetter: "Послухати літеру",
      caught: (g, b) => `Спіймано: <b>${g}</b> · помилок: <b>${b}</b>`,
      otherLetter: "Інша літера",
      abc: "Абетка",
      abcWhat: ["літеру", "неї"],
      abcNav: ["Попередня літера", "Наступна літера"],
      otherWords: "Інші слова",
      all: "Усі",
      lens: ["3 літери", "4 літери", "5 літер", "6+ літер"],
      sentences: "Речення",
      cardNav: ["Попередня картка", "Наступна картка"],
      cardsLabel: "Картки",
      picModes: ["🔤 Зі словом", "🔊 Тільки звук"],
      posOther: "Інші положення",
      posWhat: ["положення", "картинку"],
      posLabel: "Положення",
      posNote: "«біля» і «поруч», «всередині» і «у» — це одне.",
      place: "Постав",
      placeModes: ["🔤 Читати", "🔊 Слухати"],
      placeHint:
        "Прочитай або послухай, де має бути предмет, і постав його туди.",
      thing: "Предмет",
      here: "Сюди",
      body: "Частини тіла",
      bodyOther: "Інші частини тіла",
      bodyWhat: ["частину тіла", "картинку"],
      bodyGuess: "Покажи",
      bodyGuessHint: "Послухай або прочитай слово і натисни на картинку.",
      syl: "Склади",
      sylOther: "Інші склади",
      sylWhat: ["склад", "нього"],
      sylNav: ["Попередній склад", "Наступний склад"],
      consonants: "Приголосні",
      wordsLabel: "Слова",
      phrOther: "Інші речення",
      phrWhat: ["речення", "картинку"],
      phrLabel: "Початок речення",
      phrModes: ["🔤 З реченням", "🔊 Тільки звук"],
      phrBuild: "Склади речення",
      phrBuildModes: ["🔤 Зі зразком", "🖼️ Тільки картинка"],
      phrBuildHint: "Подивись на картинку і склади речення зі слів.",
      sentence: "Речення",
      helpWord: "Допомога: наступне слово",
      verbs: "Дії",
      verbOther: "Інші дії",
      verbWhat: ["дію", "картинку"],
      forms: "Як сказати?",
      formsHint: "Послухай дію і вибери, як сказати про себе: «Я …».",
    },
    en: {
      home: "← All games",
      school: "Speech",
      game: "Game",
      soon: "New games will appear here.",
      warn: "This device may not have an English voice.",
      warnAr:
        "No Arabic voice on this device and no internet, so listening is not available right now.",
      again: "Listen again",
      cards: "Cards",
      hintGroup: "Hint",
      setGroup: "What to play",
      chooseAsk: (n) => `What are we learning? Choose at least ${n}.`,
      chooseGroup: "What we learn",
      start: "▶ Start",
      well: "Well done! ",
      first: (s, n) => `First try: <b>${s}</b> of ${n}`,
      more: "🔁 Again",
      guess: (w) => "Guess the " + w,
      guessHint: (w) => `Listen to the ${w[0]} and tap ${w[1]}.`,
      guessModes: ["🖼️ With picture", "🔊 Sound only"],
      build: "Build the word",
      buildModes: ["🔤 Picture and word", "🖼️ Picture only"],
      buildHint:
        "Look at the picture, listen to the word and build it from letters.",
      helpLetter: "Help: the next letter",
      word: "Word",
      letters: "Letters",
      fly: "Catch the letter",
      speed: "Speed",
      slow: "🐢 Slow",
      fast: "🐇 Fast",
      flyHint: "Choose the letter to catch.",
      letter: "Letter",
      any: "Any",
      catch: "Catch:",
      hearLetter: "Listen to the letter",
      caught: (g, b) => `Caught: <b>${g}</b> · mistakes: <b>${b}</b>`,
      otherLetter: "Another letter",
      abc: "ABC",
      abcWhat: ["letter", "it"],
      abcNav: ["Previous letter", "Next letter"],
      otherWords: "Other words",
      all: "All",
      lens: ["3 letters", "4 letters", "5 letters", "6+ letters"],
      sentences: "Sentences",
      cardNav: ["Previous card", "Next card"],
      cardsLabel: "Cards",
      picModes: ["🔤 With the word", "🔊 Sound only"],
      posOther: "Other positions",
      posWhat: ["position", "the picture"],
      posLabel: "Positions",
      posNote: "«near» and «next to», «inside» and «in» mean the same.",
      place: "Put it there",
      placeModes: ["🔤 Read", "🔊 Listen"],
      placeHint: "Read or listen where the thing goes, and put it there.",
      thing: "Thing",
      here: "Here",
      body: "Body",
      bodyOther: "Other parts",
      bodyWhat: ["part of the body", "the picture"],
      bodyGuess: "Show me",
      bodyGuessHint: "Listen to or read the word and tap the picture.",
      syl: "Syllables",
      sylOther: "Other syllables",
      sylWhat: ["syllable", "it"],
      sylNav: ["Previous syllable", "Next syllable"],
      consonants: "Consonants",
      wordsLabel: "Words",
      phrOther: "Other sentences",
      phrWhat: ["sentence", "the picture"],
      phrLabel: "Start of the sentence",
      phrModes: ["🔤 With the sentence", "🔊 Sound only"],
      phrBuild: "Build the sentence",
      phrBuildModes: ["🔤 With the model", "🖼️ Picture only"],
      phrBuildHint:
        "Look at the picture and build the sentence from the words.",
      sentence: "Sentence",
      helpWord: "Help: the next word",
      verbs: "Verbs",
      verbOther: "Other verbs",
      verbWhat: ["verb", "the picture"],
      forms: "How to say it?",
      formsHint: "Listen to the verb and choose how to say it: «I …».",
    },
  };
  const T = TEXTS[document.documentElement.lang] || TEXTS.uk;
  const store = {
    get(k, d) {
      try {
        const v = localStorage.getItem(k);
        return v === null ? d : v;
      } catch (e) {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch (e) {}
    },
  };

  /* ================= list of games ================= */
  if (view === "list") {
    const L = window.SPEECH_LIST;
    app.innerHTML = `<section class="card">
    <div class="topbar"><a class="back" href="${HOME}">${T.home}</a><span class="eyebrow">${T.school}</span></div>
    <h1 class="hero-title"><span class="p">${esc(L.title)}</span></h1>
    <p class="howto">${esc(L.intro || "")}</p>
  </section>
  <div class="items">${L.items.map((it) => Kit.lessonCard(it, T.game)).join("")}</div>
  <div class="soon">${T.soon}</div>`;
    document.title = `${L.title} · ${T.school}`;
    return;
  }

  // the letters of a word, each with its marks (an Arabic haraka stays on its letter), and a letter without its marks
  // (أ إ آ as ا, ئ as ي, ؤ as و, ة as ت: the letter whose name is said)
  const seg =
    window.Intl && Intl.Segmenter
      ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
      : null;
  const chars = (w) =>
    seg ? [...seg.segment(w)].map((x) => x.segment) : [...w];
  const bare = (t) =>
    t
      .replace(/[\u064B-\u0652\u0670]/g, "")
      .replace(/[أإآ]/g, "ا")
      .replace(/ئ/g, "ي")
      .replace(/ؤ/g, "و")
      .replace(/ة/g, "ت");

  /* ---------- the deck: letters, syllables or words (<body data-deck>) ---------- */
  const deck = (
    {
      letters,
      syllables,
      words,
      positions,
      phrases,
      verbs,
      verbWords,
      verbForms,
      body,
      bodyWords,
    }[document.body.dataset.deck] || letters
  )();
  // Arabic: Google's online voice when the device has none (as in the Arabic lessons); body[data-lang] for the Arabic font
  const AR = /^ar/.test(deck.lang);
  const V = Kit.voice(deck.lang, { online: AR });
  if (AR) document.body.dataset.lang = "ar";

  /* ---------- voice: the device voice, or a recording ---------- */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let audio = null;
  function hush() {
    V.hush();
    if (audio) audio.pause();
    audio = null;
  }
  // a recording; ends when it has been played (or could not be played)
  function play(src) {
    return new Promise((res) => {
      const a = (audio = new Audio(src));
      a.onended = a.onerror = a.onpause = () => res();
      a.play().catch(() => res());
    });
  }
  const sound = (text, snd) => (snd ? play(snd) : V.say(text));

  const plain = (w) => w.replace(/[[\]-]/g, "");
  // what is said after the item: its word (letters, syllables), or the item again (positions)
  const said = (it) => (it.w ? [plain(it.w), it.wsnd] : [it.name, it.snd]);
  const icon = (d) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const SPEAKER = icon(
    '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
  );
  // the links back (home, the group's games), with something on the right (a counter)
  const top = (right) =>
    `<div class="toprow"><div class="toplinks"><a class="back" href="${HOME}">${T.home}</a><a class="back" href="index.html">${esc(deck.group)}</a></div>${right || ""}</div>`;
  const WARN = `<p class="sp-warn" id="warn" hidden>${AR ? T.warnAr : T.warn}</p>`;
  // checked at a tap: the device lists its voices a moment after the page opens
  const warn = () =>
    (document.getElementById("warn").hidden = !V.ok || V.has());
  const cls = (c) => (c ? " " + c : "");

  /* ================= decks ================= */
  // A deck gives the games what they show and say. items: [{name: what is said, snd, w: the word with its part in [ ],
  // wsnd, ic: the picture}]; head(it) / tile(it): {c: a class, html} for the card's top and a guess button;
  // word(it): the word with its part in colour; page(i) + panel(i): the cards view's right panel (drawn again when page(i) changes);
  // others(it): 3 wrong answers; sets: the choice of what to play (none = everything).
  // Optional: pic(it) + picCls: the card's picture (default the emoji ic); cardCls: a class on the card;
  // choose: {t: names, f: their families, min, note}: the guessing game ticks several of deck.items' groups (x.g) instead of one set,
  // at least min of different families (a family gives one answer per question); others(it, pool);
  // hint(it): the guessing game's mode-1 hint (default the picture); modes: its two mode labels.

  // Letters (window.SPEECH_LETTERS, letters.js): vowels red, consonants blue, ь green (k).
  function letters() {
    const D = window.SPEECH_LETTERS;
    const kind = (it) => "sp-" + (it.k || "c");
    const items = D.items;
    return {
      lang: D.lang,
      key: "",
      group: T.abc,
      what: T.abcWhat,
      nav: T.abcNav,
      items,
      head: (it) => ({
        c: kind(it),
        html: esc(it.up ? `${it.up} ${it.lo}` : it.lo),
      }),
      tile: (it) => ({ c: kind(it), html: esc(it.up || it.lo) }),
      word: (it) =>
        esc(it.w).replace(/\[(.+?)\]/, `<b class="${kind(it)}">$1</b>`),
      page: () => 0,
      panel: () =>
        `<div class="sp-abc" role="group" aria-label="${T.letters}">${items.map((it, k) => `<button type="button" class="${kind(it)}" data-i="${k}">${esc(it.up || it.lo)}</button>`).join("")}</div>`,
      others: (it) => Kit.shuf(items.filter((x) => x !== it)).slice(0, 3),
    };
  }

  // Syllables (window.SPEECH_SYLLABLES, syllables.js): every letter in colour (consonant blue, vowel red).
  // Arabic: a letter keeps its haraka (one colour), the long vowels ا و ي red; one form of the syllable (no capitals).
  function syllables() {
    const D = window.SPEECH_SYLLABLES;
    const ar = /^ar/.test(D.lang);
    const VOW = ar ? "اوي" : "аеєиіїоуюя";
    const paint = (t) =>
      (ar ? chars(t) : [...t])
        .map(
          (ch) =>
            `<span class="${VOW.includes(ch[0].toLowerCase()) ? "sp-v" : "sp-c"}">${esc(ch)}</span>`,
        )
        .join("");
    const items = [];
    D.groups.forEach((g, gi) =>
      g.syl.forEach((x) => items.push({ ...x, name: x.s, g: gi })),
    );
    const first = (gi) => items.findIndex((x) => x.g === gi);
    return {
      lang: D.lang,
      key: "syl-",
      group: T.syl,
      other: T.sylOther,
      what: T.sylWhat,
      nav: T.sylNav,
      items,
      head: (it) => ({
        c: "sp-long",
        html: ar
          ? `<span>${paint(it.s)}</span>`
          : `<span>${paint(it.s.toUpperCase())}</span><span>${paint(it.s)}</span>`,
      }),
      tile: (it) => ({ c: "sp-long", html: paint(it.s.toUpperCase()) }),
      word: (it) =>
        esc(it.w).replace(/\[(.+?)\]/, (m, t) => `<b>${paint(t)}</b>`),
      page: (i) => items[i].g,
      // the consonants, the syllables of this one, the sheet's words
      panel: (i) => {
        const g = items[i].g;
        return `<div class="sp-cons" role="group" aria-label="${T.consonants}">${D.groups.map((x, k) => `<button type="button" class="sp-c" data-g="${k}" aria-pressed="${k === g}">${esc(x.c.toUpperCase())}</button>`).join("")}</div>
          <div class="sp-abc sp-syls" role="group" aria-label="${T.syl}">${items.map((x, k) => (x.g === g ? `<button type="button" data-i="${k}">${paint(x.s.toUpperCase())}</button>` : "")).join("")}</div>
          <div class="sp-words" role="group" aria-label="${T.wordsLabel}">${D.groups[g].words.map((w, k) => `<button type="button" class="abtn" data-w="${k}">🔊 <span>${w.split("-").map(paint).join("-")}</span></button>`).join("")}</div>`;
      },
      first,
      words: (i) => D.groups[items[i].g].words,
      // mostly the same consonant with another vowel (МА – МО), one with the same vowel (МА – НА)
      others: (it) => {
        const same = Kit.shuf(items.filter((x) => x.g === it.g && x !== it));
        const vow = Kit.shuf(
          items.filter((x) => x.g !== it.g && x.s[1] === it.s[1]),
        );
        return [...same.slice(0, 2), ...vow.slice(0, 1)];
      },
      sets: [{ t: T.all, items }].concat(
        D.groups.map((g, gi) => ({
          t: g.c.toUpperCase(),
          items: items.filter((x) => x.g === gi),
        })),
      ),
    };
  }

  // Words (letters.js + syllables.js): every picture word of the cards and sheets (none with ’), once; sets by length.
  function words() {
    const seen = new Map();
    window.SPEECH_LETTERS.items
      .concat(
        ...(window.SPEECH_SYLLABLES
          ? window.SPEECH_SYLLABLES.groups.map((g) => g.syl)
          : []),
      )
      .forEach((x) => {
        const w = x.w.replace(/[[\]]/g, "");
        if (!/[’ ]/.test(w) && !seen.has(w))
          seen.set(w, { name: w, w: x.w, wsnd: x.wsnd, ic: x.ic });
      });
    const items = [...seen.values()];
    const len = (a, b) =>
      items.filter(
        (x) => chars(x.name).length >= a && chars(x.name).length <= b,
      );
    return {
      lang: window.SPEECH_LETTERS.lang,
      key: "words-",
      group: T.abc,
      other: T.otherWords,
      items,
      sets: [
        { t: T.all, items },
        { t: T.lens[0], items: len(3, 3) },
        { t: T.lens[1], items: len(4, 4) },
        { t: T.lens[2], items: len(5, 5) },
        { t: T.lens[3], items: len(6, 99) },
      ],
    };
  }

  // Picture sentences: one card per picture, with the sentence it shows (w, its key part in [ ]), in groups (t: shown big
  // on the card and said first). The panel has the groups and the pictures of the chosen one.
  // The guessing game says the group; its answers are pictures of other chosen groups (one per family f).
  // A card's own t (a verb) is shown and said instead of its group's; a card has pic (a picture file) or ic (an emoji);
  // a card's own f: pictures that look alike share one, so they never come together in the guessing game.
  // D.key / D.group: the data's own saved-key and group name (body sentences on the phrases pages).
  // o: {key, dir: the pictures' folder in ../img/ (D.img: another folder, e.g. the Ukrainian pictures), group (default T.sentences), other, what, label: the panel's group list,
  // hd: the card top's class, choose: the guessing game's start screen, or none; sets: «Усі» and each group with at least
  // 4 cards; mix: the wrong answers are any other pictures, of the same group first}.
  function pictures(D, o) {
    const img = (x) =>
      x.pic
        ? `<img src="${D.img || `../img/${o.dir}/`}${x.pic}.jpg" alt="">`
        : `<span class="sp-emo">${esc(x.ic)}</span>`;
    const items = [];
    D.groups.forEach((g, gi) =>
      g.cards.forEach((x) =>
        items.push({ ...x, name: x.t || g.t, f: x.f || g.f || gi, g: gi }),
      ),
    );
    const d = {
      lang: D.lang,
      key: D.key || o.key,
      group: D.group || o.group || T.sentences,
      other: o.other,
      what: o.what,
      nav: T.cardNav,
      modes: T.picModes,
      cardCls: "sp-sent",
      items,
      head: (it) => ({ c: o.hd, html: esc(it.name) }),
      pic: (it) => img(it),
      picCls: "sp-photos",
      word: (it) => esc(it.w).replace(/\[(.+?)\]/, `<b class="sp-posw">$1</b>`),
      hint: (it) => esc(it.name),
      tile: (it) => ({ c: "sp-photo", html: img(it) }),
      page: (i) => items[i].g,
      // the groups, then the pictures of the chosen one
      panel: (i) => {
        const g = items[i].g;
        return `<div class="sp-plist" role="group" aria-label="${o.label}">${D.groups.map((x, k) => `<button type="button" class="abtn" data-g="${k}" aria-pressed="${k === g}">${esc(x.t)}</button>`).join("")}</div>
          <div class="sp-thumbs" role="group" aria-label="${T.cardsLabel}">${items.map((x, k) => (x.g === g ? `<button type="button" data-i="${k}" aria-label="${esc(x.w.replace(/[[\]]/g, ""))}">${img(x)}</button>` : "")).join("")}</div>`;
      },
      first: (gi) => items.findIndex((x) => x.g === gi),
      // one picture of each of 3 other groups from the pool, none of the same family
      others: (it, pool) => {
        const fam = new Set([it.f]);
        const out = [];
        for (const x of Kit.shuf(pool))
          if (out.length < 3 && !fam.has(x.f)) {
            out.push(x);
            fam.add(x.f);
          }
        return out;
      },
      choose: o.choose,
    };
    if (o.sets)
      d.sets = [{ t: T.all, items }].concat(
        D.groups
          .map((g, gi) => ({ t: g.t, items: items.filter((x) => x.g === gi) }))
          .filter((x) => x.items.length >= 4),
      );
    // never the same picture twice
    const same = (x) => x.pic || x.ic;
    if (o.mix)
      d.others = (it, pool) => {
        const seen = new Set([same(it)]);
        const out = [];
        for (const x of [
          ...Kit.shuf(pool.filter((x) => x.g === it.g)),
          ...Kit.shuf(pool),
          ...Kit.shuf(items),
        ])
          if (out.length < 3 && !seen.has(same(x))) {
            out.push(x);
            seen.add(same(x));
          }
        return out;
      };
    return d;
  }

  // Positions (window.SPEECH_POSITIONS, positions.js): the position big, a poster picture, the sentence that says who is where.
  // The guessing game ticks the positions being learnt (never «біля» with «поруч»).
  function positions() {
    const D = window.SPEECH_POSITIONS;
    return pictures(D, {
      key: "pos-",
      dir: "positions",
      other: T.posOther,
      what: T.posWhat,
      label: T.posLabel,
      hd: "sp-pos",
      // the guessing game's start screen: the positions being learnt (at least min)
      choose: {
        t: D.groups.map((g) => g.t),
        f: D.groups.map((g) => g.f),
        min: 3,
        note: D.note || T.posNote, // the data's own note (Arabic: its words)
      },
    });
  }

  // Phrases (window.SPEECH_PHRASES, phrases.js): the start of the sentence big («Я хочу їсти…»), a collage picture,
  // the whole sentence (the thing in colour).
  function phrases() {
    const d = pictures(window.SPEECH_PHRASES, {
      key: "say-",
      dir: "things",
      other: T.phrOther,
      what: T.phrWhat,
      label: T.phrLabel,
      hd: "sp-frame",
      // the building and guessing games: everything, or one start of a sentence; the wrong pictures are of the same
      // start first («Дай мені ручку»: олівець, зошит…), so the thing is what tells them apart
      sets: true,
      mix: true,
    });
    // the guessing game: the voice says the whole sentence (written in mode 1)
    d.q = (it) => said(it); // said is defined after the deck is made
    d.modes = T.phrModes;
    d.hint = d.word;
    d.hintCls = "sp-hints";
    d.build = {
      title: T.phrBuild,
      modes: T.phrBuildModes,
      hint: T.phrBuildHint,
      what: T.sentence,
      help: T.helpWord,
    };
    return d;
  }

  // Verbs (window.SPEECH_VERBS, verbs.js): the verb big («їсти»), its picture, «Я [їм]»; the guessing game says the verb.
  function verbs() {
    return pictures(window.SPEECH_VERBS, {
      key: "verb-",
      dir: "things",
      group: T.verbs,
      other: T.verbOther,
      what: T.verbWhat,
      label: T.verbs,
      hd: "sp-frame",
      sets: true,
      mix: true,
    });
  }

  // The building game's words of a picture deck: its cards of one word (no space, no ’), built from letters; sets «Усі»
  // and each group with at least 4.
  function oneWords(d) {
    const one = (x) => !/[ ’]/.test(x.name);
    d.items = d.items.filter(one);
    d.sets = d.sets
      .map((x) => ({ t: x.t, items: x.items.filter(one) }))
      .filter((x) => x.items.length >= 4);
    d.spell = (it) => [it.name, it.snd];
    return d;
  }
  // Verb words (verbs.js): the verbs of one word, to build from letters.
  function verbWords() {
    return oneWords(verbs());
  }

  // Parts of the body (window.SPEECH_BODY, body.js): the word big, a poster picture, «Це моя [голова]».
  // The guessing game «Покажи»: hear the word («🔊 Слухати») or read it («🔤 Читати», said only with 🔊), tap its picture
  // among 4; pictures that look alike (очі, вії) share a family and never come together. Sets «Усі», тіло, обличчя.
  function body() {
    const d = pictures(window.SPEECH_BODY, {
      key: "body-",
      dir: "body",
      group: T.body,
      other: T.bodyOther,
      what: T.bodyWhat,
      label: T.body,
      hd: "sp-pos",
      sets: true,
    });
    // a long word (щиколотка, підборіддя) gets smaller to fit between the card's edges and 🔊 (sp-fit, --n letters)
    d.head = (it) => ({
      c: "sp-pos",
      html: `<span class="sp-fit" style="--n:${[...it.name].length}">${esc(it.name)}</span>`,
    });
    d.gq = { title: T.bodyGuess, hint: T.bodyGuessHint };
    d.modes = T.placeModes;
    d.read = true;
    return d;
  }
  // Body words (body.js): the parts of one word, to build from letters.
  function bodyWords() {
    return oneWords(body());
  }

  // Verb forms (verbs.js): the voice says the verb («їсти»), the picture (mode 1) and «Я …» show; choose the form he says
  // about himself among 4 (їм / п’ю / сплю / граю); a right tap shows and says «Я їм».
  function verbForms() {
    const d = verbs();
    const form = (it) => it.w.match(/\[(.+?)\]/)[1];
    d.key = "verbf-";
    d.gq = {
      title: T.forms,
      hint: T.formsHint,
    };
    d.modes = T.guessModes;
    d.hint = (it) => d.pic(it);
    d.hintCls = "sp-hpic";
    d.prompt = (it) => esc(it.w).replace(/\[.+?\]/, `<b class="sp-posw">…</b>`);
    d.tile = (it) => ({ c: "sp-form", html: esc(form(it)) });
    return d;
  }

  /* ================= cards ================= */
  // The parent's layout «A · Card + letter panel»: the card on the left, the panel on the right.
  // Tap the card (or 🔊, ‹ ›, a button in the panel): the letter or syllable, a pause, the word.
  // A word of the sheet (syllables): each syllable, then the whole word.
  function cards() {
    const K = "sp-" + deck.lang + "-" + deck.key + "cards"; // the last card seen
    const N = deck.items.length;
    let i = Math.min(N - 1, Math.max(0, +store.get(K, 0) || 0));
    let run = 0; // a newer tap stops what an older one was saying
    let page = null;
    app.innerHTML = `<div class="sp-split">
      <div class="sp-side">
        <button type="button" class="sp-lcard" id="lcard"></button>
        <button type="button" class="sp-nav sp-prev" id="prev" aria-label="${deck.nav[0]}">${icon('<path d="M15 18l-6-6 6-6"/>')}</button>
        <button type="button" class="sp-nav sp-next" id="next" aria-label="${deck.nav[1]}">${icon('<path d="M9 6l6 6-6 6"/>')}</button>
        <button type="button" class="sp-snd" id="again" aria-label="${T.again}">${SPEAKER}</button>
      </div>
      <section class="card sp-panel">
        ${top('<span class="sp-count" id="count"></span>')}
        <h1 class="les-title">${esc(deck.group)}</h1>
        <div class="sp-pane" id="pane"></div>
        ${WARN}
      </section>
    </div>`;
    const lcard = document.getElementById("lcard");
    const pane = document.getElementById("pane");
    function show() {
      const it = deck.items[i];
      if (deck.page(i) !== page) {
        page = deck.page(i);
        pane.innerHTML = deck.panel(i);
      }
      const h = deck.head(it);
      lcard.className = `sp-lcard sp-p${i % 7}${cls(deck.cardCls)}`;
      lcard.innerHTML = `<span class="sp-hd${cls(h.c)}">${h.html}</span><span class="sp-pic${cls(deck.picCls)}" aria-hidden="true">${deck.pic ? deck.pic(it) : esc(it.ic)}</span><span class="sp-wd">${deck.word(it)}</span>`;
      lcard.setAttribute(
        "aria-label",
        it.w ? `${it.name}, ${plain(it.w)}` : it.name,
      );
      document.getElementById("count").textContent = `${i + 1} / ${N}`;
      pane
        .querySelectorAll("[data-i]")
        .forEach((b) => b.setAttribute("aria-pressed", +b.dataset.i === i));
      store.set(K, i);
    }
    // texts one after the other, with a pause after each; stops when a newer tap comes
    async function say(parts) {
      const my = ++run;
      hush();
      warn();
      for (const [text, snd, pause] of parts) {
        await sound(text, snd);
        if (my !== run) return;
        if (pause) await wait(pause);
        if (my !== run) return;
      }
    }
    const speak = () => {
      const it = deck.items[i];
      say(it.w ? [[it.name, it.snd, 900], said(it)] : [said(it)]);
    };
    function go(k) {
      i = (k + N) % N;
      show();
      speak();
    }
    document.getElementById("prev").onclick = () => go(i - 1);
    document.getElementById("next").onclick = () => go(i + 1);
    lcard.onclick = speak;
    document.getElementById("again").onclick = speak;
    pane.onclick = (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.i != null) go(+b.dataset.i);
      else if (b.dataset.g != null) go(deck.first(+b.dataset.g));
      else if (b.dataset.w != null) {
        const w = deck.words(i)[+b.dataset.w];
        say([...w.split("-").map((x) => [x, null, 350]), [plain(w)]]);
      }
    };
    document.title = `${T.cards} · ${deck.group}`;
    show(); // no sound before the first tap: the browser would block it
  }

  /* ================= a round of a game ================= */
  // What the guessing and building games share: the title with a two-mode switch (saved on the device; mode 1 shows the
  // picture #hint, mode 0 hides it), the choice of what to play (deck.sets, saved), ▶ Почати, n items a round
  // (a small set comes round again, never twice in a row), the counter with ⭐, and the end screen with stars.
  // o: {title, mk: its name in the saved keys, modes: [label of mode 1, label of mode 0], hint: the start screen's line,
  // n: items a round, ask(it, api), items(chosen): the game's own questions from the ticked groups (default deck.items)};
  // api: {stage, say(text, snd), pool, mode(), star(), next(el)}: mode() = true in mode 1, star() = found at the first try,
  // next(el) = the next item after a pause (unless el left the page meanwhile).
  function round(o) {
    const KP = "sp-" + deck.lang + "-" + deck.key + o.mk + "-pic";
    const KS = "sp-" + deck.lang + "-" + deck.key + o.mk + "-set";
    let pic = store.get(KP, "1") === "1";
    let set = deck.sets ? +store.get(KS, 0) || 0 : 0;
    if (deck.sets && !deck.sets[set]) set = 0;
    // deck.choose: several things ticked (saved), at least choose.min
    const KC = "sp-" + deck.lang + "-" + deck.key + o.mk + "-chosen";
    let chosen = new Set();
    if (deck.choose) {
      let saved = null;
      try {
        saved = JSON.parse(store.get(KC, "null"));
      } catch (e) {}
      if (!Array.isArray(saved)) saved = deck.choose.t.map((x, k) => k);
      chosen = new Set(saved.filter((k) => k >= 0 && k < deck.choose.t.length));
    }
    let q = [],
      n = 0,
      score = 0,
      run = 0; // a newer sound stops what an older one was saying
    app.innerHTML = `<section class="card sp-game">
      ${top('<span class="sp-count" id="count"></span>')}
      <div class="sp-head"><h1 class="les-title">${esc(o.title)}</h1>
        <div class="seg" role="group" aria-label="${T.hintGroup}"><button type="button" id="pic-1" data-pic="1">${o.modes[0]}</button><button type="button" id="pic-0" data-pic="0">${o.modes[1]}</button></div></div>
      <div class="sp-stage" id="stage"></div>
      ${WARN}
    </section>`;
    const stage = document.getElementById("stage");
    const count = document.getElementById("count");
    const tally = () =>
      (count.textContent = `${n + 1} / ${q.length} · ⭐ ${score}`);
    document.title = `${o.title} · ${deck.group}`;
    function mode() {
      app
        .querySelectorAll("[data-pic]")
        .forEach((b) =>
          b.setAttribute("aria-pressed", b.dataset.pic === (pic ? "1" : "0")),
        );
      const h = document.getElementById("hint");
      if (h) h.hidden = !pic;
    }
    app.querySelectorAll("[data-pic]").forEach(
      (b) =>
        (b.onclick = () => {
          pic = b.dataset.pic === "1";
          store.set(KP, pic ? "1" : "0");
          mode();
        }),
    );
    mode();
    function begin() {
      count.textContent = "";
      stage.innerHTML = `${deck.sets ? `<div class="seg sp-sets" role="group" aria-label="${T.setGroup}">${deck.sets.map((x, k) => `<button type="button" data-set="${k}" aria-pressed="${k === set}">${esc(x.t)}</button>`).join("")}</div>` : ""}
        ${deck.choose ? `<p class="sp-hint">${T.chooseAsk(deck.choose.min)}</p><div class="seg sp-sets" role="group" aria-label="${T.chooseGroup}">${deck.choose.t.map((t, k) => `<button type="button" data-ch="${k}" aria-pressed="${chosen.has(k)}">${esc(t)}</button>`).join("")}</div><p class="sp-note">${esc(deck.choose.note)}</p>` : ""}
        <p class="sp-hint">${o.hint}</p>
        <button type="button" class="btn big" id="go">${T.start}</button>`;
      const go = document.getElementById("go");
      // enough ticked: at least min different families
      const enough = () =>
        new Set([...chosen].map((k) => deck.choose.f[k])).size >=
        deck.choose.min;
      if (deck.choose) go.disabled = !enough();
      stage.querySelectorAll("[data-ch]").forEach(
        (b) =>
          (b.onclick = () => {
            const k = +b.dataset.ch;
            if (chosen.has(k)) chosen.delete(k);
            else chosen.add(k);
            b.setAttribute("aria-pressed", chosen.has(k));
            store.set(KC, JSON.stringify([...chosen]));
            go.disabled = !enough();
          }),
      );
      stage.querySelectorAll("[data-set]").forEach(
        (b) =>
          (b.onclick = () => {
            set = +b.dataset.set;
            store.set(KS, set);
            stage
              .querySelectorAll("[data-set]")
              .forEach((x) => x.setAttribute("aria-pressed", x === b));
          }),
      );
      document.getElementById("go").onclick = start; // the first tap also lets the browser speak
    }
    function start() {
      api.pool = deck.sets
        ? deck.sets[set].items
        : o.items
          ? o.items(chosen)
          : deck.choose
            ? deck.items.filter((x) => chosen.has(x.g))
            : deck.items;
      q = [];
      while (q.length < o.n) {
        let more = Kit.shuf(api.pool);
        if (q.length && more[0] === q[q.length - 1]) more.push(more.shift());
        q = q.concat(more);
      }
      q = q.slice(0, o.n);
      n = score = 0;
      ask();
    }
    // says a text; true when it was not cut off by a newer one
    async function say(text, snd) {
      const my = ++run;
      hush();
      warn();
      await sound(text, snd);
      return my === run;
    }
    const api = {
      stage,
      say,
      pool: [],
      mode: () => pic,
      star() {
        score++;
        tally();
      },
      async next(el) {
        await wait(900);
        if (!stage.contains(el)) return; // the page moved on meanwhile
        n++;
        ask();
      },
    };
    function ask() {
      if (n >= q.length) return end();
      tally();
      o.ask(q[n], api);
      mode();
    }
    function end() {
      const stars = Math.round((score / q.length) * 3);
      count.textContent = "";
      stage.innerHTML = `<div class="sp-stars">${[0, 1, 2].map((k) => Kit.star(k < stars)).join("")}</div>
        <p class="sp-result">${score === q.length ? T.well : ""}${T.first(score, q.length)}</p>
        <div class="sp-row"><button type="button" class="btn" id="again">${T.more}</button>${deck.sets || deck.choose ? `<button type="button" class="btn ghost" id="other">${esc(deck.other)}</button>` : ""}<a class="btn ghost" href="index.html">${esc(deck.group)}</a></div>`;
      document.getElementById("again").onclick = start;
      if (deck.sets || deck.choose)
        document.getElementById("other").onclick = begin;
    }
    begin();
  }
  // the picture shown in mode 1 (id="hint")
  // the hint shown in mode 1 (id="hint"): the picture, or the deck's own (the written position)
  const hintPic = (it) =>
    deck.hint
      ? `<span class="sp-hintword${cls(deck.hintCls)}" id="hint">${deck.hint(it)}</span>`
      : `<span class="sp-fpic sp-hintpic" id="hint" aria-hidden="true">${esc(it.ic)}</span>`;
  const listen = `<button type="button" class="sp-snd sp-listen" id="listen" aria-label="${T.again}">${SPEAKER}</button>`;

  /* ================= guess ================= */
  // The voice says a letter (syllable); tap it among 4. A right tap shows its picture and word and says the word,
  // then the next one comes. 10 a round; a star for each one found at the first tap.
  // «З картинкою» shows the picture next to 🔊 as a hint, «Без картинки» gives only the sound.
  // A deck with sets (syllables) first asks what to play: everything or one consonant.
  // deck.q(it): what the voice asks (default the item's name; phrases: the whole sentence); deck.prompt(it): a line
  // always shown after the hint («Я …»); deck.gq: {title, hint} instead of «Вгадай …»; deck.read: mode 1 is reading
  // (the word shown, not said until 🔊).
  function guess() {
    const q = deck.q || ((it) => [it.name, it.snd]);
    round({
      title: deck.gq ? deck.gq.title : T.guess(deck.what[0]),
      mk: "guess",
      modes: deck.modes || T.guessModes,
      hint: deck.gq ? deck.gq.hint : T.guessHint(deck.what),
      n: 10,
      ask(it, api) {
        const { stage, say } = api;
        let miss = false;
        const opts = Kit.shuf([it, ...deck.others(it, api.pool)]);
        stage.innerHTML = `<div class="sp-say" id="say">${listen}${hintPic(it)}${deck.prompt ? `<span class="sp-hintword sp-hints">${deck.prompt(it)}</span>` : ""}</div>
        <div class="sp-choices">${opts
          .map((o, k) => {
            const t = deck.tile(o);
            return `<button type="button" class="sp-choice${cls(t.c)}" data-k="${k}">${t.html}</button>`;
          })
          .join("")}</div>`;
        document.getElementById("listen").onclick = () => say(...q(it));
        stage.querySelectorAll("[data-k]").forEach(
          (b) =>
            (b.onclick = async () => {
              if (opts[+b.dataset.k] !== it) {
                miss = true;
                b.disabled = true;
                b.classList.add("no");
                say(...q(it));
                return;
              }
              stage
                .querySelectorAll("[data-k]")
                .forEach((x) => (x.disabled = true));
              b.classList.add("ok");
              if (!miss) api.star();
              document.getElementById("say").innerHTML =
                `<span class="sp-found pop">${it.ic ? `<span class="sp-fpic" aria-hidden="true">${esc(it.ic)}</span>` : ""}<span>${deck.word(it)}</span></span>`;
              if (await say(...said(it))) api.next(b);
            }),
        );
        if (!deck.read || !api.mode()) say(...q(it)); // deck.read: «Читати» (mode 1) says it only with 🔊
      },
    });
  }

  /* ================= build the word ================= */
  // The picture (and the word in mode 1) is shown and the word said; put its letters in order on the line (tap or drag, Kit.dragTiles).
  // Each letter is said as it goes onto the line. A full line is checked: right → green, the word is said, the next word;
  // wrong → the wrong letters turn red and go back to the bank. 💡 (next to 🔊) puts the next right letter in place.
  // 8 words a round; a star for each word built with no mistake and no help.
  // Arabic: above the line, the placed letters joined into the word (#prev), as in the Arabic lessons' word game.
  // A deck with build (phrases) builds a sentence from its words instead (the collage picture, mode 1 shows the
  // written sentence), each word is said as it lands. build: {title, modes, hint, what: the line's label, help: 💡's label}.
  // deck.spell(it): the word to build (default the item's word; verbs: the verb), deck.pic(it): its picture (default the emoji).
  function build() {
    const names = new Map(
      (window.SPEECH_LETTERS ? window.SPEECH_LETTERS.items : []).map((x) => [
        x.lo,
        x,
      ]),
    );
    const B = deck.build;
    round({
      title: B ? B.title : T.build,
      mk: "build",
      modes: B ? B.modes : T.buildModes,
      hint: B ? B.hint : T.buildHint,
      n: 8,
      ask(it, api) {
        const { stage, say } = api;
        const [whole, wsnd] = deck.spell ? deck.spell(it) : said(it);
        const target = B ? whole.split(" ") : chars(whole);
        let miss = false,
          done = false,
          saying = Promise.resolve(); // the letter being said
        // a letter's name (a sentence's word) as it goes onto the line
        const letter = (t) => {
          if (B) return (saying = say(t));
          const x = names.get(bare(t));
          if (x) saying = say(x.name, x.snd);
        };
        const model = B
          ? `<span class="sp-bpic" aria-hidden="true">${deck.pic(it)}</span><span class="sp-model sp-msent" id="hint">${esc(whole)}</span>`
          : `${deck.pic ? `<span class="sp-bpic" aria-hidden="true">${deck.pic(it)}</span>` : `<span class="sp-fpic sp-hintpic" aria-hidden="true">${esc(it.ic)}</span>`}<span class="sp-model" id="hint">${esc(whole)}</span>`;
        stage.innerHTML = `<div class="sp-say sp-say-b${B ? " sp-say-s" : ""}">${model}${listen}<button type="button" class="sp-snd sp-listen sp-help" id="help" aria-label="${B ? B.help : T.helpLetter}">💡</button></div>
        ${AR && !B ? '<div class="sp-preview" dir="rtl" id="prev" aria-hidden="true"></div>' : ""}<div class="line sp-line" id="line" aria-label="${B ? B.what : T.word}"></div>
        <div class="bank sp-bank" id="bank" aria-label="${T.letters}"></div>`;
        const L = document.getElementById("line");
        let bank = Kit.shuf(target.map((t, i) => ({ t, i })));
        const same = (a) => a.map((x) => x.t).join(" ") === target.join(" ");
        for (let k = 0; k < 8 && same(bank); k++) bank = Kit.shuf(bank);
        const tiles = Kit.dragTiles(L, document.getElementById("bank"), [], {
          cls: B ? "sp-tile sp-wtile" : "sp-tile",
          mark: (w, k) => (done ? (w.t === target[k] ? "ok" : "no") : ""),
          onPlace: (w) => letter(w.t),
          // after onPlace (it comes after the drawing), so the letter is said before the word
          onChange: (line) => {
            // Arabic: the letters on the line joined, so he sees how they connect (as in the Arabic lessons' word game)
            const prev = document.getElementById("prev");
            if (prev) prev.textContent = line.map((w) => w.t).join("");
            if (line.length === target.length) setTimeout(check);
          },
        });
        tiles.use([], bank);
        async function check() {
          if (done) return;
          done = true;
          tiles.lock();
          if (same(tiles.line)) {
            L.classList.add("ok");
            document.getElementById("help").disabled = true;
            if (!miss) api.star();
            await saying; // the last letter's name first
            if (!stage.contains(L)) return;
            await say(whole, wsnd);
            api.next(L);
            return;
          }
          miss = true;
          L.classList.add("no");
          await wait(1200);
          if (!stage.contains(L)) return;
          // the letters from the first wrong one on go back to the bank
          let k = 0;
          while (k < tiles.line.length && tiles.line[k].t === target[k]) k++;
          while (tiles.line.length > k) tiles.bank.push(tiles.line.pop());
          done = false;
          L.classList.remove("no");
          tiles.unlock();
        }
        document.getElementById("help").onclick = () => {
          if (done) return;
          miss = true;
          let k = 0;
          while (k < tiles.line.length && tiles.line[k].t === target[k]) k++;
          while (tiles.line.length > k) tiles.bank.push(tiles.line.pop());
          const j = tiles.bank.findIndex((w) => w.t === target[k]);
          if (j >= 0) {
            const [w] = tiles.bank.splice(j, 1);
            tiles.line.push(w);
            letter(w.t);
          }
          tiles.draw();
        };
        document.getElementById("listen").onclick = () => say(whole, wsnd);
        say(whole, wsnd);
      },
    });
  }

  /* ================= catch the letter ================= */
  // Letters float up from the bottom of the sky; tap the ones that are the letter shown on top (about 4 in 10 are).
  // Right: it pops, ⭐, the letter is said. Wrong: it shakes red, the letter on top is said again.
  // The start screen picks the letter (or 🎲 any, saved); 🐢 / 🐇 sets the speed at any time (saved).
  // 10 caught letters end the round; the stars count the wrong taps (none = 3, up to 2 = 2, more = 1).
  function fly() {
    const GOAL = 10;
    const KS = "sp-" + deck.lang + "-fly-fast";
    const KT = "sp-" + deck.lang + "-fly-letter";
    const items = deck.items;
    let fast = store.get(KS, "0") === "1";
    let pick = +store.get(KT, -1);
    if (!(pick >= -1 && pick < items.length)) pick = -1;
    let target = null,
      got = 0,
      bad = 0,
      raf = 0,
      last = 0,
      due = 0,
      live = [],
      run = 0;
    app.innerHTML = `<section class="card sp-game">
      ${top('<span class="sp-count" id="count"></span>')}
      <div class="sp-head"><h1 class="les-title">${T.fly}</h1>
        <div class="seg" role="group" aria-label="${T.speed}"><button type="button" id="fast-0" data-fast="0">${T.slow}</button><button type="button" id="fast-1" data-fast="1">${T.fast}</button></div></div>
      <div class="sp-stage" id="stage"></div>
      ${WARN}
    </section>`;
    const stage = document.getElementById("stage");
    const count = document.getElementById("count");
    const tally = () => (count.textContent = `⭐ ${got} / ${GOAL}`);
    document.title = `${T.fly} · ${deck.group}`;
    const speed = () =>
      app
        .querySelectorAll("[data-fast]")
        .forEach((b) =>
          b.setAttribute("aria-pressed", b.dataset.fast === (fast ? "1" : "0")),
        );
    app.querySelectorAll("[data-fast]").forEach(
      (b) =>
        (b.onclick = () => {
          fast = b.dataset.fast === "1";
          store.set(KS, fast ? "1" : "0");
          speed();
        }),
    );
    speed();
    async function say(it) {
      const my = ++run;
      hush();
      warn();
      await sound(it.name, it.snd);
      return my === run;
    }
    function stop() {
      cancelAnimationFrame(raf);
      live = [];
    }
    function begin() {
      stop();
      count.textContent = "";
      stage.innerHTML = `<p class="sp-hint">${T.flyHint}</p>
        <div class="sp-abc sp-pick" role="group" aria-label="${T.letter}">
          <button type="button" data-t="-1" aria-pressed="${pick < 0}" aria-label="${T.any}">🎲</button>${items.map((it, k) => `<button type="button" class="${deck.tile(it).c}" data-t="${k}" aria-pressed="${k === pick}">${deck.tile(it).html}</button>`).join("")}</div>
        <button type="button" class="btn big" id="go">${T.start}</button>`;
      stage.querySelectorAll("[data-t]").forEach(
        (b) =>
          (b.onclick = () => {
            pick = +b.dataset.t;
            store.set(KT, pick);
            stage
              .querySelectorAll("[data-t]")
              .forEach((x) => x.setAttribute("aria-pressed", x === b));
          }),
      );
      document.getElementById("go").onclick = start; // the first tap also lets the browser speak
    }
    function start() {
      stop();
      target = pick < 0 ? Kit.pick(items) : items[pick];
      got = bad = 0;
      tally();
      const h = deck.head(target);
      stage.innerHTML = `<div class="sp-target"><span class="sp-hint">${T.catch}</span>
          <button type="button" class="sp-tgt${cls(h.c)}" id="tgt" aria-label="${T.hearLetter}">${h.html}</button></div>
        <div class="sp-sky" id="sky"></div>`;
      document.getElementById("tgt").onclick = () => say(target);
      say(target);
      last = performance.now();
      due = last + 300;
      raf = requestAnimationFrame(frame);
    }
    // one letter from the bottom of the sky, at a random place
    function launch(sky) {
      const it =
        Math.random() < 0.4
          ? target
          : Kit.pick(items.filter((x) => x !== target));
      const t = deck.tile(it);
      const el = document.createElement("button");
      el.type = "button";
      el.className = `sp-bal sp-p${Math.floor(Math.random() * 7)}${cls(t.c)}`;
      el.innerHTML = t.html;
      sky.appendChild(el);
      const b = { el, it, x: 0, y: sky.clientHeight, done: false };
      // not on top of the letter launched just before
      const room = Math.max(0, sky.clientWidth - el.offsetWidth);
      const prev = live[live.length - 1];
      for (let k = 0; k < 5; k++) {
        b.x = Math.random() * room;
        if (!prev || Math.abs(b.x - prev.x) > el.offsetWidth) break;
      }
      el.style.left = b.x + "px";
      el.style.top = b.y + "px";
      el.onpointerdown = (e) => {
        e.preventDefault();
        tap(b);
      };
      live.push(b);
    }
    function tap(b) {
      if (b.done) return;
      if (b.it !== target) {
        bad++;
        b.el.classList.remove("no");
        void b.el.offsetWidth; // the shake again on a second tap
        b.el.classList.add("no");
        say(target);
        return;
      }
      b.done = true;
      b.el.classList.add("pop");
      setTimeout(() => b.el.remove(), 300);
      got++;
      tally();
      say(target);
      if (got >= GOAL) setTimeout(end, 500);
    }
    function frame(now) {
      const sky = document.getElementById("sky");
      if (!sky) return;
      const dt = Math.min(50, now - last); // a hidden page does not make the letters jump
      last = now;
      // the sky's height in 9 s (slow) or 5 s (fast)
      const v = sky.clientHeight / (fast ? 5000 : 9000);
      live = live.filter((b) => {
        if (b.done) return false;
        b.y -= v * dt;
        if (b.y < -b.el.offsetHeight) {
          b.el.remove();
          return false;
        }
        b.el.style.top = b.y + "px";
        // the sky got narrower (the tablet turned): back inside
        const room = Math.max(0, sky.clientWidth - b.el.offsetWidth);
        if (b.x > room) b.el.style.left = (b.x = room) + "px";
        return true;
      });
      if (now >= due && live.length < 7) {
        launch(sky);
        due = now + (fast ? 650 : 1000);
      }
      raf = requestAnimationFrame(frame);
    }
    function end() {
      stop();
      const stars = bad === 0 ? 3 : bad <= 2 ? 2 : 1;
      count.textContent = "";
      stage.innerHTML = `<div class="sp-stars">${[0, 1, 2].map((k) => Kit.star(k < stars)).join("")}</div>
        <p class="sp-result">${bad === 0 ? T.well : ""}${T.caught(GOAL, bad)}</p>
        <div class="sp-row"><button type="button" class="btn" id="again">${T.more}</button><button type="button" class="btn ghost" id="other">${T.otherLetter}</button><a class="btn ghost" href="index.html">${esc(deck.group)}</a></div>`;
      document.getElementById("again").onclick = start;
      document.getElementById("other").onclick = begin;
    }
    begin();
  }

  /* ================= put it there ================= */
  // A drawn scene (window.SPEECH_PLACES, places.js) with dashed spots; «Кіт [під] столом» is read («🔤 Читати»: the sentence shown,
  // said only with 🔊) or heard («🔊 Слухати»: said, not shown). Drag the thing from the tray onto a spot, or tap the spot.
  // Right: the thing stands there (behind the front of the furniture where it should), the sentence is said, the next one.
  // Wrong: the spot shakes red, the sentence is said again. The start screen ticks the positions (as Вгадай положення);
  // only those are asked, the scene still shows all its spots. 8 a round; a star for each one put right at the first try.
  function place() {
    const P = window.SPEECH_PLACES;
    const C = deck.choose;
    // the questions: for each ticked position, 5 of its scene × thing pairs (so «на», in 3 scenes, comes as often as «за», in 1)
    const items = (chosen) => {
      const out = [];
      C.t.forEach((t, k) => {
        if (!chosen.has(k)) return;
        const all = [];
        P.scenes.forEach((sc) => {
          if (sc.say[t])
            P.things.forEach((th) =>
              all.push({
                sc,
                th,
                f: C.f[k],
                name: t,
                w: `${th.t} [${t}] ${sc.say[t]}`,
              }),
            );
        });
        out.push(...Kit.shuf(all).slice(0, 5));
      });
      return out;
    };
    const svg = (cls, inner) =>
      `<svg class="${cls}" viewBox="0 0 400 300" aria-hidden="true">${inner}</svg>`;
    // a spot's place and size in the scene (cqw: % of the scene's width)
    const at = (z) => `left:${z.x / 4}%;top:${z.y / 3}%;--s:${z.s}`;
    round({
      title: T.place,
      mk: "place",
      modes: T.placeModes,
      hint: T.placeHint,
      n: 8,
      items,
      ask(it, api) {
        const { stage, say } = api;
        let miss = false;
        const zones = it.sc.zones;
        stage.innerHTML = `<div class="sp-say sp-say-b">${listen}<span class="sp-hintword" id="hint">${deck.word(it)}</span></div>
        <div class="sp-place">
          <div class="sp-tray" aria-label="${T.thing}"><button type="button" class="sp-thing" id="thing" aria-label="${esc(it.th.t)}">${esc(it.th.ic)}</button></div>
          <div class="sp-scene" id="scene">${svg("sp-lb", '<rect class="fl" x="0" y="275" width="400" height="25"/>' + it.sc.back)}${svg("sp-lf", it.sc.front)}
            ${zones.map((z, k) => `<button type="button" class="sp-zone" data-z="${k}" style="${at(z)}" aria-label="${T.here}"></button>`).join("")}</div>
        </div>`;
        const scene = document.getElementById("scene");
        const thing = document.getElementById("thing");
        const listenBtn = document.getElementById("listen");
        listenBtn.onclick = () => say(...said(it));
        let done = false;
        async function drop(k) {
          if (done) return;
          const z = zones[k];
          const b = scene.querySelector(`[data-z="${k}"]`);
          if (z.f !== it.f) {
            miss = true;
            b.classList.remove("no");
            void b.offsetWidth; // the shake again on a second try
            b.classList.add("no");
            say(...said(it));
            return;
          }
          done = true;
          if (!miss) api.star();
          scene.querySelectorAll(".sp-zone").forEach((x) => x.remove());
          thing.remove();
          scene.insertAdjacentHTML(
            "beforeend",
            `<span class="sp-put pop" style="${at(z)};z-index:${z.back ? 1 : 3}" aria-hidden="true">${esc(it.th.ic)}</span>`,
          );
          document.getElementById("hint").hidden = false; // the sentence, in both modes
          if (await say(...said(it))) api.next(scene);
        }
        scene
          .querySelectorAll(".sp-zone")
          .forEach((b) => (b.onclick = () => drop(+b.dataset.z)));
        // drag the thing: a copy follows the finger; let go over a spot to put it there
        thing.onpointerdown = (e) => {
          if (done) return;
          e.preventDefault();
          const r = thing.getBoundingClientRect();
          const ghost = thing.cloneNode(true);
          ghost.removeAttribute("id");
          ghost.classList.add("sp-drag");
          ghost.style.width = r.width + "px";
          document.body.appendChild(ghost);
          thing.classList.add("sp-held");
          const ox = e.clientX - r.left,
            oy = e.clientY - r.top;
          const mv = (ev) => {
            ghost.style.left = ev.clientX - ox + "px";
            ghost.style.top = ev.clientY - oy + "px";
          };
          mv(e);
          const up = (ev) => {
            removeEventListener("pointermove", mv);
            removeEventListener("pointerup", up);
            removeEventListener("pointercancel", up);
            ghost.remove();
            thing.classList.remove("sp-held");
            const z = document
              .elementsFromPoint(ev.clientX, ev.clientY)
              .find((x) => x.classList && x.classList.contains("sp-zone"));
            if (z) drop(+z.dataset.z);
          };
          addEventListener("pointermove", mv);
          addEventListener("pointerup", up);
          addEventListener("pointercancel", up);
        };
        if (!api.mode()) say(...said(it)); // «Слухати»: said at once; «Читати»: only with 🔊
      },
    });
  }

  ({ cards, guess, build, fly, place })[view]();
})();
