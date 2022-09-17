const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");


// passport method to validate login
exports.getLogin = (req, res) => {
  if (req.user) {
    // redirect user to the profile route if they are authenticated
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  // validation to check for valid email and password
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });
  // flash the error messages for incorrect email and password
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
  // proceed to the next step for authentication
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    // otherwise redirect the user back to the /login route
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    // proceed to the errors if login was not successful
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // flash message if the signup/login is successful 
      // redirect the user to the profile route
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

// logout function
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

// sign up check
exports.getSignup = (req, res) => {
  // if the user already has an account redirect them back to the /profile route
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

// sign up logic
exports.postSignup = (req, res, next) => {
  // validators for email and password data
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  // flash sign up errors 
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    // redirect user back to the /signup route
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // schema model for the user document to save into the database
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    // return the next steps if errors relating to the user sign up come up
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      // if the user already exists, flash an error
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      // save the user data into the database
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          // redirect the user back to the /profile route
          res.redirect("/profile");
        });
      });
    }
  );
};
