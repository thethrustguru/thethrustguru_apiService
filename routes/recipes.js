const express = require('express'),
    router = express.Router();
RecipeController = require('../controllers/recipes');
const passport = require('passport');


router.get('/', passport.authenticate('jwt', { session: false }), RecipeController.index);
router.get('/:id', passport.authenticate('jwt', { session: false }), RecipeController.getOne);
router.post('/', passport.authenticate('jwt', { session: false }), RecipeController.create);
router.put('/:id', passport.authenticate('jwt', { session: false }), RecipeController.Update);
router.delete('/:id', passport.authenticate('jwt', { session: false }), RecipeController.delete);

module.exports = router;