const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, //will be the cloudinary url
    require: true,
  },
  cloudinaryId: { //we're going to need this when we want to delete any post
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
    ref: "User", //this is referencing the User MODEL, it's pulling in the user id from the user schema 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema); //by default the Post model specifices that we will be talking to the Posts collection, the model is the construction worker that builds the Post and it uses the blueprint of the PostSchema, mongoose decides to make the place WHERE we build the document, which is the plural of whatever we call the model, so here it would be posts, then mongoose and mongodb create a collection in the db called posts.
