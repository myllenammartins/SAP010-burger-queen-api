const { Sequelize } = require('sequelize');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    secret: process.env.JWT_SECRET,
    remoteUrl: process.env.REMOTE_URL || `http://127.0.0.1:${process.env.PORT}`,
    adminEmail: process.env.DB_ADMIN_EMAIL,
    adminPassword: process.env.DB_ADMIN_PASSWORD,
    port: process.env.PORT || 8888,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    secret: process.env.JWT_SECRET,
    remoteUrl: process.env.REMOTE_URL || `http://127.0.0.1:${process.env.PORT}`,
    adminEmail: process.env.DB_ADMIN_EMAIL,
    adminPassword: process.env.DB_ADMIN_PASSWORD,
    port: process.env.PORT || 8888,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    secret: process.env.JWT_SECRET,
    remoteUrl: process.env.REMOTE_URL || `http://127.0.0.1:${process.env.PORT}`,
    adminEmail: process.env.DB_ADMIN_EMAIL,
    adminPassword: process.env.DB_ADMIN_PASSWORD,
    port: process.env.PORT || 8888,
  },
};

const envConfig = config[environment];

const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
  host: envConfig.host,
  dialect: envConfig.dialect,
});

module.exports = {
  dbConfig: envConfig,
  secret: envConfig.secret,
  port: envConfig.port,
  remoteUrl: envConfig.remoteUrl,
  sequelize,
  adminEmail: envConfig.adminEmail,
  adminPassword: envConfig.adminPassword,
};
