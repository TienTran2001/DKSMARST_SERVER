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
    order: [['registration_date', 'DESC']],
    ...options,
    include: [
      {
        model: db.ShiftDetail,
        attributes: ['maxQuantity', 'quantity'],
      },
    ],
    distinct: true,
  });
});

// lấy theo id
const getShiftAsync = asyncHandler(async (query) => {
  return await db.Shift.findOne({
    where: query,
    include: [{ model: db.ShiftDetail }],
  });
});
// lấy shift detail theo id
const getShiftDetailAsync = asyncHandler(async (query) => {
  return await db.ShiftDetail.findOne({
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

// update shift detail
const updateShiftDetailAsync = asyncHandler(async (req, shiftDetailId) => {
  const response = await db.ShiftDetail.update(req.body, {
    where: {
      shiftDetailId,
    },
  });
  return response;
});

// delete
const deleteShiftAsync = asyncHandler(async (query) => {
  return await db.Shift.destroy({ where: query });
});
// delete shift detail
const deleteShiftDetailAsync = asyncHandler(async (query) => {
  return await db.ShiftDetail.destroy({ where: query });
});

module.exports = {
  getAllShiftAsync,
  getShiftAsync,
  addShiftAsync,
  updateShiftAsync,
  deleteShiftAsync,
  addShiftDetailAsync,
  getShiftDetailAsync,
  deleteShiftDetailAsync,
  updateShiftDetailAsync,
  getShiftsAfterOrEqualToTodayAsync,
};
