# Join the kept frames of one lesson into long pages without the overlap (the e-book scrolls), to read a lesson in a few pictures.
# Usage: python3 -I stitch.py <keep folder> <from> <to> <out prefix>   (frame indexes, to included)
#   writes <prefix>-1.png, <prefix>-2.png … (the text column, 800 px wide, up to 1800 px high each); a frame that is not a scroll
#   of the one before (a new page, an item that loaded) is added whole, under a red line.
import sys, glob
import numpy as np
from PIL import Image, ImageDraw

src, a, b, out = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
fs = sorted(glob.glob(src + "/*.png"))[a : b + 1]
W, H = 800, 862  # the text column; the bottom rows are the scroll bar


def load(f):
    return Image.open(f).convert("RGB").crop((0, 0, W, H))


def gray(im, k=1):
    g = np.asarray(im.convert("L"), dtype=np.float32)
    return g[::k, ::k]


def offset(p, q):
    # q is p scrolled down by d rows: q[y] == p[y + d]; returns (d, error)
    A, B = gray(p, 2), gray(q, 2)
    h = A.shape[0]
    best = (0, 1e9)
    for d in range(0, h - 40):
        e = np.abs(A[d:] - B[: h - d]).mean()
        if e < best[1]:
            best = (d, e)
    # refine at full size
    A, B = gray(p), gray(q)
    h = A.shape[0]
    best2 = (0, 1e9)
    for d in range(max(0, best[0] * 2 - 3), min(h - 40, best[0] * 2 + 4)):
        e = np.abs(A[d:] - B[: h - d]).mean()
        if e < best2[1]:
            best2 = (d, e)
    return best2


parts = [load(fs[0])]
for f in fs[1:]:
    im = load(f)
    d, e = offset(load_prev, im) if (load_prev := parts[-1].crop((0, parts[-1].height - H, W, parts[-1].height))) else (0, 99)
    if e < 8 and d > 0:
        parts[-1] = Image.fromarray(np.vstack([np.asarray(parts[-1]), np.asarray(im)[H - d :]]))
    elif e < 8:
        continue  # the same screen
    else:
        sep = Image.new("RGB", (W, 6), (220, 0, 0))
        parts[-1] = Image.fromarray(np.vstack([np.asarray(parts[-1]), np.asarray(sep), np.asarray(im)]))
long = parts[-1]
n = 0
for y in range(0, long.height, 1800):
    n += 1
    long.crop((0, y, W, min(long.height, y + 1800))).save(f"{out}-{n}.png")
print(n, "pages,", long.height, "px")
