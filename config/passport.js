const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

// Export the following passport configuration functions so it can be used in our app
module.exports = function (passport) {
  // Configure a local authentication strategy (email/password)
  passport.use(
    // local Strategy to use "email"
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Find a user in the database by email
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        // if no user found, auth fails
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        // Compare provided password wth hashed password in DB
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
  // Serialize user to session (store user id)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // Deserialize user from session by user id
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
