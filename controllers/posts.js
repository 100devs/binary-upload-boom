const cloudinary = require('../middleware/cloudinary');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Profile = require('../models/Profile');
const validator = require('validator');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const posts = await Post.find({ user: req.user.id });
      const user = await User.findOne({ _id: req.user.id })
        .populate({
          path: 'following',
          select: '_id userName',
        })
        .populate({ path: 'followers', select: '_id userName' });
      res.render('profile.ejs', { posts: posts, user: user, profile: profile });
    } catch (err) {
      console.log(err);
    }
  },
  getPublicProfile: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      const profile = await Profile.findOne({ user: req.params.id })
        .populate({
          path: 'following',
          select: '_id userName',
        })
        .populate({ path: 'followers', select: '_id userName' });
      const following = req.user.following;
      const posts = await Post.find({ user: req.params.id });
      if (req.user._id.toString() === user._id.toString())
        res.redirect('/profile');
      res.render('publicProfile.ejs', {
        posts: posts,
        username: user.userName,
        id: user._id,
        following: following,
        user: user,
        profile: profile,
        song: profile && profile.profileSong ? profile.profileSong : null,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .populate({ path: 'user', select: 'userName' })
        .lean();
      const likes = await Post.aggregate([
        { $match: { user: req.user._id } },
        { $group: { _id: '$user', total: { $sum: '$likes' } } },
      ]);
      res.render('feed.ejs', {
        posts: posts,
        likes: likes[0] ? likes[0].total : 0,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate({
        path: 'user',
        select: 'userName',
      });
      const comments = await Comment.find({ post: post.id }).lean();
      res.render('post.ejs', {
        post: post,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      const validationErrors = [];
      if (!req.file) validationErrors.push({ msg: 'Please add an image file' });
      if (validator.isEmpty(req.body.title))
        validationErrors.push({ msg: 'Title must not be blank' });
      if (validator.isEmpty(req.body.caption))
        validationErrors.push({ msg: 'Caption must not be blank' });

      if (validationErrors.length) {
        console.log('validationErrors', validationErrors);
        req.flash('errors', validationErrors);
        return res.redirect('/profile');
      }

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
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log('Likes +1');
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
      console.log('Deleted Post');
      res.redirect('/profile');
    } catch (err) {
      res.redirect('/profile');
    }
  },
  createProfilePic: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await Profile.create({
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log('Profile pic has been updated!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
  updateProfilePic: async (req, res) => {
    try {
      const profile = await Profile.find({ user: req.user.id });
      if (profile.cloudinaryId)
        await cloudinary.uploader.destroy(profile[0].cloudinaryId);
      const result = await cloudinary.uploader.upload(req.file.path);
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          image: result.secure_url,
          cloudinaryId: result.public_id,
          user: req.user.id,
        }
      );
      console.log('Profile pic has been updated!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
  createProfileSong: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
      });
      await Profile.create({
        profileSong: result.secure_url,
        songCloudinaryId: result.public_id,
        user: req.user.id,
      });

      console.log('Profile song has been set!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
  updateProfileSong: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile.songCloudinaryId)
        await cloudinary.uploader.destroy(profile.songCloudinaryId);
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'video',
      });
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          profileSong: result.secure_url,
          songCloudinaryId: result.public_id,
        }
      );
      console.log('Profile song has been updated!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
};
