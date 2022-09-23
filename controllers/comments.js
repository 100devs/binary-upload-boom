const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {

  getComment: async (req, res) => {
    try {
      const post = await Post.find().sort({createdAt:"desc"}).lean();
      const comments = await Comment.find({post: req.params.id}).sort({createdAt: "desc"}).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        post: req.params.id,
        comment: req.body.comment,
        likes: 0,
      });

      console.log("comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  }}