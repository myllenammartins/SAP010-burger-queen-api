const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

const basename = path.basename(__filename);
const db = {};

let sequelize;
if (config.dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[config.dbConfig.use_env_variable], config.dbConfig);
} else {
  sequelize = new Sequelize(config.dbConfig.database, config.dbConfig.username, config.dbConfig.password, config.dbConfig);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
