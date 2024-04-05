'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('News', {
      newsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'news_id',
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'title',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'content',
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'views',
        defaultValue: 0,
      },
      imageUrl: {
        type: DataTypes.STRING(255),
        field: 'image_url',
      },
      source: {
        type: DataTypes.STRING(255),
        field: 'source',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
      status: {
        type: DataTypes.ENUM('ẩn', 'công khai'),
        defaultValue: 'công khai',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('News');
  },
};
