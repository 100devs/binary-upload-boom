const Comment = require("../models/Comment");

module.exports = {
    getComments: async (req, res) => {
      try {
        const posts = await Comment.find({ post: req.post.id });
        res.render("profile.ejs", { posts: posts, user: req.user });
      } catch (err) {
        console.log(err);
      }
    },

    createComment: async (req, res) => {
        try {
          await Comment.create({
            comment: req.body.comment,
            likes: 0,
            post: req.params.id,
            user: req.user.id,
          });
          console.log("Comment has been added!");
          res.redirect("/post/"+req.params.id);
        } catch (err) {
          console.log(err);
        }
      },
}