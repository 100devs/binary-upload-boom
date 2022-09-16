
const Comment = require("../models/Comment")

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
      //find the post in the database and update it 
      let ids = req.params.id.split("&")
      let postId = ids[1]
      let commentId = ids[0]
      let userId = ids[2]
      console.log(userId)
      await Comment.findOneAndUpdate(
        { _id: commentId },
        {
          $push: {userIds: userId },
          //increment the like counter $inc is specific to mongoDB
          $inc: { likes: 1 },
        }
      );
      //if successful console log it
      console.log("Likes +1");
      //redirect refresh post page
      res.redirect(`/post/${postId}`);
    } catch (err) {
      console.log("hellothere")
      console.log(err);
    }
  },

  
  unlikeComment: async (req, res) => {
    try {
      //find the post in the database and update it 
      let ids = req.params.id.split("&")
      let postId = ids[1]
      let commentId = ids[0]
      let userId = ids[2]
      console.log(userId)
      await Comment.findOneAndUpdate(
        { _id: commentId },
        {
          $pull: {userIds: userId },
          //increment the like counter $inc is specific to mongoDB
          $inc: { likes: -1 },
        }
      );
      //if successful console log it
      console.log("Likes +1");
      //redirect refresh post page
      res.redirect(`/post/${postId}`);
    } catch (err) {
      console.log("hellothere")
      console.log(err);
    }
  },


};
