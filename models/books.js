'use strict';

const NoteSchema = require('./notes');

const mongoose = require('mongoose');
const {Schema} = mongoose;

const BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  notes: [NoteSchema],
  quotes: [String]  
});

module.exports = BookSchema;