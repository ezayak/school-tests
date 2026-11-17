#!/bin/bash
# Open every tab and tile of a French lesson and play every game and exercise to its score screen (headless Chromium).
# Usage (from the repo root): play.sh <lesson .html> [play|dump] [off|en|uk|ar]
#   e.g. play.sh grade-4/term-1/french/lesson-3.html
# play: one line per tile ("N steps", "N cards", "open", or "STUCK at item N"), then "no JS errors" or ERRORS, then DONE.
# dump: the HTML of every screen (Math.random seeded), for compare.sh.
set -e
PAGE="$1"; MODE="${2:-play}"; TR="${3:-off}"; HERE="$(cd "$(dirname "$0")" && pwd)"
[ -f "$PAGE" ] || { echo "no $PAGE"; exit 2; }
DIR="$(dirname "$PAGE")"; FILE="$(basename "$PAGE")"
PORT=$((8800 + RANDOM % 150)); PROFILE=$(mktemp -d)
cp "$HERE/harness.html" "$DIR/_harness-$$.html"
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$PROFILE" "$DIR/_harness-$$.html"' EXIT
sleep 1
timeout 590 chromium --headless=new --no-sandbox --disable-gpu --user-data-dir="$PROFILE" \
  --virtual-time-budget=3000000 --dump-dom "http://127.0.0.1:$PORT/$DIR/_harness-$$.html?p=$FILE&mode=$MODE&tr=$TR" 2>/dev/null |
  sed -n '/<pre id="out">/,/<\/pre>/p' | sed 's/<pre id="out">//; s/<\/pre>//' |
  sed 's/&lt;/</g;s/&gt;/>/g;s/&quot;/"/g;s/&amp;/\&/g'
