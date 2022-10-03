'use strict';

process.env.SECRET = "TEST_SECRET";

const db = require('./../../src/models');
const supertest = require('supertest');
const server = require('./../../src/server').server;
require('dotenv').config();

const mockRequest = supertest(server);

const userData = {
  testUser: { username: 'user', password: 'password' },
};

const bookData = {
  title: 'title',
  author:'author',
  genre: 'genre',
  date:'10/1/2022',
  status:'finished',
}

let accessToken = null;
let userId = null;

beforeAll(async () => {
  try {
    db.connect(process.env.DB_URI);
    const response = await mockRequest
      .post('/signup')
      .send(userData.testUser);
    const userObject = response.body;
    userId = userObject._id;
    accessToken = userObject.token;
    bookData.user_id = userId;
  } catch(e) {console.log(e)}
});

afterAll(async () => {
  let response = await mockRequest
    .delete(`/remove-user/${userId}`)
    .set('Authorization', `Bearer ${accessToken}`);
  db.disconnect();
});

describe('Books Router', () => {

  test('Add a book associated with the user', async () => {
    const response = await mockRequest.post('/my-books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(bookData);
    const addedBook = response.body;
    expect(response.status).toEqual(201);
    expect(addedBook).toBeDefined();
    expect(addedBook.user_id).toEqual(userId);
  });

  test('Should return books associated with user', async () => {
    // add another book to the user, make sure we get both books back on a get request
    const response2 = await mockRequest.post('/my-books')
      .set('Authorization',  `Bearer ${accessToken}`)
      .send(bookData);
    bookData._id = response2.body._id;
    const response = await mockRequest.get(`/my-books/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`);
    const bookList = response.body;
    expect(response.status).toEqual(200);
    expect(bookList.length).toEqual(2);
    expect(bookList[0].user_id).toEqual(userId);
    expect(bookList[1].user_id).toEqual(userId);
  });

  test('Should update the book based on the book id', async () => {
    bookData.title = 'new title';
    const response = await mockRequest.put(`/my-books/${bookData._id}`)
      .send(bookData)
      .set('Authorization', `Bearer ${accessToken}`);
    const updatedBook = response.body;
    expect(response.status).toEqual(200);
    expect(updatedBook.title).toEqual('new title');
    expect(updatedBook._id).toEqual(bookData._id);
  });

  test('Should delete a book by id', async () => {
    const response = await mockRequest.delete(`/my-books/${bookData._id}`)
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(`Book _id ${bookData._id} successfully deleted`);
  });
});