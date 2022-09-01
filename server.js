'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// USE
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3002

// ROUTES
app.get('/', (request, response) => {
  response.status(200).send('Books :)');
});

app.get('*', (request, response) => {
  response.status(404).send('Not here...');
});

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// LISTENING
app.listen(PORT, () => console.log(`listening on ${PORT}`));
