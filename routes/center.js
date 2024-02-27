const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/center');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq } = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/', controllers.getAllCenter);

module.exports = router;
