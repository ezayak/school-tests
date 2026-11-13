#!/bin/bash
# Screenshot (or play) a shared/ukr-lesson.js page in headless Chromium: Optima Українська мова / література.
# Usage (from the repo root): ukr-lesson-shot.sh <out.png|-> <dir> <page.html> [steps] [width] [height]
#   dir: optima/grade-3/ukr-mova or optima/grade-3/ukr-lit; steps: see ukr-lesson-shot.html,
#   e.g. "reset;tab:tasks;click:#g-0;all;log". out "-" = no picture, print the log line (DOM dump).
set -e
OUT="$1"; DIR="$2"; PAGE="$3"; HERE="$(cd "$(dirname "$0")" && pwd)"
W="${5:-1280}"; H="${6:-900}"
PORT=$(python3 -c "import socket;s=socket.socket();s.bind((\"127.0.0.1\",0));print(s.getsockname()[1])"); PROFILE=$(mktemp -d)
cp "$HERE/ukr-lesson-shot.html" "$DIR/_shot.html"
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$PROFILE" "$DIR/_shot.html"' EXIT
sleep 1
STEPS=$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "${4:-}")
URL="http://127.0.0.1:$PORT/$DIR/_shot.html?p=$PAGE&w=$W&h=$H&do=$STEPS"
ARGS=(--headless=new --no-sandbox --disable-gpu --user-data-dir="$PROFILE" --hide-scrollbars --window-size=$W,$H --virtual-time-budget=${BUDGET:-8000})
if [ "$OUT" = "-" ]; then
  timeout 60 chromium "${ARGS[@]}" --dump-dom "$URL" 2>/dev/null | grep -o '<pre id="log">[^<]*' | sed 's/<pre id="log">//'
else
  timeout 60 chromium "${ARGS[@]}" --screenshot="$OUT" "$URL" >/dev/null 2>&1
  echo "$OUT"
fi
