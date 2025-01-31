const cloudinary = require("../middleware/cloudinary");
//TO SHOW THE IMAGES IN THE POST, LINK THE CLOUDINARY FROM THE MIDDLEWARE FOLDER
const Post = require("../models/Post");
//LINK THE POST MODEL FROM THE MODEL FOLDER AND POST FILE TO USE IN THE FOLLOWING CODE
const Comment = require("../models/Comment");
//LINK THE COMMENT MODEL FROM THE MODEL FOLDER AND COMMENT FILE TO USE IN THE FOLLOWING CODE


module.exports = {
  //FIND THE POST FROM THE SPECIFIC USERID FROM THE REQ BODY AND RENDER THE POST AND USER IN THE PROFILE.EJS 
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  //FIND THE POST FROM THE DB AND SORT IT FROM DESCINDING ORDER AND ONLY GET THE SHORT VERSION OF THE REQ INSTEAD OF THE FULL REQ. THEN RENDER THE POST AND USER IN THE FEED.EJS 
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
    //FIND THE id IN THE DB FROM THE PARAMS ID THEN RENDER THE POST  AND USER IN THE POST.EJS 
    //use the comment model to goto the comment collection to find all the post associated with the current post that you are actual on, sort them in desc order and shorten the info sent back.
    //then render the comment to ejs
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
    //CREATE A POST TO THE DB BY ADDING THE IMAGE TO CLOUDNAIRY FROM THE FILE.PATH  THEN CREATE A POST IN THE DB BY SAVING THE TITLE(FROM THE REQ BODY) , IMAGE(A URL FROM CLOUDINARY), CLOUDINARY ID(FROM CLOUDINARY AND USEFUL FOR DELTETING THE IMAGE) CAPTION(FROM THE REQ BODY) AND LIKES(SET TO 0) AND USER (FROM THE REQ BODY) AND REDIRECT THE USER TO THE PROFILE PAGE 
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
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  //FIND AND UPDATE THE LIKES ON A POST IN THE POST COLLECTION BY USING THE ID FROM THE REQ.PARAMS.ID AND THEN INCREMENT THE LIKES BY 1. AND THE REDIRECT THE USER TO THE POST FROM THE SPECIFIED ID
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  //FIND THE IDFROM THE REQ PARAMS ID. DELETE THE IMAGE FROM THE CLOUDINARY USING THE CLOUDINARY ID, DELETE THE POST FROM THE DB USING THE PARAMS ID, THEN REDIRECT THE USER TO THE PROFILE PAGE
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
