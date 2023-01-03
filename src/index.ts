import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello, World!');
});
server.listen(PORT);
