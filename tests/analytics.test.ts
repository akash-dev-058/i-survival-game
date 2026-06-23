import request from 'supertest';
import app from '../src/app';
import jwt from 'jsonwebtoken';
import config from '../src/config';

// Generate a valid JWT for testing authenticated routes
function generateTestToken(): string {
  return jwt.sign({ sub: 'test-user', role: 'tester' }, config.jwtSecret, { expiresIn: '1h' });
}

describe('POST /api/analytics', () => {
  it('should reject unauthenticated requests', async () => {
    const response = await request(app).post('/api/analytics').send({ eventType: 'test', payload: {} });
    expect(response.status).toBe(401);
    expect(response.body.error.message).toMatch(/Missing or malformed Authorization header/);
  });

  it('should validate request payload', async () => {
    const token = generateTestToken();
    const response = await request(app)
      .post('/api/analytics')
      .set('Authorization', `Bearer ${token}`)
      .send({ wrongField: 'oops' });
    expect(response.status).toBe(400);
    expect(response.body.error.message).toMatch(/Invalid analytics payload/);
  });

  it('should accept a valid analytics event', async () => {
    const token = generateTestToken();
    const response = await request(app)
      .post('/api/analytics')
      .set('Authorization', `Bearer ${token}`)
      .send({ eventType: 'player_jump', payload: { height: 2.5 } });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Event recorded');
  });
});
