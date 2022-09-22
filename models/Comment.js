const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: ["parentModel"],
    },
  ],
  parentModel: {
    type: String,
    enum: ["Post", "Comment"],
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
  ],
  depth: {
    type: Number,
    required: true,
    default: 0,
  },
  voteCount: {
    type: Number,
    required: true,
    default: 0,
  },
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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
  this.populate("parents");
  this.populate("votes");
  this.populate("replies");
  next();
};

commentSchema.pre("find", autoPopulateAll);
commentSchema.pre("findOne", autoPopulateAll);
commentSchema.pre("findById", autoPopulateAll);

module.exports = mongoose.model("Comment", commentSchema);