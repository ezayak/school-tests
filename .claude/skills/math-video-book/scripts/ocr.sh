#!/bin/bash
# Text of a lesson's frames with tesseract (sudo apt install tesseract-ocr): the words come out clean, stacked fractions do not
# ("40/100" reads "40 / 700"): read the questions here, then look at the pictures only for fractions, grids and drawings.
# Usage: ocr.sh <keep folder> <from> <to>   (frame indexes) — prints each kept frame's text once, repeated lines dropped
K="$1"; A="$2"; B="$3"
ls "$K" | sed -n "$((A+1)),$((B+1))p" | while read f; do
  echo "=== $f"
  tesseract "$K/$f" - 2>/dev/null | grep -v '^\s*$'
done | awk '!seen[$0]++ || /^===/'
