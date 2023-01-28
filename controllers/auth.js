const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
    // get request and if already logged in it takes the user to the profile page.
  }
  res.render("login", {
    title: "Login",
    // If the user is not already logged in it will render the login page.
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
    // Conditional syntax which if it is an invalid entry or invalid email address, it will flag the msg above.
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });
    //Throws a message if the entry is invalid because it is blank.

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
    // Passes the errors on to the view while redirecting to the login page.
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
  // Formatting?

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
//Passport to authenticate and login the user in. Shows success message if login has been successful and returns to the last session or profile.

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  //Request to log off has logged out the user and the message is console logged.
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};
//Shows an error if it is unable to log out / destroy the session.

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  // If request.user is truthy it redirects to the profile. If falsy it will render the sign up page and a title saying create account.
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
    // If email is invalid push the message above.
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
    // If password length is less than 8 characters (invalid), push the message above.
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
// if passwords do not match push the message above.
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  // If there are validation errors it will show them and redirect / refresh to the signup page.
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  // Schema that passes a new object containing userName, email and password into the model and to the database.

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      // Checks with the model and database whether the email address or username already exist. 
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      //If the username and email already exist, it will show the above message.
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // Saves the new user which is set above which new user and password.
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
        // Tries to login the new user and if there is no error it takes them to the new profile.
      });
    }
  );
};
