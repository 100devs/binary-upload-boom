const mongoose = require("mongoose");
////USE MONGOOSE TO TALK TO MONGODB DB AND GIVE US A SCHEMA TO USE

const CommentSchema = new mongoose.Schema({
  //HOW TO TAKE THE DATA FROM FORM TO PUT INTO DB
  comment: {// ADD comment TO THE DB AS A STRING/SENTENCE AND ITS REQUIRED
    type: String,
    required: true,
  },
  likes: {
    // ADD LIKES TO THE DB AS A NUMBER AND ITS REQUIRED
    type: Number,
    required: true,
  },
  user: {
    //MONGO WILL CREATE A UNIQUE USERID
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: { 
  type: String, unique: true },
  post: {
    //MONGO WILL CREATE A UNIQUE PostID
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserName",
  },
  createdAt: {
    ////MONGO WILL CREATE A UNIQUE DATE WITH THE TIME (UTC)
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
