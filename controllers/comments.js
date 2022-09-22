const Comment = require("../models/Comment");

const createComment = async (req, res) => {
  try {
    await Comment.create({
      comment: req.body.comment,
      post: req.params.id,
      createdBy: req.user,
    });

    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
};

const deleteComment = async (req, res) => {
  try {
    // Find comment by id
    let comment = await Comment.findById({
      _id: req.params.id,
    });
    // Delete comment from db
    await Comment.deleteOne({ _id: req.params.id });
    console.log("Deleted Comment");
    console.log(comment.post);

    res.redirect(`/post/${comment.post}`);
  } catch (err) {
    res.redirect(`/post/${comment.post}`);
  }
};

module.exports = {
  createComment: createComment,
  deleteComment: deleteComment,
};
