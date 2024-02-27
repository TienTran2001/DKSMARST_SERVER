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

module.exports = {
  getAllCenterAsync,
};
