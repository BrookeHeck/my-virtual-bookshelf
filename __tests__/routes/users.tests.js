'use strict';

process.env.SECRET = "TEST_SECRET";

const db = require('./../../src/models');
const supertest = require('supertest');
const server = require('./../../src/server').server;
require('dotenv').config();

const mockRequest = supertest(server);

let userData = {
  testUser: { username: 'user', password: 'password' },
};
let accessToken = null;
let userId = null;

beforeAll(async () => {
  try {
    db.connect(process.env.DB_URI);
  } catch(e) {console.log(e)}
})

afterAll(async () => {
  await mockRequest
  .delete(`/remove-user/${userId}`)
  .set('Authorization', `Bearer ${accessToken}`);
  db.disconnect();
});

describe('Auth Router', () => {

  test('Can create a new user', async () => {

    const response = await mockRequest
      .post('/signup')
      .send(userData.testUser);
    const userObject = response.body;
    userId = userObject._id;
    accessToken = userObject.token;

    expect(response.status).toBe(201);
    expect(userObject._id).toBeDefined();
    expect(userObject.username).toEqual(userData.testUser.username);
  });

  test('Can signin with basic auth string', async () => {
    let { username, password } = userData.testUser;

    const response = await mockRequest.post('/signin')
      .auth(username, password);

    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.token).toBeDefined();
    expect(userObject.user._id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });

  test('basic fails with known user and wrong password ', async () => {

    const response = await mockRequest.post('/signin')
      .auth('user', 'xyz');
    const { user, token } = response.body;

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Login");
    expect(user).not.toBeDefined();
    expect(token).not.toBeDefined();
  });

  test('basic fails with unknown user', async () => {

    const response = await mockRequest.post('/signin')
      .auth('nobody', 'xyz');
    const { user, token } = response.body;

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Login");
    expect(user).not.toBeDefined();
    expect(token).not.toBeDefined();
  });

  test('bearer fails with an invalid token', async () => {

    // First, use basic to login to get a token
    const response = await mockRequest.get('/users')
      .set('Authorization', `Bearer foobar`);
    const userList = response.body;

    // Not checking the value of the response, only that we "got in"
    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Authorization");
    expect(userList.length).toBeFalsy();
  });

  test('Succeeds with a valid token', async () => {

    const response = await mockRequest.get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toEqual(expect.anything());
  });

  it('Secret Route fails with invalid token', async () => {
    const response = await mockRequest.get('/secret')
      .set('Authorization', `bearer accessgranted`);

    expect(response.status).toBe(403);
    expect(response.text).toEqual("Invalid Authorization");
  });
});