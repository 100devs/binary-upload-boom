const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Wishlist = require("../models/Wishlist");


module.exports = {
  getWishlist: async (req, res) => {
    try {
      const wishlist = await Wishlist.find({user: req.user});

      //const post = await Post.findById(req.params.id);////////////////// changed 1, 2. added post to render
          
      res.render("wishlist.ejs", { wishlist: wishlist, user: req.user});//post linked to line 32 post.ejs
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
  
  createWishlist: async (req, res) => {
    try {
      // Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);

      await Wishlist.create({
        postId: req.params.id,
        cloudinaryId: req.params.cloudinaryId,
        caption: req.params.caption,
        title:req.params.title,
        user: req.user.id,
      });
      
      console.log("Wishlist has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
    
    /*try {
      //Upload image to cloudinary
      //const result = await cloudinary.uploader.upload(req.file.path);

      await Wishlist.create({
        postId: req.params.id,//////////////////////////////////////// /////////////changed title to post name
        //image: result.secure_url,
        //cloudinaryId: result.public_id,
    
        
        user: req.user.id,
      });
      
      console.log("wishlist has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },*/
  deleteWishlist: async (req, res) => {
    try {
      // Find post by id
      let wishlist = await Wishlist.findById({ _id: req.params.id });
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Wishlist.remove({ _id: req.params.id });
      console.log("Deleted Wishlist Item");
      res.redirect("/wishlist/:id");
    } catch (err) {
      res.redirect("/wishlist/:id");
    }
  },

  
};

