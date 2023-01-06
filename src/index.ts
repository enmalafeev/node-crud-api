import http from 'http';
import { DataBase } from './db.js';

const PORT = process.env.PORT || 3000;
const db = new DataBase();

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.users));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});
server.listen(PORT, () => console.log(`Server has been started on ${PORT}`));
