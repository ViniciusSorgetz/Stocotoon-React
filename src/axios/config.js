import axios from "axios";

const stocotoonAPI = axios.create({
  baseURL: "https://api-stocotoon-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default stocotoonAPI;
