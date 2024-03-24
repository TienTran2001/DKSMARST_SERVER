const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const getAllShiftAsync = asyncHandler(async (query) => {
  return await db.Shift.findAll({
    where: query,
    order: [['registration_date', 'DESC']],
  });
});

// lấy theo id
const getShiftAsync = asyncHandler(async (query) => {
  return await db.Shift.findOne({
    where: query,
    include: [{ model: db.ShiftDetail }],
  });
});

// thêm
const addShiftAsync = asyncHandler(async (data) => {
  return await db.Shift.create(data);
});

// // update
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
};
