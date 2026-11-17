#!/bin/bash
# Screenshot of one screen of a French lesson (headless Chromium, 1280x900 = a landscape tablet; 390 wide = a phone).
# Usage (from the repo root): shot.sh <lesson .html> <out.png> <tab>:<tile>[:<button>[:<steps>]] [off|en|uk|ar] [width]
#   tab = learn | play | dictee | ex; tile = its index in the tab (0 = first); button = a game button on a learn
#   screen (0 = first); steps = items to step through first.  e.g. shot.sh grade-4/term-1/french/lesson-3.html /tmp/v.png learn:3 en
# Then Read the png.
set -e
PAGE="$1"; OUTPNG="$(realpath -m "$2")"; SPEC="$3"; TR="${4:-off}"; WIDTH="${5:-1280}"; HERE="$(cd "$(dirname "$0")" && pwd)"
DIR="$(dirname "$PAGE")"; FILE="$(basename "$PAGE")"
PORT=$((8800 + RANDOM % 150)); PROFILE=$(mktemp -d)
sed "s/width: 1280px; height: 900px/width: ${WIDTH}px; height: 900px/" "$HERE/harness.html" > "$DIR/_harness-$$.html"
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$PROFILE" "$DIR/_harness-$$.html"' EXIT
sleep 1
timeout 60 chromium --headless=new --no-sandbox --disable-gpu --hide-scrollbars --user-data-dir="$PROFILE" \
  --virtual-time-budget=5000 --window-size=$WIDTH,900 --screenshot="$OUTPNG" \
  "http://127.0.0.1:$PORT/$DIR/_harness-$$.html?p=$FILE&tr=$TR&shot=$SPEC" 2>/dev/null
echo "$OUTPNG"
