const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');
const { ensureAuth } = require('../middleware/auth');

router.get('/:id', ensureAuth, contactsController.getContact);

router.post('/createContact', contactsController.createContact);

router.delete('/deleteContact/:id', contactsController.deleteContact);

module.exports = router