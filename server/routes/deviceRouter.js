const deviceController = require('../controllers/DeviceController');

const Router = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post('/create', authMiddleware('ADMIN'), deviceController.create);
router.get('/get', deviceController.getAll);
router.get('/get:id', deviceController.getById);
router.delete('/delete:id', authMiddleware('ADMIN'), deviceController.delete);

module.exports = router;