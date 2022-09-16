const Comment = require("../models/Comments");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        user: req.user.id,
        userName: req.user.userName,
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById(req.params.id);
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
        $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${comment.post}`);
      } catch (err) {
        console.log(err);
      }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById(req.params.id);
      // Delete post from db
      await Comment.findOneAndDelete({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      res.redirect(`/post/${comment.post}`);
    }
  }
};