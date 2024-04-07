'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Vehicle.init(
    {
      vehicleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'vehicle_id',
      },
      licensePlate: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'license_plate',
      },
      plateColor: {
        type: DataTypes.ENUM('Trắng', 'Vàng', 'Xanh'),
        field: 'plate_color',
        allowNull: false,
      },
      vehicleType: {
        type: DataTypes.STRING(50),
        field: 'vehicle_type',
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expiry_date',
      },
      brand: {
        type: DataTypes.STRING(50),
      },
      modelNumber: {
        type: DataTypes.STRING(50),
        field: 'model_number',
      },
      registrationPaper: {
        type: DataTypes.STRING(255),
        field: 'registration_paper',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'user_id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Vehicle',
      tableName: 'vehicles',
      timestamps: true,
    }
  );
  return Vehicle;
};
