const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const indexController = require('../controllers/index');
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", indexController.getIndex);
router.get("/home", ensureAuth, postsController.getHome); //changed getProfile to getHome
router.get("/profile", ensureAuth, postsController.getProfile); //changed getProfile to getHome
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

/* router.delete("/deletePost/:id", postsController.deletePost); */
//added
/* router.delete("home/deletePost/:id", postsController.deletePost); */

module.exports = router;
