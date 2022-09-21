const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id, //id of the post
        createdById: req.user.id, //id of the user
        createdBy: req.user.userName
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
    deleteComment: async (req, res) => {
    try {
      // Find comment by id
      //const comment = await Comment.findById({_id: req.params.id});
      await Comment.deleteOne({ _id: req.params.commentid });
      console.log("Deleted Comment");
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      //res.redirect(`/post/${comment.post}`);
      console.log(err)
    }
  },
    likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      console.log(err);
    }
  },

};
