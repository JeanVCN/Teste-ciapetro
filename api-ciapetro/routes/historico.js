const express = require("express");
const api = require("../services/api");
const router = express.Router();
const Historico = require("../lib/Model/historico");

router.get("/historico/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    let conversao = await Historico.findByPk(id);
    conversao = conversao.dataValues;
    conversao.resultados = JSON.parse(conversao.resultados);
    res.json(conversao.resultados);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
