const express = require('express'),
    router = express.Router();

RecipeController = require('../controllers/recipes');

router.get('/', RecipeController.index);
router.get('/:id', RecipeController.getOne);
router.post('/', RecipeController.create);
router.put('/:id', RecipeController.Update);
router.delete('/:id', RecipeController.delete);

module.exports = router;