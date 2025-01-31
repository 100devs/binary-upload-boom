const passport = require("passport");
//PACKAGE TO HANDLE AUTHENTICATION. IT HAS STRATEGIES ( DIFFERENT LOGIN METHODS)TO DO DIFFERENT STUFF. IF WE WANTED TO, WE CAN USE LOCAL STRATEGIES OR GOOGLEAUTH ETC. 
const validator = require("validator");
//PACKAGE TO VALIDATE THE USER
const User = require("../models/User");
//GET THE USER FROM MODELS FOLDER AND USER FILE (THE BCRYPT FILE)

exports.getLogin = (req, res) => {
  //IF THE USER TAKEN FROM THE REQUEST INFORMATION, RETURN A RESPOND TO REDIRECT THE USER TO THE /TODO PATH AND RENDER LOGIN
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  //Checks whether the email provided in the request body is a valid email using validator.isEmail(). If it’s invalid, it pushes an error message into the validationErrors array.
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  // checks if the password is empty using validator.isEmpty(). If the password field is blank, it adds an error message to the validationErrors array.
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });
   // If any validation errors are found (i.e., the validationErrors array has items), it flashes the errors to the session using req.flash('errors', validationErrors) and redirects the user back to the login page using res.redirect('/login'). This allows the user to see the error messages and correct their input.

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  // If the input passes the validation, the email is normalized using validator.normalizeEmail().
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

   //AUTH THE USER USING PASSPORT LOCAL STRAEGY, IF ERROR PROCEED TO ERROR, IF NOT USER, USING FLASH, SAY USER AND PROVIDE INFO
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    //IF THE REQUEST INFO PASSED TO LOGIN FUNCTION IS SUCCESSFUL, USEFLASH TO NOTIFY A MESSAGE
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      //REDIRECT THE USER TO THE TODO PATH
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

//CHECK THE INFO PASSED IN THE REQ BODY AND USE THE LOGOUT FUNC TO CONSOLE.LOG A MESSAGE
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
   //IN THE REQ BODE, DESTROY THE SESSION AND REDIRECT THE USER TO MAIN PAGE TO LOG BACK IN
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

//IN THE REQ BODY OF THE USER RES WITH REDIRECT TO TODOS
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  //RENDER SIGNUP AND TITLE
  res.render("signup", {
    title: "Create Account",
  });
};

//Checks whether the email provided in the request body is a valid email using validator.isEmail(). If it’s invalid, it pushes an error message into the validationErrors array.
exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  //CHECK IF THE LEGTH OF THE PASSWORK FROM THE REQ BODY IS MIN 8 CHARACTER LONG, IF ITS NOT RETURN A MESSAGE
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
    //IF THE PASSWORDS DONT MATCH, RETURN A MESSAGE
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
   // IF THE LENGTH ISNT VALIDATED, USE FLASH TO SHOW ERRORS AND REDIRECT TO SIGNUP ROUTE.

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

   //CREATE A NEW USER USING THE REQ BODY SUBMITTED FROM THE FORM OF THE USER AND SAVE IT AS A VAR OF USER.
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  // FIND THE USER, USING THE EMAIL AND USERNAME FROM THE REQU BODY AND IF THE USER ALREADY EXIST, USE FLASH TO INSERT AN ERROR
  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
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
