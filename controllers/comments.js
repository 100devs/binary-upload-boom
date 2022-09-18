const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        createdBy: req.user.id
      });      
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  //if we don't want to remove the like, we could use $addToSet, so that only one like per user is permited.
  likeComment : async (req, res) =>{
    //saves the logged user's id to userId
    const userId = req.user.id
    try {
      //finds the comment by the ID provided in :id (params)
      const commentDoc = await Comment.findById(req.params.id);
      //if that Id is NOT in the likes array, add the user id to it
      if (!commentDoc.likes.includes(userId)) {
        await commentDoc.updateOne({ $push: { likes: userId } });
      //if it is, then remove it. This way you can only like a post ONCE, the second time it'll remove your like.
      } else {
        await commentDoc.updateOne({ $pull: { likes: userId } });
      }
      //sends the postID related to the comment, to go back to the same post page we were
      res.redirect(`/post/${commentDoc.post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const commentDoc = await Comment.findByIdAndDelete(req.params.id);
      console.log("Deleted Comment");
      //commentDoc.post has the postID (explained in likeComment)
      res.redirect(`/post/${commentDoc.post}`);
    } catch (err) {
      console.error(err)
    }
  },
};
