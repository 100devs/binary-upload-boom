const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified('password')) {
      return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch {
    next(err)
  }
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return  bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model("User", UserSchema);
