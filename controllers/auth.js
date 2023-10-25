const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

// Auth Controller

// Render login page.
exports.getLogin = (req, res) => {
  // If user is already logged, redirect to profile.
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

// Authenticate user.
exports.postLogin = (req, res, next) => {
  // Check for form input errors with validator package.
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });
  // If any validation errors occured, return them with flash and redirect to login page.
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  // Normalizes email address from the request body.
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // Uses passport package to authenticate user with "local" solution.
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

// Destroys user object from req to finish authenticated session, redirects to homepage.
exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

// Render signup page.
exports.getSignup = (req, res) => {
  // If user is already logged, redirect to profile.
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

// Create new user.
exports.postSignup = (req, res, next) => {
  // Check for form input errors with validator package.
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  ç; // If any validation errors occured, return them with flash and redirect to signup page.
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  // Normalizes email address from the request body.
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // Creates new user using the Mongoose schema.
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  // Searches MongoDB for an existing user with the same email OR username the user is trying to create. If none is found, a new user is created.
  User.findOne(
    // Find user with the req email OR username.
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      // If user already exists, stop operation.
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      // If no user exists, create new one.
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // Authenticate session with new user.
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          // Redirect to user profile.
          res.redirect("/profile");
        });
      });
    }
  );
};
