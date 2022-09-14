const User = require('./../models/user.js');

function getUser(request, response, next) {
  User.find({email: request.query.email}, function (err, data) {
    if (!err) {
      response.status(200).send(data);
    } else {
      throw err;
    }
  })
  .clone()
  .catch(function (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    })
    .catch(next);
  });
}

module.exports = getUser;