const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.userName
      });
      console.log(`${req.user}`)
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      // Update the like counter by one
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Comment likes +1");
      // return the user to the same post page
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Delete comment from db
      await Comment.deleteOne({ _id: req.params.commentid });
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      res.redirect("/post/"+req.params.postid);
    }
  },
}