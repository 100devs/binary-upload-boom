const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getOtherProfile: async (req, res) => {
    try {
      const otherUser = await User.findById( req.params.id )
      const posts = await Post.find({ user: req.params.id });
      res.render("otherProfile.ejs", { posts: posts, user: otherUser });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const linkData = {
        link: '/topMemes',
        linkName: 'Top Memes'
      }
      let num;
      const allUsers = await User.find().sort({ totalLikes: "desc" }).lean()
      if (allUsers.length > 10){
        num = 10;
      }else {
        num = allUsers.length
      }
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user, allUsers: allUsers, number: num, link: linkData});
    } catch (err) {
      console.log(err);
    }
  },
  sortByBest: async (req, res) => {
    try {
      const linkData = {
        link: '/feed',
        linkName: 'New Memes'
      }
      let num;
      const allUsers = await User.find().sort({ totalLikes: "desc" }).lean()
      if (allUsers.length > 10) {
        num = 10;
      } else {
        num = allUsers.length
      }
      const posts = await Post.find().sort({ likes: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user, allUsers: allUsers, number: num, link: linkData });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
  
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id })
      const postOwner = await User.findById({_id: post.user})
      console.log(post.user)
      res.render("post.ejs", { post: post, user: req.user, comments: comments, postOwner: postOwner });
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
        likes: 0,
        user: req.user.id,
        userName: req.user.userName
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      
      console.log(req.user)
      await Comment.create({
        content: req.body.comment,
        post: req.params.id,
        user: req.user.userName
      });
      console.log("comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      if (!req.user.likedPosts.includes(req.params.id)){
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        )
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            $push: {likedPosts: req.params.id}
          }
        )
        await User.findOneAndUpdate(
          { _id: req.body.postUser },
          {
            $inc: { totalLikes: 1 }
          }
        )
      } else {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
          }
        )
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            $pull: {likedPosts: req.params.id}
          }
        )
        await User.findOneAndUpdate(
          { _id: req.body.postUser },
          {
            $inc: { totalLikes: -1 }
          }
        )
      }
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  likePostFromFeed: async (req, res) => {
    try {
      if (!req.user.likedPosts.includes(req.params.id)) {
        var response = await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          },
          { new: true }
        )
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            $push: { likedPosts: req.params.id }
          }
        )
        await User.findOneAndUpdate(
          {_id: req.body.postUser},
          {
            $inc: {totalLikes: 1}
          }
        )
        console.log("Likes +1");
        res.json({ 
          likes: response.likes,
          liked: true,
        })
      } else {
        var response = await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
          },
          { new: true}
        )
        await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            $pull: { likedPosts: req.params.id }
          }
        )
        await User.findOneAndUpdate(
          { _id: req.body.postUser },
          {
            $inc: { totalLikes: -1 }
          }
        )
        console.log("Likes -1");
        res.json({ 
          likes: response.likes,
          liked: false, 
        })
      }

    } catch (err) {
      console.log(err)
      return false;
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
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
