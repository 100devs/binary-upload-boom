const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    console.log(req.params.id, req.user.id)
    try {  
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
        createdBy: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("back");
    } catch (err) {
      console.log("Error on createComment: ", err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Comment Likes +1");
      res.redirect("back");
    } catch (err) {
      console.log("Error on comment like: ", err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("back");
    } catch (err) {
        console.log("Error on delete comment")
        res.redirect("/profile");
    }
  },
};
/* 
- Comments are working - posting, display under appropriate post, delete and like
- To do: 
  - Keep same user from liking something more than once IF that doesn't require overhauling all the db schemas which it PROBABLY does
    (add a LikedByUsers array to posts and comments, or an array of everything they liked to the user?)
  - Clean up the layout
  - Make sure everything actually works and add more ducks

*/