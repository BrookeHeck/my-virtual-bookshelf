'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);
const User = require('./models/user.js');

async function seed() {
  await User.create({
    userName: 'Brooke Heck',
    email: 'b19heck@gmail.com',
    userBooks: [{
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
    },
    {
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
    },
    {
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
    }
    ]
  });

  await User.create({
    userName: 'Test Two',
    email: 'tester2@mycompany.org',
    userBooks: [{
      title: 'Fantastic Numbers and Where to Find Them',
      author: 'Antonio Padilla',
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
      quotes: ['Do or do not, there is no try', 'if your going to be stupid you\'d better be hard']
    },
    {
      title: 'The Kill Chain',
      author: 'Christian Brose',
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
      quotes: ['Do or do not, there is no try', 'if your going to be stupid you\'d better be hard']
    },
    {
      title: 'Essentialism',
      author: 'Greg McKeown',
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
      quotes: ['Do or do not, there is no try', 'if your going to be stupid you\'d better be hard']
    }
    ]
  });

  console.log('Users created');
  mongoose.disconnect();
}

seed();