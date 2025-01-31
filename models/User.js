const bcrypt = require("bcrypt");
//// USE THE BCRYPT MODULE TO ENCRYPT YOUR PASWWORD
const mongoose = require("mongoose");
//USE MONGOOSE TO INTERACT WITH MONGO DB AND ALLOW US TO USE SCHEMA

const UserSchema = new mongoose.Schema({
  //CREATE A SCHEMA USER WHERE USER,EMAIL AND PASSWORD IS A STRING AND UNQIUE
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.

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

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
//EXPORT THE USER AND USERSCHEMA 
