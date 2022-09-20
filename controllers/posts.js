const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const Profile = require("../models/Profile")
module.exports = {
  getProfile: async (req, res) => {
    try {
      //find all the post for the user using the unique user id using the mongo find method Which uses the model that knows the collection name
      const posts = await Post.find({ user: req.user.id });
      //need to make a varible to hold the user info from req
      const profile = await Profile.find({user:req.user.id})
      //render that users profile page with all the found post and passing the requests userID
      console.log(profile)
      res.render("profile.ejs", { posts: posts, profile: profile, user:req.user.id });
      //catch error and log the error if there is one
    } catch (err) {
      console.log(err);
    }
  },
  //request to render a page of all the users post aka the fee
  getFeed: async (req, res) => {
    try {
      //find all the post in the database buy all users sort them and place assign them to post varible.Using LEAN method taking only the parts we want
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      //render the page passing the posts
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  //request for a specific indiviual post of a user
  getPost: async (req, res) => {
    try {
      //find post in the database using the id tag of the unique post
      const post = await Post.findById(req.params.id);
      //finding all comments for this post
      const comments = await Comment.find({post: req.params.id}).sort({createdAt: "asc"}).lean()
      //render the ejs and passing it the post data
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  //request to create post
  createPost: async (req, res) => {
    console.log("test to see if createpost is working")
    try {
      // Upload image to cloudinary and telling cloudinary exactly where to grab it store the results from cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      //add post information to the database using the Post Model 
      //console.log(result)
      
      await Post.create({
        //getting the title from the form request
        title: req.body.title,
        //using the cloudinary result url for image that was uploaded
        image: result.secure_url,
        //unique image id from cloudinary
        cloudinaryId: result.public_id,
        //users input for caption
        caption: req.body.caption,
        //like counter
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      //redirect back to the profile after if the post was successful
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  //adding likes to a post
  likePost: async (req, res) => {
    try {
      //find the post in the database and update it 
      console.log("hello")
      await Post.findOneAndUpdate(
       
        { _id: req.params.id },
        {
          //increment the like counter $inc is specific to mongoDB
          $inc: { likes: 1 },
        }
      );
      //if successful console log it
      console.log("Likes +1");
      //redirect refresh post page
      res.redirect(`/post/${req.params.id}`);
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
      //redirect back to the users profile
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
