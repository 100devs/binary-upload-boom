const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {
      //create a new comment
      const comment = await Comment.create({
        title: req.body.title,
        body: req.body.body,
      });

      Post.findById(req.params.id, (err, post) => {
        post.comment.push(comment.id);
        post.save();
      });

      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.redirect("/profile");
    }
  },
};

// deleteComment: async (req, res) => {
//   try {
//     // Find post by id
//     let post = await Comment.findById({ _id: req.params.id });
//     // Delete post from db
//     await Comment.remove({ _id: req.params.id });
//     console.log("Deleted Comment");
//     res.redirect("/profile");
//   } catch (err) {
//     res.redirect("/profile");
//   }
// },
