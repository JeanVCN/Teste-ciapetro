const express = require("express");
const api = require("../services/api");
const router = express.Router();

router.get("/converter", async function (req, res, next) {
  try {
    const resposta = await api.get("/convert", {
      params: {
        from: "EUR",
        to: "GBP",
        amount: 100,
      },
    });
    const { success, currencies } = resposta.data;
    if (success) {
      const moedas = Object.keys(currencies).map((codigo) => ({
        codigo,
        nome: currencies[codigo],
      }));
      return res.json(moedas);
    } else {
      return res.status(500).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
