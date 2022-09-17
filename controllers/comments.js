const Post = require("../models/Post");
const Comment = require('../models/Comment')

module.exports = {
  createComment: async (req, res) => {
    try {
      let post = await Post.findById(req.params.id).lean()

      await Comment.create({
        text: req.body.text,
        commenter: req.user.id,
        post: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  }
};
