const express = require("express");
const router = express.Router();
const langCompController = require("../controllers/langComp");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
//fix this later 10/31/2022
/*
router.post("/createComment/:id", langCompController.createComment);
*/

module.exports = router;