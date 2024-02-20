const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const db = require('../models');
const { authRepository } = require('../repositories');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');

const findUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await authRepository.findByIdAsync(id);
  return res.json({
    success: user ? true : false,
    data: user,
  });
});

const register = asyncHandler(async (req, res, next) => {
  // phone, email, fullname, password, address, roleId
  const { phone, email } = req.body;
  req.body.roleId = 2;
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
      ? 'Tạo tài khoản thành công.'
      : 'Tạo tài khoản không thành công.',
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  const existUser = await authRepository.findByPhoneAsync(phone);

  if (!existUser || existUser.password != password)
    return throwErrorWithStatus(
      statusCode.UNAUTHORIZED,
      'Số điện thoại hoặc mật khẩu không đúng.',
      res,
      next
    );

  const token = await authRepository.loginAsync(existUser);
  return res.json({
    success: true,
    message: 'Đăng nhập thành công',
    token,
  });
});

module.exports = {
  register,
  login,
  findUserById,
};
