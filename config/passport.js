const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

// Passport package config.

module.exports = function (passport) {
  passport.use(
    // Use local auth strategy (user provided email + password).
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Find user from database.
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        // No user found = email doesn't exist.
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        // No password on user document means other means of login.
        if (!user.password) {
          return done(null, false, {
            msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        // Compares provided password to salted password by using hashing method.
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  // Serialize user object by passing it along as its id.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Return user object from id.
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
