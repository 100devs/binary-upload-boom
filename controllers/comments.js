const Comment = require("../models/Comments")

module.exports = {
    // getComments: async (req,res) => {
    //     await Comment.findById(req.params.id)
    //     res.render("posts.ejs", {posts: posts, comments: coments, req})
    // },
    createComment: async (req, res) => {
        try {
          // Upload image to cloudinary
          await Comment.create({
            comment: req.body.comment,
            postId: req.params.id,
          });
          console.log("Comment has been added!");
          res.redirect("/post/"+req.params.id);
        } catch (err) {
          console.log(err);
        }
      }

}