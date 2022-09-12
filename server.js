'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const { response } = require('express');
const verifyUser = require('./auth/authorize.js');

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

app.get('/books', getAllBooks);

async function getAllBooks(request, response, next) {
  User.find({email: request.query.email}, function (err, data) {
    if (!err) {
      response.status(200).send(data);
    } else {
      throw err;
    }
  }).clone().catch(function (err) { console.log(err) });
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
