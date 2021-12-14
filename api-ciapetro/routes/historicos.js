const express = require("express");
const api = require("../services/api");
const router = express.Router();
const Historico = require("../lib/Model/historico");

router.get("/historicos", async function (req, res, next) {
  try {
    const conversao = await Historico.findAll();
    console.log(conversao);
    res.json(
      conversao.map((item) => ({
        ...item.dataValues,
        resultados: JSON.parse(item.dataValues.resultados),
      }))
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
