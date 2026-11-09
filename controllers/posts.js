const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

// Turn a flat list of comments into a tree: each comment gets a `replies` array
const buildCommentTree = (comments) => {
  const byId = new Map();
  const roots = [];

  comments.forEach((comment) => {
    byId.set(comment._id.toString(), { ...comment, replies: [] });
  });

  byId.forEach((comment) => {
    const parentId = comment.parentComment
      ? comment.parentComment.toString()
      : null;
    if (parentId && byId.has(parentId)) {
      byId.get(parentId).replies.push(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
};

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).lean();
      res.render("profile.ejs", { posts, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts });
    } catch (err) {
      console.error(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      if (!post) return res.redirect("/feed");

      // Oldest first reads naturally in a conversation thread
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: "asc" })
        .populate("user", "userName profilePic")
        .lean();

      res.render("post.ejs", {
        post,
        user: req.user,
        comments: buildCommentTree(comments),
        commentCount: comments.length,
      });
    } catch (err) {
      console.error(err);
      res.redirect("/feed");
    }
  },

  createPost: async (req, res) => {
    try {
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
      res.redirect("/profile");
    } catch (err) {
      console.error(err);
    }
  },

  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 } },
      );
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.error(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Clean up the post's comments too, so none are left orphaned
      await Comment.deleteMany({ post: req.params.id });
      await Post.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

  // Upload or replace the logged-in user's profile picture
  updateProfilePic: async (req, res) => {
    try {
      if (!req.file) return res.redirect("/profile");

      const user = await User.findById(req.user.id);
      // Remove the old picture from Cloudinary if there was one
      if (user.profilePicId) {
        await cloudinary.uploader.destroy(user.profilePicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
        ],
      });

      user.profilePic = result.secure_url;
      user.profilePicId = result.public_id;
      await user.save();

      res.redirect("/profile");
    } catch (err) {
      console.error(err);
      res.redirect("/profile");
    }
  },
};
