'use strict';

const db = require('./src/models');
const MongoMemoryServer = require('mongodb-memory-server');
const server = require('./src/server');
require('dotenv').config();

const mongoServer = await MongoMemoryServer.create();
const PORT = process.env.PORT || 3001;
const DB_URI = mongoServer.getUri();

const startApp = () => {
  try {
    db.connect(DB_URI)
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