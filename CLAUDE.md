# CLAUDE.md

Study games for Grade 3–4 tablets: plain HTML/CSS/JS, no build step, served from GitHub Pages, works offline as a PWA.
Read README.md first. It has the structure, the lesson/dictation formats and the "after adding X" steps.

## Styling and shared code
- `shared/` is the one place for styles and helpers; pages have no `<style>` blocks. The goal is that new pages can't drift from the standard look.
- A rule used by more than one page goes into the shared file every one of those pages loads. `shared/theme.css` is loaded first by every page, including all hubs.
  Example: `.play-arrow` (keeps "Play →" / "Open →" on one line) lives only in theme.css, not copied into index.css / lesson.css / english-hub.css.
- Before adding CSS, check which stylesheets the target pages actually load (`grep -n "<link" .../index.html`). The English hubs load theme.css + english-hub.css only, not lesson.css.
- Markup shared by several engines goes into `Kit` in `shared/common.js` (e.g. `Kit.lessonCard(it, label)` for French and Computer hub cards). A page that uses Kit must load `shared/common.js` before its own scripts.

## Formatting
- All JS and the shared CSS are Prettier-formatted (Prettier 3.3.3, installed globally, defaults, no config). Keep it that way. The user reads the code.
- Check: `prettier --check "**/*.js" shared/ index.css english-hub.css`. Fix: `prettier --write <files>`.
- Formatting-only changes go in their own commit, never mixed with logic changes.
- `sw.js` finds game files by running regexes on the text of `games.js` (`path: "…"`, `also: [...]`). After reformatting games.js, confirm that it still finds the same file list.

## Offline cache (sw.js)
- Any change to a precached file (CORE, anything in games.js `path`/`also`) needs `VERSION` bumped in `sw.js`, or installed tablets keep the old files offline.
- Bump once, in a separate last commit after the related changes.
- Precache uses `new Request(p, {cache: "reload"})` so a version never mixes old pages with new CSS. Keep it.

## Checking changes
- Local server: `python3 -m http.server 8765 --bind 127.0.0.1` from the repo root; open the hubs:
  `index.html`, `grade-4/term-1/{french,english}/index.html`, `grade-{3,4}/computer/index.html`, `grade-3/term-1/english/index.html`.
- The service worker caches aggressively. For old-vs-new comparisons, use a fresh port or unregister the SW first.
- For a refactor of generated markup, compare old and new HTML output in node (the two versions should produce the same string).
- JS syntax check: `node --check <file>`.

## Workflow
- Changes come in small stages (≤5 changes each). Show the diff and wait for approval before applying.
- One commit per concern: fix / refactor / formatting / sw.js version bump.
- Commit messages: no Co-Authored-By line. Don't push unless asked.
