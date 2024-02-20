const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/user');
const validateDTO = require('../middlewares/validation');
const { stringReq, numberReq, string } = require('../middlewares/joiSchema');
const { verifyToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/current', verifyToken, controllers.getCurrent);
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
    })
  ),
  controllers.addUserByAdmin
);
router.put(
  '/:userId',
  verifyToken,
  isAdmin,
  validateDTO(
    Joi.object({
      email: stringReq,
      fullname: stringReq,
      password: stringReq,
      address: string,
      roleId: numberReq,
    })
  ),
  controllers.updateUser
);

router.delete('/:userId', verifyToken, isAdmin, controllers.deleteUser);

module.exports = router;