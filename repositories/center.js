const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

// lấy danh sách trung tam
const getAllCenterAsync = asyncHandler(async (query) => {
  return await db.Center.findAll({
    where: query,
    include: [{ model: db.Province, attributes: ['name'] }],
  });
});

// tim theo tên
const getCenterByNameAsync = asyncHandler(async (name) => {
  return await db.Center.findOne({ where: { name } });
});

// lấy theo id
const getCenterById = asyncHandler(async (centerId) => {
  return await db.Center.findByPk(centerId, {
    include: [{ model: db.Province, attributes: ['name'] }],
  });
});

// thêm trung tâm
const addCenterAsync = asyncHandler(async (data) => {
  return await db.Center.create(data);
});

// update tỉnh thành
const updateCenterAsync = asyncHandler(async (req, centerId) => {
  const response = await db.Center.update(req.body, {
    where: { centerId },
  });
  return response;
});

// delete trung tâm
const deleteCenterAsync = asyncHandler(async (centerId) => {
  return await db.Center.destroy({ where: { centerId } });
});

const countAppointmentOfMonthAndYearAsync = asyncHandler(
  async (centerId, status, month, year) => {
    const appointments = await db.Appointment.count({
      where: {
        centerId: centerId,
        status: status,
        [Op.and]: [
          db.Sequelize.where(
            db.Sequelize.fn('MONTH', db.Sequelize.col('appointment_date')),
            month
          ),
          db.Sequelize.where(
            db.Sequelize.fn('YEAR', db.Sequelize.col('appointment_date')),
            year
          ),
        ],
      },
    });
    return appointments;
  }
);

module.exports = {
  getAllCenterAsync,
  getCenterByNameAsync,
  addCenterAsync,
  getCenterById,
  updateCenterAsync,
  deleteCenterAsync,
  countAppointmentOfMonthAndYearAsync,
};
