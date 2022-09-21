const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const { ensureAuth, ensureGuest } = require("../middleware/auth");



router.get("/:id", ensureAuth, userController.getProfile); //get profile page

//update and delete leagues
router.put('/updateLeague/:id', ensureAuth, userController.updateLeague); //update user's profile
router.delete('/deleteLeague/:id', ensureAuth, userController.deleteLeague);

//update and delete teams
router.put('/updateTeam/:id', ensureAuth, userController.updateTeam); //update user's profile
router.delete('/deleteTeam/:id', ensureAuth, userController.deleteTeam);

/* router.delete('/deleteSomething/:id', ensureAuth, userController.deleteSomething); */ //delete something on user's profile


module.exports = router;