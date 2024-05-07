const authRepository = require('./auth');
const provinceRepository = require('./province');
const centerRepository = require('./center');
const vehicleRepository = require('./vehicle');
const shiftRepository = require('./shift');
const appointmentRepository = require('./appointment');
const newsRepository = require('./news');
const workDayRepository = require('./workDay');
const workDayShiftRepository = require('./workDayShift');

module.exports = {
  authRepository,
  provinceRepository,
  centerRepository,
  vehicleRepository,
  shiftRepository,
  workDayRepository,
  appointmentRepository,
  newsRepository,
  workDayShiftRepository,
};
