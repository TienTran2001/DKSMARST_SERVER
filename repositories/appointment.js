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
        model: db.Center,
        attributes: ['name', 'address'],
      },
      {
        model: db.Vehicle,
        // attributes: ['licensePlate', 'plateColor', 'vehicleType'],
        // where: keyword,
      },
      {
        model: db.ShiftDetail,
        // where: keyword,
      },
      {
        model: db.User,
        attributes: ['fullname', 'phone', 'email'],
        // where: keyword,
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
        model: db.Center,
        attributes: ['name', 'address'],
      },
      {
        model: db.Vehicle,
        attributes: ['licensePlate', 'plateColor', 'vehicleType'],
        // where: keyword,
      },
      {
        model: db.ShiftDetail,
        // where: keyword,
      },
      {
        model: db.User,
        attributes: ['fullname', 'phone'],
        // where: keyword,
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

// ham update trạng thái
const updateStatusAsync = asyncHandler(async (data, appointmentId) => {
  const response = await db.Appointment.update(data, {
    where: { appointmentId },
  });
  return response;
});

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
  updateStatusAsync,
};
