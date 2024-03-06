const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/user');
const validateDTO = require('../middlewares/validation');
const {
  stringReq,
  numberReq,
  string,
  number,
} = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/current', verifyToken, controllers.getCurrent);
router.get('/:userId', verifyToken, isAdmin, controllers.getById);
router.get('/', verifyToken, isAdmin, controllers.getAllUser);
router.post(
  '/',
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      phone: numberReq,
      email: stringReq,
      fullname: stringReq,
      password: stringReq,
      address: string,
      roleId: numberReq,
      centerId: number,
    })
  ),
  controllers.addUserByAdmin
);
router.put(
  '/current',
  verifyToken,
  validateDTO(
    Joi.object({
      email: stringReq,
      fullname: stringReq,
      address: string,
    })
  ),
  controllers.updateCurrent
);
router.put(
  '/:userId',
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      email: stringReq,
      fullname: stringReq,
      address: string,
      roleId: numberReq,
      centerId: number,
    })
  ),
  controllers.updateUser
);

router.delete('/:userId', verifyToken, isAdmin, controllers.deleteUser);

module.exports = router;
