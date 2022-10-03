'use strict';

const base64 = require('base-64');
const users = require('./../models/user');

module.exports = async (request, response, next) => {
  if(!request.headers.authorization) { response.status(403).send('Invalid Login') }
  const basic = request.headers.authorization.split(' ').pop();
  let [ user, pass ] = base64.decode(basic).split(':');

  try {
    request.user = await users.authenticateBasic(user, pass);
    next();
  } catch(e) {
    response.status(403).send('Invalid Login');
  }
}
