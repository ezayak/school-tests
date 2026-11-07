#!/bin/bash
# Play every section of an Arabic page to its score screen in headless Chromium, one run per section.
# Usage (from the repo root): .claude/skills/arabic-hw-tests/scripts/play.sh test-3.html          (tabs and sections found in the .js)
#                             .claude/skills/arabic-hw-tests/scripts/play.sh lesson-5-exercises.html
# Prints one line per section: "score N / M", "cards", or "STUCK …" / "ERR …" / "timeout", and any JS error.
DIR=grade-3/term-1/arabic; PAGE="$1"; HERE="$(cd "$(dirname "$0")" && pwd)"
[ -f "$DIR/$PAGE" ] || { echo "no $DIR/$PAGE"; exit 2; }
JS=$(grep -o 'src="[a-z0-9-]*\.js"' "$DIR/$PAGE" | grep -v -e arabic-lesson -e common | head -1 | sed 's/src="//;s/"//')
SECS=$(node -e 'global.window={};eval(require("fs").readFileSync(process.argv[1],"utf8"));for(const s of window.LESSON.exercises)console.log((s.tab||"")+" "+s.k)' "$DIR/$JS")
PORT=$((8800 + RANDOM % 150))
cp "$HERE/harness.html" "$DIR/_harness.html"
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>"$DIR/.srv.log" & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -f "$DIR/_harness.html" "$DIR/.srv.log"' EXIT
sleep 1
while read -r TAB SEC; do
  PROFILE=$(mktemp -d)
  OUT=$(timeout 90 chromium --headless=new --no-sandbox --disable-gpu --user-data-dir="$PROFILE" --virtual-time-budget=30000 \
    --dump-dom "http://127.0.0.1:$PORT/$DIR/_harness.html?p=$PAGE&tab=$TAB&s=$SEC" 2>/dev/null | grep -o '<pre id="out">[^<]*' | sed 's/<pre id="out">//')
  [ -n "$OUT" ] && echo "$OUT" || echo "$TAB $SEC: timeout (run it again: one run in a few hangs)"
  rm -rf "$PROFILE"
done <<< "$SECS"
