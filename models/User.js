// import bcrypt for hashing passwords
const bcrypt = require("bcrypt");
// mongoose import to speak to mongoDB easier
const mongoose = require("mongoose");

// create a user schema, user documents will contain username, email, and hashed password
const UserSchema = new mongoose.Schema({
  // must be unique
  userName: { type: String, unique: true },
  // must be unique
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.
// hash password before saving in DB
UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.
// make sure user is attempting to log in with the correct password
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

// export User model to be used elsewhere in the application
module.exports = mongoose.model("User", UserSchema);
