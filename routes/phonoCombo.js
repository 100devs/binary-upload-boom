const express = require("express");
const router = express.Router();
const phonoComboController = require("../controllers/phonoCombo");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.post("/createComment/:id", phonoComboController.createComment);


module.exports = router;