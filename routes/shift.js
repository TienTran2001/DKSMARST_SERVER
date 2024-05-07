const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/shift');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const {
  verifyToken,
  isAdmin,
  isCenter,
} = require('../middlewares/verifyToken');

router.get('/shifts', verifyToken, controllers.getAllShift);
router.get('/shift/:shiftId', verifyToken, controllers.getShiftById);

router.post(
  '/shifts',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      startTime: stringReq,
      endTime: stringReq,
    })
  ),
  controllers.addShift
);

router.put(
  '/shifts/:shiftId',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      startTime: stringReq,
      endTime: stringReq,
    })
  ),
  controllers.updateShift
);

router.delete(
  '/shifts/:shiftId',
  verifyToken,
  isCenter,
  controllers.deleteShift
);

module.exports = router;
