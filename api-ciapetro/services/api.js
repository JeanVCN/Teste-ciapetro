const Axios = require("axios");

const api = Axios.create({
  baseURL: "http://api.currencylayer.com/",
  withCredentials: true,
  params: { access_key: "bc2a76341b60a65cd932427abda98b61" },
});

module.exports = api;
