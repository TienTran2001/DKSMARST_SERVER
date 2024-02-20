'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'role_id',
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'role_name',
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
    await queryInterface.dropTable('Roles');
  },
};
