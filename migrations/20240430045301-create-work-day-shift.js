'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Work_Day_Shifts', {
      workDayShiftId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'work_day_shift_id',
      },
      maxQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'max_quantity',
      },
      status: {
        type: DataTypes.ENUM('Đang nhận lịch', 'Ngưng Nhận lịch', 'Đã đầy'),
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
      workDayId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'work_day_id',
        references: {
          model: 'work_days',
          key: 'work_day_id',
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
    await queryInterface.dropTable('WorkDayShifts');
  },
};
