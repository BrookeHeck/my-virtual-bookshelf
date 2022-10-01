'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;
module.exports = {
  db: db,
  connect: dbUri => {
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function () {
      console.log('Mongoose is connected');
      });
      mongoose.connect(dbUri);
    },
}