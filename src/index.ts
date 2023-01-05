import http from 'http';

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello, World!');
});
server.listen(PORT, () => console.log(`Server has been started on ${PORT}`));
