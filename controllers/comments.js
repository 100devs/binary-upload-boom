const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        commentBody: req.body.comment,
        postID: req.params.id,
        userID: req.user.id,
      });
      console.log("comment has been added");
      res.redirect(`/post/${req.params.id}`);
    } catch (error) {
      console.log(error);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentID },
        { $inc: { likes: 1 } }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.postID}`);
    } catch (error) {
      console.log(error);
    }
  },
};
