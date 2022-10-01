'use strict';

const express = require('express');
const router = express.Router();
const List = require('./../models/lists');
const Book = require('./../models/books');
const { request, response } = require('express');

router.post('/lists', async (request, response) => {
  try {
    const listRecord = await List.create(request.body);
    response.status(201).send(listRecord);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error creating list');
  }
});

router.get('/lists/:id/:listName', async (request, response) => {
  try {
    const listRecord = await List.find({user_id: request.params.id, listName: request.params.listName });
    const bookRecords = listRecord.books.map(async (book_id) => await Book.findById(book_id));
    response.status(200).send(bookRecords);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error getting book list');
  }
});

router.put('/lists/:id/:listName/:book_id', async () => {
  try {
    const listRecord = await List.find({user_id: request.params.id, listName: request.params.listName});
    listRecord.books.push(request.params.book_id);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error adding book to list');
  }
});
