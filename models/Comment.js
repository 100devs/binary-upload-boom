const mongoose = require("mongoose");
//setting up the post schema 
const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: {
    //setting like to interger so that we can increment it later using the mongo methos $inc
    type: Number,
    required: true,
  },
  userIds: {
    type: Array,
    require: false,
  },
  createdByName:{
    type: String,
    ref: "user"
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  
  post: {
    //grabbing the user id using the User Schema Moongoose will atomatically name the collection name the models name with an s so "Posts"
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    //setting the data created will use this to display the time and date 
    type: Date,
    default: Date.now,
  },
});
//creating a model Post using the postSchema     
//Moongoose will atomatically name the collection name the models name with an "s" so "Posts"
 
module.exports = mongoose.model("Comment", CommentSchema,);


//mongoose custom name example
//module.exports = mongoose.model("Post", PostSchema, 'customname');

