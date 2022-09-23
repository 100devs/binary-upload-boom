const Comment = require("../models/Comment");

module.exports = {

  /* create a page to comment the post */
  createComment: async (req, res) => {
        try {
          const comment = {
            comment: req.body.comment,
            postId: req.body.post,
            user: req.body.user,
          }

    		await Comment.create(comment);
        req.flash('success', { msg: 'Your comment was added.' })

      } catch (err) {
        console.log(err);
        req.flash('error', { msg: 'Your comment could not be added.' })
    } finally {
    res.redirect(`/post/${req.body.post}`);
    }
  }

};
