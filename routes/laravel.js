const router = require('express').Router();
const controllers = require('../controllers/lavavel');

router.get('/users', controllers.getAllUser);

module.exports = router;
