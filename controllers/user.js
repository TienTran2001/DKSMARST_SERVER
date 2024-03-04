const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const db = require('../models');
const { authRepository } = require('../repositories');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const { Op } = require('sequelize');

// lấy thông tin user hiện tại
const getCurrent = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  console.log('hih');
  const response = await authRepository.findByIdAsync(userId);
  return res.json({
    success: response ? true : false,
    message: response ? 'Lấy thành công' : 'Lấy thất bại',
    currentUser: response,
  });
});

// lấy thông tin user theo id
const getById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const response = await authRepository.findByIdAsync(userId);
  console.log(response);
  return res.json({
    success: response ? true : false,
    message: response ? 'Lấy thành công' : 'Lấy thất bại',
    currentUser: response,
  });
});

//lay danh sach tai khoan
const getAllUser = asyncHandler(async (req, res) => {
  const { limit, page, phone, ...query } = req.query;
  const options = {};
  if (!limit) {
    // filter
    if (phone) {
      query.phone = {
        [Op.substring]: phone,
      };
    }

    const users = await authRepository.getAllUserAsync(query);

    return res.json({
      success: users.length > 0 ? true : false,
      message:
        users.length > 0
          ? 'Lấy danh sách thành công.'
          : 'Lấy danh sách không thành công.',
      users,
    });
  }

  const prevPage = page - 1 >= 0 ? +page + 1 : 1;
  const offset = (prevPage - 1) * limit;

  if (offset) options.offset = offset;
  options.limit = +limit;
  console.log(options);
  const users = await db.User.findAndCountAll({
    where: query,
    ...options,
  });
  return res.json({
    success: users.length > 0 ? true : false,
    message:
      users.length > 0
        ? 'Lấy danh sách thành công.'
        : 'Lấy danh sách không thành công.',
    users,
  });
});

// tạo tài khoản
const addUserByAdmin = asyncHandler(async (req, res, next) => {
  const { phone, email } = req.body;
  console.log(req.body);
  const existPhone = await authRepository.findByPhoneAsync(phone);
  if (existPhone)
    return throwErrorWithStatus(
      statusCode.UNAUTHORIZED,
      'Số điện thoại đã tồn tại.',
      res,
      next
    );
  const existEmail = await authRepository.findByEmailAsync(email);
  if (existEmail)
    return throwErrorWithStatus(
      statusCode.UNAUTHORIZED,
      'Email đã tồn tại.',
      res,
      next
    );

  const newUser = await authRepository.registerAsync(req.body);
  return res.json({
    success: newUser ? true : false,
    message: newUser
      ? 'Đăng ký tài khoản thành công.'
      : 'Đăng ký tài khoản không thành công.',
  });
});

// Sua tai khoan
const updateUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { email } = req.body;
  const existUser = await authRepository.findByIdAsync(userId);
  if (!existUser)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Tài khoản không tồn tại.',
      res,
      next
    );
  const existEmail = await authRepository.findByEmailAsync(email);

  if (existEmail && email !== existUser.email)
    return throwErrorWithStatus(
      statusCode.UNAUTHORIZED,
      'Email đã tồn tại.',
      res,
      next
    );

  const response = await authRepository.updateUserAsync(req, userId);
  return res.json({
    success: response ? true : false,
    message: response
      ? 'Cập nhật tài khoản thành công.'
      : 'Cập nhật khoản không thành công.',
  });
});

// Sua tai khoan
const updateCurrent = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { email } = req.body;
  const existUser = await authRepository.findByIdAsync(userId);
  if (!existUser)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Tài khoản không tồn tại.',
      res,
      next
    );
  const existEmail = await authRepository.findByEmailAsync(email);

  if (existEmail && email !== existUser.email)
    return throwErrorWithStatus(
      statusCode.UNAUTHORIZED,
      'Email đã tồn tại.',
      res,
      next
    );

  const response = await authRepository.updateUserAsync(req, userId);
  return res.json({
    success: response ? true : false,
    message: response
      ? 'Cập nhật tài khoản thành công.'
      : 'Cập nhật khoản không thành công.',
  });
});

// xoa tai khoan
const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const existUser = await authRepository.findByIdAsync(userId);
  if (!existUser)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Tài khoản không tồn tại.',
      res,
      next
    );

  const response = await authRepository.deleteUserAsync(userId);
  return res.json({
    success: response ? true : false,
    message: response
      ? 'Xóa tài khoản thành công.'
      : 'Xóa khoản không thành công.',
  });
});

module.exports = {
  getCurrent,
  addUserByAdmin,
  updateUser,
  getAllUser,
  deleteUser,
  getById,
  updateCurrent,
};
