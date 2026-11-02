#!/bin/bash
# Screenshot a page (1280×900) in headless Chromium.
# Usage: shot.sh <term folder> <out.png> <page.html> [tab sec id card]
#   tab = learn | play | ex, sec = section number, id = tile id (d-<deck>, g-<game>, x-<exercise>), card = next-card clicks
#   e.g. shot.sh grade-4/term-2/english /tmp/x.png unit3-week5.html ex 1 x-cspell
#   A story or a lesson home page: shot.sh grade-4/term-2/english /tmp/s.png story-vera.html
# Run from the repo root. Look at the picture afterwards (Read the .png).
set -e
DIR="$1"; OUT="$2"; PAGE="$3"; HERE="$(cd "$(dirname "$0")" && pwd)"
PORT=$((8900 + RANDOM % 100)); PROFILE=$(mktemp -d)
URL="http://127.0.0.1:$PORT/$DIR/$PAGE"
if [ -n "$4" ]; then
  cp "$HERE/shot.html" "$DIR/_shot.html"
  URL="http://127.0.0.1:$PORT/$DIR/_shot.html?p=$PAGE&tab=$4&sec=${5:-}&id=${6:-}&card=${7:-0}"
fi
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$PROFILE" "$DIR/_shot.html"' EXIT
sleep 1
timeout 60 chromium --headless=new --no-sandbox --disable-gpu --user-data-dir="$PROFILE" --hide-scrollbars \
  --window-size=1280,900 --virtual-time-budget=5000 --screenshot="$OUT" "$URL" >/dev/null 2>&1
echo "$OUT"
