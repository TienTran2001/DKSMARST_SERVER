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

router.get('/shifts/:centerId', verifyToken, controllers.getAllShift);
router.get('/shift/:shiftId', verifyToken, controllers.getShiftById);
router.get(
  '/shift-detail/:shiftDetailId',
  verifyToken,
  controllers.getShiftDetailById
);
router.post(
  '/shifts',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      registrationDate: stringReq,
    })
  ),
  controllers.addShift
);
router.post(
  '/shift-details/:shiftId',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      startTime: stringReq,
      endTime: stringReq,
      maxQuantity: numberReq,
      status: numberReq,
    })
  ),
  controllers.addShiftDetail
);
router.put(
  '/shifts/:shiftId',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      registrationDate: stringReq,
    })
  ),
  controllers.updateShift
);
router.put(
  '/shift-details/:shiftDetailId',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      startTime: stringReq,
      endTime: stringReq,
      maxQuantity: numberReq,
      status: numberReq,
    })
  ),
  controllers.updateShiftDetail
);

router.delete(
  '/shifts/:shiftId',
  verifyToken,
  isCenter,
  controllers.deleteShift
);
router.delete(
  '/shift-details/:shiftDetailId',
  verifyToken,
  isCenter,
  controllers.deleteShiftDetail
);

module.exports = router;
