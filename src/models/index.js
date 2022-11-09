'use strict';

const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const db = mongoose.connection;
require('dotenv').config();

const getServer = async () => {
  return MongoMemoryServer.create();
}
const memoryServer = getServer();

module.exports = {
  db: db,

  connect: async () => {
      
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function () {
      console.log('Mongoose is connected');
      });
      const uri = (await memoryServer).getUri();
      mongoose.connect(uri);
    },
  disconnect: async () => {
    await mongoose.disconnect();
  },
}