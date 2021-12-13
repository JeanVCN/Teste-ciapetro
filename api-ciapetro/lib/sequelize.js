const Sequelize = require("sequelize");
const api = require("../services/api");
const sequelize = new Sequelize("db_api_ciapetro", "testeciapetro", "123456", {
  host: "localhost",
  dialect: "postgres",
});
module.exports = sequelize;
