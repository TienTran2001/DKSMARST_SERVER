const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const { shiftRepository, authRepository } = require('../repositories');
const { Op } = require('sequelize');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models');

//lay danh ngay dang kiem
const getAllShift = asyncHandler(async (req, res) => {
  const { date, ...query } = req.query;
  const { centerId } = req.params;

  // filter
  if (date) {
    query.registrationDate = {
      [Op.substring]: date,
    };
  }
  query.centerId = centerId;
  const shifts = await shiftRepository.getAllShiftAsync(query);

  return res.json({
    success: shifts.length > 0 ? true : false,
    message:
      shifts.length > 0 ? 'Lấy danh sách thành công.' : 'Không có dữ liệu.',
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
const getShiftDetailById = asyncHandler(async (req, res) => {
  const { shiftDetailId } = req.params;
  console.log(shiftDetailId);
  const shiftDetail = await shiftRepository.getShiftDetailAsync({
    shiftDetailId,
  });
  return res.json({
    success: shiftDetail ? true : false,
    message: shiftDetail ? 'Lấy thành công.' : 'Lấy không thành công.',
    shiftDetail,
  });
});

// thêm
const addShift = asyncHandler(async (req, res, next) => {
  const { registrationDate } = req.body;

  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }

  req.body.centerId = user.centerId;

  const existShift = await shiftRepository.getShiftAsync({
    registrationDate,
  });

  if (existShift)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Ngày làm việc đã tồn tại.',
      res,
      next
    );

  const newShift = await shiftRepository.addShiftAsync(req.body);

  if (newShift) {
    // Tạo các shift_detail tương ứng
    const shiftDetails = [
      {
        startTime: '07:30',
        endTime: '09:30',
        quantity: 0,
        maxQuantity: 10,
        status: 1,
        shiftId: newShift.shiftId,
      },
      {
        startTime: '09:30',
        endTime: '11:30',
        quantity: 0,
        maxQuantity: 10,
        status: 1,
        shiftId: newShift.shiftId,
      },
      {
        startTime: '13:30',
        endTime: '15:00',
        quantity: 0,
        maxQuantity: 10,
        status: 1,
        shiftId: newShift.shiftId,
      },
      {
        startTime: '15:00',
        endTime: '15:30',
        quantity: 0,
        maxQuantity: 10,
        status: 1,
        shiftId: newShift.shiftId,
      },
    ];

    // Thêm các shift_detail vào cơ sở dữ liệu
    await db.ShiftDetail.bulkCreate(shiftDetails);
  }

  return res.json({
    success: newShift ? true : false,
    message: newShift
      ? 'Thêm ngày làm việc thành công.'
      : 'Thêm ngày làm việc không thành công.',
    newShift,
  });
});
// thêm shift detail
const addShiftDetail = asyncHandler(async (req, res, next) => {
  const { shiftId } = req.params;
  req.body.quantity = 0;
  req.body.shiftId = shiftId;
  console.log(req.body);
  const response = await shiftRepository.addShiftDetailAsync(req.body);
  return res.json({
    success: response ? true : false,
    message: response ? 'Thêm ca thành công.' : 'Thêm ca không thành công.',
    newShiftDetail: response,
  });
});

// update
const updateShift = asyncHandler(async (req, res, next) => {
  const { shiftId } = req.params;

  const { registrationDate } = req.body;
  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }
  const existShift = await shiftRepository.getShiftAsync({
    registrationDate,
  });

  if (existShift)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Ngày làm việc đã tồn tại.',
      res,
      next
    );

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
      'Ngày làm việc không tồn tại.',
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
      ? 'Xóa ngày làm việc thành công.'
      : 'Xóa ngày làm việc thất bại.',
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
  addShiftDetail,
  deleteShiftDetail,
  getShiftDetailById,
  updateShiftDetail,
};
