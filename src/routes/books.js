'use strict';

const express = require('express');
const router = express.Router();
const Book = require('./../models/books');
const bearerAuth = require('./../auth/bearer-auth');

router.use(bearerAuth);

router.post('/my-books', async (request, response) => {
  try {
    const bookRecord = await Book.create(request.body);
    response.status(201).send(bookRecord);
  } catch(e) {
    console.log(e);
    response.status(500).send("Error creating book");
  }
});

router.get('/my-books/:id', async (request, response) => {
  try {
    const bookRecords = await Book.find({user_id: request.params.id});
    response.status(200).send(bookRecords);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error retrieving user books');
  }
});

router.put('/my-books/:id', async (request, response) => {
  try {
    await Book.findByIdAndUpdate(request.params.id, request.body);
    const bookRecord = await Book.findById(request.params.id);
    response.status(200).send(bookRecord);
  } catch (e) {
    console.log(e);
    response.status(500).send('Error updating book');
  }
});

router.delete('/my-books/:id', async (request, response) => {
  try {
    await Book.deleteOne({ _id: request.params.id });
    response.status(200).send(`Book _id ${request.params.id} successfully deleted`);
  } catch(e) {
    console.log(e);
    response.status(500).send('Error deleting book');
  }
})

module.exports = router;