// Service worker: makes Study Games work offline once installed.
// Every game listed in games.js is downloaded automatically, so adding a game
// only needs games.js to change. Shared styles/scripts live in shared/ and are listed in CORE.
// Bump VERSION if you want to force a full refresh.
const VERSION = "v55";
const CACHE = "study-games-" + VERSION;
const CORE = [
  "./",
  "./index.html",
  "./index.css",
  "./index.js",
  "./games.js",
  "./manifest.webmanifest",
  "./quiz-common.js",
  "./landscape.css",
  "./english-hub.css",
  "./english-hub.js",
  "./shared/theme.css",
  "./shared/quiz.css",
  "./shared/common.js",
  "./shared/lesson.css",
  "./shared/computer-lesson.css",
  "./shared/computer-lesson.js",
  "./shared/wordsim.css",
  "./shared/wordsim.js",
  "./shared/arabic.css",
  "./shared/arabic-revision.css",
  "./shared/spelling.css",
  "./shared/drag-words.css",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
];

// Precache straight from the server, not the browser's HTTP cache, so one version never mixes old pages with new CSS.
const fresh = (p) => new Request(p, { cache: "reload" });

async function gamePaths() {
  try {
    const res = await fetch("./games.js", { cache: "no-store" });
    const txt = await res.text();
    const paths = [...txt.matchAll(/path:\s*"([^"]+)"/g)].map(
      (m) => "./" + m[1],
    );
    // extra files a game needs offline (lesson pages, scripts, pictures): also: ["a", "b"]
    for (const m of txt.matchAll(/also:\s*\[([^\]]*)\]/g))
      for (const f of m[1].matchAll(/"([^"]+)"/g)) paths.push("./" + f[1]);
    return paths;
  } catch (e) {
    return [];
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(CORE.map(fresh));
      const games = await gamePaths();
      await Promise.all(games.map((p) => cache.add(fresh(p)).catch(() => {})));
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith("study-games-") && k !== CACHE)
          .map((k) => caches.delete(k)),
      );
      // pick up games added since install
      const cache = await caches.open(CACHE);
      const games = await gamePaths();
      await Promise.all(
        games.map(async (p) => {
          if (!(await cache.match(p)))
            await cache.add(fresh(p)).catch(() => {});
        }),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Google Fonts: cache-first
  if (
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com"
  ) {
    event.respondWith(
      caches.open(CACHE).then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          c.put(req, res.clone());
          return res;
        } catch (e) {
          return hit || Response.error();
        }
      }),
    );
    return;
  }
  if (url.origin !== location.origin) return;
  // School videos are online only: never saved, so the app stays small (the lesson shows a message when offline)
  if (url.pathname.includes("/video/")) return;
  // Own files: network first (so updates show up), cache as offline fallback
  event.respondWith(
    (async () => {
      const c = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        if (res.ok) c.put(req, res.clone());
        return res;
      } catch (e) {
        return (
          (await c.match(req, { ignoreSearch: true })) ||
          (await c.match("./index.html")) ||
          Response.error()
        );
      }
    })(),
  );
});
