const router = require('express').Router();
const controllers = require('./controllers');
const { authChecker } = require('@/middlewares');

router.use(authChecker);
router.get('/', controllers.getContents);

module.exports = router;
