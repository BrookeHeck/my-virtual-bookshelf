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

// beforeAll(async () => {
//   try {
//     db.connect(process.env.DB_URI);
//     const response = await mockRequest
//       .post('/signup')
//       .send(userData.testUser);
//     const userObject = response.body;
//     userId = userObject._id;
//     accessToken = userObject.token;
//   } catch(e) {console.log(e)}
// })

// afterAll(async () => {
//   await mockRequest
//   .delete(`/remove-user/${userId}`)
//   .set('Authorization', `Bearer ${accessToken}`);
//   db.disconnect();
// });

describe('Books Router', () => {
  test('Placeholder', () => {
    expect(true).toBeTruthy();
  })  
});