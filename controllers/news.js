const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const db = require('../models');
const { newsRepository } = require('../repositories');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');
const { Op } = require('sequelize');
const { addShiftDetail } = require('./shift');
const { sendEmail } = require('../services/emailService');

const getAllNews = asyncHandler(async (req, res) => {
  const { limit, page, status, ...query } = req.query;

  const options = {};
  // filter theo status
  if (status) query.status = status;

  const prevPage = page - 1 >= 0 ? +page + 1 : 1;
  const offset = (prevPage - 1) * limit;

  if (offset) options.offset = offset;
  options.limit = +limit;

  const news = await newsRepository.getAllNewsAsync(query, options);

  let totalPage = 0;
  if (news.rows.length > 0) {
    totalPage = Math.ceil(news.count / limit);
  }
  return res.json({
    success: news.rows.length >= 0 ? true : false,
    message:
      news.rows.length > 0 ? 'Lấy danh sách thành công.' : 'Không có dữ liệu.',
    totalPage,
    news,
  });
});

// lay lịch hẹn theo id
const getNews = asyncHandler(async (req, res) => {
  const { newsId } = req.params;
  const news = await newsRepository.findNewAsync({
    newsId,
  });

  return res.json({
    success: news ? true : false,
    message: news ? 'Lấy tin tức thành công.' : 'Không có dữ liệu.',
    news,
  });
});

// thêm tin tức
const addNews = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  req.body.userId = userId;

  const newNews = await newsRepository.addNewsAsync(req.body);

  return res.json({
    success: newNews ? true : false,
    message: newNews
      ? 'Thêm tin tức thành công.'
      : 'Thêm tin tức không thành công.',
    newNews,
  });
});

// Update tin tức
const updateNews = asyncHandler(async (req, res, next) => {
  const { newsId } = req.params;

  const response = await newsRepository.updateNewsAsync(req.body, newsId);

  return res.status(200).json({
    success: response ? true : false,
    message: response
      ? `Cập nhật tin tức thành công.`
      : 'Cập nhật tin tức thất bại.',
  });
});

const autoIncrementViews = asyncHandler(async (req, res, next) => {
  const { newsId } = req.params;

  const response = await newsRepository.autoIncrementViewsAsync(newsId);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? `Tăng thành công.` : 'Tăng thất bại.',
  });
});

const deleteNews = asyncHandler(async (req, res, next) => {
  const { newsId } = req.params;

  const response = await newsRepository.deleteNewsAsync(newsId);
  return res.status(200).json({
    success: response ? true : false,
    message: response ? `Xóa tin tức thành công.` : 'Xóa tin tức thất bại.',
  });
});

module.exports = {
  getAllNews,
  addNews,
  updateNews,
  autoIncrementViews,
  deleteNews,
  getNews,
};
