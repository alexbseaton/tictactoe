from http.server import BaseHTTPRequestHandler, HTTPServer
import threading


class Handler(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()

    def do_GET(self):
        return self.splash_screen()

    def do_HEAD(self):
        self._set_headers()

    def do_POST(self):
        return self.splash_screen()

    def splash_screen(self):
        self._set_headers()
        with open('tic_tac_toe.html', 'r') as f:
            self.wfile.write(str.encode(f.read()))


def run(port=8080):
    '''Runs a server that uses the Handler defined above.'''
    server_address = ('', port)
    httpd = HTTPServer(server_address, Handler)
    print('Starting httpd...\nAccessible on:\nhttp://localhost:{}'.format(port))
    httpd.serve_forever()


if __name__ == "__main__":
    server_thread = threading.Thread(target=run)
    # lets the program exit even if this thread is still running
    server_thread.daemon = True
    server_thread.start()
    while True:
        pass  # keep the server alive
