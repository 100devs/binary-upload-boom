const mongoose = require("mongoose");
////USE MONGOOSE TO TALK TO MONGODB DB AND GIVE US A SCHEMA TO USE

const PostSchema = new mongoose.Schema({
  //HOW TO TAKE THE DATA FROM FORM TO PUT INTO DB
  title: {// ADD TITLE TO THE DB AS A STRING/SENTENCE AND ITS REQUIRED
    type: String,
    required: true,
  },
  image: {// ADD IMAGE URL TO THE DB AS A STRING  AND ITS REQUIRED
    type: String,
    require: true,
  },
  cloudinaryId: {
    // ADD CLOUDINARYID TO THE DB AS A STRING/SENTENCE AND ITS REQUIRED
    type: String,
    require: true,
  },
  caption: {
    // ADD CAPTION TO THE DB AS A STRING/SENTENCE AND ITS REQUIRED
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
  createdAt: {
    ////MONGO WILL CREATE A UNIQUE DATE WITH THE TIME (UTC)
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
