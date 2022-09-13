'use strict';

const NoteSchema = require('./notes');

const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  genre: {type: String},
  date: {type: String, required: true},
  status: {type: String},
  lists: [String],
  notes: [NoteSchema],
  quotes: [String]  
});

module.exports = BookSchema;