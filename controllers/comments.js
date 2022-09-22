const Comment = require("../models/Comment");

module.exports = {
//const posts = await Post.find({ user: req.user.id });
  createComment: async (req, res) => {
    try {
      // Upload image to cloudinary
      

      await Comment.create({
        comment: req.body.comment,
      
        postId: req.params.id,
        // likes: 0,
        // user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);//error might be here one of the slashes
    } catch (err) {
      console.log(err);
    }
  },
  
};
