const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  viewProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile2.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getRecipes: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("my-recipes.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getBookmarks: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      //needs to be changed to favorite-recipes.ejs to render liked posts
      res.render("favorite-recipes.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      // find all of the post then sort them by the time they were created in descending order
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      let users = [];
      for(i in posts){
        let user = await User.findById(posts[i].user)
        users.push(user.userName)
      }
      res.render("feed.ejs", { posts: posts, userName: users, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    // console.log(req)
    console.log(res)
    try {
      const post = await Post.findById(req.params.id);

      const nameOfUser = await Post.find(req.params.post)

      const comments = await Comment.find( {post: req.params.id} ).sort({ createdAt: "asc" }).lean();
      const userName = await User.find(req.query.posts)
      res.render("post.ejs", { post: post, user: req.user, comments: comments, userInfo: userName, more: nameOfUser });
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
        dislikes: 0,
        createdBy: req.user.userName,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  likePost: async (req, res)=>{
    var liked = false
    try{
      var post = await Post.findById({_id:req.params.id})
      liked = (post.likes.includes(req.user.id))
    } catch(err){
    }
    //if already liked we will remove user from likes array
    if(liked){
      try{
        await Post.findOneAndUpdate({_id:req.params.id},
          {
            $pull : {'likes' : req.user.id}
          })
          
          console.log('Removed user from likes array')
          res.redirect('back')
        }catch(err){
          console.log(err)
        }
      }
      //else add user to like array
      else{
        try{
          await Post.findOneAndUpdate({_id:req.params.id},
            {
              $addToSet : {'likes' : req.user.id}
            })
            
            console.log('Added user to likes array')
            res.redirect(`back`)
        }catch(err){
            console.log(err)
        }
      }
    },
  dislikePost: async (req, res)=>{
    var disliked = false
    try{
      var post = await Post.findById({_id:req.params.id})
      disliked = (post.dislikes.includes(req.user.id))
    } catch(err){
    }
    //if already liked we will remove user from likes array
    if(disliked){
      try{
        await Post.findOneAndUpdate({_id:req.params.id},
          {
            $pull : {'dislikes' : req.user.id}
          })
          
          console.log('Removed user from dislikes array')
          res.redirect('back')
        }catch(err){
          console.log(err)
        }
      }
      //else add user to like array
      else{
        try{
          await Post.findOneAndUpdate({_id:req.params.id},
            {
              $addToSet : {'dislikes' : req.user.id}
            })
            
            console.log('Added user to dislikes array')
            res.redirect(`back`)
        }catch(err){
            console.log(err)
        }
      }
    },
  // dislikePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { dislikes: -1 },
  //       }
  //     );
  //     console.log("Dislikes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  bookmarkPost: async (req, res)=>{
    var bookmarked = false
    try{
      var post = await Post.findById({_id:req.params.id})
      bookmarked = (post.bookmarks.includes(req.user.id))
    } catch(err){
    }
    //if already bookmarked we will remove user from likes array
    if(bookmarked){
      try{
        await Post.findOneAndUpdate({_id:req.params.id},
          {
            $pull : {'bookmarks' : req.user.id}
          })
          
          console.log('Removed user from bookmarks array')
          res.redirect('back')
        }catch(err){
          console.log(err)
        }
      }
      //else add user to bookmarked array
      else{
        try{
          await Post.findOneAndUpdate({_id:req.params.id},
            {
              $addToSet : {'bookmarks' : req.user.id}
            })
            
            console.log('Added user to bookmarks array')
            res.redirect(`back`)
        }catch(err){
            console.log(err)
        }
      }
    },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      // this line of code is here to make sure that the post exists
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // cloudinary stores the image even when the post is deleted.
      // this line will destory the from the cloudinary database
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
