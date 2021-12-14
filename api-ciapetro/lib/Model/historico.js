const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
class Historico extends Model {}
Historico.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    referencia: DataTypes.STRING(5),
    moeda: DataTypes.STRING(255),
    resultados: DataTypes.STRING,
  },
  { sequelize, modelName: "historico" }
);
Historico.sync({ force: true }).then();

module.exports = Historico;
