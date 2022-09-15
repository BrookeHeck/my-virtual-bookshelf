const User = require('./../models/user.js');

async function deleteBook(request, response, next) {
  let user = {};
  try {
    user = await User.findById(request.params.id);
    user.userBooks.splice(user.userBooks.findIndex(book => book._id.equals(request.body._id)), 1);
  } catch(e) {
    console.log(e);
  }
  User.findByIdAndUpdate(request.params.id, user, { new: true, overwrite: true })
    .then(updatedUser => response.status(200).send(updatedUser))
    .catch(error => response.status(500).send(error.message));
}

module.exports = deleteBook;