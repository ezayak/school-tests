// My dictations: dictations that parents make on the device (my-dictations/). Saving on this device, the share code,
// the emoji pictures for words and sentences, and the data for the game: the spelling engine (shared/spelling.js)
// or, for Arabic, the Arabic dictation game (shared/spelling-ar.js, play-ar.html); both take MyDict.toSpelling.
// A dictation: {id, title, lang ("en-US" | "uk-UA" | "fr-FR" | "ar"), made (time), show, to, items: [{w, s, e, t, m}]}
//   show: "pic" (default: an emoji picture with each word) or "tr" (its translation instead, in the language to);
//   w: the word or sentence; s: true for a sentence; e: its picture (1–2 emoji; with "tr" only when there is no translation);
//   t: its translation (show "tr");
//   m: the letters to colour (indexes in w; not for Arabic: its letters join).
// Arabic words and sentences are kept without tashkeel (plain), even when the parent pastes them with it.
// Saved in localStorage ("my-dictations"): it stays on this device until the browser's site data is cleared.
// Share code: the dictation without id, packed (deflate) and written in URL-safe letters; "1…" packed, "0…" not packed
// (an old browser without CompressionStream). A link is my-dictations/index.html#add=<code>.
window.MyDict = (function () {
  const KEY = "my-dictations";
  const LANGS = {
    "en-US": { name: "English", emo: "en" },
    "uk-UA": { name: "Українська", emo: "uk" },
    "fr-FR": { name: "Français", emo: "fr" },
    ar: { name: "العربية", emo: "ar", rtl: true },
  };
  // the languages a dictation can be translated to (show: "tr")
  const TO = {
    uk: { name: "Українська" },
    en: { name: "English" },
    ar: { name: "العربية", rtl: true },
    fr: { name: "Français" },
  };
  // the code of a dictation's language for the translation service: "en-US" → "en"
  const code = (lang) => String(lang).split("-")[0];
  // the language to translate to when none fits: Ukrainian, or English for a Ukrainian dictation
  const toFor = (lang, to) =>
    TO[to] && to !== code(lang) ? to : code(lang) === "uk" ? "en" : "uk";
  const MAX_ITEMS = 60;

  /* ---------- saving on this device ---------- */
  function list() {
    try {
      const a = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(a) ? a.map(clean).filter(Boolean) : [];
    } catch (e) {
      return [];
    }
  }
  function write(a) {
    try {
      localStorage.setItem(KEY, JSON.stringify(a));
      return true;
    } catch (e) {
      return false;
    }
  }
  const get = (id) => list().find((d) => d.id === id) || null;
  // a new one goes first; an edited one stays in its place
  function save(d) {
    d = clean(d);
    if (!d) return false;
    if (!d.id)
      d.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const a = list();
    const i = a.findIndex((x) => x.id === d.id);
    if (i < 0) a.unshift(d);
    else a[i] = d;
    return write(a) ? d : false;
  }
  const remove = (id) => write(list().filter((d) => d.id !== id));
  // the same words, sentences and pictures as a saved one (a link opened twice)
  const same = (a, b) =>
    a.title === b.title && JSON.stringify(a.items) === JSON.stringify(b.items);
  const find = (d) => list().find((x) => same(x, d)) || null;

  /* ---------- checking data that comes from a link or from storage ---------- */
  const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const PIC = /\p{Extended_Pictographic}|\p{Regional_Indicator}/u;
  // the emoji in a text, at most 2 (more get cut off on a landscape tablet)
  function pics(s) {
    s = str(s, 40);
    if (!s || !PIC.test(s)) return [];
    const parts =
      typeof Intl !== "undefined" && Intl.Segmenter
        ? [
            ...new Intl.Segmenter(undefined, {
              granularity: "grapheme",
            }).segment(s),
          ].map((x) => x.segment)
        : Array.from(s);
    return parts.filter((g) => PIC.test(g)).slice(0, 2);
  }
  const emojiOnly = (s) => pics(s).join("");
  function clean(d) {
    if (!d || typeof d !== "object" || !Array.isArray(d.items)) return null;
    const items = d.items
      .slice(0, MAX_ITEMS)
      .map((it) => {
        if (!it || typeof it !== "object") return null;
        const w = str(it.w, 200).replace(/\s+/g, " ");
        if (!w) return null;
        const out = { w, s: !!it.s, e: emojiOnly(it.e) };
        const t = str(it.t, 160).replace(/\s+/g, " ");
        if (t) out.t = t;
        if (!out.s && Array.isArray(it.m)) {
          const m = [
            ...new Set(
              it.m.filter((i) => Number.isInteger(i) && i >= 0 && i < w.length),
            ),
          ].sort((a, b) => a - b);
          if (m.length) out.m = m;
        }
        return out;
      })
      .filter(Boolean);
    if (!items.length) return null;
    const lang = fitLang(
      LANGS[d.lang] ? d.lang : "en-US",
      items.map((it) => it.w).join(" "),
    );
    if (LANGS[lang].rtl)
      items.forEach((it) => {
        delete it.m;
        it.w = plain(it.w, lang);
      });
    const show = d.show === "tr" ? "tr" : "pic";
    return {
      id: typeof d.id === "string" && /^[a-z0-9]{1,20}$/.test(d.id) ? d.id : "",
      title: str(d.title, 80) || "My dictation",
      lang,
      made: Number.isFinite(d.made) ? d.made : Date.now(),
      show,
      to: toFor(lang, d.to),
      items,
    };
  }

  /* ---------- share code ---------- */
  const b64 = (bytes) => {
    let s = "";
    for (let i = 0; i < bytes.length; i += 0x8000)
      s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };
  const unb64 = (t) => {
    const s = atob(t.replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(s, (c) => c.charCodeAt(0));
  };
  const pipe = async (bytes, stream) =>
    new Uint8Array(
      await new Response(
        new Blob([bytes]).stream().pipeThrough(stream),
      ).arrayBuffer(),
    );
  // short keys: t title, l language, i items [w, picture, 1 = sentence, letters…];
  // with translations also o: the language to, and each item [w, picture, 1 = sentence, translation, letters…]
  async function encode(d) {
    const tr = d.show === "tr";
    const pack = {
      t: d.title,
      l: d.lang,
      ...(tr ? { o: d.to } : {}),
      i: d.items.map((it) => [
        it.w,
        it.e,
        it.s ? 1 : 0,
        ...(tr ? [it.t || ""] : []),
        ...(it.m || []),
      ]),
    };
    const bytes = new TextEncoder().encode(JSON.stringify(pack));
    if (typeof CompressionStream === "undefined") return "0" + b64(bytes);
    return "1" + b64(await pipe(bytes, new CompressionStream("deflate-raw")));
  }
  // a code, or a whole link / message that has one; null when it cannot be read
  async function decode(text) {
    const s = String(text || "").trim();
    const m =
      s.match(/add=([A-Za-z0-9_-]+)/) || s.match(/^([01][A-Za-z0-9_-]{8,})$/);
    if (!m) return null;
    try {
      let bytes = unb64(m[1].slice(1));
      if (m[1][0] === "1")
        bytes = await pipe(bytes, new DecompressionStream("deflate-raw"));
      const p = JSON.parse(new TextDecoder().decode(bytes));
      if (!p || !Array.isArray(p.i)) return null;
      const tr = typeof p.o === "string";
      return clean({
        title: p.t,
        lang: p.l,
        show: tr ? "tr" : "pic",
        to: p.o,
        items: p.i.map(
          (a) =>
            Array.isArray(a) && {
              w: a[0],
              e: a[1],
              s: a[2] === 1,
              t: tr ? a[3] : "",
              m: a.slice(tr ? 4 : 3),
            },
        ),
      });
    } catch (e) {
      return null;
    }
  }
  // the link that opens the maker page with the dictation in it
  const link = (code, base) =>
    new URL("index.html#add=" + code, base || location.href).href;

  // the language a text is written in, by its letters: "ar" (Arabic letters), "uk-UA" (Cyrillic), "latin", or "" (none)
  function script(text) {
    const n = (re) => (String(text).match(re) || []).length;
    const ar = n(/[\u0621-\u064A]/g),
      cy = n(/[\u0400-\u04FF]/g),
      la = n(/[A-Za-zÀ-ÿ]/g);
    const top = Math.max(ar, cy, la);
    if (!top) return "";
    return top === ar ? "ar" : top === cy ? "uk-UA" : "latin";
  }
  // the chosen language, or the one the letters of the text show when they don't fit it
  // (Arabic words with English chosen → Arabic, so they play right to left in the Arabic game)
  function fitLang(lang, text) {
    const sc = script(text);
    if (!sc) return lang;
    if (sc === "latin")
      return LANGS[lang].rtl || lang === "uk-UA" ? "en-US" : lang;
    return sc;
  }
  // the pasted text without the translations after " - " (for the language of the words)
  const wordsOnly = (text) =>
    String(text || "")
      .split(/\r?\n/)
      .map((l) => l.replace(/^\s*[-–•*·]\s*/, "").split(TR_SEP)[0])
      .join("\n");
  // Arabic without tashkeel (harakat, shadda, sukun, tanween, dagger alef) and tatweel; other languages as they are
  const plain = (w, lang) =>
    LANGS[lang] && LANGS[lang].rtl
      ? String(w).replace(/[\u064B-\u065F\u0670\u0640]/g, "")
      : String(w);

  /* ---------- pasted text → items ---------- */
  // one item per line; "1." "2)" "١." "-" "•" at the start are removed; a line with commas (, ، ;) and no spaces
  // between the words ("cat, dog, hen") is several words; a sentence = ends with . ? ! ؟ or has 3 words or more.
  // lang: Arabic text loses its tashkeel here, so the list shows the plain letters.
  // tr: a line can also have its translation after " - ", " – ", " — ", " = " or a tab ("cat - кіт").
  const TR_SEP = /\s+[-–—=]\s+|\t+/;
  function parse(text, lang, tr) {
    const out = [];
    for (let line of String(text || "").split(/\r?\n/)) {
      line = line.replace(/^\s*(?:[\d٠-٩]+\s*[.)\-]|[-–•*·])\s*/, "");
      let t = "";
      if (tr && TR_SEP.test(line)) {
        const k = line.search(TR_SEP);
        t = line.slice(k).replace(TR_SEP, "").replace(/\s+/g, " ").trim();
        line = line.slice(0, k);
      }
      line = plain(line, lang).replace(/\s+/g, " ").trim();
      if (!line) continue;
      if (t) {
        const sent = /[.?!…؟]["»”']?$/.test(line) && /\s/.test(line);
        out.push({
          ...(sent || line.split(" ").length >= 3
            ? { w: line, s: true }
            : word(line)),
          t,
        });
        continue;
      }
      const parts = line.split(/\s*[,;،؛]\s*/).filter(Boolean);
      if (parts.length > 1 && parts.every((p) => !/\s/.test(p))) {
        parts.forEach((p) => out.push(word(p)));
        continue;
      }
      const sent = /[.?!…؟]["»”']?$/.test(line) && /\s/.test(line);
      out.push(
        sent || line.split(" ").length >= 3 ? { w: line, s: true } : word(line),
      );
    }
    return out.slice(0, MAX_ITEMS);
  }
  const word = (w) => ({
    w: w.replace(/^["«“]+|[.,;:!?"»”،؛؟]+$/g, ""),
    s: false,
  });

  /* ---------- emoji pictures ---------- */
  const DICT = {}; // emo code → Map(word → [emoji])
  const loading = {};
  // the word lists are big: each is loaded when it is needed (path from the page: ../shared/)
  function loadEmoji(lang, dir = "../shared/") {
    const c = (LANGS[lang] || { emo: lang }).emo;
    if (DICT[c]) return Promise.resolve();
    return (loading[c] ||= new Promise((res) => {
      const done = () => {
        const txt = (window.EMOJI_WORDS || {})[c] || "";
        DICT[c] = new Map(
          txt.split("\n").map((l) => {
            const a = l.split(" ");
            return [a[0], a.slice(1)];
          }),
        );
        res();
      };
      const s = document.createElement("script");
      s.src = dir + "emoji-words-" + c + ".js";
      s.onload = s.onerror = done;
      document.head.appendChild(s);
    }));
  }
  // a word as the emoji lists have it: lower case, ' for ’; Arabic without tashkeel, one alef, ى → ي, ة → ه
  // (the same as ar_norm in .claude/scripts/emoji-words.py)
  const low = (w) => {
    w = String(w)
      .toLowerCase()
      .replace(/’/g, "'")
      .replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, "");
    if (!/[\u0600-\u06FF]/.test(w)) return w;
    return w
      .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه");
  };
  // the word as it is, then without its ending (birds → bird, babies → baby, boxes → box, jumped → jump)
  function forms(w, c) {
    const f = [w];
    if (c === "en") {
      if (/ies$/.test(w)) f.push(w.slice(0, -3) + "y");
      if (/(s|x|z|ch|sh)es$/.test(w)) f.push(w.slice(0, -2));
      if (/s$/.test(w)) f.push(w.slice(0, -1));
      if (/ed$/.test(w)) f.push(w.slice(0, -2), w.slice(0, -1));
      if (/ing$/.test(w)) f.push(w.slice(0, -3), w.slice(0, -3) + "e");
      if (/([^aeiou])\1(ed|ing)$/.test(w))
        f.push(w.replace(/(.)(ed|ing)$/, ""));
    }
    if (c === "fr") {
      if (/[sx]$/.test(w)) f.push(w.slice(0, -1));
      if (/e$/.test(w)) f.push(w.slice(0, -1));
    }
    // Arabic: without "and", "the", "with the" … at the start (وَالْقِطَّةُ → قطه), then without a plural ending
    if (c === "ar") {
      const m = w.match(/^(?:وال|فال|بال|كال|ال|لل|و|ف|ب)(.{3,})$/);
      if (m) f.push(m[1]);
      for (const x of [...f]) {
        const p = x.match(/^(.{3,})(?:ات|ون|ين|ان)$/);
        if (p) f.push(p[1], p[1] + "ه");
      }
    }
    return f;
  }
  // the emoji for one word, best first; loose: also a word of the list that starts the same (кити → кит)
  function emojiFor(w, lang, loose = true) {
    const c = (LANGS[lang] || { emo: lang }).emo;
    const D = DICT[c];
    w = low(w);
    if (!D || w.length < 2) return [];
    for (const f of forms(w, c)) if (D.has(f)) return D.get(f);
    if (!loose || w.length < 4) return [];
    for (let n = w.length - 1; n >= Math.max(3, w.length - 3); n--) {
      const head = w.slice(0, n);
      let best = null;
      for (const k of D.keys())
        if (
          k.startsWith(head) &&
          k.length <= w.length + 1 &&
          (!best || k.length < best.length)
        )
          best = k;
      if (best) return D.get(best);
    }
    return [];
  }
  // words a sentence's picture is not taken from
  const STOP = {
    en: "a an and are as at be been but by can could did do does for from had has have he her his i if in is it its me my no not of on or our she so than that the their them then there these they this those to too us very was we were what when where which who why will with would yes you your",
    uk: "а але б би був була були було в вже він вона вони воно все ви від для до дуже є же з за зі і із й їх її його як я ми мій моя на над не по про під та так те ти то той ту ці це цей чи що ще",
    fr: "a à au aux avec ce ces cet cette d dans de des du elle elles en est et était il ils j je l la le les leur ma mais me mes mon n ne nous on ou où par pas pour qu que qui sa se ses son sont sur ta te tes ton tu un une vous y",
    ar: "في من الي علي عن مع هذا هذه ذلك تلك هو هي هم هما انا انت نحن ما ماذا لا لم لن قد ثم او ان كان كانت التي الذي الذين كل بعض عند لكن هل يا",
  };
  // words with their letters and marks (Arabic tashkeel are marks, not letters)
  const words = (t) => String(t).match(/[\p{L}\p{M}'’]+/gu) || [];
  // the picture of an item: a word's first emoji; a sentence: the words of the word list in it first, then
  // its other words, at most 2 emoji. keys: the words of the dictation's word list.
  // the words of a sentence that can have a picture: the words of the word list first, then the others
  function picWords(text, lang, keys = []) {
    const c = (LANGS[lang] || {}).emo;
    const stop = new Set((STOP[c] || "").split(" "));
    const ws = words(text)
      .map(low)
      .filter((w) => w.length > 1 && !stop.has(w));
    const keyset = new Set(keys.map(low));
    return [...new Set([...ws.filter((w) => keyset.has(w)), ...ws])];
  }
  function suggest(it, lang, keys = []) {
    if (!it.s) return emojiFor(it.w, lang)[0] || "";
    const out = [];
    const keyset = new Set(keys.map(low));
    for (const w of picWords(it.w, lang, keys)) {
      // a word of the word list is found as loosely as the word's own picture (яблука → яблуко)
      const e = emojiFor(w, lang, keyset.has(w))[0];
      if (e && !out.includes(e)) out.push(e);
      if (out.length === 2) break;
    }
    return out.join("");
  }
  // choices for the picture picker, in the item's language and in English: for a word or a sentence (keys as in
  // suggest), or for a word typed in the search box (search: true; then also the words that start with it)
  function choices(text, lang, { keys = [], search = false, max = 24 } = {}) {
    const out = [];
    const add = (es) =>
      es.forEach((e) => out.length < max && !out.includes(e) && out.push(e));
    const ws = picWords(text, lang, keys);
    if (!ws.length) ws.push(...words(text).map(low));
    for (const c of [lang, "en-US"])
      for (const w of ws) {
        add(emojiFor(w, c));
        const D = DICT[(LANGS[c] || {}).emo];
        if (D && search && w.length >= 2)
          for (const [k, es] of D) if (k.startsWith(w)) add(es.slice(0, 3));
      }
    return out;
  }

  /* ---------- translations (show: "tr") ---------- */
  // a translation from MyMemory (api.mymemory.translated.net: free, no key, about 5000 characters a day
  // per device); "" when there is none (no internet, the day's limit, the same text back). The parent can
  // always type it or write it in the list.
  async function translate(text, from, to) {
    const url =
      "https://api.mymemory.translated.net/get?q=" +
      encodeURIComponent(text) +
      "&langpair=" +
      encodeURIComponent(code(from) + "|" + to);
    try {
      const ctl = new AbortController();
      const stop = setTimeout(() => ctl.abort(), 10000);
      const r = await fetch(url, {
        referrerPolicy: "no-referrer",
        signal: ctl.signal,
      });
      clearTimeout(stop);
      const j = await r.json();
      let t = String((j.responseData || {}).translatedText || "");
      if (j.responseStatus != 200 || /MYMEMORY|QUERY LENGTH|INVALID/i.test(t))
        return "";
      t = t
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();
      // "معلم/teacher": the translation, without the word itself after a slash
      if (to !== "en" && /\/[A-Za-z\s]+$/.test(t))
        t = t.replace(/\/[A-Za-z\s]+$/, "");
      return t.toLowerCase() === text.toLowerCase() ? "" : t.slice(0, 160);
    } catch (e) {
      return "";
    }
  }
  // the translation drawn as a picture (an SVG card, 320 × 180, as the pictures of both games), so it shows in the
  // picture's place with no change to the engines: the words on lines that fit, as big as they can be, and the language below
  function trPic(t, to) {
    const x = (v) =>
      String(v).replace(
        /[&<>"]/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
      );
    const ws = String(t).split(" ");
    const lines = [];
    const max = Math.max(12, Math.ceil(Math.sqrt(t.length * 2.6)));
    for (const w of ws) {
      const l = lines[lines.length - 1];
      if (l && (l + " " + w).length <= max)
        lines[lines.length - 1] = l + " " + w;
      else lines.push(w);
    }
    const long = Math.max(...lines.map((l) => l.length));
    const size = Math.round(
      Math.min(64, 290 / (long * 0.58), 128 / (lines.length * 1.2)),
    );
    const L = TO[to] || { name: "" };
    const y0 = 82 - ((lines.length - 1) * size * 1.2) / 2;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect width="320" height="180" fill="#e4f0fb"/><g font-family="Nunito, 'Atkinson Hyperlegible', 'Noto Naskh Arabic', Arial, sans-serif" font-weight="700" fill="#1b2440" text-anchor="middle"${L.rtl ? ' direction="rtl"' : ""}>${lines
      .map(
        (l, i) =>
          `<text x="160" y="${(y0 + i * size * 1.2).toFixed(1)}" font-size="${size}" dominant-baseline="central">${x(l)}</text>`,
      )
      .join(
        "",
      )}</g><text x="160" y="164" font-family="Arial, sans-serif" font-size="14" fill="#56637f" text-anchor="middle">${x(L.name)}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  // the picture of an item in the game: its translation card, or its emoji
  const usesTr = (d, it) => d.show === "tr" && !!it.t;

  /* ---------- for the spelling engine ---------- */
  // letter indexes → [[start, length], …]
  function ranges(m) {
    const out = [];
    for (const i of m || []) {
      const last = out[out.length - 1];
      if (last && last[0] + last[1] === i) last[1]++;
      else out.push([i, 1]);
    }
    return out;
  }
  // the first word of the word list that is in the sentence, as a whole word
  function keyOf(sent, keys) {
    const ws = words(sent).map(low);
    return keys.find((k) => ws.includes(low(k))) || "";
  }
  function toSpelling(d) {
    const keys = d.items.filter((i) => !i.s).map((i) => i.w);
    const L = LANGS[d.lang];
    return {
      title: d.title,
      heading: "Dictation:",
      subtitle: "My dictation · " + L.name,
      lang: d.lang,
      home: "../index.html",
      hub: "index.html",
      hubName: "My dictations",
      autoMark: false,
      items: d.items.map((it) =>
        it.s
          ? {
              w: it.w,
              type: "sentence",
              ...(usesTr(d, it)
                ? { img: trPic(it.t, d.to) }
                : { emoji: it.e || "❓" }),
              key: keyOf(it.w, keys),
            }
          : {
              w: it.w,
              ...(usesTr(d, it)
                ? { img: trPic(it.t, d.to) }
                : { emoji: it.e || "❓" }),
              ...(it.m ? { mark: ranges(it.m) } : {}),
            },
      ),
    };
  }

  /* ---------- the page that plays a dictation ---------- */
  // play.html (spelling engine), or play-ar.html for Arabic (shared/spelling-ar.js)
  const playUrl = (d) =>
    (LANGS[d.lang] && LANGS[d.lang].rtl ? "play-ar.html" : "play.html") +
    "?id=" +
    encodeURIComponent(d.id);
  return {
    LANGS,
    list,
    get,
    save,
    remove,
    find,
    clean,
    pics,
    encode,
    decode,
    link,
    parse,
    plain,
    fitLang,
    wordsOnly,
    TO,
    toFor,
    translate,
    trPic,
    loadEmoji,
    emojiFor,
    suggest,
    choices,
    ranges,
    toSpelling,
    playUrl,
  };
})();
