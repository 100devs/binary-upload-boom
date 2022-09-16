const express = require("express"); //Allows access to express methods
const router = express.Router(); // Allows for router method
const authController = require("../controllers/auth"); // Variable to controllers/auth
const homeController = require("../controllers/home"); // Variable to controllers/home
const postsController = require("../controllers/posts"); // Variable to controllers/posts
const { ensureAuth, ensureGuest } = require("../middleware/auth"); //Allows for ensureAuth and ensureGuest from middleware/auth

//Main Routes - simplified for now
router.get("/", homeController.getIndex); // Main route that goes to controllers/home and runs getIndex() -> Renders index.ejs
router.get("/profile", ensureAuth, postsController.getProfile); //Route to controllers/feed and runs getProfile() -> Renders profile.ejs 
router.get("/feed", ensureAuth, postsController.getFeed); //Route to controllers/posts and runs getFeed() -> Renders feed.ejs
router.get("/login", authController.getLogin); //Route to controllers/auth and runs getLogin() -> Renders login
router.post("/login", authController.postLogin); //Route to controllers/auth and runs postLogin() -> Login protocol and redirects to /profile 
router.get("/logout", authController.logout); //Route to controllers/auth and runs logout() -> Logout protocol and redirects to /
router.get("/signup", authController.getSignup); //Route to controllers/auth and runs getSignup() -> Renders signup 
router.post("/signup", authController.postSignup); //Route to controllers/auth and runs postSignup() -> Runs Signup protocol with flash. Errors -> redirects to /signup if not, creates a new user object then redirects to /profile

module.exports = router; //Maps router

