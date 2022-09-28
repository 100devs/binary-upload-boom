const LocalStrategy = require("passport-local").Strategy; //setup passport local strategy
const mongoose = require("mongoose"); //requires mongoose schema
const User = require("../models/User"); //uses the model-schema 

module.exports = function (passport) { //the "module.exports" is being declared here so you can use this elsewhere
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => { //the localstrategy is stating three param, email, pass, done
      User.findOne({ email: email.toLowerCase() }, (err, user) => { //this logic will check for an user with this email. Otherwise, will throw an err. stating that the email was not found
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => { // this logic will match the password stored with the pass inputted.
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

  passport.serializeUser((user, done) => { //sets up ids as cookies in user's browser
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => { //this gets the id from the cookie
    User.findById(id, (err, user) => done(err, user));
  });
};
