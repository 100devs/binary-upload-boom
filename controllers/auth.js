const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    // if user is auth'd, send them to their profile
    return res.redirect("/profile");
  }
  // render login page
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  // validate email being valid
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  // validate password (isn't empty)
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  // send errors if present
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    // redirect user to login page
    return res.redirect("/login");
  }
  // use validator package to normalize email
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      // redirect to login screen
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // if auth'd, send success msg and send to their profile page
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    // log to console user has logged out
    console.log('User has logged out.')
  })
  // attempt to destroy auth'd session
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    // nullify req.user
    req.user = null;
    // redirect user to index page (root route)
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    // if user is already auth'd, send to their profile
    return res.redirect("/profile");
  }
  // else, render signup page
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    // make sure email is valid
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    // passwords are valid if they have a length of at least 8 chars
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    // confirmPasswords must match passwords
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    // send array of validationErrors
    req.flash("errors", validationErrors);
    // redirect user back to signup
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // create new user, containing values from user
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        // if the username or email is already taken, show err to user
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        // return to signup
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          // redirect to profile page
          res.redirect("/profile");
        });
      });
    }
  );
};
