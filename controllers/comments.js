const Comment = require("../models/Comment");
//LINK THE COMMENT MODEL FROM THE MODEL FOLDER AND COMMENT FILE TO USE IN THE FOLLOWING CODE

module.exports = {
  //FIND THE POST FROM THE SPECIFIC USERID FROM THE REQ BODY AND RENDER THE POST AND USER IN THE PROFILE.EJS 
  
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
        user: req.user.id,
        userName: req.body.userName,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
   //FIND AND UPDATE THE LIKES ON A POST IN THE POST COLLECTION BY USING THE ID FROM THE REQ.PARAMS.ID AND THEN INCREMENT THE LIKES BY 1. AND THE REDIRECT THE USER TO THE POST FROM THE SPECIFIED ID
    likeComment: async (req, res) => {
      try {
        await Comment.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
        console.log("Likes +1");
        res.redirect(`/post/${req.params.id}`);
      } catch (err) {
        console.log(err);
      }
    },
    //FIND THE IDFROM THE REQ PARAMS ID. DELETE THE IMAGE FROM THE CLOUDINARY USING THE CLOUDINARY ID, DELETE THE POST FROM THE DB USING THE PARAMS ID, THEN REDIRECT THE USER TO THE PROFILE PAGE
    deleteComment: async (req, res) => {
      try {
        // Find post by id
        let comment = await Comment.findById({ _id: req.params.id });
        
        // Delete post from db
        await Comment.remove({ _id: req.params.id });
        console.log("Deleted Comment");
        res.redirect("/post/"+req.params.id);
      } catch (err) {
        res.redirect("/post/"+req.params.id);
      }
    },
};
