const router = require('express').Router();
const Joi = require('joi');
const controllers = require('../controllers/statistics');
const validateDTO = require('../middlewares/validation');
const {
  verifyToken,
  isAdmin,
  isCenter,
  isAllOfCenter,
} = require('../middlewares/verifyToken');

router.get('/centers', verifyToken, isAdmin, controllers.getStatisticsCenters);
router.get('/users', verifyToken, isAdmin, controllers.getStatisticsUsers);
router.get(
  '/appointments',
  verifyToken,
  isAllOfCenter,
  controllers.getStatisticsAppointments
);
router.get(
  '/appointments-of-month',
  verifyToken,
  isAllOfCenter,
  controllers.getStatisticsAppointmentsYearAndMonth
);

module.exports = router;
