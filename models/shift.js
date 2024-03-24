'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shift.hasMany(models.ShiftDetail, { foreignKey: 'shiftId' });
    }
  }
  Shift.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Shift',
      tableName: 'shifts',
    }
  );
  return Shift;
};
