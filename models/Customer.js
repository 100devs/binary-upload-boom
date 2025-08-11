const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.

CustomerSchema.pre("save", function save(next) {
  const customer = this;
  if (!customer.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(customer.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      customer.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

CustomerSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("Customer", CustomerSchema);
