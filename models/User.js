//import encryption and mongoose for schema
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//Schema for User
const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true }, //check db for unique
  email: { type: String, unique: true }, //check db for unique
  password: String,
});

// Password hash middleware.
//password hashing and encryption
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
//decrypt and validate
UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

//export user schema
module.exports = mongoose.model("User", UserSchema);
