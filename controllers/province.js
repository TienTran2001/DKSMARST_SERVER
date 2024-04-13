const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const db = require('../models');
const { Op } = require('sequelize');
const { provinceRepository } = require('../repositories');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');

// lay tinh thanh theo id
const getProvinceById = asyncHandler(async (req, res) => {
  const { provinceId } = req.params;
  const response = await provinceRepository.getProvinceByIdAsync(provinceId);
  return res.json({
    success: response ? true : false,
    message: response
      ? 'Lấy tỉnh thành thành công.'
      : 'Lấy tỉnh thành thất bại.',
    province: response,
  });
});

// lấy danh sách tỉnh thành
const getAllProvince = asyncHandler(async (req, res) => {
  const { limit, page, name, ...query } = req.query;

  const options = {};

  if (name) {
    query.name = {
      [Op.substring]: name,
    };
  }

  if (!limit) {
    // filter

    const response = await provinceRepository.getAllProvinceAsync();
    return res.json({
      success: response ? true : false,
      message: response
        ? 'Lấy danh sách tỉnh thành thành công.'
        : 'Lấy danh sách tỉnh thành thất bại.',
      provinces: response,
    });
  }

  const prevPage = page - 1 >= 0 ? +page + 1 : 1;
  const offset = (prevPage - 1) * limit;

  if (offset) options.offset = offset;
  options.limit = +limit;

  const provinces = await db.Province.findAndCountAll({
    where: query,
    ...options,
    order: [['createdAt', 'DESC']],
  });
  let totalPage = 0;
  if (provinces.rows.length > 0) {
    totalPage = Math.ceil(provinces.count / limit);
  }
  return res.json({
    success: provinces.count >= 0 ? true : false,
    message:
      provinces.count >= 0
        ? 'Lấy danh sách thành công.'
        : 'Lấy danh sách không thành công.',
    totalPage,
    provinces,
  });
});

// thêm tỉnh thành
const addProvince = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  const existProvince = await provinceRepository.getProvinceByNameAsync(name);

  if (existProvince)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Tỉnh thành đã tồn tại.',
      res,
      next
    );

  const newProvince = await provinceRepository.addProvinceAsync(req.body);
  return res.json({
    success: newProvince ? true : false,
    message: newProvince
      ? 'Tạo tỉnh thành thành công.'
      : 'Tạo tài tỉnh thành thành công.',
  });
});

// update tỉnh thành
const updateProvince = asyncHandler(async (req, res, next) => {
  const { provinceId } = req.params;
  const { name } = req.body;

  const existProvince = await provinceRepository.getProvinceByIdAsync(
    provinceId
  );

  if (!existProvince)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Tỉnh thành không tồn tại.',
      res,
      next
    );

  const existName = await provinceRepository.getProvinceByNameAsync(name);
  if (existName && existName.name !== existProvince.name)
    return throwErrorWithStatus(
      statusCode.BAD_REQUEST,
      'Tỉnh thành đã tồn tại.',
      res,
      next
    );

  const newProvince = await provinceRepository.updateProvinceAsync(
    req,
    provinceId
  );
  return res.json({
    success: newProvince ? true : false,
    message: newProvince
      ? 'Tỉnh thành cập nhật thành công.'
      : 'Tỉnh thành cập nhật thành công.',
  });
});

// xoa tỉnh thành
const deleteProvince = asyncHandler(async (req, res, next) => {
  const { provinceId } = req.params;

  const existProvince = await provinceRepository.getProvinceByIdAsync(
    provinceId
  );
  if (!existProvince)
    return throwErrorWithStatus(
      statusCode.NOTFOUND,
      'Tỉnh thành không tồn tại.',
      res,
      next
    );

  const response = await provinceRepository.deleteProvinceAsync(provinceId);
  return res.json({
    success: response ? true : false,
    message: response ? 'Xóa tỉnh thành công.' : 'Xóa tỉnh thành thành công.',
  });
});

module.exports = {
  getAllProvince,
  addProvince,
  updateProvince,
  deleteProvince,
  getProvinceById,
};
