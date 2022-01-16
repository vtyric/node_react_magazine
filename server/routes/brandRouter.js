const brandController = require('../controllers/BrandController');
const authMiddleware = require("../middleware/authMiddleware");

const Router = require('express');
const router = new Router();

router.post('/create', authMiddleware('ADMIN'), brandController.create);
router.get('/get', brandController.getAll);
router.delete('/delete:id', authMiddleware('ADMIN'), brandController.delete);

module.exports = router;