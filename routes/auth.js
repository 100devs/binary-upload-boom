const express = require("express");
const router = express.Router();
const passport = require('passport')

// Auth with google
// @route GET /auth/google
router.get("/google", passport.authenticate('google', { scope: ['profile'] }));


// desc GOOGLE  auth callback 
// @route GET /auth/google/callback

router.get('/google/callback',  passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/profile')
})

    module.exports = router
