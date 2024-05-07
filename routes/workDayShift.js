const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/workDayShift');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const { verifyToken, isCenter } = require('../middlewares/verifyToken');

router.get(
  '/:workDayShiftId',
  verifyToken,
  isCenter,
  controllers.getWorkDayShiftById
);

router.put(
  '/:workDayShiftId',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      maxQuantity: numberReq,
      status: numberReq,
    })
  ),
  controllers.updateWorkDayShift
);

module.exports = router;
