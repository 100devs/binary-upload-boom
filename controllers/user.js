const { ObjectId } = require("mongodb");
const Post = require("../models/Post");
const User = require('../models/User');

module.exports = {
  getProfile: async (req, res) => {
    try {
      // const posts = await Post.find({ user: req.user.id });
      const users = await User.findById(req.params.id)
      const url = await req.originalUrl;
      res.render("profile.ejs", { /* posts: posts,  */user: req.user, users: users, url: url, body: req.body, obj: req.body.leagues });
      /* console.log(users) */
    } catch (err) {
      console.log(err);
    }
  },
  updateLeague: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: { leagues: { 'league': req.body.league, 'sport': req.body.sport } }
        },
        {
          new: true
        }
      )
      const url = await req.originalUrl;

      /* console.log(req.body) */

      console.log("CHANGED USER");
      // res.render("profile.ejs", { /* posts: posts,  */user: req.user, url: url, body: req.body, obj: req.body.leagues });
      res.redirect(`/profile/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  updateTeam: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: { teams: { 'team': req.body.team, 'sport': req.body.sport } }
        },
        {
          new: true
        }
      )
      const url = await req.originalUrl;

      /* console.log(req.body) */

      console.log("CHANGED USER");
      res.redirect(`/profile/${req.params.id}`);
      // res.render("profile.ejs", { /* posts: posts,  */user: req.user, url: url, body: req.body, obj: req.body.leagues });
    } catch (err) {
      console.log(err);
    }
  },
  deleteLeague: async (req, res) => {
    try {

      // Find post by id
      //let post = await Post.findById({ _id: req.params.id });
      /* const users = await User.find({ user: req.user.id }) */

      //Delete post from db
      //Delete post from DB array
      const user = await User.findById(req.params.id)

      const deleteLeagueFromUser = await User.updateOne(
        { _id: req.user.id },
        {
          $pull: { 'leagues': user.leagues.filter(el => el.league === req.body.league)[0] }
        }
      )

      console.log("Deleted something");
      res.redirect(`/profile/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteTeam: async (req, res) => {
    try {

      // Find user by id
      const user = await User.findById(req.params.id)

      const deleteTeamFromUser = await User.updateOne(
        { _id: req.user.id },
        {
          $pull: { 'teams': user.teams.filter(el => el.team === req.body.team)[0] }
        }
      )

      console.log("Deleted something");
      res.redirect(`/profile/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  /* deleteSomething: async (req, res) => {
    try {

      // Find post by id
      //let post = await Post.findById({ _id: req.params.id });
      const users = await User.find({ user: req.user.id })

      // Delete post from db
      await User.remove({ user: req.params });

      console.log("Deleted something");
      res.redirect(`/profile/{${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  } */
}

