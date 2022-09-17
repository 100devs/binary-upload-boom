const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {

  // route: '/profile'
  // desc: GET user profile
  // render profile.ejs
  getProfile: async (req, res) => {
    
    //console.log(req.user)
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  // route: '/feed'
  // desc: GET user feed
  // render feed.ejs
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },


  // route: '/post/:id'
  // desc: GET one post and its comments
  // render post.ejs
  getPost: async (req, res) => {
    try {

      const post = await Post.findById(req.params.id);
      const comment = await Comment.find({ post: req.params.id });
      
      // console.log(comment)

      res.render("post.ejs", { post: post, user: req.user , comment: comment });
    } catch (err) {
      console.log(err);
    }
  },

  // route: '/post/createpost'
  // desc: POST a post
  // using form to create a post from profile.ejs
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // add to database
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

  // route: '/post/likepost/:id'
  // desc: PUT - like a post
  // using form to like a post with method override
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

  // route: '/post/deletepost/:id'
  // desc: DELETE - delete a post
  // using form to delete a post with method override
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


  // route: '/post/createcomment'
  // desc: POST a comment to a post
  // using form to create a comment on post.ejs
  createComment: async (req, res) => {

    // console.log( req.body )
    try {
      // add to database
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post:  req.params.id,
        user: req.user.id,
      });

      console.log("Comment has been added!");

      res.redirect(`/post/${req.params.id}`);

    } catch (err) {
      console.log(err);
    }
  },


  // route: '/post/deletecomment'
  // desc: POST a comment to a post
  // using form to create a comment on post.ejs
  deleteComment: async (req, res) => {
    try {

      // Delete comment from db
      await Comment.remove({ _id: req.params.commentid });

      console.log("Deleted Comment");

      res.redirect(`/post/${req.params.postid}`);

    } catch (err) {
      console.log(err);
    }
  },

};
