#!/bin/bash
# Screenshot a math page in headless Chromium.
# Usage: shot.sh <out.png> <page.html> [steps] [width] [height]   (run from the repo root)
#   BUDGET=40000 shot.sh … for long steps (a whole game: answer:rrrrrrrr)
#   steps: see shot.html, e.g. "reset;tab:tasks;go:3;click:#helpBtn"
#   e.g. shot.sh /tmp/x.png lesson-1.html "tab:tasks;go:2;click:#solBtn"
set -e
DIR=optima/grade-3/math; OUT="$1"; PAGE="$2"; HERE="$(cd "$(dirname "$0")" && pwd)"
W="${4:-1280}"; H="${5:-900}"
PORT=$(python3 -c "import socket;s=socket.socket();s.bind((\"127.0.0.1\",0));print(s.getsockname()[1])"); PROFILE=$(mktemp -d)
cp "$HERE/shot.html" "$DIR/_shot.html"
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$PROFILE" "$DIR/_shot.html"' EXIT
sleep 1
STEPS=$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "${3:-}")
timeout 60 chromium --headless=new --no-sandbox --disable-gpu --user-data-dir="$PROFILE" --hide-scrollbars \
  --window-size=$W,$H --virtual-time-budget=${BUDGET:-5000} --screenshot="$OUT" \
  "http://127.0.0.1:$PORT/$DIR/_shot.html?p=$PAGE&w=$W&h=$H&do=$STEPS" >/dev/null 2>&1
echo "$OUT"
