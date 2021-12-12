const express = require("express");
const router = express.Router();
const Historico = require("../lib/Model/historico");

/* GET home page. */
// router.get("/", async function (req, res, next) {
//   Historico.create();
//   class User extends Model {}
//   User.init(
//     {
//       username: DataTypes.STRING,
//       birthday: DataTypes.DATE,
//     },
//     { sequelize, modelName: "user" }
//   );
//   (async () => {
//     await sequelize.sync();
//     const jane = await User.create({
//       username: "janedoe",
//       birthday: new Date(1980, 6, 20),
//     });
//     console.log(jane.toJSON());
//   })();
//   res.render("index", { title: "Express" });
// });
router.get("/", async function (req, res, next) {
  const historico = await Historico.findAll({});
  res.status(200).json(historico);
});

router.post("/", async function (req, res, next) {
  const historico = req.body;
  await Historico.create(historico);
  res.status(201).json(historico);
});

module.exports = router;
