# Pick the frames to read from a scrolling screencast (see frames.sh): keep one whenever the content has moved more than half a screen
# from the last kept frame, or changed without scrolling (a new page, an item that finished loading).
# Usage: python3 -I pick.py <all frames folder> <out folder>
import sys, glob, os, shutil, numpy as np
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
fs = sorted(glob.glob(src + "/*.png"))
def load(f):
    a = np.asarray(Image.open(f).convert("L").resize((298, 220)), dtype=np.float32)
    return a[:, :280]  # drop the right-edge speaker icon column
def shift(a, b):
    # best vertical offset d so that b[y] ~ a[y+d]; returns (d, err)
    H = a.shape[0]; best = (0, 1e9)
    for d in range(-H + 40, H - 40):
        if d >= 0: x, y = a[d:], b[:H - d]
        else: x, y = a[:H + d], b[-d:]
        e = np.abs(x - y).mean()
        if e < best[1]: best = (d, e)
    return best
kept = []; last = None; acc = 0
for f in fs:
    a = load(f)
    if last is None:
        kept.append(f); last = a; continue
    d, e = shift(last, a)
    if e > 6 or abs(d) > 0.5 * a.shape[0]:
        kept.append(f); last = a
for i, f in enumerate(kept):
    shutil.copy(f, f"{dst}/k{i:04d}_{os.path.basename(f)}")
print(len(kept))
