const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");


// Get login page
exports.getLogin = (req, res) => {
  if (req.user) { // If user is signed in already, send them to profile
    return res.redirect("/profile");
  }
  res.render("login", { // Render login page
    title: "Login",
  });
};

// User authorization, checks log in form and proceeds accordingly
exports.postLogin = (req, res, next) => {
  const validationErrors = []; // Store errors here
  if (!validator.isEmail(req.body.email)) // If the email provided isnt a valid email, add to error array
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password)) // If the password field is empty, add to error array
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) { // If the array is longer than 0 (has errors), store and redirect back to login to display errors
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  }); // Standardize email

  // Passport authentication middleware, calls passport config function and returns result here
  passport.authenticate("local", (err, user, info) => {
    if (err) { // If theres an error, call the next function with the rror
      return next(err);
    }
    if (!user) { // If a user wasnt returned, store errors from passport and redirect to login to display
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => { // Log user in, create session
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next); // Need this for function to work
};

// Logs user out and destroys session
exports.logout = (req, res) => {
  req.logout(() => { // Passport logout function
    console.log('User has logged out.')
  })
  req.session.destroy((err) => { // Destroy session, set user to null, go to landing
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

// Get signup page
exports.getSignup = (req, res) => {
  if (req.user) { // If user is logged in, send them to profile page
    return res.redirect("/profile");
  }
  res.render("signup", { // Render signup page
    title: "Create Account",
  });
};

// Sign up request, validate info and store user in db
exports.postSignup = (req, res, next) => {
  const validationErrors = []; // Store errors here
  if (!validator.isEmail(req.body.email)) // Email invalid format error check
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 })) // Password too short error check
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword) // Password confirmation matching error check
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) { // If there are errors, flash and go back to signup
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, { // Format email
    gmail_remove_dots: false,
  });

  const user = new User({ // Create user object
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne( // Look for a user with email/username already registered
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) { // If the email or username is registered, flash error and refresh
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => { // Save user in db
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => { // Log user in
          if (err) {
            return next(err);
          }
          res.redirect("/profile"); // Go to profile
        });
      });
    }
  );
};
