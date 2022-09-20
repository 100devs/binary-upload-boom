const bcrypt = require("bcrypt"); // Import bcrypt
const mongoose = require("mongoose"); // Import mongoose

const UserSchema = new mongoose.Schema({ // Create user schema
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {  // Save user
  const user = this; // Set user
  if (!user.isModified("password")) { // If password is not modified
    return next(); // Return
  }
  bcrypt.genSalt(10, (err, salt) => { // Generate salt
    if (err) { // If error
      return next(err); // Return error
    }
    bcrypt.hash(user.password, salt, (err, hash) => { // Hash password
      if (err) { // If error
        return next(err); // Return error
      }
      user.password = hash; // Set password
      next(); // Return
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword( // Compare password
  candidatePassword, // Candidate password
  cb // Callback function
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { // Compare password
    cb(err, isMatch); // Callback function
  });
};

module.exports = mongoose.model("User", UserSchema); // Export user model
