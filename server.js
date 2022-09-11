'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/books.js');
const { response } = require('express');

// USE
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3002

// myBookProject DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Mongoose is connected');
});
mongoose.connect(process.env.DB_URI);

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Books :)');
});

app.get('/books', getAllBooks);

async function getAllBooks(request, response, next) {
  try {
    let allBooks = await Book.find();
    response.status(200).send(allBooks);
  } catch(error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not here...');
});

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTENING
app.listen(PORT, () => console.log(`listening on ${PORT}`));
