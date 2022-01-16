const typeController = require('../controllers/TypeController');

const Router = require('express');
const router = new Router();

router.post('/create', typeController.create);
router.get('/get', typeController.getAll);
router.delete('/delete:id', typeController.delete);

module.exports = router;