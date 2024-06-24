const User = require('../models/User');

module.exports = {
  followUser: async (req, res) => {
    try {
      const userToFollow = await User.findOne({ _id: req.params.id });
      const user = await User.findOne({ _id: req.user._id });
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $addToSet: { following: userToFollow },
        }
      );
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $addToSet: { followers: userToFollow },
        }
      );
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  },
  unfollowUser: async (req, res) => {
    try {
      const userToFollow = await User.findOne({ _id: req.params.id });
      const user = await User.findOne({ _id: req.user._id });
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: userToFollow._id },
        }
      );
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: userToFollow._id },
        }
      );
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  },
};
