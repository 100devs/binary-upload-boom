const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({'image':-1});
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find({image: { $exists: true}}).sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts, user: req.user  });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user');
      // get comment for this post
      const comments = await Comment.find({'postId': req.params.id }).populate('user');
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary


	  const post = {
        title: req.body.title,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      }
	  if(req.file) {
		const result = await cloudinary.uploader.upload(req.file.path);
		post['image'] = result.secure_url,
        post['cloudinaryId'] = result.public_id
	  }
		await Post.create(post);

      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
			const post = await Post.findById(req.params.id);
			const poster = post.user;
			const commenter = req.body.commenter;
			if (commenter === poster) {
				throw new Error("You can't like your own post!");
			} else if (post.likedUsers.includes(commenter)) {
				throw new Error('You have already liked this post.');
			} else {
				post.likedUsers.push(commenter);
				post.likes += 1;
				await post.save();
			}
			console.log("Likes +1");
    } catch (err) {
      console.log(err);
			req.flash('error', { msg: err.message });
    } finally {
			res.redirect(`/post/${req.params.id}`);
		}
  },
  editPost: async (req, res) => {
    try {
		const result = await cloudinary.uploader.upload(req.file.path);

      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: {
			title: req.params.title,
			caption: req.params.caption,
			image: result.secure_url,
			cloudinaryId: result.public_id,
			  },
        }
      );
      console.log("Post edited");
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
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
