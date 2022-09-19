const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Find a user with the given email
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) { // If theres a mongoose error, return it with cb
          return done(err);
        }
        if (!user) { // If user wasnt found, return cb with error message
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) { // If user doesnt have a password, return cb with error
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => { // Compare password entered by hashing it and checking the stored hash
          if (err) { // Bcrypt error? return in cb
            return done(err);
          }
          if (isMatch) { // If bcrypt gave a match, return cb with user
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." }); // Password didnt match, return cb with error
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
