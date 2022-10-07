const mongoose = require('mongoose')

const LanguageSchema = new mongoose.Schema({
  languageName: {
    type: String,
    required: true,
  },
  vowels: {
    type: Array,
    requires: true,
  },
  consonants: {
    type: Array,
    requires: true,
  }
})

module.exports = mongoose.model('Language', LanguageSchema)
