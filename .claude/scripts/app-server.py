#!/usr/bin/env python3
"""The local version of the Study Games app (this working copy), for other computers and tablets.

  python3 .claude/scripts/app-server.py          http://127.0.0.1:8780 on this computer
  python3 .claude/scripts/app-server.py --lan    also http://mollers-pi.local:8780 from a computer / tablet at home
  https://mollers-pi.cheetah-krait.ts.net:8443   from your own devices anywhere (tailscale serve --bg --https=8443 http://127.0.0.1:8780)

Runs as the user service school-app.service (.claude/scripts/inbox/systemd/). Serves the repo as GitHub Pages does,
without the hidden folders (.git, .claude: scripts, notes, done lists). No password: the app is public on GitHub Pages anyway.
Every answer says "check again" (no-cache), so a change in the working copy shows on the next load; the app's own
service worker still keeps its copy until VERSION in sw.js changes (the http:// home-network address has no service worker).
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[2]
PORT = 8780


class Handler(SimpleHTTPRequestHandler):
    def send_head(self):
        parts = unquote(urlparse(self.path).path).split("/")
        if any(p.startswith(".") and p not in (".", "..") for p in parts):
            self.send_error(404)
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, *args):  # quiet
        pass


Handler.extensions_map = {
    **SimpleHTTPRequestHandler.extensions_map,
    ".js": "text/javascript",
    ".webmanifest": "application/manifest+json",
}

if __name__ == "__main__":
    host = "0.0.0.0" if "--lan" in sys.argv else "127.0.0.1"
    server = ThreadingHTTPServer((host, PORT), partial(Handler, directory=str(ROOT)))
    where = (
        "https://mollers-pi.cheetah-krait.ts.net:8443 (Tailscale), http://mollers-pi.local:{0} (home network) and http://127.0.0.1:{0}"
        if host == "0.0.0.0"
        else "http://127.0.0.1:{0}"
    )
    print("Study Games (local copy): " + where.format(PORT) + "  (Ctrl+C to stop)", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
