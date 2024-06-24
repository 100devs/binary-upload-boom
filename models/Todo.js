const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: false
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
})

module.exports = mongoose.model('Todo', TodoSchema)