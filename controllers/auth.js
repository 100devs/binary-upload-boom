//  uses passport for authentication
const passport = require("passport");
const validator = require("validator");
// uses our user model
const User = require("../models/User");

// if the user is already logged in take them to the profile page, otherwise render the login page
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
// error catcher incase email/password is an invalid input
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });
// passes the errors on to the view
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
// uses passport to log the user in
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
      // shows success message if log in has been successful and then redirect user to their profile or last session
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    // console logs upon successful logout
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      // shows an error if unable to destroy session
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    // if user already exists, take them to their profile
    return res.redirect("/profile");
  }
  // otherwise render the signup page
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  // ensure email and password are valid, otherwise push error
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
    // ensure passwords match, otherwise push error
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
// if there are any errors, use flash to show them to the user and redirect to signup page
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // passing a new object into the model
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  // tell model to check DB for existing user
  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        // if user already exists, create error
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      // save new user
      user.save((err) => {
        if (err) {
          return next(err);
        }
        //log in user with new credentials
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          //if log in is successful, take user to their new profile
          res.redirect("/profile");
        });
      });
    }
  );
};
