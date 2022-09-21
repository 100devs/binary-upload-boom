const Comment = require("../models/Comment");
const Post = require("../models/Post");



module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      let comment = await Comment.findById({ _id: req.params.id });
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      location.replace;
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      //res.redirect(`/post/${req.body.post}`);
      console.log("error")
    }
  },
};
