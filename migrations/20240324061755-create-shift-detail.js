'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shift_Details', {
      shiftDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'shift_detail_id',
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'start_time',
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'end_time',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      maxQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'max_quantity',
      },
      status: {
        type: DataTypes.ENUM('Đang nhận lịch', 'Ngưng nhận lịch', 'Đã đầy'),
        allowNull: false,
        defaultValue: 'Đang nhận lịch',
      },
      shiftId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'shift_id',
        references: {
          model: 'shifts',
          key: 'shift_id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('ShiftDetails');
  },
};
