// Core Modules
const LocalStrategy = require("passport-local").Strategy; // Requiring passport and strategy
const mongoose = require("mongoose"); // Requiring Mongoose
const User = require("../models/User"); // Requiring Models Path to User.js

// exporting passport function to be used
module.exports = function (passport) {
  // using passport
  passport.use(
    // creating a localstrategy
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        } // closing bracket for if err conditional
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        } // closing bracket for !user conditional
        if (!user.password) {
          return done(null, false, {
            msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        } // closing b racket for !user.password
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            // if statement for error handling
            return done(err);
          } // closing bracket for if(err)
          if (isMatch) {
            // if statement for ismatch
            return done(null, user);
          } // Closing Bracket for if(ismatch)
          return done(null, false, { msg: "Invalid email or password." });
        }); // Closing Brackets for comparePassword
      }); // Closing Brackets for findOne
    }) // Closing Brackets for localstrategy
  ); // Closing parenthesis for passport.use

  // Determines what data of the user objects hould be stored in the session
  passport.serializeUser((user, done) => {
    done(null, user.id); // saving user.id in the session
  }); // Closing bracket for serializeuser

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user)); // Finding a user by an ID
  }); // Closing Bracket for deserializeUser
}; // Closing Bracket for passport function export
