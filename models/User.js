// User.js model is for the user schema

const bcrypt = require("bcrypt"); // Password hash middleware. bcrypt is a library that allows you to hash passwords and compare them to the hashed password in the database. This is so that you can store the password in the database as a hash and not as plain text. This is a security measure.
const mongoose = require("mongoose"); // mongoose is required here because we are using mongoose to create the schema.

// User schema is created here.
// The schema is the structure of the data that is stored in the database.
const UserSchema = new mongoose.Schema({ // mongoose.Schema is a constructor function that creates a new schema.
  userName: { type: String, unique: true }, // userName is a property of the schema. It is a string and it must be unique.
  email: { type: String, unique: true }, // email is a property of the schema. It is a string and it must be unique.
  password: String, // password is a property of the schema. It is a string.
  comments: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
  }]
});

// Password hash middleware.
// This is a function that is called before the user is saved to the database.
// This function is called a middleware function.
// Middleware functions are functions that are called before the route handler function.
UserSchema.pre("save", function save(next) { // UserSchema.pre is a function that is called before the user is saved to the database. The first argument is the name of the event that is being listened for. The second argument is the function that is called when the event is triggered. In this case, the event is "save" and the function is "save".
  const user = this; // user is a variable that is equal to the user that is being saved to the database. This is so that we can access the user's properties.
  if (!user.isModified("password")) { // If the user's password is not modified, then the function is returned. This is so that the password is not hashed again if the user is not changing their password.
    return next(); // next() is a function that is called to move on to the next middleware function.
  }
  //bcrypt rounds is the number of times that the password is hashed. The higher the number, the more secure the password is.
  bcrypt.genSalt(10, (err, salt) => { // bcrypt.genSalt is a function that generates a salt. The first argument is the number of rounds that the salt is generated for. The second argument is a callback function that is called when the salt is generated. The first argument of the callback function is an error and the second argument is the salt.
    if (err) { // If there is an error, then the error is returned.
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => { // bcrypt.hash is a function that hashes the user's password. The first argument is the user's password. The second argument is the salt. The third argument is a callback function that is called when the password is hashed. The first argument of the callback function is an error and the second argument is the hash.
      if (err) { // If there is an error, then the error is returned.
        return next(err);
      }
      user.password = hash; // The user's password is set to the hash.
      next(); // next() is called to move on to the next middleware function.
    });
  });
});

// Helper method for validating user's password.
// This is a function that is called to compare the user's password to the password in the database.
UserSchema.methods.comparePassword = function comparePassword( // UserSchema.methods is an object that contains functions that are called on the user. The first argument is the name of the function. The second argument is the function that is called when the function is called on the user. In this case, the function is called "comparePassword" and the function is "comparePassword".
  candidatePassword, // candidatePassword is the password that is being compared to the password in the database.
  cb // cb is a callback function that is called when the password is compared. The first argument of the callback function is an error and the second argument is a boolean that is true if the passwords match and false if they do not match.
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { // bcrypt.compare is a function that compares the candidatePassword to the password in the database. The first argument is the candidatePassword. The second argument is the password in the database. The third argument is a callback function that is called when the password is compared. The first argument of the callback function is an error and the second argument is a boolean that is true if the passwords match and false if they do not match.
    cb(err, isMatch); // cb is called with the error and the boolean that is true if the passwords match and false if they do not match.
  });
};

module.exports = mongoose.model("User", UserSchema); // The User model is exported. The first argument is the name of the model. The second argument is the schema that the model is based on.
