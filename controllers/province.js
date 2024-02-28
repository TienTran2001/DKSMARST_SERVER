const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const db = require('../models');
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
  const response = await provinceRepository.getAllProvinceAsync();
  return res.json({
    success: response ? true : false,
    message: response
      ? 'Lấy danh sách tỉnh thành thành công.'
      : 'Lấy danh sách tỉnh thành thất bại.',
    provinces: response,
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
