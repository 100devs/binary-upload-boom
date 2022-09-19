const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId; //

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
        req.flash('success', { msg: 'Success! You are logged in.' })
       res.redirect(`/post/${req.body.post}`);

      } catch (err) {
        console.log(err);
    }
  }

};
