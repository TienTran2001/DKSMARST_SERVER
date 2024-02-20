'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Province.init(
    {
      provinceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'province_id',
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        field: 'name',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Province',

      tableName: 'provinces',
      timestamps: true,
    }
  );
  return Province;
};
