'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: false,
    }
  );
  return Role;
};
