// importing passport for strategy, validator to validate input fields and User schema from Mongoose
const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

// login page only available if not logged in, otherwise redirect to profile
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};
// submit login
exports.postLogin = (req, res, next) => {
  // validate fields (email/psw) and return to /login if not conform
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
  // authenticate using local strategy
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    // user doesn't exist, return to /login and flash error messages
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    // log in user
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // if successful, log-in and redirect to profile
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};
// submit logout
exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  // destroy session to ensure it cannot be used by a malicious actor
  req.session.destroy((err) => {
    if (err) console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};
// signup page request, if already logged in redirect to profile
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};
// send sign up request
exports.postSignup = (req, res, next) => {
  // validate fields /email, password length, password match)
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
  // create the user according to fields
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  // verify if it exists in the DB, if it does inform that it already exists and return to sign up
  User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("../signup");
    }
    // if it doesn't exist, save the created user to the DB and redirect to profile.
    user.save((err) => {
      if (err) {
        return next(err);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/profile");
      });
    });
  });
};
