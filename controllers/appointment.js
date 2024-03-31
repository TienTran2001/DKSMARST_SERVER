const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const db = require('../models');
const {
  appointmentRepository,
  shiftRepository,
  authRepository,
} = require('../repositories');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const { Op } = require('sequelize');
const { addShiftDetail } = require('./shift');

// lấy thông tin user theo id
// const getById = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const response = await authRepository.findByIdAsync(userId);
//   console.log(response);
//   return res.json({
//     success: response ? true : false,
//     message: response ? 'Lấy thành công' : 'Lấy thất bại',
//     currentUser: response,
//   });
// });

//lay danh sach lich hen theo user
const getAllAppointmentOfUser = asyncHandler(async (req, res) => {
  const { limit, page, search, status, ...query } = req.query;
  const { userId } = req.user;
  query.userId = userId;
  const keyword = {};
  const options = {};
  console.log({ search, limit, page });
  // filter theo biển số xe
  if (search) {
    keyword.licensePlate = {
      [Op.substring]: search,
    };
  }
  // filter theo status
  if (status) query.status = status;

  const prevPage = page - 1 >= 0 ? +page + 1 : 1;
  const offset = (prevPage - 1) * limit;

  if (offset) options.offset = offset;
  options.limit = +limit;
  console.log(query);

  const appointments = await appointmentRepository.getAllAppointmentAsync(
    query,
    keyword,
    options
  );

  let totalPage = 0;
  if (appointments.rows.length > 0) {
    totalPage = Math.ceil(appointments.count / limit);
  }
  return res.json({
    success: appointments.rows.length >= 0 ? true : false,
    message:
      appointments.rows.length > 0
        ? 'Lấy danh sách thành công.'
        : 'Không có dữ liệu.',
    totalPage,
    appointments,
  });
});
//lay danh sach lich hen theo trung tâm
const getAllAppointmentOfCenter = asyncHandler(async (req, res) => {
  const { limit, page, search, status, ...query } = req.query;
  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  console.log(user.centerId);
  query.centerId = user.centerId;
  const keyword = {};
  const options = {};
  // console.log({ search, limit, page });
  // filter
  if (search) {
    query.appointmentDate = {
      [Op.substring]: search,
    };
  }
  // filter theo status
  if (status) query.status = status;

  const prevPage = page - 1 >= 0 ? +page + 1 : 1;
  const offset = (prevPage - 1) * limit;

  if (offset) options.offset = offset;
  options.limit = +limit;
  // console.log(query);

  const appointments = await appointmentRepository.getAllAppointmentAsync(
    query,
    keyword,
    options
  );

  let totalPage = 0;
  if (appointments.rows.length > 0) {
    totalPage = Math.ceil(appointments.count / limit);
  }
  return res.json({
    success: appointments.rows.length >= 0 ? true : false,
    message:
      appointments.rows.length > 0
        ? 'Lấy danh sách thành công.'
        : 'Không có dữ liệu.',
    totalPage,
    appointments,
  });
});
//lay lịch hẹn theo id
const getAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await appointmentRepository.findAppointmentAsync({
    appointmentId,
  });

  return res.json({
    success: appointment ? true : false,
    message: appointment ? 'Lấy danh sách thành công.' : 'Không có dữ liệu.',
    appointment,
  });
});

// thêm lịch hẹn
const addAppointment = asyncHandler(async (req, res, next) => {
  const { vehicleId, shiftDetailId } = req.body;
  const { userId } = req.user;
  req.body.userId = userId;
  console.log(req.body);
  const query = {
    vehicleId,
    status: {
      [Op.not]: ['đã hủy', 'đã hoàn thành'],
    },
  };
  const existAppointment = await appointmentRepository.findAppointmentAsync(
    query
  );
  if (existAppointment)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Phương tiện đang trong trạng thái đặt lịch',
      res,
      next
    );
  const shiftDetail = await shiftRepository.getShiftDetailAsync({
    shiftDetailId,
  });
  console.log(shiftDetail);
  if (
    shiftDetail?.status == 'Đã đầy' ||
    shiftDetail?.status == 'Ngưng nhận lịch'
  ) {
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Ca không nhận lịch.',
      res,
      next
    );
  }

  const newAppointment = await appointmentRepository.addAppointmentAsync(
    req.body
  );
  if (newAppointment) {
    await shiftRepository.incrementQuantity(shiftDetailId);
  }
  return res.json({
    success: newAppointment ? true : false,
    message: newAppointment
      ? 'Đặt lịch hẹn thành công.'
      : 'Đặt lịch hẹn không thành công.',
    newAppointment,
  });
});

// Update trạng thái
const updateStatus = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;
  const appointment = await appointmentRepository.findAppointmentAsync({
    appointmentId,
  });
  const data = {};
  if (appointment?.status == 'chưa xác nhận') {
    data.status = 'đã xác nhận';
  }
  if (appointment?.status == 'đã xác nhận') {
    data.status = 'đã hoàn thành';
  }
  const response = await appointmentRepository.updateStatusAsync(
    data,
    appointmentId
  );

  return res.json({
    success: response ? true : false,
    message: response
      ? 'Cập nhật trạng thái thành công.'
      : 'Cập nhật trạng thái thất bại.',
  });
});

const cancelAppointment = asyncHandler(async (req, res, next) => {
  const { appointmentId } = req.params;

  const data = {};
  data.status = 'đã hủy';
  const appointment = await appointmentRepository.findAppointmentAsync({
    appointmentId,
  });

  const response = await appointmentRepository.updateStatusAsync(
    data,
    appointmentId
  );

  if (response) {
    await shiftRepository.decrementQuantity(appointment.shiftDetailId);
  }

  return res.json({
    success: response ? true : false,
    message: response
      ? 'Hủy lịch hẹn thành công.'
      : 'Hủy lịch hẹn thất bại thất bại.',
  });
});

// // Sua tai khoan
// const updateCurrent = asyncHandler(async (req, res, next) => {
//   const { userId } = req.user;
//   const { email } = req.body;
//   const existUser = await authRepository.findByIdAsync(userId);
//   if (!existUser)
//     return throwErrorWithStatus(
//       statusCode.NOTFOUND,
//       'Tài khoản không tồn tại.',
//       res,
//       next
//     );
//   const existEmail = await authRepository.findByEmailAsync(email);

//   if (existEmail && email !== existUser.email)
//     return throwErrorWithStatus(
//       statusCode.UNAUTHORIZED,
//       'Email đã tồn tại.',
//       res,
//       next
//     );

//   const response = await authRepository.updateUserAsync(req, userId);
//   return res.json({
//     success: response ? true : false,
//     message: response
//       ? 'Cập nhật tài khoản thành công.'
//       : 'Cập nhật khoản không thành công.',
//   });
// });

// // xoa tai khoan
// const deleteUser = asyncHandler(async (req, res, next) => {
//   const { userId } = req.params;

//   const existUser = await authRepository.findByIdAsync(userId);
//   if (!existUser)
//     return throwErrorWithStatus(
//       statusCode.NOTFOUND,
//       'Tài khoản không tồn tại.',
//       res,
//       next
//     );

//   const response = await authRepository.deleteUserAsync(userId);
//   return res.json({
//     success: response ? true : false,
//     message: response
//       ? 'Xóa tài khoản thành công.'
//       : 'Xóa khoản không thành công.',
//   });
// });

module.exports = {
  getAllAppointmentOfUser,
  getAllAppointmentOfCenter,
  addAppointment,
  getAppointment,
  updateStatus,
  cancelAppointment,
};
