const mongoose = require('mongoose');

const {Schema} = mongoose;

const NoteSchema = ({
  header: {type: String, required: true},
  date: {type: Date, required: true},
  note: {type: String, required: true}
});

module.exports = NoteSchema;