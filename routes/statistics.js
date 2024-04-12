const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/statistics');
const validateDTO = require('../middlewares/validation');
const {
  verifyToken,
  isAdmin,
  isCenter,
} = require('../middlewares/verifyToken');

router.get('/centers', verifyToken, isAdmin, controllers.getStatisticsCenters);
router.get('/users', verifyToken, isAdmin, controllers.getStatisticsUsers);
router.get(
  '/appointments',
  verifyToken,
  isCenter,
  controllers.getStatisticsAppointments
);

module.exports = router;
