'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', {
      vehicleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'vehicle_id',
      },
      licensePlate: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'license_plate',
      },
      plateColor: {
        type: DataTypes.ENUM('Trắng', 'Vàng', 'Xanh'),
        field: 'plate_color',
        allowNull: false,
      },
      vehicleType: {
        type: DataTypes.STRING(50),
        field: 'vehicle_type',
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expiry_date',
      },
      brand: {
        type: DataTypes.STRING(50),
      },
      modelNumber: {
        type: DataTypes.STRING(50),
        field: 'model_number',
      },
      registrationPaper: {
        type: DataTypes.STRING(255),
        field: 'registration_paper',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'user_id',
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
    await queryInterface.dropTable('Vehicles');
  },
};
