'use strict';

const server = require('./../../src/server').server;
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Test that user is not authenticated without a good access token', () => {
  test('Should not allow authentication with invalid token', async () => {
    const response = await mockRequest.get('/users')
      .set('Authorization', 'Bearer badtoken');
    expect(response.status).toEqual(403);
    expect(response.text).toEqual('Invalid Authorization');
  });
});