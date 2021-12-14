var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var moedasRouter = require("./routes/moedas");
var converterRouter = require("./routes/converter");
var historicosRouter = require("./routes/historicos");
var historicoRouter = require("./routes/historico");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(moedasRouter);
app.use(converterRouter);
app.use(historicosRouter);
app.use(historicoRouter);
module.exports = app;
