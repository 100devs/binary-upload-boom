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
  voteCount: {
    type: Number,
    required: true,
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const autoPopulateAll = function (next) {
  this.populate("user");
  this.populate("comments");
  this.populate("votes");
  next();
};

PostSchema.pre("find", autoPopulateAll);
PostSchema.pre("findOne", autoPopulateAll);

module.exports = mongoose.model("Post", PostSchema);
