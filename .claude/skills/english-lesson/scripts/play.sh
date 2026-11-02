#!/bin/bash
# Play every game and exercise of a lesson to its score screen in headless Chromium.
# Usage: play.sh <term folder> <lesson .html>   e.g. play.sh grade-4/term-2/english unit3-week5.html
# Run from the repo root. Prints one line per game/exercise: "N steps", or "STUCK at …", and any JS errors.
set -e
DIR="$1"; PAGE="$2"; HERE="$(cd "$(dirname "$0")" && pwd)"
[ -f "$DIR/$PAGE" ] || { echo "no $DIR/$PAGE"; exit 2; }
PORT=$((8800 + RANDOM % 100)); PROFILE=$(mktemp -d)
cp "$HERE/harness.html" "$DIR/_harness.html"
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$PROFILE" "$DIR/_harness.html"' EXIT
sleep 1
timeout 590 chromium --headless=new --no-sandbox --disable-gpu --user-data-dir="$PROFILE" \
  --virtual-time-budget=500000 --dump-dom "http://127.0.0.1:$PORT/$DIR/_harness.html?p=$PAGE" 2>/dev/null |
  sed -n '/<pre id="out">/,/<\/pre>/p' | sed 's/<[^>]*>//g' | sed 's/&lt;/</g;s/&gt;/>/g;s/&amp;/\&/g' | cut -c1-300
