const express = require('express');
const router = express.Router();
const postsController = require('../controllers/comments');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Comment Routes - simplified for now
router.get('/', ensureAuth, postsController.getComment);

router.post('/createComment', postsController.createComment);

module.exports = router;
