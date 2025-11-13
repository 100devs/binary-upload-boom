const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        user: req.user.id,
        post: req.params.post
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
    
      const alreadyLiked = comment.likedBy.includes(req.user.id);
    
      if(alreadyLiked) {
        await Comment.findOneAndUpdate(
          { _id: req.params.id},
          {
            $pull: { likedBy: req.user.id },
            $inc: { likes: -1 }
          }
        );
        console.log("Likes -1")
      } else {
        await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $addToSet: { likedBy: req.user.id },
          $inc: { likes: 1 },
        }
        );
        console.log("Likes +1");
      }
          
      res.redirect(req.headers.referer || `/post/${comment.post}`);
    } catch (err) {
        console.log(err);
        res.redirect(req.headers.referer || `/post/${comment.post}`);
    }
  },
  deleteComment: async (req, res) => {
      try {
        await Comment.deleteOne({ _id: req.params.id });
        console.log("Deleted Post");
        res.redirect(req.headers.referer || `/post/${comment.post}`);
      } catch (err) {
        res.redirect(req.headers.referer || `/post/${comment.post}`);
      }
    },
};