'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routers
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const noteRouter = require('./routes/notes');
const listRouter = require('./routes/lists');

// USE
const app = express();
app.use(cors());
app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(204));

// ROUTES
app.use(userRouter);
app.use(bookRouter);
app.use(noteRouter);
app.use(listRouter);

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
