const passport = require("passport"); // Passport.js for authentication
const validator = require("validator"); // To validate user input like email, password
const User = require("../models/User"); // Your User model for database interaction

// Render login page if user is not logged in, else redirect to profile
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

// Handle login POST request with validation and passport authentication
exports.postLogin = (req, res, next) => {
  const validationErrors = [];

  // Validate email format
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  // Ensure password is not blank
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  // If validation errors exist, flash errors and redirect to login page
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }

  // Normalize the email to a standard format
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // Authenticate using Passport local strategy
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // If authentication fails, flash error messages and redirect
      req.flash("errors", info);
      return res.redirect("/login");
    }
    // Log in the user if authentication is successful
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Flash success message and redirect to originally requested page or profile
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

// Log out the user, destroy session and redirect to homepage
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

// Render signup page if user is not logged in, else redirect to profile
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

// Handle signup POST request with validation, user creation, and login
exports.postSignup = (req, res, next) => {
  const validationErrors = [];

  // Validate email format
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });

  // Validate password length (min 8 characters)
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });

  // Confirm password and confirmPassword match
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  // If validation errors exist, flash errors and redirect to signup page
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }

  // Normalize email
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // Create a new user instance
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  // Check if user with same email or username already exists
  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        // If user exists, flash error and redirect to signup page
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      // Save the new user to database
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // Automatically log in the newly registered user
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};
