// import passport strategy & mongoose to speak with DB
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

// import user model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // ensure email is composed of lowercase chars when searching DB
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        // case that email is not found in DB
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        // sign in provider case
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        // check if password is correct
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          // return msg for invalid email or password use
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );


  // serialize and deserialize functionality
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
