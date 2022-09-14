'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./auth/authorize.js');
const getAllUsers = require('./modules/getAllUsers.js');
const getUser = require('./modules/getUser.js');
const createUser = require('./modules/createUser.js');
const addBook = require('./modules/addBook.js');
const deleteBook = require('./modules/deleteBook.js');
const updateBook = require('./modules/updateBook.js');

// USE
const app = express();
app.use(cors());
app.use(express.json());


// myBookProject DB
const PORT = process.env.PORT || 3002
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected');
});
mongoose.connect(process.env.DB_URI);

// This will run the "verify" code on every route automatically
// If the user is valid, we'll have them in request.user in every route!
// If not, it'll throw an error for us
app.use(verifyUser);

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Books :)');
});


app.get('/all-users', getAllUsers);
app.get('/user', getUser);
app.post('/user', createUser);


app.post('/add-book/:id', addBook);
app.put('/delete-book/:id', deleteBook);
app.put('/update-book/:id', updateBook);


app.get('*', (request, response) => {
  response.status(404).send('Not here...');
});

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTENING
app.listen(PORT, () => console.log(`listening on ${PORT}`));
