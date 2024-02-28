const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

// lấy danh sách trung tam
const getAllCenterAsync = asyncHandler(async (query) => {
  return await db.Center.findAll({
    where: query,
  });
});

// tim theo tên
const getCenterByNameAsync = asyncHandler(async (name) => {
  return await db.Center.findOne({ where: { name } });
});

// lấy theo id
const getCenterById = asyncHandler(async (centerId) => {
  return await db.Center.findByPk(centerId);
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

module.exports = {
  getAllCenterAsync,
  getCenterByNameAsync,
  addCenterAsync,
  getCenterById,
  updateCenterAsync,
  deleteCenterAsync,
};
