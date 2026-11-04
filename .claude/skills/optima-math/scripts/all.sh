# Usage: all.sh FROM TO   (run from the repo root) — clicks through every slide, exercise and game of lessons FROM…TO
# in headless Chromium and prints one line per lesson: "ok", or the JS errors / empty solutions.
set -e
DIR=optima/grade-3/math; HERE="$(cd "$(dirname "$0")" && pwd)"
PORT=$(python3 -c "import socket;s=socket.socket();s.bind((\"127.0.0.1\",0));print(s.getsockname()[1])"); PROFILE=$(mktemp -d)
cp "$HERE/all.html" "$DIR/_all.html"
python3 -m http.server $PORT --bind 127.0.0.1 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV 2>/dev/null; rm -rf "$PROFILE" "$DIR/_all.html"' EXIT
sleep 1
timeout 300 chromium --headless=new --no-sandbox --disable-gpu --user-data-dir="$PROFILE" --virtual-time-budget=120000 \
  --dump-dom "http://127.0.0.1:$PORT/$DIR/_all.html?from=$1&to=$2" 2>/dev/null | sed -n '/<pre id="out">/,/DONE/p' | sed 's/<[^>]*>//g'
