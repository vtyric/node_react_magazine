const typeController = require('../controllers/TypeController');

const Router = require('express');
const router = new Router();

router.post('/', typeController.create);
router.get('/', typeController.getAll);
router.delete('/:id', typeController.delete);

module.exports = router;