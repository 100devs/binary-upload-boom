const CommentSchema = new mongoose.Schema({
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  module.exports = mongoose.model("Comments", PostSchema);