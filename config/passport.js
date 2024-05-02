const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        // Find the user based on the email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          // No user found with that email
          return done(null, false, { msg: `Email ${email} not found.` });
        }

        if (!user.password) {
          // User registered using a sign-in provider
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }

        // Compare passwords if the user is found
        const isMatch = await user.comparePassword(password);

        if (isMatch) {
          // Successful login
          return done(null, user);
        } else {
          // Password does not match
          return done(null, false, { msg: "Invalid email or password." });
        }
      } catch (err) {
        // Error occurred during user lookup or password comparison
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
