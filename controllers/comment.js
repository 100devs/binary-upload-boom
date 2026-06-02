const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        userName: req.user.userName,
        post: req.params.id
      });
      console.log("Post has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
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
  deleteComment: async (req, res) => {
    try{
      await Comment.findOneAndDelete({_id: req.params.commentid})
      console.log("Deleted Post");
      res.redirect(`/post/${req.params.postid}`);
    }catch(err){
      res.redirect(`/post/${req.params.postid}`);
    }
  },
};