const Comment = require("../models/Comment")

module.exports = {
 
  createComment: async (req, res) => {
    try {
    
        console.log(req.params.id)
        console.log(req.user)
      await Comment.create({
        comment: req.body.comment,
        
        post: req.params.id,
        user: req.user.id,
        username: req.user.userName,
      });
      
      console.log("Post has been added!");
      res.redirect("/post/"+ req.params.id);
    } catch (err) {
      console.log(err);
    }
  }

};