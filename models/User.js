const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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


/*
The code provided defines a Mongoose schema for a "User" model in a MongoDB database. This schema defines the structure and properties of the "User" documents that will be stored in your database, including password hashing and a method for password comparison. Let's break down what this code does:

    const bcrypt = require("bcrypt");:
        This line imports the bcrypt library, which is commonly used for password hashing and verification in Node.js applications.

    const mongoose = require("mongoose");:
        This line imports the Mongoose library, which is used for creating schemas and models to interact with MongoDB.

    const UserSchema = new mongoose.Schema({ ... });:
        This code creates a new Mongoose schema named UserSchema. The schema defines the structure of "User" documents.

    Schema Fields:

        The schema specifies several fields for a "User" document:
            userName: A field of type String that is unique. It represents the user's username.
            email: A field of type String that is unique. It represents the user's email address.
            password: A field of type String that represents the user's password. Note that the actual password string is stored in the database, but it will be hashed for security (see the next section).

    Password Hash Middleware:

        The schema defines a pre-save hook using UserSchema.pre("save", ...) to hash the user's password before saving it to the database. This ensures that passwords are securely stored.

        The bcrypt library is used to generate a salt and hash the user's password. The password is hashed using a salt and the bcrypt hashing algorithm.

        The isModified function is used to check if the password field has been modified before hashing. This allows you to avoid rehashing the password unnecessarily.

    comparePassword Method:

        The schema defines a method called comparePassword using UserSchema.methods.comparePassword to compare a candidate password with the stored hashed password. This method is used for verifying user login attempts.

        It uses the bcrypt.compare function to compare the candidate password with the stored hashed password and calls a callback function (cb) with the result (a boolean indicating whether the passwords match).

    module.exports = mongoose.model("User", UserSchema);:
        This code exports the Mongoose model for the "User" schema. This allows you to use this model in other parts of your application, such as route handlers and controllers, to perform operations related to user authentication and management.

With this schema and model in place, you can create, read, update, and delete user documents in your MongoDB database. Passwords are securely hashed before being stored, and you can use the comparePassword method to verify passwords during the authentication process. This is a common approach to handling user authentication and password security in web applications.
*/