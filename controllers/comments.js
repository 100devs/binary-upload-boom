const Comment = require('../models/Comments');

module.exports = {
  getComment: async (req, res) => {
    try {
      const posts = await Comment.find().sort({ createdAt: 'desc' }).lean();
      res.render('post.ejs', { comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  // createPost: async (req, res) => {
  //   try {
  //     // Upload image to cloudinary
  //     const result = await cloudinary.uploader.upload(req.file.path);

  //     await Post.create({
  //       title: req.body.title,
  //       image: result.secure_url,
  //       cloudinaryId: result.public_id,
  //       caption: req.body.caption,
  //       likes: 0,
  //       user: req.user.id,
  //     });
  //     console.log('Post has been added!');
  //     res.redirect('/profile');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
