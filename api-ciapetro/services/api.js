import Axios from "axios";
import store from "../store/index";

const api = Axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export default api;
