const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/auth');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq } = require('../middlewares/joiSchema');

router.post(
  '/register',
  validateDTO(
    Joi.object({
      phone: numberReq,
      email: stringReq,
      fullname: stringReq,
      password: stringReq,
    })
  ),
  controllers.register
);

router.post(
  '/login',
  validateDTO(
    Joi.object({
      phone: numberReq,
      password: stringReq,
    })
  ),
  controllers.login
);

module.exports = router;
