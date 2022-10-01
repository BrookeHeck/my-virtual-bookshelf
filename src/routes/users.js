'use strict';

const express = require('express');
const router = express.Router();

const User = require('./../models/user');
const verifyUser = require('./../auth/authorize');

router.post('/signup', (request, response) => {
  User.create({
    userName: request.body.userName,
    email: request.body.email,
  })
  .then(newUser => response.status(200).send(newUser))
  .catch(error => {
    console.log(error);
    response.status(500).send('Error Creating User')
  });
});

router.post('/signin', verifyUser, (request, response) => {
  User.find({email: request.body.email}, function (err, data) {
    if (!err) {
      response.status(200).send(data);
    } else {
      throw err;
    }
  })
  .clone()
  .catch(function (error) {
    Promise.resolve()
    .then(() => {
      console.log(error)
      response.status(403).send('Invalid login');
    });
  });
});

module.exports = router;




