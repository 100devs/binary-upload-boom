const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user")
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const apicache = require('apicache')
const cache = apicache.middleware

//Main Routes - simplified for now
router.get("/", cache('10 minutes'), homeController.getIndex);
router.get("/profile", ensureAuth, userController.getPrivateProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
