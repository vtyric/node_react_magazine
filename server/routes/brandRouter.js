const brandController = require('../controllers/BrandController');

const Router = require('express');
const router = new Router();

router.post('/', brandController.create);
router.get('/', brandController.getAll);
router.delete('/:id', brandController.delete);

module.exports = router;