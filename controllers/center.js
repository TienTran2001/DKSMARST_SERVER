const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const { centerRepository, authRepository } = require('../repositories');
const { Op } = require('sequelize');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const db = require('../models');

//lay danh sach trung tam

const getAllCenter = asyncHandler(async (req, res) => {
  const { limit, page, name, province, ...query } = req.query;
  const options = {};
  if (!limit) {
    // filter
    if (name) {
      query.name = {
        [Op.substring]: name,
      };
    }
    if (province) {
      query.provinceId = province;
    }
    const centers = await centerRepository.getAllCenterAsync(query);

    return res.json({
      success: centers.length > 0 ? true : false,
      message:
        centers.length > 0
          ? 'Lấy danh sách thành công.'
          : 'Lấy danh sách không thành công.',
      centers,
    });
  }

  const prevPage = page - 1 >= 0 ? +page + 1 : 1;
  const offset = (prevPage - 1) * limit;

  if (offset) options.offset = offset;
  options.limit = +limit;
  // console.log(options);
  const centers = await db.Center.findAndCountAll({
    where: query,
    ...options,
    include: [{ model: db.Province, attributes: ['name'] }],
  });
  return res.json({
    success: centers.count > 0 ? true : false,
    message:
      centers.count > 0
        ? 'Lấy danh sách thành công.'
        : 'Lấy danh sách không thành công.',
    centers,
  });
});

// lay trung tam theo id
const getCenterById = asyncHandler(async (req, res) => {
  const { centerId } = req.params;
  const response = await centerRepository.getCenterById(centerId);
  return res.json({
    success: response ? true : false,
    message: response ? 'Lấy trung tâm thành công.' : 'Lấy trung tâm thất bại.',
    center: response,
  });
});

// thêm trung tâm
const addCenter = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const existCenter = await centerRepository.getCenterByNameAsync(name);

  if (existCenter)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Trung tâm đăng kiểm đã tồn tại.',
      res,
      next
    );

  const newCenter = await centerRepository.addCenterAsync(req.body);
  return res.json({
    success: newCenter ? true : false,
    message: newCenter
      ? 'Tạo trung tâm thành công.'
      : 'Tạo trung tâm không thành công.',
  });
});

// update trung tâm
const updateCenter = asyncHandler(async (req, res, next) => {
  const { centerId } = req.params;
  const { name } = req.body;

  const existCenter = await centerRepository.getCenterById(centerId);

  if (!existCenter) {
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Trung tâm đăng kiểm không tồn tại.',
      res,
      next
    );
  }

  const existName = await centerRepository.getCenterByNameAsync(name);
  if (existName && existName.name !== existCenter.name)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Trung tâm đăng kiểm đã tồn tại.',
      res,
      next
    );

  const newCenter = await centerRepository.updateCenterAsync(req, centerId);
  return res.json({
    success: newCenter ? true : false,
    message: newCenter
      ? 'Trung tâm đăng kiểm cập nhật thành công.'
      : 'Trung tâm đăng kiểm cập nhật thành công.',
  });
});

// quản trị trung tâm update trung tâm
const updateCenterByManagerCenter = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { name } = req.body;

  const user = await authRepository.findByIdAsync(userId);
  if (!user) {
    return;
  }
  console.log(user.centerId);

  const existCenter = await centerRepository.getCenterById(user.centerId);

  if (!existCenter) {
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Trung tâm đăng kiểm không tồn tại.',
      res,
      next
    );
  }

  const existName = await centerRepository.getCenterByNameAsync(name);
  if (existName && existName.name !== existCenter.name)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Trung tâm đăng kiểm đã tồn tại.',
      res,
      next
    );

  const newCenter = await centerRepository.updateCenterAsync(
    req,
    user.centerId
  );
  return res.json({
    success: newCenter ? true : false,
    message: newCenter
      ? 'Trung tâm đăng kiểm cập nhật thành công.'
      : 'Trung tâm đăng kiểm cập nhật thành công.',
  });
});

// xoa trung tâm
const deleteCenter = asyncHandler(async (req, res, next) => {
  const { centerId } = req.params;

  const existCenter = await centerRepository.getCenterById(centerId);
  if (!existCenter)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Trung tâm đăng kiểm không tồn tại.',
      res,
      next
    );

  const response = await centerRepository.deleteCenterAsync(centerId);
  return res.json({
    success: response ? true : false,
    message: response ? 'Xóa trung tâm thành công.' : 'Xóa trung tâm thất bại.',
  });
});

module.exports = {
  getAllCenter,
  addCenter,
  getCenterById,
  updateCenter,
  deleteCenter,
  updateCenterByManagerCenter,
};
