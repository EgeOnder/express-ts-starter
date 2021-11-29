import supertest from 'supertest';
import app from '../app';

// Test GET endpoints
describe('Get endpoints', () => {
    it('Main route of API', async () => {
        const res = await supertest(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });
});

// Test POST endpoints
describe('Post endpoints', () => {});
