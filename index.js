// index.js

const http = require('http');

// Dummy username and password
const USERNAME = 'admin';
const PASSWORD = '1234';

// Simple authentication function
function authenticate(username, password) {
    if (username === USERNAME && password === PASSWORD) {
        return 'Login successful!';
    } else {
        return 'Invalid credentials!';
    }
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Route handling
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Home Page!');
    } else if (req.method === 'POST' && req.url === '/login') {
        // Collect POST data
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const username = params.get('username');
            const password = params.get('password');

            const message = authenticate(username, password);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

