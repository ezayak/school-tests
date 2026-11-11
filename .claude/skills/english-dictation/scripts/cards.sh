#!/bin/bash
# Screenshot of every Learn card of a dictation (picture, word or sentence, highlight), 5 per row.
# Usage (from the repo root): cards.sh <dictation .html> <out.png>
#   e.g. .claude/skills/english-dictation/scripts/cards.sh grade-4/term-2/english/english-dictation-unit2-week5.html /tmp/cards.png
# Then look at the picture (Read the .png).
set -e
PAGE="$1"; OUT="$2"; HERE="$(cd "$(dirname "$0")" && pwd)"
DIR=$(dirname "$PAGE"); NAME=$(basename "$PAGE")
N=$(node -e 'global.window={};eval(require("fs").readFileSync(process.argv[1],"utf8"));console.log(window.SPELLING.items.length)' "${PAGE%.html}.js")
ROWS=$(( (N + 4) / 5 ))
PORT=$((8900 + RANDOM % 100)); PROFILE=$(mktemp -d)
cp "$HERE/cards.html" "$DIR/_cards.html"
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$PROFILE" "$DIR/_cards.html"' EXIT
sleep 1
timeout 400 chromium --headless=new --no-sandbox --disable-gpu --user-data-dir="$PROFILE" --hide-scrollbars \
  --window-size=1600,$((ROWS * 300)) --virtual-time-budget=15000 --screenshot="$OUT" \
  "http://127.0.0.1:$PORT/$DIR/_cards.html?p=$NAME&n=$N" >/dev/null 2>&1 || { echo "FAILED: chromium did not finish (timeout?)"; exit 1; }
echo "$OUT ($N cards)"
