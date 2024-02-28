'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Center extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Center.belongsTo(models.Province, { foreignKey: 'provinceId' });
    }
  }
  Center.init(
    {
      centerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'center_id',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'name',
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'address',
      },
      phone: {
        type: DataTypes.STRING(11),
        allowNull: false,
        field: 'phone',
      },
      operatingHours: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'operating_hours',
      },
      status: {
        type: DataTypes.ENUM('đang nhận lịch', 'ngưng nhận lịch'),
        allowNull: false,
        defaultValue: 'đang nhận lịch',
      },
      provinceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'province_id',
        references: {
          model: 'provinces', // Thay thế bằng tên thực của bảng provinces
          key: 'province_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Center',
    }
  );
  return Center;
};
