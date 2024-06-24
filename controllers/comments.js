
const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        
        try {
          
            await Comment.create({ 
              comment: req.body.comment, 
              likes: 0,
              user: req.user.id,
              userName: req.user.userName,
              post: req.params.id
            })
            console.log("Comment has been added")
            res.redirect(`/post/${req.params.id}`)
        }
        catch (err) {
            console.log(err);
        }
      },

      likeComment: async (req, res) => {
          console.log(req.body)
        try {
          await Comment.findOneAndUpdate(
            { _id: req.params.commentid },
            {
              $inc: { likes: 1 },
            }
          );
          console.log("Likes + 1");
          res.redirect(`/post/${req.params.postid}`);
        } catch (err) {
          console.log(err);
        }
      },
      deleteComment: async (req, res) => {
        try {
          // Find post by id
          let comment = await Comment.findById({ _id: req.params.commentid });
        
          await Comment.remove({ _id: req.params.commentid });
          console.log("Deleted Comment");
          res.redirect(`/post/${req.params.postid}`);
        } catch (err) {
            console.log(err);
        }
      },
};

   

  

  
 
 
