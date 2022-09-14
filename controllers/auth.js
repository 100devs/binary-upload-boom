//imports passport
const passport = require("passport");
//imports validator
const validator = require("validator");
// imports User model
const User = require("../models/User");

// exports getLogin
exports.getLogin = (req, res) => {
  // if the user exists
  if (req.user) {
    //redirect to their profile
    return res.redirect(`/profile/${req.user.id}`);
  }
  //else renders the login page
  res.render("login", {
    title: "Login",
  });
};

//exports postLogin function
exports.postLogin = (req, res, next) => {
  //initialize empty array to push errors into
  const validationErrors = [];
  // if the email is invalid
  if (!validator.isEmail(req.body.email))
    //push error to array
    validationErrors.push({ msg: "Please enter a valid email address." });
  // if email input is empty
  if (validator.isEmpty(req.body.password))
    //push errors to array
    validationErrors.push({ msg: "Password cannot be blank." });
  //if there are any elements in errors array
  if (validationErrors.length) {
    // use flash to display the errors
    req.flash("errors", validationErrors);
    //redirect to login page
    return res.redirect("/login");
  }
  //remove dots in emails since theyre optional
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // use passport authentication log in
  passport.authenticate("local", (err, user, info) => {
    // if there's an err
    if (err) {
      return next(err);
    }
    // if theres no user
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    //login the user in
    req.logIn(user, (err) => {
      // if theres an error
      if (err) {
        return next(err);
      }
      // flash successful login
      req.flash("success", { msg: "Success! You are logged in." });
      //redirect to the page they tried to visit or their profile
      res.redirect(req.session.returnTo || `/profile/${req.user.id}`);
    });
  })(req, res, next);
};

//export logout
exports.logout = (req, res) => {
  //log the user out
  req.logout(() => {
    console.log('User has logged out.')
  })
  //destroys the session so they wont remain logged in
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    // redirects to index page
    res.redirect("/");
  });
};

//exports getSingup
exports.getSignup = (req, res) => {
  // if user exsists
  if (req.user) {
    // return to feed
    return res.redirect("/feed");
  }
  //renders the signup page otherwise
  res.render("signup", {
    title: "Create Account",
  });
};

//exports postSignup
exports.postSignup = (req, res, next) => {
  // initialize errors array
  const validationErrors = [];
  // if email is invalid
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  //if password is under 8 characters
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  // if password does not equal password confirmation
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  // if there are any errors
  if (validationErrors.length) {
    // use flash to display these errors
    req.flash("errors", validationErrors);
    return res.redirect("/signup");
  }
  //removes dots from emails to make them all same format
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  //creates a new object with the user model from form info
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  //searches user collection
  User.findOne(
    // a document with the email or username
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      // if the user exists
      if (existingUser) {
        // error message that user already exists
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("/signup");
      }
      // otherwise if user doesnt exist then save this user object to the database
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // log the user in
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          //redirects to dashboard
          res.redirect("/feed");
        });
      });
    }
  );
};
