'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routers
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');

// USE
const app = express();
app.use(cors());
app.use(express.json());


// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Books :)');
});
app.use(userRouter);
app.use(bookRouter);

// ERRORS
app.get('*', (request, response) => {
  response.status(404).send('Not here...');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTENING
module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
