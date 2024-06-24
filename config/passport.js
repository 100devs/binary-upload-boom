const LocalStrategy = require("passport-local").Strategy; // Import the passport-local module, the purpose of this module is to authenticate users using a username and password
const mongoose = require("mongoose"); //importing mongoose module for database connection
const User = require("../models/User"); //importing User model for authentication



// Exporting the passport module
// The passport module is used to authenticate requests, which it does through an extensible set of plugins known as strategies.
// Strategies in passport require a `verify` function, which accept credentials (in this case, a username and password), and invoke a callback with a user object.
// module.exports is from Node.js, it is a special object which is included in every JS file in the Node.js application by default. The purpose of module.exports is to make a single object available when another script exports from the file.
// In this case we are exporting the passport module, which is a function that takes in the passport object as a parameter and returns the passport object with the LocalStrategy plugin attached to it.
module.exports = function (passport) {
  passport.use( //passport.use() is used to initialize the LocalStrategy with the correct options
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => { //usernameField is set to email, so that the user can login using email address instead of username, verify callback is used to verify the user, done is a callback function that is used to return the user
      //a callback is a function that is passed as an argument to another function, the purpose of a callback is to be executed after the other function has finished executing
      User.findOne({ email: email.toLowerCase() }, (err, user) => { //Here we are finding the user in the database using the email address, the findOne() function is used to find a single document in the database, the findOne() function takes in a query object and a callback function as parameters, the query object is used to find the document in the database, the callback function is used to return the document
        //this query object is used to find the user in the database using the email address
        if (err) { //if there is an error, return the error
          return done(err); //done is a callback function that is used to return the user, in this case we are returning the error
        }
        if (!user) { //if the user is not found, return the message "Email not found"
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) { //if (!user.password) is used to check if the user has a password, if the user does not have a password....
          return done(null, false, { //return done with the following parameters
            msg: //msg is the message that is returned to the user
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => { //Here we are comparing the password that the user entered with the password that is stored in the database, the comparePassword() function is used to compare the password that the user entered with the password that is stored in the database, the comparePassword() function takes in the password that the user entered and a callback function as parameters, the callback function is used to return the result of the comparison
          if (err) { //if there is an error, return the error
            return done(err);
          }
          if (isMatch) { //if the password that the user entered matches the password that is stored in the database, return the user
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." }); //if the password that the user entered does not match the password that is stored in the database, return the message "Invalid email or password." null in this case means that there is no error, false means that the user is not authenticated
        });
      });
    })
  );

  passport.serializeUser((user, done) => { //passport.serializeUser() is used to serialize the user for the session, the purpose of serializeUser is to determine which data of the user object should be stored in the session,
    done(null, user.id);
  });

  // => in es6 is used to return the result of the function that is on the right side of the arrow
  passport.deserializeUser((id, done) => { //passport.deserializeUser() is used to deserialize the user, the purpose of deserializeUser is to retrieve the user object based on the id that is stored in the session, fn is a callback function that is used to return the user
    User.findById(id, (err, user) => done(err, user)); //findById() is used to find a single document in the database using the id, the findById() function takes in an id and a callback function as parameters, the callback function is used to return the document, projection is used to specify which fields to include or exclude in the returned document
  });
};
