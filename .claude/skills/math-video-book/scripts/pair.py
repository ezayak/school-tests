# Frames side by side at full size (the e-book's left 800 px, where the text is), to read them two or three at a time.
# Usage: python3 -I pair.py <frames folder> <out.png> 12,13[,14]   (frame indexes in the folder's sorted order)
import sys, glob
from PIL import Image

src, out, idx = sys.argv[1], sys.argv[2], [int(x) for x in sys.argv[3].split(",")]
fs = sorted(glob.glob(src + "/*.png"))
ims = [Image.open(fs[i]).crop((0, 0, 800, 881)) for i in idx]
im = Image.new("RGB", (805 * len(ims), 881), "black")
for j, x in enumerate(ims):
    im.paste(x, (j * 805, 0))
im.save(out)
