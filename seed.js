'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);
const Book = require('./models/books.js');

async function seed() {
  await Book.create({
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    notes: [
      {
        header: 'My first note',
        date: Date.now(),
        note: 'What a good note...'
      },
      {
        header: 'My second note',
        date: Date.now(),
        note: 'an even better one lol'
      }
    ],
    quotes: ['To be or not to be', 'if your going to be stupid you\'d better be hard']
  });

  await Book.create({
    title: 'Meditations',
    author: 'Marcus Aurelius',
    notes: [
      {
        header: 'My first note',
        date: Date.now(),
        note: 'What a good note...'
      },
      {
        header: 'My second note',
        date: Date.now(),
        note: 'an even better one lol'
      }
    ],
    quotes: ['To be or not to be', 'if your going to be stupid you\'d better be hard']
  });

  await Book.create({
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    notes: [
      {
        header: 'My first note',
        date: Date.now(),
        note: 'What a good note...'
      },
      {
        header: 'My second note',
        date: Date.now(),
        note: 'an even better one lol'
      }
    ],
    quotes: ['To be or not to be', 'if your going to be stupid you\'d better be hard']
  });

  console.log('Books created');
  mongoose.disconnect();
}

seed();