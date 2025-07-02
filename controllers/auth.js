//modules required for auth controller
const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

//login route, GET request
exports.getLogin = (req, res) => {
  //if the user is already logged in (check via passport)
  if (req.user) {
    //redirect the user to the profile route
    return res.redirect("/profile");
  }
  //if the user is not already logged in, render the login ejs
  res.render("login", {
    title: "Login",
  });
};

//login route, POST request
exports.postLogin = (req, res, next) => {
  //check for errors in the login
  const validationErrors = [];
  //is the email valid?
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  //is the password populated?
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });
  //are there any errors at all?
  if (validationErrors.length) {
    //flash the errors
    req.flash("errors", validationErrors);
    //redirect to try again
    return res.redirect("/login");
  }

  //format email given by user
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  //user local passport authentication strategy
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    //if there is no user available
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    //use passport to login the user
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      //if successful, flash that messsage
      req.flash("success", { msg: "Success! You are logged in." });
      //redirect user to profile route
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

//logout route, GET request
exports.logout = (req, res) => {
  //logout the user
  req.logout(() => {
    console.log('User has logged out.')
  })
  //destroy the user session
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    //there is no user in the current session
    req.user = null;
    //redirect user to base route
    res.redirect("/");
  });
};

//signup route, GET request
exports.getSignup = (req, res) => {
  //if the user is already logged in (check via passport)
  if (req.user) {
    //redirect the user to the profile route
    return res.redirect("/profile");
  }
  //if the user is not logged in yet, render the signup page
  res.render("signup", {
    title: "Create Account",
  });
};

//signup route, POST request
exports.postSignup = (req, res, next) => {
  //check if there are errors signup up
  const validationErrors = [];
  //is the email valid?
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  //is the password the correct length?
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  //do the two passwords given match exactly?
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  //are there any errors at all?
  if (validationErrors.length) {
    //flash the errors
    req.flash("errors", validationErrors);
    //redirect to try again
    return res.redirect("../signup");
  }

  //format email
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  //make new User instance of the model
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  //try to find an existing user
  User.findOne(
    //that shares the same email or user name as the POST requestor
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      //if there is an existing user
      if (existingUser) {
        //flash the error
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        //redirect to try again
        return res.redirect("../signup");
      }
      //if there is no existing user with that email or username, save the user into the database
      user.save((err) => {
        if (err) {
          return next(err);
        }
        //log the user in
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          //after successful login, redirect to profile route GET request
          res.redirect("/profile");
        });
      });
    }
  );
};
