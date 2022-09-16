const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
createComment: async (req, res) => {
    try {
      const comment = await Comment.uploader.upload(req.file.path);

      await Comment.create({
        comment: req.body.title,
        post: req.param.id
      });
      console.log("Comment has been added!");
      res.redirect("/post" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
}