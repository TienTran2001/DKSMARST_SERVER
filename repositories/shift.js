const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const getShiftsAfterOrEqualToTodayAsync = async (query) => {
  const shifts = await db.Shift.findAll({
    where: {
      ...query,
      registrationDate: {
        [Op.gte]: new Date(), // Lấy các lịch hẹn có ngày đăng ký lớn hơn hoặc bằng ngày hiện tại
      },
    },

    include: [
      {
        model: db.ShiftDetail,
        attributes: ['maxQuantity', 'quantity'],
      },
    ],
  });

  return shifts;
};

const getAllShiftAsync = asyncHandler(async (query, options) => {
  return await db.Shift.findAndCountAll({
    where: query,
    ...options,
    // distinct: true,
  });
});

// lấy theo id
const getShiftAsync = asyncHandler(async (query) => {
  return await db.Shift.findOne({
    where: query,
  });
});

// thêm
const addShiftAsync = asyncHandler(async (data) => {
  return await db.Shift.create(data);
});
// thêm shift detail
const addShiftDetailAsync = asyncHandler(async (data) => {
  return await db.ShiftDetail.create(data);
});

// update
const updateShiftAsync = asyncHandler(async (req, shiftId, centerId) => {
  const response = await db.Shift.update(req.body, {
    where: {
      shiftId,
      centerId,
    },
  });
  return response;
});

// delete
const deleteShiftAsync = asyncHandler(async (query) => {
  return await db.Shift.destroy({ where: query });
});

module.exports = {
  getAllShiftAsync,
  getShiftAsync,
  addShiftAsync,
  updateShiftAsync,
  deleteShiftAsync,
  addShiftDetailAsync,

  getShiftsAfterOrEqualToTodayAsync,
};
