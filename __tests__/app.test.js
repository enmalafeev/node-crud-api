import request from 'supertest';
import { server } from '../src/index.ts';

describe('GET /api/users', () => {
  it('responds with empty users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
});
