const {
  errHandler,
  badRequestException,
} = require('../middlewares/errorHandler');
const auth = require('./auth');
const user = require('./user');
const province = require('./province');
const dotenv = require('dotenv');
dotenv.config();

const initRoutes = (app) => {
  app.use(`/api/v1/auth`, auth);
  app.use(`/api/v1/users`, user);
  app.use(`/api/v1/provinces`, province);

  app.use(badRequestException);
  app.use(errHandler);
};

module.exports = initRoutes;
