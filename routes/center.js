const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/center');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq } = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/:centerId', controllers.getCenterById);
router.get('/', controllers.getAllCenter);
router.post(
  '/',
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      name: stringReq,
      address: stringReq,
      phone: numberReq,
      operatingHours: stringReq,
      status: stringReq,
      provinceId: numberReq,
    })
  ),
  controllers.addCenter
);

router.put(
  '/:centerId',
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      name: stringReq,
      address: stringReq,
      phone: numberReq,
      operatingHours: stringReq,
      status: stringReq,
      provinceId: numberReq,
    })
  ),
  controllers.updateCenter
);

router.delete(
  '/:centerId',
  verifyToken,
  isAdmin,

  controllers.deleteCenter
);
module.exports = router;
