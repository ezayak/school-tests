#!/usr/bin/env python3
"""Crop pictures for a French lesson from rendered book / slide pages, and make a contact sheet.

Usage: python3 -I crop.py <spec.json> <out folder> [contact.png]

spec.json: {"<page.png>": {"<name>": [x0, y0, x1, y1, width], ...}, ...}
  x0..y1 are fractions of the page (0–1), so the same box works at any render DPI;
  width is the saved width in px (people ~250–500, panels ~700, the comic ~1000).
Saves <out folder>/<name>.jpg (JPEG q85, never enlarged), then a contact sheet with each
picture's name under it: look at it for text cut at an edge or bits of the next panel.
"""
import json
import os
import sys

from PIL import Image, ImageDraw


def main():
    spec_path, out = sys.argv[1], sys.argv[2]
    sheet_path = sys.argv[3] if len(sys.argv) > 3 else os.path.join(out, "_contact.png")
    spec = json.load(open(spec_path))
    base = os.path.dirname(os.path.abspath(spec_path))
    os.makedirs(out, exist_ok=True)
    thumbs = []
    for page, boxes in spec.items():
        im = Image.open(page if os.path.isabs(page) else os.path.join(base, page)).convert("RGB")
        W, H = im.size
        for name, (x0, y0, x1, y1, w) in boxes.items():
            c = im.crop((round(x0 * W), round(y0 * H), round(x1 * W), round(y1 * H)))
            if c.width > w:
                c = c.resize((w, round(c.height * w / c.width)), Image.LANCZOS)
            c.save(os.path.join(out, name + ".jpg"), quality=85)
            t = c.copy()
            t.thumbnail((260, 260))
            thumbs.append((name, t, c.size))
    cols = 5
    cw, ch = 270, 290
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cw, max(1, rows) * ch), "white")
    d = ImageDraw.Draw(sheet)
    for i, (name, t, size) in enumerate(thumbs):
        x, y = (i % cols) * cw + 5, (i // cols) * ch + 5
        sheet.paste(t, (x, y))
        d.rectangle((x - 1, y - 1, x + t.width, y + t.height), outline="red")
        d.text((x, y + 265), f"{name} {size[0]}x{size[1]}", fill="black")
    sheet.save(sheet_path)
    print(f"{len(thumbs)} pictures in {out}, contact sheet {sheet_path}")


if __name__ == "__main__":
    main()
