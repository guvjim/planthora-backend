import request from 'supertest';
import app from '../app';


describe('GET /', () => {
    it('Should say hi to you', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Hello, you!');
    });
});