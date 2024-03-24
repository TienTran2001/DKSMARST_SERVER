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
dotenv.config();

const initRoutes = (app) => {
  app.use(`/api/v1/auth`, auth);
  app.use(`/api/v1/users`, user);
  app.use(`/api/v1/provinces`, province);
  app.use(`/api/v1/centers`, center);
  app.use(`/api/v1/vehicles`, vehicle);
  app.use(`/api/v1/center`, shift);

  app.use(badRequestException);
  app.use(errHandler);
};

module.exports = initRoutes;
