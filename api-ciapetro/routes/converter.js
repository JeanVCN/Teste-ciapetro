const express = require("express");
const api = require("../services/api");
const historico = require("../lib/Model/historico");
const { Model, STRING, DECIMAL, DATE } = require("sequelize/dist");
const router = express.Router();

router.get("/converter", async function (req, res, next) {
  try {
    let { referencia, moeda } = req.query;
    if (Array.isArray(moeda)) moeda = moeda.join(", ");
    const resposta = await api.get("/live", {
      params: {
        source: referencia,
        currencies: moeda,
      },
    });
    const { success, error, quotes } = resposta.data;
    if (success) {
      historico.create({
        referencia,
        moeda,
        resultados: JSON.stringify(quotes),
      });
      return res.json(quotes);
    } else {
      console.log(resposta.data);
      if (error.code === 105) {
        return res
          .status(403)
          .json("O seu plano só disponibiliza o USD como moeda de referencia");
      } else if (error.code === 106) {
        return res
          .status(403)
          .json("Você atingiu o limite de conversões do plano gratuito");
      }
      return res.status(500).json("Ocorreu um erro na requisição");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
