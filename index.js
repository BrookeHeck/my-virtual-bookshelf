'use strict';

const db = require('./src/models');
const server = require('./src/server');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const startApp = () => {
  try {
    db.connect()
  } catch(e) {
    console.log(e);
  }
  try {
    server.start(PORT);
  } catch(e) {
    console.log(e);
  }
}
startApp();