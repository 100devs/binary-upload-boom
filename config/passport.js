const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require("mongoose");
const User = require("../models/User");
const GoogleUser = require('../models/GoogleUser')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
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
    
    
    

  )
    passport.serializeUser((user, done) => {
      console.log(user)
      done(null, user.id)
    })
    
    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        if(err) done(err);
          if(user){
            done(null, user);
          } else {
             GoogleUser.findById(id, function(err, user){
             if(err) done(err);
             done(null, user);
          })
      }
   })
  })


  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }

        try {
          let user = await GoogleUser.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await GoogleUser.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )
}

  

 
