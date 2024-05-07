const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const {
  shiftRepository,
  authRepository,
  workDayRepository,
} = require('../repositories');
const { Op } = require('sequelize');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models');

//lay danh ngay dang kiem
const getAllWorkDay = asyncHandler(async (req, res) => {
  const { limit, page, date, ...query } = req.query;
  const { centerId } = req.params;
  query.centerId = centerId;
  if (!limit) {
    console.log('vap');
    const workDays =
      await workDayRepository.getWorkDaysAfterOrEqualToTodayAsync(query);
    return res.json({
      success: workDays.length >= 0 ? true : false,
      message:
        workDays.length > 0 ? 'Lấy danh sách thành công.' : 'Không có dữ liệu.',
      workDays,
    });
  }

  const options = {};
  // filter
  if (date) {
    query.inspectionDate = {
      [Op.substring]: date,
    };
  }

  const prevPage = page - 1 >= 0 ? +page + 1 : 1;
  const offset = (prevPage - 1) * limit;

  if (offset) options.offset = offset;
  options.limit = +limit;

  const workDays = await workDayRepository.getAllWorkDayAsync(query, options);
  let totalPage = 0;
  if (workDays.rows.length > 0) {
    totalPage = Math.ceil(workDays.count / limit);
  }

  return res.json({
    success: workDays.rows.length > 0 ? true : false,
    message:
      workDays.rows.length > 0
        ? 'Lấy danh sách thành công.'
        : 'Không có dữ liệu.',
    totalPage,
    workDays,
  });
});

const getWorkDayById = asyncHandler(async (req, res) => {
  const { workDayId } = req.params;

  const workDay = await workDayRepository.getWorkDayAsync({
    workDayId,
  });

  return res.json({
    success: workDay ? true : false,
    message: workDay ? 'Lấy thành công.' : 'Lấy không thành công.',
    workDay,
  });
});

// thêm
const addWorkDay = asyncHandler(async (req, res, next) => {
  const { inspectionDate } = req.body;

  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }

  req.body.centerId = user.centerId;

  const existWorkDay = await workDayRepository.getWorkDayAsync({
    inspectionDate,
    centerId: user.centerId,
  });

  if (existWorkDay)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Ngày làm việc đã tồn tại.',
      res,
      next
    );

  const newWorkDay = await workDayRepository.addWorkDayAsync(req.body);

  if (newWorkDay) {
    const shifts = await shiftRepository.getAllShiftAsync({
      centerId: user.centerId,
    });

    for (const shift of shifts.rows) {
      await db.WorkDayShift.create({
        workDayId: newWorkDay.workDayId,
        maxQuantity: 10,
        shiftId: shift.shiftId,
      });
    }
  }

  return res.json({
    success: newWorkDay ? true : false,
    message: newWorkDay
      ? 'Thêm ngày làm việc thành công.'
      : 'Thêm ngày làm việc không thành công.',
    newWorkDay,
  });
});

// update
const updateWorkDay = asyncHandler(async (req, res, next) => {
  const { workDayId } = req.params;

  const { inspectionDate } = req.body;
  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }
  const existWorkDay = await workDayRepository.getWorkDayAsync({
    inspectionDate,
    centerId: user.centerId,
  });

  if (existWorkDay)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Ngày làm việc đã tồn tại.',
      res,
      next
    );

  const newWorkDay = await workDayRepository.updateWorkDayAsync(
    req,
    workDayId,
    user.centerId
  );

  return res.json({
    success: newWorkDay ? true : false,
    message: newWorkDay
      ? 'Ngày làm việc cập nhật thành công.'
      : 'Ngày làm việc cập nhật thành công.',
  });
});

// xoa
const deleteWorkDay = asyncHandler(async (req, res, next) => {
  const { workDayId } = req.params;
  const { userId } = req.user;
  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }
  console.log('hihi');
  const existWorkDay = await workDayRepository.getWorkDayAsync({ workDayId });
  if (!existWorkDay)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Ngày làm việc không tồn tại.',
      res,
      next
    );

  const response = await workDayRepository.deleteWorkDayAsync({
    centerId: user.centerId,
    workDayId,
  });
  return res.json({
    success: response ? true : false,
    message: response
      ? 'Xóa ngày làm việc thành công.'
      : 'Xóa ngày làm việc thất bại.',
  });
});

module.exports = {
  getAllWorkDay,
  getWorkDayById,
  addWorkDay,
  updateWorkDay,
  deleteWorkDay,
};
