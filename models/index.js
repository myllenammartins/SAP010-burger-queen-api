const fs = require('fs');
const path = require('path');
const process = require('process');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config', 'config.json');
// eslint-disable-next-line import/no-dynamic-require
const config = require(configPath)[env];
const db = {};
let sequelize;
if (config.use_env_variable === 'DATABASE_URL') {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1
  ))
  .forEach((file) => {
    // eslint-disable-next-line
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