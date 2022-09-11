'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const NoteSchema = ({
  header: {type: String, required: true},
  date: {type: Date, required: true},
  note: {type: String, required: true}
});

const BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  notes: [NoteSchema],
  quotes: [String]  
});

const BookModel = mongoose.model('Book', BookSchema);
module.exports = BookModel;