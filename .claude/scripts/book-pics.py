#!/usr/bin/env python3
# Find the pictures on a book page and crop them (Optima reading / language books: colour pictures among black text).
# Usage: python3 -I .claude/scripts/book-pics.py <book.pdf> <page> <out-dir> [min-size-px]
#   Renders the page at 200 dpi, marks the coloured pixels (not white, not grey / black text), joins the ones close together,
#   and saves every box bigger than min-size (default 160 px a side) as <out-dir>/p<page>-<i>.png, plus <out-dir>/p<page>-boxes.png
#   (the page with the boxes numbered in red) to look at. The page header and footer garlands (top / bottom 7 %) are skipped.
#   Then pick the right crops, save them with PIL as img/lesson-N/<name>.jpg (quality 85), and look at them.
import os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFilter

pdf, page, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
minside = int(sys.argv[4]) if len(sys.argv) > 4 else 160
os.makedirs(out, exist_ok=True)
tmp = tempfile.mkdtemp()
subprocess.run(["pdftoppm", "-r", "200", "-f", str(page), "-l", str(page), "-png", pdf, f"{tmp}/p"], check=True)
im = Image.open(os.path.join(tmp, sorted(os.listdir(tmp))[0])).convert("RGB")
W, H = im.size
# a small copy to find the boxes: 1 px = 4 px of the page
s = im.resize((W // 4, H // 4))
hsv = s.convert("HSV")
w, h = s.size
mask = Image.new("L", (w, h), 0)
mp, hp, sp = mask.load(), hsv.load(), s.load()
for y in range(int(h * 0.07), int(h * 0.93)):
    for x in range(w):
        H_, S_, V_ = hp[x, y]
        if S_ > 60 and V_ > 60:
            mp[x, y] = 255
mask = mask.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MaxFilter(5))
# connected parts (flood fill)
px = mask.load()
seen = set()
boxes = []
for y in range(h):
    for x in range(w):
        if px[x, y] and (x, y) not in seen:
            st = [(x, y)]
            seen.add((x, y))
            x0 = x1 = x
            y0 = y1 = y
            while st:
                cx, cy = st.pop()
                x0, x1, y0, y1 = min(x0, cx), max(x1, cx), min(y0, cy), max(y1, cy)
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < w and 0 <= ny < h and px[nx, ny] and (nx, ny) not in seen:
                        seen.add((nx, ny))
                        st.append((nx, ny))
            if (x1 - x0) * 4 >= minside and (y1 - y0) * 4 >= minside:
                boxes.append((x0 * 4, y0 * 4, (x1 + 1) * 4, (y1 + 1) * 4))
boxes.sort(key=lambda b: (b[1], b[0]))
show = im.copy()
d = ImageDraw.Draw(show)
for i, b in enumerate(boxes):
    im.crop(b).save(f"{out}/p{page}-{i}.png")
    d.rectangle(b, outline=(255, 0, 0), width=6)
    d.text((b[0] + 10, b[1] + 10), str(i), fill=(255, 0, 0))
show.resize((W // 3, H // 3)).save(f"{out}/p{page}-boxes.png")
for i, b in enumerate(boxes):
    print(f"p{page}-{i}.png  box {b}  size {b[2]-b[0]}x{b[3]-b[1]}")
