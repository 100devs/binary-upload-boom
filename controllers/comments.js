const cloudinary = require("../middleware/cloudinary");
//loads the comment model
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      //we erefernce the comment model we created for the posts collection
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id, //grabs the id of the particular post that is tied to the comment
      });
      console.log("Comment has been added!");
      //redirects back to the post tied to the comments
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
};
