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
      req.flash('error', { msg: 'Your comment could not be modified.' })
    } finally {
      res.redirect(`/post/${req.body.post}`);
    }
  },

    deleteComment: async (req, res) => {
     try {
   		let comment = await Comment.findById({ _id: req.body.id });
			if (comment.user != req.user.id) throw new Error("User mismatch");
			await Comment.remove({ _id: req.body.id });
			console.log("Deleted Post");
			req.flash('success', { msg: 'Your comment has been deleted.' })
     } catch (err) {
      console.log(err);
      req.flash('error', { msg: 'Your comment could not be deleted.' })
    } finally {
      res.redirect(`/post/${req.body.post}`);
    }

  },
    likeComment: async (req, res) => {
    try {
			const comment = await Comment.findById(req.params.id);
			const poster = comment.user; // You have an id here, no the name and the like info of the user
			const commenter = req.body.commenter;
			if (commenter === poster) {
				throw new Error("You can't like your own comment!");
			} else if (comment.likedUsers.includes(commenter)) {
				throw new Error('You have already liked this comment.');
			} else {
				comment.likedUsers.push(commenter);
				comment.likes += 1;
				await comment.save();
			}
			console.log("Likes +1");
    } catch (err) {
      console.log(err);
			req.flash('error', { msg: err.message });
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
