const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Comment Routes - simplified for now
router.get('/', ensureAuth, commentsController.getComment);

// router.post('/createComment', commentsController.createComment);

module.exports = router;
