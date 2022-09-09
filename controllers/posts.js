const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User")
const Comment = require("../models/Comment")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id });
      const owner = await User.findById(req.params.id) 
      res.render("profile.ejs", { posts: posts, owner: owner._id, userId: req.user.id });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const owner = await User.findById(post.user);
      const comments = await Comment.find({postId: req.params.id}).sort({ createdAt: "desc" }).lean()
      console.log(comments)
      let commenters = []
      for(let i = 0; i < comments.length; i++) {
        let user = await User.findById(comments[i].madeBy)
        commenters.push(user)
      }
      console.log(commenters)
      res.render("post.ejs", {post: post, owner: owner.userName, comments: comments, viewer: req.user, commenters: commenters});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req,res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        madeBy: req.user.id,
        likes: 0,
        postId: req.params.postId,
      })
      res.redirect(`/post/${req.params.postId}`)
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      const liked = post.likers.includes(req.user.id)
      console.log(post.likers)
      if(liked) {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
          }
        );
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: { "likers": req.user.id },
          }
        );
      } else {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: { "likers": req.user.id },
          }
        );
      }
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      let comment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${comment.postId}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      res.redirect("/profile");
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find post by id
      let comment = await Comment.findById({ _id: req.params.id });
      let post = await Post.findById({_id: comment.postId})
      // Delete post from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/post/${post._id}`);
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
