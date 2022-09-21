// const express = require("express");
// const router = express.Router();
// const commentsController = require("../controllers/comments");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");



// router.get("/:id", ensureAuth, commentsController.getPost);

// router.post("/createPost", upload.single("file"), commentsController.createPost);

// router.put("/likePost/:id", commentsController.likePost);

// router.delete("/deletePost/:id", commentsController.deletePost);


const Comment = require("../models/Comment");

module.exports = {
 createComment: async (req, res) => {
    try {
         await Comment.create({ 
             comment: req.body.comment,
             likes: 0,
             user: req.user.id,
            userName: req.user.userName,
             post: req.params.id
             
         });
        console.log("Comment has been added!");
        res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
        await Comment.findOneAndUpdate(
            { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/Comment/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find Comment by id
      let Comment = await Comment.findById({ _id: req.params.id });
      // Delete Comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      res.redirect(`/post/${req.params.id}`);
    }
  },
};