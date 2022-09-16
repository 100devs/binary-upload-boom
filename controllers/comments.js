const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
createComment: async (req, res) => {
    try {
      const comment = await Comment.find().sort({ createdAt: "desc" }).lean();
      await Comment.create({
        comment: req.body.comment,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
}