const Comment = require("../models/Comment");

module.exports = {
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
  likeComment: async (req, res) => {
    try {
      await Comment.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } }, // Increment the likes field by 1
        { new: true } // Return the updated document
      );
      console.log("Comment liked!");
      res.redirect("/post/"+req.body.postId); // Redirect back to the same page
    } catch (err) {
      console.error(err);
      res.redirect("/post/"+req.body.postId);
    }
  },
  deleteComment: async (req, res) => {
    try {
      //debugging
      console.log("Request Params:", req.params);
      console.log("Request Body:", req.body);
      
      const comment = await Comment.findById(req.params.id)

      // Check if the comment exists
      if (!comment) {
        console.error("Comment not found");
        return res.redirect(`/post/${req.body.postId}`);
      }

      // Delete the comment
      await Comment.deleteOne({ _id: req.params.id });
      console.log("Comment deleted!");

      // Redirect back to the post page
      res.redirect(`/post/${req.body.postId}`);
    } catch (err) {
        console.error(err);
      res.redirect(`/post/${req.body.postId}`);
    }
  },
};
