
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
    
      // media is restricted to jpg, jpeg and png for now 
      // change the restriction in middleware/multer.js
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });

      // direct back to the same page
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  
};
