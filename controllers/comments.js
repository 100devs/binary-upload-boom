
const Comment = require("../models/Comment");

module.exports = {
  
  createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post:req.params.id,
        
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params);
    } catch (err) {
      console.log(err);
    }
  },
  
};
