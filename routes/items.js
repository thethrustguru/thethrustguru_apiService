const express = require('express'),
    router = express.Router(),
    ItemController = require('../controllers/items');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), ItemController.index);
router.get('/:id', passport.authenticate('jwt', { session: false }), ItemController.getOne);
router.post('/', passport.authenticate('jwt', { session: false }), ItemController.create);
router.put('/:id', passport.authenticate('jwt', { session: false }), ItemController.Update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), ItemController.delete);

module.exports = router;