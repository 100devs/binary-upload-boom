const mongoose = require("mongoose"); //da g00ze

const PostSchema = new mongoose.Schema({ //we got post model
  title: { //the title of the post
    type: String,
    required: true,
  },
  image: { //da pic
    type: String,
    require: true,
  },
  cloudinaryId: { //the pic ID on cloudinary
    type: String,
    require: true,
  },
  caption: { //whatever the caption is
    type: String,
    required: true,
  },
  likes: { //number of post likes
    type: Number,
    required: true,
  },
  user: { //user associated with post
    type: mongoose.Schema.Types.ObjectId, //gotta get the right one!
    ref: "User",
  },
  createdAt: { //time/date of post
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema); //export it for others
