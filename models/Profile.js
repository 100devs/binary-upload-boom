const mongoose = require("mongoose");
//setting up the post schema 
const ProfileSchema = new mongoose.Schema({
  userAbout: {
    type: String,
    required: true,
  },
  imageProfile: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  dogName: {
    type: String, 
    required: true,
  },
  userActivies: {
    type: String,
    required: true,
  },
  dogSize: {
    type: String,
    required: true,
  },
  areaCode:{
    type: Number,
    required: true,
  },
  user: {
    //grabbing the user id using the User Schema Moongoose will atomatically name the collection name the models name with an s so "Posts"
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    //setting the data created will use this to display the time and date 
    type: Date,
    default: Date.now,
  },
});
//creating a model Post using the postSchema     
//Moongoose will atomatically name the collection name the models name with an "s" so "Posts"
 
module.exports = mongoose.model("Profile", ProfileSchema,);


//mongoose custom name example
//module.exports = mongoose.model("Post", PostSchema, 'customname');

