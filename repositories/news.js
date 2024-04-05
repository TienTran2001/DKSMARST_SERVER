const asyncHandler = require('express-async-handler');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

// // lấy thông tin
const findNewAsync = asyncHandler(async (query) => {
  return await db.News.findOne({
    where: query,
    include: [
      {
        model: db.User,
        attributes: ['fullname'],
      },
    ],
  });
});

// ham lay danh sach tin tức
const getAllNewsAsync = asyncHandler(async (query, options) => {
  const news = await db.News.findAndCountAll({
    where: query,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: db.User,
        attributes: ['fullname'],
      },
    ],
    ...options,
  });
  return news;
});

// hàm tạo tin tức
const addNewsAsync = asyncHandler(async (data) => {
  return await db.News.create(data);
});

// ham update tin tức
const updateNewsAsync = asyncHandler(async (data, newsId) => {
  const response = await db.News.update(data, {
    where: { newsId },
  });
  return response;
});

const autoIncrementViewsAsync = asyncHandler(async (newsId) => {
  const news = await db.News.findByPk(newsId);
  console.log(news);
  if (news) news.views += 1;
  await news.save();
  return news;
});

const deleteNewsAsync = asyncHandler(async (newsId) => {
  const response = await db.News.destroy({ where: { newsId } });
  return response;
});

module.exports = {
  getAllNewsAsync,
  addNewsAsync,
  updateNewsAsync,
  autoIncrementViewsAsync,
  deleteNewsAsync,
  findNewAsync,
};
