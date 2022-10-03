'use strict';

const express = require('express');
const router = express.Router();

const User = require('./../models/user');
const Book = require('./../models/books');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const basicAuth = require('./../auth/basic-auth');
const bearerAuth = require('./../auth/bearer-auth');
const SECRET = process.env.SECRET || 'CHANGE_THE_SECRET';

router.post('/signup', async (request, response) => {
  try {
    request.body.role = 'user'
    request.body.password = await bcrypt.hash(request.body.password, 10);
    request.body.token = jwt.sign({username: request.body.username}, SECRET);
    const newUser = await User.create(request.body);
    response.status(201).send(newUser);
  } catch(e) {
    response.status(500).send('Invalid signup');
  }  
});

router.post('/signin', basicAuth, (request, response) => {
  try {
    const user = {
      user: request.user,
      token: request.user.token,
    };
    response.status(200).send(user);
  } catch(e) {
    response.status(500).send('Error logging in');
  }
});

router.delete('/remove-user/:id', async (request, response) => {
  try {
    await User.deleteOne({_id: request.params.id});
    await Book.deleteMany({user_id: request.params.id });
    response.status(200).send('Successful deletion');
  } catch(e) {
    response.status(500).send('Error deleting user');
  }
});

router.get('/users', bearerAuth, async (request, response) => {
  try {
    const userRecords = await User.find();
    const list = userRecords.map(user => {return {username: user.username, _id: user._id}});
    response.status(200).send(list);
  } catch(e) {
    response.status(500).send('Error retrieving users');
  }
});
module.exports = router;




