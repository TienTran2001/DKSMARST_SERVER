'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Work_Days', {
      workDayId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'work_day_id',
      },
      inspectionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'inspection_date',
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
    await queryInterface.dropTable('WorkDays');
  },
};
