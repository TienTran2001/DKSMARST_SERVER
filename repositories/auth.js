const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

// tim theo email
const findByEmailAsync = asyncHandler(async (email) => {
  return await db.User.findOne({ where: { email } });
});

// tìm theo sdt
const findByPhoneAsync = asyncHandler(async (phone) => {
  return await db.User.findOne({ where: { phone } });
});

// lấy thông tin user theo id
const findByIdAsync = asyncHandler(async (userId) => {
  return await db.User.findByPk(userId, {
    attributes: {
      exclude: ['password'],
    },
  });
});

// ham lay danh sach user
const getAllUserAsync = asyncHandler(async (query, options) => {
  const users = await db.User.findAndCountAll({
    where: query,
    order: [['createdAt', 'DESC']],
    ...options,
  });
  return users;
});

// ham update user
const updateUserAsync = asyncHandler(async (req, userId) => {
  const response = await db.User.update(req.body, { where: { userId } });
  return response;
});

// hàm xóa user
const deleteUserAsync = asyncHandler(async (userId) => {
  return await db.User.destroy({ where: { userId } });
});

// hàm tạo user
const registerAsync = asyncHandler(async (data) => {
  return await db.User.create(data);
});

// hàm logic
const loginAsync = asyncHandler(async (user) => {
  const token = jwt.sign(
    { userId: user.userId, roleId: user.roleId },
    process.env.JWT_SECRET,
    { expiresIn: '14d' }
  );
  return token;
});
module.exports = {
  findByEmailAsync,
  findByPhoneAsync,
  registerAsync,
  findByIdAsync,
  loginAsync,
  updateUserAsync,
  getAllUserAsync,
  deleteUserAsync,
};
