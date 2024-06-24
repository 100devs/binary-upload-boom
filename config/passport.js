// setting strategy for passport (local) and importing User schema
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

// local strategy setup using email and password
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //find the user in the DB
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        // user doesn't exist
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        // no password saved to account because used sign-in provider (google, facebook, twitter, etc)
        if (!user.password) {
          return done(null, false, {
            msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        // verify password with hash
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
  // converting logged in user into a persistent form
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // reconverting back to "usable" user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
