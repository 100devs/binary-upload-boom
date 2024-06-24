const mongoose = require("mongoose"); // connects to and communicates with database to use schemas

//Schemas give the database structure. Maintainability. It is like a template for the DB 
const PostSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId, //store an ObjectId that corresponds to the _id of a document in the User collection.
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema); //module.exports is used in the posts controller

//"Post" will become plural and lowercase as db collection name
//module.exports = mongoose.model("ModelName", SchemaObject, "customCollectionName"); __SYNTAX

