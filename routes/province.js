const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/province');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq } = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/:provinceId', controllers.getProvinceById);
router.get('/', controllers.getAllProvince);
router.post(
  '/',
  validateDTO(
    Joi.object({
      name: stringReq,
    })
  ),
  verifyToken,
  isAdmin,
  controllers.addProvince
);
router.put(
  '/:provinceId',
  validateDTO(
    Joi.object({
      name: stringReq,
    })
  ),
  verifyToken,
  isAdmin,
  controllers.updateProvince
);

router.delete('/:provinceId', verifyToken, isAdmin, controllers.deleteProvince);

module.exports = router;
