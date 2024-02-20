const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();

// lấy danh sách province
const getAllProvinceAsync = asyncHandler(async () => {
  return await db.Province.findAll();
});

// tim theo tên
const getProvinceByNameAsync = asyncHandler(async (name) => {
  return await db.Province.findOne({ where: { name } });
});

// tim theo id
const getProvinceByIdAsync = asyncHandler(async (provinceId) => {
  return await db.Province.findByPk(provinceId);
});

// thêm tỉnh thành
const addProvinceAsync = asyncHandler(async (data) => {
  return await db.Province.create(data);
});

// update tỉnh thành
const updateProvinceAsync = asyncHandler(async (req, provinceId) => {
  const response = await db.Province.update(req.body, {
    where: { provinceId },
  });
  return response;
});

// delete tỉnh thành
const deleteProvinceAsync = asyncHandler(async (provinceId) => {
  return await db.Province.destroy({ where: { provinceId } });
});

module.exports = {
  getAllProvinceAsync,
  getProvinceByNameAsync,
  addProvinceAsync,
  updateProvinceAsync,
  getProvinceByIdAsync,
  deleteProvinceAsync,
};
