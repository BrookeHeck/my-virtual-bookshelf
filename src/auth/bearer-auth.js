'use strict';

const users = require('./../models/user');

module.exports = async (request, response, next) => {
  try {
    if(!request.headers.authorization) {response.status(403).send('Invalid Authorization')}
    
    const token = request.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    request.user = validUser;
    request.token = validUser.token;
    next();
  } catch(e) {
    console.log(e);
    response.status(403).send('Invalid Authorization');
  }
}