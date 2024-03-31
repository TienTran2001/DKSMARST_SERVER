const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/appointment');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const {
  verifyToken,
  isAdmin,
  isCenter,
} = require('../middlewares/verifyToken');

router.get('', verifyToken, controllers.getAllAppointmentOfUser);
router.get(
  '/center',
  verifyToken,
  isCenter,
  controllers.getAllAppointmentOfCenter
);
router.get('/:appointmentId', verifyToken, controllers.getAppointment);
router.post(
  '',
  verifyToken,
  validateDTO(
    Joi.object({
      appointmentDate: stringReq,
      note: string,
      shiftDetailId: numberReq,
      vehicleId: numberReq,
      centerId: numberReq,
    })
  ),
  controllers.addAppointment
);

router.put('/:appointmentId', verifyToken, isCenter, controllers.updateStatus);
router.put(
  '/cancel/:appointmentId',
  verifyToken,
  controllers.cancelAppointment
);

// router.delete(
//   '/shifts/:shiftId',
//   verifyToken,
//   isCenter,
//   controllers.deleteShift
// );
// router.delete(
//   '/shift-details/:shiftDetailId',
//   verifyToken,
//   isCenter,
//   controllers.deleteShiftDetail
// );

module.exports = router;
