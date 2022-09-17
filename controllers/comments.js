const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
createComment: async (req, res) => {
    try {
      // const post = await Post.findById(req.params.id);
      await Comment.create({
        userName: req.userName,
        comment: req.body.comment,
        post: req.params.id,
        likes: 0,
        // requires all the properties from the schema model that specify required
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
}