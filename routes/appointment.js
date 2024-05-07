const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/appointment');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const {
  verifyToken,
  isAdmin,
  isCenter,
  isAllOfCenter,
  isStaffOfCenter,
} = require('../middlewares/verifyToken');

router.post('/send-mail', verifyToken, controllers.send);
router.get('', verifyToken, controllers.getAllAppointmentOfUser);
router.get(
  '/center',
  verifyToken,
  isAllOfCenter,
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
      workDayShiftId: numberReq,
      vehicleId: numberReq,
      centerId: numberReq,
    })
  ),
  controllers.addAppointment
);

router.put(
  '/:appointmentId',
  verifyToken,
  isStaffOfCenter,
  controllers.updateStatus
);
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
