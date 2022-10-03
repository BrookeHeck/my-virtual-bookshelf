'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  genre: {type: String},
  date: {type: String, required: true},
  status: {type: String},
  user_id: {type: String, required: true},
});

const BookModel = mongoose.model('Books', BookSchema);
module.exports = BookModel;