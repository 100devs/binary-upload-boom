const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    console.log(req.params.id, req.user.id)
    try {  
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        createdBy: req.user.id,
        likedBy: []
      });
      console.log("Comment has been added!");
      res.redirect("back");
    } catch (err) {
      console.log("Error on createComment: ", err);
    }
  },
  likeComment: async (req, res) => {
    /*
    - Check if this user has already liked this comment
    - If yes, remove from LikedBy array
    - 
    - If no, add to likedBy array
    - Should probs change the colour on that icon based on state or turn it into a broken heart or summin
    */
    try {
      const currentUser = req.user.id;
      let comment = await Comment.findById(req.params.id);
      if (comment.likedBy.includes(currentUser)) {
        comment.likedBy.pull(currentUser)
        await comment.save();
      } else {
        comment.likedBy.push(currentUser);
        await comment.save();
      }
      res.redirect("back");
    } catch (err) {
      console.log("Error on comment like/dislike: ", err);
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
- The like button now works as a toggle like in the real world

- To do: 
  - Clean up the layout
  - Make sure everything actually works and add more ducks
  - Make some kind of graphical change to like button to indicate toggle state

*/