const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    console.log(req.body)
    try {
      const newComment = await Comment.create({
        title: req.body.title,
        body: req.body.body,
      });
      Post.findById(req.params.id, (err, post) => {
        post.comments.push(newComment.id);
        post.save();
        console.log(post);
      }); 
      console.log("Comment has been added!");
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
};
