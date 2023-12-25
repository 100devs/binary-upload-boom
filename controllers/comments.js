const Post = require('../models/Comments');

module.exports = {
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render('post.ejs', { post: post, user: req.user });
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
      console.log('Post has been added!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
};
