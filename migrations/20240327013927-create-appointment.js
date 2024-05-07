'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      appointmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'appointment_id',
      },
      appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'appointment_date',
      },
      note: {
        type: DataTypes.TEXT,
        field: 'note',
      },
      workDayShiftId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'work_day_shift_id',
        references: {
          model: 'work_day_shifts',
          key: 'work_day_shift_id',
        },
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'vehicle_id',
        references: {
          model: 'vehicles',
          key: 'vehicle_id',
        },
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
      centerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'center_id',
        references: {
          model: 'centers',
          key: 'center_id',
        },
      },
      status: {
        type: DataTypes.ENUM(
          'chưa xác nhận',
          'đã xác nhận',
          'đã hủy',
          'đã hoàn thành'
        ),
        defaultValue: 'chưa xác nhận',
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
    await queryInterface.dropTable('Appointments');
  },
};
