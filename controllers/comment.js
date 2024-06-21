const Post = require("../models/Post");
const Comment = require("../models/Comment")

module.exports = {

  createComment: async (req, res) => {
    try {
      await Comment.create({
        content: req.body.content,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
};
