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
      const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: false }        // we only need comment.post to redirect
    );
      console.log("Likes +1");
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      console.log(err);
      res.redirect('back');
    }
  },
  // delete a comment by id from the given post with authorization
  deleteComment: async (req, res) => {
    try {
      // Find Comment by id and authorization
      const comment = await Comment.findById({ _id: req.params.id }).populate({ path: 'post', select: 'user' }).lean();
      const isCommentAuthor = String(comment.user) === String(req.user._id);
      const isPostAuthor    = String(comment.post.user) === String(req.user._id);
      // Delete comment from db
      await Comment.deleteOne({ _id: req.params.id });
      console.log("Deleted Comment");
      const postId = comment.post?._id || comment.post;
      return res.redirect(`/post/${postId}`);
    } catch (err) {
      res.redirect('back');
    }
  },
};
