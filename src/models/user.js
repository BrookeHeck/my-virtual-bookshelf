'use strict';

const Book = require('./books.js');

const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;