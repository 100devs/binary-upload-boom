const express = require("express");
// Using express
const router = express.Router();
// Sets up the router
const authController = require("../controllers/auth");
// Sets up authentication
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
// For passprt.JS

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
// Get request via the home controller and get index method.
router.get("/profile", ensureAuth, postsController.getProfile);
//Get request, ensuring we are logged in, use post controller and the getProfile method.
router.get("/feed", ensureAuth, postsController.getFeed);
// Get request on the feed route via the post controller using the get feed method.
router.get("/login", authController.getLogin);
// Get request on the login route to the auth controller using the getLogin method.
router.post("/login", authController.postLogin);
// Post request using the login route to the auth controller using the postLogin method.
router.get("/logout", authController.logout);
// Get request using the log out route to the auth controller using the logout method.
router.get("/signup", authController.getSignup);
// Get request using the sign up route to the auth controller using the getSignup method.
router.post("/signup", authController.postSignup);
// Post request using the signup route to the auth controller using the postSignup method.

module.exports = router;
