'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'user_id',
      },
      phone: {
        type: DataTypes.STRING(11),
        field: 'phone',
      },
      email: {
        type: DataTypes.STRING(100),
        field: 'email',
      },
      fullname: {
        type: DataTypes.STRING(100),
        field: 'fullname',
      },
      password: {
        type: DataTypes.STRING(100),
        field: 'password',
      },
      address: {
        type: DataTypes.STRING(255),
        field: 'address',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Roles',
          key: 'roleId',
        },
        field: 'role_id',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
