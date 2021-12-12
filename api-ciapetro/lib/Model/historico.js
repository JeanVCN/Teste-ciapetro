const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
class Historico extends Model {}
Historico.init(
  {
    moedaorigem: DataTypes.STRING,
    moedaconversao: DataTypes.STRING,
    datahora: DataTypes.DATE,
  },
  { sequelize, modelName: "historico" }
);
module.exports = Historico;
