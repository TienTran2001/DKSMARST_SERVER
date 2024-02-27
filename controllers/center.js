const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const { centerRepository } = require('../repositories');
const { Op } = require('sequelize');

//lay danh sach trung tam

const getAllCenter = asyncHandler(async (req, res) => {
  const { limit, page, name, ...query } = req.query;
  const options = {};
  if (!limit) {
    // filter
    if (name) {
      query.name = {
        [Op.substring]: name,
      };
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
  });
  return res.json({
    success: centers.length > 0 ? true : false,
    message:
      centers.length > 0
        ? 'Lấy danh sách thành công.'
        : 'Lấy danh sách không thành công.',
    centers,
  });
});

module.exports = {
  getAllCenter,
};
