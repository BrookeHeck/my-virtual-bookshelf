'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('./../auth/bearer-auth');
const Note = require('./../models/notes');

router.use(bearerAuth);

router.post('/notes', async (request, response) => {
  try {
    const noteRecord = await Note.create(request.body);
    response.status(201).send(noteRecord);
  } catch(e) {
    response.status(500).send('Error creating note');
  }
});

router.get('/notes/:id', async (request, response) => {
  try {
    const noteRecords = await Note.find({book_id: request.params.id});
    response.status(200).send(noteRecords); 
  } catch(e) {
    response.status(500).send('Error finding notes');
  }
});

router.put('/notes/:id', async (request, response) => {
  try {
    await Note.findByIdAndUpdate(request.params.id, request.body);
    const noteRecord = await Note.findById(request.params.id);
    response.status(200).send(noteRecord);
  } catch(e) {
    response.status(500).send('Error updating notes');
  }
});

router.delete('/notes/:id', async (request, response) => {
  try {
    await Note.deleteOne({_id: request.params.id});
    response.status(200).send(`Successfully delete note with id ${request.params.id}`);
  } catch(e) {
    response.status(500).send('Error deleting note');
  }
});

module.exports = router;
