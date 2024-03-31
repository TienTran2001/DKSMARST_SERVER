'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
      Appointment.belongsTo(models.Center, { foreignKey: 'centerId' });
      Appointment.belongsTo(models.User, { foreignKey: 'userId' });
      Appointment.belongsTo(models.ShiftDetail, {
        foreignKey: 'shiftDetailId',
      });
    }
  }
  Appointment.init(
    {
      appointmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'appointment_id',
      },
      appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'appointment_date',
      },
      note: {
        type: DataTypes.TEXT,
        field: 'note',
      },
      shiftDetailId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'shift_detail_id',
        references: {
          model: 'shift_details',
          key: 'shift_detail_id',
        },
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'vehicle_id',
        references: {
          model: 'vehicles',
          key: 'vehicle_id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'user_id',
        },
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
      status: {
        type: DataTypes.ENUM(
          'chưa xác nhận',
          'đã xác nhận',
          'đã hủy',
          'đã hoàn thành'
        ),
        defaultValue: 'chưa xác nhận',
      },
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointments',
    }
  );
  return Appointment;
};
