const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

// // lấy thông tin
const findAppointmentAsync = asyncHandler(async (query) => {
  return await db.Appointment.findOne({
    where: query,
    include: [
      {
        model: db.Vehicle,
        attributes: ['licensePlate', 'plateColor', 'vehicleType'],
      },
    ],
  });
});

// ham lay danh sach lịch hẹn
const getAllAppointmentAsync = asyncHandler(async (query, keyword, options) => {
  const users = await db.Appointment.findAndCountAll({
    where: query,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: db.Vehicle,
        attributes: ['licensePlate', 'plateColor', 'vehicleType'],
        where: keyword,
      },
    ],
    ...options,
  });
  return users;
});

// hàm tạo lịch hẹn
const addAppointmentAsync = asyncHandler(async (data) => {
  return await db.Appointment.create(data);
});

// ham update user
// const updateUserAsync = asyncHandler(async (req, userId) => {
//   const response = await db.User.update(req.body, { where: { userId } });
//   return response;
// });

// // hàm xóa user
// const deleteUserAsync = asyncHandler(async (userId) => {
//   return await db.User.destroy({ where: { userId } });
// });

// // hàm tạo user
// const registerAsync = asyncHandler(async (data) => {
//   return await db.User.create(data);
// });

// // hàm logic
// const loginAsync = asyncHandler(async (user) => {
//   const token = jwt.sign(
//     { userId: user.userId, roleId: user.roleId },
//     process.env.JWT_SECRET,
//     { expiresIn: '14d' }
//   );
//   return token;
// });
module.exports = {
  getAllAppointmentAsync,
  findAppointmentAsync,
  addAppointmentAsync,
};
