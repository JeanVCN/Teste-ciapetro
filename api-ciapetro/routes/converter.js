const express = require("express");
const api = require("../services/api");
const historico = require("../lib/Model/historico");
const { Model, STRING, DECIMAL, DATE } = require("sequelize/dist");
const router = express.Router();

router.get("/converter", async function (req, res, next) {
  try {
    const { referencia, moeda } = req.query;
    const resposta = await api.get("/live", {
      params: {
        source: referencia,
        currencies: moeda,
        amount: 100,
      },
    });
    const { success, error, quotes } = resposta.data;
    const resultado = quotes[`${referencia}${moeda}`];
    if (success) {
      historico.create({ referencia, moeda, valor: resultado });
      return res.json(resultado);
    } else {
      if (error.code === 105) {
        return res
          .status(403)
          .json("Este recurso não está disponível no plano gratuito");
      } else {
        return res.status(500).json("Ocorreu um erro na requisição");
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
