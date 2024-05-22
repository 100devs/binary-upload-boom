const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
 
  likes: {
    type: Number,
    required: true,
  },
 
  post:{
    type: mongoose.Schema.Types.ObjectId,  //referencing the 'User' model
    ref: "Post",
  },
  createdBy:{
    type:String,
    ref:"User",
  },
  createdById:{  
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    //If we don't put in a date, it will be automatically set.
    default: Date.now,
  },
});


//Exporting the schema as a model.'Post' is the name of the model, and assigning PostSchema to that model.We can add a third argument, mongoose will automatically make one, the plural of Post- this will be the collection name.
module.exports = mongoose.model("Comment", CommentSchema);
