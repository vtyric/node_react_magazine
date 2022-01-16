const brandController = require('../controllers/BrandController');

const Router = require('express');
const router = new Router();

router.post('/create', brandController.create);
router.get('/get', brandController.getAll);
router.delete('/delete:id', brandController.delete);

module.exports = router;