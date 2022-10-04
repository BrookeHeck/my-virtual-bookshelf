'use strict';

const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const db = mongoose.connection;
require('dotenv').config();

const getDbUri = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  return uri;
}

module.exports = {
  db: db,
  connect: async () => {
      
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function () {
      console.log('Mongoose is connected');
      });
      const uri = process.env.DB_URI || await getDbUri();
      mongoose.connect(uri);
    },
  disconnect: () => {
    mongoose.connection.close();
  },
}