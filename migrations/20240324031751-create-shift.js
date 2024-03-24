'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shifts', {
      shiftId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'shift_id',
      },
      registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'registration_date',
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
    await queryInterface.dropTable('Shifts');
  },
};
