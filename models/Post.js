const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {  //image url
    type: String,
    require: true,
  },
  cloudinaryId: {   //unique identifier
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
    type: mongoose.Schema.Types.ObjectId, //specifically going to be a field that links a specific post id to users
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now, //sets a date if one is not added.
  },
});

module.exports = mongoose.model("Post", PostSchema); //taking the schema and exporting it as a model and within the model creation, we are specifying which collection we are talking to. specifies a collection with the plural of the schema name (Posts) in the db
