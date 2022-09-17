const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    console.log(req);
    try {
      await Comment.create({
        comment: req.body.comment,
        postId: req.params.id,
        likes: 0,
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.error(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comments.find({ postId: req.params.id })
        .sort({ createdAt: "desc" })
        .lean();
      res.render("post.ejs", {
        post: post,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
