const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {
      const newComment = await Comment.create({
        title: req.body.title,
        body: req.body.body,
      });
      Post.findOneAndUpdate(
        { id: req.params.id },
        {comments: Post.comments + newComment.id}
      ); 
      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
