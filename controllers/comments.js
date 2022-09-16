const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      const comment = await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdBy: req.user.id
      });      
      console.log("Comment has been added!", comment);
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      const commentDoc = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      //we are redirecting to the post/postid where we wrote the comment. this is stored in comment.post (mongoose type objectId referencing post)
      res.redirect(`/post/${commentDoc.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const commentDoc = await Comment.findByIdAndDelete(req.params.id);
      console.log("Deleted Comment");
      //commentDoc.post has the postID (explained in likeComment)
      res.redirect(`/post/${commentDoc.post}`);
    } catch (err) {
      console.error(err)
    }
  },
};
