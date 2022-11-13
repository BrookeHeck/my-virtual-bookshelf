'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Mongoose is connected');
});

module.exports = {
  db: db,

  connect: async (uri) => {
      
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function () {
      });
      mongoose.connect(uri);
    },
  disconnect: async () => {
    await mongoose.disconnect();
  },
}