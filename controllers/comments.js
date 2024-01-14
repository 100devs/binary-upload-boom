const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.param.id,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log("Error on createComment: ", err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id }, // THIS IS CURRENTLY THE POST ID, FIGURE OUT HOW TO GET COMMENT
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Comment Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log("Error on comment like: ", err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id }); // MAKE SURE THIS IS THE RIGHT ID ALSO
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
        console.log("Error on delete comment")
        res.redirect("/profile");
    }
  },
};
/* 
- Comments model, route, controller added
-  TODO: Add comments form and comments list to EJS
- Add trashcan and heart to comments and figure out how to hook them up
*/