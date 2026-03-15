const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //finds the data about the email
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        //chcks if there is no user 
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        //checks if there is no password
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        //checks if the password is correct
        user.comparePassword(password, (err, isMatch) => {
          //checks if there is an error
          if (err) {
            return done(err);
          }
          //checks if it is a match
          if (isMatch) {
            return done(null, user);
          }
          //if not error or match it notifies of invalid inputs
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
