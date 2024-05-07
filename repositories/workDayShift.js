const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// lấy theo id
const getWorkDayShiftAsync = asyncHandler(async (query) => {
  return await db.WorkDayShift.findOne({
    where: query,
    include: [
      {
        model: db.Shift,
        attributes: ['startTime', 'endTime'],
      },
    ],
  });
});

// update
const updateWorkDayShiftAsync = asyncHandler(async (req, workDayShiftId) => {
  const response = await db.WorkDayShift.update(req.body, {
    where: {
      workDayShiftId,
    },
  });
  return response;
});

module.exports = {
  getWorkDayShiftAsync,
  updateWorkDayShiftAsync,
};
