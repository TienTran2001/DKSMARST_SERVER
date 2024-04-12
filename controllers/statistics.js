const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const { shiftRepository, authRepository } = require('../repositories');
const { Op } = require('sequelize');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models');

const getStatisticsCenters = asyncHandler(async (req, res) => {
  const totalCenters = await db.Center.count();
  const activeCenters = await db.Center.count({
    where: { status: 'đang nhận lich' },
  });
  const inactiveCenters = await db.Center.count({
    where: { status: 'ngưng nhận lịch' },
  });

  return res.json({
    success: totalCenters >= 0 ? true : false,
    message: 'Dữ liệu về tất cả trung tâm',
    totalCenters,
    activeCenters,
    inactiveCenters,
  });
});

const getStatisticsUsers = asyncHandler(async (req, res) => {
  const totalUsers = await db.User.count();
  // Lấy ngày bắt đầu của hôm nay
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Lấy ngày bắt đầu của ngày hôm qua
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Lấy ngày bắt đầu của ngày mai
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Tính số tài khoản được tạo mới trong ngày
  const newUsers = await db.User.count({
    where: {
      createdAt: {
        [Op.between]: [today, tomorrow],
      },
    },
  });

  // Tính tổng số tài khoản mới được tạo trong ngày hôm qua
  const newUsersYesterday = await db.User.count({
    where: {
      createdAt: {
        [Op.between]: [yesterday, today],
      },
    },
  });
  // Tính phần trăm tài khoản mới so với ngày hôm qua

  let percentageIncrease = 0;
  if (newUsersYesterday === 0) {
    percentageIncrease = newUsers > 0 ? 100 : 0;
  } else {
    percentageIncrease = (
      ((newUsers - newUsersYesterday) / newUsersYesterday) *
      100
    ).toFixed(2);
  }

  return res.json({
    success: totalUsers >= 0 ? true : false,
    message: 'Thông tin thống kê tài khoản',
    totalUsers,
    percentageIncrease,
    newUsers,
    newUsersYesterday,
  });
});

const getStatisticsAppointments = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await authRepository.findByIdAsync(userId);
  let centerId;
  if (user) {
    centerId = user.centerId;
  }

  const totalAppointments = await db.Appointment.count({
    where: { centerId: centerId },
  });

  // Lấy ngày bắt đầu của hôm nay
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Lấy ngày bắt đầu của ngày hôm qua
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Lấy ngày bắt đầu của ngày mai
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  //  được tạo mới trong ngày
  const newAppointments = await db.Appointment.count({
    where: {
      centerId,
      createdAt: {
        [Op.between]: [today, tomorrow],
      },
    },
  });

  // được tạo trong ngày hôm qua
  const newAppointmentsYesterday = await db.Appointment.count({
    where: {
      centerId,
      createdAt: {
        [Op.between]: [yesterday, today],
      },
    },
  });

  let percentageIncrease = 0;
  if (newAppointmentsYesterday === 0) {
    percentageIncrease = newAppointments > 0 ? 100 : 0;
  } else {
    percentageIncrease = (
      ((newAppointments - newAppointmentsYesterday) /
        newAppointmentsYesterday) *
      100
    ).toFixed(2);
  }

  const doneAppointments = await db.Appointment.count({
    where: {
      centerId,
      status: 'đã hoàn thành',
    },
  });
  const cancelAppointments = await db.Appointment.count({
    where: {
      centerId,
      status: 'đã hủy',
    },
  });

  return res.json({
    success: totalAppointments >= 0 ? true : false,
    message: 'Dữ liệu của trung tâm',
    totalAppointments,
    percentageIncrease,
    newAppointments,
    newAppointmentsYesterday,
    doneAppointments,
    cancelAppointments,
  });
});

module.exports = {
  getStatisticsCenters,
  getStatisticsUsers,
  getStatisticsAppointments,
};
