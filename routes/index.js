const {
  errHandler,
  badRequestException,
} = require('../middlewares/errorHandler');
const auth = require('./auth');
const user = require('./user');
const province = require('./province');
const center = require('./center');
const vehicle = require('./vehicle');
const dotenv = require('dotenv');
const shift = require('./shift');
const workDay = require('./workDay');
const workDayShift = require('./workDayShift');
const appointment = require('./appointment');
const news = require('./news');
const statistics = require('./statistics');
const laravel = require('./laravel');

dotenv.config();

const initRoutes = (app) => {
  app.use(`/api/v1/auth`, auth);
  app.use(`/api/v1/users`, user);
  app.use(`/api/v1/provinces`, province);
  app.use(`/api/v1/centers`, center);
  app.use(`/api/v1/vehicles`, vehicle);
  app.use(`/api/v1/center`, shift);
  app.use(`/api/v1/work-days`, workDay);
  app.use(`/api/v1/work-day-shift`, workDayShift);
  app.use(`/api/v1/appointments`, appointment);
  app.use(`/api/v1/news`, news);
  app.use(`/api/v1/statistics`, statistics);
  app.use(`/api/v1/laravel`, laravel);

  app.use(badRequestException);
  app.use(errHandler);
};

module.exports = initRoutes;
