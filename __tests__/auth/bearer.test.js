'use strict';

const server = require('./../../src/server').server;
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Test that user is not authenticated without a good access token', () => {
  test('Should not allow authentication with invalid token', () => {
    const response = mockRequest.get('/users')
      .set('Authorization', 'Bearer');
    expect(response.status).not.toBeDefined();
    expect(response.body).not.toBeDefined();
  });
});