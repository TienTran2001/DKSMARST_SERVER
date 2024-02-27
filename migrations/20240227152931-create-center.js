'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Centers', {
      centerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'center_id',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'name',
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'address',
      },
      phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        field: 'phone',
      },
      operatingHours: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'operating_hours',
      },
      provinceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'province_id',
        references: {
          model: 'provinces', // Thay thế bằng tên thực của bảng provinces
          key: 'province_id',
        },
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
    await queryInterface.dropTable('Centers');
  },
};
