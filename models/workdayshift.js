'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkDayShift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkDayShift.belongsTo(models.Shift, { foreignKey: 'shiftId' });
      WorkDayShift.hasMany(models.Appointment, {
        foreignKey: 'workDayShiftId',
      });
    }
  }
  WorkDayShift.init(
    {
      workDayShiftId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'work_day_shift_id',
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
      workDayId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'work_day_id',
        references: {
          model: 'work_days',
          key: 'work_day_id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'WorkDayShift',
      tableName: 'work_day_shifts',
    }
  );
  return WorkDayShift;
};
