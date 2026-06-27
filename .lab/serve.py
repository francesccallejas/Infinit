#!/usr/bin/env python3
"""Local dev server WITH HTTP Range support (206) so Chrome can play <video>.
Run from the repo root:   python3 .lab/serve.py
Then open:                http://localhost:8000/.lab/relats-cinematic.html
"""
import http.server, socketserver, os, re

PORT = 8000

class RangeHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        if not os.path.exists(path):
            self.send_error(404, "File not found")
            return None
        ctype = self.guess_type(path)
        fs = os.stat(path)
        size = fs.st_size
        rng = self.headers.get("Range")
        f = open(path, "rb")
        if rng:
            m = re.match(r"bytes=(\d*)-(\d*)", rng)
            start = int(m.group(1)) if m.group(1) else 0
            end = int(m.group(2)) if m.group(2) else size - 1
            end = min(end, size - 1)
            length = end - start + 1
            self.send_response(206)
            self.send_header("Content-Type", ctype)
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
            self.send_header("Content-Length", str(length))
            self.end_headers()
            f.seek(start)
            self._copy_range(f, length)
            f.close()
            return None
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(size))
        self.end_headers()
        return f

    def _copy_range(self, f, length):
        remaining = length
        while remaining > 0:
            chunk = f.read(min(64 * 1024, remaining))
            if not chunk:
                break
            try:
                self.wfile.write(chunk)
            except (BrokenPipeError, ConnectionResetError):
                break
            remaining -= len(chunk)

os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), RangeHandler) as httpd:
    print(f"Serving WITH range support at http://localhost:{PORT}/")
    print(f"Open: http://localhost:{PORT}/.lab/relats-cinematic.html")
    httpd.serve_forever()
