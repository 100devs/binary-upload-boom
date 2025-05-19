// Import the LocalStrategy constructor from the passport-local module
const LocalStrategy = require("passport-local").Strategy;
// Import mongoose to interact with the MongoDB database
const mongoose = require("mongoose");
// Import the User model which contains schema and methods for authentication
const User = require("../models/User");

// Export a function to configure Passport.js
module.exports = function (passport) {
  // Configure the local strategy for username/password authentication
  passport.use(
    new LocalStrategy(
      { usernameField: "email" }, // Use "email" instead of default "username"
      (email, password, done) => {
        // Find the user in the database by email (converted to lowercase)
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
          if (err) {
            return done(err); // Return any DB error
          }
          if (!user) {
            // No user found with that email
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          if (!user.password) {
            // User exists but doesn't have a local password set (used a third-party login)
            return done(null, false, {
              msg:
                "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
            });
          }

          // If user found, compare the entered password with the hashed one in DB
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err); // Return error if comparison fails
            }
            if (isMatch) {
              // Password matches, login successful
              return done(null, user);
            }
            // Password does not match
            return done(null, false, { msg: "Invalid email or password." });
          });
        });
      }
    )
  );

  // Serialize the user ID to store in session cookie
  passport.serializeUser((user, done) => {
    done(null, user.id); // Store only the user's ID in the session
  });

  // Deserialize the user based on ID stored in the session
  passport.deserializeUser((id, done) => {
    // Look up the user in the database by their ID
    User.findById(id, (err, user) => done(err, user));
  });
};
