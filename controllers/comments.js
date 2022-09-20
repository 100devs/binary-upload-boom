const Comment = require("../models/Comment");

module.exports = {
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
  addLike: async (req,res)=>{
  //like comment from specific post view
    try {
      //check if userid is in the array for that post, = already liked it
      let chosenComment = await Comment.findOne(
        {_id: req.params.id, usersWhoLiked: req.user.id });
      if (chosenComment){
        await Comment.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pullAll: { 'usersWhoLiked': [req.user.id] } 
          }
        );
        console.log("Comment Likes-1 and user from array");
        //back to the relevant post where the comment is shown
        res.redirect(`/post/${chosenComment.post}`)
      } else {
        const addLikeComment = await Comment.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $addToSet: { 'usersWhoLiked': req.user.id } 
          }
        );
        console.log("Likes +1");
      //back to the relevant post where the comment is shown
        res.redirect(`/post/${addLikeComment.post}`); 
      }
      
    } catch (err) {
      console.log(err);
    }
  
  }
};
