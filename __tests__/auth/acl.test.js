'use strict';

const server = require('./../../src/server').server;
const db = require('./../../src/models');
const supertest = require('supertest');
const mockRequest = supertest(server);

let userData = {
  testUser: { username: 'user', password: 'password', role:'user' },
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
  .send({role:'admin'})
  .set('Authorization', `Bearer ${accessToken}`);
  db.disconnect();
});

describe('Test that user that is not admin cannot get all user', () => {
  test('Should not allow signin with wrong username and password', async () => {
    const response = await mockRequest.get('/users')
      .send({role:'admin'})
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Invalid Authorization');
  });
});