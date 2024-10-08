import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app'; // Adjust the path to where your app is defined
import { UserModel } from '../models/models'; // Adjust this path as necessary
import exp from 'constants';

beforeAll(async () => {
    // Connect to a test database
    const uri = 'mongodb://127.0.0.1:27017/planthora-v1'; // Replace with your test DB URI
    await mongoose.connect(uri);
});

afterAll(async () => {
    // Clean up after tests
    // await UserModel.deleteMany({});
    // await UserModel.deleteOne({name: 'testName edit'});
    await mongoose.connection.close();
});

describe('User API', () => {
    let userId: string;

    it('POST /user - Should create a new user', async () => {
        const newUser = {
            name: 'testName',
            lastname: 'testLastName',
            username: 'testUserName',
        };

        const res = await request(app).post('/user').send(newUser);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.name).toBe('testName');
        expect(res.body.lastname).toBe('testLastName');
        expect(res.body.username).toBe('testUserName');

        userId = res.body._id;
    });

    it('GET /user - Should retrieve all users', async () => {
        const res = await request(app).get('/user');

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('all users');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /user/:id - Should retrieve a user by ID', async () => {
        const res = await request(app).get(`/user/${userId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Displaying one user');
        expect(res.body.data).toHaveProperty('_id', userId);
        expect(res.body.data.name).toBe('testName');
        expect(res.body.data.lastname).toBe('testLastName');
        expect(res.body.data.username).toBe('testUserName');
    });

    it('PATCH /user/:id - Should modify a user by ID', async () => {
        
        const updatedUser = {
            name: 'testName edit',
            lastname: 'testLastName edit',
        };
        const res = await request(app).patch(`/user/${userId}`).send(updatedUser);
        
        console.log(res.body); // Log the body
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('User modified successfully');
        expect(res.body.data.name).toBe('testName edit');
        expect(res.body.data.lastname).toBe('testLastName edit');
    });

    it('DELETE /user/:id - Should delete The updated user by its ID', async () => {
        const initialRes = await request(app).get('/user');
        const initialLength = initialRes.body.data.length
        
        const resDel = await request(app).delete(`/user/${userId}`);
        expect(resDel.statusCode).toEqual(200);
        
        const afterDelRes = await request(app).get('/user');
        const afterDelLength = afterDelRes.body.data.length
        
        expect(afterDelLength).toBeLessThan(initialLength);
    });

    it('DELETE /user/:id - Should return error', async () => {
        const res = await request(app).delete(`/user/invalid_id`);
        expect(res.statusCode).toBe(500);
        // expect(delNonExistentUser.body.message).toBe("User not found");
    });

});