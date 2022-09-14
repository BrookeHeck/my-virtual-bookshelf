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
      genre: 'Philosophy',
      date: '9/12/22',
      status: 'Finished',
      lists: ['All Books'],
      notes: [
        {
          header: 'My first note',
          date: '9/12/22',
          note: 'What a good note...'
        },
        {
          header: 'My second note',
          date: '9/12/22',
          note: 'an even better one lol'
        }
      ],
      quotes: ['To be or not to be', 'if your going to be stupid you\'d better be hard']
    },
    {
      title: 'Meditations',
      author: 'Marcus Aurelius',
      genre: 'Philosophy',
      date: '9/12/22',
      status: 'Finished',
      lists: ['All Books'],
      notes: [
        {
          header: 'My first note',
          date: '9/12/22',
          note: 'What a good note...'
        },
        {
          header: 'My second note',
          date: '9/12/22',
          note: 'an even better one lol'
        }
      ],
      quotes: ['To be or not to be', 'if your going to be stupid you\'d better be hard']
    },
    {
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      genre: 'Fiction',
      date: '9/12/22',
      status: 'Finished',
      lists: ['All Books'],
      notes: [
        {
          header: 'My first note',
          date: '9/12/22',
          note: 'What a good note...'
        },
        {
          header: 'My second note',
          date: '9/12/22',
          note: 'an even better one lol'
        }
      ],
      quotes: ['To be or not to be', 'if your going to be stupid you\'d better be hard']
    }
    ],
    userLists: ['All Books']
  });

  await User.create({
    userName: 'Test Two',
    email: 'tester2@mycompany.org',
    userBooks: [{
      title: 'Fantastic Numbers and Where to Find Them',
      author: 'Antonio Padilla',
      genre: 'Nonfiction',
      date: '9/12/22',
      status: 'Finished',
      lists: ['All Books'],
      notes: [
        {
          header: 'My first note',
          date: '9/12/22',
          note: 'What a good note...'
        },
        {
          header: 'My second note',
          date: '9/12/22',
          note: 'an even better one lol'
        }
      ],
      quotes: ['Do or do not, there is no try', 'if your going to be stupid you\'d better be hard']
    },
    {
      title: 'The Kill Chain',
      author: 'Christian Brose',
      genre: 'Military',
      date: '9/12/22',
      status: 'In Progress',
      lists: ['All Books'],
      notes: [
        {
          header: 'My first note',
          date: '9/12/22',
          note: 'What a good note...'
        },
        {
          header: 'My second note',
          date: '9/12/22',
          note: 'an even better one lol'
        }
      ],
      quotes: ['Do or do not, there is no try', 'if your going to be stupid you\'d better be hard']
    },
    {
      title: 'Essentialism',
      author: 'Greg McKeown',
      genre: 'Philosophy',
      date: '9/12/22',
      status: 'Finished',
      lists: ['All Books'],
      notes: [
        {
          header: 'My first note',
          date: '9/12/22',
          note: 'What a good note...'
        },
        {
          header: 'My second note',
          date: '9/12/22',
          note: 'an even better one lol'
        }
      ],
      quotes: ['Do or do not, there is no try', 'if your going to be stupid you\'d better be hard']
    }
    ],
    userLists: ['All Books']
  });

  console.log('Users created');
  mongoose.disconnect();
}

seed();