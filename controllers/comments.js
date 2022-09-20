const Comment = require("../models/Comment");
const mongoose = require('mongoose');


module.exports = {

  editComment: async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.body.id,
			      { comment: req.body.comment}
      );

      console.log("Comment edited");
      req.flash('success', { msg: 'Your comment was successfully modified.' })
    } catch (err) {
      console.log(err);
      req.flash('error', { msg: 'Your comment could not be added.' })
    } finally {
      res.redirect(`/post/${req.body.post}`);
    }
  },

    deleteComment: async (req, res) => {
     try {
   let comment = await Comment.findById({ _id: req.body.id });

       await Comment.remove({ _id: req.body.id });
       console.log("Deleted Post");
     } catch (err) {
      console.log(err);
      req.flash('error', { msg: 'Your comment could not be deleted.' })
    } finally {
      res.redirect(`/post/${req.body.post}`);
    }

  },



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
