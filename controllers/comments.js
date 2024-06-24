const Comment = require("../models/Comment");

module.exports = {

  createComment: async (req, res) => {
    try {


      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
    likeComment: async (req, res) => {
    try {

let combinedIds = req.params.id.split("&")
let commentID = combinedIds[0]
let postId = combinedIds[1]
let userId = combinedIds[2]

      await Comment.findOneAndUpdate(
        { _id: commentID },
        {
          $inc: { likes: 1 },
        }
    
      );
      console.log("Likes +1");
      console.log(userId) // current logged in user 
      res.redirect("/post/"+postId);
    } catch (err) {
      console.log(err);
    }
  }
};
