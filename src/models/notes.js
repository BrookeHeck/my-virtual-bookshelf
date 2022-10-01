const mongoose = require('mongoose');

const {Schema} = mongoose;

const NoteSchema = ({
  header: {type: String},
  date: {type: String, required: true},
  note: {type: String, required: true},
  book_id: {type: String, require: true}
});

const NoteModel = mongoose.model('Notes', NoteSchema);
module.exports = NoteModel;