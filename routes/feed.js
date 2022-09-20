const express = require("express");
const router = express.Router();
/* const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts"); */
const feedController = require('../controllers/feed');
const { ensureAuth, ensureGuest } = require("../middleware/auth");

/* router.get("/", ensureAuth, feedController.getFeed); */

/* router.get("/feed/players", ensureAuth, feedController.getPlayers);
router.get("/feed/teams", ensureAuth, feedController.getTeams);
router.get("/feed/leagues", ensureAuth, feedController.getLeagues);
 */

router.delete("/deletePost/:id", feedController.deletePost);

module.exports = router;