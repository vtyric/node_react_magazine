const typeController = require('../controllers/TypeController');
const authMiddleware = require('../middleware/authMiddleware');

const Router = require('express');
const router = new Router();

router.post('/create', authMiddleware('ADMIN'), typeController.create);
router.get('/get', typeController.getAll);
router.delete('/delete:id', authMiddleware('ADMIN'), typeController.delete);

module.exports = router;