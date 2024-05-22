
const Comment = require("../models/Comment")

module.exports = {
 
  createComment: async (req, res) => {
    try {
       //TODO  add new properties to each document
       //Telling mongoose to find the user by passing in the user id,
      //const commentUser = await User.findById(req.user.id)
      await Comment.create({
        comment: req.body.comment,        
        likes: 0,
        post: req.params.id,
        createdBy:req.user.userName,
        createdById:req.user.id,
      });
      console.log("Comment has been added!");
      //redirecting to the profile route
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
},

    deleteComment: async(req, res) =>{
        try{
          await Comment.deleteOne({_id:req.params.commentId})
          res.redirect('/post/'+req.params.postId)

        }catch(err){
            console.log(err)
            res.redirect('/post/comment.post')
        }
    },

   
}
