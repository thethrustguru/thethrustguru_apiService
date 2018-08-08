const express = require('express'),
    router = express.Router();
Logger = require('../models/logger');
const passport = require('passport');


router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
    Logger.find({}).then(logs => res.json({ success: true, logs }))
        .catch(err => res.json({ success: false, message: "An error occured. Please try again latter" }));;
});
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    Logger.findById(req.params.id)
        .then(log => res.json({ success: true, log }))
        .catch(err => res.json({ success: false, message: "Cannot find that log" }));
});


module.exports = router;