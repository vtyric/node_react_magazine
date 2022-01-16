const deviceController = require('../controllers/DeviceController');

const Router = require('express');
const router = new Router();

router.post('/create', deviceController.create);
router.get('/get', deviceController.getAll);
router.get('/get:id', deviceController.getById);
router.delete('/delete:id', deviceController.delete);

module.exports = router;