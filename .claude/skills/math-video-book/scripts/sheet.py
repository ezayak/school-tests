# A contact sheet of frames with their numbers in red, to find where a lesson starts and ends.
# Usage: python3 -I sheet.py <frames folder> <out.png> <from> <to>   (frame indexes in the folder's sorted order, 48 per sheet reads well)
import sys, glob
from PIL import Image, ImageDraw

src, out, a, b = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
fs = sorted(glob.glob(src + "/*.png"))[a:b]
w, h, cols = 397, 294, 6
im = Image.new("RGB", (w * cols, h * ((len(fs) + cols - 1) // cols)), "white")
d = ImageDraw.Draw(im)
for i, f in enumerate(fs):
    x, y = (i % cols) * w, (i // cols) * h
    im.paste(Image.open(f).resize((w - 4, h - 4)), (x, y))
    d.rectangle([x, y, x + 40, y + 18], fill="red")
    d.text((x + 3, y + 3), str(a + i), fill="white")
im.save(out)
