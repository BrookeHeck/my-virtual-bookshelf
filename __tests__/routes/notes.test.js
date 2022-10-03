'use strict';

process.env.SECRET = "TEST_SECRET";

const db = require('./../../src/models');
const supertest = require('supertest');
const { expressJwtSecret } = require('jwks-rsa');
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

const noteData = {
  header: 'header',
  date: '10/02/2022',
  note: 'my notes',
  book_id: bookData._id,
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

    const response2 = await mockRequest.post('/my-books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(bookData);
    bookData._id = response2.body._id;
    noteData.book_id = response2.body._id;

  } catch(e) {console.log(e)}
});

afterAll(async () => {
  await mockRequest
    .delete(`/remove-user/${userId}`)
    .set('Authorization', `Bearer ${accessToken}`);
  db.disconnect();
});

describe('Notes Router', () => {
  test('Add a note associated with a book', async () => {
    const response = await mockRequest.post('/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(noteData);
    const addedNote = response.body;
    expect(response.status).toEqual(201);
    expect(addedNote.book_id).toEqual(noteData.book_id);
  });

  test('Get all the notes associated with a book', async () => {
    // add another note to make sure we are getting all the notes for that book
    const response2 = await mockRequest.post('/notes')
    .set('Authorization', `Bearer ${accessToken}`)
    .send(noteData);
    noteData._id = response2.body._id;

    const response = await mockRequest.get(`/notes/${noteData.book_id}`)
      .set('Authorization', `Bearer ${accessToken}`)
    const notes = response.body;
    expect(response.status).toEqual(200);
    expect(notes.length).toEqual(2);
    expect(notes[0].book_id).toEqual(bookData._id);
    expect(notes[1].book_id).toEqual(bookData._id);
  });

  test('Edit note', async () => {
    noteData.note = 'Another note';
    const response = await mockRequest.put(`/notes/${noteData._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(noteData);
    const updatedNote = response.body;
    expect(response.status).toEqual(200);
    expect(updatedNote.note).toEqual('Another Note');
  });

  test('Delete note', async () => {
    const response = await mockRequest.delete(`/notes/${noteData._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(noteData);
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(`Successfully delete note with id ${noteData._id}`);
  });
});