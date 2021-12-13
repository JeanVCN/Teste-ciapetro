const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
class Historico extends Model {}
Historico.init(
  {
    referencia: DataTypes.STRING(5),
    moeda: DataTypes.STRING(5),
    valor: DataTypes.DECIMAL(10, 20),
    datahora: DataTypes.DATE,
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { sequelize, modelName: "historico" }
);
module.exports = Historico;
