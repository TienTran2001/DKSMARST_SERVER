const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const getAllVehicleAsync = asyncHandler(async (query) => {
  return await db.Vehicle.findAll({
    where: query,
    order: [['createdAt', 'DESC']],
  });
});

// lấy theo id
const getVehicleAsync = asyncHandler(async (query) => {
  return await db.Vehicle.findOne({
    where: query,
  });
});

// thêm phương tiên
const addVehicleAsync = asyncHandler(async (data) => {
  return await db.Vehicle.create(data);
});

// update phương tiện
const updateVehicleAsync = asyncHandler(async (req, vehicleId) => {
  const response = await db.Vehicle.update(req.body, {
    where: {
      vehicleId,
    },
  });
  return response;
});

// delete phương tiện
const deleteVehicleAsync = asyncHandler(async (query) => {
  return await db.Vehicle.destroy({ where: query });
});

module.exports = {
  getAllVehicleAsync,
  getVehicleAsync,
  addVehicleAsync,
  updateVehicleAsync,
  deleteVehicleAsync,
};
