const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

// Helper function to validate inputs
const validateEmailAndPassword = (email, password) => {
  const errors = [];
  if (!validator.isEmail(email)) {
    errors.push({ msg: "Please enter a valid email address." });
  }
  if (validator.isEmpty(password)) {
    errors.push({ msg: "Password cannot be blank." });
  }
  return errors;
};

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", { title: "Login" });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const validationErrors = validateEmailAndPassword(email, password);

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }

  req.body.email = validator.normalizeEmail(email, { gmail_remove_dots: false });

  try {
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
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  req.logout(() => console.log("User has logged out."));

  try {
    req.session.destroy((err) => {
      if (err) {
        console.log("Error : Failed to destroy the session during logout.", err);
      }
      req.user = null;
      res.redirect("/");
    });
  } catch (err) {
    console.log("Error during logout:", err);
    res.redirect("/");
  }
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", { title: "Create Account" });
};

exports.postSignup = async (req, res, next) => {
  const { email, password, confirmPassword, userName } = req.body;

  const validationErrors = [];
  if (!validator.isEmail(email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  }
  if (!validator.isLength(password, { min: 8 })) {
    validationErrors.push({ msg: "Password must be at least 8 characters long" });
  }
  if (password !== confirmPassword) {
    validationErrors.push({ msg: "Passwords do not match" });
  }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }

  req.body.email = validator.normalizeEmail(email, { gmail_remove_dots: false });

  const user = new User({
    userName,
    email,
    password,
  });

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("../signup");
    }

    // Save new user to the database
    await user.save();

    // Log the user in after saving
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/profile");
    });
  } catch (err) {
    next(err);
  }
};
