const deviceController = require('../controllers/DeviceController');

const Router = require('express');
const router = new Router();

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getById);
router.delete('/:id', deviceController.delete);

module.exports = router;