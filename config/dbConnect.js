const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  null,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: '+07:00',
  }
);

const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('::DB Connected');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
module.exports = dbConnect;
