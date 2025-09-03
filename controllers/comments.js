const Comment = require("../models/Comments");
// Export functions 
module.exports = {
  // Create an instance of comment for the given post  
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  // increment the like count of the given post
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  // delete a comment by id from the given post
  deleteComment: async (req, res) => {
    try {
      // Find Comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      res.redirect(`/post/${req.params.id}`);
    }
  },
};
