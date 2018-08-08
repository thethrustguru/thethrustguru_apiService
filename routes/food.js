const express = require('express'),
    router = express.Router(),
    FoodController = require('../controllers/food');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), FoodController.index);
router.get('/:id', passport.authenticate('jwt', { session: false }), FoodController.getOne);
router.post('/', passport.authenticate('jwt', { session: false }), FoodController.create);
router.put('/:id', passport.authenticate('jwt', { session: false }), FoodController.Update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), FoodController.delete);

module.exports = router;