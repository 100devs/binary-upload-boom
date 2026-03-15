const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

//export for getLogin
exports.getLogin = (req, res) => {
  //checks if there is a user and routes to the profile page of user
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

//export for updating/creating login 
exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  //checking email 
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  //checking password
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });
  //checking for errors
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    //checking the errors
    if (err) {
      return next(err);
    }
    //checking for user
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

//export for logging out
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  //ends the session
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    //sends back to home page once logged out
    res.redirect("/");
  });
};

//export for Sign Up
exports.getSignup = (req, res) => {
  //if there is a user got to the profile page
  if (req.user) {
    return res.redirect("/profile");
  }
  //if there is no user route them to sign up
  res.render("signup", {
    title: "Create Account",
  });
};

//export to update a sign up request
exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  //checking email adress
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  //checking password
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  //checking that passwords match
    if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  //hcecking if there are any validation errors  
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  //create new user with userName, email, and password
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  //finding if there is a user that matches the email and userName
  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      //notifies there is already a user name
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
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
          res.redirect("/profile");
        });
      });
    }
  );
};
