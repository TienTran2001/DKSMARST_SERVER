'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  News.init(
    {
      newsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'news_id',
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'title',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'content',
      },
      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'views',
        defaultValue: 0,
      },
      imageUrl: {
        type: DataTypes.STRING(255),
        field: 'image_url',
      },
      source: {
        type: DataTypes.STRING(255),
        field: 'source',
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
      status: {
        type: DataTypes.ENUM('ẩn', 'công khai'),
        defaultValue: 'công khai',
      },
    },
    {
      sequelize,
      modelName: 'News',
      tableName: 'news',
    }
  );
  return News;
};
