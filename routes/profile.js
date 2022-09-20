const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const { ensureAuth, ensureGuest } = require("../middleware/auth");



router.get("/:id", ensureAuth, userController.getProfile); //get profile page
router.put('/updateUser/:id', ensureAuth, userController.updateUser); //update user's profile
/* router.delete('/deleteSomething/:id', ensureAuth, userController.deleteSomething); */ //delete something on user's profile


module.exports = router;