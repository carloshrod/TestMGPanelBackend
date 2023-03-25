const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const server = require('../src/index');
const UserModel = require('../src/models/userModel');

const api = request(app);
const ROUTE = '/api/v1/users';

const userId = '641d0d91bf04ce12403682de';
const wrongUserId = '641cad208caf0af8d19e1e30';
const testUser = { name: 'test', email: 'test@test.com' };
const duplicatedUser = { name: 'Duplicated user', email: 'chrod@test.com' };
const testUpdatedUser = { name: 'Updated user', email: 'test@test.com' };

beforeEach(async () => {
	await mongoose.connect(process.env.MONGODB_URI);
});

describe('GET /users', () => {
	test('should return an array of users', async () => {
		const res = await api
			.get(ROUTE)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(res.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					_id: expect.any(String),
					name: expect.any(String),
					email: expect.any(String),
					subscribed: expect.any(Boolean),
				}),
			])
		);
	});

	describe('/:_id', () => {
		test('should return the user with the given id', async () => {
			const res = await api
				.get(`${ROUTE}/${userId}`)
				.expect(200)
				.expect('Content-Type', /application\/json/);

			expect(res.body).toEqual(
				expect.objectContaining({
					_id: expect.any(String),
					name: expect.any(String),
					email: expect.any(String),
					subscribed: expect.any(Boolean),
				})
			);
		});

		test('should respond with a 404 status code if user not found', async () => {
			await api.get(`${ROUTE}/${wrongUserId}`).expect(404);
		});
	});
});

describe('POST /users', () => {
	describe('given a correct name and email', () => {
		test('should create a new user and return it', async () => {
			const res = await api
				.post(ROUTE)
				.send(testUser)
				.expect(201)
				.expect('Content-Type', /application\/json/);
			expect(res.body).toEqual(
				expect.objectContaining({
					_id: expect.any(String),
					name: expect.any(String),
					email: expect.any(String),
					subscribed: expect.any(Boolean),
				})
			);
		});
	});

	describe('when name and/or email are missing', () => {
		test('should respond with a 400 status code', async () => {
			const data = [{ name: 'test' }, { email: 'test@test.com' }, {}];
			for (const obj of data) {
				await api.post(ROUTE).send(obj).expect(400);
			}
		});
	});

	describe('when there is already a user with the given email', () => {
		test('should respond with a 400 status code', async () => {
			await api.post(ROUTE).send(duplicatedUser).expect(400);
		});
	});
});

describe('PUT /users/:_id', () => {
	test('should update a user and return it', async () => {
		const userToUpdate = await UserModel.findOne({ email: testUser.email });

		const res = await api
			.put(`${ROUTE}/${userToUpdate._id}`)
			.send(testUpdatedUser)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(res.body.name).toBe(testUpdatedUser.name);
		expect(res.body.email).toBe(testUpdatedUser.email);
		expect(res.body).toEqual(
			expect.objectContaining({
				_id: expect.any(String),
				name: expect.any(String),
				email: expect.any(String),
				subscribed: expect.any(Boolean),
			})
		);
	});

	test('should respond with a 404 status code if user to update is not found', async () => {
		await api.put(`${ROUTE}/${wrongUserId}`).expect(404);
	});
});

describe('PATCH /users/:_id', () => {
	test('should unsubscribe a user and respond with a 200 status code', async () => {
		const userToUnsubscribe = await UserModel.findOne({
			email: testUser.email,
		});

		await api.patch(`${ROUTE}/${userToUnsubscribe._id}`).expect(200);
	});

	test('should respond with a 404 status code if user to unsubscribe is not found', async () => {
		await api.patch(`${ROUTE}/${wrongUserId}`).expect(404);
	});
});

describe('DELETE /users/:_id', () => {
	test('should delete a user and respond with a 200 status code', async () => {
		const userToDelete = await UserModel.findOne({ email: testUser.email });

		await api.delete(`${ROUTE}/${userToDelete._id}`).expect(200);
	});

	test('should respond with a 404 status code if user to delete is not found', async () => {
		await api.delete(`${ROUTE}/${wrongUserId}`).expect(404);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
	server.close();
});
