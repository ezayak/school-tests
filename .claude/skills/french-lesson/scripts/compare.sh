#!/bin/bash
# Engine change check: every French lesson and revision must look and play the same with the changed engine.
# Dumps every screen of every page (seeded Math.random, translations off and EN) from git HEAD and from the
# working tree, and diffs them. Usage (from the repo root): compare.sh [pages…]
#   default pages: every grade-{3,4}/term-1/french/{lesson,revision}-*.html that exists at HEAD.
# Prints "same" or the first lines of the diff for each page; the dumps stay in $OUT for a closer look.
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(pwd)"
OUT="${OUT:-$(mktemp -d)}"; OLD="$OUT/old-tree"; mkdir -p "$OLD"
git archive HEAD | tar -x -C "$OLD"
PAGES=("$@")
[ ${#PAGES[@]} -gt 0 ] || PAGES=($(cd "$OLD" && ls grade-3/term-1/french/{lesson,revision}-*.html grade-4/term-1/french/{lesson,revision}-*.html 2>/dev/null))
fail=0
for p in "${PAGES[@]}"; do
  for tr in off en; do
    k="$(echo "$p" | tr / _)-$tr"
    (cd "$OLD" && bash "$HERE/play.sh" "$p" dump $tr) > "$OUT/$k.old"
    bash "$HERE/play.sh" "$p" dump $tr > "$OUT/$k.new"
    n=$(grep -c '^=== ' "$OUT/$k.new" || true)
    if cmp -s "$OUT/$k.old" "$OUT/$k.new"; then echo "same  $p ($tr, $n screens)"
    else fail=1; echo "DIFF  $p ($tr)"; diff "$OUT/$k.old" "$OUT/$k.new" | head -20; fi
    grep -q '^DONE' "$OUT/$k.new" || { fail=1; echo "  (the dump did not finish)"; }
  done
done
echo "dumps in $OUT"
exit $fail
