import http.server
import socketserver


PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map={
    '.manifest': 'text/cache-manifest',
	'.html': 'text/html',
    '.png': 'image/png',
	'.jpg': 'image/jpg',
	'.svg':	'image/svg+xml',
	'.css':	'text/css',
	'.js':	'text/javascript',
    '.json': 'application/json',
    '.xml': 'application/xml',
	'': 'application/octet-stream', # Default
    }


class MyHTTPRequestHandler(Handler):
    def end_headers(self):
        self.send_my_headers()
        Handler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")


httpd = socketserver.TCPServer(("", PORT), MyHTTPRequestHandler)

print("serving at port", PORT)
httpd.serve_forever()
