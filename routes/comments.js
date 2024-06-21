const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Comments Routes - simplified for now

router.post('/add/:id', commentsController.createComment);

router.delete('/delete/:id', commentsController.deleteComment);

module.exports = router;
