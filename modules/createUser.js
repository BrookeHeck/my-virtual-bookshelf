const User = require('./../models/user.js');

function createUser(request, response) {
  User.create({
    userName: request.body.userName,
    email: request.body.email,
    userBooks: []
  })
  .then(newUser => response.status(200).send(newUser))
  .catch(error => response.status(500).send('Error Creating User'));
}

module.exports = createUser;