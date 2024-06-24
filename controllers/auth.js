const passport = require("passport"); //Allows for passport methods
const validator = require("validator"); //Allows for validator methods
const User = require("../models/User"); //Variable for users model

exports.getLogin = (req, res) => { //Get request for login
  if (req.user) { //Check if user is logged in
    return res.redirect("/profile"); //Redirects to profile
  }
  res.render("login", { //redirects to login page
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => { //Post request for new user
  const validationErrors = []; //Creates empty array for validationErrors variable
  if (!validator.isEmail(req.body.email)) //Uses validator to check if email body is blank
    validationErrors.push({ msg: "Please enter a valid email address." }); //Sends msg to validationErrors variable
  if (validator.isEmpty(req.body.password)) //Uses validator to check if password body is blank
    validationErrors.push({ msg: "Password cannot be blank." }); //Sends msg to validationErrors variable

  if (validationErrors.length) { //Checks for validation errors
    req.flash("errors", validationErrors); //Sends valdiation errors to user 
    return res.redirect("/login"); //Redirects to /login
  }
  req.body.email = validator.normalizeEmail(req.body.email, { //Creates req.body.email and assigns it a normailzedEmail using validator
    gmail_remove_dots: false, //Method that removes dots from email set to false
  });

  passport.authenticate("local", (err, user, info) => { //passport method to authenticate user
    if (err) { //errors
      return next(err);
    }
    if (!user) {
      req.flash("errors", info); //uses flash to display errors
      return res.redirect("/login"); //redirect to /login
    }
    req.logIn(user, (err) => { //Gets user
      if (err) { //errors
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." }); //Displays flash for login success
      res.redirect(req.session.returnTo || "/profile"); //redirect to /profile
    });
  })(req, res, next);
};

exports.logout = (req, res) => { //logout protocol
  req.logout(() => { //Logsout user
    console.log('User has logged out.') //Console.log
  })
  req.session.destroy((err) => { //Deletes sesssion
    if (err) //errors
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null; //sets user to null
    res.redirect("/"); //redirects to /
  });
};

exports.getSignup = (req, res) => { //Signup protocol
  if (req.user) { //checks if user is logged in
    return res.redirect("/profile"); //redirects to /profile
  }
  res.render("signup", { //if not logged in, renders signup page
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => { //Signup protocol
  const validationErrors = []; //creates empty variable for errors
  if (!validator.isEmail(req.body.email)) //Check if email is valid using validator
    validationErrors.push({ msg: "Please enter a valid email address." }); //Sends msg to valdationErrors variable
  if (!validator.isLength(req.body.password, { min: 8 })) //Checks password length min of 8
    validationErrors.push({ msg: "Password must be at least 8 characters long", //Sends msg to valdationErrors variable
    });
  if (req.body.password !== req.body.confirmPassword) //Check if both passwords match
    validationErrors.push({ msg: "Passwords do not match" }); //Sends msg to valdationErrors variable

  if (validationErrors.length) { //Checks how many errors in valdation errors
    req.flash("errors", validationErrors); //Sends errors using flash
    return res.redirect("../signup"); //redirects to /signup
  }
  req.body.email = validator.normalizeEmail(req.body.email, { //validates email
    gmail_remove_dots: false,
  });

  const user = new User({ //creates new user
    userName: req.body.userName, //grabs username 
    email: req.body.email, //grabs email
    password: req.body.password, //grambs password
  });

  User.findOne( //finds one user to check if user already exsist
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] }, //Checks for matching email or username
    (err, existingUser) => {
      if (err) { //errors
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.", //Displays messesage if user already exsist
        });
        return res.redirect("../signup"); //redirects to /signup
      }
      user.save((err) => { //errors
        if (err) {
          return next(err); //errors
        }
        req.logIn(user, (err) => { //user is logged in
          if (err) { //errors
            return next(err);
          }
          res.redirect("/profile");//redirects to /profile
        });
      });
    }
  );
};
