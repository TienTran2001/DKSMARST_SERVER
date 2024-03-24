'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShiftDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShiftDetail.init(
    {
      shiftDetailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'shift_detail_id',
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'start_time',
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'end_time',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    },
    {
      sequelize,
      modelName: 'ShiftDetail',
      tableName: 'shift_details',
    }
  );
  return ShiftDetail;
};
