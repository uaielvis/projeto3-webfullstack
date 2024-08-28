const mongoose = require('mongoose');
const VerseSchema = new mongoose.Schema({
  book: String,
  chapter: Number,
  verse: Number,
  text: String,
  translation: String,
});
module.exports = mongoose.model('Verse', VerseSchema);
