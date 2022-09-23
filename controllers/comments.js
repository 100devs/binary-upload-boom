const Comment = require("../models/Comment");
const User = require("../models/User");
const Post = require("../models/Post");
const { array } = require("../middleware/multer");
const { populate } = require("../models/Comment");

module.exports = {
  getComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.render("comment.ejs", { comment: comment, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  createComment: async (req, res) => {
    let parentPost = await Post.findById(req.params.postid);
    try {
      await Comment.create({
        text: req.body.text,
        user: req.user.id,
        parents: parentPost,
      });
      let comment = await Comment.findOne({text: req.body.text});
      parentPost.comments.push(comment);
      await parentPost.save();
      console.log(req.body)
      console.log(`Comment has been added by ${req.user.userName}!`);
      res.redirect("/post/" + req.params.postid);
    }
    catch (err) {
      console.log(err);
    }
  },

  createReply: async (req, res) => {
    let parentPost = await Post.findById(req.params.postid);
    let parentComment = await Comment.findById(req.params.commentid);
    try {
      await Comment.create({
        text: req.body.text,
        user: req.user.id,
        parents: [parentComment, parentPost],
      });
      let comment = await Comment.findOne({text: req.body.text});
      parentPost.comment[i].replies.push(comment);
      await parentComment.save();
      console.log(`Comment has been added by ${req.user.userName}!`);
      res.redirect("/comment/" + req.params.commentid);
    }
    catch (err) {
      console.log(err);
    }
  },

  editComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.createdById == req.user.id) {
        comment.text = req.body.text;
        await comment.save();
        console.log("Comment has been edited!");
        res.redirect("/post/"+req.params.id);
      } else {
        console.log("You can't edit this comment!");
        res.redirect("/post/"+req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentid })
      console.log("comment removed")
      res.redirect("/post/"+req.params.postid);
    } catch (err) {
      console.log(err);
    }
  },

  upvoteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.votes.includes(req.user.id)) {
        console.log("You already upvoted this comment!");
        res.redirect("/post/"+req.params.id);
      } else {
        comment.votes.push(req.user.id);
        comment.voteCount++;
        await comment.save();
        console.log("Upvote successful!");
        res.redirect("/post/"+req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },

  downvoteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.votes.includes(req.user.id)) {
        comment.votes.pull(req.user.id);
        comment.voteCount--;
        await comment.save();
        console.log("Downvote successful!");
        res.redirect("/post/"+req.params.id);
      } else {
        console.log("You haven't upvoted this comment yet!");
        res.redirect("/post/"+req.params.id);
      }
    } catch (err) {
      console.log(err);
    }
  },
};