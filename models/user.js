'use strict';

const Book = require('./books.js');

const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  userBooks: [Book],
  userLists: [String]
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;