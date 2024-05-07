'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkDay.hasMany(models.WorkDayShift, { foreignKey: 'workDayId' });
    }
  }
  WorkDay.init(
    {
      workDayId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'work_day_id',
      },
      inspectionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'inspection_date',
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
      modelName: 'WorkDay',
      tableName: 'work_days',
    }
  );
  return WorkDay;
};
