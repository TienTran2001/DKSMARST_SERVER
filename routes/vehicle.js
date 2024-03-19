const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/vehicle');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/', verifyToken, controllers.getAllVehicle);
router.get('/:vehicleId', verifyToken, controllers.getVehicleById);
router.post(
  '/',
  verifyToken,
  validateDTO(
    Joi.object({
      licensePlate: stringReq,
      plateColor: numberReq,
      vehicleType: string,
      expiryDate: stringReq,
      brand: string,
      modelNumber: string,
      registrationPaper: string,
    })
  ),
  controllers.addVehicle
);

router.put(
  '/:vehicleId',
  verifyToken,
  validateDTO(
    Joi.object({
      plateColor: numberReq,
      vehicleType: string,
      expiryDate: stringReq,
      brand: string,
      modelNumber: string,
      registrationPaper: string,
    })
  ),
  controllers.updateVehicle
);

router.delete('/:vehicleId', verifyToken, controllers.deleteVehicle);
module.exports = router;
