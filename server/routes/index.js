const Router = require('express');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const deviceRouter = require('./deviceRouter');
const brandRouter = require('./brandRouter');

const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/brand', brandRouter);

module.exports = router;
