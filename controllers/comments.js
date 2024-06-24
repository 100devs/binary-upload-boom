

const Comment = require("../models/Comment");

module.exports = {
 
  createComment: async (req, res) => {
    try {
       // const commntUser = await User.findById(req.user.id);

      await Comment.create({
        createdBy: req.user.userName,
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        createdById: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComments: async (req,res)=>{
    try{
        await Comment.deleteOne({_id: req.params.commentId})
        res.redirect("/post/"+req.params.postId)
    }
    catch(err){
        console.log(err);
    }
  }
};
 