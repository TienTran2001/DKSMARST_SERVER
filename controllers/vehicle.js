const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const { vehicleRepository, appointmentRepository } = require('../repositories');
const { Op } = require('sequelize');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models');
const appointment = require('../models/appointment');

//lay danh phuong tien
const getAllVehicle = asyncHandler(async (req, res) => {
  const { licensePlate, ...query } = req.query;
  const { userId } = req.user;

  // filter
  if (licensePlate) {
    query.licensePlate = {
      [Op.substring]: licensePlate,
    };
  }
  query.userId = userId;
  console.log(query);
  const vehicles = await vehicleRepository.getAllVehicleAsync(query);

  return res.json({
    success: vehicles.length >= 0 ? true : false,
    message: vehicles
      ? 'Lấy danh sách thành công.'
      : 'Lấy danh sách không thành công.',
    vehicles,
  });
});

const getVehicleById = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { vehicleId } = req.params;

  const vehicle = await vehicleRepository.getVehicleAsync({
    userId,
    vehicleId,
  });
  return res.json({
    success: vehicle ? true : false,
    message: vehicle ? 'Lấy thành công.' : 'Lấy không thành công.',
    vehicle,
  });
});

// thêm phuong tien
const addVehicle = asyncHandler(async (req, res, next) => {
  const { licensePlate } = req.body;

  const { userId } = req.user;
  req.body.userId = userId;

  const existVehicle = await vehicleRepository.getVehicleAsync({
    licensePlate,
    userId,
  });

  if (existVehicle)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Phương tiện đã tồn tại.',
      res,
      next
    );

  const newVehicle = await vehicleRepository.addVehicleAsync(req.body);
  return res.json({
    success: newVehicle ? true : false,
    message: newVehicle
      ? 'Đăng ký phương tiện thành công.'
      : 'Đăng ký tiện không thành công.',
    newVehicle,
  });
});

// update phương tiện
const updateVehicle = asyncHandler(async (req, res, next) => {
  const { vehicleId } = req.params;
  const { userId } = req.user;

  const existVehicle = await vehicleRepository.getVehicleAsync({
    vehicleId,
    userId,
  });
  if (!existVehicle) {
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Phương tiện không tồn tại.',
      res,
      next
    );
  }

  const newVehicle = await vehicleRepository.updateVehicleAsync(req, vehicleId);
  return res.json({
    success: newVehicle ? true : false,
    message: newVehicle
      ? 'Phương tiện cập nhật thành công.'
      : 'Phương tiện cập nhật thành công.',
  });
});

// xoa phương tiện
const deleteVehicle = asyncHandler(async (req, res, next) => {
  const { vehicleId } = req.params;
  const { userId } = req.user;

  const existVehicle = await vehicleRepository.getVehicleAsync({ vehicleId });
  if (!existVehicle)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Phương tiện không tồn tại.',
      res,
      next
    );

  const response = await vehicleRepository.deleteVehicleAsync({
    userId,
    vehicleId,
  });

  return res.json({
    success: response ? true : false,
    message: response
      ? 'Xóa phương tiện thành công.'
      : 'Xóa phương tiện thất bại.',
  });
});

module.exports = {
  getAllVehicle,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};
