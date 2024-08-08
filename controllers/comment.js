const Comment = require("../models/Comment");

module.exports = {
    postComment: async (req, res) => {
      try {
        const comment = await Comment.create({
          comment: req.body.comment,
          post: req.params.id
        });
        console.log(`Comment Added: ${req.body.comment}`);
        res.redirect(`/post/${req.params.id}`);
      }
      catch (err) {
        console.log(`Comment could not be generated → ${err}`)
      }
    }
  }