const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      if (req.body.parentComment) {
        const parent = await Comment.findOne({
          _id: req.body.parentComment,
          post: req.params.id,
        });

        if (!parent) {
          return res.status(400).send("Invalid parent comment");
        }
      }
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        parentComment: req.body.parentComment || null,
        createdBy: req.user.userName,
        createdById: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  editComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid,
          post: req.params.postid,
          createdById: req.user.id,
          isDeleted: { $ne: true },
        },
        {
          $set: {
            comment: req.body.comment,
            editedAt: new Date(),
          },
        },
        { runValidators: true }
      );
      console.log("Comment Updated");
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      console.log(err);
      res.redirect(`/post/${req.params.postid}`);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.commentid },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Comment Likes +1");
      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findOne({
        _id: req.params.commentid,
        post: req.params.postid,
        createdById: req.user.id,
        isDeleted: { $ne: true },
      });
      if (!comment) {
        return res.redirect(`/post/${req.params.postid}`);
      }

      const hasReplies = await Comment.exists({
        parentComment: comment._id,
      });
      if (hasReplies) {
        await Comment.updateOne(
          { _id: comment._id },
          {
            $set: {
              comment: "Comment was deleted",
              isDeleted: true,
              createdBy: "[deleted]",
              createdById: null,
            },
          }
        );
      } else {
        await Comment.deleteOne({ _id: comment._id });
      }

      res.redirect(`/post/${req.params.postid}`);
    } catch (err) {
      console.log(err);
      res.redirect(`/post/${req.params.postid}`);
    }
  },
};
