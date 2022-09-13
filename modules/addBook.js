const User = require('./../models/user.js');
const Book = require('./../models/books.js');

async function addBook(request, response, next) {
  let newBook = {
    title: request.body.title,
    author: request.body.author,
    genre: request.body.genre,
    date: request.body.date,
    status: request.body.status,
    lists: request.body.lists,
    notes: [],
    quotes: [] 
  };

  let user = await User.findById(request.params.id);
  user.userBooks.push(newBook);
  User.findByIdAndUpdate(request.params.id, user, {new: true, overwrite: true})
    .then(updatedUser => response.status(200).send(updatedUser))
    .catch(error => response.status(500).send(error.message));
}

module.exports = addBook;