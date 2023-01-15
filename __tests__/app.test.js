import request from 'supertest';
import { server } from '../src/index.ts';

const userData = {
  username: 'John',
  age: 42,
  hobbies: ['skiing']
};

afterAll((done) => {
  server.close();
  done();
});

describe('GET /api/users', () => {
  it('responds with empty users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
});

describe('POST /api/users', () => {
  it('responds with created new user', async () => {
    const response = await request(server).post('/api/users').send(userData);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual(userData.username);
    expect(response.body.age).toEqual(userData.age);
    expect(response.body.hobbies).toEqual(userData.hobbies);
  });
});
