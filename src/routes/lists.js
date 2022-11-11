'use strict';

const express = require('express');
const router = express.Router();
const List = require('./../models/lists');
const Book = require('./../models/books');
const bearerAuth = require('./../auth/bearer-auth');

router.use(bearerAuth);

router.post('/lists', async (request, response) => {
  try {
    const listRecord = await List.create(request.body);
    response.status(201).send(listRecord);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error creating list');
  }
});

router.get('/lists/:id', async (request, response) => {
  try {
    const listRecords = await List.find({user_id: request.params.id})
    response.status(200).send(listRecords);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error getting user lists');
  }
})

router.get('/lists/:id/:listName', async (request, response) => {
  try {
    const listRecord = await List.find({_id: request.params.id, listName: request.params.listName });
    response.status(200).send(listRecord);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error getting book list');
  }
});

router.put('/lists/:id', async (request, response) => {
  try {
    const listRecord = await List.find({_id: request.params.id});
    listRecord.books.push(request.body);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error adding book to list');
  }
});

router.delete('/lists/:id', async (request, response) => {
  try {
    const listRecord = await List.find({_id: request.params.id});
    await Book.deleteOne({ _id: request.params.id });
    response.status(200).send(listRecord[0]);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error deleting list');
  }
});

module.exports = router;
