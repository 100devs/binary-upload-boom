const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({ // schema is a blueprint which tells mongoose how to construct data that goes into DB
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // referencing user model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema); // model uses schema; first argument is the name of the model; third argument is name of collection (none given will taken first argument and make it plural)
