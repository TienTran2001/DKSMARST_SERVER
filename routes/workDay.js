const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/workDay');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const { verifyToken, isCenter } = require('../middlewares/verifyToken');

router.get('/center/:centerId', verifyToken, controllers.getAllWorkDay);
router.get('/:workDayId', verifyToken, controllers.getWorkDayById);

router.post(
  '/',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      inspectionDate: stringReq,
    })
  ),
  controllers.addWorkDay
);

router.put(
  '/:workDayId',
  verifyToken,
  isCenter,
  validateDTO(
    Joi.object({
      inspectionDate: stringReq,
    })
  ),
  controllers.updateWorkDay
);

router.delete('/:workDayId', verifyToken, isCenter, controllers.deleteWorkDay);

module.exports = router;
