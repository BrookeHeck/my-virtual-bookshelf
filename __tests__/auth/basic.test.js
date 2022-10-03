'use strict';

const server = require('./../../src/server').server;
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Test that user is not authenticated without username and password', () => {
  test('Should not allow signin with wrong username and password', () => {
    const response = mockRequest.post('/signin')
      .auth({username: 'bad user', password: 'bad pass'})
    expect(response.status).not.toBeDefined();
    expect(response.text).not.toBeDefined();
  });
});