const express = require('express'),
    router = express.Router(),
    ItemController = require('../controllers/items');

router.get('/', ItemController.index);
router.get('/:id', ItemController.getOne);
router.post('/', ItemController.create);
router.put('/:id', ItemController.Update);
router.delete('/:id', ItemController.delete);

module.exports = router;