const Comment = require("../models/Comment")

module.exports = {
    // getComments: async (req,res) => {
    //     await Comment.findById(req.params.id)
    //     res.render("posts.ejs", {posts: posts, comments: coments, req})
    // },
    createComment: async (req, res) => {
      console.log(req.user)
        try {
          // Upload image to cloudinary
          await Comment.create({
            comment: req.body.comment,
            postId: req.params.id,
            createdById: req.user.id,
            createdBy: req.user.userName,
          });
          console.log("Comment has been added!");
          res.redirect("/post/"+req.params.id);
        } catch (err) {
          console.log(err);
        }
      },

      deleteComment: async (req, res) => {
        try {
          // Delete comment from db by id
          await Comment.deleteOne({ _id: req.params.id });
          console.log("Comment Deleted");
          res.redirect("back");
        } catch (err) {
          res.redirect("back");
        }
      },
}