const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        post: req.params.id,
        comment: req.body.comment,
        likes: 0,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      const comment = await Comment.findOne({ _id: req.params.id });
      res.redirect(`/post/${comment.post}`);
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findOne({ _id: req.params.id });
      await Comment.findOneAndDelete({_id: req.params.id})
      console.log('Deleted Comment')
      res.redirect(`/post/${comment.post}`)
    }
    catch(err) {
      console.log(err)
    }
  }
};
