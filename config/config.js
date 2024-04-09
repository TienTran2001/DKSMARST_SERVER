require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: '+07:00',
  },
};

// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "dksmart",
//     "host": "127.0.0.1",
//     "port": "3306",
//     "dialect": "mysql",
//     "logging": false,
//     "timezone": "+7:00"
//   }
// }
