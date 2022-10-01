'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListSchema = new Schema({
  listName: {type: String, required: true},
  user_id: {type: String, required: true},
  books: [String],
});

const ListModel = mongoose.model('Lists', ListSchema);
module.exports = ListModel;