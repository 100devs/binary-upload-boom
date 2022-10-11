const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const medsController = require("../controllers/meds");
const doctorsController = require("../controllers/doctors");
const contactsController = require("../controllers/contacts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/dashboard", ensureAuth, medsController.getDashboard);
router.get("/meds", ensureAuth, medsController.getMed);
router.get("/cabinet", ensureAuth, medsController.getCabinet);
router.get("/contact", ensureAuth, contactsController.getContact);
router.get("/doctors", ensureAuth, doctorsController.getDoctor);
router.get("/directory", ensureAuth, contactsController.getDirectory);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);



module.exports = router;
