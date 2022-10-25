import app from '../index';
import supertest from 'supertest';
const request = supertest(app);

describe('testing if the endpoint returns with status 200', () => {
  it('runs the endpoint', async () => {
    const response = await request.get(
      '/api/resize?picname=fjord.jpg&width=600&height=800'
    );
    expect(response.status).toBe(200);
  });
});
