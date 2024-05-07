const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const { shiftRepository, authRepository } = require('../repositories');
const { Op } = require('sequelize');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models');

//lay danh ngay dang kiem
const getAllShift = asyncHandler(async (req, res) => {
  const { ...query } = req.query;
  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (user) {
    query.centerId = user.centerId;
  }

  const options = {};

  // const shifts = await shiftRepository.getAllShiftAsync(query, options);
  const shifts = await db.Shift.findAndCountAll({
    where: query,
    // distinct: true,
  });

  return res.json({
    success: shifts.rows.length > 0 ? true : false,
    message:
      shifts.rows.length > 0
        ? 'Lấy danh sách thành công.'
        : 'Không có dữ liệu.',
    shifts,
  });
});

const getShiftById = asyncHandler(async (req, res) => {
  const { shiftId } = req.params;

  const shift = await shiftRepository.getShiftAsync({ shiftId });
  return res.json({
    success: shift ? true : false,
    message: shift ? 'Lấy thành công.' : 'Lấy không thành công.',
    shift,
  });
});

const addShift = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }

  req.body.centerId = user.centerId;

  const newShift = await shiftRepository.addShiftAsync(req.body);

  return res.json({
    success: newShift ? true : false,
    message: newShift
      ? 'Thêm ca làm việc thành công.'
      : 'Thêm ngày làm việc không thành công.',
    newShift,
  });
});

// // thêm shift detail
// const addShiftDetail = asyncHandler(async (req, res, next) => {
//   const { shiftId } = req.params;
//   req.body.quantity = 0;
//   req.body.shiftId = shiftId;
//   console.log(req.body);
//   const response = await shiftRepository.addShiftDetailAsync(req.body);
//   return res.json({
//     success: response ? true : false,
//     message: response ? 'Thêm ca thành công.' : 'Thêm ca không thành công.',
//     newShiftDetail: response,
//   });
// });

// update
// const updateShift = asyncHandler(async (req, res, next) => {
//   const { shiftId } = req.params;

//   const { registrationDate } = req.body;
//   const { userId } = req.user;
//   const user = await authRepository.findByIdAsync(userId);
//   if (!user) {
//     return;
//   }
//   const existShift = await shiftRepository.getShiftAsync({
//     registrationDate,
//   });

//   if (existShift)
//     return throwErrorWithStatus(
//       statusCode.BAD_REQUEST,
//       'Ngày làm việc đã tồn tại.',
//       res,
//       next
//     );

//   const newShift = await shiftRepository.updateShiftAsync(
//     req,
//     shiftId,
//     user.centerId
//   );

//   return res.json({
//     success: newShift ? true : false,
//     message: newShift
//       ? 'Ngày làm việc cập nhật thành công.'
//       : 'Ngày làm việc cập nhật thành công.',
//   });
// });
const updateShift = asyncHandler(async (req, res, next) => {
  const { shiftId } = req.params;

  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }

  const newShift = await shiftRepository.updateShiftAsync(
    req,
    shiftId,
    user.centerId
  );

  return res.json({
    success: newShift ? true : false,
    message: newShift
      ? 'Ngày làm việc cập nhật thành công.'
      : 'Ngày làm việc cập nhật thành công.',
  });
});
// update shift detail
const updateShiftDetail = asyncHandler(async (req, res, next) => {
  const { shiftDetailId } = req.params;

  const newShiftDetail = await shiftRepository.updateShiftDetailAsync(
    req,
    shiftDetailId
  );

  return res.json({
    success: newShiftDetail ? true : false,
    message: newShiftDetail
      ? 'Ca cập nhật thành công.'
      : 'Ca cập nhật thành công.',
  });
});

// xoa
const deleteShift = asyncHandler(async (req, res, next) => {
  const { shiftId } = req.params;
  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }
  console.log('hihi');
  const existShift = await shiftRepository.getShiftAsync({ shiftId });
  if (!existShift)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Ca đăng kiểm không tồn tại.',
      res,
      next
    );

  const response = await shiftRepository.deleteShiftAsync({
    centerId: user.centerId,
    shiftId,
  });
  return res.json({
    success: response ? true : false,
    message: response
      ? 'Xóa ca đăng kiểm thành công.'
      : 'Xóa ca đăng kiểm thất bại.',
  });
});
// xoa shift detail
const deleteShiftDetail = asyncHandler(async (req, res, next) => {
  const { shiftDetailId } = req.params;

  console.log(shiftDetailId);
  console.log('hihi');
  const existShiftDetail = await shiftRepository.getShiftDetailAsync({
    shiftDetailId,
  });
  if (!existShiftDetail)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Ca không tồn tại.',
      res,
      next
    );

  const response = await shiftRepository.deleteShiftDetailAsync({
    shiftDetailId,
  });
  return res.json({
    success: response ? true : false,
    message: response ? 'Xóa ca thành công.' : 'Xóa ca thất bại.',
  });
});

module.exports = {
  getAllShift,
  getShiftById,
  addShift,
  updateShift,
  deleteShift,

  deleteShiftDetail,

  updateShiftDetail,
};
