// imports cloudinary set from middleware
const cloudinary = require("../middleware/cloudinary");
// imports Post model
const Post = require("../models/Post");
// imports User model
const User = require("../models/User")
//imports Comment model
const Comment = require("../models/Comment")

module.exports = {
  //async function to render profile
  getProfile: async (req, res) => {
    try {
      // finds all the posts from the user matching id param
      const posts = await Post.find({ user: req.params.id });
      //finds the user that owns the profile from the id param
      const owner = await User.findById(req.params.id) 
      //renders profile and sends posts, owner id, and user(viewer) id
      res.render("profile.ejs", { posts: posts, owner: owner._id, userId: req.user.id });
    } catch (err) {
      console.log(err);
    }
  },
  //async function to render feed
  getFeed: async (req, res) => {
    try {
      //gets all posts and sorts them by most recently created
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      //renders feed ejs and passes in the posts
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  //async function to render a post
  getPost: async (req, res) => {
    try {
      // finds the post with its id from the params
      const post = await Post.findById(req.params.id);
      // find the owner of the post from user property on post
      const owner = await User.findById(post.user);
      // find all the comments by searching for postID in params, sort them by latest posted
      const comments = await Comment.find({postId: req.params.id}).sort({ createdAt: "desc" }).lean()
      //initializes array of commenters
      let commenters = []
      //loops through the comments
      for(let i = 0; i < comments.length; i++) {
        //finds the user for every commenter from madeBy ID
        let user = await User.findById(comments[i].madeBy)
        //pushes it to array
        commenters.push(user)
      }
      //renders post page and passes in post, owner, comments, and commenters
      res.render("post.ejs", {post: post, owner: owner.userName, comments: comments, viewer: req.user, commenters: commenters});
    } catch (err) {
      console.log(err);
    }
  },
  // creates a post
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      
      // creates the post in the database with props from model and inputs from form
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        //cloudinary ID lets us delete the pictures from cloudinary
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      //redirects to the users profile
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  // posts a comment
  createComment: async (req,res) => {
    try {
      // creates comment in database
      await Comment.create({
        comment: req.body.comment,
        madeBy: req.user.id,
        likes: 0,
        postId: req.params.postId,
      })
      //redircts to the post page with id from params
      res.redirect(`/post/${req.params.postId}`)
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      //finds post with the id from the params
      const post = await Post.findById(req.params.id)
      //checks if the user has already liked this array
      const liked = post.likers.includes(req.user.id)
      // if they have linked it
      if(liked) {
        //find the post w/ the param id and decrement it by one
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
          }
        );
        //find the post w/ the param id and remove the user from the likers list
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: { "likers": req.user.id },
          }
        );
      // otherwise if they have not liked it
      } else {
        //find the post w/ the param id and increment it by one
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
          }
        );
        //find the post w/ the param id and add the user to the likers list
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: { "likers": req.user.id },
          }
        );
      }
      //redirect to the post page
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
  // deletes a post
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      // redirect to users profile
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      res.redirect(`/profile/${req.user.id}`);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // finds the post so the id can be used to redirect
      let post = await Post.findById({_id: comment.postId})
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      // redirects to the post
      res.redirect(`/post/${post._id}`);
    } catch (err) {
      res.redirect(`/profile/${req.user.id}`);
    }
  },
};
