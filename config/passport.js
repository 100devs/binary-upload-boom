//imports the local stratergy of passort
const LocalStrategy = require("passport-local").Strategy;
//imports mongoose
const mongoose = require("mongoose");
//imports the User model
const User = require("../models/User");

// exports a function that takes in passport
module.exports = function (passport) {
//use password and create a new local strategy with email and passport
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    //finds one document from user model with matching email in lowercase
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        // if error
        if (err) {
          return done(err);
        }
        // if no user returns email not found
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        //if no password sends this error message
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        //compares the user password to passed in password
        user.comparePassword(password, (err, isMatch) => {
          // if err
          if (err) {
            return done(err);
          }
          // if passwords match 
          if (isMatch) {
            return done(null, user);
          }
          // else returns error message
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );
  
  //persists user data when logged into sessions, this how user id gets saved to the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // retrieves user data from a session, searches database for user model instance, this how user gets saved with mongostore
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
