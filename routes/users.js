const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.put("/followUser/:id", usersController.followUser);
router.put("/unfollowUser/:id", usersController.unfollowUser);

module.exports = router;
