'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: mongoose.Mixed, required: true},
  role: {type: String, required: true },
  token: {type: String, required: true }
});

const userModel = mongoose.model('Users', userSchema);

userModel.authenticateBasic = async function(username, password) {
  const user = await this.findOne({username: username});
  const valid = await bcrypt.compare(password, user.password);
  if(valid) {return user}
  throw new Error('Invalid User');
};

userModel.authenticateToken = async function(token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    const user = this.findOne({username: parsedToken.username });
    if(user) {return user }
    throw new Error('User not found');
  } catch(e) {
    throw new Error(e.message);
  }
}

module.exports = userModel;