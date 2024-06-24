const mongoose = require("mongoose");

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


/* const PostSchema = new mongoose.Schema({

}, { toObject: {virtuals: true}});


PostSchema.virtual('comments',{
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
}) */

module.exports = mongoose.model("Post", PostSchema);
