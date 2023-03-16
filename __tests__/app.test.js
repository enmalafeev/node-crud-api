import request from 'supertest';
import { server } from '../src/index.ts';

const userData = {
  username: 'John',
  age: 42,
  hobbies: ['skiing']
};

const updateUser = {
  username: 'Fred',
  age: 21,
  hobbies: []
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
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toEqual(userData.username);
    expect(response.body.age).toEqual(userData.age);
    expect(response.body.hobbies).toEqual(userData.hobbies);
  });
});

describe('GET /api/users/{id}', () => {
  it('responds with created new user per id', async () => {
    const response = await request(server).post('/api/users').send(userData);
    const user = await request(server).get(`/api/users/${response.body.id}`);
    expect(user.status).toEqual(200);
    expect(user.body.id).toEqual(response.body.id);
    expect(user.body.username).toEqual(userData.username);
    expect(user.body.age).toEqual(userData.age);
    expect(user.body.hobbies).toEqual(userData.hobbies);
  });
});

describe('PUT /api/users/{id}', () => {
  it('responds with updated user data', async () => {
    const response = await request(server).post('/api/users').send(userData);
    const user = await request(server).put(`/api/users/${response.body.id}`).send(updateUser);
    expect(user.status).toEqual(200);
    expect(user.body.id).toEqual(response.body.id);
    expect(user.body.username).toEqual(updateUser.username);
    expect(user.body.age).toEqual(updateUser.age);
    expect(user.body.hobbies).toEqual(updateUser.hobbies);
  });
});
