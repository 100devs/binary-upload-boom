const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        commentText: req.body.comment,
        likes: 0,
        user: req.user.id,
        post: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    console.log(req.params)
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
    console.log(req.params.id)
      await Comment.findOneAndDelete({_id: req.params.id});
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
