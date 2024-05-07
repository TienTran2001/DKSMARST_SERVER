const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const getWorkDaysAfterOrEqualToTodayAsync = async (query) => {
  const shifts = await db.WorkDay.findAll({
    where: {
      ...query,
      inspectionDate: {
        [Op.gte]: new Date(), // Lấy các lịch hẹn có ngày đăng ký lớn hơn hoặc bằng ngày hiện tại
      },
    },
    order: [['inspection_date', 'ASC']],
    include: [
      {
        model: db.WorkDayShift,
        attributes: ['maxQuantity', 'status'],
        include: [
          {
            model: db.Appointment,
            attributes: ['appointmentId'],
            where: {
              status: {
                [Op.notIn]: ['đã hủy'], // Lọc ra các status không thuộc vào "đã hủy"
              },
            },
            required: false,
          },
        ],
      },
    ],
  });

  return shifts;
};

const getAllWorkDayAsync = asyncHandler(async (query, options) => {
  return await db.WorkDay.findAndCountAll({
    where: query,
    ...options,
    order: [['inspection_date', 'DESC']],
    include: [
      {
        model: db.WorkDayShift,
        attributes: ['maxQuantity', 'status'],
        include: [
          {
            model: db.Appointment,
            attributes: ['appointmentId'],
            where: {
              status: {
                [Op.notIn]: ['đã hủy'],
              },
            },
            required: false,
          },
        ],
      },
    ],
    distinct: true,
  });
});

// lấy theo id
const getWorkDayAsync = asyncHandler(async (query) => {
  return await db.WorkDay.findOne({
    where: query,
    include: [
      {
        model: db.WorkDayShift,
        include: [
          {
            model: db.Shift,
            attributes: ['startTime', 'endTime'],
          },
          {
            model: db.Appointment,
            attributes: ['appointmentId'],
            where: {
              status: {
                [Op.notIn]: ['đã hủy'],
              },
            },
            required: false,
          },
        ],
      },
    ],
  });
});

// thêm
const addWorkDayAsync = asyncHandler(async (data) => {
  return await db.WorkDay.create(data);
});

// update
const updateWorkDayAsync = asyncHandler(async (req, workDayId, centerId) => {
  const response = await db.WorkDay.update(req.body, {
    where: {
      workDayId,
      centerId,
    },
  });
  return response;
});

const deleteWorkDayAsync = asyncHandler(async (query) => {
  return await db.WorkDay.destroy({ where: query });
});

module.exports = {
  getAllWorkDayAsync,
  getWorkDayAsync,
  addWorkDayAsync,
  updateWorkDayAsync,
  getWorkDaysAfterOrEqualToTodayAsync,
  deleteWorkDayAsync,
};
