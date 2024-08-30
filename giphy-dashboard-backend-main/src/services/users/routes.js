const router = require('express').Router();
const controllers = require('./controllers');
const { authChecker } = require('@/middlewares');

router.use(authChecker);
router.get('/me', controllers.getUserMe);

module.exports = router;
