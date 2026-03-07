from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent
MARKETING_DIR = BASE_DIR / "company_state" / "products" / "chef_at_home" / "marketing"
WAITLIST_FILE = BASE_DIR / "company_state" / "waitlist.json"

class DevServerHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # Serve from marketing directory by default
        original_path = super().translate_path(path)
        relative_path = os.path.relpath(original_path, os.getcwd())
        
        # If it's the root, serve landing_page.html
        if path == "/" or path == "":
            return str(MARKETING_DIR / "landing_page.html")
        
        # Otherwise, check if it exists in marketing dir
        if (MARKETING_DIR / relative_path).exists():
            return str(MARKETING_DIR / relative_path)
            
        return original_path

    def do_POST(self):
        if self.path == '/waitlist':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(post_data)
            
            email = data.get('email')
            if email:
                self.save_email(email)
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {"status": "success", "message": f"Added {email} to waitlist"}
                self.wfile.write(json.dumps(response).encode())
            else:
                self.send_response(400)
                self.end_headers()
        else:
            self.send_response(404)
            self.end_headers()

    def save_email(self, email):
        waitlist = []
        if WAITLIST_FILE.exists():
            try:
                with open(WAITLIST_FILE, 'r') as f:
                    waitlist = json.load(f)
            except:
                pass
        
        if email not in waitlist:
            waitlist.append(email)
            with open(WAITLIST_FILE, 'w') as f:
                json.dump(waitlist, f, indent=2)

def run():
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, DevServerHandler)
    print(f"Server started at http://localhost:{port}")
    print(f"Serving files from: {MARKETING_DIR}")
    print(f"Waitlist data will be saved to: {WAITLIST_FILE}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
