//imports b-crypt
const bcrypt = require("bcrypt");
//imports mongoose
const mongoose = require("mongoose");

//creates new user schema
const UserSchema = new mongoose.Schema({
  //user name property, must be unique
  userName: { type: String, unique: true },
  //email property, must be unique
  email: { type: String, unique: true },
  //password property
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  // if user password has been modified return
  if (!user.isModified("password")) {
    return next();
  }
  //salt the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    //hash the password
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      //set user password equal to hash
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

//exports user model with users collection
module.exports = mongoose.model("User", UserSchema);
