const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const { workDayShiftRepository } = require('../repositories');
const { Op } = require('sequelize');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models');

//lay danh sach
// const getAllWorkDayShift = asyncHandler(async (req, res) => {
//   const { limit, page, date, ...query } = req.query;
//   const { centerId } = req.params;
//   query.centerId = centerId;
//   if (!limit) {
//     console.log('vap');
//     const workDays =
//       await workDayRepository.getWorkDaysAfterOrEqualToTodayAsync(query);
//     return res.json({
//       success: workDays.length >= 0 ? true : false,
//       message:
//         workDays.length > 0 ? 'Lấy danh sách thành công.' : 'Không có dữ liệu.',
//       workDays,
//     });
//   }

//   const options = {};
//   // filter
//   if (date) {
//     query.inspectionDate = {
//       [Op.substring]: date,
//     };
//   }

//   const prevPage = page - 1 >= 0 ? +page + 1 : 1;
//   const offset = (prevPage - 1) * limit;

//   if (offset) options.offset = offset;
//   options.limit = +limit;

//   const workDays = await workDayRepository.getAllWorkDayAsync(query, options);
//   let totalPage = 0;
//   if (workDays.rows.length > 0) {
//     totalPage = Math.ceil(workDays.count / limit);
//   }
//   return res.json({
//     success: workDays.rows.length > 0 ? true : false,
//     message:
//       workDays.rows.length > 0
//         ? 'Lấy danh sách thành công.'
//         : 'Không có dữ liệu.',
//     totalPage,
//     workDays,
//   });
// });

const getWorkDayShiftById = asyncHandler(async (req, res) => {
  const { workDayShiftId } = req.params;

  const workDayShift = await workDayShiftRepository.getWorkDayShiftAsync({
    workDayShiftId,
  });
  const quantityAppointment = await db.Appointment.count({
    where: {
      workDayShiftId,
    },
  });
  return res.json({
    success: workDayShift ? true : false,
    message: workDayShift ? 'Lấy thành công.' : 'Lấy không thành công.',
    workDayShift,
    quantityAppointment,
  });
});

// update
const updateWorkDayShift = asyncHandler(async (req, res, next) => {
  const { workDayShiftId } = req.params;

  const newWorkDayShift = await workDayShiftRepository.updateWorkDayShiftAsync(
    req,
    workDayShiftId
  );

  return res.json({
    success: newWorkDayShift ? true : false,
    message: newWorkDayShift
      ? 'Ca trong ngày cập nhật thành công.'
      : 'Ca trong ngày cập nhật thành công.',
  });
});

module.exports = {
  getWorkDayShiftById,
  updateWorkDayShift,
};
